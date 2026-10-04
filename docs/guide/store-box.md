# 门店盒子与家庭壳（端侧检测）

门店 **RTSP** 检测跑在本机 **`ai` Edge Runtime**（Compose）。ToC 还可以在 Electron / RN **窗口**里跑 YOLO / Chat（WASM），见 [窗口内 YOLO / Chat](/guide/client-infer)。

**云端视觉大模型本阶段不自建 GPU**，等规模起来后再开。**允许**第三方云视觉按量回退。检测默认 **stub**（`ai`）或用户自备 ONNX（窗口），都不是生产准确率。不是 App Store。不是 `vistacast-v0.1.0` / `v0.3.0`。平面怎么选见 [混合推理](/guide/hybrid-infer)。

## ToB：门店盒子一键包（FR-EDG-07）

在已克隆的 Meta 仓库里：

```bash
cd deploy
node scripts/install-store-box.mjs --dry-run   # 不启动 Docker
node scripts/install-store-box.mjs             # compose up --build -d，等待 /health
```

macOS 可双击 `deploy/install-store-box.command`。Windows：`scripts/install-store-box.ps1`。

前置：**Docker Desktop**（Compose v2）。脚本会复制 `.env.example` → `.env`（若还没有）。

| 打开 | 地址 |
|------|------|
| Admin | http://127.0.0.1:13101 |
| API health | http://127.0.0.1:13100/health |
| 窗口 YOLO/Chat | http://127.0.0.1:13104 |

真摄像头：先选 [三条接入路径](/guide/deployment-modes)。手机逐步界面见 [买回摄像头接到 App](/guide/add-camera)。打开 [设备接入](/guide/device-setup) 填 Stream URL（RTSP / RTMP / HLS / SRT / MJPEG；WHIP 与国标填网关再发布地址），先探测再保存。需要盒子常拉流时再把 `SOURCE_URL` 写入 `.env` 后重启 `ai`。见 [多协议进流](/guide/camera-ingest)。

## ToC：Electron（FR-EDG-08 / 09 / 10）

```bash
pnpm --dir desktop install
pnpm --dir desktop start
```

默认窗口先登录（同一套 Admin 登录页），再进入门店工作站（首页 / 检测 / 管理台 / 诊断）。首页「看门店画面」打开 `/#/cameras`，「接入摄像头」打开向导。检测页为本机 YOLO/Chat（`surface=desktop`），不是枪机。未登录不打开窗口摄像头。菜单可启动 store-box。

## ToC：RN 局域网壳（FR-ADM-10）

```bash
pnpm --dir mobile test
pnpm --dir mobile install
pnpm --dir mobile start
```

底栏登录后才出现：**首页 / 检测 / 控制台 / 设置**。启动先连局域网 Admin 并登录。检测页内嵌 HTML；控制台先向导再打开 Admin。默认可达后进 `/#/cameras`，可切 `/#/setup?device=mobile`。买回枪机点首页「接入摄像头」，不要用「检测」。界面路径：[买回摄像头接到 App](/guide/add-camera#rn-ui)。真机请填 **Mac 的 LAN IP**（不要用手机自己的 `127.0.0.1`），并用 **Expo Go SDK 57** 扫码。默认 `pnpm --dir mobile start` 走 tunnel；同一网段才用 `start:lan`。不是 App Store。

## 明确不是

- 云端 GPU / 托管视觉 LLM（**延期到规模起来之后**）
- 把 stub 或未加载权重说成已过客流误差 / 入侵 P95
- App Store / TestFlight / APNs
