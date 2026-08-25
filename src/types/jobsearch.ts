export type ApplicationStage = 
  | 'Prospect'
  | 'Targeted'
  | 'Applied'
  | 'Recruiter Contact'
  | 'Screening'
  | 'Interview'
  | 'Final Round'
  | 'Offer'
  | 'Accepted'
  | 'Rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  jobType?: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  jdText?: string;
  jobDescription?: string;
  atsScore?: number; // 0-100
  resumeVersionId?: string;
  resumeVersionTitle?: string;
  contactId?: string;
  contactName?: string;
  stage: ApplicationStage;
  appliedDate?: string;
  dateApplied?: string;
  lastStageChangeDate?: string;
  salaryRange?: string;
  nextAction?: string;
  nextActionDate?: string;
  notes?: string;
  tags?: string[];
  jobUrl?: string;
  source?: string;
  keyRequirements?: string[];
}

export interface BooleanSearchQuery {
  id: string;
  title: string;
  roleTarget: string;
  location: string;
  includedTerms: string[];
  excludedTerms: string[];
  platforms: string[]; // e.g. "Workday", "Greenhouse", "Lever", "iCIMS"
  generatedQueryString: string;
  googleSearchUrl: string;
  linkedinSearchUrl: string;
  notes: string;
  category: 'Job Boards' | 'ATS Career Pages' | 'Hidden Market' | 'Executive Search';
}

export interface NetworkingOutreachPlan {
  id: string;
  contactId?: string;
  personName: string;
  personRole: string;
  personCompany: string;
  whyThisPerson: string;
  whyNow: string;
  whatIsRelevant: string;
  openingStatement: string;
  connectionRequestMessage: string; // Under 300 chars for LinkedIn
  followUpMessage1: string;
  followUpMessage2: string;
  targetFollowUpDate: string;
  status: 'Draft' | 'Sent' | 'Connected' | 'Meeting Booked' | 'No Response';
}

export interface WinProject {
  id: string;
  title: string;
  targetCompany: string;
  targetRole: string;
  researchPhase: {
    companyContext: string;
    strategicPillars: string[];
    recentNewsOrFriction: string;
  };
  businessProblem: {
    problemStatement: string;
    rootCauses: string[];
    estimatedFinancialFriction: string;
  };
  opportunity: {
    marketWindow: string;
    competitiveAdvantage: string;
  };
  solution: {
    frameworkName: string;
    threeStepArchitecture: string[];
    riskMitigation: string;
  };
  businessImpact: {
    projectedCostSavings: string;
    projectedRevenueUplift: string;
    timeToValue: string;
  };
  deckSlidesMarkdown: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSession {
  id: string;
  companyName: string;
  roleTitle: string;
  roundType: 'Behavioral' | 'Leadership' | 'Technical' | 'Case' | 'Executive' | 'Role-Specific';
  questions: Array<{
    id: string;
    questionText: string;
    category: string;
    suggestedCARStoryId?: string;
    userAnswerText?: string;
    userAudioDuration?: number;
    aiScore?: {
      communication: number; // 0-10
      confidence: number; // 0-10
      structure: number; // 0-10
      leadership: number; // 0-10
      technicalDepth: number; // 0-10
      businessThinking: number; // 0-10
      conciseness: number; // 0-10
      overallScore: number; // 0-100
    };
    aiFeedback?: {
      strengths: string[];
      weakAnswersToAvoid: string[];
      refinedAnswerScript: string;
    };
  }>;
  overallScore: number;
  date: string;
}

export interface NegotiationModel {
  id: string;
  companyName: string;
  roleTitle: string;
  currentCompensation: {
    fixed: number;
    variable: number;
    stocks: number;
    total: number;
  };
  marketRange: {
    min: number;
    median: number;
    max: number;
  };
  targetCompensation: {
    fixed: number;
    variable: number;
    stocks: number;
    joiningBonus: number;
    total: number;
  };
  minimumAcceptable: {
    fixed: number;
    total: number;
  };
  idealOffer: {
    total: number;
  };
  negotiationLeveragePoints: string[];
  recruiterScripts: {
    salaryExpectationResponse: string;
    currentCTCAnchorDefense: string;
    counterOfferScript: string;
    competingOffersScript: string;
    walkAwayScript: string;
  };
  updatedAt: string;
}

export interface LearningSection {
  id: number;
  number: string;
  title: string;
  category: 'Foundation' | 'Execution' | 'Advanced Mastery';
  duration: string;
  description: string;
  keyTakeaways: string[];
  deliverable: string;
  isCompleted: boolean;
  notes?: string;
}

export interface LinkedInPostIdea {
  id: string;
  topic: string;
  hook: string;
  content: string;
  format: 'Case Study' | 'Contrarian Take' | 'Framework Breakdown' | 'Career Lesson' | 'Industry Trend';
  targetAudience: string;
  callToAction: string;
  hashtags: string[];
  status: 'Idea' | 'Drafted' | 'Scheduled' | 'Published';
  scheduledDate?: string;
}
