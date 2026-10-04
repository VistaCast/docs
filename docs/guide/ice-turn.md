# ICE / TURN（跨产品）

VistaCast、VistaRemote、BlockyEdu **共享 ICE 列表与短期 TURN 凭据格式**，**不共享信令协议或媒体轨**。信令仍是各产品私有。本层只降低 TURN 中继成本与静态口令泄露面。

详细契约：[ice-turn.md](https://github.com/VistaCast/vistacast/blob/main/spec/ice-turn.md)。M3.2 切片：[m3-2-ice-soc-playbook](https://github.com/VistaCast/vistacast/blob/main/spec/m3-2-ice-soc-playbook.md)。

## 已编码

- 会话创建可返回 `ttlSeconds` 的 TURN 条目。
- 配置 `TURN_REST_SECRET` 时，lab 用户名为 `vistacast:{tenantShort}:{expiryUnix}`；共享池 `TURN_SHARED_POOL=1` 时为 `vc:{tenantShort}:{expiryUnix}`（`vr:` / `be:` 给兄弟产品）。口令为 HMAC-SHA1（coturn REST）。
- 未配置 secret 时回退 M1 静态 `TURN_USERNAME` / `TURN_CREDENTIAL`（单产品 lab）。
- `turn-session.v1` 可由现有 `p2p-session.v1` 映射（补 `product`，不强制 `cameraId`）。路径遥测 **不计费**。
- **一份** Compose `coturn` 模块：`realm`（默认 `turn.luminaryworks.local`）、`external-ip`、有 secret 则 `--use-auth-secret`。按 product+tenant 并发配额（默认 8）；超限省略 TURN，STUN/P2P 仍可。
- **FR-RTC-07（家居 / 中国大陆）**：默认 **不**广告 Google STUN。未设 `STUN_URL` 时从 `TURN_URL` 推导 `stun:`。TURN 同时广告 UDP + TCP；可选 `TURN_TLS_URL`（`turns:`）。会话 `iceTransportPolicy` 缺省 `all`（先直连再中继）。coturn 监听 UDP+TCP 3478，配证书时可开 TLS。
- **FR-RTC-08**：会话 `previewMode=jpeg|webrtc`。JPEG 提帧/缩放；H264 由店内 `ai` 按需编码。都走 P2P-first + TURN。Admin 在 H.264 无首帧（约 10s）或 ICE failed 时改走 JPEG。**不是** API 直推、WHEP 或付费 SFU。
- **Hangup / path telemetry（2.0.67）**：hangup WS 停 runtime sender；REST hangup 设 `endedAt`；`POST .../path` 为独立 path 遥测。**不是** Event Engine / **不是** VOD / **不是**计费。

## 明确不做

- 统一 Socket.IO / VistaRemote envelope
- 把摄像头媒体默认送进 API / SFU
- 把静态 TURN 用户名口令放进跨产品共享池
- 用本页勾选 OEM 真机 P2P 或生产 tag
- 付费云 SFU
- 承诺对称 NAT / 运营商 CGNAT 也能 100% 直连（这类网络合法走 TURN）

## 环境变量

| 变量 | 作用 |
| :--- | :--- |
| `STUN_URL` | 广告给浏览器的 STUN。**空**则从 `TURN_URL` 主机推导。可逗号分隔多个。不要填 `stun.l.google.com`（大陆经常不可达） |
| `TURN_URL` | 广告给浏览器的 TURN URL（无 query 时展开为 `?transport=udp` 与 `?transport=tcp`） |
| `TURN_TLS_URL` | 可选 `turns:`（建议 443），宾馆/校园防火墙 |
| `TURN_TRANSPORTS` | 缺省 `udp,tcp`。设 `udp` 可只广告 UDP |
| `ICE_TRANSPORT_POLICY` | 缺省 `all`（P2P-first）。`relay` 仅调试 |
| `TURN_REST_SECRET` | coturn `--use-auth-secret`；设置后签发短期 HMAC，忽略静态用户名口令 |
| `TURN_SHARED_POOL` | `1` 时 HMAC 用户名用 `vc`/`vr`/`be` 前缀 |
| `TURN_QUOTA_CONCURRENT` | 每租户并发 `path=turn` 会话上限，缺省 8；`0` 不限 |
| `TURN_REALM` | coturn realm，缺省 `turn.luminaryworks.local` |
| `TURN_TTL_SEC` | 600–86400，缺省 3600 |
| `TURN_USERNAME` / `TURN_CREDENTIAL` | **仅**无 `TURN_REST_SECRET` 时的 lab 回退 |
| `TURN_TLS_CERT` / `TURN_TLS_PKEY` | coturn TLS 证书；未设则 `--no-tls` |

共享 coturn 必须配 secret。Compose profile `turn` 默认仍是长期开发凭证，直到你设置 `TURN_REST_SECRET`。

## 大陆家居部署要点

1. coturn 放在 **大陆可达** 公网 IP（或专线），`TURN_EXTERNAL_IP` 填该 IPv4。
2. 安全组：UDP/TCP **3478**、UDP **49160–49170**；有证书再开 TCP **443** 或 **5349**。
3. `TURN_URL=turn:<公网主机>:3478`，`STUN_URL` 留空即可。
4. 子女手机与家里边缘不在同一 NAT 时，先试 P2P；对称 NAT / 运营商 CGNAT 会落到 TURN——这是预期，不是失败。
5. 不要把 RTSP 经 API 反代当默认预览。
