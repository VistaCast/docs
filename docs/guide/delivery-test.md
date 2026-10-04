# 交付测试清单

给创始人 / 试点现场用。验证**当前仓库能跑什么**。空格自己勾。

**不是**生产 F1，**不是** NPU 认证，**不是** Cloud Bridge 已售，**不是**商店过审，**不是** `vistacast-v0.1.0` / `v0.2.0` / `v0.3.0`。检测默认 **stub**。预览是 **JPEG**，不是 H.264 RTP。

规格映射：[delivery-test-checklist.md](https://github.com/VistaCast/vistacast/blob/main/spec/delivery-test-checklist.md)。单节点步骤：[Docker](/guide/docker)。摄像头类型：[进流协议](https://github.com/VistaCast/vistacast/blob/main/spec/camera-source.md)。开箱向导：[买回摄像头接到 App](/guide/add-camera) · [设备接入](/guide/device-setup)。

---

## 0. 本清单勾不掉的项

下列即使步骤全绿也保持 ⬜：工厂 F1、误报率 KR、OEM 付费 NRE、真机 NAT 首帧、刷 ROM、法律同意、合作方责任、商店提交、生产 APNs/FCM、Stripe、宣布云桥已售、8 Gen 2 / Dimensity 9400 NNAPI 矩阵、生产 tag。

---

## A. 自动化（不必买摄像头）

在已 `pnpm bootstrap` 的 Meta 根：

```bash
pnpm --dir shared test
pnpm --dir server test          # 含云桥 429 / 边缘健康 409 / 空 Stripe secret
pnpm --dir desktop test         # 含 signing dry-run
pnpm --dir mobile test          # 含 NNAPI SHIM + EAS preview≠prod
pnpm --dir desktop signing:dry-run   # 缺 CSC 仍 exit 0
pnpm accept:m3:fast             # M3 试点证据；fixture krEligible=false
pnpm accept:commerce-ops        # 软运营：契约+单测；krEligible=false；不是已售
pnpm stripe:webhook-shape       # Stripe webhook 形状；空 secret 口径；不是 live
```

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| A1 | shared 契约 | `pnpm --dir shared test` | 绿。lab/fixture 不能 KR |
| A2 | server API | `pnpm --dir server test` | 绿。空 `CLOUD_BRIDGE_SKU_ID` 保持 429 |
| A3 | 桌面签名 | `pnpm --dir desktop signing:dry-run` | 打印缺变量名；**exit 0**；不 codesign |
| A4 | 手机壳 | `pnpm --dir mobile test` | WASM/CPU 不能 `npuClaimed` / `meetsFloor`；preview APK ≠ production AAB |
| A5 | M3 证据 | `pnpm accept:m3:fast` | 通过；**不得**当生产 tag |
| A6 | 软运营 | `pnpm accept:commerce-ops` | 通过；`krEligible=false`；**不是**已售 |
| A7 | PCB AOI 实验室 | `pnpm accept:pcb-aoi` | 通过；`krEligible=false`；**不是**独立产品 / F1 / 已售租赁 |
| A8 | PCB 公开集（可选） | `pnpm pcb-aoi:fetch-public && pnpm pcb-aoi:train-public && pnpm pcb-aoi:eval-public` | 写出 cache 评估；分数 ≠ 客户板 F1 |
| A9 | Stripe 形状 | `pnpm stripe:webhook-shape` | 通过；空 secret fail-closed 口径；**不是** live |

---

## B. 本机 Compose lab（不必买摄像头）

```bash
cd deploy
cp .env.example .env
docker compose up --build
docker compose --profile rtsp up -d
```

| 检查 | 地址 |
| :--- | :--- |
| API | http://127.0.0.1:13100/health → 200 |
| Admin | http://localhost:13101 （用 `localhost`，不要用无端口的 127.0.0.1） |

登录：先 `cd LuminaryWorks && pnpm id:up`，或开发开关 `PUBLIC_ALLOW_LOCAL_LOGIN=true`。

模拟 RTSP（MediaMTX `testsrc` 发布为 `/demo`，**不是**物理枪机）Compose 网内地址（`ai` 探测用此主机名）：

`rtsp://mediamtx:8554/demo`

探测禁止回环：不要填 `rtsp://127.0.0.1:8554/testsrc` 或 `localhost`。默认 `PROVIDER=stub` / `STUB_WALK=true` 时客流与入侵是演示振荡，**不是**真实分析。

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| B1 | 栈起来 | `docker compose up` | `/health` 200；Admin 能开 |
| B2 | 加一路模拟 RTSP | **设备接入** 向导或添加摄像头，`sourceKind=rtsp` | 探测通过（不改心跳）；保存后 `ai` 日志出现 `source=rtsp` |
| B3 | 客流过线 | 画过线；`PROVIDER=stub` 且 `STUB_WALK=true` | 小时 `inCount`/`outCount` > 0。**不是**真人、**不是**真实分析 |
| B4 | 区域入侵 | 画禁区；stub 框进入 | 30s 内 `kind=intrusion`。**不是**真人、**不是**真实分析 |
| B5 | 断流离线 | 停 `rtsp-publisher` | 约 10s–2 min 出 `device.offline` |
| B6 | 误报 | `POST /v1/alerts/:id/false-positive` | `state=false_positive` |
| B8 | 在线枪不停云 | Admin **计费** 或 `GET /internal/v1/cameras/:id/infer-lease` | `effectivePlane=edge`，`cloudBridgeEnabled=false`。对该路 `POST /internal/v1/cloud-bridge/calls` → **409**。**不是**已售 |

预览 JPEG：Compose 网内可用 `deploy/scripts/lab-preview-viewer.mjs`。**不是**本机 Chrome 必过。TURN 见 [ICE / TURN](/guide/ice-turn)。

---

## C. 真机局域网（建议买的摄像头）

**先买「工程机 / ONVIF Profile S / 可手填 RTSP」**，不要买只能开厂商 App 云回看的消费机。

下单前问店家三句，答不上就别买：

1. 是否 **ONVIF Profile S**（或至少能开 RTSP）？
2. 主码流 RTSP 地址格式是什么？能否 **VLC 直接打开**？
3. 是否必须装海康/大华/萤石/乐橙/小米 **App 才能出流**？（必须 = 不要）

### C.1 推荐采购（2026 市面，未认证）

这是**采购建议**，不是兼容认证、不是 F1、不是品牌背书。型号年年改款，以「ONVIF + 局域网 RTSP」为准。

| 优先级 | 买什么 | 大约价（人民币，2026 电商） | 为什么买 | 怎么确认 |
| :---: | :--- | :--- | :--- | :--- |
| **P0 先买 1 台** | **海康威视** 200 万～400 万像素 **固定枪机**（工程渠道 `DS-2CD2xxx` / `DS-2CD1xxx` 一类，要写 **ONVIF**） | 约 200–600 | 门店最常见；RTSP 文档多 | 网线 PoE 或 12V；IE/SADP 或官方工具改 IP；VLC 打开下表 URL |
| **P0 备选** | **大华** `IPC-HFW` / `IPC-HDW` **枪机或半球**，同样要 ONVIF | 约 200–600 | 第二常见工程机 | SmartPSS / ConfigTool 改 IP；VLC |
| **P0 海外/DIY** | **Reolink** 有线枪机（如 RLC-510A / 810A 一类 **写明 ONVIF**） | 约 300–800 | 零售好买；默认就有 RTSP | 网页后台打开 RTSP；VLC |
| **P1 连锁常见** | **宇视 Uniview** `IPC212x` 枪机 | 约 200–500 | 国内连锁多 | EZStation / 网页；VLC |
| **P1 便宜商超** | **TP-Link VIGI** 枪机（C300 / C340 一类，确认 **ONVIF**） | 约 150–400 | 电商店铺多 | VIGI 网页；打开 ONVIF/RTSP |
| **P2 协议实验** | **安信可 ESP32-CAM** 套件 | 约 30–80 | MJPEG 进流（FR-OEM-08） | 先浏览器打开 `/stream`，再 Admin `http_mjpeg` |
| **不必买** | 手机当摄像头、消费云台「只能 App」 | — | 不在范围 | — |

**PoE：** 有交换机就选 PoE 枪机，少一根电源。没有 PoE 就买 12V 枪机 + 适配器。

**分辨率：** 1080p / 4MP 足够。4K 浪费带宽，对 stub 检测没有意义。

### C.2 不要买（会浪费时间）

| 别买 | 原因 |
| :--- | :--- |
| 萤石 / 乐橙 / 小米 / 涂鸦 **只云回看** 的消费款 | 厂商 App 私有 P2P，产品明确禁止 |
| Ring / Nest / 只能厂商云的电池机 | 无稳定局域网 RTSP |
| 「AI 摄像头」宣称自带跌倒/人脸云端大模型 | 与本产品无关；也不是 F1 |
| 必须刷魔改固件才出 RTSP 的机型 | 试点不要绑破解 |

小米/TP-Link **家用**款偶尔能开 RTSP，但各固件不一致。试点请用上表工程机。

### C.3 接到电脑的步骤

1. 摄像头和跑 `deploy` 的电脑在**同一局域网**（或摄像头能路由到 Compose 主机）。
2. 给摄像头固定 IP（DHCP 预留或静态）。
3. **VLC**：媒体 → 打开网络串流，粘贴 RTSP。有画面再登记 Admin。VLC 都打不开，VistaCast 也打不开。
4. **Admin → 设备接入 → 摄像头**（手机 App 首页「接入摄像头」打开同一向导）：填与 VLC 相同的 URL，先「测试拉流」，再保存。不要指望 ONVIF 自动取码流。界面：[买回摄像头接到 App](/guide/add-camera#wizard)。
5. 看 `ai` 容器日志出现拉流 / `source=rtsp`。断网线应在 2 min 内 `device.offline`。
6. 画过线/禁区：真人走过可以看事件，但 **默认 stub 不是生产准确率**。不要据此勾 F1。

### C.4 常见 RTSP 模板（用户名密码换成你的）

| 品牌 | 主码流示例 |
| :--- | :--- |
| 海康 | `rtsp://USER:PASS@IP:554/Streaming/Channels/101` |
| 大华 | `rtsp://USER:PASS@IP:554/cam/realmonitor?channel=1&subtype=0` |
| 宇视 | `rtsp://USER:PASS@IP:554/unicast/c1/s0/live` |
| Reolink | `rtsp://USER:PASS@IP:554/h264Preview_01_main` |
| VIGI | 以后台「网络 → ONVIF/RTSP」页显示的为准 |

子码流（`102` / `subtype=1` / `h264Preview_01_sub`）更省带宽，lab 优先子码流。

迅思维等 **RTMP 推流工业机**：不要填摄像头自己的 `:554`。让它推到本机 MediaMTX，Admin 填再发布 RTSP。真机步骤：[设备接入 · 迅思维](/guide/device-setup#xstrive)。

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| C1 | VLC 主/子码流 | 上表 URL | 有画面、延迟可接受（几秒内） |
| C2 | 接入中心探测 + 登记 | 与 VLC 同一 URL | 探测 `ok`；保存后心跳更新。探测本身不改 `status` |
| C3 | 断网离线 | 拔网线或关摄像头 | `device.offline` |
| C4 | 过线/禁区（可选） | 真人走一圈 | 可能出事件；**仍是 stub，不是 F1** |
| C5 | 迅思维等 RTMP 推流机 | 推到 MediaMTX，Admin 填再发布 RTSP | 探测 1080p；绑定 `CAMERA_ID` 后 **online**。直拉摄像头 `:554` 失败**不算**产品缺陷 |

---

## D. 多协议（有设备再做，不必为试点先买）

无门店盒子、枪机自己推流：见 [三条接入路径 · B](/guide/deployment-modes#hosted)。国标枪把 SIP 改成实验室 ZLM，即路径 B。

```bash
cd deploy
docker compose --profile ingest up -d     # RTMP / HLS / WHIP / SRT 网关
docker compose --profile gb28181 up -d    # 已有国标枪才开
```

| ID | 用例 | 买/用什么 | 方法 | 期望 |
| :--- | :--- | :--- | :--- | :--- |
| D1 | HTTP MJPEG | ESP32-CAM（P2） | 浏览器能开 MJPEG → Admin `http_mjpeg` | `ai` 拉到帧 |
| D2 | RTMP | 编码器、迅思维工业机或 ESP32-S3 推 `rtmp://HOST:1935/hlsram/live0` | MediaMTX ingest；`sourceUrl` 填再发布 RTSP | 与 RTSP 同样心跳。直拉摄像头 RTMP 只适合探测，不适合 24/7 |
| D3 | WHIP | 支持 WHIP 的摄像头/推流端 | 推到 MediaMTX；Admin `webrtc`，`sourceUrl` 填**再发布 RTSP** | **不是** Admin 预览 WebRTC |
| D4 | GB/T 28181 | 已有国标枪 + SIP 域 | ZLM 注册成功后填再发布 RTSP | **不是**自研国标平台 |

厂商 App 私有 P2P：**不做**，失败也不算产品缺陷。

---

## E. 桌面 / 手机壳

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| E1 | Electron | `pnpm --dir desktop start`（先起 Admin） | 启动先登录；登录后 Detect / Admin / About；首页「看门店画面」打开 `/#/cameras`，「接入摄像头」打开 `/#/setup?device=edge`；Detect 是窗口 YOLO，**不是**云 GPU |
| E2 | Expo | `pnpm --dir mobile start` + Expo Go **SDK 57** | 启动先登录（真机先填 LAN Admin）；登录后 About：`backend=wasm`，NNAPI 否，NPU 否，floor 否；控制台可达后默认可开 `/#/cameras`，可切 `/#/setup?device=mobile`；真机拒绝 `127.0.0.1` |
| E3 | EAS | 读 `mobile/eas.json` | preview = internal APK；production = store AAB；**不要** `eas submit` |

Android NNAPI 真机矩阵：[设备矩阵](/guide/device-matrix)（全 ⬜）。模拟器勾选无效。

---

## F. Cloud Bridge（不要接支付）

默认 **不要** 填 `CLOUD_BRIDGE_SKU_ID`。

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| F1 | 无 SKU | 默认 env | 超限 429；`krEligible=false` |
| F2 | 有 SKU（仅 lab） | 测试进程设 `CLOUD_BRIDGE_SKU_ID` | Admin GET 仍 false；**不得**改销售页为已售 |

口径：[混合推理](/guide/hybrid-infer)。

---

## H. 接入向导（FR-UX-04 / FR-PLT-12）

不必买枪机也可做 H1。真机做 H2。RN 按屏步骤：[买回摄像头接到 App](/guide/add-camera)。运维：[设备接入](/guide/device-setup)。

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| H1 | Web 摄像头路径 | Admin `/#/setup?device=camera` + 模拟 RTSP | 能探测一帧；保存后心跳仍靠 `ai` 拉流，不是探测改写 |
| H2 | 真机 | VLC 能播 → 向导探测 → 保存 | 与 C2 相同；**不是** GetStreamUri |
| H3 | 边缘盒 | `/#/setup?device=edge` 或 Electron「接入摄像头」 | 令牌只显示一次；写入 `EDGE_NODE_TOKEN` |
| H4 | 手机 | RN 按 [买回摄像头接到 App](/guide/add-camera) 填 LAN IP → 接入摄像头 | 真机拒绝 loopback；向导 `/#/setup?device=mobile`；检测页不是枪机 |
| H5 | 探测脱敏 | URL 含 `user:pass@` | 响应与列表不回显明文密码 |
| H6 | 负例 | 厂商 App 云回看 | 明确失败；**不算**产品缺陷 |

---

## I. 已编码、请你点一遍（不必买摄像头、不必付款）

这些不是人工门闩。代码和自动化已经过。你验收时只确认页面和默认关收银。

```bash
pnpm accept:commerce-ops
pnpm accept:m4
pnpm accept:pcb-aoi
pnpm stripe:webhook-shape
```

| ID | 用例 | 方法 | 期望 |
| :--- | :--- | :--- | :--- |
| I1 | 场景行业 | Admin `/#/scenario-packs`，点「仓储」再点「全部」 | 仓储只留 `warehouse.night`；全部为 10 个包（含工厂 `pcb.aoi`）；精度仍是 blocked / no eval set |
| I2 | 计费默认 | `/#/billing` 或 `GET /v1/billing/readiness` | `sellable`/`checkout` 为 false，`livePsp` 为 false。**不是**已售 |
| I3 | DataTalk | `/#/datatalk-templates` | 能列出模板。**不是**托管数据集，**不是**生产 Re-ID |
| I4 | 自动化 | 上面四条命令 | 都通过。证据里 `krEligible=false`。`accept:pcb-aoi` **不是** AOI 已售、**不是** F1 |

中央 Entitlement 真连 3040、真枪机、真机 NAT、NNAPI、商店、生产 tag、法律文本、宣布已售：仍只在第 0 节，本套不勾。

---

## 建议的最小购物车

试点「一台电脑 + 一台枪机」即可：

1. **一台**海康或大华 **ONVIF 枪机**（P0）+ 网线；有 PoE 交换机更好。
2. （可选）**一块** ESP32-CAM，只为 MJPEG。
3. **不要**为了本清单买旗舰手机测 NPU，**不要**买国标平台、**不要**买云存套餐。

测完把结果记在本页打印件上。要打生产 tag 走 [release-tag-checklist.md](https://github.com/VistaCast/vistacast/blob/main/spec/release-tag-checklist.md)，且须创始人指定版本号。
