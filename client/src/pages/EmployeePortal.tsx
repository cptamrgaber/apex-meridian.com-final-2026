import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Users, Settings, LogOut, BookOpen, MessageSquare, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";

function EmployeePortalContent() {
  const [, setLocation] = useLocation();
  const { employee, logout } = useEmployeeAuth();

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const resources = [
    {
      icon: FileText,
      title: "Company Policies",
      description: "Access employee handbook and company policies",
      link: "#"
    },
    {
      icon: Calendar,
      title: "Time Off Requests",
      description: "Submit and track vacation and leave requests",
      link: "#"
    },
    {
      icon: BookOpen,
      title: "Training Materials",
      description: "Access AI training courses and certifications",
      link: "#"
    },
    {
      icon: MessageSquare,
      title: "Internal Communication",
      description: "Team chat and project collaboration tools",
      link: "#"
    },
    {
      icon: Award,
      title: "Performance Reviews",
      description: "View your performance metrics and feedback",
      link: "#"
    },
    {
      icon: Settings,
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Employee Portal
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome back, {employee?.name}! Access your resources and tools below.
                </p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-cyan-400">3</p>
                <p className="text-gray-300 text-sm mt-2">Items requiring attention</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-cyan-400">75%</p>
                <p className="text-gray-300 text-sm mt-2">Completed this quarter</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-white">Time Off Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-cyan-400">15</p>
                <p className="text-gray-300 text-sm mt-2">Days available</p>
              </CardContent>
            </Card>
          </div>

          {/* Resources Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Resources & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card
                    key={index}
                    className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer group"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-cyan-500/20 p-3 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                          <Icon className="h-6 w-6 text-cyan-400" />
                        </div>
                        <CardTitle className="text-white">{resource.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {resource.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Announcements */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Announcements</h2>
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">Q1 2026 All-Hands Meeting</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Join us for the quarterly review and strategy discussion on January 25th at 10:00 AM EST.
                    </p>
                    <p className="text-gray-400 text-xs">Posted 2 days ago</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="text-white font-semibold mb-1">New AI Training Modules Available</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Advanced machine learning courses are now available in the training portal.
                    </p>
                    <p className="text-gray-400 text-xs">Posted 5 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function EmployeePortal() {
  return (
    <ProtectedRoute requiredRole="employee">
      <EmployeePortalContent />
    </ProtectedRoute>
  );
}
