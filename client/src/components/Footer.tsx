import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/images/logo-main.png"
                alt="Apex Meridian"
                className="h-8 w-auto mb-2 brightness-0 invert"
                style={{ objectFit: 'contain' }}
              />
              <p className="text-cyan-400 text-sm font-semibold">LLC</p>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              AI-Powered Solutions for a Smarter World
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                New Cairo, Cairo Governorate, Egypt
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-cyan-400" />
                +201 2 00 92 90 92
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-cyan-400" />
                info@apex-meridian.com
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions/aviation">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Aviation Intelligence
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions/cybersecurity">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Cybersecurity Shield
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions/education">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Education & Cognitive Enhancement
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/solutions/agi">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    AGI Research
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/technology">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Meridian Engine Platform
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about/team">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Our Team
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about/careers">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Careers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/investors">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Investors
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sitemap">
                  <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                    Site Map
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500/20 p-3 rounded-full hover:bg-cyan-500/30 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-cyan-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500/20 p-3 rounded-full hover:bg-cyan-500/30 transition-colors"
              >
                <Twitter className="h-5 w-5 text-cyan-400" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500/20 p-3 rounded-full hover:bg-cyan-500/30 transition-colors"
              >
                <Youtube className="h-5 w-5 text-cyan-400" />
              </a>
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm mb-2">Secure Portals</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/employee">
                    <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                      Employee Portal
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/hr">
                    <a className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                      HR Dashboard
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 <span className="font-semibold tracking-wider">A p e x - M e r i d i a n ®</span> LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/sitemap">
                <a className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Site Map
                </a>
              </Link>
              <Link href="/privacy">
                <a className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
