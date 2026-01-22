import { useState } from "react";
import { Download, FileText, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface WhitepaperDownloadProps {
  title: string;
  description: string;
  whitepaperSlug: string;
  pageCount: string;
  fileSize: string;
}

export default function WhitepaperDownload({ title, description, whitepaperSlug, pageCount, fileSize }: WhitepaperDownloadProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const downloadMutation = trpc.securityAssessment.sendWhitepaper.useMutation();

  const handleDownload = async () => {
    if (!email || !name) {
      toast.error("Please provide your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      await downloadMutation.mutateAsync({
        email,
        name,
        company: company || "Not provided",
        whitepaperSlug,
      });
      
      setDownloaded(true);
      toast.success("Whitepaper sent to your email! Check your inbox.");
    } catch (error) {
      toast.error("Failed to send whitepaper. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (downloaded) {
    return (
      <Card className="bg-gradient-to-br from-green-900/50 to-cyan-900/50 backdrop-blur-sm border-green-500/20 p-8">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Whitepaper Sent!</h3>
          <p className="text-gray-300 mb-6">
            We've sent the whitepaper to <span className="text-cyan-400 font-semibold">{email}</span>. 
            Check your inbox (and spam folder) for the download link.
          </p>
          <p className="text-sm text-gray-400">
            Didn't receive it? <button onClick={() => setDownloaded(false)} className="text-cyan-400 hover:underline">Try again</button>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 p-8">
      <div className="flex items-start space-x-4 mb-6">
        <div className="bg-cyan-500/20 rounded-lg p-3">
          <FileText className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 mb-4">{description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>📄 {pageCount} pages</span>
            <span>📦 {fileSize}</span>
            <span>📧 PDF via email</span>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/20 pt-6">
        <p className="text-white font-semibold mb-4 flex items-center">
          <Mail className="h-5 w-5 mr-2 text-cyan-400" />
          Get your free copy
        </p>
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800/50 text-white border-slate-700 focus:border-cyan-400"
            required
          />
          <Input
            type="email"
            placeholder="Work Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800/50 text-white border-slate-700 focus:border-cyan-400"
            required
          />
          <Input
            type="text"
            placeholder="Company (Optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-slate-800/50 text-white border-slate-700 focus:border-cyan-400"
          />
          <Button
            onClick={handleDownload}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="mr-2 h-5 w-5" />
            {isSubmitting ? "Sending..." : "Download Whitepaper"}
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          By downloading, you agree to receive occasional emails about cybersecurity insights. Unsubscribe anytime.
        </p>
      </div>
    </Card>
  );
}
