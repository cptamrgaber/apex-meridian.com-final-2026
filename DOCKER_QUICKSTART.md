# 🐳 Docker Quick Start — Apex Meridian
**Author:** Amro Gaber | **Version:** 2.0

---

## Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine + Docker Compose (Linux)
- Minimum 4GB RAM allocated to Docker
- Ports 3000, 80, 443, 3306 available

---

## Option A — Full Production Stack (App + MySQL + Nginx)

```bash
# 1. Clone the repository
git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git
cd apex-meridian.com-final-2026

# 2. Create your environment file
cp docker/ENV_TEMPLATE.txt .env
# Edit .env and fill in your values (JWT_SECRET, DB passwords, etc.)
nano .env

# 3. Build and start all containers
docker-compose up --build -d

# 4. Run database migrations (first time only)
docker-compose exec app pnpm db:push

# 5. Open the app
open http://localhost:3000
```

---

## Option B — App + MySQL Only (No Nginx)

```bash
# Same steps as above but without the nginx profile
docker-compose up --build -d db app

# Run migrations
docker-compose exec app pnpm db:push
```

---

## Option C — Local Development (MySQL in Docker, App on Host)

```bash
# Start only the database container
docker-compose -f docker-compose.dev.yml up -d

# Install dependencies on your host machine
pnpm install

# Create .env for local dev
cp docker/ENV_TEMPLATE.txt .env
# Set DATABASE_URL=mysql://apexuser:apexpassword@localhost:3306/apex_meridian_dev

# Run migrations
pnpm db:push

# Start the dev server with hot reload
pnpm dev

# Access phpMyAdmin at http://localhost:8080
```

---

## Container Management

```bash
# View running containers
docker-compose ps

# View application logs
docker-compose logs -f app

# View database logs
docker-compose logs -f db

# Stop all containers
docker-compose down

# Stop and remove all data (⚠️ destructive)
docker-compose down -v

# Rebuild after code changes
docker-compose up --build -d app

# Access a shell inside the app container
docker-compose exec app sh

# Access MySQL CLI
docker-compose exec db mysql -u apexuser -papexpassword apex_meridian
```

---

## Database Migrations

```bash
# Push schema changes to the database
docker-compose exec app pnpm db:push

# Generate migration files (without applying)
docker-compose exec app pnpm drizzle-kit generate
```

---

## Production with SSL (Nginx + Let's Encrypt)

```bash
# 1. Point your domain DNS to your server IP
# 2. Install certbot on the host
sudo apt install certbot

# 3. Get SSL certificate
sudo certbot certonly --standalone -d apex-meridian.com -d www.apex-meridian.com

# 4. Copy certs to docker/nginx/ssl/
sudo cp /etc/letsencrypt/live/apex-meridian.com/fullchain.pem docker/nginx/ssl/
sudo cp /etc/letsencrypt/live/apex-meridian.com/privkey.pem docker/nginx/ssl/

# 5. Start with nginx profile
docker-compose --profile production up -d

# 6. Auto-renew SSL (add to crontab)
0 12 * * * certbot renew --quiet && docker-compose restart nginx
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MySQL connection string |
| `JWT_SECRET` | ✅ | Session signing secret (min 32 chars) |
| `VITE_APP_ID` | ✅ | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | ✅ | Manus OAuth server URL |
| `VITE_OAUTH_PORTAL_URL` | ✅ | Manus login portal URL |
| `OWNER_OPEN_ID` | ✅ | Admin user's Manus Open ID |
| `RESEND_API_KEY` | ✅ | Resend email API key |
| `DB_ROOT_PASSWORD` | ✅ | MySQL root password |
| `DB_PASSWORD` | ✅ | MySQL app user password |
| `BUILT_IN_FORGE_API_KEY` | Optional | Manus AI/LLM API key |
| `VITE_ANALYTICS_WEBSITE_ID` | Optional | Analytics website ID |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Docker Network                    │
│                                                      │
│  ┌──────────┐    ┌──────────────┐    ┌───────────┐  │
│  │  Nginx   │───▶│  Node.js App │───▶│   MySQL   │  │
│  │ :80/:443 │    │    :3000     │    │   :3306   │  │
│  └──────────┘    └──────────────┘    └───────────┘  │
│                        │                             │
│                   Socket.IO                          │
│                   WebRTC Signalling                  │
│                   tRPC API                           │
│                   Static Files                       │
└─────────────────────────────────────────────────────┘
```

---

## Troubleshooting

**App won't start — "Cannot connect to database"**
```bash
# Wait for MySQL to be fully ready, then restart the app
docker-compose restart app
```

**Port 3306 already in use**
```bash
# Stop local MySQL service
sudo systemctl stop mysql
# Or change the port in docker-compose.yml: "3307:3306"
```

**Out of disk space**
```bash
# Remove unused Docker resources
docker system prune -af
docker volume prune -f
```

**Permission denied errors**
```bash
# Fix file ownership
docker-compose exec app chown -R appuser:nodejs /app
```

---

*Apex Meridian — AI Technology Solutions | Cairo, Egypt*
