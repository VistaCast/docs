# Android 设备矩阵（FR-EDG-11）

伴随窗口要跑 **native** 检测时，第一批认证目标是 **Snapdragon 8 Gen 2** 与 **Dimensity 9400**。发布验收必须看 **NNAPI 是否可用、RAM、热浸泡、实测 FPS**，不得只认芯片名字。

当前 Electron / RN 窗口是 **WASM / WebView 演示**，**不是** NPU。本表 **全部未测、未勾**。

| 目标 SoC | NNAPI | RAM 目标 | 热浸泡 | 实测 FPS | 勾选 |
| :--- | :--- | :--- | :--- | :--- | :---: |
| Snapdragon 8 Gen 2 | 必须可用 | ≥ 8 GB | ≥ 15 min 连续检测 | 须实测 | ⬜ |
| Dimensity 9400 | 必须可用 | ≥ 8 GB | 同上 | 须实测 | ⬜ |

不达标 → 回退 [边缘盒子](/guide/store-box) 或按量第三方云桥（[混合推理](/guide/hybrid-infer)）。云桥 **不是** 已售 SKU。

Runtime 报告字段（`companion-runtime-report.v1`）：`backend`、`nnapiAvailable`、`ramMb`、`thermalState`、`measuredFps`、`meetsFloor`、`npuClaimed`。WASM 报告不得宣称 NPU，也不得 `meetsFloor=true`。本切片 **没有** 把报告接到控制面 HTTP，**没有** 在 App 里接 NNAPI。

完整 spec：[android-device-matrix.md](https://github.com/VistaCast/vistacast/blob/main/spec/android-device-matrix.md)。
