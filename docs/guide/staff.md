# 员工离岗 / 玩手机（FR-AI-06）

Admin **Rules** 页可开关租户 `staffBehaviorEnabled`，并创建 `staff.away` / `staff.phone` 规则。这不是生产员工监管。

## 默认关闭

租户 `staffBehaviorEnabled` 默认 **false**。Admin 通过 `PATCH /v1/tenants/me` 打开。关闭时 API **忽略** `staffBehavior`，**不得**打开 `staff.away` / `staff.phone`。

## 规则与区域

规则类型可含 `staff.away` / `staff.phone`（默认 severity `warning`）。可选既有 `zone`：有多边形时 bbox 质心须在区内；无 zone 则整帧匹配对应 `staffBehavior`。

无嵌套条件、无跨摄、无 Re-ID。

## stub

Runtime `STUB_STAFF=away,phone` 可在 person 框上发 `staffBehavior`；**默认 stub 不发**。可与 `STUB_FACE` 共存。

## 诚实边界

| 项 | 状态 |
|----|:----:|
| 租户开关默认关；规则 kind | ✅ |
| 可选 zone；`STUB_STAFF` 可演示 | ✅ |
| 生产离岗/玩手机准确率 | ❌ |
| Re-ID（FR-AI-07）、主叙事自动开启 | ❌ |
