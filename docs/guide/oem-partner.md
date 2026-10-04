# OEM 伙伴（非白牌）

设备 **claim**、家庭成员、SoC 问卷校验、lab P2P adapter、固件/模型双平面已进入控制面。这 **不是** 白牌 App/SDK（FR-OEM-02），**不是** 已付 NRE，**不是** 真机 NAT 首帧或刷 ROM。

| 已编码 | 仍须人类轨道 |
| :--- | :--- |
| Admin 创建激活（secret 一次） | 付款 / 样机 |
| `POST /v1/oem/devices/claim`（无 JWT） | 真实 NAT 首帧（lab JPEG 不算） |
| claim 成功铸造一次 edge-node token | 目标板固件回滚 / RMA |
| `POST /v1/oem/soc-intake/validate` | 品牌、域名、APNs/FCM、商店 |
| 节点 `p2pAdapterId=lab-jpeg`（仅实验室） | 厂商私有 P2P SDK（NRE 冻结新 id） |
| `GET/POST /v1/ota/firmware` 与模型包分平面 | 把固件暂存当成刷 ROM |

问卷与阶段：[oem-commercial-firmware-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/oem-commercial-firmware-playbook.md)。看护试点见 [Guardian 试点](/guide/guardian)。ICE 见 [ICE / TURN](/guide/ice-turn)。双平面见 [边缘节点](/guide/edge)。多协议进流与 ESP32 套件见 [多协议进流](/guide/camera-ingest)、[ESP32 公开套件](/guide/esp32-kits)。定制整机规格：[定制摄像头模组](/guide/camera-module)（量产 M5 未立项）。现场无盒子时：[三条接入路径](/guide/deployment-modes) B。

lab / fixture / stub 计量 **永远** `krEligible=false`。

Capability API（FR-OEM-07）`GET /v1/oem/capabilities` 与 `GET /v1/oem/activations/{id}/capabilities` 已提供 lab 目录（OpenAPI 大纲已 `$ref`）。不必先做白牌 App。`cloudBridgeOffered` / `krEligible` 恒 `false`。激活库存与幂等计量（FR-OEM-01）`GET/POST /v1/oem/activations`、GET/revoke 与 `GET/POST /v1/oem/metering` 同为 lab 大纲（secret 仅 201；**不是**已售 SKU / **不是** NRE）。见 [oem-capability-api.md](https://github.com/VistaCast/vistacast/blob/main/spec/oem-capability-api.md)。云桥 **不是** 已售 SKU。
