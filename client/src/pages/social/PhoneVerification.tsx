import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Phone, Shield } from "lucide-react";

export default function PhoneVerification() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTPMutation = trpc.verification.sendPhoneOTP.useMutation({
    onSuccess: () => {
      setOtpSent(true);
      toast({
        title: t("verification.otpSent"),
        description: t("verification.otpSentDesc"),
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

  const verifyOTPMutation = trpc.verification.verifyPhoneOTP.useMutation({
    onSuccess: () => {
      toast({
        title: t("verification.phoneVerified"),
        description: t("verification.phoneVerifiedDesc"),
      });
      // Redirect to profile or home
      window.location.href = "/social/profile/setup";
    },
    onError: (error: any) => {
      toast({
        title: t("common.error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSendOTP = () => {
    if (!phoneNumber) {
      toast({
        title: t("common.error"),
        description: t("verification.enterPhone"),
        variant: "destructive",
      });
      return;
    }
    sendOTPMutation.mutate({ phoneNumber });
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast({
        title: t("common.error"),
        description: t("verification.enterOTP"),
        variant: "destructive",
      });
      return;
    }
    verifyOTPMutation.mutate({ phoneNumber, otpCode: otp });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            {otpSent ? (
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            ) : (
              <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-center">
            {otpSent ? t("verification.verifyPhone") : t("verification.addPhone")}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {otpSent
              ? t("verification.enterOTPDesc")
              : t("verification.addPhoneDesc")}
          </p>
        </div>

        {!otpSent ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("verification.phoneNumber")}
              </label>
              <Input
                type="tel"
                placeholder="+20 123 456 7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("verification.phoneFormat")}
              </p>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={sendOTPMutation.isPending}
              className="w-full"
              size="lg"
            >
              {sendOTPMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("verification.sendOTP")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("verification.otpCode")}
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-lg text-center tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("verification.otpExpires")}
              </p>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={verifyOTPMutation.isPending}
              className="w-full"
              size="lg"
            >
              {verifyOTPMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {t("verification.verify")}
            </Button>

            <Button
              onClick={() => setOtpSent(false)}
              variant="ghost"
              className="w-full"
            >
              {t("verification.changeNumber")}
            </Button>

            <Button
              onClick={handleSendOTP}
              variant="outline"
              disabled={sendOTPMutation.isPending}
              className="w-full"
            >
              {t("verification.resendOTP")}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
