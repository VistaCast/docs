import path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  head: [
    ["meta", { name: "robots", content: "noai, noimageai, noarchive" }],
    ["meta", { name: "tdm-reservation", content: "1" }],
    ["meta", { name: "tdm-policy", content: "https://docs.vistacast.dev/legal/ai-use" }],
  ],
  root: "docs",
  title: "VistaCast · 视界云遥",
  description: "行业视觉平台 — 门店、仓储与产线光学 · ONVIF/RTSP · WebRTC",
  icon: "/favicon.svg",
  logo: "/brand/logo-mark.svg",
  logoText: "视界云遥",
  globalStyles: path.join(__dirname, "styles/index.css"),
  themeConfig: {
    darkMode: true,
    socialLinks: [
      { icon: "github", mode: "link", content: "https://github.com/VistaCast/vistacast" },
    ],
    nav: [
      { text: "产品", link: "/product/positioning" },
      { text: "场景", link: "/product/scenarios" },
      { text: "能力", link: "/product/capabilities" },
      { text: "路线图", link: "/guide/roadmap" },
      { text: "接入指南", link: "/guide/quick-start" },
      { text: "生态", link: "/ecosystem/luminaryworks" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "开始使用",
          items: [
            { text: "快速开始", link: "/guide/quick-start" },
            { text: "买摄像头并接入", link: "/guide/add-camera" },
            { text: "三种部署方式", link: "/guide/deployment-modes" },
            { text: "设备接入向导", link: "/guide/device-setup" },
            { text: "Docker 部署", link: "/guide/docker" },
            { text: "私有化上线", link: "/guide/go-live" },
            { text: "验收与联调", link: "/guide/delivery-test" },
            { text: "产品路线图", link: "/guide/roadmap" },
          ],
        },
        {
          text: "设备与进流",
          items: [
            { text: "多协议进流", link: "/guide/camera-ingest" },
            { text: "定制摄像头", link: "/guide/camera-module" },
            { text: "ESP32 参考套件", link: "/guide/esp32-kits" },
            { text: "边缘节点", link: "/guide/edge" },
            { text: "门店盒子与家庭壳", link: "/guide/store-box" },
            { text: "Android 设备要求", link: "/guide/device-matrix" },
          ],
        },
        {
          text: "识别与预览",
          items: [
            { text: "窗口内识别与对话", link: "/guide/client-infer" },
            { text: "混合推理与云桥", link: "/guide/hybrid-infer" },
            { text: "桌面 / 手机 / 管理台", link: "/guide/ui-ux" },
            { text: "ICE / TURN 预览", link: "/guide/ice-turn" },
          ],
        },
        {
          text: "场景能力",
          items: [
            { text: "产线光学检测", link: "/guide/pcb-aoi" },
            { text: "工厂场景评测", link: "/guide/eval" },
            { text: "人脸名单", link: "/guide/face" },
            { text: "员工行为", link: "/guide/staff" },
            { text: "告警与出站", link: "/guide/outbound" },
            { text: "家庭看护", link: "/guide/guardian" },
            { text: "OEM 伙伴", link: "/guide/oem-partner" },
          ],
        },
        {
          text: "商业与交付",
          items: [
            { text: "计费说明", link: "/guide/billing" },
            { text: "开通与授权", link: "/guide/commerce-ops" },
            { text: "场景演示", link: "/guide/pilot-demo" },
            { text: "报价与销售资料", link: "/guide/sales" },
          ],
        },
      ],
      "/product/": [
        {
          text: "产品",
          items: [
            { text: "定位与愿景", link: "/product/positioning" },
            { text: "目标场景", link: "/product/scenarios" },
            { text: "能力总览", link: "/product/capabilities" },
          ],
        },
      ],
      "/architecture/": [
        {
          text: "架构",
          items: [{ text: "架构概览", link: "/architecture/overview" }],
        },
      ],
      "/ecosystem/": [
        {
          text: "生态",
          items: [
            { text: "LuminaryWorks", link: "/ecosystem/luminaryworks" },
            { text: "DataLuminary", link: "/ecosystem/dataluminary" },
            { text: "SyncroBrain", link: "/ecosystem/syncrobrain" },
            { text: "DoerFlow", link: "/ecosystem/doerflow" },
            { text: "VistaRemote", link: "/ecosystem/vistaremote" },
          ],
        },
      ],
    },
    footer: {
      message:
        "VistaCast · 视界云遥 · Polyform Noncommercial · 禁止用于 AI 训练或生成同类产品（/legal/ai-use）",
    },
  },
});
