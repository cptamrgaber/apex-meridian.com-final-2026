import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior AI Research Scientist",
      department: "Research",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      description: "Lead cutting-edge research in neural-symbolic AI and contribute to our AGI development initiatives."
    },
    {
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "Remote / New York, NY",
      type: "Full-time",
      description: "Build and deploy scalable ML models for aviation predictive maintenance and autonomous flight systems."
    },
    {
      title: "Cybersecurity AI Specialist",
      department: "Engineering",
      location: "Remote / Washington, DC",
      type: "Full-time",
      description: "Develop AI-powered threat detection systems and quantum-resistant encryption solutions."
    },
    {
      title: "Product Manager - Education AI",
      department: "Product",
      location: "Remote / Boston, MA",
      type: "Full-time",
      description: "Drive product strategy for our adaptive learning platform serving millions of students globally."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / Austin, TX",
      type: "Full-time",
      description: "Manage cloud infrastructure and CI/CD pipelines for our distributed AI systems."
    },
    {
      title: "Data Scientist",
      department: "Research",
      location: "Remote / Seattle, WA",
      type: "Full-time",
      description: "Analyze complex datasets to improve AI model performance across aviation and cybersecurity domains."
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / Los Angeles, CA",
      type: "Full-time",
      description: "Design intuitive interfaces for enterprise AI tools used by aviation operators and security teams."
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Remote / Chicago, IL",
      type: "Full-time",
      description: "Expand our client base in the aviation and education sectors across North America."
    }
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Comprehensive health, dental, and vision insurance",
    "Unlimited PTO and flexible work arrangements",
    "Professional development budget ($5,000/year)",
    "Latest hardware and software tools",
    "Collaborative and innovative work environment",
    "Opportunity to work on cutting-edge AI research",
    "Regular team offsites and conferences"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Careers at A p e x - M e r i d i a n ®
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join us in shaping the future of artificial intelligence. We're building transformative AI solutions 
                that impact millions of lives across aviation, cybersecurity, education, and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Join Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Cutting-Edge Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Work on groundbreaking AI projects that push the boundaries of what's possible, 
                    from AGI research to real-world applications in critical industries.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Global Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Your work will directly improve aviation safety, protect organizations from cyber threats, 
                    and enhance education for students worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Exceptional Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Collaborate with world-class researchers, engineers, and designers from top institutions 
                    like MIT, Stanford, Google, and Tesla.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Growth & Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Continuous learning opportunities through conferences, workshops, and a generous 
                    professional development budget to advance your career.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((job, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-300 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 whitespace-nowrap">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Benefits & Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Don't See a Perfect Fit?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always interested in hearing from talented individuals. Send us your resume and let us know 
              how you'd like to contribute to our mission.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-6">
              Send General Application
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
