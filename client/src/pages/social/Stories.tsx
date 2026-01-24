import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link, useLocation } from "wouter";
import { Plus, X, ChevronLeft, ChevronRight, Eye, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Stories() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedStoryGroup, setSelectedStoryGroup] = useState<any>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: stories, refetch: refetchStories } = trpc.stories.getStories.useQuery();
  const { data: myStories, refetch: refetchMyStories } = trpc.stories.getMyStories.useQuery();
  const { data: storyStats } = trpc.stories.getStoryStats.useQuery();

  const viewStoryMutation = trpc.stories.viewStory.useMutation();
  const uploadMediaMutation = trpc.stories.uploadStoryMedia.useMutation();
  const createStoryMutation = trpc.stories.createStory.useMutation({
    onSuccess: () => {
      toast.success("Story created successfully!");
      setShowUploadDialog(false);
      setUploadFile(null);
      setUploadPreview(null);
      refetchStories();
      refetchMyStories();
    },
    onError: (error) => {
      toast.error(`Failed to create story: ${error.message}`);
    },
  });

  const deleteStoryMutation = trpc.stories.deleteStory.useMutation({
    onSuccess: () => {
      toast.success("Story deleted");
      refetchStories();
      refetchMyStories();
    },
  });

  // Auto-advance story
  useEffect(() => {
    if (!selectedStoryGroup) return;

    const currentStory = selectedStoryGroup.stories[currentStoryIndex];
    if (!currentStory) return;

    const duration = currentStory.duration * 1000; // Convert to milliseconds
    const timer = setTimeout(() => {
      handleNextStory();
    }, duration);

    return () => clearTimeout(timer);
  }, [selectedStoryGroup, currentStoryIndex]);

  // Mark story as viewed when opened
  useEffect(() => {
    if (selectedStoryGroup && selectedStoryGroup.stories[currentStoryIndex]) {
      const storyId = selectedStoryGroup.stories[currentStoryIndex].id;
      viewStoryMutation.mutate({ storyId });
    }
  }, [selectedStoryGroup, currentStoryIndex]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 16MB)
    if (file.size > 16 * 1024 * 1024) {
      toast.error("File size must be less than 16MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Please select an image or video file");
      return;
    }

    setUploadFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadStory = async () => {
    if (!uploadFile || !uploadPreview) return;

    setIsUploading(true);

    try {
      // Upload media to S3
      const { url } = await uploadMediaMutation.mutateAsync({
        fileData: uploadPreview,
        fileName: uploadFile.name,
        mimeType: uploadFile.type,
      });

      // Create story
      await createStoryMutation.mutateAsync({
        mediaUrl: url,
        mediaType: uploadFile.type.startsWith("image/") ? "image" : "video",
        duration: uploadFile.type.startsWith("image/") ? 5 : 15,
      });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleStoryClick = (storyGroup: any, index: number = 0) => {
    setSelectedStoryGroup(storyGroup);
    setCurrentStoryIndex(index);
  };

  const handleNextStory = () => {
    if (!selectedStoryGroup) return;

    if (currentStoryIndex < selectedStoryGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Move to next user's stories
      const currentUserIndex = stories?.findIndex(
        (s: any) => s.user.id === selectedStoryGroup.user.id
      );
      if (currentUserIndex !== undefined && currentUserIndex < (stories?.length || 0) - 1) {
        handleStoryClick(stories?.[currentUserIndex + 1], 0);
      } else {
        setSelectedStoryGroup(null);
      }
    }
  };

  const handlePrevStory = () => {
    if (!selectedStoryGroup) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      // Move to previous user's stories
      const currentUserIndex = stories?.findIndex(
        (s: any) => s.user.id === selectedStoryGroup.user.id
      );
      if (currentUserIndex !== undefined && currentUserIndex > 0) {
        const prevGroup = stories?.[currentUserIndex - 1] as any;
        handleStoryClick(prevGroup, prevGroup?.stories?.length - 1 || 0);
      }
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center">
        <Card className="max-w-md p-8 bg-slate-900/50 border-slate-800">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-slate-400 mb-6">Please login to view stories.</p>
          <Link href="/social">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">Go to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/social">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Stories</h1>
            </div>
            <nav className="flex items-center gap-4">
              {storyStats && (
                <div className="text-sm text-slate-400">
                  <span className="font-semibold text-white">{storyStats.activeStories}</span> active
                  · <span className="font-semibold text-white">{storyStats.totalViews}</span> views
                </div>
              )}
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {/* Add Story Button */}
          <button
            onClick={() => setShowUploadDialog(true)}
            className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/30"
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm font-semibold">Add Story</span>
          </button>

          {/* My Stories */}
          {myStories && myStories.length > 0 && (
            <button
              onClick={() =>
                handleStoryClick({
                  user,
                  profile: null,
                  stories: myStories,
                })
              }
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group"
            >
              <img
                src={myStories[0].mediaUrl}
                alt="My story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold truncate">Your Story</p>
                <p className="text-xs text-slate-300">{myStories.length} stories</p>
              </div>
              <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden">
                <img
                  src={user.profilePicture ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name ?? "User")}`}
                  alt={user.name ?? "User"}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          )}

          {/* Other Users' Stories */}
          {stories?.map((storyGroup: any) => (
            <button
              key={storyGroup.user.id}
              onClick={() => handleStoryClick(storyGroup)}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group"
            >
              <img
                src={storyGroup.stories[0].mediaUrl}
                alt={storyGroup.user.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold truncate">{storyGroup.user.name}</p>
                <p className="text-xs text-slate-300">
                  {getTimeAgo(storyGroup.stories[0].createdAt)}
                </p>
              </div>
              <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-cyan-500 overflow-hidden">
                <img
                  src={
                    storyGroup.user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(storyGroup.user.name)}`
                  }
                  alt={storyGroup.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryGroup && (
        <Dialog open={!!selectedStoryGroup} onOpenChange={() => setSelectedStoryGroup(null)}>
          <DialogContent className="max-w-md h-[90vh] p-0 bg-black border-none">
            <div className="relative w-full h-full">
              {/* Story Progress Bars */}
              <div className="absolute top-2 left-2 right-2 z-10 flex gap-1">
                {selectedStoryGroup.stories.map((_: any, index: number) => (
                  <div
                    key={index}
                    className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-white transition-all ${
                        index === currentStoryIndex ? "animate-progress" : index < currentStoryIndex ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedStoryGroup.user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStoryGroup.user.name)}`
                    }
                    alt={selectedStoryGroup.user.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div>
                    <p className="font-semibold text-white">{selectedStoryGroup.user.name}</p>
                    <p className="text-xs text-white/80">
                      {getTimeAgo(selectedStoryGroup.stories[currentStoryIndex].createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedStoryGroup.user.id === user.id && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => {
                        deleteStoryMutation.mutate({
                          storyId: selectedStoryGroup.stories[currentStoryIndex].id,
                        });
                        setSelectedStoryGroup(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setSelectedStoryGroup(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Story Content */}
              <div className="w-full h-full flex items-center justify-center">
                {selectedStoryGroup.stories[currentStoryIndex].mediaType === "image" ? (
                  <img
                    src={selectedStoryGroup.stories[currentStoryIndex].mediaUrl}
                    alt="Story"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <video
                    src={selectedStoryGroup.stories[currentStoryIndex].mediaUrl}
                    className="max-w-full max-h-full object-contain"
                    autoPlay
                    muted
                    onEnded={handleNextStory}
                  />
                )}
              </div>

              {/* Navigation */}
              <button
                onClick={handlePrevStory}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
                disabled={currentStoryIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextStory}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* View Count */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Eye className="w-4 h-4" />
                <span className="text-sm">
                  {selectedStoryGroup.stories[currentStoryIndex].viewCount} views
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Upload Story Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800">
          <h2 className="text-2xl font-bold mb-4">Create Story</h2>

          {!uploadPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[9/16] rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer"
            >
              <Upload className="w-12 h-12 text-slate-500" />
              <div className="text-center">
                <p className="font-semibold">Upload Photo or Video</p>
                <p className="text-sm text-slate-400 mt-1">Max 16MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="aspect-[9/16] rounded-2xl overflow-hidden">
                {uploadFile?.type.startsWith("image/") ? (
                  <img src={uploadPreview || ""} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <video src={uploadPreview || ""} className="w-full h-full object-cover" controls />
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setUploadFile(null);
                    setUploadPreview(null);
                  }}
                >
                  Change
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600"
                  onClick={handleUploadStory}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Share Story"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </div>
  );
}
