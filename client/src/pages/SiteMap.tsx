import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function SiteMap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <SEO 
        title="Site Map - Navigate Our Website"
        description="Complete sitemap of Apex Meridian website with all pages organized by category for easy navigation."
      />
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Map</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 text-center">
            Complete navigation of all pages on our website
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main Pages */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link href="/technology" className="text-gray-300 hover:text-cyan-400 transition-colors">Technology</Link></li>
                <li><Link href="/investors" className="text-gray-300 hover:text-cyan-400 transition-colors">Investors</Link></li>
                <li><Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Solutions - Core */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Solutions - Core</h2>
              <ul className="space-y-2">
                <li><Link href="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors">Solutions Overview</Link></li>
                <li><Link href="/solutions/aviation" className="text-gray-300 hover:text-cyan-400 transition-colors">Aviation Intelligence</Link></li>
                <li><Link href="/solutions/cybersecurity" className="text-gray-300 hover:text-cyan-400 transition-colors">Cybersecurity Shield</Link></li>
                <li><Link href="/solutions/education" className="text-gray-300 hover:text-cyan-400 transition-colors">Education & Cognitive Enhancement</Link></li>
                <li><Link href="/solutions/agi" className="text-gray-300 hover:text-cyan-400 transition-colors">AGI Research</Link></li>
                <li><Link href="/solutions/media-production" className="text-gray-300 hover:text-cyan-400 transition-colors">Media Production</Link></li>
              </ul>
            </div>

            {/* Solutions - Industries */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Solutions - Industries</h2>
              <ul className="space-y-2">
                <li><Link href="/solutions/healthcare" className="text-gray-300 hover:text-cyan-400 transition-colors">Healthcare AI</Link></li>
                <li><Link href="/solutions/finance" className="text-gray-300 hover:text-cyan-400 transition-colors">Financial Services</Link></li>
                <li><Link href="/solutions/manufacturing" className="text-gray-300 hover:text-cyan-400 transition-colors">Manufacturing & Industry 4.0</Link></li>
                <li><Link href="/solutions/retail" className="text-gray-300 hover:text-cyan-400 transition-colors">Retail & E-commerce</Link></li>
                <li><Link href="/solutions/transportation" className="text-gray-300 hover:text-cyan-400 transition-colors">Transportation & Logistics</Link></li>
                <li><Link href="/solutions/energy" className="text-gray-300 hover:text-cyan-400 transition-colors">Energy & Utilities</Link></li>
              </ul>
            </div>

            {/* Technology */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Technology</h2>
              <ul className="space-y-2">
                <li><Link href="/technology" className="text-gray-300 hover:text-cyan-400 transition-colors">Platform Overview</Link></li>
                <li><Link href="/technology/machine-learning" className="text-gray-300 hover:text-cyan-400 transition-colors">Machine Learning</Link></li>
                <li><Link href="/technology/nlp" className="text-gray-300 hover:text-cyan-400 transition-colors">Natural Language Processing</Link></li>
                <li><Link href="/technology/computer-vision" className="text-gray-300 hover:text-cyan-400 transition-colors">Computer Vision</Link></li>
                <li><Link href="/technology/robotics" className="text-gray-300 hover:text-cyan-400 transition-colors">Robotics & Automation</Link></li>
                <li><Link href="/technology/data-analytics" className="text-gray-300 hover:text-cyan-400 transition-colors">Data Analytics</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Resources</h2>
              <ul className="space-y-2">
                <li><Link href="/resources/blog" className="text-gray-300 hover:text-cyan-400 transition-colors">Blog & News</Link></li>
                <li><Link href="/news" className="text-gray-300 hover:text-cyan-400 transition-colors">Technology News</Link></li>
                <li><Link href="/news/am-av-occ-system-launch" className="text-gray-300 hover:text-cyan-400 transition-colors">AM-AV System Launch</Link></li>
                <li><Link href="/library" className="text-gray-300 hover:text-cyan-400 transition-colors">AI Library</Link></li>
                <li><Link href="/resources/case-studies" className="text-gray-300 hover:text-cyan-400 transition-colors">Case Studies</Link></li>
                <li><Link href="/case-studies/am-av-regional-carrier" className="text-gray-300 hover:text-cyan-400 transition-colors">AM-AV Case Study</Link></li>
                <li><Link href="/resources/whitepapers" className="text-gray-300 hover:text-cyan-400 transition-colors">Whitepapers</Link></li>
                <li><Link href="/resources/research" className="text-gray-300 hover:text-cyan-400 transition-colors">Research Papers</Link></li>
              </ul>
            </div>

            {/* Research Platform */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Research Platform</h2>
              <ul className="space-y-2">
                <li><Link href="/research/publications" className="text-gray-300 hover:text-cyan-400 transition-colors">Publications Repository</Link></li>
                <li><Link href="/research/timeline" className="text-gray-300 hover:text-cyan-400 transition-colors">Partnership Timeline</Link></li>
                <li><Link href="/researchers" className="text-gray-300 hover:text-cyan-400 transition-colors">Research Team</Link></li>
                <li><Link href="/research/blog" className="text-gray-300 hover:text-cyan-400 transition-colors">Research Blog</Link></li>
                <li><Link href="/research/blog/ai-compliance-nlp" className="text-gray-300 hover:text-cyan-400 transition-colors">AI Compliance Engine Research</Link></li>
                <li><Link href="/research/am-av-project" className="text-gray-300 hover:text-cyan-400 transition-colors">AM-AV Research Project</Link></li>
                <li><Link href="/research/collaboration" className="text-gray-300 hover:text-cyan-400 transition-colors">Collaboration Form</Link></li>
              </ul>
            </div>

            {/* Research Partnerships */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Research Partnerships</h2>
              <ul className="space-y-2">
                <li><Link href="/partnerships/auc" className="text-gray-300 hover:text-cyan-400 transition-colors">American University in Cairo</Link></li>
                <li><Link href="/partnerships/cairo-university" className="text-gray-300 hover:text-cyan-400 transition-colors">Cairo University</Link></li>
                <li><Link href="/partnerships/zewail-city" className="text-gray-300 hover:text-cyan-400 transition-colors">Zewail City of Science</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Company</h2>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">About Us</Link></li>
                <li><Link href="/company/leadership" className="text-gray-300 hover:text-cyan-400 transition-colors">Leadership Team</Link></li>
                <li><Link href="/team" className="text-gray-300 hover:text-cyan-400 transition-colors">Our Team</Link></li>
                <li><Link href="/organization" className="text-gray-300 hover:text-cyan-400 transition-colors">Organization Chart</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="/company/partners" className="text-gray-300 hover:text-cyan-400 transition-colors">Partners & Alliances</Link></li>
                <li><Link href="/company/awards" className="text-gray-300 hover:text-cyan-400 transition-colors">Awards & Recognition</Link></li>
                <li><Link href="/company/press" className="text-gray-300 hover:text-cyan-400 transition-colors">Press & Media</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Support</h2>
              <ul className="space-y-2">
                <li><Link href="/support/faq" className="text-gray-300 hover:text-cyan-400 transition-colors">FAQ</Link></li>
                <li><Link href="/support/documentation" className="text-gray-300 hover:text-cyan-400 transition-colors">Documentation</Link></li>
                <li><Link href="/support/training" className="text-gray-300 hover:text-cyan-400 transition-colors">Training & Certification</Link></li>
              </ul>
            </div>

            {/* Payment & Subscriptions */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Payment & Subscriptions</h2>
              <ul className="space-y-2">
                <li><Link href="/pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">Pricing Plans</Link></li>
                <li><Link href="/checkout" className="text-gray-300 hover:text-cyan-400 transition-colors">Checkout</Link></li>
                <li><Link href="/checkout/success" className="text-gray-300 hover:text-cyan-400 transition-colors">Payment Success</Link></li>
                <li><Link href="/customer-portal" className="text-gray-300 hover:text-cyan-400 transition-colors">Customer Portal</Link></li>
              </ul>
            </div>

            {/* Admin & Management */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Admin & Management</h2>
              <ul className="space-y-2">
                <li><Link href="/admin/settings" className="text-gray-300 hover:text-cyan-400 transition-colors">Admin Settings</Link></li>
                <li><Link href="/login" className="text-gray-300 hover:text-cyan-400 transition-colors">Employee Login</Link></li>
                <li><Link href="/employee" className="text-gray-300 hover:text-cyan-400 transition-colors">Employee Portal</Link></li>
                <li><Link href="/hr-dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">HR Dashboard</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Legal</h2>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Contact</h2>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  <strong className="text-white">General Inquiries:</strong><br />
                  <a href="mailto:info@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">info@apex-meridian.com</a>
                </p>
                <p>
                  <strong className="text-white">Sales:</strong><br />
                  <a href="mailto:sales@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">sales@apex-meridian.com</a>
                </p>
                <p>
                  <strong className="text-white">Support:</strong><br />
                  <a href="mailto:support@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">support@apex-meridian.com</a>
                </p>
                <p>
                  <strong className="text-white">HR & Careers:</strong><br />
                  <a href="mailto:hr@apex-meridian.com" className="text-cyan-400 hover:text-cyan-300">hr@apex-meridian.com</a>
                </p>
                <p>
                  <strong className="text-white">Phone:</strong><br />
                  +201 2 00 92 90 92
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
