import { useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  Copy, 
  Save,
  AlertCircle,
  DollarSign,
  BarChart3,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Stripe Configuration
  const [stripeSecretKey, setStripeSecretKey] = useState('');
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState('');
  const [stripeTestMode, setStripeTestMode] = useState(true);

  // Egyptian Payment Configuration
  const [fawryEnabled, setFawryEnabled] = useState(true);
  const [fawryMerchantCode, setFawryMerchantCode] = useState('');
  const [instapayEnabled, setInstapayEnabled] = useState(true);
  const [instapayAccountNumber, setInstapayAccountNumber] = useState('');
  const [instapayBankName, setInstapayBankName] = useState('Commercial International Bank (CIB)');
  const [vodafoneCashEnabled, setVodafoneCashEnabled] = useState(true);
  const [vodafoneCashNumber, setVodafoneCashNumber] = useState('');
  const [orangeMoneyEnabled, setOrangeMoneyEnabled] = useState(true);
  const [orangeMoneyNumber, setOrangeMoneyNumber] = useState('');

  // Check if user is admin
  if (!authLoading && (!user || user.role !== 'admin')) {
    navigate('/');
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  const webhookUrl = `${window.location.origin}/api/webhooks/stripe`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  const handleSaveStripeConfig = () => {
    // TODO: Save to database via tRPC
    toast({
      title: 'Success',
      description: 'Stripe configuration saved successfully',
    });
  };

  const handleSaveEgyptianConfig = () => {
    // TODO: Save to database via tRPC
    toast({
      title: 'Success',
      description: 'Egyptian payment configuration saved successfully',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO
        title="Admin Settings - Payment Configuration"
        description="Manage payment providers, Stripe integration, and Egyptian payment methods"
      />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="w-10 h-10 text-cyan-400" />
              Payment Settings
            </h1>
            <p className="text-gray-400">Configure payment providers and manage subscriptions</p>
          </div>

          <Tabs defaultValue="stripe" className="space-y-6">
            <TabsList className="bg-slate-900/50 border border-gray-700">
              <TabsTrigger value="stripe" className="data-[state=active]:bg-cyan-500/20">
                <CreditCard className="w-4 h-4 mr-2" />
                Stripe Configuration
              </TabsTrigger>
              <TabsTrigger value="egyptian" className="data-[state=active]:bg-cyan-500/20">
                <Wallet className="w-4 h-4 mr-2" />
                Egyptian Payments
              </TabsTrigger>
              <TabsTrigger value="verification" className="data-[state=active]:bg-cyan-500/20">
                <CheckCircle className="w-4 h-4 mr-2" />
                Payment Verification
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Stripe Configuration Tab */}
            <TabsContent value="stripe">
              <Card className="p-8 bg-slate-900/50 border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Stripe Integration</h2>

                <div className="space-y-6">
                  {/* Test/Live Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <Label className="text-white font-semibold">Test Mode</Label>
                      <p className="text-sm text-gray-400">Use test API keys for development</p>
                    </div>
                    <Switch
                      checked={stripeTestMode}
                      onCheckedChange={setStripeTestMode}
                    />
                  </div>

                  {/* API Keys */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="stripe-secret-key" className="text-white">
                        Stripe Secret Key
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="stripe-secret-key"
                          type="password"
                          placeholder={stripeTestMode ? "sk_test_..." : "sk_live_..."}
                          value={stripeSecretKey}
                          onChange={(e) => setStripeSecretKey(e.target.value)}
                          className="bg-slate-800 border-gray-700 text-white"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(stripeSecretKey, 'Secret Key')}
                          disabled={!stripeSecretKey}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Get your API keys from{' '}
                        <a
                          href="https://dashboard.stripe.com/apikeys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          Stripe Dashboard
                        </a>
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="stripe-webhook-secret" className="text-white">
                        Webhook Signing Secret
                      </Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="stripe-webhook-secret"
                          type="password"
                          placeholder="whsec_..."
                          value={stripeWebhookSecret}
                          onChange={(e) => setStripeWebhookSecret(e.target.value)}
                          className="bg-slate-800 border-gray-700 text-white"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(stripeWebhookSecret, 'Webhook Secret')}
                          disabled={!stripeWebhookSecret}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Webhook URL */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <Label className="text-white font-semibold mb-2 block">Webhook Endpoint URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={webhookUrl}
                        readOnly
                        className="bg-slate-800 border-gray-700 text-white font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="mt-3 text-sm text-blue-400">
                      <p className="font-semibold mb-1">Setup Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-300">
                        <li>Go to Stripe Dashboard → Developers → Webhooks</li>
                        <li>Click "Add endpoint" and paste the URL above</li>
                        <li>Select these events: checkout.session.completed, customer.subscription.*, invoice.payment_*</li>
                        <li>Copy the webhook signing secret and paste it above</li>
                      </ol>
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveStripeConfig}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Stripe Configuration
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Egyptian Payments Tab */}
            <TabsContent value="egyptian">
              <Card className="p-8 bg-slate-900/50 border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Egyptian Payment Methods</h2>

                <div className="space-y-6">
                  {/* Fawry */}
                  <div className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Fawry</h3>
                        <p className="text-sm text-gray-400">Cash payment at Fawry outlets</p>
                      </div>
                      <Switch
                        checked={fawryEnabled}
                        onCheckedChange={setFawryEnabled}
                      />
                    </div>
                    {fawryEnabled && (
                      <div>
                        <Label htmlFor="fawry-code" className="text-white">Merchant Code (Optional)</Label>
                        <Input
                          id="fawry-code"
                          placeholder="Enter Fawry merchant code"
                          value={fawryMerchantCode}
                          onChange={(e) => setFawryMerchantCode(e.target.value)}
                          className="mt-2 bg-slate-800 border-gray-700 text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* InstaPay */}
                  <div className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">InstaPay</h3>
                        <p className="text-sm text-gray-400">Instant bank transfers</p>
                      </div>
                      <Switch
                        checked={instapayEnabled}
                        onCheckedChange={setInstapayEnabled}
                      />
                    </div>
                    {instapayEnabled && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="instapay-bank" className="text-white">Bank Name</Label>
                          <Input
                            id="instapay-bank"
                            value={instapayBankName}
                            onChange={(e) => setInstapayBankName(e.target.value)}
                            className="mt-2 bg-slate-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="instapay-account" className="text-white">Account Number</Label>
                          <Input
                            id="instapay-account"
                            placeholder="1234567890"
                            value={instapayAccountNumber}
                            onChange={(e) => setInstapayAccountNumber(e.target.value)}
                            className="mt-2 bg-slate-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vodafone Cash */}
                  <div className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Vodafone Cash</h3>
                        <p className="text-sm text-gray-400">Mobile wallet payments</p>
                      </div>
                      <Switch
                        checked={vodafoneCashEnabled}
                        onCheckedChange={setVodafoneCashEnabled}
                      />
                    </div>
                    {vodafoneCashEnabled && (
                      <div>
                        <Label htmlFor="vodafone-number" className="text-white">Mobile Number</Label>
                        <Input
                          id="vodafone-number"
                          placeholder="01XXXXXXXXX"
                          value={vodafoneCashNumber}
                          onChange={(e) => setVodafoneCashNumber(e.target.value)}
                          className="mt-2 bg-slate-800 border-gray-700 text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Orange Money */}
                  <div className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Orange Money</h3>
                        <p className="text-sm text-gray-400">Mobile wallet payments</p>
                      </div>
                      <Switch
                        checked={orangeMoneyEnabled}
                        onCheckedChange={setOrangeMoneyEnabled}
                      />
                    </div>
                    {orangeMoneyEnabled && (
                      <div>
                        <Label htmlFor="orange-number" className="text-white">Mobile Number</Label>
                        <Input
                          id="orange-number"
                          placeholder="01XXXXXXXXX"
                          value={orangeMoneyNumber}
                          onChange={(e) => setOrangeMoneyNumber(e.target.value)}
                          className="mt-2 bg-slate-800 border-gray-700 text-white"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSaveEgyptianConfig}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Egyptian Payment Configuration
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Payment Verification Tab */}
            <TabsContent value="verification">
              <Card className="p-8 bg-slate-900/50 border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Pending Payment Verifications</h2>
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No pending payments to verify</p>
                </div>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card className="p-8 bg-slate-900/50 border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Analytics</h2>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Analytics dashboard coming soon</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
