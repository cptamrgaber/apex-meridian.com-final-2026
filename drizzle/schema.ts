import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

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

// ============================================================================
// SOCIAL MEDIA PLATFORM SCHEMA
// ============================================================================

/**
 * Social profiles table - extends user table with social media features
 */
export const socialProfiles = mysqlTable("socialProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  displayName: varchar("displayName", { length: 200 }).notNull(),
  bio: text("bio"),
  profilePicture: varchar("profilePicture", { length: 1000 }), // S3 URL
  coverPhoto: varchar("coverPhoto", { length: 1000 }), // S3 URL
  location: varchar("location", { length: 200 }),
  website: varchar("website", { length: 500 }),
  birthDate: timestamp("birthDate"),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  phoneVerified: int("phoneVerified").default(0).notNull(),
  phoneVerifiedAt: timestamp("phoneVerifiedAt"),
  isVerified: int("isVerified").default(0).notNull(),
  verifiedAt: timestamp("verifiedAt"),
  kycStatus: mysqlEnum("kycStatus", ["none", "pending", "approved", "rejected"]).default("none").notNull(),
  kycSubmittedAt: timestamp("kycSubmittedAt"),
  kycReviewedAt: timestamp("kycReviewedAt"),
  kycReviewedBy: int("kycReviewedBy"),
  kycRejectionReason: text("kycRejectionReason"),
  isPrivate: int("isPrivate").default(0).notNull(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  followersCount: int("followersCount").default(0).notNull(),
  followingCount: int("followingCount").default(0).notNull(),
  postsCount: int("postsCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SocialProfile = typeof socialProfiles.$inferSelect;
export type InsertSocialProfile = typeof socialProfiles.$inferInsert;

/**
 * KYC Documents table - stores identity verification documents
 */
export const kycDocuments = mysqlTable("kycDocuments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  documentType: mysqlEnum("documentType", ["passport", "national_id", "drivers_license", "selfie"]).notNull(),
  documentUrl: varchar("documentUrl", { length: 1000 }).notNull(), // S3 URL
  documentNumber: varchar("documentNumber", { length: 100 }),
  expiryDate: timestamp("expiryDate"),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

export type KycDocument = typeof kycDocuments.$inferSelect;
export type InsertKycDocument = typeof kycDocuments.$inferInsert;

/**
 * Phone verification OTP table
 */
export const phoneVerificationOTPs = mysqlTable("phoneVerificationOTPs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  otpCode: varchar("otpCode", { length: 6 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  verified: int("verified").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PhoneVerificationOTP = typeof phoneVerificationOTPs.$inferSelect;
export type InsertPhoneVerificationOTP = typeof phoneVerificationOTPs.$inferInsert;

/**
 * User settings for social platform
 */
export const userSettings = mysqlTable("userSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  notificationsEnabled: int("notificationsEnabled").default(1).notNull(),
  emailNotifications: int("emailNotifications").default(1).notNull(),
  pushNotifications: int("pushNotifications").default(1).notNull(),
  privacyLevel: mysqlEnum("privacyLevel", ["public", "friends", "private"]).default("public").notNull(),
  allowMessagesFrom: mysqlEnum("allowMessagesFrom", ["everyone", "friends", "none"]).default("everyone").notNull(),
  showOnlineStatus: int("showOnlineStatus").default(1).notNull(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("dark").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSetting = typeof userSettings.$inferSelect;
export type InsertUserSetting = typeof userSettings.$inferInsert;

/**
 * Posts table - main content posts
 */
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  content: text("content"),
  mediaUrls: text("mediaUrls"), // JSON array of S3 URLs
  mediaTypes: text("mediaTypes"), // JSON array: image, video, audio
  postType: mysqlEnum("postType", ["text", "photo", "video", "link", "poll", "live"]).default("text").notNull(),
  visibility: mysqlEnum("visibility", ["public", "friends", "private", "custom"]).default("public").notNull(),
  location: varchar("location", { length: 200 }),
  feeling: varchar("feeling", { length: 50 }),
  isEdited: int("isEdited").default(0).notNull(),
  editedAt: timestamp("editedAt"),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  aiGenerated: int("aiGenerated").default(0).notNull(),
  aiModerationStatus: mysqlEnum("aiModerationStatus", ["pending", "approved", "flagged", "removed"]).default("approved").notNull(),
  likesCount: int("likesCount").default(0).notNull(),
  commentsCount: int("commentsCount").default(0).notNull(),
  sharesCount: int("sharesCount").default(0).notNull(),
  viewsCount: int("viewsCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

/**
 * Stories table - 24-hour ephemeral content
 */
export const stories = mysqlTable("stories", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mediaUrl: varchar("mediaUrl", { length: 1000 }).notNull(), // S3 URL
  mediaType: mysqlEnum("mediaType", ["image", "video"]).notNull(),
  duration: int("duration").default(5).notNull(), // seconds
  viewCount: int("viewCount").default(0).notNull(),
  expiresAt: timestamp("expiresAt").notNull(), // 24 hours from creation
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Story = typeof stories.$inferSelect;
export type InsertStory = typeof stories.$inferInsert;

/**
 * Story views tracking
 */
export const storyViews = mysqlTable("storyViews", {
  id: int("id").autoincrement().primaryKey(),
  storyId: int("storyId").notNull(),
  viewerId: int("viewerId").notNull(),
  viewedAt: timestamp("viewedAt").defaultNow().notNull(),
});

export type StoryView = typeof storyViews.$inferSelect;
export type InsertStoryView = typeof storyViews.$inferInsert;

/**
 * Videos table - long-form video content
 */
export const videos = mysqlTable("videos", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  videoUrl: varchar("videoUrl", { length: 1000 }).notNull(), // S3 URL
  thumbnailUrl: varchar("thumbnailUrl", { length: 1000 }),
  duration: int("duration").notNull(), // seconds
  videoType: mysqlEnum("videoType", ["short", "long", "live", "reel"]).default("long").notNull(),
  views: int("views").default(0).notNull(),
  visibility: mysqlEnum("visibility", ["public", "unlisted", "private"]).default("public").notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  language: varchar("language", { length: 10 }).default("en").notNull(),
  aiCaptions: text("aiCaptions"),
  likesCount: int("likesCount").default(0).notNull(),
  commentsCount: int("commentsCount").default(0).notNull(),
  sharesCount: int("sharesCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

/**
 * Likes/reactions table
 */
export const likes = mysqlTable("likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId"),
  commentId: int("commentId"),
  videoId: int("videoId"),
  reactionType: mysqlEnum("reactionType", ["like", "love", "care", "haha", "wow", "sad", "angry"]).default("like").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

/**
 * Comments table
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId"),
  videoId: int("videoId"),
  parentCommentId: int("parentCommentId"), // for nested replies
  content: text("content").notNull(),
  mediaUrl: varchar("mediaUrl", { length: 1000 }), // optional image/gif
  isEdited: int("isEdited").default(0).notNull(),
  aiModerationStatus: mysqlEnum("aiModerationStatus", ["pending", "approved", "flagged", "removed"]).default("approved").notNull(),
  likesCount: int("likesCount").default(0).notNull(),
  repliesCount: int("repliesCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Shares table
 */
export const shares = mysqlTable("shares", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  shareType: mysqlEnum("shareType", ["repost", "quote", "story"]).default("repost").notNull(),
  quoteText: text("quoteText"),
  visibility: mysqlEnum("visibility", ["public", "friends", "private"]).default("public").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Share = typeof shares.$inferSelect;
export type InsertShare = typeof shares.$inferInsert;

/**
 * Bookmarks table
 */
export const bookmarks = mysqlTable("bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId"),
  videoId: int("videoId"),
  collectionId: int("collectionId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;

/**
 * Collections table for organizing bookmarks
 */
export const collections = mysqlTable("collections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  isPrivate: int("isPrivate").default(0).notNull(),
  itemsCount: int("itemsCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = typeof collections.$inferInsert;

/**
 * Follows table - social graph
 */
export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "blocked"]).default("accepted").notNull(),
  notificationsEnabled: int("notificationsEnabled").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;

/**
 * Friend requests table
 */
export const friendRequests = mysqlTable("friendRequests", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  receiverId: int("receiverId").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  respondedAt: timestamp("respondedAt"),
});

export type FriendRequest = typeof friendRequests.$inferSelect;
export type InsertFriendRequest = typeof friendRequests.$inferInsert;

/**
 * Blocks table
 */
export const blocks = mysqlTable("blocks", {
  id: int("id").autoincrement().primaryKey(),
  blockerId: int("blockerId").notNull(),
  blockedId: int("blockedId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Block = typeof blocks.$inferSelect;
export type InsertBlock = typeof blocks.$inferInsert;

/**
 * Conversations table for messaging
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["direct", "group"]).default("direct").notNull(),
  name: varchar("name", { length: 200 }), // for group chats
  avatarUrl: varchar("avatarUrl", { length: 1000 }), // for group chats
  createdBy: int("createdBy").notNull(),
  lastMessageAt: timestamp("lastMessageAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Conversation participants table
 */
export const conversationParticipants = mysqlTable("conversationParticipants", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["admin", "member"]).default("member").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  lastReadAt: timestamp("lastReadAt"),
  mutedUntil: timestamp("mutedUntil"),
});

export type ConversationParticipant = typeof conversationParticipants.$inferSelect;
export type InsertConversationParticipant = typeof conversationParticipants.$inferInsert;

/**
 * Messages table
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderId: int("senderId").notNull(),
  content: text("content"),
  mediaUrls: text("mediaUrls"), // JSON array of S3 URLs
  messageType: mysqlEnum("messageType", ["text", "image", "video", "audio", "file", "sticker", "gif"]).default("text").notNull(),
  replyToMessageId: int("replyToMessageId"),
  isEdited: int("isEdited").default(0).notNull(),
  isDeleted: int("isDeleted").default(0).notNull(),
  isRead: int("isRead").default(0).notNull(),
  readAt: timestamp("readAt"),
  expiresAt: timestamp("expiresAt"), // for disappearing messages
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Message reactions table
 */
export const messageReactions = mysqlTable("messageReactions", {
  id: int("id").autoincrement().primaryKey(),
  messageId: int("messageId").notNull(),
  userId: int("userId").notNull(),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MessageReaction = typeof messageReactions.$inferSelect;
export type InsertMessageReaction = typeof messageReactions.$inferInsert;

/**
 * Groups table
 */
export const groups = mysqlTable("groups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  avatarUrl: varchar("avatarUrl", { length: 1000 }),
  coverPhoto: varchar("coverPhoto", { length: 1000 }),
  privacy: mysqlEnum("privacy", ["public", "private", "secret"]).default("public").notNull(),
  category: varchar("category", { length: 100 }),
  rules: text("rules"),
  memberCount: int("memberCount").default(0).notNull(),
  postCount: int("postCount").default(0).notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Group = typeof groups.$inferSelect;
export type InsertGroup = typeof groups.$inferInsert;

/**
 * Group members table
 */
export const groupMembers = mysqlTable("groupMembers", {
  id: int("id").autoincrement().primaryKey(),
  groupId: int("groupId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["admin", "moderator", "member"]).default("member").notNull(),
  status: mysqlEnum("status", ["pending", "active", "banned"]).default("active").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type GroupMember = typeof groupMembers.$inferSelect;
export type InsertGroupMember = typeof groupMembers.$inferInsert;

/**
 * Group posts table - links posts to groups
 */
export const groupPosts = mysqlTable("groupPosts", {
  id: int("id").autoincrement().primaryKey(),
  groupId: int("groupId").notNull(),
  postId: int("postId").notNull(),
  isPinned: int("isPinned").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GroupPost = typeof groupPosts.$inferSelect;
export type InsertGroupPost = typeof groupPosts.$inferInsert;

/**
 * Notifications table
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // recipient
  actorId: int("actorId").notNull(), // who triggered it
  type: mysqlEnum("type", ["like", "comment", "share", "follow", "mention", "message", "group_invite"]).notNull(),
  entityType: mysqlEnum("entityType", ["post", "comment", "video", "story", "group"]).notNull(),
  entityId: int("entityId").notNull(),
  content: text("content"),
  isRead: int("isRead").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Hashtags table
 */
export const hashtags = mysqlTable("hashtags", {
  id: int("id").autoincrement().primaryKey(),
  tag: varchar("tag", { length: 200 }).notNull().unique(),
  useCount: int("useCount").default(0).notNull(),
  trendingScore: int("trendingScore").default(0).notNull(),
  category: varchar("category", { length: 100 }),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Hashtag = typeof hashtags.$inferSelect;
export type InsertHashtag = typeof hashtags.$inferInsert;

/**
 * Post hashtags junction table
 */
export const postHashtags = mysqlTable("postHashtags", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  hashtagId: int("hashtagId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PostHashtag = typeof postHashtags.$inferSelect;
export type InsertPostHashtag = typeof postHashtags.$inferInsert;

/**
 * Trending topics table
 */
export const trendingTopics = mysqlTable("trendingTopics", {
  id: int("id").autoincrement().primaryKey(),
  topic: varchar("topic", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }),
  region: varchar("region", { length: 100 }),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  postCount: int("postCount").default(0).notNull(),
  engagementScore: int("engagementScore").default(0).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  peakedAt: timestamp("peakedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrendingTopic = typeof trendingTopics.$inferSelect;
export type InsertTrendingTopic = typeof trendingTopics.$inferInsert;

/**
 * AI moderation queue table
 */
export const aiModerationQueue = mysqlTable("aiModerationQueue", {
  id: int("id").autoincrement().primaryKey(),
  contentType: mysqlEnum("contentType", ["post", "comment", "video", "message", "profile"]).notNull(),
  contentId: int("contentId").notNull(),
  reportedBy: int("reportedBy"),
  reason: text("reason"),
  violationType: mysqlEnum("violationType", ["hate_speech", "harassment", "spam", "sexual_content", "violence", "illegal", "none"]),
  aiConfidence: decimal("aiConfidence", { precision: 3, scale: 2 }), // 0-1
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiModerationQueue = typeof aiModerationQueue.$inferSelect;
export type InsertAiModerationQueue = typeof aiModerationQueue.$inferInsert;

/**
 * Reported content table
 */
export const reportedContent = mysqlTable("reportedContent", {
  id: int("id").autoincrement().primaryKey(),
  reporterId: int("reporterId").notNull(),
  contentType: mysqlEnum("contentType", ["post", "comment", "video", "user", "group"]).notNull(),
  contentId: int("contentId").notNull(),
  reason: varchar("reason", { length: 200 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["pending", "reviewed", "action_taken", "dismissed"]).default("pending").notNull(),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReportedContent = typeof reportedContent.$inferSelect;
export type InsertReportedContent = typeof reportedContent.$inferInsert;
