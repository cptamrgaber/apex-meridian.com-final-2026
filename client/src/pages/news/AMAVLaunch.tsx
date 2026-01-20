import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function AMAVLaunch() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="Apex Meridian Launches AM-AV OCC System | Aviation News"
        description="Enterprise-grade Operations Control Center platform transforms airline crew management with AI-driven compliance and intelligent scheduling"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </button>
          </Link>
          
          <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full inline-block mb-4">
            Product Launch
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Apex Meridian Launches Revolutionary AM-AV OCC System for Aviation Operations
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-400 mb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>January 20, 2026</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Apex Meridian Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="bg-blue-950/50 rounded-2xl p-8 border border-cyan-500/20">
              
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                <strong>Cairo, Egypt - January 20, 2026</strong> - Apex Meridian, a leading provider of AI-powered solutions for critical industries, today announced the launch of the <strong>AM-AV OCC Web Dashboard</strong>, an enterprise-grade Operations Control Center platform designed specifically for airline operations management.
              </p>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Transforming Aviation Operations with AI</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                The AM-AV OCC System represents a paradigm shift in how airlines manage crew scheduling, regulatory compliance, and operational oversight. By leveraging advanced artificial intelligence and machine learning, the platform automates complex scheduling tasks while maintaining zero-tolerance enforcement of aviation safety regulations.
              </p>

              <h3 className="text-2xl font-bold text-white mt-10 mb-4">Key Features</h3>

              <div className="space-y-6 mb-8">
                <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Intelligent Crew Scheduling</h4>
                  <p className="text-gray-300">
                    The system automatically generates monthly rosters based on pilot preferences, qualifications, and regulatory requirements, reducing manual scheduling effort by up to 70%. The AI engine considers thousands of variables simultaneously to create optimal schedules that balance operational needs with crew satisfaction.
                  </p>
                </div>

                <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">AI-Driven Compliance Engine</h4>
                  <p className="text-gray-300">
                    At the heart of the AM-AV system is a sophisticated compliance engine that performs real-time validation against ICAO standards and operator-specific Operations Manuals (OM-A through OM-G). The engine uses natural language processing to parse regulatory text and convert it into executable validation logic, ensuring that every scheduling decision complies with aviation safety rules.
                  </p>
                </div>

                <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Operations Manual Integration</h4>
                  <p className="text-gray-300">
                    Airlines can upload their approved Operations Manuals in PDF or structured format. The system automatically ingests these documents, extracts rules and constraints, and enforces them throughout all scheduling operations. This eliminates the risk of human error in manual compliance checking.
                  </p>
                </div>

                <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Real-Time Operations Monitoring</h4>
                  <p className="text-gray-300">
                    The platform provides live visibility into flight tracking, crew duty status, and operational alerts. Chief pilots and administrators can monitor their entire operation from a single dashboard, with immediate notifications of any compliance issues or operational disruptions.
                  </p>
                </div>

                <div className="bg-cyan-900/20 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">Multi-Tenant Architecture</h4>
                  <p className="text-gray-300">
                    The system supports multiple airline operators with isolated data storage, custom branding, and operator-specific rule sets. Each airline receives a dedicated tenant environment with complete data privacy and security.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Business Value and Safety Impact</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Early adopters of the AM-AV OCC System have reported significant operational improvements:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <p className="text-cyan-400 font-bold text-2xl mb-2">70%</p>
                  <p className="text-gray-300">Reduction in manual scheduling time</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <p className="text-cyan-400 font-bold text-2xl mb-2">Zero Tolerance</p>
                  <p className="text-gray-300">Enforcement of flight time limitations</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <p className="text-cyan-400 font-bold text-2xl mb-2">100%</p>
                  <p className="text-gray-300">Audit readiness with immutable logs</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <p className="text-cyan-400 font-bold text-2xl mb-2">Enhanced</p>
                  <p className="text-gray-300">Pilot satisfaction through preferences</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                The system directly enhances aviation safety by eliminating human error in schedule checking, ensuring consistent application of regulatory requirements, and preventing fatigue-related incidents through strict duty time enforcement.
              </p>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Technology Stack</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                The AM-AV OCC System is built on a modern, scalable technology stack:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">Frontend</p>
                  <p className="text-gray-300 text-sm">React 19 with TypeScript</p>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">Backend</p>
                  <p className="text-gray-300 text-sm">Node.js with Express and tRPC</p>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">Database</p>
                  <p className="text-gray-300 text-sm">MySQL/TiDB with Drizzle ORM</p>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/10">
                  <p className="text-cyan-400 font-semibold mb-1">AI/ML</p>
                  <p className="text-gray-300 text-sm">Transformer-based language models</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">User Roles and Workflows</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                The platform serves three primary user roles:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-white mb-3">Pilots</h4>
                  <p className="text-gray-300">
                    Can submit monthly preferences for destinations, days off, and aircraft types, view their published schedules, request swaps with qualified colleagues, and export schedules to calendar applications.
                  </p>
                </div>

                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-white mb-3">Chief Pilots</h4>
                  <p className="text-gray-300">
                    Can view all pilot preferences, generate and publish monthly rosters with AI assistance, approve or reject swap requests, override AI recommendations with justification, and access compliance reports and violation alerts.
                  </p>
                </div>

                <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                  <h4 className="text-xl font-semibold text-white mb-3">Administrators</h4>
                  <p className="text-gray-300">
                    Can manage tenant settings and Operations Manual uploads, configure system-wide parameters, view cross-tenant analytics, manage user accounts and role assignments, and access audit logs and security reports.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Availability and Pricing</h2>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                The AM-AV OCC System is now available for airline operators worldwide. Apex Meridian offers flexible pricing models based on fleet size and operational complexity, with options for cloud-hosted or on-premises deployment.
              </p>

              <p className="text-gray-300 leading-relaxed mb-8">
                Interested airlines can schedule a live demonstration by contacting Apex Meridian at <a href="mailto:info@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">info@apex-meridian.com</a> or visiting our <Link href="/solutions/aviation"><a className="text-cyan-400 hover:text-cyan-300">Aviation Intelligence page</a></Link>.
              </p>

              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg p-8 border border-cyan-500/20 mt-12">
                <h3 className="text-2xl font-bold text-white mb-4">About Apex Meridian</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Apex Meridian is a Cairo-based technology company specializing in AI-powered solutions for aviation, cybersecurity, education, and AGI research. The company's mission is to transform critical industries through artificial intelligence, delivering cutting-edge solutions that enhance safety, efficiency, and human potential.
                </p>
                <p className="text-gray-300">
                  For more information, visit <a href="https://apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">apex-meridian.com</a> or follow us on LinkedIn and Twitter.
                </p>
              </div>

              <div className="border-t border-cyan-500/20 mt-12 pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Media Contact:</h4>
                <div className="text-gray-300 space-y-2">
                  <p>Apex Meridian Communications Team</p>
                  <p>Email: <a href="mailto:info@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">info@apex-meridian.com</a></p>
                  <p>Phone: +201 2 00 92 90 92</p>
                  <p>Website: <a href="https://apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">apex-meridian.com</a></p>
                </div>
              </div>

            </div>
          </article>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in the AM-AV OCC System?</h3>
            <p className="text-gray-300 mb-6">Schedule a live demonstration and see how it can transform your aviation operations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solutions/aviation">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all inline-flex items-center justify-center">
                  Learn More
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-blue-950/50 text-white rounded-lg font-bold hover:bg-blue-900/50 transition-all border border-cyan-500/20">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
