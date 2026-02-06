# 🚀 Hostinger VPS - Quick Start Guide

## Option 1: Automated Deployment (Recommended) ⭐

### 1. Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP
```

### 2. Run One Command
```bash
curl -sSL https://raw.githubusercontent.com/cptamrgaber/apex-meridian.com-final-2026/main/deploy-apex.sh | sudo bash
```

### 3. Answer the Prompts
- Domain name: `your-domain.com`
- MySQL root password: `create a secure password`
- Database password: `create another secure password`
- Email: `your-email@example.com`

**Done!** Your site will be live at `https://your-domain.com` in ~10 minutes.

---

## Option 2: Manual Deployment

See the complete guide: [HOSTINGER_VPS_DEPLOYMENT.md](./HOSTINGER_VPS_DEPLOYMENT.md)

---

## After Deployment

### Check Status
```bash
pm2 status                    # Application status
pm2 logs apex-meridian        # View logs
sudo systemctl status nginx   # Nginx status
sudo systemctl status mysql   # MySQL status
```

### Update Application
```bash
cd /var/www/apex-meridian
git pull origin main
pnpm install
pnpm build
pm2 restart apex-meridian
```

### View Logs
```bash
pm2 logs apex-meridian --lines 100
sudo tail -f /var/log/nginx/apex-meridian-error.log
```

---

## Important Files

- **Application**: `/var/www/apex-meridian`
- **Environment**: `/var/www/apex-meridian/.env`
- **Nginx Config**: `/etc/nginx/sites-available/apex-meridian`
- **Backups**: `/var/backups/apex-meridian/`
- **Logs**: `/var/www/apex-meridian/logs/`

---

## Troubleshooting

### Site Not Loading
```bash
pm2 restart apex-meridian
sudo systemctl restart nginx
```

### Database Issues
```bash
sudo systemctl restart mysql
mysql -u apex_user -p apex_meridian  # Test connection
```

### SSL Certificate Issues
```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Need Help?

Full documentation: [HOSTINGER_VPS_DEPLOYMENT.md](./HOSTINGER_VPS_DEPLOYMENT.md)
