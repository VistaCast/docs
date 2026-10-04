# 接入 SyncroBrain（FR-RUL-05 / FR-ECO-03）

[SyncroBrain](https://syncrobrain.com) 是生态里的 **「连」**：资产、Incident、Scene Kernel 与执行器。VistaCast 拥有摄像头、检测、告警状态和 P2P 预览。两边不共享数据库。

操作员在 Admin 与 SyncroBrain Console 完成接入即可。契约细节见 SyncroBrain [`spec/integrations/vistacast.md`](https://github.com/syncrobrain/platform/blob/main/spec/integrations/vistacast.md) 与 [`playbooks/vistacast-bridge.md`](https://github.com/syncrobrain/platform/blob/main/playbooks/vistacast-bridge.md)。

## 在 Admin 里怎么点

1. 打开 **Webhook**（或管理员打开 **品牌**），复制 **租户 id**。
2. 到 SyncroBrain Console **边缘**：选项目与场景，粘贴租户 id，创建连接。
3. 回到本页：粘贴 Gateway ingest URL（`:13200`，不是 Console `:15180`）和一次性 secret。不要把 secret 放进地址栏。
4. 保存，点 **发送 Drill**。SyncroBrain **事件** 应出现紫色 VistaCast 行。
5. **摄像头**：复制摄像头 id 到 SyncroBrain 绑定；若从 SyncroBrain 点「到 VistaCast 绑定」，把预填的资产 id 写入该行并保存。

家庭看护的 `care` 事件只走签名 Webhook，禁止 MQTT。自动动作在 SyncroBrain 默认关闭。

## 生产入口

三个场景（仓储/楼宇/家庭看护）的统一生产入口是签名 Webhook：

`POST {SyncroBrain Gateway}/api/v1/integrations/vistacast/connections/{id}/events`

请求头 `x-vistacast-signature: sha256=<hex>`，对 **原始 body 字符串** HMAC-SHA256。无需用户 JWT。

可选 MQTT `lw/v1/{tenantId}/vistacast/alert.v1` 仅仓储/楼宇兼容，走 SyncroBrain 独立 `EVENT_BUS_MQTT_URL`，**绝不**复用 ThingsBoard `:1883`。带 `care` 的载荷禁止进入 MQTT。本机 Mosquitto 出站仍可给实验室 catcher 用，那不是 SyncroBrain 生产消费。

## 摄像头绑定（FR-ECO-03）

Admin **摄像头** 可写 `syncrobrainDeviceId`。深链 `/#/cameras?syncrobrainAssetId=` 会预填该字段。投递 payload 由服务端注入绑定值。

## 诚实边界

| FR | 状态 |
|----|:----:|
| FR-ECO-03 camera 字段 + payload.syncrobrainDeviceId | ✅ |
| SyncroBrain 签名 Webhook 消费者（Inbox → Incident / Scene） | ✅ integration-verified |
| 可选独立事件总线 MQTT（非 care） | ✅ |
| ThingsBoard `v1/devices/me/telemetry` | ❌ 明确不做 |
| 视觉模型 F1 / 执行器实机 | ❌ 仍走各自验证门 |

## 组合包发送器（FR-ECO-07，默认关）

除 Admin 保存的租户 Webhook 外，还可以用环境变量打开一条 **最小化** 出站：

| env | 作用 |
|-----|------|
| `SYNCROBRAIN_WEBHOOK_URL` + `SYNCROBRAIN_WEBHOOK_SECRET` | 两者都有才投递 `syncrobrain-incident-hint.v1`（HMAC 与租户 Webhook 相同）。只有 URL 没有 secret = 未配置 |
| 回执 | 只接受 `incidentRef`；**不会**把告警改成 ack/resolved |

`care.*` / `face.*` 以及带 `care` 上下文的家庭跌倒 **不出站**。载荷不含 RTSP、关键帧、人脸模板。这仍 **不是** SyncroBrain 生产联调；对端 Inbox 由 SyncroBrain 拥有。
