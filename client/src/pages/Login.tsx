import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate authentication
    // In production, this would call your authentication API
    setTimeout(() => {
      if (email === "employee@apex-meridian.com" && password === "employee123") {
        localStorage.setItem("auth_token", "employee");
        localStorage.setItem("user_role", "employee");
        setLocation("/employee");
      } else if (email === "hr@apex-meridian.com" && password === "hr123") {
        localStorage.setItem("auth_token", "hr");
        localStorage.setItem("user_role", "hr");
        setLocation("/hr");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-md bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-cyan-500/20 p-4 rounded-full">
                <Lock className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-white">Employee Login</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@apex-meridian.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="mt-6 p-4 bg-cyan-500/10 rounded border border-cyan-500/20">
                <p className="text-sm text-gray-300 font-semibold mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <p><strong>Employee:</strong> employee@apex-meridian.com / employee123</p>
                  <p><strong>HR:</strong> hr@apex-meridian.com / hr123</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
