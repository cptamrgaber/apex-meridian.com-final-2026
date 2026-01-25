import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileCheck, Shield, CheckCircle2 } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";

type DocumentType = "passport" | "national_id" | "drivers_license" | "selfie";

export default function KYCSubmission() {
  const { t } = useTranslation();
  const { toast } = useToast();
  // const { user } = useAuth();
  const [documents, setDocuments] = useState<Record<DocumentType, File | null>>({
    passport: null,
    national_id: null,
    drivers_license: null,
    selfie: null,
  });
  const [uploadedDocs, setUploadedDocs] = useState<Set<DocumentType>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: kycStatus } = trpc.verification.getKYCStatus.useQuery();

  const uploadDocumentMutation = trpc.verification.uploadKYCDocument.useMutation({
    onSuccess: (_, variables) => {
      setUploadedDocs((prev) => new Set(prev).add(variables.documentType as DocumentType));
      toast({
        title: t("social.verification.documentUploaded"),
        description: t("social.verification.documentUploadedDesc"),
      });
    },
    onError: (error: any) => {
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const submitKYCMutation = trpc.verification.submitKYC.useMutation({
    onSuccess: () => {
      toast({
        title: t("social.verification.kycSubmitted"),
        description: t("social.verification.kycSubmittedDesc"),
      });
      // Redirect to profile or home
      window.location.href = "/social";
    },
    onError: (error: any) => {
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const handleFileSelect = async (docType: DocumentType, file: File) => {
    if (file.size > 16 * 1024 * 1024) {
      toast({
        title: t("common.error"),
        description: t("social.verification.fileTooLarge"),
        variant: "destructive",
      });
      return;
    }

    setDocuments((prev) => ({ ...prev, [docType]: file }));

    // Upload immediately
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      uploadDocumentMutation.mutate({
        documentType: docType,
        documentData: base64,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitKYC = async () => {
    // Check if at least one ID document is uploaded
    const hasIDDocument = uploadedDocs.has("passport") || 
                         uploadedDocs.has("national_id") || 
                         uploadedDocs.has("drivers_license");
    
    if (!hasIDDocument || !uploadedDocs.has("selfie")) {
      toast({
        title: t("common.error"),
        description: t("social.verification.missingDocuments"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    submitKYCMutation.mutate();
  };

  if (kycStatus?.kycStatus === "pending") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-yellow-600 dark:text-yellow-400 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t("social.verification.kycPending")}</h1>
          <p className="text-muted-foreground">
            {t("social.verification.kycPendingDesc")}
          </p>
        </Card>
      </div>
    );
  }

  if (kycStatus?.kycStatus === "approved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{t("social.verification.kycApproved")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("social.verification.kycApprovedDesc")}
          </p>
          <Button onClick={() => window.location.href = "/social"}>
            {t("social.profile.backToHome")}
          </Button>
        </Card>
      </div>
    );
  }

  const documentTypes: { type: DocumentType; label: string; required: boolean }[] = [
    { type: "passport", label: t("social.verification.passport"), required: false },
    { type: "national_id", label: t("social.verification.nationalId"), required: false },
    { type: "drivers_license", label: t("social.verification.driversLicense"), required: false },
    { type: "selfie", label: t("social.verification.selfie"), required: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-center">{t("social.verification.kycTitle")}</h1>
            <p className="text-muted-foreground text-center mt-2 max-w-xl">
              {t("social.verification.kycDesc")}
            </p>
          </div>

          {kycStatus?.kycStatus === "rejected" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                {t("social.verification.kycRejected")}
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                {kycStatus.kycRejectionReason || t("social.verification.kycRejectedDesc")}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t("social.verification.requirements")}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t("social.verification.req1")}</li>
                <li>• {t("social.verification.req2")}</li>
                <li>• {t("social.verification.req3")}</li>
              </ul>
            </div>

            {documentTypes.map(({ type, label, required }) => (
              <div key={type} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {label}
                      {required && (
                        <span className="text-xs text-red-500">*{t("social.profile.required")}</span>
                      )}
                    </h3>
                    {type === "selfie" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("social.verification.selfieDesc")}
                      </p>
                    )}
                  </div>
                  {uploadedDocs.has(type) && (
                    <FileCheck className="w-5 h-5 text-green-600" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id={`file-${type}`}
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(type, file);
                    }}
                  />
                  <label htmlFor={`file-${type}`}>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadDocumentMutation.isPending}
                      onClick={() => document.getElementById(`file-${type}`)?.click()}
                      asChild
                    >
                      <span>
                        {uploadDocumentMutation.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        {uploadedDocs.has(type)
                          ? t("social.verification.reupload")
                          : t("social.verification.upload")}
                      </span>
                    </Button>
                  </label>
                  {documents[type] && (
                    <span className="text-sm text-muted-foreground truncate">
                      {documents[type]?.name}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <Button
              onClick={handleSubmitKYC}
              disabled={isSubmitting || uploadDocumentMutation.isPending}
              className="w-full"
              size="lg"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {t("social.verification.submitKYC")}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              {t("social.verification.privacyNote")}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
