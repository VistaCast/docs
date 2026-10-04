# 计费与推理落点

套餐按 **摄像头路数 + 席位 + 云识别额度**。云视觉只走**第三方 API**，只送候选帧 / 低频快照。`server` / Admin **永不加载模型权重**。VistaCast **不自建 GPU**。

**不是** Cloud Bridge 已售。目录单价为 **0**，须商务填价格并签字后才能对外说「已售」。`krEligible` 默认 **false**。Git / 数据库 **不存卡号**。VistaCast **不是**支付商户号（`livePsp` 恒 false）；自助收银走中央 Entitlement（3040）。默认 `off` 拒绝 checkout 的实验室接线演练（**不**要求本机 3040 进程）见 [中央 Entitlement 实验室](/guide/entitlement-lab)。

## 默认套餐

Compose / 生产默认 `TENANT_PLAN_ID=hybrid`：

- 允许云回退（摄像头 `status=unknown` / `offline` 且额度未用尽）
- 摄像头 **online / degraded** 时租约 `effectivePlane=edge`、`cloudBridgeEnabled=false`、`reason=edge_healthy`
- 控制面 `POST /internal/v1/cloud-bridge/calls` 对健康边缘返回 **409** `CLOUD_BRIDGE_PLANE_DENIED`

`edge` 套餐禁止云。`past_due` / `canceled` 同样 fail-closed，不再预占云调用。

## 入账路径

| 路径 | 接口 | 说明 |
| :--- | :--- | :--- |
| 运营线下合同（FR-BIL-04） | `PUT /v1/ops/tenants/:tenantId/billing/contract` | 需 `x-billing-ops-key`；必填 `reason`；写审计。默认 **禁止** 租户自助 `PUT /v1/billing/contract` |
| Stripe Billing（兼容） | `POST /v1/billing/stripe/webhook` | 校验 `Stripe-Signature`。空 `STRIPE_WEBHOOK_SECRET` → **503** `BILLING_STRIPE_DISABLED` |
| 中央 commerce（FR-BIL-05） | `GET/POST /v1/commerce/*` + `POST /v1/commerce/webhooks/entitlement` | `productCode=vistacast` BFF；默认 `ENTITLEMENT_MODE=off` 时 checkout **409** |
| 云识别次数包（FR-BIL-06） | `GET /v1/billing/credits`；ops `POST .../credits/grant` | 整数次；超套餐月额度后扣次；耗尽切断 |
| 探针 | `GET /v1/billing/readiness` | off：`sellable/checkout false`。控制面开启后 catalog 可售接线；`livePsp` 仍为 false |

Admin：**设置 → 计费**。可看用量、中央 offerings（控制面开启时购买）、云识别余额。合同开通由运营 ops key 完成。运营 curl / `pnpm accept:commerce-ops` 见 [运营开通（软运营）](/guide/commerce-ops)。

## 环境变量（摘要）

| 变量 | 默认 | 说明 |
| :--- | :--- | :--- |
| `BILLING_CONTRACT_SELF_SERVICE` | `0` | `1` 时允许租户 admin 自改本租户合同（lab only） |
| `BILLING_OPS_API_KEY` | 空 | 非空时 ops 合同 / 赠送次数可用 |
| `ENTITLEMENT_MODE` | `off` | `shadow_read` / `enforce` 开启中央收银 |
| `ENTITLEMENT_WEBHOOK_SECRET` | 空 | 空则 commerce webhook 关闭 |

## 部署前自检

```bash
# 登录后
curl -s http://127.0.0.1:13100/v1/billing/entitlement -H "authorization: Bearer $TOKEN"
# planId=hybrid source=env krEligible=false

curl -s http://127.0.0.1:13100/v1/billing/readiness -H "authorization: Bearer $TOKEN"
# ENTITLEMENT_MODE=off：sellable=false checkout=false trialPolicy=disabled
# ENTITLEMENT_MODE=enforce：catalog 可售接线；livePsp 仍为 false — VistaCast 不是商户号

curl -s http://127.0.0.1:13100/v1/billing/credits -H "authorization: Bearer $TOKEN"
# balanceCalls >= 0
```

不要把空 SKU / 单价 0 写成「已售」。live 支付密钥只放中央 Entitlement / gitignored `.env`。
