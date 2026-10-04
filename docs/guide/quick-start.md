# 快速开始

最快路径：本机 Docker 起一套 VistaCast → 接一路摄像头 → 看告警与预览。

## 1. 环境

- Node.js 24+（若从源码构建）
- Docker / Docker Compose
- 一路 ONVIF 或 RTSP 摄像头（也可先用实验室推流）

## 2. 启动

按仓库 [部署说明](https://github.com/VistaCast) 与 [Docker 部署](/guide/docker) 启动核心服务（API、数据库、检测、管理台）。

## 3. 登录管理台

浏览器打开管理台地址，使用统一登录或本地账号进入。

## 4. 添加摄像头

在 **设备接入** 中填写 RTSP 或走 ONVIF 发现，测试拉流后保存。更完整的选购与接线见 [买摄像头并接入](/guide/add-camera)。

## 5. 配置规则并验证

建一条客流或入侵规则，确认告警出现；需要时配置 Webhook。清单见 [验收与联调](/guide/delivery-test)。

## 6. 按需预览

在摄像头详情打开预览。跨网环境请配置 [ICE / TURN](/guide/ice-turn)。

## 下一步

- [三种部署方式](/guide/deployment-modes)
- [私有化上线](/guide/go-live)
- [产品路线图](/guide/roadmap)
