# Apex-Meridian® - Complete Website Platform

**Prepared by:** Amro Gaber  
**Company:** Apex-Meridian® LLC  
**Last Updated:** January 29, 2026  
**Repository:** https://github.com/cptamrgaber/apex-meridian.com-final-2026

---

## 🌟 Project Overview

Apex-Meridian® is a comprehensive enterprise platform delivering cutting-edge AI solutions for aviation, cybersecurity, education, and AGI research. This repository contains the complete website platform including corporate website, employee portals, research systems, and an integrated social networking platform.

The platform consists of **102 pages** spanning corporate content, employee systems, research portals, admin dashboards, e-commerce, and a full-featured social networking platform with real-time communication.

---

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Complete Feature List](#complete-feature-list)
- [Project Timeline](#project-timeline)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🏗 Project Structure Overview

### Complete Page Count: 102 Pages

**1. Corporate Website (30+ pages)**
- Main pages, solutions, technology, resources, company info

**2. Research & Academic Portal (13 pages)**
- Publications, researchers, partnerships, projects

**3. Employee & HR Portal (8 pages)**
- Employee systems, HR management, onboarding

**4. Admin & Analytics (7 pages)**
- Analytics, leads, A/B testing, moderation, KYC

**5. Customer & Subscription (4 pages)**
- Pricing, checkout, payment, customer portal

**6. Social Networking Platform (20+ pages)**
- Social feed, profiles, messaging, groups, stories

**7. Security & Compliance (8 pages)**
- Security resources, assessments, policies

**8. News & Case Studies (5 pages)**
- Company news, product launches, case studies

**9. Support & Documentation (3 pages)**
- FAQ, documentation, training

**10. Utility Pages (4 pages)**
- Login, auth, 404, component showcase

---

## 🛠 Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Client-side routing
- **tRPC 11** - Type-safe APIs
- **TanStack Query** - Data fetching
- **i18next** - Internationalization (English/Arabic)
- **Socket.IO Client** - Real-time communication
- **shadcn/ui** - Component library

### Backend
- **Node.js 22** - Runtime environment
- **Express 4** - Web framework
- **tRPC 11** - API layer
- **Drizzle ORM** - Database toolkit
- **Socket.IO** - WebSocket server
- **JWT** - Authentication

### Database
- **MySQL/TiDB** - Relational database
- **40+ Tables** - Comprehensive schema
- **Drizzle Kit** - Migrations

### Infrastructure
- **Manus Platform** - Hosting
- **S3** - File storage
- **Stripe** - Payments
- **WebRTC** - Video/voice calls
- **OAuth 2.0** - Authentication

---

## ✨ Complete Feature List

### Corporate Website
✅ 102 responsive pages  
✅ Multi-language (English/Arabic with RTL)  
✅ SEO optimized  
✅ Contact forms and lead capture  
✅ Blog and resource library  
✅ Case studies and whitepapers  
✅ Site map  

### E-commerce
✅ Stripe payment processing  
✅ Subscription management  
✅ Customer portal  
✅ Invoice generation  

### Employee & HR
✅ Employee portal  
✅ HR dashboard  
✅ Request management  
✅ Onboarding system  
✅ Organization chart  

### Research
✅ Publications database  
✅ Researcher profiles  
✅ Partnership pages  
✅ Research metrics  

### Admin & Analytics
✅ Website analytics  
✅ Lead scoring  
✅ A/B testing  
✅ Content moderation  
✅ KYC verification  

### Social Platform (36 Major Features)
✅ User profiles & posts  
✅ Comments & reactions  
✅ Follow system  
✅ Hashtags & mentions  
✅ Stories (24-hour content)  
✅ Direct messaging  
✅ Group chats  
✅ Message editing/deletion  
✅ File sharing (16MB)  
✅ Read receipts  
✅ Typing indicators  
✅ Online status  
✅ Video/voice calling (WebRTC)  
✅ Groups & communities  
✅ Group discovery  
✅ AI moderation  
✅ User reporting  
✅ Creator analytics  
✅ Notification preferences  
✅ Phone & KYC verification  

---

## 📅 Project Timeline (76 Phases Completed)

### Phases 1-5: Foundation (Weeks 1-4)
- Project setup, corporate pages, navigation

### Phases 6-10: Solutions Pages (Weeks 5-8)
- 11 industry solution pages

### Phases 11-15: Technology & Resources (Weeks 9-12)
- 5 technology pages, blog system, resources

### Phases 16-20: Company Pages (Weeks 13-16)
- Leadership, partners, awards, careers

### Phases 21-25: Employee & HR (Weeks 17-20)
- Employee portal, HR dashboard, onboarding

### Phases 26-30: Research Portal (Weeks 21-24)
- Publications, researchers, partnerships

### Phases 31-35: E-commerce (Weeks 25-28)
- Stripe integration, subscriptions, checkout

### Phases 36-40: Admin & Analytics (Weeks 29-32)
- Analytics, lead scoring, A/B testing

### Phases 41-45: Security (Weeks 33-36)
- Security assessment, compliance docs

### Phases 46-50: Social Foundation (Weeks 37-40)
- Profiles, posts, comments, likes, follows

### Phases 51-55: Messaging (Weeks 41-44)
- Direct messaging, group chats

### Phases 56-60: Notifications (Weeks 45-48)
- Notification system

### Phases 61-65: Advanced Social (Weeks 49-52)
- Trending, search, settings

### Phase 66: AI Moderation (Week 53)
- Automated content analysis

### Phase 67: User Reporting (Week 54)
- Report system, admin dashboard

### Phase 68: Moderation Integration (Week 55)
- Unified content safety

### Phases 69-71: Groups (Weeks 56-58)
- Groups, discovery, recommendations  
- **Tests:** 16/16 passing

### Phase 72: Real-time (Week 59)
- Socket.IO, presence tracking

### Phase 73: Enhanced Messaging (Week 60)
- Edit, delete, file upload, read receipts  
- **Tests:** 7/7 passing

### Phase 74: Notification Preferences (Week 61)
- Granular notification controls  
- **Tests:** 6/6 passing

### Phase 75: Video/Voice Calling (Week 62)
- WebRTC integration, call history

### Phase 76: Content Analytics (Week 63)
- Creator dashboard, engagement metrics

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- pnpm
- MySQL/TiDB database
- Stripe account
- S3 bucket

### Installation

```bash
# Clone repository
git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git
cd apex-meridian-web

# Install dependencies
pnpm install

# Set up environment variables (see .env.example)

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

### Running Tests
```bash
pnpm test              # Run all tests
pnpm test groups       # Run specific tests
pnpm test --watch      # Watch mode
```

---

## 🏛 Architecture

### Frontend (102 Pages)
```
client/src/pages/
├── Home.tsx, About.tsx, Contact.tsx, etc.
├── solutions/          # 11 industry pages
├── technology/         # 5 technology pages
├── resources/          # 4 resource pages
├── company/            # 4 company pages
├── support/            # 3 support pages
├── research/           # 10 research pages
├── partnerships/       # 3 partnership pages
├── admin/              # 7 admin dashboards
├── social/             # 13 social pages
├── blog/               # 3 blog articles
├── case-studies/       # 2 case studies
└── news/               # 1 news page
```

### Backend (15+ Routers, 100+ Procedures)
```
server/routers/
├── social.ts           # 50+ procedures
├── messaging.ts        # 10+ procedures
├── groups.ts           # 14 procedures
├── calls.ts            # 6 procedures
├── socialAnalytics.ts  # 4 procedures
├── reporting.ts        # 5 procedures
├── moderation.ts       # 4 procedures
├── notificationPreferences.ts  # 5 procedures
├── analytics.ts        # Website analytics
├── subscriptions.ts    # Stripe integration
└── ...                 # Other routers
```

---

## 📊 Database Schema (40+ Tables)

### Core Social
- `socialProfiles`, `posts`, `comments`, `likes`, `follows`

### Messaging
- `conversations`, `conversationParticipants`, `messages`, `messageReactions`

### Groups
- `groups`, `groupMembers`, `groupPosts`

### Communication
- `calls`, `callParticipants`

### Analytics
- `postViews`, `postEngagementMetrics`, `userAnalytics`, `analyticsEvents`, `leads`, `leadScores`

### Notifications
- `notifications`, `notificationPreferences`, `mutedUsers`

### Content
- `hashtags`, `postHashtags`, `stories`, `storyViews`, `shares`, `trendingTopics`

### E-commerce
- `subscriptions`, `paymentTransactions`, `stripeCustomers`

### Research
- `publications`, `researchers`, `researchProjects`, `collaborations`

### HR & Employee
- `employeeRequests`, `hrRequests`, `departments`, `organizationChart`

### Moderation
- `reportedContent`

### Settings
- `userSettings`, `newsletterSubscribers`

### Verification
- `phoneVerificationOTPs`

### A/B Testing
- `abTests`, `abTestVariants`

---

## 📡 API Documentation

### tRPC Routers (100+ Procedures)

**auth** - Authentication  
**social** - 50+ social procedures  
**messaging** - 10+ messaging procedures  
**groups** - 14 group procedures  
**calls** - 6 call procedures  
**socialAnalytics** - 4 analytics procedures  
**reporting** - 5 reporting procedures  
**moderation** - 4 moderation procedures  
**notificationPreferences** - 5 preference procedures  
**analytics** - Website analytics  
**subscriptions** - Stripe integration  
**leadScoring** - Lead management  

---

## 🧪 Testing

**Total Tests:** 36+ tests passing

- Groups: 10/10
- Groups Discovery: 6/6
- Reporting: 7/7
- Messaging: 7/7
- Notification Preferences: 6/6

---

## 🌍 Internationalization

**Supported Languages:**
- English (en)
- Arabic (ar) with full RTL support

---

## 🔒 Security

- OAuth 2.0 authentication
- JWT sessions
- Role-based access control
- Input validation (Zod)
- SQL injection protection
- XSS & CSRF protection
- Secure file uploads

---

## 🚀 Deployment

### Manus Platform
1. Create checkpoint
2. Click "Publish" in UI
3. Configure custom domain
4. Set environment variables

---

## 📈 Project Statistics

- **Total Pages:** 102
- **Database Tables:** 40+
- **tRPC Procedures:** 100+
- **tRPC Routers:** 15+
- **Tests:** 36+ passing
- **Lines of Code:** 25,000+
- **Languages:** 2 (English, Arabic)
- **Real-time Events:** 15+
- **Development Duration:** 63 weeks
- **Phases Completed:** 76

---

## 👥 Team

**Prepared by:** Amro Gaber  
**Company:** Apex-Meridian® LLC  
**Repository:** https://github.com/cptamrgaber/apex-meridian.com-final-2026

---

## 📞 Support

- **GitHub Issues:** https://github.com/cptamrgaber/apex-meridian.com-final-2026/issues
- **Manus Support:** https://help.manus.im

---

**Last Updated:** January 29, 2026  
**Version:** 358b888f  
**Status:** Active Development  

© 2026 Apex-Meridian® LLC. All rights reserved.

## Deployment

### Production Server (Hostinger VPS)
- **IP**: 76.13.6.68 (public) / 100.69.5.27 (Tailscale)
- **Domain**: https://apex-meridian.com
- **DNS**: Cloudflare (proxied)

### Services
| Service | Port | Status |
|---------|------|--------|
| Website (Node.js) | 3000 | PM2 managed |
| Authentik (SSO) | 9000, 9443 | Docker |
| Stalwart (Mail) | 25, 587, 993 | Systemd |
| SnappyMail | 80/443 | Nginx |

### Quick Commands
```bash
# SSH to VPS
ssh root@100.69.5.27

# PM2 management
pm2 status
pm2 logs apex-meridian
pm2 restart apex-meridian

# Rebuild & deploy
cd /var/www/apex-meridian
npm run build
pm2 restart apex-meridian --update-env
```

### Authentication
- **Simple Auth**:  with 
- **OAuth**: Via Authentik at port 9000
- **Admin**: Authentik admin at https://100.69.5.27:9000

