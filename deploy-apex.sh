#!/bin/bash

###############################################################################
# Apex Meridian - Automated Hostinger VPS Deployment Script
# This script automates the complete deployment process
###############################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    log_error "Please run as root or with sudo"
    exit 1
fi

log_info "=== Apex Meridian VPS Deployment Script ==="
echo ""

# Collect user inputs
read -p "Enter your domain name (e.g., apex-meridian.com): " DOMAIN
read -sp "Enter MySQL root password (will be created): " MYSQL_ROOT_PASSWORD
echo ""
read -sp "Enter database password for application: " DB_PASSWORD
echo ""
read -p "Enter your email (for SSL certificate): " EMAIL

log_info "Configuration:"
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

read -p "Continue with deployment? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    log_warn "Deployment cancelled"
    exit 0
fi

log_info "Starting deployment..."

# Update system
log_info "Step 1/13: Updating system packages..."
apt update && apt upgrade -y

# Install essential tools
log_info "Step 2/13: Installing essential tools..."
apt install -y curl wget git build-essential

# Install Node.js 22.x
log_info "Step 3/13: Installing Node.js 22.x..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Install pnpm
log_info "Step 4/13: Installing pnpm..."
npm install -g pnpm

# Install MySQL
log_info "Step 5/13: Installing MySQL..."
export DEBIAN_FRONTEND=noninteractive
apt install -y mysql-server

# Secure MySQL and create database
log_info "Step 6/13: Configuring MySQL..."
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${MYSQL_ROOT_PASSWORD}';"
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS apex_meridian;"
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE USER IF NOT EXISTS 'apex_user'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';"
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "GRANT ALL PRIVILEGES ON apex_meridian.* TO 'apex_user'@'localhost';"
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "FLUSH PRIVILEGES;"

# Install Nginx
log_info "Step 7/13: Installing Nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx

# Install PM2
log_info "Step 8/13: Installing PM2..."
npm install -g pm2

# Clone repository
log_info "Step 9/13: Cloning application..."
mkdir -p /var/www
cd /var/www
if [ -d "apex-meridian" ]; then
    log_warn "Directory exists, pulling latest changes..."
    cd apex-meridian
    git pull origin main
else
    git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git apex-meridian
    cd apex-meridian
fi

# Install dependencies
log_info "Step 10/13: Installing application dependencies (this may take 5-10 minutes)..."
pnpm install

# Create .env file
log_info "Creating environment configuration..."
cat > .env << EOF
DATABASE_URL=mysql://apex_user:${DB_PASSWORD}@localhost:3306/apex_meridian
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
PORT=3000
OWNER_NAME=Apex Meridian Admin
VITE_APP_TITLE=Apex Meridian
VITE_APP_LOGO=/logo.png
EOF

# Run database migrations
log_info "Step 11/13: Running database migrations..."
pnpm db:push

# Build application
log_info "Building application..."
pnpm build

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
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
EOF

# Create logs directory
mkdir -p logs

# Start application with PM2
log_info "Starting application..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root

# Configure Nginx
log_info "Step 12/13: Configuring Nginx..."
cat > /etc/nginx/sites-available/apex-meridian << EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    client_max_body_size 50M;
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/apex-meridian /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx

# Install SSL certificate
log_info "Step 13/13: Installing SSL certificate..."
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos --email ${EMAIL} --redirect

# Configure firewall
log_info "Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# Create backup script
log_info "Setting up automatic backups..."
cat > /usr/local/bin/backup-apex.sh << 'BACKUP_EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/apex-meridian"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
mysqldump -u apex_user -p"${DB_PASSWORD}" apex_meridian | gzip > $BACKUP_DIR/db_$DATE.sql.gz
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/apex-meridian --exclude=node_modules
find $BACKUP_DIR -type f -mtime +7 -delete
BACKUP_EOF

chmod +x /usr/local/bin/backup-apex.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-apex.sh >> /var/log/apex-backup.log 2>&1") | crontab -

log_info "=== Deployment Complete! ==="
echo ""
log_info "Your Apex Meridian platform is now live at: https://${DOMAIN}"
echo ""
log_info "Useful commands:"
echo "  - View application status: pm2 status"
echo "  - View logs: pm2 logs apex-meridian"
echo "  - Restart application: pm2 restart apex-meridian"
echo "  - Check Nginx: sudo systemctl status nginx"
echo "  - Check MySQL: sudo systemctl status mysql"
echo ""
log_info "Database credentials:"
echo "  - Database: apex_meridian"
echo "  - User: apex_user"
echo "  - Password: [saved in /var/www/apex-meridian/.env]"
echo ""
log_info "Backups run daily at 2 AM and are stored in /var/backups/apex-meridian/"
echo ""
log_warn "IMPORTANT: Save your MySQL root password securely!"
echo ""
