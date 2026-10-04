# 工厂异常评测（FR-AI-05）

M2 完成标准要求跌倒/打架/烟雾 **至少两类** 在 **工厂/仓储数据集** 上 F1 > 0.75。切片 7 只交付了 kind + stub。本页是评测脚手架，**不是**达标声明。

## 清单格式 `factory-eval.v1`

```json
{
  "schemaVersion": "factory-eval.v1",
  "label": "warehouse-ehs-2026",
  "source": "warehouse",
  "notes": "site B loading dock, 2026-08",
  "items": [
    { "id": "001", "imagePath": "frames/001.jpg", "anomalies": ["fall"] },
    { "id": "002", "imagePath": "frames/002.jpg", "anomalies": ["smoke"] },
    { "id": "003", "imagePath": "frames/003.jpg", "anomalies": [] }
  ]
}
```

- `source`：`factory` / `warehouse` / `fixture`。`fixture` **永远**不能勾 KR。
- `notes`：可选，写采集来源。写了 notes **不等于**工厂真集。
- `anomalies`：该帧的工厂语义，可空（负样本）。帧级多标签，不要求 bbox IoU。
- 图片路径相对清单文件。

模板：`ai/eval/example.factory-eval.v1.json`。也可从 JPEG 目录生成（文件名启发式，**须人工核对**）：

```bash
cd ai
pnpm -s eval:manifest -- --dir /path/to/frames --source warehouse --label dock-b --out /path/to/factory-eval.v1.json
```

- 只扫**一层** `.jpg` / `.jpeg`（不递归、不收 png/mp4）。
- 文件名 token：`fall` / `fight` / `smoke`（及 `fallen` / `brawl` 等保守别名）写入 `anomalies`；`neg` / `ok` / `empty` 等视为负样本。
- `waterfall.jpg` **不会**标成跌倒。`--source factory|warehouse` **不等于**真集证明。

## 运行

在 `ai` 仓，用 **ONNX 或远程 Provider**（stub 会被判 `krEligible=false`）：

```bash
cd ai
PROVIDER=onnx ONNX_MODEL_PATH=/path/to/model.onnx \
  pnpm -s eval -- --manifest /path/to/factory-eval.v1.json --out report.json
```

`pnpm eval` 会先编译再跑 CLI（建议 `pnpm -s eval` 以免 pnpm 日志污染 stdout）。stdout 与 `--out` 均为 `factory-eval-report.v1` JSON。也可 `PROVIDER=remote REMOTE_INFER_URL=...`。

报告含逐条 `items[]`（truth / predicted / 图片 sha256）以及 `emptyGtFalsePositiveRate`（空标注帧上出现任一工厂异常的比例）。**该比例只汇报，不勾选「误报率 < 15%」。**

`krEligible=true` 仅当：

1. `source` 为 `factory` 或 `warehouse`
2. Provider **不是** `stub`
3. 至少两类 `support≥1` 且 F1 > 0.75

否则进程退出码 **2**（`pnpm eval` 可能把它显示成 **1**）。`krBlockedReason` 写明原因。

## 客户现场确认（推迟）

内部暂无人力去工厂/仓储实体核对真集。与客户一并勾选的项见 [客户确认](/guide/customer-confirmation)。勾选该清单 **不得**自动勾选本页 F1 / 误报率 KR。

## 诚实边界

| 项 | 状态 |
|----|:----:|
| 评测契约 + CLI + 逐条报告 | ✅ |
| 从目录按文件名生成清单 | ✅ 启发式；须人工核对 |
| 用 stub / 合成 fixture 勾 F1 > 0.75 | ❌ |
| 用 `emptyGtFalsePositiveRate` 勾误报率 < 15% | ❌ |
| 家庭跌倒公开集当作工厂集 | ❌ |
| 仓库内已带工厂真集并跑出达标分 | ❌ 需客户现场确认后再跑；见 [客户确认](/guide/customer-confirmation) |

模型 label 为 `fall` / `fight` / `smoke`（或 `fallen` / `brawl` 等保守别名）时，ONNX / remote 会写入检测 `anomaly`，才能进入评测。
