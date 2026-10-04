# 商店 listing 草稿（诚实口径）

**草稿，未提交。** Agent **不得** 上传到 App Store Connect / Play Console。人类提交见 [tag 检查单](https://github.com/VistaCast/vistacast/blob/main/spec/release-tag-checklist.md)。销售口径见 [销售一页纸](/guide/sales)。

这不是已上架包，不是 Cloud Bridge 已售，不是 NPU 认证，不是生产 F1。

---

## 中文草稿

**名称：** VistaCast（视界云遥）

**副标题：** 本机窗口检测，不是云 GPU

**短描述（Play ≤80）：** 本机打开门店 Admin 与窗口 YOLO。WASM 不是 NPU。检测默认 stub。

**完整描述：**

VistaCast（视界云遥）是门店 / 家庭摄像头的**本机产品壳**：窗口里切换检测、管理台、关于。检测页在设备上跑 YOLO（ONNX Runtime **WASM**）。管理台打开局域网 Admin（默认 `http://<电脑LAN>:13101`）。

请按下列边界阅读本 listing，不要把它理解成已认证的端侧 NPU 产品或已售云检。

- **WASM ≠ NPU。** 窗口检测是 WebAssembly / WebView 演示，**不是** Hexagon / APU / NNAPI 认证。Android 下限见 [设备矩阵](/guide/device-matrix)，**尚未**真机勾选。
- **检测默认 stub。** 门店枪机检测走本机 Edge Runtime（`ai`），盒子通电才跑，**不是**平台 24/7 SLA。默认 stub **不是**生产准确率，也不是工厂跌倒/打架/烟雾 F1。平面口径见 [混合推理](/guide/hybrid-infer)。
- **禁止自动拨打 120。** 本 App **不会**自动呼叫急救，也 **不会**给出健康诊断。
- **Cloud Bridge 未作为商品出售。** 可选第三方云视觉是按量回退积木，**不是**已售 SKU，**不是**「无端无盒全云检测」。
- **不是白牌商店 App。** 租户品牌 overlay（名称 / Logo URL / 主色）不是多 Bundle ID SaaS。
- 推送（APNs / FCM）未配置则**无推送**。未配置不得显示「已送达」。

适合：已有 ONVIF/RTSP 摄像头、愿意在店内或家里跑盒子/电脑的试点。不适合：指望装完 App 摄像头就自动上云端大模型。

---

## English draft

**Name:** VistaCast

**Subtitle:** On-device window detect, not NPU

**Short description (Play ≤80):** LAN Admin plus window YOLO. WASM is not NPU. Store detection defaults to stub.

**Full description:**

VistaCast is a **local product shell** for shop / home cameras. The app switches Detect, Admin, and About. Detect runs YOLO in the window (ONNX Runtime **WASM**). Admin opens the LAN console (typically `http://<your-computer-LAN>:13101`).

Read this listing with the following boundaries. It is not a certified NPU product and not a sold cloud-vision SKU.

- **WASM ≠ NPU.** Window detect is a WebAssembly / WebView demo. It is **not** Hexagon / APU / NNAPI certification. The [device matrix](/guide/device-matrix) is unpublished as tested.
- **Detection defaults to stub.** Shop RTSP detection runs on the local Edge Runtime (`ai`) while the box is powered — that is self-hosted, **not** a VistaCast 24/7 SLA. The default stub is **not** production accuracy and **not** factory fall/fight/smoke F1. Planes: [hybrid infer](/guide/hybrid-infer).
- **No automatic 120 / emergency call.** This app does **not** auto-dial emergency services and does **not** give health diagnoses.
- **Cloud Bridge is not sold.** Optional third-party cloud vision is a metered fallback building block, **not** a billed SKU, **not** “cloud detect with no box and no app.”
- **Not a white-label store app.** Tenant branding (name / logo URL / primary color) is not multi-bundle-ID SaaS.
- Push (APNs / FCM) is off when env is empty. Empty credentials must not look like a delivered notification.

Good fit: existing ONVIF/RTSP cameras and a willingness to run a local box or computer. Not a fit: expecting cameras to upload to a hosted VistaCast GPU after install.

---

## 禁止写进商店的句子

| 不要写 | 原因 |
| :--- | :--- |
| NPU / Hexagon 加速已认证 | 窗口是 WASM；矩阵未真机测 |
| 生产级检测 / 已过 F1 | 默认 stub |
| 自动拨打 120 / 健康诊断 | 系统禁止 |
| Cloud Bridge 已上线可买 | 未售 SKU |
| 装完 App 即 24/7 值班 | FR-PLT-17：前期不承诺 |
| 已上架 / TestFlight 已审过 | 本页只是草稿 |
