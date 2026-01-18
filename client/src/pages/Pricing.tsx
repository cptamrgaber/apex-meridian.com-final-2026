import { useState } from 'react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocation } from 'wouter';

export default function Pricing() {
  const [, setLocation] = useLocation();
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
  const exchangeRate = 50; // 1 USD = 50 EGP

  const convertPrice = (egpPrice: number) => {
    if (currency === 'USD') {
      return Math.round(egpPrice / exchangeRate);
    }
    return egpPrice;
  };

  const formatPrice = (price: number) => {
    if (currency === 'EGP') {
      return `EGP ${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  // Individual Plans
  const individualPlans = [
    {
      name: 'Starter',
      monthlyPrice: 250,
      annualPrice: 2500,
      description: 'Perfect for individual developers and researchers',
      features: [
        '10,000 API calls/month',
        'Basic AI models',
        'Email support',
        'Community access',
        'Code examples',
      ],
      limitations: ['No custom models', 'No priority support'],
    },
    {
      name: 'Professional',
      monthlyPrice: 500,
      annualPrice: 5000,
      description: 'For serious developers building AI applications',
      features: [
        '50,000 API calls/month',
        'Advanced AI models',
        'Priority email support',
        'Code examples & templates',
        'API documentation',
      ],
      limitations: ['No custom integrations'],
      popular: true,
    },
    {
      name: 'Expert',
      monthlyPrice: 1000,
      annualPrice: 10000,
      description: 'Maximum power for AI professionals',
      features: [
        '200,000 API calls/month',
        'All AI models',
        '24/7 chat support',
        'Custom integrations',
        'Advanced analytics',
      ],
      limitations: [],
    },
  ];

  // Small Business Plans
  const smallBusinessPlans = [
    {
      name: 'Startup',
      monthlyPrice: 2000,
      annualPrice: 20000,
      description: 'Launch your AI-powered business',
      features: [
        '500,000 API calls/month',
        '5 user accounts',
        'Basic analytics dashboard',
        'Email & chat support',
        'API access',
      ],
      limitations: ['No custom branding', 'No dedicated support'],
    },
    {
      name: 'Growth',
      monthlyPrice: 4000,
      annualPrice: 40000,
      description: 'Scale your AI operations',
      features: [
        '2M API calls/month',
        '15 user accounts',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'Team collaboration tools',
      ],
      limitations: [],
      popular: true,
    },
    {
      name: 'Scale',
      monthlyPrice: 8000,
      annualPrice: 80000,
      description: 'Enterprise-grade for growing teams',
      features: [
        '10M API calls/month',
        '50 user accounts',
        'Full analytics suite',
        'Dedicated account manager',
        'SLA guarantee (99.5%)',
        'Custom integrations',
      ],
      limitations: [],
    },
  ];

  // Enterprise Plans
  const enterprisePlans = [
    {
      name: 'Business',
      monthlyPrice: 15000,
      annualPrice: 150000,
      description: 'Complete AI infrastructure for medium organizations',
      features: [
        '50M API calls/month',
        'Unlimited users',
        'Custom AI models',
        '24/7 phone support',
        'On-premise deployment option',
        '99.9% uptime SLA',
      ],
    },
    {
      name: 'Enterprise',
      monthlyPrice: 35000,
      annualPrice: 350000,
      description: 'Full-scale AI transformation',
      features: [
        'Unlimited API calls',
        'Unlimited users',
        'Fully custom AI solutions',
        'Dedicated engineering team',
        'White-label options',
        '99.95% uptime SLA',
        'Compliance support',
      ],
      popular: true,
    },
    {
      name: 'Custom',
      monthlyPrice: null,
      annualPrice: null,
      description: 'Tailored to your specific needs',
      features: [
        'Everything in Enterprise',
        'Custom pricing model',
        'Flexible contracts',
        'Strategic AI consulting',
        'Multi-region deployment',
      ],
    },
  ];

  // SaaS Products
  const saasProducts = [
    {
      name: 'AI Chatbot Platform',
      monthlyPrice: 1500,
      annualPrice: 15000,
      description: 'Deploy intelligent chatbots instantly',
      features: [
        'Multi-language support (Arabic/English)',
        'CRM integration',
        'Analytics dashboard',
        'Customizable responses',
      ],
    },
    {
      name: 'Document Intelligence',
      monthlyPrice: 2500,
      annualPrice: 25000,
      description: 'Extract insights from documents',
      features: [
        'OCR & document classification',
        'Data extraction',
        'Arabic language support',
        'API access',
      ],
    },
    {
      name: 'Predictive Analytics',
      monthlyPrice: 3500,
      annualPrice: 35000,
      description: 'Business forecasting powered by AI',
      features: [
        'Trend analysis',
        'Custom dashboards',
        'Automated reports',
        'Data visualization',
      ],
    },
    {
      name: 'Voice AI Platform',
      monthlyPrice: 4000,
      annualPrice: 40000,
      description: 'Speech recognition and synthesis',
      features: [
        'Speech-to-text',
        'Text-to-speech',
        'Voice commands',
        'Arabic dialect support',
      ],
    },
  ];

  const renderPlanCard = (plan: any, category: string) => {
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const displayPrice = price ? convertPrice(price) : null;

    return (
      <Card
        key={plan.name}
        className={`p-6 relative ${
          plan.popular
            ? 'border-2 border-cyan-500 shadow-lg shadow-cyan-500/20'
            : 'border border-gray-700'
        } bg-slate-900/50 backdrop-blur-sm`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-gray-400 text-sm">{plan.description}</p>
        </div>

        <div className="mb-6">
          {displayPrice !== null ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">
                  {formatPrice(displayPrice)}
                </span>
                <span className="text-gray-400">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-green-400 mt-1">Save 2 months!</p>
              )}
            </>
          ) : (
            <div className="text-2xl font-bold text-white">Contact Sales</div>
          )}
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-gray-300">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
          {plan.limitations?.map((limitation: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-gray-500">
              <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{limitation}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => {
            if (displayPrice === null) {
              setLocation('/contact');
            } else {
              // Navigate to checkout
              setLocation(`/checkout?plan=${category}-${plan.name.toLowerCase()}`);
            }
          }}
          className={`w-full ${
            plan.popular
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
              : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {displayPrice === null ? 'Contact Sales' : 'Get Started'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />

      <main className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Transparent Pricing for Every Need
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From individual developers to enterprise organizations, we offer flexible plans
            tailored to the Egyptian market with competitive pricing.
          </p>
        </div>

        {/* Currency & Billing Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Currency Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1">
            <button
              onClick={() => setCurrency('EGP')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currency === 'EGP'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              EGP (ج.م)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currency === 'USD'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>

          {/* Billing Period Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Individual Plans */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Individual Plans</h2>
            <p className="text-gray-400">Perfect for developers and researchers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {individualPlans.map((plan) => renderPlanCard(plan, 'individual'))}
          </div>
        </section>

        {/* Small Business Plans */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Small Business Plans</h2>
            <p className="text-gray-400">For startups and growing teams (1-50 employees)</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {smallBusinessPlans.map((plan) => renderPlanCard(plan, 'small-business'))}
          </div>
        </section>

        {/* Enterprise Plans */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Enterprise Plans</h2>
            <p className="text-gray-400">Complete AI infrastructure for large organizations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {enterprisePlans.map((plan) => renderPlanCard(plan, 'enterprise'))}
          </div>
        </section>

        {/* SaaS Products */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">SaaS Products</h2>
            <p className="text-gray-400">Pre-built AI solutions ready to deploy</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {saasProducts.map((product) => renderPlanCard(product, 'saas'))}
          </div>
        </section>

        {/* Custom Solutions CTA */}
        <section className="mb-20">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Something Custom?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We offer custom development, hardware solutions, AI call centers, and more.
              Contact our sales team for a tailored quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setLocation('/contact')}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => window.open('/Apex_Meridian_Pricing_Policy.md', '_blank')}
                size="lg"
                variant="outline"
                className="border-cyan-500/50 hover:bg-cyan-500/10"
              >
                View Full Pricing Policy
              </Button>
            </div>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our pricing</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>What payment methods do you accept?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We accept international payments via Stripe (Visa, Mastercard, AMEX, Apple Pay),
                  and Egyptian local payments via Fawry, Vodafone Cash, Orange Money, Instapay,
                  Sahl, Flash, and bank transfers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Can I cancel my subscription anytime?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes! You can cancel anytime with 30-day notice. We offer a 30-day money-back
                  guarantee for first-time subscribers, and annual plans can receive pro-rated
                  refunds within the first 90 days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Do you offer discounts for educational institutions?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes! We offer 30% discount for universities, schools, and research institutions.
                  We also have a startup program with 50% off the first year for Egyptian startups
                  less than 2 years old.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>What's included in the service fees?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Service fees cover infrastructure maintenance, regular updates, security
                  monitoring, technical support, and ongoing optimization. For enterprise plans,
                  this includes dedicated engineering support and strategic AI consulting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-5"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Can I upgrade or downgrade my plan?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Absolutely! You can upgrade anytime and changes take effect immediately.
                  Downgrades take effect at the end of your current billing period. Any unused
                  credits are applied to your new plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-6"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>What's your uptime guarantee?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We offer 99.0% uptime for Individual plans, 99.5% for Small Business, 99.9% for
                  Business, and 99.95% for Enterprise. If we fail to meet these targets, you
                  receive automatic service credits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-7"
                className="bg-slate-900/50 border border-gray-700 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    <span>Do prices include VAT?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  All prices are listed before VAT. Egyptian VAT (14%) will be added at checkout
                  for local customers. International customers may be subject to their local tax
                  regulations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            Our sales team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setLocation('/contact')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Contact Sales
            </Button>
            <Button
              onClick={() => (window.location.href = 'tel:+20260929092')}
              size="lg"
              variant="outline"
              className="border-cyan-500/50 hover:bg-cyan-500/10"
            >
              Call Us: +20 2 60 92 90 92
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
