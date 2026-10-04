# Guardian 试点（M3 P0）

M3 Guardian / OEM 是 **非生产 P0 试点**：家庭、联系人、级联、本地确认、同意、OEM 激活计量已可在 lab 运行。这 **不是** 里程碑生产完成，**不是** 白牌 App/SDK，**不是** 看护准确率承诺。

完整切片：[m3-guardian-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m3-guardian-playbook.md)（**1.1.0**）。M3.1：[m3-1-ecosystem-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m3-1-ecosystem-playbook.md)。M3.2：[m3-2-ice-soc-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m3-2-ice-soc-playbook.md)。诚实矩阵：[实现状态](/engineering/implementation-status)（**1.6.0**）。证据编排：[M3 P0 验收](/engineering/m3-acceptance)。

M3.1 已增加设备 claim、家庭成员、HMAC 短期 TURN。M3.2 已增加共享 coturn、实验室 `lab-jpeg`、SoC 问卷与固件平面。说明见 [ICE / TURN](/guide/ice-turn) 与 [OEM 伙伴](/guide/oem-partner)。**仍不是** 白牌 App/SDK，**仍不是** 真机 NAT / 刷 ROM。

对外文档站只发布到 **GitHub Pages**（[docs.vistacast.dev](https://docs.vistacast.dev)）。**禁止**把本站部署到 Cloudflare Pages。

## 能力与范围

| 在 P0 试点内 | 明确不提供 |
| :--- | :--- |
| 独立 `household`（不复用 `site`）+ 摄像头关联表 | 白牌 App / SDK / 域名 / 推送（FR-OEM-02） |
| 联系人级联：`child` → `neighbor` → `partner_care` | Care 多户坐席工作台（FR-OPS-01） |
| 最后一跳 = `human_review`（人工复核） | 久未活动 / 久坐（FR-BHV-02） |
| 确认窗 **30–60 秒**，缺省 **45** | **自动拨打 120** 或任何自动急救动作（系统 **禁止** 提供） |
| `care_processing` 同意 fail-closed | 健康诊断、医疗结论（**禁止** 提供） |
| 卧室/卫生间可见光缺省关 | 真实 OEM 固件刷写 / 真机 NAT |
| OEM 激活（secret **只回传一次**）+ 幂等计量 | 看护检测准确率 / F1 |
| AI **只发候选**（`careCandidate`） | 法律同意文本完成、合作方责任转移 |
| 现有 Admin 试点页 + 现有 P2P 预览 | 生产 tag `vistacast-v0.3.0` |

工厂 `kind=fall`（无 `care`）仍是 M2 EHS 语义。家庭跌倒 = 同一 `kind` **加上** 可选 `alert.v1.care`。**禁止**发明 `care.fall` kind。

## 家庭 / 联系人 / 级联

`tenant → household` 是独立实体。摄像头通过关联表绑定；同一摄像头最多一户。**不要**把站点改名叫家庭。

| 角色 `role` | 顺序 | 试点投递 |
| :--- | :---: | :--- |
| `child` | 1 | `email` / `wecom` / `dingtalk` / `webhook`（目标来自 household contact） |
| `neighbor` | 2 | 同上；可缺，缺则跳到下一角色 |
| `partner_care` | 3 | **必须**进入 `human_review`；可附带通知，**不得**编码急救派单 |

同角色多联系人该步 **并行**。角色序 **固定**，请求体不得自定义顺序。

**不存在** destination type：`emergency`、`ambulance`、`120`、`call`。系统 **禁止** 自动拨打 120。

## 同意与敏感房间

| 同意 `subject` | 缺省 | 失败行为 |
| :--- | :--- | :--- |
| `care_processing` | 未授予 | **fail-closed**：不得打开 care incident |
| `sensitive_room_visible_light` | 未授予 | 卧室/卫生间 **不得**开可见光 |

`roomKind`：`living` | `bedroom` | `bathroom` | `kitchen` | `other`。

`bedroom` / `bathroom` 的 `visibleLightEnabled` **缺省 false**。即使绑定写 true，无 `sensitive_room_visible_light` 仍视为关。路由条件：摄像头已绑定家庭 **且** 有效 `care_processing`。未绑定家庭的 `fall` 仍走 M2 工厂路径。

本页描述的是产品 fail-closed 行为，**不是** 法律同意文本已完成。

## Care 状态机

**server** 拥有时钟（可注入）。AI **不得**写阶段、**不得**升级。

```text
candidate → awaiting_confirmation → cancelled
                                  ↘ escalated → reviewed → closed
```

| 从 | 动作 | 到 |
| :--- | :--- | :--- |
| （无） | server 接受候选 | `candidate` |
| `candidate` | server 打开窗口 | `awaiting_confirmation` |
| `awaiting_confirmation` | `cancel` | `cancelled`（**不**级联） |
| `awaiting_confirmation` | `timeout_escalate` | `escalated` |
| `escalated` | `cascade_next`（child→neighbor→partner_care） | `escalated`（更新 `cascadeStep`） |
| `escalated` | `review` | `reviewed` |
| `reviewed` | `close` | `closed` |

`confirmationWindowSec`：整数 **30–60**，缺省 **45**。Household 可配；incident 打开时快照该值。

禁止：detection / AI → `escalated`；`cancelled` → `escalated`；任何动作 → 自动急救 / 120。

工厂告警仍用 `open` / `acknowledged` / `false_positive` / `resolved`。带 `care` 的告警 **不得**只 ack 冒充本地确认。

## OEM 激活与计量

| 概念 | 口径 |
| :--- | :--- |
| `oem_activations` | 与 `edge_nodes` **分表**；禁止把 `x-edge-node-token` 当激活凭据 |
| 激活 secret | 创建响应 **回传一次**；列表/GET/PATCH **不回读**；落库 hash |
| 状态 | `pending` → `active` → `revoked`（终态） |
| 计量 | `idempotencyKey` 必填；同租户同键幂等；`source=production\|lab\|fixture` **必填** |
| KR | `lab` / `fixture` / stub **永远** `krEligible=false` |

计量 `kind`：`activate` | `deactivate` | `heartbeat`。不是急救动作。模拟设备 **不得**计为商业 KR。

## 本地运行与 `pnpm accept:m3`

先 `pnpm run init` / `pnpm bootstrap`。Admin 试点页在现有 Web（Household / Consent / Care / OEM），不新建 C 端 App。Compose 上 care simulator **默认关**，输出须标 `fixture` / `lab-compose`。

```bash
pnpm accept:m3                 # 全量严格序（含 Playwright + Compose smoke）
pnpm accept:m3 -- --fast       # 跳过 Compose 与 Playwright
pnpm accept:m3 -- --self-test  # 门闩 + schema + 文案扫描
pnpm accept:m3 -- --dry-run
```

报告：`artifacts/acceptance/m3-evidence.latest.json`（本地生成，**不入库**）。字段含义见 [acceptance/README.md](https://github.com/VistaCast/vistacast/blob/main/artifacts/acceptance/README.md)。

独立验收已对确定性步骤给出 `status=pass`。这只表示已执行命令退出码为 0。

## 证据怎么读

| 字段 | 含义 |
| :--- | :--- |
| `status: pass` | 已跑步骤成功。确定性试点代码可以通过。 |
| `krEligible` | 本编排器 **恒为 false** |
| `eligibility.*` | OEM NRE、固件、P2P、看护准确率、法律同意、合作方责任、生产 tag **全部为 false** |
| `fr.*.sources` | `unit` · `api-inject` · `playwright-fixture` · `lab-compose` — **不得**勾商业 KR |

fixture / stub / lab-compose / Playwright / API inject **不得**勾选：OEM 付费 NRE、真实固件/SoC/P2P、看护准确率、法律同意完成、合作方责任转移、`vistacast-v0.3.0`。

## 限制（仍阻塞）

- 本系统 **禁止** 自动拨打 120，也 **禁止** 提供健康诊断。
- AI 只发候选；升级与确认只在 server。
- 现有 P2P 预览保持；默认媒体面不改为中转。
- M1/M2 工厂 F1、误报率、OEM 付费意向 **保持诚实未勾**。
- 公开文档更新：推 Meta `main` 后由 **Deploy Docs** 发到 [VistaCast/docs](https://github.com/VistaCast/docs) `gh-pages`（GitHub Pages）。
