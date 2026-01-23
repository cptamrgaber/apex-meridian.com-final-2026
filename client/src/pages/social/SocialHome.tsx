import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/_core/hooks/useAuth';
import { Link } from "wouter";
import { Heart, MessageCircle, Share2, Send, Globe, Users, Lock } from "lucide-react";
import { toast } from "sonner";

export default function SocialHome() {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");

  const { data: profile } = trpc.social.getMyProfile.useQuery();
  const { data: feed, refetch: refetchFeed } = trpc.social.getFeed.useQuery({
    limit: 20,
    offset: 0,
  });

  const createPostMutation = trpc.social.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully!");
      setPostContent("");
      refetchFeed();
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const likePostMutation = trpc.social.likePost.useMutation({
    onSuccess: () => {
      refetchFeed();
    },
  });

  const unlikePostMutation = trpc.social.unlikePost.useMutation({
    onSuccess: () => {
      refetchFeed();
    },
  });

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    createPostMutation.mutate({
      content: postContent,
      postType: "text",
      visibility,
    });
  };

  const handleLikeToggle = (postId: number, isLiked: boolean) => {
    if (isLiked) {
      unlikePostMutation.mutate({ postId });
    } else {
      likePostMutation.mutate({ postId, reactionType: "like" });
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto p-8 bg-slate-900/50 border-slate-800">
            <h1 className="text-3xl font-bold mb-4">Welcome to Apex Social</h1>
            <p className="text-slate-300 mb-6">
              The 1st Egyptian Social Media Platform Based on AI
            </p>
            <p className="text-slate-400 mb-6">
              Create your profile to start connecting with others and sharing your thoughts.
            </p>
            <Link href="/social/setup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Create Profile
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/social">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Apex Social
              </h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/social">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
              <Link href="/social/explore">
                <Button variant="ghost" size="sm">Explore</Button>
              </Link>
              <Link href={`/social/profile/${profile.username}`}>
                <Button variant="ghost" size="sm">Profile</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create Post Card */}
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h2 className="text-lg font-semibold mb-4">What's on your mind?</h2>
            <Textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your thoughts..."
              className="mb-4 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={visibility === "public" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Public
                </Button>
                <Button
                  variant={visibility === "friends" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("friends")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Friends
                </Button>
                <Button
                  variant={visibility === "private" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVisibility("private")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Private
                </Button>
              </div>
              <Button
                onClick={handleCreatePost}
                disabled={createPostMutation.isPending || !postContent.trim()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </Card>

          {/* Feed */}
          <div className="space-y-6">
            {feed && feed.length > 0 ? (
              feed.map((post) => (
                <Card key={post.id} className="p-6 bg-slate-900/50 border-slate-800">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {post.author?.displayName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <Link href={`/social/profile/${post.author?.username}`}>
                        <h3 className="font-semibold hover:text-blue-400 transition-colors">
                          {post.author?.displayName || "Unknown User"}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-400">
                        @{post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-slate-200 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeToggle(post.id, post.isLikedByCurrentUser)}
                      className={post.isLikedByCurrentUser ? "text-red-500" : "text-slate-400"}
                    >
                      <Heart
                        className={`w-5 h-5 mr-2 ${post.isLikedByCurrentUser ? "fill-current" : ""}`}
                      />
                      {post.likesCount}
                    </Button>
                    <Link href={`/social/post/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {post.commentsCount}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      <Share2 className="w-5 h-5 mr-2" />
                      {post.sharesCount}
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
                <p className="text-slate-400 mb-4">No posts yet. Start following people to see their posts!</p>
                <Link href="/social/explore">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Explore Users
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
