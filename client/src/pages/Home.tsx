import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Shield, GraduationCap, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="Home - AI Technology Solutions"
        description="Apex Meridian delivers cutting-edge AI solutions for aviation, cybersecurity, education, and AGI research. Transform your organization with our proprietary Meridian Engine platform."
        keywords="AI solutions, artificial intelligence, aviation AI, cybersecurity AI, education technology, AGI research, Meridian Engine, machine learning"
      />
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-home.jpg"
            alt="Apex Meridian AI Technology"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Transforming Industries with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
              Artificial Intelligence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
            <span className="font-semibold tracking-wider">A p e x - M e r i d i a n ®</span> delivers cutting-edge AI solutions for aviation, cybersecurity, education, and AGI research
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Explore Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-white/50 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive suite of AI solutions designed to transform industries and solve complex challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Aviation Intelligence */}
            <Link href="/solutions/aviation">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/hero-aviation.jpg"
                    alt="Aviation Intelligence"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3">
                    <Plane className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Aviation Intelligence</h3>
                  <p className="text-gray-300 mb-4">
                    AI-powered predictive maintenance, autonomous flight systems, and air traffic optimization
                  </p>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Cybersecurity Shield */}
            <Link href="/solutions/cybersecurity">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/hero-cybersecurity.jpg"
                    alt="Cybersecurity Shield"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3">
                    <Shield className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Cybersecurity Shield</h3>
                  <p className="text-gray-300 mb-4">
                    AI-driven threat detection, behavioral analysis, and quantum-resistant encryption
                  </p>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Education */}
            <Link href="/solutions/education">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/hero-education.jpg"
                    alt="Education & Cognitive Enhancement"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3">
                    <GraduationCap className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Education & Cognitive Enhancement</h3>
                  <p className="text-gray-300 mb-4">
                    Adaptive learning platform and cognitive analytics to unlock human potential
                  </p>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* AGI Research */}
            <Link href="/solutions/agi">
              <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/hero-agi.jpg"
                    alt="AGI Research"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
                  <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3">
                    <Brain className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">AGI Research</h3>
                  <p className="text-gray-300 mb-4">
                    Pioneering the future of intelligence through foundational AGI research
                  </p>
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic News and Blog Cards */}
      <section className="py-24 bg-gradient-to-b from-blue-950 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Latest News Card */}
            <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Latest Tech News</h3>
                <Link href="/news">
                  <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4 max-h-96 overflow-hidden">
                <div className="animate-scroll-up">
                  <Link href="/news">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">AI at Scale: 2025 Set the Stage for Agent-Driven Transformation</h4>
                          <p className="text-gray-400 text-sm mb-2">KPMG report reveals 82% of leaders agree their industry will look different in 24 months...</p>
                          <span className="text-cyan-400 text-xs">Jan 15, 2025 • KPMG</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Gartner Unveils Top 10 Strategic Technology Trends for 2025</h4>
                          <p className="text-gray-400 text-sm mb-2">Agentic AI leads Gartner's strategic technology trends, alongside quantum computing...</p>
                          <span className="text-cyan-400 text-xs">Jan 14, 2025 • Gartner</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Quantum Microchip Breakthrough Accelerates Computing Future</h4>
                          <p className="text-gray-400 text-sm mb-2">Microchip-sized device controls laser frequencies with extreme precision...</p>
                          <span className="text-cyan-400 text-xs">Jan 12, 2025 • ScienceDaily</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/news">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Machine Learning 2025: Autonomous Decision-Making Era</h4>
                          <p className="text-gray-400 text-sm mb-2">ML evolves from predictive models to autonomous systems driving operations...</p>
                          <span className="text-cyan-400 text-xs">Jan 10, 2025 • The Tech Whale</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Research Blog Card */}
            <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Research Insights</h3>
                <Link href="/research/blog">
                  <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4 max-h-96 overflow-hidden">
                <div className="animate-scroll-up">
                  <Link href="/research/blog/arabert-arabic-nlp">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">From 60M Tweets to Production: How AraBERT Revolutionized Arabic NLP</h4>
                          <p className="text-gray-400 text-sm mb-2">AUB MIND Lab's transformer models achieve state-of-the-art Arabic NLP...</p>
                          <span className="text-cyan-400 text-xs">Jan 15, 2025 • Dr. Ahmed Hassan</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/research/blog/photonic-quantum-computing">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Light-Speed Computing: Zewail City's Photonic Quantum Breakthrough</h4>
                          <p className="text-gray-400 text-sm mb-2">Muhammad AbuGhanem's research on encoding information in photons...</p>
                          <span className="text-cyan-400 text-xs">Jan 10, 2025 • Dr. Yasmine Khalil</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/research/blog/cairo-5g-iot-security">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Cairo University's 5G and IoT Security Research</h4>
                          <p className="text-gray-400 text-sm mb-2">CAMPIE project transforms campus into living IoT laboratory...</p>
                          <span className="text-cyan-400 text-xs">Jan 5, 2025 • Prof. Dr. Mohamed El-Sayed</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link href="/research/blog/hybrid-quantum-classical-ml">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors cursor-pointer mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-1">Hybrid Quantum-Classical Machine Learning with PennyLane</h4>
                          <p className="text-gray-400 text-sm mb-2">Seamless integration of quantum circuits with PyTorch and TensorFlow...</p>
                          <span className="text-cyan-400 text-xs">Dec 28, 2024 • Dr. Layla Ibrahim</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">96.5%</div>
              <div className="text-gray-300 text-lg">Predictive Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">98.2%</div>
              <div className="text-gray-300 text-lg">Threat Detection Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-gray-300 text-lg">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-400 mb-2">4</div>
              <div className="text-gray-300 text-lg">Global Regions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Discover how our AI solutions can help you achieve your goals
          </p>
          <Link href="/contact">
            <Button size="lg" className="px-10 py-6 text-lg bg-white text-blue-950 hover:bg-gray-100">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
