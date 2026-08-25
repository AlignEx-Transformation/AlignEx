export type ContactRelationship = 
  | 'Recruiter'
  | 'Hiring Manager'
  | 'Referrer'
  | 'Alumni'
  | 'Executive Decision Maker'
  | 'Peer / Colleague'
  | 'Mentor'
  | 'Client';

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  relationship: ContactRelationship;
  linkedin: string;
  source: string; // e.g. LinkedIn, Referral, Alumni Network, Inbound
  lastContacted: string;
  nextFollowUp: string;
  notes: string;
  tags: string[];
  status: 'Active' | 'Nurturing' | 'Warm' | 'Cold' | 'Archived';
  avatarColor?: string;
}

export type LeadStage = 
  | 'Identified'
  | 'Approached'
  | 'Engaged'
  | 'Warm Conversation'
  | 'Opportunity Created'
  | 'Archived';

export interface Lead {
  id: string;
  title: string; // e.g. "VP of Engineering Inbound Lead"
  company: string;
  contactName: string;
  contactEmail?: string;
  stage: LeadStage;
  estimatedValue: string; // CTC or Retainer value
  source: string;
  probability: number; // 0-100%
  lastActivity: string;
  nextAction: string;
  notes: string;
  tags: string[];
  createdAt: string;
}

export interface CompanyIntelligence {
  id: string;
  name: string;
  industry: string;
  size: string;
  headquarters: string;
  website: string;
  hiringSignals: string[]; // e.g. "Series C funding ($45M)", "Expanding Hyderabad Dev Center"
  decisionMakers: string[]; // e.g. "Arun Kumar (VP Tech)", "Neha Sharma (Head of TA)"
  techStack: string[];
  tier: 'Tier 1 (Dream)' | 'Tier 2 (Strong)' | 'Tier 3 (Backup)';
  openRolesCount: number;
  notes: string;
  careersUrl: string;
  tags: string[];
  updatedAt: string;
}

export interface QuotationEngagement {
  id: string;
  title: string;
  targetCompany: string;
  roleTitle: string;
  type: 'Full-Time Employment' | 'Executive Advisory' | 'Fractional Leader' | 'Consulting Project';
  proposedFixedCTC: string;
  proposedVariableCTC: string;
  proposedStocksESOPs: string;
  joiningBonus: string;
  totalAnnualPackage: string;
  status: 'Draft' | 'Presented' | 'Negotiating' | 'Accepted' | 'Declined';
  termsAndBenefits: string[];
  notes: string;
  dateCreated: string;
}

export interface MeetingItem {
  id: string;
  title: string;
  withPerson: string;
  company: string;
  type: 'Screening Call' | 'Technical Round' | 'Hiring Manager Round' | 'Leadership / Bar Raiser' | 'Negotiation Call' | 'Coffee Chat / Networking' | 'Consulting Strategy';
  date: string;
  time: string;
  meetingLink?: string;
  agenda: string;
  preparationNotes: string;
  outcome?: string;
  completed: boolean;
}

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

export interface Application {
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
