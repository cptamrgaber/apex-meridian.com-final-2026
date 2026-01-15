import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Lock, AlertTriangle, ArrowRight } from "lucide-react";

export default function Cybersecurity() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-cybersecurity.jpg"
            alt="Cybersecurity Shield"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src="/images/ai-logo-white-64.png" alt="AI" className="h-16 w-auto" />
            <Shield className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cybersecurity <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Shield</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Protect critical infrastructure with AI-driven threat detection, behavioral anomaly analysis, and quantum-resistant encryption
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* AI-Powered Threat Detection */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/cyber-threat-detection.jpg"
                  alt="Threat Detection"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Threat Detection</h3>
              <p className="text-gray-300 mb-4">
                Real-time threat identification using advanced machine learning models that detect zero-day exploits, malware, and sophisticated attack patterns.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>98.2% threat detection accuracy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sub-second response time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Zero-day exploit detection</span>
                </li>
              </ul>
            </div>

            {/* Behavioral Anomaly Detection */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/cyber-behavioral-analysis.jpg"
                  alt="Behavioral Analysis"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Behavioral Anomaly Detection</h3>
              <p className="text-gray-300 mb-4">
                Identify insider threats and compromised accounts through continuous behavioral analysis and user activity monitoring.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>95% insider threat detection rate</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continuous user behavior profiling</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Automated risk scoring</span>
                </li>
              </ul>
            </div>

            {/* Quantum-Resistant Encryption */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/cyber-encryption.jpg"
                  alt="Quantum Encryption"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quantum-Resistant Encryption</h3>
              <p className="text-gray-300 mb-4">
                Future-proof your data with post-quantum cryptography algorithms that protect against both classical and quantum computing attacks.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>NIST-approved algorithms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quantum-safe key exchange</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>End-to-end data protection</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Why Choose Cybersecurity Shield?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Proactive Threat Prevention</h3>
                <p className="text-gray-300">
                  Stop attacks before they cause damage with predictive threat intelligence and automated response systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Lock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Comprehensive Protection</h3>
                <p className="text-gray-300">
                  Protect all attack surfaces including network, endpoint, cloud, and application layers with unified security.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Compliance Ready</h3>
                <p className="text-gray-300">
                  Meet GDPR, HIPAA, SOC 2, and other regulatory requirements with built-in compliance reporting and audit trails.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 Monitoring</h3>
                <p className="text-gray-300">
                  Round-the-clock threat monitoring and incident response with AI-powered security operations center (SOC) capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Industry Applications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Financial Services", desc: "Protect customer data and prevent fraud in banking and fintech" },
              { title: "Healthcare", desc: "Secure patient records and medical devices from cyber threats" },
              { title: "Critical Infrastructure", desc: "Safeguard power grids, water systems, and transportation networks" },
              { title: "Government", desc: "Defend national security systems and classified information" },
              { title: "Enterprise", desc: "Protect corporate networks, intellectual property, and trade secrets" },
              { title: "Cloud Services", desc: "Secure multi-tenant cloud environments and SaaS applications" }
            ].map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h4 className="text-lg font-bold text-white mb-2">{useCase.title}</h4>
                <p className="text-gray-300 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Protect Your Organization Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a security assessment to see how Cybersecurity Shield can protect your critical assets
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
              Request Security Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
