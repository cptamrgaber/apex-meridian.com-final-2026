import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Mail, Users, Building2 } from "lucide-react";
import { Link } from "wouter";

export default function OrganizationChart() {
  const departments = [
    {
      name: "Executive Leadership",
      email: "executive@apex-meridian.com",
      positions: [
        { title: "Chief Executive Officer (CEO)", email: "ceo@apex-meridian.com" },
        { title: "Chief Technology Officer (CTO)", email: "cto@apex-meridian.com" },
        { title: "Chief Science Officer (CSO)", email: "cso@apex-meridian.com" },
        { title: "Chief Operating Officer (COO)", email: "coo@apex-meridian.com" },
        { title: "Chief Financial Officer (CFO)", email: "cfo@apex-meridian.com" }
      ]
    },
    {
      name: "Engineering & Development",
      email: "engineering@apex-meridian.com",
      positions: [
        { title: "VP of Engineering", email: "vp-engineering@apex-meridian.com" },
        { title: "Director of AI Research", email: "ai-research@apex-meridian.com" },
        { title: "Director of Software Development", email: "software-dev@apex-meridian.com" },
        { title: "Director of Data Science", email: "data-science@apex-meridian.com" }
      ]
    },
    {
      name: "Sales & Business Development",
      email: "sales@apex-meridian.com",
      positions: [
        { title: "VP of Sales", email: "vp-sales@apex-meridian.com" },
        { title: "Director of Enterprise Sales", email: "enterprise-sales@apex-meridian.com" },
        { title: "Director of Business Development", email: "bizdev@apex-meridian.com" },
        { title: "Director of Partnerships", email: "partnerships@apex-meridian.com" }
      ]
    },
    {
      name: "Marketing & Communications",
      email: "marketing@apex-meridian.com",
      positions: [
        { title: "VP of Marketing", email: "vp-marketing@apex-meridian.com" },
        { title: "Director of Product Marketing", email: "product-marketing@apex-meridian.com" },
        { title: "Director of Communications", email: "communications@apex-meridian.com" },
        { title: "Director of Digital Marketing", email: "digital-marketing@apex-meridian.com" }
      ]
    },
    {
      name: "Product Management",
      email: "product@apex-meridian.com",
      positions: [
        { title: "VP of Product", email: "vp-product@apex-meridian.com" },
        { title: "Director of Product Strategy", email: "product-strategy@apex-meridian.com" },
        { title: "Director of Product Design", email: "product-design@apex-meridian.com" }
      ]
    },
    {
      name: "Customer Success",
      email: "customersuccess@apex-meridian.com",
      positions: [
        { title: "VP of Customer Success", email: "vp-customersuccess@apex-meridian.com" },
        { title: "Director of Customer Support", email: "support@apex-meridian.com" },
        { title: "Director of Implementation", email: "implementation@apex-meridian.com" }
      ]
    },
    {
      name: "Human Resources",
      email: "hr@apex-meridian.com",
      positions: [
        { title: "VP of Human Resources", email: "vp-hr@apex-meridian.com" },
        { title: "Director of Talent Acquisition", email: "recruiting@apex-meridian.com" },
        { title: "Director of People Operations", email: "people-ops@apex-meridian.com" }
      ]
    },
    {
      name: "Finance & Operations",
      email: "finance@apex-meridian.com",
      positions: [
        { title: "VP of Finance", email: "vp-finance@apex-meridian.com" },
        { title: "Director of Financial Planning", email: "fp-a@apex-meridian.com" },
        { title: "Director of Operations", email: "operations@apex-meridian.com" }
      ]
    },
    {
      name: "Legal & Compliance",
      email: "legal@apex-meridian.com",
      positions: [
        { title: "General Counsel", email: "general-counsel@apex-meridian.com" },
        { title: "Director of Compliance", email: "compliance@apex-meridian.com" },
        { title: "Director of Data Privacy", email: "privacy@apex-meridian.com" }
      ]
    },
    {
      name: "Research & Innovation",
      email: "research@apex-meridian.com",
      positions: [
        { title: "VP of Research", email: "vp-research@apex-meridian.com" },
        { title: "Director of AGI Research", email: "agi-research@apex-meridian.com" },
        { title: "Director of Applied AI", email: "applied-ai@apex-meridian.com" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="Organization Chart - Company Structure"
        description="Explore Apex Meridian's organizational structure with department hierarchies and contact information for each team."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Organization <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Chart</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our organizational structure reflects our commitment to innovation, collaboration, and excellence across all departments.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      <section className="py-12 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-400/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-cyan-500/20 w-16 h-16 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Executive Leadership</h2>
              <a href={`mailto:${departments[0].email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {departments[0].email}
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {departments[0].positions.map((position, index) => (
                <div key={index} className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 text-center">
                  <div className="bg-cyan-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2">{position.title}</h4>
                  <a href={`mailto:${position.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs inline-flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Departments */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.slice(1).map((dept, deptIndex) => (
              <div key={deptIndex} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">{dept.name}</h3>
                    <div className="bg-cyan-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-cyan-400" />
                    </div>
                  </div>
                  <a href={`mailto:${dept.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2" />
                    {dept.email}
                  </a>
                </div>

                <div className="space-y-3">
                  {dept.positions.map((position, posIndex) => (
                    <div key={posIndex} className="bg-blue-950/50 rounded-lg p-4 border border-cyan-500/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium text-sm mb-1">{position.title}</h4>
                          <a href={`mailto:${position.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs inline-flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {position.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-xl text-gray-300 mb-8">
            We're always looking for talented individuals to join our mission of transforming industries through AI.
          </p>
          <Link href="/careers">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              View Open Positions
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
