import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plane, CheckCircle, TrendingUp, Shield, ArrowRight } from "lucide-react";

export default function Aviation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-aviation.jpg"
            alt="Aviation Intelligence"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src="/images/ai-logo-64.png" alt="AI" className="h-16 w-16" />
            <Plane className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Aviation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Intelligence</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Transform aviation operations with AI-powered predictive maintenance, autonomous flight systems, and intelligent air traffic optimization
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Predictive Maintenance */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/aviation-predictive-maintenance.jpg"
                  alt="Predictive Maintenance"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Predictive Maintenance</h3>
              <p className="text-gray-300 mb-4">
                Real-time aircraft health monitoring using advanced sensor fusion and machine learning to predict component failures before they occur.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>96.5% predictive accuracy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>35% reduction in maintenance costs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>45% decrease in unscheduled downtime</span>
                </li>
              </ul>
            </div>

            {/* Autonomous Flight Systems */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/aviation-autonomous-flight.jpg"
                  alt="Autonomous Flight"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Autonomous Flight Systems</h3>
              <p className="text-gray-300 mb-4">
                AI-assisted navigation, collision avoidance, and flight path optimization for enhanced safety and efficiency.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>99.9% collision avoidance success rate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>20% fuel efficiency improvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time weather adaptation</span>
                </li>
              </ul>
            </div>

            {/* Air Traffic Optimization */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/aviation-traffic-optimization.jpg"
                  alt="Traffic Optimization"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Air Traffic Optimization</h3>
              <p className="text-gray-300 mb-4">
                Intelligent routing and scheduling algorithms that reduce congestion, minimize delays, and optimize airspace utilization.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>30% reduction in flight delays</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>25% increase in airspace capacity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time dynamic rerouting</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Aviation Intelligence?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Reduced Operating Costs</h3>
                <p className="text-gray-300">
                  Save millions annually through optimized maintenance schedules, fuel efficiency improvements, and reduced downtime.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enhanced Safety</h3>
                <p className="text-gray-300">
                  Prevent accidents before they happen with predictive analytics and AI-powered safety systems that exceed industry standards.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Regulatory Compliance</h3>
                <p className="text-gray-300">
                  Meet and exceed FAA, EASA, and international aviation safety standards with comprehensive audit trails and reporting.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Plane className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Scalable Platform</h3>
                <p className="text-gray-300">
                  From single aircraft operators to major airlines, our solution scales to meet your needs with enterprise-grade reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Aviation Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a demo to see how our Aviation Intelligence solution can benefit your organization
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
