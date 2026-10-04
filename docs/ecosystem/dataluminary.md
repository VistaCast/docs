# DataLuminary 接入（FR-ECO-01）

VistaCast 提供只读 JSON 导出，供 [DataLuminary](https://dataluminary.dev) 拉告警与客流。**不需要 DataLuminary 账号**；用本产品 JWT 即可。

**FR-ECO-02 DataTalk 模板**（M4）：`GET /v1/datatalk/templates` 列出实验室模板（JWT admin），指向下方导出路径。**不是**托管数据集、**不是**已售、`accuracyClaimed` 在无评测集时必须为 `false`。Admin 只读页：`/datatalk-templates`。

## 认证

`Authorization: Bearer <accessToken>`，与 Admin 相同：

1. `POST /v1/auth/login`（本地账号），或
2. Logto Headless SSO 后 `POST /v1/auth/sso`

`tenantId` 只来自 token，无法跨租户。`site_grants` 仍生效：未授权站点返回 `403`。

## 端点

| 方法 | 路径 | 载荷 |
|------|------|------|
| GET | `/v1/datatalk/templates` | `datatalk-dataset-template.v1` 目录（JWT admin） |
| GET | `/v1/datatalk/templates/:id` | 单条模板 |
| GET | `/v1/export/alerts` | `alert.v1` 数组 |
| GET | `/v1/export/footfall` | `footfall-snapshot.v1` 小时桶（字段是 `periodStart` / `periodEnd`，不是 `hourStart`） |

导出查询：`from` / `to`（ISO-8601）· `siteId` · `cameraId` · `cursor` · `limit`（默认 100，最大 200）。告警还可筛 `state` / `kind` / `severity`。

响应：

```json
{ "items": [ /* 事件 */ ], "nextCursor": "<optional uuid>" }
```

有 `nextCursor` 时用同一筛选再请求 `cursor=` 拉下一页。按 **id DESC**（UUIDv7）。

## 与其它接口的区别

| 接口 | 用途 |
|------|------|
| `GET /v1/export/*` | 机器拉取；无 `permissions`；写审计 |
| `GET /v1/alerts/export` | 人用 CSV（FR-ADM-04），最多 5000 行，无 cursor |
| `GET /v1/analytics/footfall` | Admin 报表：日/周/月聚合（FR-ADM-05） |

导出客流 **只含入库小时桶**。大屏若要日/周/月，自行聚合或走报表接口。

## 组合配置（FR-ECO-07）

端点 **始终存在**（Admin 自己也用）。组合包只多三件配置，默认关：

| env | 作用 |
|-----|------|
| `DATALUMINARY_EXPORT_ENABLED` | `true` 时才在 `GET /version` 的 `smartSite.dataluminary` 里宣告 |
| `DATALUMINARY_ALLOWED_ORIGINS` | 追加到已有 `CORS_ORIGIN`（`CORS_ORIGIN` 为空仍是允许任意来源） |
| `DATALUMINARY_MAX_PAGE_SIZE` | 降低 `limit` 上限（默认 200，不能抬高） |

VistaCast **不推送**到 DataLuminary。导出 JSON（`sanitizeSmartSiteExportAlert`）**保留** Event Engine lab 元数据（`clipKind` / `*HoldMs` / 布尔 `clipScreenshot`），**剥离** `care` 明细、`clipRef`，以及看起来像媒体/凭据的 payload 键（含 jpeg-ish，如 `clipJpegCount`）；2.0.51 shared 单测覆盖。**不是** VOD 字节。

## 审计

成功拉取写 `alert.export`（`payload.format=json`）或 `footfall.export`。不含密码、不含视频。

## 未做

- 专用 DataLuminary OAuth client / 服务账号
- 事件推送到 DataLuminary（目前是 **拉**）
- 托管 DataTalk 云端数据集 / 准确率宣称（无评测集时 `accuracyClaimed` 必须 false）
- 生产级跨摄 Re-ID（`STUB_REID` 仅为 lab 固定串）
