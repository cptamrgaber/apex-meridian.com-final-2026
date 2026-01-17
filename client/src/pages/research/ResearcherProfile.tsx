import { useRoute, Link } from 'wouter';
import { ArrowLeft, Mail, ExternalLink, FileText, Award, Users, Building2, Calendar } from 'lucide-react';

type Publication = {
  title: string;
  venue: string;
  year: number;
  citations: number;
  coAuthors: string[];
};

type Project = {
  title: string;
  status: 'Active' | 'Completed';
  duration: string;
  description: string;
  institution: string;
};

type ResearcherData = {
  id: string;
  name: string;
  title: string;
  institution: string;
  email: string;
  photo: string;
  bio: string;
  expertise: string[];
  researchAreas: string[];
  publications: Publication[];
  projects: Project[];
  citations: number;
  hIndex: number;
  education: { degree: string; institution: string; year: number }[];
  awards: string[];
};

const researchersData: Record<string, ResearcherData> = {
  'ahmed-hassan': {
    id: 'ahmed-hassan',
    name: 'Dr. Ahmed Hassan',
    title: 'Director, AI Research Lab',
    institution: 'American University in Cairo',
    email: 'ahmed.hassan@aucegypt.edu',
    photo: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=0ea5e9&color=fff&size=200',
    bio: 'Dr. Ahmed Hassan is a leading researcher in neural-symbolic AI and natural language processing, with a focus on Arabic language understanding. He directs the AI Research Lab at AUC and has published extensively on hybrid AI architectures that combine deep learning with symbolic reasoning. His work on ethical AI frameworks for Middle Eastern contexts has been adopted by multiple regional institutions.',
    expertise: ['Neural-Symbolic AI', 'Natural Language Processing', 'AI Ethics', 'Arabic NLP', 'Cognitive Architectures'],
    researchAreas: ['Neural-Symbolic AI', 'Natural Language Processing', 'AI Ethics & Safety'],
    publications: [
      {
        title: 'Neural-Symbolic Integration for Arabic Dialect Understanding',
        venue: 'NeurIPS 2024',
        year: 2024,
        citations: 47,
        coAuthors: ['Dr. Sarah Chen', 'Prof. Mohamed Khalil']
      },
      {
        title: 'Multi-Agent Cognitive Architectures for Collaborative Problem Solving',
        venue: 'AAAI 2024',
        year: 2024,
        citations: 34,
        coAuthors: ['Prof. Emily Rodriguez', 'Dr. Khaled Mansour']
      },
      {
        title: 'Ethical AI Frameworks for Middle Eastern Contexts',
        venue: 'AI & Society',
        year: 2023,
        citations: 67,
        coAuthors: ['Prof. Nadia Al-Masri', 'Dr. Robert Johnson']
      },
      {
        title: 'Transfer Learning Across Arabic Language Variants',
        venue: 'ACL 2023',
        year: 2023,
        citations: 91,
        coAuthors: ['Dr. Mona Khalil', 'Prof. Thomas Anderson']
      },
      {
        title: 'Common Sense Reasoning in Neural-Symbolic Systems',
        venue: 'Artificial Intelligence Journal',
        year: 2024,
        citations: 56,
        coAuthors: ['Prof. Jennifer Lee', 'Dr. Karim Youssef']
      }
    ],
    projects: [
      {
        title: 'Neural-Symbolic Reasoning for Arabic NLP',
        status: 'Active',
        duration: '2023-2025',
        description: 'Developing hybrid AI systems that combine deep learning with symbolic reasoning to improve natural language understanding for Arabic text and speech.',
        institution: 'American University in Cairo'
      },
      {
        title: 'AI Ethics and Value Alignment',
        status: 'Active',
        duration: '2023-2026',
        description: 'Researching methods to ensure AI systems align with human values and cultural norms, with focus on Middle Eastern and North African contexts.',
        institution: 'American University in Cairo'
      },
      {
        title: 'Cognitive Architecture for Multi-Agent Systems',
        status: 'Completed',
        duration: '2023-2024',
        description: 'Designed computational models of human cognition to enable multiple AI agents to collaborate and coordinate effectively in complex environments.',
        institution: 'American University in Cairo'
      }
    ],
    citations: 295,
    hIndex: 6,
    education: [
      { degree: 'PhD in Computer Science', institution: 'Stanford University', year: 2018 },
      { degree: 'MSc in Artificial Intelligence', institution: 'MIT', year: 2014 },
      { degree: 'BSc in Computer Engineering', institution: 'Cairo University', year: 2012 }
    ],
    awards: [
      'Best Paper Award, ACL 2023',
      'Young Researcher Award, Egyptian Academy of Sciences, 2022',
      'Outstanding PhD Thesis Award, Stanford University, 2018'
    ]
  },
  'mohamed-elsayed': {
    id: 'mohamed-elsayed',
    name: 'Prof. Dr. Mohamed El-Sayed',
    title: 'Dean, Faculty of Computers and AI',
    institution: 'Cairo University',
    email: 'mohamed.elsayed@cu.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Mohamed+ElSayed&background=0ea5e9&color=fff&size=200',
    bio: 'Prof. Dr. Mohamed El-Sayed is a distinguished researcher in machine learning and computer vision with over 15 years of experience. As Dean of the Faculty of Computers and AI at Cairo University, he leads initiatives to apply AI to real-world challenges in healthcare, agriculture, and urban planning. His work on precision agriculture and medical AI has been deployed across Egypt with measurable societal impact.',
    expertise: ['Machine Learning', 'Computer Vision', 'Applied AI', 'Medical AI', 'Agricultural AI'],
    researchAreas: ['Machine Learning', 'Computer Vision', 'Applied AI Solutions'],
    publications: [
      {
        title: 'Explainable AI for Medical Image Diagnosis in Resource-Constrained Settings',
        venue: 'CVPR 2024',
        year: 2024,
        citations: 89,
        coAuthors: ['Dr. Layla Ibrahim', 'Dr. James Wilson']
      },
      {
        title: 'AI-Powered Precision Agriculture for Arid Climates',
        venue: 'Nature Food',
        year: 2023,
        citations: 203,
        coAuthors: ['Dr. Fatima Al-Rashid', 'Dr. John Smith']
      },
      {
        title: 'Deep Reinforcement Learning for Autonomous Systems in Urban Environments',
        venue: 'ICML 2023',
        year: 2023,
        citations: 112,
        coAuthors: ['Dr. Hassan Mahmoud', 'Dr. Lisa Wang']
      },
      {
        title: 'Federated Learning for Privacy-Preserving Medical AI',
        venue: 'Nature Medicine',
        year: 2024,
        citations: 134,
        coAuthors: ['Dr. Aya Mostafa', 'Dr. Peter Williams']
      }
    ],
    projects: [
      {
        title: 'Explainable AI for Medical Diagnosis',
        status: 'Active',
        duration: '2024-2026',
        description: 'Creating interpretable AI models for medical image analysis and diagnosis that can explain their decision-making process to healthcare professionals.',
        institution: 'Cairo University'
      },
      {
        title: 'AI-Powered Agriculture',
        status: 'Active',
        duration: '2022-Present',
        description: 'Deployed computer vision systems across 50+ Egyptian farms to monitor crop health and optimize irrigation, resulting in 30% yield improvement.',
        institution: 'Cairo University'
      },
      {
        title: 'Traffic Optimization System',
        status: 'Completed',
        duration: '2023-2024',
        description: 'Implemented AI-powered traffic management system in Cairo that reduced congestion by 20% and improved air quality.',
        institution: 'Cairo University'
      }
    ],
    citations: 641,
    hIndex: 9,
    education: [
      { degree: 'PhD in Computer Science', institution: 'University of Cambridge', year: 2010 },
      { degree: 'MSc in Machine Learning', institution: 'ETH Zurich', year: 2006 },
      { degree: 'BSc in Computer Science', institution: 'Cairo University', year: 2004 }
    ],
    awards: [
      'Egyptian State Award for Excellence in Engineering Sciences, 2023',
      'Best Application Paper Award, CVPR 2024',
      'Distinguished Faculty Award, Cairo University, 2021'
    ]
  },
  'yasmine-khalil': {
    id: 'yasmine-khalil',
    name: 'Dr. Yasmine Khalil',
    title: 'Director, Center for Advanced Sciences',
    institution: 'Zewail City of Science',
    email: 'yasmine.khalil@zewailcity.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Yasmine+Khalil&background=0ea5e9&color=fff&size=200',
    bio: 'Dr. Yasmine Khalil is a pioneering researcher at the intersection of quantum computing and artificial intelligence. She directs the Center for Advanced Sciences at Zewail City, where her team explores quantum machine learning algorithms and neuromorphic computing architectures. Her breakthrough work on hybrid quantum-classical algorithms has opened new frontiers in optimization and drug discovery.',
    expertise: ['Quantum Computing', 'Neuromorphic AI', 'Quantum Machine Learning', 'Optimization', 'Advanced Algorithms'],
    researchAreas: ['Quantum Computing', 'Neural-Symbolic AI'],
    publications: [
      {
        title: 'Quantum Machine Learning for Optimization: A Hybrid Approach',
        venue: 'Nature Machine Intelligence',
        year: 2024,
        citations: 156,
        coAuthors: ['Prof. David Zhang', 'Dr. Omar Farouk']
      },
      {
        title: 'Neuromorphic Computing: Brain-Inspired AI Chips',
        venue: 'IEEE Transactions on Neural Networks',
        year: 2024,
        citations: 78,
        coAuthors: ['Prof. Michael Chen', 'Dr. Amira Hassan']
      },
      {
        title: 'Quantum Annealing for Combinatorial Optimization in Drug Discovery',
        venue: 'Science Advances',
        year: 2023,
        citations: 145,
        coAuthors: ['Prof. Sarah Mitchell', 'Dr. Tarek Abdel-Rahman']
      }
    ],
    projects: [
      {
        title: 'Quantum ML Algorithm',
        status: 'Active',
        duration: '2024-2026',
        description: 'Developing quantum machine learning algorithms demonstrating 10x speedup over classical methods for optimization problems.',
        institution: 'Zewail City of Science'
      },
      {
        title: 'Neuromorphic AI Chip',
        status: 'Active',
        duration: '2023-2025',
        description: 'Designing brain-inspired computing chip achieving 100x energy efficiency compared to traditional processors.',
        institution: 'Zewail City of Science'
      }
    ],
    citations: 379,
    hIndex: 5,
    education: [
      { degree: 'PhD in Quantum Computing', institution: 'MIT', year: 2020 },
      { degree: 'MSc in Physics', institution: 'Oxford University', year: 2016 },
      { degree: 'BSc in Engineering Physics', institution: 'Cairo University', year: 2014 }
    ],
    awards: [
      'Rising Star Award, Nature Machine Intelligence, 2024',
      'Young Scientist Award, World Economic Forum, 2023',
      'Best PhD Thesis Award, MIT, 2020'
    ]
  }
};

export default function ResearcherProfile() {
  const [, params] = useRoute('/researchers/:id');
  const researcher = params?.id ? researchersData[params.id] : null;

  if (!researcher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Researcher Not Found</h2>
          <Link href="/researchers">
            <button className="text-cyan-400 hover:text-cyan-300">Back to Researchers</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/researchers">
            <button className="flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Research Team
            </button>
          </Link>
          
          <div className="flex items-start gap-6">
            <img
              src={researcher.photo}
              alt={researcher.name}
              className="w-32 h-32 rounded-full border-4 border-cyan-500/50"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{researcher.name}</h1>
              <p className="text-xl text-gray-300 mb-2">{researcher.title}</p>
              <div className="flex items-center text-cyan-400 mb-4">
                <Building2 className="h-5 w-5 mr-2" />
                {researcher.institution}
              </div>
              <a href={`mailto:${researcher.email}`} className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                {researcher.email}
              </a>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
                <p className="text-xs text-gray-400 mb-1">Publications</p>
                <p className="text-2xl font-bold text-white">{researcher.publications.length}</p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
                <p className="text-xs text-gray-400 mb-1">Citations</p>
                <p className="text-2xl font-bold text-white">{researcher.citations}</p>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
                <p className="text-xs text-gray-400 mb-1">H-Index</p>
                <p className="text-2xl font-bold text-white">{researcher.hIndex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>
              <p className="text-gray-300 leading-relaxed">{researcher.bio}</p>
            </div>

            {/* Research Projects */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Research Projects</h2>
              <div className="space-y-4">
                {researcher.projects.map((project, idx) => (
                  <div key={idx} className="bg-blue-950/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.duration}
                      <Building2 className="h-4 w-4 ml-4 mr-1" />
                      {project.institution}
                    </div>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Selected Publications</h2>
              <div className="space-y-4">
                {researcher.publications.map((pub, idx) => (
                  <div key={idx} className="bg-blue-950/50 rounded-lg p-4 border border-cyan-500/20">
                    <h3 className="text-lg font-semibold text-white mb-2">{pub.title}</h3>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <FileText className="h-4 w-4 mr-1" />
                      {pub.venue} • {pub.year}
                      <Award className="h-4 w-4 ml-4 mr-1" />
                      {pub.citations} citations
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      Co-authors: {pub.coAuthors.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expertise */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {researcher.expertise.map((exp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-3">
                {researcher.education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-white font-semibold">{edu.degree}</p>
                    <p className="text-sm text-gray-400">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Awards & Honors</h3>
              <ul className="space-y-2">
                {researcher.awards.map((award, idx) => (
                  <li key={idx} className="flex items-start">
                    <Award className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
