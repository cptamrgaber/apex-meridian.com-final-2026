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
    { name: "Art & Design", count: 12, color: "fuchsia" },
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

    // Art & Design (12 positions)
    {
      title: "Art Director",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead creative vision and direct visual content creation across all media platforms and AI-powered production projects.",
      requirements: {
        education: ["Bachelor's or Master's degree in Fine Arts, Graphic Design, or related field from AUC, Cairo University, Ain Shams, or equivalent"],
        experience: "7+ years in art direction with portfolio demonstrating excellence in visual storytelling",
        skills: ["Creative direction", "Adobe Creative Suite mastery", "Brand development", "Team leadership", "AI art tools (Midjourney, DALL-E, Stable Diffusion)", "Video production oversight"],
        certificates: ["Adobe Certified Expert (ACE)", "Certified Graphic Designer (CGD)", "Creative Leadership Certification"]
      },
      available: true
    },
    {
      title: "Creative Director",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Define and execute creative strategy for AI-powered media production, social media campaigns, and brand identity.",
      requirements: {
        education: ["Bachelor's or Master's degree in Design, Advertising, or related field"],
        experience: "10+ years in creative leadership roles with proven track record",
        skills: ["Strategic creative thinking", "Campaign conceptualization", "Multi-platform content strategy", "Team management", "Client presentation", "Trend forecasting"],
        certificates: ["Certified Creative Director", "Brand Strategy Certification", "Digital Marketing Creative Certification"]
      },
      available: true
    },
    {
      title: "Senior Graphic Designer",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Create compelling visual designs for digital and print media, leveraging AI tools for enhanced creativity.",
      requirements: {
        education: ["Bachelor's degree in Graphic Design, Visual Arts, or related field from Cairo University, AUC, Ain Shams, or equivalent"],
        experience: "5+ years in graphic design with strong portfolio",
        skills: ["Adobe Photoshop, Illustrator, InDesign", "Typography", "Layout design", "Brand identity", "AI design tools", "Print and digital design"],
        certificates: ["Adobe Certified Professional", "Certified Graphic Designer", "UI/UX Design Certification"]
      },
      available: true
    },
    {
      title: "UI/UX Designer",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design intuitive user interfaces and experiences for AI-powered applications and digital platforms.",
      requirements: {
        education: ["Bachelor's degree in Design, HCI, or related field"],
        experience: "4+ years in UI/UX design with portfolio of digital products",
        skills: ["Figma, Sketch, Adobe XD", "User research", "Wireframing and prototyping", "Interaction design", "Usability testing", "Design systems"],
        certificates: ["Google UX Design Certificate", "Nielsen Norman Group UX Certification", "Interaction Design Foundation Certification"]
      },
      available: true
    },
    {
      title: "Motion Graphics Designer",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Create dynamic animations and motion graphics for videos, social media, and marketing content.",
      requirements: {
        education: ["Bachelor's degree in Animation, Motion Graphics, or related field"],
        experience: "3+ years in motion graphics with showreel",
        skills: ["After Effects", "Cinema 4D or Blender", "2D/3D animation", "Typography animation", "Compositing", "Video editing"],
        certificates: ["Adobe Certified Expert in After Effects", "Motion Design Certification", "3D Animation Certificate"]
      },
      available: true
    },
    {
      title: "Video Editor",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Edit and produce high-quality videos for YouTube, TikTok, social media, and marketing campaigns.",
      requirements: {
        education: ["Bachelor's degree in Film Production, Media, or related field"],
        experience: "3+ years in video editing with portfolio of published work",
        skills: ["Adobe Premiere Pro, Final Cut Pro", "Color grading (DaVinci Resolve)", "Audio editing", "Storytelling", "Multi-platform optimization", "AI video tools"],
        certificates: ["Adobe Certified Professional in Premiere Pro", "DaVinci Resolve Certification", "YouTube Content Creator Certification"]
      },
      available: true
    },
    {
      title: "3D Artist",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Create 3D models, environments, and assets for AI-powered media production and visual effects.",
      requirements: {
        education: ["Bachelor's degree in 3D Animation, Computer Graphics, or related field"],
        experience: "4+ years in 3D modeling and rendering",
        skills: ["Blender, Maya, or 3ds Max", "Texturing and shading", "Lighting and rendering", "Character modeling", "Environment design", "UV mapping"],
        certificates: ["Autodesk Certified Professional", "Blender Certification", "ZBrush Certification"]
      },
      available: true
    },
    {
      title: "Visual Effects (VFX) Artist",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Create stunning visual effects for video content, including compositing, motion tracking, and CGI integration.",
      requirements: {
        education: ["Bachelor's degree in VFX, Film Production, or related field"],
        experience: "4+ years in VFX production with showreel",
        skills: ["After Effects", "Nuke or Fusion", "Motion tracking", "Rotoscoping", "Green screen compositing", "Particle effects"],
        certificates: ["VFX Compositing Certification", "Adobe After Effects Certification", "Nuke Certified Professional"]
      },
      available: true
    },
    {
      title: "Content Strategist",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop content strategies for social media, video platforms, and marketing campaigns aligned with business goals.",
      requirements: {
        education: ["Bachelor's degree in Marketing, Communications, or related field"],
        experience: "5+ years in content strategy with proven results",
        skills: ["Content planning", "Audience research", "SEO and analytics", "Platform optimization (YouTube, TikTok, Instagram)", "Trend analysis", "AI content tools"],
        certificates: ["Content Marketing Certification", "HubSpot Content Marketing", "Google Analytics Certification"]
      },
      available: true
    },
    {
      title: "Social Media Manager",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage social media presence, create engaging content, and execute marketing campaigns across all platforms.",
      requirements: {
        education: ["Bachelor's degree in Marketing, Communications, or related field"],
        experience: "4+ years in social media management with portfolio",
        skills: ["Social media strategy", "Content creation", "Community management", "Analytics and reporting", "Paid social advertising", "Influencer partnerships"],
        certificates: ["Facebook Blueprint Certification", "Hootsuite Social Marketing Certification", "Google Ads Certification"]
      },
      available: true
    },
    {
      title: "Script Writer",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Write compelling scripts for videos, ads, social media content, and marketing materials using AI-assisted tools.",
      requirements: {
        education: ["Bachelor's degree in Creative Writing, Journalism, Film, or related field"],
        experience: "3+ years in scriptwriting or copywriting",
        skills: ["Scriptwriting", "Storytelling", "Copywriting", "Video script formatting", "AI writing tools (GPT-4, Claude)", "SEO writing"],
        certificates: ["Copywriting Certification", "Content Writing Certification", "Screenwriting Certificate"]
      },
      available: true
    },
    {
      title: "Audio Engineer",
      department: "Art & Design",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Produce and edit audio for videos, podcasts, voiceovers, and music using AI audio generation tools.",
      requirements: {
        education: ["Bachelor's degree in Audio Engineering, Music Production, or related field"],
        experience: "4+ years in audio production",
        skills: ["Pro Tools, Logic Pro, Ableton", "Audio mixing and mastering", "Sound design", "Voiceover recording", "AI audio tools (ElevenLabs, MusicGen)", "Podcast production"],
        certificates: ["Avid Certified Pro Tools User", "Audio Engineering Society Certification", "Music Production Certification"]
      },
      available: true
    },


    // Marketing & Communications (6 positions)
    {
      title: "Chief Marketing Officer (CMO)",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead global marketing strategy and brand positioning for Apex Meridian across Egypt, North Africa, Middle East, and Africa markets.",
      requirements: {
        education: ["MBA in Marketing or related field", "Bachelor's in Marketing, Business, Communications from AUC, Cairo University, Ain Shams, or equivalent"],
        experience: "10+ years in marketing leadership roles, preferably in tech/AI industry",
        skills: ["Strategic marketing planning", "Brand management", "Digital marketing", "Team leadership", "Budget management", "Market analysis", "Regional market expertise (MENA/Africa)"],
        certificates: ["Google Analytics Certification", "HubSpot Inbound Marketing Certification", "Digital Marketing Institute Certified Digital Marketing Professional"]
      },
      available: true
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage digital marketing campaigns across social media, SEO, SEM, and content marketing to drive brand awareness and lead generation.",
      requirements: {
        education: ["Bachelor's degree in Marketing, Communications, or related field"],
        experience: "5+ years in digital marketing with proven ROI results",
        skills: ["SEO/SEM", "Google Ads, Facebook Ads", "Marketing automation", "Analytics and reporting", "Content strategy", "Social media management"],
        certificates: ["Google Ads Certification", "Facebook Blueprint Certification", "HubSpot Content Marketing Certification"]
      },
      available: true
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Create compelling content for blogs, whitepapers, case studies, and social media to establish thought leadership in AI industry.",
      requirements: {
        education: ["Bachelor's in Marketing, Journalism, Communications, or English"],
        experience: "3+ years in content marketing or technical writing",
        skills: ["Content creation and editing", "SEO writing", "Technical writing", "CMS platforms", "Social media content", "Analytics"],
        certificates: ["HubSpot Content Marketing Certification", "Google Analytics Individual Qualification", "Copyblogger Certified Content Marketer"]
      },
      available: true
    },
    {
      title: "Brand Manager",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop and maintain Apex Meridian brand identity, ensuring consistent messaging across all channels and markets.",
      requirements: {
        education: ["Bachelor's or Master's in Marketing, Brand Management, or Business Administration"],
        experience: "4+ years in brand management or marketing",
        skills: ["Brand strategy", "Market research", "Creative direction", "Stakeholder management", "Budget management", "Brand guidelines development"],
        certificates: ["Brand Management Certification", "Market Research Certification", "Digital Marketing Certification"]
      },
      available: true
    },
    {
      title: "Social Media Manager",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage Apex Meridian's social media presence across LinkedIn, Twitter, YouTube, and regional platforms to engage audiences.",
      requirements: {
        education: ["Bachelor's in Marketing, Communications, or related field"],
        experience: "3+ years managing social media for B2B tech companies",
        skills: ["Social media strategy", "Community management", "Content creation", "Analytics and reporting", "Paid social advertising", "Crisis management"],
        certificates: ["Facebook Blueprint Certification", "Hootsuite Social Marketing Certification", "Twitter Flight School Certification"]
      },
      available: true
    },
    {
      title: "Marketing Analytics Specialist",
      department: "Marketing & Communications",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Analyze marketing campaign performance, customer behavior, and ROI to optimize marketing strategies and budget allocation.",
      requirements: {
        education: ["Bachelor's in Marketing, Statistics, Data Science, or related field"],
        experience: "3+ years in marketing analytics or data analysis",
        skills: ["Google Analytics", "Data visualization (Tableau, Power BI)", "SQL", "Python/R", "A/B testing", "Statistical analysis", "Marketing attribution modeling"],
        certificates: ["Google Analytics Individual Qualification", "Google Data Analytics Professional Certificate", "Tableau Desktop Specialist"]
      },
      available: true
    },

    // Operations & Project Management (8 positions)
    {
      title: "Chief Operating Officer (COO)",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Oversee all operational aspects of Apex Meridian including data center operations, project delivery, and process optimization.",
      requirements: {
        education: ["MBA or Master's in Operations Management, Engineering, or related field", "Bachelor's from AUC, Cairo University, or equivalent"],
        experience: "12+ years in operations leadership, preferably in tech/AI industry",
        skills: ["Strategic planning", "Operations management", "Process optimization", "Team leadership", "Budget management", "Data center operations", "Vendor management"],
        certificates: ["PMP (Project Management Professional)", "Six Sigma Black Belt", "ITIL Foundation"]
      },
      available: true
    },
    {
      title: "Senior Project Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead complex AI implementation projects for enterprise clients, ensuring on-time delivery and stakeholder satisfaction.",
      requirements: {
        education: ["Bachelor's in Engineering, Computer Science, Business, or related field"],
        experience: "7+ years in project management, preferably in AI/tech projects",
        skills: ["Project planning and execution", "Agile/Scrum methodologies", "Risk management", "Stakeholder communication", "Budget management", "Team coordination"],
        certificates: ["PMP (Project Management Professional)", "Certified Scrum Master (CSM)", "PRINCE2 Practitioner"]
      },
      available: true
    },
    {
      title: "Operations Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage day-to-day operations including resource allocation, process improvement, and operational efficiency.",
      requirements: {
        education: ["Bachelor's in Business Administration, Operations Management, or related field"],
        experience: "5+ years in operations management",
        skills: ["Process optimization", "Resource management", "KPI tracking", "Vendor management", "Team coordination", "Problem-solving"],
        certificates: ["Six Sigma Green Belt", "Certified Manager (CM)", "ITIL Foundation"]
      },
      available: true
    },
    {
      title: "Data Center Operations Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Oversee self-hosted data center operations in Egypt, ensuring 99.99% uptime, security, and infrastructure scalability.",
      requirements: {
        education: ["Bachelor's in Computer Science, Information Technology, Engineering, or related field"],
        experience: "6+ years in data center operations or infrastructure management",
        skills: ["Data center infrastructure", "Server management", "Network operations", "Disaster recovery", "Security protocols", "Capacity planning", "Vendor management"],
        certificates: ["CDCP (Certified Data Centre Professional)", "CCNA (Cisco Certified Network Associate)", "CompTIA Server+"]
      },
      available: true
    },
    {
      title: "Business Process Analyst",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Analyze and optimize business processes across departments to improve efficiency and reduce operational costs.",
      requirements: {
        education: ["Bachelor's in Business Administration, Industrial Engineering, or related field"],
        experience: "4+ years in business process analysis or improvement",
        skills: ["Process mapping", "Data analysis", "Lean Six Sigma", "Workflow optimization", "Documentation", "Stakeholder interviews"],
        certificates: ["Six Sigma Green Belt", "Certified Business Analysis Professional (CBAP)", "Lean Six Sigma Certification"]
      },
      available: true
    },
    {
      title: "Supply Chain Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage procurement of hardware, software licenses, and data center equipment for regional operations.",
      requirements: {
        education: ["Bachelor's in Supply Chain Management, Business, Engineering, or related field"],
        experience: "5+ years in supply chain or procurement management",
        skills: ["Procurement strategy", "Vendor negotiation", "Inventory management", "Logistics", "Contract management", "Cost optimization"],
        certificates: ["CSCP (Certified Supply Chain Professional)", "CPSM (Certified Professional in Supply Management)", "APICS CPIM"]
      },
      available: true
    },
    {
      title: "Facilities Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage office facilities, data center physical infrastructure, and expansion planning across Egypt and regional sites.",
      requirements: {
        education: ["Bachelor's in Facilities Management, Engineering, Business Administration, or related field"],
        experience: "5+ years in facilities or property management",
        skills: ["Facilities planning", "Vendor management", "Budget management", "Safety compliance", "Space planning", "Maintenance coordination"],
        certificates: ["CFM (Certified Facility Manager)", "FMP (Facility Management Professional)", "LEED Green Associate"]
      },
      available: true
    },
    {
      title: "Quality Control Manager",
      department: "Operations & Project Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Establish and maintain quality standards across all operations, ensuring consistent service delivery and compliance.",
      requirements: {
        education: ["Bachelor's in Quality Management, Engineering, or related field"],
        experience: "6+ years in quality management or assurance",
        skills: ["Quality management systems", "ISO standards", "Audit management", "Process improvement", "Statistical analysis", "Documentation"],
        certificates: ["ASQ Certified Quality Manager (CQM)", "ISO 9001 Lead Auditor", "Six Sigma Black Belt"]
      },
      available: true
    },

    // Human Resources (6 positions)
    {
      title: "Chief Human Resources Officer (CHRO)",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead HR strategy, talent acquisition, employee development, and organizational culture for Apex Meridian's growing team.",
      requirements: {
        education: ["Master's in Human Resources, Business Administration, or related field", "Bachelor's from AUC, Cairo University, or equivalent"],
        experience: "10+ years in HR leadership roles",
        skills: ["Strategic HR planning", "Talent management", "Organizational development", "Employee relations", "Compensation and benefits", "Labor law compliance", "Change management"],
        certificates: ["SHRM-SCP (Senior Certified Professional)", "CIPD Level 7", "Global Professional in Human Resources (GPHR)"]
      },
      available: true
    },
    {
      title: "Talent Acquisition Manager",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead recruitment efforts to attract top AI talent across Egypt, North Africa, Middle East, and Africa regions.",
      requirements: {
        education: ["Bachelor's in Human Resources, Business, Psychology, or related field"],
        experience: "5+ years in talent acquisition or recruitment management",
        skills: ["Recruitment strategy", "Candidate sourcing", "Interviewing techniques", "Employer branding", "ATS systems", "Regional talent market knowledge"],
        certificates: ["AIRS Certified Diversity and Inclusion Recruiter", "LinkedIn Certified Professional - Recruiter", "SHRM Talent Acquisition Specialty Credential"]
      },
      available: true
    },
    {
      title: "HR Business Partner",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Partner with department leaders to align HR strategies with business objectives and support organizational growth.",
      requirements: {
        education: ["Bachelor's in Human Resources, Business Administration, or related field"],
        experience: "5+ years in HR business partnering or generalist roles",
        skills: ["Strategic HR consulting", "Employee relations", "Performance management", "Organizational development", "Change management", "Data analysis"],
        certificates: ["SHRM-CP (Certified Professional)", "CIPD Level 5", "HR Business Partner Certification"]
      },
      available: true
    },
    {
      title: "Learning & Development Manager",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design and implement training programs to upskill employees in AI technologies and professional development.",
      requirements: {
        education: ["Bachelor's in Education, Human Resources, Organizational Development, or related field"],
        experience: "4+ years in learning and development or training management",
        skills: ["Training program design", "E-learning platforms", "Instructional design", "Performance assessment", "Leadership development", "Technical training"],
        certificates: ["CPTD (Certified Professional in Talent Development)", "ATD Master Trainer", "Certified Training and Development Professional"]
      },
      available: true
    },
    {
      title: "Compensation & Benefits Specialist",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage compensation structures, benefits programs, and ensure competitive packages to attract and retain talent.",
      requirements: {
        education: ["Bachelor's in Human Resources, Business Administration, Finance, or related field"],
        experience: "3+ years in compensation and benefits management",
        skills: ["Compensation analysis", "Benefits administration", "Market benchmarking", "Payroll systems", "Regulatory compliance", "Data analysis"],
        certificates: ["Certified Compensation Professional (CCP)", "Certified Benefits Professional (CBP)", "WorldatWork Total Rewards Certification"]
      },
      available: true
    },
    {
      title: "Employee Relations Specialist",
      department: "Human Resources",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Handle employee relations issues, workplace conflicts, and ensure positive employee experience and engagement.",
      requirements: {
        education: ["Bachelor's in Human Resources, Psychology, Business, or related field"],
        experience: "3+ years in employee relations or HR generalist role",
        skills: ["Conflict resolution", "Employee counseling", "Labor law compliance", "Investigation techniques", "Communication", "Mediation"],
        certificates: ["SHRM-CP", "Employee Relations Certification", "Workplace Mediation Certification"]
      },
      available: true
    },

    // Finance & Accounting (6 positions)
    {
      title: "Chief Financial Officer (CFO)",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead financial strategy, planning, and operations for Apex Meridian including regional expansion funding and investor relations.",
      requirements: {
        education: ["MBA in Finance or Master's in Accounting", "Bachelor's in Finance, Accounting, Economics from AUC, Cairo University, or equivalent"],
        experience: "12+ years in finance leadership roles, preferably in tech industry",
        skills: ["Financial strategy", "Budgeting and forecasting", "Investor relations", "Risk management", "Financial reporting", "Team leadership", "Regulatory compliance"],
        certificates: ["CPA (Certified Public Accountant)", "CFA (Chartered Financial Analyst)", "ACCA (Association of Chartered Certified Accountants)"]
      },
      available: true
    },
    {
      title: "Financial Controller",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Oversee accounting operations, financial reporting, and internal controls to ensure accuracy and compliance.",
      requirements: {
        education: ["Bachelor's or Master's in Accounting, Finance, or related field"],
        experience: "7+ years in accounting with controller experience",
        skills: ["Financial reporting", "GAAP/IFRS standards", "Internal controls", "Audit management", "ERP systems", "Team management"],
        certificates: ["CPA", "CMA (Certified Management Accountant)", "CIA (Certified Internal Auditor)"]
      },
      available: true
    },
    {
      title: "Senior Financial Analyst",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Conduct financial analysis, forecasting, and modeling to support strategic business decisions and investment planning.",
      requirements: {
        education: ["Bachelor's in Finance, Economics, Accounting, or related field"],
        experience: "5+ years in financial analysis or FP&A",
        skills: ["Financial modeling", "Forecasting", "Data analysis", "Excel (advanced)", "SQL", "Business intelligence tools", "Presentation skills"],
        certificates: ["CFA Level I or higher", "Financial Modeling & Valuation Analyst (FMVA)", "Certified Corporate FP&A Professional"]
      },
      available: true
    },
    {
      title: "Accounts Manager",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage accounts payable, receivable, and general ledger operations ensuring accurate and timely financial transactions.",
      requirements: {
        education: ["Bachelor's in Accounting, Finance, or related field"],
        experience: "4+ years in accounting or finance roles",
        skills: ["Accounts payable/receivable", "General ledger", "Reconciliation", "ERP systems (SAP, Oracle)", "Financial reporting", "Team coordination"],
        certificates: ["CPA", "Certified Bookkeeper", "QuickBooks Certification"]
      },
      available: true
    },
    {
      title: "Tax Manager",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage tax compliance, planning, and strategy across Egypt and regional operations ensuring regulatory adherence.",
      requirements: {
        education: ["Bachelor's or Master's in Accounting, Tax, Finance, or related field"],
        experience: "6+ years in tax accounting or planning",
        skills: ["Tax compliance", "Tax planning", "Egyptian tax law", "International tax", "Transfer pricing", "Tax software", "Audit support"],
        certificates: ["CPA", "Enrolled Agent (EA)", "Certified Tax Advisor"]
      },
      available: true
    },
    {
      title: "Payroll Specialist",
      department: "Finance & Accounting",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Process payroll accurately and timely for all employees, ensuring compliance with Egyptian labor laws and tax regulations.",
      requirements: {
        education: ["Bachelor's in Accounting, Finance, Human Resources, or related field"],
        experience: "3+ years in payroll processing",
        skills: ["Payroll processing", "Payroll software", "Egyptian labor law", "Tax compliance", "Benefits administration", "Data accuracy"],
        certificates: ["Certified Payroll Professional (CPP)", "Fundamental Payroll Certification (FPC)", "ADP Payroll Certification"]
      },
      available: true
    },

    // Legal & Compliance (5 positions)
    {
      title: "General Counsel / Chief Legal Officer",
      department: "Legal & Compliance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead legal strategy, contract negotiations, regulatory compliance, and intellectual property protection for Apex Meridian.",
      requirements: {
        education: ["Law degree (LLB or JD) from accredited university", "Master's in Law (LLM) preferred"],
        experience: "10+ years legal experience, preferably in tech/AI industry",
        skills: ["Corporate law", "Contract negotiation", "Regulatory compliance", "Intellectual property", "Risk management", "Litigation management", "Regional legal frameworks (Egypt, MENA, Africa)"],
        certificates: ["Licensed to practice law in Egypt", "Data Protection Certification", "Corporate Governance Certification"]
      },
      available: true
    },
    {
      title: "Corporate Lawyer",
      department: "Legal & Compliance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Handle corporate legal matters including contracts, partnerships, M&A activities, and corporate governance.",
      requirements: {
        education: ["Law degree (LLB or JD)", "Specialization in corporate law preferred"],
        experience: "5+ years in corporate law practice",
        skills: ["Contract drafting and review", "Corporate governance", "M&A transactions", "Due diligence", "Negotiation", "Legal research"],
        certificates: ["Licensed to practice law", "Corporate Law Certification", "Contract Management Certification"]
      },
      available: true
    },
    {
      title: "Compliance Manager",
      department: "Legal & Compliance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Ensure Apex Meridian complies with all regulatory requirements including data protection, AI ethics, and industry standards.",
      requirements: {
        education: ["Bachelor's in Law, Business, or related field", "Law degree preferred"],
        experience: "5+ years in compliance or risk management",
        skills: ["Regulatory compliance", "Risk assessment", "Policy development", "Audit management", "Training and awareness", "Reporting"],
        certificates: ["Certified Compliance & Ethics Professional (CCEP)", "Certified Regulatory Compliance Manager (CRCM)", "ISO 27001 Lead Auditor"]
      },
      available: true
    },
    {
      title: "Data Privacy Officer",
      department: "Legal & Compliance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Oversee data protection compliance including GDPR, regional data privacy laws, and internal data governance policies.",
      requirements: {
        education: ["Bachelor's in Law, Information Technology, or related field"],
        experience: "4+ years in data privacy or information security",
        skills: ["GDPR compliance", "Data protection laws", "Privacy impact assessments", "Data governance", "Policy development", "Training"],
        certificates: ["CIPP/E (Certified Information Privacy Professional/Europe)", "CIPM (Certified Information Privacy Manager)", "CDPSE (Certified Data Privacy Solutions Engineer)"]
      },
      available: true
    },
    {
      title: "Intellectual Property Specialist",
      department: "Legal & Compliance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage IP portfolio including patents, trademarks, copyrights, and trade secrets for AI innovations and technologies.",
      requirements: {
        education: ["Law degree with specialization in intellectual property", "Technical background in AI/Computer Science preferred"],
        experience: "4+ years in IP law or management",
        skills: ["Patent prosecution", "Trademark management", "IP strategy", "Technology licensing", "IP litigation support", "Prior art research"],
        certificates: ["Patent Agent License", "Certified Licensing Professional (CLP)", "IP Law Certification"]
      },
      available: true
    },

    // Customer Success & Support (6 positions)
    {
      title: "VP of Customer Success",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead customer success strategy ensuring client satisfaction, retention, and expansion across all markets.",
      requirements: {
        education: ["Bachelor's or Master's in Business, Engineering, or related field"],
        experience: "8+ years in customer success leadership, preferably in B2B tech/SaaS",
        skills: ["Customer success strategy", "Team leadership", "Account management", "Customer analytics", "Stakeholder management", "Process optimization"],
        certificates: ["Certified Customer Success Manager (CCSM)", "Customer Success Leadership Certification", "Gainsight Certification"]
      },
      available: true
    },
    {
      title: "Senior Customer Success Manager",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage strategic enterprise accounts ensuring successful AI implementation, adoption, and measurable business outcomes.",
      requirements: {
        education: ["Bachelor's in Business, Engineering, Computer Science, or related field"],
        experience: "5+ years in customer success or account management",
        skills: ["Account management", "Relationship building", "Technical consultation", "Project coordination", "Data analysis", "Presentation skills"],
        certificates: ["Certified Customer Success Manager", "Salesforce Administrator", "Project Management Professional (PMP)"]
      },
      available: true
    },
    {
      title: "Technical Support Engineer",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Provide technical support for AI platform users, troubleshoot issues, and ensure smooth system operations.",
      requirements: {
        education: ["Bachelor's in Computer Science, Information Technology, or related field"],
        experience: "3+ years in technical support or customer-facing technical role",
        skills: ["Troubleshooting", "System administration", "API integration", "SQL", "Ticketing systems", "Customer communication", "Documentation"],
        certificates: ["CompTIA A+", "ITIL Foundation", "AWS Certified Solutions Architect - Associate"]
      },
      available: true
    },
    {
      title: "Customer Training Specialist",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop and deliver training programs to help customers maximize value from Apex Meridian AI solutions.",
      requirements: {
        education: ["Bachelor's in Education, Computer Science, or related field"],
        experience: "3+ years in customer training or technical education",
        skills: ["Training program design", "Technical presentation", "E-learning platforms", "Documentation", "Customer engagement", "Product knowledge"],
        certificates: ["Certified Technical Trainer (CTT+)", "CPTD", "Instructional Design Certification"]
      },
      available: true
    },
    {
      title: "Customer Support Representative",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Provide first-line support to customers via email, chat, and phone, resolving inquiries and technical issues.",
      requirements: {
        education: ["Bachelor's in any field", "Technical background preferred"],
        experience: "2+ years in customer support or help desk",
        skills: ["Customer communication", "Problem-solving", "Ticketing systems", "Basic technical knowledge", "Multi-tasking", "Empathy"],
        certificates: ["HDI Customer Service Representative", "ITIL Foundation", "Zendesk Certification"]
      },
      available: true
    },
    {
      title: "Customer Success Analyst",
      department: "Customer Success & Support",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Analyze customer data, usage patterns, and feedback to identify opportunities for improving customer experience and retention.",
      requirements: {
        education: ["Bachelor's in Business Analytics, Data Science, or related field"],
        experience: "3+ years in customer analytics or business intelligence",
        skills: ["Data analysis", "SQL", "Tableau/Power BI", "Customer metrics (NPS, CSAT, churn)", "Excel", "Reporting"],
        certificates: ["Google Data Analytics Professional Certificate", "Tableau Desktop Specialist", "Customer Analytics Certification"]
      },
      available: true
    },

    // Product Management (7 positions)
    {
      title: "VP of Product",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead product strategy and roadmap for all AI solutions ensuring market fit and competitive advantage.",
      requirements: {
        education: ["Bachelor's or Master's in Computer Science, Engineering, Business, or related field"],
        experience: "10+ years in product management with leadership experience in AI/tech products",
        skills: ["Product strategy", "Roadmap planning", "Market analysis", "Team leadership", "Stakeholder management", "Technical understanding of AI"],
        certificates: ["Certified Scrum Product Owner (CSPO)", "Pragmatic Marketing Certification", "Product Management Certificate"]
      },
      available: true
    },
    {
      title: "Senior Product Manager",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Own product lifecycle for specific AI solutions from ideation to launch, working with engineering and design teams.",
      requirements: {
        education: ["Bachelor's in Computer Science, Engineering, Business, or related field"],
        experience: "5+ years in product management, preferably in AI/ML products",
        skills: ["Product lifecycle management", "User research", "Data-driven decision making", "Agile methodologies", "Technical specifications", "Go-to-market strategy"],
        certificates: ["Certified Scrum Product Owner", "Product Management Certification", "AI Product Management Certification"]
      },
      available: true
    },
    {
      title: "Product Owner",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Manage product backlog, prioritize features, and work with development teams to deliver value to customers.",
      requirements: {
        education: ["Bachelor's in Computer Science, Business, or related field"],
        experience: "3+ years as product owner or in product management",
        skills: ["Backlog management", "User story writing", "Sprint planning", "Stakeholder communication", "Agile/Scrum", "Requirements gathering"],
        certificates: ["Certified Scrum Product Owner (CSPO)", "Professional Scrum Product Owner (PSPO)", "SAFe Product Owner/Product Manager"]
      },
      available: true
    },
    {
      title: "Technical Product Manager",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Bridge technical and business teams, defining technical requirements and ensuring feasibility of product features.",
      requirements: {
        education: ["Bachelor's in Computer Science, Software Engineering, or related field"],
        experience: "5+ years combining technical and product management experience",
        skills: ["Technical architecture understanding", "API design", "System integration", "Technical documentation", "Engineering collaboration", "Product strategy"],
        certificates: ["Certified Scrum Product Owner", "AWS Solutions Architect", "Technical Product Management Certification"]
      },
      available: true
    },
    {
      title: "Product Marketing Manager",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop go-to-market strategies, positioning, and messaging for AI products to drive adoption and revenue.",
      requirements: {
        education: ["Bachelor's in Marketing, Business, or related field"],
        experience: "4+ years in product marketing, preferably in B2B tech",
        skills: ["Go-to-market strategy", "Product positioning", "Competitive analysis", "Sales enablement", "Content creation", "Launch planning"],
        certificates: ["Pragmatic Marketing Certification", "Product Marketing Alliance Certification", "HubSpot Content Marketing Certification"]
      },
      available: true
    },
    {
      title: "UX Researcher",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Conduct user research to understand customer needs, behaviors, and pain points to inform product decisions.",
      requirements: {
        education: ["Bachelor's in Psychology, Human-Computer Interaction, Design, or related field"],
        experience: "3+ years in UX research or user research",
        skills: ["User interviews", "Usability testing", "Survey design", "Data analysis", "Research methodologies", "Persona development"],
        certificates: ["Nielsen Norman Group UX Certification", "Google UX Design Certificate", "Certified Usability Analyst (CUA)"]
      },
      available: true
    },
    {
      title: "Product Analyst",
      department: "Product Management",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Analyze product usage data, metrics, and user behavior to provide insights for product improvements and strategy.",
      requirements: {
        education: ["Bachelor's in Data Science, Statistics, Business Analytics, or related field"],
        experience: "3+ years in product analytics or data analysis",
        skills: ["SQL", "Python/R", "Data visualization (Tableau, Looker)", "A/B testing", "Product metrics", "Statistical analysis"],
        certificates: ["Google Data Analytics Professional Certificate", "Product Analytics Certification", "Mixpanel Certification"]
      },
      available: true
    },

    // Security & Safety (4 positions)
    {
      title: "Chief Information Security Officer (CISO)",
      department: "Security & Safety",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead cybersecurity strategy and operations protecting Apex Meridian's infrastructure, data, and AI systems.",
      requirements: {
        education: ["Bachelor's or Master's in Cybersecurity, Computer Science, Information Security, or related field"],
        experience: "10+ years in information security with leadership experience",
        skills: ["Security strategy", "Risk management", "Incident response", "Compliance (ISO 27001, SOC 2)", "Team leadership", "Security architecture"],
        certificates: ["CISSP (Certified Information Systems Security Professional)", "CISM (Certified Information Security Manager)", "CRISC (Certified in Risk and Information Systems Control)"]
      },
      available: true
    },
    {
      title: "Senior Security Engineer",
      department: "Security & Safety",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design and implement security controls for self-hosted infrastructure, AI systems, and applications.",
      requirements: {
        education: ["Bachelor's in Cybersecurity, Computer Science, or related field"],
        experience: "5+ years in security engineering or architecture",
        skills: ["Network security", "Application security", "Cloud security", "Penetration testing", "Security tools (SIEM, IDS/IPS)", "Scripting (Python, Bash)"],
        certificates: ["CISSP", "CEH (Certified Ethical Hacker)", "OSCP (Offensive Security Certified Professional)"]
      },
      available: true
    },
    {
      title: "Security Operations Center (SOC) Analyst",
      department: "Security & Safety",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Monitor security events, detect threats, and respond to security incidents in real-time to protect infrastructure.",
      requirements: {
        education: ["Bachelor's in Cybersecurity, Information Technology, or related field"],
        experience: "3+ years in SOC or security monitoring",
        skills: ["SIEM platforms", "Threat detection", "Incident response", "Log analysis", "Security tools", "Threat intelligence"],
        certificates: ["CompTIA Security+", "GIAC Security Essentials (GSEC)", "Certified SOC Analyst (CSA)"]
      },
      available: true
    },
    {
      title: "AI Safety Researcher",
      department: "Security & Safety",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Research and implement AI safety measures, ethical guidelines, and bias mitigation strategies for AI systems.",
      requirements: {
        education: ["Master's or PhD in AI, Machine Learning, Computer Science, or related field"],
        experience: "3+ years in AI research with focus on safety, ethics, or fairness",
        skills: ["AI/ML algorithms", "Bias detection and mitigation", "Explainable AI", "Research methodology", "Python", "Ethics frameworks"],
        certificates: ["AI Ethics Certification", "Responsible AI Certification", "Research publications in AI safety"]
      },
      available: true
    },

    // Quality Assurance (3 positions)
    {
      title: "QA Manager",
      department: "Quality Assurance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Lead QA strategy, processes, and team to ensure high-quality AI products and services.",
      requirements: {
        education: ["Bachelor's in Computer Science, Software Engineering, or related field"],
        experience: "7+ years in QA with management experience",
        skills: ["QA strategy", "Test planning", "Automation frameworks", "Team leadership", "CI/CD", "Quality metrics"],
        certificates: ["ISTQB Advanced Level Test Manager", "Certified Manager of Software Quality (CMSQ)", "ASQ Certified Software Quality Engineer"]
      },
      available: true
    },
    {
      title: "Senior QA Engineer",
      department: "Quality Assurance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Design and execute comprehensive test plans for AI systems, ensuring functionality, performance, and reliability.",
      requirements: {
        education: ["Bachelor's in Computer Science, Software Engineering, or related field"],
        experience: "5+ years in software QA or testing",
        skills: ["Test automation (Selenium, Cypress)", "API testing", "Performance testing", "Python/Java", "CI/CD pipelines", "Bug tracking"],
        certificates: ["ISTQB Advanced Level", "Certified Software Quality Analyst (CSQA)", "Selenium Certification"]
      },
      available: true
    },
    {
      title: "QA Automation Engineer",
      department: "Quality Assurance",
      location: "Cairo, Egypt",
      type: "Full-time",
      description: "Develop and maintain automated test frameworks to improve testing efficiency and coverage.",
      requirements: {
        education: ["Bachelor's in Computer Science, Software Engineering, or related field"],
        experience: "4+ years in test automation",
        skills: ["Test automation frameworks", "Python/Java", "Selenium, Cypress, or similar", "CI/CD integration", "API testing", "Version control (Git)"],
        certificates: ["ISTQB Test Automation Engineer", "Selenium WebDriver Certification", "Certified Automation Professional"]
      },
      available: true
    },

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
