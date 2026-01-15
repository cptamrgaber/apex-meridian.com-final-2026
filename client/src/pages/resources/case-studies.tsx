import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, Plane } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function CaseStudies() {
  const caseStudies = [
    {
      icon: Plane,
      title: "EgyptAir: Predictive Maintenance Revolution",
      industry: "Aviation",
      challenge: "EgyptAir faced significant operational disruptions due to unexpected aircraft maintenance issues, resulting in flight delays, cancellations, and increased costs. Traditional maintenance schedules were reactive rather than predictive, leading to inefficiencies.",
      solution: "Apex Meridian deployed an AI-powered predictive maintenance system that analyzes real-time sensor data from aircraft engines, hydraulic systems, and avionics. Using machine learning algorithms trained on historical maintenance records and flight data, the system predicts component failures 30-45 days in advance.",
      results: [
        "67% reduction in unscheduled maintenance events",
        "42% decrease in aircraft downtime",
        "$12.4M annual cost savings in maintenance operations",
        "98.7% on-time departure rate improvement",
        "Enhanced passenger satisfaction scores by 34%"
      ],
      testimonial: "Apex Meridian's predictive maintenance solution transformed our operations. We now anticipate issues before they become problems, ensuring our fleet operates at peak efficiency.",
      author: "Chief Operations Officer, EgyptAir",
      duration: "18 months",
      technology: ["Machine Learning", "IoT Sensors", "Real-time Analytics", "Computer Vision"]
    },
    {
      icon: Shield,
      title: "National Bank of Egypt: Advanced Fraud Detection",
      industry: "Financial Services",
      challenge: "The National Bank of Egypt processed over 2.5 million daily transactions and faced sophisticated fraud attempts that traditional rule-based systems couldn't detect. False positive rates were high (23%), causing customer friction and operational overhead.",
      solution: "We implemented a multi-layered AI fraud detection system combining deep learning neural networks, behavioral analytics, and real-time transaction monitoring. The system analyzes 150+ data points per transaction, including device fingerprinting, geolocation patterns, transaction velocity, and historical behavior.",
      results: [
        "94% fraud detection accuracy (up from 71%)",
        "87% reduction in false positives",
        "$8.7M prevented fraud losses in first year",
        "Real-time detection latency under 50ms",
        "Customer complaint reduction by 56%"
      ],
      testimonial: "The AI system catches fraud patterns our analysts would never spot manually. It's like having thousands of expert fraud investigators working 24/7.",
      author: "Head of Security Operations, National Bank of Egypt",
      duration: "12 months",
      technology: ["Deep Learning", "Behavioral Analytics", "Real-time Processing", "Anomaly Detection"]
    },
    {
      icon: TrendingUp,
      title: "Vodafone Egypt: Customer Churn Prediction & Retention",
      industry: "Telecommunications",
      challenge: "Vodafone Egypt experienced 18% annual customer churn, with limited visibility into which customers were at risk and why. Retention campaigns were broad and inefficient, with low conversion rates and high marketing spend waste.",
      solution: "Apex Meridian developed a comprehensive churn prediction platform that analyzes customer usage patterns, billing history, service interactions, network quality metrics, and competitive market data. The system identifies at-risk customers 60-90 days before potential churn and recommends personalized retention strategies.",
      results: [
        "73% churn prediction accuracy",
        "41% reduction in overall churn rate",
        "$23.6M increase in annual recurring revenue",
        "3.2x improvement in retention campaign ROI",
        "Customer lifetime value increased by 28%"
      ],
      testimonial: "This AI platform gave us unprecedented insight into customer behavior. We're now proactive rather than reactive, saving customers before they even consider leaving.",
      author: "VP of Customer Experience, Vodafone Egypt",
      duration: "24 months",
      technology: ["Predictive Analytics", "Natural Language Processing", "Customer Segmentation", "Recommendation Systems"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Case Studies - Real-World AI Success Stories"
        description="Explore detailed case studies showcasing how Apex Meridian's AI solutions delivered measurable results for leading organizations across aviation, finance, and telecommunications."
      />
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Studies</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Real-world success stories demonstrating measurable business impact through AI innovation
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Left Column - Header */}
                      <div className="md:col-span-3">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-cyan-500/20 p-4 rounded-xl">
                            <Icon className="h-8 w-8 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-2">{study.title}</h2>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="text-cyan-400 font-semibold">{study.industry}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-300">Duration: {study.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Challenge */}
                      <div className="md:col-span-3 bg-blue-950/50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">The Challenge</h3>
                        <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div className="md:col-span-3 bg-blue-950/50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Solution</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">{study.solution}</p>
                        <div className="flex flex-wrap gap-2">
                          {study.technology.map((tech, i) => (
                            <span key={i} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="md:col-span-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">Measurable Results</h3>
                        <ul className="space-y-3">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <TrendingUp className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                              <span className="text-white font-medium">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Testimonial */}
                      <div className="md:col-span-1 bg-blue-950/50 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-cyan-400 mb-3">Client Testimonial</h3>
                        <blockquote className="text-gray-300 italic mb-4 flex-1">
                          "{study.testimonial}"
                        </blockquote>
                        <p className="text-sm text-gray-400">— {study.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Organization?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI solutions can deliver measurable results for your business
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-6">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-6">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
