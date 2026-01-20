import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  profilePicture: text("profilePicture"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  
  // OAuth provider IDs
  googleId: varchar("googleId", { length: 255 }).unique(),
  microsoftId: varchar("microsoftId", { length: 255 }).unique(),
  githubId: varchar("githubId", { length: 255 }).unique(),
  
  // Contact verification
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  whatsappNumber: varchar("whatsappNumber", { length: 20 }),
  isEmailVerified: int("isEmailVerified").default(0).notNull(),
  isPhoneVerified: int("isPhoneVerified").default(0).notNull(),
  isWhatsappVerified: int("isWhatsappVerified").default(0).notNull(),
  
  // Verification codes (temporary storage)
  emailVerificationCode: varchar("emailVerificationCode", { length: 10 }),
  phoneVerificationCode: varchar("phoneVerificationCode", { length: 10 }),
  whatsappVerificationCode: varchar("whatsappVerificationCode", { length: 10 }),
  verificationCodeExpiry: timestamp("verificationCodeExpiry"),
  
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Employees table for internal company authentication
 * Separate from Manus OAuth users table
 */
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // Hashed password
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  department: varchar("department", { length: 100 }),
  role: mysqlEnum("role", ["admin", "employee", "hr"]).default("employee").notNull(),
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastLogin: timestamp("lastLogin"),
});

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = typeof employees.$inferInsert;

/**
 * Job applications table for career applications
 */
export const jobApplications = mysqlTable("jobApplications", {
  id: int("id").autoincrement().primaryKey(),
  jobTitle: varchar("jobTitle", { length: 200 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  fullName: varchar("fullName", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  linkedIn: varchar("linkedIn", { length: 500 }),
  yearsOfExperience: int("yearsOfExperience").notNull(),
  resumeUrl: varchar("resumeUrl", { length: 1000 }).notNull(), // S3 URL
  coverLetter: text("coverLetter"),
  status: mysqlEnum("status", ["pending", "reviewing", "interviewed", "accepted", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = typeof jobApplications.$inferInsert;
/**
 * Employee requests table for vacation, duty assignments, and reports
 */
export const employeeRequests = mysqlTable("employeeRequests", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  employeeName: varchar("employeeName", { length: 200 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  requestType: mysqlEnum("requestType", ["vacation", "duty_assignment", "report", "other"]).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  hrNotes: text("hrNotes"),
  reviewedBy: int("reviewedBy"), // Employee ID of HR who reviewed
  reviewedByName: varchar("reviewedByName", { length: 200 }),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmployeeRequest = typeof employeeRequests.$inferSelect;
export type InsertEmployeeRequest = typeof employeeRequests.$inferInsert;

/**
 * Department projects table for tracking progress
 */
export const departmentProjects = mysqlTable("departmentProjects", {
  id: int("id").autoincrement().primaryKey(),
  department: varchar("department", { length: 100 }).notNull(),
  projectName: varchar("projectName", { length: 200 }).notNull(),
  description: text("description").notNull(),
  status: mysqlEnum("status", ["planning", "in_progress", "on_hold", "completed"]).default("planning").notNull(),
  progress: int("progress").default(0).notNull(), // 0-100
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  teamMembers: text("teamMembers"), // JSON array of employee IDs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DepartmentProject = typeof departmentProjects.$inferSelect;
export type InsertDepartmentProject = typeof departmentProjects.$inferInsert;

/**
 * Company documents table for policies, manuals, and regulations
 */
export const companyDocuments = mysqlTable("companyDocuments", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  category: mysqlEnum("category", ["policy", "manual", "regulation", "handbook", "procedure", "guideline"]).notNull(),
  department: varchar("department", { length: 100 }), // null = company-wide
  description: text("description"),
  content: text("content").notNull(), // Markdown content
  fileUrl: varchar("fileUrl", { length: 1000 }), // Optional PDF/file URL
  version: varchar("version", { length: 20 }).default("1.0").notNull(),
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = archived
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CompanyDocument = typeof companyDocuments.$inferSelect;
export type InsertCompanyDocument = typeof companyDocuments.$inferInsert;

/**
 * Newsletter subscribers table for research updates and blog notifications
 */
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 200 }),
  interests: text("interests"), // JSON array of topics (AI, ML, Quantum, etc.)
  isActive: int("isActive").default(1).notNull(), // 1 = subscribed, 0 = unsubscribed
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
  lastEmailSent: timestamp("lastEmailSent"),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Subscriptions table for tracking user subscriptions
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  planCategory: varchar("planCategory", { length: 100 }).notNull(), // individual, small_business, enterprise, saas
  planName: varchar("planName", { length: 100 }).notNull(), // starter, professional, expert, etc.
  billingPeriod: mysqlEnum("billingPeriod", ["monthly", "annual"]).notNull(),
  amount: int("amount").notNull(), // Amount in EGP cents
  currency: varchar("currency", { length: 3 }).default("EGP").notNull(),
  status: mysqlEnum("status", ["active", "canceled", "past_due", "unpaid", "trialing"]).default("active").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  cancelAtPeriodEnd: int("cancelAtPeriodEnd").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Payment transactions table for all payment methods (Stripe, Fawry, Vodafone Cash, etc.)
 */
export const paymentTransactions = mysqlTable("paymentTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subscriptionId: int("subscriptionId"),
  paymentMethod: mysqlEnum("paymentMethod", [
    "stripe",
    "fawry",
    "instapay",
    "vodafone_cash",
    "orange_money",
    "bank_transfer",
    "cash"
  ]).notNull(),
  amount: int("amount").notNull(), // Amount in smallest currency unit (cents/piasters)
  currency: varchar("currency", { length: 3 }).default("EGP").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  transactionId: varchar("transactionId", { length: 255 }), // External transaction ID
  referenceNumber: varchar("referenceNumber", { length: 100 }), // For offline payments
  metadata: text("metadata"), // JSON for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type InsertPaymentTransaction = typeof paymentTransactions.$inferInsert;

/**
 * Stripe customers table for mapping users to Stripe customer IDs
 */
export const stripeCustomers = mysqlTable("stripeCustomers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

/**
 * Egyptian payment references table for offline payment tracking
 */
export const egyptianPaymentReferences = mysqlTable("egyptianPaymentReferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  referenceNumber: varchar("referenceNumber", { length: 100 }).notNull().unique(),
  paymentMethod: mysqlEnum("paymentMethod", [
    "fawry",
    "instapay",
    "vodafone_cash",
    "orange_money",
    "bank_transfer"
  ]).notNull(),
  amount: int("amount").notNull(), // Amount in EGP cents
  planCategory: varchar("planCategory", { length: 100 }).notNull(),
  planName: varchar("planName", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["pending", "verified", "expired"]).default("pending").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  instructions: text("instructions"), // Payment instructions for user
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EgyptianPaymentReference = typeof egyptianPaymentReferences.$inferSelect;
export type InsertEgyptianPaymentReference = typeof egyptianPaymentReferences.$inferInsert;
