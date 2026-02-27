# Apex Meridian — Complete Navigation Map

All 102 routes organised by zone and hierarchy. Each entry shows the route path, the component file, the access level, and a one-line description.

**Access Levels:** `public` | `auth` (logged-in user) | `employee` | `admin`

---

## Zone 1 — Corporate Website

### Main Pages

| Route | Component | Access | Description |
|---|---|---|---|
| `/` | `pages/Home.tsx` | public | Landing page with hero, solutions overview, stats, news, and CTA |
| `/about` | `pages/About.tsx` | public | Company mission, values, history, leadership preview, office locations |
| `/solutions` | `pages/Solutions.tsx` | public | Grid overview of all 10 solution verticals |
| `/technology` | `pages/Technology.tsx` | public | Meridian Engine platform overview and research partnerships |
| `/investors` | `pages/Investors.tsx` | public | Financial highlights, growth metrics, investor relations |
| `/contact` | `pages/Contact.tsx` | public | Contact form, office map, phone/email, business hours |
| `/pricing` | `pages/Pricing.tsx` | public | Pricing tiers, feature comparison, enterprise CTA |
| `/sitemap` | `pages/SiteMap.tsx` | public | Full hierarchical site map |
| `/privacy` | `pages/Privacy.tsx` | public | Privacy policy and GDPR compliance |
| `/terms` | `pages/Terms.tsx` | public | Terms of service |

### Solutions Sub-Pages (Level 2)

| Route | Component | Access | Description |
|---|---|---|---|
| `/solutions/aviation` | `pages/solutions/Aviation.tsx` | public | Predictive maintenance, flight optimisation, safety AI |
| `/solutions/cybersecurity` | `pages/solutions/Cybersecurity.tsx` | public | Threat detection, monitoring, incident response |
| `/solutions/education` | `pages/solutions/Education.tsx` | public | Adaptive learning, student analytics, personalised curriculum |
| `/solutions/agi` | `pages/solutions/AGI.tsx` | public | Neural-symbolic AI, reasoning systems, research |
| `/solutions/healthcare` | `pages/solutions/healthcare.tsx` | public | Medical diagnosis AI, patient analytics, HIPAA |
| `/solutions/finance` | `pages/solutions/finance.tsx` | public | Fraud detection, risk assessment, trading algorithms |
| `/solutions/manufacturing` | `pages/solutions/manufacturing.tsx` | public | Quality control, supply chain, predictive maintenance |
| `/solutions/retail` | `pages/solutions/retail.tsx` | public | Customer behaviour, inventory optimisation, recommendations |
| `/solutions/transportation` | `pages/solutions/transportation.tsx` | public | Route optimisation, fleet management, traffic prediction |
| `/solutions/media-production` | `pages/solutions/media-production.tsx` | public | AI video, audio synthesis, image creation, script writing |

### Technology Sub-Pages (Level 2)

| Route | Component | Access | Description |
|---|---|---|---|
| `/technology/machine-learning` | `pages/technology/machine-learning.tsx` | public | Deep learning, AutoML, model deployment |
| `/technology/nlp` | `pages/technology/nlp.tsx` | public | Arabic NLP, text analysis, sentiment, translation |
| `/technology/computer-vision` | `pages/technology/computer-vision.tsx` | public | Object detection, segmentation, video analysis |
| `/technology/robotics` | `pages/technology/robotics.tsx` | public | Robot control, path planning, human-robot interaction |
| `/technology/data-analytics` | `pages/technology/data-analytics.tsx` | public | Big data, real-time analytics, BI |

### Resources Sub-Pages (Level 2)

| Route | Component | Access | Description |
|---|---|---|---|
| `/resources/blog` | `pages/resources/blog.tsx` | public | Blog post listing with categories and search |
| `/resources/case-studies` | `pages/resources/case-studies.tsx` | public | Client success stories with metrics |
| `/resources/whitepapers` | `pages/resources/whitepapers.tsx` | public | Technical papers with download forms |
| `/resources/research` | `pages/resources/research.tsx` | public | Academic publications and collaboration |

### Company Sub-Pages (Level 2)

| Route | Component | Access | Description |
|---|---|---|---|
| `/company/leadership` | `pages/company/leadership.tsx` | public | Executive team, board, advisory board |
| `/company/partners` | `pages/company/partners.tsx` | public | Technology and university partners |
| `/company/awards` | `pages/company/awards.tsx` | public | Industry recognition and certifications |
| `/company/press` | `pages/company/press.tsx` | public | Press releases and media coverage |

### Support Sub-Pages (Level 2)

| Route | Component | Access | Description |
|---|---|---|---|
| `/support/faq` | `pages/support/faq.tsx` | public | FAQ organised by category with search |
| `/support/documentation` | `pages/support/documentation.tsx` | public | API docs, integration guides, SDKs |
| `/support/training` | `pages/support/training.tsx` | public | Training programmes, certifications, webinars |

---

## Zone 2 — Employee Portal

### Authentication

| Route | Component | Access | Description |
|---|---|---|---|
| `/login` | `pages/Login.tsx` | public | Email/password login with JWT session |

### Employee Dashboard

| Route | Component | Access | Description |
|---|---|---|---|
| `/employee` | `pages/EmployeePortal.tsx` | employee | Main employee dashboard with quick links and announcements |
| `/employee-requests` | `pages/EmployeeRequests.tsx` | employee | Submit and track vacation, duty, and report requests |
| `/organization-chart` | `pages/OrganizationChart.tsx` | public | Visual org chart of 13 departments |
| `/team` | `pages/Team.tsx` | public | Grid of all employees with photos and contact info |
| `/our-team` | `pages/Team.tsx` | public | Alias for `/team` |
| `/onboarding` | `pages/OnboardingPortal.tsx` | employee | New employee onboarding checklist and resources |
| `/data-center-roadmap` | `pages/DataCenterRoadmap.tsx` | employee | Infrastructure expansion plans and timeline |
| `/system-monitoring` | `pages/SystemMonitoring.tsx` | employee | Server status, performance metrics, uptime |

### HR & Management

| Route | Component | Access | Description |
|---|---|---|---|
| `/hr-dashboard` | `pages/HRDashboard.tsx` | admin | Employee management: add, edit, deactivate |
| `/hr-requests` | `pages/HRRequests.tsx` | admin | Review and approve/reject employee requests |
| `/applications` | `pages/Applications.tsx` | admin | Job applications dashboard with status management |

### Department Portals (Level 2 — Dynamic)

| Route | Component | Access | Description |
|---|---|---|---|
| `/departments/engineering` | `pages/DepartmentPortal.tsx` | employee | Engineering dept: projects, policies, team, resources |
| `/departments/research-development` | `pages/DepartmentPortal.tsx` | employee | R&D dept portal |
| `/departments/sales` | `pages/DepartmentPortal.tsx` | employee | Sales & Business Development portal |
| `/departments/marketing` | `pages/DepartmentPortal.tsx` | employee | Marketing & Communications portal |
| `/departments/operations` | `pages/DepartmentPortal.tsx` | employee | Operations & Project Management portal |
| `/departments/hr` | `pages/DepartmentPortal.tsx` | employee | Human Resources portal |
| `/departments/finance` | `pages/DepartmentPortal.tsx` | employee | Finance & Accounting portal |
| `/departments/legal` | `pages/DepartmentPortal.tsx` | employee | Legal & Compliance portal |
| `/departments/customer-success` | `pages/DepartmentPortal.tsx` | employee | Customer Success & Support portal |
| `/departments/product` | `pages/DepartmentPortal.tsx` | employee | Product Management portal |
| `/departments/security` | `pages/DepartmentPortal.tsx` | employee | Security & Safety portal |
| `/departments/qa` | `pages/DepartmentPortal.tsx` | employee | Quality Assurance portal |
| `/departments/art-design` | `pages/DepartmentPortal.tsx` | employee | Art & Design portal |

---

## Zone 3 — Careers & Recruitment

| Route | Component | Access | Description |
|---|---|---|---|
| `/careers` | `pages/Careers.tsx` | public | 92 job listings with filters, requirements, and apply buttons |
| `/careers/apply` | `pages/CareerApply.tsx` | public | Job application form with resume upload |

---

## Zone 4 — Research & Partnerships

### Research Pages

| Route | Component | Access | Description |
|---|---|---|---|
| `/research/publications` | `pages/research/Publications.tsx` | public | Academic papers with filters and PDF downloads |
| `/research/timeline` | `pages/research/Timeline.tsx` | public | Visual research milestone timeline |
| `/researchers` | `pages/research/Researchers.tsx` | public | Research team grid |
| `/researchers/:id` | `pages/research/ResearcherProfile.tsx` | public | Individual researcher profile |
| `/research/blog` | `pages/research/Blog.tsx` | public | Technical research blog listing |
| `/research/blog/:id` | `pages/research/BlogPost.tsx` | public | Individual research blog post |
| `/research/collaboration` | `pages/research/CollaborationForm.tsx` | public | Research collaboration request form |
| `/research/metrics` | `pages/research/MetricsDashboard.tsx` | public | Research KPIs and publication metrics |
| `/research/am-av-project` | `pages/research/AMAVProject.tsx` | public | Autonomous Aviation project detail page |
| `/research/blog/ai-compliance-nlp` | `pages/research/AIComplianceBlog.tsx` | public | AI compliance NLP blog post |

### Partnership Pages

| Route | Component | Access | Description |
|---|---|---|---|
| `/partnerships/auc` | `pages/partnerships/AUC.tsx` | public | AUC collaboration details |
| `/partnerships/cairo-university` | `pages/partnerships/CairoUniversity.tsx` | public | Cairo University partnership |
| `/partnerships/zewail-city` | `pages/partnerships/ZewailCity.tsx` | public | Zewail City partnership |

---

## Zone 5 — News, Library & Blog

| Route | Component | Access | Description |
|---|---|---|---|
| `/news` | `pages/News.tsx` | public | Company news listing |
| `/news/am-av-occ-system-launch` | `pages/news/AMAVLaunch.tsx` | public | AM-AV OCC system launch article |
| `/library` | `pages/Library.tsx` | public | Resource library with search and downloads |
| `/case-studies/am-av-regional-carrier` | `pages/case-studies/AMAVCaseStudy.tsx` | public | AM-AV regional carrier case study |
| `/case-studies/aviation-security` | `pages/case-studies/CyberSecurityCaseStudy.tsx` | public | Aviation cybersecurity case study |
| `/blog/ai-model-poisoning` | `pages/blog/AIModelPoisoning.tsx` | public | AI model poisoning security blog |
| `/blog/zero-trust-aviation` | `pages/blog/ZeroTrustAviation.tsx` | public | Zero trust architecture for aviation |
| `/blog/security` | `pages/blog/SecurityBlog.tsx` | public | General security blog |
| `/security-resources` | `pages/SecurityResources.tsx` | public | Security assessment tools and checklists |
| `/security-assessment` | `pages/SecurityAssessment.tsx` | public | Free interactive security assessment tool |

---

## Zone 6 — Admin Dashboards

| Route | Component | Access | Description |
|---|---|---|---|
| `/admin/analytics` | `pages/admin/AnalyticsDashboard.tsx` | admin | Website traffic, conversions, real-time visitors |
| `/admin/leads` | `pages/admin/LeadsDashboard.tsx` | admin | Lead capture, scoring, CRM |
| `/admin/ab-tests` | `pages/admin/ABTestingDashboard.tsx` | admin | A/B test management and results |
| `/admin/moderation` | `pages/admin/ModerationDashboard.tsx` | admin | AI moderation queue and review |
| `/admin/kyc-review` | `pages/admin/KYCReviewDashboard.tsx` | admin | KYC document review and approval |
| `/admin/reports` | `pages/admin/ReportsDashboard.tsx` | admin | User-reported content management |
| `/admin/settings` | `pages/AdminSettings.tsx` | admin | System configuration and feature toggles |

---

## Zone 7 — Social Networking Platform

### Core Social Pages

| Route | Component | Access | Description |
|---|---|---|---|
| `/social` | `pages/social/SocialHome.tsx` | auth | Main feed with posts from followed users |
| `/social/setup` | `pages/social/ProfileSetup.tsx` | auth | First-time social profile creation |
| `/social/profile/:username` | `pages/social/UserProfile.tsx` | auth | User profile with posts, followers, following |
| `/social/settings` | `pages/social/Settings.tsx` | auth | Edit profile, privacy, account settings |
| `/social/explore` | `pages/social/Explore.tsx` | auth | Discover users, posts, hashtags, groups |
| `/social/stories` | `pages/social/Stories.tsx` | auth | Create and view 24-hour stories |

### Messaging

| Route | Component | Access | Description |
|---|---|---|---|
| `/social/messages` | `pages/social/Messages.tsx` | auth | Direct messaging with real-time updates and WebRTC calls |

### Groups

| Route | Component | Access | Description |
|---|---|---|---|
| `/social/groups` | `pages/social/Groups.tsx` | auth | Group discovery, my groups, trending |
| `/social/groups/:id` | `pages/social/GroupDetail.tsx` | auth | Group feed, members, management |

### Verification

| Route | Component | Access | Description |
|---|---|---|---|
| `/social/verify-phone` | `pages/social/PhoneVerification.tsx` | auth | Phone number OTP verification |
| `/social/kyc-submission` | `pages/social/KYCSubmission.tsx` | auth | KYC document upload and submission |

### Creator & Notifications

| Route | Component | Access | Description |
|---|---|---|---|
| `/social/analytics` | `pages/social/CreatorAnalytics.tsx` | auth | Content performance, engagement, follower growth |
| `/social/notifications/settings` | `pages/social/NotificationSettings.tsx` | auth | Notification preferences and quiet hours |

---

## Zone 8 — Checkout & Account

| Route | Component | Access | Description |
|---|---|---|---|
| `/checkout` | `pages/CheckoutPage.tsx` | public | Product checkout with Stripe |
| `/checkout/success` | `pages/CheckoutSuccess.tsx` | public | Order confirmation |
| `/account/subscriptions` | `pages/CustomerPortal.tsx` | auth | Subscription management and billing history |

---

## Error Pages

| Route | Component | Access | Description |
|---|---|---|---|
| `/404` | `pages/NotFound.tsx` | public | 404 not found page |
| `*` (fallback) | `pages/NotFound.tsx` | public | Catch-all for unknown routes |

---

## Navigation Hierarchy Summary

```
apex-meridian.com/
├── (root) — Corporate Website
│   ├── /about
│   ├── /solutions/
│   │   ├── aviation, cybersecurity, education, agi
│   │   ├── healthcare, finance, manufacturing
│   │   ├── retail, transportation, media-production
│   ├── /technology/
│   │   ├── machine-learning, nlp, computer-vision
│   │   ├── robotics, data-analytics
│   ├── /resources/
│   │   ├── blog, case-studies, whitepapers, research
│   ├── /company/
│   │   ├── leadership, partners, awards, press
│   ├── /support/
│   │   ├── faq, documentation, training
│   ├── /investors, /contact, /pricing
│   ├── /privacy, /terms, /sitemap
│
├── /careers — Recruitment
│   └── /careers/apply
│
├── /research/ — Research Hub
│   ├── publications, timeline, metrics
│   ├── blog/:id, collaboration
│   └── am-av-project
├── /researchers/:id
├── /partnerships/ — University Partnerships
│   ├── auc, cairo-university, zewail-city
│
├── /news/, /library — Content
├── /case-studies/, /blog/ — Deep Content
├── /security-assessment, /security-resources
│
├── /login — Authentication
├── /employee — Employee Portal
│   ├── /departments/:dept (×13)
│   ├── /employee-requests
│   ├── /organization-chart, /team
│   ├── /onboarding, /data-center-roadmap
│   └── /system-monitoring
├── /hr-dashboard, /hr-requests
├── /applications
│
├── /admin/ — Admin Dashboards
│   ├── analytics, leads, ab-tests
│   ├── moderation, kyc-review, reports
│   └── settings
│
├── /social/ — Social Platform
│   ├── (feed), setup, explore, stories
│   ├── profile/:username, settings
│   ├── messages
│   ├── groups/:id
│   ├── verify-phone, kyc-submission
│   ├── analytics
│   └── notifications/settings
│
└── /checkout, /checkout/success
    └── /account/subscriptions
```

---

*Total routes: 102 | See `pages/` directory for detailed specifications of each zone.*
