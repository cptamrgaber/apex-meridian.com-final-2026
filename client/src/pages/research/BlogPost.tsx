import { Link, useParams } from 'wouter';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

type BlogPostData = {
  id: string;
  title: string;
  content: string[];
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
};

const blogPostsData: Record<string, BlogPostData> = {
  post1: {
    id: 'post1',
    title: 'Breaking Through: Our Journey to 95% Accuracy in Arabic Dialect Understanding',
    content: [
      'After two years of intensive research collaboration with the American University in Cairo, our team achieved a major breakthrough in Arabic natural language processing. We developed a neural-symbolic architecture that reaches 95% accuracy in understanding multiple Arabic dialects—a significant leap forward for the 400 million Arabic speakers worldwide.',
      'The journey wasn\'t straightforward. Arabic presents unique challenges for NLP systems: it has numerous dialects that differ significantly from Modern Standard Arabic, right-to-left script, and complex morphology. Traditional deep learning approaches struggled to capture the nuanced differences between dialects while maintaining robust performance.',
      'Our breakthrough came from combining two complementary approaches: deep learning for pattern recognition and symbolic reasoning for linguistic structure. The neural component learns statistical patterns from large datasets, while the symbolic component encodes linguistic rules and relationships. This hybrid architecture allows the system to generalize better across dialects and handle edge cases that pure neural networks miss.',
      'We trained our model on a diverse corpus of Egyptian, Levantine, Gulf, and Maghrebi Arabic texts, carefully curated to represent real-world usage across social media, news, and conversational contexts. The key innovation was our attention mechanism that dynamically balances neural and symbolic reasoning based on input characteristics.',
      'The results exceeded our expectations. On benchmark datasets, our system achieved 95% accuracy in dialect identification and 92% in sentiment analysis across dialects. More importantly, it demonstrated robust performance on out-of-distribution examples—a critical requirement for real-world deployment.',
      'This research opens new possibilities for Arabic language technology. We\'re now working with partners to deploy the system in customer service applications, social media monitoring, and educational tools. The impact extends beyond technology: by making AI more accessible to Arabic speakers, we\'re helping preserve linguistic diversity in the digital age.',
      'Looking ahead, we\'re exploring how these techniques can be applied to other low-resource languages and investigating ways to make the system more interpretable and culturally aware. The journey continues, and we\'re excited about what comes next.'
    ],
    author: 'Dr. Ahmed Hassan',
    authorRole: 'Director, AI Research Lab',
    authorBio: 'Dr. Ahmed Hassan leads the AI Research Lab at AUC, focusing on neural-symbolic AI and Arabic NLP. He holds a PhD from Stanford University and has published extensively on hybrid AI architectures.',
    date: '2024-08-15',
    readTime: '8 min read',
    category: 'Research Insights',
    tags: ['NLP', 'Arabic AI', 'Neural-Symbolic', 'Language Technology'],
    views: 2847
  },
  post2: {
    id: 'post2',
    title: 'From Lab to Farm: Deploying AI in Egyptian Agriculture',
    content: [
      'When we first proposed deploying computer vision systems across Egyptian farms, many were skeptical. Could AI really work in dusty, unpredictable agricultural environments? Two years later, our precision agriculture project has expanded to over 50 farms across the Nile Delta, demonstrating 30% yield improvements and 40% water savings.',
      'The journey from laboratory prototype to field deployment taught us invaluable lessons about building AI systems for resource-constrained environments. Our initial models, trained on pristine datasets from controlled environments, struggled with the reality of Egyptian farmland: variable lighting conditions, dust-covered sensors, and intermittent connectivity.',
      'We had to rethink our entire approach. Instead of requiring high-resolution cameras and constant internet connectivity, we developed a system that works with affordable smartphones and operates offline. The computer vision models were optimized to run on edge devices, processing images locally and syncing data when connectivity is available.',
      'The system monitors crop health by analyzing leaf color and texture, detects pest infestations early, and optimizes irrigation schedules based on real-time soil moisture data. Farmers receive actionable recommendations through a simple mobile app in Arabic, with visual indicators that don\'t require technical expertise.',
      'One of our most important innovations was involving farmers in the design process from day one. We conducted extensive field visits, observed farming practices, and incorporated traditional agricultural knowledge into our AI models. This co-design approach ensured the technology complemented rather than replaced farmers\' expertise.',
      'The results speak for themselves. Participating farms have seen significant improvements in crop yields while reducing water consumption—a critical benefit in water-scarce Egypt. More importantly, farmers report feeling empowered by the technology rather than intimidated by it.',
      'We\'re now scaling the project to other regions and crops, working with the Egyptian Ministry of Agriculture to integrate our system into national agricultural extension services. The goal is to make precision agriculture accessible to smallholder farmers across Egypt and beyond.'
    ],
    author: 'Prof. Dr. Mohamed El-Sayed',
    authorRole: 'Dean, Faculty of Computers and AI',
    authorBio: 'Prof. Dr. Mohamed El-Sayed is Dean of the Faculty of Computers and AI at Cairo University. His research focuses on applied AI solutions for developing countries, particularly in agriculture and healthcare.',
    date: '2024-07-22',
    readTime: '10 min read',
    category: 'Applied AI',
    tags: ['Agriculture', 'Computer Vision', 'Impact', 'Sustainability'],
    views: 3156
  },
  post3: {
    id: 'post3',
    title: 'Quantum Meets Classical: Our Hybrid ML Breakthrough',
    content: [
      'Quantum computing promises exponential speedups for certain problems, but practical quantum computers remain limited in size and prone to errors. Classical machine learning excels at pattern recognition but struggles with combinatorial optimization. What if we could combine the strengths of both?',
      'Our research at Zewail City of Science explores hybrid quantum-classical machine learning algorithms that achieve the best of both worlds. We developed an approach that uses quantum processors for optimization while leveraging classical neural networks for feature extraction and post-processing.',
      'The key insight was recognizing that many real-world problems have a structure that can be decomposed into quantum-friendly and classical-friendly components. For example, in drug discovery, quantum algorithms can efficiently explore the vast space of molecular configurations, while classical networks can predict biological activity based on molecular features.',
      'We demonstrated our approach on several benchmark optimization problems, achieving 10x speedups compared to purely classical methods. More importantly, our hybrid algorithm is robust to quantum noise and works effectively on current noisy intermediate-scale quantum (NISQ) devices.',
      'The implications for drug discovery are particularly exciting. Traditional computational drug design requires evaluating millions of molecular candidates—a process that can take months or years. Our hybrid approach reduces this to days or weeks, potentially accelerating the development of new medicines.',
      'We\'re now collaborating with pharmaceutical companies to apply our methods to real drug discovery projects. Early results are promising, with our system identifying several novel drug candidates that are now entering experimental validation.',
      'Looking forward, as quantum computers continue to improve, our hybrid approach will become even more powerful. We\'re exploring applications in materials science, financial optimization, and logistics—any domain where combinatorial optimization meets pattern recognition.'
    ],
    author: 'Dr. Yasmine Khalil',
    authorRole: 'Director, Center for Advanced Sciences',
    authorBio: 'Dr. Yasmine Khalil directs the Center for Advanced Sciences at Zewail City, focusing on quantum computing and neuromorphic AI. She completed her PhD at MIT and has published groundbreaking work on quantum machine learning.',
    date: '2024-06-10',
    readTime: '12 min read',
    category: 'Quantum Computing',
    tags: ['Quantum ML', 'Optimization', 'Innovation', 'Drug Discovery'],
    views: 4231
  }
};

export default function BlogPost() {
  const params = useParams();
  const postId = params.id || 'post1';
  const post = blogPostsData[postId];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/research/blog">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/research/blog">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </button>
          </Link>

          {/* Article Header */}
          <article className="bg-blue-900/50 backdrop-blur-sm rounded-xl p-8 sm:p-12 border border-cyan-500/20">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-cyan-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-950/50 text-cyan-400 rounded-lg text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <div className="mt-8 pt-8 border-t border-cyan-500/20">
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.content[0].substring(0, 100) + '...',
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share this post
              </Button>
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-8 bg-blue-900/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{post.author}</h4>
                <p className="text-cyan-400 text-sm mb-2">{post.authorRole}</p>
                <p className="text-gray-300">{post.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Related Posts CTA */}
          <div className="mt-8 text-center">
            <Link href="/research/blog">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                <BookOpen className="w-4 h-4 mr-2" />
                Read More Posts
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
