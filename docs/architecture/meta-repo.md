# MetaRepo 结构

VistaCast 采用 **MetaRepo + shell / workspace 编排**，与 VistaRemote、LuminaryWorks 生态一致。  
**不是** monorepo / Turborepo；**禁止** git submodule / subtree。子仓各自独立 `.git`，仅本地路径并列。

## 目录结构

```text
vistacast/                    MetaRepo（VistaCast/vistacast）
├── .meta/
│   ├── manifest.json         子仓清单与 clone 顺序
│   └── config.json           品牌、端口、clone 协议
├── spec/                     规范源（始终留在 MetaRepo）
├── artifacts/                事件 schema + OpenAPI 大纲（已建）
├── docs/                     Rspress 文档站（D0 in-tree）
├── tooling/scripts/          init-repos.mjs、bootstrap.mjs、sync-brand.mjs
├── shared/                   M1 子仓（init 克隆，独立 Git）
├── server/
├── web/
├── ai/
├── deploy/
├── init.sh / init.ps1        克隆子仓
├── dev.sh / dev.ps1          默认启动 docs
└── vistacast.code-workspace
```

## 子仓清单

| 键 | 路径 | 状态 | 说明 |
|----|------|------|------|
| `docs` | `docs/` | ✅ in-tree | Rspress，D0 可用 |
| `spec` | `spec/` | ✅ in-tree | 规范源 |
| `shared` | `shared/` | ✅ M1 | Zod / 共享类型 |
| `server` | `server/` | 🟡 M1 | NestJS API |
| `web` | `web/` | 🟡 M1 | Admin Console |
| `ai` | `ai/` | 🟡 M1 | Edge Runtime（推理只在此仓） |
| `deploy` | `deploy/` | 🟡 M1 | Docker Compose + coturn |

## 常用命令

```bash
pnpm install          # 仅 Meta 根 tooling
pnpm run init         # 克隆子仓（./init.sh）
pnpm bootstrap        # docs + 已克隆子仓分别 install；shared build
pnpm bootstrap:with-docker
pnpm dev:docs         # pnpm --dir docs dev（:13102）
pnpm dev:server       # pnpm --dir server start:dev
pnpm dev:web
pnpm dev:ai
pnpm build:docs       # 构建静态站 → docs/doc_build
pnpm accept:m3        # M3 P0 试点证据；krEligible 恒 false
```

## 工作区

打开 `vistacast.code-workspace` 可同时编辑 MetaRepo、`spec/`、`docs/` 与已克隆子仓。

用户文档站生产托管仅 **GitHub Pages**（[docs.vistacast.dev](https://docs.vistacast.dev)）。M3 P0 试点说明见 [Guardian 试点](/guide/guardian)。

## 与 VistaRemote 对齐

| 项 | VistaRemote | VistaCast |
|----|-------------|-----------|
| MetaRepo | vibeCode | vistacast |
| 清单 | `.meta/manifest.json` | 同 |
| init / bootstrap | `pnpm run init` · `pnpm bootstrap` | 同 |
| 文档 | Rspress 子仓 | D0 in-tree，后续可拆 |
