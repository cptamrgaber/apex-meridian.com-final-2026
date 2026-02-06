# 🚀 Hostinger VPS Deployment Guide
## Apex Meridian - Complete CLI Deployment

This guide will walk you through deploying the Apex Meridian platform to your Hostinger VPS using only the command line.

---

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Hostinger VPS with Ubuntu 20.04/22.04
- ✅ Root or sudo access
- ✅ Your domain name
- ✅ VPS IP address
- ✅ SSH access configured

---

## 🎯 Quick Start (Automated Deployment)

### Step 1: Connect to Your VPS

```bash
# From your local machine
ssh root@YOUR_VPS_IP

# If using a specific user with sudo:
ssh your_username@YOUR_VPS_IP
```

### Step 2: Download and Run Automated Script

```bash
# Download the deployment script
curl -o deploy-apex.sh https://raw.githubusercontent.com/cptamrgaber/apex-meridian.com-final-2026/main/deploy-apex.sh

# Make it executable
chmod +x deploy-apex.sh

# Run the script
sudo ./deploy-apex.sh
```

The script will prompt you for:
1. Your domain name
2. MySQL root password (create a secure one)
3. Database password for the application
4. Your email (for SSL certificate)

**That's it!** The script handles everything automatically.

---

## 📖 Manual Deployment (Step-by-Step)

If you prefer to understand each step or the automated script fails, follow this manual guide.

### Step 1: Update System and Install Dependencies

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential

# Install Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v22.x.x
npm --version

# Install pnpm globally
sudo npm install -g pnpm

# Verify pnpm
pnpm --version
```

### Step 2: Install and Configure MySQL

```bash
# Install MySQL Server
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Follow the prompts:
# - Set root password: YES (choose a strong password)
# - Remove anonymous users: YES
# - Disallow root login remotely: YES
# - Remove test database: YES
# - Reload privilege tables: YES

# Login to MySQL
sudo mysql -u root -p

# Create database and user (run these SQL commands)
CREATE DATABASE apex_meridian;
CREATE USER 'apex_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON apex_meridian.* TO 'apex_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 4: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 5: Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www
cd /var/www

# Clone the repository
sudo git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git apex-meridian

# Set permissions
sudo chown -R $USER:$USER /var/www/apex-meridian
cd /var/www/apex-meridian

# Install dependencies
pnpm install

# This will take 5-10 minutes
```

### Step 6: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Paste the following and replace the placeholders:

```env
# Database
DATABASE_URL=mysql://apex_user:YOUR_SECURE_PASSWORD@localhost:3306/apex_meridian

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# OAuth (Manus - if you want to keep SSO)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your_app_id_if_using_manus_sso

# Owner Info
OWNER_OPEN_ID=your_owner_id
OWNER_NAME=Your Name

# S3 Storage (your existing S3 credentials)
S3_BUCKET=your-bucket-name
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

# Email (if using Resend)
RESEND_API_KEY=your_resend_api_key

# Frontend URLs
VITE_APP_TITLE=Apex Meridian
VITE_APP_LOGO=/logo.png
VITE_FRONTEND_FORGE_API_URL=https://yourdomain.com/api
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 7: Build the Application

```bash
# Run database migrations
pnpm db:push

# Build the application
pnpm build

# This creates optimized production files
```

### Step 8: Configure PM2

Create PM2 ecosystem file:

```bash
nano ecosystem.config.js
```

Paste this configuration:

```javascript
module.exports = {
  apps: [{
    name: 'apex-meridian',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

Save and exit.

```bash
# Create logs directory
mkdir -p logs

# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it outputs

# Check status
pm2 status
pm2 logs apex-meridian
```

### Step 9: Configure Nginx as Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/apex-meridian
```

Paste this configuration (replace `yourdomain.com` with your actual domain):

```nginx
# HTTP - Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/apex-meridian-access.log;
    error_log /var/log/nginx/apex-meridian-error.log;

    # Max upload size
    client_max_body_size 50M;

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # WebSocket support for Socket.IO
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Headers
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit.

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/apex-meridian /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### Step 10: Configure Domain DNS

Before SSL setup, point your domain to the VPS:

1. Go to your domain registrar (Hostinger, GoDaddy, etc.)
2. Add/Update these DNS records:

```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600

Type: A
Name: www
Value: YOUR_VPS_IP
TTL: 3600
```

Wait 5-10 minutes for DNS propagation.

### Step 11: Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose redirect HTTP to HTTPS: YES

# Test auto-renewal
sudo certbot renew --dry-run

# Certbot will automatically renew certificates before expiry
```

### Step 12: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### Step 13: Verify Deployment

```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check MySQL status
sudo systemctl status mysql

# View application logs
pm2 logs apex-meridian

# Check if site is accessible
curl -I https://yourdomain.com
```

Visit your domain in a browser: `https://yourdomain.com`

---

## 🔧 Post-Deployment Configuration

### Setup Automatic Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-apex.sh
```

Paste:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/apex-meridian"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u apex_user -pYOUR_PASSWORD apex_meridian | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup application files
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/apex-meridian --exclude=node_modules

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-apex.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e

# Add this line:
0 2 * * * /usr/local/bin/backup-apex.sh >> /var/log/apex-backup.log 2>&1
```

### Setup Monitoring

```bash
# Install monitoring tools
sudo apt install -y htop

# Monitor resources
htop

# Monitor PM2
pm2 monit

# View logs in real-time
pm2 logs apex-meridian --lines 100
```

---

## 🐛 Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs apex-meridian --err

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart application
pm2 restart apex-meridian

# If still failing, check environment variables
cat .env
```

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u apex_user -p apex_meridian

# Check MySQL status
sudo systemctl status mysql

# View MySQL error log
sudo tail -f /var/log/mysql/error.log

# Restart MySQL
sudo systemctl restart mysql
```

### Nginx Issues

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx error log
sudo tail -f /var/log/nginx/apex-meridian-error.log

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# If renewal fails, check DNS
dig yourdomain.com +short
```

### High Memory Usage

```bash
# Check memory usage
free -h

# Restart PM2 to clear memory
pm2 restart apex-meridian

# Reduce PM2 instances if needed
pm2 scale apex-meridian 2  # Use 2 instances instead of max
```

### Site is Slow

```bash
# Check server load
uptime

# Check disk space
df -h

# Clear old logs
pm2 flush
sudo find /var/log -type f -name "*.log" -mtime +30 -delete

# Optimize MySQL
sudo mysqlcheck -u root -p --auto-repair --optimize --all-databases
```

---

## 🔄 Updating the Application

When you need to deploy updates:

```bash
# Navigate to application directory
cd /var/www/apex-meridian

# Pull latest changes
git pull origin main

# Install any new dependencies
pnpm install

# Run database migrations
pnpm db:push

# Rebuild application
pnpm build

# Restart PM2
pm2 restart apex-meridian

# Clear PM2 logs
pm2 flush

# Monitor for errors
pm2 logs apex-meridian
```

---

## 📊 Monitoring and Maintenance

### Daily Checks

```bash
# Check application status
pm2 status

# Check disk space
df -h

# Check memory
free -h

# View recent logs
pm2 logs apex-meridian --lines 50
```

### Weekly Maintenance

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Check for security updates
sudo unattended-upgrades

# Review logs for errors
sudo tail -100 /var/log/nginx/apex-meridian-error.log

# Verify backups exist
ls -lh /var/backups/apex-meridian/
```

### Monthly Tasks

```bash
# Optimize database
sudo mysqlcheck -u root -p --optimize apex_meridian

# Clean old logs
pm2 flush
sudo find /var/log -type f -name "*.log" -mtime +30 -delete

# Review SSL certificate expiry
sudo certbot certificates

# Update Node.js dependencies
cd /var/www/apex-meridian
pnpm update
```

---

## 🎯 Performance Optimization

### Enable Gzip Compression

```bash
# Edit Nginx configuration
sudo nano /etc/nginx/nginx.conf

# Add inside http block:
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

# Reload Nginx
sudo systemctl reload nginx
```

### Setup Redis Caching (Optional)

```bash
# Install Redis
sudo apt install -y redis-server

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test Redis
redis-cli ping  # Should return PONG
```

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review logs: `pm2 logs apex-meridian`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/apex-meridian-error.log`
4. Verify all services are running:
   ```bash
   pm2 status
   sudo systemctl status nginx
   sudo systemctl status mysql
   ```

---

## ✅ Deployment Checklist

- [ ] VPS provisioned and accessible via SSH
- [ ] Domain DNS pointed to VPS IP
- [ ] Node.js 22.x installed
- [ ] MySQL installed and secured
- [ ] Nginx installed and configured
- [ ] PM2 installed
- [ ] Application cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] Application built successfully
- [ ] PM2 running application
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Site accessible via HTTPS
- [ ] Backups configured
- [ ] Monitoring setup

---

**Deployment Complete! 🎉**

Your Apex Meridian platform is now live at: `https://yourdomain.com`
