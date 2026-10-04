# Spec 驱动开发

VistaCast 采用 **VibeCode Spec-Driven + Artifacts Workflow**。

## 流水线

```text
spec/（战略 + 产品 + 架构 + M1/M2/M3 playbook）
  → artifacts/（OpenAPI、事件 schema）
    → shared → server → ai → web → deploy
      → docs 同步
```

## 原则

| 规则 | 说明 |
|------|------|
| Spec 是边界 | 未写入 FR 的能力视为未承诺 |
| 契约在 artifacts/ | 跨端类型只在此生成并消费 |
| 可追溯 | PR 引用 `FR-xxx` / `US-xxx` |
| 生态契约优先 | 跨产品 JWT、MQTT topic 先改 LuminaryWorks spec |
| M1 范围锁定 | M1 以 [m1-commercial-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m1-commercial-playbook.md) 为基线 |
| M2 范围锁定 | 新编码以 [m2-sentinel-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m2-sentinel-playbook.md) 为准 |
| M3 P0 范围锁定 | 非生产试点以 [m3-guardian-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m3-guardian-playbook.md) 为准；**不**开发白牌 |

## 文档层级

| 层级 | 路径 | 内容 |
|:----:|------|------|
| L0 | `spec/strategic-analysis.md` | 市场、GTM |
| L0 | `spec/product-roadmap.md` | FR、里程碑 |
| L0 | `spec/m1-commercial-playbook.md` | 第一商业版切片 |
| L0 | `spec/m2-sentinel-playbook.md` | Sentinel 切片 |
| L0 | `spec/m3-guardian-playbook.md` | Guardian/OEM P0 试点切片 |
| L1 | `spec/architecture.md` | 模块、P2P、事件流 |
| L0 | `spec/spec-driven-development-spec.md` | 完整 SDD |

## 编码规则

- M1 切片与 M2 必须切片 1–9 已编码；M3 P0 确定性代码已关闭（**非生产**）；**禁止**无 Spec 加接口，也**禁止**把 stub/JPEG/fixture 写成 `vistacast-v0.1.0` / `v0.2.0` / `v0.3.0`
- **P1** 以 [m2-sentinel-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m2-sentinel-playbook.md) §1.2 为准；切片 10–40 已做（含跨仓 LW 产品 spec、factory-eval 脚手架、客户确认推迟、规则删除/Resolve/PATCH、摄像头 PATCH/删除/ONVIF 库存/心跳列、Webhook PATCH、通知渠道 PATCH、人脸名单 PATCH / photoRef、OTA 包删除/PATCH、节点解绑 OTA、节点绑定/解绑摄像头、节点改名、能力位开关、节点删除、Admin 删除二次确认、API 自动化验收、Admin Playwright）；**不再等待** DataLuminary / BlockyEdu P0
- 推理只在 `ai` 仓

## 需求 ID

| 前缀 | 含义 |
|------|------|
| `FR-PLT-xx` | 平台基础 |
| `FR-EDG-xx` | 边缘 Runtime |
| `FR-RTC-xx` | P2P / TURN |
| `FR-AI-xx` | AI 检测 |
| `FR-RUL-xx` | 规则告警 |
| `FR-ADM-xx` | 管理台 |
| `FR-PRV-xx` | 隐私 |
| `FR-ECO-xx` | 生态 |
| `FR-CAR/BHV/OEM/MOD` | 看护 / OEM / 模组（M3+） |

完整规范：[`spec/spec-driven-development-spec.md`](https://github.com/VistaCast/vistacast/blob/main/spec/spec-driven-development-spec.md)
