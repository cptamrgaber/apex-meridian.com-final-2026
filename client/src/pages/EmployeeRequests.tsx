import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Briefcase, CheckCircle2, Clock, XCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function EmployeeRequests() {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState<"vacation" | "duty" | "report">("vacation");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    details: "",
    assignmentType: "",
    location: ""
  });

  const { data: requests, refetch } = trpc.employee.getMyRequests.useQuery();
  const submitRequest = trpc.employee.submitRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Your request has been submitted for approval.",
      });
      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
        details: "",
        assignmentType: "",
        location: ""
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitRequest.mutate({
      type: requestType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      details: formData.details,
      assignmentType: formData.assignmentType || undefined,
      location: formData.location || undefined,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <>
      <SEO 
        title="Employee Requests - Apex Meridian"
        description="Submit and track vacation requests, duty assignments, and reports"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <Header />
        
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link href="/employee-portal">
              <Button variant="outline" className="mb-4 text-white border-cyan-500/50 hover:bg-cyan-500/20">
                ← Back to Employee Portal
              </Button>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-8">Employee Requests</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Submit Request Form */}
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Submit New Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="requestType" className="text-white">Request Type</Label>
                      <Select value={requestType} onValueChange={(value: any) => setRequestType(value)}>
                        <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Vacation Request
                            </div>
                          </SelectItem>
                          <SelectItem value="duty">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              Duty Assignment
                            </div>
                          </SelectItem>
                          <SelectItem value="report">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Report Submission
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(requestType === "vacation" || requestType === "duty") && (
                      <>
                        <div>
                          <Label htmlFor="startDate" className="text-white">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="bg-blue-950/50 border-cyan-500/30 text-white"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="endDate" className="text-white">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="bg-blue-950/50 border-cyan-500/30 text-white"
                            required
                          />
                        </div>
                      </>
                    )}

                    {requestType === "duty" && (
                      <>
                        <div>
                          <Label htmlFor="assignmentType" className="text-white">Assignment Type</Label>
                          <Input
                            id="assignmentType"
                            value={formData.assignmentType}
                            onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                            placeholder="e.g., Project Lead, Field Work, Training"
                            className="bg-blue-950/50 border-cyan-500/30 text-white"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="location" className="text-white">Location</Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g., Cairo Office, Client Site"
                            className="bg-blue-950/50 border-cyan-500/30 text-white"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="reason" className="text-white">
                        {requestType === "report" ? "Report Title" : "Reason"}
                      </Label>
                      <Input
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder={requestType === "report" ? "Enter report title" : "Brief reason for request"}
                        className="bg-blue-950/50 border-cyan-500/30 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="details" className="text-white">
                        {requestType === "report" ? "Report Content" : "Additional Details"}
                      </Label>
                      <Textarea
                        id="details"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder={requestType === "report" ? "Enter detailed report content..." : "Provide additional information..."}
                        className="bg-blue-950/50 border-cyan-500/30 text-white min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                      disabled={submitRequest.isPending}
                    >
                      {submitRequest.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* My Requests List */}
              <div className="space-y-4">
                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">My Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!requests || requests.length === 0 ? (
                      <p className="text-gray-300 text-center py-8">No requests yet</p>
                    ) : (
                      <div className="space-y-3">
                        {requests.map((request: any) => (
                          <div
                            key={request.id}
                            className="p-4 bg-blue-950/50 rounded-lg border border-cyan-500/20"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  {request.requestType === "vacation" && <Calendar className="h-4 w-4 text-cyan-400" />}
                                  {request.requestType === "duty_assignment" && <Briefcase className="h-4 w-4 text-purple-400" />}
                                  {request.requestType === "report" && <FileText className="h-4 w-4 text-green-400" />}
                                  <span className="text-white font-medium capitalize">{request.requestType.replace("_", " ")}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{request.title}</p>
                              </div>
                              <Badge className={`${getStatusColor(request.status)} text-white`}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(request.status)}
                                  {request.status.toUpperCase()}
                                </span>
                              </Badge>
                            </div>

                            {(request.startDate || request.endDate) && (
                              <div className="text-sm text-gray-400 mt-2">
                                {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                              </div>
                            )}

                            <div className="text-sm text-gray-400 mt-2">
                              {request.description.substring(0, 100)}{request.description.length > 100 ? "..." : ""}
                            </div>

                            <div className="text-xs text-gray-500 mt-2">
                              Submitted: {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
