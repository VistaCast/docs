# 定制摄像头模组（开发者 / 供应商）

给 ODM、固件承包方和自研硬件的同事。量产规格源：[camera-module.md](https://github.com/VistaCast/vistacast/blob/main/spec/camera-module.md)（FR-MOD-01～04）。三条现场路径：[接入路径](/guide/deployment-modes)。

**不是** 量产 BOM、**不是** 认证、**不是** OTA 刷 ROM、**不是** 已售摄像头 SKU。已售定制机才可对外承诺 24/7（FR-PLT-17）。**先**第三方 AI 板 + EventEngine 验证，**再**自研 PCB。实验室板子：[ESP32 公开套件](/guide/esp32-kits)。商务门闩：[OEM 伙伴](/guide/oem-partner)。

---

## 你们要交付什么

VistaCast 不自产传感器。供应商做 **摄像机整机或模组**，出厂能进我们的控制面，用户能自己改网络和服务器。

| SKU | 一句话 | 店里没盒子时 |
| :--- | :--- | :--- |
| VC-CAM-LAN | 标准 ONVIF/RTSP 工程机外观可定制 | 不行，须路径 A 拉流 |
| VC-CAM-PUSH | 可填远程 RTMP / WHIP / GB28181 | 推到托管进流（路径 B） |
| VC-CAM-EDGE | 板上能跑 Node 24 + `ai` sidecar | 可选；先过 SoC 类 A 问卷 |

优先报价 **LAN + PUSH**。EDGE 另开 NRE。

---

## 固件清单（必须）

1. **H.264** 主/子码流；子码流给预览和探测。
2. 局域网 **RTSP** 始终可开（路径 A 兜底）。VLC 打不开的机型不要送样。
3. **配网页**（有线：设备 IP；无线：先 AP `192.168.4.1`）：
   - Wi‑Fi / 有线 IP
   - VistaCast 进流模式 + 主机 + 端口 + 流密钥或国标 SIP 参数（密钥只写不回读）
   - 推流/注册状态
   - 恢复网络设置（保留序列号）
4. **出厂 claim**：OTP 里 `oemDeviceId` + `deviceSecret`。上电调用已有 `POST /v1/oem/devices/claim`（无 JWT）。成功后再推流。错 secret 必须 401。
5. 断线重连；不要把租户 JWT 写进设备。

协议细节与验收表 S1–S8 见 Spec §3–§5。国标信令在 ZLMediaKit，不要在设备里实现「VistaCast SIP 平台」。

```text
出厂注入 secret
    → 用户插电 / 配 Wi‑Fi（网页）
    → claim
    → 推 RTMP 或注册 GB28181 到返回的 ingest
    → 区域 ai 拉再发布 RTSP → 告警 + 按需 P2P 预览
```

---

## 联调怎么接实验室

供应商第一周不必等量产进流 SaaS：

```bash
cd deploy
cp .env.example .env
docker compose up -d
docker compose --profile ingest --profile gb28181 up -d
```

- RTMP 推 `rtmp://实验室LAN:1935/<app>/<stream>`，Admin 填网关再发布 RTSP。
- 国标把 SIP 填进 ZLM 文档中的域/端口（以 `deploy` 当时说明为准）。
- claim 用 Admin 创建的激活 secret，实验室计量 `krEligible=false`。

传统工程机（海康 / 大华 / 安格华一类已带 RTMP+GB28181）可当 **PUSH 行为金样**：只改后台 URL，不改固件。定制机要把同样字段做成开箱默认 + 可改。

---

## 参考实现（非量产）

| 目的 | 用什么 |
| :--- | :--- |
| MJPEG 最小闭环 | ESP32-CAM 方案 A |
| 板端 RTSP | ESP32-S3 方案 B |
| 推 RTMP | XIAO Sense 方案 C |
| 推 WHIP | 方案 D |

源码：Meta `hardware/esp32/`。这些板 **不能** 当 VC-CAM 出货件。

类 A SoC（Linux + Node）才允许讨论板上 Runtime；类 B NPU 无 Node、类 C 只报 JPEG、类 D 仅私有 P2P：问卷会拒绝或要求额外 adapter，见 [OEM 固件轨道](https://github.com/VistaCast/vistacast/blob/main/spec/oem-commercial-firmware-playbook.md)。

---

## 用户能直接设置

拆盒后不必会 Docker：

1. 手机连设备 AP 或同一网段打开机身网页。
2. 填家里 Wi‑Fi（无线款）或确认有线 IP。
3. 填安装商给的 **服务器地址 + 流密钥**（或扫安装工单二维码；二维码内容不得含 secret 明文进截图）。
4. 保存后看「推流中 / 已注册」。
5. 店长用 RN / 浏览器登录 **VistaCast Admin** 看画面（[接入路径](/guide/deployment-modes)），不是厂商 App。

路径 A 门店仍可关掉推流、只留 RTSP 给店内盒子。

---

## 交付物（送样检查单）

- [ ] 两台样机 + 序列号/secret 密封袋（secret 不进邮件正文）
- [ ] 配网页截图（中英）与默认账号
- [ ] RTSP / RTMP / 国标 各一条 VLC 成功录屏
- [ ] 固件版本字符串与回滚说明
- [ ] 电源、工作温度、PoE 是否支持（结构与 RMA 另签）

未过 S8（必须厂商 App 才能出流）的样机 **退回**。

---

## 和现有 API 的关系

| 已有 | 模组怎么用 |
| :--- | :--- |
| `POST /v1/oem/devices/claim` | 自动入网 |
| `GET /v1/oem/capabilities` | 只读能力目录；不必白牌 App |
| 进流探测 `POST /v1/cameras/probe-source` | 安装工/Admin 测一帧 |
| Cloud Bridge | **不是** 取帧；**不是** 已售 |

多租户托管 ingest URL 的自动下发（FR-PLT-16）编码未关：样机阶段由安装工把实验室或客户机房 URL 填进配网页。
