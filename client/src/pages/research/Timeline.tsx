import { Link } from 'wouter';
import { ArrowLeft, Building2, Users, FileText, Award, Lightbulb, Rocket } from 'lucide-react';

type TimelineEvent = {
  id: string;
  date: string;
  year: number;
  quarter: string;
  title: string;
  description: string;
  institution: string;
  type: 'partnership' | 'milestone' | 'publication' | 'award' | 'breakthrough';
  icon: typeof Building2;
  color: string;
};

const events: TimelineEvent[] = [
  {
    id: 'e1',
    date: 'January 2022',
    year: 2022,
    quarter: 'Q1',
    title: 'Cairo University Partnership Established',
    description: 'Signed multi-year research collaboration agreement with Cairo University Faculty of Computers and AI, focusing on applied AI solutions for Egyptian challenges.',
    institution: 'Cairo University',
    type: 'partnership',
    icon: Building2,
    color: 'cyan'
  },
  {
    id: 'e2',
    date: 'March 2022',
    year: 2022,
    quarter: 'Q1',
    title: 'First Joint Research Lab Opened',
    description: 'Inaugurated joint AI research laboratory at Cairo University campus with state-of-the-art computing infrastructure and dedicated research space.',
    institution: 'Cairo University',
    type: 'milestone',
    icon: Lightbulb,
    color: 'blue'
  },
  {
    id: 'e3',
    date: 'June 2022',
    year: 2022,
    quarter: 'Q2',
    title: 'Agriculture AI Pilot Program Launched',
    description: 'Deployed computer vision systems across 10 pilot farms in Nile Delta region to test crop monitoring and irrigation optimization algorithms.',
    institution: 'Cairo University',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e4',
    date: 'September 2022',
    year: 2022,
    quarter: 'Q3',
    title: 'First Joint Publications',
    description: 'Published two papers on reinforcement learning and computer vision at ICML 2022 and CVPR 2022, establishing research credibility.',
    institution: 'Cairo University',
    type: 'publication',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'e5',
    date: 'January 2023',
    year: 2023,
    quarter: 'Q1',
    title: 'AUC Partnership Established',
    description: 'Formed strategic partnership with American University in Cairo to advance neural-symbolic AI and ethical AI frameworks for the region.',
    institution: 'American University in Cairo',
    type: 'partnership',
    icon: Building2,
    color: 'cyan'
  },
  {
    id: 'e6',
    date: 'March 2023',
    year: 2023,
    quarter: 'Q1',
    title: 'Arabic NLP Research Initiative',
    description: 'Launched major research initiative with AUC to develop state-of-the-art Arabic language models covering multiple dialects.',
    institution: 'American University in Cairo',
    type: 'milestone',
    icon: Lightbulb,
    color: 'blue'
  },
  {
    id: 'e7',
    date: 'May 2023',
    year: 2023,
    quarter: 'Q2',
    title: 'Agriculture AI Expansion',
    description: 'Expanded precision agriculture program to 50+ farms after successful pilot, demonstrating 30% yield improvement and 40% water savings.',
    institution: 'Cairo University',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e8',
    date: 'July 2023',
    year: 2023,
    quarter: 'Q3',
    title: 'AI Ethics Framework Published',
    description: 'Released comprehensive ethical AI framework for Middle Eastern contexts in AI & Society journal, adopted by 5 regional institutions.',
    institution: 'American University in Cairo',
    type: 'publication',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'e9',
    date: 'October 2023',
    year: 2023,
    quarter: 'Q4',
    title: 'Best Paper Award at ACL 2023',
    description: 'Received Best Paper Award at ACL 2023 for groundbreaking work on transfer learning across Arabic language variants.',
    institution: 'American University in Cairo',
    type: 'award',
    icon: Award,
    color: 'yellow'
  },
  {
    id: 'e10',
    date: 'January 2024',
    year: 2024,
    quarter: 'Q1',
    title: 'Zewail City Partnership Established',
    description: 'Partnered with Zewail City of Science and Technology to explore quantum computing and neuromorphic AI architectures.',
    institution: 'Zewail City of Science',
    type: 'partnership',
    icon: Building2,
    color: 'cyan'
  },
  {
    id: 'e11',
    date: 'February 2024',
    year: 2024,
    quarter: 'Q1',
    title: 'Medical AI Deployed in Hospitals',
    description: 'Deployed medical image analysis AI system in 10 Egyptian hospitals, assisting radiologists with 95% diagnostic accuracy.',
    institution: 'Cairo University',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e12',
    date: 'April 2024',
    year: 2024,
    quarter: 'Q2',
    title: 'Quantum ML Breakthrough',
    description: 'Achieved 10x speedup in optimization problems using hybrid quantum-classical machine learning algorithms.',
    institution: 'Zewail City of Science',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e13',
    date: 'June 2024',
    year: 2024,
    quarter: 'Q2',
    title: 'Nature Machine Intelligence Publication',
    description: 'Published quantum machine learning research in Nature Machine Intelligence, receiving widespread recognition in the scientific community.',
    institution: 'Zewail City of Science',
    type: 'publication',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'e14',
    date: 'August 2024',
    year: 2024,
    quarter: 'Q3',
    title: 'Arabic NLP Model Released',
    description: 'Released open-source Arabic language model achieving 95% accuracy on dialect understanding, serving 400M+ Arabic speakers.',
    institution: 'American University in Cairo',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e15',
    date: 'October 2024',
    year: 2024,
    quarter: 'Q4',
    title: 'NeurIPS 2024 Publications',
    description: 'Published three papers at NeurIPS 2024 on neural-symbolic AI, cognitive architectures, and multi-agent systems.',
    institution: 'American University in Cairo',
    type: 'publication',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'e16',
    date: 'November 2024',
    year: 2024,
    quarter: 'Q4',
    title: 'Neuromorphic Chip Prototype',
    description: 'Completed prototype of brain-inspired AI chip achieving 100x energy efficiency, filed patent for novel architecture.',
    institution: 'Zewail City of Science',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e17',
    date: 'December 2024',
    year: 2024,
    quarter: 'Q4',
    title: 'Traffic AI System Deployed',
    description: 'Implemented AI-powered traffic management system in Cairo, reducing congestion by 20% and improving air quality citywide.',
    institution: 'Cairo University',
    type: 'breakthrough',
    icon: Rocket,
    color: 'green'
  },
  {
    id: 'e18',
    date: 'January 2025',
    year: 2025,
    quarter: 'Q1',
    title: '50+ Joint Researchers Milestone',
    description: 'Research partnership program expanded to include 50+ faculty and PhD students across all three Egyptian institutions.',
    institution: 'All Institutions',
    type: 'milestone',
    icon: Users,
    color: 'blue'
  },
  {
    id: 'e19',
    date: 'March 2025',
    year: 2025,
    quarter: 'Q1',
    title: 'Nature Medicine Publication',
    description: 'Published federated learning research in Nature Medicine, demonstrating privacy-preserving medical AI across multiple hospitals.',
    institution: 'Cairo University',
    type: 'publication',
    icon: FileText,
    color: 'purple'
  },
  {
    id: 'e20',
    date: 'June 2025',
    year: 2025,
    quarter: 'Q2',
    title: '100+ Citations Milestone',
    description: 'Joint research publications surpassed 100 citations per paper on average, demonstrating significant impact in AI research community.',
    institution: 'All Institutions',
    type: 'award',
    icon: Award,
    color: 'yellow'
  }
];

const colorClasses = {
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500',
  green: 'bg-green-500/20 text-green-400 border-green-500',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
};

export default function Timeline() {
  const years = [2022, 2023, 2024, 2025];

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
          <h1 className="text-4xl font-bold text-white mb-2">Partnership Timeline</h1>
          <p className="text-gray-300">Evolution of research collaborations, milestones, and breakthroughs (2022-2025)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Legend */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-12">
          <h3 className="text-lg font-bold text-white mb-4">Event Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
              <span className="text-gray-300 text-sm">Partnership</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-300 text-sm">Milestone</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300 text-sm">Breakthrough</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-gray-300 text-sm">Publication</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-300 text-sm">Award</span>
            </div>
          </div>
        </div>

        {/* Timeline by Year */}
        {years.map(year => {
          const yearEvents = events.filter(e => e.year === year);
          return (
            <div key={year} className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{year}</span>
                <span className="ml-4 text-sm text-gray-400 font-normal">({yearEvents.length} events)</span>
              </h2>
              
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                
                {/* Events */}
                <div className="space-y-8">
                  {yearEvents.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="relative pl-20">
                        {/* Timeline dot */}
                        <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${event.color === 'cyan' ? 'bg-cyan-500 border-cyan-400' : event.color === 'blue' ? 'bg-blue-500 border-blue-400' : event.color === 'green' ? 'bg-green-500 border-green-400' : event.color === 'purple' ? 'bg-purple-500 border-purple-400' : 'bg-yellow-500 border-yellow-400'} shadow-lg`}></div>
                        
                        {/* Event card */}
                        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${colorClasses[event.color as keyof typeof colorClasses]} mr-3`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                <p className="text-sm text-gray-400">{event.date}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[event.color as keyof typeof colorClasses]}`}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-3">{event.description}</p>
                          <div className="flex items-center text-sm text-cyan-400">
                            <Building2 className="h-4 w-4 mr-1" />
                            {event.institution}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Summary Stats */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Partnership Impact Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">{events.filter(e => e.type === 'partnership').length}</p>
              <p className="text-gray-400 text-sm mt-1">Partnerships</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{events.filter(e => e.type === 'milestone').length}</p>
              <p className="text-gray-400 text-sm mt-1">Milestones</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{events.filter(e => e.type === 'breakthrough').length}</p>
              <p className="text-gray-400 text-sm mt-1">Breakthroughs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">{events.filter(e => e.type === 'publication').length}</p>
              <p className="text-gray-400 text-sm mt-1">Publications</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{events.filter(e => e.type === 'award').length}</p>
              <p className="text-gray-400 text-sm mt-1">Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
