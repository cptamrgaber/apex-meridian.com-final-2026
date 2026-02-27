# Deployment Spec — Environment Variables

All environment variables must be set before running the application. Never commit `.env` files to version control.

---

## Required Variables

### Database

| Variable | Example Value | Description |
|---|---|---|
| `DATABASE_URL` | `mysql://user:pass@host:3306/apex_meridian` | MySQL/TiDB connection string |

### Authentication

| Variable | Example Value | Description |
|---|---|---|
| `JWT_SECRET` | `your-256-bit-secret-key` | Secret for signing JWT session cookies. Must be at least 32 characters. Generate with `openssl rand -hex 32`. |
| `OAUTH_SERVER_URL` | `https://api.manus.im` | Manus OAuth backend base URL |
| `VITE_OAUTH_PORTAL_URL` | `https://portal.manus.im` | Manus login portal URL (used by frontend) |
| `VITE_APP_ID` | `your-app-id` | Manus OAuth application ID |

### Application Identity

| Variable | Example Value | Description |
|---|---|---|
| `VITE_APP_TITLE` | `Apex Meridian` | Browser tab title and OG title |
| `VITE_APP_LOGO` | `/images/logo.png` | Path to logo image |
| `OWNER_OPEN_ID` | `owner-open-id-string` | Owner's Manus Open ID for notifications |
| `OWNER_NAME` | `Amro Gaber` | Owner's display name |

### Email (Resend API)

| Variable | Example Value | Description |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxx` | Resend API key for transactional emails. Get from resend.com. |

### File Storage (S3)

| Variable | Example Value | Description |
|---|---|---|
| `BUILT_IN_FORGE_API_KEY` | `forge-key-xxxx` | Manus built-in API key (server-side S3 access) |
| `BUILT_IN_FORGE_API_URL` | `https://forge.manus.im` | Manus built-in API base URL |
| `VITE_FRONTEND_FORGE_API_KEY` | `forge-frontend-key` | Frontend access key for Manus APIs |
| `VITE_FRONTEND_FORGE_API_URL` | `https://forge.manus.im` | Frontend API URL |

### Analytics

| Variable | Example Value | Description |
|---|---|---|
| `VITE_ANALYTICS_ENDPOINT` | `https://analytics.apex-meridian.com` | Analytics collection endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | `uuid-string` | Website ID for analytics tracking |

---

## Optional Variables

### External AI Services

| Variable | Description |
|---|---|
| `ELEVENLABS_API_KEY` | ElevenLabs API key for text-to-speech features in Media Production solution |
| `GEMINI_API_KEY` | Google Gemini API key for AI content analysis features |

### Self-Hosted S3 (if not using Manus built-in)

| Variable | Example Value | Description |
|---|---|---|
| `S3_ENDPOINT` | `https://s3.example.com` | S3-compatible endpoint |
| `S3_BUCKET` | `apex-meridian-uploads` | Bucket name |
| `S3_REGION` | `me-south-1` | AWS region or custom region |
| `S3_ACCESS_KEY_ID` | `AKIAIOSFODNN7EXAMPLE` | Access key ID |
| `S3_SECRET_ACCESS_KEY` | `wJalrXUtnFEMI/K7MDENG` | Secret access key |

---

## Environment Files

### Development (`.env.local`)
```bash
DATABASE_URL=mysql://root:password@localhost:3306/apex_meridian_dev
JWT_SECRET=dev-secret-key-change-in-production
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=dev-app-id
VITE_APP_TITLE=Apex Meridian (Dev)
OWNER_OPEN_ID=your-open-id
OWNER_NAME=Your Name
RESEND_API_KEY=re_test_key
BUILT_IN_FORGE_API_KEY=dev-forge-key
BUILT_IN_FORGE_API_URL=https://forge.manus.im
VITE_FRONTEND_FORGE_API_KEY=dev-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
```

### Production (set via server environment or secrets manager)
All variables above with production values. Never use dev values in production. The `JWT_SECRET` must be a cryptographically random 256-bit value.

---

## Variable Validation

The application validates required environment variables at startup in `server/_core/env.ts`. If any required variable is missing, the server throws an error and exits with a clear message indicating which variable is missing.

```typescript
// server/_core/env.ts pattern
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  OAUTH_SERVER_URL: z.string().url(),
  // ... all required vars
});

export const env = envSchema.parse(process.env);
```

---

*See `deployment/02_server_setup.md` for Nginx and PM2 configuration.*
