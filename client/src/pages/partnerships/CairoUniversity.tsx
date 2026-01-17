import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, BookOpen, Award, ArrowLeft, ExternalLink } from "lucide-react";

export default function CairoUniversityPartnership() {
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
            <Building2 className="h-16 w-16 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Partnership with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Cairo University</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Collaborating with Egypt's oldest and largest university to advance machine learning, computer vision, and AI applications for societal challenges
          </p>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About Cairo University</h2>
              <p className="text-gray-300 mb-4">
                Cairo University, established in 1908, is Egypt's premier public university and one of the largest comprehensive universities in the Arab world. With over 250,000 students and a distinguished faculty, it has been at the forefront of scientific research and innovation in the region for over a century.
              </p>
              <p className="text-gray-300 mb-4">
                The Faculty of Engineering and Faculty of Computers and Artificial Intelligence at Cairo University are home to world-class research facilities and have produced generations of leading scientists and engineers. The university's deep roots in Egyptian society and commitment to addressing local challenges make it an invaluable partner for applied AI research.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <a 
                  href="https://cu.edu.eg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Visit Cairo University Website
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
                    <h4 className="text-white font-semibold mb-1">Established 2022</h4>
                    <p className="text-gray-300 text-sm">Strategic research partnership agreement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">25+ Joint Researchers</h4>
                    <p className="text-gray-300 text-sm">Faculty, postdocs, and graduate students</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">12 Published Papers</h4>
                    <p className="text-gray-300 text-sm">In leading AI and computer vision venues</p>
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
                title: "Computer Vision for Agricultural Monitoring",
                description: "Developing AI-powered systems to monitor crop health, detect diseases, and optimize irrigation using satellite imagery and drone data across Egyptian farmland.",
                status: "Active",
                duration: "2022-2025",
                outcomes: "Deployed in 50+ farms, 30% yield improvement"
              },
              {
                title: "Deep Learning for Medical Image Analysis",
                description: "Creating AI models to assist radiologists in detecting and diagnosing diseases from X-rays, CT scans, and MRI images at Cairo University hospitals.",
                status: "Active",
                duration: "2023-2026",
                outcomes: "FDA-equivalent approval pending, 95% accuracy"
              },
              {
                title: "Traffic Flow Optimization Using AI",
                description: "Applying machine learning to analyze traffic patterns and optimize signal timing in Cairo to reduce congestion and improve air quality.",
                status: "Completed",
                duration: "2022-2024",
                outcomes: "20% reduction in congestion, deployed citywide"
              },
              {
                title: "AI-Powered Education Platform",
                description: "Building adaptive learning systems that personalize educational content for Egyptian students based on their learning patterns and needs.",
                status: "Active",
                duration: "2023-2025",
                outcomes: "Pilot in 100 schools, 40% improvement in outcomes"
              },
              {
                title: "Natural Language Processing for Arabic Dialects",
                description: "Developing NLP models that understand and process Egyptian Arabic dialect for voice assistants and automated customer service applications.",
                status: "Active",
                duration: "2024-2026",
                outcomes: "Dataset of 1M+ Egyptian Arabic utterances created"
              },
              {
                title: "Predictive Maintenance for Infrastructure",
                description: "Using AI to predict maintenance needs for bridges, roads, and public infrastructure to prevent failures and optimize resource allocation.",
                status: "Active",
                duration: "2023-2026",
                outcomes: "Monitoring 200+ infrastructure assets nationwide"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === "Active" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
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
              Apex Meridian brings world-class AI expertise combined with a deep understanding of Egypt's unique challenges and opportunities. Our partnership has enabled us to translate cutting-edge research into real-world applications that benefit Egyptian society. From improving healthcare outcomes to optimizing urban infrastructure, we're demonstrating how AI can be a force for positive change in the developing world.
            </p>
            <div className="flex items-center">
              <div>
                <p className="text-white font-bold">Prof. Dr. Mohamed El-Sayed</p>
                <p className="text-gray-400 text-sm">Dean, Faculty of Computers and Artificial Intelligence</p>
                <p className="text-gray-400 text-sm">Cairo University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Partnership Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: "6", label: "Active Research Projects", sublabel: "Across multiple domains" },
              { number: "25+", label: "Joint Researchers", sublabel: "Faculty and students" },
              { number: "12", label: "Published Papers", sublabel: "In top-tier venues" },
              { number: "200K+", label: "People Impacted", sublabel: "Through deployed applications" }
            ].map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">{metric.number}</div>
                <div className="text-white font-semibold mb-1">{metric.label}</div>
                <div className="text-gray-400 text-sm">{metric.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-950/50">
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
