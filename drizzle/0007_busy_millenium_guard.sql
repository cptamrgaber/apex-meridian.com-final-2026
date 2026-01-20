CREATE TABLE `egyptianPaymentReferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`referenceNumber` varchar(100) NOT NULL,
	`paymentMethod` enum('fawry','instapay','vodafone_cash','orange_money','bank_transfer') NOT NULL,
	`amount` int NOT NULL,
	`planCategory` varchar(100) NOT NULL,
	`planName` varchar(100) NOT NULL,
	`status` enum('pending','verified','expired') NOT NULL DEFAULT 'pending',
	`expiresAt` timestamp NOT NULL,
	`verifiedAt` timestamp,
	`instructions` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `egyptianPaymentReferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `egyptianPaymentReferences_referenceNumber_unique` UNIQUE(`referenceNumber`)
);
--> statement-breakpoint
CREATE TABLE `paymentTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subscriptionId` int,
	`paymentMethod` enum('stripe','fawry','instapay','vodafone_cash','orange_money','bank_transfer','cash') NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EGP',
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`transactionId` varchar(255),
	`referenceNumber` varchar(100),
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentTransactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stripeCustomers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeCustomerId` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(200),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stripeCustomers_id` PRIMARY KEY(`id`),
	CONSTRAINT `stripeCustomers_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `stripeCustomers_stripeCustomerId_unique` UNIQUE(`stripeCustomerId`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`planCategory` varchar(100) NOT NULL,
	`planName` varchar(100) NOT NULL,
	`billingPeriod` enum('monthly','annual') NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'EGP',
	`status` enum('active','canceled','past_due','unpaid','trialing') NOT NULL DEFAULT 'active',
	`currentPeriodStart` timestamp NOT NULL,
	`currentPeriodEnd` timestamp NOT NULL,
	`cancelAtPeriodEnd` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
