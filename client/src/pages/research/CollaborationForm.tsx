import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle, Building, User, Mail, FileText, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function CollaborationForm() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Contact Information
    name: "",
    email: "",
    institution: "",
    position: "",
    phone: "",
    
    // Step 2: Research Interest
    researchArea: "",
    specificTopic: "",
    collaborationType: "",
    
    // Step 3: Proposal Details
    projectTitle: "",
    projectDescription: "",
    expectedDuration: "",
    fundingStatus: "",
    
    // Step 4: File Upload
    proposalFile: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFormData(prev => ({ ...prev, proposalFile: file }));
    }
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.institution) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (step === 2) {
      if (!formData.researchArea || !formData.collaborationType) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (step === 3) {
      if (!formData.projectTitle || !formData.projectDescription) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!formData.proposalFile) {
      toast.error("Please upload your research proposal");
      return;
    }

    // In a real implementation, this would upload to S3 and save to database
    toast.success("Research collaboration request submitted successfully!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Thank You for Your Interest!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your research collaboration request has been submitted successfully.
              </p>
            </div>

            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 text-left">
              <CardHeader>
                <CardTitle className="text-white">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Review Process</h3>
                    <p className="text-sm">Our research team will review your proposal within 5-7 business days.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Initial Contact</h3>
                    <p className="text-sm">If your proposal aligns with our research interests, we'll reach out to schedule a discussion.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Collaboration Planning</h3>
                    <p className="text-sm">We'll work together to define project scope, timelines, and resource allocation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex gap-4 justify-center">
              <Button
                onClick={() => setLocation("/solutions/agi")}
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
              >
                Back to AGI Research
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    name: "",
                    email: "",
                    institution: "",
                    position: "",
                    phone: "",
                    researchArea: "",
                    specificTopic: "",
                    collaborationType: "",
                    projectTitle: "",
                    projectDescription: "",
                    expectedDuration: "",
                    fundingStatus: "",
                    proposalFile: null,
                  });
                }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button
            onClick={() => setLocation("/solutions/agi")}
            variant="ghost"
            className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to AGI Research
          </Button>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Research Collaboration Request
            </h1>
            <p className="text-lg text-gray-300">
              Partner with Apex Meridian to advance AI research and innovation
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s === step ? "bg-cyan-500 text-white" :
                    s < step ? "bg-green-500 text-white" :
                    "bg-blue-900/50 text-gray-400"
                  }`}>
                    {s < step ? <CheckCircle className="w-6 h-6" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      s < step ? "bg-green-500" : "bg-blue-900/50"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">Contact</span>
              <span className="text-xs text-gray-400">Research</span>
              <span className="text-xs text-gray-400">Proposal</span>
              <span className="text-xs text-gray-400">Upload</span>
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                {step === 1 && "Contact Information"}
                {step === 2 && "Research Interest"}
                {step === 3 && "Proposal Details"}
                {step === 4 && "Upload Proposal"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {step === 1 && "Tell us about yourself and your institution"}
                {step === 2 && "Share your research interests and collaboration goals"}
                {step === 3 && "Describe your proposed research project"}
                {step === 4 && "Upload your detailed research proposal document"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white"
                        placeholder="Dr. Jane Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white"
                        placeholder="jane.smith@university.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="institution" className="text-gray-300">Institution *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="institution"
                        value={formData.institution}
                        onChange={(e) => handleInputChange("institution", e.target.value)}
                        className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white"
                        placeholder="Cairo University"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="position" className="text-gray-300">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      className="bg-blue-950/50 border-cyan-500/30 text-white"
                      placeholder="Associate Professor"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-blue-950/50 border-cyan-500/30 text-white"
                      placeholder="+20 2 0123 4567"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Research Interest */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="researchArea" className="text-gray-300">Research Area *</Label>
                    <Select value={formData.researchArea} onValueChange={(value) => handleInputChange("researchArea", value)}>
                      <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                        <SelectValue placeholder="Select research area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neural-symbolic">Neural-Symbolic AI</SelectItem>
                        <SelectItem value="machine-learning">Machine Learning</SelectItem>
                        <SelectItem value="computer-vision">Computer Vision</SelectItem>
                        <SelectItem value="nlp">Natural Language Processing</SelectItem>
                        <SelectItem value="quantum">Quantum Computing</SelectItem>
                        <SelectItem value="robotics">Robotics & Autonomous Systems</SelectItem>
                        <SelectItem value="medical-ai">Medical AI</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specificTopic" className="text-gray-300">Specific Research Topic</Label>
                    <Textarea
                      id="specificTopic"
                      value={formData.specificTopic}
                      onChange={(e) => handleInputChange("specificTopic", e.target.value)}
                      className="bg-blue-950/50 border-cyan-500/30 text-white min-h-[100px]"
                      placeholder="Briefly describe the specific topic or problem you want to address..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="collaborationType" className="text-gray-300">Collaboration Type *</Label>
                    <Select value={formData.collaborationType} onValueChange={(value) => handleInputChange("collaborationType", value)}>
                      <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                        <SelectValue placeholder="Select collaboration type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joint-research">Joint Research Project</SelectItem>
                        <SelectItem value="phd-supervision">PhD Student Co-Supervision</SelectItem>
                        <SelectItem value="visiting-researcher">Visiting Researcher Program</SelectItem>
                        <SelectItem value="workshop">Workshop or Conference Organization</SelectItem>
                        <SelectItem value="grant-application">Joint Grant Application</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Proposal Details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectTitle" className="text-gray-300">Project Title *</Label>
                    <div className="relative">
                      <Target className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="projectTitle"
                        value={formData.projectTitle}
                        onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                        className="pl-10 bg-blue-950/50 border-cyan-500/30 text-white"
                        placeholder="Neural-Symbolic Integration for Arabic Dialect Understanding"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectDescription" className="text-gray-300">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                      className="bg-blue-950/50 border-cyan-500/30 text-white min-h-[150px]"
                      placeholder="Provide a detailed description of your proposed research project, including objectives, methodology, and expected outcomes..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="expectedDuration" className="text-gray-300">Expected Duration</Label>
                    <Select value={formData.expectedDuration} onValueChange={(value) => handleInputChange("expectedDuration", value)}>
                      <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-12-months">6-12 months</SelectItem>
                        <SelectItem value="1-2-years">1-2 years</SelectItem>
                        <SelectItem value="2-3-years">2-3 years</SelectItem>
                        <SelectItem value="3-plus-years">3+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fundingStatus" className="text-gray-300">Funding Status</Label>
                    <Select value={formData.fundingStatus} onValueChange={(value) => handleInputChange("fundingStatus", value)}>
                      <SelectTrigger className="bg-blue-950/50 border-cyan-500/30 text-white">
                        <SelectValue placeholder="Select funding status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="secured">Funding Secured</SelectItem>
                        <SelectItem value="pending">Funding Application Pending</SelectItem>
                        <SelectItem value="seeking">Seeking Funding</SelectItem>
                        <SelectItem value="self-funded">Self-Funded</SelectItem>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: File Upload */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Upload Research Proposal *</Label>
                    <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center bg-blue-950/30">
                      <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                      <p className="text-white mb-2">
                        {formData.proposalFile ? formData.proposalFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        PDF or DOCX (Max 10MB)
                      </p>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="proposal-upload"
                      />
                      <Label
                        htmlFor="proposal-upload"
                        className="inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg cursor-pointer"
                      >
                        Choose File
                      </Label>
                    </div>
                  </div>

                  <div className="bg-blue-950/30 border border-cyan-500/20 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      Proposal Guidelines
                    </h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Include project objectives and research questions</li>
                      <li>• Describe methodology and approach</li>
                      <li>• Outline expected outcomes and impact</li>
                      <li>• Specify required resources and timeline</li>
                      <li>• Include relevant publications and references</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-6 border-t border-cyan-500/20">
                {step > 1 && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white ml-auto"
                  >
                    Submit Request
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
