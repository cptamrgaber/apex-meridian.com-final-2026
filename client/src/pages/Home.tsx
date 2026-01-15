import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Shield, GraduationCap, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
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
