import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, CheckCircle, Lightbulb, Shield, ArrowRight } from "lucide-react";

export default function AGI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-agi.jpg"
            alt="AGI Research"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src="/images/ai-logo-64.png" alt="AI" className="h-16 w-16" />
            <Brain className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AGI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Research</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Pioneering the future of intelligence through foundational AGI research, developing neural-symbolic systems, cognitive architectures, and ethical frameworks for safe artificial general intelligence
          </p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Neural-Symbolic AI */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Neural-Symbolic AI</h3>
              <p className="text-gray-300 mb-4">
                Combining deep learning with symbolic reasoning to create AI systems that can both learn from data and reason with knowledge.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hybrid learning-reasoning architectures</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Explainable AI decision-making</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Knowledge graph integration</span>
                </li>
              </ul>
            </div>

            {/* Cognitive Architectures */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cognitive Architectures</h3>
              <p className="text-gray-300 mb-4">
                Developing computational models that replicate human-like cognitive processes including perception, memory, reasoning, and learning.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Working memory systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Attention mechanisms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Meta-learning capabilities</span>
                </li>
              </ul>
            </div>

            {/* AI Ethics & Safety */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Ethics & Safety</h3>
              <p className="text-gray-300 mb-4">
                Ensuring AGI development follows ethical principles and safety protocols to create beneficial, aligned, and controllable AI systems.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Value alignment research</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Interpretability frameworks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Safety verification methods</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Research Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Research Approach</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Interdisciplinary Collaboration</h3>
                  <p className="text-gray-300">
                    Our research team brings together experts from neuroscience, cognitive science, computer science, philosophy, and ethics to tackle AGI from multiple perspectives.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Open Research</h3>
                  <p className="text-gray-300">
                    We publish our findings in peer-reviewed journals and collaborate with academic institutions worldwide to advance the field responsibly.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Safety First</h3>
                  <p className="text-gray-300">
                    Every research milestone includes comprehensive safety analysis and alignment verification before deployment or further development.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/agi-research-lab.jpg"
                alt="AGI Research Lab"
                className="rounded-2xl shadow-2xl border border-cyan-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Goals */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Long-Term Research Goals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "General Problem Solving", desc: "AI systems that can tackle novel problems across diverse domains without task-specific training" },
              { title: "Transfer Learning", desc: "Knowledge and skills that transfer seamlessly between different tasks and contexts" },
              { title: "Common Sense Reasoning", desc: "Understanding of physical, social, and causal relationships that humans take for granted" },
              { title: "Natural Language Understanding", desc: "True comprehension of language meaning, context, and intent beyond pattern matching" },
              { title: "Autonomous Learning", desc: "Self-directed learning systems that can identify knowledge gaps and seek information independently" },
              { title: "Human-AI Collaboration", desc: "Seamless partnership between humans and AI systems that amplifies human capabilities" }
            ].map((goal, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h4 className="text-lg font-bold text-white mb-2">{goal.title}</h4>
                <p className="text-gray-300 text-sm">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Research Partnerships</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            We collaborate with leading universities, research institutions, and industry partners to advance AGI research responsibly
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["MIT", "Stanford", "Oxford", "Carnegie Mellon", "Berkeley", "Cambridge", "ETH Zurich", "Toronto"].map((partner, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <p className="text-white font-bold">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Research Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Collaborate with us on groundbreaking AGI research or explore career opportunities
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
              Contact Research Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
