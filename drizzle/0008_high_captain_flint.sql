CREATE TABLE `aiModerationQueue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentType` enum('post','comment','video','message','profile') NOT NULL,
	`contentId` int NOT NULL,
	`userId` int NOT NULL,
	`flagReason` enum('spam','hate_speech','violence','nudity','misinformation') NOT NULL,
	`aiConfidence` int NOT NULL,
	`status` enum('pending','reviewed','approved','removed') NOT NULL DEFAULT 'pending',
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aiModerationQueue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blockerId` int NOT NULL,
	`blockedId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int,
	`videoId` int,
	`collectionId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `collections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`isPrivate` int NOT NULL DEFAULT 0,
	`itemsCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `collections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int,
	`videoId` int,
	`parentCommentId` int,
	`content` text NOT NULL,
	`mediaUrl` varchar(1000),
	`isEdited` int NOT NULL DEFAULT 0,
	`aiModerationStatus` enum('pending','approved','flagged','removed') NOT NULL DEFAULT 'approved',
	`likesCount` int NOT NULL DEFAULT 0,
	`repliesCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversationParticipants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('admin','member') NOT NULL DEFAULT 'member',
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	`lastReadAt` timestamp,
	`mutedUntil` timestamp,
	CONSTRAINT `conversationParticipants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('direct','group') NOT NULL DEFAULT 'direct',
	`name` varchar(200),
	`avatarUrl` varchar(1000),
	`createdBy` int NOT NULL,
	`lastMessageAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followingId` int NOT NULL,
	`status` enum('pending','accepted','blocked') NOT NULL DEFAULT 'accepted',
	`notificationsEnabled` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `friendRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`senderId` int NOT NULL,
	`receiverId` int NOT NULL,
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`respondedAt` timestamp,
	CONSTRAINT `friendRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groupMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('admin','moderator','member') NOT NULL DEFAULT 'member',
	`status` enum('pending','active','banned') NOT NULL DEFAULT 'active',
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `groupMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groupPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`postId` int NOT NULL,
	`isPinned` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `groupPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`avatarUrl` varchar(1000),
	`coverPhoto` varchar(1000),
	`privacy` enum('public','private','secret') NOT NULL DEFAULT 'public',
	`category` varchar(100),
	`rules` text,
	`memberCount` int NOT NULL DEFAULT 0,
	`postCount` int NOT NULL DEFAULT 0,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hashtags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tag` varchar(200) NOT NULL,
	`useCount` int NOT NULL DEFAULT 0,
	`trendingScore` int NOT NULL DEFAULT 0,
	`category` varchar(100),
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hashtags_id` PRIMARY KEY(`id`),
	CONSTRAINT `hashtags_tag_unique` UNIQUE(`tag`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int,
	`commentId` int,
	`videoId` int,
	`reactionType` enum('like','love','care','haha','wow','sad','angry') NOT NULL DEFAULT 'like',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messageReactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`messageId` int NOT NULL,
	`userId` int NOT NULL,
	`emoji` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messageReactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`senderId` int NOT NULL,
	`content` text,
	`mediaUrls` text,
	`messageType` enum('text','image','video','audio','file','sticker','gif') NOT NULL DEFAULT 'text',
	`replyToMessageId` int,
	`isEdited` int NOT NULL DEFAULT 0,
	`isDeleted` int NOT NULL DEFAULT 0,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`actorId` int NOT NULL,
	`type` enum('like','comment','share','follow','mention','message','group_invite') NOT NULL,
	`entityType` enum('post','comment','video','story','group') NOT NULL,
	`entityId` int NOT NULL,
	`content` text,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `postHashtags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`hashtagId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `postHashtags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text,
	`mediaUrls` text,
	`mediaTypes` text,
	`postType` enum('text','photo','video','link','poll','live') NOT NULL DEFAULT 'text',
	`visibility` enum('public','friends','private','custom') NOT NULL DEFAULT 'public',
	`location` varchar(200),
	`feeling` varchar(50),
	`isEdited` int NOT NULL DEFAULT 0,
	`editedAt` timestamp,
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`aiGenerated` int NOT NULL DEFAULT 0,
	`aiModerationStatus` enum('pending','approved','flagged','removed') NOT NULL DEFAULT 'approved',
	`likesCount` int NOT NULL DEFAULT 0,
	`commentsCount` int NOT NULL DEFAULT 0,
	`sharesCount` int NOT NULL DEFAULT 0,
	`viewsCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reportedContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterId` int NOT NULL,
	`contentType` enum('post','comment','video','user','group') NOT NULL,
	`contentId` int NOT NULL,
	`reason` varchar(200) NOT NULL,
	`description` text,
	`status` enum('pending','reviewed','action_taken','dismissed') NOT NULL DEFAULT 'pending',
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reportedContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shares` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postId` int NOT NULL,
	`shareType` enum('repost','quote','story') NOT NULL DEFAULT 'repost',
	`quoteText` text,
	`visibility` enum('public','friends','private') NOT NULL DEFAULT 'public',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shares_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `socialProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`username` varchar(64) NOT NULL,
	`displayName` varchar(200) NOT NULL,
	`bio` text,
	`profilePicture` varchar(1000),
	`coverPhoto` varchar(1000),
	`location` varchar(200),
	`website` varchar(500),
	`birthDate` timestamp,
	`isVerified` int NOT NULL DEFAULT 0,
	`isPrivate` int NOT NULL DEFAULT 0,
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`followersCount` int NOT NULL DEFAULT 0,
	`followingCount` int NOT NULL DEFAULT 0,
	`postsCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `socialProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `socialProfiles_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `socialProfiles_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mediaUrl` varchar(1000) NOT NULL,
	`mediaType` enum('image','video') NOT NULL,
	`duration` int NOT NULL DEFAULT 5,
	`viewCount` int NOT NULL DEFAULT 0,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `stories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `storyViews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storyId` int NOT NULL,
	`viewerId` int NOT NULL,
	`viewedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `storyViews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trendingTopics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`topic` varchar(200) NOT NULL,
	`category` varchar(100),
	`region` varchar(100),
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`postCount` int NOT NULL DEFAULT 0,
	`engagementScore` int NOT NULL DEFAULT 0,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`peakedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `trendingTopics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`notificationsEnabled` int NOT NULL DEFAULT 1,
	`emailNotifications` int NOT NULL DEFAULT 1,
	`pushNotifications` int NOT NULL DEFAULT 1,
	`privacyLevel` enum('public','friends','private') NOT NULL DEFAULT 'public',
	`allowMessagesFrom` enum('everyone','friends','none') NOT NULL DEFAULT 'everyone',
	`showOnlineStatus` int NOT NULL DEFAULT 1,
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`theme` enum('light','dark','auto') NOT NULL DEFAULT 'dark',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`videoUrl` varchar(1000) NOT NULL,
	`thumbnailUrl` varchar(1000),
	`duration` int NOT NULL,
	`videoType` enum('short','long','live','reel') NOT NULL DEFAULT 'long',
	`views` int NOT NULL DEFAULT 0,
	`visibility` enum('public','unlisted','private') NOT NULL DEFAULT 'public',
	`category` varchar(100),
	`tags` text,
	`language` varchar(10) NOT NULL DEFAULT 'en',
	`aiCaptions` text,
	`likesCount` int NOT NULL DEFAULT 0,
	`commentsCount` int NOT NULL DEFAULT 0,
	`sharesCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
