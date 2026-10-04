# 窗口内 YOLO / Chat（本机 WASM）

**云端视觉大模型现在不做自建 GPU**，等付费规模起来后再开。**允许**按量调用第三方云视觉（Cloud Bridge，编排在 `ai`）。当前 ToC 路径是把 YOLO **跑在 Electron / RN 窗口里**（WASM），**不是** NPU / Hexagon / APU。

门店 **RTSP 枪机** 仍走 Compose 里的 [`ai` Edge Runtime](/guide/store-box)。居家规则跑在 `ai`，**不是**本页 WASM。本页 **不是** 生产 F1，**不是** App Store。

## 起页面（FR-EDG-09 / FR-EDG-10）

```bash
pnpm --dir client-infer install
pnpm --dir client-infer test
pnpm --dir client-infer fetch-yolo   # 下载 YOLOv8n 到 models/（SHA-256 校验）
pnpm --dir client-infer start        # http://127.0.0.1:13104/
```

打开页面后会**自动**申请摄像头并加载 YOLOv8n（优先 `models/yolov8n.onnx`，否则校验下载并缓存）。对准人或物体后应出现框。空会话不会假装已经检出。横幅口径：本页 WASM 窗口 **不是** `ai` EventEngine。检测框按 `object-fit: contain` 的画面对齐，不是按裁切后的 cover 区域。非 COOP/COEP 页面强制单线程 WASM（普通 `http://127.0.0.1` 与 Electron 文件协议都不是 cross-origin isolated）。
Electron 会把权重放到 `client-infer/models/`；App 使用内嵌检测页，不依赖 Mac `:13104`。

布局：`?surface=desktop` 为宽屏视频 + 侧栏 Chat；`?surface=mobile` 或视口 ≤800px 为视频优先 + YOLO/Chat 分段。RN 独立 HTML 写入 `data-surface=mobile`。

Chat 仍需手动点「加载对话模型」。权重大到本机缓存，不到 VistaCast GPU。

## Electron

```bash
pnpm --dir desktop start
```

`prestart` 会尝试拉取 YOLOv8n。窗口是门店工作站：**首页 / 检测 / 管理台 / 诊断**，顶栏用官方 Logo。菜单仍可启停 store-box。检测页是顶层 WebContents（不是 `file://` iframe），`?surface=desktop`。对准人或常见物体后应出框；横幅里的 COCO-80 说明不是「没有检测」。

## RN / Expo（App 内检测）

```bash
pnpm --dir client-infer build:standalone   # 写入 mobile/src/infer-html.js
pnpm --dir mobile start
```

底栏 **首页 / 检测 / 控制台 / 设置**。「检测」使用内嵌 HTML（`data-surface=mobile`），**不需要** Mac 上的 `:13104`。首次运行会从 Hugging Face 拉 YOLOv8n 到 WebView 缓存。控制台先向导再填局域网 IP（会记在本机；真机不预填 `127.0.0.1`）。扫码请用 **Expo Go SDK 57**。不是 App Store。

## 明确不是

- 云端视觉大模型 / VistaCast 云 GPU（**延期**，不是永久禁止）
- `server` / Admin `web` 内嵌推理
- 生产准确率、商店上架、`vistacast-v0.3.0`
- COCO 80 类通用检测 ≠ 客流/入侵生产规则（那条仍在 `ai`）
- 本页 WASM 窗口 **不是** `ai` EventEngine（居家规则在 `ai`）
- **NPU / Hexagon / APU**（见 [Android 设备矩阵](/guide/device-matrix)，表全未勾）
- 24/7 枪机值班（**前期不承诺**。盒子是自运维；平台 24/7 仅已售定制模组或付费云监控，见 [接入路径](/guide/deployment-modes)）
