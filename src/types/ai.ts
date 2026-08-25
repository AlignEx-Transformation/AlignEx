export type AgentType = 
  | 'NOVA'
  | 'HUNTER'
  | 'NAVIGATOR'
  | 'NETWORKER'
  | 'TAILOR'
  | 'INFLUENCER'
  | 'PITCHER'
  | 'INTERVIEWER'
  | 'NEGOTIATOR';

export interface AgentDefinition {
  type: AgentType;
  name: string;
  tagline: string;
  description: string;
  systemRole?: string;
  iconName: string;
  color: string;
  badge: string;
  capabilities: string[];
  suggestedPrompts: string[];
}

export type TokenSaverMode = 'OFF' | 'BALANCED' | 'MAXIMUM SAVINGS';

export interface AICacheEntry {
  id?: number;
  promptHash: string;
  contextHash: string;
  agentType: AgentType;
  prompt: string;
  response: string;
  createdAt: string;
  model: string;
  version: string;
  tokensSavedEstimate: number;
}

export interface TokenUsageStats {
  requestsThisMonth: number;
  cachedResponsesCount: number;
  estimatedTokensSaved: number;
  totalTokensConsumed: number;
  lastUpdated: string;
}

export interface AIProviderConfig {
  mode: 'local' | 'gemini_custom';
  apiKey?: string;
  tokenSaverMode: TokenSaverMode;
  autoSaveOutputs: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentType?: AgentType;
  text: string;
  timestamp: string;
  contextRetrievedSummary?: string;
  actions?: Array<{
    label: string;
    actionType: 'navigate' | 'tailor' | 'outreach' | 'pipeline' | 'car_discover';
    payload?: any;
  }>;
  isCached?: boolean;
  tokensSaved?: number;
}
