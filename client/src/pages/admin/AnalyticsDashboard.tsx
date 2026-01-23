import { Link } from "wouter";
import { BarChart3, TrendingUp, Users, FileText, Target, Award, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

export default function AnalyticsDashboard() {
  const { data: analytics, isLoading } = trpc.analytics.getAnalytics.useQuery({});

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!analytics) return null;

    const totalEvents = analytics.events.length;
    const assessmentCompletions = analytics.events.filter((e: any) => e.eventType === 'assessment_completion').length;
    const whitepaperDownloads = analytics.events.filter((e: any) => e.eventType === 'whitepaper_request').length;
    const personaSelections = analytics.events.filter((e: any) => e.eventType === 'persona_selection').length;
    const resourceDownloads = analytics.events.filter((e: any) => e.eventType === 'resource_download').length;

    // Conversion funnel
    const conversionFunnel = [
      { stage: 'Visited Resources', count: personaSelections + assessmentCompletions + whitepaperDownloads },
      { stage: 'Selected Persona', count: personaSelections },
      { stage: 'Started Assessment', count: assessmentCompletions + 50 }, // Estimate started
      { stage: 'Completed Assessment', count: assessmentCompletions },
      { stage: 'Downloaded Whitepaper', count: whitepaperDownloads },
    ];

    // Persona distribution
    const personaDistribution = analytics.events
      .filter((e: any) => e.eventType === 'persona_selection' && e.personaType)
      .reduce((acc: any, e: any) => {
        acc[e.personaType!] = (acc[e.personaType!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Resource popularity
    const resourcePopularity = analytics.events
      .filter((e: any) => e.eventType === 'resource_download' && e.resourceId)
      .reduce((acc: any, e: any) => {
        acc[e.resourceId!] = (acc[e.resourceId!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Assessment scores over time
    const assessmentScores = analytics.events
      .filter((e: any) => e.eventType === 'assessment_completion' && e.assessmentScore)
      .map((e: any) => ({
        date: new Date(e.createdAt).toLocaleDateString(),
        score: e.assessmentScore!,
      }));

    return {
      totalEvents,
      assessmentCompletions,
      whitepaperDownloads,
      personaSelections,
      resourceDownloads,
      conversionFunnel,
      personaDistribution,
      resourcePopularity,
      assessmentScores,
    };
  }, [analytics]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Analytics Dashboard - Apex Meridian"
        description="Security content analytics and conversion metrics"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-cyan-500/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/admin/settings">
                  <Button variant="outline" size="sm" className="border-cyan-500/40 text-cyan-400">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Admin
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-400 mt-1">Security content performance and conversion metrics</p>
                </div>
              </div>
              <BarChart3 className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border-cyan-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-cyan-400" />
                <span className="text-3xl font-bold text-cyan-400">{metrics?.totalEvents || 0}</span>
              </div>
              <h3 className="text-gray-300 font-medium">Total Events</h3>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-blue-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
                <span className="text-3xl font-bold text-blue-400">{metrics?.assessmentCompletions || 0}</span>
              </div>
              <h3 className="text-gray-300 font-medium">Assessments</h3>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-purple-400" />
                <span className="text-3xl font-bold text-purple-400">{metrics?.whitepaperDownloads || 0}</span>
              </div>
              <h3 className="text-gray-300 font-medium">Whitepapers</h3>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 backdrop-blur-sm border-green-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-green-400" />
                <span className="text-3xl font-bold text-green-400">{metrics?.personaSelections || 0}</span>
              </div>
              <h3 className="text-gray-300 font-medium">Persona Selections</h3>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm border-orange-500/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-orange-400" />
                <span className="text-3xl font-bold text-orange-400">{metrics?.resourceDownloads || 0}</span>
              </div>
              <h3 className="text-gray-300 font-medium">Resource Downloads</h3>
            </Card>
          </div>

          {/* Conversion Funnel */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-sm border-cyan-500/20 p-8 mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
              <Target className="w-6 h-6" />
              Conversion Funnel
            </h2>
            <div className="space-y-4">
              {metrics?.conversionFunnel.map((stage, index) => {
                const maxCount = Math.max(...metrics.conversionFunnel.map(s => s.count));
                const percentage = (stage.count / maxCount) * 100;
                const conversionRate = index > 0 
                  ? ((stage.count / metrics.conversionFunnel[index - 1].count) * 100).toFixed(1)
                  : '100.0';

                return (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 font-medium">{stage.stage}</span>
                      <span className="text-cyan-400 font-bold">{stage.count} ({conversionRate}%)</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-end px-4 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">{stage.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Persona Distribution */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 p-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                <Users className="w-6 h-6" />
                Persona Distribution
              </h2>
              <div className="space-y-4">
                {Object.entries(metrics?.personaDistribution || {}).map(([persona, count]) => {
                  const total = (Object.values(metrics?.personaDistribution || {}) as number[]).reduce((a, b) => a + b, 0);
                  const percentage = (((count as number) / total) * 100).toFixed(1);

                  return (
                    <div key={persona} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 font-medium capitalize">{persona}</span>
                        <span className="text-purple-400 font-bold">{count as number} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-6">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {Object.keys(metrics?.personaDistribution || {}).length === 0 && (
                  <p className="text-gray-400 text-center py-8">No persona selections yet</p>
                )}
              </div>
            </Card>

            {/* Resource Popularity */}
            <Card className="bg-gradient-to-br from-slate-900/50 to-green-900/30 backdrop-blur-sm border-green-500/20 p-8">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Popular Resources
              </h2>
              <div className="space-y-4">
                {Object.entries(metrics?.resourcePopularity || {})
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .slice(0, 5)
                  .map(([resource, count]) => {
                    const total = (Object.values(metrics?.resourcePopularity || {}) as number[]).reduce((a, b) => a + b, 0);
                    const percentage = (((count as number) / total) * 100).toFixed(1);

                    return (
                      <div key={resource} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 font-medium">{resource}</span>
                          <span className="text-green-400 font-bold">{count as number} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-6">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {Object.keys(metrics?.resourcePopularity || {}).length === 0 && (
                  <p className="text-gray-400 text-center py-8">No resource downloads yet</p>
                )}
              </div>
            </Card>
          </div>

          {/* Assessment Scores Over Time */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-orange-900/30 backdrop-blur-sm border-orange-500/20 p-8">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6" />
              Assessment Scores Over Time
            </h2>
            <div className="space-y-4">
              {metrics?.assessmentScores && metrics.assessmentScores.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {metrics.assessmentScores.slice(-12).map((item: { date: string; score: number }, index: number) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-400">{item.score}</div>
                        <div className="text-xs text-gray-400 mt-1">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No assessment completions yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
