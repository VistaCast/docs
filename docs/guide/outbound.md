# 告警出站（Webhook + MQTT + 通知渠道）

告警落库后，API 可同时投递：

1. **Webhook**（FR-RUL-04 / FR-RUL-03）
2. **MQTT**（FR-RUL-05）
3. **邮件 / 企微 / 钉钉**（FR-RUL-06）

Webhook 与 MQTT 的载荷是 [`alert.v1`](https://github.com/VistaCast/vistacast/blob/main/artifacts/events/alert.v1.schema.json)（lab Event Engine Cloud Sync = **元数据 JSON**：FR-RUL-04 full AlertEvent（2.0.62：单测证明 **仍**投递 care+drill；webhook 可带 care）；FR-RUL-05 full AlertEvent，care 跳过（2.0.60：即便另有 lab `drill` 仍跳过；care 永不 MQTT；drill 仅 care 缺席）；**不是** bytes / **不是** MP4 / **不是** VOD）。Admin `/v1/events` WS（FR-ADM-03）推送 `{ type: "alert", alert }`，同样是 AlertEvent 元数据；2.0.53：EventsHub 单测证明 drill-shaped alerts 保留 `clipKind` / `sittingHoldMs`；2.0.55：Admin live events 解析保留 `payload.drill`（元数据 only，非 bytes/MP4/VOD）；2.0.61：EventsHub 单测证明 **care+drill** 上 Admin live stream；2.0.62：Webhook **仍**投递 care+drill，MQTT **仍**跳过 care（Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不）。`MQTT_URL` 为空时 MQTT **no-op**。`SMTP_URL` 为空时邮件渠道仍可保存，但 **不发送**。

本机 catcher / Mosquitto 是实验室出站。**SyncroBrain 生产入口**是签过名的 Webhook，操作步骤见 [接入 SyncroBrain](/ecosystem/syncrobrain)。camera↔device 字段同页（**FR-ECO-03**）。

可选 **DoerFlow** 出站（FR-ECO-05）默认关闭：最小化 `com.vistacast.alert.v1` CloudEvent，`data` 为 **summary-only**（`vistacastAlertEventDataSchema` / server `buildDoerflowAlertEventData`），**不**携带 clipKind / HoldMs / JPEG 字节；2.0.50：schema **显式拒绝** clipKind / HoldMs / clipRef（仅 rejection 测试；schema **未**扩展）；2.0.52：单测证明 AlertEvent 携带 clipKind/HoldMs 时 builder 仍 summary-only；2.0.57：单测锁定 drill-shaped AlertEvent 时 `data` 仍丢弃 drill/clipKind/HoldMs；2.0.58：shared `vistacastAlertEventDataSchema` **显式拒绝** `drill`（同 clipKind/HoldMs/clipRef；仅 rejection 测试；schema **未**扩展）。AlertEvent 元数据 Cloud Sync（含 clipKind / HoldMs / drill）仍走 Webhook / MQTT / `/v1/events` / Notify，**不是** DoerFlow inbox extras（DoerFlow **不是** Event Engine extras 平面）。不含视频 / 人脸模板 / RTSP。回调不改告警状态。见 [接入 DoerFlow](/ecosystem/doerflow)。

**smart-site 组合包**（FR-ECO-07）三条通道也默认关闭：SyncroBrain 最小化 HMAC hint、VistaRemote 深链 `sourceRef`（OpenAPI `$ref` `GET /v1/cameras/{id}/remote-intervention` + alerts twin；lab 大纲；**不是**真实 VistaRemote / session / TURN）、DataLuminary 拉取 CORS。care / face / 敏感字段不出站。2.0.51：DataLuminary JSON sanitize（FR-ECO-01）**保留** lab 元数据 `clipKind` / `*HoldMs` / `clipScreenshot`，**剥离** `clipRef` / `care` / jpeg-ish / credential 键（shared 单测；**不是** VOD 字节）。2.0.56：`sanitizeSmartSiteExportAlert` **另保留** lab `payload.drill`（仍剥离 clipRef/care/media-shaped；lab webhook drill / sample metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care）。见 [接入 SyncroBrain](/ecosystem/syncrobrain)、[与 VistaRemote](/ecosystem/vistaremote)、[DataLuminary 接入](/ecosystem/dataluminary)。

## Webhook

Admin **Webhooks** 页保存 `POST /v1/webhooks`。列表 `GET` **不含** secret；删除 `DELETE /v1/webhooks/:id`。`POST /v1/webhooks/:id/test` 发 **drill** AlertEvent（标题标明 not production）：payload 含 `drill: true` + lab sample `clipKind: jpeg_ring` + `sittingHoldMs` 供元数据 Cloud Sync 校验——**不是** bytes / **不是** VOD / **不是**生产事件（2.0.52）。2.0.53：页内 `drillHint` 文档化上述 sample metadata（web 单测；非视频播放器）。2.0.54：`drill` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`；Admin Alerts `extra=drill` + Tag（`payload.drill === true`）；server 经 allowlist 拷贝 `extras.drill === true`；2.0.55：`alertExtraContainment("drill")` SQL/json_extract 单测覆盖 Admin `extra=drill`；2.0.56：Admin CSV 仍九列（`drill` **不**成 CSV 列，仅 `extra=drill` 筛选）；list/export 选中筛选时带 `extra=drill`；2.0.59：`ai` `sanitizeCareExtras` **保留** lab `drill` 并 **剥离** `call_120` / stage / escalate；server detection payload 拷贝 **从不**镜像 care escalation / auto-120 extras（与 drill 并存时仅 allowlist）；Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器——lab webhook drill metadata + Event Engine tags only，**不是** auto-120 / **不是** care 生产 / **不是** MP4/VOD / **不是**生产指标。2.0.62：单测证明 Webhook **仍**投递 care+drill（对比 MQTT 跳过 care；Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不）。

| 项 | 值 |
|------|------|
| 方法 | `POST`，body = `alert.v1` JSON |
| 签名头 | `x-vistacast-signature: sha256=<hex>` |
| 算法 | HMAC-SHA256，密钥 = 创建端点时下发的 secret，对 **原始 body 字符串** 签名 |
| 分级 | `minSeverity` 缺省 `info`；只投递 `rank(alert) >= rank(minSeverity)` |
| 重试 | 最多 3 次，退避 `WEBHOOK_RETRY_MS` × 1/2/4（默认 100ms） |
| 投递审计 | `GET /v1/webhooks/:id/deliveries` 分页、新近优先；每次尝试记 httpStatus / success（2.0.72）；可选 `extra=drill\|missedFeedHint\|overdueHint`（2.0.95 drill 为 lab 投递审计筛选；2.0.87 曾拒绝 extra=drill）；**不是** SLA / **不是** CSV extras 列 |
| 测试投递 | `POST /v1/webhooks/:id/test`；OpenAPI `$ref` TestWebhookResponse + 401/403；lab sample metadata only（clipKind / sittingHoldMs）；Admin UI 文档化；无 clipRef / 无 JPEG 字节 |

本机 catcher（Compose 网内）：`deploy/scripts/lab-webhook-catcher.mjs`。

## MQTT

2.0.53：单测证明 drill-shaped AlertEvent（`drill` / `clipKind` / `sittingHoldMs`）在 MQTT 发布 JSON 中保留（无 clipRef/care；元数据 Cloud Sync，非 bytes/MP4/VOD）。2.0.60：单测证明 care **仍**跳过（即便 payload 另有 lab `drill`；care 永不 MQTT；lab drill 元数据仅当 care 缺席）。2.0.61：对比诚实——EventsHub（FR-ADM-03）可推 care+drill，MQTT **仍**跳过 care（Admin WS ≠ MQTT care 策略）。2.0.62：对比诚实——Webhook（FR-RUL-04）可投 care+drill，MQTT **仍**跳过 care（Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不）。

跨产品 topic 登记在 LuminaryWorks [`spec/mqtt-topics.md`](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/mqtt-topics.md)：

```text
lw/v1/{tenantId}/vistacast/alert.v1
```

`tenantId` 必须是 UUID。QoS **1**，retain **false**。broker 不可达只打日志，不抛错。

| 环境变量 | 说明 |
|----------|------|
| `MQTT_URL` | 空 = 关闭。Compose：`mqtt://mosquitto:1883`；宿主机 API：`mqtt://127.0.0.1:1884` |
| `MQTT_USERNAME` / `MQTT_PASSWORD` | 可选 |
| `MQTT_CLIENT_ID` | 缺省 `vistacast-api-<pid>` |

本机 broker（宿主机 **1884**，避免和 SyncroBrain/TB 的 1883 抢端口）：

```bash
cd deploy
docker compose --profile mqtt up -d
# 在 .env 设 MQTT_URL=mqtt://mosquitto:1883 后重启 api
./scripts/lab-mqtt-sub.sh
```

订阅通配：`lw/v1/+/vistacast/alert.v1`。payload 示例（字段以 schema 为准）：

```json
{
  "schemaVersion": "alert.v1",
  "id": "01900000-aaaa-7bbb-8ccc-000000000010",
  "tenantId": "01900000-aaaa-7bbb-8ccc-000000000000",
  "kind": "intrusion",
  "severity": "warning",
  "state": "open",
  "occurredAt": "2026-08-24T07:00:00.000Z"
}
```

**不是** ThingsBoard `v1/devices/me/telemetry`。接入步骤见 [接入 SyncroBrain](/ecosystem/syncrobrain)。

## 邮件 / 企微 / 钉钉

Admin **Notify** 页：`GET/POST /v1/notification-channels`、`PATCH/DELETE /v1/notification-channels/:id`。不可改 `type`；钉钉省略 secret 则保留。

| 类型 | 投递 | 备注 |
|------|------|------|
| `email` | SMTP 纯文本 | `SMTP_URL` 空则 no-op；**不是** SendGrid/SES SLA |
| `wecom` | 群机器人 `msgtype=text` | **不是** 企业微信应用 OAuth |
| `dingtalk` | 群机器人 `msgtype=text`；可选 `secret` 签名 | 列表 **不回读** secret |

模板占位：`{{kind}}` `{{severity}}` `{{title}}` `{{state}}` `{{occurredAt}}` `{{id}}` `{{cameraId}}` `{{siteId}}` `{{ruleId}}` `{{tenantId}}`；lab 可选 `{{clipRef}}` `{{clipKind}}` `{{behavior}}` `{{clipJpegCount}}` `{{clipDurationMs}}` `{{sittingHoldMs}}` `{{lyingHoldMs}}` `{{stillHoldMs}}` `{{fallHoldMs}}` `{{loiterHoldMs}}` `{{nightHoldMs}}` `{{vacantHoldMs}}` `{{aloneHoldMs}}` `{{drill}}` `{{missedFeedHint}}` `{{overdueHint}}` `{{zoneInside}}` `{{clipScreenshot}}`（Event Engine **提醒**元数据；缺省则空串；`{{drill}}` / `{{missedFeedHint}}` / `{{overdueHint}}` / `{{zoneInside}}` / `{{clipScreenshot}}` 仅当 `payload.* === true` 为 `"true"`；2.0.49：notification-dispatcher 测试覆盖 remaining HoldMs + clipKind 插值；2.0.51：email `subjectTemplate`/`bodyTemplate` + DingTalk `bodyTemplate` 插值 HoldMs/clipKind；2.0.57：Admin Notify hint 文档化 `drill`；2.0.58：email subject/body + DingTalk 插值 `{{drill}}`（与企微 parity；`payload.drill === true` → `"true"`）；2.0.82：email/WeCom/DingTalk 插值 `{{missedFeedHint}}` / `{{overdueHint}}`；2.0.100：email/WeCom/DingTalk 插值 `{{zoneInside}}` / `{{clipScreenshot}}`；Admin Notify hint 文档化——lab STUB_FEED / webhook drill / 提醒 metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care / **不是**新 AlertKind / **不是** CSV extras 列 / **不是** HoldMs / **不是** SLA / **不是** DoerFlow schema 扩展）。无 HTML、**无**视频附件、**无** raw JPEG 字节。`minSeverity` 与 Webhook 相同。FR-RUL-04/05/ADM-03 Cloud Sync 仍发 AlertEvent 元数据 JSON（非 bytes/MP4/VOD）；DoerFlow `data` 仍为 summary-only，**不**带这些字段（含 drill；2.0.50：schema 拒绝 clipKind/HoldMs/clipRef；2.0.57：drill-shaped 仍丢弃；2.0.58：schema **显式拒绝** drill）。投递失败只打日志。
