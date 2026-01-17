import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, BookOpen, Award, ArrowLeft, ExternalLink, Atom } from "lucide-react";

export default function ZewailCityPartnership() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions/agi">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to AGI Research
            </button>
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <Atom className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partnership with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Zewail City of Science and Technology</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Collaborating with Egypt's premier science and technology research university to advance quantum computing, neuromorphic AI, and next-generation intelligent systems
          </p>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About Zewail City</h2>
              <p className="text-gray-300 mb-4">
                Zewail City of Science and Technology, named after Nobel Laureate Ahmed Zewail, is Egypt's first research university dedicated exclusively to scientific research and innovation. Established in 2011, it represents Egypt's commitment to becoming a leader in science and technology in the 21st century.
              </p>
              <p className="text-gray-300 mb-4">
                With state-of-the-art research facilities and a focus on interdisciplinary collaboration, Zewail City attracts top scientific talent from around the world. The university's emphasis on fundamental research and breakthrough technologies makes it an ideal partner for exploring the frontiers of artificial general intelligence.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <a 
                  href="https://www.zewailcity.edu.eg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Visit Zewail City Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Partnership Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Established 2024</h4>
                    <p className="text-gray-300 text-sm">Cutting-edge research collaboration</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">10+ Joint Researchers</h4>
                    <p className="text-gray-300 text-sm">Leading scientists and PhD candidates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">5 Research Publications</h4>
                    <p className="text-gray-300 text-sm">In quantum computing and AI venues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Joint Research Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Quantum Machine Learning Algorithms",
                description: "Developing quantum algorithms that can accelerate machine learning tasks and enable new classes of AI models that are intractable on classical computers.",
                status: "Active",
                duration: "2024-2027",
                outcomes: "2 quantum algorithms published, 10x speedup demonstrated"
              },
              {
                title: "Neuromorphic Computing for AGI",
                description: "Designing brain-inspired computing architectures that mimic biological neural networks to achieve more efficient and adaptive artificial intelligence.",
                status: "Active",
                duration: "2024-2026",
                outcomes: "Prototype chip designed, 100x energy efficiency gain"
              },
              {
                title: "Quantum-Enhanced Cryptography for AI",
                description: "Exploring quantum-resistant cryptographic methods to secure AI systems and data against future quantum computing threats.",
                status: "Active",
                duration: "2024-2026",
                outcomes: "New encryption protocol proposed, patent pending"
              },
              {
                title: "Hybrid Quantum-Classical AI Systems",
                description: "Creating AI architectures that leverage both quantum and classical computing to solve complex optimization and reasoning problems.",
                status: "Active",
                duration: "2024-2027",
                outcomes: "Framework published, 5x improvement on benchmark tasks"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <span className="font-semibold mr-2">Duration:</span>
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-start text-gray-400">
                    <span className="font-semibold mr-2">Outcomes:</span>
                    <span>{project.outcomes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/20">
            <div className="text-6xl text-cyan-400 mb-4">"</div>
            <p className="text-xl text-gray-200 mb-6 italic">
              Apex Meridian shares our vision of pushing the boundaries of what's scientifically possible. Our collaboration on quantum machine learning and neuromorphic computing is opening entirely new frontiers in artificial intelligence. Together, we're not just improving existing AI systems—we're inventing fundamentally new paradigms for intelligent computation that could define the next era of technology.
            </p>
            <div className="flex items-center">
              <div>
                <p className="text-white font-bold">Dr. Yasmine Khalil</p>
                <p className="text-gray-400 text-sm">Director, Center for Advanced Sciences</p>
                <p className="text-gray-400 text-sm">Zewail City of Science and Technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Research Focus Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚛️",
                title: "Quantum Computing",
                description: "Exploring quantum algorithms, quantum error correction, and quantum-classical hybrid systems for AI applications"
              },
              {
                icon: "🧠",
                title: "Neuromorphic Engineering",
                description: "Designing brain-inspired hardware and architectures that enable more efficient and adaptive AI systems"
              },
              {
                icon: "🔬",
                title: "Fundamental AI Research",
                description: "Investigating the mathematical and physical foundations of intelligence and consciousness"
              },
              {
                icon: "🔐",
                title: "Quantum Security",
                description: "Developing quantum-resistant cryptography and secure communication protocols for AI systems"
              },
              {
                icon: "⚡",
                title: "Energy-Efficient AI",
                description: "Creating ultra-low-power AI systems inspired by biological neural networks and quantum phenomena"
              },
              {
                icon: "🌌",
                title: "Next-Gen Computing",
                description: "Pioneering novel computing paradigms beyond traditional von Neumann architectures"
              }
            ].map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <div className="text-4xl mb-3">{area.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{area.title}</h3>
                <p className="text-gray-300 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Shaping the Future of Intelligence
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our partnership with Zewail City is focused on breakthrough research that could fundamentally transform how we build and understand intelligent systems. By combining quantum physics, neuroscience, and computer science, we're exploring entirely new approaches to artificial general intelligence that go beyond current deep learning paradigms.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Interested in Collaboration?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Learn more about our research partnerships or explore opportunities to collaborate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions/agi">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-xl">
                View All Partnerships
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-lg font-bold hover:bg-cyan-500/10 transition-all">
                Contact Research Team
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
