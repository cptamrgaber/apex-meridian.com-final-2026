import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function CareerApply() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const jobTitle = searchParams.get('job') || '';
  const department = searchParams.get('dept') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    yearsOfExperience: '',
    coverLetter: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const applyMutation = trpc.careers.submitApplication.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    },
    onError: (error: any) => {
      toast.error(`Failed to submit application: ${error.message}`);
      setIsUploading(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        toast.error("Please upload a PDF file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(resumeFile);
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        await applyMutation.mutateAsync({
          jobTitle,
          department,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          linkedIn: formData.linkedIn || undefined,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          resumeFile: base64,
          resumeFileName: resumeFile.name,
          coverLetter: formData.coverLetter || undefined,
        });
      };
      reader.onerror = () => {
        toast.error("Failed to read resume file");
        setIsUploading(false);
      };
    } catch (error) {
      console.error("Application submission error:", error);
      setIsUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <SEO 
          title="Application Submitted - Apex Meridian Careers"
          description="Thank you for applying to Apex Meridian. We've received your application and will review it shortly."
        />
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 max-w-2xl w-full">
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-white mb-4">Application Submitted!</h1>
              <p className="text-xl text-gray-300 mb-8">
                Thank you for applying to <span className="text-cyan-400 font-semibold">{jobTitle}</span> in our {department} department.
              </p>
              <p className="text-gray-300 mb-8">
                We've received your application and will review it carefully. Our HR team will contact you 
                at <span className="text-cyan-400">{formData.email}</span> if your qualifications match our requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/careers">
                  <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                    View More Positions
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title={`Apply for ${jobTitle} - Apex Meridian Careers`}
        description={`Submit your application for the ${jobTitle} position in the ${department} department at Apex Meridian.`}
      />
      <Header />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link href="/careers">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>

          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Apply for Position</CardTitle>
              <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <h2 className="text-xl font-semibold text-cyan-400 mb-1">{jobTitle}</h2>
                <p className="text-gray-300">{department} Department</p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedIn" className="text-gray-300">LinkedIn Profile (Optional)</Label>
                    <Input
                      id="linkedIn"
                      type="url"
                      value={formData.linkedIn}
                      onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-gray-300">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="50"
                      required
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                      placeholder="5"
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Resume/CV</h3>
                  
                  <div>
                    <Label htmlFor="resume" className="text-gray-300">Upload Resume (PDF, max 5MB) *</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="resume"
                        className="flex items-center justify-center w-full h-32 px-4 transition bg-blue-950/50 border-2 border-cyan-500/30 border-dashed rounded-lg appearance-none cursor-pointer hover:border-cyan-400/50"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {resumeFile ? (
                            <>
                              <FileText className="w-8 h-8 text-cyan-400" />
                              <span className="text-sm text-cyan-400">{resumeFile.name}</span>
                              <span className="text-xs text-gray-400">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-gray-400" />
                              <span className="text-sm text-gray-400">
                                Click to upload or drag and drop
                              </span>
                              <span className="text-xs text-gray-500">PDF (max. 5MB)</span>
                            </>
                          )}
                        </div>
                        <input
                          id="resume"
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Cover Letter (Optional)</h3>
                  
                  <div>
                    <Label htmlFor="coverLetter" className="text-gray-300">
                      Tell us why you're a great fit for this role
                    </Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="bg-blue-950/50 border-cyan-500/30 text-white placeholder:text-gray-500 min-h-[150px]"
                      placeholder="I am excited to apply for this position because..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg py-6"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                  <p className="text-sm text-gray-400 text-center mt-4">
                    By submitting this application, you agree to our processing of your personal data 
                    for recruitment purposes.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
