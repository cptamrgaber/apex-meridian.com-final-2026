import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Target, Eye, Heart, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="About Us - Leading AI Innovation"
        description="Learn about Apex Meridian's mission to transform industries through artificial intelligence. Meet our expert team and discover our commitment to responsible AI development."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/company-team.jpg"
            alt="Apex Meridian Team"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">A p e x - M e r i d i a n ®</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            We are pioneers in artificial intelligence, transforming industries through innovative solutions that enhance safety, security, and human potential.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To deliver transformative AI solutions that enhance safety, security, and human potential across aviation, cybersecurity, education, and AGI research.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To pioneer the future of artificial intelligence, creating solutions that solve humanity's most complex challenges while ensuring ethical and responsible development.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Values</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Innovation:</strong> Pushing boundaries</li>
                <li>• <strong>Excellence:</strong> Uncompromising quality</li>
                <li>• <strong>Integrity:</strong> Ethical AI development</li>
                <li>• <strong>Collaboration:</strong> Partnership-driven</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded with a vision to harness the power of artificial intelligence for the betterment of humanity, <span className="font-semibold text-white">A p e x - M e r i d i a n ®</span> has grown from a research initiative into a global leader in AI solutions.
                </p>
                <p>
                  Our journey began with a simple question: How can AI make the world safer, more secure, and more intelligent? This question led us to develop groundbreaking solutions across four key sectors: aviation, cybersecurity, education, and AGI research.
                </p>
                <p>
                  Today, we serve over 50 enterprise clients across 4 global regions, delivering AI solutions that achieve industry-leading accuracy rates and transform how organizations operate.
                </p>
                <p>
                  Our proprietary <strong className="text-cyan-400">Meridian Engine</strong> platform powers all our solutions, providing a unified, scalable foundation for AI innovation.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/meridian-engine-architecture.jpg"
                alt="Meridian Engine Architecture"
                className="rounded-2xl shadow-2xl border border-cyan-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-300">
              Led by world-class experts in AI, engineering, and business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { role: "Chief Executive Officer", expertise: "AI Strategy & Leadership" },
              { role: "Chief Technology Officer", expertise: "Machine Learning & Systems" },
              { role: "Chief Science Officer", expertise: "AGI Research & Ethics" },
              { role: "Chief Operating Officer", expertise: "Operations & Growth" }
            ].map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 text-center">
                <div className="bg-cyan-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-cyan-400" />
                </div>
                <p className="text-cyan-400 font-semibold text-lg mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Global Presence</h2>
            <p className="text-xl text-gray-300">
              Serving clients across four continents
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <img
              src="/images/chart-global-presence.png"
              alt="Global Presence Map"
              className="w-full rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              { region: "North America", clients: "20+ clients" },
              { region: "Europe", clients: "15+ clients" },
              { region: "Middle East & Africa", clients: "10+ clients" },
              { region: "Asia Pacific", clients: "5+ clients" }
            ].map((region, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 text-center">
                <h4 className="text-xl font-bold text-white mb-2">{region.region}</h4>
                <p className="text-cyan-400">{region.clients}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
