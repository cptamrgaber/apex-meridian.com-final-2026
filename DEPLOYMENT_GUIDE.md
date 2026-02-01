# Apex Meridian - Complete Deployment Guide

**Version:** 1.0  
**Last Updated:** January 30, 2026  
**Prepared By:** Amro Gaber

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Local Development](#local-development)
5. [Docker Deployment](#docker-deployment)
6. [VPS Deployment](#vps-deployment)
7. [Manus Platform Deployment](#manus-platform-deployment)
8. [Post-Deployment Checklist](#post-deployment-checklist)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js:** v22.13.0 or higher
- **pnpm:** v9.x or higher
- **MySQL/TiDB:** v8.0 or higher
- **Docker:** v24.x or higher (for containerized deployment)
- **Git:** Latest version

### Required Accounts & API Keys
- **Stripe Account** (for payments)
- **Resend API Key** (for emails)
- **Manus OAuth** (pre-configured in Manus platform)
- **Database** (MySQL or TiDB instance)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git
cd apex-meridian.com-final-2026
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="mysql://user:password@host:port/database"

# Authentication (Pre-configured in Manus)
JWT_SECRET="your-jwt-secret-here"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://portal.manus.im"
VITE_APP_ID="your-app-id"
OWNER_OPEN_ID="owner-open-id"
OWNER_NAME="Amro Gaber"

# Manus Built-in Services (Pre-configured)
BUILT_IN_FORGE_API_URL="https://forge.manus.im"
BUILT_IN_FORGE_API_KEY="your-forge-api-key"
VITE_FRONTEND_FORGE_API_KEY="your-frontend-forge-key"
VITE_FRONTEND_FORGE_API_URL="https://forge.manus.im"

# Email Service
RESEND_API_KEY="re_your_resend_api_key_here"

# Payment Processing
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Analytics
VITE_ANALYTICS_ENDPOINT="https://analytics.manus.im"
VITE_ANALYTICS_WEBSITE_ID="your-website-id"

# Application
VITE_APP_TITLE="Apex Meridian"
VITE_APP_LOGO="/apex-logo.png"
NODE_ENV="production"
```

---

## Database Setup

### 1. Create Database

```sql
CREATE DATABASE apex_meridian CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Push Schema

```bash
pnpm db:push
```

This command will:
- Create all 51 database tables
- Set up relationships and indexes
- Initialize schema

### 3. Seed Initial Data

```bash
# Seed badges
node server/seed-badges.mjs

# Optional: Seed test data
# node server/seed-test-data.mjs
```

---

## Local Development

### 1. Start Development Server

```bash
pnpm dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3000/api

### 2. Build for Production

```bash
pnpm build
```

### 3. Preview Production Build

```bash
pnpm preview
```

---

## Docker Deployment

### Option 1: Using Docker Compose (Recommended)

#### 1. Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  # MySQL Database
  database:
    image: mysql:8.0
    container_name: apex-meridian-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: apex_meridian
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - apex-network

  # Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: apex-meridian-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: mysql://${DB_USER}:${DB_PASSWORD}@database:3306/apex_meridian
      NODE_ENV: production
      # Add all other environment variables from .env
    depends_on:
      - database
    networks:
      - apex-network
    volumes:
      - ./uploads:/app/uploads

volumes:
  db_data:

networks:
  apex-network:
    driver: bridge
```

#### 2. Create `Dockerfile`

```dockerfile
# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/server ./server

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/index.js"]
```

#### 3. Create `.dockerignore`

```
node_modules
.env
.git
.gitignore
*.md
dist
client/dist
.vscode
.idea
*.log
```

#### 4. Deploy with Docker Compose

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Option 2: Using Docker Only

```bash
# Build image
docker build -t apex-meridian:latest .

# Run container
docker run -d \
  --name apex-meridian \
  -p 3000:3000 \
  --env-file .env \
  apex-meridian:latest

# View logs
docker logs -f apex-meridian

# Stop container
docker stop apex-meridian

# Remove container
docker rm apex-meridian
```

---

## VPS Deployment

### Prerequisites
- Ubuntu 22.04 LTS or higher
- Root or sudo access
- Domain name pointed to VPS IP

### 1. Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install MySQL
sudo apt install -y mysql-server

# Secure MySQL
sudo mysql_secure_installation

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install PM2 for process management
npm install -g pm2
```

### 2. Setup Application

```bash
# Create app directory
sudo mkdir -p /var/www/apex-meridian
sudo chown $USER:$USER /var/www/apex-meridian

# Clone repository
cd /var/www/apex-meridian
git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git .

# Install dependencies
pnpm install

# Create .env file
nano .env
# (Paste environment variables)

# Build application
pnpm build

# Push database schema
pnpm db:push

# Seed initial data
node server/seed-badges.mjs
```

### 3. Configure PM2

```bash
# Start application with PM2
pm2 start dist/index.js --name apex-meridian

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# (Follow the command output instructions)

# View logs
pm2 logs apex-meridian

# Monitor
pm2 monit
```

### 4. Configure Nginx

Create `/etc/nginx/sites-available/apex-meridian`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (Certbot will add these)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support for Socket.IO
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site and restart Nginx:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/apex-meridian /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. Setup SSL with Let's Encrypt

```bash
# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 6. Setup Firewall

```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Manus Platform Deployment

The application is already configured for Manus platform deployment.

### 1. Using Manus UI

1. Open the Manus Management UI
2. Click the **Publish** button in the header
3. Configure your domain (if using custom domain)
4. Click **Deploy**

### 2. Automatic Features

When deployed on Manus, you get:
- ✅ Automatic SSL certificates
- ✅ CDN distribution
- ✅ Database hosting
- ✅ Environment variable management
- ✅ Automatic scaling
- ✅ Built-in analytics
- ✅ OAuth authentication
- ✅ S3 storage integration

### 3. Custom Domain Setup

1. Go to Settings → Domains in Manus UI
2. Add your custom domain
3. Update DNS records as instructed:
   ```
   Type: CNAME
   Name: @  (or www)
   Value: [provided by Manus]
   ```
4. Wait for DNS propagation (up to 48 hours)

---

## Post-Deployment Checklist

### Essential Checks

- [ ] **Database Connection:** Verify database is accessible
- [ ] **Environment Variables:** All required env vars are set
- [ ] **SSL Certificate:** HTTPS is working
- [ ] **Authentication:** Login/logout flow works
- [ ] **Payment Processing:** Stripe integration functional
- [ ] **Email Delivery:** Test email sending with Resend
- [ ] **File Uploads:** S3 storage working
- [ ] **WebSocket:** Real-time features (calls, messages) working
- [ ] **Admin Access:** Admin dashboards accessible
- [ ] **Social Platform:** All social features functional
- [ ] **Mobile Responsive:** Test on mobile devices
- [ ] **Performance:** Page load times acceptable
- [ ] **Error Logging:** Monitoring and logging configured

### Security Checks

- [ ] **HTTPS Enforced:** All traffic redirected to HTTPS
- [ ] **CORS Configured:** Proper CORS headers set
- [ ] **Rate Limiting:** API rate limiting enabled
- [ ] **Input Validation:** All forms validated
- [ ] **SQL Injection Protection:** Parameterized queries used
- [ ] **XSS Protection:** Content sanitized
- [ ] **CSRF Protection:** CSRF tokens implemented
- [ ] **Secrets Secured:** No secrets in code or logs

### Performance Optimization

- [ ] **CDN Configured:** Static assets served via CDN
- [ ] **Caching Enabled:** Browser and server caching configured
- [ ] **Image Optimization:** Images compressed and optimized
- [ ] **Code Minification:** JavaScript and CSS minified
- [ ] **Gzip Compression:** Server compression enabled
- [ ] **Database Indexes:** Proper indexes on frequently queried fields

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors

**Problem:** `Error: connect ECONNREFUSED`

**Solution:**
```bash
# Check database is running
sudo systemctl status mysql

# Check connection string in .env
# Verify host, port, username, password

# Test connection
mysql -h hostname -u username -p database_name
```

#### 2. Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 pnpm dev
```

#### 3. Build Failures

**Problem:** `Error: Build failed`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear build cache
rm -rf dist client/dist

# Rebuild
pnpm build
```

#### 4. SSL Certificate Issues

**Problem:** SSL certificate not working

**Solution:**
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal
```

#### 5. PM2 Process Crashes

**Problem:** Application keeps crashing

**Solution:**
```bash
# View error logs
pm2 logs apex-meridian --err

# Restart with increased memory
pm2 delete apex-meridian
pm2 start dist/index.js --name apex-meridian --max-memory-restart 1G

# Monitor
pm2 monit
```

### Getting Help

- **Documentation:** Check README.md and inline code comments
- **Logs:** Always check application and server logs first
- **GitHub Issues:** Open an issue at the repository
- **Support:** Contact support@apex-meridian.com

---

## Maintenance

### Regular Tasks

#### Daily
- Monitor application logs
- Check error rates
- Verify backup completion

#### Weekly
- Review security logs
- Check disk space
- Update dependencies (if needed)

#### Monthly
- Review performance metrics
- Update SSL certificates (auto-renewed)
- Database optimization
- Security audit

### Backup Strategy

```bash
# Database backup
mysqldump -u username -p apex_meridian > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf apex-meridian-backup-$(date +%Y%m%d).tar.gz /var/www/apex-meridian

# Automated daily backups
# Add to crontab: crontab -e
0 2 * * * /path/to/backup-script.sh
```

### Updating the Application

```bash
# Pull latest code
cd /var/www/apex-meridian
git pull origin main

# Install new dependencies
pnpm install

# Run database migrations
pnpm db:push

# Rebuild application
pnpm build

# Restart with PM2
pm2 restart apex-meridian

# Or with Docker
docker-compose down
docker-compose up -d --build
```

---

## Performance Benchmarks

### Expected Performance
- **Page Load Time:** < 2 seconds
- **API Response Time:** < 200ms
- **Database Query Time:** < 50ms
- **WebSocket Latency:** < 100ms

### Monitoring Tools
- **Application:** PM2 monitoring
- **Server:** htop, netdata
- **Database:** MySQL slow query log
- **Uptime:** UptimeRobot or similar

---

## Security Best Practices

1. **Keep Software Updated:** Regularly update Node.js, dependencies, and system packages
2. **Use Strong Passwords:** For database and admin accounts
3. **Enable Firewall:** Only allow necessary ports
4. **Regular Backups:** Automated daily backups
5. **Monitor Logs:** Set up log monitoring and alerts
6. **Use HTTPS:** Always enforce HTTPS
7. **Limit Access:** Use SSH keys, disable root login
8. **Environment Variables:** Never commit secrets to Git

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple application instances
- Use Redis for session storage
- Implement database replication

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database queries
- Implement caching (Redis, Memcached)
- Use CDN for static assets

---

## Support & Contact

**Project Repository:** https://github.com/cptamrgaber/apex-meridian.com-final-2026  
**Documentation:** See README.md  
**Issues:** Open a GitHub issue  
**Email:** support@apex-meridian.com

---

**Deployment Guide Version:** 1.0  
**Last Updated:** January 30, 2026  
**Prepared By:** Amro Gaber
