import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import PaymentMethodSelector, { PaymentMethod } from '@/components/PaymentMethodSelector';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const [, params] = useRoute('/checkout');
  const { user, loading: authLoading } = useAuth();
  
  // Get plan from URL query params
  const searchParams = new URLSearchParams(window.location.search);
  const planParam = searchParams.get('plan'); // Format: "category-planname"
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('stripe');
  const [step, setStep] = useState<'method' | 'processing' | 'instructions'>('method');
  const [paymentInstructions, setPaymentInstructions] = useState<string>('');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  // Parse plan details
  const planDetails = planParam ? parsePlanParam(planParam) : null;

  const createCheckoutMutation = trpc.payments.createCheckoutSession.useMutation();
  const generateReferenceMutation = trpc.payments.generateEgyptianPaymentReference.useMutation();

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to auth page if not logged in
      navigate('/auth?redirect=' + encodeURIComponent('/checkout?plan=' + planParam));
    }
  }, [user, authLoading, navigate, planParam]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (!planDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto p-8 bg-slate-900/50 border-red-500/20">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Invalid Plan</h1>
              <p className="text-gray-400 mb-6">
                The selected plan could not be found. Please return to the pricing page and try again.
              </p>
              <Button onClick={() => navigate('/pricing')}>
                Back to Pricing
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleContinue = async () => {
    setStep('processing');

    try {
      if (selectedMethod === 'stripe') {
        // Create Stripe checkout session
        const result = await createCheckoutMutation.mutateAsync({
          planCategory: planDetails.category,
          planName: planDetails.name,
          billingPeriod: planDetails.billingPeriod,
          priceId: planDetails.stripePriceId,
        });

        // Redirect to Stripe checkout
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        // Generate Egyptian payment reference
        const result = await generateReferenceMutation.mutateAsync({
          paymentMethod: selectedMethod,
          planCategory: planDetails.category,
          planName: planDetails.name,
          amount: planDetails.amount * 100, // Convert to cents
        });

        setReferenceNumber(result.referenceNumber);
        setPaymentInstructions(result.instructions);
        setExpiresAt(new Date(result.expiresAt));
        setStep('instructions');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed. Please try again.');
      setStep('method');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO
        title="Checkout - Complete Your Purchase"
        description="Complete your subscription purchase securely with multiple payment options including credit cards and Egyptian payment methods."
      />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Plan Summary */}
          <Card className="p-6 mb-8 bg-slate-900/50 border-cyan-500/20">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Plan</p>
                <p className="text-white font-semibold">{planDetails.displayName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Billing Period</p>
                <p className="text-white font-semibold capitalize">{planDetails.billingPeriod}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Amount</p>
                <p className="text-white font-semibold">
                  {planDetails.currency} {planDetails.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="text-white font-semibold capitalize">{planDetails.category.replace('_', ' ')}</p>
              </div>
            </div>
          </Card>

          {/* Payment Method Selection */}
          {step === 'method' && (
            <Card className="p-8 bg-slate-900/50 border-gray-700">
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
                onContinue={handleContinue}
                amount={planDetails.amount}
                currency={planDetails.currency}
              />
            </Card>
          )}

          {/* Processing State */}
          {step === 'processing' && (
            <Card className="p-12 bg-slate-900/50 border-gray-700">
              <div className="text-center">
                <Loader2 className="w-16 h-16 animate-spin text-cyan-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
                <p className="text-gray-400">Please wait while we process your request...</p>
              </div>
            </Card>
          )}

          {/* Payment Instructions */}
          {step === 'instructions' && (
            <Card className="p-8 bg-slate-900/50 border-gray-700">
              <div className="text-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Payment Reference Generated</h2>
                <p className="text-gray-400">
                  Please complete the payment using the instructions below
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Reference Number</p>
                    <p className="text-2xl font-bold text-cyan-400">{referenceNumber}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(referenceNumber)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>

                {expiresAt && (
                  <p className="text-sm text-yellow-400">
                    Expires: {expiresAt.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Payment Instructions</h3>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {paymentInstructions}
                </pre>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-400">
                  <strong>Important:</strong> Your subscription will be activated within 24 hours after payment verification. 
                  You will receive an email confirmation once your payment is verified.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                  className="flex-1"
                >
                  Back to Pricing
                </Button>
                <Button
                  onClick={() => navigate('/account/subscriptions')}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  View My Subscriptions
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

// Helper function to parse plan parameter
function parsePlanParam(planParam: string) {
  // Format: "category-planname" e.g., "individual-professional"
  const parts = planParam.split('-');
  if (parts.length < 2) return null;

  const category = parts[0];
  const name = parts.slice(1).join('-');

  // Get plan details from pricing data
  const planData = getPlanData(category, name);
  if (!planData) return null;

  return {
    category,
    name,
    displayName: planData.displayName,
    amount: planData.amount,
    currency: planData.currency,
    billingPeriod: planData.billingPeriod,
    stripePriceId: planData.stripePriceId,
  };
}

// Helper function to get plan data
function getPlanData(category: string, name: string) {
  // This should match the pricing data from Pricing.tsx
  // For now, returning sample data
  const plans: Record<string, any> = {
    'individual-starter': {
      displayName: 'Starter',
      amount: 250,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_starter_monthly',
    },
    'individual-professional': {
      displayName: 'Professional',
      amount: 500,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_professional_monthly',
    },
    'individual-expert': {
      displayName: 'Expert',
      amount: 1000,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_expert_monthly',
    },
    'small_business-startup': {
      displayName: 'Startup',
      amount: 2000,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_startup_monthly',
    },
    'small_business-growth': {
      displayName: 'Growth',
      amount: 4000,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_growth_monthly',
    },
    'small_business-scale': {
      displayName: 'Scale',
      amount: 8000,
      currency: 'EGP' as const,
      billingPeriod: 'monthly' as const,
      stripePriceId: 'price_scale_monthly',
    },
  };

  const key = `${category}-${name}`;
  return plans[key] || null;
}
