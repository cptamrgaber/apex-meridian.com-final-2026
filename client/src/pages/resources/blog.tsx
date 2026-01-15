import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of AGI: Progress, Challenges, and Ethical Considerations",
      excerpt: "Artificial General Intelligence represents the next frontier in AI development. We explore the current state of AGI research, technical hurdles, and the critical importance of ethical frameworks in development.",
      author: "Dr. Sarah Chen, Chief Science Officer",
      date: "January 12, 2026",
      readTime: "8 min read",
      category: "AGI Research",
      content: [
        {
          heading: "The Current State of AGI Development",
          text: "While narrow AI has achieved remarkable success in specific domains—from image recognition to natural language processing—Artificial General Intelligence remains an elusive goal. AGI refers to systems that possess human-level intelligence across all cognitive domains, capable of learning, reasoning, and adapting to novel situations without domain-specific training."
        },
        {
          heading: "Technical Challenges We're Tackling",
          text: "At Apex Meridian, our AGI research focuses on three critical areas: transfer learning architectures that enable knowledge sharing across domains, meta-learning systems that 'learn how to learn,' and hybrid neuro-symbolic approaches that combine neural networks with symbolic reasoning. Our recent breakthrough in cross-domain knowledge transfer showed a 34% improvement in task adaptation speed compared to traditional fine-tuning methods."
        },
        {
          heading: "The Ethical Imperative",
          text: "As we advance toward AGI, ethical considerations must be embedded in every stage of development. We're implementing rigorous safety protocols, including value alignment frameworks, interpretability requirements, and comprehensive testing for unintended behaviors. Our partnership with the Egyptian AI Ethics Council ensures our research adheres to international ethical standards while respecting cultural values."
        },
        {
          heading: "What's Next",
          text: "The path to AGI is measured in decades, not years. We're committed to transparent research, collaborative development with the global AI community, and responsible innovation that prioritizes human welfare. Our 2026 roadmap includes publishing our meta-learning architecture, expanding our safety research team, and launching an open-source AGI safety toolkit."
        }
      ]
    },
    {
      title: "Transforming Middle East Aviation with Predictive AI",
      excerpt: "How AI-powered predictive maintenance is revolutionizing aircraft operations across the region, reducing costs and improving safety for millions of passengers.",
      author: "Ahmed Hassan, VP of Aviation Solutions",
      date: "January 8, 2026",
      category: "Industry Insights",
      readTime: "6 min read",
      content: [
        {
          heading: "The Aviation Maintenance Challenge",
          text: "Middle Eastern airlines operate in one of the world's most demanding environments—extreme temperatures, high utilization rates, and rapid fleet expansion. Traditional time-based maintenance schedules are inefficient, leading to unnecessary inspections and unexpected failures. The region's airlines lose an estimated $2.3 billion annually to maintenance-related disruptions."
        },
        {
          heading: "AI-Powered Predictive Maintenance",
          text: "Our aviation intelligence platform analyzes real-time data from thousands of aircraft sensors—engine vibrations, temperature fluctuations, hydraulic pressure, and component wear patterns. Machine learning models trained on decades of maintenance records can predict component failures 30-45 days in advance with 89% accuracy. This transforms maintenance from reactive to proactive, allowing airlines to schedule repairs during planned downtime."
        },
        {
          heading: "Real-World Impact",
          text: "Since deploying our system across three major Middle Eastern carriers, we've documented remarkable results: 67% reduction in unscheduled maintenance events, $47 million in combined annual savings, and a 98.2% average on-time departure rate. More importantly, enhanced predictive capabilities improve safety by identifying potential issues before they become critical."
        },
        {
          heading: "The Future of Aviation AI",
          text: "We're expanding our platform to include weather pattern analysis, route optimization, and fuel efficiency prediction. Our vision is a fully integrated AI system that optimizes every aspect of aircraft operations—from pre-flight checks to post-landing maintenance—creating the safest, most efficient aviation ecosystem in the world."
        }
      ]
    },
    {
      title: "Building Trust in AI: Explainability and Transparency in Financial Services",
      excerpt: "Why explainable AI is critical for financial institutions and how we're making black-box algorithms transparent and auditable for regulatory compliance.",
      author: "Dr. Mohamed Farid, Director of Financial AI",
      date: "January 5, 2026",
      readTime: "7 min read",
      category: "Financial Technology",
      content: [
        {
          heading: "The Black Box Problem",
          text: "Financial institutions face a critical challenge: AI systems that deliver impressive results but operate as inscrutable 'black boxes.' When an AI model denies a loan application or flags a transaction as fraudulent, regulators, compliance officers, and customers demand clear explanations. Traditional deep learning models, while powerful, often can't provide them."
        },
        {
          heading: "Our Approach to Explainable AI",
          text: "At Apex Meridian, we've developed a multi-layered explainability framework for financial AI. Our systems generate three levels of explanation: decision summaries for customers (\"This transaction was flagged due to unusual location and amount\"), feature importance analysis for compliance teams (\"Top factors: transaction velocity 34%, geolocation anomaly 28%, device fingerprint mismatch 19%\"), and full model interpretability for auditors including SHAP values and counterfactual explanations."
        },
        {
          heading: "Regulatory Compliance and Trust",
          text: "Egypt's Central Bank recently mandated explainability requirements for AI-based credit decisions. Our systems already exceed these standards, providing audit trails that document every decision factor. This transparency builds trust with customers—our client banks report 43% fewer complaints about AI-driven decisions compared to industry averages."
        },
        {
          heading: "Balancing Performance and Interpretability",
          text: "The common belief that explainable models sacrifice accuracy is outdated. Our hybrid architecture combines interpretable decision trees with deep learning feature extraction, achieving 94% fraud detection accuracy while maintaining full explainability. We're proving that financial institutions don't have to choose between performance and transparency—they can have both."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Blog & News - AI Insights and Industry Trends"
        description="Latest insights, research updates, and thought leadership from Apex Meridian's team of AI experts covering AGI, aviation, finance, and emerging technologies."
      />
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">News</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Insights, research updates, and thought leadership from our team of AI experts
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 overflow-hidden hover:border-cyan-400/40 transition-all">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-cyan-400">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="space-y-6 mb-6">
                    {post.content.map((section, i) => (
                      <div key={i} className="bg-blue-950/50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">{section.heading}</h3>
                        <p className="text-gray-300 leading-relaxed">{section.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Read More CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-cyan-500/20">
                    <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                      Share Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Subscription CTA */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest AI insights, research updates, and industry trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-lg bg-blue-950/50 border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-4">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
