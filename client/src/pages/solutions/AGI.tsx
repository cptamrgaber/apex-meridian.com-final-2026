import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, CheckCircle, Lightbulb, Shield, ArrowRight, ExternalLink, FileText, Calendar, Users } from "lucide-react";
import { useState } from "react";

export default function AGI() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");

  // Partnership data with regions and research areas
  const partnerships = [
    // Egyptian Institutions
    { name: "American University in Cairo (AUC)", region: "egyptian", area: "neural-symbolic", link: "/partnerships/auc" },
    { name: "Cairo University", region: "egyptian", area: "computer-vision", link: "/partnerships/cairo-university" },
    { name: "Ain Shams University", region: "egyptian", area: "nlp" },
    { name: "Alexandria University", region: "egyptian", area: "ethics" },
    { name: "Nile University", region: "egyptian", area: "machine-learning" },
    { name: "Egypt-Japan University (E-JUST)", region: "egyptian", area: "robotics" },
    { name: "Zewail City of Science", region: "egyptian", area: "quantum", link: "/partnerships/zewail-city" },
    { name: "Information Technology Industry Development Agency (ITIDA)", region: "egyptian", area: "applied-ai" },
    
    // African Institutions
    { name: "University of Cape Town", region: "african", area: "machine-learning" },
    { name: "University of the Witwatersrand", region: "african", area: "computer-vision" },
    { name: "Stellenbosch University", region: "african", area: "nlp" },
    { name: "University of Nairobi", region: "african", area: "applied-ai" },
    { name: "Makerere University", region: "african", area: "ethics" },
    { name: "University of Lagos", region: "african", area: "neural-symbolic" },
    { name: "Mohammed VI Polytechnic University", region: "african", area: "robotics" },
    { name: "African Institute for Mathematical Sciences (AIMS)", region: "african", area: "quantum" },
    
    // Middle Eastern Institutions
    { name: "King Abdullah University (KAUST)", region: "middle-eastern", area: "machine-learning" },
    { name: "Khalifa University", region: "middle-eastern", area: "computer-vision" },
    { name: "American University of Beirut", region: "middle-eastern", area: "nlp" },
    { name: "Qatar Computing Research Institute", region: "middle-eastern", area: "neural-symbolic" },
    { name: "United Arab Emirates University", region: "middle-eastern", area: "applied-ai" },
    { name: "King Saud University", region: "middle-eastern", area: "robotics" },
    
    // Global Institutions
    { name: "MIT", region: "global", area: "neural-symbolic" },
    { name: "Stanford University", region: "global", area: "machine-learning" },
    { name: "University of Oxford", region: "global", area: "ethics" },
    { name: "Carnegie Mellon University", region: "global", area: "robotics" },
    { name: "UC Berkeley", region: "global", area: "computer-vision" },
    { name: "University of Cambridge", region: "global", area: "quantum" },
    { name: "ETH Zurich", region: "global", area: "machine-learning" },
    { name: "University of Toronto", region: "global", area: "nlp" }
  ];

  const researchAreas = [
    { id: "all", label: "All Research Areas" },
    { id: "neural-symbolic", label: "Neural-Symbolic AI" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "computer-vision", label: "Computer Vision" },
    { id: "nlp", label: "Natural Language Processing" },
    { id: "robotics", label: "Robotics & Autonomous Systems" },
    { id: "quantum", label: "Quantum Computing" },
    { id: "ethics", label: "AI Ethics & Safety" },
    { id: "applied-ai", label: "Applied AI Solutions" }
  ];

  const regions = [
    { id: "all", label: "All Regions" },
    { id: "egyptian", label: "Egyptian Institutions" },
    { id: "african", label: "African Institutions" },
    { id: "middle-eastern", label: "Middle Eastern Institutions" },
    { id: "global", label: "Global Institutions" }
  ];

  // Filter partnerships based on selected region and research area
  const filteredPartnerships = partnerships.filter(p => {
    const matchesRegion = selectedRegion === "all" || p.region === selectedRegion;
    const matchesArea = selectedArea === "all" || p.area === selectedArea;
    return matchesRegion && matchesArea;
  });

  // Group filtered partnerships by region
  const groupedPartnerships = {
    egyptian: filteredPartnerships.filter(p => p.region === "egyptian"),
    african: filteredPartnerships.filter(p => p.region === "african"),
    "middle-eastern": filteredPartnerships.filter(p => p.region === "middle-eastern"),
    global: filteredPartnerships.filter(p => p.region === "global")
  };

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
            <img src="/images/ai-logo-white-64.png" alt="AI" className="h-16 w-auto" />
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

      {/* Partnerships with Filtering */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Research Partnerships</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We collaborate with leading universities, research institutions, and industry partners across Egypt, Africa, the Middle East, and globally to advance AGI research responsibly
            </p>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* Region Filter */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Filter by Region:</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 bg-blue-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Research Area Filter */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Filter by Research Area:</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="px-4 py-2 bg-blue-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  {researchAreas.map(area => (
                    <option key={area.id} value={area.id}>{area.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <p className="text-cyan-400 mt-4">
              Showing {filteredPartnerships.length} of {partnerships.length} partnerships
            </p>
          </div>
          
          {/* Egyptian Institutions */}
          {(selectedRegion === "all" || selectedRegion === "egyptian") && groupedPartnerships.egyptian.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Egyptian Research Institutions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {groupedPartnerships.egyptian.map((partner, index) => (
                  partner.link ? (
                    <Link key={index} href={partner.link}>
                      <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                        <p className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                          {partner.name}
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                      <p className="text-white font-semibold text-sm">{partner.name}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* African Institutions */}
          {(selectedRegion === "all" || selectedRegion === "african") && groupedPartnerships.african.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">African Research Institutions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {groupedPartnerships.african.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                    <p className="text-white font-semibold text-sm">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Middle Eastern Institutions */}
          {(selectedRegion === "all" || selectedRegion === "middle-eastern") && groupedPartnerships["middle-eastern"].length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Middle Eastern Research Institutions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {groupedPartnerships["middle-eastern"].map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                    <p className="text-white font-semibold text-sm">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global Institutions */}
          {(selectedRegion === "all" || selectedRegion === "global") && groupedPartnerships.global.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Global Research Institutions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {groupedPartnerships.global.map((partner, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                    <p className="text-white font-semibold text-sm">{partner.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Partner Testimonials & Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Partnership Success Stories</h2>
          
          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              {
                quote: "Our collaboration with Apex Meridian has been transformative for our AI research program. Their expertise in neural-symbolic systems and commitment to ethical AI development aligns perfectly with AUC's mission to advance knowledge while serving society.",
                author: "Dr. Ahmed Hassan",
                role: "Director, AI Research Lab",
                institution: "American University in Cairo",
                link: "/partnerships/auc"
              },
              {
                quote: "Apex Meridian brings world-class AI expertise combined with a deep understanding of Egypt's unique challenges and opportunities. Our partnership has enabled us to translate cutting-edge research into real-world applications that benefit Egyptian society.",
                author: "Prof. Dr. Mohamed El-Sayed",
                role: "Dean, Faculty of Computers and AI",
                institution: "Cairo University",
                link: "/partnerships/cairo-university"
              },
              {
                quote: "Together, we're not just improving existing AI systems—we're inventing fundamentally new paradigms for intelligent computation that could define the next era of technology. Our work on quantum machine learning is opening entirely new frontiers.",
                author: "Dr. Yasmine Khalil",
                role: "Director, Center for Advanced Sciences",
                institution: "Zewail City of Science and Technology",
                link: "/partnerships/zewail-city"
              },
              {
                quote: "The partnership has accelerated our research in reinforcement learning and autonomous systems. The joint publications and shared resources have elevated the quality of our graduate programs and attracted top talent from across Africa.",
                author: "Prof. John Okonkwo",
                role: "Head of Computer Science",
                institution: "University of Lagos",
                link: null
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
                <div className="text-4xl text-cyan-400 mb-4">"</div>
                <p className="text-gray-200 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <p className="text-gray-400 text-sm">{testimonial.institution}</p>
                  </div>
                  {testimonial.link && (
                    <Link href={testimonial.link}>
                      <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ExternalLink className="h-5 w-5" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Case Studies */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Research Impact Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Arabic NLP Breakthrough",
                  institution: "AUC Partnership",
                  description: "Developed state-of-the-art Arabic language models achieving 95% accuracy on dialect understanding, enabling better voice assistants and automated translation for 400M+ Arabic speakers.",
                  metrics: ["95% accuracy", "400M+ users", "3 patents filed"],
                  link: "/partnerships/auc"
                },
                {
                  title: "AI-Powered Agriculture",
                  institution: "Cairo University Partnership",
                  description: "Deployed computer vision systems across 50+ Egyptian farms to monitor crop health and optimize irrigation, resulting in 30% yield improvement and 40% water savings.",
                  metrics: ["50+ farms", "30% yield ↑", "40% water saved"],
                  link: "/partnerships/cairo-university"
                },
                {
                  title: "Quantum ML Algorithm",
                  institution: "Zewail City Partnership",
                  description: "Published breakthrough quantum machine learning algorithm demonstrating 10x speedup over classical methods for optimization problems, with applications in drug discovery and materials science.",
                  metrics: ["10x speedup", "2 publications", "Patent pending"],
                  link: "/partnerships/zewail-city"
                },
                {
                  title: "Medical AI Diagnostic Tool",
                  institution: "Cairo University Partnership",
                  description: "Created AI system for analyzing medical images with 95% accuracy, now deployed in 10 Egyptian hospitals to assist radiologists in detecting diseases earlier and more accurately.",
                  metrics: ["95% accuracy", "10 hospitals", "20K+ scans"],
                  link: "/partnerships/cairo-university"
                },
                {
                  title: "Traffic Optimization System",
                  institution: "Cairo University Partnership",
                  description: "Implemented AI-powered traffic management system in Cairo that reduced congestion by 20% and improved air quality, demonstrating how AI can address urban challenges in developing cities.",
                  metrics: ["20% less traffic", "Citywide", "Better air quality"],
                  link: "/partnerships/cairo-university"
                },
                {
                  title: "Neuromorphic AI Chip",
                  institution: "Zewail City Partnership",
                  description: "Designed brain-inspired computing chip achieving 100x energy efficiency compared to traditional processors, paving the way for more sustainable and powerful AI systems.",
                  metrics: ["100x efficiency", "Prototype ready", "Patent filed"],
                  link: "/partnerships/zewail-city"
                }
              ].map((study, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all group">
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{study.title}</h4>
                  <p className="text-cyan-400 text-sm mb-3">{study.institution}</p>
                  <p className="text-gray-300 text-sm mb-4">{study.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.metrics.map((metric, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                        {metric}
                      </span>
                    ))}
                  </div>
                  {study.link && (
                    <Link href={study.link}>
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center transition-colors">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links to Research Resources */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Explore Our Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/research/publications">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <FileText className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Publications Repository</h3>
                <p className="text-gray-300 text-sm mb-4">Browse our collection of joint research papers with filters by institution, year, and research area. Includes PDFs and citation metrics.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  View Publications
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            <Link href="/research/timeline">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <Calendar className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Partnership Timeline</h3>
                <p className="text-gray-300 text-sm mb-4">Explore the evolution of our research collaborations from 2022-2025, including major milestones and breakthroughs.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  View Timeline
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            <Link href="/researchers">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <Users className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Research Team</h3>
                <p className="text-gray-300 text-sm mb-4">Meet the leading researchers driving AGI innovation across our partnerships, with detailed profiles and publications.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  View Researchers
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Link href="/research/blog">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <FileText className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Research Blog</h3>
                <p className="text-gray-300 text-sm mb-4">Read insights, stories, and updates from our research partnerships. Behind-the-scenes looks at our projects.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  Read Blog
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            <Link href="/research/collaboration">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <Users className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Collaborate With Us</h3>
                <p className="text-gray-300 text-sm mb-4">Partner with Apex Meridian on research. Submit your proposal and join our global research network.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  Submit Proposal
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
            <Link href="/research/metrics">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                <FileText className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Research Metrics</h3>
                <p className="text-gray-300 text-sm mb-4">Interactive visualizations showing publication trends, citation growth, and geographic collaboration heatmap.</p>
                <span className="text-cyan-400 text-sm font-semibold flex items-center">
                  View Dashboard
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
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
