export interface Profile {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  experienceYears: string;
  salary: string;
  intents: string[];
  politicalStatus?: string;
  summary: string;
}

export interface Stat {
  label: string;
  value: string;
  unit: string;
  hint?: string;
}

export interface Expertise {
  id: string;
  title: string;
  accent: string;
  description: string;
  points: string[];
}

export interface SkillRadar {
  subject: string;
  score: number;
  projects: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  tags: Array<"frontend" | "ai">;
  highlights: string[];
  achievements?: string[];
  stack: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  highlights: string[];
  achievements?: string[];
  metrics: string[];
  links: { demo: string; repo: string };
}

export interface ResumeData {
  profile: Profile;
  pdf: { url: string; filename: string };
  stats: Stat[];
  expertise: Expertise[];
  skills: {
    radar: SkillRadar[];
    categories: SkillCategory[];
    tags: string[];
  };
  experience: Experience[];
  projects: Project[];
  education: { school: string; degree: string; major: string; period: string };
  social: { github: string; blog: string; juejin: string; csdn: string; zhihu: string };
}
