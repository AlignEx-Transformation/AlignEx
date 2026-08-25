import { MasterCareerMemory, CARStory, SkillItem, CareerTimelineEntry } from '../types/career';
import { TokenSaverMode, AICacheEntry, AgentType } from '../types/ai';
import { db } from '../storage/db';

export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

export interface RetrievedContext {
  contextSummary: string;
  contextTokensEstimated: number;
  extractedKeywords: string[];
  relevantSkills: SkillItem[];
  relevantCARStories: CARStory[];
  relevantTimelineEntries: CareerTimelineEntry[];
  targetRoleContext?: string;
  serializedPromptContext: string;
}

export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'for', 'of', 'or', 'by', 'with',
    'from', 'as', 'about', 'into', 'through', 'after', 'over', 'between', 'out', 'against', 'during',
    'without', 'before', 'under', 'around', 'among', 'my', 'your', 'i', 'me', 'we', 'us', 'our',
    'please', 'can', 'you', 'help', 'what', 'how', 'when', 'where', 'who', 'why', 'create', 'make'
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));

  return Array.from(new Set(words));
}

/**
 * Token-optimized Context Retrieval Engine
 * Instead of passing the entire Master Career Memory (5000+ tokens),
 * this retrieves ONLY relevant evidence chunks (300-800 tokens max).
 */
export function retrieveContextForPrompt(
  prompt: string,
  masterMemory: MasterCareerMemory,
  tokenMode: TokenSaverMode = 'BALANCED'
): RetrievedContext {
  const keywords = extractKeywords(prompt);

  // 1. Relevant Skills
  const relevantSkills = masterMemory.skills.filter(s => {
    const matchName = keywords.some(k => s.name.toLowerCase().includes(k));
    const matchTag = s.tags.some(t => keywords.some(k => t.toLowerCase().includes(k)));
    return matchName || matchTag;
  });

  // If no direct skill matches, take top 4 core skills
  const fallbackSkills = relevantSkills.length > 0 ? relevantSkills : masterMemory.skills.slice(0, 4);

  // 2. Relevant CAR Stories
  const relevantCARStories = masterMemory.carStories.filter(car => {
    const matchTitle = keywords.some(k => car.title.toLowerCase().includes(k));
    const matchTag = car.tags.some(t => keywords.some(k => t.toLowerCase().includes(k)));
    const matchText = keywords.some(k => car.challenge.toLowerCase().includes(k) || car.action.toLowerCase().includes(k));
    return matchTitle || matchTag || matchText;
  });

  // Limit story chunks based on token mode
  const storyLimit = tokenMode === 'MAXIMUM SAVINGS' ? 1 : tokenMode === 'BALANCED' ? 2 : 4;
  const prunedStories = (relevantCARStories.length > 0 ? relevantCARStories : masterMemory.carStories).slice(0, storyLimit);

  // 3. Relevant Career Timeline Entries
  const relevantTimelineEntries = masterMemory.careerHistory.filter(entry => {
    const matchCompany = keywords.some(k => entry.company.toLowerCase().includes(k));
    const matchTech = entry.technology.some(tech => keywords.some(k => tech.toLowerCase().includes(k)));
    const matchRole = keywords.some(k => entry.jobTitle.toLowerCase().includes(k));
    return matchCompany || matchTech || matchRole;
  });

  const timelineLimit = tokenMode === 'MAXIMUM SAVINGS' ? 1 : tokenMode === 'BALANCED' ? 2 : 3;
  const prunedTimeline = (relevantTimelineEntries.length > 0 ? relevantTimelineEntries : masterMemory.careerHistory.slice(0, 2)).slice(0, timelineLimit);

  // 4. Construct compact, highly dense context payload
  const lines: string[] = [];
  lines.push(`TARGET CANDIDATE: ${masterMemory.identity.fullName} (${masterMemory.targetProfile.targetRole})`);
  lines.push(`YEARS EXPERIENCE: ${masterMemory.targetProfile.experienceLevel} years | ROLE LEVEL: ${masterMemory.targetProfile.roleLevel}`);
  lines.push(`COMPENSATION TARGET: ${masterMemory.targetProfile.targetCompensation.target}`);

  if (prunedTimeline.length > 0) {
    lines.push('\n[RELEVANT CAREER HISTORY CHUNKS]');
    prunedTimeline.forEach(t => {
      lines.push(`• ${t.jobTitle} @ ${t.company} (${t.startDate} - ${t.endDate})`);
      lines.push(`  Impact: ${t.businessImpact}`);
      if (tokenMode !== 'MAXIMUM SAVINGS') {
        t.achievements.slice(0, 2).forEach(a => lines.push(`  - ${a}`));
      }
    });
  }

  if (prunedStories.length > 0) {
    lines.push('\n[AUTHENTIC CAR EVIDENCE CHUNKS]');
    prunedStories.forEach(s => {
      lines.push(`• ${s.title} [Tags: ${s.tags.slice(0, 3).join(', ')}]`);
      lines.push(`  Challenge: ${s.challenge}`);
      lines.push(`  Action: ${s.action}`);
      lines.push(`  Result: ${s.result}`);
    });
  }

  if (fallbackSkills.length > 0) {
    lines.push(`\nRELEVANT SKILLS: ${fallbackSkills.map(s => s.name).join(', ')}`);
  }

  const serializedPromptContext = lines.join('\n');
  const contextTokensEstimated = Math.ceil(serializedPromptContext.length / 4);

  return {
    contextSummary: `Retrieved ${prunedStories.length} CAR Stories, ${prunedTimeline.length} Roles, ${fallbackSkills.length} Skills`,
    contextTokensEstimated,
    extractedKeywords: keywords,
    relevantSkills: fallbackSkills,
    relevantCARStories: prunedStories,
    relevantTimelineEntries: prunedTimeline,
    targetRoleContext: masterMemory.targetProfile.targetRole,
    serializedPromptContext
  };
}

export async function checkAICache(
  agentType: AgentType,
  prompt: string,
  contextString: string
): Promise<AICacheEntry | null> {
  try {
    const promptHash = simpleHash(prompt.trim().toLowerCase());
    const contextHash = simpleHash(contextString.trim());

    const match = await db.aiCache
      .where('promptHash')
      .equals(promptHash)
      .and(item => item.contextHash === contextHash && item.agentType === agentType)
      .first();

    return match || null;
  } catch (e) {
    console.error('Cache lookup error:', e);
    return null;
  }
}

export async function recordAICacheEntry(
  agentType: AgentType,
  prompt: string,
  contextString: string,
  response: string,
  model: string = 'ALIGNEX-Expert-Career-Engine',
  tokensSaved: number = 650
): Promise<void> {
  try {
    const promptHash = simpleHash(prompt.trim().toLowerCase());
    const contextHash = simpleHash(contextString.trim());

    await db.aiCache.add({
      promptHash,
      contextHash,
      agentType,
      prompt,
      response,
      createdAt: new Date().toISOString(),
      model,
      version: '1.0',
      tokensSavedEstimate: tokensSaved
    });

    // Update global token stats
    const existingStats = (await db.tokenStats.toArray())[0];
    if (existingStats) {
      await db.tokenStats.update(existingStats.lastUpdated, {
        requestsThisMonth: existingStats.requestsThisMonth + 1,
        totalTokensConsumed: existingStats.totalTokensConsumed + Math.ceil(response.length / 4),
        lastUpdated: new Date().toISOString()
      });
    } else {
      await db.tokenStats.add({
        requestsThisMonth: 1,
        cachedResponsesCount: 0,
        estimatedTokensSaved: tokensSaved,
        totalTokensConsumed: Math.ceil(response.length / 4),
        lastUpdated: new Date().toISOString()
      });
    }
  } catch (e) {
    console.error('Error writing to AI Cache:', e);
  }
}

export async function incrementCacheHitStats(tokensSaved: number): Promise<void> {
  try {
    const existingStats = (await db.tokenStats.toArray())[0];
    if (existingStats) {
      await db.tokenStats.update(existingStats.lastUpdated, {
        cachedResponsesCount: existingStats.cachedResponsesCount + 1,
        estimatedTokensSaved: existingStats.estimatedTokensSaved + tokensSaved,
        lastUpdated: new Date().toISOString()
      });
    }
  } catch (e) {
    console.error('Error updating cache stats:', e);
  }
}
