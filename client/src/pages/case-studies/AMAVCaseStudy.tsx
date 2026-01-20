import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plane, TrendingUp, Clock, Shield, Users, CheckCircle, ArrowLeft, Quote } from "lucide-react";
import { Link } from "wouter";

export default function AMAVCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="Case Study: Regional Carrier Transforms Operations with AM-AV OCC System"
        description="How a Middle Eastern regional airline reduced scheduling time by 70% and achieved zero compliance violations with AI-powered crew management"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/case-studies">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </button>
          </Link>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-cyan-500/20 rounded-lg p-3">
              <Plane className="h-8 w-8 text-cyan-400" />
            </div>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">Success Story</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Regional Carrier Transforms Operations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AM-AV OCC System</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            How a Middle Eastern regional airline with 250+ pilots reduced crew scheduling time by 70%, achieved zero compliance violations, 
            and increased pilot satisfaction scores from 68% to 94% in just six months.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <p className="text-gray-400 text-sm mb-2">Industry</p>
              <p className="text-white font-semibold">Commercial Aviation</p>
            </div>
            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <p className="text-gray-400 text-sm mb-2">Fleet Size</p>
              <p className="text-white font-semibold">32 Aircraft</p>
            </div>
            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <p className="text-gray-400 text-sm mb-2">Crew Members</p>
              <p className="text-white font-semibold">250+ Pilots</p>
            </div>
            <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
              <p className="text-gray-400 text-sm mb-2">Implementation</p>
              <p className="text-white font-semibold">6 Months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-12 bg-blue-950/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">The Challenge</h2>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              A rapidly growing regional carrier operating 32 aircraft across 45 routes faced critical operational challenges as their fleet 
              expanded from 18 to 32 aircraft in 18 months. Their manual crew scheduling process, managed through spreadsheets and email, 
              could not scale to meet the demands of increased flight operations.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Operational Pain Points</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <div>
                      <p className="text-white font-semibold mb-1">Manual Scheduling Bottleneck</p>
                      <p className="text-gray-400 text-sm">Chief Pilot spent 60+ hours per month creating rosters, delaying schedule publication</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <div>
                      <p className="text-white font-semibold mb-1">Compliance Violations</p>
                      <p className="text-gray-400 text-sm">Average of 12 flight time violations per month detected during audits</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <div>
                      <p className="text-white font-semibold mb-1">Pilot Dissatisfaction</p>
                      <p className="text-gray-400 text-sm">68% satisfaction score due to unfair distribution of night flights and layovers</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <div>
                      <p className="text-white font-semibold mb-1">Last-Minute Changes</p>
                      <p className="text-gray-400 text-sm">Emergency crew swaps required 3-4 times per week, causing operational disruptions</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Business Impact</h3>
                <div className="space-y-4">
                  <div className="bg-blue-950/50 rounded-lg p-4 border border-red-500/20">
                    <p className="text-red-400 font-semibold mb-1">$280,000 Annual Cost</p>
                    <p className="text-gray-300 text-sm">Regulatory fines and audit remediation expenses</p>
                  </div>
                  <div className="bg-blue-950/50 rounded-lg p-4 border border-red-500/20">
                    <p className="text-red-400 font-semibold mb-1">18% Pilot Turnover</p>
                    <p className="text-gray-300 text-sm">Above industry average, driven by scheduling dissatisfaction</p>
                  </div>
                  <div className="bg-blue-950/50 rounded-lg p-4 border border-red-500/20">
                    <p className="text-red-400 font-semibold mb-1">Schedule Delays</p>
                    <p className="text-gray-300 text-sm">Monthly rosters published 5-7 days late, affecting pilot planning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-start">
              <Quote className="h-8 w-8 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-300 italic mb-3">
                  "We were at a breaking point. Our manual scheduling process couldn't keep up with growth, and we were facing serious 
                  compliance risks. We needed a solution that could scale with us while ensuring zero regulatory violations."
                </p>
                <p className="text-gray-400 text-sm">— Chief Pilot, Regional Carrier (Name withheld for confidentiality)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">The Solution: AM-AV OCC System</h2>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 mb-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              After evaluating three crew management systems, the airline selected the AM-AV OCC System for its AI-driven compliance engine, 
              fairness-optimized scheduling algorithms, and ability to ingest their existing Operations Manual (OM-A through OM-G) without 
              manual rule configuration.
            </p>

            <h3 className="text-2xl font-bold text-white mb-6">Implementation Approach</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-cyan-500/20 rounded-lg p-3 mr-4">
                  <span className="text-cyan-400 font-bold text-xl">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Operations Manual Ingestion (Week 1-2)</h4>
                  <p className="text-gray-300 text-sm">
                    Uploaded 847-page Operations Manual; AI engine automatically extracted 1,247 compliance rules covering flight time limitations, 
                    duty periods, rest requirements, and recency rules
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-500/20 rounded-lg p-3 mr-4">
                  <span className="text-cyan-400 font-bold text-xl">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Pilot Data Migration (Week 3-4)</h4>
                  <p className="text-gray-300 text-sm">
                    Imported 247 pilot profiles with qualifications, medical certificates, recency data, and historical flight hours; 
                    validated data integrity with automated compliance checks
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-500/20 rounded-lg p-3 mr-4">
                  <span className="text-cyan-400 font-bold text-xl">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Parallel Testing (Week 5-12)</h4>
                  <p className="text-gray-300 text-sm">
                    Ran AM-AV system alongside manual process for 8 weeks; AI-generated rosters matched manual schedules 96.3% of the time, 
                    with remaining differences due to AI catching violations missed by humans
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-500/20 rounded-lg p-3 mr-4">
                  <span className="text-cyan-400 font-bold text-xl">4</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Full Deployment (Week 13-16)</h4>
                  <p className="text-gray-300 text-sm">
                    Transitioned to AM-AV as primary scheduling system; Chief Pilot retained manual override capability for special circumstances; 
                    trained 12 operations staff on system usage
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-cyan-500/20 rounded-lg p-3 mr-4">
                  <span className="text-cyan-400 font-bold text-xl">5</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">Optimization & Refinement (Week 17-24)</h4>
                  <p className="text-gray-300 text-sm">
                    Fine-tuned fairness parameters based on pilot feedback; integrated pilot preference system for days off and route preferences; 
                    achieved 94% pilot satisfaction score
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-start">
                <CheckCircle className="h-8 w-8 text-green-400 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Implementation Success Factors</h4>
                  <p className="text-gray-300 text-sm">
                    Strong executive sponsorship from Chief Pilot, phased rollout with parallel testing to build trust, 
                    comprehensive training program for operations staff, and continuous feedback loop with pilots during optimization phase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-blue-950/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Results & Impact</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-5xl font-bold text-green-400 mb-2">70%</p>
              <p className="text-white font-semibold mb-2">Time Savings</p>
              <p className="text-gray-300 text-sm">Roster generation reduced from 60 hours to 18 hours per month</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-5xl font-bold text-green-400 mb-2">0</p>
              <p className="text-white font-semibold mb-2">Violations</p>
              <p className="text-gray-300 text-sm">Zero compliance violations in 6 months post-deployment</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-5xl font-bold text-green-400 mb-2">94%</p>
              <p className="text-white font-semibold mb-2">Pilot Satisfaction</p>
              <p className="text-gray-300 text-sm">Increased from 68% to 94% through fair scheduling</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-950/50 rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Operational Improvements</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Schedule Publication Time</p>
                    <p className="text-gray-300 text-sm">Rosters now published 10 days before month start (previously 5-7 days late)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Emergency Crew Swaps</p>
                    <p className="text-gray-300 text-sm">Reduced from 3-4 per week to 0.5 per week (87% reduction)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Fair Flight Distribution</p>
                    <p className="text-gray-300 text-sm">Night flights and layovers distributed evenly; standard deviation reduced by 78%</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold mb-1">Pilot Preference Matching</p>
                    <p className="text-gray-300 text-sm">91% of pilot day-off requests accommodated (previously 62%)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/50 rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Financial Impact</h3>
              <div className="space-y-4">
                <div className="bg-green-950/30 rounded-lg p-4 border border-green-500/20">
                  <p className="text-green-400 font-semibold mb-1">$280,000 Annual Savings</p>
                  <p className="text-gray-300 text-sm">Eliminated regulatory fines and audit remediation costs</p>
                </div>
                <div className="bg-green-950/30 rounded-lg p-4 border border-green-500/20">
                  <p className="text-green-400 font-semibold mb-1">$420,000 Productivity Gain</p>
                  <p className="text-gray-300 text-sm">Chief Pilot and operations staff freed for strategic initiatives</p>
                </div>
                <div className="bg-green-950/30 rounded-lg p-4 border border-green-500/20">
                  <p className="text-green-400 font-semibold mb-1">$180,000 Retention Savings</p>
                  <p className="text-gray-300 text-sm">Pilot turnover reduced from 18% to 7%, saving recruitment and training costs</p>
                </div>
                <div className="bg-green-950/30 rounded-lg p-4 border border-green-500/20">
                  <p className="text-green-400 font-semibold mb-1">ROI: 4.2x in Year 1</p>
                  <p className="text-gray-300 text-sm">Total annual benefit of $880,000 vs. $210,000 system cost</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/20 mb-8">
            <div className="flex items-start">
              <Quote className="h-8 w-8 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-300 italic mb-3">
                  "The AM-AV system transformed our operations. What used to take me three full days every month now takes four hours. 
                  More importantly, I sleep better knowing that every schedule is 100% compliant. Our pilots are happier, our operations 
                  are smoother, and we've eliminated regulatory risk."
                </p>
                <p className="text-gray-400 text-sm">— Chief Pilot, Regional Carrier</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/20">
            <div className="flex items-start">
              <Quote className="h-8 w-8 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-300 italic mb-3">
                  "For the first time in my career, I feel like scheduling is fair. The system considers my preferences, distributes 
                  flights evenly, and I get my roster two weeks in advance so I can plan my life. It's a game-changer for work-life balance."
                </p>
                <p className="text-gray-400 text-sm">— Senior First Officer, Regional Carrier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Key Takeaways</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <Clock className="h-10 w-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">AI-Driven Automation Scales Operations</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Manual scheduling processes break down as airlines grow. AI-powered systems like AM-AV can handle exponential complexity 
                increases while maintaining compliance and fairness, enabling airlines to scale without proportionally increasing operations staff.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <Shield className="h-10 w-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Compliance is Non-Negotiable</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Regulatory violations carry severe financial and reputational costs. Automated compliance engines eliminate human error 
                and provide audit trails, transforming compliance from a risk to a competitive advantage.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <Users className="h-10 w-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Pilot Satisfaction Drives Retention</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Fair scheduling that respects pilot preferences and distributes workload evenly directly impacts retention. 
                In a tight labor market, pilot satisfaction is a strategic asset that reduces turnover costs and maintains operational continuity.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <TrendingUp className="h-10 w-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">ROI Extends Beyond Direct Savings</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                While cost savings are measurable, the strategic benefits—faster growth, reduced risk, improved morale, and operational 
                agility—often exceed direct financial returns. Technology investments should be evaluated holistically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-900/30 to-blue-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Airline Operations
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            See how the AM-AV OCC System can deliver similar results for your airline. 
            Schedule a personalized demo with your operational data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
                Schedule Demo
              </button>
            </Link>
            <Link href="/solutions/aviation">
              <button className="px-8 py-4 bg-blue-900/50 text-white rounded-lg font-bold border border-cyan-500/30 hover:bg-blue-900/70 transition-all">
                Explore AM-AV System
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
