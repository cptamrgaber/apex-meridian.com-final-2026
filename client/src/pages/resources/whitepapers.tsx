import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Calendar, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Whitepapers() {
  const whitepapers = [
    {
      title: "Hybrid Neuro-Symbolic Architecture for Explainable AI in Financial Services",
      abstract: "This whitepaper presents a novel hybrid architecture combining deep neural networks with symbolic reasoning systems to achieve both high accuracy and full explainability in financial AI applications. We demonstrate how this approach addresses regulatory requirements while maintaining competitive performance.",
      authors: ["Director of Financial AI", "Chief Science Officer", "VP of Aviation Solutions"],
      date: "December 2025",
      pages: 42,
      category: "Financial Technology",
      keyFindings: [
        "94% fraud detection accuracy with full explainability",
        "87% reduction in false positives compared to pure neural approaches",
        "Compliance with Egyptian Central Bank explainability mandates",
        "Real-time inference latency under 50ms"
      ],
      sections: [
        "Introduction to Explainable AI Challenges",
        "Hybrid Architecture Design",
        "Implementation in Production Banking Systems",
        "Performance Benchmarks and Comparisons",
        "Regulatory Compliance Framework",
        "Future Research Directions"
      ],
      downloadSize: "3.2 MB"
    },
    {
      title: "Predictive Maintenance in Aviation: A Machine Learning Approach",
      abstract: "Comprehensive analysis of machine learning techniques for aircraft predictive maintenance, including sensor data processing, failure prediction models, and operational integration strategies. Based on 18 months of deployment data from major Middle Eastern carriers.",
      authors: ["VP of Aviation Solutions", "Senior Research Scientist", "Aviation Safety Consultant"],
      date: "November 2025",
      pages: 56,
      category: "Aviation Technology",
      keyFindings: [
        "67% reduction in unscheduled maintenance events",
        "30-45 day advance warning for component failures",
        "$12.4M annual cost savings per fleet",
        "98.7% prediction accuracy for critical systems"
      ],
      sections: [
        "Aviation Maintenance Challenges",
        "Sensor Data Architecture and Processing",
        "Machine Learning Model Development",
        "Real-World Deployment Case Studies",
        "Cost-Benefit Analysis",
        "Integration with Existing MRO Systems",
        "Safety and Certification Considerations"
      ],
      downloadSize: "4.8 MB"
    },
    {
      title: "Transfer Learning and Meta-Learning for AGI Development",
      abstract: "This technical paper explores advanced transfer learning and meta-learning techniques as pathways toward Artificial General Intelligence. We present our research on cross-domain knowledge transfer, few-shot learning, and adaptive reasoning systems.",
      authors: ["Chief Science Officer", "Senior AGI Researcher", "Director of Financial AI"],
      date: "October 2025",
      pages: 68,
      category: "AGI Research",
      keyFindings: [
        "34% improvement in cross-domain task adaptation",
        "Novel meta-learning architecture with 5-shot learning capability",
        "Demonstrated knowledge transfer across 12 distinct domains",
        "Reduced training data requirements by 73%"
      ],
      sections: [
        "The Path to Artificial General Intelligence",
        "Transfer Learning Foundations",
        "Meta-Learning Architectures",
        "Cross-Domain Knowledge Representation",
        "Experimental Results and Benchmarks",
        "Ethical Considerations in AGI Development",
        "Research Roadmap and Future Work"
      ],
      downloadSize: "5.1 MB"
    },
    {
      title: "Real-Time Behavioral Analytics for Fraud Detection at Scale",
      abstract: "Detailed examination of real-time behavioral analytics systems for fraud detection in high-volume transaction environments. Covers architecture design, machine learning models, and operational considerations for processing millions of transactions daily.",
      authors: ["Director of Financial AI", "Senior ML Engineer", "Fraud Detection Specialist"],
      date: "September 2025",
      pages: 51,
      category: "Cybersecurity",
      keyFindings: [
        "Processing 2.5M+ transactions daily with <50ms latency",
        "94% fraud detection accuracy",
        "87% reduction in false positives",
        "$8.7M prevented fraud losses in first year"
      ],
      sections: [
        "Evolution of Fraud Detection Systems",
        "Behavioral Analytics Framework",
        "Real-Time Processing Architecture",
        "Machine Learning Model Pipeline",
        "Feature Engineering for Fraud Detection",
        "Deployment and Scaling Strategies",
        "Performance Optimization Techniques",
        "Case Study: National Bank of Egypt"
      ],
      downloadSize: "3.9 MB"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Whitepapers - Technical Research and Analysis"
        description="In-depth technical whitepapers on AI technologies, machine learning architectures, and real-world implementations across aviation, finance, and AGI research."
      />
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Whitepapers</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              In-depth technical research papers exploring AI architectures, methodologies, and real-world implementations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {whitepapers.map((paper, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-cyan-500/20 p-3 rounded-xl flex-shrink-0">
                        <FileText className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                          {paper.category}
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
                      {paper.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{paper.date}</span>
                      </div>
                      <span>•</span>
                      <span>{paper.pages} pages</span>
                      <span>•</span>
                      <span>{paper.downloadSize}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Users className="h-4 w-4" />
                      <span>{paper.authors.join(", ")}</span>
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="bg-blue-950/50 rounded-xl p-4 mb-4">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">Abstract</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{paper.abstract}</p>
                  </div>

                  {/* Key Findings */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 mb-4 border border-cyan-500/20">
                    <h3 className="text-sm font-bold text-cyan-400 mb-3">Key Findings</h3>
                    <ul className="space-y-2">
                      {paper.keyFindings.map((finding, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sections */}
                  <div className="bg-blue-950/50 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-bold text-cyan-400 mb-3">Contents</h3>
                    <ul className="space-y-1">
                      {paper.sections.map((section, i) => (
                        <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                          <span className="text-cyan-400">{i + 1}.</span>
                          <span>{section}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Button */}
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Download className="mr-2 h-4 w-4" />
                    Download Whitepaper (PDF)
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Request Custom Research</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Need specialized research or technical analysis for your organization? Our research team can develop custom whitepapers tailored to your needs.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-6">
              Contact Research Team
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
