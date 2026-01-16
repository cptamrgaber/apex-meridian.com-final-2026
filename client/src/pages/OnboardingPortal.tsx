import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  GraduationCap, 
  Lock, 
  PlayCircle,
  Download,
  ExternalLink
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";

function OnboardingPortalContent() {
  const { employee } = useEmployeeAuth();
  const [, setLocation] = useLocation();
  const [completedModules, setCompletedModules] = useState<number[]>([1, 2]);

  const trainingModules = [
    {
      id: 1,
      title: "Welcome to Apex Meridian",
      description: "Introduction to company culture, values, and mission",
      duration: "30 minutes",
      type: "video",
      status: "completed",
      department: "all"
    },
    {
      id: 2,
      title: "Company Policies & Code of Conduct",
      description: "Essential policies, ethics, and professional standards",
      duration: "45 minutes",
      type: "document",
      status: "completed",
      department: "all"
    },
    {
      id: 3,
      title: "Information Security & Data Protection",
      description: "Cybersecurity best practices and data handling procedures",
      duration: "40 minutes",
      type: "interactive",
      status: "in-progress",
      department: "all"
    },
    {
      id: 4,
      title: "AI Ethics & Responsible AI Development",
      description: "Ethical considerations in AI development and deployment",
      duration: "50 minutes",
      type: "video",
      status: "locked",
      department: "all"
    },
    {
      id: 5,
      title: "Engineering Best Practices",
      description: "Code standards, review process, and development workflow",
      duration: "60 minutes",
      type: "interactive",
      status: "locked",
      department: "Engineering"
    },
    {
      id: 6,
      title: "Sales Methodology & Customer Engagement",
      description: "Sales process, CRM usage, and customer relationship management",
      duration: "55 minutes",
      type: "video",
      status: "locked",
      department: "Sales"
    },
    {
      id: 7,
      title: "Marketing Strategy & Brand Guidelines",
      description: "Brand identity, messaging, and marketing tools",
      duration: "45 minutes",
      type: "document",
      status: "locked",
      department: "Marketing"
    },
    {
      id: 8,
      title: "HR Policies & Employee Relations",
      description: "HR procedures, benefits, and employee support systems",
      duration: "50 minutes",
      type: "interactive",
      status: "locked",
      department: "HR"
    }
  ];

  const documents = [
    {
      id: 1,
      title: "Employee Handbook",
      description: "Comprehensive guide to company policies and procedures",
      category: "General",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Code of Conduct",
      description: "Professional standards and ethical guidelines",
      category: "General",
      size: "856 KB",
      format: "PDF"
    },
    {
      id: 3,
      title: "Benefits Guide",
      description: "Healthcare, insurance, and employee benefits information",
      category: "HR",
      size: "1.8 MB",
      format: "PDF"
    },
    {
      id: 4,
      title: "IT Security Policy",
      description: "Information security requirements and best practices",
      category: "Security",
      size: "1.2 MB",
      format: "PDF"
    },
    {
      id: 5,
      title: "Data Protection Guidelines",
      description: "GDPR compliance and data handling procedures",
      category: "Security",
      size: "980 KB",
      format: "PDF"
    },
    {
      id: 6,
      title: "Emergency Procedures",
      description: "Safety protocols and emergency response procedures",
      category: "Safety",
      size: "645 KB",
      format: "PDF"
    }
  ];

  const departmentResources = [
    {
      department: "Engineering",
      resources: [
        "Development Environment Setup Guide",
        "Git Workflow & Branching Strategy",
        "Code Review Checklist",
        "API Documentation Standards",
        "Testing Best Practices"
      ]
    },
    {
      department: "Sales",
      resources: [
        "Product Portfolio Overview",
        "Sales Pitch Templates",
        "CRM User Guide",
        "Pricing & Discount Guidelines",
        "Customer Onboarding Process"
      ]
    },
    {
      department: "Marketing",
      resources: [
        "Brand Guidelines",
        "Social Media Policy",
        "Content Calendar Template",
        "Marketing Analytics Dashboard",
        "Campaign Planning Toolkit"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "locked":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "locked":
        return <Lock className="h-4 w-4" />;
      default:
        return <PlayCircle className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-cyan-400" />;
      case "document":
        return <FileText className="h-5 w-5 text-blue-400" />;
      case "interactive":
        return <GraduationCap className="h-5 w-5 text-purple-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-400" />;
    }
  };

  const completionPercentage = (completedModules.length / trainingModules.filter(m => m.department === "all" || m.department === employee?.department).length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
              <GraduationCap className="mr-2 h-4 w-4" />
              Employee Onboarding
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              Welcome, {employee?.name}!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete your onboarding journey and get up to speed with Apex Meridian's culture, policies, and best practices.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Onboarding Progress</span>
                <span className="text-sm font-semibold text-cyan-400">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-sm text-gray-400 mt-2">
                {completedModules.length} of {trainingModules.filter(m => m.department === "all" || m.department === employee?.department).length} modules completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="training" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="training">Training Modules</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="resources">Department Resources</TabsTrigger>
              </TabsList>

              {/* Training Modules Tab */}
              <TabsContent value="training" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {trainingModules
                    .filter(module => module.department === "all" || module.department === employee?.department)
                    .map((module) => (
                      <Card key={module.id} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                {getTypeIcon(module.type)}
                              </div>
                              <div>
                                <CardTitle className="text-xl text-white">{module.title}</CardTitle>
                                <CardDescription className="mt-2">{module.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getStatusColor(module.status)}>
                                {getStatusIcon(module.status)}
                                <span className="ml-1 capitalize">{module.status.replace("-", " ")}</span>
                              </Badge>
                              <Badge variant="outline" className="border-gray-600 text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {module.duration}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-3">
                            {module.status === "locked" ? (
                              <Button disabled variant="outline" className="border-gray-600">
                                <Lock className="mr-2 h-4 w-4" />
                                Locked
                              </Button>
                            ) : module.status === "completed" ? (
                              <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Review Module
                              </Button>
                            ) : (
                              <Button className="bg-cyan-600 hover:bg-cyan-700">
                                <PlayCircle className="mr-2 h-4 w-4" />
                                {module.status === "in-progress" ? "Continue" : "Start"} Module
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <FileText className="h-6 w-6 text-cyan-400 mt-1" />
                          <div>
                            <CardTitle className="text-lg text-white">{doc.title}</CardTitle>
                            <CardDescription className="mt-1">{doc.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              {doc.category}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              {doc.format} • {doc.size}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Department Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                {departmentResources
                  .filter(dept => dept.department === employee?.department)
                  .map((dept, idx) => (
                    <Card key={idx} className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-2xl text-white">{dept.department} Resources</CardTitle>
                        <CardDescription>
                          Department-specific guides, templates, and documentation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {dept.resources.map((resource, ridx) => (
                            <div
                              key={ridx}
                              className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <BookOpen className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-200">{resource}</span>
                              </div>
                              <Button size="sm" variant="ghost" className="text-cyan-400 hover:bg-cyan-500/10">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {departmentResources.filter(dept => dept.department === employee?.department).length === 0 && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6">
                      <p className="text-center text-gray-400">
                        No department-specific resources available yet. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function OnboardingPortal() {
  return (
    <ProtectedRoute>
      <OnboardingPortalContent />
    </ProtectedRoute>
  );
}
