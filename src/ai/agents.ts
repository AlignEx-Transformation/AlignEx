import { AgentDefinition, AgentType } from '../types/ai';

export const AGENT_DEFINITIONS: Record<AgentType, AgentDefinition> = {
  NOVA: {
    type: 'NOVA',
    name: 'NOVA',
    tagline: 'Your AI Career Command Center',
    description: 'Central career intelligence agent grounded in your live Master Career Memory, CRM pipeline, and strategic positioning.',
    iconName: 'Sparkles',
    color: '#14B8A6', // Teal
    badge: 'Central Intelligence',
    capabilities: [
      'Pipeline health synthesis',
      'Context-retrieved strategic advice',
      'Master Career Memory gap discovery',
      'Weekly high-ROI career actions'
    ],
    suggestedPrompts: [
      'Which leads should I follow up with this week?',
      'Which target companies should I prioritize?',
      'Draft a follow-up message for my oldest opportunity.',
      'Summarise my pipeline health in five bullets.',
      'Which recruiters should I contact first?',
      'What should I do this week to increase interview opportunities?',
      'Which parts of my career profile are strongest?',
      'What evidence is missing from my Master Resume?'
    ]
  },
  HUNTER: {
    type: 'HUNTER',
    name: 'HUNTER',
    tagline: 'Opportunity & Hidden Market Scout',
    description: 'Bypasses crowded job boards by generating targeted Boolean queries, tracking ATS portals, and identifying expansion signals.',
    iconName: 'Crosshair',
    color: '#0EA5E9', // Sky
    badge: 'Job Discovery',
    capabilities: [
      'Boolean search string synthesis for Workday / Greenhouse',
      'Hidden job market signal detection (Series C+, GCC expansions)',
      'Job title alias expansion'
    ],
    suggestedPrompts: [
      'Generate a Boolean search string for Director of Engineering in Hyderabad.',
      'What are the best job title aliases for my target profile?',
      'How do I uncover hidden VP-level roles in expanding GCCs?',
      'Generate direct search queries for Workday ATS pages.'
    ]
  },
  NAVIGATOR: {
    type: 'NAVIGATOR',
    name: 'NAVIGATOR',
    tagline: 'Market Demand & Career Positioning',
    description: 'Aligns your core functional strengths against upper-quartile market demand and ₹1Cr+ compensation trajectories.',
    iconName: 'Compass',
    color: '#8B5CF6', // Purple
    badge: 'Positioning',
    capabilities: [
      'Functional value vs misleading job title mapping',
      'Career situation diagnosis (Underleveraged / Underpaid)',
      '₹1Cr Career Math trajectory roadmap'
    ],
    suggestedPrompts: [
      'Diagnose my career positioning gap based on my 16 years of experience.',
      'How do I pivot from an execution manager to an enterprise transformational leader?',
      'What skills should I highlight to justify a ₹95L+ CTC?',
      'Analyze the 7 Mindset Shifts for my current career stage.'
    ]
  },
  NETWORKER: {
    type: 'NETWORKER',
    name: 'NETWORKER',
    tagline: 'Executive Outreach & Relationship Architecture',
    description: 'Creates highly personalized, non-spam connection requests, opening statements, and follow-up cadences for decision makers.',
    iconName: 'Users',
    color: '#10B981', // Emerald
    badge: 'Networking',
    capabilities: [
      'Personalized 3-point outreach: Why This Person, Why Now, What Is Relevant',
      '<300 char LinkedIn connection notes',
      'Follow-up cadence planning (Days 3, 7, 14)'
    ],
    suggestedPrompts: [
      'Draft a high-impact LinkedIn connection request for Vikramaditya Sengupta (MD at Goldman Sachs).',
      'Create an executive opening statement for a coffee chat with a VP of Engineering.',
      'Generate a polite 7-day follow-up message for an executive recruiter.',
      'How should I reach out to alumni working in my target companies?'
    ]
  },
  TAILOR: {
    type: 'TAILOR',
    name: 'TAILOR',
    tagline: 'JD Match & Zero-Hallucination Resume Engine',
    description: 'Reverse-engineers your authentic Master Career Memory against target JDs, identifying keyword gaps and ATS friction.',
    iconName: 'FileCheck',
    color: '#F59E0B', // Amber
    badge: 'ATS Reverse-Engineering',
    capabilities: [
      'Deep JD keyword & leadership requirement extraction',
      'ATS score calculation & risk flagging',
      'Authentic resume bullet tailoring without fabricating facts'
    ],
    suggestedPrompts: [
      'Analyze this JD against my Master Career Memory and identify keyword gaps.',
      'Tailor my summary for an Enterprise Cloud Platform Director role.',
      'How can I rewrite my Hudson’s Bay bullet points for this specific JD?',
      'What ATS red flags exist in my current resume version?'
    ]
  },
  INFLUENCER: {
    type: 'INFLUENCER',
    name: 'INFLUENCER',
    tagline: 'Executive Authority & LinkedIn Thought Leadership',
    description: 'Transforms your daily engineering and leadership wins into authoritative thought leadership content that attracts inbound headhunters.',
    iconName: 'TrendingUp',
    color: '#EC4899', // Pink
    badge: 'Authority Building',
    capabilities: [
      'High-engagement LinkedIn post generation',
      'Case study & architecture breakdown scripts',
      'Contrarian industry take ideation'
    ],
    suggestedPrompts: [
      'Turn my 35% MTTR reduction CAR story into an authoritative LinkedIn breakdown.',
      'Write a contrarian LinkedIn post on why FinOps is an engineering discipline, not an accounting one.',
      'Generate 5 thought leadership post hooks for Director of Engineering positioning.',
      'Draft an executive post about zero-downtime banking migrations.'
    ]
  },
  PITCHER: {
    type: 'PITCHER',
    name: 'PITCHER',
    tagline: 'WIN Presentation & Problem-Solver Studio',
    description: 'Structures proactive Work Impact & Navigation (WIN) decks that diagnose target company friction and propose solutions before they ask.',
    iconName: 'Presentation',
    color: '#6366F1', // Indigo
    badge: 'WIN Studio',
    capabilities: [
      '5-slide WIN presentation generation',
      'Company friction & root-cause mapping',
      'Projected ROI & cost-savings framing'
    ],
    suggestedPrompts: [
      'Build a WIN presentation deck for Goldman Sachs GCC Platform Modernization.',
      'How do I present a proactive solution to a CTO during an exploratory interview?',
      'Calculate the financial friction of checkout latency for a retail enterprise.',
      'Create a 30-60-90 day framework for my top target company.'
    ]
  },
  INTERVIEWER: {
    type: 'INTERVIEWER',
    name: 'INTERVIEWER',
    tagline: 'Realistic Interview Simulator & Bar Raiser Coach',
    description: 'Simulates high-stakes behavioral, architectural, and executive case rounds with instant evaluation across 7 core dimensions.',
    iconName: 'Mic',
    color: '#EF4444', // Red
    badge: 'Interview Simulator',
    capabilities: [
      'Behavioral, Leadership, System Design & Case simulations',
      'Live scoring across 7 dimensions (Communication, Leadership, Conciseness, etc.)',
      'Weak answer identification & refined script suggestions'
    ],
    suggestedPrompts: [
      'Run a Bar Raiser behavioral interview for a Director role at a Tier-1 tech company.',
      'Ask me a tough question about handling engineering conflict and evaluate my CAR answer.',
      'Simulate a System Design executive round question on high-throughput trade telemetry.',
      'Give me feedback on how to make my leadership answers more concise.'
    ]
  },
  NEGOTIATOR: {
    type: 'NEGOTIATOR',
    name: 'NEGOTIATOR',
    tagline: 'Strategic Compensation & ₹1Cr Closer',
    description: 'Equips you with market data, CTC anchor defenses, counter-offer phrasing, and walk-away scripts to maximize total comp.',
    iconName: 'DollarSign',
    color: '#10B981', // Emerald
    badge: 'Compensation Strategy',
    capabilities: [
      'Non-disclosure scripts for past CTC',
      'Counter-offer formulation balancing fixed, variable, and equity',
      'Multi-offer leverage and walk-away negotiation playbooks'
    ],
    suggestedPrompts: [
      'How do I deflect a recruiter insisting on my last 3 months payslips?',
      'Draft a counter-offer email requesting ₹95L total CTC instead of ₹82L.',
      'What is my negotiation leverage against Goldman Sachs vs Uber?',
      'How do I negotiate a ₹5L joining bonus without sounding greedy?'
    ]
  }
};
