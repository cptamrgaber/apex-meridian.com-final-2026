# Product Requirements Document (PRD)
## Apex Meridian — AI Technology Solutions Platform

**Document Version:** 2.0  
**Author:** Amro Gaber  
**Date:** February 2026  
**Status:** Active — Production  
**Classification:** Internal / Agent Reference

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision and Goals](#2-product-vision-and-goals)
3. [Stakeholders](#3-stakeholders)
4. [User Personas](#4-user-personas)
5. [Market Context](#5-market-context)
6. [Product Scope](#6-product-scope)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [System Architecture Requirements](#9-system-architecture-requirements)
10. [User Stories and Acceptance Criteria](#10-user-stories-and-acceptance-criteria)
11. [Feature Prioritisation](#11-feature-prioritisation)
12. [Data Requirements](#12-data-requirements)
13. [Integration Requirements](#13-integration-requirements)
14. [Security Requirements](#14-security-requirements)
15. [Performance Requirements](#15-performance-requirements)
16. [Accessibility Requirements](#16-accessibility-requirements)
17. [Internationalisation Requirements](#17-internationalisation-requirements)
18. [Analytics and Measurement](#18-analytics-and-measurement)
19. [Risks and Mitigations](#19-risks-and-mitigations)
20. [Development Timeline](#20-development-timeline)
21. [Success Metrics](#21-success-metrics)
22. [Glossary](#22-glossary)

---

## 1. Executive Summary

Apex Meridian is an Egyptian AI technology company that requires a unified digital platform combining four distinct functional zones: a **corporate marketing website**, an **internal employee portal**, a **careers and recruitment system**, and a **full-featured social networking platform**. The platform must serve enterprise B2B clients across Egypt, North Africa, the Middle East, and Africa while simultaneously supporting the company's internal operations and talent acquisition.

The platform is built on a modern full-stack architecture (React 19 + tRPC + Drizzle ORM + MySQL) and is designed to scale to 10,000+ concurrent users. It must be fully bilingual (English and Arabic with RTL support) and comply with Egyptian data protection regulations.

This PRD defines the complete product requirements for the Apex Meridian platform as it exists in its current production state, serving as both a living specification document and an agent-ready recreation guide.

---

## 2. Product Vision and Goals

### Vision Statement

> "To create the most comprehensive AI company digital presence in the Middle East and Africa — one that simultaneously attracts enterprise clients, recruits top talent, empowers employees, and builds a community of AI practitioners."

### Strategic Goals

**Goal 1 — Lead Generation:** The corporate website must generate qualified enterprise leads through solution pages, case studies, demo request forms, and the security assessment tool. Target: 50 qualified leads per month within 6 months of launch.

**Goal 2 — Talent Acquisition:** The careers system must streamline the recruitment of 92 open positions across 13 departments. Target: 500 applications per month, 15% interview conversion rate.

**Goal 3 — Operational Efficiency:** The employee portal must reduce HR administrative overhead by 40% by digitalising vacation requests, duty assignments, report submissions, and onboarding processes.

**Goal 4 — Community Building:** The social platform must build a community of AI practitioners and professionals in the MENA region. Target: 1,000 active users within 3 months of social platform launch.

**Goal 5 — Brand Authority:** The research publications, case studies, and blog content must establish Apex Meridian as the leading AI thought leader in Egypt and the MENA region.

---

## 3. Stakeholders

| Stakeholder | Role | Primary Concern |
|---|---|---|
| CEO | Executive Sponsor | Brand representation, investor relations |
| CTO | Technical Owner | System architecture, security, scalability |
| Head of Marketing | Content Owner | Lead generation, SEO, brand consistency |
| Head of HR | HR System Owner | Recruitment, employee management |
| Head of Sales | CRM Owner | Lead quality, demo requests, client portal |
| Engineering Team | Developers | Code quality, maintainability, performance |
| Enterprise Clients | External Users | Solution information, demo requests, support |
| Job Applicants | External Users | Job discovery, application experience |
| Employees | Internal Users | Portal usability, request management |
| Social Platform Users | External Users | Content quality, privacy, engagement |

---

## 4. User Personas

### Persona 1 — Enterprise Decision Maker (Ahmed)

**Demographics:** 45 years old, CTO or IT Director at an Egyptian bank, airline, or government entity. Based in Cairo. Comfortable with English and Arabic.

**Goals:** Evaluate AI vendors for a specific use case (fraud detection, predictive maintenance, etc.). Needs to justify the investment to the board.

**Pain Points:** Too many AI vendors with vague claims. Needs concrete ROI data, case studies, and technical depth.

**Platform Journey:** Arrives via LinkedIn or Google search → Solution page → Case study → Security assessment → Demo request form → Sales follow-up.

**Key Requirements:** Fast-loading solution pages, downloadable case studies, clear pricing indicators, easy demo request process.

---

### Persona 2 — Senior Engineer Applicant (Sara)

**Demographics:** 28 years old, Machine Learning Engineer with 5 years experience. Looking for a new challenge at a cutting-edge AI company in Egypt.

**Goals:** Find a position that matches her skills, understand the company culture, apply quickly.

**Pain Points:** Job descriptions that don't clearly list requirements. Complex multi-step application processes.

**Platform Journey:** Arrives via LinkedIn job post → Careers page → Filters by Engineering department → Reads full job requirements → Applies with resume and cover letter.

**Key Requirements:** Clear, untruncated job titles, full requirements visible without clicking through, simple application form, mobile-friendly.

---

### Persona 3 — Employee (Mohamed)

**Demographics:** 32 years old, Backend Engineer at Apex Meridian for 2 years. Uses the portal daily.

**Goals:** Submit vacation requests, check department project status, access company documents.

**Pain Points:** Manual paper-based processes, lack of visibility into request status.

**Platform Journey:** Logs in → Employee dashboard → Submits vacation request → Checks status → Views department portal → Downloads a policy document.

**Key Requirements:** Fast login, clear request status, mobile-accessible portal.

---

### Persona 4 — Social Platform Creator (Layla)

**Demographics:** 26 years old, AI researcher at a Cairo university. Active on social media, interested in building a professional following in the AI space.

**Goals:** Share research insights, build a following, connect with industry professionals.

**Pain Points:** LinkedIn is too formal. Twitter/X is too noisy. Wants a focused AI community.

**Platform Journey:** Creates profile → Completes phone verification → Posts research insights → Gains followers → Checks creator analytics → Applies for KYC verification.

**Key Requirements:** Rich post composer, real-time notifications, creator analytics, verification system.

---

### Persona 5 — HR Manager (Nadia)

**Demographics:** 38 years old, Head of HR at Apex Meridian. Manages all recruitment and employee relations.

**Goals:** Review job applications efficiently, manage employee requests, maintain accurate employee records.

**Pain Points:** Applications scattered across email. No centralised system for tracking request status.

**Platform Journey:** Logs in as admin → Reviews new applications → Updates application status → Reviews pending HR requests → Approves vacation request → Adds a new employee.

**Key Requirements:** Efficient table-based views, bulk actions, email notifications, resume download.

---

## 5. Market Context

### Target Market

The primary market is enterprise organisations in Egypt and the broader MENA region across six verticals: Aviation, Cybersecurity, Education, Healthcare, Finance, and Manufacturing. The secondary market is the broader AI practitioner community in Egypt and North Africa for the social platform.

### Competitive Landscape

| Competitor Type | Examples | Apex Meridian Differentiation |
|---|---|---|
| Global AI Consultancies | Accenture AI, IBM Watson | Local expertise, Arabic language, Egyptian regulatory knowledge |
| Regional Tech Companies | Flat6Labs portfolio companies | Deeper AI specialisation, enterprise-grade solutions |
| International AI Platforms | DataRobot, H2O.ai | Custom implementation, local support, MENA-specific datasets |

### Market Opportunity

Egypt's AI market is projected to grow at 35% CAGR through 2028, driven by government Vision 2030 initiatives, digital transformation mandates, and increasing enterprise AI adoption. Apex Meridian is positioned as the first Egyptian-founded, enterprise-grade AI solutions company with a full product portfolio.

---

## 6. Product Scope

### In Scope (Current Version — v2.0)

The following features are fully implemented and in production:

- Complete 10-solution corporate website with all sub-pages
- 5 technology deep-dive pages
- Research publications, timeline, and researcher profiles
- 3 university partnership pages
- News, library, case studies, and security blog
- Employee portal with 13 department portals
- HR management system (employees, requests, applications)
- 92-position careers system with application form
- Admin dashboards (analytics, leads, A/B testing, moderation, KYC, reports)
- Full social networking platform (feed, profiles, messaging, groups, stories)
- WebRTC video and voice calling in messages
- Creator analytics
- Phone and KYC verification
- Gamification (reputation points + 15 badges)
- Bilingual support (English + Arabic RTL)
- Checkout and subscription management

### Out of Scope (Future Versions)

- Native mobile applications (iOS and Android)
- AI-powered chatbot for the corporate website
- Client self-service portal (post-sale)
- Advanced CRM integration (Salesforce, HubSpot)
- Video content hosting (beyond S3 storage)
- Live streaming on the social platform
- Marketplace for AI tools and services

---

## 7. Functional Requirements

### FR-01: Corporate Website

| ID | Requirement | Priority |
|---|---|---|
| FR-01.1 | Display all 10 solution pages with complete content, key features, and case study previews | Must Have |
| FR-01.2 | Contact form must save submissions to database and send email notification within 30 seconds | Must Have |
| FR-01.3 | Demo request form must capture lead information and notify the sales team | Must Have |
| FR-01.4 | Security assessment tool must provide personalised results based on user inputs | Should Have |
| FR-01.5 | All pages must load in under 3 seconds on a 4G connection | Must Have |
| FR-01.6 | Navigation must support dropdown menus for Solutions, Technology, Resources, Company, Support | Must Have |
| FR-01.7 | Pricing page must display three tiers with feature comparison table | Must Have |

### FR-02: Employee Portal

| ID | Requirement | Priority |
|---|---|---|
| FR-02.1 | Employees must be able to log in with email and password | Must Have |
| FR-02.2 | Employees must be able to submit vacation, duty, and report requests | Must Have |
| FR-02.3 | HR admins must be able to approve or reject requests with email notification to employee | Must Have |
| FR-02.4 | Each of the 13 department portals must display projects, policies, team members, and resources | Must Have |
| FR-02.5 | HR admins must be able to add, edit, and deactivate employee accounts | Must Have |
| FR-02.6 | Organisation chart must be visually rendered and printable | Should Have |
| FR-02.7 | System monitoring page must display real-time server status | Should Have |

### FR-03: Careers System

| ID | Requirement | Priority |
|---|---|---|
| FR-03.1 | All 92 job positions must be displayed with full titles (no truncation) | Must Have |
| FR-03.2 | Job cards must show the "Available" badge without covering the title | Must Have |
| FR-03.3 | Department filter must filter jobs in real time without page reload | Must Have |
| FR-03.4 | Requirements accordion must show education, experience, skills, and certifications | Must Have |
| FR-03.5 | Application form must accept PDF resume upload (max 5MB) and store to S3 | Must Have |
| FR-03.6 | HR must receive email notification for every new application | Must Have |
| FR-03.7 | Applicant must receive confirmation email with reference number | Must Have |

### FR-04: Social Platform

| ID | Requirement | Priority |
|---|---|---|
| FR-04.1 | Users must be able to create, edit, and delete posts with text and images | Must Have |
| FR-04.2 | Feed must support infinite scroll with real-time new post notifications | Must Have |
| FR-04.3 | Like and comment actions must update optimistically without page reload | Must Have |
| FR-04.4 | Direct messaging must support real-time delivery via WebSocket | Must Have |
| FR-04.5 | WebRTC video and voice calls must work between two users | Must Have |
| FR-04.6 | Groups must support public, private, and secret privacy levels | Must Have |
| FR-04.7 | Stories must expire after 24 hours automatically | Must Have |
| FR-04.8 | Creator analytics must show views, likes, comments, and follower growth | Should Have |
| FR-04.9 | Phone verification must use OTP with 60-second resend cooldown | Must Have |
| FR-04.10 | KYC submission must support document upload and admin review workflow | Should Have |
| FR-04.11 | Gamification must award reputation points and badges for defined actions | Should Have |
| FR-04.12 | Leaderboard must rank users by reputation points with weekly/monthly/all-time filters | Should Have |

### FR-05: Admin Dashboards

| ID | Requirement | Priority |
|---|---|---|
| FR-05.1 | Analytics dashboard must show real-time visitor count and page views | Must Have |
| FR-05.2 | Leads dashboard must display all captured leads with scoring | Must Have |
| FR-05.3 | A/B testing dashboard must allow creating tests and viewing results | Should Have |
| FR-05.4 | Moderation dashboard must show flagged content with approve/reject actions | Must Have |
| FR-05.5 | KYC review dashboard must show pending submissions with document previews | Must Have |
| FR-05.6 | Reports dashboard must show user-reported content with resolution workflow | Must Have |

---

## 8. Non-Functional Requirements

### NFR-01: Performance

| Requirement | Target |
|---|---|
| Page load time (corporate website) | < 3 seconds on 4G |
| API response time (95th percentile) | < 500ms |
| Database query time (95th percentile) | < 100ms |
| WebSocket message delivery latency | < 200ms |
| File upload processing time | < 5 seconds for 5MB file |
| Concurrent users supported | 10,000+ |

### NFR-02: Availability

| Requirement | Target |
|---|---|
| Uptime SLA | 99.9% (8.7 hours downtime/year) |
| Planned maintenance window | Sundays 2:00–4:00 AM EET |
| Recovery Time Objective (RTO) | < 1 hour |
| Recovery Point Objective (RPO) | < 15 minutes |

### NFR-03: Scalability

The application must scale horizontally. The Express server must be stateless (session data in JWT cookies, not server memory). Socket.IO must support Redis adapter for multi-instance deployment. Database connections must use a connection pool (max 20 connections per instance).

### NFR-04: Security

See Section 14 for detailed security requirements.

### NFR-05: Maintainability

All server-side procedures must have corresponding Vitest unit tests. Code coverage must remain above 70%. The codebase must pass TypeScript strict mode checks. All tRPC routers must be kept under 150 lines; larger routers must be split into sub-files.

---

## 9. System Architecture Requirements

### SAR-01: Frontend Architecture

The frontend must be a Single Page Application (SPA) built with React 19. Routing must be handled client-side with Wouter. All backend communication must use tRPC hooks (`trpc.*.useQuery` and `trpc.*.useMutation`). No direct `fetch()` or Axios calls are permitted in component code. State management must use TanStack Query's cache; no Redux or Zustand is required.

### SAR-02: Backend Architecture

The backend must be a single Express 4 server handling tRPC, OAuth callbacks, and Socket.IO on a single port (3000 in development, configurable via environment variable in production). The tRPC router must be split into feature-specific sub-routers (auth, posts, comments, likes, follows, groups, messages, notifications, gamification, employees, careers, admin, social, system). Each sub-router file must not exceed 150 lines.

### SAR-03: Database Architecture

All database interactions must go through Drizzle ORM. Raw SQL queries are not permitted except for complex aggregations that cannot be expressed efficiently in Drizzle's query builder. Schema changes must be made in `drizzle/schema.ts` and applied with `pnpm db:push`. The schema must not use BLOB columns for file storage; all files must be stored in S3 with only the URL saved in the database.

### SAR-04: Real-time Architecture

Socket.IO must handle all real-time features: new post notifications, message delivery, call signalling, and notification delivery. The Socket.IO server must authenticate connections using the same JWT cookie as the tRPC server. Each connected socket must join a room named `user:{userId}` for targeted event delivery.

### SAR-05: File Storage Architecture

All user-uploaded files (resumes, profile pictures, cover photos, post images, KYC documents, message attachments) must be stored in S3-compatible object storage using the `storagePut()` helper. File keys must include a random suffix to prevent enumeration. The S3 bucket must be configured as public-read for user-facing content.

---

## 10. User Stories and Acceptance Criteria

### US-001: View Job Listings

**As a** job seeker,  
**I want to** browse all available positions at Apex Meridian,  
**So that** I can find a role that matches my skills and apply.

**Acceptance Criteria:**
- AC-001.1: All 92 job positions are displayed on the careers page
- AC-001.2: Each job card shows the complete, untruncated job title
- AC-001.3: The "Available" badge does not overlap or cover the job title
- AC-001.4: Clicking a department filter tab shows only positions in that department within 300ms
- AC-001.5: Clicking "View Requirements" expands the requirements accordion without page reload
- AC-001.6: The "Apply Now" button navigates to the application form with the position pre-filled

---

### US-002: Submit a Job Application

**As a** job applicant,  
**I want to** submit my application for a specific position,  
**So that** the HR team can review my qualifications.

**Acceptance Criteria:**
- AC-002.1: The application form is accessible without login
- AC-002.2: The position and department fields are pre-filled from the URL parameters
- AC-002.3: The form validates all required fields before submission
- AC-002.4: PDF resume upload works for files up to 5MB
- AC-002.5: The applicant receives a confirmation email within 2 minutes of submission
- AC-002.6: The HR team receives an email notification with the applicant's details and resume link
- AC-002.7: The application appears in the `/applications` dashboard with status "New"

---

### US-003: Send a Direct Message

**As a** social platform user,  
**I want to** send a direct message to another user,  
**So that** we can communicate privately.

**Acceptance Criteria:**
- AC-003.1: Clicking "Message" on a user's profile opens the messages page with that conversation active
- AC-003.2: Sent messages appear immediately in the conversation (optimistic update)
- AC-003.3: The recipient receives the message in real-time without refreshing the page
- AC-003.4: Read receipts update when the recipient reads the message
- AC-003.5: File attachments up to 16MB can be sent and previewed in the conversation

---

### US-004: Initiate a Video Call

**As a** social platform user,  
**I want to** make a video call to a contact,  
**So that** we can have a face-to-face conversation.

**Acceptance Criteria:**
- AC-004.1: A video call icon is visible in the message conversation header
- AC-004.2: Clicking the icon shows a "Calling [Name]..." overlay to the caller
- AC-004.3: The recipient sees an incoming call modal with Accept and Reject buttons
- AC-004.4: Accepting the call establishes a WebRTC video connection within 5 seconds
- AC-004.5: Both parties can mute audio and disable video independently
- AC-004.6: Ending the call returns both parties to the message view

---

### US-005: Submit an HR Request

**As an** employee,  
**I want to** submit a vacation request,  
**So that** HR can review and approve my time off.

**Acceptance Criteria:**
- AC-005.1: The request form is accessible from the employee dashboard
- AC-005.2: The form accepts start date, end date, and reason
- AC-005.3: The submitted request appears in "My Pending Requests" with status "Pending"
- AC-005.4: The HR team sees the request in the HR Requests dashboard
- AC-005.5: When HR approves or rejects, the employee receives an email notification
- AC-005.6: The request status updates in the employee's dashboard in real-time

---

### US-006: Review a KYC Submission

**As an** admin,  
**I want to** review a user's KYC documents,  
**So that** I can verify their identity and grant them the verified badge.

**Acceptance Criteria:**
- AC-006.1: The KYC review dashboard shows all pending submissions
- AC-006.2: Each submission shows the user's personal information and document images
- AC-006.3: Clicking "Approve" sets the user's `kycVerified` to true and awards 50 reputation points
- AC-006.4: Clicking "Reject" requires entering a rejection reason
- AC-006.5: The user receives an email notification of the decision
- AC-006.6: Approved users see the 🛡️ badge on their profile

---

## 11. Feature Prioritisation

### MoSCoW Prioritisation

**Must Have (P0 — Launch Blockers)**
- Complete corporate website with all solution pages
- Contact form and demo request form
- Careers page with all 92 positions (untruncated titles)
- Job application form with resume upload
- Employee login and portal
- HR request submission and approval
- Social platform: posts, comments, likes, follows, feed
- Direct messaging with real-time delivery
- Admin: moderation and KYC review dashboards

**Should Have (P1 — Launch + 30 days)**
- WebRTC video and voice calling
- Groups (public, private, secret)
- Stories (24-hour expiry)
- Creator analytics
- Phone and KYC verification
- Gamification (reputation + badges)
- A/B testing dashboard
- Analytics dashboard

**Could Have (P2 — Launch + 90 days)**
- Leaderboard
- Advanced search across posts, users, hashtags
- Post bookmarks and shares
- Muted users and blocked users
- Notification preferences with quiet hours
- Checkout and subscription management

**Won't Have (This Version)**
- Native mobile apps
- AI chatbot
- Live streaming
- Marketplace

---

## 12. Data Requirements

### Data Retention Policy

| Data Type | Retention Period | Deletion Method |
|---|---|---|
| User accounts | Until account deletion request | Soft delete, then hard delete after 30 days |
| Social posts | Until user deletes or account deleted | Soft delete |
| Direct messages | 2 years | Hard delete after retention period |
| Stories | 24 hours | Automated cleanup job |
| Job applications | 2 years | Soft delete |
| Contact submissions | 1 year | Soft delete |
| Analytics events | 1 year | Aggregated after 90 days, raw deleted |
| KYC documents | 5 years (regulatory requirement) | Encrypted at rest |

### Data Privacy

All personally identifiable information (PII) must be stored in the MySQL database, not in S3 object keys or URLs. S3 file keys must use opaque random identifiers, not user names or ID numbers. The KYC documents table must be encrypted at rest using database-level encryption.

### Backup Requirements

Database backups must run daily at 2:00 AM EET with a 30-day retention period. S3 files must have versioning enabled. Backups must be stored in a geographically separate location from the primary database.

---

## 13. Integration Requirements

### IR-01: Manus OAuth
The application uses Manus OAuth as the identity provider. The OAuth flow must complete at `/api/oauth/callback` and issue a JWT cookie. The `VITE_APP_ID`, `OAUTH_SERVER_URL`, and `VITE_OAUTH_PORTAL_URL` environment variables must be configured correctly.

### IR-02: Resend (Email)
Transactional emails are sent via the Resend API. Required email templates:
- Job application confirmation (to applicant)
- New application notification (to HR)
- HR request status update (to employee)
- KYC decision notification (to user)
- Contact form acknowledgement (to submitter)

### IR-03: S3 File Storage
All file uploads use the `storagePut()` helper from `server/storage.ts`. The S3 bucket must be publicly readable. File keys must follow the pattern: `{category}/{userId}-{randomSuffix}.{ext}`.

### IR-04: Socket.IO (Real-time)
The Socket.IO server runs on the same port as the Express server. The client connects to the same origin. Authentication is performed on the `connection` event by verifying the JWT cookie. All real-time features (messages, notifications, calls) use Socket.IO events.

### IR-05: WebRTC (Video/Voice Calls)
WebRTC peer connections use STUN servers for NAT traversal. ICE candidates are exchanged via Socket.IO signalling events. The application does not require a TURN server for most network configurations, but one should be configured for production to handle restrictive firewalls.

---

## 14. Security Requirements

### SR-01: Authentication
All protected routes must verify the JWT cookie on every request. JWTs must be signed with a 256-bit secret, have a 7-day expiry (30 days with "Remember me"), and be stored in HTTP-only, Secure, SameSite=Strict cookies.

### SR-02: Authorisation
Role-based access control must be enforced at the tRPC procedure level using `protectedProcedure` and `adminProcedure` middleware. Frontend route guards are supplementary only and must not be relied upon for security.

### SR-03: Input Validation
All tRPC procedure inputs must be validated with Zod schemas before reaching business logic. File uploads must validate MIME type (not just file extension) and enforce size limits.

### SR-04: SQL Injection Prevention
All database queries must use Drizzle ORM's parameterised query builder. Raw SQL strings with user input are strictly prohibited.

### SR-05: XSS Prevention
All user-generated content displayed in the UI must be sanitised before rendering. The `Streamdown` markdown renderer must be configured to strip dangerous HTML tags.

### SR-06: Rate Limiting
The following endpoints must have rate limiting applied:
- Login: 5 attempts per IP per 15 minutes
- OTP send: 3 requests per phone number per hour
- Contact form: 10 submissions per IP per hour
- Post creation: 30 posts per user per hour

### SR-07: File Upload Security
Uploaded files must be validated for MIME type using magic bytes (not just the `Content-Type` header). Executable file types (`.exe`, `.sh`, `.php`, etc.) must be rejected. KYC documents must be stored in a separate S3 prefix with restricted access.

---

## 15. Performance Requirements

### PR-01: Core Web Vitals Targets

| Metric | Target | Measurement |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5 seconds | Google PageSpeed Insights |
| First Input Delay (FID) | < 100ms | Google PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | Google PageSpeed Insights |
| Time to First Byte (TTFB) | < 600ms | WebPageTest |

### PR-02: API Performance

All tRPC queries must complete within 500ms at the 95th percentile under normal load. Complex aggregation queries (leaderboard, analytics) may take up to 2 seconds. Long-running operations (file processing, email sending) must be performed asynchronously and must not block the HTTP response.

### PR-03: Database Optimisation

All foreign key columns must have indexes. Columns used in `WHERE` clauses in frequent queries must have indexes. The `posts` table must have a composite index on `(userId, createdAt)` and `(groupId, createdAt)`. The `likes` table must have a unique composite index on `(userId, postId)` and `(userId, commentId)`.

---

## 16. Accessibility Requirements

The application must meet **WCAG 2.1 Level AA** standards:

- All interactive elements must be keyboard-navigable with visible focus indicators
- All images must have descriptive `alt` text
- Colour contrast ratio must be at least 4.5:1 for normal text and 3:1 for large text
- Form inputs must have associated `<label>` elements
- Error messages must be announced to screen readers via `aria-live` regions
- Modal dialogs must trap focus and be dismissible with the Escape key
- The page must be usable at 200% browser zoom without horizontal scrolling

---

## 17. Internationalisation Requirements

### IR-01: Language Support
The application must support English (en) as the primary language and Arabic (ar) as a full secondary language. All user-facing strings must be managed through `i18next` translation files. Hard-coded strings in JSX are not permitted.

### IR-02: RTL Layout
When Arabic is selected, the page `dir` attribute must be set to `rtl`. All directional CSS properties must use Tailwind's `rtl:` variant. The navigation, sidebar, and form layouts must mirror correctly in RTL mode.

### IR-03: Date and Number Formatting
Dates must be formatted according to the user's locale. Numbers must use locale-appropriate separators. Currency amounts must display in EGP (Egyptian Pound) by default with the appropriate symbol.

---

## 18. Analytics and Measurement

### Tracked Events

| Event | Trigger | Data Captured |
|---|---|---|
| `page_view` | Every route change | Page path, referrer, user agent, timestamp |
| `demo_request` | Demo form submission | Company, industry, solution interest |
| `contact_form` | Contact form submission | Subject, source page |
| `job_application` | Application form submission | Position, department, source |
| `solution_page_view` | Solution page visit | Solution name, time on page |
| `security_assessment` | Assessment completed | Industry, company size, score |
| `social_post_created` | Post creation | Post length, has image, group or feed |
| `social_follow` | Follow action | Follower ID, following ID |
| `call_initiated` | WebRTC call start | Call type (video/voice) |

### Dashboards

The admin analytics dashboard (`/admin/analytics`) must display:
- Real-time active visitor count (updated every 30 seconds via Socket.IO)
- Page views by page (last 7/30/90 days)
- Traffic sources (direct, search, social, referral)
- Conversion funnel (visit → solution page → demo request)
- Geographic distribution of visitors
- Device type breakdown (desktop, tablet, mobile)

---

## 19. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Database performance degradation at scale | Medium | High | Implement query caching, add indexes, consider read replicas |
| WebRTC call quality issues on restrictive networks | High | Medium | Configure TURN server for production, provide fallback to audio-only |
| S3 storage costs exceeding budget | Low | Medium | Implement file size limits, compress images before storage, set lifecycle policies |
| Spam on social platform | High | High | Implement rate limiting, AI content moderation, phone verification requirement |
| KYC document data breach | Low | Critical | Encrypt at rest, restrict S3 access, audit log all access, comply with Egyptian data protection law |
| High file descriptor count causing server crashes | Medium | High | Implement file watcher limits, use PM2 with restart policies, monitor with alerts |
| Arabic RTL layout breakage | Medium | Medium | Automated visual regression tests for RTL layout, dedicated RTL QA pass |

---

## 20. Development Timeline

### Phase 1 — Foundation (Weeks 1–3)
Project scaffolding, authentication system, database schema (core tables), employee portal (login, dashboard, basic HR), corporate website (home, about, contact).

### Phase 2 — Corporate Website (Weeks 4–6)
All 10 solution pages, 5 technology pages, resources section, company pages, support pages, pricing, investors, sitemap.

### Phase 3 — Careers System (Weeks 7–8)
Careers page with all 92 positions, department filter, requirements accordion, application form, S3 resume upload, email notifications, applications dashboard.

### Phase 4 — Employee Portal (Weeks 9–10)
13 department portals, HR requests system, organisation chart, team directory, onboarding portal, system monitoring, data center roadmap.

### Phase 5 — Social Platform Core (Weeks 11–13)
Social profiles, post feed, likes, comments, follows, explore, user profiles, creator analytics.

### Phase 6 — Social Platform Advanced (Weeks 14–15)
Direct messaging with real-time delivery, WebRTC video/voice calls, groups (create, join, manage), stories (create, view, expiry).

### Phase 7 — Verification and Gamification (Week 16)
Phone verification (OTP), KYC submission and review, reputation points system, 15 achievement badges, leaderboard.

### Phase 8 — Admin Dashboards (Week 17)
Analytics dashboard, leads dashboard, A/B testing, content moderation, KYC review, reports management.

### Phase 9 — Research and Partnerships (Week 18)
Research publications, timeline, researcher profiles, university partnership pages, collaboration form, research metrics.

### Phase 10 — Polish and Launch (Week 19)
Performance optimisation, accessibility audit, bilingual (Arabic) content, SEO meta tags, final testing, deployment.

---

## 21. Success Metrics

### 3-Month Targets (Post-Launch)

| Metric | Target | Measurement Method |
|---|---|---|
| Monthly website visitors | 10,000 | Analytics dashboard |
| Demo requests per month | 50 | CRM / leads dashboard |
| Job applications per month | 500 | Applications dashboard |
| Social platform registered users | 1,000 | Database user count |
| Social platform daily active users | 200 | Analytics events |
| Average session duration | > 3 minutes | Analytics dashboard |
| Contact form conversion rate | > 2% | Analytics funnel |
| Page load time (P95) | < 3 seconds | Real User Monitoring |
| API response time (P95) | < 500ms | Server monitoring |
| Uptime | > 99.9% | Uptime monitoring |

### 12-Month Targets

| Metric | Target |
|---|---|
| Monthly website visitors | 50,000 |
| Enterprise leads in pipeline | 200 |
| Positions filled via platform | 30 of 92 |
| Social platform registered users | 10,000 |
| Social platform daily active users | 2,000 |

---

## 22. Glossary

| Term | Definition |
|---|---|
| **tRPC** | TypeScript Remote Procedure Call — a framework for building type-safe APIs without schemas or code generation |
| **Drizzle ORM** | A TypeScript ORM for SQL databases with a query builder API |
| **Socket.IO** | A library for real-time bidirectional communication between browser and server |
| **WebRTC** | Web Real-Time Communication — a browser API for peer-to-peer audio, video, and data communication |
| **JWT** | JSON Web Token — a compact, URL-safe means of representing claims between two parties |
| **KYC** | Know Your Customer — identity verification process using government-issued documents |
| **OTP** | One-Time Password — a temporary code sent via SMS for phone verification |
| **S3** | Simple Storage Service — Amazon's object storage service (or compatible alternatives) |
| **STUN** | Session Traversal Utilities for NAT — a protocol to discover the public IP for WebRTC |
| **TURN** | Traversal Using Relays around NAT — a relay server for WebRTC when direct connection fails |
| **RTL** | Right-to-Left — text direction used for Arabic, Hebrew, and other languages |
| **WCAG** | Web Content Accessibility Guidelines — international standards for web accessibility |
| **SPA** | Single Page Application — a web app that loads a single HTML page and dynamically updates content |
| **MENA** | Middle East and North Africa — the primary geographic market for Apex Meridian |
| **EET** | Eastern European Time — UTC+2, the timezone of Egypt |
| **EGP** | Egyptian Pound — the currency of Egypt |
| **AGI** | Artificial General Intelligence — AI systems with broad, human-like reasoning capabilities |
| **UEBA** | User and Entity Behaviour Analytics — security analytics for detecting anomalous behaviour |
| **AML** | Anti-Money Laundering — regulatory compliance for financial institutions |
| **ICAO** | International Civil Aviation Organization — the UN body setting aviation standards |
| **EASA** | European Union Aviation Safety Agency — European aviation regulatory body |

---

*This PRD is a living document. Updates should be versioned and dated. All changes must be reviewed by the product owner (Amro Gaber) before implementation.*

*Document prepared by: Amro Gaber | Apex Meridian | February 2026*
