# SyncroBrain

高危或需现场动作的告警，可通过 Webhook / MQTT 进入 [SyncroBrain](https://syncrobrain.com)，联动门禁、声光、工单等。

## 典型用法

1. 在 VistaCast 配置出站（见 [告警与出站](/guide/outbound)）
2. 在 SyncroBrain 侧接入对应入口
3. 告警触发后由物联侧执行或派单

适合仓储夜间、园区周界、工厂危险区等「看见之后要动作」的场景。
