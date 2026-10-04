# 设备接入

站长买回摄像头之后，先选现场路径：[三条接入路径](/guide/deployment-modes)（门店盒子 / 直连服务器 / 定制机）。产品路径是：**摄像头出流 → Admin 设备接入向导探测一帧 → 保存 → 本机或托管区 `ai` 持续拉流 → 列表显示在线**。入口是 **Admin → 设备接入**（`/#/setup`）。Electron / 手机打开**同一套 Admin**：看已接入枪机走 `/#/cameras` 再进预览；接入新枪机走向导。不另写一份表单。

**只想把网上买的传统枪机接到 RN App**（含每屏线框）：先读 [买回摄像头接到 App](/guide/add-camera)。本页是 Compose、迅思维推流、边缘令牌与诊断表。

探测会让 `ai` 用 **ffmpeg 拉一帧**。成功只说明此刻能解出画面。它**不写**摄像头在线状态、**不改**心跳、**不发** `device.offline`。这不是 ONVIF GetStreamUri，也**不是**生产 F1。厂商 App 私有 P2P（萤石 / 乐橙 / 小米仅云回看、Ring、Nest）**不支持**。

现场怎么勾：[交付测试](/guide/delivery-test)。规格：[camera-source.md](https://github.com/VistaCast/vistacast/blob/main/spec/camera-source.md)。站长接到 RN：[买回摄像头接到 App](/guide/add-camera)。Compose 绑定心跳：[用户买回摄像头](#buy-camera)。

---

## 开箱（不必先买枪机）

```bash
cd deploy
cp .env.example .env
docker compose up --build
docker compose --profile rtsp up -d
```

Admin：http://localhost:13101 。用 `localhost`，不要用无端口的 `127.0.0.1`。

登录后打开 **设备接入 → 摄像头**。实验室模拟流常见地址（以 `deploy/README.md` 为准）：

- Compose 网内（`ai` 容器）：`rtsp://mediamtx:8554/demo` 或文档里的 `testsrc`
- 本机进程直接打宿主机：`rtsp://192.168.x.x:8554/…`（探测**禁止** `127.0.0.1` / `localhost`）

探测通过后再保存。心跳要等 `ai` 持续拉流，不是探测那一帧。

---

## 用户买回摄像头 {#buy-camera}

站长视角只有四步。实验室已用一台 **迅思维（XSTRIVE）有线 1080P 工业推流机** 跑通；海康 / 大华等 **ONVIF + 局域网 RTSP** 枪机从第 3 步开始即可。

1. 摄像头和跑 VistaCast 的电脑在同一局域网（电源 + 网线）。
2. 让摄像头打出 **VLC 能播** 的流（工程机直接 RTSP；迅思维这类推流机先推到本机 MediaMTX，见下）。
3. Admin **设备接入 → 摄像头**：站点 → 填拉流地址 → **测试拉流** → 保存。
4. 把保存后的摄像头 UUID 写入本机 `deploy/.env` 的 `CAMERA_ID`，`SOURCE_URL` 与向导里同一条地址，然后 `docker compose up -d ai`。列表出现心跳、状态 **online**，接入才算完成。探测成功不等于在线。

单节点 Compose 的 `ai` **一次只拉一路**。不改 `CAMERA_ID` / `SOURCE_URL`，向导里新保存的枪机不会自动变成这台盒子的在线源。

### 迅思维 / OEM 推流机（已用真机验证） {#xstrive}

京东常见「RTMP / GB28181 / RTSP 工业推流」机（迅思维 XSWCAM 一类）**不是**海康那种默认可拉的工程 RTSP。它更像编码器：网页后台把码流 **推出去**。实验室结论：

| 做法 | 结果 |
| :--- | :--- |
| 摄像头推 RTMP → 本机 MediaMTX → Admin 填再发布 RTSP | **探测 1920×1080 通过，保存后 `ai` 心跳 online** |
| Admin 直拉摄像头 `rtmp://摄像头IP:1935/hlsram/live0` | 探测能出一帧；长时间拉流会 Input/output error，不要当 24/7 路径 |
| Admin 直拉摄像头 `:554` RTSP | 探测超时无帧；不要当默认路径 |

站长操作：

1. 起栈并打开进流网关（本机已有 `deploy`）：

```bash
cd deploy
docker compose up -d
# ingest = MediaMTX RTMP/HLS/WHIP gateway for real cameras.
# Optional lavfi demos: --profile rtsp (path /demo) and/or ingest's rtmp-publisher
# (path /demo-rtmp). Paths must stay distinct — one publisher per MediaMTX path.
docker compose --profile ingest up -d mediamtx
```

Admin：http://localhost:13101 。电脑局域网 IP 用 `ifconfig`（macOS）或 `ipconfig`（Windows）看，下面写成 `PC_LAN_IP`。

2. 浏览器打开摄像头后台 `http://摄像头IP/`（出厂常见 `admin` / `admin`，以说明书为准）。**编码设置 / 通道设置**：编码 **H.264**，**RTMP 发布地址**启用，填：

```text
rtmp://PC_LAN_IP:1935/hlsram/live0
```

点保存。后台「RTMP 带宽」应不再是 `0.0 kb/s`。

3. 本机 VLC：**媒体 → 打开网络串流**，先确认网关再发布（不要用 `127.0.0.1` 去填 Admin 探测）：

```text
rtsp://PC_LAN_IP:8554/hlsram/live0
```

4. Admin → **设备接入** → 摄像头。协议选 **RTSP**。拉流地址填 Compose 网内主机名（`ai` 容器用这个）：

```text
rtsp://mediamtx:8554/hlsram/live0
```

点 **测试拉流**，通过后再保存。

5. 摄像头列表复制新行的 UUID，写入 `deploy/.env`：

```bash
CAMERA_ID=<保存后的摄像头 UUID>
SOURCE_URL=rtsp://mediamtx:8554/hlsram/live0
SOURCE_KIND=rtsp
```

```bash
docker compose up -d ai
```

**摄像头**页该行应为 **online**，且 Last heartbeat 在更新。检测默认仍是 **stub**，不是生产 F1。

找 IP：路由器 DHCP 列表，或在电脑上扫当前网段。迅思维出厂有时停在 `192.168.0.15`，和家里 `192.168.31.x` 不在同一网段时，先改摄像头 IP 或给电脑加临时同段地址。

## 摄像头 {#camera}

1. **VLC** 能播再进向导。VLC 打不开，VistaCast 也打不开。
2. 向导：站点 → 发现或手填 URL → **测试拉流** → 保存。
3. ONVIF 发现是 **WS-Discovery L1**。它列出局域网设备，**不会**自动取码流。把 VLC 能播的 RTSP 粘进「拉流地址」。
4. 密码会出现在 URL 里。列表和探测响应会脱敏 `user:pass@`。不要把带密码的 URL 贴进可截图的工单。
5. 保存后去预览或画规则。检测默认 **stub**，不是 F1。
6. 单节点要持续在线：按 [用户买回摄像头](#buy-camera) 第 4 步绑定 `CAMERA_ID` / `SOURCE_URL`。

常见 RTSP 模板（把 `USER` / `PASS` / `IP` 换成你的）：

| 品牌 | 子码流示例（lab 优先） |
| :--- | :--- |
| 海康 | `rtsp://USER:PASS@IP:554/Streaming/Channels/102` |
| 大华 | `rtsp://USER:PASS@IP:554/cam/realmonitor?channel=1&subtype=1` |
| 宇视 | `rtsp://USER:PASS@IP:554/unicast/c1/s1/live` |
| Reolink | `rtsp://USER:PASS@IP:554/h264Preview_01_sub` |
| 迅思维等 OEM 推流机 | 不要猜 `:554`。推到 MediaMTX 后填 `rtsp://mediamtx:8554/hlsram/live0`（见 [迅思维](#xstrive)） |

买什么、别买什么见 [交付测试](/guide/delivery-test) C 节。多协议（RTMP / HLS / SRT / MJPEG / WHIP / 国标）见 [进流](/guide/camera-ingest)。ESP32：[公开套件](/guide/esp32-kits)。

---

## 边缘盒 {#edge}

24/7 枪机检测跑在 **`ai` Worker**（盒子通电时），不是前台 Electron 窗口 YOLO。这是客户自运维，**不是** VistaCast 平台 24/7 SLA。平台承诺 24/7 须已售定制模组或付费云监控，见 [接入路径](/guide/deployment-modes)。

1. 本机先起 store-box：[门店盒子](/guide/store-box)。
2. 设备接入 → **边缘盒**：填节点名，可选绑定已有摄像头，登记。
3. 令牌**只显示一次**。写入盒子 `.env`：`EDGE_NODE_TOKEN=…` 后重启 `ai`。
4. 节点心跳过期时，探测若指定了该节点会失败（边缘不可达），不会把摄像头打成离线。

---

## 桌面工作站

```bash
pnpm --dir desktop start
```

首页两条路，都嵌入同一套 Admin，不另做摄像头表单：

- **看门店画面** → `http://127.0.0.1:13101/#/cameras`，点行内预览（例如 `/#/preview?cameraId=…`）。这是枪机 JPEG，不是窗口 YOLO。
- **接入摄像头** → `http://127.0.0.1:13101/#/setup?device=edge`。

Detect 仍是本窗口摄像头 YOLO（COCO-80），**不是**门店 RTSP，**不是**云 GPU。

---

## 手机 {#phone}

逐步界面：[买回摄像头接到 App](/guide/add-camera#rn-ui)。

```bash
pnpm --dir mobile start
```

用 **Expo Go SDK 57**。真机控制台不要填 `127.0.0.1`（那是手机自己）。填电脑局域网地址，例如 `http://192.168.x.x:13101`。可达之后：

- 首页 **看门店画面** → `/#/cameras`，再进预览。
- 首页 **接入摄像头** → `/#/setup?device=mobile`。
- 控制台顶上可在「看门店画面 / 接入摄像头」之间切换。

不是 App Store。底栏「检测」不是刚买的枪机。

---

## 按诊断排障 {#troubleshoot}

探测失败时，向导会给出 `hintKey`。对照下面改，然后**再测一帧**。改完 URL 不会自动改心跳。

| 诊断 | 先做什么 |
| :--- | :--- |
| 目标被禁止 | 不要用 `127.0.0.1` / `localhost` / 云元数据 / `file:`。实验室用 `mediamtx` 主机名或 `192.168.x` |
| DNS 失败 | 检查主机名；Docker 服务名只在 Compose 网内有效 |
| 连接被拒绝 / 超时 | 摄像头 IP、端口、网段、防火墙；枪机和盒子要能路由到彼此 |
| 认证失败 | 用户名密码；有的机型要「ONVIF 用户」而不是 Web 管理员 |
| RTSP 握手失败 | 路径不对。用 VLC 试主码流/子码流 |
| 编码不支持 / 无视频轨 | 改 H.264 子码流；不要只开音频 |
| 超时无帧 | 地址可能对但太慢；先降分辨率。迅思维直拉 `:554` 会走这里，改推 MediaMTX |
| ffmpeg 无法启动 | `ai` 容器异常；看 Compose 日志 |
| 边缘不可达 / 正忙 | 节点离线或并发探测满了；不要因此判断摄像头已离线 |

断网验证离线：停模拟发布或拔枪机网线，等心跳超时，应出现 `device.offline`。那是健康检查，**不是**探测。

仍失败：回到 [交付测试](/guide/delivery-test) 勾 C / H，不要把厂商云回看当缺陷开单。


## 客户端安装包

Windows 门店工作站与 Android 伴侣 APK 托管在公开仓 [VistaCast/downloads](https://github.com/VistaCast/downloads/releases)：

- 官网一键下载：[vistacast.dev/download](https://vistacast.dev/download)
- Windows：`VistaCast-{version}-win-setup.exe`（NSIS）/ `VistaCast-{version}-win.exe`（便携）
- Android：`VistaCast-{version}.apk`（侧载；Release 中若暂无 APK，可用 Expo Go 或本地 `pnpm pack:mobile`）

安装包**未代码签名**。Windows SmartScreen 选「仍要运行」；Android 允许未知来源。

Meta-Repo 发布：`pnpm pack:publish`（或 `publish:downloads` 仅上传已有产物）。
