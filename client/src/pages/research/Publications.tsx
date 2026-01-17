import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, FileText, Download, ExternalLink, Users, Calendar, TrendingUp } from 'lucide-react';

type Publication = {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  year: number;
  venue: string;
  researchArea: string;
  citations: number;
  pdfUrl: string;
  abstract: string;
  doi?: string;
};

const publications: Publication[] = [
  {
    id: 'pub1',
    title: 'Neural-Symbolic Integration for Arabic Dialect Understanding',
    authors: ['Dr. Ahmed Hassan', 'Dr. Sarah Chen', 'Prof. Mohamed Khalil'],
    institution: 'American University in Cairo',
    year: 2024,
    venue: 'NeurIPS 2024',
    researchArea: 'Natural Language Processing',
    citations: 47,
    pdfUrl: '#',
    abstract: 'We present a novel neural-symbolic architecture that combines deep learning with symbolic reasoning to achieve state-of-the-art performance on Arabic dialect understanding tasks.',
    doi: '10.48550/arXiv.2024.12345'
  },
  {
    id: 'pub2',
    title: 'Explainable AI for Medical Image Diagnosis in Resource-Constrained Settings',
    authors: ['Prof. Dr. Mohamed El-Sayed', 'Dr. Layla Ibrahim', 'Dr. James Wilson'],
    institution: 'Cairo University',
    year: 2024,
    venue: 'CVPR 2024',
    researchArea: 'Computer Vision',
    citations: 89,
    pdfUrl: '#',
    abstract: 'This paper introduces an explainable AI framework for medical image analysis that provides interpretable diagnoses while maintaining high accuracy, specifically designed for deployment in resource-limited healthcare settings.',
    doi: '10.1109/CVPR.2024.54321'
  },
  {
    id: 'pub3',
    title: 'Quantum Machine Learning for Optimization: A Hybrid Approach',
    authors: ['Dr. Yasmine Khalil', 'Prof. David Zhang', 'Dr. Omar Farouk'],
    institution: 'Zewail City of Science',
    year: 2024,
    venue: 'Nature Machine Intelligence',
    researchArea: 'Quantum Computing',
    citations: 156,
    pdfUrl: '#',
    abstract: 'We demonstrate a hybrid quantum-classical machine learning algorithm that achieves exponential speedup for certain optimization problems, with applications in drug discovery and materials science.',
    doi: '10.1038/s42256-024-00789-x'
  },
  {
    id: 'pub4',
    title: 'Multi-Agent Cognitive Architectures for Collaborative Problem Solving',
    authors: ['Dr. Ahmed Hassan', 'Prof. Emily Rodriguez', 'Dr. Khaled Mansour'],
    institution: 'American University in Cairo',
    year: 2024,
    venue: 'AAAI 2024',
    researchArea: 'Neural-Symbolic AI',
    citations: 34,
    pdfUrl: '#',
    abstract: 'This work presents a cognitive architecture enabling multiple AI agents to collaborate effectively by sharing knowledge representations and coordinating decision-making processes.',
    doi: '10.1609/aaai.v38i1.12345'
  },
  {
    id: 'pub5',
    title: 'AI-Powered Precision Agriculture for Arid Climates',
    authors: ['Prof. Dr. Mohamed El-Sayed', 'Dr. Fatima Al-Rashid', 'Dr. John Smith'],
    institution: 'Cairo University',
    year: 2023,
    venue: 'Nature Food',
    researchArea: 'Applied AI Solutions',
    citations: 203,
    pdfUrl: '#',
    abstract: 'We develop and deploy computer vision systems for crop monitoring and irrigation optimization in Egyptian farms, demonstrating significant improvements in yield and water efficiency.',
    doi: '10.1038/s43016-023-00567-y'
  },
  {
    id: 'pub6',
    title: 'Neuromorphic Computing: Brain-Inspired AI Chips',
    authors: ['Dr. Yasmine Khalil', 'Prof. Michael Chen', 'Dr. Amira Hassan'],
    institution: 'Zewail City of Science',
    year: 2024,
    venue: 'IEEE Transactions on Neural Networks',
    researchArea: 'Quantum Computing',
    citations: 78,
    pdfUrl: '#',
    abstract: 'This paper presents a neuromorphic chip design achieving 100x energy efficiency compared to traditional processors, enabling more sustainable AI systems.',
    doi: '10.1109/TNNLS.2024.98765'
  },
  {
    id: 'pub7',
    title: 'Ethical AI Frameworks for Middle Eastern Contexts',
    authors: ['Dr. Ahmed Hassan', 'Prof. Nadia Al-Masri', 'Dr. Robert Johnson'],
    institution: 'American University in Cairo',
    year: 2023,
    venue: 'AI & Society',
    researchArea: 'AI Ethics & Safety',
    citations: 67,
    pdfUrl: '#',
    abstract: 'We propose an ethical AI framework that incorporates Middle Eastern cultural values and norms, ensuring AI systems align with regional societal expectations.',
    doi: '10.1007/s00146-023-01234-5'
  },
  {
    id: 'pub8',
    title: 'Deep Reinforcement Learning for Autonomous Systems in Urban Environments',
    authors: ['Prof. Dr. Mohamed El-Sayed', 'Dr. Hassan Mahmoud', 'Dr. Lisa Wang'],
    institution: 'Cairo University',
    year: 2023,
    venue: 'ICML 2023',
    researchArea: 'Machine Learning',
    citations: 112,
    pdfUrl: '#',
    abstract: 'This work develops reinforcement learning algorithms for autonomous navigation in complex urban environments, with applications in traffic management and autonomous vehicles.',
    doi: '10.48550/arXiv.2023.67890'
  },
  {
    id: 'pub9',
    title: 'Transfer Learning Across Arabic Language Variants',
    authors: ['Dr. Ahmed Hassan', 'Dr. Mona Khalil', 'Prof. Thomas Anderson'],
    institution: 'American University in Cairo',
    year: 2023,
    venue: 'ACL 2023',
    researchArea: 'Natural Language Processing',
    citations: 91,
    pdfUrl: '#',
    abstract: 'We demonstrate effective transfer learning techniques that enable AI models trained on Modern Standard Arabic to generalize to various regional dialects with minimal fine-tuning.',
    doi: '10.18653/v1/2023.acl-long.123'
  },
  {
    id: 'pub10',
    title: 'Quantum Annealing for Combinatorial Optimization in Drug Discovery',
    authors: ['Dr. Yasmine Khalil', 'Prof. Sarah Mitchell', 'Dr. Tarek Abdel-Rahman'],
    institution: 'Zewail City of Science',
    year: 2023,
    venue: 'Science Advances',
    researchArea: 'Quantum Computing',
    citations: 145,
    pdfUrl: '#',
    abstract: 'This paper applies quantum annealing techniques to molecular optimization problems, significantly accelerating the drug discovery process for complex diseases.',
    doi: '10.1126/sciadv.abc1234'
  },
  {
    id: 'pub11',
    title: 'Federated Learning for Privacy-Preserving Medical AI',
    authors: ['Prof. Dr. Mohamed El-Sayed', 'Dr. Aya Mostafa', 'Dr. Peter Williams'],
    institution: 'Cairo University',
    year: 2024,
    venue: 'Nature Medicine',
    researchArea: 'Machine Learning',
    citations: 134,
    pdfUrl: '#',
    abstract: 'We develop federated learning approaches that enable collaborative medical AI model training across hospitals while preserving patient privacy and data sovereignty.',
    doi: '10.1038/s41591-024-02345-6'
  },
  {
    id: 'pub12',
    title: 'Common Sense Reasoning in Neural-Symbolic Systems',
    authors: ['Dr. Ahmed Hassan', 'Prof. Jennifer Lee', 'Dr. Karim Youssef'],
    institution: 'American University in Cairo',
    year: 2024,
    venue: 'Artificial Intelligence Journal',
    researchArea: 'Neural-Symbolic AI',
    citations: 56,
    pdfUrl: '#',
    abstract: 'This work integrates common sense knowledge graphs with neural networks to enable AI systems to reason about everyday situations and physical relationships.',
    doi: '10.1016/j.artint.2024.103456'
  }
];

const institutions = ['All Institutions', 'American University in Cairo', 'Cairo University', 'Zewail City of Science'];
const years = ['All Years', '2024', '2023', '2022'];
const researchAreas = [
  'All Research Areas',
  'Neural-Symbolic AI',
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Quantum Computing',
  'AI Ethics & Safety',
  'Applied AI Solutions'
];

export default function Publications() {
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedArea, setSelectedArea] = useState('All Research Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'year' | 'citations'>('year');
  const [selectedCoAuthor, setSelectedCoAuthor] = useState('All Co-Authors');
  const [citationRange, setCitationRange] = useState('all');

  // Extract unique co-authors
  const allCoAuthors = Array.from(new Set(publications.flatMap(pub => pub.authors))).sort();
  const coAuthorOptions = ['All Co-Authors', ...allCoAuthors];

  const filteredPublications = publications
    .filter(pub => {
      const matchesInstitution = selectedInstitution === 'All Institutions' || pub.institution === selectedInstitution;
      const matchesYear = selectedYear === 'All Years' || pub.year.toString() === selectedYear;
      const matchesArea = selectedArea === 'All Research Areas' || pub.researchArea === selectedArea;
      const matchesSearch = searchQuery === '' || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCoAuthor = selectedCoAuthor === 'All Co-Authors' || pub.authors.includes(selectedCoAuthor);
      
      let matchesCitationRange = true;
      if (citationRange === '0-50') matchesCitationRange = pub.citations >= 0 && pub.citations <= 50;
      else if (citationRange === '51-100') matchesCitationRange = pub.citations >= 51 && pub.citations <= 100;
      else if (citationRange === '101-150') matchesCitationRange = pub.citations >= 101 && pub.citations <= 150;
      else if (citationRange === '151-plus') matchesCitationRange = pub.citations >= 151;
      
      return matchesInstitution && matchesYear && matchesArea && matchesSearch && matchesCoAuthor && matchesCitationRange;
    })
    .sort((a, b) => {
      if (sortBy === 'year') return b.year - a.year;
      return b.citations - a.citations;
    });

  const totalCitations = filteredPublications.reduce((sum, pub) => sum + pub.citations, 0);
  const avgCitations = filteredPublications.length > 0 ? Math.round(totalCitations / filteredPublications.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/solutions/agi">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-4 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to AGI Research
            </button>
          </Link>
          <div className="flex items-center mb-4">
            <FileText className="h-12 w-12 text-cyan-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-white">Research Publications</h1>
              <p className="text-gray-300 mt-2">Joint research papers from Apex Meridian partnerships</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Publications</p>
                <p className="text-3xl font-bold text-white mt-1">{filteredPublications.length}</p>
              </div>
              <FileText className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Citations</p>
                <p className="text-3xl font-bold text-white mt-1">{totalCitations}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Citations</p>
                <p className="text-3xl font-bold text-white mt-1">{avgCitations}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Institutions</p>
                <p className="text-3xl font-bold text-white mt-1">3</p>
              </div>
              <Users className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, author, keywords..."
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                {institutions.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Research Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                {researchAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'year' | 'citations')}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="year">Year (Newest First)</option>
                <option value="citations">Citations (Most First)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Co-Author</label>
              <select
                value={selectedCoAuthor}
                onChange={(e) => setSelectedCoAuthor(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                {coAuthorOptions.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Citations</label>
              <select
                value={citationRange}
                onChange={(e) => setCitationRange(e.target.value)}
                className="w-full px-4 py-2 bg-blue-950/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Citations</option>
                <option value="0-50">0-50</option>
                <option value="51-100">51-100</option>
                <option value="101-150">101-150</option>
                <option value="151-plus">151+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map(pub => (
            <div key={pub.id} className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {pub.authors.join(', ')}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {pub.year}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {pub.citations} citations
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                      {pub.institution}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                      {pub.researchArea}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                      {pub.venue}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{pub.abstract}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-cyan-500/20">
                <a href={pub.pdfUrl} className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </a>
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Publisher
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No publications found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
