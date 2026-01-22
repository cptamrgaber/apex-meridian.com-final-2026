import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, BookOpen, Video, Users, Target, Briefcase, Code, Search, Filter } from "lucide-react";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SecurityResources() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const personas = [
    {
      id: "ciso",
      title: "CISO / Security Leader",
      icon: Shield,
      description: "Strategic security architecture, compliance frameworks, and risk management",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "cto",
      title: "CTO / Technical Leader",
      icon: Briefcase,
      description: "Technical implementation guides, architecture patterns, and integration strategies",
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "engineer",
      title: "Security Engineer",
      icon: Code,
      description: "Hands-on implementation, configuration examples, and technical deep dives",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const resources = [
    {
      id: 1,
      type: "assessment",
      title: "Security Assessment Tool",
      description: "Interactive 21-question assessment to evaluate your security posture across 7 domains with personalized recommendations",
      personas: ["ciso", "cto", "engineer"],
      link: "/security-assessment",
      icon: Target,
      badge: "Interactive",
    },
    {
      id: 2,
      type: "blog",
      title: "Securing AI Training Pipelines Against Model Poisoning",
      description: "Technical guide covering threat vectors, detection techniques, and defense strategies for AI model security",
      personas: ["cto", "engineer"],
      link: "/blog/ai-model-poisoning",
      icon: BookOpen,
      badge: "15 min read",
    },
    {
      id: 3,
      type: "blog",
      title: "Zero Trust Implementation for Aviation Operations Centers",
      description: "Implementation roadmap for Zero Trust architecture in aviation OCC environments with crew management systems",
      personas: ["ciso", "cto", "engineer"],
      link: "/blog/zero-trust-aviation",
      icon: BookOpen,
      badge: "18 min read",
    },
    {
      id: 4,
      type: "case-study",
      title: "Aviation Security Transformation Case Study",
      description: "How a regional aviation operator reduced security incidents by 94% with AI-augmented threat detection",
      personas: ["ciso", "cto"],
      link: "/case-studies/cybersecurity",
      icon: FileText,
      badge: "Success Story",
    },
    {
      id: 5,
      type: "case-study",
      title: "AM-AV OCC System Implementation",
      description: "Regional carrier achieves 70% scheduling time reduction and zero compliance violations with AI-powered crew management",
      personas: ["ciso", "cto"],
      link: "/case-studies/amav",
      icon: FileText,
      badge: "Success Story",
    },
    {
      id: 6,
      type: "video",
      title: "Security Architecture Transformation Demo",
      description: "Video walkthrough of before/after security architecture implementation with real metrics",
      personas: ["ciso", "cto", "engineer"],
      link: "/case-studies/cybersecurity",
      icon: Video,
      badge: "8:45 video",
    },
    {
      id: 7,
      type: "video",
      title: "AM-AV OCC System Workflow Demo",
      description: "Complete demonstration of crew scheduling automation, compliance checking, and AI-powered rostering",
      personas: ["cto", "engineer"],
      link: "/case-studies/amav",
      icon: Video,
      badge: "12:30 video",
    },
  ];

  const resourceTypes = [
    { id: "all", label: "All Resources", count: resources.length },
    { id: "assessment", label: "Assessments", count: resources.filter(r => r.type === "assessment").length },
    { id: "blog", label: "Technical Blogs", count: resources.filter(r => r.type === "blog").length },
    { id: "case-study", label: "Case Studies", count: resources.filter(r => r.type === "case-study").length },
    { id: "video", label: "Video Demos", count: resources.filter(r => r.type === "video").length },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesPersona = !selectedPersona || resource.personas.includes(selectedPersona);
    const matchesType = !selectedType || selectedType === "all" || resource.type === selectedType;
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPersona && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO 
        title="Security Resources Hub - Apex Meridian"
        description="Comprehensive cybersecurity resources including assessments, technical blogs, case studies, and implementation guides for CISOs, CTOs, and security engineers"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="h-12 w-12 text-cyan-400" />
              <h1 className="text-5xl font-bold text-white">Security Resources Hub</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity resources tailored for security leaders, technical executives, and implementation teams. 
              Explore assessments, technical guides, case studies, and implementation roadmaps.
            </p>
          </div>

          {/* Persona Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Choose Your Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personas.map((persona) => {
                const Icon = persona.icon;
                const isSelected = selectedPersona === persona.id;
                return (
                  <Card
                    key={persona.id}
                    onClick={() => setSelectedPersona(isSelected ? null : persona.id)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? `bg-gradient-to-br ${persona.color} border-white/30 shadow-xl scale-105`
                        : "bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-cyan-500/20 hover:border-cyan-500/40"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`rounded-lg p-3 ${isSelected ? "bg-white/20" : "bg-cyan-500/20"}`}>
                          <Icon className={`h-8 w-8 ${isSelected ? "text-white" : "text-cyan-400"}`} />
                        </div>
                        {isSelected && (
                          <span className="ml-auto bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Selected
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{persona.title}</h3>
                      <p className={`text-sm ${isSelected ? "text-white/90" : "text-gray-300"}`}>
                        {persona.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
            {selectedPersona && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setSelectedPersona(null)}
                  variant="outline"
                  className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </div>

          {/* Search and Filter */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 text-white border-slate-700 focus:border-cyan-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {resourceTypes.map((type) => (
                    <Button
                      key={type.id}
                      onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                      variant="outline"
                      size="sm"
                      className={`${
                        selectedType === type.id || (!selectedType && type.id === "all")
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                          : "border-slate-700 text-gray-400 hover:border-cyan-500/40"
                      }`}
                    >
                      {type.label} ({type.count})
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No resources found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {selectedPersona
                    ? `Resources for ${personas.find(p => p.id === selectedPersona)?.title}`
                    : "All Resources"}
                </h2>
                <p className="text-gray-400 mt-2">
                  Showing {filteredResources.length} of {resources.length} resources
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <Link key={resource.id} href={resource.link}>
                      <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="bg-cyan-500/20 rounded-lg p-3">
                              <Icon className="h-8 w-8 text-cyan-400" />
                            </div>
                            <span className="bg-blue-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
                              {resource.badge}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{resource.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-4">
                            {resource.description}
                          </p>
                          <Button
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
                          >
                            Access Resource →
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Need Custom Security Solutions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our security team can design and implement enterprise-grade security architecture tailored to your operational requirements and regulatory constraints.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-6 text-lg">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/security-assessment">
              <Button variant="outline" className="border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-6 text-lg">
                Start Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
