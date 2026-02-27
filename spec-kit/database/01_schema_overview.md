# Database Spec — Schema Overview (51 Tables)

**Database:** MySQL 8+ / TiDB  
**ORM:** Drizzle ORM  
**Schema file:** `drizzle/schema.ts`  
**Migration command:** `pnpm db:push`

All timestamps are stored as UTC-based Unix milliseconds (`bigint`). All IDs are auto-incrementing integers unless noted otherwise.

---

## Table Inventory

| # | Table Name | Zone | Row Estimate |
|---|---|---|---|
| 1 | `users` | Core | 10,000 |
| 2 | `employees` | Employee Portal | 200 |
| 3 | `socialProfiles` | Social | 10,000 |
| 4 | `posts` | Social | 500,000 |
| 5 | `comments` | Social | 2,000,000 |
| 6 | `likes` | Social | 5,000,000 |
| 7 | `follows` | Social | 100,000 |
| 8 | `stories` | Social | 50,000 |
| 9 | `storyViews` | Social | 500,000 |
| 10 | `conversations` | Messaging | 50,000 |
| 11 | `messages` | Messaging | 5,000,000 |
| 12 | `messageReactions` | Messaging | 1,000,000 |
| 13 | `groups` | Social | 5,000 |
| 14 | `groupMembers` | Social | 50,000 |
| 15 | `groupJoinRequests` | Social | 10,000 |
| 16 | `notifications` | Social | 10,000,000 |
| 17 | `notificationPreferences` | Social | 10,000 |
| 18 | `phoneVerifications` | Verification | 10,000 |
| 19 | `kycDocuments` | Verification | 5,000 |
| 20 | `moderationFlags` | Moderation | 100,000 |
| 21 | `reports` | Moderation | 50,000 |
| 22 | `postViews` | Analytics | 10,000,000 |
| 23 | `postEngagementMetrics` | Analytics | 500,000 |
| 24 | `userAnalytics` | Analytics | 300,000 |
| 25 | `badges` | Gamification | 15 |
| 26 | `userBadges` | Gamification | 100,000 |
| 27 | `userReputation` | Gamification | 10,000 |
| 28 | `reputationHistory` | Gamification | 1,000,000 |
| 29 | `employeeRequests` | Employee Portal | 10,000 |
| 30 | `departmentProjects` | Employee Portal | 500 |
| 31 | `companyDocuments` | Employee Portal | 1,000 |
| 32 | `announcements` | Employee Portal | 500 |
| 33 | `jobApplications` | Recruitment | 5,000 |
| 34 | `contactSubmissions` | CRM | 10,000 |
| 35 | `demoRequests` | CRM | 2,000 |
| 36 | `newsletterSubscriptions` | Marketing | 50,000 |
| 37 | `abTests` | Analytics | 50 |
| 38 | `abTestVariants` | Analytics | 150 |
| 39 | `abTestEvents` | Analytics | 1,000,000 |
| 40 | `pageViews` | Analytics | 10,000,000 |
| 41 | `sessions` | Analytics | 1,000,000 |
| 42 | `leads` | CRM | 5,000 |
| 43 | `subscriptions` | Billing | 1,000 |
| 44 | `invoices` | Billing | 5,000 |
| 45 | `hashtags` | Social | 100,000 |
| 46 | `postHashtags` | Social | 2,000,000 |
| 47 | `postMentions` | Social | 1,000,000 |
| 48 | `bookmarks` | Social | 500,000 |
| 49 | `shares` | Social | 200,000 |
| 50 | `blockedUsers` | Social | 50,000 |
| 51 | `mutedUsers` | Social | 100,000 |

---

## Core Tables

### `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | Unique user identifier |
| `email` | varchar(255) | UNIQUE, NOT NULL | Login email address |
| `password` | varchar(255) | NOT NULL | bcrypt-hashed password |
| `role` | enum('admin','user') | NOT NULL, DEFAULT 'user' | Access level |
| `createdAt` | bigint | NOT NULL | UTC ms timestamp |
| `updatedAt` | bigint | NOT NULL | UTC ms timestamp |

**Indexes:** `email` (unique)

---

### `employees`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `userId` | int | FK → users.id, NOT NULL | Linked user account |
| `name` | varchar(255) | NOT NULL | Full name |
| `department` | varchar(100) | NOT NULL | Department name |
| `position` | varchar(255) | NOT NULL | Job title |
| `email` | varchar(255) | NOT NULL | Work email |
| `phone` | varchar(50) | nullable | Work phone |
| `hireDate` | bigint | NOT NULL | UTC ms timestamp |
| `status` | enum('active','inactive') | NOT NULL, DEFAULT 'active' | Employment status |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `userId`, `department`, `status`

---

### `socialProfiles`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `userId` | int | FK → users.id, UNIQUE, NOT NULL | One profile per user |
| `username` | varchar(50) | UNIQUE, NOT NULL | @handle |
| `displayName` | varchar(100) | NOT NULL | Shown name |
| `bio` | text | nullable | Profile bio (max 500 chars) |
| `location` | varchar(100) | nullable | City, Country |
| `website` | varchar(255) | nullable | Personal website URL |
| `birthday` | bigint | nullable | UTC ms timestamp |
| `profilePicture` | varchar(500) | nullable | S3 URL |
| `coverPhoto` | varchar(500) | nullable | S3 URL |
| `phoneVerified` | boolean | NOT NULL, DEFAULT false | Phone OTP completed |
| `kycVerified` | boolean | NOT NULL, DEFAULT false | KYC approved |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `userId` (unique), `username` (unique)

---

### `posts`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `userId` | int | FK → users.id, NOT NULL | Author |
| `content` | text | NOT NULL | Post text (max 2000 chars) |
| `imageUrl` | varchar(500) | nullable | S3 URL for attached image |
| `groupId` | int | FK → groups.id, nullable | Group post if set |
| `isPinned` | boolean | NOT NULL, DEFAULT false | Pinned in group |
| `isDeleted` | boolean | NOT NULL, DEFAULT false | Soft delete flag |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `userId`, `groupId`, `createdAt` (DESC), `isDeleted`

---

### `comments`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `postId` | int | FK → posts.id, NOT NULL | Parent post |
| `userId` | int | FK → users.id, NOT NULL | Author |
| `content` | text | NOT NULL | Comment text (max 1000 chars) |
| `parentId` | int | FK → comments.id, nullable | For nested replies |
| `isDeleted` | boolean | NOT NULL, DEFAULT false | Soft delete |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `postId`, `userId`, `parentId`

---

### `likes`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `userId` | int | FK → users.id, NOT NULL | Who liked |
| `postId` | int | FK → posts.id, nullable | Liked post |
| `commentId` | int | FK → comments.id, nullable | Liked comment |
| `createdAt` | bigint | NOT NULL | — |

**Constraints:** CHECK that exactly one of `postId` or `commentId` is set.  
**Indexes:** `(userId, postId)` unique, `(userId, commentId)` unique

---

### `follows`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `followerId` | int | FK → users.id, NOT NULL | The follower |
| `followingId` | int | FK → users.id, NOT NULL | Being followed |
| `createdAt` | bigint | NOT NULL | — |

**Constraints:** `(followerId, followingId)` unique; `followerId ≠ followingId`  
**Indexes:** `followerId`, `followingId`

---

### `groups`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `name` | varchar(100) | NOT NULL | Group name |
| `description` | text | NOT NULL | Group description |
| `coverPhoto` | varchar(500) | nullable | S3 URL |
| `privacy` | enum('public','private','secret') | NOT NULL, DEFAULT 'public' | Visibility level |
| `category` | varchar(50) | NOT NULL | Group category |
| `creatorId` | int | FK → users.id, NOT NULL | Creator |
| `memberCount` | int | NOT NULL, DEFAULT 1 | Cached count |
| `isDeleted` | boolean | NOT NULL, DEFAULT false | Soft delete |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `creatorId`, `privacy`, `category`

---

### `groupMembers`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `groupId` | int | FK → groups.id, NOT NULL | — |
| `userId` | int | FK → users.id, NOT NULL | — |
| `role` | enum('admin','moderator','member') | NOT NULL, DEFAULT 'member' | Member role |
| `joinedAt` | bigint | NOT NULL | UTC ms timestamp |

**Constraints:** `(groupId, userId)` unique  
**Indexes:** `groupId`, `userId`

---

### `messages`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `conversationId` | int | FK → conversations.id, NOT NULL | — |
| `senderId` | int | FK → users.id, NOT NULL | — |
| `content` | text | nullable | Text content |
| `fileUrl` | varchar(500) | nullable | S3 URL for file attachment |
| `fileType` | varchar(50) | nullable | MIME type of attachment |
| `isEdited` | boolean | NOT NULL, DEFAULT false | — |
| `isDeleted` | boolean | NOT NULL, DEFAULT false | Soft delete |
| `deliveredAt` | bigint | nullable | UTC ms timestamp |
| `readAt` | bigint | nullable | UTC ms timestamp |
| `createdAt` | bigint | NOT NULL | — |
| `updatedAt` | bigint | NOT NULL | — |

**Indexes:** `conversationId`, `senderId`, `createdAt`

---

### `kycDocuments`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `userId` | int | FK → users.id, NOT NULL | Applicant |
| `documentType` | enum('national_id','passport','drivers_license','selfie') | NOT NULL | — |
| `documentUrl` | varchar(500) | NOT NULL | S3 URL |
| `fullName` | varchar(255) | NOT NULL | Legal name |
| `dateOfBirth` | bigint | NOT NULL | UTC ms timestamp |
| `idNumber` | varchar(100) | NOT NULL | ID/passport number |
| `address` | text | NOT NULL | Home address |
| `status` | enum('pending','approved','rejected') | NOT NULL, DEFAULT 'pending' | Review status |
| `reviewedBy` | int | FK → users.id, nullable | Admin reviewer |
| `reviewedAt` | bigint | nullable | — |
| `rejectionReason` | text | nullable | Reason if rejected |
| `createdAt` | bigint | NOT NULL | — |

**Indexes:** `userId`, `status`

---

### `jobApplications`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | int | PK, auto-increment | — |
| `jobTitle` | varchar(255) | NOT NULL | Position applied for |
| `department` | varchar(100) | NOT NULL | Department |
| `applicantName` | varchar(255) | NOT NULL | — |
| `applicantEmail` | varchar(255) | NOT NULL | — |
| `applicantPhone` | varchar(50) | NOT NULL | — |
| `resumeUrl` | varchar(500) | NOT NULL | S3 URL to PDF resume |
| `coverLetter` | text | NOT NULL | — |
| `linkedinProfile` | varchar(255) | nullable | — |
| `yearsExperience` | int | NOT NULL | — |
| `expectedSalary` | int | nullable | EGP per month |
| `availabilityDate` | bigint | NOT NULL | UTC ms timestamp |
| `hearAboutUs` | varchar(50) | nullable | Source |
| `status` | enum('new','reviewing','interviewed','hired','rejected') | NOT NULL, DEFAULT 'new' | — |
| `reviewedBy` | int | FK → users.id, nullable | HR reviewer |
| `notes` | text | nullable | Internal HR notes |
| `createdAt` | bigint | NOT NULL | — |

**Indexes:** `status`, `department`, `createdAt`

---

*See `database/02_social_tables.md` through `database/05_analytics_tables.md` for the remaining 30+ tables.*
