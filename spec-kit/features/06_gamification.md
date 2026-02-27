# Feature Spec — Gamification System

The gamification system rewards user engagement on the social platform through a reputation points system and 15 achievement badges.

---

## 1. Reputation Points System

### Point Awards

| Action | Points | Trigger |
|---|---|---|
| Create a post | +10 | `posts.create` mutation |
| Receive a like on post | +2 | `likes.toggle` mutation (like) |
| Receive a comment on post | +3 | `comments.create` mutation |
| Post is shared | +5 | `shares.create` mutation |
| Receive a like on comment | +1 | `likes.toggle` mutation (comment like) |
| Complete phone verification | +25 | `phoneVerification.verifyOTP` mutation |
| Complete KYC verification | +50 | Admin approves KYC |
| First follower | +10 | `follows.toggle` mutation |
| Reach 100 followers | +50 | Checked in `follows.toggle` |
| Reach 1,000 followers | +100 | Checked in `follows.toggle` |

### Point Deductions

| Action | Points | Trigger |
|---|---|---|
| Post removed by moderator | -20 | Moderation action |
| Reported content confirmed | -10 | Report resolved with action |
| Account warning issued | -15 | Admin action |

### Reputation Tiers

| Tier | Points Range | Label | Badge Colour |
|---|---|---|---|
| Newcomer | 0–99 | Newcomer | Gray |
| Contributor | 100–499 | Contributor | Bronze |
| Active Member | 500–1,499 | Active Member | Silver |
| Top Contributor | 1,500–4,999 | Top Contributor | Gold |
| Influencer | 5,000–14,999 | Influencer | Platinum |
| Legend | 15,000+ | Legend | Diamond |

---

## 2. Badge System (15 Badges)

Each badge has a unique icon, name, description, and award criteria. Badges are checked server-side after relevant actions.

| # | Badge Name | Icon | Criteria | Checked After |
|---|---|---|---|---|
| 1 | First Post | 📝 | Create your first post | `posts.create` |
| 2 | Century Likes | ❤️ | Receive 100 total likes | `likes.toggle` |
| 3 | Verified Member | ✅ | Complete both phone and KYC verification | KYC approval |
| 4 | Top Contributor | ⭐ | Reach 1,500 reputation points | Any point award |
| 5 | Social Butterfly | 🦋 | Follow 100 or more users | `follows.toggle` |
| 6 | Conversation Starter | 💬 | Post 100 or more comments | `comments.create` |
| 7 | Rising Star | 🌟 | Reach 500 followers | `follows.toggle` |
| 8 | Influencer | 🎯 | Reach 5,000 followers | `follows.toggle` |
| 9 | Content Creator | 🎨 | Publish 100 or more posts | `posts.create` |
| 10 | Early Adopter | 🚀 | Join within the first 30 days of platform launch | Account creation |
| 11 | Group Leader | 👑 | Create and maintain a group with 10+ members | `groups.create` / member join |
| 12 | Helpful | 🤝 | Receive 50 upvotes on comments | `likes.toggle` (comment) |
| 13 | Trendsetter | 🔥 | A single post reaches 10,000 views | `postViews` count check |
| 14 | Consistent | 📅 | Post at least once per day for 30 consecutive days | `posts.create` (daily check) |
| 15 | Supporter | 💪 | Like 1,000 or more posts | `likes.toggle` |

### Badge Award Flow

```
User action triggers mutation
        │
        ▼
Server-side: gamification.checkAchievements(userId) called
        │
        ▼
For each badge, query the relevant metric
        │
        ├── Criteria met AND badge not yet awarded?
        │           │
        │           ▼
        │   INSERT into userBadges
        │   Award bonus reputation points (+25 per badge)
        │   Create notification: "You earned the [Badge Name] badge!"
        │   Emit Socket.IO notification event
        │
        └── Criteria not met → no action
```

---

## 3. Leaderboard

The leaderboard ranks users by total reputation points and is accessible at `/social/leaderboard`.

### Leaderboard Query Logic

```sql
-- All-time leaderboard
SELECT ur.userId, ur.totalPoints, ur.rank,
       sp.username, sp.displayName, sp.profilePicture,
       COUNT(ub.id) as badgeCount
FROM userReputation ur
JOIN socialProfiles sp ON ur.userId = sp.userId
LEFT JOIN userBadges ub ON ur.userId = ub.userId
GROUP BY ur.userId
ORDER BY ur.totalPoints DESC
LIMIT 100;
```

For weekly/monthly leaderboards, the query sums `reputationHistory.points` where `createdAt` falls within the selected timeframe.

### Leaderboard Entry Display

Each row shows: rank number, avatar, display name, username, reputation points, badge count, and a "Follow" button (if not already following).

The current user's row is highlighted with a cyan border, even if they are outside the top 100, by appending their entry at the bottom with their actual rank.

---

## 4. Reputation History

Every point change is recorded in `reputationHistory` with the reason. Users can view their own history in their profile settings. The history shows: date, action description, points change (+/-), and running total.

---

*See `features/04_content_moderation.md` for the moderation system that can deduct reputation points.*
