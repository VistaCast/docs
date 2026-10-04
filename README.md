# VistaCast 文档站

## 使用边界

这些文档公开供人阅读，也允许搜索引擎索引。**不允许**用于训练 AI，也不允许把文档交给 AI 去生成一套同类产品。详见 [AI-USE.md](./AI-USE.md)。


面向**用户与客户**的产品文档（Rspress）：定位、场景、能力、路线图与接入指南。源码仓是公开的 [VistaCast/docs](https://github.com/VistaCast/docs)。研发用的 FR / playbook / 实现状态留在 Meta `spec/`，不在本站展开。

## 开发

```bash
# 从 MetaRepo 根目录
pnpm --dir docs install   # 或 pnpm bootstrap
pnpm dev:docs             # pnpm --dir docs dev（:13102）

# 或仅 docs 目录
cd docs
pnpm install
pnpm dev
```

默认端口：**13102**（`rspress dev --port 13102`）

## 构建

```bash
pnpm build:docs           # pnpm --dir docs build
# 或
cd docs && pnpm build
```

输出目录：`docs/doc_build/`

## 部署

**GitHub Pages**（不是 Cloudflare Pages），生产域名：[docs.vistacast.dev](https://docs.vistacast.dev)。

1. 源码在本仓默认分支 `dev`
2. 推送 `dev` 或 `main` 后，本仓 Actions（`.github/workflows/pages.yml`）构建
3. 构建产物推到本仓 **`gh-pages`**。Pages 只从 `gh-pages` 提供站点

自定义域名：`doc_build/CNAME` → `docs.vistacast.dev`。

## 与 spec 的关系

- **spec/**：规范源（FR、架构、SDD）— 研发评审用
- **docs/**：对外可读文档 — 从 spec 提炼，M1 起可脚本同步
