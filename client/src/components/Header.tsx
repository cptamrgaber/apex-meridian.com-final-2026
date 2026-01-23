import { Link } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [technologyOpen, setTechnologyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

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
          <div className="hidden lg:flex items-center space-x-6">
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
                  className="absolute top-full left-0 mt-2 w-72 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2 grid grid-cols-2 gap-1"
                >
                  <Link href="/solutions" className="col-span-2 block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold border-b border-cyan-500/20">
                    All Solutions
                  </Link>
                  <Link href="/solutions/aviation" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Aviation
                  </Link>
                  <Link href="/solutions/cybersecurity" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Cybersecurity
                  </Link>
                  <Link href="/solutions/education" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Education
                  </Link>
                  <Link href="/solutions/agi" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    AGI Research
                  </Link>
                  <Link href="/solutions/healthcare" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Healthcare
                  </Link>
                  <Link href="/solutions/finance" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Finance
                  </Link>
                  <Link href="/solutions/manufacturing" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Manufacturing
                  </Link>
                  <Link href="/solutions/retail" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Retail
                  </Link>
                  <Link href="/solutions/transportation" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Transportation
                  </Link>
                  <Link href="/solutions/energy" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Energy
                  </Link>
                </div>
              )}
            </div>

            {/* Technology Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setTechnologyOpen(true)}
                onMouseLeave={() => setTechnologyOpen(false)}
                className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors font-medium"
              >
                Technology
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {technologyOpen && (
                <div
                  onMouseEnter={() => setTechnologyOpen(true)}
                  onMouseLeave={() => setTechnologyOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2"
                >
                  <Link href="/technology" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold border-b border-cyan-500/20">
                    Platform Overview
                  </Link>
                  <Link href="/technology/machine-learning" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Machine Learning
                  </Link>
                  <Link href="/technology/nlp" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Natural Language Processing
                  </Link>
                  <Link href="/technology/computer-vision" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Computer Vision
                  </Link>
                  <Link href="/technology/robotics" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Robotics & Automation
                  </Link>
                  <Link href="/technology/data-analytics" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Data Analytics
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
                className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors font-medium"
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {resourcesOpen && (
                <div
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => setResourcesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2"
                >
                  <Link href="/security-resources" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold border-b border-cyan-500/20">
                    Security Resources
                  </Link>
                  <Link href="/resources/blog" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Blog & News
                  </Link>
                  <Link href="/resources/case-studies" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Case Studies
                  </Link>
                  <Link href="/resources/whitepapers" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Whitepapers
                  </Link>
                  <Link href="/resources/research" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Research Papers
                  </Link>
                  <Link href="/support/documentation" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Documentation
                  </Link>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setCompanyOpen(true)}
                onMouseLeave={() => setCompanyOpen(false)}
                className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors font-medium"
              >
                Company
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {companyOpen && (
                <div
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                  className="absolute top-full left-0 mt-2 w-56 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2"
                >
                  <Link href="/about" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold border-b border-cyan-500/20">
                    About Us
                  </Link>
                  <Link href="/company/leadership" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Leadership Team
                  </Link>
                  <Link href="/team" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Our Team
                  </Link>
                  <Link href="/careers" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Careers
                  </Link>
                  <Link href="/company/partners" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Partners & Alliances
                  </Link>
                  <Link href="/company/awards" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Awards & Recognition
                  </Link>
                  <Link href="/company/press" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Press & Media
                  </Link>
                  <Link href="/investors" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Investors
                  </Link>
                </div>
              )}
            </div>

            {/* Portal Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setPortalOpen(true)}
                onMouseLeave={() => setPortalOpen(false)}
                className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors font-medium"
              >
                Portal
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {portalOpen && (
                <div
                  onMouseEnter={() => setPortalOpen(true)}
                  onMouseLeave={() => setPortalOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-blue-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-cyan-500/20 py-2"
                >
                  <Link href="/employee" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Employee Portal
                  </Link>
                  <Link href="/hr-dashboard" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    HR Dashboard
                  </Link>
                  <Link href="/hr-requests" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    HR Requests
                  </Link>
                  <Link href="/onboarding" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Onboarding Portal
                  </Link>
                  <Link href="/data-center-roadmap" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    Data Center Roadmap
                  </Link>
                  <Link href="/system-monitoring" className="block px-4 py-2 text-sm text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors">
                    System Monitoring
                  </Link>
                </div>
              )}
            </div>

            <Link href="/pricing" className="text-gray-200 hover:text-cyan-400 transition-colors font-medium">
              Pricing
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
          mobileMenuOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-1">
            <Link href="/" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Home
            </Link>
            <Link href="/about" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              About
            </Link>
            
            {/* Solutions Section */}
            <div className="px-4 py-2 text-cyan-400 font-semibold text-sm">SOLUTIONS</div>
            <Link href="/solutions" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              All Solutions
            </Link>
            <Link href="/solutions/aviation" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Aviation
            </Link>
            <Link href="/solutions/cybersecurity" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Cybersecurity
            </Link>
            <Link href="/solutions/education" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Education
            </Link>
            <Link href="/solutions/agi" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              AGI Research
            </Link>
            <Link href="/solutions/healthcare" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Healthcare
            </Link>
            <Link href="/solutions/finance" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Finance
            </Link>
            <Link href="/solutions/manufacturing" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Manufacturing
            </Link>
            <Link href="/solutions/retail" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Retail
            </Link>
            <Link href="/solutions/transportation" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Transportation
            </Link>
            <Link href="/solutions/energy" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Energy
            </Link>
            
            {/* Technology Section */}
            <div className="px-4 py-2 text-cyan-400 font-semibold text-sm mt-2">TECHNOLOGY</div>
            <Link href="/technology" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Platform Overview
            </Link>
            <Link href="/technology/machine-learning" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Machine Learning
            </Link>
            <Link href="/technology/nlp" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              NLP
            </Link>
            <Link href="/technology/computer-vision" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Computer Vision
            </Link>
            <Link href="/technology/robotics" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Robotics
            </Link>
            <Link href="/technology/data-analytics" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Data Analytics
            </Link>
            
            {/* Company Section */}
            <div className="px-4 py-2 text-cyan-400 font-semibold text-sm mt-2">COMPANY</div>
            <Link href="/company/leadership" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Leadership
            </Link>
            <Link href="/team" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Our Team
            </Link>
            <Link href="/careers" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Careers
            </Link>
            <Link href="/company/partners" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Partners
            </Link>
            
            {/* Resources */}
            <div className="px-4 py-2 text-cyan-400 font-semibold text-sm mt-2">RESOURCES</div>
            <Link href="/resources/blog" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Blog
            </Link>
            <Link href="/resources/case-studies" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Case Studies
            </Link>
            <Link href="/support/documentation" className="block px-4 py-2 pl-8 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded text-sm">
              Documentation
            </Link>
            
            <Link href="/investors" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Investors
            </Link>
            <Link href="/pricing" className="block px-4 py-3 text-gray-200 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors rounded">
              Pricing
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
