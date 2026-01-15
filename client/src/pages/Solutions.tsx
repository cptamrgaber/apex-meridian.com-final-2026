import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Plane, Shield, GraduationCap, Brain, ArrowRight } from "lucide-react";

export default function Solutions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="AI Solutions - Aviation, Cybersecurity, Education & AGI"
        description="Explore Apex Meridian's comprehensive AI solutions for aviation intelligence, cybersecurity defense, adaptive learning, and AGI research. Transform your industry with cutting-edge technology."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-cyan-900" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/images/ai-logo-white-128.png"
              alt="AI Solutions"
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Solutions</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Transforming industries with cutting-edge artificial intelligence across aviation, cybersecurity, education, and AGI research
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Aviation Intelligence */}
            <Link href="/solutions/aviation">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/hero-aviation.jpg"
                    alt="Aviation Intelligence"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-6 right-6 bg-cyan-500/20 backdrop-blur-sm rounded-full p-4">
                    <Plane className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Aviation Intelligence</h3>
                  <p className="text-gray-300 mb-6">
                    Transform aviation operations with AI-powered predictive maintenance, autonomous flight systems, and intelligent air traffic optimization. Achieve 96.5% predictive accuracy and reduce maintenance costs by up to 35%.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Predictive Maintenance:</strong> Real-time aircraft health monitoring</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Autonomous Flight:</strong> AI-assisted navigation and safety</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Traffic Optimization:</strong> Intelligent routing and scheduling</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Explore Aviation Solutions <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Cybersecurity Shield */}
            <Link href="/solutions/cybersecurity">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/hero-cybersecurity.jpg"
                    alt="Cybersecurity Shield"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-6 right-6 bg-cyan-500/20 backdrop-blur-sm rounded-full p-4">
                    <Shield className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Cybersecurity Shield</h3>
                  <p className="text-gray-300 mb-6">
                    Protect critical infrastructure with AI-driven threat detection, behavioral anomaly analysis, and quantum-resistant encryption. Achieve 98.2% threat detection accuracy and stop attacks before they happen.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Threat Detection:</strong> Proactive AI-powered security</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Behavioral Analysis:</strong> Insider threat identification</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Quantum Encryption:</strong> Future-proof data protection</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Explore Cybersecurity Solutions <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Education & Cognitive Enhancement */}
            <Link href="/solutions/education">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/hero-education.jpg"
                    alt="Education & Cognitive Enhancement"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-6 right-6 bg-cyan-500/20 backdrop-blur-sm rounded-full p-4">
                    <GraduationCap className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">Education & Cognitive Enhancement</h3>
                  <p className="text-gray-300 mb-6">
                    Revolutionize learning with adaptive AI platforms that personalize education, enhance cognitive abilities, and unlock human potential. Improve learning outcomes by up to 40% with intelligent tutoring systems.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Adaptive Learning:</strong> Personalized education paths</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Teacher Analytics:</strong> Real-time performance insights</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Cognitive Research:</strong> Memory and problem-solving enhancement</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Explore Education Solutions <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

            {/* AGI Research */}
            <Link href="/solutions/agi">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="/images/hero-agi.jpg"
                    alt="AGI Research"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-6 right-6 bg-cyan-500/20 backdrop-blur-sm rounded-full p-4">
                    <Brain className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">AGI Research</h3>
                  <p className="text-gray-300 mb-6">
                    Pioneer the future of intelligence through foundational AGI research. Developing neural-symbolic systems, cognitive architectures, and ethical frameworks for safe artificial general intelligence.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Neural-Symbolic AI:</strong> Combining learning and reasoning</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">Cognitive Architectures:</strong> Human-like intelligence modeling</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-300"><strong className="text-white">AI Ethics & Safety:</strong> Responsible AGI development</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Explore AGI Research <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Discover how our AI solutions can help you achieve your goals
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
