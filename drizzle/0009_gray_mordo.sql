ALTER TABLE `messages` ADD `isRead` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `messages` ADD `readAt` timestamp;