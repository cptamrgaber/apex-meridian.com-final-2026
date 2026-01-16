import { useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail
} from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Department data configuration
const departmentData: Record<string, any> = {
  engineering: {
    name: "Engineering",
    description: "Building cutting-edge AI systems and infrastructure",
    email: "engineering@apex-meridian.com",
    policies: [
      "Code review required for all production deployments",
      "Security-first development practices mandatory",
      "Weekly team sync meetings every Monday 10 AM",
      "On-call rotation schedule published monthly",
      "Documentation required for all new features"
    ],
    projects: [
      { name: "Meridian Engine v3.0", progress: 75, status: "in_progress" },
      { name: "Aviation Safety AI Module", progress: 60, status: "in_progress" },
      { name: "Cloud Infrastructure Migration", progress: 90, status: "in_progress" }
    ]
  },
  research: {
    name: "Research & Development",
    description: "Advancing the frontiers of artificial intelligence",
    email: "research@apex-meridian.com",
    policies: [
      "Research papers must be peer-reviewed before publication",
      "Weekly research presentations every Friday 2 PM",
      "Collaboration with academic institutions encouraged",
      "Ethical AI guidelines must be followed in all research",
      "Experimental results must be reproducible"
    ],
    projects: [
      { name: "AGI Neural-Symbolic Architecture", progress: 45, status: "in_progress" },
      { name: "Explainable AI Framework", progress: 70, status: "in_progress" },
      { name: "Reinforcement Learning Optimization", progress: 55, status: "in_progress" }
    ]
  },
  sales: {
    name: "Sales & Business Development",
    description: "Driving growth and building client relationships",
    email: "sales@apex-meridian.com",
    policies: [
      "CRM must be updated daily with all client interactions",
      "Sales targets reviewed quarterly",
      "Client confidentiality agreements strictly enforced",
      "Weekly pipeline review meetings every Wednesday 11 AM",
      "Follow-up required within 24 hours of initial contact"
    ],
    projects: [
      { name: "Q1 Enterprise Client Acquisition", progress: 80, status: "in_progress" },
      { name: "Partner Channel Development", progress: 50, status: "in_progress" },
      { name: "Middle East Market Expansion", progress: 65, status: "in_progress" }
    ]
  },
  marketing: {
    name: "Marketing & Communications",
    description: "Building brand awareness and market presence",
    email: "marketing@apex-meridian.com",
    policies: [
      "All external communications must be brand-compliant",
      "Social media posts require approval before publishing",
      "Monthly content calendar must be submitted by 25th",
      "Campaign ROI tracking mandatory for all initiatives",
      "Brand guidelines must be followed in all materials"
    ],
    projects: [
      { name: "Q1 Digital Marketing Campaign", progress: 70, status: "in_progress" },
      { name: "Website Redesign Project", progress: 95, status: "in_progress" },
      { name: "Industry Conference Participation", progress: 40, status: "planning" }
    ]
  },
  operations: {
    name: "Operations & Project Management",
    description: "Ensuring smooth execution and delivery",
    email: "operations@apex-meridian.com",
    policies: [
      "Project status updates required weekly",
      "Risk assessment mandatory for all new projects",
      "Resource allocation reviewed monthly",
      "Client deliverables must meet quality standards",
      "Change requests must be documented and approved"
    ],
    projects: [
      { name: "Process Optimization Initiative", progress: 60, status: "in_progress" },
      { name: "Client Onboarding Automation", progress: 75, status: "in_progress" },
      { name: "Project Management Tool Migration", progress: 85, status: "in_progress" }
    ]
  },
  hr: {
    name: "Human Resources",
    description: "Supporting our people and culture",
    email: "hr@apex-meridian.com",
    policies: [
      "Employee confidentiality strictly maintained",
      "Performance reviews conducted bi-annually",
      "Training budget allocation reviewed quarterly",
      "Workplace safety protocols must be followed",
      "Equal opportunity employment practices enforced"
    ],
    projects: [
      { name: "Talent Acquisition Campaign", progress: 70, status: "in_progress" },
      { name: "Employee Wellness Program Launch", progress: 55, status: "in_progress" },
      { name: "HR System Upgrade", progress: 80, status: "in_progress" }
    ]
  },
  finance: {
    name: "Finance & Accounting",
    description: "Managing financial health and compliance",
    email: "finance@apex-meridian.com",
    policies: [
      "Monthly financial reports due by 5th of each month",
      "Expense approvals required for amounts over EGP 10,000",
      "Audit compliance mandatory for all transactions",
      "Budget reviews conducted quarterly",
      "Financial data confidentiality strictly enforced"
    ],
    projects: [
      { name: "Financial System Integration", progress: 65, status: "in_progress" },
      { name: "Cost Optimization Analysis", progress: 50, status: "in_progress" },
      { name: "Annual Audit Preparation", progress: 75, status: "in_progress" }
    ]
  },
  legal: {
    name: "Legal & Compliance",
    description: "Ensuring regulatory compliance and legal protection",
    email: "legal@apex-meridian.com",
    policies: [
      "All contracts must be reviewed before signing",
      "Compliance training required annually for all staff",
      "Data protection regulations must be strictly followed",
      "Legal consultation required for new business models",
      "Intellectual property must be protected"
    ],
    projects: [
      { name: "GDPR Compliance Implementation", progress: 80, status: "in_progress" },
      { name: "Contract Template Standardization", progress: 90, status: "in_progress" },
      { name: "IP Portfolio Management", progress: 60, status: "in_progress" }
    ]
  },
  support: {
    name: "Customer Success & Support",
    description: "Delivering exceptional client experiences",
    email: "support@apex-meridian.com",
    policies: [
      "Response time SLA: 4 hours for critical issues",
      "Customer satisfaction surveys sent after each resolution",
      "Knowledge base must be updated weekly",
      "Escalation procedures must be followed for complex issues",
      "Customer feedback must be documented"
    ],
    projects: [
      { name: "Support Portal Enhancement", progress: 70, status: "in_progress" },
      { name: "Customer Success Playbook Development", progress: 55, status: "in_progress" },
      { name: "AI-Powered Chatbot Integration", progress: 45, status: "planning" }
    ]
  },
  product: {
    name: "Product Management",
    description: "Shaping product vision and roadmap",
    email: "product@apex-meridian.com",
    policies: [
      "Product roadmap reviewed quarterly with stakeholders",
      "User feedback must be incorporated in planning",
      "Feature prioritization based on business impact",
      "Product metrics tracked and reported monthly",
      "Cross-functional collaboration required for launches"
    ],
    projects: [
      { name: "Product Roadmap Q2 Planning", progress: 60, status: "in_progress" },
      { name: "User Research Initiative", progress: 70, status: "in_progress" },
      { name: "Feature Analytics Dashboard", progress: 50, status: "in_progress" }
    ]
  },
  security: {
    name: "Security & Safety",
    description: "Protecting systems and ensuring safety",
    email: "security@apex-meridian.com",
    policies: [
      "Security incidents must be reported immediately",
      "Quarterly security audits mandatory",
      "Access controls reviewed monthly",
      "Safety drills conducted bi-annually",
      "Security awareness training required for all staff"
    ],
    projects: [
      { name: "Zero Trust Architecture Implementation", progress: 65, status: "in_progress" },
      { name: "Security Awareness Training Program", progress: 75, status: "in_progress" },
      { name: "Incident Response Plan Update", progress: 80, status: "in_progress" }
    ]
  },
  quality: {
    name: "Quality Assurance",
    description: "Ensuring excellence in all deliverables",
    email: "quality@apex-meridian.com",
    policies: [
      "All releases must pass QA approval",
      "Test coverage minimum 80% for critical systems",
      "Bug triage meetings held twice weekly",
      "Quality metrics reported monthly",
      "Continuous improvement initiatives encouraged"
    ],
    projects: [
      { name: "Automated Testing Framework", progress: 70, status: "in_progress" },
      { name: "Performance Testing Suite", progress: 60, status: "in_progress" },
      { name: "Quality Standards Documentation", progress: 85, status: "in_progress" }
    ]
  }
};

export default function DepartmentPortal() {
  const [, params] = useRoute("/departments/:dept");
  const dept = params?.dept || "engineering";
  const deptData = departmentData[dept];

  const [activeTab, setActiveTab] = useState<"overview" | "policies" | "projects" | "team">("overview");

  if (!deptData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 flex items-center justify-center">
        <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Department Not Found</h2>
            <Link href="/employee-portal">
              <Button className="bg-cyan-500 hover:bg-cyan-600">
                Return to Employee Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in_progress": return "bg-blue-500";
      case "on_hold": return "bg-yellow-500";
      case "planning": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "in_progress": return <Clock className="h-4 w-4" />;
      case "on_hold": return <AlertCircle className="h-4 w-4" />;
      case "planning": return <TrendingUp className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <>
      <SEO 
        title={`${deptData.name} Portal - Apex Meridian`}
        description={deptData.description}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <Header />
        
        <main className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <Link href="/employee-portal">
                <Button variant="outline" className="mb-4 text-white border-cyan-500/50 hover:bg-cyan-500/20">
                  ← Back to Employee Portal
                </Button>
              </Link>
              <h1 className="text-4xl font-bold text-white mb-2">{deptData.name} Department</h1>
              <p className="text-xl text-gray-300 mb-2">{deptData.description}</p>
              <a href={`mailto:${deptData.email}`} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {deptData.email}
              </a>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {["overview", "policies", "projects", "team"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as any)}
                  className={activeTab === tab ? "bg-cyan-500" : "text-white border-cyan-500/50 hover:bg-cyan-500/20"}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-cyan-400" />
                      Active Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-cyan-400">{deptData.policies.length}</div>
                    <p className="text-gray-300 text-sm mt-2">Department guidelines</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Active Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-green-400">{deptData.projects.length}</div>
                    <p className="text-gray-300 text-sm mt-2">In progress</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link href="/organization-chart">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">
                        View Team
                      </Button>
                    </Link>
                    <p className="text-gray-300 text-sm mt-2">Department roster</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === "policies" && (
              <div className="space-y-4">
                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Department Policies & Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deptData.policies.map((policy: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-blue-950/50 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-200">{policy}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Related Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/employee-portal">
                        <Button variant="outline" className="w-full justify-start text-white border-cyan-500/50 hover:bg-cyan-500/20">
                          <FileText className="h-4 w-4 mr-2" />
                          Employee Handbook
                        </Button>
                      </Link>
                      <Link href="/employee-portal">
                        <Button variant="outline" className="w-full justify-start text-white border-cyan-500/50 hover:bg-cyan-500/20">
                          <FileText className="h-4 w-4 mr-2" />
                          Company Policies
                        </Button>
                      </Link>
                      <Link href="/employee-portal">
                        <Button variant="outline" className="w-full justify-start text-white border-cyan-500/50 hover:bg-cyan-500/20">
                          <FileText className="h-4 w-4 mr-2" />
                          Safety Regulations
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                {deptData.projects.map((project: any, index: number) => (
                  <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white">{project.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`${getStatusColor(project.status)} text-white`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(project.status)}
                                {project.status.replace("_", " ").toUpperCase()}
                              </span>
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-cyan-400">{project.progress}%</div>
                          <p className="text-gray-400 text-sm">Complete</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={project.progress} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Department Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    View all team members in the {deptData.name} department and their roles.
                  </p>
                  <Link href="/organization-chart">
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      View Organization Chart
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
