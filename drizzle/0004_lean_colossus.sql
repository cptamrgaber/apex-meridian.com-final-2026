ALTER TABLE `employeeRequests` ADD `reviewedBy` int;--> statement-breakpoint
ALTER TABLE `employeeRequests` ADD `reviewedByName` varchar(200);--> statement-breakpoint
ALTER TABLE `employeeRequests` ADD `reviewedAt` timestamp;