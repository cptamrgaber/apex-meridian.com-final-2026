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
                src="/images/logo-main.png"
                alt="Apex Meridian"
                className="h-11 w-auto group-hover:scale-105 transition-transform brightness-0 invert"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              Home
            </Link>
            
            <Link href="/about" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              About
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
                  <Link href="/solutions" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    All Solutions
                  </Link>
                  <Link href="/solutions/aviation" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Aviation Intelligence
                  </Link>
                  <Link href="/solutions/cybersecurity" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Cybersecurity Shield
                  </Link>
                  <Link href="/solutions/education" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Education & Cognitive Enhancement
                  </Link>
                  <Link href="/solutions/agi" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    AGI Research
                  </Link>
                </div>
              )}
            </div>

            <Link href="/technology" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              Technology
            </Link>

            <Link href="/investors" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              Investors
            </Link>

            <Link href="/contact" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              Contact
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
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2">
            <Link href="/" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Home
            </Link>
            <Link href="/about" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              About
            </Link>
            <Link href="/solutions" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Solutions
            </Link>
            <Link href="/solutions/aviation" className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Aviation Intelligence
            </Link>
            <Link href="/solutions/cybersecurity" className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Cybersecurity Shield
            </Link>
            <Link href="/solutions/education" className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Education & Cognitive Enhancement
            </Link>
            <Link href="/solutions/agi" className="block px-4 py-3 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              AGI Research
            </Link>
            <Link href="/technology" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Technology
            </Link>
            <Link href="/investors" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Investors
            </Link>
            <Link href="/contact" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
