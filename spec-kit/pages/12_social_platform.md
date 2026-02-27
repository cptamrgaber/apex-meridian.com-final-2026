# Pages Spec — Social Networking Platform (Zone 7)

The social platform is a standalone full-featured social network accessible at `/social/*`. It shares the same authentication system as the rest of the application.

---

## 1. Social Home — Main Feed (`/social`)

**Component:** `pages/social/SocialHome.tsx`  
**Access:** Authenticated

### Layout (Three-Column Desktop)

**Left Sidebar (240px)**
- User avatar, display name, username
- Navigation links: Home Feed, Explore, Messages, Groups, Stories, My Profile, Analytics, Settings
- Notification bell with unread count badge
- Online status indicator

**Main Feed (flexible, max 680px)**
- Post composer at the top
- Infinite-scroll post feed
- Feed filter tabs: Following / Trending / Latest

**Right Panel (300px)**
- "Who to Follow" suggestions (5 users with Follow buttons)
- Trending hashtags (top 10)
- Upcoming events or announcements

### Post Composer
A card with the user's avatar and a text input placeholder: "What's on your mind?" Clicking expands to show:
- Full textarea for post content
- Image upload button (stores to S3, max 10MB)
- Hashtag suggestions as the user types `#`
- Mention suggestions as the user types `@`
- Character counter (max 2000 characters)
- Post button (disabled until content is present)

### Post Card Structure

```
┌─────────────────────────────────────────────────┐
│ [Avatar] Display Name @username · 2h ago  [···] │
│                                                  │
│ Post content text with #hashtags and @mentions  │
│                                                  │
│ [Post image if attached]                         │
│                                                  │
│ ❤️ 42  💬 8  🔁 3  📤 Share  🚩 Report          │
└─────────────────────────────────────────────────┘
```

The `[···]` menu shows: Edit (own posts only), Delete (own posts only), Report (others' posts).

Clicking the comment count expands an inline comment thread below the post. Clicking the like button toggles the like state optimistically (updates UI immediately, syncs with server).

### Real-time Updates
New posts from followed users appear at the top of the feed with a "New posts available — click to load" banner, driven by Socket.IO `post:created` events.

---

## 2. User Profile (`/social/profile/:username`)

**Component:** `pages/social/UserProfile.tsx`  
**Access:** Authenticated

### Profile Header
Full-width cover photo (1200×400px). Overlapping circular profile picture (120px diameter). Below the cover: display name (bold, large), username (muted, smaller), bio text, location, website (clickable), join date.

**Verification Badges** (shown inline next to username):
- ✅ Phone verified (cyan checkmark)
- 🛡️ KYC verified (gold shield)

**Stats Row:** Posts count · Followers count · Following count (all clickable to open a modal list)

**Action Buttons (viewing another user's profile):**
- Follow / Unfollow (primary button, toggles)
- Message (outline button, links to `/social/messages?user=username`)

**Action Buttons (own profile):**
- Edit Profile (links to `/social/settings`)
- View Analytics (links to `/social/analytics`)

### Content Tabs
Three tabs below the header:
- **Posts** — Grid or list of the user's posts
- **Media** — Grid of posts that contain images
- **Likes** — Posts the user has liked (only visible on own profile)

---

## 3. Messages (`/social/messages`)

**Component:** `pages/social/Messages.tsx`  
**Access:** Authenticated

### Layout (Two-Column)

**Left Panel — Conversation List (320px)**
Searchable list of all conversations. Each item shows:
- Contact avatar with online status dot (green = online)
- Display name and username
- Last message preview (truncated to 1 line)
- Timestamp of last message
- Unread message count badge (blue circle)

**Right Panel — Active Conversation**
- Header: contact avatar, name, online status, video call icon, voice call icon
- Message history (infinite scroll upward for older messages)
- Message input bar at the bottom

### Message Bubble Design
Own messages: right-aligned, cyan/blue background.  
Other's messages: left-aligned, dark card background.  
Each bubble shows: message content, timestamp (on hover), read receipt (✓ sent, ✓✓ delivered, ✓✓ blue = read).

### Message Actions (right-click or long-press)
- React with emoji
- Edit (own messages, within 15 minutes)
- Delete (own messages, soft-delete shows "Message deleted")
- Reply (quotes the message)

### File Sharing
Clicking the paperclip icon opens a file picker. Supported: images, PDFs, documents. Max size: 16MB. Files are uploaded to S3 and displayed as a preview card in the conversation.

### WebRTC Video/Voice Calling
Clicking the video or voice call icon initiates a call:
1. Caller sees "Calling [Name]..." overlay
2. Callee receives an incoming call modal with Accept and Reject buttons
3. On accept, WebRTC peer connection is established using STUN servers
4. Call UI shows: video feed(s), mute button, camera toggle, end call button, duration timer
5. On end/reject, both parties return to the message view

**Socket.IO events used:** `call:initiate`, `call:accept`, `call:reject`, `call:end`, `webrtc:offer`, `webrtc:answer`, `webrtc:ice-candidate`

---

## 4. Groups (`/social/groups`)

**Component:** `pages/social/Groups.tsx`  
**Access:** Authenticated

### Tabs
- **My Groups** — Groups the user is a member of
- **Discover** — All public groups, sorted by member count
- **Trending** — Groups with most activity in the last 7 days
- **Suggested** — Personalised recommendations based on interests

### Group Card

```
┌──────────────────────────────────────┐
│ [Cover Photo]                        │
│                                      │
│ Group Name                [Public]   │
│ 1,234 members                        │
│ Short group description...           │
│                                      │
│ [Join Group]                         │
└──────────────────────────────────────┘
```

Privacy badges: `Public` (green), `Private` (yellow), `Secret` (red — only visible to members).

### Create Group Button
Opens a modal form:
- Group Name (required)
- Description (required)
- Privacy Level (radio: Public / Private / Secret)
- Category (dropdown: Technology, Science, Business, Education, Entertainment, Sports, Other)
- Cover Photo (optional, S3 upload)

---

## 5. Group Detail (`/social/groups/:id`)

**Component:** `pages/social/GroupDetail.tsx`  
**Access:** Authenticated (Secret groups: members only)

### Group Header
Cover photo, group name, privacy badge, member count, description, created date.

**Action Buttons (non-member):** Join Group (public) / Request to Join (private)  
**Action Buttons (member):** Leave Group, Invite Members  
**Action Buttons (admin):** Edit Group, Manage Members, Delete Group

### Tabs
- **Posts** — Group post feed with composer (members only)
- **Members** — List of all members with role badges (Admin, Moderator, Member)
- **About** — Group description, rules, and category

### Group Post Composer
Same as main feed composer but posts are scoped to the group. Admins and moderators can pin posts (shown at the top with a 📌 icon).

### Member Management (Admin only)
In the Members tab, each member row has a dropdown: Assign Moderator, Remove Moderator, Remove from Group. Join requests (for private groups) appear in a separate "Pending Requests" section with Approve/Reject buttons.

---

## 6. Explore (`/social/explore`)

**Component:** `pages/social/Explore.tsx`  
**Access:** Authenticated

### Search Bar
Prominent search input at the top. As the user types, results appear in real-time across four categories shown as tabs:

- **Posts** — Posts containing the search term
- **Users** — Users matching the name or username
- **Hashtags** — Hashtags matching the search term with post count
- **Groups** — Groups matching the name or description

### Trending Section (when search is empty)
- Top 10 trending hashtags with post counts
- 5 suggested users to follow
- 3 featured groups

---

## 7. Stories (`/social/stories`)

**Component:** `pages/social/Stories.tsx`  
**Access:** Authenticated

### Story Viewer
Full-screen overlay with:
- Progress bar at the top (one segment per story, fills over 5 seconds)
- User avatar and name (top-left)
- Close button (top-right)
- Tap left half to go back, tap right half to advance
- Hold to pause

### Story Creator
A "+" button on the user's story ring opens the creator:
- Upload image or video (max 30 seconds)
- Text overlay tool (tap to add text, choose colour and size)
- Sticker picker
- Post Story button

Stories expire after 24 hours. The system runs a cleanup job to delete expired stories from S3 and the database.

---

## 8. Creator Analytics (`/social/analytics`)

**Component:** `pages/social/CreatorAnalytics.tsx`  
**Access:** Authenticated

### Overview Cards Row
Four metric cards: Total Views (last 30 days), Total Likes, Total Comments, Follower Growth (+/- vs previous period).

### Charts Section

| Chart | Type | Data |
|---|---|---|
| Views Over Time | Line chart | Daily views for last 30 days |
| Engagement by Post Type | Bar chart | Likes/comments/shares per post type |
| Best Time to Post | Heatmap | Engagement rate by day and hour |
| Follower Growth | Area chart | Cumulative followers over 90 days |

### Top Posts Table
Columns: Post preview (first 50 chars), Views, Likes, Comments, Shares, Engagement Rate (%), Date Posted. Sortable by any column.

### Date Range Filter
Preset options: Last 7 days, Last 30 days, Last 90 days, Custom range.

### Export
"Export CSV" button downloads all metrics as a CSV file.

---

## 9. Notification Settings (`/social/notifications/settings`)

**Component:** `pages/social/NotificationSettings.tsx`  
**Access:** Authenticated

### Notification Preference Matrix
A table where rows are notification types and columns are delivery channels:

| Notification Type | In-App | Email | Frequency |
|---|---|---|---|
| Likes | Toggle | Toggle | Instant / Hourly / Daily |
| Comments | Toggle | Toggle | Instant / Hourly / Daily |
| Mentions | Toggle | Toggle | Instant / Hourly / Daily |
| New Followers | Toggle | Toggle | Instant / Hourly / Daily |
| Direct Messages | Toggle | Toggle | Instant / Hourly / Daily |
| Group Activity | Toggle | Toggle | Instant / Hourly / Daily |

### Quiet Hours
Two time pickers: "Do Not Disturb From" and "Until". During quiet hours, no push or email notifications are sent.

### Muted Users
A list of users the current user has muted. Each row shows the user's avatar, name, and an "Unmute" button. A search field allows adding new users to mute.

---

## 10. Phone Verification (`/social/verify-phone`)

**Component:** `pages/social/PhoneVerification.tsx`  
**Access:** Authenticated

### Step 1 — Enter Phone Number
Input field for phone number with Egyptian country code (+20) pre-selected. "Send OTP" button.

### Step 2 — Enter OTP
Six-digit OTP input (auto-advances between digits). 60-second countdown timer with "Resend OTP" link (enabled after countdown). "Verify" button.

On success: `socialProfiles.phoneVerified` is set to `true`, a ✅ badge appears on the profile, and the user is redirected to their profile page.

---

## 11. KYC Submission (`/social/kyc-submission`)

**Component:** `pages/social/KYCSubmission.tsx`  
**Access:** Authenticated

### Step 1 — Personal Information
Fields: Full Legal Name, Date of Birth, ID Number, Home Address.

### Step 2 — Document Upload
Four upload zones (drag-and-drop or click):
- National ID Front
- National ID Back
- Selfie with ID (live photo preferred)
- Optional: Passport or Driver's License

Each upload accepts JPG/PNG/PDF, max 5MB. Files are uploaded to S3 immediately on selection and the URL is stored.

### Step 3 — Review & Submit
Summary of entered information and uploaded documents. Checkbox: "I confirm all information is accurate." Submit button.

On submission, a `kycDocuments` record is created with status `pending`. The admin KYC review dashboard (`/admin/kyc-review`) shows the new submission.

### Status Tracking
If the user has already submitted, this page shows their current status:
- **Pending Review** — "Your documents are under review. This typically takes 1–3 business days."
- **Approved** — "Your identity has been verified." with the 🛡️ badge shown.
- **Rejected** — "Your submission was rejected: [reason]." with a "Resubmit" button.

---

*Next: See `features/` directory for deep-dive feature specifications.*
