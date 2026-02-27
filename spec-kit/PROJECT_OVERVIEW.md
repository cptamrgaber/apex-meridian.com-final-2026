# Apex Meridian — Project Overview Specification

**Version:** 1.0 | **Last Updated:** February 2026 | **Status:** Production

---

## 1. Executive Summary

Apex Meridian is an Egyptian AI technology company headquartered in New Cairo, Cairo Governorate. The platform is a full-stack web application that combines a **corporate marketing website**, an **internal employee portal**, a **careers and recruitment system**, and a **full-featured social networking platform** — all within a single codebase and deployment.

The application targets B2B enterprise clients across Egypt, North Africa, the Middle East, and Africa, offering AI-powered solutions in six core verticals: Aviation Intelligence, Cybersecurity, Education, AGI Research, Healthcare, and Financial Services.

---

## 2. Company Identity

| Attribute | Value |
|---|---|
| Legal Name | Apex Meridian® LLC |
| Headquarters | New Cairo, Cairo Governorate, Egypt |
| Primary Phone | +201 2 00 92 90 92 |
| General Email | info@apex-meridian.com |
| HR Email | hr@apex-meridian.com |
| Social Handle | @apex-meridian (all platforms) |
| Domain | apex-meridian.com |
| Brand Color | Dark Navy + Cyan accent |
| Logo Style | Text logo "A p e x  M e r i d i a n ®" — white on dark |
| AI Symbol | Tree icon (used for AI content and favicon) |

---

## 3. Platform Architecture

The platform is divided into four major functional zones:

**Zone 1 — Corporate Website** serves as the public-facing marketing presence. It contains solution pages, technology descriptions, company information, resources, and a contact system. This zone is fully public and SEO-optimised.

**Zone 2 — Employee Portal** is a protected internal system accessible only to authenticated employees. It contains HR management, department portals, employee requests, organization charts, and internal tools such as system monitoring and data center roadmaps.

**Zone 3 — Careers & Recruitment** bridges the public and internal zones. The careers page is public; the application form is public; the applications dashboard is HR-only.

**Zone 4 — Social Networking Platform** is a standalone social media application accessible at `/social/*`. It includes user profiles, a post feed, direct messaging, groups, stories, creator analytics, content moderation, and gamification.

---

## 4. Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| shadcn/ui | latest | Component library |
| Wouter | 3.x | Client-side routing |
| tRPC | 11 | Type-safe API client |
| TanStack Query | 5.x | Data fetching and caching |
| Socket.IO Client | 4.x | Real-time communication |
| i18next | latest | Internationalisation (EN/AR) |
| WebRTC | native | Video and voice calling |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22 | Runtime |
| Express | 4 | HTTP server |
| tRPC | 11 | Type-safe API server |
| Drizzle ORM | latest | Database ORM |
| MySQL / TiDB | 8+ | Primary database |
| Socket.IO | 4.x | WebSocket server |
| JWT | latest | Session tokens |
| Zod | 3.x | Input validation |
| bcrypt | latest | Password hashing |
| Resend | latest | Transactional email |

### Infrastructure

| Component | Technology |
|---|---|
| Web Server | Nginx (reverse proxy) |
| Process Manager | PM2 |
| File Storage | S3-compatible object storage |
| SSL | Let's Encrypt |
| Package Manager | pnpm |
| Build Tool | Vite |

---

## 5. Key Numbers

| Metric | Count |
|---|---|
| Total pages (routes) | 102 |
| Database tables | 51 |
| tRPC procedures | 100+ |
| Socket.IO events | 15+ |
| Job positions (careers) | 92 |
| Departments | 13 |
| Social badges | 15 |
| Supported languages | 2 (English, Arabic) |
| Solution verticals | 10 |
| Technology sub-pages | 5 |

---

## 6. User Roles and Access Levels

The system implements four distinct access levels enforced at both the API and UI layers:

**Public** access is granted to all visitors without authentication. This covers the entire corporate website, careers page, application form, and social platform browsing.

**Authenticated User** access is granted after login via Manus OAuth. This unlocks the social platform's interactive features: creating posts, sending messages, joining groups, and accessing creator analytics.

**Employee** access is granted to users with an employee record in the database. This unlocks the employee portal, department portals, and the ability to submit HR requests.

**Admin / HR** access is granted to users with the `admin` role in the `users` table. This unlocks all admin dashboards, the HR management system, the applications dashboard, content moderation, KYC review, and system settings.

---

## 7. Core Design Principles

The application follows a **dark-first design philosophy** with a navy/black background and cyan accent colours throughout. All pages use a consistent design language: glassmorphism cards with semi-transparent blue backgrounds, cyan border accents, and gradient buttons.

The navigation structure is **flat for public pages** (standard top navbar) and **sidebar-based for internal tools** (employee portal, admin dashboards). The social platform uses a **three-column layout** (sidebar navigation, main feed, right panel) on desktop, collapsing to a single column on mobile.

All interactive elements follow **WCAG 2.1 AA** accessibility standards with visible focus rings, sufficient colour contrast, and keyboard navigability.

---

## 8. Data Flow Overview

```
Browser (React + tRPC Client)
        │
        ▼
Express Server (port 3000)
        │
        ├── /api/trpc/* ──► tRPC Router ──► Drizzle ORM ──► MySQL
        │
        ├── /api/oauth/* ──► Manus OAuth ──► JWT Cookie
        │
        ├── /socket.io ──► Socket.IO Server ──► Real-time events
        │
        └── /* ──► Vite (dev) / Static files (prod)
```

File uploads flow from the browser directly to the tRPC procedure, which calls `storagePut()` to write to S3 and saves the returned URL to the database.

Email notifications flow through the Resend API, triggered by server-side events such as new job applications, contact form submissions, and HR request status changes.

---

## 9. Internationalisation Strategy

The application supports **English (en)** as the primary language and **Arabic (ar)** as a full secondary language with RTL layout support. Language switching is available in the navigation bar and persists via `localStorage`. The `i18next` library manages all translation strings, organised into namespaces: `common`, `auth`, `social`, `careers`, `admin`, and `errors`.

RTL mode is activated by setting `dir="rtl"` on the `<html>` element and applying Tailwind's `rtl:` variant classes for directional overrides.

---

## 10. Security Architecture

Authentication uses **Manus OAuth** as the identity provider. After OAuth completion, the server issues a signed **JWT stored in an HTTP-only cookie**, preventing JavaScript access. Every tRPC procedure that requires authentication calls `protectedProcedure`, which validates the JWT and injects `ctx.user` into the procedure context.

All database queries use **Drizzle ORM's parameterised queries**, eliminating SQL injection risk. File uploads are validated for MIME type and size (16 MB limit) before being written to S3. All user inputs are validated with **Zod schemas** before reaching business logic.

---

*See `NAVIGATION_MAP.md` for the complete route tree, and the `pages/` directory for page-by-page specifications.*
