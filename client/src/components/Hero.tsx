import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  gradient?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  gradient = "from-blue-950/90 to-cyan-900/90",
  icon,
  actions,
  centered = false,
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        </div>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${centered ? 'text-center' : ''}`}>
        {icon && (
          <div className={`mb-6 ${centered ? 'flex justify-center' : ''}`}>
            {icon}
          </div>
        )}
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        
        {subtitle && (
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
            {subtitle}
          </h2>
        )}
        
        {description && (
          <p className={`text-xl text-gray-200 ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
            {description}
          </p>
        )}
        
        {actions && (
          <div className={`mt-8 ${centered ? 'flex justify-center gap-4' : 'flex gap-4'}`}>
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
