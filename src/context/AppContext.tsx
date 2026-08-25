import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  MasterCareerMemory, 
  CareerTimelineEntry, 
  CARStory, 
  SkillItem, 
  TargetProfile, 
  CareerSituation 
} from '../types/career';
import { 
  Contact, 
  Lead, 
  CompanyIntelligence, 
  QuotationEngagement, 
  MeetingItem, 
  Application, 
  ApplicationStage 
} from '../types/crm';
import { 
  MasterResumeDocument, 
  TailoredResume, 
  JDAnalysisResult 
} from '../types/resume';
import { 
  BooleanSearchQuery, 
  WinProject, 
  InterviewSession, 
  NegotiationModel, 
  LearningSection, 
  LinkedInPostIdea 
} from '../types/jobsearch';
import { 
  AgentType, 
  TokenSaverMode, 
  TokenUsageStats, 
  ChatMessage 
} from '../types/ai';
import { db } from '../storage/db';
import { 
  INITIAL_MASTER_MEMORY, 
  INITIAL_CONTACTS, 
  INITIAL_LEADS, 
  INITIAL_COMPANIES, 
  INITIAL_APPLICATIONS, 
  INITIAL_BOOLEAN_SEARCHES, 
  INITIAL_LEARNING_SECTIONS, 
  INITIAL_WIN_PROJECT, 
  INITIAL_NEGOTIATION_MODEL, 
  INITIAL_MASTER_RESUME_DOC 
} from '../storage/seedData';
import { 
  requestJobsearchFolder, 
  disconnectJobsearchFolder, 
  getActiveFolderHandle, 
  syncAllToFolderHandle, 
  isFileSystemAccessSupported, 
  checkStorageQuota, 
  triggerFileDownload 
} from '../storage/fileSystem';

import { askAlignexAI } from '../ai/aiProvider';
import { DEFAULT_ALIGNEX_LOGO_SVG_URI } from '../assets/brandLogo';

export type NavigationPage = 
  | 'dashboard'
  | 'leads'
  | 'contacts'
  | 'companies'
  | 'quotations'
  | 'meetings'
  | 'ai-assistant'
  | 'career-profile'
  | 'job-search'
  | 'application-board'
  | 'networking'
  | 'resume-studio'
  | 'tailor'
  | 'career-evidence'
  | 'win-studio'
  | 'interviewer'
  | 'negotiator'
  | 'career-roadmap'
  | 'influencer'
  | 'learning-path'
  | 'settings'
  | 'settings-backup'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

export type ToastParam = 
  | 'success' 
  | 'info' 
  | 'warning' 
  | 'error' 
  | { title: string; message?: string; type?: 'success' | 'info' | 'warning' | 'error' };

interface AppContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  masterMemory: MasterCareerMemory;
  updateMasterMemory: (updater: (prev: MasterCareerMemory) => MasterCareerMemory) => Promise<void>;
  
  // Timeline
  careerTimeline: CareerTimelineEntry[];
  addTimelineEntry: (entry: CareerTimelineEntry) => Promise<void>;
  updateTimelineEntry: (id: string, entry: Partial<CareerTimelineEntry>) => Promise<void>;
  deleteTimelineEntry: (id: string) => Promise<void>;
  
  // CAR Evidence
  carStories: CARStory[];
  addCARStory: (story: CARStory) => Promise<void>;
  updateCARStory: (id: string, story: Partial<CARStory>) => Promise<void>;
  deleteCARStory: (id: string) => Promise<void>;
  
  // CRM
  contacts: Contact[];
  addContact: (contact: Contact) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  
  leads: Lead[];
  addLead: (lead: Lead) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  companies: CompanyIntelligence[];
  addCompany: (comp: CompanyIntelligence) => Promise<void>;
  updateCompany: (id: string, comp: Partial<CompanyIntelligence>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;

  quotations: QuotationEngagement[];
  addQuotation: (q: QuotationEngagement) => Promise<void>;
  updateQuotation: (id: string, q: Partial<QuotationEngagement>) => Promise<void>;
  deleteQuotation: (id: string) => Promise<void>;

  meetings: MeetingItem[];
  addMeeting: (m: MeetingItem) => Promise<void>;
  updateMeeting: (id: string, m: Partial<MeetingItem>) => Promise<void>;
  deleteMeeting: (id: string) => Promise<void>;

  applications: Application[];
  addApplication: (app: Application) => Promise<void>;
  updateApplicationStage: (id: string, stage: ApplicationStage) => Promise<void>;
  updateApplication: (id: string, app: Partial<Application>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;

  // Resumes
  masterResumeDoc: MasterResumeDocument;
  updateMasterResumeDoc: (doc: Partial<MasterResumeDocument>) => Promise<void>;
  tailoredResumes: TailoredResume[];
  addTailoredResume: (resume: TailoredResume) => Promise<void>;

  // Job Search & Tools
  booleanSearches: BooleanSearchQuery[];
  addBooleanSearch: (query: BooleanSearchQuery) => Promise<void>;
  deleteBooleanSearch: (id: string) => Promise<void>;

  winProjects: WinProject[];
  addWinProject: (win: WinProject) => Promise<void>;
  updateWinProject: (id: string, win: Partial<WinProject>) => Promise<void>;

  negotiationModel: NegotiationModel;
  updateNegotiationModel: (model: Partial<NegotiationModel>) => Promise<void>;

  learningSections: LearningSection[];
  toggleLearningSectionCompleted: (id: number) => Promise<void>;

  linkedInPosts: LinkedInPostIdea[];
  addLinkedInPost: (post: LinkedInPostIdea) => Promise<void>;
  updateLinkedInPost: (id: string, post: Partial<LinkedInPostIdea>) => Promise<void>;

  // AI & Token Saver
  tokenSaverMode: TokenSaverMode;
  setTokenSaverMode: (mode: TokenSaverMode) => void;
  tokenStats: TokenUsageStats;
  chatMessages: ChatMessage[];
  chatHistory: ChatMessage[];
  addChatMessage: (msg: ChatMessage | (Omit<ChatMessage, 'id' | 'timestamp'> & { id?: string; timestamp?: string })) => Promise<void>;
  clearChatMessages: () => Promise<void>;
  clearChatHistory: () => Promise<void>;
  askAgent: (agentType: AgentType, prompt: string) => Promise<string>;
  isAiLoading: boolean;
  aiProvider: { type: string; model: string; apiKey?: string };
  setAiProvider: (provider: { type: string; model: string; apiKey?: string }) => void;

  // Brand Identity (Admin)
  brandLogo: string | null;
  brandName: string;
  brandTagline: string;
  setBrandLogo: (logo: string | null) => void;
  setBrandInfo: (name: string, tagline: string) => void;

  // Jobsearch Folder & Memory Modal
  isLocalMemoryModalOpen: boolean;
  setIsLocalMemoryModalOpen: (open: boolean) => void;
  isFolderConnected: boolean;
  folderName: string | null;
  connectJobsearchFolder: () => Promise<void>;
  disconnectFolder: () => Promise<void>;
  syncNow: () => Promise<void>;
  exportEntireBackupJSON: () => Promise<void>;
  restoreBackupFromJSON: (jsonData: string) => Promise<boolean>;
  resetToDemoData: () => Promise<void>;

  // UI helpers
  toasts: ToastMessage[];
  addToast: (typeOrObj: ToastParam, title?: string, message?: string) => void;
  removeToast: (id: string) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isInitialDataLoaded: boolean;
  isInitialized: boolean;
  lastSavedTimestamp: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [masterMemory, setMasterMemory] = useState<MasterCareerMemory>(INITIAL_MASTER_MEMORY);
  const [careerTimeline, setCareerTimeline] = useState<CareerTimelineEntry[]>([]);
  const [carStories, setCarStories] = useState<CARStory[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [companies, setCompanies] = useState<CompanyIntelligence[]>([]);
  const [quotations, setQuotations] = useState<QuotationEngagement[]>([]);
  const [meetings, setMeetings] = useState<MeetingItem[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [masterResumeDoc, setMasterResumeDoc] = useState<MasterResumeDocument>(INITIAL_MASTER_RESUME_DOC);
  const [tailoredResumes, setTailoredResumes] = useState<TailoredResume[]>([]);
  const [booleanSearches, setBooleanSearches] = useState<BooleanSearchQuery[]>([]);
  const [winProjects, setWinProjects] = useState<WinProject[]>([]);
  const [negotiationModel, setNegotiationModel] = useState<NegotiationModel>(INITIAL_NEGOTIATION_MODEL);
  const [learningSections, setLearningSections] = useState<LearningSection[]>([]);
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPostIdea[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<{ type: string; model: string; apiKey?: string }>({
    type: 'gemini',
    model: 'gemini-2.5-flash'
  });
  
  const [tokenSaverMode, setTokenSaverMode] = useState<TokenSaverMode>('BALANCED');
  const [tokenStats, setTokenStats] = useState<TokenUsageStats>({
    requestsThisMonth: 12,
    cachedResponsesCount: 38,
    estimatedTokensSaved: 42600,
    totalTokensConsumed: 8400,
    lastUpdated: new Date().toISOString()
  });

  const [brandLogo, setBrandLogoState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('alignex_brand_logo');
      // If no saved logo or previously saved obsolete test SVG, use official permanent Alignex logo
      if (saved && !saved.includes('ALINAX') && !saved.includes('coreGlow')) {
        return saved;
      }
      localStorage.setItem('alignex_brand_logo', DEFAULT_ALIGNEX_LOGO_SVG_URI);
      return DEFAULT_ALIGNEX_LOGO_SVG_URI;
    } catch {
      return DEFAULT_ALIGNEX_LOGO_SVG_URI;
    }
  });
  const [brandName, setBrandNameState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('alignex_brand_name');
      if (saved && saved !== 'ALINAX') return saved;
      localStorage.setItem('alignex_brand_name', 'Alignex');
      return 'Alignex';
    } catch {
      return 'Alignex';
    }
  });
  const [brandTagline, setBrandTaglineState] = useState<string>(() => {
    try {
      return localStorage.getItem('alignex_brand_tagline') || 'AI Career Consulting CRM';
    } catch {
      return 'AI Career Consulting CRM';
    }
  });

  const setBrandLogo = useCallback((logo: string | null) => {
    setBrandLogoState(logo);
    try {
      if (logo) {
        localStorage.setItem('alignex_brand_logo', logo);
      } else {
        localStorage.removeItem('alignex_brand_logo');
      }
    } catch (e) {
      console.warn('Could not persist logo to localStorage', e);
    }
  }, []);

  const setBrandInfo = useCallback((name: string, tagline: string) => {
    setBrandNameState(name);
    setBrandTaglineState(tagline);
    try {
      localStorage.setItem('alignex_brand_name', name);
      localStorage.setItem('alignex_brand_tagline', tagline);
    } catch (e) {
      console.warn('Could not persist brand info', e);
    }
  }, []);

  const [isLocalMemoryModalOpen, setIsLocalMemoryModalOpen] = useState(false);
  const [isFolderConnected, setIsFolderConnected] = useState(false);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string>(new Date().toLocaleTimeString());

  const addToast = useCallback((typeOrObj: ToastParam, title?: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    let resolvedType: 'success' | 'info' | 'warning' | 'error' = 'info';
    let resolvedTitle = '';
    let resolvedMessage = message;

    if (typeof typeOrObj === 'object' && typeOrObj !== null) {
      resolvedTitle = typeOrObj.title;
      resolvedMessage = typeOrObj.message;
      resolvedType = typeOrObj.type || 'info';
    } else if (typeof typeOrObj === 'string') {
      resolvedType = typeOrObj;
      resolvedTitle = title || '';
    }

    setToasts(prev => [...prev, { id, type: resolvedType, title: resolvedTitle, message: resolvedMessage }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const askAgent = useCallback(async (agentType: AgentType, prompt: string): Promise<string> => {
    setIsAiLoading(true);
    try {
      const response = await askAlignexAI({
        agentType,
        prompt,
        masterMemory
      });
      return response.message;
    } finally {
      setIsAiLoading(false);
    }
  }, [masterMemory]);

  // Initialize from Dexie on startup
  useEffect(() => {
    async function loadData() {
      try {
        const memCount = await db.masterMemory.count();
        if (memCount === 0) {
          // Seed initial demo data
          await db.masterMemory.put(INITIAL_MASTER_MEMORY);
          await db.careerTimeline.bulkPut(INITIAL_MASTER_MEMORY.careerHistory);
          await db.carStories.bulkPut(INITIAL_MASTER_MEMORY.carStories);
          await db.skills.bulkPut(INITIAL_MASTER_MEMORY.skills);
          await db.contacts.bulkPut(INITIAL_CONTACTS);
          await db.leads.bulkPut(INITIAL_LEADS);
          await db.companies.bulkPut(INITIAL_COMPANIES);
          await db.applications.bulkPut(INITIAL_APPLICATIONS);
          await db.booleanSearches.bulkPut(INITIAL_BOOLEAN_SEARCHES);
          await db.learningSections.bulkPut(INITIAL_LEARNING_SECTIONS);
          await db.winProjects.put(INITIAL_WIN_PROJECT);
          await db.negotiationModels.put(INITIAL_NEGOTIATION_MODEL);
          await db.masterResume.put(INITIAL_MASTER_RESUME_DOC);
        }

        let mem = (await db.masterMemory.toArray())[0] || INITIAL_MASTER_MEMORY;
        if (!mem.identity.fullName || mem.identity.fullName === 'Harikumar D') {
          mem = {
            ...mem,
            identity: {
              ...mem.identity,
              fullName: 'Poornima Harikumar',
              email: 'Poornima.Harikumar@gmail.com',
              linkedinUrl: 'https://linkedin.com/in/poornima-harikumar',
              githubUrl: 'https://github.com/poornima-harikumar',
              tagline: 'Senior Director of Engineering & AI Enablement | Enterprise Program Management | Distributed Cloud & AI Systems'
            },
            targetProfile: {
              ...mem.targetProfile,
              targetRole: 'Director of Engineering / Senior Director of Program Management & AI Enablement',
              targetFunction: 'Technology & AI Enablement'
            }
          };
          await db.masterMemory.put(mem);
        }
        const timeline = await db.careerTimeline.toArray();
        const cars = await db.carStories.toArray();
        const conts = await db.contacts.toArray();
        const lds = await db.leads.toArray();
        const comps = await db.companies.toArray();
        const quots = await db.quotations.toArray();
        const meets = await db.meetings.toArray();
        const apps = await db.applications.toArray();
        const mResume = (await db.masterResume.toArray())[0] || INITIAL_MASTER_RESUME_DOC;
        const tResumes = await db.tailoredResumes.toArray();
        const bools = await db.booleanSearches.toArray();
        const wins = await db.winProjects.toArray();
        const negs = (await db.negotiationModels.toArray())[0] || INITIAL_NEGOTIATION_MODEL;
        const learns = await db.learningSections.toArray();
        const posts = await db.linkedInPosts.toArray();
        const chats = await db.chatHistory.toArray();
        const tStats = (await db.tokenStats.toArray())[0];

        setMasterMemory(mem);
        setCareerTimeline(timeline.length > 0 ? timeline : mem.careerHistory);
        setCarStories(cars.length > 0 ? cars : mem.carStories);
        setContacts(conts.length > 0 ? conts : INITIAL_CONTACTS);
        setLeads(lds.length > 0 ? lds : INITIAL_LEADS);
        setCompanies(comps.length > 0 ? comps : INITIAL_COMPANIES);
        setQuotations(quots);
        setMeetings(meets);
        setApplications(apps.length > 0 ? apps : INITIAL_APPLICATIONS);
        setMasterResumeDoc(mResume);
        setTailoredResumes(tResumes);
        setBooleanSearches(bools.length > 0 ? bools : INITIAL_BOOLEAN_SEARCHES);
        setWinProjects(wins.length > 0 ? wins : [INITIAL_WIN_PROJECT]);
        setNegotiationModel(negs);
        setLearningSections(learns.length > 0 ? learns : INITIAL_LEARNING_SECTIONS);
        setLinkedInPosts(posts);
        setChatMessages(chats);

        if (tStats) {
          setTokenStats(tStats);
        }

        setIsInitialDataLoaded(true);
      } catch (err) {
        console.error('Error loading IndexedDB data:', err);
        setIsInitialDataLoaded(true);
      }
    }

    loadData();
  }, []);

  const triggerAutosaveNotification = () => {
    setLastSavedTimestamp(new Date().toLocaleTimeString());
    const handle = getActiveFolderHandle();
    if (handle) {
      syncAllToFolderHandle(handle);
    }
  };

  const updateMasterMemory = async (updater: (prev: MasterCareerMemory) => MasterCareerMemory) => {
    const updated = updater(masterMemory);
    updated.lastUpdated = new Date().toISOString();
    updated.version = (updated.version || 1) + 1;
    setMasterMemory(updated);
    await db.masterMemory.put(updated);
    triggerAutosaveNotification();
    addToast('success', 'Master Career Memory Saved', 'All changes persisted to local database.');
  };

  const addTimelineEntry = async (entry: CareerTimelineEntry) => {
    setCareerTimeline(prev => [entry, ...prev]);
    await db.careerTimeline.put(entry);
    // Also sync inside masterMemory
    await updateMasterMemory(prev => ({
      ...prev,
      careerHistory: [entry, ...prev.careerHistory.filter(h => h.id !== entry.id)]
    }));
    triggerAutosaveNotification();
  };

  const updateTimelineEntry = async (id: string, entry: Partial<CareerTimelineEntry>) => {
    const target = careerTimeline.find(t => t.id === id);
    if (!target) return;
    const merged = { ...target, ...entry };
    setCareerTimeline(prev => prev.map(t => (t.id === id ? merged : t)));
    await db.careerTimeline.put(merged);
    await updateMasterMemory(prev => ({
      ...prev,
      careerHistory: prev.careerHistory.map(h => (h.id === id ? merged : h))
    }));
    triggerAutosaveNotification();
  };

  const deleteTimelineEntry = async (id: string) => {
    setCareerTimeline(prev => prev.filter(t => t.id !== id));
    await db.careerTimeline.delete(id);
    await updateMasterMemory(prev => ({
      ...prev,
      careerHistory: prev.careerHistory.filter(h => h.id !== id)
    }));
    triggerAutosaveNotification();
  };

  const addCARStory = async (story: CARStory) => {
    setCarStories(prev => [story, ...prev]);
    await db.carStories.put(story);
    await updateMasterMemory(prev => ({
      ...prev,
      carStories: [story, ...prev.carStories.filter(s => s.id !== story.id)]
    }));
    triggerAutosaveNotification();
    addToast('success', 'CAR Story Captured', `"${story.title}" saved to Career Evidence Lab.`);
  };

  const updateCARStory = async (id: string, story: Partial<CARStory>) => {
    const target = carStories.find(c => c.id === id);
    if (!target) return;
    const merged = { ...target, ...story };
    setCarStories(prev => prev.map(c => (c.id === id ? merged : c)));
    await db.carStories.put(merged);
    await updateMasterMemory(prev => ({
      ...prev,
      carStories: prev.carStories.map(s => (s.id === id ? merged : s))
    }));
    triggerAutosaveNotification();
  };

  const deleteCARStory = async (id: string) => {
    setCarStories(prev => prev.filter(c => c.id !== id));
    await db.carStories.delete(id);
    await updateMasterMemory(prev => ({
      ...prev,
      carStories: prev.carStories.filter(s => s.id !== id)
    }));
    triggerAutosaveNotification();
  };

  // Contacts
  const addContact = async (contact: Contact) => {
    setContacts(prev => [contact, ...prev]);
    await db.contacts.put(contact);
    triggerAutosaveNotification();
    addToast('success', 'Contact Created', `${contact.name} added to CRM.`);
  };

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    const target = contacts.find(c => c.id === id);
    if (!target) return;
    const merged = { ...target, ...contact };
    setContacts(prev => prev.map(c => (c.id === id ? merged : c)));
    await db.contacts.put(merged);
    triggerAutosaveNotification();
  };

  const deleteContact = async (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    await db.contacts.delete(id);
    triggerAutosaveNotification();
  };

  // Leads
  const addLead = async (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
    await db.leads.put(lead);
    triggerAutosaveNotification();
    addToast('success', 'Lead Added', `${lead.title} recorded in pipeline.`);
  };

  const updateLead = async (id: string, lead: Partial<Lead>) => {
    const target = leads.find(l => l.id === id);
    if (!target) return;
    const merged = { ...target, ...lead };
    setLeads(prev => prev.map(l => (l.id === id ? merged : l)));
    await db.leads.put(merged);
    triggerAutosaveNotification();
  };

  const deleteLead = async (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    await db.leads.delete(id);
    triggerAutosaveNotification();
  };

  // Companies
  const addCompany = async (comp: CompanyIntelligence) => {
    setCompanies(prev => [comp, ...prev]);
    await db.companies.put(comp);
    triggerAutosaveNotification();
    addToast('success', 'Company Intelligence Added', `${comp.name} mapped in target database.`);
  };

  const updateCompany = async (id: string, comp: Partial<CompanyIntelligence>) => {
    const target = companies.find(c => c.id === id);
    if (!target) return;
    const merged = { ...target, ...comp };
    setCompanies(prev => prev.map(c => (c.id === id ? merged : c)));
    await db.companies.put(merged);
    triggerAutosaveNotification();
  };

  const deleteCompany = async (id: string) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    await db.companies.delete(id);
    triggerAutosaveNotification();
  };

  // Quotations
  const addQuotation = async (q: QuotationEngagement) => {
    setQuotations(prev => [q, ...prev]);
    await db.quotations.put(q);
    triggerAutosaveNotification();
    addToast('success', 'Quotation Saved', `Proposal for ${q.targetCompany} saved.`);
  };

  const updateQuotation = async (id: string, q: Partial<QuotationEngagement>) => {
    const target = quotations.find(item => item.id === id);
    if (!target) return;
    const merged = { ...target, ...q };
    setQuotations(prev => prev.map(item => (item.id === id ? merged : item)));
    await db.quotations.put(merged);
    triggerAutosaveNotification();
  };

  const deleteQuotation = async (id: string) => {
    setQuotations(prev => prev.filter(item => item.id !== id));
    await db.quotations.delete(id);
    triggerAutosaveNotification();
  };

  // Meetings
  const addMeeting = async (m: MeetingItem) => {
    setMeetings(prev => [m, ...prev]);
    await db.meetings.put(m);
    triggerAutosaveNotification();
    addToast('success', 'Meeting Scheduled', `${m.title} with ${m.withPerson} saved.`);
  };

  const updateMeeting = async (id: string, m: Partial<MeetingItem>) => {
    const target = meetings.find(item => item.id === id);
    if (!target) return;
    const merged = { ...target, ...m };
    setMeetings(prev => prev.map(item => (item.id === id ? merged : item)));
    await db.meetings.put(merged);
    triggerAutosaveNotification();
  };

  const deleteMeeting = async (id: string) => {
    setMeetings(prev => prev.filter(item => item.id !== id));
    await db.meetings.delete(id);
    triggerAutosaveNotification();
  };

  // Applications
  const addApplication = async (app: Application) => {
    setApplications(prev => [app, ...prev]);
    await db.applications.put(app);
    triggerAutosaveNotification();
    addToast('success', 'Application Tracked', `${app.role} @ ${app.company} added to board.`);
  };

  const updateApplicationStage = async (id: string, stage: ApplicationStage) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;
    const merged = { ...target, stage, lastStageChangeDate: new Date().toISOString() };
    setApplications(prev => prev.map(a => (a.id === id ? merged : a)));
    await db.applications.put(merged);
    triggerAutosaveNotification();
    addToast('info', 'Stage Updated', `${target.role} moved to ${stage}`);
  };

  const updateApplication = async (id: string, app: Partial<Application>) => {
    const target = applications.find(a => a.id === id);
    if (!target) return;
    const merged = { ...target, ...app };
    setApplications(prev => prev.map(a => (a.id === id ? merged : a)));
    await db.applications.put(merged);
    triggerAutosaveNotification();
  };

  const deleteApplication = async (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    await db.applications.delete(id);
    triggerAutosaveNotification();
  };

  // Master Resume Doc
  const updateMasterResumeDoc = async (doc: Partial<MasterResumeDocument>) => {
    const merged = { ...masterResumeDoc, ...doc, updatedAt: new Date().toISOString() };
    setMasterResumeDoc(merged);
    await db.masterResume.put(merged);
    triggerAutosaveNotification();
    addToast('success', 'Master Resume Updated', 'Markdown and Plain Text source updated.');
  };

  const addTailoredResume = async (resume: TailoredResume) => {
    setTailoredResumes(prev => [resume, ...prev]);
    await db.tailoredResumes.put(resume);
    triggerAutosaveNotification();
    addToast('success', 'Tailored Resume Saved', `Resume for ${resume.targetCompany} (${resume.matchScore}% match) saved.`);
  };

  // Boolean searches
  const addBooleanSearch = async (query: BooleanSearchQuery) => {
    setBooleanSearches(prev => [query, ...prev]);
    await db.booleanSearches.put(query);
    triggerAutosaveNotification();
    addToast('success', 'Search Saved', `Boolean string for ${query.roleTarget} saved.`);
  };

  const deleteBooleanSearch = async (id: string) => {
    setBooleanSearches(prev => prev.filter(b => b.id !== id));
    await db.booleanSearches.delete(id);
    triggerAutosaveNotification();
  };

  // WIN projects
  const addWinProject = async (win: WinProject) => {
    setWinProjects(prev => [win, ...prev]);
    await db.winProjects.put(win);
    triggerAutosaveNotification();
    addToast('success', 'WIN Project Saved', `Presentation for ${win.targetCompany} created.`);
  };

  const updateWinProject = async (id: string, win: Partial<WinProject>) => {
    const target = winProjects.find(w => w.id === id);
    if (!target) return;
    const merged = { ...target, ...win, updatedAt: new Date().toISOString() };
    setWinProjects(prev => prev.map(w => (w.id === id ? merged : w)));
    await db.winProjects.put(merged);
    triggerAutosaveNotification();
  };

  // Negotiation Model
  const updateNegotiationModel = async (model: Partial<NegotiationModel>) => {
    const merged = { ...negotiationModel, ...model, updatedAt: new Date().toISOString() };
    setNegotiationModel(merged);
    await db.negotiationModels.put(merged);
    triggerAutosaveNotification();
    addToast('success', 'Negotiation Model Saved', 'Compensation benchmarks and scripts updated.');
  };

  // Learning Sections
  const toggleLearningSectionCompleted = async (id: number) => {
    const target = learningSections.find(s => s.id === id);
    if (!target) return;
    const isCompleted = !target.isCompleted;
    const merged = { ...target, isCompleted };
    setLearningSections(prev => prev.map(s => (s.id === id ? merged : s)));
    await db.learningSections.put(merged);
    triggerAutosaveNotification();
    addToast(isCompleted ? 'success' : 'info', isCompleted ? 'Module Completed!' : 'Module Marked In Progress', target.title);
  };

  // LinkedIn Posts
  const addLinkedInPost = async (post: LinkedInPostIdea) => {
    setLinkedInPosts(prev => [post, ...prev]);
    await db.linkedInPosts.put(post);
    triggerAutosaveNotification();
    addToast('success', 'Post Drafted', `Topic "${post.topic}" saved.`);
  };

  const updateLinkedInPost = async (id: string, post: Partial<LinkedInPostIdea>) => {
    const target = linkedInPosts.find(p => p.id === id);
    if (!target) return;
    const merged = { ...target, ...post };
    setLinkedInPosts(prev => prev.map(p => (p.id === id ? merged : p)));
    await db.linkedInPosts.put(merged);
    triggerAutosaveNotification();
  };

  // Chat
  const addChatMessage = async (msg: ChatMessage | (Omit<ChatMessage, 'id' | 'timestamp'> & { id?: string; timestamp?: string })) => {
    const fullMsg: ChatMessage = {
      ...msg,
      id: msg.id || `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: msg.timestamp || new Date().toISOString()
    };
    setChatMessages(prev => [...prev, fullMsg]);
    await db.chatHistory.put(fullMsg);
  };

  const clearChatMessages = async () => {
    setChatMessages([]);
    await db.chatHistory.clear();
    addToast('info', 'Chat History Cleared');
  };

  // Jobsearch Folder Connection
  const connectJobsearchFolder = async () => {
    const res = await requestJobsearchFolder();
    if (res.success) {
      setIsFolderConnected(true);
      setFolderName(res.folderName);
      addToast('success', 'Jobsearch Workspace Connected', `Synchronizing with local folder: ${res.folderName}`);
    } else {
      addToast('warning', 'Folder Connection Notice', res.error || 'Using local browser IndexedDB & OPFS storage.');
    }
  };

  const disconnectFolder = async () => {
    await disconnectJobsearchFolder();
    setIsFolderConnected(false);
    setFolderName(null);
    addToast('info', 'Folder Disconnected', 'Data remains safely stored in local IndexedDB.');
  };

  const syncNow = async () => {
    const handle = getActiveFolderHandle();
    if (handle) {
      await syncAllToFolderHandle(handle);
      addToast('success', 'Workspace Synced', 'All directories in Jobsearch folder refreshed.');
    } else {
      addToast('info', 'IndexedDB Up to Date', 'All records are active in browser memory.');
    }
  };

  const exportEntireBackupJSON = async () => {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      masterMemory,
      careerTimeline,
      carStories,
      contacts,
      leads,
      companies,
      quotations,
      meetings,
      applications,
      masterResumeDoc,
      tailoredResumes,
      booleanSearches,
      winProjects,
      negotiationModel,
      learningSections,
      linkedInPosts
    };
    const timestamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
    triggerFileDownload(JSON.stringify(fullBackup, null, 2), `alignex-backup-${timestamp}.json`, 'application/json');
    addToast('success', 'Backup Exported', `Downloaded alignex-backup-${timestamp}.json`);
  };

  const restoreBackupFromJSON = async (jsonData: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonData);
      if (data.masterMemory) {
        await db.masterMemory.clear();
        await db.masterMemory.put(data.masterMemory);
        setMasterMemory(data.masterMemory);
      }
      if (data.careerTimeline) {
        await db.careerTimeline.clear();
        await db.careerTimeline.bulkPut(data.careerTimeline);
        setCareerTimeline(data.careerTimeline);
      }
      if (data.carStories) {
        await db.carStories.clear();
        await db.carStories.bulkPut(data.carStories);
        setCarStories(data.carStories);
      }
      if (data.contacts) {
        await db.contacts.clear();
        await db.contacts.bulkPut(data.contacts);
        setContacts(data.contacts);
      }
      if (data.leads) {
        await db.leads.clear();
        await db.leads.bulkPut(data.leads);
        setLeads(data.leads);
      }
      if (data.companies) {
        await db.companies.clear();
        await db.companies.bulkPut(data.companies);
        setCompanies(data.companies);
      }
      if (data.applications) {
        await db.applications.clear();
        await db.applications.bulkPut(data.applications);
        setApplications(data.applications);
      }
      if (data.masterResumeDoc) {
        await db.masterResume.clear();
        await db.masterResume.put(data.masterResumeDoc);
        setMasterResumeDoc(data.masterResumeDoc);
      }
      if (data.booleanSearches) {
        await db.booleanSearches.clear();
        await db.booleanSearches.bulkPut(data.booleanSearches);
        setBooleanSearches(data.booleanSearches);
      }
      if (data.winProjects) {
        await db.winProjects.clear();
        await db.winProjects.bulkPut(data.winProjects);
        setWinProjects(data.winProjects);
      }
      if (data.negotiationModel) {
        await db.negotiationModels.clear();
        await db.negotiationModels.put(data.negotiationModel);
        setNegotiationModel(data.negotiationModel);
      }
      if (data.learningSections) {
        await db.learningSections.clear();
        await db.learningSections.bulkPut(data.learningSections);
        setLearningSections(data.learningSections);
      }

      addToast('success', 'Career Memory Restored', 'All historical data successfully restored from backup.');
      return true;
    } catch (e: any) {
      console.error('Restore error:', e);
      addToast('error', 'Restore Failed', 'Invalid JSON backup file format.');
      return false;
    }
  };

  const resetToDemoData = async () => {
    await db.delete();
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        masterMemory,
        updateMasterMemory,
        careerTimeline,
        addTimelineEntry,
        updateTimelineEntry,
        deleteTimelineEntry,
        carStories,
        addCARStory,
        updateCARStory,
        deleteCARStory,
        contacts,
        addContact,
        updateContact,
        deleteContact,
        leads,
        addLead,
        updateLead,
        deleteLead,
        companies,
        addCompany,
        updateCompany,
        deleteCompany,
        quotations,
        addQuotation,
        updateQuotation,
        deleteQuotation,
        meetings,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        applications,
        addApplication,
        updateApplicationStage,
        updateApplication,
        deleteApplication,
        masterResumeDoc,
        updateMasterResumeDoc,
        tailoredResumes,
        addTailoredResume,
        booleanSearches,
        addBooleanSearch,
        deleteBooleanSearch,
        winProjects,
        addWinProject,
        updateWinProject,
        negotiationModel,
        updateNegotiationModel,
        learningSections,
        toggleLearningSectionCompleted,
        linkedInPosts,
        addLinkedInPost,
        updateLinkedInPost,
        tokenSaverMode,
        setTokenSaverMode,
        tokenStats,
        chatMessages,
        chatHistory: chatMessages,
        addChatMessage,
        clearChatMessages,
        clearChatHistory: clearChatMessages,
        askAgent,
        isAiLoading,
        aiProvider,
        setAiProvider,
        brandLogo,
        brandName,
        brandTagline,
        setBrandLogo,
        setBrandInfo,
        isLocalMemoryModalOpen,
        setIsLocalMemoryModalOpen,
        isFolderConnected,
        folderName,
        connectJobsearchFolder,
        disconnectFolder,
        syncNow,
        exportEntireBackupJSON,
        restoreBackupFromJSON,
        resetToDemoData,
        toasts,
        addToast,
        removeToast,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isInitialDataLoaded,
        isInitialized: isInitialDataLoaded,
        lastSavedTimestamp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
