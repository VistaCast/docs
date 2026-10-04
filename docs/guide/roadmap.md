# 产品路线图

> 完整 FR/US：[`spec/product-roadmap.md`](https://github.com/VistaCast/vistacast/blob/main/spec/product-roadmap.md)
>
> M1 切片：[`spec/m1-commercial-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m1-commercial-playbook.md)
>
> M2 切片：[`spec/m2-sentinel-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m2-sentinel-playbook.md)
>
> M3 P0 切片：[`spec/m3-guardian-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m3-guardian-playbook.md)（**1.1.0**）
>
> M3.1 切片：[`spec/m3-1-ecosystem-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m3-1-ecosystem-playbook.md)
>
> M3.3 切片：[`spec/m3-3-golive-branding-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m3-3-golive-branding-playbook.md)
>
> M3.4 切片：[`spec/m3-4-on-device-packaging-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m3-4-on-device-packaging-playbook.md)
>
> M3.6 切片：[`spec/m3-6-hybrid-infer-playbook.md`](https://github.com/VistaCast/vistacast/blob/main/spec/m3-6-hybrid-infer-playbook.md)
>
> M3.8–M3.10 草案：NNAPI / 云桥 SKU / 商店 tag（**未**编码、**未**真机勾、**未**上架）

## 时间线

```text
D0 Spec 1.1  →  M1 第一商业版  →  M2 Sentinel  →  M3 Embedded  →  M4 Nexus
```

## 里程碑

| 阶段 | 代号 | 主题 | 核心交付 | 状态 |
|:----:|------|------|----------|:----:|
| **D0** | Blueprint | Spec 定稿 | 双轨战略、契约、playbook | ✅ 2026-08-31 已签字 |
| **M1** | Horizon | ToB 可售卖 | ONVIF + 客流/入侵/离线 + P2P + Docker | 🟡 切片已编码，未打 tag |
| **M2** | Sentinel | 质量 + OEM 意向 | 规则 GA、工厂异常、人脸可选 | 🟡 必须切片 1–9 已编码；P1 人脸/OTA/绑定/员工行为为库存+stub；未打 tag |
| **M3** | Embedded | OEM / 看护 | SDK、级联通知（商务门闩） | 🟡 P0–M3.5 已编码；**M3.6 切片 0–4 已关**；**未**打 tag |
| **M4** | Nexus | 生态 | DataLuminary 模板、Re-ID β | ⬜ |

## M1 · 第一商业版

**主题**：摄像头上线 30 分钟，看到客流、入侵和离线告警；预览走 P2P。

**包含**：多租户、ONVIF、边缘 Runtime、客流、入侵、规则、Webhook、确认/误报、Docker。

**不包含**：人脸库、跌倒看护、自动 120、白牌 App、模组、DataLuminary 模板。

## M2 · Sentinel

**主题**：告警可信、规则可分级、工厂异常能识别。OEM 意向是商务 KR，不能用代码勾选。

**必须编码已关闭（切片 1–9）**：告警分级 + 审计 + 客流报表 + 同摄 AND/OR + REST 导出 + 可选 HTTP 远程 Provider（非 F1）+ 工厂异常 kind+stub（非 F1）+ 可选 MQTT 出站（本机 Mosquitto，非 SB 生产）+ [出站文档](/guide/outbound)。

**仍开放的 P1**：无（编码侧）。人脸库存、签名 OTA 回滚、camera↔device 字段、邮件/企微/钉钉、设备身份、员工离岗均为库存+stub（诚实边界见各文档）。工厂评测脚手架见 [工厂评测](/guide/eval)。真集现场确认推迟，清单见 [客户确认](/guide/customer-confirmation)。跨仓 LuminaryWorks 产品 spec 已对齐。跌倒 F1 与 OEM 付费意向 **禁止**用 stub/代码勾选。**未**打 `vistacast-v0.2.0`。

## M3 · Guardian P0（非生产试点）

**主题**：家庭级联与 OEM 激活可在 lab 跑通；**不得**写成生产完成或白牌。

**确定性代码已关闭**：独立 household、联系人级联（最后一跳 `human_review`）、30–60s 确认（缺省 45）、同意 fail-closed、OEM secret 一次、AI 只发候选。说明见 [Guardian 试点](/guide/guardian)。

**仍阻塞（人工/商务）**：OEM 付费 NRE/小批量、真实固件刷写 / 真机 NAT、看护准确率、法律同意、合作方责任、白牌 App/SDK、`vistacast-v0.3.0`。系统 **禁止** 自动拨打 120，也 **禁止** 提供健康诊断。编码侧 M3.2（共享 coturn / `lab-jpeg` / 双平面）见 [ICE / TURN](/guide/ice-turn)、[OEM 伙伴](/guide/oem-partner)、[边缘节点](/guide/edge)。

## 编码启动

- 不再等待 DataLuminary / BlockyEdu P0
- playbook 切片 1–10 已编码；tag 门槛见 [实现状态](/engineering/implementation-status)

## 成功指标（M1）

| Objective | Key Results |
|-----------|-------------|
| 可售卖闭环 | Compose 可独立跑通；2 个付费/付费试点站点 |
| 技术可信 | 在线率 > 95%；告警 P95 < 30s |
