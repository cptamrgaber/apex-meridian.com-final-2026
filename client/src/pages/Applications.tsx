import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Download, Mail, Phone, Calendar, ExternalLink, Filter, LogOut } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function ApplicationsContent() {
  const [, setLocation] = useLocation();
  const { employee, logout } = useEmployeeAuth();
  const { data: applications, refetch } = trpc.careers.getApplications.useQuery();
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  
  const updateStatusMutation = trpc.careers.updateApplicationStatus.useMutation();

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        applicationId,
        status: newStatus as any,
      });
      toast.success("Application status updated");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "reviewing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "interviewed": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "accepted": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Get unique departments
  const departments = Array.from(new Set(applications?.map(app => app.department) || []));

  // Filter applications
  const filteredApplications = applications?.filter(app => {
    const statusMatch = statusFilter === "all" || app.status === statusFilter;
    const deptMatch = departmentFilter === "all" || app.department === departmentFilter;
    return statusMatch && deptMatch;
  }) || [];

  // Statistics
  const stats = {
    total: applications?.length || 0,
    pending: applications?.filter(a => a.status === "pending").length || 0,
    reviewing: applications?.filter(a => a.status === "reviewing").length || 0,
    interviewed: applications?.filter(a => a.status === "interviewed").length || 0,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Job Applications</h1>
              <p className="text-gray-300">Review and manage candidate applications</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setLocation("/hr")}
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                Back to HR Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Under Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400">{stats.reviewing}</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Interviewed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400">{stats.interviewed}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-900 border-cyan-500/20 text-white">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Department</label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-900 border-cyan-500/20 text-white">
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">Applications ({filteredApplications.length})</CardTitle>
              <CardDescription className="text-gray-300">
                Click on an application to view details and update status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No applications found matching your filters</p>
                  </div>
                ) : (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 bg-blue-950/30 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Left: Applicant Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white mb-1">{app.fullName}</h3>
                              <p className="text-cyan-400 font-medium mb-2">{app.jobTitle}</p>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {app.department}
                              </Badge>
                            </div>
                            <Badge className={`${getStatusColor(app.status)} border`}>
                              {app.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center text-gray-300">
                              <Mail className="h-4 w-4 mr-2 text-cyan-400" />
                              {app.email}
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Phone className="h-4 w-4 mr-2 text-cyan-400" />
                              {app.phone}
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Briefcase className="h-4 w-4 mr-2 text-cyan-400" />
                              {app.yearsOfExperience} years experience
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                              {new Date(app.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {app.linkedIn && (
                            <div className="mt-3">
                              <a
                                href={app.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                LinkedIn Profile
                              </a>
                            </div>
                          )}

                          {app.coverLetter && (
                            <div className="mt-4 p-3 bg-blue-900/30 rounded border border-cyan-500/10">
                              <p className="text-xs text-gray-400 mb-1">Cover Letter:</p>
                              <p className="text-sm text-gray-300 line-clamp-3">{app.coverLetter}</p>
                            </div>
                          )}
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-3 lg:min-w-[200px]">
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </Button>
                          </a>

                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Update Status:</label>
                            <Select
                              value={app.status}
                              onValueChange={(value) => handleStatusChange(app.id, value)}
                            >
                              <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-blue-900 border-cyan-500/20 text-white">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewing">Reviewing</SelectItem>
                                <SelectItem value="interviewed">Interviewed</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Applications() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ApplicationsContent />
    </ProtectedRoute>
  );
}
