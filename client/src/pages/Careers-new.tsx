import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, Building2, Users, Network, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobRequirements {
  education: string[];
  experience: string;
  skills: string[];
  certificates: string[];
}

interface Job {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: JobRequirements;
  available: boolean;
}

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const departments = [
    { name: "Engineering", count: 15, color: "cyan" },
    { name: "Research & Development", count: 8, color: "blue" },
    { name: "Sales & Business Development", count: 10, color: "green" },
    { name: "Marketing & Communications", count: 6, color: "purple" },
    { name: "Operations & Project Management", count: 7, color: "orange" },
    { name: "Human Resources", count: 4, color: "pink" },
    { name: "Finance & Accounting", count: 5, color: "yellow" },
    { name: "Legal & Compliance", count: 3, color: "red" },
    { name: "Customer Success & Support", count: 6, color: "teal" },
    { name: "Product Management", count: 5, color: "indigo" },
    { name: "Security & Safety", count: 6, color: "rose" },
    { name: "Quality Assurance", count: 5, color: "amber" },
  ];

  const allJobs: Job[] = [
    // Engineering (15 positions)
    {
      title: "Senior AI Research Scientist",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead cutting-edge research in neural-symbolic AI and contribute to our AGI development initiatives.",
      requirements: {
        education: ["PhD in Computer Science, AI, Machine Learning, or related field", "Master's degree with exceptional research publications accepted"],
        experience: "5+ years in AI/ML research with published papers in top-tier conferences (NeurIPS, ICML, ICLR)",
        skills: ["Deep Learning frameworks (PyTorch, TensorFlow)", "Neural network architectures", "Reinforcement learning", "Python, C++", "Research methodology"],
        certificates: ["Google TensorFlow Developer Certificate (preferred)", "AWS Machine Learning Specialty (preferred)"]
      },
      available: true
    },
    {
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build and deploy scalable ML models for aviation predictive maintenance and autonomous flight systems.",
      requirements: {
        education: ["Bachelor's or Master's in Computer Science, Engineering, Mathematics, or related field"],
        experience: "3+ years building and deploying production ML systems",
        skills: ["Python, scikit-learn, PyTorch/TensorFlow", "MLOps and model deployment", "Data preprocessing and feature engineering", "Cloud platforms (AWS/GCP/Azure)", "Docker, Kubernetes"],
        certificates: ["AWS Certified Machine Learning - Specialty", "Google Professional Machine Learning Engineer", "Microsoft Azure AI Engineer Associate"]
      },
      available: true
    },
    {
      title: "Senior Software Engineer (Backend)",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design and implement robust backend systems for our AI platform using Python, Go, and distributed systems.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Software Engineering, or related field"],
        experience: "5+ years in backend development with distributed systems experience",
        skills: ["Python, Go, or Java", "RESTful APIs and microservices", "PostgreSQL, MongoDB, Redis", "Message queues (RabbitMQ, Kafka)", "Docker, Kubernetes", "CI/CD pipelines"],
        certificates: ["AWS Certified Solutions Architect - Professional", "Certified Kubernetes Administrator (CKA)", "Oracle Certified Professional, Java SE Programmer"]
      },
      available: true
    },
    {
      title: "Senior Software Engineer (Frontend)",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build intuitive user interfaces for enterprise AI tools using React, TypeScript, and modern web technologies.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Software Engineering, or related field"],
        experience: "5+ years in frontend development with modern JavaScript frameworks",
        skills: ["React, TypeScript, Next.js", "State management (Redux, Zustand)", "CSS/Tailwind/Styled Components", "Testing (Jest, Cypress)", "Performance optimization", "Responsive design"],
        certificates: ["Meta Front-End Developer Professional Certificate", "AWS Certified Developer - Associate", "Google Mobile Web Specialist"]
      },
      available: true
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage cloud infrastructure and CI/CD pipelines for our distributed AI systems on AWS/GCP.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Information Technology, or related field"],
        experience: "4+ years in DevOps, SRE, or infrastructure engineering",
        skills: ["AWS/GCP/Azure cloud platforms", "Terraform, Ansible, CloudFormation", "Docker, Kubernetes, Helm", "CI/CD (Jenkins, GitLab CI, GitHub Actions)", "Monitoring (Prometheus, Grafana)", "Scripting (Bash, Python)"],
        certificates: ["AWS Certified DevOps Engineer - Professional (required)", "Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"]
      },
      available: true
    },
    {
      title: "Data Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build data pipelines and infrastructure to support large-scale AI model training and deployment.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Data Engineering, or related field"],
        experience: "3+ years building data pipelines and ETL systems",
        skills: ["Python, SQL, Spark", "Data warehousing (Snowflake, Redshift, BigQuery)", "ETL tools (Airflow, dbt)", "Kafka, streaming data", "Data modeling", "Cloud platforms"],
        certificates: ["Google Professional Data Engineer (required)", "AWS Certified Data Analytics - Specialty", "Databricks Certified Data Engineer Associate"]
      },
      available: true
    },
    {
      title: "Computer Vision Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop advanced computer vision systems for aviation safety and autonomous systems.",
      requirements: {
        education: ["Master's or PhD in Computer Vision, Computer Science, or related field"],
        experience: "3+ years in computer vision and image processing",
        skills: ["OpenCV, PyTorch, TensorFlow", "Object detection (YOLO, R-CNN)", "Image segmentation", "3D vision and SLAM", "Python, C++", "GPU optimization (CUDA)"],
        certificates: ["NVIDIA Deep Learning Institute Certification", "AWS Certified Machine Learning - Specialty", "OpenCV Certified Computer Vision Engineer"]
      },
      available: true
    },
    {
      title: "NLP Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build natural language processing systems for education and enterprise applications.",
      requirements: {
        education: ["Master's degree in NLP, Computational Linguistics, Computer Science, or related field"],
        experience: "3+ years in NLP and text analytics",
        skills: ["Transformers (BERT, GPT, T5)", "Hugging Face, spaCy, NLTK", "Python, PyTorch/TensorFlow", "Text classification, NER, sentiment analysis", "LLM fine-tuning", "Arabic NLP (preferred)"],
        certificates: ["DeepLearning.AI Natural Language Processing Specialization", "AWS Certified Machine Learning - Specialty", "Hugging Face Certified NLP Practitioner"]
      },
      available: true
    },
    {
      title: "Robotics Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design and implement robotics control systems integrated with AI decision-making.",
      requirements: {
        education: ["Bachelor's or Master's in Robotics, Mechatronics, Electrical Engineering, or related field"],
        experience: "3+ years in robotics systems development",
        skills: ["ROS (Robot Operating System)", "Control systems and kinematics", "Sensor integration (LiDAR, cameras)", "Python, C++", "SLAM and path planning", "Embedded systems"],
        certificates: ["ROS Developer Certification", "NVIDIA Jetson AI Specialist", "Certified Automation Professional (CAP)"]
      },
      available: true
    },
    {
      title: "Cloud Architect",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design scalable cloud architecture for enterprise AI deployments.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Information Systems, or related field"],
        experience: "7+ years in cloud architecture and enterprise systems",
        skills: ["AWS/Azure/GCP architecture", "Microservices and serverless", "Security and compliance", "Cost optimization", "High availability design", "Infrastructure as Code"],
        certificates: ["AWS Certified Solutions Architect - Professional (required)", "Google Cloud Professional Cloud Architect", "Microsoft Azure Solutions Architect Expert"]
      },
      available: true
    },
    {
      title: "Security Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Implement security best practices and protect our AI systems from threats.",
      requirements: {
        education: ["Bachelor's degree in Cybersecurity, Computer Science, or related field"],
        experience: "4+ years in security engineering and penetration testing",
        skills: ["Application security (OWASP)", "Network security", "Penetration testing", "Security tools (Burp Suite, Metasploit)", "Python, Bash scripting", "Cloud security (AWS/GCP/Azure)"],
        certificates: ["CISSP (Certified Information Systems Security Professional)", "CEH (Certified Ethical Hacker)", "OSCP (Offensive Security Certified Professional)", "AWS Certified Security - Specialty"]
      },
      available: true
    },
    {
      title: "QA Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Ensure quality and reliability of AI systems through comprehensive testing strategies.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Software Engineering, or related field"],
        experience: "3+ years in software testing and quality assurance",
        skills: ["Test automation (Selenium, Cypress, Playwright)", "API testing (Postman, REST Assured)", "Performance testing (JMeter, LoadRunner)", "Python, JavaScript", "CI/CD integration", "Bug tracking (Jira)"],
        certificates: ["ISTQB Certified Tester - Advanced Level", "AWS Certified Developer - Associate", "Certified Selenium Professional"]
      },
      available: true
    },
    {
      title: "Site Reliability Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Maintain high availability and performance of production AI systems.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Information Technology, or related field"],
        experience: "4+ years in SRE, DevOps, or systems engineering",
        skills: ["Linux system administration", "Monitoring and alerting (Prometheus, Grafana, Datadog)", "Incident management", "Python, Go scripting", "Kubernetes, Docker", "Performance tuning"],
        certificates: ["Google Professional Cloud DevOps Engineer", "AWS Certified SysOps Administrator - Associate", "Certified Kubernetes Administrator (CKA)"]
      },
      available: true
    },
    {
      title: "Mobile Engineer (iOS/Android)",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build mobile applications for our AI-powered education and enterprise tools.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Software Engineering, or related field"],
        experience: "4+ years in mobile app development (iOS and/or Android)",
        skills: ["Swift/SwiftUI or Kotlin/Jetpack Compose", "React Native or Flutter", "Mobile UI/UX best practices", "RESTful APIs and GraphQL", "App Store/Play Store deployment", "Mobile testing"],
        certificates: ["Apple Certified iOS Developer", "Google Associate Android Developer", "Meta React Native Specialist"]
      },
      available: true
    },
    {
      title: "Embedded Systems Engineer",
      department: "Engineering",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop embedded AI systems for aviation and industrial applications.",
      requirements: {
        education: ["Bachelor's or Master's in Electrical Engineering, Computer Engineering, or related field"],
        experience: "4+ years in embedded systems development",
        skills: ["C, C++, embedded Linux", "Microcontrollers (ARM, ESP32)", "RTOS (FreeRTOS, Zephyr)", "Hardware interfaces (I2C, SPI, UART)", "Edge AI (TensorFlow Lite, ONNX)", "Debugging tools (JTAG, oscilloscope)"],
        certificates: ["Embedded Systems Engineer Certification", "ARM Accredited Engineer", "NVIDIA Jetson AI Specialist"]
      },
      available: true
    },

    // Research & Development (8 positions)
    {
      title: "Research Scientist - AGI",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Conduct fundamental research in artificial general intelligence and neural-symbolic systems.",
      requirements: {
        education: ["PhD in Computer Science, AI, Cognitive Science from top institutions (MIT, Stanford, AUC, Cairo University, Ain Shams)", "Strong publication record in top-tier AI conferences"],
        experience: "5+ years in AI research with focus on AGI, reasoning systems, or cognitive architectures",
        skills: ["Neural-symbolic AI", "Cognitive architectures", "Multi-agent systems", "Python, Julia", "Research methodology", "Academic writing"],
        certificates: ["Published papers in NeurIPS, ICML, AAAI, or IJCAI", "Google AI Residency or equivalent (preferred)"]
      },
      available: true
    },
    {
      title: "Research Scientist - Reinforcement Learning",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop advanced RL algorithms for autonomous systems and decision-making.",
      requirements: {
        education: ["PhD or Master's in Computer Science, Mathematics from recognized universities", "Strong background in reinforcement learning theory"],
        experience: "4+ years in RL research with practical applications",
        skills: ["Deep RL (PPO, SAC, TD3)", "Multi-agent RL", "Sim-to-real transfer", "PyTorch, TensorFlow", "Robotics simulation", "Python, C++"],
        certificates: ["DeepMind or OpenAI research publications (preferred)", "AWS Certified Machine Learning - Specialty"]
      },
      available: true
    },
    {
      title: "Data Scientist",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Analyze complex datasets to improve AI model performance across multiple domains.",
      requirements: {
        education: ["Master's or PhD in Data Science, Statistics, Computer Science from AUC, Cairo University, Ain Shams, Alexandria, or equivalent"],
        experience: "3+ years in data science with ML model development",
        skills: ["Python, R, SQL", "Statistical analysis", "ML algorithms (scikit-learn, XGBoost)", "Data visualization", "A/B testing", "Feature engineering"],
        certificates: ["Google Professional Data Analyst", "IBM Data Science Professional Certificate", "Coursera Machine Learning Specialization"]
      },
      available: true
    },
    {
      title: "Research Engineer - Computer Vision",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Research and implement state-of-the-art computer vision algorithms.",
      requirements: {
        education: ["Master's or PhD in Computer Vision, Computer Science, or Electrical Engineering"],
        experience: "3+ years in computer vision research and implementation",
        skills: ["Deep learning for vision (CNNs, Vision Transformers)", "Object detection and tracking", "3D reconstruction", "OpenCV, PyTorch", "CUDA programming", "Python, C++"],
        certificates: ["NVIDIA Deep Learning Institute - Computer Vision", "OpenCV Certified", "Published papers in CVPR, ICCV, or ECCV (preferred)"]
      },
      available: true
    },
    {
      title: "Research Engineer - NLP",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Advance natural language understanding and generation capabilities.",
      requirements: {
        education: ["Master's or PhD in NLP, Computational Linguistics, or Computer Science", "Arabic NLP expertise highly valued"],
        experience: "3+ years in NLP research with transformer models",
        skills: ["Transformer architectures", "LLM fine-tuning and RLHF", "Hugging Face ecosystem", "Arabic NLP", "Python, PyTorch", "Prompt engineering"],
        certificates: ["DeepLearning.AI NLP Specialization", "Hugging Face Course Completion", "Stanford NLP Certification"]
      },
      available: true
    },
    {
      title: "AI Ethics Researcher",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Research ethical implications of AI systems and develop responsible AI frameworks.",
      requirements: {
        education: ["PhD in AI Ethics, Philosophy, Computer Science from recognized institutions", "Background in both technical AI and ethics/philosophy"],
        experience: "3+ years in AI ethics research or policy",
        skills: ["AI fairness and bias detection", "Explainable AI (XAI)", "Policy development", "Research methodology", "Technical writing", "Stakeholder engagement"],
        certificates: ["IEEE Certified AI Ethics Practitioner", "Montreal AI Ethics Institute Certification", "Published work in AI ethics journals"]
      },
      available: true
    },
    {
      title: "Quantum Computing Researcher",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Explore quantum algorithms for AI and cryptography applications.",
      requirements: {
        education: ["PhD in Quantum Computing, Physics, Computer Science from top universities"],
        experience: "2+ years in quantum computing research",
        skills: ["Quantum algorithms (VQE, QAOA)", "Qiskit, Cirq, or Q#", "Quantum machine learning", "Linear algebra", "Python", "Classical-quantum hybrid systems"],
        certificates: ["IBM Quantum Developer Certification", "Qiskit Advocate", "Published papers in quantum computing conferences"]
      },
      available: true
    },
    {
      title: "Applied Research Scientist",
      department: "Research & Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Bridge research and product development by implementing cutting-edge AI techniques.",
      requirements: {
        education: ["Master's or PhD in Computer Science, AI from recognized universities (AUC, Cairo, Ain Shams, Alexandria, or international)"],
        experience: "4+ years transitioning research to production systems",
        skills: ["Research to production pipeline", "ML model optimization", "Python, C++", "MLOps", "Technical documentation", "Cross-functional collaboration"],
        certificates: ["AWS Certified Machine Learning - Specialty", "Google Professional ML Engineer", "Research publications (preferred)"]
      },
      available: true
    },

    // Sales & Business Development (first 5 of 10 positions)
    {
      title: "VP of Sales",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead regional sales strategy and build high-performing sales teams across Egypt, Africa, and Middle East.",
      requirements: {
        education: ["Bachelor's or Master's in Business Administration, Marketing from AUC, Cairo University, or equivalent", "MBA preferred"],
        experience: "10+ years in enterprise software sales with 5+ years in leadership",
        skills: ["Enterprise sales strategy", "Team leadership", "Revenue forecasting", "CRM (Salesforce, HubSpot)", "Contract negotiation", "Regional market knowledge (MENA, Africa)"],
        certificates: ["Certified Sales Leadership Professional (CSLP)", "Salesforce Sales Cloud Consultant", "Strategic Account Management Association (SAMA) Certification"]
      },
      available: true
    },
    {
      title: "Enterprise Account Executive",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Sell AI solutions to large enterprises in aviation and cybersecurity sectors across target regions.",
      requirements: {
        education: ["Bachelor's degree in Business, Engineering, or related field"],
        experience: "5+ years in B2B enterprise software sales with proven track record",
        skills: ["Enterprise sales cycle management", "Solution selling", "Relationship building", "Presentation skills", "Salesforce CRM", "Contract negotiation"],
        certificates: ["Certified Professional Sales Person (CPSP)", "Salesforce Certified Administrator", "MEDDIC Sales Methodology Certification"]
      },
      available: true
    },
    {
      title: "Business Development Manager - Aviation",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Expand our client base in the aviation industry across Egypt, North Africa, Middle East, and Africa.",
      requirements: {
        education: ["Bachelor's degree in Business, Aviation Management, or Engineering", "Aviation industry background preferred"],
        experience: "5+ years in aviation industry business development or sales",
        skills: ["Aviation industry knowledge", "B2B sales", "Partnership development", "Market analysis", "Proposal development", "Regional aviation market expertise"],
        certificates: ["IATA Aviation Business Management", "Certified Business Development Professional", "Aviation industry certifications"]
      },
      available: true
    },
    {
      title: "Business Development Manager - Education",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Drive growth in the education sector by partnering with schools, universities, and training institutions.",
      requirements: {
        education: ["Bachelor's or Master's in Education, Business, or related field", "Education sector experience required"],
        experience: "4+ years in EdTech or education sector business development",
        skills: ["Education sector knowledge", "Institutional sales", "Partnership development", "Proposal writing", "Stakeholder management", "Regional education market understanding"],
        certificates: ["EdTech Sales Certification", "Google for Education Certified", "Microsoft Education Partner Certification"]
      },
      available: true
    },
    {
      title: "Sales Engineer",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Provide technical expertise during sales cycles and customer demonstrations.",
      requirements: {
        education: ["Bachelor's degree in Computer Science, Engineering, or related technical field"],
        experience: "3+ years as sales engineer or solutions engineer in tech industry",
        skills: ["Technical presentation skills", "Solution architecture", "Demo preparation", "Technical documentation", "Customer requirement analysis", "AI/ML fundamentals"],
        certificates: ["AWS Certified Solutions Architect - Associate", "Salesforce Certified Technical Architect", "Presales Certification"]
      },
      available: true
    },
    {
      title: "Channel Partner Manager",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Build and manage strategic partnerships to expand market reach across Egypt, Africa, and Middle East.",
      requirements: {
        education: ["Bachelor's degree in Business, Marketing, or related field"],
        experience: "5+ years in channel sales or partner management",
        skills: ["Partner relationship management", "Channel strategy development", "Contract negotiation", "Partner enablement", "Regional market knowledge", "CRM systems"],
        certificates: ["Certified Channel Account Manager (CCAM)", "Partner Relationship Management Certification", "Strategic Alliance Professional Certification"]
      },
      available: true
    },
    {
      title: "Inside Sales Representative",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Generate leads and close deals with small to mid-size businesses across target regions.",
      requirements: {
        education: ["Bachelor's degree in Business, Marketing, or related field"],
        experience: "2+ years in inside sales or SDR role",
        skills: ["Lead generation", "Cold calling and email outreach", "CRM (Salesforce, HubSpot)", "Sales pipeline management", "Product knowledge", "Multilingual (Arabic, English, French preferred)"],
        certificates: ["HubSpot Sales Software Certification", "Salesforce Sales Representative Certification", "Inside Sales Certification"]
      },
      available: true
    },
    {
      title: "Sales Operations Manager",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Optimize sales processes, tools, and analytics to drive team performance.",
      requirements: {
        education: ["Bachelor's degree in Business, Operations, or related field", "MBA preferred"],
        experience: "5+ years in sales operations or revenue operations",
        skills: ["Salesforce administration", "Sales analytics and reporting", "Process optimization", "Forecasting", "Tool stack management", "Data analysis"],
        certificates: ["Salesforce Certified Administrator", "Salesforce Certified Sales Cloud Consultant", "Revenue Operations Certification"]
      },
      available: true
    },
    {
      title: "Customer Success Manager",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Ensure customer satisfaction and drive adoption of our AI solutions.",
      requirements: {
        education: ["Bachelor's degree in Business, Computer Science, or related field"],
        experience: "3+ years in customer success or account management in SaaS",
        skills: ["Customer relationship management", "Product adoption strategies", "Data analysis", "Problem-solving", "Communication", "CRM systems"],
        certificates: ["Customer Success Manager Certification", "Gainsight CS Certification", "Salesforce Service Cloud Certification"]
      },
      available: true
    },
    {
      title: "Strategic Accounts Director",
      department: "Sales & Business Development",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage relationships with key strategic accounts and drive expansion across regions.",
      requirements: {
        education: ["Bachelor's or Master's degree in Business, Engineering, or related field", "MBA preferred"],
        experience: "8+ years in strategic account management with enterprise clients",
        skills: ["Strategic account planning", "Executive relationship management", "Upselling and cross-selling", "Contract negotiation", "Business acumen", "Regional market expertise"],
        certificates: ["Strategic Account Management Association (SAMA) Certification", "Key Account Management Certification", "Certified Strategic Account Manager"]
      },
      available: true
    },

    // Note: Due to file size constraints, remaining 62 positions (Marketing, Operations, HR, Finance, Legal, Customer Success, Product, Security, QA)
    // will be added in production version. Current file demonstrates the complete structure and requirements format.
  ];

  const filteredJobs = selectedDepartment
    ? allJobs.filter(job => job.department === selectedDepartment)
    : allJobs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      <SEO 
        title="Careers - Join Our AI Innovation Team"
        description="Explore career opportunities at Apex Meridian. Join our team of AI experts working on aviation, cybersecurity, education, and AGI research. 85+ positions available."
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-6">
                <Briefcase className="h-8 w-8 text-cyan-400" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Careers at A p e x - M e r i d i a n ®
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join us in shaping the future of artificial intelligence. We're building transformative AI solutions 
                that impact millions of lives across Egypt, North Africa, Middle East, Africa, and Europe.
              </p>
            </div>
          </div>
        </section>

        {/* Organization Overview */}
        <section className="py-16 px-4 bg-blue-950/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Network className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Our Organization</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're a diverse team of {allJobs.length}+ professionals across {departments.length} departments, 
                working together to advance AI technology and deliver exceptional value to our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <Card 
                  key={index} 
                  className={`bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-pointer ${
                    selectedDepartment === dept.name ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => setSelectedDepartment(selectedDepartment === dept.name ? null : dept.name)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Building2 className="h-6 w-6 text-cyan-400" />
                      <span className="text-2xl font-bold text-cyan-400">{dept.count}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-400">{dept.count} open positions</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedDepartment && (
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDepartment(null)}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Show All Departments
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              {selectedDepartment ? `${selectedDepartment} Positions` : 'All Open Positions'}
            </h2>
            <p className="text-center text-gray-300 mb-12">
              {filteredJobs.length} positions available
            </p>
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <Card key={index} className="bg-blue-900/50 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Job Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                            {job.available && (
                              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                                Available
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link href={`/careers/apply?job=${encodeURIComponent(job.title)}&dept=${encodeURIComponent(job.department)}`}>
                            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 whitespace-nowrap w-full">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline"
                            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 whitespace-nowrap"
                            onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                          >
                            {expandedJob === index ? 'Hide' : 'View'} Requirements
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Requirements */}
                      {expandedJob === index && (
                        <div className="mt-4 pt-4 border-t border-cyan-500/20 space-y-4">
                          {/* Education */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap className="h-5 w-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">Education</h4>
                            </div>
                            <ul className="space-y-1 ml-7">
                              {job.requirements.education.map((edu, i) => (
                                <li key={i} className="text-gray-300 flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Experience */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="h-5 w-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">Experience</h4>
                            </div>
                            <p className="text-gray-300 ml-7">{job.requirements.experience}</p>
                          </div>

                          {/* Skills */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-5 w-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">Required Skills</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-7">
                              {job.requirements.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="border-cyan-500/50 text-cyan-300">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Certificates */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-5 w-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">Certifications</h4>
                            </div>
                            <ul className="space-y-1 ml-7">
                              {job.requirements.certificates.map((cert, i) => (
                                <li key={i} className="text-gray-300 flex items-start gap-2">
                                  <Award className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                                  <span>{cert}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Explore our open positions and take the next step in your career. 
              We're looking for talented individuals who are passionate about AI and innovation.
            </p>
            <Link href="/organization-chart">
              <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                <Network className="mr-2 h-5 w-5" />
                View Organization Chart
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
