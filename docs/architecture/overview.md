# 架构概览

**原则：控制面上云；推理按拓扑落在伴随窗口、常驻边缘或付费第三方云桥。server/web 永不加载权重。场景包并行，一个 EventEngine。**

```text
┌─────────────────────────────────────────────────────────────────┐
│  Admin Web — 站点 / 家庭试点 / 摄像头 / 规则 / 客流报表 / P2P 预览  │
├─────────────────────────────────────────────────────────────────┤
│  VistaCast API（NestJS + Fastify）— 控制面                        │
│  · REST：站点、摄像头、规则、告警、客流、Webhook、审计、生态导出、边缘节点     │
│  · REST（M3 P0）：家庭、联系人、同意、看护事件、OEM 激活/计量（非生产） │
│  · WebSocket：事件                                                 │
│  · WebRTC 信令：SDP/ICE（不转发 RTP）                              │
├─────────────────────────────────────────────────────────────────┤
│  AI Edge Runtime（ai 仓）— RTSP 拉流 → 本机 stub/ONNX 或按量第三方云桥 → 事件 / 按需预览发送   │
│  · 看护只发检测候选，不得升级                                      │
│  · 云桥不是自建 GPU、不是已售 SKU；server/web 永不加载权重           │
│  · ToC 窗口 YOLO/Chat：client-infer WASM（非 server/web、非云 GPU） │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL                                                       │
├─────────────────────────────────────────────────────────────────┤
│  第三方摄像头（ONVIF / RTSP / RTMP / HLS / SRT / WHIP / GB28181）                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 模块

| 模块 | 职责 |
|------|------|
| `sites` / `cameras` | 站点、ONVIF、健康；摄像头可 PATCH 名称/RTSP（不可改站点）；可删除（级联规则/告警/客流，解绑边缘节点） |
| `households` / `consents` / `care` / `oem` | M3 P0 独立家庭、同意 fail-closed、30–60s 确认（缺省 45）、OEM 激活；**不是** site；非生产。见 [Guardian 试点](/guide/guardian) |
| `signaling` | P2P 信令与 TURN 凭证 |
| `rules` / `alerts` | 规则（可 PATCH / 删除）、去重、Webhook（可 PATCH）、通知渠道（可 PATCH）、可选 MQTT 出站、确认/误报/Resolve、同摄 AND/OR |
| `audit` | 登录 / 规则创建、更新与删除 / 告警导出日志（admin 只读） |
| `analytics` | 客流快照 |
| `runtime`（ai） | 推理、Outbox、预览发送端；可选 `EDGE_NODE_TOKEN` |

## 事件数据流

```text
RTSP → ai Runtime → Outbox → API evaluate() → AlertEvent
    → PostgreSQL / WebSocket / Webhook / 可选 MQTT
```

预览：浏览器 ↔ Runtime（P2P-first，TURN 回退），不经 API 转发媒体。ICE 用自建 STUN + UDP/TCP TURN，不用 Google STUN。单节点 Compose 见 [Docker](/guide/docker)。现场三条路径（门店盒子 / 无客户端推流 / 定制机）见 [接入路径](/guide/deployment-modes)。**前期不承诺平台 24/7**（盒子自运维；可承诺仅已售定制模组或付费云监控）。出站示例见 [告警出站](/guide/outbound)。详情见 [ICE / TURN](/guide/ice-turn)。

跨产品只交换版本化 **AlertEvent / FootfallSnapshot / DeviceHealth**。

## 技术栈

| 层 | 选型 |
|----|------|
| API | NestJS + Fastify + TypeORM |
| 数据库 | PostgreSQL |
| 预览 | WebRTC + STUN/TURN |
| 推理 | `ai`（RTSP）+ `client-infer` 窗口 WASM；云端视觉 LLM 延期；[混合推理](/guide/hybrid-infer) |
| 前端 | Rsbuild + React + Zustand |
| 认证 | LuminaryWorks Logto OIDC（Headless）；本地账号为回退 |

完整 spec：[`spec/architecture.md`](https://github.com/VistaCast/vistacast/blob/main/spec/architecture.md)
