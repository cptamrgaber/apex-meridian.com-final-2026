import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Cloud, Database, Shield, Zap, Globe, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function Partners() {
  const partnerCategories = [
    {
      category: "Technology Partners",
      icon: Cloud,
      description: "Leading technology providers powering our AI infrastructure",
      partners: [
        {
          name: "NVIDIA",
          description: "GPU computing and AI acceleration infrastructure. Our partnership provides access to cutting-edge A100 and H100 GPU clusters for training large-scale AI models.",
          type: "Hardware & Infrastructure",
          benefits: ["High-performance GPU clusters", "CUDA optimization support", "Early access to new architectures"]
        },
        {
          name: "Microsoft Azure",
          description: "Cloud infrastructure and AI services platform. Azure provides scalable compute resources, managed AI services, and global deployment capabilities.",
          type: "Cloud Platform",
          benefits: ["Global cloud infrastructure", "Azure AI services integration", "Enterprise security compliance"]
        },
        {
          name: "Amazon Web Services (AWS)",
          description: "Cloud computing and machine learning services. AWS SageMaker and EC2 instances power our development and production environments.",
          type: "Cloud Platform",
          benefits: ["Scalable ML infrastructure", "SageMaker integration", "Global edge computing"]
        }
      ]
    },
    {
      category: "Data & Analytics Partners",
      icon: Database,
      description: "Data infrastructure and analytics platforms",
      partners: [
        {
          name: "Databricks",
          description: "Unified data analytics platform. Databricks enables large-scale data processing, feature engineering, and collaborative ML development.",
          type: "Data Platform",
          benefits: ["Unified data lakehouse", "MLflow integration", "Collaborative notebooks"]
        },
        {
          name: "Snowflake",
          description: "Cloud data warehouse and analytics. Snowflake provides secure, scalable data storage and processing for our enterprise clients.",
          type: "Data Warehouse",
          benefits: ["Scalable data storage", "Real-time analytics", "Data sharing capabilities"]
        }
      ]
    },
    {
      category: "Industry Partners",
      icon: Building2,
      description: "Strategic alliances with industry leaders",
      partners: [
        {
          name: "EgyptAir",
          description: "National flag carrier of Egypt. Long-term partnership deploying predictive maintenance AI across their fleet, resulting in 67% reduction in unscheduled maintenance.",
          type: "Aviation",
          benefits: ["Fleet-wide AI deployment", "Joint research initiatives", "Industry best practices sharing"]
        },
        {
          name: "National Bank of Egypt",
          description: "Egypt's largest bank. Strategic partnership implementing AI-powered fraud detection and customer analytics across all banking operations.",
          type: "Financial Services",
          benefits: ["Enterprise AI deployment", "Regulatory compliance collaboration", "Financial AI research"]
        },
        {
          name: "Vodafone Egypt",
          description: "Leading telecommunications provider. Partnership focused on customer churn prediction, network optimization, and AI-driven customer service.",
          type: "Telecommunications",
          benefits: ["Telecom AI solutions", "Network intelligence", "Customer analytics platform"]
        }
      ]
    },
    {
      category: "Security & Compliance Partners",
      icon: Shield,
      description: "Cybersecurity and regulatory compliance",
      partners: [
        {
          name: "Palo Alto Networks",
          description: "Cybersecurity platform provider. Partnership ensures our AI systems meet enterprise security standards and threat protection requirements.",
          type: "Cybersecurity",
          benefits: ["Enterprise security integration", "Threat intelligence sharing", "AI security best practices"]
        },
        {
          name: "Egyptian AI Ethics Council",
          description: "National AI ethics and governance body. Collaboration ensures our AI development adheres to ethical guidelines and regulatory requirements.",
          type: "Regulatory & Ethics",
          benefits: ["Ethics framework alignment", "Regulatory guidance", "Industry standards development"]
        }
      ]
    },
    {
      category: "Research & Academic Partners",
      icon: Globe,
      description: "Universities and research institutions",
      partners: [
        {
          name: "Cairo University - Faculty of Engineering",
          description: "Egypt's premier engineering institution. Joint research programs in AI, machine learning, and AGI development with access to top talent.",
          type: "Academic Research",
          benefits: ["Joint research programs", "Talent pipeline", "Lab facilities access"]
        },
        {
          name: "American University in Cairo (AUC)",
          description: "Leading research university. Collaboration on AI ethics, natural language processing for Arabic, and interdisciplinary AI applications.",
          type: "Academic Research",
          benefits: ["NLP research collaboration", "Ethics research", "Student internship programs"]
        },
        {
          name: "MIT - Computer Science and AI Laboratory (CSAIL)",
          description: "World-renowned AI research center. Research partnership focusing on AGI development, transfer learning, and AI safety.",
          type: "International Research",
          benefits: ["Cutting-edge research collaboration", "Knowledge exchange programs", "Joint publications"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Partners & Alliances - Strategic Collaborations"
        description="Strategic partnerships with leading technology providers, industry leaders, and research institutions powering Apex Meridian's AI ecosystem."
      />
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Partners & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Alliances</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Strategic collaborations with world-class organizations driving innovation and excellence in AI
            </p>
          </div>

          {/* Partnership Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-cyan-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-300">Strategic Partners</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-cyan-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-cyan-400 mb-2">5</div>
                <div className="text-gray-300">Partner Categories</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-cyan-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-cyan-400 mb-2">3</div>
                <div className="text-gray-300">Research Institutions</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-cyan-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-cyan-400 mb-2">12</div>
                <div className="text-gray-300">Countries Represented</div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Categories */}
          <div className="space-y-12">
            {partnerCategories.map((category, catIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={catIndex}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-cyan-500/20 p-3 rounded-xl">
                      <CategoryIcon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{category.category}</h2>
                      <p className="text-gray-400">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {category.partners.map((partner, partnerIndex) => (
                      <Card key={partnerIndex} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-2xl font-bold text-white">{partner.name}</h3>
                              <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                                {partner.type}
                              </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{partner.description}</p>
                          </div>

                          <div className="bg-blue-950/50 rounded-xl p-4">
                            <h4 className="text-sm font-bold text-cyan-400 mb-3">Partnership Benefits</h4>
                            <ul className="space-y-2">
                              {partner.benefits.map((benefit, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                                  <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Become a Partner CTA */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our ecosystem of world-class organizations driving the future of AI innovation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-6">
                  Partner with Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-6">
                Download Partnership Guide
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
