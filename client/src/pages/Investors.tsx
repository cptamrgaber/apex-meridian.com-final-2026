import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, DollarSign, Users, Globe } from "lucide-react";

export default function Investors() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-cyan-900/50" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Investor Relations
              </h1>
              <p className="text-xl text-gray-300">
                Join us in shaping the future of artificial intelligence
              </p>
            </div>
          </div>
        </section>

        {/* Investment Opportunity */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Invest in Apex Meridian?</h2>
              <div className="bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30 mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Apex Meridian stands at the forefront of the AI revolution, delivering enterprise-grade 
                  solutions across aviation, cybersecurity, education, and AGI research. Our proprietary 
                  Meridian Engine platform and proven track record of innovation position us uniquely 
                  in the rapidly expanding $500B+ global AI market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Company Performance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  value: "285%",
                  label: "Revenue Growth (YoY)",
                  description: "Consistent triple-digit growth"
                },
                {
                  icon: DollarSign,
                  value: "$127M",
                  label: "Annual Recurring Revenue",
                  description: "Strong SaaS fundamentals"
                },
                {
                  icon: Users,
                  value: "50+",
                  label: "Enterprise Clients",
                  description: "Fortune 500 partnerships"
                },
                {
                  icon: Globe,
                  value: "4",
                  label: "Global Regions",
                  description: "Worldwide presence"
                }
              ].map((metric, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30 text-center"
                >
                  <metric.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-lg font-semibold text-cyan-400 mb-2">{metric.label}</div>
                  <div className="text-gray-400 text-sm">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Market Opportunity</h2>
              <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Aviation AI Market</h3>
                  <p className="text-gray-300">
                    Projected to reach <span className="text-white font-semibold">$9.8B by 2030</span> (CAGR 42.8%). 
                    Our Aviation Intelligence platform addresses predictive maintenance, autonomous systems, 
                    and traffic optimization—critical needs for the industry.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Cybersecurity AI Market</h3>
                  <p className="text-gray-300">
                    Expected to surpass <span className="text-white font-semibold">$46.3B by 2027</span> (CAGR 23.6%). 
                    Rising cyber threats drive demand for AI-powered threat detection and behavioral analysis.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">Education Technology Market</h3>
                  <p className="text-gray-300">
                    Forecast to reach <span className="text-white font-semibold">$404B by 2025</span> (CAGR 16.3%). 
                    Personalized learning and adaptive platforms are transforming global education.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">AGI Research & Development</h3>
                  <p className="text-gray-300">
                    The path to Artificial General Intelligence represents a <span className="text-white font-semibold">trillion-dollar opportunity</span>. 
                    Our research positions us at the cutting edge of this transformative technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Competitive Advantages</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Proprietary Technology",
                    description: "The Meridian Engine provides a significant technological moat with patents pending"
                  },
                  {
                    title: "Enterprise Relationships",
                    description: "Established partnerships with Fortune 500 companies and government agencies"
                  },
                  {
                    title: "World-Class Team",
                    description: "Leadership from MIT, Stanford, and top AI research institutions"
                  },
                  {
                    title: "Proven Track Record",
                    description: "96.5% predictive accuracy and 98.2% threat detection rate in production"
                  },
                  {
                    title: "Scalable Platform",
                    description: "Multi-tenant architecture serving millions of users globally"
                  },
                  {
                    title: "Strong Unit Economics",
                    description: "High gross margins (>80%) and improving customer acquisition costs"
                  }
                ].map((advantage, index) => (
                  <div 
                    key={index}
                    className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{advantage.title}</h3>
                    <p className="text-gray-400">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Interested in Learning More?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our investor relations team for detailed financial information, 
              pitch deck, and partnership opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@apex-meridian.com" 
                className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Email Investor Relations
              </a>
              <a 
                href="/contact" 
                className="inline-block bg-white hover:bg-gray-100 text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule a Meeting
              </a>
            </div>
            <p className="text-gray-400 mt-6">
              <strong>Phone:</strong> +201 2 00 92 90 92
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
