#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="${REMOTE:-ecs-user@8.166.121.81}"
DOMAIN="resume.wxz.asia"
WEB_ROOT="/var/www/resume-site"

echo "📦 构建..."
cd "$ROOT"
pnpm build

echo "🚀 上传静态文件到 $REMOTE:$WEB_ROOT ..."
ssh "$REMOTE" "sudo mkdir -p $WEB_ROOT && sudo chown -R ecs-user:ecs-user $WEB_ROOT"
rsync -avz --delete "$ROOT/dist/" "$REMOTE:$WEB_ROOT/"

echo "⚙️  配置 Nginx..."
scp "$ROOT/deploy/nginx/resume.wxz.asia.conf" "$REMOTE:/tmp/resume.wxz.asia.conf"
ssh "$REMOTE" "sudo cp /tmp/resume.wxz.asia.conf /etc/nginx/sites-available/resume.wxz.asia.conf && sudo ln -sf /etc/nginx/sites-available/resume.wxz.asia.conf /etc/nginx/sites-enabled/resume.wxz.asia.conf"

if ssh "$REMOTE" "sudo test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem"; then
  echo "✅ SSL 证书已存在"
else
  echo "🔐 申请 SSL 证书（DNS 手动验证）..."
  ssh "$REMOTE" bash -s "$DOMAIN" <<'REMOTE_SSL'
set -euo pipefail
DOMAIN="$1"
ACME="/home/ecs-user/.acme.sh/acme.sh"
CERT_DIR="/etc/letsencrypt/live/${DOMAIN}"

sudo mkdir -p "$CERT_DIR"
"$ACME" --issue -d "$DOMAIN" --dns --preferred-chain "ISRG Root X1" --yes-I-know-dns-manual-mode-enough-go-ahead-please || true

if ! sudo test -f "$CERT_DIR/fullchain.pem"; then
  echo ""
  echo "请在阿里云 DNS 添加 TXT 记录后，运行："
  echo "  ssh ecs-user@8.166.121.81"
  echo "  sudo bash -c '$ACME --renew -d $DOMAIN --yes-I-know-dns-manual-mode-enough-go-ahead-please --dnssleep 15 && $ACME --install-cert -d $DOMAIN --key-file $CERT_DIR/privkey.pem --fullchain-file $CERT_DIR/fullchain.pem --reloadcmd \"nginx -t && systemctl reload nginx\"'"
  echo ""
  echo "⚠️  暂时仅启用 HTTP（无证书时跳过 HTTPS）"
  # HTTP-only fallback
  sudo tee /etc/nginx/sites-available/resume.wxz.asia.conf > /dev/null <<EOF
server {
    listen 80;
    server_name resume.wxz.asia;
    root /var/www/resume-site;
    index index.html;
    location / { try_files \$uri \$uri/ /index.html; }
    location /assets { expires 365d; add_header Cache-Control "public, immutable"; }
}
EOF
fi
REMOTE_SSL
fi

ssh "$REMOTE" "sudo nginx -t && sudo systemctl reload nginx"
echo "✅ 部署完成: https://$DOMAIN"
