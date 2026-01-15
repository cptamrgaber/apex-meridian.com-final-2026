import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords = "AI, artificial intelligence, aviation, cybersecurity, education, AGI, machine learning, technology solutions",
  ogImage = "/images/og-image.png",
  ogType = "website"
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = `${title} | Apex Meridian`;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", `${title} | Apex Meridian`, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", ogImage, "property");
    updateMetaTag("og:type", ogType, "property");
    updateMetaTag("og:site_name", "Apex Meridian", "property");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image", "name");
    updateMetaTag("twitter:title", `${title} | Apex Meridian`, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", ogImage, "name");
  }, [title, description, keywords, ogImage, ogType]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: "name" | "property" = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute("content", content);
}
