# M3 P0 验收编排

Meta 仓提供 **非生产 P0 试点** 证据编排：`pnpm accept:m3`（`tooling/m3-acceptance.mjs`）。这不是商业关闭，也不是 `vistacast-v0.3.0`。产品说明见 [Guardian 试点](/guide/guardian)。

完整解释与字段含义见 Meta 仓 [`artifacts/acceptance/README.md`](https://github.com/VistaCast/vistacast/blob/main/artifacts/acceptance/README.md)（本地路径相同）。

用户文档站只托管在 **GitHub Pages**（[docs.vistacast.dev](https://docs.vistacast.dev)），由 Meta CI 推到公开仓 [VistaCast/docs](https://github.com/VistaCast/docs) 的 `gh-pages`。**不要**部署到 Cloudflare Pages。

## 命令

```bash
pnpm accept:m3                 # 默认全量（严格依赖序）
pnpm accept:m3 -- --fast       # 跳过 Compose smoke 与 Playwright
pnpm accept:m3 -- --dry-run
pnpm accept:m3 -- --self-test
```

报告：`artifacts/acceptance/m3-evidence.latest.json`（本地生成，不入库）。`krEligible` **恒为 false**。fixture / stub / lab-compose / unit / api-inject / Playwright **不得**勾选 OEM 付费 NRE、真实固件/P2P、看护准确率、法律同意完成、合作方责任转移或生产 tag。

默认全量序：校验 M3 artifact JSON → `shared` check/test/build → `server` → `ai` → `web` → web Playwright → deploy `compose config` + M3 默认关断言 + 新卷 `compose:smoke` → docs Rspress 构建 → 本编排器范围内 Meta biome。失败会汇总（除非 `--fail-fast`）。证据 **总会** 写出。

独立验收应对确定性步骤给出 `status=pass`（含 shared/server/ai/web check-test-build、Playwright、fresh PostgreSQL Compose 超时→升级→复核→关闭）。各子仓工作区可以是 dirty；**不得**据此勾商业 KR。

## 证据怎么读

| 字段 | 含义 |
| :--- | :--- |
| `status: pass` | 已执行步骤退出码为 0。确定性试点代码可以通过。 |
| `fr.*.status: pass` | 该 FR 的自动化贡献检查成功 |
| `fr.*.sources` | `unit` · `api-inject` · `playwright-fixture` · `lab-compose` |
| `krEligible` | **恒为 false** |
| `eligibility.*` | **全部为 false**（OEM NRE、固件、P2P、看护准确率、法律同意、合作方责任、生产 tag） |

技术 `status: pass` **不是** M3 里程碑生产完成。

## 诚实边界

- 确定性试点代码可以通过；质量 / 商业 KR 仍为否。
- 本系统 **禁止** 自动拨打 120，也 **禁止** 提供健康诊断或白牌 SDK。文案扫描会抓「已完成」类断言，但不会把「禁止自动 120」说明句当成违规。
- 工厂 `fall`（无 `care`）与家庭跌倒（`fall` + `care`）必须区分；AI 只发候选。
