import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Video, Image, Music, FileText, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

export default function MediaProduction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-900 to-cyan-900">
      <SEO 
        title="AI-Powered Media Production - Video, Audio, Image Generation"
        description="Transform your media production with AI-generated videos, audio, images, scripts, visual effects, and comprehensive social media solutions for YouTube, TikTok, and all platforms."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663044057183/eVkqz4AKzNzJoRDSPXy4aQ/hero-media-production-nXEAStYsdc7E37mxA2JNNQ.webp"
            alt="AI Media Production"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/90 via-blue-900/90 to-cyan-900/90" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663044057183/eVkqz4AKzNzJoRDSPXy4aQ/ai-logo-white-96_005a8c43.png" 
              alt="AI Media Production" 
              className="h-20 w-auto mx-auto mb-6 opacity-90"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Media Production</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Transform your content creation with cutting-edge AI technology for video, audio, images, scripts, visual effects, and comprehensive social media production
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                  Start Creating
                </Button>
              </Link>
              <Link href="/about/careers">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-white/50 text-white hover:bg-white/10">
                  Join Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Comprehensive AI Media Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              End-to-end AI-powered content creation and social media management solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Video,
                title: "AI Video Generation",
                description: "Create stunning videos from text prompts, scripts, or images with advanced AI models",
                features: ["Text-to-video", "Image-to-video", "Video editing", "Style transfer"]
              },
              {
                icon: Image,
                title: "AI Image Creation",
                description: "Generate high-quality images, graphics, and artwork for any purpose",
                features: ["Text-to-image", "Image editing", "Style customization", "Brand consistency"]
              },
              {
                icon: Music,
                title: "AI Audio Production",
                description: "Produce professional audio, music, voiceovers, and sound effects",
                features: ["Text-to-speech", "Voice cloning", "Music generation", "Audio enhancement"]
              },
              {
                icon: FileText,
                title: "AI Script Writing",
                description: "Generate engaging scripts for videos, ads, social media, and marketing content",
                features: ["Content ideation", "Script generation", "Copywriting", "SEO optimization"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="bg-purple-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Effects & Advanced Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Production Services</h2>
            <p className="text-xl text-gray-300">
              Professional-grade visual effects, mapping, and production capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Visual Effects (VFX)",
                description: "AI-powered visual effects including compositing, motion tracking, rotoscoping, and CGI integration",
                capabilities: ["Green screen removal", "Object tracking", "3D integration", "Color grading", "Particle effects"]
              },
              {
                icon: Users,
                title: "3D Modeling & Mapping",
                description: "Create 3D assets, environments, and projection mapping for immersive experiences",
                capabilities: ["3D asset creation", "Environment design", "Projection mapping", "Virtual sets", "AR/VR content"]
              },
              {
                icon: Zap,
                title: "Motion Graphics",
                description: "Dynamic animations, title sequences, and branded motion graphics for all platforms",
                capabilities: ["Logo animation", "Title sequences", "Infographics", "Transitions", "Brand elements"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-400 mb-3">Key Capabilities:</p>
                  {service.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Production */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Social Media Production & Marketing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete social media content creation, management, and marketing solutions for all platforms
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Content Production */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Video className="h-7 w-7 text-purple-400 mr-3" />
                Content Production
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">YouTube Production</h4>
                  <p className="text-gray-300 text-sm">Full-service YouTube content creation including thumbnails, intros, outros, editing, SEO optimization, and channel management</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">TikTok & Short-Form Video</h4>
                  <p className="text-gray-300 text-sm">Viral-ready short-form content for TikTok, Instagram Reels, YouTube Shorts with trending effects and music</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">Multi-Platform Content</h4>
                  <p className="text-gray-300 text-sm">Optimized content for Facebook, Instagram, Twitter, LinkedIn, and all major social platforms</p>
                </div>
              </div>
            </div>

            {/* Marketing & Strategy */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="h-7 w-7 text-cyan-400 mr-3" />
                Marketing & Strategy
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Social Media Marketing Plans</h4>
                  <p className="text-gray-300 text-sm">Comprehensive marketing strategies, content calendars, audience targeting, and growth campaigns</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Campaign Management</h4>
                  <p className="text-gray-300 text-sm">End-to-end campaign execution including content creation, scheduling, monitoring, and optimization</p>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Analytics & Reporting</h4>
                  <p className="text-gray-300 text-sm">Data-driven insights, performance tracking, audience analytics, and ROI measurement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300">
              Leveraging cutting-edge AI models and proprietary technology
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Video AI", tech: "Stable Video Diffusion, Runway ML, Pika Labs, Custom models" },
                { title: "Image AI", tech: "DALL-E 3, Midjourney, Stable Diffusion, Custom fine-tuned models" },
                { title: "Audio AI", tech: "ElevenLabs, Whisper, MusicGen, Custom voice models" },
                { title: "Language AI", tech: "GPT-4, Claude, Gemini, Custom writing models" }
              ].map((item, index) => (
                <div key={index} className="bg-blue-950/50 rounded-lg p-6">
                  <h4 className="font-bold text-purple-400 mb-3">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Industry Applications</h2>
            <p className="text-xl text-gray-300">
              Serving diverse industries with AI-powered media solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { industry: "Marketing Agencies", use: "Campaign content, ad creatives, social media management" },
              { industry: "E-commerce", use: "Product videos, promotional content, influencer collaborations" },
              { industry: "Education", use: "Educational videos, course content, explainer animations" },
              { industry: "Entertainment", use: "Music videos, promotional content, visual effects" },
              { industry: "Corporate", use: "Training videos, internal communications, brand content" },
              { industry: "Content Creators", use: "YouTube channels, TikTok content, podcast production" }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-bold text-white mb-3">{item.industry}</h4>
                <p className="text-gray-300 text-sm">{item.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Media Production?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let our AI-powered solutions elevate your content creation and social media presence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                Get Started
              </Button>
            </Link>
            <Link href="/about/careers">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 border-white/50 text-white hover:bg-white/10">
                View Open Positions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
