import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen, Calendar, User, Tag, Clock, TrendingUp, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewsletterForm from '@/components/NewsletterForm';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  videoUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 'arabert-arabic-nlp',
    title: 'From 60M Tweets to Production: How AraBERT Revolutionized Arabic NLP',
    excerpt: 'Explore how the American University of Beirut\'s MIND Lab trained transformer models on 200M Arabic sentences and 60M dialect tweets, achieving state-of-the-art performance. This deep-dive covers vocabulary innovations, preprocessing breakthroughs, and real-world applications in Egyptian Arabic understanding.',
    author: 'Dr. Ahmed Hassan',
    authorRole: 'Senior NLP Researcher, AUC Partnership',
    date: '2025-01-15',
    readTime: '12 min read',
    category: 'Natural Language Processing',
    tags: ['AraBERT', 'Transformers', 'Arabic NLP', 'Hugging Face'],
    image: '/api/placeholder/800/400',
    views: 4247,
    videoUrl: 'https://www.youtube.com/watch?v=N9pQ3CZ0v6U',
    githubUrl: 'https://github.com/aub-mind/arabert',
    paperUrl: 'https://aclanthology.org/2020.osact-1.2/'
  },
  {
    id: 'photonic-quantum-computing',
    title: 'Light-Speed Computing: Zewail City\'s Photonic Quantum Breakthrough',
    excerpt: 'Muhammad AbuGhanem\'s groundbreaking research on photonic quantum computing demonstrates how encoding information in photons can revolutionize computational speed. Learn about Zewail City\'s contributions to quantum hardware and Egypt\'s emerging role in quantum research.',
    author: 'Dr. Yasmine Khalil',
    authorRole: 'Director, Quantum Computing Lab',
    date: '2025-01-10',
    readTime: '14 min read',
    category: 'Quantum Computing',
    tags: ['Photonics', 'Quantum Computing', 'Zewail City', 'Hardware'],
    image: '/api/placeholder/800/400',
    views: 3892,
    videoUrl: 'https://www.youtube.com/watch?v=xL383DseSpE',
    paperUrl: 'https://arxiv.org/html/2409.08229v1'
  },
  {
    id: 'cairo-5g-iot-security',
    title: 'From Campus to Cloud: Cairo University\'s 5G and IoT Security Research',
    excerpt: 'Cairo University\'s Faculty of Computers and AI is pioneering research in 5G network transformation and fog computing for intrusion detection. Discover the CAMPIE project—a campus-wide IoT experimentation platform—and how it\'s shaping Egypt\'s smart city infrastructure.',
    author: 'Prof. Dr. Mohamed El-Sayed',
    authorRole: 'Dean, Faculty of Computers and AI, Cairo University',
    date: '2025-01-05',
    readTime: '11 min read',
    category: 'Network Security',
    tags: ['5G', 'IoT', 'Cybersecurity', 'Cairo University', 'CAMPIE'],
    image: '/api/placeholder/800/400',
    views: 3156,
    githubUrl: 'https://github.com/FCAI-CairoUniversity'
  },
  {
    id: 'hybrid-quantum-classical-ml',
    title: 'Bridging Two Worlds: Hybrid Quantum-Classical Machine Learning with PennyLane',
    excerpt: 'PennyLane\'s framework enables seamless integration of quantum circuits with PyTorch, TensorFlow, and JAX. Explore how Zewail City researchers are leveraging hybrid algorithms for drug discovery and optimization problems, achieving 10x speedups in specific applications.',
    author: 'Dr. Layla Ibrahim',
    authorRole: 'Assistant Professor, Quantum ML Research',
    date: '2024-12-28',
    readTime: '13 min read',
    category: 'Quantum Machine Learning',
    tags: ['PennyLane', 'Hybrid Computing', 'Drug Discovery', 'Optimization'],
    image: '/api/placeholder/800/400',
    views: 4531,
    videoUrl: 'https://www.youtube.com/playlist?list=PL_hJxz_HrXxsQNJHWp10up8x-hwd5uwr0',
    githubUrl: 'https://github.com/PennyLaneAI/pennylane'
  },
  {
    id: 'medical-ai-explainability',
    title: 'Building Trust: Explainable AI in Egyptian Hospital Deployments',
    excerpt: 'When Cairo University deployed medical imaging AI in 10 hospitals, accuracy alone wasn\'t enough. Doctors needed to understand AI decisions. Learn how SHAP and LIME techniques are making AI transparent in Egyptian healthcare, with real case studies from chest X-ray classification.',
    author: 'Dr. Nour El-Deen M. Khalifa',
    authorRole: 'Lecturer, Medical AI Research, Cairo University',
    date: '2024-12-20',
    readTime: '10 min read',
    category: 'Medical AI',
    tags: ['Healthcare', 'Explainable AI', 'SHAP', 'LIME', 'Ethics'],
    image: '/api/placeholder/800/400',
    views: 2934
  },
  {
    id: 'deep-learning-image-augmentation',
    title: 'A Comprehensive Survey: Deep Learning for Digital Image Augmentation',
    excerpt: 'Dr. Amir Mohamad from Cairo University presents cutting-edge techniques in deep learning-based image augmentation. This research review covers GANs, diffusion models, and neural style transfer—essential tools for improving model robustness when training data is limited.',
    author: 'Dr. Amir Mohamad',
    authorRole: 'Associate Professor, Cairo University FCAI',
    date: '2024-12-15',
    readTime: '15 min read',
    category: 'Computer Vision',
    tags: ['Deep Learning', 'Image Augmentation', 'GANs', 'Computer Vision'],
    image: '/api/placeholder/800/400',
    views: 3789
  },
  {
    id: 'generative-ai-quantum-cybersecurity',
    title: 'The Convergence: Generative AI and Quantum Computing in Cybersecurity',
    excerpt: 'Prof. Khaled Youssef explores how generative AI and quantum computing are simultaneously creating new cybersecurity threats and defenses. From quantum-resistant cryptography to AI-powered threat detection, discover the future of security in the quantum era.',
    author: 'Prof. Khaled Youssef',
    authorRole: 'Cybersecurity Expert, Cairo University',
    date: '2024-12-08',
    readTime: '12 min read',
    category: 'Cybersecurity',
    tags: ['Generative AI', 'Quantum Computing', 'Cryptography', 'Security'],
    image: '/api/placeholder/800/400',
    views: 4123
  },
  {
    id: 'federated-learning-privacy',
    title: 'Federated Learning: Privacy-Preserving Medical AI Across Egyptian Hospitals',
    excerpt: 'How do you train AI on sensitive medical data without compromising patient privacy? Federated learning enables collaborative model training while keeping data decentralized. We share our experience implementing federated learning across multiple Egyptian hospitals with Cairo University.',
    author: 'Dr. Mustafa Ashry',
    authorRole: 'Lecturer, Cairo University FCAI',
    date: '2024-12-01',
    readTime: '11 min read',
    category: 'Privacy & Security',
    tags: ['Federated Learning', 'Privacy', 'Healthcare', 'Distributed AI'],
    image: '/api/placeholder/800/400',
    views: 2645
  }
];

export default function ResearchBlog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const uniqueCategories = new Set(blogPosts.map(post => post.category)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header />
      
      <main className="container py-20">
        {/* Header */}
        <div className="mb-12">
          <Link href="/solutions/agi">
            <a className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AGI Research
            </a>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Research <span className="text-cyan-400">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Insights, project updates, and behind-the-scenes stories from our ongoing research collaborations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Posts</p>
                <p className="text-3xl font-bold text-white">{blogPosts.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-cyan-400 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Views</p>
                <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-cyan-400 opacity-50" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Categories</p>
                <p className="text-3xl font-bold text-white">{uniqueCategories}</p>
              </div>
              <Filter className="w-12 h-12 text-cyan-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64 bg-slate-900/50 border-cyan-500/30 text-white">
              <SelectValue placeholder="Filter by category" />
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <Link key={post.id} href={`/research/blog/${post.id}`}>
              <a className="group">
                <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 h-full flex flex-col">
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-cyan-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-900/50 text-cyan-400 text-xs rounded-md border border-cyan-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container max-w-4xl">
          <NewsletterForm variant="card" interests={['Research', 'AI', 'Technology']} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
