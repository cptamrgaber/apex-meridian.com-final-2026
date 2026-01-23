ALTER TABLE `aiModerationQueue` MODIFY COLUMN `aiConfidence` decimal(3,2);--> statement-breakpoint
ALTER TABLE `aiModerationQueue` MODIFY COLUMN `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `aiModerationQueue` ADD `reportedBy` int;--> statement-breakpoint
ALTER TABLE `aiModerationQueue` ADD `reason` text;--> statement-breakpoint
ALTER TABLE `aiModerationQueue` ADD `violationType` enum('hate_speech','harassment','spam','sexual_content','violence','illegal','none');--> statement-breakpoint
ALTER TABLE `aiModerationQueue` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `aiModerationQueue` DROP COLUMN `flagReason`;