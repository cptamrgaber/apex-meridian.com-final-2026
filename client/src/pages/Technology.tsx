import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, Database, Cpu, Network, Shield, Zap } from "lucide-react";

export default function Technology() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-cyan-900/50" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <img 
                src="/images/ai-logo.png" 
                alt="AI Technology" 
                className="w-24 h-24 mx-auto mb-6 opacity-90"
              />
              <h1 className="text-5xl font-bold text-white mb-6">
                The Meridian Engine
              </h1>
              <p className="text-xl text-gray-300">
                Our proprietary AI platform powering the next generation of intelligent solutions
              </p>
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Platform Architecture</h2>
              <div className="bg-slate-900/50 rounded-lg p-8 border border-cyan-500/30">
                <img 
                  src="/images/meridian-engine-architecture.jpg" 
                  alt="Meridian Engine Architecture" 
                  className="w-full rounded-lg mb-6"
                />
                <p className="text-gray-300 mb-4">
                  The Meridian Engine is a comprehensive AI platform built on cutting-edge technologies 
                  and designed for enterprise-scale deployment. It combines neural-symbolic reasoning, 
                  distributed computing, and advanced security protocols to deliver unparalleled performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Brain,
                  title: "Neural-Symbolic AI",
                  description: "Hybrid architecture combining deep learning with symbolic reasoning for explainable AI decisions"
                },
                {
                  icon: Database,
                  title: "Distributed Data Processing",
                  description: "Scalable data pipeline handling petabytes of information across global data centers"
                },
                {
                  icon: Cpu,
                  title: "Edge Computing",
                  description: "Real-time inference at the edge for low-latency applications and offline capabilities"
                },
                {
                  icon: Network,
                  title: "Federated Learning",
                  description: "Privacy-preserving machine learning across distributed datasets without data centralization"
                },
                {
                  icon: Shield,
                  title: "Quantum-Resistant Security",
                  description: "Post-quantum cryptography ensuring long-term data protection against future threats"
                },
                {
                  icon: Zap,
                  title: "AutoML & Optimization",
                  description: "Automated model selection, hyperparameter tuning, and continuous performance optimization"
                }
              ].map((tech, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all"
                >
                  <tech.icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{tech.title}</h3>
                  <p className="text-gray-400">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Technology Stack</h2>
              
              <div className="space-y-6">
                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Machine Learning Frameworks</h3>
                  <p className="text-gray-300">
                    PyTorch, TensorFlow, JAX, Scikit-learn, XGBoost, LightGBM
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Infrastructure</h3>
                  <p className="text-gray-300">
                    Kubernetes, Docker, Apache Spark, Apache Kafka, Redis, PostgreSQL, MongoDB
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Cloud Platforms</h3>
                  <p className="text-gray-300">
                    AWS, Google Cloud Platform, Microsoft Azure, Multi-cloud deployment
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Security & Compliance</h3>
                  <p className="text-gray-300">
                    ISO 27001, SOC 2 Type II, GDPR, HIPAA, End-to-end encryption, Zero-trust architecture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Performance Metrics</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: "< 50ms", label: "Average Inference Time" },
                { value: "99.99%", label: "System Uptime" },
                { value: "10M+", label: "Requests per Second" },
                { value: "256-bit", label: "Encryption Standard" }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                  <div className="text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Experience the Meridian Engine?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to learn how our technology can transform your business
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
