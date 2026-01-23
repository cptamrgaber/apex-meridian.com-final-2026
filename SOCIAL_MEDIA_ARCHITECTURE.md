# Egyptian AI-Powered Social Media Platform Architecture

## Project Overview

**Platform Name:** Apex Social (working title)  
**Tagline:** "The 1st Egyptian Social Media Platform Based on AI"  
**Languages:** English, Arabic (extensible to more languages)  
**Features:** Combined capabilities of Facebook, Instagram, Twitter, TikTok, and YouTube

---

## Core Features Matrix

### From Facebook
- User profiles with cover photos and profile pictures
- Friend connections (follow/unfollow system)
- News feed with algorithmic ranking
- Post creation (text, images, videos, links)
- Comments and nested replies
- Reactions (like, love, care, haha, wow, sad, angry)
- Groups and communities
- Events and RSVPs
- Marketplace (buy/sell)
- Pages for businesses/creators
- Live streaming
- Memories and "On This Day"

### From Instagram
- Photo and video posts with filters
- Stories (24-hour ephemeral content)
- Reels (short-form video)
- IGTV (long-form video)
- Direct messaging with disappearing messages
- Explore page with trending content
- Hashtags and discover
- Shopping tags
- Saved collections
- Close friends lists

### From Twitter/X
- Short-form text posts (tweets)
- Retweets and quote tweets
- Trending topics and hashtags
- Threads (connected posts)
- Lists (curated feeds)
- Spaces (audio conversations)
- Polls
- Bookmarks
- Verified badges
- Advanced search

### From TikTok
- Short-form vertical video feed
- AI-powered "For You" page
- Duets and stitches
- Sound library and music integration
- Video effects and filters
- Challenges and trends
- Creator fund
- Live gifts and virtual currency
- Discover page

### From YouTube
- Long-form video hosting
- Channel subscriptions
- Playlists
- Video recommendations
- Comments and community posts
- Live streaming with chat
- Premieres
- Memberships and Super Chat
- Analytics dashboard for creators
- Video editing tools

---

## AI Features (Unique Differentiator)

### 1. AI Assistant (Available Everywhere)
- Contextual help on every page
- Content creation assistance
- Translation between languages
- Smart replies and comment suggestions
- Content summarization
- Accessibility features (image descriptions, captions)

### 2. AI Content Moderation
- Automatic detection of harmful content
- Hate speech and bullying detection
- Spam and bot detection
- NSFW content filtering
- Fake news detection
- Copyright infringement detection

### 3. AI-Powered Recommendations
- Personalized feed algorithm
- Smart content discovery
- Friend suggestions
- Group recommendations
- Trending topic prediction
- Optimal posting time suggestions

### 4. AI Content Creation Tools
- Auto-generated captions
- Smart hashtag suggestions
- Image enhancement and filters
- Video editing assistance
- Background removal
- Voice-to-text transcription
- Text-to-speech for accessibility

### 5. AI Analytics
- Audience insights
- Engagement predictions
- Content performance analysis
- Growth recommendations
- Sentiment analysis

---

## Database Schema Design

### Core User Tables

```typescript
// users (extends existing Manus user table)
socialProfiles {
  id: string (primary key)
  userId: string (foreign key to users)
  username: string (unique, @username)
  displayName: string
  bio: text
  profilePicture: string (S3 URL)
  coverPhoto: string (S3 URL)
  location: string
  website: string
  birthDate: date
  isVerified: boolean
  isPrivate: boolean
  language: string (en, ar)
  createdAt: timestamp
  updatedAt: timestamp
}

userSettings {
  id: string
  userId: string (foreign key)
  notificationsEnabled: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  privacyLevel: enum (public, friends, private)
  allowMessagesFrom: enum (everyone, friends, none)
  showOnlineStatus: boolean
  language: string
  theme: enum (light, dark, auto)
}
```

### Content Tables

```typescript
posts {
  id: string (primary key)
  userId: string (foreign key)
  content: text
  mediaUrls: json (array of S3 URLs)
  mediaTypes: json (array: image, video, audio)
  postType: enum (text, photo, video, link, poll, live)
  visibility: enum (public, friends, private, custom)
  location: string
  feeling: string (optional: happy, sad, excited, etc.)
  isEdited: boolean
  editedAt: timestamp
  language: string
  aiGenerated: boolean
  aiModerationStatus: enum (pending, approved, flagged, removed)
  createdAt: timestamp
  updatedAt: timestamp
}

stories {
  id: string
  userId: string (foreign key)
  mediaUrl: string (S3 URL)
  mediaType: enum (image, video)
  duration: integer (seconds)
  expiresAt: timestamp (24 hours from creation)
  viewCount: integer
  createdAt: timestamp
}

storyViews {
  id: string
  storyId: string (foreign key)
  viewerId: string (foreign key to users)
  viewedAt: timestamp
}

videos {
  id: string
  userId: string (foreign key)
  title: string
  description: text
  videoUrl: string (S3 URL)
  thumbnailUrl: string (S3 URL)
  duration: integer (seconds)
  videoType: enum (short, long, live, reel)
  views: integer
  visibility: enum (public, unlisted, private)
  category: string
  tags: json (array)
  language: string
  aiCaptions: text
  createdAt: timestamp
}
```

### Interaction Tables

```typescript
likes {
  id: string
  postId: string (foreign key, nullable)
  commentId: string (foreign key, nullable)
  videoId: string (foreign key, nullable)
  userId: string (foreign key)
  reactionType: enum (like, love, care, haha, wow, sad, angry)
  createdAt: timestamp
}

comments {
  id: string
  postId: string (foreign key, nullable)
  videoId: string (foreign key, nullable)
  userId: string (foreign key)
  parentCommentId: string (foreign key, nullable - for nested replies)
  content: text
  mediaUrl: string (optional S3 URL)
  isEdited: boolean
  aiModerationStatus: enum (pending, approved, flagged, removed)
  createdAt: timestamp
  updatedAt: timestamp
}

shares {
  id: string
  postId: string (foreign key)
  userId: string (foreign key)
  shareType: enum (repost, quote, story)
  quoteText: text (optional)
  visibility: enum (public, friends, private)
  createdAt: timestamp
}

bookmarks {
  id: string
  userId: string (foreign key)
  postId: string (foreign key, nullable)
  videoId: string (foreign key, nullable)
  collectionId: string (foreign key, nullable)
  createdAt: timestamp
}

collections {
  id: string
  userId: string (foreign key)
  name: string
  description: text
  isPrivate: boolean
  createdAt: timestamp
}
```

### Social Graph Tables

```typescript
follows {
  id: string
  followerId: string (foreign key to users)
  followingId: string (foreign key to users)
  status: enum (pending, accepted, blocked)
  notificationsEnabled: boolean
  createdAt: timestamp
}

friendRequests {
  id: string
  senderId: string (foreign key to users)
  receiverId: string (foreign key to users)
  status: enum (pending, accepted, rejected)
  createdAt: timestamp
  respondedAt: timestamp
}

blocks {
  id: string
  blockerId: string (foreign key to users)
  blockedId: string (foreign key to users)
  createdAt: timestamp
}
```

### Messaging Tables

```typescript
conversations {
  id: string
  type: enum (direct, group)
  name: string (for group chats)
  avatarUrl: string (for group chats)
  createdBy: string (foreign key to users)
  createdAt: timestamp
  updatedAt: timestamp
}

conversationParticipants {
  id: string
  conversationId: string (foreign key)
  userId: string (foreign key)
  role: enum (admin, member)
  joinedAt: timestamp
  lastReadAt: timestamp
  mutedUntil: timestamp (nullable)
}

messages {
  id: string
  conversationId: string (foreign key)
  senderId: string (foreign key to users)
  content: text
  mediaUrls: json (array of S3 URLs)
  messageType: enum (text, image, video, audio, file, sticker, gif)
  replyToMessageId: string (foreign key, nullable)
  isEdited: boolean
  isDeleted: boolean
  expiresAt: timestamp (for disappearing messages)
  createdAt: timestamp
  updatedAt: timestamp
}

messageReactions {
  id: string
  messageId: string (foreign key)
  userId: string (foreign key)
  emoji: string
  createdAt: timestamp
}
```

### Groups & Communities Tables

```typescript
groups {
  id: string
  name: string
  description: text
  avatarUrl: string (S3 URL)
  coverPhoto: string (S3 URL)
  privacy: enum (public, private, secret)
  category: string
  rules: text
  memberCount: integer
  createdBy: string (foreign key to users)
  createdAt: timestamp
  updatedAt: timestamp
}

groupMembers {
  id: string
  groupId: string (foreign key)
  userId: string (foreign key)
  role: enum (admin, moderator, member)
  status: enum (pending, active, banned)
  joinedAt: timestamp
}

groupPosts {
  id: string
  groupId: string (foreign key)
  postId: string (foreign key)
  isPinned: boolean
  createdAt: timestamp
}
```

### Notifications Tables

```typescript
notifications {
  id: string
  userId: string (foreign key - recipient)
  actorId: string (foreign key to users - who triggered it)
  type: enum (like, comment, share, follow, mention, message, group_invite)
  entityType: enum (post, comment, video, story, group)
  entityId: string
  content: text
  isRead: boolean
  createdAt: timestamp
}

notificationSettings {
  id: string
  userId: string (foreign key)
  notificationType: string
  enabled: boolean
  emailEnabled: boolean
  pushEnabled: boolean
}
```

### Analytics & Engagement Tables

```typescript
postAnalytics {
  id: string
  postId: string (foreign key)
  views: integer
  reach: integer
  impressions: integer
  engagement: integer
  clicks: integer
  shares: integer
  saves: integer
  date: date
}

videoAnalytics {
  id: string
  videoId: string (foreign key)
  views: integer
  watchTime: integer (seconds)
  averageViewDuration: integer
  likes: integer
  comments: integer
  shares: integer
  subscribers: integer
  date: date
}

userEngagement {
  id: string
  userId: string (foreign key)
  date: date
  postsCreated: integer
  commentsCreated: integer
  likesGiven: integer
  sharesGiven: integer
  timeSpent: integer (seconds)
  sessionsCount: integer
}
```

### AI & Moderation Tables

```typescript
aiModerationQueue {
  id: string
  contentType: enum (post, comment, video, message, profile)
  contentId: string
  userId: string (foreign key)
  flagReason: enum (spam, hate_speech, violence, nudity, misinformation)
  aiConfidence: float (0-1)
  status: enum (pending, reviewed, approved, removed)
  reviewedBy: string (foreign key to users, nullable)
  reviewedAt: timestamp
  createdAt: timestamp
}

reportedContent {
  id: string
  reporterId: string (foreign key to users)
  contentType: enum (post, comment, video, user, group)
  contentId: string
  reason: string
  description: text
  status: enum (pending, reviewed, action_taken, dismissed)
  reviewedBy: string (foreign key to users, nullable)
  reviewedAt: timestamp
  createdAt: timestamp
}

aiAssistantConversations {
  id: string
  userId: string (foreign key)
  sessionId: string
  messages: json (array of {role, content})
  context: json (page, action, etc.)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Trending & Discovery Tables

```typescript
hashtags {
  id: string
  tag: string (unique)
  useCount: integer
  trendingScore: float
  category: string
  language: string
  createdAt: timestamp
  updatedAt: timestamp
}

postHashtags {
  id: string
  postId: string (foreign key)
  hashtagId: string (foreign key)
  createdAt: timestamp
}

trendingTopics {
  id: string
  topic: string
  category: string
  region: string
  language: string
  postCount: integer
  engagementScore: float
  startedAt: timestamp
  peakedAt: timestamp
}

searchHistory {
  id: string
  userId: string (foreign key)
  query: string
  resultType: enum (users, posts, videos, groups, hashtags)
  clickedResultId: string (nullable)
  createdAt: timestamp
}
```

---

## Technical Architecture

### Frontend
- **Framework:** React 19 with TypeScript
- **Routing:** Wouter (already in use)
- **State Management:** tRPC + React Query
- **UI Components:** shadcn/ui + Tailwind CSS 4
- **Real-time:** WebSockets for live updates
- **Media Upload:** Direct S3 upload with progress tracking
- **Video Player:** Custom player with HLS streaming
- **Internationalization:** i18next for English/Arabic support

### Backend
- **API:** tRPC 11 (type-safe procedures)
- **Server:** Express 4 + Node.js
- **Database:** MySQL/TiDB via Drizzle ORM
- **Authentication:** Manus OAuth (existing)
- **File Storage:** S3 (existing Manus storage)
- **Real-time:** Socket.io for live features
- **Background Jobs:** Bull queue for async tasks
- **Caching:** Redis for feed caching and real-time features

### AI Services
- **LLM:** Manus built-in LLM (existing)
- **Content Moderation:** Custom AI moderation pipeline
- **Recommendations:** Collaborative filtering + content-based
- **Image Processing:** Sharp for image manipulation
- **Video Processing:** FFmpeg for video transcoding
- **Speech-to-Text:** Manus voice transcription (existing)

### Infrastructure
- **CDN:** For media delivery
- **Load Balancing:** For horizontal scaling
- **Database Replication:** Read replicas for analytics
- **Message Queue:** For async processing
- **Monitoring:** Error tracking and performance monitoring

---

## User Flows

### 1. Registration & Onboarding
1. User signs up via Manus OAuth
2. Create social profile (username, bio, profile picture)
3. Select language preference (English/Arabic)
4. Follow suggested users/topics
5. Complete profile setup
6. AI assistant introduces platform features

### 2. Content Creation
1. User clicks "Create Post" button
2. Choose content type (text, photo, video, live)
3. Add content with AI assistance (captions, hashtags)
4. Select visibility and audience
5. AI moderation check
6. Post published to feed

### 3. Feed Experience
1. User opens app to personalized feed
2. AI algorithm ranks content by relevance
3. Infinite scroll with lazy loading
4. Real-time updates for new content
5. Interactions (like, comment, share) update in real-time
6. AI assistant available for help

### 4. Messaging
1. User starts conversation
2. Real-time message delivery
3. Typing indicators and read receipts
4. Media sharing with preview
5. AI-powered smart replies
6. Disappearing messages option

### 5. Discovery
1. User explores trending topics
2. AI-powered recommendations
3. Search with filters
4. Hashtag following
5. Personalized "For You" page
6. Category-based browsing

---

## Multilingual Support Strategy

### Language Files Structure
```
/locales
  /en
    common.json
    feed.json
    profile.json
    messaging.json
    groups.json
  /ar
    common.json
    feed.json
    profile.json
    messaging.json
    groups.json
```

### RTL Support for Arabic
- Automatic layout direction switching
- Mirror UI components for RTL
- Font optimization for Arabic script
- Date/time formatting for Arabic locale

### Extensibility
- Easy addition of new languages
- Community translation contributions
- AI-powered translation suggestions
- Language-specific content moderation

---

## Performance Optimization

### Feed Loading
- Pagination with cursor-based approach
- Lazy loading of images/videos
- Virtual scrolling for long feeds
- Prefetching next page

### Media Delivery
- Adaptive bitrate streaming for videos
- Image optimization with WebP/AVIF
- Lazy loading with blur placeholders
- CDN caching

### Real-time Updates
- WebSocket connection pooling
- Selective subscriptions to reduce load
- Debounced updates for typing indicators
- Optimistic UI updates

### Caching Strategy
- Redis for feed caching (5-minute TTL)
- Browser caching for static assets
- Service worker for offline support
- Database query result caching

---

## Security & Privacy

### Content Moderation
- AI pre-moderation before publishing
- User reporting system
- Human review queue for flagged content
- Automated NSFW detection

### Privacy Controls
- Granular privacy settings per post
- Private accounts option
- Block and mute functionality
- Data export and deletion

### Data Protection
- End-to-end encryption for messages
- Secure file storage with access controls
- GDPR compliance
- Egyptian PDPL compliance

---

## Monetization Strategy

### Revenue Streams
1. **Premium Subscriptions** (Apex Pro)
   - Ad-free experience
   - Advanced analytics
   - Extended video uploads
   - Priority support
   
2. **Creator Monetization**
   - Ad revenue sharing
   - Fan subscriptions
   - Virtual gifts
   - Sponsored content

3. **Business Tools**
   - Pages for businesses
   - Advertising platform
   - Analytics dashboard
   - Promoted posts

4. **Marketplace**
   - Transaction fees
   - Featured listings
   - Seller tools

---

## Development Phases

### Phase 1: Core Foundation (Current)
- Database schema design ✅
- User authentication integration
- Basic profile creation
- Simple text posts
- Follow system
- Basic feed

### Phase 2: Content & Interactions
- Photo/video posts
- Comments and replies
- Reactions system
- Share functionality
- Notifications
- Search

### Phase 3: Advanced Features
- Stories
- Direct messaging
- Groups
- Live streaming
- Video platform
- Trending topics

### Phase 4: AI Integration
- AI assistant
- Content moderation
- Recommendations
- Smart features
- Analytics

### Phase 5: Multilingual & Polish
- Arabic language support
- RTL layout
- Performance optimization
- Mobile apps
- Launch

---

## Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Average session duration
- Posts per user per day
- Engagement rate (likes, comments, shares)

### Content Metrics
- Posts created daily
- Videos uploaded daily
- Stories posted daily
- Messages sent daily
- Groups created

### Growth Metrics
- New user signups
- User retention rate (D1, D7, D30)
- Viral coefficient
- App store ratings
- Social media mentions

### Business Metrics
- Revenue per user
- Premium conversion rate
- Ad revenue
- Creator earnings
- Marketplace transactions

---

## Competitive Advantages

1. **AI-First Platform:** AI assistant on every page, smart recommendations
2. **Egyptian Origin:** First major social platform from Egypt/MENA region
3. **Multilingual:** Native Arabic support with proper RTL
4. **All-in-One:** Combined features of all major platforms
5. **Privacy-Focused:** Strong privacy controls and data protection
6. **Creator-Friendly:** Better monetization for content creators
7. **Community-Driven:** Focus on meaningful connections
8. **Modern Tech Stack:** Fast, reliable, scalable infrastructure

---

## Next Steps

1. ✅ Architecture design complete
2. 🔄 Implement database schema in Drizzle
3. 🔄 Build core tRPC procedures
4. 🔄 Create user profile system
5. 🔄 Implement post creation and feed
6. 🔄 Add interactions (like, comment, share)
7. 🔄 Build messaging system
8. 🔄 Integrate AI features
9. 🔄 Add multilingual support
10. 🔄 Launch beta version

---

**Architecture Status:** ✅ COMPLETE  
**Ready for Implementation:** ✅ YES  
**Estimated Development Time:** 4-6 weeks for MVP
