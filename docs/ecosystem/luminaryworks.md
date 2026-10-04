# LuminaryWorks 生态

VistaCast 是 [启明工坊 LuminaryWorks](https://luminaryworks.dev) 六产品之一的 **「视」**。

## 价值链

```text
学 BlockyEdu → 连 SyncroBrain → 看 DataLuminary → 视 VistaCast → 控 VistaRemote → 赚 DoerFlow
```

## 兄弟产品集成

| 产品 | 官网 | 场景 | 里程碑 |
|------|------|------|:------:|
| [LuminaryWorks](https://luminaryworks.dev) | [luminaryworks.dev](https://luminaryworks.dev) | 生态编排、统一身份 | — |
| [DataLuminary](https://dataluminary.dev) | [dataluminary.dev](https://dataluminary.dev) | 告警/客流大屏 | M2–M4 |
| [SyncroBrain](https://syncrobrain.com) | [syncrobrain.com](https://syncrobrain.com) | 设备台账、Incident、Scene Kernel | M2 |
| [VistaRemote](https://remote.vistacast.dev) | [remote.vistacast.dev](https://remote.vistacast.dev) | 告警后远程介入 | M4 |
| [DoerFlow](https://doerflow.dev) | [doerflow.dev](https://doerflow.dev) | 视觉事件 → 任务/Job（**可选**） | **M4 可选** |
| [BlockyEdu](https://blockyedu.com) | [blockyedu.com](https://blockyedu.com) | 安防实训 | M2 |

告警/客流 JSON 拉取（FR-ECO-01）见 [DataLuminary 接入](/ecosystem/dataluminary)。不需要 DL 账号。DataTalk 模板仍是 M4。签名 Webhook 进 SyncroBrain Inbox 是生产入口；本机 MQTT 出站仍是可选兼容总线，不是 ThingsBoard 遥测。见 [接入 SyncroBrain](/ecosystem/syncrobrain) 与 [告警出站](/guide/outbound)。

DoerFlow（FR-ECO-05）是 **可选实验室适配器**，默认关闭：只发最小化 `com.vistacast.alert.v1`，不含原始视频 / 人脸模板 / RTSP 凭据；回调 **不会** 自动确认或关闭告警。`face.stranger` / staff / fall / smoke 与 stub **不是**生产能力。详见 [接入 DoerFlow](/ecosystem/doerflow)。

**smart-site 组合包**（FR-ECO-07）默认全关：SyncroBrain HMAC hint、VistaRemote `sourceRef` 深链（OpenAPI `$ref` cameras/alerts remote-intervention；lab 大纲；**不是**真实 VistaRemote / session / TURN）、DataLuminary 拉取 CORS。见 [接入 SyncroBrain](/ecosystem/syncrobrain) · [与 VistaRemote](/ecosystem/vistaremote) · [DataLuminary 接入](/ecosystem/dataluminary)。手册：[deployment-composition](https://github.com/VistaCast/vistacast/blob/main/spec/deployment-composition.md) §6。

## 共享基础设施

| 仓库 | 用途 |
|------|------|
| [LuminaryWorks/identity](https://github.com/LuminaryWorks/identity) | Logto OIDC（Admin 已接 Headless 统一登录） |
| [LuminaryWorks/shared](https://github.com/LuminaryWorks/shared) | `@luminaryworks/auth-core` / `@luminaryworks/auth-react` |

## AI 边界

- **产品内**：ONVIF/RTSP、`ai` Edge Runtime / ONNX、告警规则、P2P 信令。实时视觉不走 LLM。
- **可选后期**：告警叙事经 [LuminaryWorks AI 平台](https://docs.luminaryworks.dev/develop/ai-platform)。
- M1 可独立商用，不依赖兄弟产品 API。

## 组合叙事

| 套餐 | 一句话 |
|------|--------|
| 视 + 看 | 摄像头告警与客流，DataLuminary 一屏决策 |
| 视 + 控 | AI 发现异常，VistaRemote 一键介入 |
| 连 + 视 + 看 | SyncroBrain 管设备，VistaCast 管视频 AI |

生态 spec：[LuminaryWorks/spec/products/vistacast.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistacast.md)
