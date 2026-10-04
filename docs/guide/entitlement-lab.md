# 中央 Entitlement 实验室

本页是 **FR-BIL-05 / FR-PLT-15** 的接线演练：打 VistaCast API（`http://127.0.0.1:13100`），确认默认 **关收银**。**不**要求本机 3040 上有进程。**不**宣布已售。**不**填真实单价。VistaCast **不是**支付商户号：`GET /v1/billing/readiness` 的 `livePsp` **恒为 false**。

套餐、运营合同、次数包见 [计费与落点](/guide/billing)。

## 默认：`ENTITLEMENT_MODE=off`

Compose / 开发默认 `off`：零中央调用。`readiness()` 不拉 catalog；commerce 订单走 `refuseVistaCastCheckout`。

登录后（Bearer 与 Admin 相同）：

```bash
# sellable=false checkout=false livePsp=false trialPolicy=disabled
curl -s http://127.0.0.1:13100/v1/billing/readiness \
  -H "authorization: Bearer $TOKEN"

# HTTP 409；body.code=PRODUCT_NOT_SELLABLE
curl -s -w "\nHTTP %{http_code}\n" \
  -X POST http://127.0.0.1:13100/v1/commerce/orders \
  -H "authorization: Bearer $TOKEN" \
  -H "content-type: application/json" \
  -d '{"productCode":"vistacast"}'
```

期望：

| 调用 | 期望 |
| :--- | :--- |
| `GET /v1/billing/readiness` | `sellable=false`、`checkout=false`、`livePsp=false`、`trialPolicy=disabled`、`entitlementMode=off` |
| `POST /v1/commerce/orders` | **409** `PRODUCT_NOT_SELLABLE`（`sellable`/`checkout` 仍为 false） |

不要对 3040 发 curl。本演练只打 13100。

## Lab 接线变量（不要提交密钥）

以后要接到中央 Entitlement 时，在 **gitignored** `.env` 里写（不要进 Git、不要贴进 issue）：

| 变量 | 说明 |
| :--- | :--- |
| `ENTITLEMENT_MODE` | lab 接线用 `shadow_read`（`enforce` 不可达会 402 fail-closed） |
| `ENTITLEMENT_BASE_URL` | 中央服务 origin；未设时客户端默认 `http://localhost:3040` |
| `ENTITLEMENT_SERVICE_API_KEY` | 服务密钥；**永不提交** |
| `ENTITLEMENT_WEBHOOK_SECRET` | `POST /v1/commerce/webhooks/entitlement` HMAC；空则 webhook 关闭；**永不提交** |

本页 **不**启动、也 **不**探测 3040。写上变量 ≠ 已售、≠ 本机必须有 Entitlement 进程。

`shadow_read` / `enforce` 会把 readiness 的 `sellable`/`checkout` 置为 true（catalog 可售**接线**）。`livePsp` 仍为 **false**。不要把接线写成「已开通收款」。

## 成功 vs 仍未售

**演练成功**（本页勾选项）：

- `ENTITLEMENT_MODE=off` 时 readiness 关收银，`livePsp` 为 false
- `POST /v1/commerce/orders` 返回 409 `PRODUCT_NOT_SELLABLE`
- 密钥只在本地 `.env`，仓库里没有

**仍未售**（即使以后接上中央 catalog）：

- VistaCast 不是商户号；`livePsp` 不得改为 true
- 目录单价仍须商务填写并签字，才能对外说「已售」
- 本页不列 SKU 价格、不把 Cloud Bridge / 云识别写成已售
- 运营开通仍走 ops 合同（`x-billing-ops-key`），见 [计费与落点](/guide/billing)
