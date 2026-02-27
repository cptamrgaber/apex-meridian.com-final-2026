-- ============================================================
-- Apex Meridian — MySQL Initialization Script
-- This runs automatically when the MySQL container first starts
-- ============================================================

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `apex_meridian` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant privileges to the app user
GRANT ALL PRIVILEGES ON `apex_meridian`.* TO 'apexuser'@'%';
FLUSH PRIVILEGES;

-- Use the database
USE `apex_meridian`;

-- Note: Tables are created by Drizzle ORM migrations.
-- Run: docker-compose exec app pnpm db:push
-- after the containers are running for the first time.
