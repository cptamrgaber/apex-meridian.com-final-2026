import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, LogOut, Trash2, Edit, Key, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

function HRDashboardContent() {
  const [, setLocation] = useLocation();
  const { employee, logout } = useEmployeeAuth();
  const { data: employees, refetch } = trpc.employee.list.useQuery();
  
  // State for dialogs
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  
  // Form states
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    department: "",
    role: "employee" as "admin" | "employee" | "hr",
  });
  
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee" as "admin" | "employee" | "hr",
  });
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Mutations
  const createMutation = trpc.employee.create.useMutation();
  const updateMutation = trpc.employee.update.useMutation();
  const deleteMutation = trpc.employee.delete.useMutation();
  const toggleStatusMutation = trpc.employee.toggleStatus.useMutation();
  
  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };
  
  const handleAddEmployee = async () => {
    try {
      await createMutation.mutateAsync(newEmployee);
      toast.success("Employee added successfully");
      setAddDialogOpen(false);
      setNewEmployee({
        username: "",
        password: "",
        name: "",
        email: "",
        department: "",
        role: "employee",
      });
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to add employee");
    }
  };
  
  const handleEditEmployee = async () => {
    if (!selectedEmployee) return;
    
    try {
      await updateMutation.mutateAsync({
        id: selectedEmployee.id,
        ...editData,
      });
      toast.success("Employee updated successfully");
      setEditDialogOpen(false);
      setSelectedEmployee(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update employee");
    }
  };
  
  const handleChangePassword = async () => {
    if (!selectedEmployee) return;
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      await updateMutation.mutateAsync({
        id: selectedEmployee.id,
        password: newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordDialogOpen(false);
      setSelectedEmployee(null);
      setNewPassword("");
      setConfirmPassword("");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    }
  };
  
  const handleDeleteEmployee = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Employee deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete employee");
    }
  };
  
  const handleToggleStatus = async (id: number) => {
    try {
      await toggleStatusMutation.mutateAsync({ id });
      toast.success("Employee status updated");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };
  
  const openEditDialog = (emp: any) => {
    setSelectedEmployee(emp);
    setEditData({
      name: emp.name,
      email: emp.email,
      department: emp.department || "",
      role: emp.role,
    });
    setEditDialogOpen(true);
  };
  
  const openPasswordDialog = (emp: any) => {
    setSelectedEmployee(emp);
    setPasswordDialogOpen(true);
  };

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
                  Welcome, {employee?.name} • Manage employees and operations
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{employees?.length || 0}</div>
                <p className="text-xs text-gray-400 mt-1">Active accounts</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {employees?.filter(e => e.isActive).length || 0}
                </div>
                <p className="text-xs text-gray-400 mt-1">Currently active</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Admins</CardTitle>
                <Key className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {employees?.filter(e => e.role === 'admin').length || 0}
                </div>
                <p className="text-xs text-gray-400 mt-1">Administrator accounts</p>
              </CardContent>
            </Card>
          </div>

          {/* Employee Management */}
          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white text-2xl">Employee Management</CardTitle>
                  <CardDescription className="text-gray-300">
                    Add, edit, and manage employee accounts
                  </CardDescription>
                </div>
                
                {/* Add Employee Dialog */}
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-blue-900 border-cyan-500/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                      <DialogDescription className="text-gray-300">
                        Create a new employee account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Username</Label>
                        <Input
                          value={newEmployee.username}
                          onChange={(e) => setNewEmployee({...newEmployee, username: e.target.value})}
                          className="bg-blue-950/50 border-cyan-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          value={newEmployee.password}
                          onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                          className="bg-blue-950/50 border-cyan-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                          className="bg-blue-950/50 border-cyan-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                          className="bg-blue-950/50 border-cyan-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Input
                          value={newEmployee.department}
                          onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                          className="bg-blue-950/50 border-cyan-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select
                          value={newEmployee.role}
                          onValueChange={(value: any) => setNewEmployee({...newEmployee, role: value})}
                        >
                          <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-900 border-cyan-500/20 text-white">
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddEmployee} disabled={createMutation.isPending}>
                        {createMutation.isPending ? "Adding..." : "Add Employee"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees?.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-4 bg-blue-950/30 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-semibold">{emp.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          emp.role === 'admin' ? 'bg-yellow-500/20 text-yellow-400' :
                          emp.role === 'hr' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {emp.role.toUpperCase()}
                        </span>
                        {emp.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{emp.email}</p>
                      <p className="text-gray-500 text-xs">{emp.department || 'No department'} • @{emp.username}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(emp)}
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openPasswordDialog(emp)}
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(emp.id)}
                        className={emp.isActive ? "border-orange-500/30 text-orange-400 hover:bg-orange-500/10" : "border-green-500/30 text-green-400 hover:bg-green-500/10"}
                      >
                        {emp.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        disabled={emp.id === employee?.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Employee Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-blue-900 border-cyan-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription className="text-gray-300">
              Update employee information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="bg-blue-950/50 border-cyan-500/30 text-white"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="bg-blue-950/50 border-cyan-500/30 text-white"
              />
            </div>
            <div>
              <Label>Department</Label>
              <Input
                value={editData.department}
                onChange={(e) => setEditData({...editData, department: e.target.value})}
                className="bg-blue-950/50 border-cyan-500/30 text-white"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={editData.role}
                onValueChange={(value: any) => setEditData({...editData, role: value})}
              >
                <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-blue-900 border-cyan-500/20 text-white">
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEmployee} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="bg-blue-900 border-cyan-500/20 text-white">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-gray-300">
              Set a new password for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-blue-950/50 border-cyan-500/30 text-white"
                placeholder="Minimum 6 characters"
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-blue-950/50 border-cyan-500/30 text-white"
                placeholder="Re-enter password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setPasswordDialogOpen(false);
              setNewPassword("");
              setConfirmPassword("");
            }}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function HRDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <HRDashboardContent />
    </ProtectedRoute>
  );
}
