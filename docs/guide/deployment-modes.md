# 三条接入路径：门店盒子 / 直连服务器 / 定制摄像头

把传统枪机或 VistaCast 定制机接到平台，并让 **远程桌面端、手机** 看门店画面。规格：[architecture.md](https://github.com/VistaCast/vistacast/blob/main/spec/architecture.md) §5.4 · [camera-module.md](https://github.com/VistaCast/vistacast/blob/main/spec/camera-module.md)。

**不是** VistaRemote（那是远程操作电脑）。**不是** 萤石式厂商云 P2P。**不是** 全量云录像。检测默认 stub。

**前期不承诺 24/7 值班**（[FR-PLT-17](https://github.com/VistaCast/vistacast/blob/main/spec/product-roadmap.md)）：只装 App 或只连控制面不算有人值班。盒子通电可以一直检测，那是你自己保电保网，**不是** VistaCast 平台 SLA。对外可以说 24/7 的只有：**已售定制摄像头**，或 **付费云端监控**（托管进流 / Cloud Bridge）。这两条现在都还 **未售**。

---

## 怎么选

| 现场 | 选哪条 | 现在仓库里有什么 |
| :--- | :--- | :--- |
| 门店有一台能跑 Docker 的迷你主机 / 工控机 | **A 门店安装包** | 一键脚本 + Compose；远程看靠 P2P/TURN |
| 店里或家里 **不能** 装客户端，只有传统枪机 | **B 直连 VistaCast 服务器** | 实验室：设备推 RTMP/GB28181 到 **已部署的** MediaMTX/ZLM。多租户托管进流（FR-PLT-16）**未编码** |
| 要「拆盒即连、用户自己改 Wi‑Fi/服务器」 | **C 定制摄像头** | claim API 已有；量产模组 **M5 未立项**。先用工程机手填，或 ESP32 参考套件 |

```text
路径 A  枪机 ──RTSP──► 门店盒子 ai ──事件/信令──► 云上控制面
                      ▲
         远程 Electron / 浏览器 / RN 预览（P2P，打不通走 TURN）

路径 B  枪机 ──RTMP/WHIP/国标──► 托管进流网关 + 同区域 ai
                      ▲
         远程观看同一套 P2P；店里可以没有 VistaCast 客户端

路径 C  定制机出厂 claim → 自动走 B（或店内改为 A 的局域网 RTSP）
         用户用机身网页改网络 / 服务器
```

---

## A. 门店安装包 {#store}

给连锁安装工：**一台盒子管本店摄像头**，总部/店长用电脑或手机远程看。

1. 现场有 Docker 的电脑或迷你主机，运行 [门店盒子](/guide/store-box)（`install-store-box`）。这是安装包语义；**不是** 已公证的商店安装程序。
2. 枪机电源 + 网线进店内交换机。买什么见 [买回摄像头接到 App](/guide/add-camera)。
3. 盒子上 Admin **设备接入**：填局域网 RTSP → 测试拉流 → 保存 → 绑定 `CAMERA_ID`。
4. 控制面可以在本盒，也可以只把 `ai` 留在店里、API 指到总部（边缘节点令牌见 [设备接入 · 边缘盒](/guide/device-setup#edge)）。
5. **投射到互联网**：观看端打开 Admin / Electron / RN，走 **按需预览**（信令在云，媒体 P2P 或 TURN）。无人看时出口 ≈ 0。不要把 RTSP 暴露成公网匿名地址。

远程桌面端 = Electron 或浏览器里的 Admin。手机 = RN 看同一套列表与预览。跨网须 [ICE / TURN](/guide/ice-turn)。真机 NAT 首帧仍未勾。

---

## B. 无客户端：传统枪机直连服务器 {#hosted}

店里或家里装不了 Docker / Electron 时：**摄像头自己推流**，推到你已运行的 VistaCast 进流网关。

适合说明书里已有 **RTMP 发布** 或 **GB/T 28181** 的工程机（例如同时支持 ONVIF/RTSP/国标/RTMP 的有线枪机）。不要买只能厂商 App 云回看的消费款。

站长操作：

1. 运维在可达公网（或 VPN）的机器上起 VistaCast：**同一 Compose 里要有** `ingest`（MediaMTX）和/或 `gb28181`（ZLM），以及 **`ai`**。`ai` 仍拉再发布 RTSP，控制面不跑模型。
2. 打开摄像头网页后台：
   - **RTMP**：发布地址填 `rtmp://服务器公网IP或域名:1935/<app>/<stream>`（须带应用名和流名；不要只填主机）。
   - **GB28181**：SIP 服务器 IP/域/编号/密码改成该套 ZLM 下发的值（与现有国标平台字段相同，只是平台换成 VistaCast 网关）。
3. 本机 VLC 能播网关再发布地址后，再在 Admin 登记，协议选 RTSP，URL 填 **再发布** 地址（容器内常用 `rtsp://mediamtx:8554/…`）。
4. 绑定 `CAMERA_ID` / `SOURCE_URL` 后 `ai` 心跳 online。远程预览同路径 A。

实验室步骤：[设备接入 · 迅思维](/guide/device-setup#xstrive)（RTMP 推 MediaMTX）、[多协议进流](/guide/camera-ingest)、[交付测试](/guide/delivery-test) D 节。

**诚实边界**：当前是「你自己的一台服务器 + 实验室网关」，**不是** 已售的多租户 SaaS 进流（FR-PLT-16 ⬜）。没有网关、没有 `ai`，把 RTSP 填进「云 API」不会出画面，也没有云端大模型。

---

## C. VistaCast 定制摄像头 {#oem-cam}

目标：拆盒上电 → 自动连远程服务器 → 用户用机身网页改 Wi‑Fi 或换服务器。

| 层 | 状态 |
| :--- | :--- |
| 设备 claim / 一次 token | 已编码（实验室；`krEligible=false`） |
| 配网页字段、出厂注入 secret、量产 BOM | 规格已写；**硬件未做** |
| 供应商怎么开发 | [定制摄像头模组](/guide/camera-module) |

未拿到定制机时：用路径 A/B + 普通工程机。ESP32 套件只给固件承包方做协议样机，[ESP32 公开套件](/guide/esp32-kits)。

---

## 远程看画面（三端同一套）

| 端 | 入口 |
| :--- | :--- |
| 浏览器 | Admin `/#/cameras` → 预览 |
| Electron | 首页「看门店画面」 |
| RN | 首页「看门店画面」（先连可达的 Admin URL；真机不要 `127.0.0.1`） |

接入新枪机仍走 [买回摄像头接到 App](/guide/add-camera) 的向导。底栏「检测」是手机自己的摄像头，不是门店枪机。

---

## 禁止当成本页已交付

- 商店安装包 / 公证 DMG / 已上架 APK
- 公网无密钥 HLS 直播
- 自建云 GPU、已售 Cloud Bridge
- 定制机已量产、已自动入网到生产 SaaS
- 平台 24/7 值班（未售定制模组 / 未售云监控）
