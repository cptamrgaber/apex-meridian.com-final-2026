import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Zap, Shield, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function NLP() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Natural Language Processing | Apex Meridian"
        description="State-of-the-art NLP technologies for understanding and generating human language"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Natural Language Processing
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                State-of-the-art NLP technologies for understanding and generating human language
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Capabilities Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Key Capabilities
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive solutions powered by cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Text Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Sentiment analysis and entity recognition</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Language Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Content creation and summarization</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Machine Translation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Multi-language support and localization</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Conversational AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Chatbots and virtual assistants</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-blue-900/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Apex Meridian
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 text-center">
                <CardHeader>
                  <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Fast Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Rapid deployment and integration with existing systems</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 text-center">
                <CardHeader>
                  <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Bank-level security and compliance standards</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 text-center">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Measurable ROI and performance improvements</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <CardTitle className="text-white">Expert Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">24/7 dedicated support from AI specialists</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Contact us today to learn how our AI solutions can drive innovation and growth
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Schedule a Demo
                  </Button>
                  <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
