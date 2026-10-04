# 工厂 / 仓储真集 · 客户确认

内部暂无人力去现场采集与标注。本页是与客户**一并确认**时用的清单，**不是**达标声明。

勾选本页 **不得**自动勾选跌倒/打架/烟雾 F1 > 0.75、误报率 < 15%、OEM 付费意向或 `vistacast-v0.2.0`。评测命令见 [工厂评测](/guide/eval)。规范源：[spec/customer-confirmation.md](https://github.com/VistaCast/vistacast/blob/main/spec/customer-confirmation.md)。

## 场景与来源

- [ ] 场景是**工厂或仓储**（不是家庭、零售门店、公开家庭跌倒集）
- [ ] 采集出处可追溯：谁、何时、哪路摄像头、室内/室外、班次
- [ ] `factory-eval.v1` 的 `source` 为 `factory` 或 `warehouse`，且与现场一致（只改字段 **不是**真集证明）
- [ ] 画面使用权：允许用于评测；是否允许用于训练（分开记）
- [ ] 隐私：工人面部是否需脱敏；评测帧是否可出客户现场

## 标注质量

- [ ] `fall` / `fight` / `smoke` 操作定义已与客户 EHS 对齐
- [ ] 标注是**帧级多标签**（不要求 bbox IoU）；负样本 `anomalies: []`
- [ ] 至少**两类** `support ≥ 1`
- [ ] 含足够负样本，便于看报告里的 `emptyGtFalsePositiveRate`
- [ ] 若用文件名生成清单：已人工核对（`waterfall.jpg` 不得标成跌倒）

## 评测运行

- [ ] Provider 为 **onnx 或 remote**，不是 stub
- [ ] 模型权重许可与所有权已书面确认
- [ ] 已审阅 `factory-eval-report.v1`（`krEligible`、每类 F1、`items[]`）
- [ ] `emptyGtFalsePositiveRate` **只讨论，不勾选**「误报率 < 15%」
- [ ] 至少两类 F1 > 0.75 且 `krEligible=true` 后，才允许在状态矩阵勾选 FR-AI-05 F1

## 会签（现场填）

| 角色 | 姓名 | 日期 |
|------|------|------|
| 客户 EHS / 现场负责人 | | |
| VistaCast | | |

Admin 里的跌倒/打架/烟雾规则与仪表盘计数在确认前即可使用，默认 **stub，不是 F1**。
