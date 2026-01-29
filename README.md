# Apex Meridian - Social Platform

A comprehensive social media platform built with modern web technologies, featuring real-time communication, content moderation, analytics, and advanced social features.

## 🚀 Project Overview

Apex Meridian Social Platform is a full-featured social networking application that combines the best aspects of modern social media with advanced AI-powered moderation, real-time communication, and creator analytics tools.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Timeline](#project-timeline)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### Core Social Features
- **User Profiles** - Customizable profiles with avatars, bios, and social links
- **Posts & Feed** - Create, edit, delete posts with media support
- **Comments & Replies** - Nested comment threads with real-time updates
- **Likes & Reactions** - Multiple reaction types for posts and comments
- **Follow System** - Follow users and build your network
- **Hashtags** - Discover content through hashtags
- **Mentions** - Tag users in posts and comments
- **Stories** - 24-hour ephemeral content
- **Shares** - Share posts to your followers

### Groups & Communities
- **Create Groups** - Public, private, and secret groups
- **Group Posts** - Share content within groups
- **Member Roles** - Admin, moderator, and member roles
- **Group Discovery** - Search and discover groups by category
- **Trending Groups** - See popular and active groups
- **Suggested Groups** - Personalized group recommendations

### Real-time Communication
- **Direct Messaging** - One-on-one conversations
- **Group Chats** - Multi-user conversations
- **Message Reactions** - React to messages with emoji
- **Message Editing** - Edit sent messages
- **Message Deletion** - Delete messages (soft delete)
- **File Sharing** - Upload and share files (16MB limit)
- **Read Receipts** - See when messages are read
- **Typing Indicators** - Real-time typing status
- **Online Status** - See who's online
- **Video/Voice Calls** - WebRTC-powered calling

### Content Moderation
- **AI Moderation** - Automatic content analysis
- **User Reporting** - Flag inappropriate content
- **Admin Dashboard** - Review and manage reports
- **Moderation Queue** - Process flagged content
- **Auto-reporting** - High-confidence violations auto-create reports

### Creator Tools
- **Analytics Dashboard** - Track content performance
- **Engagement Metrics** - Views, likes, comments, shares
- **Audience Insights** - Best time to post, engagement patterns
- **Top Posts** - See your best-performing content
- **Follower Growth** - Track follower count over time

### Notification System
- **Real-time Notifications** - Instant updates for interactions
- **Notification Preferences** - Customize notification types
- **Delivery Channels** - In-app and email notifications
- **Frequency Settings** - Instant, hourly, or daily digest
- **Quiet Hours** - Set do-not-disturb times
- **Mute Users** - Silence notifications from specific users

### Security & Privacy
- **OAuth Authentication** - Secure Manus OAuth integration
- **Role-based Access** - Admin and user roles
- **Protected Routes** - Server-side authorization
- **Input Validation** - Zod schema validation
- **SQL Injection Protection** - Drizzle ORM parameterized queries

### Internationalization
- **Multi-language Support** - English and Arabic
- **RTL Support** - Right-to-left layout for Arabic
- **Dynamic Language Switching** - Change language on the fly

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Wouter** - Lightweight routing
- **tRPC** - End-to-end type-safe APIs
- **TanStack Query** - Data fetching and caching
- **i18next** - Internationalization
- **Socket.IO Client** - Real-time communication
- **shadcn/ui** - Component library

### Backend
- **Node.js 22** - Runtime environment
- **Express 4** - Web framework
- **tRPC 11** - API layer
- **Drizzle ORM** - Database toolkit
- **Socket.IO** - WebSocket server
- **Zod** - Schema validation
- **Superjson** - JSON serialization

### Database
- **MySQL/TiDB** - Relational database
- **Drizzle Kit** - Schema migrations

### Infrastructure
- **Manus Platform** - Hosting and deployment
- **S3** - File storage
- **WebRTC** - Video/voice calling
- **OAuth** - Authentication

### Development Tools
- **Vite** - Build tool
- **TSX** - TypeScript execution
- **Vitest** - Unit testing
- **ESLint** - Code linting
- **pnpm** - Package management

## 🏗 Architecture

### Frontend Architecture
```
client/
├── src/
│   ├── pages/           # Page components
│   │   ├── social/      # Social platform pages
│   │   └── admin/       # Admin dashboard pages
│   ├── components/      # Reusable components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Translations
│   ├── lib/             # Utilities
│   └── _core/           # Core functionality
└── public/              # Static assets
```

### Backend Architecture
```
server/
├── routers/             # tRPC routers
│   ├── social.ts        # Social features
│   ├── messaging.ts     # Messaging
│   ├── groups.ts        # Groups
│   ├── moderation.ts    # Moderation
│   ├── reporting.ts     # Reporting
│   ├── calls.ts         # Video/voice calls
│   └── ...              # Other routers
├── _core/               # Core server functionality
│   ├── index.ts         # Server entry point
│   ├── trpc.ts          # tRPC setup
│   ├── context.ts       # Request context
│   ├── socket.ts        # Socket.IO setup
│   └── ...              # Other core files
└── db.ts                # Database helpers
```

### Database Schema
```
drizzle/
├── schema.ts            # Database schema
└── migrations/          # Migration files
```

## 🚦 Getting Started

### Prerequisites
- Node.js 22+
- pnpm
- MySQL/TiDB database

### Installation

1. Clone the repository
```bash
git clone https://github.com/cptamrgaber/apex-meridian.com-final-2026.git
cd apex-meridian-web
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Database
DATABASE_URL=mysql://...

# OAuth
JWT_SECRET=...
OAUTH_SERVER_URL=...
VITE_OAUTH_PORTAL_URL=...

# Manus Platform
BUILT_IN_FORGE_API_URL=...
BUILT_IN_FORGE_API_KEY=...
```

4. Push database schema
```bash
pnpm db:push
```

5. Start development server
```bash
pnpm dev
```

6. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

### Running Tests
```bash
pnpm test
```

## 📅 Project Timeline

### Phase 1: Foundation (Initial Setup)
**Completed:** Project initialization with tRPC + Manus Auth + Database template

**Features:**
- Project scaffolding with React 19 + Express 4
- tRPC 11 integration with type-safe APIs
- Manus OAuth authentication
- Database setup with Drizzle ORM
- Basic user management

---

### Phase 2-10: Core Social Features
**Completed:** Essential social networking functionality

**Features:**
- User profiles with customization
- Post creation, editing, deletion
- Comment system with nested replies
- Like and reaction system
- Follow/unfollow functionality
- User feed with pagination
- Hashtag system
- Mention system (@username)
- Stories (24-hour content)
- Share functionality

**Database Tables Added:**
- `socialProfiles` - Extended user profiles
- `posts` - User posts
- `comments` - Post comments
- `likes` - Post and comment likes
- `follows` - Follow relationships
- `hashtags` - Hashtag definitions
- `postHashtags` - Post-hashtag relationships
- `stories` - Ephemeral content
- `storyViews` - Story view tracking
- `shares` - Post shares

---

### Phase 11-15: Messaging System
**Completed:** Real-time direct messaging

**Features:**
- One-on-one conversations
- Group conversations
- Message sending and receiving
- Conversation list
- Unread message counts
- Message timestamps

**Database Tables Added:**
- `conversations` - Conversation metadata
- `conversationParticipants` - Conversation members
- `messages` - Message content

---

### Phase 16-20: Notifications
**Completed:** Real-time notification system

**Features:**
- In-app notifications
- Notification types (likes, comments, follows, mentions)
- Unread notification counts
- Mark as read functionality
- Notification history

**Database Tables Added:**
- `notifications` - User notifications

---

### Phase 21-25: Advanced Features
**Completed:** Enhanced social features

**Features:**
- Trending topics
- User search
- Post search
- Profile verification
- User settings
- Privacy controls
- Block/mute users

**Database Tables Added:**
- `trendingTopics` - Trending hashtags and topics
- `userSettings` - User preferences

---

### Phase 26: AI Content Moderation
**Completed:** Automated content moderation

**Features:**
- AI-powered content analysis
- Automatic violation detection
- Moderation dashboard
- Content approval/rejection
- Moderation queue

**tRPC Procedures:**
- `moderation.moderateContent` - Analyze content
- `moderation.getQueue` - Get moderation queue
- `moderation.approveContent` - Approve content
- `moderation.rejectContent` - Reject content

---

### Phase 27: User Reporting System
**Completed:** Community-driven moderation

**Features:**
- Report posts and comments
- Report reasons (spam, harassment, etc.)
- Admin reports dashboard
- Report statistics
- Resolve reports (take action/dismiss)

**Database Tables Added:**
- `reportedContent` - User reports

**tRPC Procedures:**
- `reporting.reportContent` - Create report
- `reporting.getReports` - Get all reports (admin)
- `reporting.getReportStats` - Get statistics
- `reporting.resolveReport` - Resolve report

---

### Phase 28: AI Moderation + Reporting Integration
**Completed:** Unified content safety system

**Features:**
- Auto-create reports for high-confidence AI violations (>0.8)
- Cross-linked dashboards
- Unified moderation workflow

**Updates:**
- Modified `moderation.moderateContent` to auto-create reports
- Added navigation links between dashboards

---

### Phase 29-31: Groups & Communities
**Completed:** Group-based social networking

**Features:**
- Create groups (public/private/secret)
- Join/leave groups
- Group posts
- Group members with roles (admin, moderator, member)
- Group discovery and search
- Trending groups
- Suggested groups based on interests
- Category-based filtering

**Database Tables Added:**
- `groups` - Group metadata
- `groupMembers` - Group membership
- `groupPosts` - Posts in groups

**tRPC Procedures (11 total):**
- `groups.createGroup` - Create new group
- `groups.getGroup` - Get group details
- `groups.getGroups` - List groups with filters
- `groups.updateGroup` - Update group (admin)
- `groups.deleteGroup` - Delete group (admin)
- `groups.joinGroup` - Join a group
- `groups.leaveGroup` - Leave a group
- `groups.getGroupMembers` - List members
- `groups.getGroupPosts` - Get group posts
- `groups.createGroupPost` - Post in group
- `groups.getSuggestedGroups` - Personalized recommendations
- `groups.getTrendingGroups` - Popular groups
- `groups.searchGroups` - Search by name/description
- `groups.getGroupCategories` - List categories

**Tests:** 16/16 passing (groups + discovery)

---

### Phase 32: Real-time Features (WebSocket)
**Completed:** Socket.IO integration

**Features:**
- User presence tracking (online/offline)
- Real-time feed updates
- Live notifications
- Typing indicators
- Real-time message delivery
- OnlineStatus component

**Infrastructure:**
- Socket.IO server with authentication
- `useSocket` React hook
- 7+ socket events (user:online, user:offline, post:new, post:like, etc.)

---

### Phase 33: Enhanced Messaging
**Completed:** Advanced messaging features

**Features:**
- Message editing
- Message deletion (soft delete)
- File uploads to S3 (16MB limit)
- Read receipts (single/double check marks)
- Real-time Socket.IO events (message:edit, message:delete, message:read)

**Schema Updates:**
- Added `isEdited`, `isDeleted`, `isRead`, `readAt`, `mediaUrls` to messages table

**tRPC Procedures:**
- `messaging.editMessage` - Edit sent message
- `messaging.deleteMessage` - Soft delete message
- `messaging.uploadMessageFile` - Upload file to S3
- `messaging.markAsRead` - Mark message as read

**Tests:** 7/7 passing

---

### Phase 34: Notification Preferences
**Completed:** Granular notification control

**Features:**
- Event preferences (likes, comments, follows, messages, mentions, group activity)
- Delivery channels (in-app, email)
- Frequency settings (instant, hourly digest, daily digest)
- Quiet hours (custom start/end time)
- Mute specific users

**Database Tables Added:**
- `notificationPreferences` - User preferences
- `mutedUsers` - Muted user list

**tRPC Procedures:**
- `notificationPreferences.getPreferences` - Get user preferences
- `notificationPreferences.updatePreferences` - Update preferences
- `notificationPreferences.getMutedUsers` - List muted users
- `notificationPreferences.muteUser` - Mute a user
- `notificationPreferences.unmuteUser` - Unmute a user

**Tests:** 6/6 passing

---

### Phase 35: Video/Voice Calling (WebRTC)
**Completed:** Real-time communication

**Features:**
- WebRTC peer-to-peer connections
- Video calling with camera toggle
- Voice calling (audio-only mode)
- Call controls (mute, end call)
- Call history tracking
- Call signaling through Socket.IO
- Video/voice call buttons in Messages UI

**Database Tables Added:**
- `calls` - Call metadata
- `callParticipants` - Call participants

**tRPC Procedures:**
- `calls.initiateCall` - Start a call
- `calls.acceptCall` - Accept incoming call
- `calls.declineCall` - Decline call
- `calls.endCall` - End active call
- `calls.getCallHistory` - Get call history
- `calls.getActiveCall` - Get current call

**Socket.IO Events (7):**
- `call:offer` - WebRTC offer
- `call:answer` - WebRTC answer
- `call:ice-candidate` - ICE candidate exchange
- `call:ringing` - Call ringing
- `call:accepted` - Call accepted
- `call:declined` - Call declined
- `call:ended` - Call ended

**Components:**
- `VideoCall.tsx` - Full-featured call UI

---

### Phase 36: Content Analytics
**Completed:** Creator analytics backend

**Features:**
- Post view tracking
- Engagement metrics (views, likes, comments, shares)
- Creator dashboard statistics
- Top performing posts
- Audience insights (engagement by hour)
- Follower growth tracking

**Database Tables Added:**
- `postViews` - View tracking
- `postEngagementMetrics` - Daily aggregated metrics
- `userAnalytics` - User growth metrics

**tRPC Procedures:**
- `socialAnalytics.recordPostView` - Track post view
- `socialAnalytics.getPostAnalytics` - Get post metrics
- `socialAnalytics.getCreatorDashboard` - Dashboard stats
- `socialAnalytics.getAudienceInsights` - Audience data

**UI Components:**
- `CreatorAnalytics.tsx` - Analytics dashboard page

---

### Current Status

**Total Features Implemented:** 36 major feature sets

**Database Tables:** 40+ tables

**tRPC Procedures:** 100+ procedures across 15+ routers

**Tests:** 36+ tests passing

**Lines of Code:** 20,000+ lines

**Supported Languages:** English, Arabic (RTL support)

**Real-time Features:** Socket.IO with 15+ events

**File Storage:** S3 integration for media uploads

**Authentication:** Manus OAuth with JWT sessions

---

### Pending Features

**Phase 37: Gamification System**
- Badges and achievements
- User reputation points
- Leaderboards
- Achievement unlocking
- Progress tracking

**Future Enhancements:**
- Email notifications
- Push notifications (PWA)
- Advanced search filters
- Content recommendations
- User blocking
- Report analytics
- Mobile app (React Native)

## 📊 Database Schema

### Core Tables
- `users` - User accounts
- `socialProfiles` - Extended profiles
- `posts` - User posts
- `comments` - Post comments
- `likes` - Likes and reactions
- `follows` - Follow relationships

### Messaging
- `conversations` - Conversation metadata
- `conversationParticipants` - Participants
- `messages` - Message content
- `messageReactions` - Message reactions

### Groups
- `groups` - Group metadata
- `groupMembers` - Group membership
- `groupPosts` - Group posts

### Moderation
- `reportedContent` - User reports

### Communication
- `calls` - Call metadata
- `callParticipants` - Call participants

### Analytics
- `postViews` - View tracking
- `postEngagementMetrics` - Engagement metrics
- `userAnalytics` - User analytics

### Notifications
- `notifications` - User notifications
- `notificationPreferences` - Notification settings
- `mutedUsers` - Muted users

### Content
- `hashtags` - Hashtag definitions
- `postHashtags` - Post-hashtag links
- `stories` - Ephemeral content
- `storyViews` - Story views
- `shares` - Post shares
- `trendingTopics` - Trending topics

### Settings
- `userSettings` - User preferences

## 📡 API Documentation

### Authentication
All protected endpoints require a valid session cookie obtained through Manus OAuth.

### tRPC Routers

#### `auth`
- `me` - Get current user
- `logout` - Logout user

#### `social`
- `getMyProfile` - Get user profile
- `updateProfile` - Update profile
- `createPost` - Create post
- `getPosts` - Get feed
- `likePost` - Like post
- `commentOnPost` - Add comment
- `followUser` - Follow user
- `unfollowUser` - Unfollow user
- And 50+ more procedures...

#### `messaging`
- `getConversations` - List conversations
- `getMessages` - Get messages
- `sendMessage` - Send message
- `editMessage` - Edit message
- `deleteMessage` - Delete message
- `uploadMessageFile` - Upload file

#### `groups`
- `createGroup` - Create group
- `getGroups` - List groups
- `joinGroup` - Join group
- `createGroupPost` - Post in group
- `getSuggestedGroups` - Get recommendations
- `searchGroups` - Search groups

#### `calls`
- `initiateCall` - Start call
- `acceptCall` - Accept call
- `endCall` - End call
- `getCallHistory` - Get history

#### `socialAnalytics`
- `recordPostView` - Track view
- `getPostAnalytics` - Get post metrics
- `getCreatorDashboard` - Get dashboard
- `getAudienceInsights` - Get insights

#### `reporting`
- `reportContent` - Report content
- `getReports` - Get reports (admin)
- `resolveReport` - Resolve report

#### `notificationPreferences`
- `getPreferences` - Get preferences
- `updatePreferences` - Update preferences
- `muteUser` - Mute user

## 🧪 Testing

The project includes comprehensive unit tests using Vitest.

### Running Tests
```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test groups

# Run tests in watch mode
pnpm test --watch
```

### Test Coverage
- Groups: 10/10 tests passing
- Groups Discovery: 6/6 tests passing
- Reporting: 7/7 tests passing
- Messaging: 7/7 tests passing
- Notification Preferences: 6/6 tests passing

**Total: 36+ tests passing**

## 🌍 Internationalization

The platform supports multiple languages with full RTL (right-to-left) support.

### Supported Languages
- English (en)
- Arabic (ar) with RTL layout

### Adding Translations
1. Add keys to `client/src/i18n/locales/en.json`
2. Add translations to `client/src/i18n/locales/ar.json`
3. Use in components: `const { t } = useTranslation(); t('key')`

## 🔒 Security

### Authentication
- OAuth 2.0 with Manus platform
- JWT session tokens
- HTTP-only cookies
- Secure session management

### Authorization
- Role-based access control (admin, user)
- Protected tRPC procedures
- Server-side authorization checks

### Input Validation
- Zod schema validation
- SQL injection protection via Drizzle ORM
- XSS protection
- CSRF protection

### Data Privacy
- Soft delete for sensitive data
- User data encryption
- Secure file uploads to S3

## 🚀 Deployment

### Prerequisites
- Manus account
- Database (MySQL/TiDB)
- S3 bucket for file storage

### Deployment Steps
1. Create checkpoint in development
2. Click "Publish" in Manus UI
3. Configure custom domain (optional)
4. Set environment variables
5. Deploy

### Environment Variables
See `.env.example` for required variables.

## 📝 Contributing

### Development Workflow
1. Create feature branch
2. Implement feature
3. Write tests
4. Update documentation
5. Create pull request

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

### Testing Requirements
- All new features must include tests
- Maintain >80% code coverage
- All tests must pass before merge

## 📄 License

This project is proprietary software owned by Apex Meridian.

## 👥 Team

**Prepared by:** Amro Gaber  
**Project:** Apex Meridian Social Platform  
**Repository:** https://github.com/cptamrgaber/apex-meridian.com-final-2026

## 🙏 Acknowledgments

- Manus Platform for hosting and infrastructure
- tRPC for type-safe APIs
- Drizzle ORM for database management
- shadcn/ui for component library
- Socket.IO for real-time communication

## 📞 Support

For issues and questions:
- GitHub Issues: https://github.com/cptamrgaber/apex-meridian.com-final-2026/issues
- Manus Support: https://help.manus.im

---

**Last Updated:** January 29, 2026  
**Version:** 358b888f  
**Status:** Active Development
