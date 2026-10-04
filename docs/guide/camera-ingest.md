# 多协议进流（合作方）

固定枪机进 `ai`：**ffmpeg 拉 `sourceUrl`**。厂商 App 私有 P2P / 仅云回看 **不支持**。

| 协议 | Admin `sourceKind` | 实验室 |
| :--- | :--- | :--- |
| RTSP / RTSPS | `rtsp` | 现有；Compose `rtsp` |
| RTMP | `rtmp` | `docker compose --profile ingest up -d`。工业推流机（迅思维一类）**优先推到 MediaMTX**，Admin 填再发布 RTSP，不要长时间直拉摄像头 `:1935` |
| HLS | `hls` | 填 `http(s)://…m3u8`（MediaMTX `:8888`） |
| SRT | `srt` | MediaMTX `:8890`（需带 **libsrt** 的 ffmpeg） |
| HTTP MJPEG | `http_mjpeg` | ESP32-CAM `/stream` |
| 摄像头 WHIP | `webrtc` | 推 `:8889/<path>/whip`，`sourceUrl` 填再发布 RTSP |
| GB/T 28181 | `gb28181` | `docker compose --profile gb28181 up -d`；SIP `:5060`，拉 ZLM RTSP |

摄像头 WHIP **不是** Admin 预览 WebRTC。国标信令在 ZLMediaKit，**不是** Nest 里自研 SIP。实验室从 ZLM **再发布 RTSP** 抽一帧再走 kit-a JPEG POST：[GB28181 lab](https://github.com/VistaCast/vistacast/blob/main/hardware/gb28181/README.md)（`FRAME_INGEST_ENABLED` 默认关；**不是** ffmpeg 拉 SIP、**不是** FR-PLT-16、**不是**刷 ROM）。实验室从 MediaMTX **HLS :8888 / SRT :8890** 抽一帧再走同一 POST：[HLS lab](https://github.com/VistaCast/vistacast/blob/main/hardware/hls/README.md) · [SRT lab](https://github.com/VistaCast/vistacast/blob/main/hardware/srt/README.md)（SRT 需带 libsrt 的 ffmpeg；默认关；**不是** FR-PLT-16、**不是** WHIP 产品路径、**不是** Nest SIP）。

登记前在 [设备接入](/guide/device-setup) 探测一帧（FR-PLT-12）。失败看诊断码，不要当成心跳离线。现场选盒子还是直连服务器：[三条接入路径](/guide/deployment-modes)。站长把传统枪机接到 RN App：[买回摄像头接到 App](/guide/add-camera)。Compose / 迅思维真机：[用户买回摄像头](/guide/device-setup#buy-camera)。供应商模组：[定制摄像头模组](/guide/camera-module)。

ESP32 套件：[ESP32 公开套件](/guide/esp32-kits)。规格：[camera-source.md](https://github.com/VistaCast/vistacast/blob/main/spec/camera-source.md)。
