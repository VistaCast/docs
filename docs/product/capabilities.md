# 能力矩阵

> FR ID 详见 [`spec/product-roadmap.md`](https://github.com/VistaCast/vistacast/blob/main/spec/product-roadmap.md)。下表是 **产品承诺范围**。当前代码是切片 MVP：ONVIF 为 L1、检测为 stub、预览为 JPEG DataChannel 与按需 H264 WebRTC（FR-RTC-08；2.0.60：`@vistacast/sdk` `createPreviewSession` 对齐 `CreatePreviewSessionRequest` body，shared 拒绝非 jpeg/webrtc；2.0.61：Admin preview 页 POST `{ previewMode }`；2.0.62：server `resolveSessionPreviewMode` 默认 jpeg；Admin URL `parsePreviewModeQuery` 默认 webrtc（除非 `mode=jpeg`）；2.0.63：`ai` PreviewController ready omit → jpeg；`notifyRuntimeNeed` 有值则带 jpeg、undefined 则 omit；Admin 仍 POST 显式 `previewMode`（URL 默认 webrtc ≠ server/ai omit→jpeg）；2.0.64：`ai` 忽略非法 ready.previewMode（mp4/vod/junk）→ jpeg；shared `reportPreviewPathRequestSchema` 锁定 `p2p`/`turn`/`failed`（+ optional firstFrameMs）；Admin `resolveIcePath` remote relay → turn；2.0.65：`SDK_CORE_SURFACE` + `@vistacast/sdk` `reportPreviewPath` → `POST .../sessions/:id/path`；Admin peer ICE failed → `flushTelemetry("failed")`；shared `signalingOutboundSchema` 严格拒绝非法 ready.previewMode（`ai` 仍先 strip 再 parse 见 2.0.64）——preview path telemetry / 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK；2.0.66：`p2pSessionSchema` 锁定 `path: failed`（+ previewMode/firstFrameMs 单测）；`SDK_CORE_SURFACE` hangup；sdk `hangupPreviewSession`；Admin peer POST hangup 源码锁定；OpenAPI `POST .../path` requestBody；2.0.67：hangup WS 停 runtime sender；REST hangup 设 `endedAt`；path POST 分离；OpenAPI create body + hangup `endedAt` honesty——hangup/path telemetry / 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK）。就绪度见 [实现状态](/engineering/implementation-status)。

## 按里程碑

| 能力 | M1 第一商业版 | M2 | M3 OEM/看护 |
|------|:-------------:|:--:|:-----------:|
| ONVIF 发现与注册 | ✅ | | |
| 摄像头健康 / 离线 | ✅ | | |
| 客流统计 | ✅ | 日/周/月 | |
| 区域入侵 | ✅ | | |
| 本地 ONNX / Edge Runtime | ✅ | 可选 HTTP 远程（非 F1） | |
| P2P 预览 + TURN | ✅ | | |
| 基础规则 + 去重 + Webhook | ✅ | 分级 + AND/OR + 可选 MQTT | |
| 告警/客流 REST 导出 | | ✅ | |
| 审计日志（登录 / 改规则 / 导出） | | ✅ 含 `rule.update` / `rule.delete` | |
| 告警确认 / 误报 / 关闭 | ✅ | | |
| 陌生人脸 | | ✅ 库存+stub，默认关 | |
| 员工离岗/玩手机 | | ✅ 默认关+stub，非生产监管 | |
| 工厂异常（跌倒/打架/烟雾） | | ✅ kind+stub + 评测脚手架 + Admin 可选危险区，非 F1 | |
| 家庭 / 级联 / OEM 激活（非白牌） | | | ✅ P0 非生产试点 |
| 白牌 App / SDK | | | 商务门闩 |
| 跨摄像头 Re-ID | | | M4 |

## AI 边界

- **产品内**：ONVIF/RTSP、`ai` 仓端侧 / ONNX、告警规则。实时 CV 不走 LLM。三条平面见 [混合推理](/guide/hybrid-infer)。
- **可选后期**：告警叙事经 [LuminaryWorks AI 平台](https://docs.luminaryworks.dev/develop/ai-platform)。
- 家庭看护与自动急救 **不是** M1 能力。M3 P0 见 [Guardian 试点](/guide/guardian)：系统 **禁止** 自动拨打 120，也 **禁止** 提供健康诊断。
- 窗口 WASM **不是** NPU。Android 下限见 [设备矩阵](/guide/device-matrix)（未测）。Cloud Bridge **不是** 已售 SKU。
- **前期不承诺 24/7 值班**：只装 App / 免费信令不算值班。盒子通电可自运维。可承诺 24/7 的仅已售定制模组或付费云监控（均未售）。见 [接入路径](/guide/deployment-modes)。
- 检测默认 **YOLO + 跟踪 + 姿态 + 规则**（规格目标），不是全流上云问大模型。现网 `ai` 是 lab stub（track / stub pose / `STUB_BEHAVIOR` / extras.zoneInside（质心在多边形内占用；server 仅 === true 拷贝；Admin tag；**不是** zoneEnter 边沿、**不是** loiteringHint、**不是**新 AlertKind、**不是** 60 分钟 SLA） / extras.loiteringHint（须 zoneInside 区内占用；`BEHAVIOR_LOITER_SEC` 默认 0=帧路径，`>0` per-track `loiterSince` wall-clock（静止+inZone），**不是** 60 分钟 SLA；`STUB_LOITER` 未改） / extras.loiterHoldMs（墙钟发出时整数 1–3600000，loiteringHint 且 `BEHAVIOR_LOITER_SEC>0`；默认 0=帧路径则 **omit**；`STUB_LOITER` 仍 **omit**；3600000 是 extras 上限，**不是** 60 分钟生产 SLA、**不是** extra= flag、**不是** CSV 列、**不是** clip 闸门本身——loiteringHint 已可 clip、**不是**新 AlertKind） / occupied / vacant（`BEHAVIOR_VACANT_SEC` 默认 0=vacantFrames，`>0` empty-episode wall-clock，**不是** 24/7） / extras.vacantHoldMs（墙钟发出时整数 1–3600000，vacant 且 `BEHAVIOR_VACANT_SEC>0`；默认 0=vacantFrames 路径则 **omit**；`STUB_VACANT` 仍 **omit**；3600000 是 extras 上限，**不是** 24/7 无人 SLA、**不是** extra= flag、**不是** CSV 列、**不是** clip 闸门本身——vacant 已可 clip、**不是**新 AlertKind） / entered / left / nightActivityHint（可选 NIGHT_TZ；`NIGHT_HOLD_SEC` 默认 0=即时 hint，`>0` per-track `nightSince`；`STUB_NIGHT` 仍即时，**不是** F1 / **不是** 24/7） / extras.nightHoldMs（墙钟发出时整数 1–3600000，nightActivityHint 且 `NIGHT_HOLD_SEC>0`；默认 0=即时 hint 则 **omit**；`STUB_NIGHT` 仍 **omit**；**不是** 夜间 F1 / **不是** 24/7 / **不是** extra= / **不是** CSV / **不是** clip 闸门本身——nightActivityHint 已可 clip） / personCount（整数 0–32，0=vacant；`countPersons` 场景占用，**不是**人群模型；Admin 计数 tag；控制面无视频字节；personCount / occupied / zoneInside 仍不开 clip；extras.clipScreenshot 会开 clip（lab fixture 复核，不是 F1 eval）） / petHint / childZoneHint / childAloneHint / childNearObjectHint / personAloneHint（`BEHAVIOR_ALONE_FRAMES` 默认 0=关；`BEHAVIOR_ALONE_SEC` 默认 0=该帧路径，`>0` wall-clock；几何恰好一人 N 帧，**不是**儿童检测器；`STUB_CHILD_ALONE` 未改） / extras.aloneHoldMs（墙钟发出时整数 1–3600000，personAloneHint 且 `BEHAVIOR_ALONE_SEC>0`；默认 0=aloneFrames 路径/关则 **omit**；3600000 是 extras 上限，**不是** 60 分钟独处 SLA、**不是**儿童检测器、**不是** extra= flag、**不是** CSV 列、**不是** clip 闸门本身——personAloneHint 已可 clip、**不是**新 AlertKind） / nearObjectHint（`NEAR_OBJECT_DIST` 默认 0=关；几何质心距 unknown/vehicle bbox，**不是**危险物品检测器；`STUB_CHILD_NEAR_OBJECT` 未改）；`BEHAVIOR_SITTING_SEC` / `BEHAVIOR_LYING_SEC` 默认 0=帧路径，`>0` 为 per-track wall-clock、不受 HISTORY_CAP=60 帧限制，**不是** 60 分钟 SLA（墙钟发出时 extras.sittingHoldMs / lyingHoldMs 整数 1–3600000；默认 0=帧路径则 **omit**；3600000 是 extras 上限以便 SEC=3600 可出现 60 min 墙钟，**不是** 60 分钟生产 SLA、**不是** extra= flag、**不是** CSV 列、**不是** clip 闸门本身、**不是**新 AlertKind）；`BEHAVIOR_STILL_SEC` 默认 0=帧路径 `no_movement`，`>0` 为 per-track `stillSince` wall-clock、不受 HISTORY_CAP=60 帧限制，**不是**无活动 SLA（墙钟发出时 extras.stillHoldMs 1–3600000；默认 0 **omit**）；`BEHAVIOR_FALL_HOLD_SEC` 默认 0=2 帧 poseFallHint，**无** extras.fallHoldMs；`>0` 且 poseFallHint 时 extras.fallHoldMs 整数 1–60000（墙钟自 per-track fallSince），**不是** anomaly=fall、**不是** 10s 生产 SLA、**不是**自动 120、**不是** extra= flag、**不是** CSV 列、**不是** F1），Admin 仅当 payload flag 严格 true 出 tag；`sitting_long` / `lying_long` / `no_movement` 为 Admin i18n lab 标签（**不是** F1），**不是**生产 F1、**不是**儿童/宠物检测器、**不是**宠物 YOLO class、**不是**儿童独处生产、**不是**危险物品检测器、**不是**人群分析、**不是** 24/7、**不是**自动 120、**不是** NPU。事件短片默认关（lab Event Engine 仍 JPEG ring / 末帧截图，**不是** muxed MP4 / **不是** 5–15s 编码短视频上传 / **不是** 30 天云端点播/Admin 视频播放器；clip sidecar `kind: "jpeg_ring" | "jpeg_screenshot"`（2.0.44）；`extras.clipKind` 同枚举（lab clip 附着 stamp；控制面拷贝；Admin Tag；元数据 Cloud Sync，**不是** VOD 字节上传；clipKind alone **不是** clip 闸门；**不是** extra=；**不是** CSV）；lab fixture `clip-jpeg-ring.json` 供人工复核 ≠ F1；opt-in `clipRef`/`lab://` 短文本，无播放器；`CLIP_SCREENSHOT` 默认 false，true 且 CLIP_ENABLED false 时仅末帧 `{id}.jpg` + clipRef，**无**编号 ring，**不是** MP4 / **不是** 5–15s 编码视频 / **不是** 30 天点播；CLIP_ENABLED 仍写编号 JPEG ring + 末帧 jpg；`CLIP_SECONDS` 默认 0=CLIP_RING_SIZE，5–15≈JPEG ring 槽位，**不是** MP4 / **不是**编码视频 / **不是** 30 天点播 / **不得**写成 `CLIP_SECONDS*1000` extras；CLIP_ENABLED 亦可挂 personAloneHint / nearObjectHint，仍是 JPEG ring 或末帧截图；lab 落盘可带 `extras.clipJpegCount` 1–32（编号 ring 长度，不是截图 flag）与 `extras.clipDurationMs` 1–60000（JPEG ring 墙钟 last−first `occurredAt`；CLIP_ENABLED 写 ≥2 帧才设；sidecar 可重复 durationMs；CLIP_SCREENSHOT-only 不设；**不是** CLIP_SECONDS*1000、**不是** muxed MP4、**不是** 5–15s 编码视频、**不是** extra= flag）与 `extras.clipScreenshot=true`（末帧 jpg 已写；Admin tag），控制面不存原始字节、**无**播放器）。GET `/v1/alerts` 与 CSV export 可选 lab query `extra`=一个 allowlist 布尔（含 `zoneInside` / `clipScreenshot`）；未知 extra 400；JSONB payload 含 `{extra: true}`；**不是**单页客户端过滤；CSV **无** extras 列（2.0.50：单测确认仍无 clipKind / HoldMs / clipRef / payload extras；2.0.51：shared 查询 schema 显式拒绝 extra=HoldMs/clipKind/clipRef）；整数 extras（clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs）**不**进 extra=；字符串 `clipKind`（jpeg_ring|jpeg_screenshot）是 payload 字段，**不是** extra=、**不是** CSV 列。居家包 `hasEvalSet` 仍 false（2.0.61：shared/ai 显式单测锁定；packs ≠ F1）；`ai/src/infer/fixtures/` 为 DetectionIngest 复核（**不是** F1 eval）；fixtures 可选含 `*HoldMs` 及 `*-hold-ms-only.json`（loiter/night/vacant/alone；2.0.50 另含 lying/still/fall）供人工复核（≠ F1；HoldMs alone **不是** clip 闸门；HoldMs 仍 2.0.39–2.0.43；2.0.53：`webhook-drill-sample.json` 镜像 drill extras，≠ F1，**不是** clip 闸门；2.0.55：`ai` 单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；2.0.58：map/ingest 保留 `extras.drill`（lab metadata mirror；**不是** clip 闸门）；2.0.59：`sanitizeCareExtras` **保留** lab `drill`，**剥离** `call_120` / stage / escalate；server detection payload 拷贝 **从不**镜像 care escalation / auto-120 extras（与 drill 并存时仅 allowlist）；Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器——lab webhook drill metadata + Event Engine tags only，**不是** auto-120 / **不是** care 生产 / **不是** MP4/VOD；Event Engine 仍 JPEG；`hasEvalSet` 仍 false）。生产 YOLO 不留在 JS。场景包（门店/仓储/居家）并行写规格，不是多个产品。

## 平台基础

- 多租户与站点
- LuminaryWorks 统一登录（Logto Headless）；本地账号为无 IdP 回退
- P2P 按需预览（WebRTC 信令；FR-RTC-08 jpeg/webrtc；2.0.60：sdk `createPreviewSession` body 对齐；2.0.61：Admin preview 页 POST `{ previewMode }`；2.0.62：`resolveSessionPreviewMode` 默认 jpeg；`parsePreviewModeQuery` 默认 webrtc（除非 `mode=jpeg`）；2.0.63：ready omit → jpeg；`notifyRuntimeNeed` 有值带 jpeg / undefined omit；Admin 仍 POST 显式 `previewMode`；2.0.64：非法 ready.previewMode → jpeg；`reportPreviewPathRequestSchema` 锁定 `p2p`/`turn`/`failed`；`resolveIcePath` remote relay → turn；2.0.65：`SDK_CORE_SURFACE` + sdk `reportPreviewPath` → `POST .../path`；peer ICE failed → `flushTelemetry("failed")`；`signalingOutboundSchema` 严格拒绝非法 ready.previewMode（`ai` 仍 strip 见 2.0.64）——path telemetry / 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK；2.0.66：`p2pSessionSchema` 锁定 `path: failed`；sdk `hangupPreviewSession`；Admin peer POST hangup 源码锁定；OpenAPI path requestBody；2.0.67：hangup WS 停 runtime sender；REST hangup 设 `endedAt`；path POST 分离；OpenAPI create body + hangup `endedAt` honesty——hangup/path telemetry **不是** Event Engine / **不是** VOD；**不是**商店 SDK）
- Docker Compose 私有化
- 审计日志（登录、规则创建/更新/删除、告警/客流导出；admin 只读）
- 告警/客流 REST 导出（`/v1/export/*`；无 DataLuminary 账号也可拉；2.0.51：JSON sanitize 保留 clipKind/*HoldMs/clipScreenshot，剥离 clipRef/care/jpeg-ish/credential；非 VOD；2.0.56：另保留 lab `payload.drill`，仍剥离 clipRef/care/media-shaped——lab webhook drill / sample metadata only，非生产指标 / 非 MP4/VOD / 非 care）

## AI 检测（M1）

- 客流计数（过线）
- 时段客流快照
- 区域入侵
- 可插拔本地 Provider；可选 HTTP 远程适配（准确率取决于对接方，非生产 F1）

## 规则与告警

- 时段 + 区域 + 检测类型
- 同摄扁平 AND/OR（无嵌套、无跨摄）
- 去重 / 冷却
- Webhook 出站（HMAC；可按最低级别分流；可 PATCH URL/级别，省略 secret 则保留；2.0.52：`POST /v1/webhooks/:id/test` drill 含 lab sample `clipKind`（+ optional HoldMs）元数据 Cloud Sync 校验——非 bytes/VOD/生产事件；2.0.53：Admin Webhooks UI `drillHint` 文档化 `clipKind` / `sittingHoldMs`；2.0.54：`drill` 入 allowlist，Admin `extra=drill` + Tag；2.0.55：`alertExtraContainment("drill")` SQL/json_extract 单测——lab sample metadata only，非生产指标 / 非 MP4/VOD / 非 care；2.0.62：单测证明 Webhook **仍**投递 care+drill——对比 MQTT 跳过；webhook 可带 care，MQTT 永不）
- MQTT 出站（可选；本机 Mosquitto 可收 `alert.v1`；SyncroBrain 生产入口是签名 Webhook；2.0.53：单测证明 drill-shaped alerts 保留 clipKind/sittingHoldMs；2.0.60：care **仍**跳过，即便 payload 另有 lab `drill`——care 永不 MQTT；lab drill 仅 care 缺席；2.0.61：EventsHub 可推 care+drill，MQTT **仍**跳过 care；2.0.62：Webhook 可投 care+drill，MQTT **仍**跳过 care——Webhook/EventsHub ≠ MQTT care 策略）— 示例见 [告警出站](/guide/outbound) · [接入 SyncroBrain](/ecosystem/syncrobrain)
- 邮件 / 企微 / 钉钉渠道（可配模板；可 PATCH，不可改 type；钉钉省略 secret 则保留；SMTP 空则邮件 no-op；群机器人，非 ESP SLA；lab 可选模板占位 clipRef / clipKind / behavior / clipJpegCount / clipDurationMs / sittingHoldMs / lyingHoldMs / stillHoldMs / fallHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs / drill / missedFeedHint / overdueHint——Event Engine **提醒**元数据，**不是**通知内嵌视频 / **不是** raw JPEG 字节；2.0.49：dispatcher 测试覆盖 remaining HoldMs + clipKind 插值；2.0.51：email subject/body + DingTalk 模板插值 HoldMs/clipKind；2.0.57：`{{drill}}`（`payload.drill === true` → `"true"`）；Admin Notify hint 文档化 `drill`；2.0.58：email subject/body + DingTalk 插值 `{{drill}}`（与企微 parity）；2.0.82：`{{missedFeedHint}}` / `{{overdueHint}}`（email/WeCom/DingTalk；`payload.* === true` → `"true"`）——lab STUB_FEED / webhook drill / 提醒 metadata only，非生产指标 / 非 MP4/VOD / 非 care / 非新 AlertKind / 非 CSV extras 列 / 非 DoerFlow schema 扩展；Webhook/MQTT/`/v1/events` Cloud Sync 同为 AlertEvent 元数据 JSON（非 bytes/MP4/VOD）；DoerFlow `data` 仍 summary-only，**不**带 clipKind/HoldMs/JPEG/drill（2.0.50：schema 显式拒绝 clipKind/HoldMs/clipRef；未扩展；2.0.52：`buildDoerflowAlertEventData` 单测证明 AlertEvent 带这些字段时仍 summary-only；2.0.57：drill-shaped 仍丢弃；2.0.58：schema **显式拒绝** drill；DoerFlow **不是** Event Engine extras 平面）；Admin Notify 页文档化）
- 确认、误报与 Resolve
- 规则可编辑（PATCH，不可改摄像头/类型；写审计 `rule.update`）
- 规则可删除（写审计 `rule.delete`）
- 人脸名单库存（默认关；可 PATCH label/list/note/photoRef；stub；非生产识别 / 非照片字节）— [人脸名单](/guide/face)
- 员工离岗/玩手机（默认关；stub；非生产监管）— [员工行为](/guide/staff)

## 管理台（M1）

- 仪表盘：在线、告警、客流；工厂 kind 今日计数（stub，不是 F1）
- 摄像头列表（可改名称/RTSP/ONVIF，不可改站点；不回读 ONVIF 密码；可绑定/解绑 SyncroBrain device id；管理员可删除，级联规则/告警/客流；列表含站点与 lastHeartbeatAt）
- 实时事件流（`/v1/events` 元数据 Cloud Sync；2.0.49：客户端解析测试保留 clipKind/HoldMs；2.0.53：EventsHub 单测保留 drill-shaped clipKind/sittingHoldMs；2.0.55：Admin live events 解析保留 `payload.drill`；2.0.61：EventsHub 单测证明 care+drill 上 live stream（对比 MQTT 仍跳过 care；Admin WS ≠ MQTT care 策略）；非 bytes/MP4/VOD）
- 告警历史（state/kind/site/camera/from/to + CSV；lab 可选 `extra` 筛一个 allowlist 布尔 payload flag，含 `zoneInside` / `clipScreenshot` / `drill` / `missedFeedHint` / `overdueHint`；未知 extra 400；**不是**单页客户端过滤；CSV **无** extras 列（2.0.50：单测确认仍无 clipKind / HoldMs / clipRef / payload extras；2.0.51：shared 查询 schema 显式拒绝 extra=HoldMs/clipKind/clipRef；2.0.52：web 测试确认 Admin Alerts `extra=` filter options **从不**含 HoldMs/clipKind；2.0.54：`drill` 入 allowlist；Admin `extra=drill` + Tag（`payload.drill === true`）；server 拷贝；2.0.55：`alertExtraContainment("drill")` SQL/json_extract 单测；2.0.56：Admin CSV 仍九列（`drill` **不**成 CSV 列，仅 `extra=drill`）；list/export 选中筛选时带 `extra=drill`；2.0.59：server **从不**镜像 care escalation / auto-120 extras；Admin drill + Event Engine clip/HoldMs tags **无**播放器——lab webhook drill only，非 auto-120 / 非 care 生产 / 非 MP4/VOD / 非生产指标；2.0.82：Admin `extra=missedFeedHint` / `extra=overdueHint` + Tag；CSV 仍九列）；整数 extras（clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs）**不**进 extra=；字符串 `clipKind`（jpeg_ring|jpeg_screenshot）是 payload 字段，**不是** extra=、**不是** CSV 列；Event Engine tags（含 clipKind / drill / HoldMs）仅为元数据 Cloud Sync，**无**播放器；2.0.59 锁定）
- 规则编辑器（工厂 kind 可画可选危险区；可编辑/删除）
- Webhook 端点（出站 `alert.v1`；可编辑/删除；列表不含 secret；2.0.52：test-delivery drill 含 lab sample clipKind/+HoldMs 元数据；2.0.53：Admin UI 文档化；2.0.54：`extra=drill` allowlist + Tag；2.0.55：SQL/json_extract 单测 + live `payload.drill` 保留）
- 通知渠道（邮件/企微/钉钉；可编辑；不可改 type；列表不含钉钉 secret；Admin Notify 文档化 lab 模板占位 clipRef / clipKind / behavior / clip* / *HoldMs（含 loiter/night/vacant/alone）/ drill / missedFeedHint / overdueHint——仅元数据提醒，**无**视频附件；2.0.51：email subject/body + DingTalk 插值已测；2.0.57：`{{drill}}`（`payload.drill === true` → `"true"`）；2.0.58：email/DingTalk 与企微 parity 插值 `{{drill}}`；2.0.82：`{{missedFeedHint}}` / `{{overdueHint}}`；出站 Cloud Sync 亦为元数据 JSON）
- 人脸名单（可编辑 label/list/note/photoRef；空 note / photoRef 清除；Remove 仅 delete + 二次确认；非生产识别 / 非照片字节）
- 边缘节点与 OTA 包库存（节点可改名、开关能力位；可改 artifactUrl；可删包并解绑节点；节点可清空 desired package / 绑定或解绑摄像头；管理员可删节点，不删摄像头；不删制品文件；非 TPM；能力位不是远程关推理）
- 按需预览播放器
- Household / Consent / Care 确认 / OEM 激活试点页（非生产；见 [Guardian 试点](/guide/guardian)）
