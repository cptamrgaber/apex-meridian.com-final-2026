import { Play, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VideoDemoProps {
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: string;
}

export default function VideoDemo({ title, description, thumbnailUrl, videoUrl, duration }: VideoDemoProps) {
  const hasVideo = !!videoUrl;

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/50 backdrop-blur-sm border-cyan-500/20 overflow-hidden">
      <div className="relative aspect-video bg-slate-800/50">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-950 to-slate-900">
            <div className="text-center p-8">
              <Upload className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-gray-300 text-lg font-semibold mb-2">Video Demo Coming Soon</p>
              <p className="text-gray-400 text-sm">Upload your video demo to showcase this implementation</p>
            </div>
          </div>
        )}
        
        {/* Play Button Overlay */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group">
            <div className="w-20 h-20 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Play className="h-10 w-10 text-white ml-1" fill="white" />
            </div>
          </div>
        )}
        
        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded">
            {duration}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
        
        {!hasVideo && (
          <div className="mt-4 p-4 bg-blue-900/30 border border-cyan-500/20 rounded-lg">
            <p className="text-cyan-400 text-sm font-semibold mb-2">📹 To add your video:</p>
            <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
              <li>Upload your video file to the server or use a video hosting service (YouTube, Vimeo)</li>
              <li>Update the <code className="px-2 py-1 bg-slate-800 rounded text-cyan-400">videoUrl</code> prop in the component</li>
              <li>Optionally add a custom thumbnail image via <code className="px-2 py-1 bg-slate-800 rounded text-cyan-400">thumbnailUrl</code></li>
            </ol>
          </div>
        )}
      </div>
    </Card>
  );
}
