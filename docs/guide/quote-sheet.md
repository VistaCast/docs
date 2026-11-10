# 报价说明

报价项与商务口径见 [报价与销售资料](/guide/sales) · [计费说明](/guide/billing)。

## 质检工位报价脚手架

源文件在 Meta `artifacts/quotes/`（本站不托管 JSON 成品）：

| 文件 | 用途 |
|------|------|
| `quality-station-pack.v1.json` | 订阅 / 买断 / 年维保 / PoC **并列**；另含可选行 `vc.optional.ultralytics.commercial` |
| `ultralytics-license-optional.v1.json` | 客户自购 Ultralytics 许可的说明行（可单独附在报价里） |

口径：

- 所有 `unitPrice` 保持 **null**，`sellable` / `krEligible` / `livePsp` 保持 **false**。
- 默认检测器是 YOLOX；**不**把 AGPL 的 `yolov8n.onnx` 打进默认安装包。
- 客户若坚持 YOLOv8 / YOLO11：报价单列 Ultralytics 可选行，VistaCast 价格空着，指向 [Ultralytics 官方许可页](https://www.ultralytics.com/license)。不是代卖，不是已售 SKU。
- 内部话术见 Meta `spec/sales-playbook-quality.md`；PoC 流程见 [质检 PoC 手册](/guide/poc-playbook)。
