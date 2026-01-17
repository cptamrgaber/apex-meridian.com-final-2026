import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Users, BookOpen, Award, ArrowLeft, ExternalLink } from "lucide-react";

export default function AUCPartnership() {
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
            Partnership with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">American University in Cairo</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Collaborating with Egypt's premier international research university to advance artificial general intelligence, neural-symbolic systems, and ethical AI frameworks
          </p>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About AUC</h2>
              <p className="text-gray-300 mb-4">
                The American University in Cairo (AUC) is Egypt's leading English-language university and a center of intellectual, social, and cultural life in the Arab world. Founded in 1919, AUC has established itself as a premier institution for research and innovation in the Middle East and North Africa region.
              </p>
              <p className="text-gray-300 mb-4">
                AUC's School of Sciences and Engineering houses cutting-edge research facilities and attracts top faculty and students from around the world. The university's commitment to interdisciplinary research and innovation makes it an ideal partner for advancing AGI research.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <a 
                  href="https://www.aucegypt.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Visit AUC Website
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
                    <h4 className="text-white font-semibold mb-1">Established 2023</h4>
                    <p className="text-gray-300 text-sm">Multi-year research collaboration agreement</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">15+ Joint Researchers</h4>
                    <p className="text-gray-300 text-sm">Faculty and PhD students from both institutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">8 Published Papers</h4>
                    <p className="text-gray-300 text-sm">In top-tier AI conferences and journals</p>
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
                title: "Neural-Symbolic Reasoning for Arabic NLP",
                description: "Developing hybrid AI systems that combine deep learning with symbolic reasoning to improve natural language understanding for Arabic text and speech.",
                status: "Active",
                duration: "2023-2025",
                outcomes: "3 papers published, 1 patent filed"
              },
              {
                title: "Explainable AI for Medical Diagnosis",
                description: "Creating interpretable AI models for medical image analysis and diagnosis that can explain their decision-making process to healthcare professionals.",
                status: "Active",
                duration: "2024-2026",
                outcomes: "Clinical trials ongoing at AUC Medical Center"
              },
              {
                title: "Cognitive Architecture for Multi-Agent Systems",
                description: "Designing computational models of human cognition to enable multiple AI agents to collaborate and coordinate effectively in complex environments.",
                status: "Completed",
                duration: "2023-2024",
                outcomes: "2 papers at NeurIPS 2024, open-source framework released"
              },
              {
                title: "AI Ethics and Value Alignment",
                description: "Researching methods to ensure AI systems align with human values and cultural norms, with focus on Middle Eastern and North African contexts.",
                status: "Active",
                duration: "2023-2026",
                outcomes: "Ethics framework adopted by 5 Egyptian institutions"
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
              Our collaboration with Apex Meridian has been transformative for our AI research program. Their expertise in neural-symbolic systems and commitment to ethical AI development aligns perfectly with AUC's mission to advance knowledge while serving society. Together, we're pushing the boundaries of what's possible in artificial intelligence while ensuring these technologies benefit the people of Egypt and the broader region.
            </p>
            <div className="flex items-center">
              <div>
                <p className="text-white font-bold">Dr. Ahmed Hassan</p>
                <p className="text-gray-400 text-sm">Director, AI Research Lab</p>
                <p className="text-gray-400 text-sm">School of Sciences and Engineering, AUC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Directions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Future Research Directions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Multilingual AGI Systems",
                description: "Developing AGI systems that can seamlessly operate across Arabic, English, and other languages with true understanding of cultural context"
              },
              {
                title: "AI for Social Good",
                description: "Applying AI to address regional challenges in healthcare, education, and sustainable development"
              },
              {
                title: "Quantum-Enhanced AI",
                description: "Exploring quantum computing approaches to accelerate AI training and enable new classes of algorithms"
              }
            ].map((direction, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-3">{direction.title}</h3>
                <p className="text-gray-300 text-sm">{direction.description}</p>
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
