# PCB / PCBA 光学检测（实验室）

AOI 是 VistaCast 里的工厂场景，不是另一个产品。小工厂工位默认不配独显。这一页描述的是实验室能力，**不是**已售设备，**不是** 99% 检出率。

## 给谁

先不要去竞标标准化的大厂 SMT 整线。更合适的第一批客户是产线节拍不极快、标准 AOI 覆盖差的中小代工：异形插件、抽检要求高的汽车电子、柔性板（FPC）。一块板往往 10–30 秒，CPU 上亚秒级的轻量检查不会拖节拍。

## 工位怎么跑

1. 不要把相机的整张大图送进模型。先定出焊盘或芯片的小块（本实验室要求每块不超过 224×224）。
2. **有没有件**：看小块亮不亮。比空焊盘更暗，记为有件。这不是料号识别。
3. **像不像条码**：看小块中间一行的黑白跳变。只给提示，不读出条码内容。
4. **连锡、虚焊、冷焊**：默认用实验室亮度阈值；也可以加载公开集训出的 ONNX（见下文映射）。这不是金相结论，也不是你客户板上的准确率。

可选档位 `cpu-openvino`：有 `artifacts/models/pcb-solder-public.v1.onnx` 时会走公开 ONNX（报告里 `onnxUsed=true`）。在 Apple Silicon 上，这个 ONNX 交给 Core ML，计算单元包含神经网络引擎（`coreMlUsed` 与 `neuralEngineUsed` 才会为 true）。仓库默认仍没有 OpenVINO IR，所以 `openVinoUsed` 仍是 false。大厂多线以后用同一场景包的离散显卡档，不是另一个产品。前期推广从小厂开始。

开发不卡在「借到客户良品/不良品」。公开集先训、先验；客户板用来以后验证和微调。

开发机是 MacBook Pro（M2、M5 这一代 Apple Silicon）。客户主机可以是 Mac mini，或普通 Intel/AMD 台式机。**Intel Mac（M1 之前的 x86 Mac）始终不是识别主机**，以后也不做。没有那份 ONNX 时走 CPU 阈值。有 ONNX 时，Apple Silicon 走 Core ML，并允许神经网络引擎参与。极小的线性层仍可能被 Core ML 排到 CPU，但会话不是「只用 CPU」。这不是客户板准确率。

## 调阈值

Admin **场景包**页下方有三个数字：连锡、虚焊、冷焊。保存后，这台工位下次检查用新数字。出厂默认仍在 `artifacts/models/pcb-solder-linear.v1.json`，表单不会改那个文件。恢复出厂默认会丢掉这次覆盖。这不是已售模型。

## 工位调试

同一页再往下是调试窗口。公开集的照片又正又亮，客户现场不是。选一张工位照片后，页面用亮度和边缘给出四条提示：曝光、对焦、机位、快门相对流水线速度。点「按这张照片填写」会把建议数填进表单，你仍可以手改，再保存。

流水线速度和画面对应的实物宽度，照片里看不出来，需要人填。没填线速时，不会假装算出快门。

这些数字保存在这台机器上。**不会**去改相机的曝光或对焦，**不会**去改流水线。这不是客户板准确率。

## 在控制台里

Admin **场景包**，行业选「工厂」，可以看到 `pcb.aoi`。套用会写成四条实验室告警：漏件、连锡、冷焊、虚焊。检查结果里的 `extras` 只有打中才是 `true`，规则按这个匹配。它们不会送到 SyncroBrain，也不能当成已售检测率。

## 收费口径

硬件进场、按月收软件和算法维护，只是报价假设。空白报价在 `artifacts/quotes/pcb-aoi-lease.v1.json`，单价为空，`sellable` 为 false。没有签约、没有填价，就不能说已售。

## 工位 HTTP（实验室）

边缘 `ai` 在内网令牌下提供：

`POST /internal/v1/pcb/inspect`

Body：`jpegBase64`、`rois`、可选 `usePublicModel`（默认 true）、可选 `emitDetection` + `cameraId` + `runtimeId`（返回一条带 `pcb*` extras 的 lab detection，由调用方再 POST 到 server）。

响应里 `accuracyClaimed` / `sellable` 恒为 false。权重只在 `ai` 加载，不进 browser / Nest。

可选：`pnpm pcb-aoi:openvino-convert`（本机有 `ovc` 时把公开 ONNX 转到 `.cache/`；没有则跳过）。

## 自我验证与公开数据

### 本机训 / 客户机跑（不要拷图集）

| 角色 | 带什么 | 不带什么 |
| :--- | :--- | :--- |
| **开发 / 实验室本机** | LuminaryFixtures 图集（约数 GB）→ 训出 ONNX | — |
| **客户工位** | 场景包 + `artifacts/models/*-public.v1.onnx`（各几百字节：pcb / assy / bead）+ `ai` Worker | **不**拷贝 Fixtures / `pcb-fixtures` / `.cache` 原图 |

公开集只在本机做底层适配（**一包一头**）。客户现场若不贴合，再用**客户自己的良品/不良品**做微调；那是以后的验证门闩，不是今天拷几 GB 图过去。

仓库里的自动检查用合成焊盘和条纹。公开图片在 [LuminaryFixtures](https://github.com/LuminaryFixtures)（本机 `~/www/LuminaryFixtures/`，`pcb/` 与顶层 `DsPCBSD+/`）。不进 Meta Git，也不是客户板准确率。

### 本机已入训的公开源（2026-09-23）

`pnpm pcb-aoi:train-public` 写出 `artifacts/models/pcb-solder-public.v1.onnx`。当时实验室抽样 **5227** 块（bridge 1476 / void 2840 / cold 80 / ok 831）。这是抽样上限，不是盘上每一张图，也不是客户板 F1。

| 来源 | 本机位置 | 实验室映射 |
| :--- | :--- | :--- |
| PCB-AoI、Ülger、DeepPCB、MeiweiPCB | `LuminaryFixtures/pcb/` | short / 桥连 → 连锡；open / 少锡 / 未分类框 → 虚焊 |
| [DsPCBSD+](https://figshare.com/articles/dataset/DsPCBSD_/24970329) | `LuminaryFixtures/DsPCBSD+/`（`pcb/DsPCBSD-plus` 软链） | YOLO `SH` → 连锡；`OP` / `SC` / `MB` / `HB` / `SP` → 虚焊 |
| [PKU-Market-PCB-corrected](https://huggingface.co/datasets/KeenForgeAI/PKU-Market-PCB-corrected) | `pcb/PKU-Market-PCB/` | `short` → 连锡；孔缺 / 鼠咬 / 开路 / 毛刺 → 虚焊 |
| [Soldering-Data-V3](https://huggingface.co/datasets/AndyLiu0104/Soldering-Data-V3) | `pcb/Soldering-Data-V3/`（parquet 说明文字） | 文中 bridge / excess → 连锡 |
| [Soldering-Data](https://huggingface.co/datasets/AndyLiu0104/Soldering-Data) | `pcb/Soldering-Data/`（parquet 标签） | `bridge` / `excess_solder` → 连锡；`appearance` → ok |
| [SolDef_AI](https://www.kaggle.com/datasets/mauriziocalabrese/soldef-ai-pcb-dataset-for-defect-detection) | `pcb/soldef-ai-pcb/`（LabelMe） | `spike` / `exc_solder` → 连锡；`poor_solder` / `no_good` → 虚焊；`good` → ok |
| 表面铸造 / 磁瓦 | `LuminaryFixtures/surface/` | 缺陷外观邻近，并进焊点头，不是新场景包 |
| 合成冷焊 | 训练脚本生成 | 公开集里没有稳定的光学冷焊标签 |

冷焊仍只有合成颗粒。表面缺陷和 TIG 焊道只当邻近外观，不单开场景包。

Hugging Face 直连超时可用镜像再拉：

```bash
HF_ENDPOINT=https://hf-mirror.com tooling/scripts/hf-pcb-extras-download.sh
```

图集留在实验室 Mac；客户包只带上面那份几百字节 ONNX。

```bash
pnpm pcb-aoi:train-public          # pcb.aoi → pcb-solder-public.v1.onnx
pnpm assy:train-public             # assy.presence → assy-presence-public.v1.onnx
pnpm bead:train-public             # bead.presence → bead-gap-public.v1.onnx
pnpm pcb-aoi:eval-public           # pcb lab 指标（不是客户板 F1）
pnpm fixtures:eval-stations        # 合成 + 抽样 smoke
pnpm fixtures:regress-public       # 余图回归门（不是客户板 F1）
pnpm m4-1:vision-next              # 有界刀清单；全绿 STOP，不勾已售
```

`label.presence` 本波仍用经典 ROI（不新训 ONNX）；NutriGreen 只进回归。检板路径**不依赖**对话 LLM Key。Cursor 不读取这些图片。

公开集分数 **不能** 勾 `hasEvalSet` 或对外宣称客户板准确率。

验收：`pnpm accept:pcb-aoi`。证据里 `krEligible` 恒为 false，`llmDecoupled` 为 true。

## 相邻工位

组装有无件（`assy.presence`）、标签在不在（`label.presence`）、胶路断开（`bead.presence`）和 `pcb.aoi` 一样，是 VistaCast 上的实验室场景包，不是另一个产品，也还没卖。

- **组装**：螺丝/接插件看在不在、朝向对不对。这不是螺丝检出率 F1。
- **标签**：看标签缺不缺、歪不歪。这不是 OCR，也不读条码内容。NutriGreen 货架图只作邻近外观 smoke。
- **胶路**：看胶线或焊道有没有断开。这不是内部气孔，也不是金相。

三份包的 `accuracyClaimed` / `hasEvalSet` 都是 false，空白报价单价为空。

公开图在 LuminaryFixtures，不进本仓，也不是评测集：

- `nanonets-pcb/`、`mvtec_screws_v1.1/`、`weee-screws/`：组装邻近。
- `weld-surface-zenodo/`、`lohi-weld/`：焊道邻近，不是胶路评测集。
- `shelf-nutrigreen/`：货架营养标签邻近，不是产线标签歪斜 F1。