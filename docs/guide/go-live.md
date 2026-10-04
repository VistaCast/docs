# 私有化上线清单

本页是 **M1 Horizon 私有化 Docker** 的上线包（FR-PLT-08 overlay），不是 `vistacast-v0.3.0`，也不是商店 App。

检测默认 **stub**。预览可选 JPEG DataChannel 或 H264 WebRTC（FR-RTC-08）；媒体不经 API。谈客户时，第一可售卖版本仍是 **M1 Enterprise**。`vistacast-v0.1.0` 仅当创始人按本清单确认后打 tag。

## 叠生产 overlay

```bash
cd deploy
cp .env.prod.example .env   # 填入唯一口令，禁止沿用 lab 默认值
node scripts/assert-prod-env.mjs
docker compose -f docker-compose.yml -f docker-compose.prod.yml config
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

| 项 | 行为 |
| :--- | :--- |
| Postgres / API / Admin 端口 | 绑定 `127.0.0.1` |
| `SEED_DEMO_CAMERA` | overlay **强制 false** |
| 环境门闩 | 拒绝 `change-me-*` / `changeme1` / `vistacast` 口令 |
| 备份 | `./scripts/backup-postgres.sh`（`pg_dump`，不是 PITR） |
| TLS | 宿主机或 control-plane Caddy：`deploy/caddy/Caddyfile.example`。不是 CI 自动签发 |

## 租户品牌（FR-OEM-02 收窄）

Admin → **Branding**：显示名、Logo URL、主色、公示 origin。登录页读 `GET /v1/public/branding`（无 JWT；单节点取最早租户）。清空后回到官方 VistaCast。

这不是 App Store 包，不是 APNs/FCM，也不替换 Meta `brand/` 源文件。

## 客户端仓

`sdk/` 的 `@vistacast/sdk` 是 thin fetch 封装（login / claim / households / members / preview）。**不是** npm 公网发布，**不是** 商店 SDK。

## 禁止用本页勾选

- OEM 付费 NRE / 真机 NAT / 刷 ROM / 看护 F1 / 自动 120
- `vistacast-v0.3.0`
- Agent 自动打 `vistacast-v0.1.0`

本地 30 分钟试点仍见 [单节点 Docker](/guide/docker)。门店盒子双击脚本见 [门店盒子 / 家庭壳](/guide/store-box)。无本地客户端、定制机：[三条接入路径](/guide/deployment-modes) · [定制模组](/guide/camera-module)。
