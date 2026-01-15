CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(64) NOT NULL,
	`password` varchar(255) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`department` varchar(100),
	`role` enum('admin','employee','hr') NOT NULL DEFAULT 'employee',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastLogin` timestamp,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_username_unique` UNIQUE(`username`)
);
