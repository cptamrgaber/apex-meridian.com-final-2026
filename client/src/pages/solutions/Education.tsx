import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, CheckCircle, Brain, TrendingUp, ArrowRight } from "lucide-react";

export default function Education() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-education.jpg"
            alt="Education & Cognitive Enhancement"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <img src="/images/ai-logo-white-64.png" alt="AI" className="h-16 w-auto" />
            <GraduationCap className="h-12 w-12 text-cyan-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Cognitive Enhancement</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Revolutionize learning with adaptive AI platforms that personalize education, enhance cognitive abilities, and unlock human potential
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Adaptive Learning Platform */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/education-adaptive-learning.jpg"
                  alt="Adaptive Learning"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Adaptive Learning Platform</h3>
              <p className="text-gray-300 mb-4">
                Personalized education paths that adapt in real-time to each student's learning style, pace, and knowledge gaps.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>40% improvement in learning outcomes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time difficulty adjustment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Multi-modal content delivery</span>
                </li>
              </ul>
            </div>

            {/* Teacher Analytics Dashboard */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/education-analytics.jpg"
                  alt="Teacher Analytics"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Teacher Analytics Dashboard</h3>
              <p className="text-gray-300 mb-4">
                Comprehensive insights into student performance, engagement, and learning patterns to inform teaching strategies.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time performance tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Early intervention alerts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Predictive success modeling</span>
                </li>
              </ul>
            </div>

            {/* Cognitive Enhancement Research */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <img
                  src="/images/agi-research-lab.jpg"
                  alt="Cognitive Research"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cognitive Enhancement Research</h3>
              <p className="text-gray-300 mb-4">
                Cutting-edge research into memory, attention, and problem-solving enhancement through AI-powered cognitive training.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Memory retention improvement</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Focus and attention training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Problem-solving skill development</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Transform Education with AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Improved Learning Outcomes</h3>
                <p className="text-gray-300">
                  Students achieve 40% better results with personalized learning paths that adapt to their unique needs and learning styles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <Brain className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enhanced Engagement</h3>
                <p className="text-gray-300">
                  Interactive, gamified learning experiences keep students motivated and engaged throughout their educational journey.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Data-Driven Insights</h3>
                <p className="text-gray-300">
                  Educators gain actionable insights into student performance, enabling early intervention and targeted support.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Scalable Solution</h3>
                <p className="text-gray-300">
                  From individual classrooms to entire school districts, our platform scales to serve millions of learners worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Education Sectors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "K-12 Education", desc: "Personalized learning for elementary through high school students" },
              { title: "Higher Education", desc: "Advanced learning platforms for colleges and universities" },
              { title: "Corporate Training", desc: "Employee skill development and professional certification programs" },
              { title: "Special Education", desc: "Adaptive tools for students with diverse learning needs" },
              { title: "Language Learning", desc: "AI-powered language acquisition and fluency development" },
              { title: "STEM Education", desc: "Interactive science, technology, engineering, and math instruction" }
            ].map((sector, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                <h4 className="text-lg font-bold text-white mb-2">{sector.title}</h4>
                <p className="text-gray-300 text-sm">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a demo to see how our platform can revolutionize learning in your institution
          </p>
          <Link href="/contact">
            <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
