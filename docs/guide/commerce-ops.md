# 运营开通（软运营）

本页是 **M3.12 / FR-BIL-04/06** 的运营手册：用 ops key 开通合同、赠送云识别次数，再套用场景包做演示。**不**宣布已售。**不**填真实单价。VistaCast **不是**支付商户号（`livePsp` 恒 false）。

套餐与中央收银接线见 [计费与落点](/guide/billing) · [中央 Entitlement 实验室](/guide/entitlement-lab)。试点话术见 [试点演示（诚实口径）](/guide/pilot-demo)。

## 前置

| 项 | 说明 |
| :--- | :--- |
| API | `http://127.0.0.1:13100`（或你的私有化入口） |
| 账号 | 租户 **admin** JWT（与 Admin 登录相同） |
| `BILLING_OPS_API_KEY` | 非空；仅放 gitignored `.env`，**永不提交** |
| 默认 | `BILLING_CONTRACT_SELF_SERVICE=0`（租户不可自助升档） |

## 一键验收（推荐）

本机无 API 时跑自检（契约 + 单测 + OpenAPI 标记）：

```bash
pnpm accept:commerce-ops
# 证据 artifacts/acceptance/commerce-ops.v1.json；krEligible 恒 false
```

有运行中的 API 时再加 live 探针：

```bash
export VISTACAST_TOKEN=…          # admin Bearer
export BILLING_OPS_API_KEY=…      # 与 server .env 相同
export VISTACAST_TENANT_ID=…      # 目标租户 UUID
export VISTACAST_CAMERA_ID=…      # 已登记摄像头 UUID
pnpm accept:commerce-ops -- --live
```

## curl 开通合同（FR-BIL-04）

```bash
curl -s -X PUT "http://127.0.0.1:13100/v1/ops/tenants/$TENANT_ID/billing/contract" \
  -H "authorization: Bearer $TOKEN" \
  -H "x-billing-ops-key: $BILLING_OPS_API_KEY" \
  -H "content-type: application/json" \
  -d '{"planId":"hybrid","reason":"pilot soft-ops open","status":"active"}'
```

期望：`source=contract`，`krEligible=false`。无 ops key → **403**。无 `reason` → **400**。

## curl 赠送云识别次数（FR-BIL-06）

```bash
curl -s -X POST "http://127.0.0.1:13100/v1/ops/tenants/$TENANT_ID/billing/credits/grant" \
  -H "authorization: Bearer $TOKEN" \
  -H "x-billing-ops-key: $BILLING_OPS_API_KEY" \
  -H "content-type: application/json" \
  -d '{"delta":100,"reason":"ops_grant","note":"pilot grant"}'

curl -s "http://127.0.0.1:13100/v1/billing/credits" \
  -H "authorization: Bearer $TOKEN"
# wallet.balanceCalls >= 100
```

## 套用获客场景包（演示）

```bash
curl -s -X POST "http://127.0.0.1:13100/v1/scenario-packs/warehouse.night/apply" \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d "{\"cameraId\":\"$CAMERA_ID\",\"applyNotify\":false}"
```

可选包：`site.perimeter` · `shop.footfall` · `factory.hazard` · `camera.watch`。均为 lab 壳，**不是** F1、**不是**已售安防/零售。

## 仍未售

- 目录单价仍为 0，须商务签字后才能对外说「已售」
- `livePsp` 不得改为 true；自助收银走中央 Entitlement
- `pnpm accept:commerce-ops` 绿 ≠ 生产 tag、≠ Stripe live
