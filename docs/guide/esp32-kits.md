# ESP32 公开套件（合作方）

四套参考组装，源码在 Meta `hardware/esp32/`。**不是**量产模组、**不是**认证、**不是** OTA 刷 ROM。量产定制机规格：[定制摄像头模组](/guide/camera-module)。方案 A 另有实验室 `jpegBase64` POST；方案 B / C / D 用 ffmpeg 抽一帧后复用同一路径（D 只抓 MediaMTX 再发布 RTSP，**不要** ffmpeg 直拉 WHIP；`FRAME_INGEST_ENABLED` 默认关；**不是** FR-PLT-16、**不是**已售 Cloud Bridge、**不是**厂商 App P2P；token 不进 Git）。

| 方案 | 板子 | 进流 |
| :--- | :--- | :--- |
| A | 安信可 ESP32-CAM | HTTP MJPEG |
| B | Freenove ESP32-S3 CAM | RTSP |
| C | XIAO ESP32S3 Sense | RTMP → MediaMTX |
| D | ESP32-S3-EYE | WHIP → MediaMTX |

先 VLC 通，再在 Admin 选 `sourceKind` 并填 ffmpeg 可拉的地址。协议总表见 [多协议进流](/guide/camera-ingest)。
