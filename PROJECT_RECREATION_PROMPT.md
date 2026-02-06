# 🚀 Apex Meridian Project Recreation Prompt

Use this prompt to recreate the entire Apex Meridian project with all features, structure, and methodology.

---

## 📋 Master Prompt

```
Build a comprehensive enterprise AI technology company website called "Apex Meridian" with the following specifications:

### PROJECT OVERVIEW
Create a full-stack web application using React 19, Node.js 22, tRPC 11, MySQL, and Tailwind CSS 4. The project should include both a corporate website and a complete social networking platform.

### CORE REQUIREMENTS

1. **Technology Stack**
   - Frontend: React 19 + Vite + Tailwind CSS 4 + shadcn/ui
   - Backend: Node.js 22 + Express 4 + tRPC 11
   - Database: MySQL 8 with Drizzle ORM
   - Real-time: Socket.IO for WebSocket connections
   - Storage: S3-compatible object storage
   - Authentication: OAuth 2.0 with JWT sessions
   - Deployment: Docker + Nginx + PM2

2. **Internationalization**
   - Full English/Arabic support with RTL layout
   - i18next for translations
   - All UI elements must be translatable

3. **Architecture Principles**
   - Type-safe end-to-end with TypeScript
   - tRPC procedures for all API calls (no REST)
   - Superjson for automatic Date/Map/Set serialization
   - Role-based access control (admin, user)
   - Optimistic updates for instant UI feedback
   - Comprehensive error handling

### PART 1: CORPORATE WEBSITE (30+ Pages)

#### Main Sections
1. **Home Page**
   - Hero section with animated gradient background
   - Solutions overview with icons
   - Technology showcase
   - Statistics counter
   - CTA buttons

2. **Solutions** (6 industry-specific pages)
   - Aviation AI Solutions
   - Cybersecurity Solutions
   - Education Technology
   - AGI Research
   - Healthcare AI
   - Financial Services
   Each with: overview, key features, benefits, use cases, CTA

3. **Technology** (5 pages)
   - Machine Learning
   - Natural Language Processing
   - Computer Vision
   - Predictive Analytics
   - Technology Overview page

4. **Resources** (5 pages)
   - Blog with categories and search
   - Case Studies with filters
   - Whitepapers download section
   - Documentation center
   - Resources hub

5. **Company** (4 pages)
   - About Us (mission, vision, values, team)
   - Careers with job listings
   - Press & Media
   - Contact Us with form

6. **Portal System** (8 pages)
   - Employee Portal (dashboard, documents, announcements)
   - HR Portal (leave management, payroll, performance)
   - Research Portal (projects, publications, datasets)
   Each with authentication and role-based access

7. **E-commerce** (4 pages)
   - Pricing plans (Free, Pro, Enterprise)
   - Stripe payment integration
   - Subscription management
   - Invoice generation

8. **Security & Compliance** (8 pages)
   - Security overview
   - Compliance certifications
   - Privacy Policy
   - Terms of Service
   - Cookie Policy
   - GDPR compliance
   - Data Protection
   - Security Whitepaper

### PART 2: SOCIAL NETWORKING PLATFORM (20+ Pages)

#### Core Social Features
1. **User Management**
   - User registration and authentication
   - Profile creation with avatar and cover photo
   - Bio, location, website, social links
   - Privacy settings
   - Account settings

2. **Posts & Content**
   - Create posts with text, images, videos
   - Like, comment, share functionality
   - Hashtags and mentions
   - Post privacy (public, followers, private)
   - Edit and delete posts
   - Pin posts to profile

3. **Social Graph**
   - Follow/unfollow users
   - Followers and following lists
   - Friend suggestions
   - Block users
   - Mute users

4. **Messaging System**
   - Direct messages (1-on-1)
   - Message threads
   - Real-time message delivery
   - Typing indicators
   - Read receipts
   - Message editing and deletion
   - File attachments (images, documents)
   - Emoji support

5. **Notifications**
   - Real-time notifications
   - Notification types: likes, comments, follows, mentions, messages
   - Notification preferences
   - Mark as read/unread
   - Notification history
   - Quiet hours feature
   - Delivery channels (in-app, email)

6. **Groups/Communities**
   - Create groups with privacy levels (public, private, secret)
   - Group roles (admin, moderator, member)
   - Group posts and discussions
   - Member management
   - Group discovery and search
   - Trending groups
   - Suggested groups based on interests
   - Category-based filtering

7. **Content Moderation**
   - AI-powered content moderation
   - User reporting system
   - Admin moderation dashboard
   - Report review and resolution
   - Content flagging
   - Automatic violation detection
   - Moderation queue
   - Ban/suspend users

8. **Search & Discovery**
   - Global search (users, posts, groups)
   - Trending topics
   - Hashtag exploration
   - User suggestions
   - Popular posts

### PART 3: ADVANCED FEATURES

#### Real-time Features (Socket.IO)
1. **WebSocket Infrastructure**
   - User presence tracking (online/offline)
   - Real-time post updates
   - Live notifications
   - Typing indicators
   - Message delivery status

2. **WebRTC Video/Voice Calling**
   - 1-on-1 video calls
   - 1-on-1 voice calls
   - Call signaling through Socket.IO
   - Call history tracking
   - Call notifications
   - Video/audio controls (mute, camera toggle)

#### Analytics & Insights
1. **Content Analytics**
   - Post view tracking
   - Engagement metrics (likes, comments, shares)
   - Audience insights
   - Follower growth tracking
   - Top performing content
   - Best time to post analysis
   - Creator dashboard

2. **User Analytics**
   - Activity tracking
   - Session management
   - User journey tracking
   - Engagement patterns

#### Gamification System
1. **Badges & Achievements**
   - 15+ predefined badges (First Post, 100 Likes, Verified, Top Contributor, etc.)
   - Badge categories (milestone, engagement, special, contribution)
   - Badge display on profiles
   - Achievement notifications

2. **Reputation System**
   - Points for actions (post, comment, like received, etc.)
   - Level progression (Newcomer → Member → Contributor → Expert → Legend)
   - Rank calculation
   - Reputation history
   - Leaderboard

3. **Rewards**
   - Point awards for achievements
   - Badge unlocking
   - Level-up notifications
   - Reputation tracking

### PART 4: ADMIN FEATURES

#### Admin Dashboards
1. **Main Admin Dashboard**
   - System statistics
   - User growth charts
   - Content metrics
   - Revenue tracking
   - Recent activity

2. **User Management**
   - User list with filters
   - User details and activity
   - Role management
   - Ban/suspend users
   - User analytics

3. **Content Management**
   - Post moderation
   - Comment moderation
   - Reported content review
   - Content deletion
   - Bulk actions

4. **AI Moderation Dashboard**
   - Moderation queue
   - Confidence scores
   - Auto-flagged content
   - Review and action
   - Moderation statistics

5. **Reports Dashboard**
   - User reports list
   - Report statistics
   - Report resolution
   - Reporter information
   - Action history

6. **Analytics Dashboard**
   - Traffic analytics
   - User engagement
   - Content performance
   - Revenue metrics
   - Export reports

### PART 5: TECHNICAL IMPLEMENTATION

#### Database Schema (51 Tables)
1. **User & Authentication**
   - users, sessions, oauthAccounts

2. **Social Features**
   - socialProfiles, posts, comments, likes, follows, blocks, mutedUsers

3. **Messaging**
   - conversations, conversationParticipants, messages

4. **Groups**
   - groups, groupMembers, groupPosts

5. **Notifications**
   - notifications, notificationPreferences

6. **Content Moderation**
   - reportedContent, moderationActions

7. **Analytics**
   - postViews, postEngagementMetrics, userAnalytics

8. **Gamification**
   - badges, userBadges, userReputation, reputationHistory

9. **Calls**
   - calls, callParticipants

10. **Portal Systems**
    - employees, hrRecords, leaveRequests, researchProjects, publications

11. **E-commerce**
    - subscriptions, payments, invoices

#### tRPC Routers (15+ Routers, 100+ Procedures)
1. **auth**: login, logout, me, register
2. **social**: createPost, getPosts, likePost, commentPost, followUser, etc.
3. **messaging**: sendMessage, getConversations, getMessages, editMessage, deleteMessage
4. **groups**: createGroup, joinGroup, leaveGroup, getGroups, searchGroups
5. **notifications**: getNotifications, markAsRead, updatePreferences
6. **reporting**: reportContent, getReports, resolveReport
7. **moderation**: moderateContent, getQueue, takeAction
8. **gamification**: awardPoints, awardBadge, getLeaderboard, getUserBadges
9. **analytics**: recordView, getPostAnalytics, getCreatorDashboard
10. **calls**: initiateCall, acceptCall, endCall, getCallHistory
11. **admin**: getUsers, getStatistics, manageUsers
12. **portal**: employee, hr, research routers
13. **ecommerce**: subscriptions, payments, invoices

#### Real-time Events (Socket.IO)
- User presence: user:online, user:offline
- Posts: post:new, post:like, post:comment
- Messages: message:new, message:edit, message:delete, message:read, typing:start, typing:stop
- Notifications: notification:new
- Calls: call:offer, call:answer, call:ice-candidate, call:ringing, call:accepted, call:declined, call:ended

### PART 6: DEVELOPMENT METHODOLOGY

#### Phase-by-Phase Approach
1. **Initial Setup** (Phase 1-5)
   - Project scaffolding
   - Database schema design
   - Authentication setup
   - Basic routing
   - UI component library

2. **Corporate Website** (Phase 6-20)
   - Build all static pages
   - Implement navigation
   - Add content sections
   - Create forms
   - Add animations

3. **Social Platform Core** (Phase 21-30)
   - User profiles
   - Posts and feeds
   - Social graph
   - Messaging
   - Notifications

4. **Advanced Features** (Phase 31-40)
   - Groups/Communities
   - Content moderation
   - Real-time features
   - WebRTC calling
   - Analytics
   - Gamification

5. **Admin & Portal** (Phase 41-50)
   - Admin dashboards
   - Portal systems
   - E-commerce
   - Reports and analytics

6. **Polish & Deploy** (Phase 51-60)
   - Testing
   - Bug fixes
   - Performance optimization
   - Documentation
   - Deployment setup

#### Best Practices
1. **Code Organization**
   - Feature-based folder structure
   - Reusable components
   - Shared utilities
   - Type definitions
   - Constants and enums

2. **Testing**
   - Vitest for unit tests
   - Test all tRPC procedures
   - Test critical user flows
   - Aim for 80%+ coverage

3. **Documentation**
   - README with project overview
   - API documentation
   - Deployment guides
   - Architecture diagrams
   - Timeline and phases

4. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Database indexing
   - Caching strategies

5. **Security**
   - Input validation
   - SQL injection prevention
   - XSS protection
   - CSRF tokens
   - Rate limiting
   - Secure headers

### PART 7: DEPLOYMENT

#### Deployment Options
1. **Manus Platform** (Built-in hosting)
   - One-click deployment
   - Automatic SSL
   - Database included
   - WebSocket support

2. **Hostinger VPS** (Self-hosted)
   - Automated deployment script
   - Docker containers
   - Nginx reverse proxy
   - PM2 process manager
   - Let's Encrypt SSL
   - Automatic backups

3. **Docker Compose** (Any VPS)
   - Multi-container setup
   - Database container
   - Application container
   - Nginx container
   - Volume management

#### Environment Variables
- Database connection
- JWT secrets
- OAuth credentials
- S3 credentials
- SMTP settings
- API keys
- Feature flags

### PART 8: DELIVERABLES

#### Code & Documentation
1. **Source Code**
   - Complete application code
   - Database migrations
   - Seed data scripts
   - Configuration files

2. **Documentation**
   - README.md (comprehensive project overview)
   - DEPLOYMENT_GUIDE.md (general deployment)
   - HOSTINGER_VPS_DEPLOYMENT.md (VPS-specific)
   - VPS_QUICK_START.md (quick reference)
   - AUDIT_REPORT.md (quality audit)
   - API documentation

3. **Deployment Assets**
   - Automated deployment script (deploy-apex.sh)
   - Docker configuration
   - Nginx configuration
   - PM2 ecosystem file
   - Backup scripts

4. **GitHub Repository**
   - All code pushed to GitHub
   - Proper .gitignore
   - Branch protection
   - README and docs

### PART 9: QUALITY REQUIREMENTS

#### Code Quality
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- No console errors
- No TypeScript errors
- Clean code principles

#### UI/UX Quality
- Responsive design (mobile, tablet, desktop)
- Consistent styling
- Smooth animations
- Loading states
- Error states
- Empty states
- Accessibility (WCAG 2.1)

#### Performance
- Lighthouse score 90+
- Fast page loads
- Optimized images
- Efficient queries
- Minimal re-renders

### PART 10: PROJECT MANAGEMENT

#### Task Tracking
- Create todo.md file
- Track all features as checkboxes
- Mark completed items
- Update progress regularly

#### Checkpoints
- Save checkpoint after each major phase
- Include descriptive messages
- Test before saving
- Document changes

#### Communication
- Provide progress updates
- Explain technical decisions
- Ask for clarification when needed
- Suggest improvements

### EXECUTION INSTRUCTIONS

1. **Start by creating a plan** with all phases
2. **Create todo.md** with all features listed
3. **Build incrementally** - complete each phase before moving to next
4. **Test thoroughly** - write tests for critical features
5. **Document everything** - README, deployment guides, API docs
6. **Save checkpoints** after major milestones
7. **Push to GitHub** regularly
8. **Deliver with deployment instructions**

### IMPORTANT NOTES

- Use the web-db-user template as starting point
- Follow the template's architecture (tRPC, Drizzle, React 19)
- Maintain type safety throughout
- Write tests for all tRPC procedures
- Create comprehensive documentation
- Provide multiple deployment options
- Remove all placeholder content
- Remove all third-party branding
- Ensure production-ready code

### SUCCESS CRITERIA

✅ All 102 pages implemented and working
✅ All features functional and tested
✅ No TypeScript errors
✅ No console errors
✅ Responsive on all devices
✅ English/Arabic translations complete
✅ Documentation comprehensive
✅ Deployment guides ready
✅ Code pushed to GitHub
✅ Production-ready

---

## 🎯 Quick Start Command

To recreate this project, simply paste this entire prompt and add:

"Please build this project following the exact specifications above. Start by creating a detailed plan, then implement phase by phase. Save checkpoints after major milestones and push all code to GitHub."
```

---

## 📝 Additional Context

This project took **76 phases over 63 weeks** to complete with:
- 65,236 lines of code
- 51 database tables
- 100+ tRPC procedures
- 15+ Socket.IO events
- 36+ passing tests
- Complete English/Arabic translations
- Comprehensive documentation

The final deliverable is a production-ready, enterprise-grade web application with both corporate and social networking features.
