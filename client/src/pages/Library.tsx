import { useState } from 'react';
import { Book, FileText, GraduationCap, Globe, Search, Filter, ExternalLink, Download, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface LibraryResource {
  id: string;
  title: string;
  titleAr?: string;
  authors: string;
  type: 'book' | 'paper' | 'course' | 'whitepaper';
  category: string;
  language: string;
  level: string;
  description: string;
  link: string;
  pdfLink?: string;
  year?: number;
  pages?: number;
  free?: boolean;
}

const libraryResources: LibraryResource[] = [
  // English Foundational Textbooks
  {
    id: 'ai-modern-approach',
    title: 'Artificial Intelligence: A Modern Approach',
    authors: 'Stuart Russell & Peter Norvig',
    type: 'book',
    category: 'Foundational',
    language: 'English',
    level: 'Advanced',
    description: 'The quintessential AI textbook covering search algorithms, knowledge representation, machine learning, robotics, and NLP. Over 1000 pages of comprehensive content.',
    link: 'https://aima.cs.berkeley.edu/',
    year: 2020,
    pages: 1136,
    free: false,
  },
  {
    id: 'deep-learning-goodfellow',
    title: 'Deep Learning',
    authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Advanced',
    description: 'Graduate-level textbook covering neural networks, optimization, CNNs, RNNs, and regularization. Free online version available.',
    link: 'https://www.deeplearningbook.org/',
    pdfLink: 'https://www.deeplearningbook.org/',
    year: 2016,
    free: true,
  },
  {
    id: 'd2l-ai',
    title: 'Dive into Deep Learning',
    authors: 'Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'Interactive deep learning book with PyTorch, TensorFlow, and JAX implementations. Adopted at 500+ universities worldwide.',
    link: 'https://d2l.ai/',
    pdfLink: 'https://d2l.ai/d2l-en.pdf',
    year: 2023,
    free: true,
  },
  // Contemporary AI Books
  {
    id: 'singularity-nearer',
    title: 'The Singularity Is Nearer: When We Merge with AI',
    authors: 'Ray Kurzweil',
    type: 'book',
    category: 'Future & Ethics',
    language: 'English',
    level: 'Beginner',
    description: 'Explores AI singularity, transhumanism, and exponential technology growth. Predicts AGI by 2029.',
    link: 'https://www.amazon.com/Singularity-Nearer-When-Merge-AI/dp/0593593952',
    year: 2024,
    free: false,
  },
  {
    id: 'alignment-problem',
    title: 'The Alignment Problem: Machine Learning and Human Values',
    authors: 'Brian Christian',
    type: 'book',
    category: 'Future & Ethics',
    language: 'English',
    level: 'Intermediate',
    description: 'Essential reading on AI safety, ethics, and value alignment. Explores how to ensure AI systems do what humans intend.',
    link: 'https://www.amazon.com/Alignment-Problem-Machine-Learning-Values/dp/0393868338',
    year: 2020,
    free: false,
  },
  {
    id: 'supremacy-olson',
    title: 'Supremacy: AI, ChatGPT, and the Race that Will Change the World',
    authors: 'Parmy Olson',
    type: 'book',
    category: 'Industry & Business',
    language: 'English',
    level: 'Beginner',
    description: '2024 Financial Times Business Book of the Year. Behind-the-scenes look at OpenAI vs Google competition.',
    link: 'https://www.amazon.com/Supremacy-ChatGPT-Race-Change-World/dp/1250284317',
    year: 2024,
    free: false,
  },
  {
    id: 'nexus-harari',
    title: 'Nexus: A Brief History of Information Networks from the Stone Age to AI',
    authors: 'Yuval Noah Harari',
    type: 'book',
    category: 'Future & Ethics',
    language: 'English',
    level: 'Beginner',
    description: 'Historical perspective on information networks and AI impact on society by the author of Sapiens.',
    link: 'https://www.amazon.com/Nexus-History-Information-Networks-Stone/dp/0593653998',
    year: 2024,
    free: false,
  },
  {
    id: 'co-intelligence',
    title: 'Co-Intelligence: Living and Working with AI',
    authors: 'Dr. Ethan Mollick',
    type: 'book',
    category: 'Industry & Business',
    language: 'English',
    level: 'Beginner',
    description: 'Top pick for 2024. Practical guide on using AI for productivity and collaboration.',
    link: 'https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/059371671X',
    year: 2024,
    free: false,
  },
  // Specialized Topics
  {
    id: 'deep-learning-python',
    title: 'Deep Learning with Python',
    authors: 'François Chollet',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'Practical deep learning with Keras and TensorFlow by the creator of Keras.',
    link: 'https://www.manning.com/books/deep-learning-with-python-second-edition',
    year: 2021,
    free: false,
  },
  {
    id: 'grokking-deep-learning',
    title: 'Grokking Deep Learning',
    authors: 'Andrew Trask',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Beginner',
    description: 'Beginner-friendly introduction to neural networks from scratch with intuitive explanations.',
    link: 'https://www.manning.com/books/grokking-deep-learning',
    year: 2019,
    free: false,
  },
  {
    id: 'neural-networks-nielsen',
    title: 'Neural Networks and Deep Learning',
    authors: 'Michael Nielsen',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'Free online book covering backpropagation, CNNs, and fundamentals of deep learning.',
    link: 'http://neuralnetworksanddeeplearning.com/',
    pdfLink: 'http://neuralnetworksanddeeplearning.com/',
    year: 2015,
    free: true,
  },
  {
    id: 'fundamentals-deep-learning',
    title: 'Fundamentals of Deep Learning',
    authors: 'Nikhil Buduma',
    type: 'book',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'Covers foundations, architectures, and applications of deep learning.',
    link: 'https://www.oreilly.com/library/view/fundamentals-of-deep/9781491925607/',
    year: 2017,
    free: false,
  },
  // Arabic Books
  {
    id: 'ai-revolution-ar',
    title: 'الذكاء الاصطناعي ثورة في تقنيات العصر',
    titleAr: 'الذكاء الاصطناعي ثورة في تقنيات العصر',
    authors: 'د. عبد الله موسى، د. أحمد حبيب بلال',
    type: 'book',
    category: 'Foundational',
    language: 'Arabic',
    level: 'Intermediate',
    description: 'Comprehensive Arabic book covering AI fundamentals, deep learning, machine learning, algorithms, robotics, and expert systems. Includes AI history from 1940-2000.',
    link: 'https://www.noor-book.com/',
    year: 2020,
    free: false,
  },
  {
    id: 'ai-landmarks-ar',
    title: 'الذكاء الاصطناعي معالمه وتطبيقاته وتأثيراته التنموية والمجتمعية',
    titleAr: 'الذكاء الاصطناعي معالمه وتطبيقاته وتأثيراته التنموية والمجتمعية',
    authors: 'محمد محمد الهادي',
    type: 'book',
    category: 'Industry & Business',
    language: 'Arabic',
    level: 'Intermediate',
    description: '14 chapters covering AI in modern technology, economic growth impact, Industry 4.0, and societal transformation.',
    link: 'https://www.noor-book.com/',
    year: 2019,
    free: false,
  },
  {
    id: 'ai-basics-ar',
    title: 'أساسيات الذكاء الاصطناعي',
    titleAr: 'أساسيات الذكاء الاصطناعي',
    authors: 'د. عادل عبد النور',
    type: 'book',
    category: 'Foundational',
    language: 'Arabic',
    level: 'Beginner',
    description: 'Beginner-friendly Arabic book with 9 chapters covering AI definition, applications, branches, and historical development from 1940s to present.',
    link: 'https://www.noor-book.com/',
    year: 2018,
    free: false,
  },
  {
    id: 'ai-internet-ar',
    title: 'الذكاء الاصطناعي في أعمال الإنترنت',
    titleAr: 'الذكاء الاصطناعي في أعمال الإنترنت',
    authors: 'عماد صالح العزب',
    type: 'book',
    category: 'Industry & Business',
    language: 'Arabic',
    level: 'Intermediate',
    description: 'AI in e-commerce, internet companies, and social media. Covers cognitive skills, components, ethical use, and regulation.',
    link: 'https://www.noor-book.com/',
    year: 2021,
    free: false,
  },
  {
    id: 'ai-libraries-ar',
    title: 'الذكاء الاصطناعي والنظم الخبيرة في المكتبات',
    titleAr: 'الذكاء الاصطناعي والنظم الخبيرة في المكتبات',
    authors: 'زين عبد الهادي',
    type: 'book',
    category: 'Applications',
    language: 'Arabic',
    level: 'Intermediate',
    description: '5 chapters on AI in library systems, NLP, machine learning, and expert systems applications.',
    link: 'https://www.noor-book.com/',
    year: 2017,
    free: false,
  },
  {
    id: 'life-3-ar',
    title: 'الحياة 3.0: أن تكون إنسانًا في عصر الذكاء الاصطناعي',
    titleAr: 'الحياة 3.0: أن تكون إنسانًا في عصر الذكاء الاصطناعي',
    authors: 'Max Tegmark (مترجم)',
    type: 'book',
    category: 'Future & Ethics',
    language: 'Arabic',
    level: 'Beginner',
    description: 'Arabic translation of Life 3.0. Explores future of humanity, AI impact on society, and consciousness.',
    link: 'https://www.noor-book.com/',
    year: 2019,
    free: false,
  },
  {
    id: 'ai-journey-ar',
    title: 'رحلة الذكاء الإصطناعي',
    titleAr: 'رحلة الذكاء الإصطناعي',
    authors: 'مؤلف عربي',
    type: 'book',
    category: 'Foundational',
    language: 'Arabic',
    level: 'Intermediate',
    description: 'Comprehensive journey through AI from fundamentals to machine learning branches and practical applications.',
    link: 'https://www.amazon.com/',
    year: 2023,
    free: false,
  },
  {
    id: 'ml-data-science-ar',
    title: 'تعلم الآلة وعلم البيانات: الأساسيات والمفاهيم والخوارزميات والادوات',
    titleAr: 'تعلم الآلة وعلم البيانات: الأساسيات والمفاهيم والخوارزميات والادوات',
    authors: 'د. علاء طعيمة',
    type: 'book',
    category: 'Machine Learning',
    language: 'Arabic',
    level: 'Intermediate',
    description: 'Machine learning fundamentals, data science, algorithms, and tools in Arabic.',
    link: 'https://www.noor-book.com/',
    year: 2022,
    free: false,
  },
  {
    id: 'ai-for-everyone-ar',
    title: 'الذكاء الاصطناعي للجميع',
    titleAr: 'الذكاء الاصطناعي للجميع',
    authors: 'التعلم العميق بالعربي',
    type: 'book',
    category: 'Foundational',
    language: 'Arabic',
    level: 'Beginner',
    description: 'Free online Arabic resource covering AI introduction, goals, history, concepts, and importance.',
    link: 'https://dlarabic.com/',
    pdfLink: 'https://dlarabic.com/',
    year: 2023,
    free: true,
  },
  // Free Online Courses
  {
    id: 'fastai-course',
    title: 'Practical Deep Learning for Coders',
    authors: 'Fast.ai',
    type: 'course',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'Free hands-on course teaching deep learning from a practical, code-first perspective.',
    link: 'https://course.fast.ai/',
    year: 2023,
    free: true,
  },
  {
    id: 'stanford-cs229',
    title: 'Stanford CS229: Machine Learning',
    authors: 'Andrew Ng',
    type: 'course',
    category: 'Machine Learning',
    language: 'English',
    level: 'Advanced',
    description: 'Legendary Stanford course covering supervised and unsupervised learning, best practices, and case studies.',
    link: 'https://cs229.stanford.edu/',
    year: 2023,
    free: true,
  },
  {
    id: 'mit-deep-learning',
    title: 'MIT 6.S191: Introduction to Deep Learning',
    authors: 'MIT',
    type: 'course',
    category: 'Deep Learning',
    language: 'English',
    level: 'Intermediate',
    description: 'MIT course with lectures on neural networks, CNNs, RNNs, and deep reinforcement learning.',
    link: 'http://introtodeeplearning.com/',
    year: 2024,
    free: true,
  },
  {
    id: 'deeplearning-ai',
    title: 'DeepLearning.AI Specializations',
    authors: 'Andrew Ng',
    type: 'course',
    category: 'Deep Learning',
    language: 'English',
    level: 'Beginner',
    description: 'Comprehensive Coursera specializations covering deep learning, ML engineering, and AI for everyone.',
    link: 'https://www.deeplearning.ai/',
    year: 2024,
    free: false,
  },
  {
    id: 'huggingface-course',
    title: 'Hugging Face NLP Course',
    authors: 'Hugging Face',
    type: 'course',
    category: 'NLP',
    language: 'English',
    level: 'Intermediate',
    description: 'Free course on NLP with Transformers, covering BERT, GPT, and modern language models.',
    link: 'https://huggingface.co/learn/nlp-course',
    year: 2023,
    free: true,
  },
  // Research Papers
  {
    id: 'attention-is-all',
    title: 'Attention Is All You Need',
    authors: 'Vaswani et al.',
    type: 'paper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'Groundbreaking paper introducing the Transformer architecture that revolutionized NLP.',
    link: 'https://arxiv.org/abs/1706.03762',
    pdfLink: 'https://arxiv.org/pdf/1706.03762.pdf',
    year: 2017,
    free: true,
  },
  {
    id: 'bert-paper',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin et al.',
    type: 'paper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'BERT paper that introduced bidirectional pre-training for language understanding.',
    link: 'https://arxiv.org/abs/1810.04805',
    pdfLink: 'https://arxiv.org/pdf/1810.04805.pdf',
    year: 2018,
    free: true,
  },
  {
    id: 'gpt3-paper',
    title: 'Language Models are Few-Shot Learners',
    authors: 'Brown et al.',
    type: 'paper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'GPT-3 paper demonstrating few-shot learning capabilities of large language models.',
    link: 'https://arxiv.org/abs/2005.14165',
    pdfLink: 'https://arxiv.org/pdf/2005.14165.pdf',
    year: 2020,
    free: true,
  },
  {
    id: 'alphago-paper',
    title: 'Mastering the Game of Go with Deep Neural Networks',
    authors: 'Silver et al.',
    type: 'paper',
    category: 'Reinforcement Learning',
    language: 'English',
    level: 'Advanced',
    description: 'AlphaGo paper showing how deep RL can master complex games.',
    link: 'https://www.nature.com/articles/nature16961',
    year: 2016,
    free: false,
  },
  {
    id: 'alphafold-paper',
    title: 'Highly Accurate Protein Structure Prediction with AlphaFold',
    authors: 'Jumper et al.',
    type: 'paper',
    category: 'Applications',
    language: 'English',
    level: 'Advanced',
    description: 'AlphaFold 2 paper solving the protein folding problem with deep learning.',
    link: 'https://www.nature.com/articles/s41586-021-03819-2',
    year: 2021,
    free: false,
  },
  // Whitepapers
  {
    id: 'openai-gpt4',
    title: 'GPT-4 Technical Report',
    authors: 'OpenAI',
    type: 'whitepaper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'Technical report on GPT-4 capabilities, limitations, and safety considerations.',
    link: 'https://arxiv.org/abs/2303.08774',
    pdfLink: 'https://arxiv.org/pdf/2303.08774.pdf',
    year: 2023,
    free: true,
  },
  {
    id: 'google-palm',
    title: 'PaLM: Scaling Language Modeling with Pathways',
    authors: 'Google Research',
    type: 'whitepaper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'Google PaLM paper on scaling language models to 540B parameters.',
    link: 'https://arxiv.org/abs/2204.02311',
    pdfLink: 'https://arxiv.org/pdf/2204.02311.pdf',
    year: 2022,
    free: true,
  },
  {
    id: 'meta-llama',
    title: 'LLaMA: Open and Efficient Foundation Language Models',
    authors: 'Meta AI',
    type: 'whitepaper',
    category: 'NLP',
    language: 'English',
    level: 'Advanced',
    description: 'Meta LLaMA paper introducing open-source foundation models.',
    link: 'https://arxiv.org/abs/2302.13971',
    pdfLink: 'https://arxiv.org/pdf/2302.13971.pdf',
    year: 2023,
    free: true,
  },
];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredResources = libraryResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.titleAr?.includes(searchQuery) ||
      resource.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;

    return matchesSearch && matchesType && matchesCategory && matchesLanguage && matchesLevel;
  });

  const categories = Array.from(new Set(libraryResources.map(r => r.category)));
  const languages = Array.from(new Set(libraryResources.map(r => r.language)));
  const levels = Array.from(new Set(libraryResources.map(r => r.level)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book className="w-5 h-5" />;
      case 'paper': return <FileText className="w-5 h-5" />;
      case 'course': return <GraduationCap className="w-5 h-5" />;
      case 'whitepaper': return <FileText className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'paper': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'course': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'whitepaper': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="container py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-cyan-500/20 rounded-xl">
              <BookOpen className="w-12 h-12 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">AI Library</h1>
              <p className="text-xl text-gray-300">Comprehensive collection of AI books, research papers, and learning resources</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">{libraryResources.filter(r => r.type === 'book').length}</div>
              <div className="text-gray-400 text-sm">Books</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400">{libraryResources.filter(r => r.type === 'paper').length}</div>
              <div className="text-gray-400 text-sm">Research Papers</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">{libraryResources.filter(r => r.type === 'course').length}</div>
              <div className="text-gray-400 text-sm">Online Courses</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">{libraryResources.filter(r => r.free).length}</div>
              <div className="text-gray-400 text-sm">Free Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container py-8">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Filter Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="paper">Research Papers</SelectItem>
                <SelectItem value="course">Online Courses</SelectItem>
                <SelectItem value="whitepaper">Whitepapers</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language Filter */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      {lang}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Filter */}
          <div className="mt-4">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white max-w-xs">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredResources.length} of {libraryResources.length} resources
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg border ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {resource.titleAr || resource.title}
                  </h3>
                  {resource.titleAr && (
                    <p className="text-gray-400 text-sm mb-1">{resource.title}</p>
                  )}
                  <p className="text-cyan-400 text-sm">{resource.authors}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">{resource.description}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs border border-blue-500/30">
                  {resource.category}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-500/30 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {resource.language}
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                  {resource.level}
                </span>
                {resource.free && (
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs border border-cyan-500/30">
                    Free
                  </span>
                )}
                {resource.year && (
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs border border-gray-500/30">
                    {resource.year}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Resource
                  </a>
                </Button>
                {resource.pdfLink && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <a href={resource.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="mt-12 bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Research Repositories */}
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Research Repositories</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    arXiv.org - AI Section
                  </a>
                </li>
                <li>
                  <a href="https://paperswithcode.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Papers with Code
                  </a>
                </li>
                <li>
                  <a href="https://ai.google/research/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Google AI Research
                  </a>
                </li>
                <li>
                  <a href="https://openai.com/research/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    OpenAI Research
                  </a>
                </li>
              </ul>
            </div>

            {/* Arabic Resources */}
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Arabic Learning Platforms</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://dlarabic.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    التعلم العميق بالعربي
                  </a>
                </li>
                <li>
                  <a href="https://www.noor-book.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    مكتبة نور
                  </a>
                </li>
                <li>
                  <a href="https://www.hindawi.org/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    مؤسسة هنداوي
                  </a>
                </li>
                <li>
                  <a href="https://www.edraak.org/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    إدراك
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
