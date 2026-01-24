CREATE TABLE `kycDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`documentType` enum('passport','national_id','drivers_license','selfie') NOT NULL,
	`documentUrl` varchar(1000) NOT NULL,
	`documentNumber` varchar(100),
	`expiryDate` timestamp,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kycDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phoneVerificationOTPs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`otpCode` varchar(6) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`verified` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `phoneVerificationOTPs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `phoneNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `phoneVerified` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `phoneVerifiedAt` timestamp;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `verifiedAt` timestamp;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `kycStatus` enum('none','pending','approved','rejected') DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `kycSubmittedAt` timestamp;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `kycReviewedAt` timestamp;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `kycReviewedBy` int;--> statement-breakpoint
ALTER TABLE `socialProfiles` ADD `kycRejectionReason` text;