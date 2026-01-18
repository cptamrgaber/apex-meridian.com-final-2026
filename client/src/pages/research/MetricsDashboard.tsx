import { useState } from "react";
import { Link } from "wouter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, TrendingUp, Users, FileText, Award } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function MetricsDashboard() {
  const [timeRange, setTimeRange] = useState("all");
  const [category, setCategory] = useState("all");

  // Publication trends data (by year)
  const publicationTrendsData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Publications",
        data: [2, 3, 5, 8, 12, 15],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Citation growth data
  const citationGrowthData = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Total Citations",
        data: [15, 45, 120, 280, 650, 1212],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Research areas distribution
  const researchAreasData = {
    labels: [
      "Natural Language Processing",
      "Computer Vision",
      "Quantum Computing",
      "Medical AI",
      "Robotics",
      "Reinforcement Learning",
    ],
    datasets: [
      {
        data: [25, 20, 15, 18, 12, 10],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Geographic collaboration data
  const geographicData = {
    labels: ["Egypt", "Africa", "Middle East", "North America", "Europe", "Asia"],
    datasets: [
      {
        label: "Active Partnerships",
        data: [8, 8, 6, 3, 5, 2],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

  // Impact metrics by institution
  const institutionImpactData = {
    labels: ["AUC", "Cairo Univ", "Zewail City", "AUB", "KAUST", "MIT"],
    datasets: [
      {
        label: "H-Index",
        data: [12, 15, 10, 18, 22, 35],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "Publications",
        data: [8, 12, 6, 15, 20, 28],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const exportData = () => {
    // Create CSV content
    const csv = `Research Metrics Dashboard Export
Generated: ${new Date().toLocaleDateString()}

Publication Trends:
Year,Publications
2020,2
2021,3
2022,5
2023,8
2024,12
2025,15

Citation Growth:
Year,Citations
2020,15
2021,45
2022,120
2023,280
2024,650
2025,1212

Geographic Distribution:
Region,Partnerships
Egypt,8
Africa,8
Middle East,6
North America,3
Europe,5
Asia,2
`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-metrics-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container">
          <Link href="/solutions/agi">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AGI Research
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research Metrics Dashboard</h1>
          <p className="text-xl text-blue-100">
            Interactive visualizations of our research impact and collaboration network
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">45</div>
            <div className="text-sm text-gray-600">Total Publications</div>
            <div className="text-xs text-green-600 mt-1">+15 this year</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-green-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">1,212</div>
            <div className="text-sm text-gray-600">Total Citations</div>
            <div className="text-xs text-green-600 mt-1">+562 this year</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-purple-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">32</div>
            <div className="text-sm text-gray-600">Active Partnerships</div>
            <div className="text-xs text-green-600 mt-1">+8 this year</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">27</div>
            <div className="text-sm text-gray-600">Average H-Index</div>
            <div className="text-xs text-green-600 mt-1">Top 5% globally</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Research Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="nlp">Natural Language Processing</SelectItem>
              <SelectItem value="cv">Computer Vision</SelectItem>
              <SelectItem value="quantum">Quantum Computing</SelectItem>
              <SelectItem value="medical">Medical AI</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={exportData} variant="outline" className="ml-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Data (CSV)
          </Button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Publication Trends */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Publication Trends</h3>
            <div className="h-[300px]">
              <Line data={publicationTrendsData} options={chartOptions} />
            </div>
          </Card>

          {/* Citation Growth */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Citation Growth</h3>
            <div className="h-[300px]">
              <Line data={citationGrowthData} options={chartOptions} />
            </div>
          </Card>

          {/* Research Areas Distribution */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Research Areas Distribution</h3>
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full max-w-[300px]">
                <Doughnut data={researchAreasData} options={chartOptions} />
              </div>
            </div>
          </Card>

          {/* Geographic Collaboration */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Geographic Collaboration</h3>
            <div className="h-[300px]">
              <Bar data={geographicData} options={chartOptions} />
            </div>
          </Card>

          {/* Institution Impact */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Institution Impact Metrics</h3>
            <div className="h-[300px]">
              <Bar
                data={institutionImpactData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
              />
            </div>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="p-8 mt-8">
          <h3 className="text-2xl font-bold mb-6">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-blue-600">
                Publication Growth
              </h4>
              <p className="text-gray-700">
                Our research output has grown by 150% in the past year, with a strong focus on
                Arabic NLP and quantum computing applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 text-green-600">
                Citation Impact
              </h4>
              <p className="text-gray-700">
                Citations have increased by 86% year-over-year, demonstrating the growing
                influence of our research in the global AI community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 text-purple-600">
                Regional Leadership
              </h4>
              <p className="text-gray-700">
                Egypt leads our partnership network with 8 active collaborations, followed by
                strong presence across Africa and the Middle East.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2 text-orange-600">
                Research Diversity
              </h4>
              <p className="text-gray-700">
                Our research spans 6 major AI domains, with NLP (25%) and Computer Vision (20%)
                being the most active areas of investigation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
