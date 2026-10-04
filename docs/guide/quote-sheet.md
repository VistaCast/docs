# 空白报价单（未售）

本页是 **M3.13** 报价脚手架说明。机器可读模板：[`artifacts/quotes/enterprise-blank.v1.json`](https://github.com/VistaCast/vistacast/blob/main/artifacts/quotes/enterprise-blank.v1.json)。

**单价栏为空 = 未售。** 填价并签字前，不得对外说 Cloud Bridge / 云识别「已售」。VistaCast **不是**支付商户号（`livePsp` false）。

## 行项目（摘要）

| SKU | 说明 | 单价 |
| :--- | :--- | :--- |
| `vc.plan.edge` / `hybrid` / `cloud` | 套餐（摄像头 + 席位 + 云额度） | **空** |
| `vc.credits.cloud_infer` | 云识别预付次数包（整数次，非现金钱包） | **空** |
| `vc.cloud_bridge` | 第三方云视觉编排 | **空** |

## 人类门闩

1. 商务填写货币与单价  
2. 签字宣布已售（日期 + 签字人）  
3. live 密钥只放中央 Entitlement / 本地 `.env`，**永不提交**

PCB 工位租赁是另一张空白单：[PCB / PCBA 光学检测](/guide/pcb-aoi)。单价同样为空，不能说 AOI 已售。

运营开通与演示话术见 [运营开通](/guide/commerce-ops) · [试点演示](/guide/pilot-demo) · [销售一页纸](/guide/sales)。
