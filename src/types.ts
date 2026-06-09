export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tech: string[];
  codeUrl: string;
  demoUrl: string;
  fullCodeSnippet?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}
