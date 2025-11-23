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
  slug: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  company: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}
