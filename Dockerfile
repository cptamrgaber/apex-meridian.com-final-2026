# ============================================================
# Apex Meridian — Multi-Stage Dockerfile
# Author: Amro Gaber
# Build: docker build -t apex-meridian .
# Run:   docker-compose up
# ============================================================

# ── Stage 1: Install all dependencies ──────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ── Stage 2: Build (frontend + backend bundle) ─────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Vite frontend (→ client/dist) AND esbuild server bundle (→ dist/index.js)
RUN pnpm run build

# ── Stage 3: Production runtime ────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Install production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist

# Copy public assets (images, logos, favicons, news images)
COPY --from=builder /app/client/public ./client/public

# Copy drizzle migrations (needed at runtime for db:push)
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

# Set ownership
RUN chown -R appuser:nodejs /app

USER appuser

# Expose port
EXPOSE 3000

# Health check — hits the /api/health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Start production server
CMD ["node", "dist/index.js"]
