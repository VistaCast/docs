# 目标场景

## 优先级

| 优先级 | 场景 | 典型客户 | 核心 AI | 版本 |
|:------:|------|----------|---------|:----:|
| **P0** | 连锁门店客流 | 奶茶/快餐 10–200 店 | 过线计数、时段分布 | M1 |
| **P0** | 仓储防盗 | 单仓 20–100 路 | 区域入侵、离线告警 | M1 |
| **P1** | 工厂危险区域 | 轻工厂 EHS | 闯入、跌倒/烟雾 | M2 |
| **P1** | PCB / PCBA 光学检测 | 中小代工、异形插件、FPC | 纯 CPU 有无 / 条码提示；实验室阈值、不是客户板准确率 | M4.1 实验室 |
| **P1** | OEM 能力输出 | 中小摄像头品牌 | 看护事件 SDK | M3（商务门闩） |
| **P2** | 家庭 / 社区看护 | 子女、居家运营商 | 级联通知 | M3 |
| **P2** | 物业多站点 | 园区物业 | 统一看板 | M4 |

## 连锁门店

**Jobs-to-be-done**：各店客流与时段对比，支撑排班与营销。

- 过线客流（单向/双向）
- 小时 / 日报表
- M2+：DataLuminary 大屏

## 仓储防盗

**Jobs-to-be-done**：夜间禁区越界与摄像头掉线，减少人工盯屏。

- 多边形禁区入侵
- 离线告警
- 去重、Webhook、确认/误报

## 仓储夜间防盗（lab 壳）

FR-SCN-04 `warehouse.night` 复用现有 `intrusion` + 夜间 22:00–06:00 日程与 lab webhook。获客壳，**不是** F1、**不是**已售 SKU、**不是**新 CNN。无评测集（`hasEvalSet` / `accuracyClaimed` 均为 false）。

## 园区周界（lab 壳）

FR-SCN-05 `site.perimeter` 复用现有 `intrusion`。获客壳，**不是** F1、**不是**已售 SKU、**不是** 24/7 SLA。无评测集（`hasEvalSet` / `accuracyClaimed` 均为 false）。

## 门店客流阈值（lab 壳）

FR-SCN-06 `shop.footfall` 复用现有 `footfall.threshold`，营业时段 10:00–22:00。获客壳，**不是**计数模型、**不是** F1、**不是**已售零售。无评测集。

## 工厂危险区（lab 壳）

FR-SCN-07 `factory.hazard` 复用现有 `fall` + `smoke`（kind + stub）。获客壳，**不是** F1、**不是**已售 EHS、**不是**新 CNN。无评测集。

## PCB / PCBA 光学检测（lab）

FR-SCN-09 `pcb.aoi` 仍是 VistaCast 场景包，不是独立产品。前期从小厂、无独显工位推广；大厂高速线是以后的同一包高配档，不是另一个产品。实验室已能在小块上判断有无、连锡、虚焊、冷焊（实验室阈值、不是客户板准确率）。焊点头用本机公开集训出 KB 级 ONNX（PCB-AoI、Ülger、DeepPCB、DsPCBSD+、PKU、Soldering-Data / V3、SolDef_AI 等抽样），图集留在实验室，客户不带原图。套用会写成 `pcb.missing` / `pcb.bridge` / `pcb.cold` / `pcb.void`，不出 SyncroBrain。无评测集，租赁报价单价为空。说明见 [PCB / PCBA 光学检测](/guide/pcb-aoi)。

同平台还有三份实验室包，**不是**已售：FR-SCN-10 `assy.presence`（组装有无件，不是螺丝 F1）、FR-SCN-11 `label.presence`（标签在不在，不是 OCR）、FR-SCN-12 `bead.presence`（胶路断开，不是焊道金相）。

## 摄像头离线（lab 壳）

FR-SCN-08 `camera.watch` 复用现有 `device.offline`。获客壳，**不是** AI 准确率、**不是** 24/7 在线 SLA。无评测集。

## 工厂危险区域（M2）

- 区域规则 + `fall` / `fight` / `smoke` **kind + stub**（非 F1）；可选危险区；评测脚手架见 [工厂评测](/guide/eval)；真集与客户一并确认见 [客户确认](/guide/customer-confirmation)
- 审计与合规导出

## OEM / 家庭看护（M3 P0 非生产试点）

说明见 [Guardian 试点](/guide/guardian)。

- 独立家庭实体 + 子女→邻居→合作坐席级联；最后一跳是 **人工复核**（`human_review`）
- 检测候选 → 本地确认（30–60 秒，缺省 45）→ 超时才级联
- 工厂 `fall`（无 `care`）与家庭跌倒（`fall` + `care`）必须区分
- OEM 激活 secret 只回传一次；lab/fixture 计量 **永远** `krEligible=false`
- **不承诺、不提供**无人审核自动拨打 120
- **不提供**健康诊断；白牌 SDK 仍商务门闩
- **不是**看护准确率达标，**不是** `vistacast-v0.3.0`

## 不做为主叙事

- 员工行为监控 — 可配置，**默认关闭**
- 全量云端录像 — 与事件优先冲突
- 以「诊断疾病」宣传
