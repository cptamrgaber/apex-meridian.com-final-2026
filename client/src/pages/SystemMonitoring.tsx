import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Database, Mail, Server, Shield, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function SystemMonitoring() {
  const { data: systemHealth, isLoading, refetch } = trpc.monitoring.getSystemHealth.useQuery(
    undefined,
    {
      refetchInterval: 30000, // Auto-refresh every 30 seconds
    }
  );

  useEffect(() => {
    document.title = "System Monitoring - Apex Meridian";
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-500">Degraded</Badge>;
      case "down":
        return <Badge className="bg-red-500">Down</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName.toLowerCase()) {
      case "database":
        return <Database className="h-6 w-6" />;
      case "email service":
        return <Mail className="h-6 w-6" />;
      case "server":
        return <Server className="h-6 w-6" />;
      case "authentication":
        return <Shield className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading system status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time health status of all system components
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overall Status Card */}
      <Card className="mb-8 border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(systemHealth?.overall || "unknown")}
              <div>
                <CardTitle>Overall System Status</CardTitle>
                <CardDescription>
                  Last checked: {systemHealth?.timestamp ? new Date(systemHealth.timestamp).toLocaleString() : "N/A"}
                </CardDescription>
              </div>
            </div>
            {systemHealth && getStatusBadge(systemHealth.overall)}
          </div>
        </CardHeader>
        <CardContent>
          {systemHealth?.overall === "healthy" && (
            <p className="text-sm text-green-600">
              All systems operational. No issues detected.
            </p>
          )}
          {systemHealth?.overall === "degraded" && (
            <p className="text-sm text-yellow-600">
              Some systems are experiencing performance issues. Please review individual components below.
            </p>
          )}
          {systemHealth?.overall === "down" && (
            <p className="text-sm text-red-600">
              Critical systems are down. Immediate attention required.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Individual Service Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemHealth?.checks.map((check, index) => (
          <Card key={index} className={`
            ${check.status === "healthy" ? "border-green-200" : ""}
            ${check.status === "degraded" ? "border-yellow-200" : ""}
            ${check.status === "down" ? "border-red-200" : ""}
          `}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getServiceIcon(check.service)}
                  <div>
                    <CardTitle className="text-lg">{check.service}</CardTitle>
                    <CardDescription>
                      {check.lastChecked ? new Date(check.lastChecked).toLocaleTimeString() : "N/A"}
                    </CardDescription>
                  </div>
                </div>
                {getStatusIcon(check.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(check.status)}
                </div>
                
                {check.responseTime !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time:</span>
                    <span className={`text-sm ${
                      check.responseTime < 100 ? "text-green-600" : 
                      check.responseTime < 500 ? "text-yellow-600" : 
                      "text-red-600"
                    }`}>
                      {check.responseTime}ms
                    </span>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <p className={`text-sm ${
                    check.status === "healthy" ? "text-green-600" :
                    check.status === "degraded" ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {check.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Auto-refresh Notice */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          <Activity className="inline h-4 w-4 mr-1" />
          Status updates automatically every 30 seconds
        </p>
      </div>
    </div>
  );
}
