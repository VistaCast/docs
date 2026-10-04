# 单节点 Docker

M1 默认拓扑：一台机器上跑 PostgreSQL、API、Admin、AI Runtime。coturn 在 Compose profile `turn` 中；模拟摄像头在 profile `rtsp`（MediaMTX `testsrc`）。二者都不是默认 `up` 的前置。

详细步骤与限制见 Meta 仓内 [`deploy/README.md`](https://github.com/VistaCast/deploy)（本地路径 `deploy/README.md`）。

私有化上线（回环绑定、env 门闩、备份、TLS 示例）见 [私有化上线](/guide/go-live)。组合主机（与中央 ai-platform 同机）用 `docker-compose.control-plane.yml` + `--profile ingress`，默认 Caddyfile 是 `deploy/caddy/Caddyfile.example`。overlay 规范见 [deployment-composition](https://github.com/VistaCast/vistacast/blob/main/spec/deployment-composition.md)。门店 Mac / 迷你主机一键起栈见 [门店盒子 / 家庭壳](/guide/store-box)。销售口径见 [销售一页纸](/guide/sales)。

```bash
cd deploy
cp .env.example .env
docker compose up --build
# optional TURN: docker compose --profile turn up -d
# optional simulated RTSP (path /demo): docker compose --profile rtsp up -d
# optional ingest gateway (RTMP/HLS/WebRTC/SRT); lavfi RTMP uses /demo-rtmp:
#   docker compose --profile ingest up -d
# Do not publish two lab streams to the same MediaMTX path.
# optional GB/T 28181 (ZLMediaKit SIP): docker compose --profile gb28181 up -d
# optional Mosquitto: docker compose --profile mqtt up -d
```

| 检查 | 地址 |
|------|------|
| API `/health` | http://127.0.0.1:13100/health |
| Admin | http://localhost:13101（与 DataView 相同，用 `localhost` 打开） |
| 登录 | LuminaryWorks 统一账号（先 `cd LuminaryWorks && pnpm id:up`）。成功路径与 DataView 相同：同源 `/oidc/` → `/auth/callback`。JWT 过期会弹出 AuthGate 重登。不要停在 `localhost:3001/oidc/auth/...` 或无端口的 `http://127.0.0.1/oidc/...`。本地账密仅开发开关 `PUBLIC_ALLOW_LOCAL_LOGIN=true` |

## 诚实边界

- **模拟 RTSP** 用 Compose profile `rtsp`（MediaMTX `testsrc`），不是物理枪机。profile `ingest` 打开同一 MediaMTX 的 RTMP/HLS/WHIP/SRT；profile `gb28181` 为 ZLM SIP 收流。`ai` 仍用 ffmpeg 抽关键帧，检测仍是 stub。厂商 App 私有 P2P 不支持。
- **TURN** 在 Compose profile `turn` 中。未设 `TURN_REST_SECRET` 时用开发静态凭证；设 secret 后同一服务走 HMAC REST（FR-ICE-04 共享模块）。ICE 为 P2P-first（FR-RTC-07）：自建 STUN、TURN UDP+TCP，**不要**填 Google STUN。不是付费云 SFU。Docker Desktop 上中继可能失败，见 README 的 `TURN_EXTERNAL_IP`。Hub 拉 `coturn/coturn` 可能 EOF，故默认 `up` 不启动 coturn。见 [ICE / TURN](/guide/ice-turn)。
- **预览** 为 DataChannel JPEG 或 H264 WebRTC（FR-RTC-08）；媒体不经 API 转发。Compose 网内可用 `deploy/scripts/lab-preview-viewer.mjs`（`FORCE_TURN=turn:coturn:3478`）验 JPEG + hangup 停发；**不是**本机 Chrome 必过项。
- **检测** 默认 StubProvider，不是生产准确率。`STUB_ANOMALY=fall,smoke` 可发出工厂异常 kind 桩，**不是** F1。可选 `INFER_PLANE=cloud_third_party` + `REMOTE_INFER_URL`（HTTP JSON，候选帧/小时上限 + 控制面 429 切断，非托管 GPU、非已售 Cloud Bridge、非 F1）；`INFER_PLANE=edge`（默认）不打云 URL。平面口径见 [混合推理](/guide/hybrid-infer)。`STUB_WALK=true` 时框在过线两侧振荡，可让小时客流 > 0 以及全天禁区 `intrusion`，**不是**真人走动/进入。夜间禁区为 UTC 22:00–06:00，下一检测周期生效。
- **Webhook / 误报 / 租户隔离**：可用 Compose 网内 catcher、`POST .../false-positive`、另插 Tenant B 用户验收；见 playbook §6。
- **Webhook / MQTT 出站**：HMAC Webhook 与可选 MQTT 见 [告警出站](/guide/outbound)。`docker compose --profile mqtt up -d` 起本机 Mosquitto（宿主机 **1884**）。`MQTT_URL` 为空则 API 不出站。**不是** TB 遥测。接入 SyncroBrain 见 [接入 SyncroBrain](/ecosystem/syncrobrain)。
- **无默认云录像**。人脸见 [人脸名单](/guide/face)（默认关、stub、非生产识别）。跌倒/烟雾仅 stub kind，**不是** F1，**禁止**自动拨打 120。工厂评测脚手架见 [工厂评测](/guide/eval)。M3 家庭/OEM 试点见 [Guardian 试点](/guide/guardian)（care simulator 默认关；fixture `krEligible=false`）。邮件需 `SMTP_URL`；企微/钉钉为群机器人，见 [告警出站](/guide/outbound)。边缘节点、模型包与固件平面见 [边缘节点](/guide/edge)（非 TPM、固件暂存不是刷 ROM、`lab-jpeg` 不是真机 NAT）。
