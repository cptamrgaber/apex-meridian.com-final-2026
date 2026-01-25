import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from '@/_core/hooks/useAuth';
import { Link, useParams } from "wouter";
import { MapPin, Link as LinkIcon, Calendar, Users, Heart, MessageCircle, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();

  const { data: profile, isLoading } = trpc.social.getProfile.useQuery({
    username,
  });

  const { data: myProfile } = trpc.social.getMyProfile.useQuery();

  const followMutation = trpc.social.followUser.useMutation({
    onSuccess: () => {
      toast.success("Followed successfully!");
    },
  });

  const unfollowMutation = trpc.social.unfollowUser.useMutation({
    onSuccess: () => {
      toast.success("Unfollowed successfully!");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto p-8 bg-slate-900/50 border-slate-800 text-center">
            <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
            <p className="text-slate-400 mb-6">The user you're looking for doesn't exist.</p>
            <Link href="/social">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Back to Home
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const isOwnProfile = myProfile?.userId === profile.userId;

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
              {myProfile && (
                <Link href={`/social/profile/${myProfile.username}`}>
                  <Button variant="ghost" size="sm">Profile</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="p-8 bg-slate-900/50 border-slate-800 mb-6">
            {/* Cover Photo */}
            {profile.coverPhoto ? (
              <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src={profile.coverPhoto}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-48 mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            )}

            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold -mt-20 border-4 border-slate-900">
                {profile.displayName?.charAt(0) || "U"}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                      {profile.phoneVerified && (
                        <div title="Phone Verified">
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        </div>
                      )}
                      {profile.kycStatus === "approved" && (
                        <div title="Identity Verified">
                          <Shield className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400">@{profile.username}</p>
                  </div>
                  {!isOwnProfile && (
                    <Button
                      onClick={() => {
                        // TODO: Check if already following
                        followMutation.mutate({ userId: profile.userId });
                      }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      Follow
                    </Button>
                  )}
                  {isOwnProfile && (
                    <Link href="/social/settings">
                      <Button variant="outline">Edit Profile</Button>
                    </Link>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-slate-200 mb-4">{profile.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                  {profile.birthDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Born {new Date(profile.birthDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-6 mt-4">
                  <div>
                    <span className="font-bold text-white">{profile.followersCount}</span>
                    <span className="text-slate-400 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{profile.followingCount}</span>
                    <span className="text-slate-400 ml-1">Following</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">{profile.postsCount}</span>
                    <span className="text-slate-400 ml-1">Posts</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Posts Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Posts</h2>
            <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
              <p className="text-slate-400">No posts yet.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
