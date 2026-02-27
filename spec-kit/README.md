# Apex Meridian — Spec-Kit

This directory contains the complete specification kit for the Apex Meridian AI Technology Solutions platform. Each file is a standalone, agent-ready specification document covering a distinct aspect of the system. Together they form the authoritative reference for building, extending, or recreating the project.

---

## Directory Structure

| Folder | Purpose |
|---|---|
| `pages/` | Page-by-page UI specifications with routes, sections, and interactions |
| `database/` | Full database schema with table definitions, relationships, and indexes |
| `api/` | Complete tRPC router and procedure specifications |
| `design/` | Design system: colors, typography, spacing, components, and themes |
| `features/` | Deep-dive feature specifications (social, gamification, moderation, etc.) |
| `deployment/` | Infrastructure, environment variables, and deployment runbooks |
| `testing/` | Test plans, test cases, and quality checklists |

---

## Files at a Glance

### Core
| File | Description |
|---|---|
| `README.md` | This index file |
| `PROJECT_OVERVIEW.md` | High-level project summary, goals, and architecture |
| `NAVIGATION_MAP.md` | Complete site navigation tree with all 102 routes |

### Pages
| File | Description |
|---|---|
| `pages/01_corporate_website.md` | Home, About, Solutions overview, Technology, Investors, Contact |
| `pages/02_solutions.md` | All 10 solution sub-pages (Aviation, Cybersecurity, Education, etc.) |
| `pages/03_technology.md` | All 5 technology sub-pages (ML, NLP, CV, Robotics, Analytics) |
| `pages/04_resources_company.md` | Blog, Case Studies, Whitepapers, Research, Leadership, Partners, Awards, Press |
| `pages/05_support_legal.md` | FAQ, Documentation, Training, Privacy, Terms, Sitemap |
| `pages/06_employee_portal.md` | Login, Employee Dashboard, HR Dashboard, Department Portals |
| `pages/07_careers.md` | Careers page, 92 job listings, Application form, Applications dashboard |
| `pages/08_research_partnerships.md` | Publications, Timeline, Researchers, Blog, Collaboration, Partnerships |
| `pages/09_news_library.md` | News, specific news articles, Library |
| `pages/10_case_studies_blog.md` | Case studies and security blog posts |
| `pages/11_admin_dashboards.md` | Analytics, Leads, A/B Testing, Moderation, KYC, Reports, Settings |
| `pages/12_social_platform.md` | Social Home, Profiles, Feed, Stories, Explore, Messages, Groups |
| `pages/13_pricing_checkout.md` | Pricing, Checkout, Success, Customer Portal |

### Database
| File | Description |
|---|---|
| `database/01_schema_overview.md` | All 51 tables with column definitions and relationships |
| `database/02_social_tables.md` | Social platform tables in detail |
| `database/03_employee_tables.md` | Employee portal and HR tables |
| `database/04_recruitment_tables.md` | Careers and job application tables |
| `database/05_analytics_tables.md` | Analytics, gamification, and moderation tables |

### API
| File | Description |
|---|---|
| `api/01_auth_router.md` | Authentication procedures |
| `api/02_social_routers.md` | Posts, comments, likes, follows, stories, groups |
| `api/03_messaging_router.md` | Conversations and messages |
| `api/04_moderation_router.md` | Moderation, reports, KYC, phone verification |
| `api/05_analytics_gamification.md` | Analytics and gamification routers |
| `api/06_employee_routers.md` | Employee, HR requests, job applications |
| `api/07_realtime_events.md` | Socket.IO events and WebRTC signaling |

### Design
| File | Description |
|---|---|
| `design/01_design_system.md` | Colors, typography, spacing, shadows, and tokens |
| `design/02_components.md` | All UI components with variants and usage |
| `design/03_layouts.md` | Page layouts, navigation, and responsive breakpoints |
| `design/04_brand_identity.md` | Logo, brand voice, imagery, and iconography |

### Features
| File | Description |
|---|---|
| `features/01_social_networking.md` | Posts, feed, comments, likes, follows, hashtags, mentions |
| `features/02_messaging_calling.md` | DMs, group chats, file sharing, WebRTC calls |
| `features/03_groups_communities.md` | Group creation, roles, discovery, management |
| `features/04_content_moderation.md` | AI moderation, reporting, KYC, phone verification |
| `features/05_creator_analytics.md` | Analytics dashboard, engagement metrics, insights |
| `features/06_gamification.md` | Badges (15), reputation system, leaderboard |
| `features/07_notifications.md` | Notification types, preferences, quiet hours |
| `features/08_internationalization.md` | i18n setup, English/Arabic, RTL support |

### Deployment
| File | Description |
|---|---|
| `deployment/01_environment_variables.md` | All environment variables with descriptions |
| `deployment/02_server_setup.md` | VPS setup, Nginx, SSL, PM2 configuration |
| `deployment/03_database_setup.md` | MySQL setup, migrations, backups |
| `deployment/04_docker_deployment.md` | Docker and docker-compose configuration |
| `deployment/05_monitoring.md` | Logging, monitoring, alerting |

### Testing
| File | Description |
|---|---|
| `testing/01_test_plan.md` | Overall test strategy and coverage targets |
| `testing/02_unit_tests.md` | Unit test cases for all tRPC procedures |
| `testing/03_integration_tests.md` | Integration test scenarios |
| `testing/04_e2e_checklist.md` | End-to-end test checklist for all user flows |

---

## How to Use This Spec-Kit

**For AI Agents:** Read `PROJECT_OVERVIEW.md` and `NAVIGATION_MAP.md` first for context, then load the relevant spec file for the feature you are building. Each file is self-contained and written to be consumed directly as a prompt or context document.

**For Developers:** Use the spec files as the source of truth during implementation. Each file maps directly to a code module, page, or feature.

**For Project Managers:** Use `pages/` files for scope estimation and `testing/04_e2e_checklist.md` for acceptance criteria.

---

*Apex Meridian Spec-Kit — Version 1.0 — February 2026*
