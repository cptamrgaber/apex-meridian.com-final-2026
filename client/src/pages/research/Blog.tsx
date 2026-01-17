import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen, Calendar, User, Tag, Clock, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
};

const blogPosts: BlogPost[] = [
  {
    id: 'post1',
    title: 'Breaking Through: Our Journey to 95% Accuracy in Arabic Dialect Understanding',
    excerpt: 'After two years of intensive research with AUC, we achieved a major breakthrough in Arabic NLP. This post shares the challenges we overcame and the innovative approaches that made it possible.',
    author: 'Dr. Ahmed Hassan',
    authorRole: 'Director, AI Research Lab',
    date: '2024-08-15',
    readTime: '8 min read',
    category: 'Research Insights',
    tags: ['NLP', 'Arabic AI', 'Neural-Symbolic'],
    image: '/api/placeholder/800/400',
    views: 2847
  },
  {
    id: 'post2',
    title: 'From Lab to Farm: Deploying AI in Egyptian Agriculture',
    excerpt: 'Our precision agriculture project has expanded to 50+ farms across the Nile Delta. Learn about the real-world challenges of deploying computer vision systems in resource-constrained environments.',
    author: 'Prof. Dr. Mohamed El-Sayed',
    authorRole: 'Dean, Faculty of Computers and AI',
    date: '2024-07-22',
    readTime: '10 min read',
    category: 'Applied AI',
    tags: ['Agriculture', 'Computer Vision', 'Impact'],
    image: '/api/placeholder/800/400',
    views: 3156
  },
  {
    id: 'post3',
    title: 'Quantum Meets Classical: Our Hybrid ML Breakthrough',
    excerpt: 'Achieving 10x speedup in optimization problems seemed impossible—until we combined quantum and classical approaches. Here\'s how we did it and what it means for drug discovery.',
    author: 'Dr. Yasmine Khalil',
    authorRole: 'Director, Center for Advanced Sciences',
    date: '2024-06-10',
    readTime: '12 min read',
    category: 'Quantum Computing',
    tags: ['Quantum ML', 'Optimization', 'Innovation'],
    image: '/api/placeholder/800/400',
    views: 4231
  },
  {
    id: 'post4',
    title: 'Building Trust: Explainable AI in Egyptian Hospitals',
    excerpt: 'When we deployed our medical imaging AI in 10 hospitals, we learned that accuracy alone isn\'t enough. Doctors need to understand why the AI makes its decisions. Here\'s our approach to explainability.',
    author: 'Dr. Layla Ibrahim',
    authorRole: 'Assistant Professor, Cairo University',
    date: '2024-05-18',
    readTime: '9 min read',
    category: 'Medical AI',
    tags: ['Healthcare', 'Explainable AI', 'Ethics'],
    image: '/api/placeholder/800/400',
    views: 2934
  },
  {
    id: 'post5',
    title: 'Neuromorphic Chips: Rethinking AI Hardware from the Ground Up',
    excerpt: 'Traditional processors weren\'t designed for AI. We built a brain-inspired chip that achieves 100x energy efficiency. This is the story of our neuromorphic computing journey.',
    author: 'Dr. Yasmine Khalil',
    authorRole: 'Director, Center for Advanced Sciences',
    date: '2024-04-25',
    readTime: '11 min read',
    category: 'Hardware Innovation',
    tags: ['Neuromorphic', 'Energy Efficiency', 'Chips'],
    image: '/api/placeholder/800/400',
    views: 3789
  },
  {
    id: 'post6',
    title: 'Federated Learning: Privacy-Preserving Medical AI Across Hospitals',
    excerpt: 'How do you train AI on sensitive medical data without compromising patient privacy? Federated learning is the answer. We share our experience implementing it across multiple Egyptian hospitals.',
    author: 'Prof. Dr. Mohamed El-Sayed',
    authorRole: 'Dean, Faculty of Computers and AI',
    date: '2024-03-30',
    readTime: '10 min read',
    category: 'Privacy & Security',
    tags: ['Federated Learning', 'Privacy', 'Healthcare'],
    image: '/api/placeholder/800/400',
    views: 2645
  },
  {
    id: 'post7',
    title: 'AI Ethics in Middle Eastern Contexts: What We Learned',
    excerpt: 'Ethical AI frameworks developed in the West don\'t always translate to Middle Eastern contexts. Our research explores culturally-appropriate approaches to AI ethics and value alignment.',
    author: 'Dr. Ahmed Hassan',
    authorRole: 'Director, AI Research Lab',
    date: '2024-02-14',
    readTime: '13 min read',
    category: 'Ethics & Society',
    tags: ['AI Ethics', 'Cultural Values', 'Policy'],
    image: '/api/placeholder/800/400',
    views: 3421
  },
  {
    id: 'post8',
    title: 'Cairo Traffic AI: Reducing Congestion by 20% with Machine Learning',
    excerpt: 'Cairo\'s traffic is legendary. We deployed an AI-powered traffic management system that reduced congestion by 20%. Here\'s how reinforcement learning is making Egyptian cities smarter.',
    author: 'Dr. Hassan Mahmoud',
    authorRole: 'Research Scientist, Cairo University',
    date: '2024-01-20',
    readTime: '8 min read',
    category: 'Smart Cities',
    tags: ['Traffic AI', 'Urban Planning', 'Reinforcement Learning'],
    image: '/api/placeholder/800/400',
    views: 4567
  }
];

const categories = ['All Categories', 'Research Insights', 'Applied AI', 'Quantum Computing', 'Medical AI', 'Hardware Innovation', 'Privacy & Security', 'Ethics & Society', 'Smart Cities'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const totalViews = filteredPosts.reduce((sum, post) => sum + post.views, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/solutions/agi">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to AGI Research
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <BookOpen className="h-12 w-12 text-cyan-400 mr-4" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Research Blog</h1>
                <p className="text-lg text-gray-300 mt-2">
                  Insights, stories, and updates from our research partnerships
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Posts</p>
                  <p className="text-3xl font-bold text-white mt-1">{filteredPosts.length}</p>
                </div>
                <BookOpen className="h-10 w-10 text-cyan-400" />
              </div>
            </div>
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Views</p>
                  <p className="text-3xl font-bold text-white mt-1">{totalViews.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-cyan-400" />
              </div>
            </div>
            <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Categories</p>
                  <p className="text-3xl font-bold text-white mt-1">{categories.length - 1}</p>
                </div>
                <Tag className="h-10 w-10 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts, tags, topics..."
                  className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/research/blog/${post.id}`}>
                <div className="bg-blue-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer h-full flex flex-col">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-800 to-cyan-800 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-cyan-400/50" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-blue-950/50 text-gray-400 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-cyan-500/20">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
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
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No blog posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
