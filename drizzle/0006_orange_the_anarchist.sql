ALTER TABLE `users` MODIFY COLUMN `openId` varchar(64);--> statement-breakpoint
ALTER TABLE `users` ADD `profilePicture` text;--> statement-breakpoint
ALTER TABLE `users` ADD `googleId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `microsoftId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `githubId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `phoneNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `whatsappNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `isEmailVerified` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `isPhoneVerified` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `isWhatsappVerified` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerificationCode` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD `phoneVerificationCode` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD `whatsappVerificationCode` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD `verificationCodeExpiry` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_googleId_unique` UNIQUE(`googleId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_microsoftId_unique` UNIQUE(`microsoftId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_githubId_unique` UNIQUE(`githubId`);