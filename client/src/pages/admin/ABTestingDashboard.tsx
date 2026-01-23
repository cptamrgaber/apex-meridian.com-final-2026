import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Play, Square, TrendingUp, Users, Target } from "lucide-react";

export default function ABTestingDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [testName, setTestName] = useState("");
  const [testPage, setTestPage] = useState("");
  const [variantA, setVariantA] = useState("");
  const [variantB, setVariantB] = useState("");

  const { data: tests, refetch } = trpc.abTesting.getAll.useQuery();
  const createTest = trpc.abTesting.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowCreateForm(false);
      setTestName("");
      setTestPage("");
      setVariantA("");
      setVariantB("");
    },
  });
  const startTest = trpc.abTesting.start.useMutation({
    onSuccess: () => refetch(),
  });
  const stopTest = trpc.abTesting.stop.useMutation({
    onSuccess: () => refetch(),
  });

  const handleCreateTest = () => {
    if (!testName || !testPage || !variantA || !variantB) return;
    createTest.mutate({
      name: testName,
      description: `A/B test for ${testPage}`,
      page: testPage,
      element: "cta-button",
      variantA: variantA,
      variantB: variantB,
    });
  };

  const calculateConversionRate = (impressions: number, conversions: number) => {
    if (impressions === 0) return 0;
    return ((conversions / impressions) * 100).toFixed(2);
  };

  const calculateSignificance = (test: any) => {
    const variantA = test.variants.find((v: any) => v.name === "A");
    const variantB = test.variants.find((v: any) => v.name === "B");
    
    if (!variantA || !variantB) return "N/A";
    
    const rateA = variantA.impressions > 0 ? variantA.conversions / variantA.impressions : 0;
    const rateB = variantB.impressions > 0 ? variantB.conversions / variantB.impressions : 0;
    
    const improvement = ((rateB - rateA) / (rateA || 1)) * 100;
    
    if (Math.abs(improvement) < 5) return "Not Significant";
    if (Math.abs(improvement) < 15) return "Moderate";
    return "High Significance";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">A/B Testing Dashboard</h1>
            <p className="text-slate-300">Optimize content with data-driven experiments</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </div>

        {/* Create Test Form */}
        {showCreateForm && (
          <Card className="bg-slate-800/50 border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Create New A/B Test</h2>
            <div className="grid gap-4">
              <div>
                <Label>Test Name</Label>
                <Input
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g., Security Assessment CTA Test"
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label>Target Page</Label>
                <Input
                  value={testPage}
                  onChange={(e) => setTestPage(e.target.value)}
                  placeholder="e.g., /solutions/cybersecurity"
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div>
                <Label>Variant A (Control)</Label>
                <Textarea
                  value={variantA}
                  onChange={(e) => setVariantA(e.target.value)}
                  placeholder="Original content/CTA text"
                  className="bg-slate-900 border-slate-700"
                  rows={3}
                />
              </div>
              <div>
                <Label>Variant B (Test)</Label>
                <Textarea
                  value={variantB}
                  onChange={(e) => setVariantB(e.target.value)}
                  placeholder="Alternative content/CTA text"
                  className="bg-slate-900 border-slate-700"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateTest}
                  disabled={createTest.isPending}
                  className="bg-cyan-500 hover:bg-cyan-600"
                >
                  Create Test
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="border-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Active Tests */}
        <div className="grid gap-6">
          {tests?.map((test: any) => {
            const variantA = test.variants.find((v: any) => v.name === "A");
            const variantB = test.variants.find((v: any) => v.name === "B");
            const significance = calculateSignificance(test);

            return (
              <Card key={test.id} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{test.name}</h3>
                    <p className="text-slate-400">Page: {test.page}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                        test.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : test.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {test.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {test.status === "draft" && (
                      <Button
                        onClick={() => startTest.mutate({ testId: test.id })}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                    {test.status === "active" && (
                      <Button
                        onClick={() => stopTest.mutate({ testId: test.id })}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    )}
                  </div>
                </div>

                {/* Variants Comparison */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Variant A */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">Variant A (Control)</h4>
                      <span className="text-slate-400 text-sm">Original</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">{variantA?.content}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <Users className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{variantA?.impressions || 0}</div>
                        <div className="text-xs text-slate-400">Impressions</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <Target className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{variantA?.conversions || 0}</div>
                        <div className="text-xs text-slate-400">Conversions</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <TrendingUp className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-cyan-400">
                          {calculateConversionRate(variantA?.impressions || 0, variantA?.conversions || 0)}%
                        </div>
                        <div className="text-xs text-slate-400">Conv. Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-cyan-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">Variant B (Test)</h4>
                      <span className="text-cyan-400 text-sm">Experiment</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">{variantB?.content}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <Users className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{variantB?.impressions || 0}</div>
                        <div className="text-xs text-slate-400">Impressions</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <Target className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{variantB?.conversions || 0}</div>
                        <div className="text-xs text-slate-400">Conversions</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                          <TrendingUp className="w-4 h-4 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-cyan-400">
                          {calculateConversionRate(variantB?.impressions || 0, variantB?.conversions || 0)}%
                        </div>
                        <div className="text-xs text-slate-400">Conv. Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistical Significance */}
                <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Statistical Significance:</span>
                    <span
                      className={`font-bold ${
                        significance === "High Significance"
                          ? "text-green-400"
                          : significance === "Moderate"
                          ? "text-yellow-400"
                          : "text-slate-400"
                      }`}
                    >
                      {significance}
                    </span>
                  </div>
                  {test.status === "active" && (
                    <p className="text-sm text-slate-400 mt-2">
                      Minimum 100 conversions per variant required for reliable results
                    </p>
                  )}
                </div>
              </Card>
            );
          })}

          {(!tests || tests.length === 0) && (
            <Card className="bg-slate-800/50 border-slate-700 p-12 text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-2xl font-bold mb-2">No A/B Tests Yet</h3>
              <p className="text-slate-400 mb-4">
                Create your first test to start optimizing content conversion rates
              </p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Test
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
