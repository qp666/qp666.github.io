#!/usr/bin/env bash
# DNS TXT 添加完成后签发 resume.wxz.asia 证书并启用 HTTPS
# 用法: ssh ecs-user@8.166.121.81 'bash -s' < deploy/ssl-finish.sh
set -euo pipefail

DOMAIN="resume.wxz.asia"
ACME="/home/ecs-user/.acme.sh/acme.sh"
CERT_DIR="/etc/letsencrypt/live/${DOMAIN}"
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}.conf"

echo "检查 DNS TXT _acme-challenge.${DOMAIN} ..."
TXT=$(dig +short TXT "_acme-challenge.${DOMAIN}" @dns27.hichina.com | tr -d '"')
if [[ -z "$TXT" ]]; then
  echo "❌ DNS TXT 尚未生效，请在阿里云添加："
  echo "   主机记录: _acme-challenge.resume"
  echo "   记录类型: TXT"
  echo "   记录值: 运行 deploy/ssl-issue.sh 获取"
  exit 1
fi
echo "✅ DNS TXT: $TXT"

"$ACME" --renew -d "$DOMAIN" --preferred-chain "ISRG Root X1" --yes-I-know-dns-manual-mode-enough-go-ahead-please --dnssleep 15

ACME_DIR="/home/ecs-user/.acme.sh/${DOMAIN}_ecc"
sudo mkdir -p "$CERT_DIR"
sudo cp "$ACME_DIR/${DOMAIN}.key" "$CERT_DIR/privkey.pem"
sudo cp "$ACME_DIR/fullchain.cer" "$CERT_DIR/fullchain.pem"
sudo chmod 600 "$CERT_DIR/privkey.pem"
sudo chmod 644 "$CERT_DIR/fullchain.pem"

sudo tee "$NGINX_CONF" > /dev/null <<'EOF'
server {
    listen 80;
    server_name resume.wxz.asia;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$server_name$request_uri; }
}
server {
    listen 443 ssl http2;
    server_name resume.wxz.asia;
    ssl_certificate     /etc/letsencrypt/live/resume.wxz.asia/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/resume.wxz.asia/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    root /var/www/resume-site;
    index index.html;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    location / { try_files $uri $uri/ /index.html; }
    location /assets { expires 365d; add_header Cache-Control "public, immutable"; }
}
EOF

sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}.conf"
sudo nginx -t && sudo systemctl reload nginx
sudo openssl x509 -in "$CERT_DIR/fullchain.pem" -noout -subject -dates
echo "✅ https://${DOMAIN} 已启用"
