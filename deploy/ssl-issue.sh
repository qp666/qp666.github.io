#!/usr/bin/env bash
# 获取 resume.wxz.asia SSL 证书所需的 DNS TXT 记录
# 用法: ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-issue.sh
set -euo pipefail
ACME="/home/ecs-user/.acme.sh/acme.sh"
"$ACME" --issue -d resume.wxz.asia --dns --preferred-chain "ISRG Root X1" --yes-I-know-dns-manual-mode-enough-go-ahead-please 2>&1 || true
echo ""
echo "添加 TXT 记录后运行: bash deploy/ssl-finish.sh"
