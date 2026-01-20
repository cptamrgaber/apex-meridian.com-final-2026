import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Building2, Wallet, ArrowRight, Check } from 'lucide-react';

export type PaymentMethod = 
  | 'stripe' 
  | 'fawry' 
  | 'instapay' 
  | 'vodafone_cash' 
  | 'orange_money' 
  | 'bank_transfer';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  onContinue: () => void;
  amount: number;
  currency: 'EGP' | 'USD';
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  onContinue,
  amount,
  currency,
}: PaymentMethodSelectorProps) {
  const formatPrice = (price: number) => {
    if (currency === 'EGP') {
      return `EGP ${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const paymentMethods = [
    {
      id: 'stripe' as PaymentMethod,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      badge: 'International',
      badgeColor: 'bg-blue-500/20 text-blue-400',
      available: true,
    },
    {
      id: 'fawry' as PaymentMethod,
      name: 'Fawry',
      description: 'Pay at any Fawry outlet across Egypt',
      icon: Wallet,
      badge: 'Egyptian',
      badgeColor: 'bg-green-500/20 text-green-400',
      available: currency === 'EGP',
    },
    {
      id: 'instapay' as PaymentMethod,
      name: 'InstaPay',
      description: 'Instant bank transfer via InstaPay network',
      icon: Building2,
      badge: 'Egyptian',
      badgeColor: 'bg-green-500/20 text-green-400',
      available: currency === 'EGP',
    },
    {
      id: 'vodafone_cash' as PaymentMethod,
      name: 'Vodafone Cash',
      description: 'Pay with your Vodafone Cash wallet',
      icon: Smartphone,
      badge: 'Egyptian',
      badgeColor: 'bg-green-500/20 text-green-400',
      available: currency === 'EGP',
    },
    {
      id: 'orange_money' as PaymentMethod,
      name: 'Orange Money',
      description: 'Pay with your Orange Money wallet',
      icon: Smartphone,
      badge: 'Egyptian',
      badgeColor: 'bg-green-500/20 text-green-400',
      available: currency === 'EGP',
    },
    {
      id: 'bank_transfer' as PaymentMethod,
      name: 'Bank Transfer',
      description: 'Direct transfer to our bank account',
      icon: Building2,
      badge: 'Egyptian',
      badgeColor: 'bg-green-500/20 text-green-400',
      available: currency === 'EGP',
    },
  ];

  const availableMethods = paymentMethods.filter(method => method.available);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Payment Method</h2>
        <p className="text-gray-400">
          Total Amount: <span className="text-cyan-400 font-semibold">{formatPrice(amount)}</span>
        </p>
      </div>

      <div className="grid gap-4">
        {availableMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <Card
              key={method.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-2 border-cyan-500 bg-cyan-500/10'
                  : 'border border-gray-700 bg-slate-900/50 hover:border-cyan-500/50'
              }`}
              onClick={() => onMethodChange(method.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onMethodChange(method.id);
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${isSelected ? 'bg-cyan-500/20' : 'bg-slate-800'}`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>

                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          size="lg"
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {currency === 'USD' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-sm text-blue-400">
            <strong>Note:</strong> Egyptian payment methods are only available when paying in EGP. 
            Switch to EGP currency on the pricing page to access Fawry, InstaPay, Vodafone Cash, and other local payment options.
          </p>
        </div>
      )}
    </div>
  );
}
