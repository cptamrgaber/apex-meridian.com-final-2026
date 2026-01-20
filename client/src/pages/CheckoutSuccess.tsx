import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function CheckoutSuccess() {
  const [, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(true);
  
  // Get session_id from URL
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Simulate processing delay
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO
        title="Payment Successful - Thank You!"
        description="Your payment has been processed successfully. Thank you for subscribing to Apex Meridian."
      />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {isProcessing ? (
            <Card className="p-12 bg-slate-900/50 border-gray-700">
              <div className="text-center">
                <Loader2 className="w-16 h-16 animate-spin text-cyan-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Processing Your Payment</h2>
                <p className="text-gray-400">Please wait while we confirm your subscription...</p>
              </div>
            </Card>
          ) : (
            <Card className="p-8 bg-slate-900/50 border-green-500/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-xl text-gray-300">
                  Thank you for subscribing to Apex Meridian
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">What's Next?</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>You'll receive a confirmation email with your subscription details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Your account has been activated with full access to your plan features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>You can manage your subscription anytime from your account portal</span>
                  </li>
                </ul>
              </div>

              {sessionId && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-400">
                    <strong>Session ID:</strong> {sessionId}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Keep this for your records. Contact support if you have any questions.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/account/subscriptions')}
                  className="w-full"
                >
                  View My Subscriptions
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Back to Home
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
