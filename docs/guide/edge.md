# 边缘节点身份（FR-EDG-05）

Admin **Edge** 页登记 Runtime：`GET/POST /v1/edge-nodes`，`PATCH/DELETE /v1/edge-nodes/:id`。

创建时 **token 只返回一次**。Runtime 可配 `EDGE_NODE_TOKEN`（请求头 `x-edge-node-token`）。集群 `INTERNAL_TOKEN` **仍然需要**（Compose 默认路径、预览信令）。

`PATCH` 可改 `name`（1–80）。可改完整 `capabilities`（`footfall` / `intrusion` / `fall`；不可含 `face`）。可改绑或清空 `cameraId`（`null` 解绑）。同一摄像头不能同时绑两个节点。

`DELETE /v1/edge-nodes/:id` 删除节点库存。**不**删摄像头、**不**删 OTA 包。旧 token 失效。operator 不可删。

## 能力位

`footfall` / `intrusion` / `fall`，缺省 `true / true / false`。Admin 表可开关这三位。这是租户侧 **inventory allow-list**，**不是** 已加载真模型的证明，也 **不会** 远程关掉 Runtime 推理。能力位 **不含** `face`。

## 签名模型包（FR-EDG-04）

Admin 在同一 Edge 页登记 `GET/POST /v1/ota/packages`，并把节点 `desiredPackageId` PATCH 到该包。传 `desiredPackageId: null` **解绑**（响应省略该字段）。公开字段是库存元数据：`manifest`、`algorithm=ed25519`、可选 `artifactUrl`、`createdAt`。列表 **可省略 signature**；`GET /v1/ota/packages/:id` 可带 signature 供审计。**绝不回私钥**。

`DELETE /v1/ota/packages/:id` 删除库存并解绑引用该包的节点（`desiredPackageId=null`）。**不**删除 `artifactUrl` 上的制品文件。operator 不可删。

`PATCH /v1/ota/packages/:id` 只改 `artifactUrl`（`null` 清除）。不可改 manifest / signature。operator 不可 edit。

签名输入固定为 `manifest.checksumSha256` 规范化为小写 hex 后的 UTF-8 字节。Runtime 用 `OTA_ED25519_PUBLIC_KEY` 验签；checksum 或 load 失败则回滚到旧模型目录，期间继续发 footfall/intrusion。

这是 **库存 + 分配 + Runtime 验签/回滚契约**，**不是** TPM、固件刷写、生产 CA/PKI 或密钥轮换。

## 固件平面（FR-EDG-06）

模型包仍是 `GET/POST /v1/ota/packages` 与 `GET /internal/v1/ota/desired`。

固件包是 **另一张表、另一条路径**：`GET/POST /v1/ota/firmware`、`GET /internal/v1/ota/firmware/desired`。节点 `desiredFirmwarePackageId` 只指向固件包。Runtime 把制品写到 `data/firmware/`，**不执行、不刷 ROM**。混用模型 manifest → `OTA_PLANE_MISMATCH`。

SoC 问卷：`POST /v1/oem/soc-intake/validate`。Class A 复用现有 Node Runtime；B/C 拒绝启动；D 须 `p2pAdapterId=lab-jpeg`（实验室 JPEG **不是**真实 NAT）。

## 诚实边界

| 项 | 状态 |
|----|:----:|
| 节点密钥 hash 落库、列表不回读 | ✅ |
| 可选绑定摄像头；节点 token 调内部 API 时校验租户/摄像头 | ✅ |
| 节点 PATCH `cameraId: null` 解绑；同摄不可两节点 | ✅ |
| 节点 PATCH `name`（1–80） | ✅ |
| 节点 PATCH 完整 `capabilities`（不可含 `face`；非远程关推理） | ✅ |
| 删除节点（不删摄像头 / OTA 包；operator 不可删） | ✅ |
| 签名模型包库存 + Ed25519 验签 + 回滚契约（FR-EDG-04） | ✅ |
| 删除 OTA 库存并解绑节点（不删制品文件） | ✅ |
| 节点 PATCH `desiredPackageId: null` 主动解绑 | ✅ |
| OTA 包 PATCH `artifactUrl`（可 null 清除；不可改签名） | ✅ |
| TPM / mTLS / 设备证书 / 固件刷写 / 生产 PKI | ❌ |
| 双平面库存（模型 vs 固件 desired） | ✅ 固件暂存不是刷 ROM |
| `lab-jpeg` adapter | ✅ 不是真实 NAT |
| camera ↔ SyncroBrain device 字段（FR-ECO-03） | 见 [接入 SyncroBrain](/ecosystem/syncrobrain) |
