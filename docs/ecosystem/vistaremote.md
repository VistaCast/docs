# 与 VistaRemote 的关系

VistaCast 与 VistaRemote **并存**，品牌、组织、代码仓完全分离。

## 对比

| 维度 | VistaCast 视界云遥 | VistaRemote 视界远程 |
|------|-------------------|---------------------|
| 生态角色 | **视** — 固定摄像头 AI | **控** — 远程桌面人工触达 |
| 输入 | ONVIF/RTSP 摄像头 | WebRTC **远程桌面** |
| 价值 | AI 告警、客流、防盗 | 人工操作、录制审计 |
| 域名 | vistacast.dev | — |
| 状态 | Spec 1.1，M1 可编码 | ✅ 已有开源实现 |
| 组织 | [VistaCast](https://github.com/VistaCast) | [VistaRemote](https://github.com/VistaRemote) |

## 为何并存

- **不同输入**：固定摄像头 vs 远程桌面屏幕
- **不同合规叙事**：安防/运营 vs IT/工控运维
- **不同 TAM**：安全资产类 SaaS vs 效率类远程协助

## 可选组合（M4 / FR-ECO-07）

```text
VistaCast 告警事件 → 深链 sourceRef → VistaRemote 远程会话 → 人工确认/处置
```

VistaCast 只生成标识：`GET /v1/alerts/:id/remote-intervention` 与 `GET /v1/cameras/:id/remote-intervention`（OpenAPI `$ref` RemoteInterventionDeepLink + 401/403/404；alerts twin 另 400 SMART_SITE_SENSITIVE_REJECTED；lab 大纲；默认关）。`VISTAREMOTE_DEEP_LINK_BASE` 为空则 404（Admin 不显示死链）。深链 **不含** RTSP、preview grant、TURN 凭据；VistaCast **不**创建、代理或计费 VistaRemote 会话。AuthN/AuthZ 仍由 VistaRemote 自己做。

`care` / `face` 告警拒绝出深链。

## 注意事项

- 请勿将 VistaRemote 远程桌面仓当作 VistaCast 实现
- VistaCast 的 WebRTC **仅用于摄像头 P2P 预览信令**，不做远程桌面会话
- VistaRemote 不做固定摄像头 ONVIF AI 分析

[VistaRemote 文档](https://github.com/VistaRemote/vibeCode) · [VistaCast MetaRepo](https://github.com/VistaCast/vistacast)
