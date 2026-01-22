import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, TrendingUp, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import VideoDemo from "@/components/VideoDemo";

export default function CyberSecurityCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO 
        title="Aviation Security Case Study - Apex Meridian"
        description="How a regional aviation operator reduced security incidents by 94% and achieved sub-5-minute threat response times with Apex Meridian's AI-augmented security architecture"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-10 w-10 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-lg">Case Study</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Securing Aviation Operations: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">94% Reduction in Security Incidents</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            How a regional aviation operator transformed their security posture with AI-augmented threat detection, Zero Trust architecture, and 24/7 SOC operations
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <span className="font-semibold text-white mr-2">Industry:</span> Aviation Operations
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-white mr-2">Region:</span> Middle East
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-white mr-2">Duration:</span> 18 months
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoDemo
            title="Security Architecture Transformation: Before & After"
            description="Watch how we transformed this aviation operator's security posture from reactive incident response to proactive threat prevention. This demo walks through the architecture migration, AI-augmented SOC deployment, and real-time threat detection improvements."
            duration="8:45"
          />
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Impact Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-green-400" />
                <span className="text-3xl font-bold text-green-400">94%</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Incident Reduction</h3>
              <p className="text-gray-300 text-sm">Security incidents dropped from 120/year to 7/year after full deployment</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <Clock className="h-8 w-8 text-cyan-400" />
                <span className="text-3xl font-bold text-cyan-400">&lt;5min</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
              <p className="text-gray-300 text-sm">Mean time to detect and respond decreased from 4.2 hours to under 5 minutes</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="h-8 w-8 text-blue-400" />
                <span className="text-3xl font-bold text-blue-400">100%</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Compliance Achievement</h3>
              <p className="text-gray-300 text-sm">Full compliance with ICAO Annex 17, ISO 27001, and Egyptian PDPL 151/2020</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
                <span className="text-3xl font-bold text-yellow-400">0</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Zero-Day Breaches</h3>
              <p className="text-gray-300 text-sm">No successful zero-day exploits or advanced persistent threats detected post-deployment</p>
            </div>

          </div>
        </div>
      </section>

      {/* Client Background */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">Client Background</h2>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              A regional aviation operator in the Middle East managing a fleet of 45 aircraft, serving 60+ destinations, and operating critical flight operations centers, crew scheduling systems, and maintenance tracking infrastructure. The organization faced increasing cyber threats targeting aviation operational technology (OT) environments, including attempted intrusions into flight planning systems and crew management databases.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Prior to engagement with Apex Meridian, the operator relied on legacy perimeter-based security with limited visibility into insider threats, no behavioral anomaly detection, and manual incident response processes that averaged over 4 hours from detection to containment. Regulatory pressure from civil aviation authorities and insurance requirements demanded immediate security posture improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">The Challenge</h2>
          <div className="space-y-6">
            
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                Legacy Infrastructure Vulnerabilities
              </h3>
              <p className="text-gray-300">
                Outdated security tools with no integration between network monitoring, endpoint protection, and cloud security. Critical aviation systems running on aging infrastructure with known vulnerabilities and no automated patching capabilities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                Insider Threat Blind Spots
              </h3>
              <p className="text-gray-300">
                No behavioral analytics to detect anomalous access patterns from privileged users. Crew members and maintenance staff had excessive permissions with no continuous authentication or session monitoring, creating significant insider risk exposure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                Slow Incident Response
              </h3>
              <p className="text-gray-300">
                Manual triage and investigation processes with mean time to detect (MTTD) of 3.8 hours and mean time to respond (MTTR) of 4.2 hours. No automated playbooks for common attack scenarios, resulting in inconsistent response quality and potential operational disruptions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3" />
                Compliance Gaps
              </h3>
              <p className="text-gray-300">
                Partial compliance with ICAO Annex 17 cybersecurity requirements and Egyptian Personal Data Protection Law (PDPL 151/2020). No continuous compliance monitoring, audit-ready documentation, or automated reporting capabilities for regulatory submissions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">The Solution</h2>
          <p className="text-xl text-gray-300 mb-12">
            Apex Meridian designed and deployed a comprehensive security architecture combining AI-augmented threat detection, Zero Trust access controls, and 24/7 SOC operations tailored for aviation operational environments.
          </p>

          <div className="space-y-8">
            
            {/* Phase 1 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-start mb-4">
                <div className="bg-cyan-500/20 rounded-full px-4 py-2 text-cyan-400 font-bold mr-4">Phase 1</div>
                <h3 className="text-2xl font-bold text-white mt-1">Security Architecture Design & Risk Assessment</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Conducted comprehensive threat modeling for aviation-specific attack vectors, including cyber-physical threats to flight operations, supply chain vulnerabilities, and insider risk scenarios. Designed Zero Trust architecture with identity-aware micro-segmentation for critical workloads (flight planning, crew scheduling, maintenance tracking).
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Threat landscape analysis specific to Middle East aviation sector</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Zero Trust network architecture with least-privilege access policies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Compliance gap analysis for ICAO Annex 17, ISO 27001, Egyptian PDPL</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-start mb-4">
                <div className="bg-cyan-500/20 rounded-full px-4 py-2 text-cyan-400 font-bold mr-4">Phase 2</div>
                <h3 className="text-2xl font-bold text-white mt-1">AI-Augmented Threat Detection Deployment</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Deployed deep learning models trained on aviation-specific attack patterns to detect anomalous network traffic, endpoint behavior, and cloud activity. Integrated SIEM, EDR, NDR, and cloud security telemetry into unified threat intelligence platform with automated alert correlation and prioritization.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Behavioral anomaly detection for insider threat identification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Network traffic analysis with protocol-aware deep packet inspection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cloud workload protection for AWS-hosted crew management systems</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-start mb-4">
                <div className="bg-cyan-500/20 rounded-full px-4 py-2 text-cyan-400 font-bold mr-4">Phase 3</div>
                <h3 className="text-2xl font-bold text-white mt-1">24/7 SOC Operations & Incident Response</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Established AI-augmented Security Operations Center with tier-1 triage handled by machine learning models and human analysts focusing on complex investigations. Implemented automated incident response playbooks for common attack scenarios (phishing, ransomware, credential compromise) with NIST 800-61 procedures.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>24/7 security monitoring with sub-5-minute alert-to-action SLA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Automated containment for high-confidence threats (isolate endpoints, block IPs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Digital forensics capabilities for post-incident root cause analysis</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">Results & Business Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Before Implementation</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>120 security incidents per year</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>4.2 hours mean time to respond</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Manual threat hunting (8 hours/week)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Partial compliance with aviation regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>No visibility into insider threats</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4">After Implementation</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>7 security incidents per year (94% reduction)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>&lt;5 minutes mean time to respond (98% improvement)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Automated threat hunting (continuous)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>100% compliance with ICAO, ISO 27001, PDPL</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Real-time insider threat detection and alerting</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Client Testimonial</h3>
            <blockquote className="text-xl text-gray-300 italic leading-relaxed mb-4">
              "Apex Meridian transformed our security posture from reactive to proactive. The AI-augmented threat detection identified attack patterns we never knew existed, and the 24/7 SOC gave us confidence that our flight operations are protected around the clock. The compliance automation alone saved our team hundreds of hours in audit preparation."
            </blockquote>
            <p className="text-gray-400">
              — Chief Information Security Officer, Regional Aviation Operator (Middle East)
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Security Posture?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a security architecture review to assess your current environment and design a defense strategy tailored to your operational requirements
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
