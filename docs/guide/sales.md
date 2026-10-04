# 销售一页纸（私有化 Enterprise）

给客户现场演示用。不是 Guardian 商用关闭声明。

## 现在能卖什么

**VistaCast M1 Horizon（Enterprise）**：已有 ONVIF/RTSP 摄像头 → 私有化 Docker → 客流、区域入侵、离线告警、Admin、按需 P2P 预览。

运营可手工开通合同与云识别次数（软运营）；中央收银可接线。**单价空白 = 未售**，见 [空白报价单](/guide/quote-sheet) · [试点演示](/guide/pilot-demo)。

| 能演示 | 必须口头说明 |
| :--- | :--- |
| 单节点 Compose，约 30 分钟起栈 | 检测默认 stub，不是生产准确率 |
| Admin 规则 / 告警 / 客流小时快照 | 预览默认可选 JPEG DataChannel 或 H264 WebRTC；都走 P2P/TURN，不是 API 转封装 |
| 私有化 overlay：回环绑定、禁演示摄像头、备份脚本、TLS 示例 | 不是 K8s 托管盘 |
| 租户品牌 overlay（名称 / Logo URL / 主色） | 不是商店白牌 App，不是推送证书 |
| thin TypeScript 客户端仓 | 不是已发布 npm / 不是 C 端 SDK |
| 门店盒子一键脚本 + Electron/RN 窗口 YOLO/Chat | `ai` 仍跑 RTSP；窗口 WASM 不是云 GPU、不是 NPU、不是商店 App、不是生产准确率 |

三条平面与云桥口径见 [混合推理](/guide/hybrid-infer)。Android 认证下限见 [设备矩阵](/guide/device-matrix)（**未**真机测）。

**不承诺 24/7 值班**（除非合同写明已售定制摄像头或付费云监控）。门店盒子通电可以一直跑检测，那是客户自运维，不是 VistaCast SLA。只装 App **不等于** 有人值班。不是「YOLO 摄像头」；卖的是事件与 Runtime。默认不做全流大模型理解。


## 还不是

- 家庭看护 / OEM 激活计量：**非生产试点**，lab/fixture `krEligible=false`
- 已售 Cloud Bridge / 自建 GPU / 「无端无盒全云检测」
- **平台 24/7 值班**（未售定制模组 / 未售云监控）
- 真机 NAT 首帧、刷 ROM、已付 OEM NRE
- App Store / TestFlight / APNs / FCM
- 生产 tag `vistacast-v0.3.0`（M1 的 `v0.1.0` 仅创始人确认后打）

## 建议下一步

1. 用客户摄像头跑 M1 私有化试点（客流 / 入侵 / 离线）。
2. 需要品牌皮肤：Admin Branding，官方 Logo 仍属 VistaCast。
3. Guardian / OEM 量产另开商务门闩，不把本页写成已关闭。
