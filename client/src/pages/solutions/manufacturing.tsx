import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Zap, Shield, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Manufacturing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Manufacturing & Industry 4.0 | Apex Meridian"
        description="Optimize manufacturing operations with AI-powered predictive maintenance, quality control, and supply chain management"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Manufacturing & Industry 4.0
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Optimize manufacturing operations with AI-powered predictive maintenance, quality control, and supply chain management
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
                Key Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive solutions powered by cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Predictive Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Equipment failure prediction and maintenance scheduling</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Quality Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Automated defect detection and quality assurance</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Supply Chain Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Demand forecasting and inventory management</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 text-cyan-400 mb-4" />
                  <CardTitle className="text-white">Production Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Resource allocation and workflow optimization</p>
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
