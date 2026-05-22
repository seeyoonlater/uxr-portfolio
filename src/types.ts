export interface Insight {
  id: string;
  title: string;
  description: string;
}

export interface ResearchPhase {
  id: string;
  phase: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  company?: string; // Company field requested
  duration: string;
  summary: string;
  problem: string;
  methods: string[];
  phases: ResearchPhase[];
  insights: Insight[];
  impact: string;
  password?: string; // If defined, it's password protected.
  imageUrl?: string;
  imageAlt?: string;
}

export interface CVExperience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CVEducation {
  degree: string;
  school: string;
  period: string;
}

export interface CVData {
  experiences: CVExperience[];
  education: CVEducation[];
  credentials: string[];
  skills: string[];
  tools: string[];
}

export interface UserBio {
  name: string;
  title: string;
  location: string;
  summary: string;
  paragraphs: string[];
  photoUrl?: string;
  resumeUrl?: string;
  resumeFilename?: string;
  linkedinUrl: string;
  // Dynamic customizable labels
  headerFocus1?: string;
  headerFocus2?: string;
  headerFocus3?: string;
  headerFocus4?: string;
  headerFocus5?: string;
  headerFocus6?: string;
  headerSub?: string;
  aboutTabLabel?: string;
  projectsTabLabel?: string;
  linkedinTabLabel?: string;
  resumeTabLabel?: string;
  // CV structured data
  cv?: CVData;
}

export type ThemeMode = 'light' | 'dark';
export type PaletteMode = 'celedon' | 'terracotta' | 'gold' | 'charcoal';

export interface ThemeConfig {
  mode: ThemeMode;
  palette: PaletteMode;
}
