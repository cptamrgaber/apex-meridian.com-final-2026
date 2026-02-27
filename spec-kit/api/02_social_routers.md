# API Spec — Social Platform Routers

All procedures use tRPC 11. Protected procedures require a valid JWT cookie. Input is validated with Zod. All timestamps returned are UTC milliseconds.

---

## Posts Router (`trpc.posts.*`)

### `posts.getFeed`
**Type:** Protected Query  
**Input:** `{ cursor?: number, filter: 'following' | 'trending' | 'latest', limit?: number }`  
**Output:** `{ posts: Post[], nextCursor: number | null }`  
**Description:** Returns paginated posts for the main feed. `following` returns posts from users the caller follows. `trending` returns posts ranked by engagement in the last 24 hours. `latest` returns all posts sorted by `createdAt` DESC.

### `posts.getById`
**Type:** Protected Query  
**Input:** `{ id: number }`  
**Output:** `Post & { likeCount: number, commentCount: number, isLiked: boolean }`

### `posts.getByUser`
**Type:** Protected Query  
**Input:** `{ username: string, cursor?: number, tab: 'posts' | 'media' | 'likes' }`  
**Output:** `{ posts: Post[], nextCursor: number | null }`

### `posts.getByGroup`
**Type:** Protected Query  
**Input:** `{ groupId: number, cursor?: number }`  
**Output:** `{ posts: Post[], nextCursor: number | null }`

### `posts.create`
**Type:** Protected Mutation  
**Input:** `{ content: string, imageUrl?: string, groupId?: number }`  
**Output:** `Post`  
**Side effects:** Emits `post:created` Socket.IO event to followers. Parses hashtags and creates `postHashtags` records. Parses @mentions and creates `postMentions` records and notifications. Awards 10 reputation points to author.

### `posts.update`
**Type:** Protected Mutation  
**Input:** `{ id: number, content: string, imageUrl?: string }`  
**Output:** `Post`  
**Authorization:** Only the post author can update.

### `posts.delete`
**Type:** Protected Mutation  
**Input:** `{ id: number }`  
**Output:** `{ success: boolean }`  
**Authorization:** Post author or group admin/moderator.  
**Side effects:** Soft-deletes (sets `isDeleted = true`). Emits `post:deleted` event.

---

## Comments Router (`trpc.comments.*`)

### `comments.getByPost`
**Type:** Protected Query  
**Input:** `{ postId: number, cursor?: number }`  
**Output:** `{ comments: CommentWithReplies[], nextCursor: number | null }`  
**Description:** Returns top-level comments with their nested replies (max 2 levels deep).

### `comments.create`
**Type:** Protected Mutation  
**Input:** `{ postId: number, content: string, parentId?: number }`  
**Output:** `Comment`  
**Side effects:** Creates notification for post author (type: `comment`). If `parentId` is set, creates notification for parent comment author (type: `mention`). Awards 3 reputation points to author. Emits `comment:created` Socket.IO event.

### `comments.update`
**Type:** Protected Mutation  
**Input:** `{ id: number, content: string }`  
**Authorization:** Comment author only.

### `comments.delete`
**Type:** Protected Mutation  
**Input:** `{ id: number }`  
**Authorization:** Comment author, post author, or group admin/moderator.

---

## Likes Router (`trpc.likes.*`)

### `likes.toggle`
**Type:** Protected Mutation  
**Input:** `{ postId?: number, commentId?: number }`  
**Output:** `{ liked: boolean, likeCount: number }`  
**Description:** Toggles the like state. If not liked, creates a like record and a notification for the content author. If already liked, deletes the like record. Awards/removes 2 reputation points.  
**Side effects:** Emits `post:liked` or `post:unliked` Socket.IO event.

---

## Follows Router (`trpc.follows.*`)

### `follows.toggle`
**Type:** Protected Mutation  
**Input:** `{ userId: number }`  
**Output:** `{ following: boolean, followerCount: number }`  
**Description:** Follows or unfollows the target user. Creates a `follow` notification for the target user.

### `follows.getFollowers`
**Type:** Protected Query  
**Input:** `{ userId: number, cursor?: number }`  
**Output:** `{ users: UserPreview[], nextCursor: number | null }`

### `follows.getFollowing`
**Type:** Protected Query  
**Input:** `{ userId: number, cursor?: number }`  
**Output:** `{ users: UserPreview[], nextCursor: number | null }`

### `follows.getSuggestions`
**Type:** Protected Query  
**Input:** `{ limit?: number }`  
**Output:** `UserPreview[]`  
**Description:** Returns users not yet followed, ranked by mutual followers and engagement.

---

## Groups Router (`trpc.groups.*`)

### `groups.getAll`
**Type:** Protected Query  
**Input:** `{ cursor?: number, category?: string, search?: string }`  
**Output:** `{ groups: Group[], nextCursor: number | null }`  
**Description:** Returns all public groups. Secret groups are excluded.

### `groups.getById`
**Type:** Protected Query  
**Input:** `{ id: number }`  
**Output:** `Group & { memberCount: number, isMember: boolean, userRole: 'admin' | 'moderator' | 'member' | null }`

### `groups.create`
**Type:** Protected Mutation  
**Input:** `{ name: string, description: string, privacy: 'public' | 'private' | 'secret', category: string, coverPhoto?: string }`  
**Output:** `Group`  
**Side effects:** Creates a `groupMembers` record for the creator with role `admin`. Awards "Group Leader" badge check.

### `groups.join`
**Type:** Protected Mutation  
**Input:** `{ groupId: number }`  
**Output:** `{ status: 'joined' | 'pending' }`  
**Description:** For public groups, immediately joins. For private groups, creates a join request with status `pending`.

### `groups.leave`
**Type:** Protected Mutation  
**Input:** `{ groupId: number }`  
**Authorization:** Cannot leave if you are the sole admin.

### `groups.updateMemberRole`
**Type:** Protected Mutation  
**Input:** `{ groupId: number, userId: number, role: 'moderator' | 'member' }`  
**Authorization:** Group admin only.

### `groups.removeMember`
**Type:** Protected Mutation  
**Input:** `{ groupId: number, userId: number }`  
**Authorization:** Group admin or moderator.

---

## Messages Router (`trpc.messages.*`)

### `messages.getConversations`
**Type:** Protected Query  
**Output:** `Conversation[]` sorted by `lastMessageAt` DESC, with unread count per conversation.

### `messages.getMessages`
**Type:** Protected Query  
**Input:** `{ conversationId: number, cursor?: number }`  
**Output:** `{ messages: Message[], nextCursor: number | null }`  
**Authorization:** Only participants of the conversation.

### `messages.send`
**Type:** Protected Mutation  
**Input:** `{ recipientId: number, content?: string, fileUrl?: string, fileType?: string }`  
**Output:** `Message`  
**Description:** Finds or creates a conversation between the two users, then creates the message.  
**Side effects:** Emits `message:sent` Socket.IO event to the recipient. Creates a `message` notification.

### `messages.edit`
**Type:** Protected Mutation  
**Input:** `{ messageId: number, content: string }`  
**Authorization:** Message sender only, within 15 minutes of sending.  
**Side effects:** Emits `message:edited` Socket.IO event.

### `messages.delete`
**Type:** Protected Mutation  
**Input:** `{ messageId: number }`  
**Authorization:** Message sender only.  
**Side effects:** Soft-deletes. Emits `message:deleted` Socket.IO event.

### `messages.markRead`
**Type:** Protected Mutation  
**Input:** `{ conversationId: number }`  
**Description:** Marks all unread messages in the conversation as read.  
**Side effects:** Emits `message:read` Socket.IO event to the sender.

---

## Notifications Router (`trpc.notifications.*`)

### `notifications.getAll`
**Type:** Protected Query  
**Input:** `{ cursor?: number, unreadOnly?: boolean }`  
**Output:** `{ notifications: Notification[], nextCursor: number | null, unreadCount: number }`

### `notifications.markRead`
**Type:** Protected Mutation  
**Input:** `{ notificationId: number }`

### `notifications.markAllRead`
**Type:** Protected Mutation  
**Output:** `{ count: number }` — number of notifications marked read.

---

## Gamification Router (`trpc.gamification.*`)

### `gamification.getLeaderboard`
**Type:** Protected Query  
**Input:** `{ timeframe: 'all_time' | 'monthly' | 'weekly', cursor?: number }`  
**Output:** `{ entries: LeaderboardEntry[], currentUserRank: number, nextCursor: number | null }`

### `gamification.getUserReputation`
**Type:** Protected Query  
**Input:** `{ userId: number }`  
**Output:** `{ totalPoints: number, rank: number, badges: Badge[] }`

### `gamification.checkAchievements`
**Type:** Protected Mutation  
**Input:** `{ userId: number }`  
**Description:** Internal procedure called after significant user actions. Checks all 15 badge criteria and awards any newly earned badges. Called by the server after post creation, follow events, etc.

---

*See `api/03_messaging_router.md` and `api/07_realtime_events.md` for Socket.IO event specifications.*
