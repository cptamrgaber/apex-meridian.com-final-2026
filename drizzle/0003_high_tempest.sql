CREATE TABLE `companyDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`category` enum('policy','manual','regulation','handbook','procedure','guideline') NOT NULL,
	`department` varchar(100),
	`description` text,
	`content` text NOT NULL,
	`fileUrl` varchar(1000),
	`version` varchar(20) NOT NULL DEFAULT '1.0',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companyDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `departmentProjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`department` varchar(100) NOT NULL,
	`projectName` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`status` enum('planning','in_progress','on_hold','completed') NOT NULL DEFAULT 'planning',
	`progress` int NOT NULL DEFAULT 0,
	`startDate` timestamp,
	`endDate` timestamp,
	`teamMembers` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `departmentProjects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employeeRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`employeeName` varchar(200) NOT NULL,
	`department` varchar(100) NOT NULL,
	`requestType` enum('vacation','duty_assignment','report','other') NOT NULL,
	`title` varchar(200) NOT NULL,
	`description` text NOT NULL,
	`startDate` timestamp,
	`endDate` timestamp,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`hrNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employeeRequests_id` PRIMARY KEY(`id`)
);
