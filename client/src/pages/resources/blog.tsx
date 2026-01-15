import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO
        title="Blog & News | Apex Meridian"
        description="Latest insights, updates, and thought leadership from Apex Meridian"
      />
      <Header />
      
      <main className="flex-1 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Blog & News
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest insights, updates, and thought leadership from Apex Meridian
            </p>
          </div>

          <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
            <CardContent className="p-12 text-center">
              <p className="text-xl text-gray-300 mb-8">
                This section is currently under development. Check back soon for updates.
              </p>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Contact Us for More Information
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
