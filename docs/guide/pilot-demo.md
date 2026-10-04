# 试点演示（诚实口径）

给销售 / 创始人 / Agent 的**演示话术**。目标是让客户看懂产品能力，同时**绝不**把实验室能力说成已售或生产精度。

关联：[运营开通](/guide/commerce-ops) · [计费与落点](/guide/billing) · [目标场景](/product/scenarios)

## 可以说

| 可以说 | 依据 |
| :--- | :--- |
| 多租户门店 / 仓储：摄像头登记、规则、告警、Webhook、客流报表 | M1/M2 lab 已通 |
| 运营可手工开通套餐合同，并可赠送云识别次数 | FR-BIL-04/06；ops key |
| Admin 可看套餐用量与次数余额；默认关自助收银 | `ENTITLEMENT_MODE=off` |
| 中央 Entitlement 可接线做自助购套餐（接线 ≠ 已收款） | FR-BIL-05 / FR-PLT-15 |
| 场景包一键套用到指定摄像头（仓储夜间、周界、门店客流、工厂危险区、离线看护） | FR-SCN-04～08 lab 壳 |
| 边缘健康时不把该路切到云；超额度会切断 | FR-OPS-02 / 云桥计量 |
| 前期不承诺平台 24/7 值班 SLA | FR-PLT-17 |

## 绝不可说

| 绝不可说 | 原因 |
| :--- | :--- |
| 「Cloud Bridge / 云识别已售」 | 单价 0；商务未签字；`krEligible` 恒 false |
| 「我们是支付商户号 / 已开通 live 收款」 | `livePsp` 恒 false；商户号在中央 Entitlement |
| 「F1 / 误报率已达标」 | 评测真集与客户确认仍 ⬜；stub ≠ 生产精度 |
| 「24/7 云端盯屏 SLA」 | 仅已售模组或付费云监控可谈；当前未售 |
| 「商店 App / 生产 tag 已发布」 | M3.10 草稿；禁止 Agent 打 tag |
| 「NNAPI / NPU 已认证」 | 仅 SHIM；真机矩阵未勾 |
| 「自动拨打 120」 | 明确不做 |

## 建议演示顺序（30 分钟）

1. Admin 登录 → 设备接入中心登记一路摄像头（或 lab RTSP）
2. 场景包页套用 `warehouse.night` 或 `shop.footfall`（显式选摄像头）
3. 规则 / 告警 / Webhook test（drill）走通
4. **设置 → 计费**：展示 readiness（off 时关收银）、次数余额
5. （可选，对内）ops curl 开通合同 + grant 次数 — 见 [运营开通](/guide/commerce-ops)
6. 收尾口述「可演示 ≠ 已售；价格与 live 支付待商务签字」

## 验收命令

```bash
pnpm accept:commerce-ops
# pass 且 krEligible=false；不是已售证据
```
