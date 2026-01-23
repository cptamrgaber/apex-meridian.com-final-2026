import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { eq, and, desc, sql, inArray, or, like } from "drizzle-orm";
import * as schema from "../../drizzle/schema";
import { storagePut } from "../storage";

export const socialRouter = router({
  // ============================================================================
  // PROFILE MANAGEMENT
  // ============================================================================

  /**
   * Get user's social profile
   */
  getProfile: publicProcedure
    .input(z.object({ username: z.string().optional(), userId: z.number().optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      
      let profile;
      if (input.username) {
        const results = await db.select().from(schema.socialProfiles)
          .where(eq(schema.socialProfiles.username, input.username))
          .limit(1);
        profile = results[0];
      } else if (input.userId) {
        const results = await db.select().from(schema.socialProfiles)
          .where(eq(schema.socialProfiles.userId, input.userId))
          .limit(1);
        profile = results[0];
      }

      if (!profile) {
        return null;
      }

      // Get user info
      const userResults = await db.select().from(schema.users)
        .where(eq(schema.users.id, profile.userId))
        .limit(1);
      const user = userResults[0];

      return {
        ...profile,
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
      };
    }),

  /**
   * Get current user's social profile
   */
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    
    const results = await db.select().from(schema.socialProfiles)
      .where(eq(schema.socialProfiles.userId, ctx.user.id))
      .limit(1);

    return results[0] || null;
  }),

  /**
   * Create or update social profile
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        username: z.string().min(3).max(64).optional(),
        displayName: z.string().min(1).max(200),
        bio: z.string().max(500).optional(),
        location: z.string().max(200).optional(),
        website: z.string().url().max(500).optional(),
        birthDate: z.string().optional(),
        isPrivate: z.boolean().optional(),
        language: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if profile exists
      const existingResults = await db.select().from(schema.socialProfiles)
        .where(eq(schema.socialProfiles.userId, ctx.user.id))
        .limit(1);
      const existingProfile = existingResults[0];

      if (existingProfile) {
        // Update existing profile
        await db
          .update(schema.socialProfiles)
          .set({
            displayName: input.displayName,
            bio: input.bio,
            location: input.location,
            website: input.website,
            birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
            isPrivate: input.isPrivate ? 1 : 0,
            language: input.language,
            updatedAt: new Date(),
          })
          .where(eq(schema.socialProfiles.userId, ctx.user.id));

        return { success: true, profile: existingProfile };
      } else {
        // Create new profile
        if (!input.username) {
          throw new Error("Username is required for new profiles");
        }

        // Check if username is taken
        const usernameResults = await db.select().from(schema.socialProfiles)
          .where(eq(schema.socialProfiles.username, input.username))
          .limit(1);
        const usernameExists = usernameResults[0];

        if (usernameExists) {
          throw new Error("Username already taken");
        }

        const [newProfile] = await db.insert(schema.socialProfiles).values({
          userId: ctx.user.id,
          username: input.username,
          displayName: input.displayName,
          bio: input.bio,
          location: input.location,
          website: input.website,
          birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
          isPrivate: input.isPrivate ? 1 : 0,
          language: input.language || "en",
        });

        return { success: true, profile: newProfile };
      }
    }),

  /**
   * Upload profile picture
   */
  uploadProfilePicture: protectedProcedure
    .input(
      z.object({
        imageData: z.string(), // base64 encoded image
        filename: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Decode base64 image
      const buffer = Buffer.from(input.imageData, "base64");

      // Upload to S3
      const fileKey = `social/profiles/${ctx.user.id}/profile-${Date.now()}.jpg`;
      const { url } = await storagePut(fileKey, buffer, "image/jpeg");

      // Update profile
      await db
        .update(schema.socialProfiles)
        .set({ profilePicture: url })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      return { success: true, url };
    }),

  /**
   * Upload cover photo
   */
  uploadCoverPhoto: protectedProcedure
    .input(
      z.object({
        imageData: z.string(), // base64 encoded image
        filename: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Decode base64 image
      const buffer = Buffer.from(input.imageData, "base64");

      // Upload to S3
      const fileKey = `social/profiles/${ctx.user.id}/cover-${Date.now()}.jpg`;
      const { url } = await storagePut(fileKey, buffer, "image/jpeg");

      // Update profile
      await db
        .update(schema.socialProfiles)
        .set({ coverPhoto: url })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      return { success: true, url };
    }),

  // ============================================================================
  // POSTS
  // ============================================================================

  /**
   * Create a new post
   */
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string().max(5000).optional(),
        mediaUrls: z.array(z.string()).optional(),
        mediaTypes: z.array(z.enum(["image", "video", "audio"])).optional(),
        postType: z.enum(["text", "photo", "video", "link", "poll", "live"]).default("text"),
        visibility: z.enum(["public", "friends", "private", "custom"]).default("public"),
        location: z.string().optional(),
        feeling: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [post] = await db.insert(schema.posts).values({
        userId: ctx.user.id,
        content: input.content,
        mediaUrls: input.mediaUrls ? JSON.stringify(input.mediaUrls) : null,
        mediaTypes: input.mediaTypes ? JSON.stringify(input.mediaTypes) : null,
        postType: input.postType,
        visibility: input.visibility,
        location: input.location,
        feeling: input.feeling,
        language: "en", // TODO: detect language
        aiModerationStatus: "approved", // TODO: implement AI moderation
      });

      // Update user's post count
      await db
        .update(schema.socialProfiles)
        .set({
          postsCount: sql`${schema.socialProfiles.postsCount} + 1`,
        })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      return { success: true, postId: post.insertId };
    }),

  /**
   * Get feed posts
   */
  getFeed: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Get posts from followed users and own posts
      const followedUsers = await db.select().from(schema.follows)
        .where(and(
          eq(schema.follows.followerId, ctx.user.id),
          eq(schema.follows.status, "accepted")
        ));

      const followedUserIds = followedUsers.map((f) => f.followingId);
      const userIds = [ctx.user.id, ...followedUserIds];

      const posts = await db.select().from(schema.posts)
        .where(and(
          inArray(schema.posts.userId, userIds),
          eq(schema.posts.aiModerationStatus, "approved")
        ))
        .orderBy(desc(schema.posts.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get user profiles for each post
      const userIds2 = Array.from(new Set(posts.map((p) => p.userId)));
      const profiles = await db.select().from(schema.socialProfiles)
        .where(inArray(schema.socialProfiles.userId, userIds2));
      const userProfilesMap = new Map(profiles.map((p) => [p.userId, p]));

      // Get like status for current user
      const postIds = posts.map((p) => p.id);
      const userLikes = await db.select().from(schema.likes)
        .where(and(
          eq(schema.likes.userId, ctx.user.id),
          inArray(schema.likes.postId, postIds)
        ));
      const likedPostIds = new Set(userLikes.map((l) => l.postId));

      return posts.map((post) => ({
        ...post,
        mediaUrls: post.mediaUrls ? JSON.parse(post.mediaUrls) : [],
        mediaTypes: post.mediaTypes ? JSON.parse(post.mediaTypes) : [],
        author: userProfilesMap.get(post.userId),
        isLikedByCurrentUser: likedPostIds.has(post.id),
      }));
    }),

  /**
   * Get single post
   */
  getPost: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const postResults = await db.select().from(schema.posts)
        .where(eq(schema.posts.id, input.postId))
        .limit(1);
      const post = postResults[0];

      if (!post) {
        return null;
      }

      // Get author profile
      const authorResults = await db.select().from(schema.socialProfiles)
        .where(eq(schema.socialProfiles.userId, post.userId))
        .limit(1);
      const author = authorResults[0];

      return {
        ...post,
        mediaUrls: post.mediaUrls ? JSON.parse(post.mediaUrls) : [],
        mediaTypes: post.mediaTypes ? JSON.parse(post.mediaTypes) : [],
        author,
      };
    }),

  /**
   * Delete post
   */
  deletePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const postResults = await db.select().from(schema.posts)
        .where(eq(schema.posts.id, input.postId))
        .limit(1);
      const post = postResults[0];

      if (!post || post.userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      // Delete post
      await db.delete(schema.posts).where(eq(schema.posts.id, input.postId));

      // Update user's post count
      await db
        .update(schema.socialProfiles)
        .set({
          postsCount: sql`${schema.socialProfiles.postsCount} - 1`,
        })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      return { success: true };
    }),

  // ============================================================================
  // LIKES & REACTIONS
  // ============================================================================

  /**
   * Like a post
   */
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        reactionType: z.enum(["like", "love", "care", "haha", "wow", "sad", "angry"]).default("like"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if already liked
      const likeResults = await db.select().from(schema.likes)
        .where(and(
          eq(schema.likes.userId, ctx.user.id),
          eq(schema.likes.postId, input.postId)
        ))
        .limit(1);
      const existingLike = likeResults[0];

      if (existingLike) {
        // Update reaction type
        await db
          .update(schema.likes)
          .set({ reactionType: input.reactionType })
          .where(eq(schema.likes.id, existingLike.id));
      } else {
        // Create new like
        await db.insert(schema.likes).values({
          userId: ctx.user.id,
          postId: input.postId,
          reactionType: input.reactionType,
        });

        // Increment post likes count
        await db
          .update(schema.posts)
          .set({
            likesCount: sql`${schema.posts.likesCount} + 1`,
          })
          .where(eq(schema.posts.id, input.postId));
      }

      return { success: true };
    }),

  /**
   * Unlike a post
   */
  unlikePost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Delete like
      await db
        .delete(schema.likes)
        .where(
          and(
            eq(schema.likes.userId, ctx.user.id),
            eq(schema.likes.postId, input.postId)
          )
        );

      // Decrement post likes count
      await db
        .update(schema.posts)
        .set({
          likesCount: sql`${schema.posts.likesCount} - 1`,
        })
        .where(eq(schema.posts.id, input.postId));

      return { success: true };
    }),

  // ============================================================================
  // COMMENTS
  // ============================================================================

  /**
   * Create a comment
   */
  createComment: protectedProcedure
    .input(
      z.object({
        postId: z.number().optional(),
        videoId: z.number().optional(),
        parentCommentId: z.number().optional(),
        content: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [comment] = await db.insert(schema.comments).values({
        userId: ctx.user.id,
        postId: input.postId,
        videoId: input.videoId,
        parentCommentId: input.parentCommentId,
        content: input.content,
        aiModerationStatus: "approved", // TODO: implement AI moderation
      });

      // Increment comments count
      if (input.postId) {
        await db
          .update(schema.posts)
          .set({
            commentsCount: sql`${schema.posts.commentsCount} + 1`,
          })
          .where(eq(schema.posts.id, input.postId));
      } else if (input.videoId) {
        await db
          .update(schema.videos)
          .set({
            commentsCount: sql`${schema.videos.commentsCount} + 1`,
          })
          .where(eq(schema.videos.id, input.videoId));
      }

      // If it's a reply, increment parent comment's replies count
      if (input.parentCommentId) {
        await db
          .update(schema.comments)
          .set({
            repliesCount: sql`${schema.comments.repliesCount} + 1`,
          })
          .where(eq(schema.comments.id, input.parentCommentId));
      }

      return { success: true, commentId: comment.insertId };
    }),

  /**
   * Get comments for a post
   */
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.number().optional(),
        videoId: z.number().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const whereConditions = [];
      if (input.postId) {
        whereConditions.push(eq(schema.comments.postId, input.postId));
      }
      if (input.videoId) {
        whereConditions.push(eq(schema.comments.videoId, input.videoId));
      }
      whereConditions.push(eq(schema.comments.aiModerationStatus, "approved"));

      const comments = await db.select().from(schema.comments)
        .where(and(...whereConditions))
        .orderBy(desc(schema.comments.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get author profiles
      const userIds = Array.from(new Set(comments.map((c) => c.userId)));
      const profiles = await db.select().from(schema.socialProfiles)
        .where(inArray(schema.socialProfiles.userId, userIds));
      const profilesMap = new Map(profiles.map((p) => [p.userId, p]));

      return comments.map((comment) => ({
        ...comment,
        author: profilesMap.get(comment.userId),
      }));
    }),

  /**
   * Delete comment
   */
  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const commentResults = await db.select().from(schema.comments)
        .where(eq(schema.comments.id, input.commentId))
        .limit(1);
      const comment = commentResults[0];

      if (!comment || comment.userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      // Delete comment
      await db.delete(schema.comments).where(eq(schema.comments.id, input.commentId));

      // Decrement comments count
      if (comment.postId) {
        await db
          .update(schema.posts)
          .set({
            commentsCount: sql`${schema.posts.commentsCount} - 1`,
          })
          .where(eq(schema.posts.id, comment.postId));
      } else if (comment.videoId) {
        await db
          .update(schema.videos)
          .set({
            commentsCount: sql`${schema.videos.commentsCount} - 1`,
          })
          .where(eq(schema.videos.id, comment.videoId));
      }

      return { success: true };
    }),

  // ============================================================================
  // FOLLOW SYSTEM
  // ============================================================================

  /**
   * Follow a user
   */
  followUser: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      if (ctx.user.id === input.userId) {
        throw new Error("Cannot follow yourself");
      }

      // Check if already following
      const followResults = await db.select().from(schema.follows)
        .where(and(
          eq(schema.follows.followerId, ctx.user.id),
          eq(schema.follows.followingId, input.userId)
        ))
        .limit(1);
      const existingFollow = followResults[0];

      if (existingFollow) {
        return { success: true, alreadyFollowing: true };
      }

      // Check if target user is private
      const targetResults = await db.select().from(schema.socialProfiles)
        .where(eq(schema.socialProfiles.userId, input.userId))
        .limit(1);
      const targetProfile = targetResults[0];

      const status = targetProfile?.isPrivate ? "pending" : "accepted";

      // Create follow
      await db.insert(schema.follows).values({
        followerId: ctx.user.id,
        followingId: input.userId,
        status,
      });

      // Update counts if accepted
      if (status === "accepted") {
        await db
          .update(schema.socialProfiles)
          .set({
            followingCount: sql`${schema.socialProfiles.followingCount} + 1`,
          })
          .where(eq(schema.socialProfiles.userId, ctx.user.id));

        await db
          .update(schema.socialProfiles)
          .set({
            followersCount: sql`${schema.socialProfiles.followersCount} + 1`,
          })
          .where(eq(schema.socialProfiles.userId, input.userId));
      }

      return { success: true, status };
    }),

  /**
   * Unfollow a user
   */
  unfollowUser: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Delete follow
      await db
        .delete(schema.follows)
        .where(
          and(
            eq(schema.follows.followerId, ctx.user.id),
            eq(schema.follows.followingId, input.userId)
          )
        );

      // Update counts
      await db
        .update(schema.socialProfiles)
        .set({
          followingCount: sql`${schema.socialProfiles.followingCount} - 1`,
        })
        .where(eq(schema.socialProfiles.userId, ctx.user.id));

      await db
        .update(schema.socialProfiles)
        .set({
          followersCount: sql`${schema.socialProfiles.followersCount} - 1`,
        })
        .where(eq(schema.socialProfiles.userId, input.userId));

      return { success: true };
    }),

  /**
   * Get followers
   */
  getFollowers: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const followers = await db.select().from(schema.follows)
        .where(and(
          eq(schema.follows.followingId, input.userId),
          eq(schema.follows.status, "accepted")
        ))
        .limit(input.limit)
        .offset(input.offset);

      // Get follower profiles
      const followerIds = followers.map((f) => f.followerId);
      const profiles = await db.select().from(schema.socialProfiles)
        .where(inArray(schema.socialProfiles.userId, followerIds));

      return profiles;
    }),

  /**
   * Get following
   */
  getFollowing: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const following = await db.select().from(schema.follows)
        .where(and(
          eq(schema.follows.followerId, input.userId),
          eq(schema.follows.status, "accepted")
        ))
        .limit(input.limit)
        .offset(input.offset);

      // Get following profiles
      const followingIds = following.map((f) => f.followingId);
      const profiles = await db.select().from(schema.socialProfiles)
        .where(inArray(schema.socialProfiles.userId, followingIds));

      return profiles;
    }),

  // ============================================================================
  // SEARCH
  // ============================================================================

  /**
   * Search users
   */
  searchUsers: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const profiles = await db.select().from(schema.socialProfiles)
        .where(or(
          like(schema.socialProfiles.username, `%${input.query}%`),
          like(schema.socialProfiles.displayName, `%${input.query}%`)
        ))
        .limit(input.limit);

      return profiles;
    }),

  /**
   * Search posts
   */
  searchPosts: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const posts = await db.select().from(schema.posts)
        .where(and(
          like(schema.posts.content, `%${input.query}%`),
          eq(schema.posts.aiModerationStatus, "approved")
        ))
        .orderBy(desc(schema.posts.createdAt))
        .limit(input.limit);

      // Get author profiles
      const userIds = Array.from(new Set(posts.map((p) => p.userId)));
      const profiles = await db.select().from(schema.socialProfiles)
        .where(inArray(schema.socialProfiles.userId, userIds));
      const profilesMap = new Map(profiles.map((p) => [p.userId, p]));

      return posts.map((post) => ({
        ...post,
        mediaUrls: post.mediaUrls ? JSON.parse(post.mediaUrls) : [],
        mediaTypes: post.mediaTypes ? JSON.parse(post.mediaTypes) : [],
        author: profilesMap.get(post.userId),
      }));
    }),
});
