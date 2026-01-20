import { useState } from 'react';
import { Search, Calendar, TrendingUp, Cpu, Sparkles, Building2, Globe, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewsletterForm from '@/components/NewsletterForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  tags: string[];
  views: number;
};

const newsArticles: NewsArticle[] = [
  {
    id: 'am-av-occ-system-launch',
    title: 'Apex Meridian Launches Revolutionary AM-AV OCC System for Aviation Operations',
    excerpt: 'Enterprise-grade Operations Control Center platform transforms airline crew management with AI-driven compliance and intelligent scheduling',
    content: [
      'Apex Meridian, a leading provider of AI-powered solutions for critical industries, today announced the launch of the AM-AV OCC Web Dashboard, an enterprise-grade Operations Control Center platform designed specifically for airline operations management.',
      'The AM-AV OCC System represents a paradigm shift in how airlines manage crew scheduling, regulatory compliance, and operational oversight. By leveraging advanced artificial intelligence and machine learning, the platform automates complex scheduling tasks while maintaining zero-tolerance enforcement of aviation safety regulations.',
      'Key features include intelligent crew scheduling that reduces manual effort by 70%, AI-driven compliance engine for real-time validation against ICAO standards and Operations Manuals (OM-A through OM-G), real-time operations monitoring with live flight tracking and crew duty status, and multi-tenant architecture supporting multiple airline operators.',
      'Early adopters have reported significant improvements: 70% reduction in manual scheduling time, zero-tolerance enforcement of flight time limitations, enhanced pilot satisfaction through preference-based scheduling, complete audit readiness with immutable logs, and cost reduction through optimized crew utilization.'
    ],
    category: 'Product Launch',
    date: '2026-01-20',
    source: 'Apex Meridian',
    sourceUrl: '/news/am-av-occ-system-launch',
    imageUrl: '/images/news-am-av-launch.jpg',
    tags: ['Aviation', 'AI', 'Operations Management', 'Crew Scheduling', 'Compliance'],
    views: 0
  },
  {
    id: 'ai-scale-2025',
    title: 'AI at Scale: How 2025 Set the Stage for Agent-Driven Transformation',
    excerpt: 'KPMG report reveals 82% of leaders agree their industry\'s competitive landscape will look fundamentally different in the next 24 months as AI agents reshape business operations.',
    content: [
      'According to KPMG\'s latest AI Pulse survey, artificial intelligence is rewriting the business playbook with unprecedented speed. A striking 82% of industry leaders agree that their competitive landscape will look fundamentally different within the next 24 months, driven primarily by the rise of AI agents and autonomous systems.',
      'The report highlights three key trends defining 2025: First, the shift from predictive AI to agentic AI—systems that can take actions autonomously rather than simply providing recommendations. Second, the expansion of context windows in large language models, enabling AI to process and reason over much larger amounts of information. Third, the democratization of AI through open-source models achieving parity with proprietary systems.',
      'Enterprise adoption is accelerating rapidly. Companies are moving beyond pilot projects to full-scale deployments, with AI agents handling customer service, supply chain optimization, and even strategic decision-making. The technology is no longer a competitive advantage—it\'s becoming table stakes for survival.',
      'However, challenges remain. Data quality, model governance, and the need for human oversight are critical concerns. Organizations that succeed will be those that balance automation with human judgment, ensuring AI augments rather than replaces human capabilities.'
    ],
    category: 'Artificial Intelligence',
    date: '2025-01-15',
    source: 'KPMG',
    sourceUrl: 'https://kpmg.com/us/en/media/news/q4-ai-pulse.html',
    imageUrl: '/news-images/ai-trends-2025.jpg',
    tags: ['AI Agents', 'Enterprise AI', 'Business Transformation', 'Automation'],
    views: 15247
  },
  {
    id: 'gartner-tech-trends-2025',
    title: 'Gartner Unveils Top 10 Strategic Technology Trends for 2025',
    excerpt: 'Agentic AI leads Gartner\'s strategic technology trends, alongside quantum computing, spatial computing, and neurological enhancement technologies.',
    content: [
      'Gartner has released its highly anticipated Top 10 Strategic Technology Trends for 2025, with Agentic AI taking the top spot. These trends represent technologies that will have significant impact on organizations over the next three to five years.',
      'Agentic AI refers to autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional AI that requires human prompting, agentic AI can operate independently, learning and adapting over time. Applications range from autonomous vehicles to self-optimizing supply chains.',
      'Other key trends include AI Governance Platforms (addressing the critical need for responsible AI deployment), Disinformation Security (combating AI-generated fake content), Post-Quantum Cryptography (preparing for quantum computing threats), and Hybrid Computing (combining classical and quantum approaches).',
      'Energy-Efficient Computing also makes the list, reflecting growing concerns about AI\'s environmental impact. As models grow larger and more complex, the energy required for training and inference is becoming unsustainable. Innovations in chip design, cooling systems, and algorithmic efficiency are critical.',
      'Spatial Computing, Polyfunctional Robots, and Neurological Enhancement round out the top 10, pointing to a future where digital and physical worlds merge seamlessly, robots become more versatile, and human cognitive capabilities are augmented by technology.'
    ],
    category: 'Technology Trends',
    date: '2025-01-14',
    source: 'Gartner',
    sourceUrl: 'https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025',
    imageUrl: '/news-images/gartner-tech-trends.jpg',
    tags: ['Gartner', 'Tech Trends', 'Agentic AI', 'Quantum Computing', 'Spatial Computing'],
    views: 12893
  },
  {
    id: 'quantum-microchip-breakthrough',
    title: 'Microchip-Sized Device Accelerates Quantum Computing Future',
    excerpt: 'Researchers develop a microchip-sized device that controls laser frequencies with extreme precision, dramatically advancing quantum computing capabilities.',
    content: [
      'A groundbreaking development in quantum computing has emerged from a research team that created a microchip-sized device capable of controlling laser frequencies with unprecedented precision. This innovation addresses one of the fundamental challenges in building practical quantum computers: maintaining the delicate quantum states required for computation.',
      'Quantum computers rely on qubits—quantum bits that can exist in multiple states simultaneously. However, these qubits are extremely fragile and require precise control to maintain coherence. The new microchip device uses advanced photonic circuits to generate and control laser pulses with femtosecond precision, enabling more stable qubit operations.',
      'The device integrates multiple components—laser sources, modulators, and detectors—onto a single chip, dramatically reducing size, cost, and complexity. This miniaturization is crucial for scaling quantum computers from laboratory prototypes to practical systems.',
      'Applications extend beyond quantum computing. The device could revolutionize optical communications, enabling faster data transmission with lower error rates. It also has potential in precision sensing, medical imaging, and fundamental physics research.',
      'The research team is now working with industry partners to commercialize the technology. If successful, this could be a pivotal moment in the quantum revolution, making quantum computing more accessible and practical for real-world applications.'
    ],
    category: 'Quantum Computing',
    date: '2025-01-12',
    source: 'ScienceDaily',
    sourceUrl: 'https://www.sciencedaily.com/news/computers_math/artificial_intelligence/',
    imageUrl: '/news-images/microchip-tech.jpg',
    tags: ['Quantum Computing', 'Photonics', 'Microchips', 'Hardware Innovation'],
    views: 9654
  },
  {
    id: 'machine-learning-2025',
    title: 'Machine Learning 2025: From Predictive Models to Autonomous Decision-Making',
    excerpt: 'Machine learning has evolved from experimentation to become a core driver of business operations, innovation, and automation across industries in 2025.',
    content: [
      'Machine Learning (ML) has undergone a fundamental transformation in 2025, moving beyond predictive analytics to autonomous decision-making systems that drive core business operations. This evolution represents a maturation of the technology from experimental projects to mission-critical infrastructure.',
      'Key developments include the rise of reinforcement learning in production environments, where ML systems learn optimal strategies through trial and error. Applications range from dynamic pricing in e-commerce to real-time resource allocation in cloud computing. These systems continuously improve, adapting to changing conditions without human intervention.',
      'Transfer learning and few-shot learning have made ML more accessible to organizations with limited data. Instead of requiring millions of labeled examples, modern ML models can learn from just a few examples by leveraging knowledge from related tasks. This democratizes AI, enabling smaller companies to compete with tech giants.',
      'Edge ML is another major trend, with models running directly on devices rather than in the cloud. This reduces latency, improves privacy, and enables AI in environments without reliable internet connectivity. Applications include autonomous vehicles, industrial IoT, and medical devices.',
      'The integration of ML with other technologies—quantum computing, neuromorphic chips, and advanced sensors—is creating entirely new capabilities. We\'re entering an era where ML is not just a tool but the foundation of intelligent systems that perceive, reason, and act in the physical world.'
    ],
    category: 'Machine Learning',
    date: '2025-01-10',
    source: 'The Tech Whale',
    sourceUrl: 'https://www.thetechwhale.com/machine-learning-2025-from-predictive-models-to-autonomous-decision-making-across-industries/',
    imageUrl: '/news-images/ml-visualization.png',
    tags: ['Machine Learning', 'Reinforcement Learning', 'Edge AI', 'Transfer Learning'],
    views: 11234
  },
  {
    id: 'microchip-stock-surge',
    title: 'Microchip Technologies Stock Surges 32% on AI Momentum',
    excerpt: 'Microchip Technologies unveils industry\'s first 3nm PCIe Gen6 switch chip for high-speed AI connectivity, driving stock performance and market leadership.',
    content: [
      'Microchip Technologies has seen its stock surge 32% over the past year, driven by strong positioning in the AI infrastructure market. The company recently unveiled the industry\'s first 3nm PCIe Gen6 switch chip, designed specifically for high-speed AI connectivity in data centers.',
      'The new chip addresses a critical bottleneck in AI systems: data movement between GPUs, CPUs, and memory. As AI models grow larger and more complex, the ability to move data quickly and efficiently becomes paramount. Microchip\'s Gen6 switch delivers twice the bandwidth of previous generations while reducing power consumption by 30%.',
      'Beyond AI, Microchip is benefiting from recovery in automotive and industrial markets. The company\'s diverse product portfolio—microcontrollers, analog chips, and connectivity solutions—positions it well across multiple growth sectors. Management has revised sales outlook upward, signaling confidence in sustained demand.',
      'Analysts are bullish on Microchip\'s prospects, citing strong fundamentals and favorable market positioning. The company\'s focus on advanced silicon for AI, combined with its established presence in automotive and industrial applications, creates multiple growth drivers.',
      'Looking ahead, Microchip is investing heavily in R&D for next-generation technologies: photonic interconnects, chiplet architectures, and AI-optimized processors. These investments position the company to maintain leadership as the semiconductor industry evolves.'
    ],
    category: 'Tech Companies',
    date: '2025-01-08',
    source: 'Yahoo Finance',
    sourceUrl: 'https://finance.yahoo.com/news/32-past-microchip-technologies-stock-220011651.html',
    imageUrl: '/news-images/microchip-stock.jpg',
    tags: ['Microchip', 'Semiconductors', 'Stock Market', 'AI Infrastructure'],
    views: 8765
  },
  {
    id: 'neurips-2025-insights',
    title: 'Inside NeurIPS 2025: Foundation Models, Efficiency, and the Future of AI',
    excerpt: 'Key insights from NeurIPS 2025 reveal breakthroughs in gated attention, diffusion models, efficiency techniques, reinforcement learning, and AI agents.',
    content: [
      'The Neural Information Processing Systems (NeurIPS) 2025 conference showcased cutting-edge AI research, with several themes dominating discussions: foundation model efficiency, diffusion model breakthroughs, and the rise of AI agents.',
      'Gated attention mechanisms emerged as a key innovation for improving transformer efficiency. By selectively activating parts of the model based on input, gated attention reduces computational cost while maintaining or even improving performance. This enables larger models to run on smaller hardware.',
      'Diffusion models continue to advance, with new techniques for faster sampling and better controllability. Researchers demonstrated methods to generate high-quality images in just a few steps, down from hundreds in earlier models. Applications extend beyond images to video, 3D models, and even molecular structures.',
      'Efficiency was a recurring theme, reflecting concerns about AI\'s environmental impact and cost. Techniques like quantization, pruning, and knowledge distillation enable models to run with lower precision and fewer parameters, dramatically reducing energy consumption without sacrificing accuracy.',
      'Reinforcement learning (RL) saw significant progress, particularly in multi-agent systems and real-world robotics. New algorithms enable agents to learn from sparse rewards and generalize across tasks. The combination of RL with large language models is creating agents that can reason, plan, and execute complex tasks.',
      'The conference highlighted a shift from pure research to practical deployment. Many papers focused on making AI more reliable, interpretable, and aligned with human values—critical requirements for real-world applications.'
    ],
    category: 'AI Research',
    date: '2025-01-06',
    source: 'Adeia',
    sourceUrl: 'https://adeia.com/blog/inside-neurips-2025-adeia-perspective',
    imageUrl: '/news-images/ai-future-trends.jpg',
    tags: ['NeurIPS', 'Research Conference', 'Diffusion Models', 'Efficiency', 'RL'],
    views: 7892
  }
];

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Artificial Intelligence', 'Machine Learning', 'Quantum Computing', 'Tech Companies', 'Technology Trends', 'AI Research'];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalViews = newsArticles.reduce((sum, article) => sum + article.views, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Artificial Intelligence': return <Sparkles className="w-4 h-4" />;
      case 'Machine Learning': return <TrendingUp className="w-4 h-4" />;
      case 'Quantum Computing': return <Cpu className="w-4 h-4" />;
      case 'Tech Companies': return <Building2 className="w-4 h-4" />;
      case 'Technology Trends': return <Globe className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header />
      
      <main className="container py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">News</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Latest developments in AI, machine learning, quantum computing, and emerging technologies from around the world
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Articles</p>
                <p className="text-3xl font-bold text-white">{newsArticles.length}</p>
              </div>
              <Globe className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Categories</p>
                <p className="text-3xl font-bold text-white">{categories.length - 1}</p>
              </div>
              <Sparkles className="w-12 h-12 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64 bg-slate-900/50 border-cyan-500/30 text-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <p className="text-gray-400 mb-6">
          Showing {filteredArticles.length} of {newsArticles.length} articles
        </p>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredArticles.map(article => (
            <article key={article.id} className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/40 transition-all group">
              {article.imageUrl && (
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-cyan-400/50 flex items-center gap-2">
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-900/50 text-cyan-400 text-xs rounded-md border border-cyan-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                  <span className="text-cyan-400">{article.source}</span>
                </div>
                
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container max-w-4xl">
          <NewsletterForm variant="card" interests={['Tech News', 'AI', 'Innovation']} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
