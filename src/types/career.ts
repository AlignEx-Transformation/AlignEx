export type CareerFunction = 
  | 'Technology'
  | 'Product'
  | 'Data & Analytics'
  | 'Program Management'
  | 'Leadership & Strategy'
  | 'Consulting'
  | 'Sales'
  | 'Marketing'
  | 'Backend Operations'
  | 'Frontend Operations'
  | 'Finance'
  | 'HR'
  | 'R&D';

export type ExperienceLevel = '0–3' | '3–7' | '7–12' | '12–17' | '17–20' | '20+';

export type RoleLevel = 
  | 'Individual Contributor'
  | 'Manager'
  | 'Program Leader'
  | 'Functional Leader'
  | 'Business Leader'
  | 'Executive';

export type Industry = 
  | 'Technology'
  | 'IT Services'
  | 'Automotive'
  | 'Banking'
  | 'FinTech'
  | 'Healthcare'
  | 'Manufacturing'
  | 'SaaS'
  | 'Consulting'
  | 'Retail'
  | 'E-commerce'
  | 'Energy'
  | 'Telecom'
  | 'Other';

export type CompanyType = 
  | 'Startup'
  | 'Scale-up'
  | 'Mid-market'
  | 'Enterprise'
  | 'MNC'
  | 'Consulting'
  | 'Product'
  | 'Services'
  | 'B2B'
  | 'B2C';

export type CompanySize = 
  | '1–50'
  | '51–200'
  | '201–500'
  | '501–1,000'
  | '1,001–5,000'
  | '5,001–10,000'
  | '10,000+';

export type CareerSituation = 
  | 'Underpaid'
  | 'Underpromoted'
  | 'Underleveraged'
  | 'Underemployed'
  | 'Undervalued'
  | 'Unrewarded'
  | 'Unemployed';

export interface CareerTimelineEntry {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  function: CareerFunction;
  industry: Industry;
  achievements: string[];
  responsibilities: string[];
  teamSize?: number;
  technology: string[];
  businessImpact: string;
  rating?: number; // 1-5 scale rating of impact
  location?: string;
}

export interface CARStory {
  id: string;
  title: string;
  roleId?: string;
  company?: string;
  role?: string;
  timeframe?: string;
  challenge: string;
  action: string;
  result: string; // "Result not yet captured" if missing
  isResultCaptured: boolean;
  tags: string[];
  metrics?: {
    revenueImpact?: string;
    costSavings?: string;
    productivityImprovement?: string;
    riskReduction?: string;
    processImprovement?: string;
  } | string[];
  metricsList?: string[];
  skillsDemonstrated?: string[];
  domainTags?: string[];
  verifiedATSKeywords?: string[];
  stakeholders?: string;
  tools?: string[];
  dateCreated: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  category: 'Technical' | 'Business' | 'Soft' | 'Leadership' | 'Domain' | 'Core';
  level?: 'Core' | 'Advanced' | 'Expert';
  proficiencyLevel?: string;
  yearsOfExperience?: number;
  verifiedInCarStories?: any[];
  tags?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field: string;
}

export interface TargetProfile {
  targetFunction: CareerFunction | string;
  targetRole: string;
  experienceLevel: ExperienceLevel;
  roleLevel: RoleLevel;
  targetIndustries: (Industry | string)[];
  targetCompanyTypes: (CompanyType | string)[];
  targetCompanySizes: (CompanySize | string)[];
  targetGeography: string[];
  targetLocations?: string[];
  targetCompensation: {
    current: string;
    target: string;
    minimumAcceptable?: string;
    minAcceptable?: string;
    idealOffer?: string;
    stretch?: string;
    currency: string;
  };
  remotePreference: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
}

export interface MasterCareerMemory {
  id: string;
  lastUpdated: string;
  version: number;
  identity: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    linkedin?: string;
    githubUrl?: string;
    github?: string;
    portfolioUrl?: string;
    tagline: string;
    yearsOfExperience?: number | string;
    summary?: string;
  };
  masterResumeMarkdown?: string;
  careerSummary: string;
  careerObjective: string;
  careerSituation: CareerSituation[];
  targetProfile: TargetProfile;
  careerHistory: CareerTimelineEntry[];
  achievements: Array<{
    id: string;
    text: string;
    tags: string[];
    roleId?: string;
    metric?: string;
  }>;
  carStories: CARStory[];
  leadershipExamples: string[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  keyTransformations: string[];
  metricsSummary: {
    revenueImpact: string;
    costSavings: string;
    productivityImprovements: string;
    riskReduction: string;
    processImprovements: string;
    maxTeamSize: number;
    maxBudgetManaged: string;
  };
  interviewStories: Array<{
    question: string;
    storyId: string;
    notes: string;
  }>;
  linkedinPositioning: {
    headline: string;
    aboutSection: string;
    featuredArticles: string[];
    targetKeywords: string[];
  };
  networkingPreferences: {
    targetTitles: string[];
    priorityLocations: string[];
    valueProposition: string;
  };
  careerGoals: {
    oneYear: string;
    threeYear: string;
    fiveYear: string;
    dreamCompany: string;
    compensationTarget1CrProgress: number; // 0-100 confidence
  };
}
