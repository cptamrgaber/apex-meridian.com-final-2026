import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Search, Users, TrendingUp } from "lucide-react";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"users" | "posts">("users");

  const { data: userResults, refetch: refetchUsers } = trpc.social.searchUsers.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 && searchType === "users" }
  );

  const { data: postResults, refetch: refetchPosts } = trpc.social.searchPosts.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length > 0 && searchType === "posts" }
  );

  const handleSearch = () => {
    if (searchType === "users") {
      refetchUsers();
    } else {
      refetchPosts();
    }
  };

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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <Card className="p-6 bg-slate-900/50 border-slate-800 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Search className="w-6 h-6" />
              Discover
            </h2>

            <div className="flex gap-4 mb-4">
              <Button
                variant={searchType === "users" ? "default" : "outline"}
                onClick={() => setSearchType("users")}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
              <Button
                variant={searchType === "posts" ? "default" : "outline"}
                onClick={() => setSearchType("posts")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Posts
              </Button>
            </div>

            <div className="flex gap-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={`Search for ${searchType}...`}
                className="flex-1 bg-slate-800/50 border-slate-700 text-white"
              />
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                Search
              </Button>
            </div>
          </Card>

          {/* Results */}
          {searchQuery && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">
                {searchType === "users" ? "Users" : "Posts"}
              </h3>

              {searchType === "users" && userResults && userResults.length > 0 && (
                <div className="grid gap-4">
                  {userResults.map((profile) => (
                    <Card key={profile.id} className="p-6 bg-slate-900/50 border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                          {profile.displayName?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <Link href={`/social/profile/${profile.username}`}>
                            <h3 className="text-lg font-semibold hover:text-blue-400 transition-colors">
                              {profile.displayName}
                            </h3>
                          </Link>
                          <p className="text-slate-400">@{profile.username}</p>
                          {profile.bio && (
                            <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                              {profile.bio}
                            </p>
                          )}
                          <div className="flex gap-4 mt-2 text-sm text-slate-400">
                            <span>{profile.followersCount} followers</span>
                            <span>{profile.postsCount} posts</span>
                          </div>
                        </div>
                        <Link href={`/social/profile/${profile.username}`}>
                          <Button variant="outline">View Profile</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {searchType === "posts" && postResults && postResults.length > 0 && (
                <div className="grid gap-4">
                  {postResults.map((post) => (
                    <Card key={post.id} className="p-6 bg-slate-900/50 border-slate-800">
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
                            @{post.author?.username}
                          </p>
                        </div>
                      </div>
                      <Link href={`/social/post/${post.id}`}>
                        <p className="text-slate-200 hover:text-white transition-colors line-clamp-3">
                          {post.content}
                        </p>
                      </Link>
                      <div className="flex gap-6 mt-4 text-sm text-slate-400">
                        <span>{post.likesCount} likes</span>
                        <span>{post.commentsCount} comments</span>
                        <span>{post.sharesCount} shares</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {((searchType === "users" && userResults && userResults.length === 0) ||
                (searchType === "posts" && postResults && postResults.length === 0)) && (
                <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
                  <p className="text-slate-400">No results found. Try a different search term.</p>
                </Card>
              )}
            </div>
          )}

          {/* Trending Section (placeholder) */}
          {!searchQuery && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </h3>
              <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
                <p className="text-slate-400">
                  Trending topics will appear here. Start searching to discover users and posts!
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
