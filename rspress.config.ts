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
  description: "AI Visual Autopilot — 纯软件 AI 云监控 · ONVIF/RTSP",
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
      { text: "架构", link: "/architecture/overview" },
      { text: "路线图", link: "/guide/roadmap" },
      { text: "生态", link: "/ecosystem/luminaryworks" },
      { text: "开发", link: "/guide/quick-start" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "入门",
          items: [
            { text: "快速开始", link: "/guide/quick-start" },
            { text: "买回摄像头接到 App", link: "/guide/add-camera" },
            { text: "三条接入路径", link: "/guide/deployment-modes" },
            { text: "设备接入", link: "/guide/device-setup" },
            { text: "单节点 Docker", link: "/guide/docker" },
            { text: "私有化上线", link: "/guide/go-live" },
            { text: "交付测试清单", link: "/guide/delivery-test" },
            { text: "产品路线图", link: "/guide/roadmap" },
          ],
        },
        {
          text: "设备与进流",
          items: [
            { text: "多协议进流", link: "/guide/camera-ingest" },
            { text: "定制摄像头模组", link: "/guide/camera-module" },
            { text: "ESP32 公开套件", link: "/guide/esp32-kits" },
            { text: "边缘节点", link: "/guide/edge" },
            { text: "门店盒子 / 家庭壳", link: "/guide/store-box" },
            { text: "Android 设备矩阵", link: "/guide/device-matrix" },
          ],
        },
        {
          text: "推理",
          items: [
            { text: "窗口内 YOLO / Chat", link: "/guide/client-infer" },
            { text: "混合推理 / 云桥", link: "/guide/hybrid-infer" },
            { text: "三端场景化 UI", link: "/guide/ui-ux" },
          ],
        },
        {
          text: "场景",
          items: [
            { text: "PCB / PCBA 光学检测", link: "/guide/pcb-aoi" },
            { text: "工厂评测", link: "/guide/eval" },
            { text: "客户确认", link: "/guide/customer-confirmation" },
            { text: "人脸名单", link: "/guide/face" },
            { text: "员工行为", link: "/guide/staff" },
            { text: "告警出站", link: "/guide/outbound" },
          ],
        },
        {
          text: "商业（未售口径）",
          items: [
            { text: "计费与落点", link: "/guide/billing" },
            { text: "中央 Entitlement 实验室", link: "/guide/entitlement-lab" },
            { text: "运营开通（软运营）", link: "/guide/commerce-ops" },
            { text: "试点演示（诚实口径）", link: "/guide/pilot-demo" },
            { text: "空白报价单（未售）", link: "/guide/quote-sheet" },
            { text: "销售一页纸", link: "/guide/sales" },
            { text: "商店 listing 草稿", link: "/guide/store-listing" },
          ],
        },
        {
          text: "看护与 OEM",
          items: [
            { text: "Guardian 试点", link: "/guide/guardian" },
            { text: "ICE / TURN", link: "/guide/ice-turn" },
            { text: "OEM 伙伴", link: "/guide/oem-partner" },
          ],
        },
      ],
      "/product/": [
        {
          text: "产品",
          items: [
            { text: "定位与愿景", link: "/product/positioning" },
            { text: "目标场景", link: "/product/scenarios" },
            { text: "能力矩阵", link: "/product/capabilities" },
          ],
        },
      ],
      "/architecture/": [
        {
          text: "架构",
          items: [
            { text: "架构概览", link: "/architecture/overview" },
            { text: "MetaRepo 结构", link: "/architecture/meta-repo" },
          ],
        },
      ],
      "/engineering/": [
        {
          text: "工程",
          items: [
            { text: "Spec 驱动开发", link: "/engineering/spec-driven" },
            { text: "M3 P0 验收编排", link: "/engineering/m3-acceptance" },
            { text: "实现状态", link: "/engineering/implementation-status" },
          ],
        },
      ],
      "/ecosystem/": [
        {
          text: "生态",
          items: [
            { text: "LuminaryWorks", link: "/ecosystem/luminaryworks" },
            { text: "DataLuminary 接入", link: "/ecosystem/dataluminary" },
            { text: "接入 SyncroBrain", link: "/ecosystem/syncrobrain" },
            { text: "接入 DoerFlow", link: "/ecosystem/doerflow" },
            { text: "与 VistaRemote", link: "/ecosystem/vistaremote" },
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
