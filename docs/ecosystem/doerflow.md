# 接入 DoerFlow（可选）

VistaCast 是 **视觉事件平台**，不是远程调试（远程桌面见 VistaRemote）。

FR-ECO-05 是 **M4 可选**实验室适配器：`DOERFLOW_ENABLED` 默认关闭。不阻塞 M3，也不是 M4 Nexus 关门项。

## 做什么

1. 租户策略命中（`minSeverity` + 非零预算）的 `alert.v1` 转为 CloudEvents `com.vistacast.alert.v1`，POST 到 DoerFlow `/api/v1/integrations/events`。幂等键是告警 id。
2. 作为供应方注册 `productCode=vistacast` 的 HTTP Skill；买家付款后收到 `com.doerflow.trading.job.invoke`。
3. 接收签名 lifecycle 回调；**不会**自动 ack / resolve 告警。

## 不交换的数据

原始视频、人脸模板 / embedding、RTSP / ONVIF 凭据。敏感字段会被拒绝。CloudEvent `data` 为 **summary-only**（`vistacastAlertEventDataSchema` / `buildDoerflowAlertEventData`），**不**携带 clipKind / HoldMs / JPEG；2.0.52：单测证明 AlertEvent 带这些字段时仍 summary-only。元数据 Cloud Sync 仍走 Webhook / MQTT / `/v1/events` / Notify。

## Offering

| offeringCode | 生产 | 说明 |
| :--- | :--- | :--- |
| `alert-evidence.v1` | 仅当有证据 hash 且 kind 非 lab-only | 最小化摘要 + hash |
| `footfall-report.v1` | 仅当确有客流行 | 计数摘要 |
| `face.stranger` / staff / fall / smoke | **lab / 拒绝生产** | stub 不得宣称生产 |

HMAC 头：`X-DoerFlow-Signature: sha256=…`（原始 body）。配置见 `server/.env.example`。
