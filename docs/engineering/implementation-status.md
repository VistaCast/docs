# VistaCast 实现状态矩阵

| Metadata | Value |
| :--- | :--- |
| **文档 ID** | `SPEC-STATUS-001` |
| **版本** | 2.0.143 |
| **最后更新** | 2026-09-20 |
| **关联** | [product-roadmap.md](./product-roadmap.md) · [m3-6-hybrid-infer-playbook.md](./m3-6-hybrid-infer-playbook.md) · [m3-guardian-playbook.md](./m3-guardian-playbook.md) · [m3-9-cloud-bridge-billing-playbook.md](./m3-9-cloud-bridge-billing-playbook.md) · [m3-10-store-tag-playbook.md](./m3-10-store-tag-playbook.md) · [ROADMAP.md](../ROADMAP.md) |

> **诚实原则**：未开始 = ⬜；进行中 = 🟡；完成 = ✅；阻塞 = 🔴

---

## 1. 里程碑状态

| 里程碑 | 状态 | 说明 |
| :---: | :---: | :--- |
| D0 Blueprint | ✅ | 2026-08-31 战略 1.1；**2026-09-02 战略 1.2 确认**（三条平面 / 第三方云桥）。**不**勾 M1/M2/M3 生产 tag |
| M1 Horizon 第一商业版 | 🟡 | playbook 切片 + §6 本机 lab 已勾选；**未**打 `vistacast-v0.1.0`（stub / 非物理枪机 / 非 Chrome） |
| M2 Sentinel | 🟡 | 必须切片 1–9 已关闭；P1 切片 10–16 与评测脚手架已做；F1 真集与 OEM 意向未勾；**未**打 `vistacast-v0.2.0` |
| M3 Embedded | 🟡 | P0–M3.5 已编码。**M3.6 切片 0–5 已关**（契约 + `ai` 选路 + server 计量切断 + 设备矩阵口径 + Capability HTTP）。OEM NRE / 真机 NAT / 商店上架 / 自建 GPU / NPU / tag **仍阻塞**；**未**打 `vistacast-v0.3.0` |
| M3.7 Ingest kits | 🟡 | FR-PLT-10 多协议 + FR-OEM-08 ESP32 套件（kit-a lab JPEG POST；kit-b RTSP / kit-c RTMP / kit-d MediaMTX 再发布抽一帧复用同一路径；`FRAME_INGEST_ENABLED` 默认关）；国标/WHIP 经网关（**不是** ffmpeg 直拉 WHIP / **不是** ffmpeg 拉 SIP / **不是** Nest SIP）；2.0.103：HLS :8888 / SRT :8890 lab 从 MediaMTX ingest 抽一帧复用 kit-a POST（SRT 需 libsrt ffmpeg；默认关）；2.0.97：GB28181 lab 从 ZLM 再发布抽一帧复用 kit-a POST（默认关）；**禁止**厂商 App P2P；**不是**生产 F1 / **不是** FR-PLT-16 |
| M3.8 Native NNAPI | 🟡 | 切片 2–3：具名 SHIM + 诚实报告；**不是**真机 NNAPI；矩阵 **未**勾 |
| M3.9 Cloud Bridge SKU | 🟡 | 切片 1–4：SKU + 套餐/entitlement/租约 + Stripe webhook 形状；单价 0；**未**宣布已售；空 webhook secret = 503 |
| M3.11 Commerce ops | 🟡 | FR-BIL-04/05/06：ops 合同+审计；中央 commerce 收银台 UI；云识别次数钱包。**未**宣布已售；`livePsp` false |
| M3.12 Soft ops ready | 🟡 | 切片 0–5 已关：OpenAPI ops/commerce/credits；pnpm accept:commerce-ops；SCN-04～08 e2e；运营/试点 docs。可演示 ≠ 已售；krEligible false |
| M3.10 商店 / tag | 🟡 | 切片 1–4 脚手架；**禁止** Agent 提交或打 tag |
| M4 Nexus | 🟡 | **切片 0–7 已关**（DataTalk 模板字段对齐导出；`reId` 可透传但不是数据集列）。`pnpm accept:m4`。**不是**托管数据集 / **不是**生产 Re-ID / **不是**已售 |
| M4.1 PCB AOI | 🟡 | 场景包 `pcb.aoi` + CPU ROI。焊点头为公开集抽样 ONNX（DsPCBSD+、PKU、Soldering-Data / V3、SolDef_AI 等；图集在 LuminaryFixtures，客户只带 KB 权重）。阈值可在场景包页用表单调整。识别主机是 Apple Silicon（公开 ONNX 可走 Core ML）或 Intel/AMD 台式机。**Intel Mac 始终不是识别主机**。`pnpm accept:pcb-aoi`。**不是**独立产品 / **不是** OpenVINO IR / **不是**客户板 F1 / **不是**已售 |
| M5 Module | ⬜ | 规格先行（FR-MOD-* / FR-PLT-16）；2 家 ODM 前不立项量产 |

---

## 2. 文档 / Spec 交付

| 交付物 | 状态 | 路径 |
| :--- | :---: | :--- |
| 战略分析 1.1 | ✅ | [strategic-analysis.md](./strategic-analysis.md) |
| 产品定位 1.1 | ✅ | [product-positioning.md](./product-positioning.md) |
| 产品路线图 1.1 | ✅ | [product-roadmap.md](./product-roadmap.md) |
| M1 实现手册 | ✅ | [m1-commercial-playbook.md](./m1-commercial-playbook.md) |
| M2 实现手册 | ✅ | [m2-sentinel-playbook.md](./m2-sentinel-playbook.md)（必须切片 1–9 关闭；P1 10–16 已做；切片 17–40 评测脚手架 + 客户确认推迟 + Admin CRUD 增量 + API/页面验收；F1 真集仍 ⬜） |
| M3 实现手册 | ✅ | [m3-guardian-playbook.md](./m3-guardian-playbook.md) + M3.1–M3.5；商店 App / 云端视觉 LLM（延期） / 生产 tag 仍 ⬜ |
| 客户确认清单 | ⬜ | [customer-confirmation.md](./customer-confirmation.md) — 与客户一并现场勾选；**不得**用来勾 F1 / 误报率 |
| SDD / Artifacts | ✅ | [spec-driven-development-spec.md](./spec-driven-development-spec.md) |
| 架构 1.1 | ✅ | [architecture.md](./architecture.md) |
| 生态角色 | ✅ | [luminaryworks-ecosystem.md](./luminaryworks-ecosystem.md) |
| 事件 schema | ✅ | `artifacts/events/*.schema.json`（M3：`alert.v1` 可选 `care`；旧事件兼容） |
| API 大纲 | 🟡 | `artifacts/contracts/api/openapi-m1.yaml` + M3 household/care/OEM + M3.1 claim/members + M3.2 firmware/SoC + M3.3 public branding + M3.6 cloud-bridge 预占/用量 + **FR-ECO-05 DoerFlow（默认关）**；2.0.130：DEF-03 OpenAPI `$ref` GET|PUT /v1/integrations/doerflow/policy + GET offerings + POST providers + POST invoke/callbacks HMAC + GET /v1/events WS 101 + GET /internal/v1/ota/desired + GET /internal/v1/ota/firmware/desired + POST /internal/v1/cloud-bridge/calls + GET /internal/v1/cameras/{cameraId}/infer-lease + GET /internal/v1/cameras/{cameraId}/geometry + POST /internal/v1/detections|health 请求体（lab 大纲；非全量 components；summary-only 仍拒绝 clipKind/HoldMs/clipRef/drill/feed hints；**不是** SDK / **不是**生产 inbox / **不是** ROM/TPM / **不是**已售 CB/收银台 / **不是** GetStreamUri；clips/presign 跳过）；2.0.126：DEF-03 OpenAPI `SsoLoginRequest` + firmware PATCH|DELETE `$ref`（lab 大纲；**不是** IdP/ROM）；2.0.122：DEF-03 OpenAPI `$ref` GET|PUT /v1/cameras/{id}/infer-policy + GET /v1/cameras/{id}/infer-lease + GET /v1/cameras/{id}/cloud-bridge（FR-AI-09、FR-OPS-02、FR-AI-10/12；lab 大纲；非全量 components；JWT；**不是**已售 Cloud Bridge SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** HMAC `/internal/v1/cloud-bridge/calls` / **不是** SDK wrap）；2.0.121：DEF-03 OpenAPI `$ref` GET /v1/sites/{id} + GET /v1/rules/{id}（Site/Rule；404 SITE_NOT_FOUND/RULE_NOT_FOUND；lab 大纲）；2.0.119：DEF-03 OpenAPI `$ref` `/v1/billing/plans|entitlement|usage|readiness` + `PUT /v1/billing/contract` + `POST /v1/billing/stripe/webhook`（FR-BIL-01/02/03、FR-AI-12、FR-PLT-15；lab 大纲；非全量 components；HMAC Stripe；空 secret 503；单价 0；**不是**已售 SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** SDK wrap）；2.0.115：DEF-03 OpenAPI `$ref` `GET /v1/cameras/{id}/remote-intervention` + `GET /v1/alerts/{id}/remote-intervention`（FR-ECO-07；lab 大纲；非全量 components；默认关；**不是**真实 VistaRemote / session / TURN / GetStreamUri / WHEP / VOD / billing）；2.0.112：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint（lab 投递审计筛选；Alerts extra= leftover-6 cluster parity；**不是** HoldMs/clipKind / **不是**儿童宠物检测器）；2.0.111：DEF-03 OpenAPI `$ref` `POST /v1/webhooks/{id}/test` + `POST /v1/webhooks/snapshot-ingest`（FR-RUL-04、FR-AI-11；lab 大纲；非全量 components；HMAC ingest **不是** public SDK / **不是** FR-PLT-16 / **不是** multipart / GetStreamUri / WHEP / VOD / billing）；2.0.107：DEF-03 OpenAPI `$ref` `/v1/oem/activations*` + `/v1/oem/metering` + `GET /v1/oem/activations/{id}/capabilities`（FR-OEM-01、FR-OEM-07；lab 大纲；非全量 components；**不是**已售 SKU / NRE / 白牌 / GetStreamUri / WHEP / VOD / billing）；2.0.108：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 loiteringHint/poseFallHint/nightActivityHint（lab 投递审计筛选；Alerts extra= loiter/fall/night cluster parity；**不是** HoldMs/clipKind）；2.0.106：DEF-03 OpenAPI `$ref` `/v1/households*` + `/v1/care-incidents*`（FR-CAR-01/02/03、FR-PRV-04；lab 大纲；非全量 components；**不是** care F1 / auto-120 / ops queue / GetStreamUri / WHEP / VOD / billing）；2.0.104：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 occupied/vacant/entered/left（lab 投递审计筛选；Alerts extra= occupancy cluster parity；**不是** HoldMs/clipKind）；2.0.101：DEF-03 OpenAPI `$ref` `/v1/ota/firmware` + `POST /v1/oem/devices/claim` + `POST /v1/oem/soc-intake/validate` + `GET /v1/oem/capabilities`（lab 大纲；非全量 components；**不是**刷 ROM / TPM / 白牌 / 已售云桥 / GetStreamUri / WHEP / VOD / billing）；2.0.98：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 zoneInside/clipScreenshot（lab 投递审计筛选；Alerts extra= parity；**不是** HoldMs/clipKind）；2.0.98：DEF-03 OpenAPI `$ref` Face CRUD + Edge-nodes + OTA packages + `GET/PATCH /v1/tenants/me` + `GET /v1/analytics/footfall`（lab 大纲；非全量 components；**不是** embedding / TPM / 照片字节 / 零售精度 / GetStreamUri / WHEP / VOD / billing）；2.0.96：DEF-03 OpenAPI `$ref` probe/discover + export JSON + users/site-grants + audit-logs（lab 大纲；非全量 components；**不是** GetStreamUri / **不是** WHEP / **不是** VOD）；2.0.93：DEF-03 OpenAPI `$ref` Notify CRUD + alerts export/ack/FP/resolve（lab 大纲；非全量 components）；2.0.87：OpenAPI apply `$ref` 对齐 shared `applyScenarioPack*`（cameraId + applyNotify 默认 false）+ deliveries GET 401/403；2.0.85：OpenAPI `POST /v1/scenario-packs/{id}/apply`；2.0.84：DEF-03 Rules CRUD + Sites + `GET /v1/scenario-packs` `$ref`；2.0.76：DEF-03 Webhook CRUD/deliveries + Camera list/create/patch + Alert list `$ref`（FrameIngest 复用已有 schema）；2.0.73：FR-AI-11 lab JPEG ingest 路径 + `FrameIngestRequest`/`FrameIngestAccepted` $ref；2.0.70：`components.schemas` 已部分填充（Error / health/ready/version / preview / branding），其余路径仍为大纲、未全量 $ref |
| Rspress 文档站 | ✅ | `docs/` 源码已对齐 M2 出站 + M3 Guardian + M3.6 混合推理口径；公开站仅 **GitHub Pages**（[docs.vistacast.dev](https://docs.vistacast.dev)），推 Meta 后 CI |
| MetaRepo 脚手架 | ✅ | `.meta/`、`tooling/`、`pnpm run init` / `bootstrap` |
| 摄像头兼容矩阵 | 🟡 | [camera-compatibility.md](./camera-compatibility.md) + [camera-source.md](./camera-source.md)；ESP32 见 `hardware/esp32/` |
| ONVIF L1 spec | ✅ | [onvif-l1.md](./onvif-l1.md) |
| AI Runtime L1 spec | ✅ | [ai-runtime-l1.md](./ai-runtime-l1.md) |
| LuminaryWorks 产品页同步 | ✅ | [LuminaryWorks/spec/products/vistacast.md](https://github.com/LuminaryWorks/LuminaryWorks/blob/main/spec/products/vistacast.md) |

---

## 3. 代码仓状态

| 模块 | 仓库 | 状态 | 备注 |
| :--- | :--- | :---: | :--- |
| MetaRepo | `vistacast` | ✅ | spec + docs + artifacts + `pnpm accept:m3`；2.0.131：Admin remote-intervention 深链仅 200 展示（404/400 隐藏；**不是**真实 VistaRemote）；2.0.130：DEF-03 OpenAPI `$ref` DoerFlow + events WS + internal OTA/CB/geometry/detections；2.0.129：Notify `{{personCount}}`（0–32；**不是** extra=/HoldMs/clipKind/CSV/新 AlertKind）；2.0.128：firmware PATCH|DELETE；2.0.127：JWT infer placement；2.0.126：loginSso；2.0.125：health/ready/version；2.0.124：billing JWT wrap；2.0.123：purgeSiteEvents + remote-intervention GETs；2.0.122：DEF-03 OpenAPI `$ref` GET|PUT cameras infer-policy + GET infer-lease + GET cloud-bridge（lab 大纲；JWT；**不是**已售 Cloud Bridge SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** HMAC `/internal/v1/cloud-bridge/calls` / **不是** SDK wrap）；2.0.119：DEF-03 OpenAPI `$ref` billing cluster plans/entitlement/usage/readiness/contract/stripe webhook（lab 大纲；HMAC；空 secret 503；单价 0；**不是**已售 SKU / **不是**收银台 / **不是**中央 Entitlement 授权）；2.0.115：DEF-03 OpenAPI `$ref` cameras/alerts remote-intervention（lab 大纲；默认关；**不是**真实 VistaRemote / session / TURN）；2.0.112：FR-RUL-04 OpenAPI deliveries extra=childZoneHint\|petHint\|childAloneHint\|childNearObjectHint\|personAloneHint\|nearObjectHint lab 审计筛选（Alerts extra= leftover-6 cluster parity；仍含 loiteringHint/poseFallHint/nightActivityHint/occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint；**不是** HoldMs/clipKind / **不是** SLA / **不是**儿童宠物检测器）；2.0.111：DEF-03 OpenAPI `$ref` webhook test + snapshot-ingest（lab 大纲；HMAC **不是** public SDK / **不是** FR-PLT-16 / **不是** multipart）；2.0.107：DEF-03 OpenAPI `$ref` oem/activations + metering + activation capabilities（lab 大纲；**不是**已售 SKU / NRE / 白牌）；2.0.108：FR-RUL-04 OpenAPI deliveries extra=loiteringHint\|poseFallHint\|nightActivityHint lab 审计筛选（Alerts extra= loiter/fall/night cluster parity；仍含 occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint；**不是** HoldMs/clipKind / **不是** SLA）；2.0.106：DEF-03 OpenAPI `$ref` households + care-incidents（lab 大纲；**不是** care F1 / auto-120 / ops queue）；2.0.104：FR-RUL-04 OpenAPI deliveries extra=occupied\|vacant\|entered\|left lab 审计筛选（Alerts extra= occupancy cluster parity；仍含 zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint；**不是** HoldMs/clipKind / **不是** SLA）；2.0.103：FR-PLT-10 / FR-AI-11 HLS/SRT lab curl（MediaMTX :8888/:8890 → ffmpeg 一帧 → kit-a POST；SRT 需 libsrt ffmpeg；默认关；**不是** FR-PLT-16 / **不是** WHIP 产品 / **不是** Nest SIP）；2.0.101：DEF-03 OpenAPI `$ref` firmware + claim + SoC validate + oem/capabilities（lab 大纲；**不是**刷 ROM / TPM / 白牌 / 已售云桥）；2.0.98：FR-RUL-04 OpenAPI deliveries extra=zoneInside\|clipScreenshot lab 审计筛选（Alerts extra= parity；仍含 drill/missedFeedHint/overdueHint；**不是** HoldMs/clipKind / **不是** SLA）；2.0.98：DEF-03 OpenAPI `$ref` Face/Edge/OTA + tenants/me + footfall（lab 大纲；**不是** embedding / TPM / 零售精度 / GetStreamUri）；2.0.97：FR-PLT-10 / FR-AI-11 GB28181 lab curl（ZLM 再发布 → ffmpeg 一帧 → kit-a POST；拒绝 ffmpeg 拉 SIP / Nest SIP；默认关；**不是** FR-PLT-16）；2.0.96：DEF-03 OpenAPI `$ref` probe/discover + export/users/audit（lab 大纲；**不是** GetStreamUri / **不是** WHEP / **不是** VOD）；2.0.95：OpenAPI deliveries extra=drill lab 审计筛选；2.0.94：FR-AI-11 快照 webhook lab curl（HMAC；默认关；**不是** SDK） |
| Docs | `docs/` | ✅ | 源码已对齐 M2 出站 + M3 Guardian + M3.6 混合推理口径；公开 Pages 待推 Meta CI（仅 GitHub Pages） |
| Artifacts | `artifacts/` | 🟡 | M1–M3.3 + M3.6 placement/bridge/pack/call/usage + companion-runtime-report + oem-capability；2.0.130：OpenAPI `$ref` DoerFlow HMAC/policy/offerings/providers + GET /v1/events WS + internal OTA desired + HMAC `/internal/v1/cloud-bridge/calls` + internal infer-lease/geometry + detections/health 请求体（仍为大纲、非全量；**不是** SDK / **不是**生产 inbox / **不是** ROM/TPM / **不是**已售 CB / **不是** GetStreamUri）；2.0.122：OpenAPI `$ref` GET|PUT `/v1/cameras/{id}/infer-policy` + GET `/v1/cameras/{id}/infer-lease` + GET `/v1/cameras/{id}/cloud-bridge`（仍为大纲、非全量；JWT；**不是**已售 Cloud Bridge SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** HMAC `/internal/v1/cloud-bridge/calls`）；2.0.119：OpenAPI `$ref` `/v1/billing/plans|entitlement|usage|readiness` + contract PUT + Stripe webhook HMAC（仍为大纲、非全量；单价 0；**不是**已售 SKU / **不是**收银台 / **不是**中央 Entitlement 授权）；2.0.115：OpenAPI `$ref` `GET /v1/cameras/{id}/remote-intervention` + `GET /v1/alerts/{id}/remote-intervention`（仍为大纲、非全量；默认关；**不是**真实 VistaRemote / session / TURN）；2.0.112：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint（lab 投递审计筛选；Alerts extra= leftover-6 cluster parity；**不是** HoldMs/clipKind / **不是**儿童宠物检测器）；2.0.111：OpenAPI `$ref` `POST /v1/webhooks/{id}/test` + `POST /v1/webhooks/snapshot-ingest`（仍为大纲、非全量；HMAC ingest **不是** public SDK / **不是** FR-PLT-16 / **不是** multipart）；2.0.107：OpenAPI `$ref` `/v1/oem/activations*` + `/v1/oem/metering` + `GET /v1/oem/activations/{id}/capabilities`（仍为大纲、非全量；**不是**已售 SKU / NRE / 白牌）；2.0.108：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 loiteringHint/poseFallHint/nightActivityHint（lab 投递审计筛选；Alerts extra= loiter/fall/night cluster parity；**不是** HoldMs/clipKind）；2.0.106：OpenAPI `$ref` `/v1/households*` + `/v1/care-incidents*`（仍为大纲、非全量；**不是** care F1 / auto-120 / ops queue）；2.0.104：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 occupied/vacant/entered/left（lab 投递审计筛选；Alerts extra= occupancy cluster parity；**不是** HoldMs/clipKind）；2.0.101：OpenAPI `$ref` `/v1/ota/firmware` + claim + soc-intake/validate + oem/capabilities（仍为大纲、非全量；**不是**刷 ROM / TPM / 白牌 / 已售云桥）；2.0.98：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 zoneInside/clipScreenshot（lab 投递审计筛选；Alerts extra= parity；**不是** HoldMs/clipKind）；2.0.98：OpenAPI `$ref` Face CRUD + Edge-nodes + OTA packages + tenants/me + analytics/footfall（仍为大纲、非全量；**不是** embedding / TPM / 照片字节 / 零售精度 / GetStreamUri / WHEP / VOD / billing）；2.0.96：OpenAPI `$ref` probe/discover + export JSON + users/site-grants + audit-logs（仍为大纲、非全量；**不是** GetStreamUri / **不是** WHEP / **不是** VOD）；2.0.95：OpenAPI `GET /v1/webhooks/{id}/deliveries` extra= 含 drill（lab 投递审计筛选；2.0.87 曾拒绝）；2.0.93：OpenAPI `$ref` Notify CRUD + alerts export/ack/FP/resolve（仍为大纲、非全量）；2.0.87：OpenAPI apply `$ref` 对齐 shared（cameraId + applyNotify；rules/webhooks）+ `GET /v1/webhooks/{id}/deliveries` 401/403（仍为大纲、非全量）；2.0.85：OpenAPI `POST /v1/scenario-packs/{id}/apply`（显式 cameraId；applyNotify 默认关）；2.0.84：OpenAPI `$ref` Rules CRUD + Sites + `GET /v1/scenario-packs`（仍为大纲、非全量）；2.0.83：home/habitat/care 填入 lab `ruleTemplates`/`notifyTemplates`（复用既有 kind；数组仍可选；**不是**新 CNN / **不是** F1）；2.0.77：`scenario-pack.v1` 可选 `ruleTemplates`/`notifyTemplates`（鱼塘夜间 intrusion 日程；**不是**新 CNN / **不是** F1）；2.0.76：OpenAPI `$ref` Webhook CRUD/deliveries + Camera list/create/patch + Alert list（复用 FrameIngestRequest/Accepted；仍为大纲、非全量）；2.0.73：`frame-ingest.v1` / `frame-ingest-accepted.v1` lab JPEG 推帧（默认关；非 FR-PLT-16 / 非已售云桥）；2.0.71：`scenario-pack.v1` 八门闩 lab 字段（open\|blocked\|waived\|met；精度 met 须评测集；**不是**商业关闭 / **不是** F1）；2.0.70：OpenAPI `components.schemas` 部分填充（Error/health/ready/version/preview/branding）并 $ref 数条路径——仍为大纲、非全量；2.0.66：OpenAPI `POST .../path` requestBody 文档化 `p2p`/`turn`/`failed` + optional firstFrameMs（遥测 only）；2.0.67：OpenAPI `createPreviewSession` optional body `{ previewMode?: jpeg|webrtc }` + hangup 200 `endedAt` honesty（signaling only；runtime 停发送端）——**不是** Event Engine / **不是** VOD；**不是**商店 App / 已售云桥 / NPU / VOD |
| API Server | `server` | 🟡 | M1/M2 + M3 P0 控制面 + M3.1 claim/members/HMAC ICE + M3.2 TURN 配额/firmware/SoC validate + M3.3 租户品牌 / public branding；**M3.6 云桥按帧/次预占 + 429 切断（非已售 SKU）**；**FR-BIL 套餐/租约/合同/Stripe webhook 形状**；**FR-OEM-07 lab Capability GET**；**FR-ECO-05 DoerFlow 模块默认关（非生产）**；2.0.112：webhook delivery audit 快照 childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint + deliveries?extra=（Alerts extra= leftover-6 cluster parity）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**儿童宠物检测器 / **不是**新 AlertKind；2.0.108：webhook delivery audit 快照 loiteringHint/poseFallHint/nightActivityHint + deliveries?extra=（Alerts extra= loiter/fall/night cluster parity）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA；2.0.104：webhook delivery audit 快照 occupied/vacant/entered/left + deliveries?extra=（Alerts extra= occupancy cluster parity）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA；2.0.98：webhook delivery audit 快照 zoneInside/clipScreenshot + deliveries?extra=（Alerts extra= parity）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA；2.0.95：webhook delivery audit 快照 drill + deliveries?extra=drill（lab 审计筛选）；**不是** CSV extras / **不是** SLA；2.0.91：webhook delivery audit 快照 missedFeedHint/overdueHint + deliveries?extra=；**不是** CSV extras / **不是** SLA；2.0.90：apply 覆盖 home.safety（fall + 夜间 intrusion + zone）/ care.activity（fall 复用）/ habitat.feeding（`rule.custom` fail-closed，无新 AlertKind）；**不是**自动套用 / **不是** F1 / **不是** FR-BHV-02 生产权重；2.0.85：`POST /v1/scenario-packs/:id/apply` JWT admin 显式套用 ruleTemplates（pond → intrusion + 夜间日程；applyNotify 才写 webhook；缺模板 fail-closed；**不是**自动套用 / **不是** F1）；2.0.78：`GET /v1/scenario-packs` JWT admin 只读 lab 目录（artifacts/packs；**不是** F1 / **不是**商业关闭）；2.0.73：FR-AI-11 lab JPEG ingest（internal HMAC / JWT / snapshot webhook 默认关；转发 ai 或 spool；非 FR-PLT-16 / 非已售云桥 / 非 server 权重）；2.0.52：`buildDoerflowAlertEventData` + webhook drill sample clipKind/HoldMs；2.0.53：MQTT + `/v1/events` 单测保留 drill-shaped clipKind/sittingHoldMs；2.0.89：MQTT + `/v1/events` 单测保留 missedFeedHint/overdueHint（care 仍永不 MQTT）；DoerFlow builder 仍丢弃 feed hints；2.0.54：`extras.drill === true` 经 shared allowlist 拷贝至 alert payload（lab only）；2.0.55：`alertExtraContainment("drill")` SQL/json_extract 单测覆盖 Admin `extra=drill`；2.0.57：Notify 模板可选 `{{drill}}`；DoerFlow builder 单测锁定 drill-shaped 仍丢弃 drill/clipKind/HoldMs；2.0.58：email/DingTalk 插值 `{{drill}}`（与企微 parity）；2.0.82：Notify 可选 `{{missedFeedHint}}` / `{{overdueHint}}`（email/WeCom/DingTalk；`=== true` → `"true"`；**不是**新 AlertKind / **不是** CSV extras 列 / **不是** DoerFlow schema 扩展）；2.0.114：Notify 可选 `{{childZoneHint}}` / `{{petHint}}` / `{{childAloneHint}}` / `{{childNearObjectHint}}` / `{{personAloneHint}}` / `{{nearObjectHint}}`（email/WeCom/DingTalk；`=== true` → `"true"`；**不是** CSV extras / **不是** HoldMs / **不是** SLA / **不是**新 AlertKind / **不是**儿童宠物检测器）；2.0.113：Notify 可选 `{{loiteringHint}}` / `{{poseFallHint}}` / `{{nightActivityHint}}`（email/WeCom/DingTalk；`=== true` → `"true"`；**不是** CSV extras / **不是** HoldMs / **不是** SLA）；2.0.110：Notify 可选 `{{occupied}}` / `{{vacant}}` / `{{entered}}` / `{{left}}`（email/WeCom/DingTalk；`=== true` → `"true"`；**不是** CSV extras / **不是** HoldMs / **不是** SLA）；2.0.100：Notify 可选 `{{zoneInside}}` / `{{clipScreenshot}}`（email/WeCom/DingTalk；`=== true` → `"true"`；**不是** CSV extras 列 / **不是** HoldMs / **不是** SLA）；2.0.59：detection payload 拷贝 **从不**镜像 care escalation / auto-120 extras（与 drill 并存时仅 allowlist；非 care 生产）；2.0.60：MQTT **仍**跳过 care（即便 payload 另有 lab `drill`；care 永不 MQTT；drill 仅 care 缺席）；2.0.61：EventsHub 单测证明 care+drill 上 Admin live stream（对比 MQTT 仍跳过 care；Admin WS ≠ MQTT care 策略）；2.0.62：Webhook 单测证明 **仍**投递 care+drill（对比 MQTT 跳过；Webhook/EventsHub ≠ MQTT care 策略）；`resolveSessionPreviewMode` 默认 jpeg；2.0.63：`notifyRuntimeNeed` 有值则带 jpeg/webrtc、undefined 则 omit（runtime 默认 jpeg；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.67：`toP2p` 映射锁定 `endedAt` / path telemetry 字段（REST hangup 设 `endedAt`；path POST 分离）——hangup/path **不是** Event Engine / **不是** VOD；**FR-ECO-07 smart-site 发送器默认关** |
| Admin Web | `web` | 🟡 | M1/M2 Admin + M3 P0 试点页 + **FR-UX 场景化导航 / 浅色画布 / i18n** + **计费/落点页（非收银台）**；预览 jpeg/webrtc（FR-RTC-08）；Care/OEM 仍 Pilot；2.0.112：Webhooks 展开投递行 Tag childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint + extras 筛选；Alerts CSV 仍九列；2.0.108：Webhooks 展开投递行 Tag loiteringHint/poseFallHint/nightActivityHint + extras 筛选；Alerts CSV 仍九列；2.0.104：Webhooks 展开投递行 Tag occupied/vacant/entered/left + extras 筛选；Alerts CSV 仍九列；2.0.98：Webhooks 展开投递行 Tag zoneInside/clipScreenshot + extras 筛选；Alerts CSV 仍九列；2.0.95：Webhooks 展开投递行 Tag drill + extras 筛选；Alerts CSV 仍九列；2.0.91：Webhooks 展开投递行 Tag missedFeedHint/overdueHint + extras 筛选；Alerts CSV 仍九列；2.0.85：`/#/scenario-packs` **Apply to camera** 显式套用（默认规则 only；**不是**自动套用 / **不是** F1）；2.0.78：`/#/scenario-packs` FR-VIB-01 lab 目录（八门闩 + 可选 rule/notify 模板；`hasEvalSet` false；**不是** F1 / **不是**商业关闭）；2.0.52：Alerts `extra=` filter options 单测不含 HoldMs/clipKind；2.0.53：Webhooks `drillHint` 文档化 clipKind/sittingHoldMs（单测）；2.0.54：Alerts `extra=drill` filter + Tag（`payload.drill === true`；lab webhook drill only）；2.0.82：Alerts `extra=missedFeedHint` / `extra=overdueHint` filter + Tag（`payload.* === true`；FR-SCN-02 lab STUB_FEED；**不是**新 AlertKind / **不是** CSV extras 列）；2.0.55：live events 解析保留 `payload.drill` 元数据（非 bytes/MP4/VOD）；2.0.56：list/export 筛选选中时带 `extra=drill`；CSV 仍九列（`drill` **不**成列）；2.0.57：Admin Notify hint 文档化 `{{drill}}`（lab webhook drill / 提醒 metadata only）；2.0.82：Admin Notify hint 文档化 `{{missedFeedHint}}` / `{{overdueHint}}`（lab STUB_FEED / 提醒 metadata only）；2.0.114：Admin Notify hint 文档化 `{{childZoneHint}}` / `{{petHint}}` / `{{childAloneHint}}` / `{{childNearObjectHint}}` / `{{personAloneHint}}` / `{{nearObjectHint}}`；2.0.113：Admin Notify hint 文档化 `{{loiteringHint}}` / `{{poseFallHint}}` / `{{nightActivityHint}}`；2.0.110：Admin Notify hint 文档化 `{{occupied}}` / `{{vacant}}` / `{{entered}}` / `{{left}}`；2.0.100：Admin Notify hint 文档化 `{{zoneInside}}` / `{{clipScreenshot}}`（`payload.* === true` → `"true"`；**不是** CSV extras / **不是** HoldMs / **不是** SLA）；2.0.59：Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器（非 MP4/VOD / 非 auto-120 / 非 care 生产）；2.0.61：preview 页 POST `{ previewMode }`（源码/单测锁定；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.62：`parsePreviewModeQuery` 默认 webrtc（除非 `mode=jpeg`）；2.0.63：Admin 仍 POST 显式 `previewMode`（URL 默认 webrtc ≠ server/ai omit→jpeg；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.64：`resolveIcePath` remote relay → turn（FR-RTC-05；path telemetry **不是** Event Engine / **不是** VOD）；2.0.65：peer ICE failed → `flushTelemetry("failed")`（FR-RTC-05）；2.0.66：peer hangup POST `/v1/streams/sessions/${sessionId}/hangup` 源码锁定（FR-RTC-08；hangup/path telemetry **不是** Event Engine / **不是** VOD） |
| Shared | `shared` | 🟡 | M3 P0 Zod + M3.1–M3.3 + M3.6 placement/bridge/pack/call/usage/companion-report/oem-capability + **tenant-plan/entitlement/lease**；`SDK_CORE_SURFACE` 由 `@vistacast/sdk` 包装，**不是**商店 SDK；2.0.129：Notify `NOTIFY_TEMPLATE_VARS` 含 personCount（0–32；**不是** extra=）；2.0.128：firmware PATCH|DELETE SURFACE；2.0.127：JWT infer placement；2.0.126：loginSso；2.0.125：health/ready/version；2.0.124：billing JWT；2.0.123：purgeSiteEvents + remote-intervention；2.0.121：getSite/getRule；2.0.120：GET /v1/alerts listAlerts；2.0.119：`billingReadinessSchema` 锁定 sellable/checkout false；2.0.118：`SDK_CORE_SURFACE` 含 GET|DELETE /v1/cameras/:id（`@vistacast/sdk` getCamera/deleteCamera；密码永不回读；**未** npm publish；**不是** GetStreamUri / WHEP / VOD / 商店 SDK）；2.0.117：cameras list/create/patch + Webhook CRUD+test + Rules/Sites CRUD；2.0.116：cameras list/create/patch SDK wrap；2.0.112：`webhookDeliverySchema` 可选 childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint（仅 true）；deliveries `extra=` leftover-6 + loiteringHint\|poseFallHint\|nightActivityHint\|occupied\|vacant\|entered\|left\|clipScreenshot\|zoneInside\|drill\|missedFeedHint\|overdueHint（lab 审计筛选；**不是** HoldMs/clipKind / **不是**儿童宠物检测器 / **不是**新 AlertKind）；2.0.113：`SDK_CORE_SURFACE` 含 OEM activations/metering（**未** npm publish；**不是**已售 SKU / NRE / 商店 SDK）；2.0.109：`SDK_CORE_SURFACE` 含 JWT households CRUD + cameras/contacts/consents/members + care-incidents list/get/cancel/review/close（**无** create-as-escalated；**未** npm publish；**不是** care F1 / auto-120 / ops queue / 商店 SDK）；2.0.108：`webhookDeliverySchema` 可选 loiteringHint/poseFallHint/nightActivityHint（仅 true）；deliveries `extra=` loiteringHint\|poseFallHint\|nightActivityHint\|occupied\|vacant\|entered\|left\|clipScreenshot\|zoneInside\|drill\|missedFeedHint\|overdueHint（lab 审计筛选；**不是** HoldMs/clipKind / **不是** leftover 6 flags）；2.0.104：`webhookDeliverySchema` 可选 occupied/vacant/entered/left（仅 true）；deliveries `extra=` occupied\|vacant\|entered\|left\|clipScreenshot\|zoneInside\|drill\|missedFeedHint\|overdueHint（lab 审计筛选；**不是** HoldMs/clipKind）；2.0.105：`SDK_CORE_SURFACE` 含 JWT `GET\|POST /v1/ota/firmware` + `GET /v1/ota/firmware/:id` + `POST /v1/oem/soc-intake/validate`（**未** npm publish；**不是**刷 ROM / TPM / 商店 SDK）；2.0.102：`SDK_CORE_SURFACE` 含 Face/Edge/OTA/tenants/me/footfall + Notify CRUD + alert ack/FP/resolve（**未** npm publish；**不是**商店 SDK）；2.0.99：`SDK_CORE_SURFACE` 含 probe/discover + export JSON + users/site-grants + audit-logs（**未** npm publish；**不是**商店 SDK）；2.0.98：`webhookDeliverySchema` 可选 zoneInside/clipScreenshot（仅 true）；deliveries `extra=` clipScreenshot\|zoneInside\|drill\|missedFeedHint\|overdueHint（lab 审计筛选；**不是** HoldMs/clipKind）；2.0.95：`webhookDeliverySchema` 可选 drill（仅 true）；deliveries `extra=` drill\|missedFeedHint\|overdueHint（lab 审计筛选）；2.0.91：`webhookDeliverySchema` 可选 missedFeedHint/overdueHint（仅 true）；deliveries `extra=` 仅两 flag；2.0.86：`SDK_CORE_SURFACE` 含 JWT admin `POST /v1/scenario-packs/:id/apply`（显式套用；**未** npm publish；**不是**自动套用 / **不是** F1）；2.0.85：`applyScenarioPackRequestSchema` / `applyScenarioPackResponseSchema`（cameraId 必填；applyNotify 默认 false）；2.0.83：shipped home/habitat/care 非空 rule 或 notify 模板（数组仍可选；单测锁定 parse + 诚实门闩；**不是** F1）；2.0.81：`SDK_CORE_SURFACE` 含 JWT admin `GET /v1/scenario-packs`（lab 目录；**不是** F1 / **不是**商业关闭）；2.0.77：`scenarioPackSchema` 可选 `ruleTemplates`/`notifyTemplates`（pond 夜间 intrusion；精度 met 无评测集仍拒绝；**不是** F1）；2.0.74：`SDK_CORE_SURFACE` 含 JWT `POST /v1/cameras/:id/frames` + `GET /v1/webhooks/:id/deliveries`（不含 HMAC internal ingest / snapshot-ingest）；**FR-ECO-05 DoerFlow CloudEvents 合同**；2.0.73：`frameIngestRequestSchema` / `FRAME_INGEST_*` 错误码（lab JPEG 推帧；非 FR-PLT-16 / 非已售云桥）；2.0.51：extra= 拒绝 HoldMs/clipKind/clipRef + DL sanitize 保留 lab 元数据（单测）；2.0.54：`drill` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`（lab webhook drill 元数据；非生产指标 / 非 MP4/VOD / 非 care）；2.0.56：`sanitizeSmartSiteExportAlert` **保留** lab `payload.drill`（仍剥离 clipRef/care/media-shaped；非生产指标 / 非 MP4/VOD / 非 care）；2.0.58：DoerFlow `vistacastAlertEventDataSchema` **显式拒绝** `drill`（summary-only；非 inbox extras；schema **未**扩展）；2.0.89：同 schema **显式拒绝** `missedFeedHint`/`overdueHint`（schema **未**扩展）；sanitize 保留 lab feed hints；2.0.60：`createPreviewSessionRequestSchema` **仅** jpeg/webrtc（拒绝其他 mode；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.61：shipped packs `hasEvalSet === false`（含 home-safety；显式单测锁定；packs ≠ F1）；2.0.64：`reportPreviewPathRequestSchema` 锁定 `p2p`/`turn`/`failed`（+ optional firstFrameMs；拒绝 VOD-ish path；path telemetry **不是** Event Engine / **不是** VOD）；2.0.65：`SDK_CORE_SURFACE` 含 `POST /v1/streams/sessions/:sessionId/path`；`signalingOutboundSchema` 严格拒绝非法 ready.previewMode（mp4/vod/junk；`ai` 仍先 strip 再 parse 见 2.0.64）；2.0.66：`p2pSessionSchema` 锁定 `path: failed`（+ optional previewMode/firstFrameMs 单测）；`SDK_CORE_SURFACE` 含 hangup；2.0.67：`signalingHangupSchema` 拒绝 media/path/vod extras（单测）——path telemetry / hangup 信令 **不是** Event Engine / **不是** VOD；2.0.69：habitat.feeding `hasEvalSet`/`accuracyClaimed` 仍 false（显式单测锁定；lab stub；packs ≠ F1）；2.0.79：`missedFeedHint`/`overdueHint` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`（lab STUB_FEED；非新 AlertKind / 非 F1）；2.0.71：八门闩 lab 字段已产品化（shipped packs 精度/数据 `blocked`+no eval set；**不是**商业关闭 / **不是** F1）；**不是**商店 SDK |
| AI Runtime | `ai` | 🟡 | 远程 Provider + 工厂异常 stub + `pnpm eval` 脚手架 + `STUB_FACE` + `STUB_STAFF` + OTA poll/rollback + 固件平面暂存 + **care 仅候选**；JPEG 提帧 + 按需 H264 RTP（FR-RTC-08）；**M3.6 平面选路 / 云桥限流 + 控制面预占（非已售 SKU）**；**租约闸门：edge_healthy 不调云**；桩检测非生产精度 / 非 F1 / 非看护准确率；2.0.73：FR-AI-11 lab JPEG ingest（probe HTTP 一次性 FrameSource；`FRAME_INGEST_ENABLED` 默认关；非生产）；2.0.53：fixture `webhook-drill-sample.json` 镜像 drill extras（≠ F1；非 clip 闸门）；2.0.55：单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；2.0.58：map/ingest 保留 `extras.drill`（lab metadata mirror；非 clip 闸门）；2.0.59：`sanitizeCareExtras` **保留** lab `drill`，**剥离** `call_120` / stage / escalate（非 auto-120 / 非 care 生产）；2.0.61：home-safety `hasEvalSet` 仍 false（显式单测锁定；packs ≠ F1）；2.0.63：PreviewController ready omit → jpeg（FR-RTC-08；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.64：ready 非法 `previewMode`（mp4/vod/junk）忽略 → jpeg 默认（同 omit；preview 信令 **不是** Event Engine / **不是** VOD）；2.0.67：hangup WS 停 preview sender / 下调 webrtc count——hangup **不是** Event Engine / **不是** VOD；2.0.69：habitat.feeding `hasEvalSet` 仍 false（显式单测可加载；无新 CNN；packs ≠ F1）；2.0.79：`STUB_FEED` 默认关；开则 extras.missedFeedHint / overdueHint（非新 AlertKind / 非 clip 闸门 / 非准确率）；2.0.80：`pose.source=onnx` 仅当 ONNX pose 会话真跑通（缺路径/缺文件/失败仍 stub；单测锁定；非 F1 / 非 VLM / 非 NPU / 非自动 120） |
| Deploy | `deploy` | 🟡 | 默认栈 + prod overlay + **store-box 一键脚本**（FR-EDG-07）；coturn；可选 care simulator；control-plane ingress `caddy/Caddyfile.example` |
| SDK | `sdk` | 🟡 | thin fetch 客户端（含 Capability GET）；2.0.128：`updateFirmwarePackage` / `deleteFirmwarePackage`（`SDK_CORE_SURFACE`；**未** npm publish；**不是** ROM/TPM/已售 CB / 商店 SDK）；2.0.127：JWT infer placement；2.0.126：`loginSso`；2.0.125：`getHealth` / `getReady` / `getVersion`；2.0.124：billing JWT；2.0.123：`purgeSiteEvents` + remote-intervention；2.0.121：`getSite` / `getRule`；2.0.120：`listAlerts`；2.0.118：`getCamera` / `deleteCamera`；2.0.117：Webhook CRUD+test + Rules/Sites CRUD；2.0.116：`listCameras`/`createCamera`/`patchCamera`；2.0.113：OEM activations/metering + activation capabilities（`SDK_CORE_SURFACE`；**未** npm publish；**不是**已售 SKU / NRE / 商店 SDK）；2.0.112：`listWebhookDeliveries` 转发 extra=childZoneHint\|petHint\|childAloneHint\|childNearObjectHint\|personAloneHint\|nearObjectHint（lab 投递审计筛选；**未** npm publish）；2.0.109：household CRUD + cameras/contacts/consents/members + care-incident list/get/cancel/review/close（`SDK_CORE_SURFACE`；**未** npm publish；**不是** care F1 / auto-120 / ops queue / 商店 SDK）；2.0.108：`listWebhookDeliveries` 转发 extra=loiteringHint\|poseFallHint\|nightActivityHint（lab 投递审计筛选；**未** npm publish）；2.0.104：`listWebhookDeliveries` 转发 extra=occupied\|vacant\|entered\|left（lab 投递审计筛选；**未** npm publish）；2.0.103：`listFirmwarePackages` / `createFirmwarePackage` / `getFirmwarePackage` / `validateSocFirmwareIntake`（`SDK_CORE_SURFACE`；**未** npm publish；**不是**商店 SDK / 刷 ROM / TPM）；2.0.102：Face/Edge/OTA/tenants/me/footfall + Notify CRUD + ack/FP/resolve（`SDK_CORE_SURFACE`；**未** npm publish；**不是**商店 SDK）；2.0.99：`discoverOnvif` / `probeCameraSource` / `probeRegisteredCameraSource` / `exportAlertsJson` / `exportFootfallJson` / `listTenantUsers` / `patchTenantUser` / `getUserSiteGrants` / `putUserSiteGrants` / `listAuditLogs`（`SDK_CORE_SURFACE`；**未** npm publish；**不是**商店 SDK）；2.0.98：`listWebhookDeliveries` 转发 extra=zoneInside\|clipScreenshot（lab 投递审计筛选；**未** npm publish）；2.0.95：`listWebhookDeliveries` 转发 extra=drill（lab 投递审计筛选；**未** npm publish）；2.0.94：HMAC `POST /v1/webhooks/snapshot-ingest` **不是** public SDK（lab curl only）；2.0.86：JWT admin `applyScenarioPack` → `POST /v1/scenario-packs/:id/apply`（`SDK_CORE_SURFACE`；cameraId 必填；applyNotify 默认关；**未** npm publish；**不是**自动套用 / **不是**商店 SDK / **不是** F1）；2.0.81：JWT admin `listScenarioPacks` → `GET /v1/scenario-packs`（`SDK_CORE_SURFACE`；FR-VIB-01 lab 目录；**未** npm publish；**不是**商店 SDK；**不是** F1 / **不是**商业关闭）；2.0.60：`createPreviewSession` 对齐 `CreatePreviewSessionRequest` body（jpeg/webrtc）；2.0.65：`reportPreviewPath` → `POST /v1/streams/sessions/:id/path`（`SDK_CORE_SURFACE`）；2.0.66：`hangupPreviewSession` → `POST .../sessions/:id/hangup`（`SDK_CORE_SURFACE`）；2.0.67：OpenAPI create body + hangup `endedAt` honesty 对齐（sdk 表面不变）；2.0.74：JWT `pushCameraFrame` → `POST /v1/cameras/:id/frames`（FR-AI-11 lab JPEG；HMAC `/internal/v1/ingest/frames` **不是** public SDK）；`listWebhookDeliveries` → `GET /v1/webhooks/:id/deliveries`（FR-RUL-04；**不是** SLA）——**未** npm publish；**不是**商店 SDK；**不是**生产 ingest；hangup/path telemetry / preview 信令 **不是** Event Engine / **不是** VOD |
| Desktop | `desktop` | 🟡 | 门店工作站 **先登录** 再 Home/Detect/Admin/Diagnostics；窗口 YOLO/Chat；菜单 store-box；**不是**商店包 |
| Mobile | `mobile` | 🟡 | Expo **SDK 57** 伴随壳 **先登录** 再 Home/Detect/Console/Settings；检测内嵌 HTML；扫码须 Expo Go 57；**不是**商店包 |
| client-infer | Meta `client-infer/` | 🟡 | ORT WASM YOLO + transformers.js Chat；desktop/mobile surface；无权重不假装检出；WASM 窗口 **不是** `ai` EventEngine |

---

## 4. M1 核心 FR

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-PLT-01 | 多租户与站点 | ✅ | 2.0.121：`@vistacast/sdk` getSite + OpenAPI GET $ref；2.0.117：`@vistacast/sdk` Sites CRUD（裸数组；DELETE cascade counts；**未** npm publish；**不是** F1）；CRUD 含删除级联摄像头/规则/事件/授权；Admin Sites 页 |
| FR-PLT-02 | ONVIF 发现 | 🟡 | 2.0.96：OpenAPI `$ref` `POST /v1/cameras/discover`（L1 host/port 预填；**不是** GetStreamUri）；lab 大纲；WS-Discovery L1；Admin 可填/PATCH host 与凭据（不回读密码）；发现结果可预填；e2e 打桩 + Playwright Use；Docker 内 UDP 组播常不可用；**不是** GetStreamUri |
| FR-PLT-03 | 摄像头健康 | ✅ | 心跳 ingest + 2 min 无心跳；本机停模拟 RTSP 约 10s 出 `device.offline` |
| FR-PLT-08 | Docker 部署 | ✅ | 本机 Compose + 生产 overlay（回环绑定 / env 门闩 / pg_dump / Caddy 示例）；非加固 K8s |
| FR-PLT-09 | 本地账号 | ✅ | API `POST /v1/auth/login` 仍可用；Admin 默认走统一登录 |
| FR-PLT-10 | 多协议进流 | 🟡 | ffmpeg 直拉 RTSP/RTMP/HLS/SRT/MJPEG；WHIP/GB28181 经 MediaMTX/ZLM 再发布；2.0.103：HLS/SRT lab 从 MediaMTX :8888/:8890 抽一帧（SRT 需 libsrt ffmpeg；拒绝 WHIP/SIP 当拉口；**不是** FR-PLT-16 / **不是** WHIP 产品 / **不是** Nest SIP）；2.0.97：GB28181 lab 从 ZLM 再发布 RTSP 抽一帧（拒绝 ffmpeg 拉 SIP；**不是** Nest SIP / **不是** FR-PLT-16）；2.0.92：kit-d lab 从再发布 RTSP 抽一帧（拒绝 ffmpeg 拉 WHIP）；Admin 可选 sourceKind；**不是**厂商 App P2P、**不是**自研国标 SIP |
| FR-PLT-12 | 进流探测 | 🟡 | 2.0.96：OpenAPI `$ref` `POST /v1/cameras/probe-source` + `/{id}/probe-source`（脱敏；不写 DB）；lab 大纲；**不是** GetStreamUri / **不是** WHEP / **不是** VOD；`POST /v1/cameras/probe-source`；`ai` ffmpeg 拉一帧；不写心跳/告警 |
| FR-PLT-13 | Compose overlay 标准化 | 🟡 | core/dev/prod/external-db/control-plane/smoke 六件套 + `deploy/scripts/preflight.mjs` 六组合全绿（本机已验）；**未**在真实组合主机上跑过 `up`，**未**验证 Caddy ingress 证书路径 |
| FR-PLT-14 | `/health`·`/ready`·`/version` | 🟡 | 2.0.125：`@vistacast/sdk` getHealth/getReady/getVersion（skipAuth；degraded ≠ 授权）；单测覆盖 PG down→503、可选依赖 `degraded`、未配置 `skipped`、清单 env 优先与非法回落；**未**在真实 PG 故障演练中验证摘流量 |
| FR-PLT-15 | Entitlement 3040 / 外部 OIDC | 🟡 | 2.0.132：`@luminaryworks/entitlement-client` + `VistaCastEntitlementGuard`（JWT → Entitlement 402 → Casbin 403）；`ENTITLEMENT_MODE=off\|shadow_read\|enforce\|offline_license`（默认 **off**，零中央调用）；catalog `productCode=vistacast` 可售接线 + Fastify raw-body HMAC `order.fulfilled`；本地 `billing.service` 计量映射 `camera.count` / `seat.count` / `site.count` / `storage.bytes` / `cloud.infer.calls`。**不是** live PSP / **不是**商户号 / **不是**已售 Cloud Bridge。2.0.124：`@vistacast/sdk` getBillingReadiness；`/ready` 探针仍非授权判定；**未**做 external_oidc 真机联调 |
| FR-PLT-16 | 托管进流网关 | ⬜ | 规格：[camera-module.md](./camera-module.md) / 路径 B；实验室单机 MediaMTX/ZLM 可推；**不是**多租户已售 SaaS；**不是**已可承诺的 24/7 云监控 |
| FR-PLT-17 | 前期 24/7 承诺门闩 | ✅ | 销售/文档：不承诺平台 24/7，除非已售定制模组或付费云监控；盒子自运维 ≠ SLA；断连禁止 server 接管。模组与云监控仍 **未售** |
| FR-ECO-07 | smart-site 组合契约 | 🟡 | `shared` 契约 + server 发送器（HMAC dispatcher / 深链 `sourceRef` / export CORS+分页上限，默认全关，care/face/敏感字段拒绝）；2.0.131：Admin Alerts/Cameras 深链仅 200 展示（404/400 隐藏；**不**猜 URL）；2.0.123：`@vistacast/sdk` remote-intervention GETs（默认关；**不是**真实 VistaRemote / session / TURN）；2.0.115：OpenAPI `$ref` cameras/alerts remote-intervention（RemoteInterventionDeepLink；alerts 400 SMART_SITE_SENSITIVE_REJECTED；lab 大纲；默认关）；2.0.51：同 FR-ECO-01 `sanitizeSmartSiteExportAlert` **保留** clipKind/*HoldMs/clipScreenshot、**剥离** clipRef/care/jpeg-ish/credential（shared 单测）；2.0.56：同 FR-ECO-01 **另保留** lab `payload.drill`（仍剥离 clipRef/care/media-shaped；非生产指标 / 非 MP4/VOD / 非 care）；**未**接 SyncroBrain / VistaRemote / DataLuminary 真实端点，**不得**自动 ack/resolve |
| FR-PLT-05 | LuminaryWorks OIDC | ✅ | 2.0.126：`@vistacast/sdk` loginSso + OpenAPI SsoLoginRequest（thin token exchange；**不是** IdP/Headless）；Admin Headless + `POST /v1/auth/sso`；Docker 同源代理对齐 DataView；401 AuthGate 重登 |
| FR-PLT-06 | Casbin 资源权限 | ✅ | 2.0.96：OpenAPI `$ref` `/v1/users` + site-grants；lab 大纲；角色 ACL + `site_grants` + Admin Users 页；邀请建用户仍靠 OIDC/本地引导 |
| FR-EDG-01 | Edge Runtime | 🟡 | 关键帧 + Provider；本机 Compose profile `rtsp` 已走 ffmpeg；检测仍为 stub |
| FR-EDG-02 | Outbox | ✅ | 文件队列 + 幂等键补传；只持久化 pending（compact JSON） |
| FR-EDG-03 | ModelManifest | ✅ | stub manifest 对齐 artifacts |
| FR-RTC-01 | 信令 | ✅ | `POST /v1/streams/.../sessions` + `/v1/signaling` WS |
| FR-RTC-02 | STUN/TURN | ✅ | Compose profile `turn`；自建 STUN（从 TURN 推导）；UDP+TCP；默认 `up` 不拉 coturn |
| FR-RTC-03 | 按需拉流 | ✅ | hangup 停 JPEG DataChannel；`webrtc` 模式停 H264 ffmpeg（FR-RTC-08）；2.0.67：hangup WS 停 runtime sender；REST hangup 设 `endedAt`；path POST 分离——**不是** Event Engine / **不是** VOD |
| FR-RTC-04 | 2 观看者上限 | ✅ | 第 3 路 409 `SIGNALING_VIEWER_LIMIT` |
| FR-RTC-05 | 连接遥测 | ✅ | `POST .../path` 记 `p2p`/`turn`/`failed` + `firstFrameMs`；Admin 用 ICE stats 分类；无计费；2.0.64：shared `reportPreviewPathRequestSchema` 锁定 `p2p`/`turn`/`failed`（+ optional firstFrameMs；拒绝 mp4/vod/relay 等 VOD-ish path）；Admin `resolveIcePath` remote relay → turn；2.0.65：`SDK_CORE_SURFACE` + `@vistacast/sdk` `reportPreviewPath` → `POST .../sessions/:id/path`；Admin peer ICE failed → `flushTelemetry("failed")`；2.0.66：shared `p2pSessionSchema` 锁定 `path: failed`（+ optional previewMode/firstFrameMs 单测）；`SDK_CORE_SURFACE` 含 hangup；OpenAPI `POST .../path` requestBody；2.0.67：OpenAPI hangup 200 `endedAt` honesty；`toP2p` 锁定 path telemetry 字段；path POST 仍分离——path telemetry / hangup 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK；**不是**计费 |
| FR-RTC-07 | 大陆可达 ICE | ✅ | 禁止默认 Google STUN；`iceTransportPolicy=all`；可选 `TURN_TLS_URL`；真机 NAT 首帧仍 ⬜ |
| FR-RTC-08 | jpeg / webrtc 双模式 | 🟡 | 会话 `previewMode`；JPEG 提帧+缩放；H264 RTP 经 werift；Admin 无首帧/~10s 或 ICE failed 自动改 JPEG；2.0.60：`@vistacast/sdk` `createPreviewSession` 发送 `CreatePreviewSessionRequest` body；shared schema 拒绝非 jpeg/webrtc；sdk 客户端单测覆盖 body；2.0.61：Admin preview 页 POST `{ previewMode }`（源码/单测锁定）；2.0.62：server `resolveSessionPreviewMode` 默认 jpeg；Admin URL `parsePreviewModeQuery` 默认 webrtc（除非 `mode=jpeg`）；2.0.63：`ai` PreviewController ready omit → jpeg；SignalingHub `notifyRuntimeNeed` 有值则带 jpeg/webrtc、undefined 则 omit（runtime 默认 jpeg）；诚实口径：Admin URL `?mode=` 默认 webrtc；server create body / ai ready omit → jpeg；Admin 仍 POST 显式 `previewMode`；2.0.64：`ai` ready 非法 `previewMode`（mp4/vod/junk）忽略 → jpeg 默认（同 omit）；2.0.65：shared `signalingOutboundSchema` 严格拒绝非法 ready.previewMode（mp4/vod/junk）；`ai` 仍先 strip 再 parse（2.0.64）；2.0.66：`@vistacast/sdk` `hangupPreviewSession`；Admin peer POST hangup 源码锁定；2.0.67：OpenAPI create body `{ previewMode?: jpeg|webrtc }`；hangup WS 停 sender / REST `endedAt`；`signalingHangupSchema` 拒 media/path/vod extras——hangup/preview 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK；**不是** API 转封装 / 云 SFU / WHEP；真机 NAT 仍 ⬜ |
| FR-AI-02 | 客流计数 | 🟡 | 过线几何 + 小时快照；2.0.130：OpenAPI `$ref` GET /internal/v1/cameras/{cameraId}/geometry（cameraGeometryResponseSchema；**不是** SDK / **不是** GetStreamUri）；本机 stub 振荡已让 `inCount`>0；非真人、非零售级精度 |
| FR-AI-03 | 客流快照 | ✅ | 2.0.98：OpenAPI `$ref` `GET /v1/analytics/footfall`（hour 桶；**不是**零售精度 / **不是** VOD）；lab 大纲；`GET /v1/analytics/footfall` |
| FR-AI-04 | 区域入侵 | 🟡 | 点在多边形内；2.0.130：OpenAPI `$ref` GET /internal/v1/cameras/{cameraId}/geometry（zones；**不是** SDK / **不是** GetStreamUri）；本机 stub 进入已出 `intrusion`；非真人、非生产精度 |
| FR-AI-08 | 本地 ONNX Provider | 🟡 | JPEG 关键帧 letterbox + YOLOv8 解析（lab）；缺 JPEG 返回 []、**不**喂全零张量。真权重需 `onnxruntime-node`。**非** F1 |
| FR-RUL-01 | 基础规则 | ✅ | 2.0.121：`@vistacast/sdk` getRule + OpenAPI GET $ref；2.0.117：`@vistacast/sdk` Rules CRUD（裸数组；**未** npm publish；**不是**嵌套 AND-OR / F1）；API CRUD + Admin 画线/画区；夜间 UTC 22:00–06:00 日程本机已验；PATCH 不可改摄像头/类型 |
| FR-RUL-03 | 告警分级 | ✅ | 规则 `severity` + Webhook `minSeverity`；列表可筛 |
| FR-RUL-02 | 告警去重 | ✅ | 冷却窗口单测 + e2e |
| FR-RUL-04 | Webhook | ✅ | HMAC-SHA256 + 3 次退避；2.0.117：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 Webhook CRUD list/create/patch/delete + `testWebhook`（secret 永不回读；**未** npm publish；**不是** snapshot-ingest / SLA / 商店 SDK）；2.0.112：`webhook_deliveries` 行快照 childZoneHint/petHint/childAloneHint/childNearObjectHint/personAloneHint/nearObjectHint（仅 === true）+ GET deliveries?extra=childZoneHint\|petHint\|childAloneHint\|childNearObjectHint\|personAloneHint\|nearObjectHint（Alerts extra= leftover-6 cluster parity；仍含 loiteringHint/poseFallHint/nightActivityHint/occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**儿童宠物检测器 / **不是**新 AlertKind；2.0.111：OpenAPI `$ref` `POST /v1/webhooks/{id}/test`（TestWebhookResponse + 401/403 Error；lab 大纲；**不是** SLA）；2.0.108：`webhook_deliveries` 行快照 loiteringHint/poseFallHint/nightActivityHint（仅 === true）+ GET deliveries?extra=loiteringHint\|poseFallHint\|nightActivityHint（Alerts extra= loiter/fall/night cluster parity；仍含 occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是** leftover 6 flags / **不是**完整 Alerts extra= allowlist；2.0.104：`webhook_deliveries` 行快照 occupied/vacant/entered/left（仅 === true）+ GET deliveries?extra=occupied\|vacant\|entered\|left（Alerts extra= occupancy cluster parity；仍含 zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**完整 Alerts extra= allowlist；2.0.95：`webhook_deliveries` 行快照 drill（仅 === true）+ GET deliveries?extra=drill（lab 投递审计筛选；2.0.87 OpenAPI 曾拒绝 deliveries extra=drill）；2.0.91：`webhook_deliveries` 行快照 missedFeedHint/overdueHint（仅 === true）+ `extra=` 过滤；Admin 展开 Tag；sdk `listWebhookDeliveries` 转发；**不是** CSV extras 列 / **不是** SLA；`GET/POST/PATCH/DELETE /v1/webhooks` + Admin 页；`POST /v1/webhooks/:id/test` drill；2.0.87：OpenAPI `GET /v1/webhooks/{id}/deliveries` 补 401/403 `$ref` + optional `extra=` missedFeedHint\|overdueHint（lab STUB_FEED；当时 **不是** extra=drill；2.0.95 起 deliveries 允许 extra=drill 作 lab 审计筛选；**不是** SLA）；2.0.72：`webhook_deliveries` 每次尝试审计 + `GET /v1/webhooks/:id/deliveries`（租户隔离、分页、新近优先；Admin 展开最近投递；**不是** SLA）；2.0.74：`@vistacast/sdk` `listWebhookDeliveries`（`SDK_CORE_SURFACE`；**未** npm publish；**不是**商店 SDK）；lab Event Engine Cloud Sync = **full AlertEvent JSON**（含 payload extras / clipRef 等元数据），**不是** bytes / **不是** MP4 / **不是** VOD；2.0.52：test-delivery drill payload 含 lab sample `clipKind`（+ optional HoldMs）供元数据 Cloud Sync 校验——**不是** bytes/VOD/**不是**生产事件；2.0.53：Admin Webhooks UI `drillHint` 文档化 sample metadata（`clipKind` / `sittingHoldMs`；web 单测；非视频播放器）；2.0.54：`drill` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`；Admin `extra=drill` + Tag（`payload.drill === true`）；server 拷贝 `extras.drill === true`——lab webhook drill / sample metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care；2.0.62：单测证明 Webhook **仍**投递 care+drill（对比 MQTT 跳过 care；Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不） |
| FR-RUL-07 | 确认/误报 | ✅ | 2.0.93：OpenAPI `$ref` ack / false-positive / resolve → `AlertListItem`（404 `ALERT_NOT_FOUND`）；lab 大纲；**不是** WHEP / VOD；API + Admin；本机 `false-positive` 已验；`POST /v1/alerts/:id/resolve` |
| FR-ADM-01 | 仪表盘 | ✅ | 在线摄像头 / 今日告警 / 客流 / 工厂 kind 今日计数（stub，不是 F1） |
| FR-ADM-02 | 摄像头列表 | ✅ | 2.0.118：`getCamera` / `deleteCamera`（密码永不回读；DELETE cascade；**未** npm publish；**不是** GetStreamUri / WHEP / VOD）；2.0.116：list/create/patch； 列表 + RTSP/健康/`lastHeartbeatAt`/站点 + 预览入口；PATCH 名称/RTSP/ONVIF（不可改站点；不回读密码）；DELETE 级联规则/告警/客流，解绑边缘节点；接入中心可登记 |
| FR-ADM-03 | 实时事件流 | ✅ | `/v1/events` 租户 WS（`{ type: "alert", alert }` = AlertEvent 元数据 Cloud Sync）；2.0.130：OpenAPI `$ref` GET /v1/events 101 → `alertStreamOutboundSchema`（AlertEvent；**不是** REST SDK）；2.0.49：Admin 客户端解析测试保留 live 消息上的 clipKind / HoldMs；2.0.53：EventsHub 单测证明 drill-shaped AlertEvent 保留 `drill` / `clipKind` / `sittingHoldMs`（无 clipRef/care）；2.0.89：EventsHub 单测保留 `missedFeedHint`/`overdueHint`（含 care+feed；对比 MQTT 仍跳过 care）；2.0.55：Admin live events 解析保留 `payload.drill` 元数据；2.0.61：EventsHub 单测证明 care+drill 上 Admin live stream（对比 MQTT 仍跳过 care；Admin WS ≠ MQTT care 策略）；测试环境不挂 upgrade；**不是** bytes / **不是** MP4 / **不是** VOD |
| FR-ADM-04 | 告警历史与筛选导出 | ✅ | 2.0.120：`@vistacast/sdk` + `SDK_CORE_SURFACE` `listAlerts`（extra= 18 flags；拒绝 HoldMs/clipKind；**不是** CSV export）；2.0.112：webhook deliveries extra=childZoneHint\|petHint\|childAloneHint\|childNearObjectHint\|personAloneHint\|nearObjectHint 与 Alerts extra= leftover-6 cluster 筛选 parity（仍含 loiteringHint/poseFallHint/nightActivityHint/occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；CSV **仍无** extras 列；**不是** HoldMs/clipKind / **不是** SLA / **不是**儿童宠物检测器 / **不是**新 AlertKind；2.0.108：webhook deliveries extra=loiteringHint\|poseFallHint\|nightActivityHint 与 Alerts extra= loiter/fall/night cluster 筛选 parity（仍含 occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；CSV **仍无** extras 列；**不是** HoldMs/clipKind / **不是** SLA / **不是** leftover 6 flags；2.0.104：webhook deliveries extra=occupied\|vacant\|entered\|left 与 Alerts extra= occupancy cluster 筛选 parity（仍含 zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；CSV **仍无** extras 列；**不是** HoldMs/clipKind / **不是** SLA；2.0.98：webhook deliveries extra=zoneInside\|clipScreenshot 与 Alerts extra= 筛选 parity（仍含 drill/missedFeedHint/overdueHint）；CSV **仍无** extras 列；**不是** HoldMs/clipKind / **不是** SLA；2.0.93：OpenAPI `$ref` `GET /v1/alerts/export` 同 list 筛选 + CSV 九列（无 extras 列）；lab 大纲；**不是** WHEP / VOD；state/kind/site/camera/from/to + `GET /v1/alerts/export` CSV；Admin 筛选页；lab 可选 query `extra`=一个 allowlist 布尔 payload flag（含 `zoneInside` / `clipScreenshot` / `drill` / `missedFeedHint` / `overdueHint`）；未知 extra 400；JSONB payload 含 `{extra: true}`；**不是**单页客户端过滤；CSV **无** extras 列；整数 extras（clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs）**不**进 extra= allowlist；字符串 `extras.clipKind` （`"jpeg_ring" | "jpeg_screenshot"`）是 payload 字段，**不是** extra=、**不是** CSV 列；server hold-key 拷贝列表已合并（无行为变更）；HoldMs **不是** clip 闸门、**不是** CSV extras 列；clipKind alone **不是** clip 闸门；2.0.50：CSV 导出列单测确认仍 **无** clipKind / HoldMs / clipRef / payload extras；2.0.51：shared `listAlertsQuerySchema` / `exportAlertsQuerySchema` **显式拒绝** `extra=`HoldMs / clipKind / clipRef（及 clipDurationMs）；web 测试：Event Engine tags（clipJpegCount / clipDurationMs / clipScreenshot / clipKind 等）仅为元数据 Cloud Sync，**无** Admin 视频播放器；2.0.52：web 测试确认 Admin Alerts `extra=` filter options **从不**含 HoldMs/clipKind；2.0.54：`drill` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`；Admin `extra=drill` + Tag（`payload.drill === true`）；server 经 shared allowlist 拷贝 `extras.drill === true`；2.0.55：`alertExtraContainment("drill")` SQL/json_extract 单测覆盖 Admin `extra=drill`；2.0.56：Admin CSV 仍九列（`drill` **不**成 CSV 列，仅 `extra=drill` 筛选）；list/export 选中筛选时带 `extra=drill`；2.0.59：server detection payload 拷贝 **从不**镜像 care escalation / auto-120 extras（与 drill 并存时仅 allowlist）；Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器——lab webhook drill metadata + Event Engine tags only，**不是** auto-120 / **不是** care 生产 / **不是** MP4/VOD / **不是**生产指标；2.0.82：Admin `extra=missedFeedHint` / `extra=overdueHint` + Tag（`payload.* === true`）；CSV 仍九列（feed hints **不**成 CSV 列） |
| FR-ADM-07 | 规则编辑器 UI | ✅ | 多边形 / 过线画布 + POST/PATCH `/v1/rules`；工厂 kind 可选危险区；可编辑/删除 |
| FR-ADM-09 | P2P 播放器 | 🟡 | JPEG canvas + H264 `<video>`；webrtc 无首帧/ICE failed → JPEG（FR-RTC-08）；§6 lab viewer 仍验 JPEG；真机 NAT 仍 ⬜ |
| FR-PRV-01 | 事件优先 | ✅ | 未实现默认云录像；Compose 无对象存储 |
| FR-PRV-02 | 租户隔离 | ✅ | JWT `tenantId`；本机 Tenant B 读 A 摄像头 404；e2e 亦有 |
| FR-PRV-03 | 保留期与删除 | ✅ | 2.0.123：`@vistacast/sdk` purgeSiteEvents（alerts/footfall only；**不是** site DELETE cascade）；租户 `eventRetentionDays` 默认 90；定时 purge；`DELETE .../events` + 站点级联删除 |

**不在 M1**：FR-AI-01 人脸、FR-AI-05 跌倒、FR-CAR-*、FR-OEM-*、FR-ECO-01（不阻塞）。**不承诺**平台 24/7 SLA（FR-PLT-17）。

---

## 5. 生态依赖

| 依赖 | 提供方 | 状态 | 阻塞 M1 |
| :--- | :--- | :---: | :---: |
| 本地账号 | 本产品 | ✅ | 否（M1 已有登录） |
| Logto OIDC | LuminaryWorks/identity | ✅ | **否**（P1 已接 Admin Headless） |
| Casbin AuthZ | 本产品 | ✅ | **否**（角色 ACL + `site_grants` + Admin Users） |
| auth-core | LuminaryWorks/shared | ✅ | **否** |
| DataLuminary 数据集 API | dataluminary | 🟡 | **否**（M2） |
| BlockyEdu P0 | blockyedu | 🟡 | **否** |
| SyncroBrain MQTT | syncrobrain | 🟡 | 否（可选独立事件总线；care 禁止；生产入口是签名 Webhook） |

---

## 6. 技术债务 / 延期登记

| ID | 描述 | 目标迭代 |
| :--- | :--- | :--- |
| DEF-01 | 原「编码等 DL/BE」已撤销，生态文档仍可能写旧口径 | 同步 LW 产品页 |
| DEF-02 | 兼容矩阵最小集已写，非认证清单 | M1 真机抽测 |
| DEF-03 | OpenAPI 仍为大纲；`components.schemas` 已填充 Error/health/ready/version/preview/branding + Webhook CRUD/deliveries + webhook test + snapshot-ingest + cameras/alerts remote-intervention + Camera list/create/patch + Alert list + FrameIngest + Rules CRUD（含 GET by id）+ Sites（含 GET by id）+ `GET /v1/scenario-packs` + Notify CRUD + alerts export/ack/FP/resolve + probe/discover + export JSON + users/site-grants + audit-logs + Face CRUD + Edge-nodes + OTA packages + `GET/PATCH /v1/tenants/me` + `GET /v1/analytics/footfall` + GET/POST `/v1/ota/firmware` + GET `/v1/ota/firmware/{id}` + `POST /v1/oem/devices/claim` + `POST /v1/oem/soc-intake/validate` + `GET /v1/oem/capabilities` + GET/POST `/v1/oem/activations` + GET `/v1/oem/activations/{id}` + `POST .../revoke` + GET/POST `/v1/oem/metering` + `GET /v1/oem/activations/{id}/capabilities` + `/v1/households*` + `/v1/care-incidents*` + GET `/v1/billing/plans\|entitlement\|usage\|readiness` + PUT `/v1/billing/contract` + `POST /v1/billing/stripe/webhook` + GET|PUT `/v1/cameras/{id}/infer-policy` + GET `/v1/cameras/{id}/infer-lease` + GET `/v1/cameras/{id}/cloud-bridge` + GET|PUT `/v1/integrations/doerflow/policy` + GET `/v1/integrations/doerflow/offerings` + POST `/v1/integrations/doerflow/providers` + POST `/v1/integrations/doerflow/invoke` + POST `/v1/integrations/doerflow/callbacks` + GET `/v1/events` WS + GET `/internal/v1/ota/desired` + GET `/internal/v1/ota/firmware/desired` + POST `/internal/v1/cloud-bridge/calls` + GET `/internal/v1/cameras/{cameraId}/infer-lease` + GET `/internal/v1/cameras/{cameraId}/geometry` + POST `/internal/v1/detections` + POST `/internal/v1/health` 请求体 并 $ref 对应已实现路径 | 其余路径补 $ref；非全量 components |
| DEF-04 | 预览已支持 JPEG DataChannel + H264 RTP（FR-RTC-08 / werift）；真机 NAT 首帧仍 ⬜；非 Nest WHEP / 云 SFU | 真机试点 |
| DEF-05 | Docker Desktop 上 coturn 中继/hairpin 不可靠；需设 `TURN_EXTERNAL_IP` 为宿主机 LAN IP；`coturn/coturn` Hub 拉取可能 EOF，故 Compose 用 profile `turn`。Google STUN 已从默认移除（FR-RTC-07） | 真机试点 |
| DEF-06 | §6 本机 lab 已勾选；**禁止**把 stub/模拟流写成 `vistacast-v0.1.0` 生产 tag | 创始人确认 tag |

---

## 7. Playbook 切片关闭 vs `vistacast-v0.1.0`

编码切片（0–10）**已写完**。发布 tag 仍以 [m1-commercial-playbook.md](./m1-commercial-playbook.md) §6 人工清单为准，**不得**把本行写成生产就绪。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 1 | shared | ✅ |
| 2–3、5–6 | server | ✅ |
| 4–7 | ai（+ server 闭环） | ✅ |
| 7–8 | web | ✅ |
| 9 | deploy | ✅ 默认栈已 `up`；coturn=`turn`；mediamtx=`rtsp` |
| 10 | meta docs/status | ✅ 本版 |

| §6 门槛 | 编码侧 | 人工 tag |
| :--- | :---: | :---: |
| `docker compose up` 后 `/health` + 管理员登录 | postgres/api/web/ai | ✅ 本环境已勾选；coturn 未作为本项前置 |
| 至少 1 路真 RTSP 或 mediamtx | ffmpeg + MediaMTX `testsrc` | ✅ 本环境模拟流；非物理枪机 |
| 过线后小时客流 > 0 | 几何 + `STUB_WALK` 振荡 | ✅ 本环境 `inCount`/`outCount`>0；非真人走动 |
| 禁区 30s 内 `intrusion` | 多边形 + `STUB_WALK` | ✅ 本环境 `kind=intrusion`；非真人进入 |
| 断流 2 min `device.offline` | ffmpeg 退出 + 心跳 | ✅ 本环境停 `rtsp-publisher` 约 10s；非真机 |
| 夜间禁区下一周期生效 | schedule + Admin Night only | ✅ 本环境：夜间检测出告警、白天同框不出 |
| 预览有画面；关页后停发 | JPEG DataChannel + 信令重连 | ✅ 本环境 lab viewer（非 Chrome）；JPEG + `preview stop` |
| 误报 → `false_positive` | API + Admin | ✅ 本环境 `POST .../false-positive` |
| Webhook = `alert.v1` | HMAC + 重试 | ✅ 本环境 Compose catcher；非公网端 |
| 租户 A 读不到 B | JWT 查询隔离 | ✅ 本环境 Tenant B + e2e |
| 文档：无人脸 / 无跌倒 / 无云录像 / TURN 回退 | ✅ docs + deploy README | — |

---

## 8. M2 核心 FR

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-RUL-03 | 告警分级 | ✅ | 规则 severity + Webhook minSeverity |
| FR-RUL-08 | AND/OR | ✅ | 同摄扁平 `match`+`conditions`；无嵌套、无跨摄 |
| FR-PLT-07 | 审计日志 | ✅ | 2.0.96：OpenAPI `$ref` `GET /v1/audit-logs`；lab 大纲；登录 / 规则创建、更新与删除 / 告警导出；Admin 只读；不含密码 |
| FR-ADM-05 | 客流报表 | ✅ | 2.0.98：OpenAPI `$ref` `GET /v1/analytics/footfall`（granularity hour\|day\|week\|month + `siteIds` 多店）；lab 大纲；查询时从小时桶聚合成日/周/月；`siteIds` 多店对比；非零售级精度 |
| FR-ECO-01 | REST 导出 | ✅ | 2.0.96：OpenAPI `$ref` `GET /v1/export/alerts` + `/footfall` JSON（无 extra=；**不是** Admin CSV / **不是** VOD）；lab 大纲；`GET /v1/export/alerts` + `/footfall`；分页/租户隔离；无 DL 账号；lab `extra` **仅** Admin `GET /v1/alerts` 与 `/v1/alerts/export` CSV，本 JSON 导出**不**筛 extra；2.0.51：`sanitizeSmartSiteExportAlert` **保留** lab 元数据 `clipKind` / `*HoldMs` / `clipScreenshot`，**剥离** `clipRef` / `care` / jpeg-ish / credential 键（shared 单测；**不是** VOD 字节）；2.0.56：**另保留** lab `payload.drill`（仍剥离 clipRef/care/media-shaped；lab webhook drill / sample metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care） |
| FR-AI-08 | 远程 Provider | ✅ | 可选 HTTP JSON 适配器；默认 stub；非托管模型、非 F1 |
| FR-AI-05 | 工厂异常 | ✅ | `fall`/`fight`/`smoke` kind + stub（`STUB_ANOMALY`）；评测脚手架 + Admin 可选危险区；**非** F1 |
| FR-AI-05 F1 | 工厂/仓储两类 F1 > 0.75 | ⬜ | 推迟到 [客户确认清单](./customer-confirmation.md)；须 `source` 为 factory 或 warehouse，且 Provider 非 stub；禁止 fixture / stub / 家庭跌倒集。2.0.134：`artifacts/eval-samples/warehouse-fixture.factory-eval.v1.json` `source=fixture`，KR 仍 false，**不是** F1 |
| 误报率 < 15% | 空帧 FP 率已汇报 | ⬜ | `emptyGtFalsePositiveRate` **不得**用来勾选 |
| FR-RUL-05 | MQTT 出站 | ✅ | 可选 `MQTT_URL`；topic `lw/v1/{tenantId}/vistacast/alert.v1`；本机 Mosquitto；**full AlertEvent JSON** 元数据 Cloud Sync（care 字段跳过）；2.0.53：单测证明 drill-shaped AlertEvent 保留 `drill` / `clipKind` / `sittingHoldMs`（无 clipRef/care）；2.0.89：单测证明 STUB_FEED extras `missedFeedHint`/`overdueHint` 保留（care 仍永不 MQTT）；2.0.60：单测证明 care **仍**跳过（即便 payload 另有 lab `drill`；care 永不 MQTT；lab drill 元数据仅当 care 缺席）；2.0.61：对比诚实——EventsHub（FR-ADM-03）可推 care+drill，MQTT **仍**跳过 care（Admin WS ≠ MQTT care 策略）；2.0.62：对比诚实——Webhook（FR-RUL-04）可投 care+drill，MQTT **仍**跳过 care（Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不）；非 SB 生产、非 TB 遥测；**不是** bytes / **不是** MP4 / **不是** VOD |
| FR-RUL-06 | 邮件/企微/钉钉 | ✅ | 2.0.129：Notify `{{personCount}}`（0–32；**不是** extra=）；2.0.93：OpenAPI `$ref` Notify CRUD（secret 永不回读；不可改 type）；lab 大纲；**不是** WHEP / VOD；`notification-channels`；PATCH name/minSeverity/模板/config；不可改 type；钉钉省略 secret 保留；SMTP 空则邮件 no-op；群机器人 webhook；lab 可选模板占位 `{{clipRef}}` `{{clipKind}}` `{{behavior}}` `{{clipJpegCount}}` `{{clipDurationMs}}` `{{sittingHoldMs}}` `{{lyingHoldMs}}` `{{stillHoldMs}}` `{{fallHoldMs}}` `{{loiterHoldMs}}` `{{nightHoldMs}}` `{{vacantHoldMs}}` `{{aloneHoldMs}}` `{{drill}}` `{{missedFeedHint}}` `{{overdueHint}}` `{{zoneInside}}` `{{clipScreenshot}}`（Event Engine **提醒**路径插值元数据；Admin Notify 页文档化；`deploy/.env.example` 文档化 remaining HoldMs + Cloud Sync 元数据诚实口径；**不是**通知内嵌视频 / **不是** raw JPEG 字节；FR-RUL-04/05/ADM-03 Cloud Sync 仍为 AlertEvent 元数据 JSON）；HoldMs / clipKind 行为仍 2.0.39–2.0.46；2.0.49：notification-dispatcher 测试证明自定义模板插值 remaining HoldMs + clipKind 进企微/邮件文本（提醒元数据路径）；2.0.51：email `subjectTemplate`/`bodyTemplate` + DingTalk `bodyTemplate` 插值 HoldMs/clipKind（测试）；2.0.57：可选 `{{drill}}`（`payload.drill === true` → `"true"`，否则空串）；Admin Notify hint 文档化 `drill`；2.0.58：email subject/body + DingTalk `bodyTemplate` 插值 `{{drill}}`（与企微 parity；测试）——lab webhook drill / 提醒 metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care；2.0.82：可选 `{{missedFeedHint}}` / `{{overdueHint}}`（`payload.* === true` → `"true"`；email/WeCom/DingTalk；Admin Notify hint 文档化；**不是**新 AlertKind / **不是** CSV extras 列 / **不是** DoerFlow schema 扩展）；2.0.100：可选 `{{zoneInside}}` / `{{clipScreenshot}}`（`payload.* === true` → `"true"`；email/WeCom/DingTalk；Admin Notify hint 文档化；**不是** CSV extras 列 / **不是** HoldMs / **不是** SLA）；非 ESP SLA |
| FR-EDG-05 | 设备身份 | ✅ | 2.0.98：OpenAPI `$ref` Edge-nodes CRUD（token 仅创建；**不是** TPM）；lab 大纲；`edge-nodes` hashed token + 能力位；可 PATCH `name` 与完整 `capabilities`（不含 face）；`desiredPackageId` / `cameraId` 可 PATCH 含 `null` 解绑；同摄不可两节点；可 DELETE 节点（不删摄像头；operator 不可删）；INTERNAL_TOKEN 仍可用；非 TPM |
| FR-ECO-03 | camera ↔ device | ✅ | `syncrobrainDeviceId` + 签名 Webhook 进 SyncroBrain Inbox；MQTT 可选且禁止 care；非 TB 遥测 |
| FR-AI-01 / FR-ADM-06 | 人脸 | ✅ | 2.0.98：OpenAPI `$ref` Face CRUD + `GET/PATCH /v1/tenants/me`（faceEnabled 默认关；**不是** embedding / **不是**照片字节）；lab 大纲；租户开关默认关；名单库存 + PATCH；Admin 可填/清除 `photoRef`；`face.stranger` + `STUB_FACE`；非生产识别、非 embedding、非照片字节 |
| FR-EDG-04 | 签名 OTA | ✅ | 2.0.130：OpenAPI `$ref` GET /internal/v1/ota/desired（200/204；otaPackageSchema；**不是** SDK / **不是** ROM/TPM）；2.0.98：OpenAPI `$ref` OTA packages CRUD（Ed25519；**不是** TPM / 固件 / 生产 PKI）；lab 大纲；Ed25519 包 + Runtime `previous`/`current` 回滚；可 PATCH `artifactUrl`；可删库存并解绑节点；非 TPM、非固件、非生产 PKI |
| FR-AI-06 | 员工离岗/玩手机 | ✅ | 租户开关默认关；`staff.away`/`staff.phone` + `STUB_STAFF`；可选 zone；非生产监管 |
| FR-PLT-06 | Casbin | ✅ | M1 已提前 |

---

## 9. M2 必须切片关闭 vs `vistacast-v0.2.0`

必须编码切片（0–9）**已写完**。发布 tag 仍以 [m2-sentinel-playbook.md](./m2-sentinel-playbook.md) §4 为准，**不得**把本行写成生产就绪或 F1 达标。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | shared + server + web | ✅ FR-RUL-03 |
| 2 | server + web | ✅ FR-PLT-07 |
| 3 | server + web | ✅ FR-ADM-05 |
| 4 | shared + server | ✅ FR-RUL-08 |
| 5 | server + docs | ✅ FR-ECO-01 |
| 6 | ai | ✅ FR-AI-08 远程接口 |
| 7 | ai + shared | ✅ FR-AI-05 kind+stub |
| 8 | server + deploy | ✅ FR-RUL-05 |
| 9 | meta docs/status | ✅ 出站文档；人脸/OTA 见 P1 切片 12–13（非生产识别 / 非 TPM） |
| 10 | shared + server + web | ✅ FR-RUL-06 邮件/企微/钉钉；非 ESP SLA |
| 11 | shared + server + ai + web | ✅ FR-EDG-05 边缘身份；非 TPM |
| 12 | shared + server + ai + web | ✅ FR-AI-01 / FR-ADM-06 人脸库存 + stub；默认关；非生产识别 |
| 13 | shared + server + ai + web | ✅ FR-EDG-04 Ed25519 OTA + 回滚；非 TPM / 固件 / 生产 PKI |
| 14 | shared + server + web | ✅ FR-ECO-03 `syncrobrainDeviceId` + 签名 Webhook 消费者（integration-verified） |
| 15 | shared + server + ai + web | ✅ FR-AI-06 staff.away/phone 默认关 + stub；可选 zone；非生产监管 |
| 16 | LuminaryWorks + meta | ✅ 跨仓 `spec/products/vistacast.md` 对齐 1.1 + M2 诚实状态 |
| 17 | artifacts + shared → ai | ✅ FR-AI-05 factory-eval 脚手架；**未**在真工厂集达标 |
| 18 | artifacts + shared → ai | ✅ 逐条报告 + `--out`；空帧 FP 只汇报；**未**勾 F1 / 误报率 |
| 19 | artifacts + shared → ai | ✅ 文件名启发式生成清单；**不**证明真集 |
| 20 | meta + server + web | ✅ 客户确认清单（推迟）+ 仪表盘工厂计数 + 可选危险区；**不**勾 F1 |
| 21 | artifacts + shared → server + web | ✅ 规则删除 + `rule.delete` 审计 + 告警 Resolve；**不**勾 F1 |
| 22 | artifacts + shared → server + web | ✅ 规则 PATCH + `rule.update` 审计；不可改 cameraId/type；**不**勾 F1 |
| 23 | artifacts + shared → server + web | ✅ 摄像头 PATCH name/rtspUrl + 解绑 device；不可改 siteId；**不**勾 F1 |
| 24 | artifacts + shared → server + web | ✅ Webhook PATCH url/minSeverity/secret；省略 secret 保留；响应不含 secret；**不**勾 F1 |
| 25 | artifacts + shared → server + web | ✅ 通知渠道 PATCH name/minSeverity/模板/config；不可改 type；钉钉省略 secret 保留；**不**勾 F1 |
| 26 | artifacts + shared → server + web | ✅ 摄像头 DELETE 级联规则/告警/客流；解绑边缘节点；operator 不可删；**不**勾 F1 |
| 27 | artifacts + shared → server + web | ✅ 人脸名单 PATCH label/list/note/photoRef；可改 list；null 清除；无 embedding；**不**勾 F1 |
| 28 | artifacts + shared → server + web | ✅ OTA 包 DELETE 解绑 desiredPackageId；不删制品文件；operator 不可删；**不**勾 F1 |
| 29 | artifacts + shared → server + web | ✅ 节点 PATCH `desiredPackageId: null` 解绑；operator 可 edit；**不**勾 F1 |
| 30 | artifacts + shared → server + web | ✅ 节点 PATCH `cameraId` 绑定 / `null` 解绑；同摄不可两节点；operator 可 edit；**不**勾 F1 |
| 31 | artifacts + shared → server + web | ✅ OTA 包 PATCH 只改 `artifactUrl`（`null` 清除）；不可改 manifest/signature；operator 不可 edit；**不**勾 F1 |
| 32 | artifacts + shared → server + web | ✅ 节点 PATCH `name`（1–80）；operator 可 edit；不回读 token；**不**勾 F1 |
| 33 | artifacts + shared → server + web | ✅ 节点 PATCH 完整 `capabilities`；不可含 `face`；operator 可 edit；**不是**远程关推理；**不**勾 F1 |
| 34 | artifacts + shared → server + web | ✅ 人脸 `photoRef` Admin 可填/清除（≤500）；超长 `FACE_INVALID`；**不是**照片字节 / embedding；**不**勾 F1 |
| 35 | artifacts → server + web | ✅ 节点 DELETE 不删摄像头 / OTA 包；旧 token 失效；operator 不可删；**不**勾 F1 |
| 36 | artifacts + shared → server + web | ✅ 摄像头 ONVIF 库存 PATCH；不回读密码；发现可预填；**仍是** L1；**不**勾 F1 |
| 37 | artifacts + shared → server + web | ✅ 摄像头 `lastHeartbeatAt` + 站点列；GET by id 不含密码；**不**勾 F1 |
| 38 | web | ✅ Face / Webhook / Notify / Rules 删除二次确认；**不**勾 F1 |
| 39 | server | ✅ API 自动化验收：Discover stub→登记；列表心跳/`siteId`；Face/Notify DELETE；Popconfirm 仍需浏览器；**不**勾 F1 |

| §4 门槛 | 编码侧 | 人工 / 商务 |
| :--- | :--- | :--- |
| AND/OR、时段、冷却、分级 | ✅ | — |
| 跌倒/打架/烟雾 F1 > 0.75 | 脚手架 ✅；真集跑分 ⬜ | **推迟**到客户确认清单；**禁止**用 stub / fixture / 家庭跌倒集勾 |
| 误报率 < 15% | `emptyGtFalsePositiveRate` 已汇报 | **禁止**用该字段勾选 |
| Webhook + MQTT 文档 | ✅ `docs/docs/guide/outbound.md` | — |
| DataLuminary 接入指南 | ✅ | 不阻塞无 DL 租户 |
| ≥1 家 OEM 付费意向 | **禁止**用代码勾选 | 创始人 |

---

## 10. M3 P0 核心 FR（非生产试点）

实现切片见 [m3-guardian-playbook.md](./m3-guardian-playbook.md)。**M3 P0 非生产试点已技术验收**；**不得**把本表写成里程碑生产完成、白牌或看护准确率。独立证据 `status=pass` 且 `krEligible=false`。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-CAR-01 | 家庭 / 联系人 / 级联 | ✅ | 2.0.109：`SDK_CORE_SURFACE` + `@vistacast/sdk` 包装 households CRUD + cameras/contacts（**未** npm publish；**不是** care F1 / auto-120 / ops queue）；2.0.106：OpenAPI `$ref` `/v1/households*` CRUD + cameras/contacts（lab 大纲；**不是** care F1 / **不是** auto-120 / **不是** ops queue）；独立 household + 关联表；child → neighbor → `partner_care`/`human_review`；不复用 site；非真户 |
| FR-CAR-02 | 30–60s 确认状态机 | ✅ | 2.0.109：`SDK_CORE_SURFACE` + `@vistacast/sdk` list/get/cancel/review/close（**无** create-as-escalated；**未** npm publish；**不是** care F1 / auto-120 / ops queue）；2.0.106：OpenAPI `$ref` `/v1/care-incidents*` list/get/cancel/review/close（无 create-as-escalated；lab 大纲；**不是** care F1 / **不是** auto-120 / **不是** ops queue）；缺省 45s；server 拥有 + fake-clock；AI 不得升级 |
| FR-BHV-01 | 看护跌倒语义 | ✅ | `alert.v1` 可选 `care`；无 `care` 的 `kind=fall` 仍是工厂；**非**看护准确率 |
| FR-OEM-01 | 激活 + 幂等计量 | ✅ | 2.0.107：OpenAPI `$ref` `/v1/oem/activations*` + `/v1/oem/metering`（lab 大纲；**不是**已售 SKU / **不是** NRE / **不是**白牌）；secret 一次；与 edge-node 分表；lab/fixture **永远** `krEligible=false` |
| FR-PRV-04 | 同意 + 敏感房间可见光 | ✅ | 2.0.109：`SDK_CORE_SURFACE` + `@vistacast/sdk` consents grant/revoke + camera binding（**未** npm publish；法律文本仍 ⬜）；2.0.106：OpenAPI `$ref` consents grant/revoke + camera binding `visibleLightEnabled`（lab 大纲；法律文本仍 ⬜）；`care_processing` fail-closed；卧室/卫生间可见光缺省关 |
| FR-OEM-02 | 租户品牌 overlay | 🟡 | 名称 / Logo URL / 主色 / origin + `GET /v1/public/branding`；**商店 App / APNs / 推送仍 ⬜** |
| FR-CAR-03 | 家庭成员 | ✅ | 2.0.109：`SDK_CORE_SURFACE` + `@vistacast/sdk` members list/add/patch/delete（**未** npm publish；operator 不可删）；2.0.106：OpenAPI `$ref` `/v1/households/{id}/members*`（lab 大纲；不是 contact；operator 不可删） |
| FR-OEM-03 | 设备 claim | ✅ | 2.0.101：OpenAPI `$ref` `POST /v1/oem/devices/claim`（无 JWT；**不是** TPM / **不是**白牌）；lab 大纲；错 secret 401；不枚举 |
| FR-OEM-04 | claim 绑定 edge-node | ✅ | token 只回传一次；列表仅 `edgeNodeId` |
| FR-OEM-05 | 商业 KR 门闩 | ✅ | claim/lab/fixture **永远** `krEligible=false` |
| FR-OEM-06 | 小批量结算 | ⬜ | 人类轨道 |
| FR-ICE-01 | ICE DTO | ✅ | `ttlSeconds` 可选 |
| FR-ICE-02 | HMAC TURN | ✅ | 无 `TURN_REST_SECRET` 回退静态 |
| FR-ICE-03 | turn-session | ✅ | 由 `p2p-session.v1` 可映射；不计费 |
| FR-ICE-04 | 共享 coturn 模块 | ✅ | realm / `external-ip` / `vc:`/`vr:`/`be:` / 配额；VR/BE 消费同一模板；不是付费 SFU |
| FR-RTC-06 | OEM P2P adapter | ✅ | 契约 + `lab-jpeg`；真机 NAT 首帧仍 ⬜（§10.1） |
| FR-EDG-06 | 真机 SoC / 双 OTA | ✅ | 2.0.130：OpenAPI `$ref` GET /internal/v1/ota/firmware/desired（200/204；firmwarePackageSchema；**不是** SDK / **不是** ROM/TPM）；2.0.128：`@vistacast/sdk` updateFirmwarePackage/deleteFirmwarePackage + OpenAPI PATCH|DELETE `$ref`（**不是** ROM/TPM）；2.0.105：`SDK_CORE_SURFACE` + `@vistacast/sdk` 包装 firmware list/create/get + SoC validate（**未** npm publish；**不是**刷 ROM / **不是** TPM）；2.0.101：OpenAPI `$ref` `/v1/ota/firmware` + `POST /v1/oem/soc-intake/validate`（**不是**刷 ROM / **不是** TPM）；lab 大纲；问卷校验 + 分平面暂存；Class B/C 拒绝 Node 移植；刷 ROM 仍 ⬜（§10.1） |
| FR-PRV-05 | 家庭独立登录 | ⬜ | 本轮绑定已有租户用户 |
| FR-OPS-01 | Care 坐席队列 | ⬜ | P1；本轮禁止 |
| FR-BHV-02 | 久未活动 | ⬜ | P1 |

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | artifacts + shared | ✅ |
| 2 | server household + 绑定 | ✅ 非生产 |
| 3 | server contacts / 级联 | ✅ 非生产 |
| 4 | server consent / 可见光 | ✅ 非生产 |
| 5 | server care 状态机 | ✅ 非生产 |
| 6 | server OEM 激活/计量 | ✅ 非生产 |
| 7 | ai 仅候选 | ✅ 非生产 |
| 8 | web 试点页 + Playwright | ✅ 非生产 |
| 9 | deploy care simulator | ✅ fixture/lab-compose；默认关 |
| 10 | meta docs/status | ✅ 本版；**未**打 tag |

### 10.1 仍阻塞（人工 / 商务；禁止用 fixture 勾选）

| 门槛 | 状态 |
| :--- | :---: |
| OEM 付费 NRE / 小批量激活 | ⬜ |
| 真实固件刷写 / 真机 NAT P2P | ⬜ |
| 看护检测准确率 / F1 | ⬜ |
| 法律同意文本完成 | ⬜ |
| 合作方责任转移 | ⬜ |
| 商店 App / APNs / 推送（FR-OEM-02 余量） | ⬜ |
| 租户品牌 overlay + thin sdk 仓 | ✅ 非商店、未 npm publish |
| 生产 tag `vistacast-v0.3.0` | ⬜ |

### 10.2 M3.1 生态前置（编码，非商业关闭）

手册：[m3-1-ecosystem-playbook.md](./m3-1-ecosystem-playbook.md)。**不得**把 claim / HMAC ICE / 家庭成员写成白牌完成或真机量产。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook / ICE / OEM 问卷 | ✅ |
| 1 | artifacts + shared | ✅ |
| 2 | server claim + HMAC ICE | ✅ 非生产 |
| 3 | server + web 家庭成员 | ✅ 非生产 |
| 4 | docs / LW 产品页 | ✅ 本版；**未**打 tag |

M1/M2 诚实口径不变：工厂 F1、误报率、OEM 付费意向、`vistacast-v0.1.0` / `v0.2.0` **仍未勾**。

### 10.3 M3.2 共享 coturn / adapter / 双平面（编码，非商业关闭）

手册：[m3-2-ice-soc-playbook.md](./m3-2-ice-soc-playbook.md)。lab JPEG **不得**勾选真实 NAT；固件暂存 **不得**勾选刷 ROM。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | artifacts + shared | ✅ |
| 2 | server 配额 / firmware / SoC | ✅ 非生产 |
| 3 | ai lab-jpeg + 固件平面 | ✅ 非生产 |
| 4 | deploy 共享 coturn | ✅ 非生产 |
| 5 | docs / LW 产品页 | ✅ 本版；**未**打 tag |

### 10.4 M3.3 上线包 / 租户品牌 / sdk 仓（编码，非商业关闭）

手册：[m3-3-golive-branding-playbook.md](./m3-3-golive-branding-playbook.md)。租户品牌 **不得**写成商店 App；sdk 仓 **不得**写成已发布 npm。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | artifacts + shared | ✅ |
| 2 | server PATCH + public branding | ✅ 单节点最早租户 |
| 3 | web Admin Branding + 主题 | ✅ |
| 4 | sdk thin client | ✅ 未 npm publish |
| 5 | deploy prod overlay / 备份 / env 门闩 | ✅ 非 K8s |
| 6 | docs / 销售一页纸 | ✅ 本版；**未**打 tag |

### 10.5 M3.4 端侧打包（编码，非云端大模型）

手册：[m3-4-on-device-packaging-playbook.md](./m3-4-on-device-packaging-playbook.md)。Electron/RN **不得**写成商店 App。窗口内模型见 §10.6。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-EDG-07 | 门店盒子一键包 | ✅ | `deploy/scripts/install-store-box.mjs`；默认 stub；**不是**云 GPU |
| FR-EDG-08 | Electron 宿主 | ✅ | 产品壳 Detect/Admin/About + 启停本机栈；默认窗口见 FR-EDG-09 |
| FR-ADM-10 | RN LAN 壳 | ✅ | 产品壳 Detect/Admin/About；Expo **SDK 57**；真机填 LAN IP；检测内嵌 HTML |

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | deploy store-box | ✅ `--dry-run` 单测 |
| 2 | desktop Electron | ✅ 产品壳 + host 单测；未商店签名 |
| 3 | mobile Expo 壳 | ✅ 产品壳 + URL 单测；Expo SDK 57；未上架 |
| 4 | docs / LW | ✅ 本版；**未**打 tag |

### 10.6 M3.5 窗口内 YOLO / Chat（编码，非云端大模型）

手册：[m3-5-client-infer-playbook.md](./m3-5-client-infer-playbook.md)。**不是** VistaCast 云 GPU；**不是**生产 F1；云端视觉 LLM **延期**。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-EDG-09 | 窗口内 YOLO | ✅ | 自动摄像头 + 本机/缓存/校验下载 YOLOv8n；Electron 默认窗口；RN 内嵌 HTML；WASM 窗口 **不是** `ai` EventEngine（居家规则在 `ai`）；**不是**生产 F1 / **不是** JS 生产 YOLO |
| FR-EDG-10 | 窗口内 Chat LLM | ✅ | transformers.js；无 generate 不得 echo 冒充 |

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta playbook | ✅ |
| 1 | `client-infer/` | ✅ Node 单测；`:13104` 静态服务 |
| 2 | desktop | ✅ 产品壳默认检测页；菜单仍可 Admin / store-box |
| 3 | mobile | ✅ 产品壳 + 内嵌 standalone HTML；未上架 |
| 4 | docs / LW | ✅ 本版；**未**打 tag |

### 10.7 M3.6 混合推理（切片 0–5 已关，非生产）

手册：[m3-6-hybrid-infer-playbook.md](./m3-6-hybrid-infer-playbook.md)。**不得**把 placement 契约写成 Cloud Bridge 已售或 NPU 已接。

| 切片 | 仓 | 编码 |
| :---: | :--- | :---: |
| 0 | meta spec | ✅ 战略 1.2 |
| 1 | artifacts + shared | ✅ placement / bridge / pack / call / usage |
| 2 | ai | ✅ 平面选路 + 本地小时上限；非已售 SKU |
| 3 | server | ✅ 按帧/次预占 + 429 切断；**不是**计费上线 |
| 4 | meta docs | ✅ 设备矩阵口径 + 报告字段 + 公开 docs；**未**真机测 NNAPI |
| 5 | artifacts + shared + server + sdk + web | ✅ FR-OEM-07 lab GET 目录；**不是**白牌 / 已售云桥 |

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-AI-09 | 推理平面 placement | 🟡 | 2.0.127：`@vistacast/sdk` getCameraInferPolicy / putCameraInferPolicy（**未** npm publish；**不是**已售 CB / 收银台）；2.0.122：OpenAPI `$ref` GET|PUT infer-policy（lab 大纲）；Runtime 选路 + 控制面租约；online 停云；非生产；平台 24/7 承诺见 FR-PLT-17 |
| FR-AI-10 | Cloud Bridge SKU | 🟡 | 2.0.130：OpenAPI `$ref` HMAC POST /internal/v1/cloud-bridge/calls（createCloudBridgeCallRequestSchema → CloudBridgeUsage；**不是** SDK / **不是**已售 / **不是**收银台）；2.0.127：`@vistacast/sdk` getCameraCloudBridgeUsage（krEligible false；**未** HMAC calls；**不是**已售 / 收银台）；2.0.122：OpenAPI `$ref` GET cloud-bridge；控制面按帧/次预占 + 429/409 切断；**不是**已售 / 计费上线 |
| FR-AI-11 | 无 App 取帧 | 🟡 | 口径已写；本地 `ai` 可拉 RTSP/RTMP/HLS/SRT/MJPEG 及网关再发布流；lab OEM 推 JPEG / 快照 webhook 默认关（非生产）；2.0.111：OpenAPI `$ref` `POST /v1/webhooks/snapshot-ingest`（HMAC；**不是** public SDK / **不是** FR-PLT-16 / **不是** multipart）；2.0.103：HLS :8888 / SRT :8890 MediaMTX ingest 抽一帧复用 kit-a POST（SRT 需 libsrt ffmpeg；**不是** FR-PLT-16 / **不是** WHIP 产品 / **不是** Nest SIP）；2.0.97：GB28181 ZLM 再发布抽一帧复用 kit-a POST（**不是** ffmpeg 拉 SIP / **不是** Nest SIP / **不是** FR-PLT-16）；2.0.94：HMAC lab curl `scripts/post-lab-snapshot-ingest.sh` → `POST /v1/webhooks/snapshot-ingest`（`x-snapshot-ingest-secret`；`SNAPSHOT_INGEST_ENABLED` 默认关；**不是** public SDK / **不是** multipart）；2.0.92：kit-d WHIP 经 MediaMTX 再发布抽一帧复用 kit-a POST（**不是** ffmpeg 直拉 WHIP）；2.0.88：kit-b RTSP / kit-c RTMP curl 抽一帧复用 kit-a POST；2.0.75：kit-a `jpegBase64` 草图 + curl companion；2.0.74：`@vistacast/sdk` JWT `pushCameraFrame`（`SDK_CORE_SURFACE`；HMAC internal **不是** public SDK；**不是**生产 ingest / **不是** npm publish）；托管多租户 ingest（FR-PLT-16）仍 ⬜ |
| FR-OEM-08 | ESP32 公开套件 | 🟡 | `hardware/esp32/` 四套参考 BOM/固件；2.0.92：kit-d WHIP lab 从 MediaMTX 再发布抽帧 + kit-a ingest（默认关；非 ffmpeg 直拉 WHIP / 非厂商 P2P）；2.0.88：kit-b RTSP / kit-c RTMP lab 抽帧 + kit-a ingest（默认关；非刷 ROM）；2.0.75：kit-a lab JPEG POST（默认关；token 不进 Git）；**不是**量产模组、**不是**刷 ROM、**不是**已售云桥 |
| FR-MOD-01～04 | 定制摄像头模组 | ⬜ | 规格先行；量产未立项；claim API 可复用 |
| FR-EDG-11 | Android 认证下限 | 🟡 | 矩阵 + `companion-runtime-report.v1`；**未**测 NNAPI/RAM/热/FPS；WASM ≠ NPU |
| FR-OEM-07 | Capability API | ✅ | 2.0.107：OpenAPI `$ref` `GET /v1/oem/activations/{id}/capabilities`（**不是**白牌 / **不是**已售云桥 / **不是** NRE）；2.0.101：OpenAPI `$ref` `GET /v1/oem/capabilities`（**不是**白牌 / **不是**已售云桥）；lab 大纲 |
| FR-VIB-01 | 场景包模板 | 🟡 | 契约 + 四份 JSON 实例；2.0.90：JWT admin apply 覆盖 remaining shipped packs（home/care 映射；habitat `rule.custom` fail-closed）；2.0.87：OpenAPI `POST /v1/scenario-packs/{id}/apply` `$ref` 对齐 shared `applyScenarioPackRequestSchema` / `applyScenarioPackResponseSchema`（cameraId 必填；applyNotify 默认 false；**不是** dryRun / **不是** createWebhook）；2.0.86：`@vistacast/sdk` `applyScenarioPack`（`SDK_CORE_SURFACE`；**未** npm publish；**不是**自动套用）；2.0.85：JWT admin `POST /v1/scenario-packs/:id/apply` + Admin **Apply to camera**（显式 cameraId；applyNotify 才写 lab webhook；缺模板 fail-closed；**不是**自动套用 / **不是** F1）；2.0.83：home/habitat/care 填入 lab `ruleTemplates`/`notifyTemplates`（复用既有 kind；数组仍可选、不必空数组；shared 单测锁定 parse；**不是**新 CNN / **不是** F1）；2.0.81：`@vistacast/sdk` `listScenarioPacks`（`SDK_CORE_SURFACE`；JWT admin `GET /v1/scenario-packs`；**未** npm publish；**不是**商店 SDK）；2.0.78：Admin `/#/scenario-packs` + JWT admin `GET /v1/scenario-packs` 只读 lab 目录（八门闩 + 可选 rule/notify 模板；shipped `hasEvalSet`/`accuracyClaimed` 仍 false；单测锁定诚实文案）；2.0.77：可选 `ruleTemplates`/`notifyTemplates`（Webhook/级联/冷却；shared 单测锁定 parse + 精度 met 无评测集拒绝）；2.0.61：shared 单测锁定 shipped packs `hasEvalSet === false`（含 home-safety；packs ≠ F1）；2.0.69：habitat.feeding 显式单测同锁（lab stub）；2.0.71：八门闩 **lab 字段已产品化**（`gates` status+note；精度 `met` 须 `hasEvalSet`；shipped packs 精度/数据 `blocked`+no eval set）；**不是**商业关闭、**不是** F1 |
| FR-SCN-01 | 鱼塘入侵包 | 🟡 | 2.0.85：lab apply 将夜间 `intrusion` 22:00–06:00 写成现有规则（e2e）；applyNotify 才写 lab webhook；无新 CNN；**不是**自动套用 / **不是** 24/7 SLA / **不是** F1；2.0.77：`pond-theft.v1` `reuseAlertKind=intrusion` + `ruleTemplates` 夜间 22:00–06:00 日程 + lab webhook notify |
| FR-SCN-02 | 生境投喂包 | 🟡 | 2.0.90：lab apply 对 `rule.custom` fail-closed（不写规则/不写 webhook；目录仍可列出；**不是**新 AlertKind）；2.0.83：lab `rule.custom` 文档化 `missed_feed`/`overdue` 意图 + webhook notify（extras.missedFeedHint/overdueHint；**不是**新 AlertKind）；包 JSON 可加载（lab）；`STUB_FEED` 默认关；开则 extras.missedFeedHint / overdueHint（文档化 `missed_feed`/`overdue` 意图；server 仅 === true 拷贝；`extra=` allowlist；Admin `extra=` + Tag；Notify 可选 `{{missedFeedHint}}` / `{{overdueHint}}`；**不是**新 AlertKind、**不是** clip 闸门、**不是** CSV extras 列、**不是** DoerFlow schema 扩展）；2.0.89：MQTT + `/v1/events` 保留 extras hints（DoerFlow 仍拒绝）。`hasEvalSet`/`accuracyClaimed`/`cloudVerify` 仍 false（2.0.69/2.0.79：shared/ai 显式单测锁定；packs ≠ F1）；无新 CNN / 无权重 / 无准确率。`SCENARIO_PACK_PATH` 默认空。**不是**生产投喂检测 |
| FR-SCN-03 | 居家安全包 | 🟡 | 2.0.90：lab apply 写成 fall + 夜间 intrusion 22:00–06:00 + zone 多边形（e2e；**不是**儿童检测器 / **不是** F1）；2.0.83：`ruleTemplates` 复用 `fall` / `intrusion` + lab zone 多边形 + webhook notify（**不是**新 AlertKind / **不是**儿童检测器 / **不是** F1）；包 JSON 可加载；`hasEvalSet` 仍 false（2.0.61：shared/ai 显式单测锁定；packs ≠ F1；`ai/src/infer/fixtures/` 复核 ≠ F1；2.0.53：`webhook-drill-sample.json` 镜像 Admin webhook drill extras（`drill` + `clipKind: jpeg_ring` + `sittingHoldMs`；无 clipRef；≠ F1；**不是** clip 闸门）；2.0.55：`ai` 单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；2.0.58：map/ingest 保留 `extras.drill`（lab metadata mirror；**不是** clip 闸门）；2.0.59：`sanitizeCareExtras` **保留** lab `drill`，**剥离** `call_120` / stage / escalate（非 auto-120 / 非 care 生产）；fixtures 可选含 `*HoldMs` 整数及 `*-hold-ms-only.json`（loiter/night/vacant/alone；2.0.50 另含 lying/still/fall；人工复核 ≠ F1），HoldMs alone **不是** clip 闸门 / **不是** extra= / **不是** CSV extras 列；HoldMs 仍 2.0.39–2.0.43；lab clip 附着可 stamp `extras.clipKind` jpeg_ring|jpeg_screenshot 供元数据 Cloud Sync，**不是** VOD 字节上传；clipKind alone **不是** clip 闸门）；extras.zoneInside（质心在多边形内占用；server 仅当 === true 拷贝；Admin tag；不是 zoneEnter 边沿、不是 loiteringHint、不是新 AlertKind、不是 60 分钟 SLA）；`STUB_CHILD_ZONE` 发 zoneEnter + childZoneHint（不是儿童检测器）；滞留是 extras.loiteringHint（几何：静止 + `zoneInside` 区内占用；`zoneEnter` 仍是 outside→inside 边沿）不是儿童检测器；`BEHAVIOR_LOITER_SEC` 默认 0=帧路径，`>0` per-track `loiterSince` wall-clock（静止+inZone），不是 60 分钟 SLA；`STUB_LOITER` 未改；extras.loiterHoldMs（loiteringHint 且 `BEHAVIOR_LOITER_SEC>0` 时整数 1–3600000；默认 0=帧路径 **omit**；`STUB_LOITER` 仍 **omit**；3600000 是 extras 上限，不是 60 分钟生产 SLA / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——loiteringHint 已可 clip / 不是新 AlertKind）；`STUB_PET` 发 extras.petHint（class unknown，不是宠物 YOLO class / 不是宠物检测器）；`STUB_CHILD_ALONE`（默认 false）发 extras.childAloneHint（不是儿童检测器 / 不是独处 SLA / 不是儿童独处生产）；几何 extras.personAloneHint（`BEHAVIOR_ALONE_FRAMES` 默认 0=关；`BEHAVIOR_ALONE_SEC` 默认 0=该帧路径，`>0` wall-clock；恰好一人 N 帧）不是儿童检测器、不是独处 SLA、不是儿童独处生产（桩未改）；extras.aloneHoldMs（personAloneHint 且 `BEHAVIOR_ALONE_SEC>0` 时整数 1–3600000；默认 0=aloneFrames 路径/关则 **omit**；3600000 是 extras 上限，不是 60 分钟独处 SLA / 不是儿童检测器 / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——personAloneHint 已可 clip / 不是新 AlertKind）；`STUB_CHILD_NEAR_OBJECT`（默认 false）发 extras.childNearObjectHint（不是危险物品检测器）；几何 extras.nearObjectHint（`NEAR_OBJECT_DIST` 默认 0=关；质心距 unknown/vehicle bbox）不是危险物品检测器（桩未改）；vacant / entered / left / nightActivityHint（`NIGHT_HOLD_SEC` 默认 0=时段窗即时 hint；`>0` per-track `nightSince` 延迟；`STUB_NIGHT` 仍即时；可选 `NIGHT_TZ` 空=UTC、非法→UTC，不是 F1 / 不是 24/7）是 lab extras，不是儿童或宠物检测器；extras.nightHoldMs（nightActivityHint 且 `NIGHT_HOLD_SEC>0` 时整数 1–3600000；默认 0=即时 hint **omit**；`STUB_NIGHT` 仍 **omit**；不是夜间 F1 / 不是 24/7 / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——nightActivityHint 已可 clip）；extras.personCount 整数 0–32（0=vacant；场景占用自 `countPersons`，不是人群模型；Admin 计数 tag；控制面无视频字节；personCount / occupied / zoneInside 仍不开 clip；extras.clipScreenshot 会开 clip（`ai/src/infer/fixtures/` lab 复核，不是 F1 eval））；`BEHAVIOR_VACANT_SEC` 默认 0=vacantFrames，`>0` empty-episode wall-clock，不是 24/7；extras.vacantHoldMs（vacant 且 `BEHAVIOR_VACANT_SEC>0` 时整数 1–3600000；默认 0=vacantFrames 路径则 **omit**；`STUB_VACANT` 仍 **omit**；3600000 是 extras 上限，不是 24/7 无人 SLA / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——vacant 已可 clip / 不是新 AlertKind）；久坐/久卧 wall-clock（`BEHAVIOR_SITTING_SEC` / `BEHAVIOR_LYING_SEC` >0，不受 HISTORY_CAP=60 帧限制）仍是 lab，不是 60 分钟 SLA；extras.sittingHoldMs（sitting_long 且 `BEHAVIOR_SITTING_SEC>0` 时整数 1–3600000；默认 0=帧路径 **omit**；3600000 是 extras 上限以便 SEC=3600 可出现 60 min 墙钟，不是 60 分钟生产 SLA / 不是 extra= / 不是 CSV / 不是 clip 闸门本身 / 不是新 AlertKind）；extras.lyingHoldMs（lying_long 且 `BEHAVIOR_LYING_SEC>0`；默认 0 **omit**）；extras.fallHoldMs（`BEHAVIOR_FALL_HOLD_SEC` 默认 0=2 帧 poseFallHint 无 fallHoldMs；>0 且 poseFallHint 时整数 1–60000 墙钟自 fallSince；不是 anomaly=fall / 不是 10s 生产 SLA / 不是自动 120 / 不是 extra= / 不是 CSV / 不是 F1）；无活动 wall-clock（`BEHAVIOR_STILL_SEC` >0，不受 HISTORY_CAP=60）仍是 lab，不是无活动 SLA；extras.stillHoldMs（no_movement 且 `BEHAVIOR_STILL_SEC>0` 时整数 1–3600000；默认 0=帧路径 **omit**）；Admin i18n sitting_long / lying_long / no_movement 为 lab 标签（不是 F1）；`deploy/.env.example` 已文档化 `*_SEC > 0` 可 stamp 对应 HoldMs（含 `NIGHT_HOLD_SEC` 默认 0=即时；>0 延迟；不是 F1；Compose 已透传）及既有 `BEHAVIOR_LOITER_SEC` / `BEHAVIOR_ALONE_SEC` / `BEHAVIOR_VACANT_SEC`；不是准确率 / 无 F1 / 无平台 24/7 SLA / 无自动 120 / 无人群分析 |
| FR-SCN-04 | 仓储夜间防盗包 | 🟡 | 2.0.134：`warehouse.night` lab 壳，复用 `intrusion` + 22:00–06:00；`hasEvalSet`/`accuracyClaimed` false；**不是** F1 / **不是**已售 / **不是**新 CNN |
| FR-SCN-05 | 园区周界防护包 | 🟡 | 2.0.134：`site.perimeter` lab 壳，复用 `intrusion`；门闩注明 not a 24/7 SLA；**不是** F1 / **不是**已售 |
| FR-SCN-06 | 门店客流阈值包 | 🟡 | 2.0.134：`shop.footfall` lab 壳，复用 `footfall.threshold` + 10:00–22:00；**不是**计数模型 / **不是** F1 / **不是**已售零售 |
| FR-SCN-07 | 工厂危险区包 | 🟡 | 2.0.134：`factory.hazard` lab 壳，复用 `fall` + `smoke`（kind + stub）；**不是** F1 / **不是**已售 EHS / **不是**新 CNN |
| FR-SCN-08 | 摄像头离线看护包 | 🟡 | 2.0.134：`camera.watch` lab 壳，复用 `device.offline`；**不是** AI 准确率 / **不是** 24/7 SLA |
| FR-AI-13 | YOLO+Pose+Track | 🟡 | `ai` lab：per-person trackId + stub pose（2.0.80：`source=onnx` 仅当 ONNX pose 会话真跑通；缺路径/缺文件/create 失败/run 失败/非 pose 张量仍 stub；单测锁定）+ STUB_BEHAVIOR + extras.zoneInside（质心在多边形内占用；server 仅当 === true 拷贝；Admin tag；不是 zoneEnter 边沿、不是 loiteringHint、不是新 AlertKind、不是 60 分钟滞留 SLA）+ extras.loiteringHint（几何：静止且窗口内 `extras.zoneInside` 多边形占用，不是 no_movement / 不是新 kind；`zoneEnter` 仍是 outside→inside **边沿**；`STUB_LOITER` 1 帧无 zone 仍发；`BEHAVIOR_LOITER_SEC` 默认 0=帧路径 loiteringHint，`>0` per-track `loiterSince` wall-clock（静止+inZone），不是 60 分钟 SLA；`STUB_LOITER` 未改）+ extras.loiterHoldMs（loiteringHint 且 `BEHAVIOR_LOITER_SEC>0` 时整数 1–3600000；默认 0=帧路径 **omit**；`STUB_LOITER` 仍 **omit**；3600000 是 extras 上限，不是 60 分钟生产 SLA / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——loiteringHint 已可 clip / 不是新 AlertKind）+ extras.occupied（有人，不是新 class）+ extras.vacant（无人，class unknown ingest，不是新 kind；`BEHAVIOR_VACANT_SEC` 默认 0=vacantFrames，`>0` empty-episode wall-clock，不是 24/7）+ extras.vacantHoldMs（vacant 且 `BEHAVIOR_VACANT_SEC>0` 时整数 1–3600000；默认 0=vacantFrames 路径则 **omit**；`STUB_VACANT` 仍 **omit**；3600000 是 extras 上限，不是 24/7 无人 SLA / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——vacant 已可 clip / 不是新 AlertKind） + extras.entered / extras.left（过线进入/离开，不是新 kind）+ extras.nightActivityHint（夜间时段窗；`NIGHT_HOLD_SEC` 默认 0=即时 hint；`>0` per-track `nightSince` 延迟；`STUB_NIGHT` 仍即时；可选 `NIGHT_TZ` 空=UTC、非法 TZ→UTC，不是 F1 / 不是 24/7）+ extras.nightHoldMs（nightActivityHint 且 `NIGHT_HOLD_SEC>0` 时整数 1–3600000；默认 0=即时 hint **omit**；`STUB_NIGHT` 仍 **omit**；不是夜间 F1 / 不是 24/7 / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——nightActivityHint 已可 clip）+ extras.personCount（整数 0–32，0=vacant；场景占用自 `countPersons`，不是人群模型；Admin 计数 tag；控制面无视频字节；personCount / occupied / zoneInside 仍不开 clip；extras.clipScreenshot 会开 clip（`ai/src/infer/fixtures/` lab 复核，不是 F1 eval））+ extras.petHint（STUB_PET；class unknown，不是宠物 YOLO class）+ extras.childAloneHint（`STUB_CHILD_ALONE` 默认 false；不是儿童检测器 / 不是独处 SLA）+ extras.childNearObjectHint（`STUB_CHILD_NEAR_OBJECT` 默认 false；不是危险物品检测器）+ extras.personAloneHint（`BEHAVIOR_ALONE_FRAMES` 默认 0=关；`BEHAVIOR_ALONE_SEC` 默认 0=该帧路径，`>0` wall-clock；几何：连续 N 帧恰好一个 `person`；不是儿童检测器；`STUB_CHILD_ALONE` / childAloneHint 未改）+ extras.aloneHoldMs（personAloneHint 且 `BEHAVIOR_ALONE_SEC>0` 时整数 1–3600000；默认 0=aloneFrames 路径/关则 **omit**；3600000 是 extras 上限，不是 60 分钟独处 SLA / 不是儿童检测器 / 不是 extra= / 不是 CSV / 不是 clip 闸门本身——personAloneHint 已可 clip / 不是新 AlertKind） + extras.nearObjectHint（`NEAR_OBJECT_DIST` 默认 0=关；几何：person 质心距另一 bbox（unknown/vehicle）；不是危险物品检测器；`STUB_CHILD_NEAR_OBJECT` 未改）；per-track `sittingSince` / `lyingSince`：`BEHAVIOR_SITTING_SEC` / `BEHAVIOR_LYING_SEC` 默认 0（帧路径，**omit** extras.sittingHoldMs / lyingHoldMs）；`>0` 为 wall-clock，不受 HISTORY_CAP=60 帧限制；当 sitting_long 且 SEC>0 时 extras.sittingHoldMs 整数 1–3600000（3600000 是 extras 上限以便 BEHAVIOR_SITTING_SEC=3600 可出现 60 min 墙钟，不是 60 分钟生产 SLA / 不是 extra= flag / 不是 CSV 列 / 不是 clip 闸门本身——sitting_long 行为已可 clip / 不是新 AlertKind / Behavior enum）；lying_long 且 `BEHAVIOR_LYING_SEC>0` 时 extras.lyingHoldMs 1–3600000（默认 0 **omit**）；per-track `stillSince`：`BEHAVIOR_STILL_SEC` 默认 0（帧路径 `no_movement`，**omit** extras.stillHoldMs）；`>0` 为 wall-clock，不受 HISTORY_CAP=60 帧限制（不是无活动 SLA）；当 no_movement 且 SEC>0 时 extras.stillHoldMs 整数 1–3600000；`BEHAVIOR_FALL_HOLD_SEC` 默认 0=现 2 帧 poseFallHint，无 extras.fallHoldMs；`>0` 水平保持才延迟 hint；当 poseFallHint 发出且 hold>0 时 extras.fallHoldMs 整数 1–60000（墙钟自 per-track fallSince；不是 anomaly=fall / 不是自动 120 / 不是 10s 生产 SLA / 不是 extra= flag / 不是 CSV 列 / 不是 F1）；控制面透传 payload；Admin 仅当 payload flag 严格 true 出 tag，无播放器；extras.clipScreenshot 当末帧 jpg 已写时 true（Admin tag；控制面无字节 / 无播放器）；lab clip 附着时 stamp `extras.clipKind: "jpeg_ring" | "jpeg_screenshot"`（镜像 sidecar `kind` 2.0.44；控制面拷贝；Admin Tag；元数据 Cloud Sync，**不是** JPEG/MP4 字节上传 VOD；clipKind alone **不是** clip 闸门；**不是** extra= / **不是** CSV）；`CLIP_SCREENSHOT` 默认 false（true 且 CLIP_ENABLED false 时仅 `{id}.jpg` + clipRef，无编号 ring，不是 MP4 / 不是 5–15s 编码视频 / 不是 30 天点播）；clipJpegCount 仍是编号 ring 长度 1–32（不是截图 flag）；extras.clipDurationMs 整数 1–60000（JPEG ring 墙钟 last−first occurredAt；CLIP_ENABLED 写 ≥2 帧才设；CLIP_SCREENSHOT-only 不设；不是 CLIP_SECONDS*1000、不是 muxed MP4、不是 extra= flag）；Admin i18n sitting_long / lying_long / no_movement 为 lab 标签（不是 F1）；`ai/src/infer/fixtures/` 可选含 `*HoldMs` 及 `*-hold-ms-only.json`（loiter/night/vacant/alone；2.0.50 另含 lying/still/fall）供人工复核（≠ F1；HoldMs alone **不是** clip 闸门）；2.0.53：`webhook-drill-sample.json` 镜像 drill extras（`drill` + `clipKind` + `sittingHoldMs`；≠ F1；**不是** clip 闸门）；2.0.55：`ai` 单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；2.0.58：map/ingest 保留 `extras.drill`（lab metadata mirror；**不是** clip 闸门）；2.0.59：`sanitizeCareExtras` **保留** lab `drill`，**剥离** `call_120` / stage / escalate（非 auto-120 / 非 care 生产）；`deploy/.env.example` 已文档化 `*_SEC > 0` 可 stamp HoldMs（含 `NIGHT_HOLD_SEC` 默认 0=即时；>0 延迟；不是 F1；Compose 已透传）及既有 `BEHAVIOR_LOITER_SEC` / `BEHAVIOR_ALONE_SEC` / `BEHAVIOR_VACANT_SEC`，以及 `CLIP_SCREENSHOT`（默认 false；Compose 已透传）；Notify 模板（2.0.47）另可选 `{{loiterHoldMs}}` `{{nightHoldMs}}` `{{vacantHoldMs}}` `{{aloneHoldMs}}`（与 2.0.46 clip/HoldMs 一并插值既有元数据）；FR-RUL-04/05/ADM-03 Cloud Sync = AlertEvent 元数据 JSON（**不是** bytes/MP4/VOD）；HoldMs / clipKind 行为不变；不是 F1 / 不是 VLM / 不是 NPU / 不是 24/7 / 不是自动 120 / 不是人群分析 |
| FR-PRV-06 | 事件剪辑 opt-in | 🟡 | `ai` CLIP_ENABLED 默认关；开则 lab:// + 编号 JPEG 序列 `{id}-00.jpg`… + 末帧 `{id}.jpg`（非 MP4）。`CLIP_SCREENSHOT` 默认 false；当 true 且 CLIP_ENABLED 为 false：仅末帧 `{id}.jpg` + clipRef，无编号 ring（不是 MP4 / 不是 5–15s 编码视频 / 不是 30 天点播）。CLIP_ENABLED 仍写编号 JPEG ring + 末帧 jpg。`CLIP_SECONDS` 默认 0=CLIP_RING_SIZE；5–15 ≈ 关键帧间隔 JPEG ring 长度（不是 MP4 / 不是 5–15s 编码视频 / 不是 30 天点播）；同样可挂 poseFallHint / childZoneHint / loiteringHint / petHint / childAloneHint / childNearObjectHint / personAloneHint / nearObjectHint（仍是 JPEG ring 或末帧截图，不是 MP4）；personCount / occupied / zoneInside 仍不开 clip；extras.clipScreenshot 会开 clip（lab fixture 复核，不是 eval）；ingest 写入 clipRef；lab 落盘时 extras.clipJpegCount 整数 1–32（编号 ring 长度，不是截图 flag）；extras.clipDurationMs 整数 1–60000（JPEG ring 墙钟 last−first `occurredAt`；CLIP_ENABLED 写 ≥2 帧才设；sidecar 可重复 durationMs；CLIP_SCREENSHOT-only 不设；不是 CLIP_SECONDS*1000、不是 muxed MP4、不是 5–15s 编码视频、不是 extra= flag）；extras.clipScreenshot=true 当末帧 jpg 已写；GET `/v1/alerts` 可选 `extra=clipScreenshot`（FR-ADM-04 allowlist；未知 extra 400；不是单页客户端过滤；CSV 无 extras 列；clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs 整数不进 extra=；loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs 不是 clip 闸门本身（loiteringHint / nightActivityHint / vacant / personAloneHint 已可 clip）；fixtures 可选 `*HoldMs` 仅供人工复核，HoldMs alone **不是** clip 闸门；lab Event Engine 剪辑路径仍是 JPEG ring（`CLIP_ENABLED` 编号 JPEG + 末帧 jpg）和/或末帧截图（`CLIP_SCREENSHOT`），**不是** muxed MP4、**不是** 5–15s 编码短视频上传、**不是** 30 天云端点播/播放器；`clipDurationMs` 是 JPEG ring 墙钟跨度，不是编码时长）；clip sidecar `kind`（2.0.44）仍保留；lab clip 附着时 stamp `extras.clipKind: "jpeg_ring" | "jpeg_screenshot"`（镜像 sidecar kind；控制面拷贝至 alert payload；Admin Tag；**lab Event Engine 元数据 Cloud Sync**（alert extras + clipRef），**不是** JPEG/MP4 字节上传云存储作 VOD；clipKind alone **不是** clip 闸门；**不是** extra=；**不是** CSV 列）；presign 默认 503，`CLIP_STORAGE=local` 才给 lab://；Admin 短文本 + 计数 tag + clipScreenshot tag（payload flag 严格 true）+ clipKind tag + clipDurationMs 墙钟 tag（1–60000）+ sitting_long / lying_long / no_movement i18n lab 标签（不是 F1），无播放器；控制面无字节；Compose 无对象存储；HoldMs（2.0.39–2.0.43）不变；home-safety `hasEvalSet` 仍 false；Notify 文本模板（2.0.47）可插值 clipRef / clipKind / behavior / clipJpegCount / clipDurationMs / sitting|lying|still|fall|loiter|night|vacant|alone HoldMs 等元数据（Event Engine **提醒**路径；**不是**通知内嵌视频 / **不是** raw JPEG 字节）；2.0.57：Notify 另可选 `{{drill}}`（`payload.drill === true` → `"true"`；Admin Notify hint 文档化）——lab webhook drill / 提醒 metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care；FR-RUL-04/05/ADM-03 lab Cloud Sync = AlertEvent 元数据 JSON（**不是** bytes / **不是** MP4 / **不是** VOD）；2.0.55：`ai` 单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；2.0.59：Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器——lab webhook drill metadata + Event Engine tags only，**不是** auto-120 / **不是** care 生产 / **不是** MP4/VOD / **不是**生产指标；`deploy/.env.example` 已文档化 remaining HoldMs + Cloud Sync 元数据诚实口径；Compose 已透传；不是 30 天云端点播 |
| FR-BHV-02 | Care 活动 | ⬜ | 高责任；无生产权重。2.0.90：lab apply 复用 `fall`（e2e）；仍 ⬜ 无生产权重。2.0.83：`care-activity.v1` lab 复用 `fall` + webhook（gates 诚实注明无生产权重）；**不是** FR-BHV-02 关闭 / **不是** F1 |

### 10.8 M3.8 native NNAPI（切片 2–3 SHIM）

手册：[m3-8-native-nnapi-playbook.md](./m3-8-native-nnapi-playbook.md)。模拟器 **不得**勾矩阵。`onnxruntime-react-native` **未**装。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-EDG-12 | RN ORT/NNAPI 探测 + 诚实报告 | 🟡 | 具名 SHIM；默认 WASM；Hexagon/APU 拒绝；**不是**真 EP |
| FR-EDG-11 真机行 | 8 Gen 2 / 9400 | ⬜ | 仅人类真机；禁止模拟器 / fixture 勾 |

### 10.9 M3.9 Cloud Bridge 计费（切片 1–4 形状，未售）

手册：[m3-9-cloud-bridge-billing-playbook.md](./m3-9-cloud-bridge-billing-playbook.md)。默认 `TENANT_PLAN_ID=hybrid`。空 `STRIPE_WEBHOOK_SECRET` = 503。**未**宣布已售。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-AI-12 | SKU / env entitlement / 账单行形状 | 🟡 | 2.0.130：OpenAPI `$ref` HMAC POST /internal/v1/cloud-bridge/calls（**不是** SDK / **不是**收银台 / **不是**已售 SKU）；2.0.122：OpenAPI `$ref` GET /v1/cameras/{id}/cloud-bridge（lab 大纲；**不是** HMAC `/internal/v1/cloud-bridge/calls` / **不是**收银台 / **不是**已售 SKU / **不是**中央 Entitlement 授权）；2.0.119：OpenAPI `$ref` billing cluster（单价 0；sellable/checkout false）；空 SKU 保持 429；lab/fixture KR false；**不是**收银台 / **不是**已售 SKU |
| FR-BIL-01 | 套餐目录 | 🟡 | 2.0.124：`@vistacast/sdk` billing JWT wrap（**不是** Stripe webhook / 收银台）；2.0.119：OpenAPI `$ref` `GET /v1/billing/plans`（`{ items }` tenant-plan.v1；单价 0）；摄像头+席位+云额度；**不是**已售 SKU / **不是**收银台 |
| FR-BIL-02 | Stripe webhook + 合同 | 🟡 | 2.0.124：`@vistacast/sdk` billing JWT wrap（**不是** Stripe webhook / 收银台）；2.0.119：OpenAPI `$ref` `PUT /v1/billing/contract` + `POST /v1/billing/stripe/webhook`（HMAC `Stripe-Signature`；空 `STRIPE_WEBHOOK_SECRET` = 503）；HMAC；无卡号；live 密钥仍空；**不是**收银台 |
| FR-BIL-03 | 用量账本 | 🟡 | 2.0.124：`@vistacast/sdk` billing JWT wrap（**不是** Stripe webhook / 收银台）；2.0.119：OpenAPI `$ref` `GET /v1/billing/usage`；Admin 可见；超摄像头上限拒绝；**不是**收银台 |
| FR-BIL-04 | 运营手工开通 | 🟡 | 默认 `BILLING_CONTRACT_SELF_SERVICE=0` 禁止租户自助升档；`PUT /v1/ops/tenants/:id/billing/contract` + `x-billing-ops-key` + 必填 `reason` + `billing_entitlement_audits`；`krEligible` 恒 false；**不是**已售 |
| FR-BIL-05 | 中央 commerce 收银台 | 🟡 | Admin 在 `checkout=true` 时调 `/v1/commerce/offerings|orders|pay|complete`；SDK wrap；fulfillment webhook 写合同；VistaCast **不是**商户号（`livePsp` false）；**未**宣布已售 |
| FR-BIL-06 | 云识别预付次数 | 🟡 | `GET /v1/billing/credits`；ops grant；`vc.credits.*` / `creditCalls` 入账；超月额度扣次；lab/fixture 不扣；**不是**现金钱包 / **不是**已售 |
| FR-OPS-02 | 边缘健康停云 | 🟡 | 2.0.130：OpenAPI `$ref` GET /internal/v1/cameras/{cameraId}/infer-lease（operationId `getCameraInternalInferLease` ≠ JWT `getCameraAdminInferLease`；**不是** SDK / **不是**已售 CB）；2.0.127：`@vistacast/sdk` getCameraInferLease（**未** npm publish；**不是**已售 CB / 收银台）；2.0.122：OpenAPI `$ref` GET infer-lease；租约 + 409；unknown 仍可回退 |
| FR-AI-10 已售 | 宣布可售 | ⬜ | 商务填价格 + 销售页；禁止用 env SKU 勾 |

### 10.10 M3.10 商店与 tag（切片 1–4 脚手架）

手册：[m3-10-store-tag-playbook.md](./m3-10-store-tag-playbook.md)。检查单：[release-tag-checklist.md](./release-tag-checklist.md)。草稿：[docs/docs/guide/store-listing.md](../docs/docs/guide/store-listing.md)。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-OEM-09 | 签名 dry-run / EAS preview≠prod / 推送空=无 | 🟡 | 脚手架；未签名、未 `eas submit`、无推送 |
| FR-PLT-11 | 生产 tag | ⬜ | 创始人指定版本号；Agent 禁止打 tag |

---

## 11. 三端 UI/UX（FR-UX）

规范：[ui-ux-system.md](./design/ui-ux-system.md)。Token：`artifacts/design/ui-tokens.v1.json`。探测契约：`camera-source-probe.v1`。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-UX-01 | 统一设计系统 | 🟡 | Token + 各端适配；Web 浅色画布 / 深色视频；Electron/RN 深色壳；**不是**跨端 UI 组件库 |
| FR-UX-02 | 场景化导航 | 🟡 | Web 分组；Electron/RN **启动先登录**（同一套 Admin，不是第二套密码库）；登录后工作站/伴随壳；按角色隐藏；**不是**三份 Admin |
| FR-UX-03 | 标准状态与响应式 | 🟡 | Empty/Error/Loading/Pilot；`client-infer` desktop/mobile；Playwright/壳测试覆盖核心屏 |
| FR-UX-04 | 设备接入中心 | 🟡 | Web `/setup`；探测 `hintKey`；Desktop/RN 深链；**不是** GetStreamUri、**不是**厂商 P2P |

---

## 12. FR-ECO-05 DoerFlow（可选，非生产）

默认 **关闭**。不阻塞 M3，也不是 M4 Nexus 关门项。

| FR ID | 描述 | 状态 | 依赖 |
| :--- | :--- | :---: | :--- |
| FR-ECO-05 | 视觉事件 → DoerFlow inbox / 供应方 invoke | 🟡 | CloudEvents + HMAC；租户策略 + minSeverity + 预算；CloudEvent `data` **summary-only**（`vistacastAlertEventDataSchema`），**不**携带 clipKind / HoldMs / JPEG 字节；2.0.130：OpenAPI `$ref` GET|PUT policy + GET offerings + POST providers + POST invoke/callbacks HMAC（默认关；lab 大纲；**不是** SDK / **不是**生产 inbox）；2.0.50：schema **显式拒绝** clipKind / HoldMs / clipRef（仅 rejection 测试；schema **未**扩展）；2.0.52：server 抽出 `buildDoerflowAlertEventData`；单测证明 AlertEvent 携带 clipKind/HoldMs 时 `data` 仍 summary-only；2.0.57：单测锁定 drill-shaped AlertEvent 时 `data` 仍丢弃 drill/clipKind/HoldMs（summary-only；DoerFlow **不是** Event Engine extras 平面）；2.0.58：shared `vistacastAlertEventDataSchema` **显式拒绝** `drill`（同 clipKind/HoldMs/clipRef；仅 rejection 测试；schema **未**扩展）；2.0.89：同 schema **显式拒绝** `missedFeedHint`/`overdueHint`（仅 rejection 测试；schema **未**扩展）；元数据 Cloud Sync 平面仍为 Webhook / MQTT / `/v1/events` / Notify，**不是** DoerFlow inbox extras；**不**扩展 shared schema；**不是**远程调试；**不得**自动 ack/resolve；stub / face / staff / fall / smoke **拒绝生产** |

| 交付 | 状态 |
| :--- | :---: |
| `com.vistacast.alert.v1` 最小化出站 | 🟡 实验室；`source` 事件 id 幂等 |
| Provider register `productCode=vistacast` | 🟡 offering 仅 `alert-evidence.v1` / `footfall-report.v1` |
| invoke HMAC + 数据最小化 | 🟡 Fastify raw body；敏感字段拒绝 |
| lifecycle callback inbox | 🟡 幂等；不改 Alert 状态 |
| 生产 M2M + 钱包 payee | ⬜ DoerFlow 侧 |

---

## RFC / Changelog

| 日期 | 版本 | 变更 |
| :--- | :--- | :--- |
| 2026-09-21 | 2.0.143 | FR-AI-14：焊点阈值表单；Apple Silicon 可作为识别主机。不是 Neural Engine / 不是已售 |
| 2026-09-20 | 2.0.142 | FR-AI-14：PCB 检查报告自带实验室 extras（连锡 / 虚焊 / 冷焊 / 漏件）。不是 OpenVINO IR / 不是客户板 F1 / 不是已售 |
| 2026-09-20 | 2.0.140 | FR-SCN-09 / FR-AI-14：PCB/PCBA 光学检测场景包 + 纯 CPU ROI。不是独立产品 / 不是 F1 / 不是已售 |
| 2026-09-20 | 2.0.135 | M3.12 软运营就绪切片 0–5（OpenAPI ops/commerce/credits；accept:commerce-ops；SCN e2e；commerce-ops/pilot-demo docs）。不是已售 |
| 2026-09-20 | 2.0.137 | M4 Nexus P0：FR-ECO-02 DataTalk 模板 + FR-AI-07 `STUB_REID`；`pnpm accept:m4`。不是托管数据集 / 不是生产 Re-ID / 不是已售 |
| 2026-09-19 | 2.0.134 | FR-SCN-04～08 lab 壳（仓储夜间 / 园区周界 / 门店客流 / 工厂危险区 / 摄像头离线；复用既有 kind；`hasEvalSet` false）。FR-AI-05 格式样例 `source=fixture`，KR 仍 false。FR-BIL-05 中央 Entitlement 实验室页（默认 off 关收银；`livePsp` false）。**不是** F1 / **不是**已售 / **不是**商户号 |
| 2026-09-18 | 2.0.133 | FR-BIL-04/05/06（M3.11）：ops 合同 `reason`+审计+默认关自助升档；Admin 中央 commerce 收银台；云识别次数钱包/ledger/grant/`vc.credits.*` 入账；SDK commerce+credits wrap；**未**宣布已售；`livePsp` false；**不是** VistaCast 商户号 |
| 2026-09-16 | 2.0.132 | FR-PLT-15：VistaCast 接入中央 Entitlement（`@luminaryworks/entitlement-client` + `VistaCastEntitlementGuard`）。默认 `ENTITLEMENT_MODE=off` 与今日 lab 行为一致、**零**中央调用。`shadow_read`/`enforce` 走中央 check/allocate/consume（enforce 不可达 **402 fail-closed**）。catalog `productCode=vistacast` 可售接线；`POST /v1/commerce/webhooks/entitlement` HMAC-SHA256（`${timestamp}.${nonce}.${rawBody}`，Fastify raw bytes）。**不是** live PSP / **不是**商户号 / **不是**已售 Cloud Bridge |
| 2026-09-16 | 2.0.131 | FR-ECO-07：Admin Alerts/Cameras 拉取 remote-intervention 深链；仅 200 展示服务端 url；404 SMART_SITE_DISABLED / 400 SMART_SITE_SENSITIVE_REJECTED 隐藏；**不**猜测 URL；**不是**真实 VistaRemote session / TURN / GetStreamUri / WHEP / VOD / grant / RTSP |
| 2026-09-16 | 2.0.130 | DEF-03：OpenAPI `$ref` GET\|PUT /v1/integrations/doerflow/policy + GET offerings + POST providers + POST invoke/callbacks HMAC（FR-ECO-05 默认关；summary-only；仍拒绝 clipKind/HoldMs/clipRef/drill/feed hints）+ GET /v1/events WS 101（FR-ADM-03；AlertEvent；**不是** REST SDK）+ GET /internal/v1/ota/desired + GET /internal/v1/ota/firmware/desired（FR-EDG-04/06；200/204；**不是** ROM/TPM）+ POST /internal/v1/cloud-bridge/calls + GET /internal/v1/cameras/{cameraId}/infer-lease（FR-AI-10/12、FR-OPS-02；operationId 与 JWT admin 租约区分）+ GET /internal/v1/cameras/{cameraId}/geometry（FR-AI-02/04；cameraGeometryResponseSchema；**不是** GetStreamUri）+ POST /internal/v1/detections\|health 请求体（202 信封仍 server-local；clips/presign 跳过）；仍为大纲、非全量 components；**不是** SDK wrap / **不是**生产 inbox / **不是**已售 CB/收银台 |
| 2026-09-16 | 2.0.129 | FR-RUL-06 / FR-AI-13：Notify 模板插值 `{{personCount}}`（占用整数 0–32；0=vacant；非 int/越界 → 空串；**不是** extra= 布尔 / **不是** HoldMs/clipKind / **不是** CSV extras / **不是**新 AlertKind / **不是**人群模型） |
| 2026-09-16 | 2.0.128 | FR-EDG-06：OpenAPI `$ref` PATCH\|DELETE /v1/ota/firmware/{id} + `SDK_CORE_SURFACE` / `@vistacast/sdk` `updateFirmwarePackage` / `deleteFirmwarePackage`（artifactUrl only；DELETE 解绑 edge desired；**未** npm publish；**不是** ROM flash / TPM / 白牌 / 已售 Cloud Bridge / 商店 SDK） |
| 2026-09-16 | 2.0.127 | FR-AI-09 / FR-OPS-02 / FR-AI-10/12：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 JWT `getCameraInferPolicy` / `putCameraInferPolicy` / `getCameraInferLease` / `getCameraCloudBridgeUsage`（lab `krEligible:false`；**未**包装 HMAC `/internal/v1/cloud-bridge/calls`；**未** npm publish；**不是**已售 Cloud Bridge SKU / 收银台 / 中央 Entitlement 授权 / 商店 SDK） |
| 2026-09-16 | 2.0.126 | FR-PLT-05：OpenAPI `SsoLoginRequest` requestBody + `SDK_CORE_SURFACE` / `@vistacast/sdk` `loginSso`（thin accessToken 交换；skipAuth；**未** npm publish；**不是** IdP/APNs/Headless / 商店 SDK）。同 artifacts 提交含 FR-EDG-06 firmware PATCH|DELETE OpenAPI 大纲（2.0.128 起 SDK wrap） |
| 2026-09-16 | 2.0.125 | FR-PLT-14：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装公开探针 `getHealth` / `getReady` / `getVersion`（skipAuth；/ready 503 仍解析 ReadyResponse；degraded 含 entitlement down 仅为探针、**不是** FR-PLT-15 授权判定；**未** npm publish；**不是**商店 SDK） |
| 2026-09-16 | 2.0.124 | FR-BIL-01/02/03 / FR-PLT-15 / FR-AI-12：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 billing JWT `listBillingPlans` / `getBillingEntitlement` / `getBillingUsage` / `getBillingReadiness` / `putBillingContract`（readiness 锁定 sellable/checkout false；**未**包装 Stripe webhook / commerce；**未** npm publish；**不是**已售 SKU / 收银台 / 中央 Entitlement 授权 / 商店 SDK） |
| 2026-09-16 | 2.0.123 | FR-PRV-03 / FR-ECO-07：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 `purgeSiteEvents`（DELETE /v1/sites/:id/events；仅 alerts/footfall；**不是** site DELETE cascade）+ `getCameraRemoteIntervention` / `getAlertRemoteIntervention`（默认关深链标识；**不是**真实 VistaRemote / session / TURN）；**未** npm publish；**不是**商店 SDK |
| 2026-09-16 | 2.0.122 | DEF-03：OpenAPI `$ref` GET\|PUT /v1/cameras/{id}/infer-policy + GET /v1/cameras/{id}/infer-lease + GET /v1/cameras/{id}/cloud-bridge（FR-AI-09、FR-OPS-02、FR-AI-10/12）；仍为大纲、非全量 components；lab 大纲；JWT；**不是**已售 Cloud Bridge SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** HMAC `/internal/v1/cloud-bridge/calls` / **不是** SDK wrap |
| 2026-09-15 | 2.0.121 | FR-PLT-01 / FR-RUL-01 / DEF-03：OpenAPI `$ref` GET /v1/sites/{id} + GET /v1/rules/{id}（随 2.0.119 大纲进仓）+ `SDK_CORE_SURFACE` / `@vistacast/sdk` `getSite` / `getRule`；**未** npm publish；**不是**嵌套 AND-OR / F1 / 商店 SDK |
| 2026-09-15 | 2.0.120 | FR-ADM-04：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 `listAlerts`（GET /v1/alerts；转发 extra= 18 flags + cursor/limit；拒绝 HoldMs/clipKind；**未** npm publish；**不是** CSV `/v1/alerts/export` / 商店 SDK / F1） |
| 2026-09-15 | 2.0.119 | DEF-03：OpenAPI `$ref` billing cluster `GET /v1/billing/plans\|entitlement\|usage\|readiness` + `PUT /v1/billing/contract` + `POST /v1/billing/stripe/webhook`（FR-BIL-01/02/03、FR-AI-12、FR-PLT-15）；shared `billingReadinessSchema` 锁定 sellable/checkout false；HMAC Stripe；空 secret 503；单价 0；仍为大纲、非全量 components；**不是**已售 SKU / **不是**收银台 / **不是**中央 Entitlement 授权 / **不是** SDK wrap |
| 2026-09-15 | 2.0.118 | FR-ADM-02：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 `getCamera` / `deleteCamera`（GET|DELETE /v1/cameras/:id；密码永不回读；DELETE cascade counts；**未** npm publish；**不是** GetStreamUri / WHEP / VOD / 商店 SDK） |
| 2026-09-15 | 2.0.117 | FR-RUL-04 / FR-RUL-01 / FR-PLT-01：`@vistacast/sdk` thin wrap Webhook CRUD+test + Rules/Sites CRUD（`SDK_CORE_SURFACE` 已列；secret 永不回读；list Rules/Sites 为裸数组；**未** npm publish；**不是** snapshot-ingest / SLA / 嵌套 AND-OR / F1 / 商店 SDK） |
| 2026-09-15 | 2.0.116 | FR-ADM-02：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 cameras list/create/patch（2.0.76 OpenAPI；list 为裸数组；密码永不回读；不可 PATCH siteId）；**未** npm publish；**不是** GetStreamUri / WHEP / VOD / 商店 SDK。另：`SDK_CORE_SURFACE` 已含 Webhook CRUD+test 与 Rules/Sites CRUD（client thin wrap 后续切片） |
| 2026-09-15 | 2.0.115 | DEF-03：OpenAPI `$ref` `GET /v1/cameras/{id}/remote-intervention` + `GET /v1/alerts/{id}/remote-intervention`（FR-ECO-07）；仍为大纲、非全量 components；lab 大纲；默认关；**不是**真实 VistaRemote / **不是** session / **不是** TURN / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.114 | FR-RUL-06：Notify 可选 `{{childZoneHint}}` / `{{petHint}}` / `{{childAloneHint}}` / `{{childNearObjectHint}}` / `{{personAloneHint}}` / `{{nearObjectHint}}`（email/WeCom/DingTalk；`payload.* === true` → `"true"`）；Admin Notify hint 文档化；**不是** CSV extras 列 / **不是** HoldMs / **不是** SLA / **不是**新 AlertKind / **不是**儿童宠物检测器 |
| 2026-09-15 | 2.0.113 | FR-RUL-06 / FR-OEM-01/07：Notify 可选 `{{loiteringHint}}` / `{{poseFallHint}}` / `{{nightActivityHint}}`；`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 OEM activations/metering（2.0.107 OpenAPI）；**未** npm publish；**不是** CSV extras / HoldMs / SLA / 已售 SKU / NRE |
| 2026-09-15 | 2.0.112 | FR-RUL-04 / FR-ADM-04：webhook delivery audit 快照 `childZoneHint`/`petHint`/`childAloneHint`/`childNearObjectHint`/`personAloneHint`/`nearObjectHint`（仅 === true）+ GET deliveries?extra=childZoneHint\|petHint\|childAloneHint\|childNearObjectHint\|personAloneHint\|nearObjectHint（与 Alerts extra= leftover-6 cluster 筛选 parity；仍含 loiteringHint/poseFallHint/nightActivityHint/occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；Alerts CSV 仍无 extras 列；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**儿童宠物检测器 / **不是**新 AlertKind |
| 2026-09-15 | 2.0.111 | DEF-03：OpenAPI `$ref` `POST /v1/webhooks/{id}/test` + `POST /v1/webhooks/snapshot-ingest`（FR-RUL-04、FR-AI-11）；仍为大纲、非全量 components；lab 大纲；HMAC ingest **不是** public SDK / **不是** FR-PLT-16 / **不是** multipart / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.110 | FR-RUL-06：Notify 可选 `{{occupied}}` / `{{vacant}}` / `{{entered}}` / `{{left}}`（email/WeCom/DingTalk；`payload.* === true` → `"true"`）；Admin Notify hint 文档化；**不是** CSV extras 列 / **不是** HoldMs / **不是** SLA |
| 2026-09-15 | 2.0.109 | FR-CAR-01/02/03、FR-PRV-04：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 `/v1/households*` CRUD + cameras/contacts/consents/members 与 `/v1/care-incidents*` list/get/cancel/review/close（2.0.106 OpenAPI 表面；**无** create-as-escalated）；**未** npm publish；**不是**商店 SDK / care F1 / auto-120 / ops queue |
| 2026-09-15 | 2.0.108 | FR-RUL-04 / FR-ADM-04：webhook delivery audit 快照 `loiteringHint`/`poseFallHint`/`nightActivityHint`（仅 === true）+ GET deliveries?extra=loiteringHint\|poseFallHint\|nightActivityHint（与 Alerts extra= loiter/fall/night cluster 筛选 parity；仍含 occupied/vacant/entered/left/zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；Alerts CSV 仍无 extras 列；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是** leftover 6 flags / **不是**完整 Alerts extra= allowlist |
| 2026-09-15 | 2.0.107 | DEF-03：OpenAPI `$ref` `/v1/oem/activations*` + `/v1/oem/metering` + `GET /v1/oem/activations/{id}/capabilities`（FR-OEM-01、FR-OEM-07）；仍为大纲、非全量 components；lab 大纲；**不是**已售 SKU / **不是** NRE / **不是**白牌 / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.106 | DEF-03：OpenAPI `$ref` `/v1/households*` + `/v1/care-incidents*`（FR-CAR-01/02/03、FR-PRV-04）；仍为大纲、非全量 components；lab 大纲；**不是** care F1 / **不是** auto-120 / **不是** ops queue / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.105 | FR-EDG-06：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 `GET\|POST /v1/ota/firmware` + `GET /v1/ota/firmware/:id` + `POST /v1/oem/soc-intake/validate`（2.0.101 OpenAPI 表面）；**未** npm publish；**不是**商店 SDK / 刷 ROM / TPM / 白牌 / 已售云桥 |
| 2026-09-15 | 2.0.104 | FR-RUL-04 / FR-ADM-04：webhook delivery audit 快照 `occupied`/`vacant`/`entered`/`left`（仅 === true）+ GET deliveries?extra=occupied\|vacant\|entered\|left（与 Alerts extra= occupancy cluster 筛选 parity；仍含 zoneInside/clipScreenshot/drill/missedFeedHint/overdueHint）；Alerts CSV 仍无 extras 列；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**完整 Alerts extra= allowlist |
| 2026-09-15 | 2.0.103 | FR-PLT-10 / FR-AI-11：HLS/SRT lab curl companions（MediaMTX ingest HLS :8888 / SRT :8890 → ffmpeg 抽一帧 JPEG → kit-a `post-lab-frame.sh`；SRT 需带 libsrt 的 ffmpeg；`FRAME_INGEST_ENABLED` 默认关）；**不是** FR-PLT-16 / **不是** WHIP 产品路径 / **不是** Nest SIP / **不是**刷 ROM / **不是**已售云桥 / **不是** multipart |
| 2026-09-15 | 2.0.102 | FR-AI-01 / FR-EDG-04/05 / FR-ADM-05 / FR-AI-03 / FR-RUL-06/07：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 Face/Edge/OTA/tenants/me/footfall + Notify CRUD + alert ack/FP/resolve；**未** npm publish；**不是**商店 SDK / embedding / TPM / WHEP / VOD |
| 2026-09-15 | 2.0.101 | DEF-03：OpenAPI `$ref` `/v1/ota/firmware`（含 GET by id）+ `POST /v1/oem/devices/claim` + `POST /v1/oem/soc-intake/validate` + `GET /v1/oem/capabilities`；仍为大纲、非全量 components；lab 大纲；**不是**刷 ROM / **不是** TPM / **不是**白牌 / **不是**已售云桥 / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.100 | FR-RUL-06：Notify 可选 `{{zoneInside}}` / `{{clipScreenshot}}`（email/WeCom/DingTalk；`payload.* === true` → `"true"`）；Admin Notify hint 文档化；**不是** CSV extras 列 / **不是** HoldMs / **不是** SLA |
| 2026-09-15 | 2.0.99 | FR-PLT-02/12/06/07 / FR-ECO-01：`@vistacast/sdk` + `SDK_CORE_SURFACE` 包装 probe/discover、export JSON、users/site-grants、audit-logs（2.0.96 OpenAPI 表面）；**未** npm publish；**不是**商店 SDK / **不是** GetStreamUri / WHEP / VOD |
| 2026-09-15 | 2.0.98 | DEF-03：OpenAPI `$ref` Face CRUD + Edge-nodes + OTA packages + `GET/PATCH /v1/tenants/me` + `GET /v1/analytics/footfall`；仍为大纲、非全量 components；lab 大纲；**不是** embedding / TPM / 照片字节 / 零售精度 / GetStreamUri / 新端点 / WHEP / VOD / billing / 商店 / tag |
| 2026-09-15 | 2.0.97 | FR-PLT-10 / FR-AI-11：GB28181 lab curl companion（ZLM 再发布 → ffmpeg 抽一帧 JPEG → kit-a `post-lab-frame.sh`；拒绝 ffmpeg 拉 SIP；`FRAME_INGEST_ENABLED` 默认关）；**不是** Nest SIP / **不是** FR-PLT-16 / **不是**刷 ROM / **不是**已售云桥 / **不是** multipart |
| 2026-09-15 | 2.0.97 | FR-RUL-04 / FR-ADM-04：webhook delivery audit 快照 `zoneInside`/`clipScreenshot`（仅 === true）+ GET deliveries?extra=zoneInside\|clipScreenshot（与 Alerts extra= 筛选 parity；仍含 drill/missedFeedHint/overdueHint）；Alerts CSV 仍无 extras 列；**不是** HoldMs/clipKind / **不是** CSV extras / **不是** SLA / **不是**完整 Alerts extra= allowlist |
| 2026-09-15 | 2.0.96 | DEF-03：OpenAPI `$ref` probe/discover（`/v1/cameras/discover` + probe-source）+ DataLuminary export JSON + users/site-grants + audit-logs；仍为大纲、非全量 components；lab 大纲；**不是** GetStreamUri / **不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.95 | FR-RUL-04：webhook delivery audit 快照 `drill`（仅 === true）+ GET deliveries?extra=drill（与 Alerts extra=drill 筛选 parity；2.0.87 OpenAPI 曾拒绝 deliveries extra=drill——现 **仅**作 lab 投递审计筛选）；仍含 missedFeedHint/overdueHint；Alerts CSV 仍无 extras 列；**不是**新 AlertKind / **不是** SLA / **不是**完整 Alerts extra= allowlist |
| 2026-09-15 | 2.0.94 | FR-AI-11：HMAC lab curl companion `scripts/post-lab-snapshot-ingest.sh` → `POST /v1/webhooks/snapshot-ingest`（`x-snapshot-ingest-secret`；`SNAPSHOT_INGEST_ENABLED` + secret 默认关）；**不是** public SDK / **不是** FR-PLT-16 / **不是** multipart / **不是**已售云桥 |
| 2026-09-15 | 2.0.93 | DEF-03：OpenAPI `$ref` Notify CRUD（`/v1/notification-channels`）+ alerts export/ack/false-positive/resolve；仍为大纲、非全量 components；lab 大纲；**不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.92 | FR-OEM-08 / FR-AI-11 / FR-PLT-10：kit-d WHIP lab curl companion（MediaMTX 再发布 → ffmpeg 抽一帧 JPEG → kit-a `post-lab-frame.sh`；拒绝 ffmpeg 拉 WHIP；`FRAME_INGEST_ENABLED` 默认关）；**不是** FR-PLT-16 / **不是**刷 ROM / **不是**厂商 App P2P / **不是**已售云桥 / **不是** multipart |
| 2026-09-15 | 2.0.91 | FR-RUL-04 / FR-SCN-02：webhook delivery audit 快照 missedFeedHint/overdueHint（仅 === true）+ GET deliveries?extra= 过滤；Admin/SDK Tag；Alerts CSV 仍无 extras 列；**不是**新 AlertKind / **不是** SLA |
| 2026-09-15 | 2.0.90 | FR-SCN-03 / FR-BHV-02 / FR-SCN-02：JWT admin `POST /v1/scenario-packs/:id/apply` 覆盖 remaining shipped packs（home → fall + 夜间 intrusion + zone；care → fall 复用；habitat `rule.custom` fail-closed 不写规则/不写 webhook）；**不是**自动套用 / **不是** F1 / **不是** FR-BHV-02 生产权重 / **不是**新 AlertKind |
| 2026-09-15 | 2.0.89 | FR-SCN-02 / FR-ADM-03 / FR-RUL-05 / FR-ECO-05：MQTT + `/v1/events` 单测保留 `payload.missedFeedHint` / `overdueHint`（parity Admin Tags 2.0.82；care 仍永不 MQTT）；DoerFlow `vistacastAlertEventDataSchema` **显式拒绝** feed hints（schema **未**扩展）；builder 仍 summary-only 丢弃；alerts `extra=` 仍 JSONB `alertExtraContainment`（2.0.55 模式）；sanitize 保留 lab feed hints；**不是**新 AlertKind / **不是** CSV extras 列 |
| 2026-09-15 | 2.0.88 | FR-OEM-08 / FR-AI-11：kit-b RTSP / kit-c RTMP lab curl companions（ffmpeg 抽一帧 JPEG 再走 kit-a `post-lab-frame.sh`；`FRAME_INGEST_ENABLED` 默认关）；**不是** FR-PLT-16 / **不是**刷 ROM / **不是** kit-d WHIP / **不是**已售云桥 / **不是** multipart |
| 2026-09-15 | 2.0.87 | DEF-03：OpenAPI `POST /v1/scenario-packs/{id}/apply` `$ref` 对齐 shared `applyScenarioPack*`（cameraId + applyNotify 默认 false；响应 packId/cameraId/applyNotify/rules/webhooks）；`GET /v1/webhooks/{id}/deliveries` 401/403 `$ref` + optional `extra=` missedFeedHint\|overdueHint（FR-RUL-04 / FR-SCN-02 lab STUB_FEED；**不是** alerts extra=drill）；lab 大纲；**不是** dryRun / **不是** createWebhook / **不是** F1 / **不是** SLA |
| 2026-09-15 | 2.0.86 | FR-VIB-01 / FR-SCN-01：`SDK_CORE_SURFACE` + `@vistacast/sdk` `applyScenarioPack` → JWT admin `POST /v1/scenario-packs/:id/apply`（cameraId 必填；applyNotify 默认关）——**未** npm publish；**不是**商店 SDK；**不是**自动套用；**不是** F1 / **不是**商业关闭 |
| 2026-09-15 | 2.0.85 | FR-VIB-01 / FR-SCN-01：JWT admin `POST /v1/scenario-packs/:id/apply` 显式把 `ruleTemplates` 写成现有规则（pond → intrusion + 夜间 22:00–06:00）；`applyNotify=true` 才 upsert lab webhook；缺模板 / 未知包 fail-closed；Admin **Apply to camera**（非自动套用）；**不是** F1 / **不是**商业关闭 |
| 2026-09-15 | 2.0.84 | DEF-03：OpenAPI `$ref` Rules CRUD、Sites、`GET /v1/scenario-packs`；仍为大纲、非全量 components；**不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.83 | FR-VIB-01 / FR-SCN-02 / FR-SCN-03 / FR-BHV-02：shipped packs 填入 lab `ruleTemplates`/`notifyTemplates`（home：fall/intrusion+zone+webhook；habitat：`rule.custom` 文档化 missed_feed/overdue extras + webhook；care：fall 复用 + webhook，gates 注明无生产权重）；数组仍可选、不必空数组；`hasEvalSet`/`accuracyClaimed` 仍 false；**不是**新 CNN / **不是**新 AlertKind / **不是** F1 |
| 2026-09-15 | 2.0.82 | FR-SCN-02 / FR-ADM-04 / FR-RUL-06：Admin `extra=missedFeedHint` / `extra=overdueHint` filter + Tag（`payload.* === true`）；Notify 可选 `{{missedFeedHint}}` / `{{overdueHint}}`（email/WeCom/DingTalk；`=== true` → `"true"`）；Admin Notify hint 文档化；**不是**新 AlertKind / **不是** CSV extras 列 / **不是** DoerFlow schema 扩展 |
| 2026-09-15 | 2.0.81 | FR-VIB-01：`SDK_CORE_SURFACE` + `@vistacast/sdk` `listScenarioPacks` → JWT admin `GET /v1/scenario-packs` 只读 lab 目录——**未** npm publish；**不是**商店 SDK；**不是** F1 / **不是**商业关闭 / **不是**评测集生成 |
| 2026-09-15 | 2.0.80 | FR-AI-13：`ai` `pose.source=onnx` 仅当 ONNX pose 会话真跑通（`ONNX_POSE_PATH` 空/缺文件/create 失败/`run` 失败/非 pose 张量仍 `stub`；单测锁定）；**不是**新 pose 模型 / **不是** F1 / **不是** VLM / **不是** NPU / **不是**自动 120 |
| 2026-09-15 | 2.0.79 | FR-SCN-02：`STUB_FEED` 默认关；开则 lab extras.missedFeedHint / overdueHint（文档化 `missed_feed`/`overdue` 意图；server 仅 === true 拷贝；`extra=` allowlist；**不是**新 AlertKind）；`hasEvalSet`/`accuracyClaimed` 仍 false；无新 CNN / 无权重 / 无准确率；**不是** clip 闸门 / **不是** F1 |
| 2026-09-15 | 2.0.78 | FR-VIB-01：Admin `/#/scenario-packs` + JWT admin `GET /v1/scenario-packs` 只读 lab 目录（artifacts/packs；八门闩 + 可选 rule/notify 模板）；shipped packs `hasEvalSet`/`accuracyClaimed` 仍 false；诚实文案 lab / **不是** F1 / **不是**商业关闭；**不是**评测集生成 |
| 2026-09-15 | 2.0.77 | FR-VIB-01 / FR-SCN-01：`scenario-pack.v1` 可选 `ruleTemplates`（时段/区域/kind）与 `notifyTemplates`（Webhook/级联/冷却）；pond.theft 夜间 intrusion 22:00–06:00 + lab webhook；shipped packs `hasEvalSet`/`accuracyClaimed` 仍 false；精度 `met` 无评测集仍拒绝；**不是**新 CNN / **不是**商业关闭 / **不是** F1 |
| 2026-09-15 | 2.0.76 | DEF-03：OpenAPI `$ref` Webhook CRUD + deliveries、Camera list/create/patch、Alert list；复用 `FrameIngestRequest`/`FrameIngestAccepted`；仍为大纲、非全量 components；**不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.75 | FR-OEM-08 / FR-AI-11：kit-a ESP32-CAM lab `jpegBase64` POST 草图 + `scripts/post-lab-frame.sh`（HMAC `/internal/v1/ingest/frames` 或 JWT `/v1/cameras/:id/frames`）；`FRAME_INGEST_ENABLED` 默认关；**不是** FR-PLT-16 / **不是**刷 ROM / **不是**已售云桥 / **不是** multipart |
| 2026-09-15 | 2.0.74 | FR-AI-11 / FR-RUL-04：`SDK_CORE_SURFACE` + `@vistacast/sdk` JWT `pushCameraFrame`（`POST /v1/cameras/:id/frames`）与 `listWebhookDeliveries`（`GET /v1/webhooks/:id/deliveries`）；HMAC OEM `POST /internal/v1/ingest/frames` **不是** public SDK——**未** npm publish；**不是**商店 SDK；**不是**生产 ingest / **不是** SLA / **不是** FR-PLT-16 |
| 2026-09-15 | 2.0.73 | FR-AI-11 lab：OEM JPEG 推帧 + 快照 webhook（`FRAME_INGEST_ENABLED` / `SNAPSHOT_INGEST_ENABLED` 默认关；JSON jpegBase64；转发 `ai` 或 spool）；**不是** FR-PLT-16 多租户 SaaS / **不是**已售云桥 / **不是** server/web 权重 |
| 2026-09-15 | 2.0.72 | FR-RUL-04：可选 Webhook 投递审计表 `webhook_deliveries`（每次尝试记 httpStatus/success；HMAC + 3 次退避未改）；`GET /v1/webhooks/:id/deliveries` 租户隔离、分页、新近优先；Admin Webhooks 展开最近投递；**不是** SLA / **不是** MQTT 策略变更 / **不是** MP4/VOD |
| 2026-09-15 | 2.0.71 | FR-VIB-01：场景包八门闩 **lab 字段已产品化**（`scenario-pack.v1` `gates`：商业/数据/拓扑/精度/集成/支持/隐私/责任；`open\|blocked\|waived\|met` + optional note）；shipped packs `hasEvalSet`/`accuracyClaimed` 仍 false，精度门 `blocked`（no eval set）；精度 `met` 在无评测集时拒绝；**不是**商业关闭 / **不是** F1 / **不是**评测集生成 |
| 2026-09-15 | 2.0.70 | DEF-03：OpenAPI `components.schemas` 部分填充（Error `{code,message}`、health/ready/version、preview create/hangup/path、公示品牌）并 $ref `/health` `/ready` `/version` `/v1/auth/login` 与 streams/branding 路径；仍为大纲、非全量 components；**不是**新端点 / WHEP / VOD / 商店 / tag |
| 2026-09-15 | 2.0.69 | FR-SCN-02：habitat.feeding lab 包可加载；`hasEvalSet`/`accuracyClaimed`/`cloudVerify` 仍 false（shared/ai 显式单测锁定；packs ≠ F1）；`missed_feed`/`overdue` 仅为意图文档；无新 CNN / 无权重 / 无准确率；`SCENARIO_PACK_PATH` 默认空 |
| 2026-09-15 | 2.0.68 | 诚实同步：DEF-04 对齐 FR-RTC-08（JPEG+H264）；M3.8/M3.10 playbook 去掉「编码未开始」；ROADMAP M3.6 0–5 / M3.9 切片 4 形状已关；product-roadmap 2.0.13；**不是**真机 NNAPI / 已售云桥 / tag |
| 2026-09-12 | 2.0.67 | FR-RTC-03 / FR-RTC-05 / FR-RTC-08：OpenAPI `createPreviewSession` optional body `{ previewMode?: jpeg|webrtc }`；hangup 200 `endedAt` honesty（signaling only；runtime 停发送端）；shared `signalingHangupSchema` 拒 media/path/vod extras；server `toP2p` 锁定 endedAt/path；`ai` hangup 停 preview sender / webrtc count；path POST 仍分离——hangup/path telemetry **不是** Event Engine / **不是** VOD；**不是**计费 / **不是**商店 SDK |
| 2026-09-12 | 2.0.66 | FR-RTC-05：shared `p2pSessionSchema` 锁定 `path: failed`（+ optional previewMode/firstFrameMs 单测）；`SDK_CORE_SURFACE` 含 hangup；OpenAPI `POST .../path` requestBody 文档化 `p2p`/`turn`/`failed` + optional firstFrameMs；FR-RTC-08：`@vistacast/sdk` `hangupPreviewSession`；Admin peer POST hangup 源码锁定——hangup/path telemetry / 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK |
| 2026-09-12 | 2.0.65 | FR-RTC-05：`SDK_CORE_SURFACE` + `@vistacast/sdk` `reportPreviewPath` → `POST .../sessions/:id/path`；Admin peer ICE failed → `flushTelemetry("failed")`；FR-RTC-08：shared `signalingOutboundSchema` 严格拒绝非法 ready.previewMode（mp4/vod/junk）；`ai` 仍先 strip 再 parse（2.0.64）——path telemetry / 信令 **不是** Event Engine / **不是** VOD；**不是**商店 SDK |
| 2026-09-12 | 2.0.64 | FR-RTC-08：`ai` ready 非法 `previewMode`（mp4/vod/junk）忽略 → jpeg 默认（同 omit）；FR-RTC-05：shared `reportPreviewPathRequestSchema` 锁定 `p2p`/`turn`/`failed`（+ optional firstFrameMs；拒绝 VOD-ish path）；Admin `resolveIcePath` remote relay → turn——preview path telemetry / 信令 **不是** Event Engine / **不是** VOD |
| 2026-09-12 | 2.0.63 | FR-RTC-08：`ai` PreviewController ready omit → jpeg；SignalingHub `notifyRuntimeNeed` 有值则带 jpeg/webrtc、undefined 则 omit（runtime 默认 jpeg）；诚实口径：Admin URL `?mode=` 默认 webrtc；server create body / ai ready omit → jpeg；Admin 仍 POST 显式 `previewMode`——preview 信令 **不是** Event Engine / **不是** VOD |
| 2026-09-12 | 2.0.62 | FR-RUL-04：Webhook 单测证明 **仍**投递 care+drill；FR-RUL-05：MQTT **仍**跳过 care（对比 EventsHub/Webhook；Webhook/EventsHub ≠ MQTT care 策略；webhook 可带 care，MQTT 永不）；FR-RTC-08：server `resolveSessionPreviewMode` 默认 jpeg；Admin URL `parsePreviewModeQuery` 默认 webrtc（除非 `mode=jpeg`）——preview 信令 **不是** Event Engine / **不是** VOD |
| 2026-09-12 | 2.0.61 | FR-SCN-03 / FR-VIB-01：home-safety（及 shipped packs）`hasEvalSet` 仍 false（shared/ai 显式单测锁定；packs ≠ F1）；FR-ADM-03：EventsHub 单测证明 care+drill 上 Admin live stream；FR-RUL-05：MQTT **仍**跳过 care（Admin WS ≠ MQTT care 策略）；FR-RTC-08：Admin preview 页 POST `{ previewMode }`（源码/单测锁定；preview 信令 **不是** Event Engine / **不是** VOD） |
| 2026-09-12 | 2.0.60 | FR-RTC-08：`@vistacast/sdk` `createPreviewSession` 发送 `CreatePreviewSessionRequest` body；shared `createPreviewSessionRequestSchema` 拒绝非 jpeg/webrtc；sdk 客户端单测覆盖 body——preview 信令 **不是** Event Engine / **不是** VOD；FR-RUL-05：MQTT **仍**跳过 care（即便 payload 另有 lab `drill`；care 永不 MQTT；lab drill 元数据仅当 care 缺席） |
| 2026-09-12 | 2.0.59 | FR-AI-13 / care：`ai` `sanitizeCareExtras` **保留** lab `drill`，**剥离** `call_120` / `stage` / `escalate`（forbidden care escalation keys；**不是** auto-120 / **不是** care 生产）；FR-ADM-04：server detection payload 拷贝 **从不**镜像 care escalation / auto-120 extras（与 drill 并存时仅 allowlist）；FR-ADM-04 / FR-PRV-06：Admin 展示 drill + Event Engine clip/HoldMs tags，**无**视频播放器——lab webhook drill metadata + Event Engine tags only，**不是** auto-120 / **不是** care 生产 / **不是** MP4/VOD |
| 2026-09-12 | 2.0.58 | FR-RUL-06：email subject/body + DingTalk `bodyTemplate` 插值 `{{drill}}`（与企微 parity；`payload.drill === true` → `"true"`）；FR-ECO-05：shared `vistacastAlertEventDataSchema` **显式拒绝** `drill`（summary-only CloudEvent `data`；非 inbox extras；schema **未**扩展）；FR-AI-13 / FR-SCN-03：`ai` map/ingest 保留 `extras.drill`（lab metadata mirror；**不是** clip 闸门）——lab webhook drill / 提醒 metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care；DoerFlow 仍 summary-only |
| 2026-09-12 | 2.0.57 | FR-RUL-06 / FR-PRV-06：Notify 文本模板可选 `{{drill}}`（`payload.drill === true` → `"true"`）；Admin Notify hint 文档化 `drill`；FR-ECO-05：DoerFlow CloudEvent `data` 仍 summary-only——drill-shaped alerts 仍丢弃 drill/clipKind/HoldMs（单测锁定）——lab webhook drill / 提醒 metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care；DoerFlow **不是** Event Engine extras 平面 |
| 2026-09-12 | 2.0.56 | FR-ECO-01 / FR-ECO-07：`sanitizeSmartSiteExportAlert` **保留** lab `payload.drill` 元数据（仍 **剥离** clipRef/care/media-shaped）；FR-ADM-04：Admin CSV 仍九列——`drill` **不**成 CSV 列（仅 `extra=drill` 筛选）；list/export 选中筛选时带 `extra=drill`——lab webhook drill / sample metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care |
| 2026-09-12 | 2.0.55 | FR-PRV-06 / FR-AI-13：`ai` 单测锁定 `extras.drill`（及 HoldMs/clipKind alone）**不是** clip 闸门；FR-ADM-04：server `alertExtraContainment("drill")` SQL/json_extract 单测覆盖 Admin `extra=drill`；FR-ADM-03：Admin live events 解析保留 `payload.drill` 元数据——lab webhook drill / sample metadata only，**不是**生产指标 / **不是** care / **不是** MP4/VOD |
| 2026-09-12 | 2.0.54 | FR-ADM-04 / FR-RUL-04：`drill` 入 `ALERT_PAYLOAD_EXTRA_FLAGS`；Admin `extra=drill` filter + Tag（`payload.drill === true`）；server 经 shared allowlist 拷贝 `extras.drill === true`——lab webhook drill / sample metadata only，**不是**生产指标 / **不是** MP4/VOD / **不是** care |
| 2026-09-12 | 2.0.53 | FR-RUL-04：Admin Webhooks UI `drillHint` 文档化 drill sample metadata（`clipKind` / `sittingHoldMs`；web 单测）；FR-AI-13 / FR-SCN-03：`ai` fixture `webhook-drill-sample.json` 镜像 drill extras（≠ F1；**不是** clip 闸门）；FR-RUL-05 / FR-ADM-03：单测证明 drill-shaped alerts 在 MQTT 与 `/v1/events` 保留 metadata；非 MP4/VOD/自动 120/F1/`hasEvalSet` true |
| 2026-09-12 | 2.0.52 | FR-ADM-04：web 测试确认 Admin Alerts `extra=` filter options **从不**含 HoldMs/clipKind；FR-RUL-04：webhook test-delivery drill payload 含 lab sample `clipKind`（+ optional HoldMs）供元数据 Cloud Sync 校验——**不是** bytes/VOD/**不是**生产事件；FR-ECO-05：server 抽出 `buildDoerflowAlertEventData`；单测证明 AlertEvent 带 clipKind/HoldMs 时仍 summary-only；非 MP4/VOD/自动 120/F1/`hasEvalSet` true |
| 2026-09-12 | 2.0.51 | FR-RUL-06：notification-dispatcher 测试证明 email `subjectTemplate`/`bodyTemplate` + DingTalk `bodyTemplate` 插值 HoldMs/clipKind（提醒元数据路径）；FR-ADM-04：shared `listAlertsQuerySchema` / `exportAlertsQuerySchema` **显式拒绝** `extra=`HoldMs / clipKind / clipRef（及 clipDurationMs）；FR-ECO-01 / FR-ECO-07：`sanitizeSmartSiteExportAlert` **保留** lab 元数据 clipKind/*HoldMs/clipScreenshot，**剥离** clipRef/care/jpeg-ish/credential 键（shared 单测；**不是** VOD 字节）；非 MP4/VOD/自动 120/F1/`hasEvalSet` true |
| 2026-09-12 | 2.0.50 | FR-ADM-04：CSV 导出列单测确认仍 **无** clipKind / HoldMs / clipRef / payload extras；FR-ECO-05：shared `vistacastAlertEventDataSchema` **显式拒绝** clipKind / HoldMs / clipRef（summary-only DoerFlow data；schema **未**扩展；仅 rejection 测试）；FR-AI-13 / FR-SCN-03：`ai` fixtures lying/still/fall `*-hold-ms-only.json`（HoldMs alone ≠ clip 闸门 ≠ F1）；非 MP4/VOD/自动 120/F1/`hasEvalSet` true |
| 2026-09-12 | 2.0.49 | FR-RUL-06：notification-dispatcher 测试证明自定义模板插值 remaining HoldMs + clipKind 进企微/邮件文本（提醒元数据路径）；FR-ADM-03：Admin `/v1/events` 客户端解析测试保留 clipKind/HoldMs（元数据 Cloud Sync）；FR-AI-13 / FR-SCN-03：`ai` fixtures `*-hold-ms-only.json`（loiter/night/vacant/alone；人工复核 ≠ F1；HoldMs alone **不是** clip 闸门）；FR-ECO-05 诚实：DoerFlow CloudEvent `data` 仍为 **summary-only**（`vistacastAlertEventDataSchema`），**不**携带 clipKind / HoldMs / JPEG 字节；Event Engine 元数据 Cloud Sync 平面仍为 Webhook / MQTT / `/v1/events` / Notify——**不是** DoerFlow inbox extras；**不**扩展 shared schema；非 MP4/VOD/自动 120/F1/`hasEvalSet` true/24/7 |
| 2026-09-11 | 2.0.48 | FR-RTC-08 / FR-ADM-09：Admin `webrtc` 无首帧（约 10s）或 ICE failed 时自动改走 `jpeg` DataChannel；仍 P2P-first + TURN；**不是** Nest WHEP / API 转封装 / 云 SFU；真机 NAT 仍 ⬜ |
| 2026-09-11 | 2.0.47 | FR-RUL-04 / FR-RUL-05 / FR-ADM-03 / FR-RUL-06 / FR-PRV-06 / FR-AI-13：lab Event Engine Cloud Sync 诚实口径——Webhook（full AlertEvent JSON）、MQTT（full AlertEvent JSON；care 跳过）、`/v1/events` WS（`{ type: "alert", alert }`）均为**元数据 JSON**，**不是** bytes / **不是** MP4 / **不是** VOD；FR-RUL-06 Notify 文本模板另可选 `{{loiterHoldMs}}` `{{nightHoldMs}}` `{{vacantHoldMs}}` `{{aloneHoldMs}}`（叠加 2.0.46 clip/HoldMs）；`deploy/.env.example` 短评；home-safety `hasEvalSet` 仍 false；非自动 120 / 非已售云桥 |
| 2026-09-11 | 2.0.46 | FR-RUL-06 / FR-PRV-06 / FR-AI-13：Notify 文本模板（email / WeCom / DingTalk）可选 lab 占位 `{{clipRef}}` `{{clipKind}}` `{{behavior}}` `{{clipJpegCount}}` `{{clipDurationMs}}` `{{sittingHoldMs}}` `{{lyingHoldMs}}` `{{stillHoldMs}}` `{{fallHoldMs}}`；Admin Notify 页文档化；`deploy/.env.example` 文档化 clipKind + notify 元数据诚实口径；Event Engine **提醒**路径仅插值元数据，**不是**通知渠道内嵌视频 / **不是** raw JPEG 字节；FR-RUL-04 Webhook 仍发 AlertEvent JSON（payload 可含 clipKind）仍是元数据；HoldMs / clipKind 行为仍 2.0.39–2.0.45；home-safety `hasEvalSet` 仍 false；**不是** muxed MP4 / **不是** 5–15s 编码短视频 / **不是** 30 天云端点播/Admin 视频播放器；非自动 120 / 非已售云桥 |
| 2026-09-11 | 2.0.45 | FR-PRV-06 / FR-AI-13 / FR-ADM-04 / FR-SCN-03：lab DetectionIngest 在 clip 附着时 stamp `extras.clipKind: "jpeg_ring" | "jpeg_screenshot"`；控制面拷贝至 alert payload；Admin Tag；**lab Event Engine 元数据 Cloud Sync**（alert extras + clipRef），**不是**把 JPEG/MP4 字节上传云存储作 VOD；sidecar `kind`（2.0.44）仍保留，`extras.clipKind` 为 ingest 镜像；clipKind alone **不是** clip 闸门；**不是** extra= flag；**不是** CSV 列；HoldMs（2.0.39–2.0.43）不变；home-safety `hasEvalSet` 仍 false；**不是** muxed MP4 / **不是** 5–15s 编码短视频 / **不是** 30 天云端点播/Admin 视频播放器；非自动 120 / 非已售云桥 |
| 2026-09-11 | 2.0.44 | FR-PRV-06 / FR-AI-13：`ai` clip sidecar 增加 `kind: "jpeg_ring" \| "jpeg_screenshot"`；lab fixture `clip-jpeg-ring.json`（clipRef + clipJpegCount + clipDurationMs + clipScreenshot 供人工复核，≠ F1）；server `POST /internal/v1/clips/presign` 文档化为 `lab://` 指针，**不是** MP4 upload/VOD；web 测试：Event Engine tags 仅为元数据、**无**播放器；lab Event Engine = JPEG ring 和/或末帧截图，**不是** muxed MP4 / **不是** 5–15s 编码短视频上传 / **不是** 30 天云端点播/Admin 视频播放器；`clipDurationMs` = JPEG ring 墙钟跨度不是编码时长；`CLIP_SECONDS` 5–15 仅定 JPEG ring 槽位，**不得**写成 `CLIP_SECONDS*1000` extras；FR-ADM-04 / FR-SCN-03：HoldMs（2.0.39–2.0.43）不变；home-safety `hasEvalSet` 仍 false；非自动 120 / 非已售云桥 |
| 2026-09-11 | 2.0.43 | FR-AI-13 / FR-SCN-03：`ai/src/infer/fixtures/` 可选含 `*HoldMs` 整数供人工复核（fixtures ≠ F1 eval；HoldMs alone **不是** clip 闸门；**不是** extra=；**不是** CSV extras 列）；`deploy/.env.example` 文档化 `*_SEC > 0` 可 stamp HoldMs，Compose 已透传；server 合并 hold-key 拷贝列表（无行为变更）；FR-ADM-04 extra= allowlist 仍 2.0.38（整数 HoldMs / clip* 不进 extra=；CSV 仍无 extras 列）；FR-PRV-06 lab Event Engine 仍 JPEG ring / 末帧截图，**不是** muxed MP4 / **不是** 5–15s 编码短视频 / **不是** 30 天云端点播；home-safety `hasEvalSet` 仍 false；vacantHoldMs / aloneHoldMs 仍 2.0.42；非 60-min / 非 24/7 / 非儿童检测器 SLA / 非自动 120 / 非宠物儿童 YOLO / 非已售云桥 |
| 2026-09-11 | 2.0.42 | FR-AI-13 / FR-SCN-03 lab extras.vacantHoldMs / aloneHoldMs 整数 1–3600000（墙钟当 vacant 且 `BEHAVIOR_VACANT_SEC > 0`、personAloneHint 且 `BEHAVIOR_ALONE_SEC > 0`；默认 0=vacantFrames / aloneFrames 路径则 **omit**；`STUB_VACANT` 仍 omit；aloneHoldMs **不是**儿童检测器；3600000 是 extras 整数上限，**不是** 24/7 无人 SLA / **不是** 60 分钟独处 SLA）；FR-ADM-04 extra= allowlist 仍 2.0.38（整数 clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs / vacantHoldMs / aloneHoldMs 不进 extra=；CSV 仍无 extras 列）；**不是** clip 闸门本身（vacant / personAloneHint 已可 clip）；FR-PRV-06 lab Event Engine 仍 JPEG ring（`CLIP_ENABLED` 编号 JPEG + 末帧 jpg）和/或末帧截图（`CLIP_SCREENSHOT`），**不是** muxed MP4 / **不是** 5–15s 编码短视频 / **不是** 30 天云端点播/播放器；`clipDurationMs` 是 JPEG ring 墙钟跨度不是编码时长；不是新 AlertKind / Behavior enum / 宠物或儿童 YOLO class；sittingHoldMs / lyingHoldMs / stillHoldMs 仍 2.0.40；loiterHoldMs / nightHoldMs 仍 2.0.41；fallHoldMs 仍 2.0.39（1–60000）；home-safety `hasEvalSet` false；非 F1 / 非自动 120 / 非已售云桥 |
| 2026-09-11 | 2.0.41 | FR-AI-13 / FR-SCN-03 lab extras.loiterHoldMs / nightHoldMs 整数 1–3600000（墙钟当 loiteringHint 且 `BEHAVIOR_LOITER_SEC > 0`、nightActivityHint 且 `NIGHT_HOLD_SEC > 0`；默认 0=帧路径 / 即时 hint 则 **omit**；`STUB_LOITER` / `STUB_NIGHT` 仍 omit；3600000 是 extras 整数上限，**不是** 60 分钟生产 SLA / **不是** 夜间 F1 / **不是** 24/7）；FR-ADM-04 extra= allowlist 仍 2.0.38（整数 clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs / loiterHoldMs / nightHoldMs 不进 extra=；CSV 仍无 extras 列）；**不是** clip 闸门本身（loiteringHint / nightActivityHint 已可 clip）；不是新 AlertKind / Behavior enum / 宠物或儿童 YOLO class；sittingHoldMs / lyingHoldMs / stillHoldMs 仍 2.0.40；fallHoldMs 仍 2.0.39（1–60000）；home-safety `hasEvalSet` false；非 F1 / 非自动 120 / 非 MP4 / 非点播 / 非已售云桥 |
| 2026-09-11 | 2.0.40 | FR-AI-13 / FR-SCN-03 lab extras.sittingHoldMs / lyingHoldMs / stillHoldMs 整数 1–3600000（墙钟当 sitting_long / lying_long / no_movement 且对应 `BEHAVIOR_*_SEC > 0`；默认 0=帧路径则 **omit**；3600000 是 extras 整数上限以便 `BEHAVIOR_SITTING_SEC=3600` 时可出现 60 min 墙钟，**不是** 60 分钟生产 SLA）；FR-ADM-04 extra= allowlist 仍 2.0.38（整数 clipJpegCount / clipDurationMs / fallHoldMs / sittingHoldMs / lyingHoldMs / stillHoldMs 不进 extra=；CSV 仍无 extras 列）；**不是** clip 闸门本身（sitting_long 行为已可 clip）；不是新 AlertKind / Behavior enum；FR-AI-13 fallHoldMs 仍 2.0.39；home-safety `hasEvalSet` false；非 F1 / 非自动 120 / 非 24/7 / 非儿童宠物 YOLO / 非 MP4 / 非点播 / 非已售云桥 |
| 2026-09-10 | 2.0.39 | FR-AI-13 / FR-SCN-03 lab extras.fallHoldMs 整数 1–60000（墙钟自 per-track fallSince；当 poseFallHint 发出且 `BEHAVIOR_FALL_HOLD_SEC > 0`；默认 hold 0=2 帧 hint，**无** fallHoldMs；不是 anomaly=fall / 不是 10s 生产 SLA / 不是自动 120 / 不是 extra= flag / 不是 CSV 列 / 不是 F1）；FR-ADM-04 extra= allowlist 仍 2.0.38（整数 clipJpegCount / clipDurationMs / fallHoldMs 不进 extra=；CSV 仍无 extras 列）；FR-PRV-06 clipDurationMs / extras.zoneInside / `ai/src/infer/fixtures/` / home-safety `hasEvalSet` false 仍 2.0.38；非 VLM / 非 NPU / 非 24/7 / 非儿童宠物 YOLO / 非已售云桥 / 非 5–15s 编码视频 |
| 2026-09-10 | 2.0.38 | FR-PRV-06 lab extras.clipDurationMs 整数 1–60000（JPEG ring 墙钟 last−first `occurredAt`；CLIP_ENABLED 写 ≥2 帧才设；sidecar 可重复 durationMs；CLIP_SCREENSHOT-only 不设；不是 CLIP_SECONDS*1000、不是 muxed MP4、不是 5–15s 编码视频、不是 30 天点播、不是播放器、不是 extra= flag（整数仍不进布尔 allowlist）；CSV 仍无 extras 列；控制面无字节）；FR-ADM-04 extra= / extras.zoneInside / `ai/src/infer/fixtures/` / home-safety `hasEvalSet` false 仍 2.0.37；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非儿童宠物 YOLO / 非已售云桥 |
| 2026-09-10 | 2.0.37 | FR-AI-13 / FR-SCN-03 lab extras.zoneInside（质心在多边形内占用；server 仅 === true 拷贝；Admin tag；不是 zoneEnter 边沿、不是 loiteringHint、不是新 AlertKind、不是 60 分钟 SLA）；FR-ADM-04 GET `/v1/alerts` 与 CSV export 可选 query `extra`=一个 allowlist lab 布尔 payload flag（含 zoneInside / clipScreenshot）；未知 extra 400；JSONB payload 含 `{extra: true}`；不是单页客户端过滤；CSV 仍无 extras 列；`GET /v1/export/alerts` JSON **不**筛 extra；home-safety `hasEvalSet` 仍 false；`ai/src/infer/fixtures/` 18 条 DetectionIngest 复核（不是 F1 eval）；detectionNeedsClip 亦认 extras.clipScreenshot（zoneInside / occupied / personCount 仍不开 clip）；OpenAPI 已文档化 `extra`；CLIP / 截图 / 无播放器 / 非 MP4 / 非 5–15s 编码视频 / 非 30 天点播 / 非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非儿童宠物 YOLO / 非已售云桥；`CLIP_SCREENSHOT` 已文档化且 Compose 已透传 |
| 2026-09-10 | 2.0.36 | FR-PRV-06 lab `CLIP_SCREENSHOT` 默认 false；true 且 `CLIP_ENABLED` false 时仅末帧 `{id}.jpg` + clipRef，无编号 ring（非 MP4 / 非 5–15s 编码视频 / 非 30 天点播）；`CLIP_ENABLED` 仍写编号 JPEG ring + 末帧 jpg；extras.clipScreenshot=true 当末帧 jpg 已写；Admin tag；控制面无字节 / 无播放器；clipJpegCount 仍是编号 ring 长度 1–32（不是截图 flag）；FR-AI-13 CLIP 闸门未改（personCount 本身不 clip）；`deploy/.env.example` 已文档化 `CLIP_SCREENSHOT`；Compose 已透传；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 MP4 / 非 30 天点播 / 非儿童宠物 YOLO / 非已售云桥 |
| 2026-09-10 | 2.0.35 | FR-AI-13 lab `NIGHT_HOLD_SEC` 默认 0=时段窗即时 `nightActivityHint`；>0 per-track `nightSince` 延迟；`STUB_NIGHT` 仍即时（非 F1 / 非 24/7）；extras.personCount 整数 0–32（0=vacant；场景占用自 `countPersons`，非人群模型；Admin 计数 tag；控制面无视频字节）；CLIP 闸门未改（personCount 本身不 clip）；FR-SCN-03 仍非儿童/宠物 YOLO / 非人群分析；`deploy/.env.example` 已文档化 `NIGHT_HOLD_SEC`；Compose 已透传；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 60 分钟 SLA / 非 MP4 / 非儿童宠物 YOLO / 非人群分析 / 非已售云桥 |
| 2026-09-10 | 2.0.34 | FR-AI-13 lab per-track loiterSince（`BEHAVIOR_LOITER_SEC` 默认 0=帧路径 loiteringHint；>0 wall-clock 静止+inZone，非 60 分钟 SLA；`STUB_LOITER` 未改）；`BEHAVIOR_ALONE_SEC` 默认 0=`BEHAVIOR_ALONE_FRAMES` 路径，>0 wall-clock personAloneHint（非儿童检测器）；`BEHAVIOR_VACANT_SEC` 默认 0=vacantFrames，>0 empty-episode wall-clock（非 24/7）；Admin i18n sitting_long / lying_long / no_movement 为 lab 标签（非 F1）；FR-PRV-06 CLIP 仍 JPEG ring（非 MP4）；FR-EDG-09 WASM 窗口不是 ai EventEngine（居家规则在 ai）；env.example 与 Compose 已透传新 flag；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 60 分钟 SLA / 非 MP4 / 非儿童宠物 YOLO / 非已售云桥 / 非 JS 生产 YOLO |
| 2026-09-10 | 2.0.33 | FR-AI-13 lab per-track stillSince（`BEHAVIOR_STILL_SEC` 默认 0=帧路径 `no_movement`；>0 为 wall-clock，不受 HISTORY_CAP=60 帧限制，非无活动 SLA）；extras.personAloneHint（`BEHAVIOR_ALONE_FRAMES` 默认 0=关；几何恰好一人 N 帧，非儿童检测器；`STUB_CHILD_ALONE` / childAloneHint 未改）；extras.nearObjectHint（`NEAR_OBJECT_DIST` 默认 0=关；几何质心距 unknown/vehicle bbox，非危险物品检测器；`STUB_CHILD_NEAR_OBJECT` 未改）；FR-PRV-06 CLIP_ENABLED 亦挂这些 extras JPEG ring（非 MP4）；Admin 仅 payload flag 严格 true 出 tag，无播放器；FR-SCN-03 仍非儿童独处生产 / 非危险物品检测器；env.example 与 Compose 已透传新 flag；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 60 分钟 SLA / 非 30 天点播 / 非已售云桥 |
| 2026-09-09 | 2.0.32 | FR-AI-13 lab per-track sittingSince / lyingSince（`BEHAVIOR_SITTING_SEC` / `BEHAVIOR_LYING_SEC` 默认 0=帧路径；>0 为 wall-clock，不受 HISTORY_CAP=60 帧限制，非 60 分钟 SLA）；`BEHAVIOR_FALL_HOLD_SEC` 默认 0=现 2 帧 poseFallHint，>0 水平保持才延迟 hint（非 anomaly=fall / 非自动 120 / 非 10s SLA）；FR-PRV-06 `CLIP_SECONDS` 默认 0=CLIP_RING_SIZE，5–15≈关键帧间隔 JPEG ring（非 MP4 / 非编码视频 / 非 30 天点播）；ingest extras.clipJpegCount 1–32，Admin 计数 tag，无播放器、控制面无字节；FR-SCN-03 久坐/久卧仍非 60 分钟 SLA；env.example 与 Compose 已透传新默认 0；非 F1 / 非 VLM / 非 NPU / 非 24/7 / 非已售云桥 |
| 2026-09-09 | 2.0.31 | FR-AI-13 lab extras.childAloneHint / childNearObjectHint / zoneInside 区内占用；NIGHT_TZ 空=UTC；FR-PRV-06 CLIP_ENABLED 亦挂 hint JPEG ring（非 MP4）；FR-SCN-03 仍非儿童独处生产 / 非危险物品检测器；env.example 与 Compose 已透传新 flag；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 60 分钟 SLA / 非 30 天点播 |
| 2026-09-09 | 2.0.30 | FR-AI-13 lab extras.petHint；loiteringHint 须 zone；sitting wall-clock 可选（`BEHAVIOR_SITTING_SEC` 默认 0）；Admin tag；FR-SCN-03 仍非宠物 class / 非儿童检测器；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 |
| 2026-09-09 | 2.0.29 | FR-AI-13 lab extras.vacant / entered / left / nightActivityHint；Admin tags；FR-SCN-03 仍非儿童/宠物检测器；非 F1 / 非 VLM / 非 NPU / 非自动 120 / 非 24/7 / 非 30 天点播 |
| 2026-09-09 | 2.0.28 | FR-AI-13 lab extras.loiteringHint / occupied；FR-PRV-06 编号 JPEG 序列 + 末帧截图；Admin tags；FR-SCN-03 儿童区桩未改（滞留不是儿童检测器）；非 F1 / 非 VLM / 非 MP4 / 非 30 天点播 |
| 2026-09-09 | 2.0.27 | FR-PRV-06 lab 截图 JPEG 落盘；FR-SCN-03 STUB_CHILD_ZONE；Admin 筛选 i18n + poseFallHint/childZoneHint；非 F1 / 非儿童检测器 / 非 MP4 / 非 30 天点播 |
| 2026-09-09 | 2.0.26 | FR-AI-13 `ai` lab track/stub pose/STUB_BEHAVIOR；FR-PRV-06 CLIP_ENABLED 默认关 + lab://；Compose 透传 env；非 F1 / 非 VLM / 非 30 天点播 |
| 2026-09-09 | 2.0.25 | 控制面 ingest 透传 clipRef / trackId / behavior / poseSource；presign 默认 503，`CLIP_STORAGE=local` 才 `lab://`；非已售录像 / 非 30 天点播 |
| 2026-09-09 | 2.0.24 | Admin 展示 clipRef / payload.behavior / trackId（无播放器、无新 kind）；FR-SCN-03 包可加载；非 F1 / 非 VLM / 非 30 天云点播 |
| 2026-09-09 | 2.0.23 | ADR-17 场景包并行；FR-AI-13 / FR-SCN-03 / FR-PRV-06 规格先行；home.safety 包壳；非 VLM / 非 F1 |
| 2026-09-09 | 2.0.22 | FR-PLT-17 / ADR-16：前期不承诺平台 24/7；定制模组与云监控未售 |
| 2026-09-09 | 2.0.21 | 三条现场路径 + 定制模组规格（FR-MOD-01～04、FR-PLT-16）先行；量产与多租户 ingest 仍 ⬜ |
| 2026-09-09 | 2.0.20 | FR-RTC-08：jpeg/webrtc 双模式预览（P2P-first + TURN）；不是 API 直推 / SFU |
| 2026-09-07 | 2.0.19 | FR-UX-02：Electron / RN 启动先登录（嵌入 Admin 登录，未登录不打开 Detect） |
| 2026-09-07 | 2.0.18 | FR-BIL-01/02/03 + FR-OPS-02：套餐/entitlement/租约/Stripe webhook 形状；边缘健康 409；未宣布已售 |
| 2026-09-06 | 2.0.17 | FR-ECO-07 server 发送器：SyncroBrain HMAC dispatcher、VistaRemote 深链 `sourceRef`、DataLuminary CORS/分页；care/face 拒绝；默认关。Entitlement `service` 探 `/ready`，不是授权判定。Caddyfile.example + compose-smoke preflight |
| 2026-09-06 | 2.0.16 | FR-PLT-13/14/15 与 FR-ECO-07 登记为 🟡（契约 + 配置 + 单测已关；真实组合主机 / 中央 Entitlement / 兄弟产品端点未接） |
| 2026-09-06 | 2.0.15 | FR-ECO-05 可选实验室适配器；统一 M3/M4 漂移；stub 非生产 |
| 2026-09-05 | 2.0.14 | FR-UX-04 / FR-PLT-12 实验室编码关闭：`/setup` + `POST /v1/cameras/probe-source`；Playwright H1 绿；GetStreamUri / F1 / 厂商 P2P 仍 ⬜ |
| 2026-09-05 | 2.0.13 | FR-UX-04 / FR-PLT-12：设备接入中心 + 进流探测；GetStreamUri / F1 / 厂商 P2P 仍 ⬜ |
| 2026-09-04 | 2.0.12 | FR-UX-01/02/03 第一轮：设计系统 + 三端场景化壳；不改 API；商店/NPU/tag 仍 ⬜ |
| 2026-09-04 | 2.0.11 | FR-OEM-07：GET `/v1/oem/capabilities` lab 目录；非白牌、非已售云桥；商店/NPU/tag 仍 ⬜ |
| 2026-09-03 | 2.0.9 | 当前产品工程规划关闭；交付测试清单 + 采购表；人类门闩仍 ⬜ |
| 2026-09-03 | 2.0.8 | M3.9 切片 1–3：FR-AI-12 🟡 env SKU；FR-AI-10 已售 / Stripe 仍 ⬜ |
| 2026-09-03 | 2.0.7 | M3.8 切片 2–3：FR-EDG-12 🟡 SHIM + 诚实报告；矩阵 / NPU 仍 ⬜ |
| 2026-09-03 | 2.0.6 | M3.10 切片 1–4：FR-OEM-09 🟡 脚手架；FR-PLT-11 / 商店提交仍 ⬜ |
| 2026-09-02 | 2.0.5 | M3.8–M3.10 playbook 切片 0；NNAPI/已售云桥/商店 tag 仍 ⬜ |
| 2026-09-02 | 2.0.4 | FR-PLT-10 / FR-OEM-08：多协议进流 + ESP32 套件；WHIP/国标经网关；禁止厂商 App P2P |
| 2026-09-02 | 2.0.2 | M3.6 切片 3：server 云桥按帧/次预占与 429 切断（非计费上线）；商店/NPU/自建 GPU/tag 仍 ⬜ |
| 2026-09-02 | 2.0.1 | M3.6 切片 1–2：placement/bridge/pack 契约 + `ai` 平面选路/云桥限流（非生产、非已售 SKU）；商店/NPU/自建 GPU/tag 仍 ⬜ |
| 2026-09-02 | 2.0.0 | 战略 1.2 确认；M3.6 开口；FR-AI-08 ONNX 吃真实 JPEG（lab，非 F1）；商店/NPU/自建 GPU/tag 仍 ⬜ |
| 2026-08-31 | 1.9.0 | M3.5：窗口内 YOLO/Chat（`client-infer`）；云端视觉大模型改为延期；商店上架 / tag 仍 ⬜ |
| 2026-08-31 | 1.8.0 | M3.4：门店盒子一键包 + Electron/RN 壳封装本机 `ai`；禁止云端视觉大模型 / 商店上架 / tag |
| 2026-08-31 | 1.7.2 | D0 A1 签字：战略 1.1 + 路线图以当前仓库为准；M1/M2/M3 tag 与 F1/OEM 仍未勾 |
| 2026-08-31 | 1.7.1 | FR-RTC-07：自建 STUN、TURN UDP+TCP、P2P-first；禁止默认 Google STUN；真机 NAT 仍 ⬜ |
| 2026-08-30 | 1.7.0 | M3.3：上线 overlay / 租户品牌 / thin sdk 仓；商店 App / NRE / 真机 NAT / tag 仍 ⬜；`krEligible=false` |
| 2026-08-29 | 1.4.0 | M3 P0 非生产试点技术验收：切片 0–10 代码/自动化关闭；独立 accept PASS、`krEligible=false`；OEM NRE/固件/准确率/法律/责任/白牌/tag 仍 ⬜；M1/M2 F1 诚实未勾 |
| 2026-08-29 | 1.3.0 | 开 M3 P0 试点：playbook + 契约；FR-CAR/OEM/PRV 控制面仍 ⬜；M2 F1/OEM 仍未勾；未打生产 tag |
| 2026-06-26 | 1.0.0 | 初版：D0 状态快照 |
| 2026-08-17 | 1.1.0 | M1 可编码；FR 按第一商业版重列；DL/BE 不再阻塞 |
| 2026-08-17 | 1.1.1 | 切片 1：`shared` Zod 对齐 artifacts，测试/构建通过 |
| 2026-08-17 | 1.1.2 | 切片 2：`server` Fastify CRUD + 本地登录 + ONVIF L1 |
| 2026-08-17 | 1.1.3 | 切片 3：规则、告警冷却去重、Webhook HMAC/重试 |
| 2026-08-18 | 1.1.4 | 切片 4：`ai` Runtime 关键帧 / Provider / Outbox |
| 2026-08-18 | 1.1.5 | 切片 5：过线客流 + 多边形入侵闭环 |
| 2026-08-18 | 1.1.6 | 切片 6：设备心跳 / 离线告警 |
| 2026-08-18 | 1.1.7 | 切片 7：信令 + 按需 JPEG 预览 + 最小 web |
| 2026-08-18 | 1.1.8 | 切片 8：Admin 仪表盘 / 规则画区 / 告警 WS |
| 2026-08-18 | 1.1.9 | 切片 9：Compose postgres/api/ai/web/coturn |
| 2026-08-18 | 1.1.10 | 切片 10：playbook 切片关闭；tag 门槛与文档口径对齐 |
| 2026-08-18 | 1.1.11 | Postgres `timestamptz` 列；Compose `/health`+登录已验；coturn profile `turn` |
| 2026-08-18 | 1.1.12 | Compose profile `rtsp`：MediaMTX `testsrc`；`ai` `source=rtsp` 已验 |
| 2026-08-19 | 1.1.13 | `STUB_WALK` + count line；小时客流 > 0（非真人走动） |
| 2026-08-19 | 1.1.14 | 全天禁区 + stub 进入；`intrusion` 已出（非真人） |
| 2026-08-19 | 1.1.15 | 停模拟 RTSP 发布端；约 10s `device.offline`（非真机） |
| 2026-08-19 | 1.1.16 | 夜间禁区日程：下一检测周期生效已验 |
| 2026-08-19 | 1.1.17 | §6 预览 lab / 误报 / Webhook alert.v1 / 双租户本机勾选 |
| 2026-08-19 | 1.1.18 | Admin Webhook 页 + `GET /v1/webhooks`（不含 secret） |
| 2026-08-20 | 1.1.22 | FR-PLT-06：Casbin 角色 ACL + API `permissions`；Admin 按钮跟权限 |
| 2026-08-20 | 1.1.23 | FR-PLT-06：`site_grants` + list/get 站点过滤；`GET/PUT /v1/users/:id/site-grants` |
| 2026-08-20 | 1.1.24 | FR-PLT-06：`GET /v1/users` + Admin Users 页分配站点授权 |
| 2026-08-20 | 1.1.25 | FR-PLT-01 Sites 页 + `PATCH /v1/sites/:id`；Users 可改角色 `PATCH /v1/users/:id` |
| 2026-08-28 | 1.2.31 | 切片 34：人脸 photoRef Admin 可填/清除；超长 FACE_INVALID；不是照片字节；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-28 | 1.2.32 | 切片 35：节点 DELETE 不删摄像头 / OTA 包；旧 token 失效；operator 不可删；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-29 | 1.2.33 | 切片 36：摄像头 ONVIF 库存 PATCH；不回读密码；发现可预填；仍 L1；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-29 | 1.2.34 | 切片 37：摄像头 lastHeartbeatAt + 站点列；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-29 | 1.2.35 | 切片 38：Face / Webhook / Notify / Rules 删除二次确认；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-29 | 1.2.36 | 切片 39：API 自动化验收闭环；Popconfirm 仍需浏览器；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-29 | 1.2.37 | 切片 40：Admin Playwright（Discover Use、站点名列、Popconfirm）；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-28 | 1.2.30 | 切片 33：节点 PATCH 完整 capabilities；不可含 face；不是远程关推理；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-27 | 1.2.29 | 切片 32：节点 PATCH name；operator 可 edit；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-27 | 1.2.28 | 切片 31：OTA 包 PATCH 只改 artifactUrl；operator 不可 edit；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-27 | 1.2.27 | 切片 30：节点 PATCH cameraId 绑定/null 解绑；同摄不可两节点；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-27 | 1.2.26 | 切片 29：节点 PATCH desiredPackageId null 解绑；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-27 | 1.2.25 | 切片 28：OTA 包 DELETE 解绑 desiredPackageId；不删制品文件；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.24 | 切片 27：人脸名单 PATCH label/list/note/photoRef；可改 list；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.23 | 切片 26：摄像头 DELETE 级联规则/告警/客流；解绑边缘节点；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.22 | 切片 25：通知渠道 PATCH name/minSeverity/模板/config；不可改 type；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.21 | 切片 24：Webhook PATCH url/minSeverity/secret；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.20 | 切片 23：摄像头 PATCH 名称/RTSP + 解绑 device；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.19 | 切片 22：规则 PATCH + `rule.update` 审计；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.18 | 切片 21：规则删除 + `rule.delete` 审计 + 告警 Resolve；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-26 | 1.2.17 | 切片 20：客户真集确认清单推迟；Admin 工厂计数 + 可选危险区；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-25 | 1.2.16 | 切片 19：JPEG 目录生成 factory-eval 清单；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-25 | 1.2.15 | 切片 18：factory-eval 逐条报告 + `--out`；F1 / 误报率 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-25 | 1.2.14 | 切片 17：factory-eval 脚手架；F1 KR 仍 ⬜；未打 `v0.2.0` |
| 2026-08-25 | 1.2.13 | 切片 16：同步 LuminaryWorks 产品 spec；未打 `v0.2.0` |
| 2026-08-25 | 1.2.12 | 切片 15 FR-AI-06：staff.away/phone 默认关 + stub；可选 zone；非生产监管；未打 `v0.2.0` |
| 2026-08-25 | 1.2.11 | 切片 12–14：人脸库存默认关 + stub；Ed25519 OTA 回滚；camera `syncrobrainDeviceId`；非生产识别 / 非 TPM / 非 SB 生产；未打 `v0.2.0` |
| 2026-08-24 | 1.2.10 | 切片 11 FR-EDG-05：edge-nodes hashed token + 能力位；INTERNAL_TOKEN 仍可用；非 TPM、非 OTA、非 FR-ECO-03 |
| 2026-08-24 | 1.2.9 | 切片 10 FR-RUL-06：notification-channels 邮件/企微/钉钉 + 模板；SMTP 空则邮件 no-op；非 ESP SLA |
| 2026-08-24 | 1.2.8 | 切片 9：status/docs 关闭 M2 必须编码；Webhook+MQTT 出站文档；人脸/OTA/邮件/ECO-03 仍 ⬜；未打 `v0.2.0` |
| 2026-08-23 | 1.2.4 | 切片 5 FR-ECO-01：`/v1/export/alerts|footfall` JSON 分页；DL 接入文档；无专用 OAuth |
| 2026-08-23 | 1.2.6 | 切片 7 FR-AI-05：fall/fight/smoke 入 alert.v1；stub 可选；非 F1 |
| 2026-08-23 | 1.2.7 | 切片 8 FR-RUL-05：可选 MQTT 出站 + Mosquitto profile；非 SB 生产对接 |
| 2026-08-23 | 1.2.5 | 切片 6 FR-AI-08：可选 HTTP 远程 Provider 接口；默认 stub；非托管 GPU、非 F1 |
| 2026-08-23 | 1.2.3 | 切片 4 FR-RUL-08：同摄扁平 AND/OR（`match`/`conditions`）；无嵌套、无跨摄 |
| 2026-08-22 | 1.2.2 | 切片 3 FR-ADM-05：footfall 日/周/月聚合 + `siteIds` 多店对比；Admin Footfall 页 |
| 2026-08-22 | 1.2.1 | 切片 2 FR-PLT-07：`audit_logs` + `GET /v1/audit-logs`；登录/建规则/导出写日志；Admin Audit 页 |
| 2026-08-22 | 1.2.0 | 开 M2 Sentinel playbook；切片 1 FR-RUL-03 规则/Webhook 分级 |
| 2026-08-21 | 1.1.28 | FR-PRV-03：租户事件 TTL（默认 90 天）+ 定时清理；按站点 purge / 级联删站点 |
| 2026-08-21 | 1.1.27 | FR-RTC-05：Admin ICE stats 区分 p2p/turn；首帧 `firstFrameMs` 补报；e2e 遥测 |
| 2026-08-21 | 1.1.26 | FR-ADM-04：告警筛选（kind/时间/站点/摄像头）+ CSV 导出 |
| 2026-08-20 | 1.1.21 | Admin 统一登录：localhost 同源代理；401 AuthGate 重登；登出清 IdP storage |
| 2026-08-19 | 1.1.19 | `DELETE /v1/webhooks/:id` + Admin Remove（`WEBHOOK_NOT_FOUND`） |

