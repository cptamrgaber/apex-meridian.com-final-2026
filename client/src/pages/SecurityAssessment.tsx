import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Download } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Question {
  id: string;
  category: string;
  text: string;
  options: { value: number; label: string }[];
}

const questions: Question[] = [
  // Identity & Access Management
  { id: "iam1", category: "Identity & Access Management", text: "Do you enforce multi-factor authentication (MFA) for all users accessing critical systems?", options: [{ value: 0, label: "No MFA" }, { value: 5, label: "MFA for admins only" }, { value: 10, label: "MFA for all users" }] },
  { id: "iam2", category: "Identity & Access Management", text: "How frequently do you review and revoke unnecessary user access permissions?", options: [{ value: 0, label: "Never/Rarely" }, { value: 5, label: "Annually" }, { value: 7, label: "Quarterly" }, { value: 10, label: "Monthly or continuous" }] },
  { id: "iam3", category: "Identity & Access Management", text: "Do you implement least-privilege access controls across your environment?", options: [{ value: 0, label: "No" }, { value: 5, label: "Partially" }, { value: 10, label: "Yes, fully implemented" }] },
  
  // Network Security
  { id: "net1", category: "Network Security", text: "Do you segment your network to isolate critical systems from general corporate networks?", options: [{ value: 0, label: "No segmentation" }, { value: 5, label: "Basic segmentation" }, { value: 10, label: "Micro-segmentation with Zero Trust" }] },
  { id: "net2", category: "Network Security", text: "How do you monitor network traffic for anomalous behavior?", options: [{ value: 0, label: "No monitoring" }, { value: 5, label: "Basic firewall logs" }, { value: 7, label: "IDS/IPS" }, { value: 10, label: "AI-powered NDR with behavioral analytics" }] },
  { id: "net3", category: "Network Security", text: "Do you encrypt data in transit across all network connections?", options: [{ value: 0, label: "No encryption" }, { value: 5, label: "Partial encryption" }, { value: 10, label: "Full encryption (TLS 1.3+)" }] },
  
  // Endpoint Security
  { id: "end1", category: "Endpoint Security", text: "What endpoint protection do you deploy across your fleet?", options: [{ value: 0, label: "Antivirus only" }, { value: 5, label: "EPP (Endpoint Protection Platform)" }, { value: 10, label: "EDR/XDR with threat hunting" }] },
  { id: "end2", category: "Endpoint Security", text: "How quickly do you patch critical vulnerabilities on endpoints?", options: [{ value: 0, label: ">30 days" }, { value: 5, label: "7-30 days" }, { value: 7, label: "1-7 days" }, { value: 10, label: "<24 hours (automated)" }] },
  { id: "end3", category: "Endpoint Security", text: "Do you enforce device compliance policies (encryption, OS version, etc.)?", options: [{ value: 0, label: "No enforcement" }, { value: 5, label: "Partial enforcement" }, { value: 10, label: "Full enforcement with automated remediation" }] },
  
  // Threat Detection & Response
  { id: "tdr1", category: "Threat Detection & Response", text: "Do you have a Security Operations Center (SOC) monitoring your environment 24/7?", options: [{ value: 0, label: "No SOC" }, { value: 5, label: "Business hours only" }, { value: 10, label: "24/7 SOC (internal or outsourced)" }] },
  { id: "tdr2", category: "Threat Detection & Response", text: "What is your mean time to detect (MTTD) security incidents?", options: [{ value: 0, label: ">24 hours" }, { value: 5, label: "1-24 hours" }, { value: 7, label: "15 min - 1 hour" }, { value: 10, label: "<15 minutes" }] },
  { id: "tdr3", category: "Threat Detection & Response", text: "Do you have documented incident response playbooks and conduct regular drills?", options: [{ value: 0, label: "No playbooks" }, { value: 5, label: "Playbooks exist, no drills" }, { value: 10, label: "Playbooks with quarterly drills" }] },
  
  // Data Protection
  { id: "data1", category: "Data Protection", text: "Do you encrypt sensitive data at rest (databases, file storage)?", options: [{ value: 0, label: "No encryption" }, { value: 5, label: "Partial encryption" }, { value: 10, label: "Full encryption with key management" }] },
  { id: "data2", category: "Data Protection", text: "Do you implement data loss prevention (DLP) controls?", options: [{ value: 0, label: "No DLP" }, { value: 5, label: "Basic DLP (email only)" }, { value: 10, label: "Comprehensive DLP (network, endpoint, cloud)" }] },
  { id: "data3", category: "Data Protection", text: "How frequently do you back up critical data and test recovery procedures?", options: [{ value: 0, label: "Rarely/Never" }, { value: 5, label: "Monthly backups, no testing" }, { value: 7, label: "Weekly backups, annual testing" }, { value: 10, label: "Daily backups, quarterly testing" }] },
  
  // Cloud Security
  { id: "cloud1", category: "Cloud Security", text: "Do you use a Cloud Security Posture Management (CSPM) tool?", options: [{ value: 0, label: "No CSPM" }, { value: 5, label: "Manual audits" }, { value: 10, label: "Automated CSPM with remediation" }] },
  { id: "cloud2", category: "Cloud Security", text: "How do you manage cloud access and permissions (IAM)?", options: [{ value: 0, label: "Overly permissive" }, { value: 5, label: "Basic IAM policies" }, { value: 10, label: "Least-privilege with automated reviews" }] },
  { id: "cloud3", category: "Cloud Security", text: "Do you monitor cloud workloads for vulnerabilities and misconfigurations?", options: [{ value: 0, label: "No monitoring" }, { value: 5, label: "Periodic scans" }, { value: 10, label: "Continuous monitoring with alerts" }] },
  
  // Compliance & Governance
  { id: "comp1", category: "Compliance & Governance", text: "Are you compliant with relevant regulations (ISO 27001, NIST CSF, PDPL, etc.)?", options: [{ value: 0, label: "Non-compliant" }, { value: 5, label: "Partially compliant" }, { value: 10, label: "Fully compliant with certifications" }] },
  { id: "comp2", category: "Compliance & Governance", text: "Do you conduct regular security audits and penetration tests?", options: [{ value: 0, label: "Never" }, { value: 5, label: "Annually" }, { value: 10, label: "Quarterly or more frequently" }] },
  { id: "comp3", category: "Compliance & Governance", text: "Do you have a documented security policy and training program for employees?", options: [{ value: 0, label: "No policy/training" }, { value: 5, label: "Policy exists, no training" }, { value: 10, label: "Policy with mandatory annual training" }] },
];

export default function SecurityAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showReport, setShowReport] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", company: "", role: "" });

  const categories = Array.from(new Set(questions.map(q => q.category)));
  const questionsPerStep = questions.length / categories.length;
  const currentQuestions = questions.slice(currentStep * questionsPerStep, (currentStep + 1) * questionsPerStep);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowReport(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 10;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getRiskLevel = (score: number): { level: string; color: string; description: string } => {
    if (score >= 80) return { level: "Low Risk", color: "text-green-400", description: "Your security posture is strong with comprehensive controls across all domains" };
    if (score >= 60) return { level: "Moderate Risk", color: "text-yellow-400", description: "You have foundational security controls but gaps exist in advanced threat detection and response" };
    if (score >= 40) return { level: "High Risk", color: "text-orange-400", description: "Significant security gaps exist across multiple domains, leaving you vulnerable to attacks" };
    return { level: "Critical Risk", color: "text-red-400", description: "Your security posture is severely inadequate and requires immediate remediation" };
  };

  const getCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
    const totalScore = categoryAnswers.reduce((sum, val) => sum + val, 0);
    const maxScore = categoryQuestions.length * 10;
    return Math.round((totalScore / maxScore) * 100);
  };

  const getRecommendations = (score: number): string[] => {
    const recs: string[] = [];
    
    if (getCategoryScore("Identity & Access Management") < 70) {
      recs.push("Implement Zero Trust architecture with continuous authentication and least-privilege access controls");
    }
    if (getCategoryScore("Network Security") < 70) {
      recs.push("Deploy AI-powered network detection and response (NDR) with behavioral anomaly detection");
    }
    if (getCategoryScore("Endpoint Security") < 70) {
      recs.push("Upgrade to EDR/XDR solution with automated threat hunting and response capabilities");
    }
    if (getCategoryScore("Threat Detection & Response") < 70) {
      recs.push("Establish 24/7 SOC operations with AI-augmented threat intelligence and automated playbooks");
    }
    if (getCategoryScore("Data Protection") < 70) {
      recs.push("Implement comprehensive data loss prevention (DLP) and encryption across all data stores");
    }
    if (getCategoryScore("Cloud Security") < 70) {
      recs.push("Deploy Cloud Security Posture Management (CSPM) with automated misconfiguration remediation");
    }
    if (getCategoryScore("Compliance & Governance") < 70) {
      recs.push("Conduct security audit and implement compliance framework (ISO 27001, NIST CSF, PDPL 151/2020)");
    }

    if (recs.length === 0) {
      recs.push("Maintain current security posture with continuous monitoring and quarterly penetration testing");
      recs.push("Consider post-quantum cryptography implementation to future-proof encryption");
      recs.push("Expand threat hunting capabilities with proactive adversary emulation exercises");
    }

    return recs;
  };

  if (showReport) {
    const score = calculateScore();
    const risk = getRiskLevel(score);
    const recommendations = getRecommendations(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SEO 
          title="Security Assessment Report - Apex Meridian"
          description="Your personalized security posture assessment and architecture recommendations"
        />
        <Header />
        
        <section className="pt-32 pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-10 w-10 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-lg">Security Assessment Report</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Security Posture: <span className={`text-transparent bg-clip-text bg-gradient-to-r ${risk.color === 'text-green-400' ? 'from-green-400 to-cyan-400' : risk.color === 'text-yellow-400' ? 'from-yellow-400 to-orange-400' : risk.color === 'text-orange-400' ? 'from-orange-400 to-red-400' : 'from-red-400 to-pink-400'}`}>{score}/100</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Based on your responses, here's your comprehensive security assessment and actionable recommendations
            </p>

            {/* Overall Risk Level */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">Risk Level: <span className={risk.color}>{risk.level}</span></h2>
                <div className="text-6xl font-bold text-white">{score}</div>
              </div>
              <p className="text-gray-300 text-lg">{risk.description}</p>
            </Card>

            {/* Category Breakdown */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Category Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map(category => {
                  const catScore = getCategoryScore(category);
                  return (
                    <Card key={category} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border-cyan-500/20 p-6">
                      <h3 className="text-lg font-bold text-white mb-3">{category}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 bg-slate-800 rounded-full h-3 mr-4">
                          <div 
                            className={`h-3 rounded-full ${catScore >= 70 ? 'bg-green-400' : catScore >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${catScore}%` }}
                          />
                        </div>
                        <span className="text-white font-bold">{catScore}%</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Architecture Recommendations</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border-cyan-500/20 p-6">
                    <div className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-lg">{rec}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Get Your Detailed Report</h2>
              <p className="text-gray-300 mb-6">
                Provide your contact information to receive a comprehensive PDF report with detailed findings, risk analysis, and architecture design recommendations tailored to your environment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                  className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Role/Title"
                  value={contactInfo.role}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, role: e.target.value }))}
                  className="px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download Full Report & Schedule Consultation
              </Button>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO 
        title="Security Assessment Tool - Apex Meridian"
        description="Evaluate your security posture with our interactive assessment tool and receive personalized architecture recommendations"
      />
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-10 w-10 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-lg">Security Assessment</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Evaluate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Security Posture</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Answer {questions.length} questions across {categories.length} security domains to receive a comprehensive risk assessment and architecture recommendations
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Progress: {Math.round(((currentStep + 1) / categories.length) * 100)}%</span>
              <span className="text-gray-400">Step {currentStep + 1} of {categories.length}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Category Title */}
          <h2 className="text-3xl font-bold text-white mb-8">{categories[currentStep]}</h2>

          {/* Questions */}
          <div className="space-y-6 mb-8">
            {currentQuestions.map((question, index) => (
              <Card key={question.id} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border-cyan-500/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {index + 1}. {question.text}
                </h3>
                <div className="space-y-2">
                  {question.options.map(option => (
                    <label 
                      key={option.value}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                        answers[question.id] === option.value
                          ? 'bg-cyan-500/20 border-2 border-cyan-400'
                          : 'bg-slate-800/50 border-2 border-transparent hover:border-slate-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => handleAnswer(question.id, option.value)}
                        className="mr-3"
                      />
                      <span className="text-white">{option.label}</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestions.some(q => answers[q.id] === undefined)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 disabled:opacity-50"
            >
              {currentStep === categories.length - 1 ? "View Report" : "Next"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
