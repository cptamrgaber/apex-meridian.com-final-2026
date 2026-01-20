import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

export default function CustomerPortal() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();
  
  const { data: subscriptions, isLoading: subsLoading } = trpc.payments.getSubscriptions.useQuery(
    undefined,
    { enabled: !!user }
  );
  
  const { data: transactions, isLoading: transLoading } = trpc.payments.getTransactions.useQuery(
    undefined,
    { enabled: !!user }
  );

  const createPortalMutation = trpc.payments.createPortalSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      alert(error.message || 'Failed to open customer portal');
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?redirect=/account/subscriptions');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  const handleManageSubscription = () => {
    createPortalMutation.mutate();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'EGP') {
      return `EGP ${(amount / 100).toLocaleString()}`;
    }
    return `$${(amount / 100).toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      canceled: 'bg-red-500/20 text-red-400 border-red-500/30',
      past_due: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      unpaid: 'bg-red-500/20 text-red-400 border-red-500/30',
      trialing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO
        title="My Subscriptions - Manage Your Account"
        description="View and manage your Apex Meridian subscriptions, payment history, and billing information."
      />
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My Subscriptions</h1>
            <p className="text-gray-400">Manage your subscriptions and view payment history</p>
          </div>

          {/* Active Subscriptions */}
          <Card className="p-6 mb-8 bg-slate-900/50 border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Active Subscriptions</h2>
              <Button
                onClick={handleManageSubscription}
                disabled={createPortalMutation.isPending || !subscriptions || subscriptions.length === 0}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {createPortalMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Manage in Stripe Portal
                  </>
                )}
              </Button>
            </div>

            {subsLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-400">Loading subscriptions...</p>
              </div>
            ) : subscriptions && subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-slate-800/50 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {sub.planName} - {sub.planCategory.replace('_', ' ')}
                        </h3>
                        <p className="text-gray-400 text-sm capitalize">{sub.billingPeriod} billing</p>
                      </div>
                      {getStatusBadge(sub.status)}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 mb-1">Amount</p>
                        <p className="text-white font-semibold">
                          {formatAmount(sub.amount, sub.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Current Period</p>
                        <p className="text-white">
                          {formatDate(sub.currentPeriodStart)} - {formatDate(sub.currentPeriodEnd)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Next Billing Date</p>
                        <p className="text-white">{formatDate(sub.currentPeriodEnd)}</p>
                      </div>
                    </div>

                    {sub.cancelAtPeriodEnd === 1 && (
                      <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <p className="text-sm text-yellow-400">
                          <AlertCircle className="w-4 h-4 inline mr-1" />
                          This subscription will be canceled at the end of the current billing period.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">You don't have any active subscriptions</p>
                <Button onClick={() => navigate('/pricing')}>
                  View Pricing Plans
                </Button>
              </div>
            )}
          </Card>

          {/* Payment History */}
          <Card className="p-6 bg-slate-900/50 border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Payment History</h2>

            {transLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-400">Loading transactions...</p>
              </div>
            ) : transactions && transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Method</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trans) => (
                      <tr key={trans.id} className="border-b border-gray-800">
                        <td className="py-4 px-4 text-white">
                          {formatDate(trans.createdAt)}
                        </td>
                        <td className="py-4 px-4 text-gray-300 capitalize">
                          {trans.paymentMethod.replace('_', ' ')}
                        </td>
                        <td className="py-4 px-4 text-white font-semibold">
                          {formatAmount(trans.amount, trans.currency)}
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(trans.status)}
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {trans.referenceNumber || trans.transactionId || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No payment history yet</p>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
