import { Link } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-950/95 backdrop-blur-sm border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link href="/">
            <div className="cursor-pointer group">
              <img
                src="/images/logo-main-white.png"
                alt="Apex Meridian"
                className="h-16 w-auto group-hover:scale-105 transition-transform"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <a className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
                Home
              </a>
            </Link>
            
            <Link href="/about">
              <a className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
                About
              </a>
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors font-medium"
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {solutionsOpen && (
                <div
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2"
                >
                  <Link href="/solutions">
                    <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                      All Solutions
                    </a>
                  </Link>
                  <Link href="/solutions/aviation">
                    <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                      Aviation Intelligence
                    </a>
                  </Link>
                  <Link href="/solutions/cybersecurity">
                    <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                      Cybersecurity Shield
                    </a>
                  </Link>
                  <Link href="/solutions/education">
                    <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                      Education & Cognitive Enhancement
                    </a>
                  </Link>
                  <Link href="/solutions/agi">
                    <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                      AGI Research
                    </a>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/technology">
              <a className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
                Technology
              </a>
            </Link>

            <Link href="/investors">
              <a className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
                Investors
              </a>
            </Link>

            <Link href="/contact">
              <a className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
                Contact
              </a>
            </Link>

            <Link href="/contact">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            <Link href="/">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                About
              </a>
            </Link>
            <Link href="/solutions">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                Solutions
              </a>
            </Link>
            <Link href="/solutions/aviation">
              <a className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
                Aviation Intelligence
              </a>
            </Link>
            <Link href="/solutions/cybersecurity">
              <a className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
                Cybersecurity Shield
              </a>
            </Link>
            <Link href="/solutions/education">
              <a className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
                Education & Cognitive Enhancement
              </a>
            </Link>
            <Link href="/solutions/agi">
              <a className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
                AGI Research
              </a>
            </Link>
            <Link href="/technology">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                Technology
              </a>
            </Link>
            <Link href="/investors">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                Investors
              </a>
            </Link>
            <Link href="/contact">
              <a className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
                Contact
              </a>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
