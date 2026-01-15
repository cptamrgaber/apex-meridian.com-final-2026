CREATE TABLE `jobApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobTitle` varchar(200) NOT NULL,
	`department` varchar(100) NOT NULL,
	`fullName` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`linkedIn` varchar(500),
	`yearsOfExperience` int NOT NULL,
	`resumeUrl` varchar(1000) NOT NULL,
	`coverLetter` text,
	`status` enum('pending','reviewing','interviewed','accepted','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobApplications_id` PRIMARY KEY(`id`)
);
