import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Building, Calendar, TrendingUp, Award, Download } from "lucide-react";
import SEO from "@/components/SEO";

export default function LeadsDashboard() {
  const [scoreFilter, setScoreFilter] = useState<string>("");
  const { data: leads, isLoading } = trpc.analytics.getTopLeads.useQuery({ limit: 50 });

  // Filter leads by score
  const filteredLeads = leads?.filter((lead) => {
    if (!scoreFilter) return true;
    const minScore = parseInt(scoreFilter);
    return lead.totalScore >= minScore;
  }) || [];

  // Export to CSV
  const exportToCSV = () => {
    if (!filteredLeads.length) return;

    const headers = ["Email", "Total Score", "Assessments", "Whitepapers", "Personas", "Resources", "Last Activity"];
    const rows = filteredLeads.map((lead) => [
      lead.userEmail,
      lead.totalScore,
      lead.activities.assessmentCompletions,
      lead.activities.whitepaperDownloads,
      lead.activities.personaSelections,
      lead.activities.resourceDownloads,
      new Date(lead.lastActivity).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get score badge color
  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    if (score >= 40) return "bg-gradient-to-r from-orange-500 to-red-500";
    return "bg-gradient-to-r from-gray-500 to-slate-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Hot Lead";
    if (score >= 60) return "Warm Lead";
    if (score >= 40) return "Cold Lead";
    return "New Lead";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Leads Dashboard - Apex Meridian"
        description="Manage and track sales leads with automated scoring"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Award className="w-10 h-10 text-cyan-400" />
              Leads Dashboard
            </h1>
            <p className="text-gray-400">
              Track and manage prospects based on engagement scoring
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Leads</p>
                  <p className="text-3xl font-bold text-white">{filteredLeads.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Hot Leads (80+)</p>
                  <p className="text-3xl font-bold text-green-400">
                    {filteredLeads.filter((l) => l.totalScore >= 80).length}
                  </p>
                </div>
                <Award className="w-8 h-8 text-green-400" />
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Warm Leads (60-79)</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {filteredLeads.filter((l) => l.totalScore >= 60 && l.totalScore < 80).length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Avg Score</p>
                  <p className="text-3xl font-bold text-cyan-400">
                    {filteredLeads.length > 0
                      ? Math.round(
                          filteredLeads.reduce((sum, l) => sum + l.totalScore, 0) /
                            filteredLeads.length
                        )
                      : 0}
                  </p>
                </div>
                <Building className="w-8 h-8 text-cyan-400" />
              </div>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Minimum Score
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 60"
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>
              <Button
                onClick={exportToCSV}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>
          </Card>

          {/* Leads Table */}
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Score
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Activity Breakdown
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Last Activity
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        No leads found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.userEmail} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                              {lead.userEmail.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{lead.userEmail}</p>
                              <p className="text-sm text-gray-400">
                                {getScoreLabel(lead.totalScore)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getScoreBadgeColor(
                              lead.totalScore
                            )} text-white font-bold`}
                          >
                            <Award className="w-4 h-4" />
                            {lead.totalScore}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Assessments:</span>
                              <span className="text-green-400 font-bold">
                                {lead.activities.assessmentCompletions}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Whitepapers:</span>
                              <span className="text-blue-400 font-bold">
                                {lead.activities.whitepaperDownloads}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Personas:</span>
                              <span className="text-purple-400 font-bold">
                                {lead.activities.personaSelections}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Resources:</span>
                              <span className="text-cyan-400 font-bold">
                                {lead.activities.resourceDownloads}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(lead.lastActivity).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                              onClick={() => window.location.href = `mailto:${lead.userEmail}`}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
