export interface MasterResumeDocument {
  id: string;
  version: string;
  updatedAt: string;
  markdownContent: string;
  plainTextContent: string;
  highlights: string[];
  executiveSummary: string;
}

export interface TailoredResume {
  id: string;
  title: string;
  targetCompany: string;
  targetRole: string;
  jdSnippet: string;
  matchScore: number;
  markdownContent: string;
  customSummary: string;
  tailoredBulletPoints: Array<{
    originalRole: string;
    bullet: string;
    matchedKeywords: string[];
    carSourceId?: string;
  }>;
  highlightedSkills: string[];
  missingKeywordsAddressed: string[];
  atsSafetyScore: number;
  dateCreated: string;
}

export interface JDAnalysisResult {
  id: string;
  roleTitle: string;
  companyName: string;
  overallMatchScore: number; // 0-100%
  keywordMatchScore: number;
  experienceMatchScore: number;
  leadershipMatchScore: number;
  industryMatchScore: number;
  skillMatchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  missingEvidenceGaps: string[];
  atsRisks: string[];
  recommendedChanges: string[];
  extractedRequirements: {
    coreSkills: string[];
    yearsOfExperience: string;
    leadershipExpectations: string[];
    educationLevel: string;
    keyDeliverables: string[];
  };
  analysisDate: string;
}

export interface CoverLetter {
  id: string;
  targetCompany: string;
  targetRole: string;
  hiringManagerName?: string;
  tone: 'Executive & Strategic' | 'Impact-Driven & Technical' | 'Visionary & Transformational';
  content: string;
  dateCreated: string;
}
