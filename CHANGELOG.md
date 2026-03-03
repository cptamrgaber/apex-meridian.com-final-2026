# Changelog

All notable changes to this project will be documented in this file.

## [2026.03.03] - VPS Migration & Auth Overhaul

### Added

#### Authentication System
- **Simple Auth Module** (server/_core/simpleAuth.ts)
  - Direct password authentication bypassing OAuth
  - Login endpoint: POST /api/auth/login
  - Logout endpoint: POST /api/auth/logout
  - Auth check endpoint: GET /api/auth/me
  - Default credentials for development/testing

#### Social Platform Features
- **Groups System** (Groups.tsx, GroupDetail.tsx)
  - Social group creation and management
  - Group discovery and membership

- **Creator Analytics** (CreatorAnalytics.tsx)
  - Analytics dashboard for content creators
  - Performance metrics and insights

- **Notification Settings** (NotificationSettings.tsx)
  - Granular notification preferences
  - Email and push notification controls

- **Social Settings** (Settings.tsx)
  - Unified social platform settings

#### Admin Features
- **Reports Dashboard** (ReportsDashboard.tsx)
  - Admin reporting interface
  - Analytics and moderation tools

#### Backend Routers
- groups.ts - Group management API
- socialAnalytics.ts - Social analytics endpoints
- calls.ts - Voice/video call functionality
- gamification.ts - Gamification system
- notificationPreferences.ts - Notification settings API
- reporting.ts - Admin reporting API

#### Infrastructure
- **PM2 Configuration** (ecosystem.config.cjs, ecosystem.config.js)
  - Production process management
  - Auto-restart and logging configuration

### Changed

#### OAuth Configuration
- Updated OAuth URLs from localhost:3000 to production domain
- Added session secret for secure sessions
- Made Resend email service optional (graceful degradation)

#### Environment Variables
- OAUTH_SERVER_URL updated for production
- VITE_OAUTH_PORTAL_URL updated for production
- VITE_ANALYTICS_ENDPOINT set to valid URL
- SESSION_SECRET added for session security

### Infrastructure

#### Migration
- **From**: Manus AI hosting
- **To**: Hostinger VPS (76.13.6.68)
- **DNS**: Cloudflare proxy enabled

#### Services Deployed
- **Website**: Node.js/Express on port 3000 (PM2 managed)
- **Authentik**: SSO/Auth provider on port 9000/9443
- **Stalwart**: Mail server
- **SnappyMail**: Webmail interface

### Security
- All Resend API calls now gracefully handle missing API key
- Session tokens secured with proper secret
- OAuth callback URLs properly configured for production

---

## Previous Releases

See git history for previous changes.
