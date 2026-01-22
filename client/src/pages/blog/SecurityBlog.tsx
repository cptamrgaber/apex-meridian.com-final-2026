import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, BookOpen, Search, ArrowRight, Clock, Tag } from "lucide-react";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedDate: string;
  url: string;
  featured: boolean;
}

const articles: BlogArticle[] = [
  {
    id: "ai-model-poisoning",
    title: "Securing AI Training Pipelines Against Model Poisoning",
    excerpt: "Comprehensive technical guide to defending AI training infrastructure from data poisoning, backdoor attacks, and adversarial manipulation. Learn about threat vectors, detection techniques, and defense strategies.",
    category: "AI Security",
    tags: ["AI Security", "Model Poisoning", "Data Integrity", "Threat Defense"],
    readTime: "15 min read",
    publishedDate: "January 2026",
    url: "/blog/ai-model-poisoning",
    featured: true,
  },
  {
    id: "zero-trust-aviation",
    title: "Zero Trust Implementation for Aviation Operations Centers",
    excerpt: "Technical implementation guide for Zero Trust security architecture in aviation operations centers with crew management and flight operations systems. Includes 12-month roadmap and success metrics.",
    category: "Zero Trust",
    tags: ["Zero Trust", "Aviation Security", "OCC", "Implementation Guide"],
    readTime: "18 min read",
    publishedDate: "January 2026",
    url: "/blog/zero-trust-aviation",
    featured: true,
  },
];

const categories = Array.from(new Set(articles.map(a => a.category)));
const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

export default function SecurityBlog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <SEO 
        title="Security Blog - Apex Meridian"
        description="In-depth technical articles on cybersecurity, AI security, Zero Trust architecture, and threat defense strategies from Apex Meridian security experts."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-slate-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="h-12 w-12 text-cyan-400" />
            <BookOpen className="h-12 w-12 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mb-8">
            In-depth technical articles on AI security, Zero Trust architecture, threat defense strategies, and cybersecurity best practices from our security engineering team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-slate-800/50 text-white border-slate-700 focus:border-cyan-400 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-300 font-semibold">Categories:</span>
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={!selectedCategory ? "default" : "outline"}
              className={!selectedCategory ? "bg-cyan-500 hover:bg-cyan-600" : ""}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={selectedCategory === cat ? "bg-cyan-500 hover:bg-cyan-600" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center mt-4">
            <span className="text-gray-300 font-semibold">Tags:</span>
            <Button
              onClick={() => setSelectedTag(null)}
              variant={!selectedTag ? "default" : "outline"}
              size="sm"
              className={!selectedTag ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                className={selectedTag === tag ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-12">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <Link key={article.id} href={article.url}>
                  <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all cursor-pointer group h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
                        {article.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-800/50 text-gray-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{article.publishedDate}</span>
                      <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
                        Read Article
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      {regularArticles.length > 0 && (
        <section className="py-20 bg-blue-950/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-12">All Articles</h2>
            <div className="grid grid-cols-1 gap-6">
              {regularArticles.map(article => (
                <Link key={article.id} href={article.url}>
                  <div className="bg-gradient-to-br from-slate-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/40 transition-all cursor-pointer group">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
                            {article.category}
                          </span>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime}
                          </div>
                          <span className="text-gray-400 text-sm">{article.publishedDate}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-800/50 text-gray-400 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform">
                        Read
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              Clear Filters
            </Button>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Security Expertise?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our security team can help you design and implement enterprise-grade security architecture tailored to your environment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/security-assessment">
              <Button className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg">
                Take Security Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-6 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold text-lg">
                Contact Security Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
