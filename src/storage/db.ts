import Dexie, { type Table } from 'dexie';
import { 
  MasterCareerMemory, 
  CareerTimelineEntry, 
  CARStory, 
  SkillItem 
} from '../types/career';
import { 
  Contact, 
  Lead, 
  CompanyIntelligence, 
  QuotationEngagement, 
  MeetingItem, 
  Application 
} from '../types/crm';
import { 
  MasterResumeDocument, 
  TailoredResume, 
  JDAnalysisResult, 
  CoverLetter 
} from '../types/resume';
import { 
  BooleanSearchQuery, 
  NetworkingOutreachPlan, 
  WinProject, 
  InterviewSession, 
  NegotiationModel, 
  LearningSection, 
  LinkedInPostIdea 
} from '../types/jobsearch';
import { 
  AICacheEntry, 
  TokenUsageStats, 
  ChatMessage 
} from '../types/ai';

export class AlignexDatabase extends Dexie {
  masterMemory!: Table<MasterCareerMemory, string>;
  careerTimeline!: Table<CareerTimelineEntry, string>;
  carStories!: Table<CARStory, string>;
  skills!: Table<SkillItem, string>;
  contacts!: Table<Contact, string>;
  leads!: Table<Lead, string>;
  companies!: Table<CompanyIntelligence, string>;
  quotations!: Table<QuotationEngagement, string>;
  meetings!: Table<MeetingItem, string>;
  applications!: Table<Application, string>;
  masterResume!: Table<MasterResumeDocument, string>;
  tailoredResumes!: Table<TailoredResume, string>;
  jdAnalyses!: Table<JDAnalysisResult, string>;
  coverLetters!: Table<CoverLetter, string>;
  booleanSearches!: Table<BooleanSearchQuery, string>;
  outreachPlans!: Table<NetworkingOutreachPlan, string>;
  winProjects!: Table<WinProject, string>;
  interviewSessions!: Table<InterviewSession, string>;
  negotiationModels!: Table<NegotiationModel, string>;
  learningSections!: Table<LearningSection, number>;
  linkedInPosts!: Table<LinkedInPostIdea, string>;
  aiCache!: Table<AICacheEntry, number>;
  tokenStats!: Table<TokenUsageStats, string>;
  chatHistory!: Table<ChatMessage, string>;

  constructor() {
    super('alignex_career_db');
    this.version(1).stores({
      masterMemory: 'id, lastUpdated',
      careerTimeline: 'id, company, function, startDate',
      carStories: 'id, title, isResultCaptured, dateCreated, *tags',
      skills: 'id, name, category, level, *tags',
      contacts: 'id, name, company, relationship, status, nextFollowUp',
      leads: 'id, title, company, stage, estimatedValue',
      companies: 'id, name, tier, industry, updatedAt',
      quotations: 'id, targetCompany, roleTitle, status',
      meetings: 'id, withPerson, company, date, type, completed',
      applications: 'id, company, role, stage, appliedDate, atsScore',
      masterResume: 'id, version, updatedAt',
      tailoredResumes: 'id, targetCompany, targetRole, matchScore, dateCreated',
      jdAnalyses: 'id, roleTitle, companyName, overallMatchScore',
      coverLetters: 'id, targetCompany, targetRole',
      booleanSearches: 'id, title, roleTarget, category',
      outreachPlans: 'id, personName, personCompany, status',
      winProjects: 'id, title, targetCompany, targetRole',
      interviewSessions: 'id, companyName, roleTitle, roundType, date',
      negotiationModels: 'id, companyName, roleTitle',
      learningSections: 'id, category, isCompleted',
      linkedInPosts: 'id, topic, format, status',
      aiCache: '++id, promptHash, contextHash, agentType, createdAt',
      tokenStats: 'lastUpdated',
      chatHistory: 'id, sender, agentType, timestamp'
    });
  }
}

export const db = new AlignexDatabase();
