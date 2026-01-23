import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, Lock, AlertTriangle, ArrowRight, BookOpen, FileText } from "lucide-react";

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
            Enterprise-grade security architecture for aviation, AI infrastructure, and critical systems. We design, build, and operate AI-augmented security platforms that protect high-value environments from advanced persistent threats, insider risks, and zero-day exploits.
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
              <h3 className="text-2xl font-bold text-white mb-4">AI-Augmented Threat Intelligence</h3>
              <p className="text-gray-300 mb-4">
                Deep learning models trained on aviation-specific attack patterns, AI infrastructure vulnerabilities, and adversarial tactics. Our threat detection engine correlates network telemetry, endpoint behavior, and cloud activity to identify sophisticated attacks—including supply chain compromises, model poisoning attempts, and GPU infrastructure exploitation—before they escalate.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sub-second anomaly correlation across hybrid environments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Zero-day exploit detection through behavioral analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Threat hunting automation with human-in-the-loop validation</span>
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
              <h3 className="text-2xl font-bold text-white mb-4">Zero Trust Architecture</h3>
              <p className="text-gray-300 mb-4">
                Continuous verification across identity, device, network, and application layers. Our Zero Trust implementation treats every access request as untrusted, enforcing least-privilege access, micro-segmentation, and real-time risk scoring. Designed for aviation operations centers, AI training clusters, and multi-cloud environments where traditional perimeter defenses fail.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Identity-aware micro-segmentation for critical workloads</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continuous authentication with behavioral biometrics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Automated policy enforcement across hybrid infrastructure</span>
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
              <h3 className="text-2xl font-bold text-white mb-4">Post-Quantum Cryptography</h3>
              <p className="text-gray-300 mb-4">
                Future-proof encryption for sensitive aviation data, AI model weights, and intellectual property. We implement NIST-standardized post-quantum algorithms alongside hybrid classical-quantum key exchange to protect against harvest-now-decrypt-later attacks. Our cryptographic architecture supports on-prem, cloud, and air-gapped deployments.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>NIST-approved lattice-based and hash-based algorithms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hybrid key exchange for backward compatibility</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hardware security module (HSM) integration</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Security Operations & Incident Readiness</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Augmented SOC</h3>
                <p className="text-gray-300">
                  We operate Security Operations Centers where AI handles tier-1 triage, alert correlation, and initial response while human analysts focus on complex investigations, threat hunting, and strategic decision-making. Our SOC integrates SIEM, EDR, NDR, and cloud security telemetry into a unified threat intelligence platform.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Lock className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Digital Forensics & Incident Response</h3>
                <p className="text-gray-300">
                  Rapid containment, evidence preservation, and root cause analysis for aviation incidents, AI infrastructure breaches, and supply chain compromises. Our DFIR team follows NIST 800-61 incident handling procedures with aviation-specific playbooks for operational technology (OT) environments and AI training pipelines.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Compliance & Governance</h3>
                <p className="text-gray-300">
                  Align security architecture with Egyptian Personal Data Protection Law (PDPL 151/2020), ISO 27001, NIST Cybersecurity Framework, and aviation-specific regulations (ICAO Annex 17, TSA directives). We provide continuous compliance monitoring, audit-ready documentation, and regulatory reporting automation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Cloud, Hybrid & On-Prem Security</h3>
                <p className="text-gray-300">
                  Unified security posture management across AWS, Azure, GCP, and on-premises infrastructure. We secure AI training clusters, GPU farms, aviation operational systems, and hybrid cloud workloads with consistent policy enforcement, encrypted data flows, and automated vulnerability remediation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Sector-Aware Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Aviation Operations", desc: "Protect flight operations centers, crew scheduling systems, and aviation safety-critical infrastructure from cyber-physical attacks and insider threats" },
              { title: "AI Infrastructure", desc: "Secure AI training pipelines, model registries, inference endpoints, and GPU clusters against model theft, poisoning attacks, and unauthorized access" },
              { title: "Enterprise & Government", desc: "Defend corporate networks, classified systems, and critical business applications with defense-in-depth architecture and continuous monitoring" },
              { title: "Cloud & SaaS Platforms", desc: "Implement tenant isolation, API security, and data residency controls for multi-tenant cloud services and SaaS applications" },
              { title: "Critical Infrastructure", desc: "Safeguard operational technology (OT) environments, SCADA systems, and industrial control systems with air-gapped architectures and anomaly detection" },
              { title: "Research & Development", desc: "Protect intellectual property, research data, and proprietary algorithms with data loss prevention, encryption, and access controls" }
            ].map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h4 className="text-lg font-bold text-white mb-2">{useCase.title}</h4>
                <p className="text-gray-300 text-sm">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Security Case Studies</h2>
            <p className="text-xl text-gray-300">Real-world implementations and measurable security improvements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/case-studies/aviation-security">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-cyan-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Aviation Security Transformation</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  How a Middle East regional carrier achieved 94% incident reduction and sub-5-minute response times through Zero Trust architecture and AI-augmented SOC operations.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Read Case Study
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-cyan-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Assess Your Security Posture</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Take our interactive security assessment to evaluate your current posture and receive personalized architecture recommendations.
              </p>
              <Link href="/security-assessment">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all inline-flex items-center">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Blog */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Security Blog & Technical Articles</h2>
            <p className="text-xl text-gray-300">In-depth technical content on AI security, Zero Trust, and threat defense</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/blog/ai-model-poisoning">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-cyan-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Securing AI Training Pipelines</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Comprehensive technical guide to defending AI training infrastructure from data poisoning, backdoor attacks, and adversarial manipulation.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Read Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
            <Link href="/blog/zero-trust-aviation">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-cyan-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Zero Trust for Aviation OCC</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Technical implementation guide for Zero Trust security architecture in aviation operations centers with crew management and flight operations systems.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
                  Read Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/blog/security">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all inline-flex items-center">
                View All Security Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Security Resource Hub CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-cyan-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/30">
            <Shield className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Explore Our Security Resource Hub
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Access curated security resources tailored for CISOs, CTOs, and security engineers. Find assessments, case studies, technical articles, and whitepapers to strengthen your security posture.
            </p>
            <Link href="/security-resources">
              <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
                Visit Resource Hub
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Secure Your Critical Infrastructure
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a security architecture review to assess your current posture and design a defense strategy aligned with your operational requirements
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
              Request Architecture Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
