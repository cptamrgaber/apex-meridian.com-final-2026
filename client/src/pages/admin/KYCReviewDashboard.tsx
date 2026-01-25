import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle2, XCircle, Eye, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function KYCReviewDashboard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const { data: pendingKYC, isLoading, refetch } = trpc.verification.getPendingKYC.useQuery({ limit: 50, offset: 0 });

  const reviewKYCMutation = trpc.verification.reviewKYC.useMutation({
    onSuccess: () => {
      toast({
        title: t("social.verification.reviewSuccess"),
        description: t("social.verification.reviewSuccessDesc"),
      });
      setIsReviewDialogOpen(false);
      setSelectedSubmission(null);
      setRejectionReason("");
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleApprove = (userId: number) => {
    reviewKYCMutation.mutate({
      userId,
      approved: true,
    });
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: t("common.error"),
        description: t("social.verification.rejectionReasonRequired"),
        variant: "destructive",
      });
      return;
    }

    reviewKYCMutation.mutate({
      userId: selectedSubmission.userId,
      approved: false,
      rejectionReason,
    });
  };

  const openReviewDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setIsReviewDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("social.verification.kycReviewTitle")}</h1>
            <p className="text-muted-foreground">{t("social.verification.kycReviewDesc")}</p>
          </div>
        </div>

        {!pendingKYC || pendingKYC.length === 0 ? (
          <Card className="p-12 text-center">
            <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("social.verification.noPendingKYC")}</h3>
            <p className="text-muted-foreground">{t("social.verification.noPendingKYCDesc")}</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {pendingKYC.map((submission: any) => (
              <Card key={submission.userId} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{submission.username}</h3>
                    <p className="text-sm text-muted-foreground">{submission.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("social.verification.submittedOn")}:{" "}
                      {new Date(submission.kycSubmittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openReviewDialog(submission)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t("social.verification.review")}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {submission.documents.map((doc: any) => (
                    <div key={doc.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          {t(`social.verification.${doc.documentType}`)}
                        </span>
                      </div>
                      <a
                        href={doc.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {t("social.verification.viewDocument")}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleApprove(submission.userId)}
                    disabled={reviewKYCMutation.isPending}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {reviewKYCMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    {t("social.verification.approve")}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setIsReviewDialogOpen(true);
                    }}
                    disabled={reviewKYCMutation.isPending}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {t("social.verification.reject")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("social.verification.rejectKYC")}</DialogTitle>
            <DialogDescription>
              {t("social.verification.rejectKYCDesc")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("social.verification.rejectionReason")}
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={t("social.verification.rejectionReasonPlaceholder")}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsReviewDialogOpen(false);
                setRejectionReason("");
              }}
            >
              {t("social.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={reviewKYCMutation.isPending}
            >
              {reviewKYCMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("social.verification.reject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
