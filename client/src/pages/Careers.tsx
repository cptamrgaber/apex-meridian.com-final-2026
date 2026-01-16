import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, Building2, Users, Network } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = [
    { name: "Engineering", count: 15, color: "cyan" },
    { name: "Research & Development", count: 8, color: "blue" },
    { name: "Sales & Business Development", count: 10, color: "green" },
    { name: "Marketing & Communications", count: 6, color: "purple" },
    { name: "Operations & Project Management", count: 7, color: "orange" },
    { name: "Human Resources", count: 4, color: "pink" },
    { name: "Finance & Accounting", count: 5, color: "yellow" },
    { name: "Legal & Compliance", count: 3, color: "red" },
    { name: "Customer Success & Support", count: 6, color: "teal" },
    { name: "Product Management", count: 5, color: "indigo" },
    { name: "Security & Safety", count: 6, color: "rose" },
    { name: "Quality Assurance", count: 5, color: "amber" },
  ];

  const allJobs = [
    // Engineering (15 positions)
    { title: "Senior AI Research Scientist", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Lead cutting-edge research in neural-symbolic AI and contribute to our AGI development initiatives.", available: true },
    { title: "Machine Learning Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Build and deploy scalable ML models for aviation predictive maintenance and autonomous flight systems.", available: true },
    { title: "Senior Software Engineer (Backend)", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Design and implement robust backend systems for our AI platform using Python, Go, and distributed systems.", available: true },
    { title: "Senior Software Engineer (Frontend)", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Build intuitive user interfaces for enterprise AI tools using React, TypeScript, and modern web technologies.", available: true },
    { title: "DevOps Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Manage cloud infrastructure and CI/CD pipelines for our distributed AI systems on AWS/GCP.", available: true },
    { title: "Data Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Build data pipelines and infrastructure to support large-scale AI model training and deployment.", available: true },
    { title: "Computer Vision Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Develop advanced computer vision systems for aviation safety and autonomous systems.", available: true },
    { title: "NLP Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Build natural language processing systems for education and enterprise applications.", available: true },
    { title: "Robotics Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Design and implement robotics control systems integrated with AI decision-making.", available: true },
    { title: "Cloud Architect", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Design scalable cloud architecture for enterprise AI deployments.", available: true },
    { title: "Security Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Implement security best practices and protect our AI systems from threats.", available: true },
    { title: "QA Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Ensure quality and reliability of AI systems through comprehensive testing strategies.", available: true },
    { title: "Site Reliability Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Maintain high availability and performance of production AI systems.", available: true },
    { title: "Mobile Engineer (iOS/Android)", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Build mobile applications for our AI-powered education and enterprise tools.", available: true },
    { title: "Embedded Systems Engineer", department: "Engineering", location: "Cairo, Egypt", type: "Full-time", description: "Develop embedded AI systems for aviation and industrial applications.", available: true },

    // Research & Development (8 positions)
    { title: "Research Scientist - AGI", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Conduct fundamental research in artificial general intelligence and neural-symbolic systems.", available: true },
    { title: "Research Scientist - Reinforcement Learning", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Develop advanced RL algorithms for autonomous systems and decision-making.", available: true },
    { title: "Data Scientist", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Analyze complex datasets to improve AI model performance across multiple domains.", available: true },
    { title: "Research Engineer - Computer Vision", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Research and implement state-of-the-art computer vision algorithms.", available: true },
    { title: "Research Engineer - NLP", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Advance natural language understanding and generation capabilities.", available: true },
    { title: "AI Ethics Researcher", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Research ethical implications of AI systems and develop responsible AI frameworks.", available: true },
    { title: "Quantum Computing Researcher", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Explore quantum algorithms for AI and cryptography applications.", available: true },
    { title: "Applied Research Scientist", department: "Research & Development", location: "Cairo, Egypt", type: "Full-time", description: "Bridge research and product development by implementing cutting-edge AI techniques.", available: true },

    // Sales & Business Development (10 positions)
    { title: "VP of Sales", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Lead global sales strategy and build high-performing sales teams.", available: true },
    { title: "Enterprise Account Executive", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Sell AI solutions to Fortune 500 companies in aviation and cybersecurity sectors.", available: true },
    { title: "Business Development Manager - Aviation", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Expand our client base in the aviation industry across North America.", available: true },
    { title: "Business Development Manager - Education", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Drive growth in the education sector by partnering with schools and universities.", available: true },
    { title: "Sales Engineer", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Provide technical expertise during sales cycles and customer demonstrations.", available: true },
    { title: "Channel Partner Manager", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Build and manage strategic partnerships to expand market reach.", available: true },
    { title: "Inside Sales Representative", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Generate leads and close deals with small to mid-size businesses.", available: true },
    { title: "Sales Operations Manager", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Optimize sales processes, tools, and analytics to drive team performance.", available: true },
    { title: "Customer Success Manager", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Ensure customer satisfaction and drive adoption of our AI solutions.", available: true },
    { title: "Strategic Accounts Director", department: "Sales & Business Development", location: "Cairo, Egypt", type: "Full-time", description: "Manage relationships with key strategic accounts and drive expansion.", available: true },

    // Marketing & Communications (6 positions)
    { title: "VP of Marketing", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Lead global marketing strategy and brand development.", available: true },
    { title: "Product Marketing Manager", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Drive go-to-market strategy for AI products and solutions.", available: true },
    { title: "Content Marketing Manager", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Create compelling content that showcases our AI expertise and thought leadership.", available: true },
    { title: "Digital Marketing Specialist", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Manage digital campaigns across SEO, SEM, social media, and email marketing.", available: true },
    { title: "Communications Manager", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Manage public relations, media outreach, and corporate communications.", available: true },
    { title: "Marketing Operations Analyst", department: "Marketing & Communications", location: "Cairo, Egypt", type: "Full-time", description: "Analyze marketing performance and optimize campaigns using data-driven insights.", available: true },

    // Operations & Project Management (7 positions)
    { title: "Chief Operating Officer (COO)", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Oversee all operational aspects of the company and drive organizational efficiency.", available: true },
    { title: "Senior Project Manager", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Lead complex AI implementation projects for enterprise clients.", available: true },
    { title: "Program Manager", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Manage cross-functional programs and ensure successful delivery.", available: true },
    { title: "Operations Manager", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Optimize internal operations and improve process efficiency.", available: true },
    { title: "Technical Program Manager", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Drive technical initiatives and coordinate engineering teams.", available: true },
    { title: "Supply Chain Manager", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Manage vendor relationships and optimize supply chain operations.", available: true },
    { title: "Business Analyst", department: "Operations & Project Management", location: "Cairo, Egypt", type: "Full-time", description: "Analyze business processes and provide data-driven recommendations.", available: true },

    // Human Resources (4 positions)
    { title: "VP of People Operations", department: "Human Resources", location: "Cairo, Egypt", type: "Full-time", description: "Lead HR strategy, culture development, and talent management.", available: true },
    { title: "Technical Recruiter", department: "Human Resources", location: "Cairo, Egypt", type: "Full-time", description: "Source and hire top engineering and research talent.", available: true },
    { title: "HR Business Partner", department: "Human Resources", location: "Cairo, Egypt", type: "Full-time", description: "Partner with leadership to drive people initiatives and employee engagement.", available: true },
    { title: "Learning & Development Manager", department: "Human Resources", location: "Cairo, Egypt", type: "Full-time", description: "Design and implement training programs to develop employee skills.", available: true },

    // Finance & Accounting (5 positions)
    { title: "Chief Financial Officer (CFO)", department: "Finance & Accounting", location: "Cairo, Egypt", type: "Full-time", description: "Lead financial strategy, planning, and investor relations.", available: true },
    { title: "Finance Manager", department: "Finance & Accounting", location: "Cairo, Egypt", type: "Full-time", description: "Manage financial operations, budgeting, and forecasting.", available: true },
    { title: "Senior Accountant", department: "Finance & Accounting", location: "Cairo, Egypt", type: "Full-time", description: "Handle accounting operations, financial reporting, and compliance.", available: true },
    { title: "Financial Analyst", department: "Finance & Accounting", location: "Cairo, Egypt", type: "Full-time", description: "Analyze financial data and provide insights to support business decisions.", available: true },
    { title: "Accounts Payable/Receivable Specialist", department: "Finance & Accounting", location: "Cairo, Egypt", type: "Full-time", description: "Manage invoicing, payments, and financial record-keeping.", available: true },

    // Legal & Compliance (3 positions)
    { title: "General Counsel", department: "Legal & Compliance", location: "Cairo, Egypt", type: "Full-time", description: "Provide legal guidance and manage all legal matters for the company.", available: true },
    { title: "Corporate Counsel", department: "Legal & Compliance", location: "Cairo, Egypt", type: "Full-time", description: "Handle contracts, intellectual property, and regulatory compliance.", available: true },
    { title: "Compliance Manager", department: "Legal & Compliance", location: "Cairo, Egypt", type: "Full-time", description: "Ensure compliance with industry regulations and data privacy laws.", available: true },

    // Customer Success & Support (6 positions)
    { title: "VP of Customer Success", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Lead customer success strategy and drive customer satisfaction.", available: true },
    { title: "Customer Success Manager", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Ensure customers achieve their goals using our AI solutions.", available: true },
    { title: "Technical Support Engineer", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Provide technical support and troubleshooting for customers.", available: true },
    { title: "Customer Support Specialist", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Respond to customer inquiries and resolve issues promptly.", available: true },
    { title: "Implementation Specialist", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Guide customers through onboarding and implementation of our AI systems.", available: true },
    { title: "Training Specialist", department: "Customer Success & Support", location: "Cairo, Egypt", type: "Full-time", description: "Develop and deliver training programs for customers.", available: true },

    // Product Management (5 positions)
    { title: "VP of Product", department: "Product Management", location: "Cairo, Egypt", type: "Full-time", description: "Define product vision and strategy across all AI solutions.", available: true },
    { title: "Senior Product Manager - Aviation AI", department: "Product Management", location: "Cairo, Egypt", type: "Full-time", description: "Drive product strategy for aviation AI solutions.", available: true },
    { title: "Product Manager - Education AI", department: "Product Management", location: "Cairo, Egypt", type: "Full-time", description: "Manage adaptive learning platform and education products.", available: true },
    { title: "Product Manager - Cybersecurity AI", department: "Product Management", location: "Cairo, Egypt", type: "Full-time", description: "Lead cybersecurity AI product development and roadmap.", available: true },
    { title: "UX Designer", department: "Product Management", location: "Cairo, Egypt", type: "Full-time", description: "Design intuitive interfaces for enterprise AI tools.", available: true },
  ];

  const filteredJobs = selectedDepartment 
    ? allJobs.filter(job => job.department === selectedDepartment)
    : allJobs;

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
      <SEO 
        title="Careers at Apex Meridian - Join Our AI Team"
        description="Join Apex Meridian and shape the future of AI. Explore open positions in Engineering, Research, Sales, Marketing, Operations, and more. We're hiring across all departments."
      />
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

        {/* Organization Overview */}
        <section className="py-16 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Network className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Organization</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're a diverse team of {allJobs.length}+ professionals across {departments.length} departments, 
                working together to advance AI technology and deliver exceptional value to our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card 
                  key={index} 
                  className={`bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer ${
                    selectedDepartment === dept.name ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? null : dept.name)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Building2 className="h-6 w-6 text-cyan-400" />
                      <span className="text-2xl font-bold text-cyan-400">{dept.count}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-400">{dept.count} open positions</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedDepartment && (
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDepartment(null)}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Show All Departments
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              {selectedDepartment ? `${selectedDepartment} Positions` : 'All Open Positions'}
            </h2>
            <p className="text-center text-gray-300 mb-12">
              {filteredJobs.length} positions available
            </p>
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                          {job.available && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                              Available
                            </span>
                          )}
                        </div>
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
                      <Link href={`/careers/apply?job=${encodeURIComponent(job.title)}&dept=${encodeURIComponent(job.department)}`}>
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 whitespace-nowrap">
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
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

        {/* Benefits */}
        <section className="py-16 px-4">
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
        <section className="py-20 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-4xl text-center">
            <Users className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Don't See a Perfect Fit?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always interested in hearing from talented individuals. Send us your resume and let us know 
              how you'd like to contribute to our mission.
            </p>
            <Link href="/careers/apply?job=General%20Application&dept=General">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-6">
                Send General Application
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
