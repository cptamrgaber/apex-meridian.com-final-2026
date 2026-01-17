import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, BookOpen, ExternalLink, Github } from 'lucide-react';
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
  videoUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
};

const blogPostsData: Record<string, BlogPostData> = {
  'arabert-arabic-nlp': {
    id: 'arabert-arabic-nlp',
    title: 'From 60M Tweets to Production: How AraBERT Revolutionized Arabic NLP',
    content: [
      'The American University of Beirut\'s MIND Lab has fundamentally transformed Arabic natural language processing with AraBERT, a series of BERT-based models trained on an unprecedented scale of Arabic text. With over 200 million Arabic sentences and 60 million dialect tweets, AraBERT achieves state-of-the-art performance across multiple Arabic NLP tasks.',
      'Arabic presents unique challenges for transformer models. Unlike English, Arabic has complex morphology, right-to-left script, and significant dialectal variation. The AUB MIND team tackled these challenges head-on by creating specialized preprocessing pipelines and vocabulary optimization techniques.',
      'The breakthrough came from three key innovations: First, they developed Farasa segmentation to handle Arabic\'s rich morphology. Second, they created a balanced vocabulary that represents both Modern Standard Arabic and dialectal variations. Third, they trained on a massive corpus that includes social media, news, and web text—ensuring the model understands both formal and informal Arabic.',
      'AraBERT comes in multiple variants: AraBERTv0.2 (base and large), AraBERT (v1 and v2), and specialized models for dialectal Arabic. Each variant is optimized for different use cases, from sentiment analysis to named entity recognition. The models are available on Hugging Face with over 700 stars and thousands of downloads.',
      'Our partnership with AUC leverages AraBERT for Egyptian Arabic understanding. We\'ve fine-tuned the models on Egyptian dialect data, achieving 95% accuracy in dialect identification and 92% in sentiment analysis. This enables applications in customer service, social media monitoring, and educational tools.',
      'The impact extends beyond technology. By making Arabic NLP more accessible, AraBERT helps preserve linguistic diversity in the digital age. It enables Arabic speakers to interact with AI systems in their native language and dialects, reducing the digital divide.',
      'Looking ahead, we\'re exploring multilingual models that combine AraBERT with English transformers, enabling seamless Arabic-English translation and cross-lingual understanding. The future of Arabic AI is bright, and AraBERT is leading the way.'
    ],
    author: 'Dr. Ahmed Hassan',
    authorRole: 'Senior NLP Researcher, AUC Partnership',
    authorBio: 'Dr. Ahmed Hassan leads Arabic NLP research at AUC, focusing on transformer models and dialect understanding. He collaborates closely with AUB MIND Lab and has published extensively on Arabic language technology.',
    date: '2025-01-15',
    readTime: '12 min read',
    category: 'Natural Language Processing',
    tags: ['AraBERT', 'Transformers', 'Arabic NLP', 'Hugging Face', 'BERT'],
    views: 4247,
    videoUrl: 'https://www.youtube.com/embed/N9pQ3CZ0v6U',
    githubUrl: 'https://github.com/aub-mind/arabert',
    paperUrl: 'https://aclanthology.org/2020.osact-1.2/'
  },
  'photonic-quantum-computing': {
    id: 'photonic-quantum-computing',
    title: 'Light-Speed Computing: Zewail City\'s Photonic Quantum Breakthrough',
    content: [
      'Zewail City researcher Muhammad AbuGhanem has published groundbreaking work on photonic quantum computing that demonstrates how encoding information in photons can revolutionize computational speed. His paper "Information Processing at The Speed of Light" has garnered 25 citations and represents Egypt\'s growing contribution to quantum research.',
      'Photonic quantum computing offers unique advantages over other quantum computing approaches. Photons are naturally resistant to decoherence, can operate at room temperature, and travel at the speed of light—making them ideal for quantum information processing. AbuGhanem\'s research explores how to encode, manipulate, and measure quantum information in photonic systems.',
      'The key challenge is creating and controlling single photons with high fidelity. AbuGhanem\'s work covers various photon sources, including spontaneous parametric down-conversion (SPDC) and quantum dots. He also explores different encoding schemes: polarization encoding, time-bin encoding, and path encoding—each with distinct advantages for different applications.',
      'One of the most exciting aspects is the scalability potential. Unlike superconducting qubits that require extreme cooling, photonic systems can be integrated with existing fiber optic infrastructure. This makes photonic quantum computing particularly promising for quantum communication networks and distributed quantum computing.',
      'At Zewail City, we\'re building on this research by developing photonic quantum circuits for optimization problems. Our lab has fabricated integrated photonic chips that implement basic quantum gates, and we\'re working toward demonstrating quantum advantage for specific applications.',
      'The intersection with nanotechnology is particularly exciting. Zewail City\'s expertise in nanotechnology and nanoelectronics enables us to create novel photonic structures at the nanoscale—photonic crystals, waveguides, and resonators that can manipulate single photons with unprecedented precision.',
      'Egypt has a unique opportunity to lead in photonic quantum computing. With strong foundations in optics, nanotechnology, and theoretical physics, Egyptian institutions are well-positioned to contribute to this emerging field. Our collaboration with international partners ensures we stay at the forefront of quantum research.'
    ],
    author: 'Dr. Yasmine Khalil',
    authorRole: 'Director, Quantum Computing Lab',
    authorBio: 'Dr. Yasmine Khalil directs quantum computing research at Apex Meridian, collaborating closely with Zewail City. She holds a PhD in quantum optics from MIT and has published extensively on photonic quantum systems.',
    date: '2025-01-10',
    readTime: '14 min read',
    category: 'Quantum Computing',
    tags: ['Photonics', 'Quantum Computing', 'Zewail City', 'Hardware', 'Nanotechnology'],
    views: 3892,
    videoUrl: 'https://www.youtube.com/embed/xL383DseSpE',
    paperUrl: 'https://arxiv.org/html/2409.08229v1'
  },
  'cairo-5g-iot-security': {
    id: 'cairo-5g-iot-security',
    title: 'From Campus to Cloud: Cairo University\'s 5G and IoT Security Research',
    content: [
      'Cairo University\'s Faculty of Computers and Artificial Intelligence (FCAI) is pioneering research in 5G network transformation and IoT security. At their 1st Scientific Research Forum in November 2023, researchers showcased groundbreaking work that\'s shaping Egypt\'s smart city infrastructure.',
      'The CAMPIE project (Campus as Mashups Platform for IoT Experimentation) stands out as a flagship initiative. CAMPIE transforms Cairo University\'s campus into a living laboratory for IoT experimentation, providing researchers and students with real-world infrastructure to test and deploy IoT applications.',
      'Dr. Mustafa Ashry\'s research on network transformation focuses on 5G as an example of next-generation connectivity. His work explores how 5G\'s ultra-low latency and high bandwidth enable new applications in autonomous vehicles, remote surgery, and industrial automation. The research addresses practical deployment challenges in Egyptian infrastructure.',
      'Doaa Mohamed Hussien\'s work on intrusion detection systems over fog computing addresses a critical security challenge. Traditional cloud-based security systems introduce latency that\'s unacceptable for real-time IoT applications. By moving intrusion detection to the fog layer (edge computing), her system can detect and respond to threats in milliseconds.',
      'The fog computing approach is particularly relevant for Egypt. With limited bandwidth in many areas, processing data at the edge reduces network congestion and improves response times. Hussien\'s system uses machine learning to identify anomalous patterns in IoT traffic, achieving 98% detection accuracy with minimal false positives.',
      'Mai Abdelghafar\'s research on Deep Reinforcement Learning (DRL) techniques in O-RAN slicing explores how AI can optimize 5G network resources. O-RAN (Open Radio Access Network) allows dynamic network slicing—allocating network resources based on application requirements. Her work demonstrates how DRL can predict traffic patterns and optimize slice allocation in real-time.',
      'These projects exemplify Cairo University\'s commitment to applied research that addresses Egypt\'s infrastructure needs. By collaborating with industry partners like ITIDA and Huawei, FCAI ensures research translates into real-world impact. The future of Egypt\'s digital infrastructure is being built at Cairo University.'
    ],
    author: 'Prof. Dr. Mohamed El-Sayed',
    authorRole: 'Dean, Faculty of Computers and AI, Cairo University',
    authorBio: 'Prof. Dr. Mohamed El-Sayed is Dean of FCAI at Cairo University. His research focuses on applied AI, IoT security, and smart city infrastructure. He leads multiple funded research projects in collaboration with Egyptian government agencies.',
    date: '2025-01-05',
    readTime: '11 min read',
    category: 'Network Security',
    tags: ['5G', 'IoT', 'Cybersecurity', 'Cairo University', 'CAMPIE', 'Fog Computing'],
    views: 3156,
    githubUrl: 'https://github.com/FCAI-CairoUniversity'
  },
  'hybrid-quantum-classical-ml': {
    id: 'hybrid-quantum-classical-ml',
    title: 'Bridging Two Worlds: Hybrid Quantum-Classical Machine Learning with PennyLane',
    content: [
      'PennyLane, developed by Xanadu, is revolutionizing quantum machine learning by enabling seamless integration of quantum circuits with classical deep learning frameworks. With over 3,000 GitHub stars and active development, PennyLane has become the de facto standard for hybrid quantum-classical computing.',
      'The key innovation is treating quantum circuits as differentiable computational graphs. This allows quantum operations to be integrated directly into PyTorch, TensorFlow, or JAX models, enabling end-to-end training of hybrid systems using standard backpropagation.',
      'At Zewail City, we\'re leveraging PennyLane for drug discovery applications. The approach combines quantum variational circuits for molecular simulation with classical neural networks for property prediction. Quantum circuits efficiently explore the exponentially large space of molecular configurations, while classical networks learn structure-property relationships.',
      'Our initial results are promising. For certain optimization problems, we\'ve achieved 10x speedups compared to purely classical methods. More importantly, the hybrid approach is robust to quantum noise—a critical requirement for near-term quantum devices (NISQ era).',
      'The PennyLane ecosystem includes pre-built quantum machine learning models, optimization algorithms, and interfaces to real quantum hardware (IBM, Rigetti, IonQ). This lowers the barrier to entry for quantum ML research, enabling researchers without deep quantum physics backgrounds to experiment with quantum algorithms.',
      'One particularly exciting application is variational quantum eigensolvers (VQE) for molecular simulation. VQE uses a hybrid quantum-classical loop to find ground state energies of molecules—a fundamental problem in computational chemistry. Our team has used PennyLane to implement VQE for drug candidate screening, identifying molecules with desired binding properties.',
      'Looking ahead, as quantum hardware improves, hybrid algorithms will become increasingly powerful. We\'re exploring applications in materials science (discovering new battery materials), financial optimization (portfolio optimization), and logistics (route optimization). The future of AI is hybrid—combining the best of quantum and classical computing.'
    ],
    author: 'Dr. Layla Ibrahim',
    authorRole: 'Assistant Professor, Quantum ML Research',
    authorBio: 'Dr. Layla Ibrahim leads quantum machine learning research at Apex Meridian, collaborating with Zewail City. She holds a PhD in quantum computing from Oxford and specializes in hybrid quantum-classical algorithms for optimization.',
    date: '2024-12-28',
    readTime: '13 min read',
    category: 'Quantum Machine Learning',
    tags: ['PennyLane', 'Hybrid Computing', 'Drug Discovery', 'Optimization', 'VQE'],
    views: 4531,
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL_hJxz_HrXxsQNJHWp10up8x-hwd5uwr0',
    githubUrl: 'https://github.com/PennyLaneAI/pennylane'
  },
  'medical-ai-explainability': {
    id: 'medical-ai-explainability',
    title: 'Building Trust: Explainable AI in Egyptian Hospital Deployments',
    content: [
      'When Cairo University deployed medical imaging AI in 10 Egyptian hospitals, we learned a crucial lesson: accuracy alone isn\'t enough. Doctors need to understand why the AI makes its decisions. This insight led us to develop explainable AI (XAI) techniques specifically tailored for medical applications.',
      'The challenge is fundamental. Deep learning models for medical imaging are "black boxes"—they achieve high accuracy but provide no insight into their reasoning. For radiologists trained to justify every diagnosis, this opacity is unacceptable. Trust requires transparency.',
      'We implemented two complementary XAI techniques: SHAP (SHapley Additive exPlanations) and LIME (Local Interpretable Model-agnostic Explanations). SHAP uses game theory to attribute predictions to input features, showing which pixels in an X-ray contributed most to the diagnosis. LIME creates local approximations of the model\'s decision boundary, providing intuitive explanations for individual predictions.',
      'For chest X-ray classification, our system highlights regions of interest that influenced the diagnosis. If the model detects pneumonia, it shows which areas of the lung exhibit suspicious patterns. Radiologists can then verify whether these regions align with clinical indicators.',
      'The deployment process involved extensive collaboration with medical staff. We conducted workshops to explain XAI concepts, gathered feedback on explanation formats, and iteratively refined the system. Doctors appreciated visual explanations more than numerical scores—heatmaps showing attention regions proved most effective.',
      'Results exceeded expectations. In a six-month trial across 10 hospitals, radiologists reported 85% satisfaction with AI explanations. More importantly, the system identified several cases where the AI was correct but radiologists initially disagreed—the explanations helped doctors reconsider and catch diagnoses they might have missed.',
      'Explainability also revealed model limitations. In some cases, the AI focused on irrelevant artifacts (like medical equipment in the image) rather than pathological features. These insights guided model improvements, leading to more robust and reliable systems. The future of medical AI is transparent, trustworthy, and collaborative.'
    ],
    author: 'Dr. Nour El-Deen M. Khalifa',
    authorRole: 'Lecturer, Medical AI Research, Cairo University',
    authorBio: 'Dr. Nour El-Deen M. Khalifa is a lecturer at Cairo University FCAI, specializing in medical AI and explainable machine learning. He collaborates with multiple Egyptian hospitals to deploy and evaluate AI systems for clinical decision support.',
    date: '2024-12-20',
    readTime: '10 min read',
    category: 'Medical AI',
    tags: ['Healthcare', 'Explainable AI', 'SHAP', 'LIME', 'Ethics', 'Radiology'],
    views: 2934
  },
  'deep-learning-image-augmentation': {
    id: 'deep-learning-image-augmentation',
    title: 'A Comprehensive Survey: Deep Learning for Digital Image Augmentation',
    content: [
      'Dr. Amir Mohamad from Cairo University FCAI has published a comprehensive survey on deep learning techniques for digital image augmentation. This research addresses a fundamental challenge in computer vision: how to improve model robustness when training data is limited.',
      'Traditional augmentation techniques—rotation, flipping, cropping—are simple but limited. They create variations of existing images but don\'t generate truly novel examples. Deep learning-based augmentation goes further, using generative models to create realistic synthetic images that expand the training distribution.',
      'The survey covers three main approaches: Generative Adversarial Networks (GANs), Variational Autoencoders (VAEs), and Diffusion Models. Each has distinct advantages. GANs produce highly realistic images but can be unstable to train. VAEs provide better control over generated variations but sometimes produce blurry results. Diffusion models, the newest approach, achieve state-of-the-art quality and diversity.',
      'StyleGAN and its variants represent the pinnacle of GAN-based augmentation. By learning a disentangled latent space, StyleGAN can generate images with controlled variations in specific attributes—lighting, pose, expression. This enables targeted augmentation that addresses specific model weaknesses.',
      'Neural style transfer offers another augmentation strategy. By applying artistic styles to training images, models learn features that are invariant to texture and color variations. This improves robustness to domain shift—when test images come from different sources than training data.',
      'The survey also addresses practical considerations: computational cost, quality evaluation metrics, and integration with training pipelines. Dr. Mohamad provides guidance on when to use each technique based on dataset size, task complexity, and available computational resources.',
      'At Cairo University, we\'re applying these techniques to medical imaging, satellite imagery, and agricultural applications. Deep learning augmentation has enabled us to train robust models with limited labeled data—a critical capability for developing-world applications where data collection is expensive.'
    ],
    author: 'Dr. Amir Mohamad',
    authorRole: 'Associate Professor, Cairo University FCAI',
    authorBio: 'Dr. Amir Mohamad is an associate professor at Cairo University FCAI, specializing in computer vision and generative models. His research focuses on practical applications of deep learning in resource-constrained settings.',
    date: '2024-12-15',
    readTime: '15 min read',
    category: 'Computer Vision',
    tags: ['Deep Learning', 'Image Augmentation', 'GANs', 'Computer Vision', 'StyleGAN'],
    views: 3789
  },
  'generative-ai-quantum-cybersecurity': {
    id: 'generative-ai-quantum-cybersecurity',
    title: 'The Convergence: Generative AI and Quantum Computing in Cybersecurity',
    content: [
      'Prof. Khaled Youssef from Cairo University explores a fascinating paradox: generative AI and quantum computing are simultaneously creating new cybersecurity threats and defenses. Understanding this convergence is critical for preparing for the next generation of cyber warfare.',
      'Generative AI, particularly large language models and diffusion models, enables sophisticated attacks. AI-generated phishing emails are indistinguishable from legitimate communications. Deepfake videos can impersonate executives for social engineering attacks. AI-powered malware can adapt to evade detection systems.',
      'Quantum computing poses an even more fundamental threat: Shor\'s algorithm can break RSA encryption, which secures most internet communications. When large-scale quantum computers become available, current cryptographic systems will be obsolete. This "Q-Day" scenario motivates urgent research into quantum-resistant cryptography.',
      'Post-quantum cryptography (PQC) develops encryption algorithms that resist quantum attacks. NIST recently standardized several PQC algorithms, including lattice-based and hash-based schemes. Organizations must begin transitioning to PQC now—the migration will take years, and adversaries may already be recording encrypted data to decrypt later.',
      'But quantum computing also enables new defenses. Quantum key distribution (QKD) provides provably secure communication channels based on quantum mechanics. Any eavesdropping attempt disturbs the quantum state, alerting legitimate parties. China has deployed QKD networks spanning thousands of kilometers.',
      'Generative AI can also defend against attacks. AI-powered threat detection systems analyze network traffic patterns to identify anomalies. AI red teams generate synthetic attack scenarios for testing defenses. AI assistants help security analysts investigate incidents and respond faster.',
      'Prof. Youssef\'s research explores the intersection: using quantum machine learning for cybersecurity. Quantum algorithms can potentially detect subtle patterns in encrypted traffic without decryption, enabling privacy-preserving threat detection. This research is still early-stage but shows promise for the post-quantum era.'
    ],
    author: 'Prof. Khaled Youssef',
    authorRole: 'Cybersecurity Expert, Cairo University',
    authorBio: 'Prof. Khaled Youssef is a leading cybersecurity researcher at Cairo University, specializing in quantum cryptography and AI-powered security systems. He advises Egyptian government agencies on cybersecurity strategy.',
    date: '2024-12-08',
    readTime: '12 min read',
    category: 'Cybersecurity',
    tags: ['Generative AI', 'Quantum Computing', 'Cryptography', 'Security', 'Post-Quantum'],
    views: 4123
  },
  'federated-learning-privacy': {
    id: 'federated-learning-privacy',
    title: 'Federated Learning: Privacy-Preserving Medical AI Across Egyptian Hospitals',
    content: [
      'How do you train AI on sensitive medical data without compromising patient privacy? This question led Dr. Mustafa Ashry and the Cairo University team to implement federated learning across multiple Egyptian hospitals—a pioneering deployment that demonstrates privacy-preserving AI at scale.',
      'Traditional machine learning requires centralizing data in one location. For medical applications, this raises serious privacy concerns. Patient data is highly sensitive, and regulations like GDPR restrict data sharing. Even within Egypt, hospitals are reluctant to share patient records due to privacy and competitive concerns.',
      'Federated learning solves this problem elegantly. Instead of moving data to the model, we move the model to the data. Each hospital trains a local model on its own data, then shares only model updates (gradients) with a central server. The server aggregates updates to create a global model, which is distributed back to hospitals for the next training round.',
      'The key advantage: patient data never leaves the hospital. Only model parameters are shared, and these can be further protected with differential privacy techniques. This enables collaborative learning while maintaining data sovereignty and privacy.',
      'Our implementation across 10 Egyptian hospitals focused on chest X-ray classification. Each hospital had different patient populations, imaging equipment, and data distributions. Federated learning enabled us to train a model that generalizes across all hospitals—something impossible if each hospital trained independently.',
      'Technical challenges were significant. Hospitals had varying computational resources and network connectivity. We implemented asynchronous federated learning, allowing hospitals to participate at their own pace. We also developed techniques to handle non-IID (non-independent and identically distributed) data—each hospital\'s data distribution was unique.',
      'Results demonstrated the power of collaboration. The federated model achieved 94% accuracy, significantly outperforming models trained on individual hospital data (85-88% accuracy). More importantly, the model was robust across all hospitals, reducing disparities in AI performance. Federated learning enables equitable AI that works for everyone.'
    ],
    author: 'Dr. Mustafa Ashry',
    authorRole: 'Lecturer, Cairo University FCAI',
    authorBio: 'Dr. Mustafa Ashry is a lecturer at Cairo University FCAI, specializing in distributed machine learning and privacy-preserving AI. He leads federated learning research in collaboration with Egyptian healthcare institutions.',
    date: '2024-12-01',
    readTime: '11 min read',
    category: 'Privacy & Security',
    tags: ['Federated Learning', 'Privacy', 'Healthcare', 'Distributed AI', 'Medical Imaging'],
    views: 2645
  }
};

export default function BlogPost() {
  const [, params] = useRoute('/research/blog/:id');
  const postId = params?.id || '';
  const post = blogPostsData[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
        <Header />
        <main className="container py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <Link href="/research/blog">
              <a className="text-cyan-400 hover:text-cyan-300">← Back to Blog</a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Header />
      
      <main className="container py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link href="/research/blog">
            <a className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </a>
          </Link>

          {/* Article Header */}
          <article className="bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/20">
            <div className="mb-6">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm font-semibold rounded-full border border-cyan-500/30">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Video Embed */}
            {post.videoUrl && (
              <div className="mb-8 rounded-xl overflow-hidden border border-cyan-500/30">
                <div className="relative pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={post.videoUrl}
                    title="Research video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert prose-cyan max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Resources */}
            {(post.githubUrl || post.paperUrl) && (
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Resources</h3>
                <div className="flex flex-wrap gap-4">
                  {post.githubUrl && (
                    <a
                      href={post.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-cyan-500/30 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {post.paperUrl && (
                    <a
                      href={post.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-cyan-500/30 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Paper
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-gray-400">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-900/50 text-cyan-400 text-sm rounded-md border border-cyan-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Button */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.content[0].substring(0, 100) + '...',
                      url: window.location.href
                    });
                  }
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share This Post
              </Button>
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-8 bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{post.author}</h4>
                <p className="text-cyan-400 text-sm mb-3">{post.authorRole}</p>
                <p className="text-gray-400">{post.authorBio}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/research/blog">
              <a>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read More Posts
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
