import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/_core/hooks/useAuth';
import { Link, useLocation } from "wouter";
import { Shield, CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ModerationDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  const { data: stats, refetch: refetchStats } = trpc.moderation.getModerationStats.useQuery();
  const { data: queue, refetch: refetchQueue } = trpc.moderation.getModerationQueue.useQuery({
    status: selectedStatus,
    limit: 20,
    offset: 0,
  });

  const approveMutation = trpc.moderation.approveContent.useMutation({
    onSuccess: () => {
      toast.success("Content approved");
      refetchQueue();
      refetchStats();
    },
    onError: (error) => {
      toast.error(`Failed to approve: ${error.message}`);
    },
  });

  const rejectMutation = trpc.moderation.rejectContent.useMutation({
    onSuccess: () => {
      toast.success("Content rejected and removed");
      refetchQueue();
      refetchStats();
    },
    onError: (error) => {
      toast.error(`Failed to reject: ${error.message}`);
    },
  });

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white flex items-center justify-center">
        <Card className="max-w-md p-8 bg-slate-900/50 border-slate-800">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-slate-400 mb-6">You need admin privileges to access this page.</p>
          <Link href="/social">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Return to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getViolationColor = (type: string) => {
    switch (type) {
      case "hate_speech":
        return "bg-red-500";
      case "harassment":
        return "bg-orange-500";
      case "spam":
        return "bg-yellow-500";
      case "sexual_content":
        return "bg-pink-500";
      case "violence":
        return "bg-red-700";
      case "illegal":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-red-400";
    if (confidence >= 0.8) return "text-orange-400";
    return "text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold">AI Moderation Dashboard</h1>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/social">
                <Button variant="ghost" size="sm">Social Platform</Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" size="sm">Admin Panel</Button>
              </Link>
              <LanguageSwitcher />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-400">{stats?.pending || 0}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-yellow-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Approved</p>
                <p className="text-3xl font-bold text-green-400">{stats?.approved || 0}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Rejected</p>
                <p className="text-3xl font-bold text-red-400">{stats?.rejected || 0}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Reviewed</p>
                <p className="text-3xl font-bold text-blue-400">
                  {(stats?.approved || 0) + (stats?.rejected || 0)}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-400 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Violation Types */}
        {stats?.violationTypes && stats.violationTypes.length > 0 && (
          <Card className="p-6 bg-slate-900/50 border-slate-800 mb-8">
            <h2 className="text-xl font-bold mb-4">Violation Types (Pending)</h2>
            <div className="flex flex-wrap gap-3">
              {stats.violationTypes.map((vt: any) => (
                <Badge key={vt.type} className={`${getViolationColor(vt.type)} text-white px-4 py-2`}>
                  {vt.type?.replace(/_/g, " ").toUpperCase()}: {vt.count}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedStatus === "pending" ? "default" : "outline"}
            onClick={() => setSelectedStatus("pending")}
          >
            Pending ({stats?.pending || 0})
          </Button>
          <Button
            variant={selectedStatus === "approved" ? "default" : "outline"}
            onClick={() => setSelectedStatus("approved")}
          >
            Approved ({stats?.approved || 0})
          </Button>
          <Button
            variant={selectedStatus === "rejected" ? "default" : "outline"}
            onClick={() => setSelectedStatus("rejected")}
          >
            Rejected ({stats?.rejected || 0})
          </Button>
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            onClick={() => setSelectedStatus("all")}
          >
            All
          </Button>
        </div>

        {/* Moderation Queue */}
        <div className="space-y-4">
          {queue && queue.length > 0 ? (
            queue.map((item: any) => (
              <Card key={item.id} className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${getViolationColor(item.violationType)} text-white`}>
                        {item.violationType?.replace(/_/g, " ").toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300">
                        {item.contentType.toUpperCase()}
                      </Badge>
                      <span className={`text-sm font-semibold ${getConfidenceColor(item.aiConfidence)}`}>
                        Confidence: {(item.aiConfidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{item.reason}</p>
                    {item.content && (
                      <div className="bg-slate-800/50 rounded-lg p-4 mb-3">
                        <p className="text-sm text-slate-300 line-clamp-3">
                          {item.content.content || "No content available"}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Reported: {new Date(item.createdAt).toLocaleString()}</span>
                      {item.reporter && <span>By: {item.reporter.name}</span>}
                    </div>
                  </div>

                  {item.status === "pending" && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-900/20 border-green-700 hover:bg-green-900/40 text-green-400"
                        onClick={() => approveMutation.mutate({ queueId: item.id })}
                        disabled={approveMutation.isPending}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-900/20 border-red-700 hover:bg-red-900/40 text-red-400"
                        onClick={() =>
                          rejectMutation.mutate({ queueId: item.id, deleteContent: true })
                        }
                        disabled={rejectMutation.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject & Remove
                      </Button>
                    </div>
                  )}

                  {item.status !== "pending" && (
                    <Badge
                      className={
                        item.status === "approved"
                          ? "bg-green-900/20 text-green-400"
                          : "bg-red-900/20 text-red-400"
                      }
                    >
                      {item.status.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 bg-slate-900/50 border-slate-800 text-center">
              <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No items in moderation queue</p>
              <p className="text-slate-500 text-sm mt-2">
                {selectedStatus === "pending"
                  ? "All content has been reviewed"
                  : `No ${selectedStatus} items found`}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
