# 定位与愿景

**Slogan EN**：AI Visual Autopilot  
**Slogan CN**：把线下空间变成可编程的视觉数据流

## 一句话定位

**视觉事件平台** — 兼容已有 ONVIF/RTSP 摄像头，边缘检测、事件驱动；第一商业版面向门店与仓储，平台预留 OEM / 家庭看护。不做远程桌面，不做默认全量云录像。

## 双轨

| 产品线 | 买家 | 第一商业版 |
|--------|------|:----------:|
| **Enterprise** | 连锁、仓储、工厂、集成商 | 是（M1） |
| **Embedded / Guardian** | 摄像头品牌、家属、居家运营商 | 否（M3 白牌须商务门闩；P0 为非生产试点） |

## 愿景

让每一个摄像头都成为可编程的视觉传感器，自动产出安全、运营与（后期）看护事件。

## 产品边界

| 范围内 | 范围外 |
|--------|--------|
| ONVIF/RTSP 接入与管理 | 远程桌面（→ VistaRemote） |
| 边缘 AI 检测与规则告警 | 全量录像长期托管 |
| 客流 / 安防事件 API | 通用 BI（→ DataLuminary） |
| P2P 按需预览 | 无人审核自动拨打 120 |
| OEM 事件契约（后期） | 自研模组量产（M5 按需） |

## 差异化

| 维度 | VistaCast |
|------|-----------|
| 接入 | 兼容存量 ONVIF/RTSP |
| 数据 | 事件优先，非录像机替代 |
| 预览 | P2P 直连，TURN 回退，服务器不默认转发视频 |
| 部署 | 开源可私有化，Docker 自建 |
| 生态 | LuminaryWorks「视」；后期可嵌入中小摄像头品牌 |

## 受众

- 连锁零售运营（客流）
- 仓储安保（入侵、离线）
- 工厂 EHS（M2）
- IT 集成商
- 摄像头 OEM（M3，有合同后；P0 试点见 [Guardian 试点](/guide/guardian)，**不是**白牌）

完整战略：[spec/strategic-analysis.md](https://github.com/VistaCast/vistacast/blob/main/spec/strategic-analysis.md)。
