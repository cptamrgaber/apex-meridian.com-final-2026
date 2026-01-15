import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { TrendingUp, DollarSign, Users, Globe } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Investors() {
  // Revenue growth data
  const revenueData = [
    { year: '2020', revenue: 12 },
    { year: '2021', revenue: 28 },
    { year: '2022', revenue: 65 },
    { year: '2023', revenue: 98 },
    { year: '2024', revenue: 127 },
    { year: '2025', revenue: 185 },
  ];

  // Market share by sector
  const marketShareData = [
    { name: 'Aviation', value: 35, color: '#3b82f6' },
    { name: 'Cybersecurity', value: 30, color: '#60a5fa' },
    { name: 'Education', value: 20, color: '#06b6d4' },
    { name: 'AGI Research', value: 15, color: '#0891b2' },
  ];

  // Quarterly performance
  const quarterlyData = [
    { quarter: 'Q1 2024', clients: 32, revenue: 28 },
    { quarter: 'Q2 2024', clients: 38, revenue: 31 },
    { quarter: 'Q3 2024', clients: 44, revenue: 33 },
    { quarter: 'Q4 2024', clients: 50, revenue: 35 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <SEO 
        title="Investor Relations - Join the AI Revolution"
        description="Invest in Apex Meridian and join the AI revolution. 285% YoY growth, $127M ARR, 50+ enterprise clients. Explore our market opportunity and financial performance."
      />
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

        {/* Revenue Growth Chart */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Revenue Growth Trajectory</h2>
              <div className="bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #06b6d4', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      name="Annual Revenue ($M)"
                      dot={{ fill: '#06b6d4', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-gray-400 text-center mt-4">
                  Projected 2025 revenue based on current growth trajectory and pipeline
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Share Distribution */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Revenue Distribution by Sector</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #06b6d4', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  {marketShareData.map((sector, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{sector.name}</span>
                        <span className="text-cyan-400 font-bold">{sector.value}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${sector.value}%`, backgroundColor: sector.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quarterly Performance */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Quarterly Performance 2024</h2>
              <div className="bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={quarterlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="quarter" stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#94a3b8" label={{ value: 'Clients', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" label={{ value: 'Revenue ($M)', angle: 90, position: 'insideRight', fill: '#94a3b8' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #06b6d4', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="clients" fill="#3b82f6" name="Enterprise Clients" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#06b6d4" name="Revenue ($M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="py-16 bg-slate-800/50">
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
                    Expected to grow to <span className="text-white font-semibold">$46.3B by 2027</span> (CAGR 23.6%). 
                    Our Cybersecurity Shield provides AI-driven threat detection and quantum-resistant encryption 
                    for enterprise and government clients.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">AI in Education Market</h3>
                  <p className="text-gray-300">
                    Set to reach <span className="text-white font-semibold">$25.7B by 2030</span> (CAGR 36.0%). 
                    Our adaptive learning platforms and cognitive enhancement tools serve K-12, higher education, 
                    and corporate training sectors.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">AGI Research & Development</h3>
                  <p className="text-gray-300">
                    The broader AI market is projected at <span className="text-white font-semibold">$1.8T by 2030</span>. 
                    Our foundational AGI research positions us at the forefront of next-generation intelligence systems, 
                    with potential licensing and partnership opportunities across all sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Highlights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Investment Highlights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Proven Technology",
                    description: "Proprietary Meridian Engine platform with 96.5% accuracy in predictive analytics"
                  },
                  {
                    title: "Strong IP Portfolio",
                    description: "15+ patents pending in AI, machine learning, and cognitive computing"
                  },
                  {
                    title: "Experienced Team",
                    description: "Leadership from MIT, Stanford, and top AI research institutions"
                  },
                  {
                    title: "Strategic Partnerships",
                    description: "Collaborations with Fortune 500 companies and government agencies"
                  },
                  {
                    title: "Recurring Revenue Model",
                    description: "98% customer retention rate with multi-year enterprise contracts"
                  },
                  {
                    title: "Global Expansion",
                    description: "Established presence in North America, Europe, MENA, and Asia-Pacific"
                  }
                ].map((highlight, index) => (
                  <div 
                    key={index}
                    className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30"
                  >
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">{highlight.title}</h3>
                    <p className="text-gray-300">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Invest in the Future?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contact our investor relations team to learn more about investment opportunities
              </p>
              <a 
                href="/contact"
                className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Contact Investor Relations
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
