import { Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Team() {
  const leadership = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      bio: "Former AI Research Director at Google with 15+ years in machine learning and enterprise AI solutions.",
      image: "/images/team-placeholder.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Ex-Tesla Autopilot Lead Engineer, specializing in autonomous systems and neural architectures.",
      image: "/images/team-placeholder.jpg"
    },
    {
      name: "Dr. Emily Watson",
      role: "Chief Science Officer",
      bio: "PhD in Cognitive Science from MIT, pioneering research in AGI and human-AI collaboration.",
      image: "/images/team-placeholder.jpg"
    },
    {
      name: "David Kim",
      role: "Chief Operating Officer",
      bio: "Former VP of Operations at Amazon Web Services, expert in scaling AI infrastructure globally.",
      image: "/images/team-placeholder.jpg"
    }
  ];

  const departments = [
    {
      name: "Engineering",
      count: 45,
      description: "Building cutting-edge AI systems and scalable infrastructure"
    },
    {
      name: "Research",
      count: 28,
      description: "Advancing the frontiers of artificial general intelligence"
    },
    {
      name: "Product",
      count: 18,
      description: "Designing intuitive AI solutions for complex industry challenges"
    },
    {
      name: "Operations",
      count: 22,
      description: "Ensuring seamless delivery and support for our global clients"
    },
    {
      name: "Business Development",
      count: 14,
      description: "Expanding our reach across aviation, cybersecurity, and education sectors"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Our Team
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet the brilliant minds behind A p e x - M e r i d i a n ®'s groundbreaking AI solutions. 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl font-bold text-white">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                        <p className="text-cyan-400 font-semibold mb-3">{leader.role}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{leader.bio}</p>
                      </div>
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
                    <p className="text-gray-300 text-sm">{dept.description}</p>
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
