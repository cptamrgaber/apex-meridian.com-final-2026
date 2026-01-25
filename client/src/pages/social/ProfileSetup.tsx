import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from "wouter";
import { toast } from "sonner";
import { User, Globe } from "lucide-react";

export default function ProfileSetup() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [bio, setBio] = useState("");
  const [location, setLocationValue] = useState("");
  const [website, setWebsite] = useState("");
  const [language, setLanguage] = useState("en");
  const [birthDate, setBirthDate] = useState("");

  const updateProfileMutation = trpc.social.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile created successfully!");
      setLocation("/social");
    },
    onError: (error) => {
      toast.error(`Failed to create profile: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    updateProfileMutation.mutate({
      username: username.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      displayName,
      bio,
      location: location,
      website: website || undefined,
      language,
      birthDate: birthDate || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto p-8 bg-slate-900/50 border-slate-800">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-slate-400">
              Welcome to Apex Social - The 1st Egyptian Social Media Platform Based on AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-slate-200">
                Username *
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="mt-2 bg-slate-800/50 border-slate-700 text-white"
                required
              />
              <p className="text-sm text-slate-400 mt-1">
                Your unique identifier. Only lowercase letters, numbers, and underscores.
              </p>
            </div>

            <div>
              <Label htmlFor="displayName" className="text-slate-200">
                Display Name *
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                className="mt-2 bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-slate-200">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="mt-2 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-slate-200">
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="Cairo, Egypt"
                className="mt-2 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-slate-200">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                className="mt-2 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="language" className="text-slate-200">
                Preferred Language
              </Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-2 w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-slate-200">
                Birthday
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="mt-2 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {updateProfileMutation.isPending ? "Creating Profile..." : "Create Profile"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
