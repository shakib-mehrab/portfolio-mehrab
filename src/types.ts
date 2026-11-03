export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  featured: boolean;
  imagePlaceholderText: string;
  imageUrl?: string;
  metrics?: string;
  role?: string;
  isLearningProject?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'Completed' | 'Final Year' | 'In Progress';
  cgpa: string;
  highlights: string[];
  rolesHeld?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle?: string;
  award: string;
  organization: string;
  year: string;
  description: string;
  iconName: string;
  tag?: string;
  tags?: string[];
  image?: string;
  icon?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface AdditionalSkillGroup {
  title: string;
  items: string[];
  icon: string;
  description: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category?: string;
  credentialUrl?: string;
  image?: string;
  skills: string[];
}

export interface CocurricularItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'leadership' | 'organizing';
  description: string;
  image?: string;
  iconName?: string;
  color?: string;
}
