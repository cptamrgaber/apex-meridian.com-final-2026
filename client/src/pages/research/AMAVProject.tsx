import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plane, Brain, Shield, Users, Database, Zap, ArrowRight, ExternalLink, FileText, Github } from "lucide-react";
import { Link } from "wouter";

export default function AMAVProject() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="AM-AV OCC System Research Project | Apex Meridian Research"
        description="Research project exploring AI-driven compliance, intelligent crew scheduling, and Operations Manual automation for aviation safety"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/research">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Research
            </button>
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <Plane className="h-16 w-16 text-cyan-400" />
            <Brain className="h-16 w-16 text-blue-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AM-AV OCC System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Research Project</span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-3xl mb-8">
            Advancing aviation safety through AI-driven compliance, intelligent crew scheduling, and automated Operations Manual enforcement
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">Aviation AI</span>
            <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">Compliance Engine</span>
            <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">NLP</span>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">Operations Research</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/research/collaboration">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all inline-flex items-center justify-center">
                Join Research Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-blue-950/50 text-white rounded-lg font-bold hover:bg-blue-900/50 transition-all border border-cyan-500/20 inline-flex items-center justify-center">
                Request Documentation
                <FileText className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Research Overview</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Project Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                The AM-AV OCC System research project aims to revolutionize aviation operations management through artificial intelligence, 
                focusing on zero-tolerance enforcement of safety regulations while optimizing crew satisfaction and operational efficiency. 
                Our research explores the intersection of natural language processing, operations research, and aviation domain expertise to 
                create systems that enhance safety without compromising operational flexibility.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Key Objectives</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Develop AI-driven compliance engines that parse and enforce aviation regulations from Operations Manuals</span>
                </li>
                <li className="flex items-start">
                  <Brain className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Create intelligent scheduling algorithms that balance regulatory requirements with crew preferences</span>
                </li>
                <li className="flex items-start">
                  <Database className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Build multi-tenant architectures supporting operator-specific rule sets and customizations</span>
                </li>
                <li className="flex items-start">
                  <Zap className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Advance real-time operations monitoring with predictive analytics and anomaly detection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Research Areas</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-cyan-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Compliance Engine</h3>
              <p className="text-gray-300 mb-6">
                Research into natural language processing techniques for parsing aviation regulatory text, extracting rules and constraints, 
                and converting them into executable validation logic. Focus on handling ambiguous language, context-dependent rules, and 
                hierarchical regulation structures.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-cyan-400 font-semibold">Key Topics:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Transformer-based NLP for regulatory text</li>
                  <li>• Rule extraction and codification</li>
                  <li>• Zero-tolerance enforcement mechanisms</li>
                  <li>• Audit trail generation</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Intelligent Scheduling</h3>
              <p className="text-gray-300 mb-6">
                Investigation of optimization algorithms for crew rostering that balance multiple objectives: regulatory compliance, 
                operational requirements, crew preferences, and fairness constraints. Exploration of reinforcement learning for 
                adaptive scheduling strategies.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-blue-400 font-semibold">Key Topics:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Multi-objective optimization</li>
                  <li>• Preference-based scheduling</li>
                  <li>• Reinforcement learning for rostering</li>
                  <li>• Fairness and equity metrics</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <div className="bg-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Operations Manual Integration</h3>
              <p className="text-gray-300 mb-6">
                Development of automated systems for ingesting, parsing, and enforcing ICAO Operations Manuals (OM-A through OM-G). 
                Research into version control, change tracking, and impact analysis when regulations are updated.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-purple-400 font-semibold">Key Topics:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Document parsing and OCR</li>
                  <li>• Regulatory knowledge graphs</li>
                  <li>• Version control and change management</li>
                  <li>• Operator-specific customization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Technical Architecture</h2>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">System Components</h3>
                <div className="space-y-6">
                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-cyan-400 font-semibold mb-2">NLP Module</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Transformer-based language models (BERT, GPT) fine-tuned on aviation regulatory corpus
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: PyTorch, Hugging Face Transformers, spaCy</p>
                  </div>

                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-blue-400 font-semibold mb-2">Rule Engine</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Graph-based rule representation with priority ordering and conflict resolution
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: Neo4j, Drools, Custom DSL</p>
                  </div>

                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-purple-400 font-semibold mb-2">Scheduling Engine</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Constraint satisfaction and optimization algorithms for crew rostering
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: OR-Tools, Gurobi, Custom Heuristics</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Research Infrastructure</h3>
                <div className="space-y-6">
                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-green-400 font-semibold mb-2">Data Pipeline</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Automated ingestion of Operations Manuals, flight schedules, and crew data
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: Apache Airflow, Kafka, PostgreSQL</p>
                  </div>

                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-yellow-400 font-semibold mb-2">Evaluation Framework</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Metrics for compliance accuracy, scheduling quality, and operational efficiency
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: MLflow, Weights & Biases, Custom Dashboards</p>
                  </div>

                  <div className="bg-blue-950/50 rounded-lg p-6 border border-cyan-500/10">
                    <h4 className="text-red-400 font-semibold mb-2">Deployment Platform</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Cloud-native architecture with multi-tenant isolation and scalability
                    </p>
                    <p className="text-gray-400 text-xs">Technologies: Kubernetes, Docker, AWS/Azure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Collaboration Opportunities</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">For Researchers</h3>
              <p className="text-gray-300 mb-6">
                We welcome collaboration with academic researchers in AI, operations research, and aviation safety. Opportunities include:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Joint publications in top-tier conferences and journals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Access to real-world aviation operations data (anonymized)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Funding for PhD students and postdoctoral researchers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Internship programs and industry placements</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">For Industry Partners</h3>
              <p className="text-gray-300 mb-6">
                Airlines, aviation authorities, and technology companies can participate through:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Pilot deployments and field trials of AM-AV OCC System</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Data sharing agreements for research purposes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Co-development of operator-specific features</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Early access to research findings and prototypes</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/research/collaboration">
              <button className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center">
                Submit Collaboration Proposal
                <ExternalLink className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications & Resources */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Publications & Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <FileText className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Technical Documentation</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Comprehensive system architecture, API references, and implementation guides
              </p>
              <Link href="/contact">
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center">
                  Request Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <Github className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Open Source Components</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Selected modules and tools released under permissive licenses for community use
              </p>
              <Link href="/contact">
                <button className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center">
                  View Repositories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Research Papers</h3>
              <p className="text-gray-300 mb-6 text-sm">
                Peer-reviewed publications on AI compliance, scheduling algorithms, and aviation safety
              </p>
              <Link href="/research/publications">
                <button className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center">
                  Browse Publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
