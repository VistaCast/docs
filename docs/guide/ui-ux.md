# 三端场景化 UI

Web 是企业控制台，Electron 是门店工作站，RN 是移动伴随。**网上买回传统枪机接到手机 App**：按屏点哪里见 [买回摄像头接到 App](/guide/add-camera)。设计 token 源在 Meta `artifacts/design/ui-tokens.v1.json`，同步：

```bash
pnpm sync:ui-tokens
```

规范：[UI/UX 系统](https://github.com/VistaCast/vistacast/blob/main/spec/design/ui-ux-system.md)（源码在 Meta `spec/design/ui-ux-system.md`）。**不是**三份 Admin，**不是**商店包，**不是** NPU / 生产 F1。

## Web

浅色数据画布 + 深色视频区。侧栏分组：总览 / 运营 / 视频 / 集成 / 边缘与设备 / 看护试点 / OEM 试点 / 设置。总览含 **设备接入**（`/#/setup`）：摄像头 / 边缘盒 / 手机同一向导。窄于 1024px 改为抽屉。顶栏可切换 en / zh。

```bash
pnpm --dir web dev
pnpm --dir web test
```

## Electron

启动先登录（嵌入同一套 Admin 登录页）。登录后 Home 显示本机 store-box / Admin / Detect 连通。「看门店画面」打开 `/#/cameras`，「接入摄像头」打开 `/#/setup?device=edge`，都不复制摄像头表单。Detect 加载 `http://127.0.0.1:13104/?surface=desktop`（本窗口摄像头，不是枪机）。Admin 仍嵌入控制台。未登录不打开窗口摄像头。

```bash
pnpm --dir desktop start
pnpm --dir desktop test
```

## RN

启动先登录：真机先填局域网 Admin 地址，再打开同一套 Admin 登录页。登录后底栏：首页 / 检测 / 控制台 / 设置。真机控制台不预填 `127.0.0.1`。可达后可选 **看门店画面**（`/#/cameras`）或 **接入摄像头**（`/#/setup?device=mobile`）。设置页分区展示运行时与实验室边界，不把 WASM 写成 NPU。检测页 `data-surface=mobile`。未登录不显示底栏。

买回的枪机走首页 **接入摄像头**，向导与 Web 同一套（站点 → URL → 测试拉流 → 保存）。底栏「检测」是本机摄像头 YOLO，不是枪机。线框与空态见手册 [RN 界面](/guide/add-camera#rn-ui) 与 Spec §9。

```bash
pnpm --dir mobile test
pnpm --dir mobile start
```

扫码请用 **Expo Go SDK 57**。不是 App Store。
