import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function SiteMap() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Site Map</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Pages */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Main Pages</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/technology" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link href="/investors" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Investors
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Solutions</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/solutions" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Solutions Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/aviation" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Aviation Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/cybersecurity" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Cybersecurity Shield
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/education" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Education & Cognitive Enhancement
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/agi" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      AGI Research
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Legal</h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-300 hover:text-cyan-400 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-cyan-500/30">
                <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Contact Information</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Email:</strong><br />
                    info@apex-meridian.com
                  </p>
                  <p>
                    <strong className="text-white">Phone:</strong><br />
                    +201 2 00 92 90 92
                  </p>
                  <p>
                    <strong className="text-white">Website:</strong><br />
                    apex-meridian.net
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
