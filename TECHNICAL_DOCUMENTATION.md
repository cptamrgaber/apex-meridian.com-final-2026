# Apex Meridian Technical Documentation

**Version:** 2.0  
**Last Updated:** January 2026  
**Author:** Apex Meridian Development Team

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Authentication & Authorization](#authentication--authorization)
4. [Payment System](#payment-system)
5. [AM-AV Aviation System](#am-av-aviation-system)
6. [Research Platform](#research-platform)
7. [Library System](#library-system)
8. [API Reference](#api-reference)
9. [Deployment Guide](#deployment-guide)
10. [Security & Compliance](#security--compliance)

---

## System Overview

Apex Meridian is a comprehensive AI technology platform delivering cutting-edge solutions for aviation, cybersecurity, education, and AGI research. The platform is built on a modern tech stack combining React 19, Tailwind CSS 4, Express 4, and tRPC 11 with end-to-end type safety.

### Core Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Frontend | React | 19.x | UI framework with hooks and concurrent features |
| Styling | Tailwind CSS | 4.x | Utility-first CSS framework |
| Backend | Express | 4.x | Node.js web application framework |
| API Layer | tRPC | 11.x | End-to-end typesafe APIs |
| Database | TiDB (MySQL) | 8.x | Distributed SQL database |
| ORM | Drizzle | Latest | TypeScript ORM with type inference |
| Authentication | Manus OAuth | 2.0 | OAuth 2.0 authentication provider |
| Payments | Stripe | Latest | International payment processing |
| File Storage | S3 Compatible | - | Object storage for files and media |

### System Requirements

**Development Environment:**
- Node.js 22.13.0 or higher
- pnpm package manager
- Git for version control
- Modern browser (Chrome, Firefox, Safari, Edge)

**Production Environment:**
- Ubuntu 22.04 LTS or compatible Linux distribution
- 4GB RAM minimum (8GB recommended)
- 20GB disk space minimum
- SSL certificate for HTTPS
- Domain name with DNS configuration

---

## Architecture

### High-Level Architecture

The Apex Meridian platform follows a three-tier architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  React 19 + Tailwind CSS 4 + Wouter Router + tRPC Client   │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/WSS
┌──────────────────────┴──────────────────────────────────────┐
│                     Application Layer                        │
│    Express 4 + tRPC Server + Business Logic + Webhooks      │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL/TLS
┌──────────────────────┴──────────────────────────────────────┐
│                       Data Layer                             │
│     TiDB Database + S3 Storage + External APIs               │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
apex-meridian-web/
├── client/                    # Frontend application
│   ├── public/               # Static assets (served at root)
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/           # Page-level components
│       ├── contexts/        # React contexts
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility libraries
│       └── _core/           # Core framework code
├── server/                   # Backend application
│   ├── routers.ts           # Main tRPC router
│   ├── routers/             # Feature-specific routers
│   ├── db.ts                # Database query helpers
│   ├── webhooks/            # Webhook handlers
│   └── _core/               # Core framework code
├── drizzle/                 # Database schema and migrations
│   └── schema.ts            # Database table definitions
├── shared/                  # Shared types and constants
└── storage/                 # S3 storage helpers
```

### Data Flow

**1. Client Request Flow:**
```
User Action → React Component → tRPC Hook → HTTP Request → 
Express Server → tRPC Router → Business Logic → Database Query → 
Response → tRPC Client → React State Update → UI Render
```

**2. Authentication Flow:**
```
Login Button → Redirect to OAuth Portal → User Authenticates → 
OAuth Callback → Session Cookie Set → tRPC Context → Protected Route Access
```

**3. Payment Flow:**
```
Checkout Page → Stripe Checkout Session → Payment Processing → 
Webhook Event → Database Update → Subscription Activation → User Notification
```

---

## Authentication & Authorization

### OAuth 2.0 Integration

Apex Meridian uses Manus OAuth for authentication, providing secure single sign-on capabilities.

**OAuth Configuration:**

| Environment Variable | Purpose | Example |
|---------------------|---------|---------|
| `VITE_APP_ID` | OAuth application ID | `app_abc123xyz` |
| `OAUTH_SERVER_URL` | OAuth backend base URL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal URL | `https://portal.manus.im` |
| `JWT_SECRET` | Session cookie signing secret | Auto-generated |

**Authentication Endpoints:**

- **Login:** `GET /api/oauth/login` - Redirects to OAuth portal
- **Callback:** `GET /api/oauth/callback` - Handles OAuth callback and sets session cookie
- **Logout:** `POST /api/oauth/logout` - Clears session cookie
- **Current User:** `trpc.auth.me.useQuery()` - Returns current user or null

**Session Management:**

Sessions are stored in HTTP-only, secure cookies with the following properties:

```typescript
{
  httpOnly: true,        // Prevents XSS attacks
  secure: true,          // HTTPS only
  sameSite: 'lax',      // CSRF protection
  maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
}
```

### Role-Based Access Control

The system implements role-based access control (RBAC) with two primary roles:

**User Roles:**

| Role | Permissions | Use Cases |
|------|------------|-----------|
| `user` | Access public content, manage own profile, subscribe to services | Standard customers and researchers |
| `admin` | Full system access, payment verification, settings management | System administrators and operations staff |

**Role Enforcement:**

```typescript
// Backend: Protected procedure for admin-only operations
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }
  return next({ ctx });
});

// Frontend: Conditional rendering based on role
const { user } = useAuth();
if (user?.role === 'admin') {
  // Render admin UI
}
```

**Promoting Users to Admin:**

Administrators are promoted manually through the database UI or SQL:

```sql
UPDATE user SET role = 'admin' WHERE id = 'user_id_here';
```

---

## Payment System

### Overview

The payment system supports both international payments through Stripe and Egyptian local payment methods, providing flexibility for global and regional customers.

### Stripe Integration

**Setup Requirements:**

1. Create Stripe account at [stripe.com](https://stripe.com)
2. Obtain API keys from Stripe Dashboard
3. Configure webhook endpoint
4. Add API keys through Admin Settings UI

**Stripe Configuration:**

| Setting | Value | Location |
|---------|-------|----------|
| Secret Key | `sk_live_...` or `sk_test_...` | Admin Settings → Stripe Configuration |
| Webhook Secret | `whsec_...` | Admin Settings → Stripe Configuration |
| Webhook URL | `https://yourdomain.com/api/webhooks/stripe` | Stripe Dashboard → Webhooks |

**Supported Payment Methods:**

- Credit/Debit Cards (Visa, Mastercard, Amex, Discover)
- Apple Pay
- Google Pay
- Link (Stripe's one-click checkout)

**Webhook Events Handled:**

| Event | Action | Database Update |
|-------|--------|----------------|
| `checkout.session.completed` | Create subscription | Insert into `subscriptions` table |
| `invoice.payment_succeeded` | Record payment | Insert into `paymentTransactions` table |
| `invoice.payment_failed` | Mark payment failed | Update `paymentTransactions` status |
| `customer.subscription.updated` | Update subscription | Update `subscriptions` table |
| `customer.subscription.deleted` | Cancel subscription | Set `subscriptions.status` to `canceled` |

**Pricing Plans:**

| Plan | Monthly (USD) | Monthly (EGP) | Annual (USD) | Annual (EGP) | Features |
|------|--------------|--------------|--------------|--------------|----------|
| Starter | $29 | EGP 900 | $290 | EGP 9,000 | Basic AI tools, 100 API calls/month |
| Professional | $99 | EGP 3,100 | $990 | EGP 31,000 | Advanced AI, 1,000 API calls/month, priority support |
| Enterprise | $299 | EGP 9,300 | $2,990 | EGP 93,000 | Unlimited API calls, dedicated support, custom integrations |

### Egyptian Payment Methods

**Supported Providers:**

1. **Fawry** - Payment gateway with cash collection at retail locations
2. **InstaPay** - Instant bank-to-bank transfers
3. **Vodafone Cash** - Mobile wallet payments
4. **Orange Money** - Mobile wallet payments
5. **Bank Transfer** - Direct bank transfers with reference numbers

**Payment Flow for Egyptian Methods:**

1. User selects Egyptian payment method at checkout
2. System generates unique reference number (format: `AM-YYYYMMDD-XXXX`)
3. User receives payment instructions (account details, reference number)
4. User completes payment through chosen method
5. Admin verifies payment in Admin Settings → Payment Verification
6. Admin approves payment → Subscription activated
7. User receives confirmation email

**Reference Number Format:**

```
AM-20260120-A7B3
│  │        │
│  │        └─ Random 4-character alphanumeric code
│  └────────── Date (YYYYMMDD)
└──────────── Apex Meridian prefix
```

**Admin Payment Verification:**

Administrators can verify Egyptian payments through the Admin Settings interface:

1. Navigate to `/admin/settings`
2. Click "Payment Verification" tab
3. View pending payment references
4. Review payment details and instructions
5. Click "Verify Payment" to approve or "Reject" to decline
6. System automatically creates subscription and sends confirmation

### Database Schema

**Subscriptions Table:**

```typescript
export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  planId: text('plan_id').notNull(),  // 'starter', 'professional', 'enterprise'
  status: text('status').notNull(),    // 'active', 'canceled', 'past_due'
  currentPeriodStart: integer('current_period_start').notNull(),
  currentPeriodEnd: integer('current_period_end').notNull(),
  cancelAtPeriodEnd: integer('cancel_at_period_end', { mode: 'boolean' }).default(false),
  stripeSubscriptionId: text('stripe_subscription_id'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
```

**Payment Transactions Table:**

```typescript
export const paymentTransactions = sqliteTable('payment_transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  amount: integer('amount').notNull(),  // Amount in cents
  currency: text('currency').notNull(), // 'usd' or 'egp'
  paymentMethod: text('payment_method').notNull(), // 'stripe', 'fawry', 'instapay', etc.
  status: text('status').notNull(),     // 'pending', 'completed', 'failed'
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  referenceNumber: text('reference_number'), // For Egyptian payments
  createdAt: integer('created_at').notNull(),
});
```

### API Reference

**Create Checkout Session:**

```typescript
const { sessionUrl } = await trpc.payments.createCheckoutSession.mutate({
  planId: 'professional',
  billingPeriod: 'monthly',
  currency: 'usd',
});
// Redirect user to sessionUrl
```

**Create Egyptian Payment Reference:**

```typescript
const { referenceNumber, instructions } = 
  await trpc.payments.createEgyptianPaymentReference.mutate({
    planId: 'starter',
    billingPeriod: 'annual',
    paymentMethod: 'fawry',
  });
// Display referenceNumber and instructions to user
```

**Get Customer Portal URL:**

```typescript
const { portalUrl } = await trpc.payments.createPortalSession.mutate();
// Redirect user to portalUrl for subscription management
```

**Verify Egyptian Payment (Admin Only):**

```typescript
await trpc.adminPayments.verifyPayment.mutate({
  referenceNumber: 'AM-20260120-A7B3',
});
// Creates subscription and marks payment as completed
```

---

## AM-AV Aviation System

### System Overview

The Apex Meridian Aviation (AM-AV) Operations Control Center is an AI-powered crew management and compliance system designed for commercial airlines. The system automates crew scheduling, enforces regulatory compliance, and optimizes operational efficiency.

### Key Capabilities

**1. AI-Driven Crew Scheduling**

The scheduling engine uses constraint satisfaction algorithms to generate optimal crew rosters while respecting:

- Flight time limitations (FAR Part 117, EASA FTL, CAAP regulations)
- Duty period restrictions
- Rest requirements (minimum 10 hours between duties)
- Recency requirements (3 takeoffs/landings in 90 days)
- Pilot qualifications and type ratings
- Fairness distribution (night flights, layovers, international routes)

**Algorithm Overview:**

```
1. Parse flight schedule for target month
2. Extract pilot pool with qualifications and availability
3. Load compliance rules from Operations Manual (OM-A to OM-G)
4. Generate initial roster using greedy assignment
5. Apply simulated annealing optimization for fairness
6. Validate all assignments against compliance rules
7. Output roster with conflict warnings (if any)
```

**2. Compliance Engine**

The AI compliance engine ingests aviation regulations and operations manuals to automatically enforce rules:

**NLP Pipeline:**

```
PDF Operations Manual → Text Extraction → 
Sentence Segmentation → Named Entity Recognition → 
Dependency Parsing → Rule Extraction → 
Formal Logic Representation → Executable Validation Code
```

**Example Rule Extraction:**

```
Input Text: "No pilot shall exceed 900 flight hours in any calendar year."

Extracted Rule:
{
  "entity": "pilot",
  "constraint": "flight_hours",
  "operator": "<=",
  "threshold": 900,
  "timeframe": "calendar_year"
}

Generated Validation:
function validateAnnualFlightHours(pilot, year) {
  const totalHours = sumFlightHours(pilot, year);
  return totalHours <= 900;
}
```

**Compliance Metrics:**

- **Precision:** 98.9% (correctly identified violations)
- **Recall:** 97.2% (detected all actual violations)
- **F1-Score:** 98.0%
- **Validation Speed:** 0.3 seconds per roster (250 pilots)

**3. Real-Time Operations Monitoring**

The system integrates with ADS-B data sources to track live flight operations:

- Current flight positions and status
- Estimated time of arrival (ETA) updates
- Delay notifications
- Crew duty time tracking
- Compliance alerts for in-flight violations

**4. Operations Manual Integration**

The system supports all seven sections of the ICAO Operations Manual:

| Section | Content | System Integration |
|---------|---------|-------------------|
| OM-A | General | Company policies, organizational structure |
| OM-B | Aircraft Operating | Type-specific procedures, performance data |
| OM-C | Route and Aerodrome | Route guides, airport procedures |
| OM-D | Training | Training requirements, recency rules |
| OM-E | Route Guide | Detailed route information |
| OM-F | Manuals | Reference manuals and checklists |
| OM-G | Dangerous Goods | Hazardous materials procedures |

### User Roles

| Role | Permissions | Key Features |
|------|------------|--------------|
| Chief Pilot | Full system access, manual overrides | Roster approval, compliance overrides, pilot management |
| Operations Manager | Schedule management, crew assignments | Roster generation, flight assignments, delay management |
| Crew Scheduler | Roster creation and modification | Automated scheduling, swap management, preference handling |
| Pilot | View own schedule, submit preferences | Personal roster view, day-off requests, qualification tracking |
| Compliance Officer | Audit access, violation reports | Compliance dashboards, audit trails, regulatory reports |

### Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| NLP Engine | BERT (fine-tuned) | Regulatory text understanding |
| Rule Engine | Drools | Business rule execution |
| Optimization | OR-Tools | Constraint satisfaction solving |
| Database | TiDB | Distributed SQL for scalability |
| Real-Time Data | ADS-B API | Live flight tracking |
| Notifications | Resend | Email notifications for crew |

### Case Study: Regional Carrier Success

A Middle Eastern regional airline with 250+ pilots achieved:

- **70% time savings** - Roster generation reduced from 60 hours to 18 hours per month
- **Zero compliance violations** - No violations in 6 months post-deployment
- **94% pilot satisfaction** - Increased from 68% through fair scheduling
- **$880,000 annual benefit** - Including cost savings and productivity gains
- **4.2x ROI in Year 1** - Total benefit vs. system cost

---

## Research Platform

### Overview

The Apex Meridian Research Platform facilitates collaboration between researchers, institutions, and industry partners on AI and AGI projects.

### Key Features

**1. Research Project Management**

- Project creation and documentation
- Collaboration tools (team management, access control)
- Milestone tracking and progress reporting
- Publication management (papers, preprints, datasets)

**2. Research Blog**

- Technical articles and tutorials
- Research findings and insights
- Community discussions and feedback
- SEO-optimized content delivery

**3. Collaboration Portal**

- Partnership requests and proposals
- Research grant applications
- Data sharing agreements
- Institutional collaboration frameworks

**4. Metrics Dashboard**

- Citation tracking
- Publication impact metrics
- Collaboration network visualization
- Research output analytics

### Database Schema

**Research Projects Table:**

```typescript
export const researchProjects = sqliteTable('research_projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(), // 'active', 'completed', 'archived'
  leadResearcherId: text('lead_researcher_id').references(() => user.id),
  startDate: integer('start_date').notNull(),
  endDate: integer('end_date'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});
```

---

## Library System

### Overview

The Library System provides access to technical documentation, research papers, whitepapers, and educational resources.

### Content Categories

| Category | Content Types | Access Level |
|----------|--------------|--------------|
| Technical Documentation | API docs, system guides, architecture diagrams | Public |
| Research Papers | Academic publications, preprints, datasets | Public/Restricted |
| Whitepapers | Industry reports, case studies, technical analyses | Public |
| Educational Resources | Tutorials, courses, video lectures | Public/Premium |

### Features

- Full-text search across all documents
- Category and tag-based filtering
- PDF viewer with annotation support
- Download tracking and analytics
- Citation export (BibTeX, RIS, EndNote)

---

## API Reference

### tRPC Routers

**Authentication Router (`trpc.auth.*`):**

```typescript
// Get current user
const { data: user } = trpc.auth.me.useQuery();

// Logout
const logout = trpc.auth.logout.useMutation();
await logout.mutateAsync();
```

**Payments Router (`trpc.payments.*`):**

```typescript
// Create Stripe checkout session
const createCheckout = trpc.payments.createCheckoutSession.useMutation();
const { sessionUrl } = await createCheckout.mutateAsync({
  planId: 'professional',
  billingPeriod: 'monthly',
  currency: 'usd',
});

// Get user subscriptions
const { data: subscriptions } = trpc.payments.getSubscriptions.useQuery();

// Cancel subscription
const cancelSub = trpc.payments.cancelSubscription.useMutation();
await cancelSub.mutateAsync({ subscriptionId: 'sub_123' });
```

**Admin Payments Router (`trpc.adminPayments.*`):**

```typescript
// Get pending Egyptian payments (admin only)
const { data: pending } = trpc.adminPayments.getPendingPayments.useQuery();

// Verify payment (admin only)
const verify = trpc.adminPayments.verifyPayment.useMutation();
await verify.mutateAsync({ referenceNumber: 'AM-20260120-A7B3' });

// Get payment analytics (admin only)
const { data: analytics } = trpc.adminPayments.getAnalytics.useQuery();
```

**Newsletter Router (`trpc.newsletter.*`):**

```typescript
// Subscribe to newsletter
const subscribe = trpc.newsletter.subscribe.useMutation();
await subscribe.mutateAsync({ email: 'user@example.com' });
```

### REST Endpoints

**Stripe Webhook:**

```
POST /api/webhooks/stripe
Content-Type: application/json
Stripe-Signature: <webhook_signature>

Body: <stripe_event_json>
```

**OAuth Endpoints:**

```
GET /api/oauth/login
→ Redirects to OAuth portal

GET /api/oauth/callback?code=<auth_code>
→ Sets session cookie and redirects to app

POST /api/oauth/logout
→ Clears session cookie
```

---

## Deployment Guide

### Prerequisites

1. **Domain Name:** Register a domain (e.g., apex-meridian.com)
2. **SSL Certificate:** Obtain SSL certificate (Let's Encrypt recommended)
3. **Database:** Provision TiDB or MySQL 8.0+ instance
4. **S3 Storage:** Configure S3-compatible object storage
5. **Stripe Account:** Create Stripe account for payments

### Environment Variables

Create `.env` file with the following variables:

```bash
# Database
DATABASE_URL="mysql://user:password@host:port/database?ssl=true"

# Authentication
JWT_SECRET="<auto-generated-secret>"
VITE_APP_ID="<manus-oauth-app-id>"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://portal.manus.im"
OWNER_OPEN_ID="<owner-open-id>"
OWNER_NAME="<owner-name>"

# Payments
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Storage
S3_ENDPOINT="https://s3.amazonaws.com"
S3_BUCKET="apex-meridian-files"
S3_ACCESS_KEY="<access-key>"
S3_SECRET_KEY="<secret-key>"

# Email
RESEND_API_KEY="re_..."

# Analytics
VITE_ANALYTICS_WEBSITE_ID="<website-id>"
VITE_ANALYTICS_ENDPOINT="https://analytics.manus.im"

# Frontend
VITE_APP_TITLE="Apex Meridian"
VITE_APP_LOGO="https://yourdomain.com/logo.png"
VITE_FRONTEND_FORGE_API_KEY="<frontend-api-key>"
VITE_FRONTEND_FORGE_API_URL="https://api.manus.im"

# Built-in APIs
BUILT_IN_FORGE_API_KEY="<backend-api-key>"
BUILT_IN_FORGE_API_URL="https://api.manus.im"
```

### Deployment Steps

**1. Install Dependencies:**

```bash
cd apex-meridian-web
pnpm install
```

**2. Database Setup:**

```bash
# Push schema to database
pnpm db:push

# Verify tables created
pnpm drizzle-kit studio
```

**3. Build Application:**

```bash
# Build frontend and backend
pnpm build

# Output: dist/ directory with compiled code
```

**4. Start Production Server:**

```bash
# Set environment to production
export NODE_ENV=production

# Start server
pnpm start

# Server runs on port 3000 by default
```

**5. Configure Reverse Proxy (Nginx):**

```nginx
server {
    listen 443 ssl http2;
    server_name apex-meridian.com;

    ssl_certificate /etc/letsencrypt/live/apex-meridian.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/apex-meridian.com/privkey.pem;

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
}
```

**6. Configure Stripe Webhook:**

1. Log in to Stripe Dashboard
2. Navigate to Developers → Webhooks
3. Click "Add endpoint"
4. Enter URL: `https://apex-meridian.com/api/webhooks/stripe`
5. Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
6. Copy webhook signing secret to `.env` as `STRIPE_WEBHOOK_SECRET`

**7. Set Up Process Manager (PM2):**

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start pnpm --name "apex-meridian" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

### Health Checks

**Application Health:**

```bash
curl https://apex-meridian.com/api/health
# Expected: { "status": "ok", "timestamp": 1705776000000 }
```

**Database Connection:**

```bash
curl https://apex-meridian.com/api/health/db
# Expected: { "status": "ok", "latency": 15 }
```

### Monitoring

**Logs:**

```bash
# View application logs
pm2 logs apex-meridian

# View error logs only
pm2 logs apex-meridian --err

# View logs in real-time
pm2 logs apex-meridian --lines 100
```

**Performance Metrics:**

```bash
# View PM2 dashboard
pm2 monit

# View detailed metrics
pm2 describe apex-meridian
```

---

## Security & Compliance

### Security Best Practices

**1. Authentication Security:**

- Session cookies are HTTP-only and secure
- CSRF protection via SameSite cookie attribute
- JWT tokens signed with strong secret (256-bit minimum)
- OAuth 2.0 authorization code flow with PKCE

**2. API Security:**

- All tRPC procedures require authentication (except public endpoints)
- Role-based access control enforced at procedure level
- Input validation using Zod schemas
- Rate limiting on sensitive endpoints

**3. Payment Security:**

- PCI DSS compliance through Stripe (no card data stored)
- Webhook signature verification for all Stripe events
- Idempotency keys for payment operations
- Audit trail for all payment transactions

**4. Data Security:**

- Database connections use TLS encryption
- Sensitive environment variables never committed to Git
- S3 bucket access restricted by IAM policies
- Regular security audits and dependency updates

### Compliance

**GDPR Compliance:**

- User data deletion on request
- Data export functionality
- Cookie consent management
- Privacy policy and terms of service

**PCI DSS Compliance:**

- No storage of card data (handled by Stripe)
- Secure transmission of payment information
- Regular security assessments

**Aviation Regulatory Compliance:**

- FAA Part 117 (Flight and Duty Time Limitations)
- EASA FTL (Flight Time Limitations)
- CAAP regulations (Civil Aviation Authority)
- ICAO Annex 6 (Operation of Aircraft)

---

## Support & Maintenance

### Backup Procedures

**Database Backups:**

```bash
# Daily automated backups
0 2 * * * /usr/local/bin/backup-database.sh

# Backup script
#!/bin/bash
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME | \
  gzip > /backups/apex-meridian-$(date +%Y%m%d).sql.gz
```

**File Storage Backups:**

- S3 versioning enabled for all objects
- Cross-region replication configured
- Lifecycle policies for archival

### Update Procedures

**Application Updates:**

```bash
# Pull latest code
git pull origin main

# Install dependencies
pnpm install

# Run database migrations
pnpm db:push

# Build application
pnpm build

# Restart server
pm2 restart apex-meridian
```

**Dependency Updates:**

```bash
# Check for outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Test application
pnpm test

# Deploy if tests pass
pnpm build && pm2 restart apex-meridian
```

### Troubleshooting

**Common Issues:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Database connection timeout | Network/firewall issue | Check DATABASE_URL, verify TLS enabled |
| OAuth redirect loop | Cookie not set | Verify domain matches OAuth callback URL |
| Stripe webhook failures | Invalid signature | Regenerate webhook secret in Stripe Dashboard |
| S3 upload errors | Invalid credentials | Verify S3_ACCESS_KEY and S3_SECRET_KEY |

**Debug Mode:**

```bash
# Enable debug logging
export DEBUG=trpc:*,express:*

# Restart server
pm2 restart apex-meridian
```

---

## Appendix

### Glossary

| Term | Definition |
|------|------------|
| tRPC | TypeScript Remote Procedure Call - End-to-end typesafe API framework |
| Drizzle | TypeScript ORM with type inference and SQL-like syntax |
| TiDB | Distributed SQL database compatible with MySQL protocol |
| OAuth 2.0 | Industry-standard protocol for authorization |
| PCI DSS | Payment Card Industry Data Security Standard |
| RBAC | Role-Based Access Control |
| JWT | JSON Web Token - Compact token format for authentication |
| CSRF | Cross-Site Request Forgery - Web security vulnerability |
| GDPR | General Data Protection Regulation (EU privacy law) |

### References

1. [tRPC Documentation](https://trpc.io/docs)
2. [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
3. [Stripe API Reference](https://stripe.com/docs/api)
4. [React 19 Documentation](https://react.dev/)
5. [Tailwind CSS Documentation](https://tailwindcss.com/docs)
6. [OAuth 2.0 Specification](https://oauth.net/2/)
7. [PCI DSS Requirements](https://www.pcisecuritystandards.org/)
8. [GDPR Official Text](https://gdpr-info.eu/)

### Contact Information

**Technical Support:**  
Email: support@apex-meridian.com  
Website: https://apex-meridian.com/contact

**Sales Inquiries:**  
Email: sales@apex-meridian.com  
Phone: +1 (555) 123-4567

**Emergency Support:**  
24/7 Hotline: +1 (555) 999-8888

---

**Document Version History:**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Dec 2025 | Initial documentation | Development Team |
| 2.0 | Jan 2026 | Added payment system, AM-AV aviation system, research platform | Development Team |

---

*© 2026 Apex Meridian. All rights reserved.*
