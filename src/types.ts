export interface NavLink {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  level: 'entry' | 'mid' | 'pro';
  features: PackageFeature[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  company: string;
}
