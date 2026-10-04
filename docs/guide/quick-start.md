# 快速开始

> **当前阶段**：M1–M3.10 确定性编码已关闭。现场怎么测、买哪类摄像头、开箱后怎么点向导见 [交付测试清单](/guide/delivery-test)、[买回摄像头接到 App](/guide/add-camera) 与 [设备接入](/guide/device-setup)。M3 试点见 [Guardian 试点](/guide/guardian)。**不是** `vistacast-v0.1.0` / `v0.2.0` / `v0.3.0`。文档站仅 **GitHub Pages**。

## 环境要求

- **Git**
- **Node.js** ≥ 24（本地开发）
- **pnpm** ≥ 9
- **Docker Compose v2**（单节点部署，见 [Docker](/guide/docker)）

## 克隆 MetaRepo

```bash
git clone git@github.com:VistaCast/vistacast.git
cd vistacast
```

Windows 本地路径：`D:\www\vistacast`

本仓是 **MetaRepo**：用 `init` / `bootstrap` / workspace 文件组织目录；**不是** monorepo / Turborepo，也**不用** git submodule / subtree。各子仓独立 `.git`。

## 一键准备 + 文档站

```bash
pnpm install          # Meta 根 tooling
pnpm run init         # 克隆 M1 子仓（等价 ./init.sh）
pnpm bootstrap        # 各子仓分别 install + shared build
pnpm dev:docs         # Rspress（pnpm --dir docs dev，端口 13102）
pnpm dev:server       # pnpm --dir server start:dev
pnpm dev:web
pnpm dev:ai
```

默认端口：**13102**（`docs` 脚本钉死 `--port 13102`；亦见 `.meta/config.json`）。仅文档站时可跳过 `init` / `bootstrap`，直接 `pnpm install && pnpm --dir docs install && pnpm dev:docs`。

## 打开工作区

在 Cursor / VS Code 中打开 `vistacast.code-workspace`，可同时编辑 MetaRepo、`spec/`、`docs/` 与已克隆子仓。

## M1 子仓

```bash
pnpm run init                         # 克隆 shared / server / web / ai / deploy
pnpm run init -- --only=shared,server # 按需克隆
pnpm run init -- --https              # HTTPS 协议
pnpm bootstrap                        # 已克隆目录分别安装依赖
```

| 子仓 | 说明 |
|------|------|
| `shared` | Zod Schema、事件类型 |
| `server` | NestJS + Fastify API |
| `web` | React Admin |
| `ai` | Edge Runtime（检测推理） |
| `deploy` | Docker Compose |

跑子项目：优先 Meta 根 `pnpm dev:server`（`dev:web` / `dev:ai`），等价 `pnpm --dir <path> …`；也可 `cd` 进子仓直接跑。  
> `docs/` 当前 **内嵌 MetaRepo**（in-tree），无需 clone；后续可拆至 `VistaCast/docs` 独立仓。

## 阅读 Spec

MetaRepo 根目录 `spec/` 为规范源：

1. [strategic-analysis.md](https://github.com/VistaCast/vistacast/blob/main/spec/strategic-analysis.md)
2. [product-roadmap.md](https://github.com/VistaCast/vistacast/blob/main/spec/product-roadmap.md)
3. [architecture.md](https://github.com/VistaCast/vistacast/blob/main/spec/architecture.md)

## 下一步

- [单节点 Docker](/guide/docker)
- [买回摄像头接到 App](/guide/add-camera)（传统枪机 → RN 向导）
- [三条接入路径](/guide/deployment-modes)（门店盒子 / 直连服务器 / 定制机）
- [定制摄像头模组](/guide/camera-module)（开发者 / 供应商）
- [设备接入](/guide/device-setup)（Compose / 推流机 / 诊断）
- [门店盒子 / 家庭壳](/guide/store-box)
- [Guardian 试点](/guide/guardian)
- [工厂评测](/guide/eval)
- [M3 P0 验收编排](/engineering/m3-acceptance)
- [告警出站](/guide/outbound)
- [产品路线图](/guide/roadmap)
- [Spec 驱动开发](/engineering/spec-driven)
- [LuminaryWorks 生态](/ecosystem/luminaryworks)
