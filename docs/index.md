---
pageType: home

hero:
  name: VistaCast
  text: 视界云遥 · AI Visual Autopilot
  tagline: 视觉事件平台 — 兼容 ONVIF/RTSP，边缘检测，P2P 预览；第一商业版面向门店与仓储
  actions:
    - theme: brand
      text: 产品定位
      link: /product/positioning
    - theme: alt
      text: 路线图
      link: /guide/roadmap
    - theme: alt
      text: GitHub
      link: https://github.com/VistaCast/vistacast

features:
  - title: 存量摄像头 AI 升级
    details: 兼容海康、大华、小米、TP-Link 等 ONVIF/RTSP 设备，无需更换硬件即可做第一商业版。
    icon: 📹
  - title: 事件优先
    details: 客流、区域入侵、离线告警 — 结构化事件 API，非全量录像托管。
    icon: ⚡
  - title: P2P 预览
    details: 信令在云、媒体直连；TURN 仅回退，降低带宽成本。
    icon: 📡
  - title: 开源可私有化
    details: Docker Compose 自建；默认 LuminaryWorks 统一登录，无 IdP 时可用本地账号。
    icon: 🔐
  - title: 一个平台、两条产品线
    details: Enterprise 先卖；Embedded/OEM 看护后置，不建两套后端。
    icon: 🧩
  - title: Spec 驱动
    details: Artifacts Workflow — spec → contracts → 代码；M1 有实现手册。
    icon: 📋
---

## 当前阶段

**M1 切片已编码，尚未发布 `vistacast-v0.1.0`。M2 必须编码切片 1–9 已关闭**；切片 10–40 含邮件渠道、边缘身份、人脸库存（默认关；可 PATCH；可填 photoRef，非照片字节）、签名 OTA 回滚（可改 artifactUrl、可删库存、节点可解绑包）、节点绑定/解绑摄像头与改名、能力位开关（inventory，非远程关推理）、节点删除（不删摄像头）、摄像头 ONVIF 库存与心跳列、camera 绑定字段、员工行为 stub（默认关）、跨仓 LW 产品 spec、工厂评测脚手架、客户真集确认清单（推迟）、Admin 工厂 EHS 表面、规则删除/Resolve/PATCH、摄像头 PATCH/删除、Webhook PATCH、通知渠道 PATCH、Admin 删除二次确认、API/页面自动化验收。检测默认 stub，预览为 JPEG。**不是**生产人脸识别 / 生产员工监管 / TPM / SyncroBrain 生产 / 工厂 F1 达标 / 生产 ONVIF GetStreamUri。**未**打 `vistacast-v0.2.0`。

**M3 P0 非生产试点技术已验收**（家庭/级联/确认/同意/OEM 激活计量；AI 只发候选）。**禁止**自动拨打 120，**禁止**健康诊断。M3.6 混合推理口径见 [混合推理](/guide/hybrid-infer)（云桥 **不是**已售 SKU；窗口 WASM **不是** NPU）。OEM NRE/固件/准确率/法律/责任/白牌与 `vistacast-v0.3.0` **仍阻塞**。说明见 [Guardian 试点](/guide/guardian)。文档站仅 **GitHub Pages**（[docs.vistacast.dev](https://docs.vistacast.dev)）。

| 里程碑 | 主题 |
|--------|------|
| D0 Blueprint | 双轨战略、契约、playbook |
| M1 Horizon | ToB：ONVIF + 客流/入侵/离线 + P2P + Docker（切片已编码） |
| M2 Sentinel | 规则 GA、工厂异常、OEM 意向 |
| M3 Embedded | OEM / 家庭级联（P0 非生产试点；白牌仍商务门闩） |
| M4 Nexus | DataLuminary 模板、Re-ID β |

## 价值链位置

```text
学 BlockyEdu → 连 SyncroBrain → 看 DataLuminary → 视 VistaCast → 控 VistaRemote → 赚 DoerFlow
```
