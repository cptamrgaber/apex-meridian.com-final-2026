import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, Search, Filter, LogOut, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

function HRRequestsContent() {
  const [, setLocation] = useLocation();
  const { employee, logout } = useEmployeeAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [hrNotes, setHrNotes] = useState("");

  const { data: requests, isLoading, refetch } = trpc.employeeRequests.getAll.useQuery();
  const approveMutation = trpc.employeeRequests.approve.useMutation({
    onSuccess: () => {
      toast.success("Request approved successfully");
      refetch();
      setSelectedRequest(null);
      setAction(null);
      setHrNotes("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve request");
    }
  });
  const rejectMutation = trpc.employeeRequests.reject.useMutation({
    onSuccess: () => {
      toast.success("Request rejected");
      refetch();
      setSelectedRequest(null);
      setAction(null);
      setHrNotes("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reject request");
    }
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const filteredRequests = requests?.filter((req: any) => {
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAction = () => {
    if (!selectedRequest || !action || !employee) return;
    
    if (action === "approve") {
      approveMutation.mutate({ 
        requestId: selectedRequest.id, 
        hrNotes,
        reviewedBy: employee.id,
        reviewedByName: employee.name
      });
    } else {
      rejectMutation.mutate({ 
        requestId: selectedRequest.id, 
        hrNotes,
        reviewedBy: employee.id,
        reviewedByName: employee.name
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  const getRequestTypeBadge = (type: string) => {
    const colors = {
      vacation: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      duty_assignment: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      report: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
      other: "bg-gray-500/10 text-gray-600 border-gray-500/20"
    };
    return <Badge variant="outline" className={colors[type as keyof typeof colors] || colors.other}>{type.replace("_", " ")}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 flex flex-col">
      <SEO 
        title="HR Requests - Employee Request Management"
        description="Review and manage employee requests for vacations, duty assignments, and reports."
      />
      <Header />
      
      <main className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">Employee Requests</h1>
                <p className="text-gray-300 text-lg">Welcome, {employee?.name} • Review and manage employee requests</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setLocation("/hr-dashboard")}
                  variant="outline"
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Employee Management
                </Button>
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
          </div>

          {/* Filters */}
          <Card className="mb-6 bg-blue-900/30 border-cyan-500/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, title, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-blue-950/50 border-cyan-500/20 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="bg-blue-950/50 border-cyan-500/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-white flex items-center">
                  <span className="text-sm">Total: {filteredRequests?.length || 0} requests</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requests List */}
          {isLoading ? (
            <div className="text-center text-white py-12">Loading requests...</div>
          ) : filteredRequests && filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredRequests.map((request: any) => (
                <Card key={request.id} className="bg-blue-900/30 border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-white">{request.title}</CardTitle>
                          {getStatusBadge(request.status)}
                          {getRequestTypeBadge(request.requestType)}
                        </div>
                        <CardDescription className="text-gray-300">
                          {request.employeeName} • {request.department}
                        </CardDescription>
                      </div>
                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAction("approve");
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedRequest(request);
                              setAction("reject");
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-300">
                      <p>{request.description}</p>
                      {request.startDate && request.endDate && (
                        <p className="text-sm">
                          <strong>Period:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-sm"><strong>Submitted:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                      {request.hrNotes && (
                        <div className="mt-4 p-3 bg-blue-950/50 rounded border border-cyan-500/20">
                          <p className="text-sm"><strong>HR Notes:</strong> {request.hrNotes}</p>
                          {request.reviewedByName && (
                            <p className="text-xs text-gray-400 mt-1">
                              Reviewed by {request.reviewedByName} on {request.reviewedAt ? new Date(request.reviewedAt).toLocaleString() : "N/A"}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-blue-900/30 border-cyan-500/20">
              <CardContent className="py-12 text-center text-gray-300">
                No requests found matching your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Approval/Rejection Dialog */}
      <Dialog open={!!selectedRequest && !!action} onOpenChange={() => {
        setSelectedRequest(null);
        setAction(null);
        setHrNotes("");
      }}>
        <DialogContent className="bg-blue-950 border-cyan-500/20 text-white">
          <DialogHeader>
            <DialogTitle>
              {action === "approve" ? "Approve Request" : "Reject Request"}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {selectedRequest && `${selectedRequest.employeeName} - ${selectedRequest.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">HR Notes {action === "reject" && "(Required)"}</label>
              <Textarea
                value={hrNotes}
                onChange={(e) => setHrNotes(e.target.value)}
                placeholder={action === "approve" ? "Optional notes about the approval..." : "Please provide a reason for rejection..."}
                className="bg-blue-900/50 border-cyan-500/20 text-white"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSelectedRequest(null);
              setAction(null);
              setHrNotes("");
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={approveMutation.isPending || rejectMutation.isPending || (action === "reject" && !hrNotes.trim())}
              className={action === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {approveMutation.isPending || rejectMutation.isPending ? "Processing..." : action === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function HRRequests() {
  return (
    <ProtectedRoute>
      <HRRequestsContent />
    </ProtectedRoute>
  );
}
