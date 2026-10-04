# 人脸名单库存（FR-AI-01 / FR-ADM-06）

Admin **Face** 页（`#/face`）维护租户 allow/deny **名单库存**，不是生产人脸识别。

## 默认关闭

租户 `faceEnabled` 默认 **false**。Admin 通过 `PATCH /v1/tenants/me` 打开。关闭时 API **忽略** `faceMatch`，**不得**打开 `face.stranger`。

默认关闭文案：名单只是库存，不是视觉匹配。

## 库存字段

`GET/POST /v1/face-subjects`、`PATCH /v1/face-subjects/:id`、`DELETE /v1/face-subjects/:id`。Subject 只有 `label`、`list=allow|deny`、可选 `note` / `photoRef`。

PATCH 可改 `list`。`note` / `photoRef` 传 `null` 清除（响应省略该字段）。Admin Face 表单可填 Photo ref（URI / 对象键，≤500）；空则清除。operator 可编辑，不可删除。

**没有**照片字节、**没有** embedding、列表 **不回** 生物特征模板。

## 规则与 stub

规则类型可含 `face.stranger`（默认 severity `warning`）。`faceEnabled=true` 且检测带 `faceMatch=unknown` 时，server **可以**打开该 kind。

Runtime `STUB_FACE=stranger` 可发 `faceMatch=unknown`；**默认 stub 不发**。allow/deny 条目本切片 **不证明** 视觉匹配。

## 诚实边界

| 项 | 状态 |
|----|:----:|
| 租户开关默认关；名单 CRUD | ✅ |
| Admin 可填/清除 `photoRef`（非照片字节） | ✅ |
| `STUB_FACE` 可打 `face.stranger` | ✅ |
| 生产人脸识别 / 准确率承诺 | ❌ |
| embedding 落库、Re-ID（FR-AI-07）、字段加密（SEC-01） | ❌ |
