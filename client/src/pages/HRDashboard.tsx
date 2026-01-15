import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, FileText, Calendar, TrendingUp, LogOut, DollarSign, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

function HRDashboardContent() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setLocation("/login");
  };

  const employees = [
    { name: "John Smith", role: "Senior AI Engineer", department: "Engineering", status: "Active" },
    { name: "Sarah Johnson", role: "Product Manager", department: "Product", status: "Active" },
    { name: "Michael Chen", role: "Data Scientist", department: "Research", status: "Active" },
    { name: "Emily Davis", role: "UX Designer", department: "Design", status: "Active" },
    { name: "David Wilson", role: "DevOps Engineer", department: "Engineering", status: "Active" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  HR Dashboard
                </h1>
                <p className="text-xl text-gray-300">
                  Manage employees, recruitment, and HR operations
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">127</div>
                <p className="text-xs text-gray-400 mt-1">+8 from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Open Positions</CardTitle>
                <UserPlus className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">12</div>
                <p className="text-xs text-gray-400 mt-1">Across 5 departments</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Avg. Satisfaction</CardTitle>
                <Award className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">4.7/5</div>
                <p className="text-xs text-gray-400 mt-1">+0.3 from last quarter</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Retention Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">94%</div>
                <p className="text-xs text-gray-400 mt-1">Industry leading</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto py-6 flex-col gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30">
                <UserPlus className="h-6 w-6" />
                <span>Add New Employee</span>
              </Button>
              <Button className="h-auto py-6 flex-col gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30">
                <FileText className="h-6 w-6" />
                <span>Generate Report</span>
              </Button>
              <Button className="h-auto py-6 flex-col gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30">
                <Calendar className="h-6 w-6" />
                <span>Review Time Off</span>
              </Button>
              <Button className="h-auto py-6 flex-col gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30">
                <DollarSign className="h-6 w-6" />
                <span>Process Payroll</span>
              </Button>
            </div>
          </div>

          {/* Recent Employees */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Employee Directory</h2>
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-cyan-500/20">
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Department</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee, index) => (
                        <tr key={index} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                          <td className="py-3 px-4 text-white">{employee.name}</td>
                          <td className="py-3 px-4 text-gray-300">{employee.role}</td>
                          <td className="py-3 px-4 text-gray-300">{employee.department}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                              {employee.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Actions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Pending Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Time Off Requests</CardTitle>
                  <CardDescription className="text-gray-300">3 requests awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                    Review Requests
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Performance Reviews</CardTitle>
                  <CardDescription className="text-gray-300">8 reviews due this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                    View Reviews
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HRDashboard() {
  return (
    <ProtectedRoute requiredRole="hr">
      <HRDashboardContent />
    </ProtectedRoute>
  );
}
