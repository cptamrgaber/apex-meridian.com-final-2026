import { Link } from 'wouter';
import { ArrowLeft, Users, Mail, ExternalLink, FileText, Award } from 'lucide-react';

type Researcher = {
  id: string;
  name: string;
  title: string;
  institution: string;
  expertise: string[];
  publications: number;
  citations: number;
  hIndex: number;
  email: string;
  photo: string;
  researchAreas: string[];
};

const researchers: Researcher[] = [
  {
    id: 'ahmed-hassan',
    name: 'Dr. Ahmed Hassan',
    title: 'Director, AI Research Lab',
    institution: 'American University in Cairo',
    expertise: ['Neural-Symbolic AI', 'Natural Language Processing', 'AI Ethics'],
    publications: 8,
    citations: 295,
    hIndex: 6,
    email: 'ahmed.hassan@aucegypt.edu',
    photo: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Neural-Symbolic AI', 'Natural Language Processing', 'AI Ethics & Safety']
  },
  {
    id: 'mohamed-elsayed',
    name: 'Prof. Dr. Mohamed El-Sayed',
    title: 'Dean, Faculty of Computers and AI',
    institution: 'Cairo University',
    expertise: ['Machine Learning', 'Computer Vision', 'Applied AI'],
    publications: 12,
    citations: 641,
    hIndex: 9,
    email: 'mohamed.elsayed@cu.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Mohamed+ElSayed&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Machine Learning', 'Computer Vision', 'Applied AI Solutions']
  },
  {
    id: 'yasmine-khalil',
    name: 'Dr. Yasmine Khalil',
    title: 'Director, Center for Advanced Sciences',
    institution: 'Zewail City of Science',
    expertise: ['Quantum Computing', 'Neuromorphic AI', 'Advanced Algorithms'],
    publications: 5,
    citations: 379,
    hIndex: 5,
    email: 'yasmine.khalil@zewailcity.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Yasmine+Khalil&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Quantum Computing', 'Neural-Symbolic AI']
  },
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'Senior Research Scientist',
    institution: 'Apex Meridian',
    expertise: ['Deep Learning', 'NLP', 'Multimodal AI'],
    publications: 6,
    citations: 178,
    hIndex: 5,
    email: 'sarah.chen@apexmeridian.com',
    photo: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Natural Language Processing', 'Machine Learning']
  },
  {
    id: 'layla-ibrahim',
    name: 'Dr. Layla Ibrahim',
    title: 'Assistant Professor',
    institution: 'Cairo University',
    expertise: ['Medical AI', 'Computer Vision', 'Explainable AI'],
    publications: 7,
    citations: 234,
    hIndex: 6,
    email: 'layla.ibrahim@cu.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Layla+Ibrahim&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Computer Vision', 'Applied AI Solutions']
  },
  {
    id: 'james-wilson',
    name: 'Dr. James Wilson',
    title: 'Principal Research Engineer',
    institution: 'Apex Meridian',
    expertise: ['Computer Vision', 'Robotics', 'Edge AI'],
    publications: 5,
    citations: 156,
    hIndex: 4,
    email: 'james.wilson@apexmeridian.com',
    photo: 'https://ui-avatars.com/api/?name=James+Wilson&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Computer Vision', 'Robotics & Autonomous Systems']
  },
  {
    id: 'mohamed-khalil',
    name: 'Prof. Mohamed Khalil',
    title: 'Professor of Computer Science',
    institution: 'American University in Cairo',
    expertise: ['Cognitive Architectures', 'Multi-Agent Systems', 'AGI'],
    publications: 4,
    citations: 123,
    hIndex: 4,
    email: 'mohamed.khalil@aucegypt.edu',
    photo: 'https://ui-avatars.com/api/?name=Mohamed+Khalil&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Neural-Symbolic AI', 'Machine Learning']
  },
  {
    id: 'david-zhang',
    name: 'Prof. David Zhang',
    title: 'Research Director',
    institution: 'Apex Meridian',
    expertise: ['Quantum ML', 'Optimization', 'Theoretical AI'],
    publications: 3,
    citations: 267,
    hIndex: 3,
    email: 'david.zhang@apexmeridian.com',
    photo: 'https://ui-avatars.com/api/?name=David+Zhang&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Quantum Computing', 'Machine Learning']
  },
  {
    id: 'omar-farouk',
    name: 'Dr. Omar Farouk',
    title: 'Research Scientist',
    institution: 'Zewail City of Science',
    expertise: ['Quantum Algorithms', 'Complexity Theory', 'Cryptography'],
    publications: 4,
    citations: 189,
    hIndex: 4,
    email: 'omar.farouk@zewailcity.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Omar+Farouk&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Quantum Computing']
  },
  {
    id: 'emily-rodriguez',
    name: 'Prof. Emily Rodriguez',
    title: 'Visiting Professor',
    institution: 'American University in Cairo',
    expertise: ['Cognitive Science', 'Human-AI Interaction', 'Neuroscience'],
    publications: 5,
    citations: 201,
    hIndex: 5,
    email: 'emily.rodriguez@aucegypt.edu',
    photo: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Neural-Symbolic AI', 'AI Ethics & Safety']
  },
  {
    id: 'khaled-mansour',
    name: 'Dr. Khaled Mansour',
    title: 'Postdoctoral Researcher',
    institution: 'American University in Cairo',
    expertise: ['Multi-Agent Systems', 'Distributed AI', 'Game Theory'],
    publications: 3,
    citations: 87,
    hIndex: 3,
    email: 'khaled.mansour@aucegypt.edu',
    photo: 'https://ui-avatars.com/api/?name=Khaled+Mansour&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Machine Learning', 'Neural-Symbolic AI']
  },
  {
    id: 'fatima-alrashid',
    name: 'Dr. Fatima Al-Rashid',
    title: 'Assistant Professor',
    institution: 'Cairo University',
    expertise: ['Agricultural AI', 'Remote Sensing', 'Sustainability'],
    publications: 6,
    citations: 312,
    hIndex: 6,
    email: 'fatima.alrashid@cu.edu.eg',
    photo: 'https://ui-avatars.com/api/?name=Fatima+AlRashid&background=0ea5e9&color=fff&size=200',
    researchAreas: ['Applied AI Solutions', 'Computer Vision']
  }
];

export default function Researchers() {
  const totalPublications = researchers.reduce((sum, r) => sum + r.publications, 0);
  const totalCitations = researchers.reduce((sum, r) => sum + r.citations, 0);
  const avgHIndex = Math.round(researchers.reduce((sum, r) => sum + r.hIndex, 0) / researchers.length);

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
            <Users className="h-12 w-12 text-cyan-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-white">Research Team</h1>
              <p className="text-gray-300 mt-2">Leading researchers driving AGI innovation across our partnerships</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Researchers</p>
                <p className="text-3xl font-bold text-white mt-1">{researchers.length}</p>
              </div>
              <Users className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Publications</p>
                <p className="text-3xl font-bold text-white mt-1">{totalPublications}</p>
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
              <Award className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg H-Index</p>
                <p className="text-3xl font-bold text-white mt-1">{avgHIndex}</p>
              </div>
              <Award className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Researchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchers.map(researcher => (
            <Link key={researcher.id} href={`/researchers/${researcher.id}`}>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer group">
                {/* Photo */}
                <div className="flex items-start mb-4">
                  <img
                    src={researcher.photo}
                    alt={researcher.name}
                    className="w-20 h-20 rounded-full border-2 border-cyan-500/50 mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{researcher.name}</h3>
                    <p className="text-sm text-gray-400">{researcher.title}</p>
                    <p className="text-sm text-cyan-400 mt-1">{researcher.institution}</p>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {researcher.expertise.slice(0, 3).map((exp, idx) => (
                    <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold">
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cyan-500/20">
                  <div>
                    <p className="text-xs text-gray-400">Publications</p>
                    <p className="text-lg font-bold text-white">{researcher.publications}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Citations</p>
                    <p className="text-lg font-bold text-white">{researcher.citations}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">H-Index</p>
                    <p className="text-lg font-bold text-white">{researcher.hIndex}</p>
                  </div>
                </div>

                {/* View Profile Link */}
                <div className="mt-4 flex items-center justify-between">
                  <a href={`mailto:${researcher.email}`} className="flex items-center text-gray-400 hover:text-cyan-400 text-sm transition-colors" onClick={(e) => e.stopPropagation()}>
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </a>
                  <span className="flex items-center text-cyan-400 text-sm font-semibold">
                    View Profile
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
