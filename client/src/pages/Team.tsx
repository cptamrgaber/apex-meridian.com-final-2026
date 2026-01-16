import { Users, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Team() {
  const leadership = [
    {
      role: "Chief Executive Officer (CEO)",
      qualifications: "PhD in Artificial Intelligence, 15+ years in machine learning and enterprise AI solutions",
      email: "ceo@apex-meridian.com"
    },
    {
      role: "Chief Technology Officer (CTO)",
      qualifications: "MS in Computer Science, 12+ years specializing in autonomous systems and neural architectures",
      email: "cto@apex-meridian.com"
    },
    {
      role: "Chief Science Officer (CSO)",
      qualifications: "PhD in Cognitive Science, pioneering research in AGI and human-AI collaboration",
      email: "cso@apex-meridian.com"
    },
    {
      role: "Chief Operating Officer (COO)",
      qualifications: "MBA, 10+ years experience scaling AI infrastructure globally",
      email: "coo@apex-meridian.com"
    },
    {
      role: "Chief Financial Officer (CFO)",
      qualifications: "CPA, MBA in Finance, 15+ years in corporate finance and strategic planning",
      email: "cfo@apex-meridian.com"
    },
    {
      role: "VP of Engineering",
      qualifications: "MS in Software Engineering, 10+ years leading engineering teams",
      email: "engineering@apex-meridian.com"
    },
    {
      role: "VP of Research & Development",
      qualifications: "PhD in Machine Learning, 8+ years in AI research and development",
      email: "research@apex-meridian.com"
    },
    {
      role: "VP of Sales",
      qualifications: "MBA, 12+ years in enterprise software sales and business development",
      email: "sales@apex-meridian.com"
    }
  ];

  const departments = [
    {
      name: "Engineering",
      count: 45,
      description: "Building cutting-edge AI systems and scalable infrastructure",
      email: "engineering@apex-meridian.com"
    },
    {
      name: "Research & Development",
      count: 28,
      description: "Advancing the frontiers of artificial general intelligence",
      email: "research@apex-meridian.com"
    },
    {
      name: "Sales & Business Development",
      count: 22,
      description: "Expanding our reach across aviation, cybersecurity, and education sectors",
      email: "sales@apex-meridian.com"
    },
    {
      name: "Marketing & Communications",
      count: 14,
      description: "Building brand awareness and thought leadership in AI",
      email: "marketing@apex-meridian.com"
    },
    {
      name: "Operations & Project Management",
      count: 18,
      description: "Ensuring seamless delivery and support for our global clients",
      email: "operations@apex-meridian.com"
    },
    {
      name: "Human Resources",
      count: 8,
      description: "Attracting and developing world-class talent",
      email: "hr@apex-meridian.com"
    },
    {
      name: "Finance & Accounting",
      count: 10,
      description: "Managing financial operations and strategic planning",
      email: "finance@apex-meridian.com"
    },
    {
      name: "Legal & Compliance",
      count: 6,
      description: "Ensuring regulatory compliance and protecting intellectual property",
      email: "legal@apex-meridian.com"
    },
    {
      name: "Security & Safety",
      count: 12,
      description: "Protecting systems, data, and ensuring operational safety",
      email: "security@apex-meridian.com"
    },
    {
      name: "Quality Assurance",
      count: 15,
      description: "Maintaining highest standards in AI system quality and reliability",
      email: "quality@apex-meridian.com"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Our Team
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet the leadership and departments behind A p e x - M e r i d i a n ®'s groundbreaking AI solutions. 
                Our diverse team of experts brings together decades of experience in artificial intelligence, 
                aerospace engineering, cybersecurity, and cognitive science.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadership.map((leader, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{leader.role}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{leader.qualifications}</p>
                      </div>
                      <a 
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        {leader.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {dept.count}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{dept.description}</p>
                    <a 
                      href={`mailto:${dept.email}`}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {dept.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for exceptional talent to help us push the boundaries of artificial intelligence.
            </p>
            <a
              href="/careers"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              View Open Positions
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
