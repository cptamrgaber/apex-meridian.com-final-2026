import { Link } from "wouter";
import { ReactNode } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

interface Feature {
  text: string;
}

interface SolutionCardProps {
  href: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  features: Feature[];
  linkText?: string;
}

export default function SolutionCard({
  href,
  title,
  description,
  image,
  icon: Icon,
  features,
  linkText = "Explore Solution",
}: SolutionCardProps) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
          <div className="absolute top-6 right-6 bg-cyan-500/20 backdrop-blur-sm rounded-full p-4">
            <Icon className="h-8 w-8 text-cyan-400" />
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-300">{feature.text}</p>
              </div>
            ))}
          </div>
          <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center">
            {linkText} <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
