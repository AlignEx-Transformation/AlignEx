import { MasterCareerMemory, CareerTimelineEntry, CARStory, SkillItem } from '../types/career';
import { Contact, Lead, CompanyIntelligence, Application, MeetingItem, QuotationEngagement } from '../types/crm';
import { BooleanSearchQuery, LearningSection, WinProject, NegotiationModel } from '../types/jobsearch';
import { MasterResumeDocument } from '../types/resume';

export const INITIAL_MASTER_MEMORY: MasterCareerMemory = {
  id: 'master-career-memory-01',
  lastUpdated: new Date().toISOString(),
  version: 1,
  identity: {
    fullName: 'Poornima Harikumar',
    email: 'Poornima.Harikumar@gmail.com',
    phone: '+91 98400 12345',
    location: 'Hyderabad / Bengaluru, India (Open to Hybrid/Remote)',
    linkedinUrl: 'https://linkedin.com/in/poornima-harikumar',
    githubUrl: 'https://github.com/poornima-harikumar',
    portfolioUrl: '',
    tagline: 'Senior Director of Engineering & AI Enablement | Enterprise Program Management | Distributed Cloud & AI Systems'
  },
  careerSummary: 'Accomplished Enterprise Technology & Program Leader with 16+ years of expertise steering high-impact cloud migrations, distributed architectures, AI enablement initiatives, and large-scale digital transformations. Proven record of managing multi-million-dollar tech programs, scaling cross-functional engineering organizations from 10 to 65+ engineers, and delivering ₹40Cr+ in business value across global enterprises.',
  careerObjective: 'Targeting Director of Engineering / Senior Director of Technical Program Management / Head of AI Enablement roles in Tier-1 Tech, Enterprise SaaS, and Global Capability Centers (GCCs) to scale mission-critical platform architectures, drive enterprise AI adoption, and deliver strategic business outcomes.',
  careerSituation: ['Underleveraged', 'Undervalued'],
  targetProfile: {
    targetFunction: 'Technology',
    targetRole: 'Director of Engineering / Senior Director of Program Management & AI Enablement',
    experienceLevel: '12–17',
    roleLevel: 'Functional Leader',
    targetIndustries: ['Technology', 'FinTech', 'SaaS', 'IT Services', 'E-commerce', 'AI/Cloud'],
    targetCompanyTypes: ['Product', 'MNC', 'Enterprise', 'Scale-up'],
    targetCompanySizes: ['1,001–5,000', '5,001–10,000', '10,000+'],
    targetGeography: ['Hyderabad', 'Bengaluru', 'Chennai', 'Remote (India / Global)'],
    targetCompensation: {
      current: '₹48,00,000',
      target: '₹85,00,000 – ₹1,10,00,000',
      minimumAcceptable: '₹75,00,000',
      idealOffer: '₹1,05,00,000 + ESOPs',
      currency: 'INR'
    },
    remotePreference: 'Flexible'
  },
  careerHistory: [
    {
      id: 'hbc-01',
      company: 'Hudsons Bay Company',
      jobTitle: 'Senior Manager — Enterprise Platform Engineering',
      startDate: '2022-03',
      endDate: 'Present',
      isCurrent: true,
      function: 'Technology',
      industry: 'Retail',
      achievements: [
        'Architected and executed omni-channel platform modernisation, reducing checkout latency by 42% and generating ₹18Cr annual revenue uplift.',
        'Led a 38-engineer multi-squad organization across Cloud Infrastructure, Data Engineering, and Microservices.',
        'Implemented FinOps framework across AWS & GCP footprint, driving 28% infrastructure cost reduction ($450K saved annually).'
      ],
      responsibilities: [
        'P&L accountability for enterprise cloud platform budgets ($3.2M annual run rate).',
        'Directly mentored 4 Engineering Managers, 8 Tech Leads, and instituted technical bar raiser programs.',
        'Partnered with executive leadership (CTO, VP Supply Chain) on strategic roadmap prioritization.'
      ],
      teamSize: 38,
      technology: ['AWS', 'Kubernetes', 'Kafka', 'Golang', 'Node.js', 'PostgreSQL', 'Snowflake', 'Terraform'],
      businessImpact: '₹18Cr Revenue Uplift | 42% Latency Drop | $450K Cloud Savings',
      rating: 5,
      location: 'Bengaluru / Hyderabad'
    },
    {
      id: 'tcs-02',
      company: 'Tata Consultancy Services',
      jobTitle: 'Technical Program Architect',
      startDate: '2018-06',
      endDate: '2022-02',
      isCurrent: false,
      function: 'Technology',
      industry: 'IT Services',
      achievements: [
        'Spearheaded core banking modernization for Tier-1 US Financial client with 4.5M active accounts and zero downtime migration.',
        'Instituted automated CI/CD and automated regression frameworks, shortening release cycles from 3 weeks to daily on-demand deployments.'
      ],
      responsibilities: [
        'Led technical architecture and engineering governance across 6 distributed agile teams.',
        'Managed senior client stakeholder relationships and C-suite technical steerco reviews.'
      ],
      teamSize: 45,
      technology: ['Java Spring Boot', 'Microservices', 'Oracle DB', 'GCP', 'Docker', 'Jenkins'],
      businessImpact: 'Zero-Downtime Core Banking Migration for 4.5M Users',
      rating: 5,
      location: 'Hyderabad'
    },
    {
      id: 'abacus-03',
      company: 'Abacus Staffing & Services',
      jobTitle: 'Lead Technology Consultant',
      startDate: '2016-01',
      endDate: '2018-05',
      isCurrent: false,
      function: 'Consulting',
      industry: 'IT Services',
      achievements: [
        'Delivered 9 enterprise consulting engagements spanning digital workforce platforms and analytics dashboards.',
        'Increased client billable retention rate to 94% through transparent roadmap execution.'
      ],
      responsibilities: ['Technical discovery, solution blueprinting, and client engineering enablement.'],
      teamSize: 18,
      technology: ['React', 'Node.js', 'MongoDB', 'AWS', 'Python'],
      businessImpact: '94% Client Retention | ₹6Cr Program Delivery',
      rating: 4
    },
    {
      id: 'krd-04',
      company: 'KRD Exports Pvt Ltd',
      jobTitle: 'Head of Systems & IT Infrastructure',
      startDate: '2014-02',
      endDate: '2015-12',
      isCurrent: false,
      function: 'Backend Operations',
      industry: 'Manufacturing',
      achievements: [
        'Automated multi-warehouse ERP integration, cutting shipment dispatch delays by 55%.',
        'Implemented cloud-backed disaster recovery and ISO 27001 compliant security controls.'
      ],
      responsibilities: ['End-to-end IT roadmap, vendor management, and internal software development.'],
      teamSize: 12,
      technology: ['ERP Systems', 'SQL Server', 'Linux', 'Network Infrastructure'],
      businessImpact: '55% Faster Logistics Dispatch | ₹1.8Cr Annual Process Savings',
      rating: 4
    },
    {
      id: 'gofrugal-05',
      company: 'GoFrugal Technologies',
      jobTitle: 'Senior Product Engineer & Module Lead',
      startDate: '2012-04',
      endDate: '2014-01',
      isCurrent: false,
      function: 'Product',
      industry: 'SaaS',
      achievements: [
        'Engineered point-of-sale sync engine handling 120,000 daily offline transactions with resilient conflict resolution.'
      ],
      responsibilities: ['Core POS product development and database performance optimization.'],
      teamSize: 8,
      technology: ['C#', '.NET', 'MySQL', 'WPF', 'Sync Framework'],
      businessImpact: '120k Daily POS Transactions Supported',
      rating: 4
    },
    {
      id: 'indiamart-06',
      company: 'IndiaMART InterMESH Ltd',
      jobTitle: 'Software Engineer — Search & Buyer Platforms',
      startDate: '2010-08',
      endDate: '2012-03',
      isCurrent: false,
      function: 'Technology',
      industry: 'E-commerce',
      achievements: [
        'Optimized category search indexing algorithms, reducing query response times by 38% under high concurrency.'
      ],
      responsibilities: ['Buyer discovery funnel enhancements and Lucene search engine tuning.'],
      teamSize: 6,
      technology: ['PHP', 'Apache Solr', 'MySQL', 'Memcached'],
      businessImpact: '38% Faster Search Indexing for 2M Catalog Items',
      rating: 4
    },
    {
      id: 'genius-07',
      company: 'Genius Consultants Limited',
      jobTitle: 'Systems Analyst',
      startDate: '2009-06',
      endDate: '2010-07',
      isCurrent: false,
      function: 'Technology',
      industry: 'IT Services',
      achievements: ['Developed automated payroll processing module cutting computation time from 3 days to 4 hours.'],
      responsibilities: ['Enterprise HRMS portal development.'],
      teamSize: 4,
      technology: ['ASP.NET', 'SQL Server', 'JavaScript'],
      businessImpact: '85% Reduction in Payroll Processing Cycles',
      rating: 3
    },
    {
      id: 'ivy-08',
      company: 'IVY Infotech',
      jobTitle: 'Junior Software Engineer',
      startDate: '2008-05',
      endDate: '2009-05',
      isCurrent: false,
      function: 'Technology',
      industry: 'IT Services',
      achievements: ['Built client-facing web portals and responsive database reports with 100% on-time milestone delivery.'],
      responsibilities: ['Full stack coding, unit testing, and technical documentation.'],
      teamSize: 3,
      technology: ['Java', 'J2EE', 'Oracle', 'HTML/CSS'],
      businessImpact: 'Foundation Engineering Mastery',
      rating: 3
    }
  ],
  achievements: [
    {
      id: 'ach-01',
      text: 'Reduced incident resolution time by 35% through structured ITIL-based automated telemetry and root-cause runbooks.',
      tags: ['ITIL', 'Incident Management', 'Process Improvement', 'Leadership', '35%', 'Productivity', 'Operations'],
      roleId: 'hbc-01',
      metric: '35% Faster MTTR'
    },
    {
      id: 'ach-02',
      text: 'Led migration of enterprise data platform to Snowflake on AWS, enabling real-time analytics for 12 business units.',
      tags: ['Data', 'Cloud', 'Migration', 'Architecture', 'Leadership', 'Transformation', 'Snowflake', 'AWS'],
      roleId: 'hbc-01',
      metric: '₹12Cr Analytics Value'
    },
    {
      id: 'ach-03',
      text: 'Engineered zero-downtime core banking transition for 4.5M active accounts across 1,200 branches.',
      tags: ['Banking', 'FinTech', 'High Availability', 'Architecture', 'Governance', 'Scale'],
      roleId: 'tcs-02',
      metric: '4.5M Users / Zero Downtime'
    },
    {
      id: 'ach-04',
      text: 'Institutionalized FinOps governance cutting cloud spend by 28% ($450K annually) across AWS and GCP.',
      tags: ['FinOps', 'Cloud', 'Cost Savings', 'Governance', 'AWS', 'GCP'],
      roleId: 'hbc-01',
      metric: '$450K Annual Cost Savings'
    },
    {
      id: 'ach-05',
      text: 'Scaled engineering organization from 12 to 38 engineers across 3 locations while maintaining 92% retention rate.',
      tags: ['Leadership', 'Talent Acquisition', 'Culture', 'People Management', 'Scaling'],
      roleId: 'hbc-01',
      metric: '92% Retention | 38 Headcount'
    }
  ],
  carStories: [
    {
      id: 'car-01',
      title: 'Incident MTTR SLA Reduction & Reliability Overhaul',
      roleId: 'hbc-01',
      challenge: 'Our incident resolution times were consistently exceeding SLA targets (averaging 4.2 hours per Sev-2 incident), leading to recurring retail checkout friction, user dissatisfaction, and engineering burn-out.',
      action: 'I implemented a structured ITIL-based incident management protocol, established automated error budgeting via Datadog, instituted blameless post-mortems, and created an AI-assisted telemetry triage pipeline.',
      result: 'Slashed mean-time-to-resolution (MTTR) by 35% within 90 days. Reduced Sev-1/Sev-2 monthly recurrence by 58%, recovering an estimated $620K in checkout cart abandonment.',
      isResultCaptured: true,
      tags: ['ITIL', 'Incident Management', 'Process Improvement', 'Leadership', '35%', 'Productivity', 'Operations', 'Reliability'],
      metrics: {
        productivityImprovement: '35% MTTR reduction',
        costSavings: '$620K Cart Recovery',
        processImprovement: '58% fewer Sev-1 recurrences'
      },
      stakeholders: 'VP Engineering, Principal Architects, 24/7 Operations Team',
      tools: ['Datadog', 'PagerDuty', 'Jira Service Management', 'AWS CloudWatch'],
      dateCreated: new Date().toISOString()
    },
    {
      id: 'car-02',
      title: 'Omni-Channel Cloud Platform Modernization & FinOps',
      roleId: 'hbc-01',
      challenge: 'Monolithic legacy services were hitting throughput ceilings during Black Friday surge traffic, while unoptimized EC2/RDS provisioning caused ballooning cloud bills.',
      action: 'Decomposed 4 mission-critical monolithic modules into event-driven Go/Kafka microservices on EKS, introduced spot instance policies, and established FinOps cost-attribution tagging across squads.',
      result: 'Handled 3.4x peak traffic with zero outages while reducing total infrastructure expenditure by 28% ($450,000/year). Checkout page latency dropped from 1.8s to 650ms.',
      isResultCaptured: true,
      tags: ['Cloud', 'Architecture', 'FinOps', 'Cost Savings', 'Transformation', 'AWS', 'Kubernetes'],
      metrics: {
        costSavings: '$450K/year',
        productivityImprovement: '64% Latency Reduction',
        revenueImpact: '₹18Cr Revenue Uplift'
      },
      stakeholders: 'Chief Technology Officer, Finance Controllers, Product VP',
      tools: ['AWS EKS', 'Apache Kafka', 'Golang', 'Terraform', 'Datadog'],
      dateCreated: new Date().toISOString()
    },
    {
      id: 'car-03',
      title: 'Zero-Downtime Core Banking Migration',
      roleId: 'tcs-02',
      challenge: 'A Tier-1 financial institution required migration of 4.5 million account ledgers to a modern cloud-native core without taking transactional systems offline during business windows.',
      action: 'Architected a dual-write CDC (Change Data Capture) replication bridge with automated reconciliation assertions, failback safety triggers, and canary routing algorithms.',
      result: 'Completed 100% ledger migration over a 14-month schedule with zero unscheduled downtime, zero data discrepancy across 4.5M accounts, and received client Global Excellence Award.',
      isResultCaptured: true,
      tags: ['Banking', 'FinTech', 'High Availability', 'Architecture', 'Governance', 'Migration'],
      metrics: {
        riskReduction: '100% Data Integrity / Zero Discrepancy',
        productivityImprovement: 'Zero Customer Disruption'
      },
      stakeholders: 'Bank CIO, Chief Risk Officer, External Regulators',
      tools: ['Debezium', 'Kafka', 'Spring Boot', 'Oracle GoldenGate', 'GCP'],
      dateCreated: new Date().toISOString()
    }
  ],
  leadershipExamples: [
    'Transformed 4 low-performing distributed engineering squads into top-quartile delivery units using DORA metrics and engineering OKRs.',
    'Chaired Architecture Review Board governing 40+ system designs across security, scalability, and cloud cost efficiency.',
    'Pioneered inclusive talent development resulting in 6 internal promotions to Tech Lead and Manager roles within 24 months.'
  ],
  skills: [
    { id: 'sk-01', name: 'Cloud Architecture (AWS & GCP)', category: 'Technical', level: 'Expert', tags: ['Cloud', 'AWS', 'GCP', 'Architecture'] },
    { id: 'sk-02', name: 'Distributed Microservices & Event-Driven Systems', category: 'Technical', level: 'Expert', tags: ['Architecture', 'Microservices', 'Kafka'] },
    { id: 'sk-03', name: 'FinOps & Cloud Cost Optimization', category: 'Business', level: 'Expert', tags: ['FinOps', 'Cost Savings', 'Governance'] },
    { id: 'sk-04', name: 'Engineering Leadership & Org Scaling', category: 'Leadership', level: 'Expert', tags: ['Leadership', 'Scaling', 'Management'] },
    { id: 'sk-05', name: 'Data Engineering & Analytics (Snowflake/Kafka)', category: 'Technical', level: 'Advanced', tags: ['Data', 'Snowflake', 'Analytics'] },
    { id: 'sk-06', name: 'Technical Program Management & P&L Governance', category: 'Business', level: 'Expert', tags: ['Program Management', 'Governance', 'P&L'] },
    { id: 'sk-07', name: 'Executive Stakeholder Management & Strategy', category: 'Soft', level: 'Expert', tags: ['Stakeholders', 'Strategy', 'Communication'] },
    { id: 'sk-08', name: 'Incident Management & Site Reliability (ITIL/SRE)', category: 'Domain', level: 'Expert', tags: ['ITIL', 'SRE', 'Incident Management'] },
    { id: 'sk-09', name: 'AI/ML Platform Integration & GenAI Architecture', category: 'Technical', level: 'Advanced', tags: ['AI', 'GenAI', 'LLMs', 'MLOps'] }
  ],
  certifications: [
    { id: 'cert-01', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', year: '2023' },
    { id: 'cert-02', name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', year: '2022' },
    { id: 'cert-03', name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', year: '2019' },
    { id: 'cert-04', name: 'ITIL v4 Strategic Leader', issuer: 'AXELOS', year: '2021' }
  ],
  education: [
    { id: 'edu-01', degree: 'Bachelor of Engineering in Computer Science & Engineering', institution: 'Anna University', year: '2008', field: 'Computer Science' }
  ],
  keyTransformations: [
    'Legacy Monolith to Event-Driven Cloud Microservices (3.4x peak throughput)',
    'On-Premise Core Banking Migration to Cloud Native (4.5M accounts, zero downtime)',
    'Global FinOps implementation ($450K annual recurring cloud savings)',
    'Engineering Team expansion from 12 to 38 engineers across 3 time zones'
  ],
  metricsSummary: {
    revenueImpact: '₹40Cr+ Total Business Value Generated',
    costSavings: '$1.07M+ Cumulative Cloud & Process Savings',
    productivityImprovements: '35% MTTR Drop | 64% Latency Reduction',
    riskReduction: 'Zero-Downtime Migration Record (4.5M Accounts)',
    processImprovements: 'Daily Continuous Deployment on Demand',
    maxTeamSize: 65,
    maxBudgetManaged: '$3.5M USD'
  },
  interviewStories: [
    { question: 'Tell me about a time you led a high-stakes technical turnaround.', storyId: 'car-01', notes: 'Focus on blameless culture and telemetry automation.' },
    { question: 'How do you handle engineering cost vs. scalability trade-offs?', storyId: 'car-02', notes: 'Highlight FinOps metrics, spot instances, and event-driven architecture.' }
  ],
  linkedinPositioning: {
    headline: 'Senior Director of Engineering | Enterprise Cloud & Platform Modernization | Scaling 50+ Eng Orgs | ₹40Cr+ Business Impact',
    aboutSection: 'I partner with C-level executives to turn complex technology bottlenecks into high-velocity business growth engines. Over the last 16+ years, I have architected cloud platforms handling millions of transactions, built resilient engineering organizations from 10 to 65+ engineers, and governed multi-million dollar tech portfolios with strict FinOps discipline.',
    featuredArticles: ['The Modern FinOps Playbook: Cutting 30% Cloud Waste Without Breaking Velocity', 'Zero-Downtime Architecture: Migrating 4.5M Banking Accounts Under Fire'],
    targetKeywords: ['Director of Engineering', 'VP Technology', 'Head of Platform', 'FinOps', 'AWS', 'Distributed Systems', 'Enterprise Architecture']
  },
  networkingPreferences: {
    targetTitles: ['Chief Technology Officer', 'VP of Engineering', 'Head of Talent Acquisition', 'Managing Director GCC', 'Partner / Venture Capital'],
    priorityLocations: ['Hyderabad', 'Bengaluru', 'Chennai', 'Singapore / Global Remote'],
    valueProposition: 'Senior Engineering Leader with dual-competency in deep cloud architecture and P&L business impact, proven in turning around platform velocity and scaling teams.'
  },
  careerGoals: {
    oneYear: 'Transition into a Director of Engineering or Head of Platform role at a Tier-1 GCC / Tech Product company with ₹85L+ CTC.',
    threeYear: 'Ascend to VP of Technology or CTO overseeing 100+ engineer multi-product portfolio with ₹1.2Cr+ compensation.',
    fiveYear: 'Serve as Global CTO or Managing Director of Technology leading enterprise digital strategy.',
    dreamCompany: 'Google / Microsoft / Uber / Goldman Sachs GCC / Atlassian / Stripe',
    compensationTarget1CrProgress: 75
  }
};

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt-01',
    name: 'Vikramaditya Sengupta',
    role: 'Managing Director & Head of GCC Engineering',
    company: 'Goldman Sachs',
    email: 'v.sengupta@gs.com',
    phone: '+91 98801 99201',
    relationship: 'Executive Decision Maker',
    linkedin: 'https://linkedin.com/in/vikram-sengupta-tech',
    source: 'Alumni Network',
    lastContacted: '2026-08-10',
    nextFollowUp: '2026-08-26',
    notes: 'Discussed GCC expansion plans in Hyderabad. Very interested in FinOps and event-driven cloud architecture experience.',
    tags: ['GCC', 'Tier 1', 'Leadership', 'Hyderabad'],
    status: 'Warm',
    avatarColor: '#0D9488'
  },
  {
    id: 'cnt-02',
    name: 'Priyanka Nambiar',
    role: 'Lead Executive Recruiter (Tech & Leadership)',
    company: 'Korn Ferry / Uber Search Partner',
    email: 'priyanka.n@recruitment-partner.com',
    phone: '+91 98200 44312',
    relationship: 'Recruiter',
    linkedin: 'https://linkedin.com/in/priyanka-nambiar-ta',
    source: 'LinkedIn Inbound',
    lastContacted: '2026-08-18',
    nextFollowUp: '2026-08-25',
    notes: 'Shortlisting candidates for Director of Infrastructure & Cloud Engineering (Bengaluru). Shared Master Resume highlights.',
    tags: ['Recruiter', 'Executive Search', 'Director Role'],
    status: 'Active',
    avatarColor: '#10B981'
  },
  {
    id: 'cnt-03',
    name: 'Siddharth Varma',
    role: 'VP of Engineering',
    company: 'Swiggy',
    email: 'siddharth.v@swiggy.in',
    phone: '+91 99401 55678',
    relationship: 'Hiring Manager',
    linkedin: 'https://linkedin.com/in/siddharth-varma-eng',
    source: 'Referral by ex-TCS Colleague',
    lastContacted: '2026-08-14',
    nextFollowUp: '2026-08-28',
    notes: 'Exploring platform scalability leadership role. Scheduled Coffee Chat to share WIN breakdown on checkout throughput.',
    tags: ['Hiring Manager', 'High Scale', 'Platform'],
    status: 'Warm',
    avatarColor: '#6366F1'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    title: 'Director of Engineering — Enterprise Core Platforms',
    company: 'Goldman Sachs GCC',
    contactName: 'Vikramaditya Sengupta',
    contactEmail: 'v.sengupta@gs.com',
    stage: 'Warm Conversation',
    estimatedValue: '₹95,00,000 CTC',
    source: 'Executive Referral',
    probability: 70,
    lastActivity: '2026-08-20',
    nextAction: 'Deliver tailored WIN Deck on Cloud Reliability & FinOps Governance',
    notes: 'Budget approved for Q3 hire. Target compensation aligns with ₹90L+ expectation.',
    tags: ['GCC', 'FinTech', 'High Value'],
    createdAt: '2026-08-01'
  },
  {
    id: 'lead-02',
    title: 'Head of Infrastructure & Cloud Platform',
    company: 'Uber India Tech Center',
    contactName: 'Priyanka Nambiar',
    contactEmail: 'priyanka.n@recruitment-partner.com',
    stage: 'Engaged',
    estimatedValue: '₹1,05,00,000 CTC + RSUs',
    source: 'Korn Ferry Executive Search',
    probability: 60,
    lastActivity: '2026-08-18',
    nextAction: 'Submit ATS Tailored Master Resume highlighting 4.5M zero-downtime banking migration and EKS scale',
    notes: 'JD received and analyzed. Match score 92%.',
    tags: ['Tier 1 Product', '₹1Cr Club', 'EKS'],
    createdAt: '2026-08-05'
  }
];

export const INITIAL_COMPANIES: CompanyIntelligence[] = [
  {
    id: 'comp-01',
    name: 'Goldman Sachs',
    industry: 'Banking / FinTech',
    size: '10,000+',
    headquarters: 'Bengaluru / Hyderabad (India GCC)',
    website: 'https://goldmansachs.com',
    hiringSignals: ['Aggressive GCC expansion in Hyderabad', 'Adding 800+ tech leaders and cloud architects', 'Large investment in real-time trade telemetry'],
    decisionMakers: ['Vikramaditya Sengupta (MD Engineering)', 'Ananya Rao (Head of Talent Acquisition India)'],
    techStack: ['AWS', 'Java', 'Kafka', 'Kubernetes', 'Snowflake', 'Python'],
    tier: 'Tier 1 (Dream)',
    openRolesCount: 14,
    notes: 'Primary target for ₹95L+ leadership package. Culture values structured systems thinking and verifiable metrics.',
    careersUrl: 'https://www.goldmansachs.com/careers',
    tags: ['Banking', 'GCC', 'Top Pay', 'Hyderabad'],
    updatedAt: '2026-08-22'
  },
  {
    id: 'comp-02',
    name: 'Uber',
    industry: 'Technology / Mobility',
    size: '10,000+',
    headquarters: 'Bengaluru / Hyderabad',
    website: 'https://uber.com',
    hiringSignals: ['Bengaluru center spearheading global mapping & payments infrastructure', 'Recent Series of Staff/Director level openings'],
    decisionMakers: ['Arun Narayanan (Director of Tech)', 'Priyanka Nambiar (Search Partner)'],
    techStack: ['Golang', 'Kubernetes', 'Kafka', 'GCP', 'Distributed Systems'],
    tier: 'Tier 1 (Dream)',
    openRolesCount: 8,
    notes: 'Excellent fit for distributed systems and FinOps cost optimization background.',
    careersUrl: 'https://www.uber.com/careers',
    tags: ['Tier 1', 'Global Scale', '₹1Cr Club'],
    updatedAt: '2026-08-20'
  },
  {
    id: 'comp-03',
    name: 'Atlassian',
    industry: 'SaaS / Enterprise Software',
    size: '5,001–10,000',
    headquarters: 'Bengaluru (Remote-First Team Anywhere)',
    website: 'https://atlassian.com',
    hiringSignals: ['Expanding Cloud Platform Engineering units in India', 'High Glassdoor score (4.6)'],
    decisionMakers: ['Rajesh K (VP Eng)', 'Sonia Mehta (Principal Recruiter)'],
    techStack: ['AWS', 'React', 'Java', 'Microservices', 'GraphQL'],
    tier: 'Tier 1 (Dream)',
    openRolesCount: 11,
    notes: 'Team Anywhere policy offers 100% remote flexibility with tier-1 compensation.',
    careersUrl: 'https://www.atlassian.com/company/careers',
    tags: ['Remote', 'SaaS', 'High Compensation'],
    updatedAt: '2026-08-19'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-01',
    company: 'Goldman Sachs',
    role: 'Director of Engineering — Enterprise Cloud & Platforms',
    location: 'Hyderabad / Bengaluru (Hybrid)',
    jobType: 'Full-time',
    jdText: 'Looking for a seasoned Engineering Leader with 15+ years experience managing large-scale distributed architectures, FinOps cloud optimization, and leading 40+ engineers across global teams...',
    atsScore: 94,
    resumeVersionTitle: 'Goldman_Director_Platform_Tailored_v2',
    contactName: 'Vikramaditya Sengupta',
    stage: 'Interview',
    appliedDate: '2026-08-08',
    lastStageChangeDate: '2026-08-19',
    salaryRange: '₹90,00,000 – ₹1,05,00,000',
    nextAction: 'Bar Raiser / System Design Round with MD',
    nextActionDate: '2026-08-27',
    notes: 'Round 1 (Hiring Manager) completed with exceptional feedback on CAR stories (4.5M bank migration).',
    tags: ['Tier 1', 'Director', 'High Priority']
  },
  {
    id: 'app-02',
    company: 'Uber',
    role: 'Head of Infrastructure & SRE',
    location: 'Bengaluru',
    jobType: 'Full-time',
    jdText: 'Seeking a transformational leader to helm site reliability engineering and cloud platform scalability across APAC infrastructure...',
    atsScore: 91,
    resumeVersionTitle: 'Uber_Head_Infra_v1',
    contactName: 'Priyanka Nambiar',
    stage: 'Screening',
    appliedDate: '2026-08-15',
    lastStageChangeDate: '2026-08-18',
    salaryRange: '₹1,00,00,000 – ₹1,15,00,000 CTC + RSUs',
    nextAction: 'Executive Screening call with Korn Ferry Partner',
    nextActionDate: '2026-08-25',
    notes: 'Tailored resume emphasizing 35% MTTR reduction and $450K FinOps savings submitted.',
    tags: ['₹1Cr Club', 'SRE', 'Tier 1']
  },
  {
    id: 'app-03',
    company: 'Atlassian',
    role: 'Principal Engineering Leader (Cloud Foundations)',
    location: 'Remote (India)',
    jobType: 'Remote',
    jdText: 'Lead our core cloud foundational platforms powering Jira & Confluence scale for 300,000+ enterprise customers...',
    atsScore: 88,
    resumeVersionTitle: 'Atlassian_Principal_Lead_v1',
    stage: 'Applied',
    appliedDate: '2026-08-18',
    lastStageChangeDate: '2026-08-18',
    salaryRange: '₹85,00,000 – ₹98,00,000',
    nextAction: 'Follow up with recruiter Sonia Mehta via LinkedIn',
    nextActionDate: '2026-08-25',
    notes: 'Referral requested through alumni network.',
    tags: ['Remote', 'SaaS']
  },
  {
    id: 'app-04',
    company: 'Microsoft India Development Center',
    role: 'Partner Group Engineering Manager',
    location: 'Hyderabad',
    jobType: 'Full-time',
    jdText: 'Lead Azure cloud distributed telemetry frameworks and partner with global product teams...',
    atsScore: 90,
    resumeVersionTitle: 'Microsoft_PGEM_v1',
    stage: 'Targeted',
    appliedDate: '2026-08-22',
    lastStageChangeDate: '2026-08-22',
    salaryRange: '₹1,10,00,000 – ₹1,35,00,000',
    nextAction: 'Map decision makers and craft executive connection message',
    nextActionDate: '2026-08-26',
    notes: 'Identified 3 alumni in Azure Engineering leadership.',
    tags: ['Targeted', 'Dream Role', '₹1Cr Club']
  }
];

export const INITIAL_BOOLEAN_SEARCHES: BooleanSearchQuery[] = [
  {
    id: 'bool-01',
    title: 'Director of Engineering — Workday / Greenhouse ATS Query',
    roleTarget: 'Director of Engineering OR Head of Technology',
    location: 'Hyderabad OR Bengaluru OR Remote',
    includedTerms: ['"Director of Engineering"', '"Cloud Platform"', '"Distributed Systems"', '"FinOps"'],
    excludedTerms: ['"intern"', '"junior"', '"entry level"'],
    platforms: ['myworkdayjobs.com', 'greenhouse.io', 'icims.com', 'lever.co', 'smartrecruiters.com'],
    generatedQueryString: '(site:myworkdayjobs.com OR site:greenhouse.io OR site:icims.com OR site:lever.co OR site:smartrecruiters.com OR site:jobvite.com) AND ("Director of Engineering" OR "Head of Technology" OR "Senior Engineering Manager") AND ("Hyderabad" OR "Bengaluru" OR "Remote India") -intern -junior',
    googleSearchUrl: 'https://www.google.com/search?q=%28site%3Amyworkdayjobs.com+OR+site%3Agreenhouse.io+OR+site%3Aicims.com+OR+site%3Alever.co%29+AND+%28%22Director+of+Engineering%22+OR+%22Head+of+Technology%22%29+AND+%28%22Hyderabad%22+OR+%22Bengaluru%22%29+-intern',
    linkedinSearchUrl: 'https://www.linkedin.com/jobs/search/?keywords=Director%20of%20Engineering%20Cloud&location=Hyderabad',
    notes: 'Captures direct ATS job postings before they get syndicated to crowded job portals.',
    category: 'ATS Career Pages'
  },
  {
    id: 'bool-02',
    title: 'Hidden Market Decision Maker Mapping (VP & CTOs)',
    roleTarget: 'VP Engineering OR CTO OR Head of TA',
    location: 'India',
    includedTerms: ['"VP of Engineering"', '"Chief Technology Officer"', '"hiring"', '"GCC"'],
    excludedTerms: [],
    platforms: ['linkedin.com/in'],
    generatedQueryString: 'site:linkedin.com/in ("VP of Engineering" OR "CTO" OR "Managing Director Technology") AND ("Hyderabad" OR "Bengaluru") AND ("we are hiring" OR "growing our team" OR "expanding our GCC")',
    googleSearchUrl: 'https://www.google.com/search?q=site%3Alinkedin.com%2Fin+%28%22VP+of+Engineering%22+OR+%22CTO%22%29+AND+%28%22Hyderabad%22+OR+%22Bengaluru%22%29+AND+%22hiring%22',
    linkedinSearchUrl: 'https://www.linkedin.com/search/results/people/?keywords=VP%20Engineering%20Hyderabad%20hiring',
    notes: 'Finds leaders actively expanding teams before formal job requisitions go public.',
    category: 'Hidden Market'
  }
];

export const INITIAL_LEARNING_SECTIONS: LearningSection[] = [
  {
    id: 1,
    number: '01',
    title: 'Career Diagnosis & The ₹1Cr Reality Check',
    category: 'Foundation',
    duration: '45 mins',
    description: 'Diagnose your current positioning gap, evaluate the 7 Career Situations, and calculate your 15-year career leverage curve.',
    keyTakeaways: ['Identify whether you are Underleveraged vs Underpaid', 'The Career Math formula for 2-3 year strategic pivots', 'Shifting from Job Title identity to Functional Value'],
    deliverable: 'Completed Career Diagnosis Profile & ₹1Cr Roadmap Confidence Target',
    isCompleted: true
  },
  {
    id: 2,
    number: '02',
    title: 'Master Career Memory Architecture',
    category: 'Foundation',
    duration: '60 mins',
    description: 'Constructing your exhaustive, authentic single-source-of-truth career repository across all metrics and leadership milestones.',
    keyTakeaways: ['Why single resumes fail', 'Capturing quantifiable business impact metrics', 'Tagging evidence for local-first zero-hallucination recall'],
    deliverable: 'Master Career Memory JSON & Markdown Baseline',
    isCompleted: true
  },
  {
    id: 3,
    number: '03',
    title: 'Career Evidence Lab: High-Impact CAR Stories',
    category: 'Foundation',
    duration: '50 mins',
    description: 'Mastering the Challenge-Action-Result framework to articulate quantifiable business impact without fluff.',
    keyTakeaways: ['Never leave the Result section empty', 'Translating technical architecture into revenue & cost savings', 'Bar Raiser CAR storytelling formula'],
    deliverable: 'At least 5 validated, metric-grounded CAR stories in your database',
    isCompleted: true
  },
  {
    id: 4,
    number: '04',
    title: 'Target Role Definition & Market Positioning',
    category: 'Execution',
    duration: '40 mins',
    description: 'Laser-focusing your target profile across Function, Industry, Company Tier, and Geographic Hubs.',
    keyTakeaways: ['Why "Your job title is misleading"', 'Tier 1 GCCs vs Product Scale-ups', 'Compensation benchmarking beyond fixed CTC'],
    deliverable: 'Target Profile Matrix with upper-quartile salary parameters',
    isCompleted: false
  },
  {
    id: 5,
    number: '05',
    title: 'Master Resume & ATS Reverse-Engineering',
    category: 'Execution',
    duration: '75 mins',
    description: 'Designing high-impact, ATS-optimized resumes reverse-engineered directly from target JDs.',
    keyTakeaways: ['Deconstructing ATS keyword parsing', 'Eliminating formatting friction and graphics clutter', 'Bullet point structure: Action + Context + Metric'],
    deliverable: 'Master Resume Document + 1 Tailored ATS Resume',
    isCompleted: false
  },
  {
    id: 6,
    number: '06',
    title: 'Boolean Search Mastery & The Hidden Job Market',
    category: 'Execution',
    duration: '55 mins',
    description: 'Finding high-paying unadvertised roles by tapping ATS search strings, hiring signals, and Series-C expansion signals.',
    keyTakeaways: ['Bypassing saturated job boards', 'Boolean string construction for Workday & Greenhouse', 'Identifying expansion triggers before public posting'],
    deliverable: 'Saved Boolean Search Suite with 3 active target strings',
    isCompleted: false
  },
  {
    id: 7,
    number: '07',
    title: 'Executive Decision Maker Mapping & Networking',
    category: 'Execution',
    duration: '60 mins',
    description: 'Reaching out to VPs, MDs, and Executive Recruiters with personalized value-first messaging.',
    keyTakeaways: ['The 3-point outreach formula (Why You / Why Now / Value)', 'Avoiding generic LinkedIn spam', 'Follow-up cadence that yields 60%+ response rates'],
    deliverable: 'Target list of 10 decision makers with tailored outreach scripts',
    isCompleted: false
  },
  {
    id: 8,
    number: '08',
    title: 'WIN Studio: Transforming into a Solution Provider',
    category: 'Execution',
    duration: '70 mins',
    description: 'Creating executive-ready WIN (Work Impact & Navigation) presentations to diagnose target company problems before they ask.',
    keyTakeaways: ['Companies hire problem solvers, not resume submitters', 'Researching friction points in target architectures', 'The 5-slide WIN deck blueprint'],
    deliverable: '1 completed WIN presentation for your top dream company',
    isCompleted: false
  },
  {
    id: 9,
    number: '09',
    title: 'INFLUENCER: Thought Leadership on LinkedIn',
    category: 'Advanced Mastery',
    duration: '45 mins',
    description: 'Turning your engineering & leadership lessons into authority-building content that attracts inbound recruiters.',
    keyTakeaways: ['The 4 content archetypes for tech leaders', 'Writing hooks that demand attention', 'Converting engagement into interview opportunities'],
    deliverable: '3 scheduled high-value LinkedIn thought pieces',
    isCompleted: false
  },
  {
    id: 10,
    number: '10',
    title: 'AI-Powered Interview Simulation & Bar Raisers',
    category: 'Advanced Mastery',
    duration: '90 mins',
    description: 'Practicing behavioral, architectural, and executive case rounds with real-time feedback scoring.',
    keyTakeaways: ['Framing executive presence and concise delivery', 'Handling curveball behavioral questions', 'Live scoring on leadership, depth, and business impact'],
    deliverable: 'Complete 2 simulated interview sessions with 85%+ score',
    isCompleted: false
  },
  {
    id: 11,
    number: '11',
    title: 'NEGOTIATOR: Strategic Compensation & ₹1Cr Closes',
    category: 'Advanced Mastery',
    duration: '60 mins',
    description: 'Mastering the counter-offer psychology, ESOP/RSU valuation, and never anchoring low in recruiter calls.',
    keyTakeaways: ['Defending current CTC non-disclosure', 'Leveraging competing offers and market data', 'Walk-away confidence and multi-year equity vesting'],
    deliverable: 'Personalized Compensation Model & Recruiter Negotiation Scripts',
    isCompleted: false
  },
  {
    id: 12,
    number: '12',
    title: 'First 90 Days Executive Impact Playbook',
    category: 'Advanced Mastery',
    duration: '50 mins',
    description: 'Securing early wins, building stakeholder coalitions, and locking in promotion trajectory from Day 1 in your new role.',
    keyTakeaways: ['Listening tour architecture', 'Quick wins vs strategic rewrites', 'Quarterly executive reporting cadence'],
    deliverable: '90-Day Onboarding Roadmap & Stakeholder Map',
    isCompleted: false
  },
  {
    id: 13,
    number: '13',
    title: 'Continuous Career Operating System & Wealth Compounding',
    category: 'Advanced Mastery',
    duration: '40 mins',
    description: 'Maintaining your Master Career Memory as a lifetime asset for board roles, advisory retainers, and executive searches.',
    keyTakeaways: ['Quarterly memory updates', 'Building an executive advisory portfolio', 'Lifetime career optionality'],
    deliverable: 'Automated quarterly backup rhythm & advisory framework',
    isCompleted: false
  }
];

export const INITIAL_WIN_PROJECT: WinProject = {
  id: 'win-01',
  title: 'Goldman Sachs GCC Platform Modernization & FinOps Framework',
  targetCompany: 'Goldman Sachs',
  targetRole: 'Director of Engineering — Enterprise Platforms',
  researchPhase: {
    companyContext: 'Goldman Sachs Hyderabad center is expanding core banking telemetry and real-time cloud data pipelines to support 24/7 global multi-asset trade processing.',
    strategicPillars: ['Zero-Downtime Reliability', 'Autonomous Incident Healing', 'Cloud FinOps Cost Governance', 'Talent Density'],
    recentNewsOrFriction: 'Recent public engineering blogs emphasize transitioning legacy Java services to event-driven architectures on Kubernetes with stringent latency budgets.'
  },
  businessProblem: {
    problemStatement: 'Distributed trade processing pipelines encounter telemetry blindspots during peak volatility bursts, leading to high MTTR and escalating cloud compute overprovisioning.',
    rootCauses: [
      'Disparate legacy monitoring tools without correlated tracing',
      'Over-provisioned static compute clusters running 24/7 at <18% average CPU utilization',
      'Fragmented post-incident learning without automated telemetry runbooks'
    ],
    estimatedFinancialFriction: 'Estimated $1.2M annual cloud overspend + regulatory risk exposure on delayed trade reconciliation.'
  },
  opportunity: {
    marketWindow: 'Next 6-12 months as Hyderabad GCC takes complete ownership of global trade platform infrastructure.',
    competitiveAdvantage: 'Direct prior experience delivering 35% MTTR reduction at Hudson’s Bay Company and zero-downtime banking migration for 4.5M accounts at TCS.'
  },
  solution: {
    frameworkName: 'The RELIANT-SCALE Platform Architecture',
    threeStepArchitecture: [
      'Phase 1 (Days 1–30): Unified Telemetry Ingestion with automated error budgeting and blameless triage protocols.',
      'Phase 2 (Days 31–60): FinOps Governance & Spot Orchestration on Kubernetes, targeting 25% compute cost reduction.',
      'Phase 3 (Days 61–90): Automated self-healing circuit breakers for high-frequency trade ingestion pipelines.'
    ],
    riskMitigation: 'Canary rollout with automated rollbacks and zero disruption to transactional pipelines.'
  },
  businessImpact: {
    projectedCostSavings: '$400,000 – $650,000 recurring annual cloud savings',
    projectedRevenueUplift: 'Faster trade processing & SLA compliance for institutional clients',
    timeToValue: 'Initial telemetry wins in 30 days; full FinOps realization by Day 75.'
  },
  deckSlidesMarkdown: `# SLIDE 1: Executive Title
## Modernizing Enterprise Platforms with Zero Downtime & FinOps Discipline
**Presented by Poornima Harikumar** | Candidate for Director of Engineering & AI Enablement

---

# SLIDE 2: Target Context & Observed Friction
- Hyderabad GCC expansion provides critical opportunity for autonomous platform ownership.
- High-volume volatility bursts require sub-second telemetry without bloated multi-million dollar cloud bills.

---

# SLIDE 3: The RELIANT-SCALE Architecture
1. **Telemetry & SLA Alignment**: Automated error budgets & SRE runbooks.
2. **FinOps Spot Engine**: 28% infrastructure cost reclamation.
3. **Resilient Microservices**: Event-driven Kafka pipelines with CDC dual-writes.

---

# SLIDE 4: Projected Business ROI
- **$500K+ Annual Cost Savings** through intelligent workload orchestration.
- **35%+ MTTR Reduction** for critical Sev-1/2 trade reconciliation incidents.
- **100% On-Time Global Milestone Delivery**.`,
  createdAt: '2026-08-15',
  updatedAt: '2026-08-22'
};

export const INITIAL_NEGOTIATION_MODEL: NegotiationModel = {
  id: 'neg-01',
  companyName: 'Goldman Sachs',
  roleTitle: 'Director of Engineering',
  currentCompensation: {
    fixed: 4400000,
    variable: 400000,
    stocks: 0,
    total: 4800000
  },
  marketRange: {
    min: 7500000,
    median: 9200000,
    max: 11500000
  },
  targetCompensation: {
    fixed: 7500000,
    variable: 1500000,
    stocks: 1500000,
    joiningBonus: 500000,
    total: 10500000
  },
  minimumAcceptable: {
    fixed: 6800000,
    total: 8200000
  },
  idealOffer: {
    total: 10500000
  },
  negotiationLeveragePoints: [
    'Proven track record delivering ₹40Cr+ business value and managing 45+ engineers.',
    'Unique dual expertise in deep cloud architecture (AWS/GCP/Kubernetes) AND FinOps cost governance ($450K saved).',
    'Active interview pipelines with Uber and Atlassian creating high competitive urgency.',
    'Zero ramp-up time for banking ledger modernization and GCC scaling.'
  ],
  recruiterScripts: {
    salaryExpectationResponse: 'Based on the scope of leading 40+ platform engineers, driving global cloud architecture, and the high impact expected for this role, I am aligned with market compensation for Director of Engineering in the range of ₹90L to ₹1.05Cr total CTC.',
    currentCTCAnchorDefense: 'My current compensation reflects a legacy structure from two years ago before delivering $450K in cloud savings and scaling our multi-squad organization. For this next career step, I am benchmarking against market value and the direct ROI I will bring to Goldman Sachs.',
    counterOfferScript: 'I am thrilled about the opportunity to partner with Vikramaditya and lead this transformation. The team and mission are my top choice. However, looking at the compensation package of ₹82L against my target of ₹95L, if we can adjust the fixed component to ₹75L with a ₹5L joining bonus, I am ready to sign and confirm my start date immediately.',
    competingOffersScript: 'I am currently in final stages with two other tier-1 technology organizations. However, Goldman Sachs remains my preferred destination due to the engineering scope. A competitive offer aligned with the ₹95L mark will allow me to conclude all other conversations.',
    walkAwayScript: 'I deeply appreciate the team’s time and the offer extended. Given my compensation baseline and current leadership responsibilities, I must respectfully decline an offer below ₹80L. I look forward to staying connected for future strategic opportunities.'
  },
  updatedAt: '2026-08-22'
};

export const INITIAL_MASTER_RESUME_DOC: MasterResumeDocument = {
  id: 'master-resume-source',
  version: 'v1.4-production',
  updatedAt: new Date().toISOString(),
  executiveSummary: 'Accomplished Enterprise Technology Leader with 16+ years of expertise steering high-impact cloud migrations, distributed architectures, and large-scale digital transformations. Proven record of managing multi-million-dollar tech programs, scaling cross-functional engineering teams from 10 to 65+ engineers, and delivering ₹40Cr+ in business value across global enterprises.',
  highlights: [
    'P&L ownership for $3.2M cloud infrastructure portfolios across AWS and GCP',
    'Spearheaded zero-downtime core banking transition for 4.5M accounts across 1,200 branches',
    'Slashed incident MTTR by 35% and saved $450K annually via automated FinOps governance',
    'Scaled and mentored engineering organizations from 12 to 38+ engineers across 3 locations'
  ],
  markdownContent: `# POORNIMA HARIKUMAR
**Director of Engineering & AI Enablement | Scaled Technical Program Management | Distributed Cloud Architecture**
Hyderabad / Bengaluru, India | +91 98400 12345 | Poornima.Harikumar@gmail.com | [LinkedIn](https://linkedin.com/in/poornima-harikumar) | [GitHub](https://github.com/poornima-harikumar)

---

## EXECUTIVE SUMMARY
Accomplished Enterprise Engineering & Program Leader with **16+ years** of progressive expertise directing mission-critical platform modernizations, distributed cloud systems, and high-velocity engineering organizations. Proven track record managing multi-million-dollar technology budgets, architecting zero-downtime transactional systems for **4.5M+ active users**, institutionalizing **FinOps frameworks saving $450K+ annually**, scaling multi-disciplinary engineering pods up to **65 engineers**, and driving strategic **Enterprise AI Enablement & LLM integration** across business-critical workflows.

---

## CORE COMPETENCIES
- **Leadership & Scale:** Engineering Org Scaling (10→65), P&L Accountability ($3.5M), Technical Program Governance, Executive SteerCo, Agile / DORA Metrics, Bar Raiser Hiring.
- **AI Enablement & Cloud:** Generative AI Workflow Integration, LLMOps Infrastructure, Distributed Microservices, Event-Driven Architecture (Kafka), AWS & GCP, Kubernetes (EKS), Zero-Downtime Migrations.
- **FinOps & Platform Reliability:** Cloud Cost Governance, Site Reliability Engineering (SRE), ITIL v4 Incident Management (35% MTTR Reduction), Telemetry & APM (Datadog, Prometheus).
- **Data & Security Governance:** Enterprise Data Pipelines, Snowflake, API Gateways, Secure DevSecOps CI/CD Pipelines, Zero-Trust Security & Compliance.

---

## PROFESSIONAL EXPERIENCE

### **Hudsons Bay Company** | Bengaluru / Hyderabad, India
*Senior Manager — Enterprise Platform Engineering* | **Mar 2022 – Present**
- Architected and executed omni-channel platform modernization, reducing checkout latency by **42% (1.8s → 650ms)** and generating **₹18Cr** annual revenue uplift.
- Led a **38-engineer** organization spanning Cloud Infrastructure, Core Services, and Data Engineering squads with a **92% talent retention rate**.
- Instituted company-wide FinOps governance across AWS & GCP footprint, eliminating idle compute and recovering **$450,000 (28%)** in annual cloud expenditure.
- Overhauled incident management and automated telemetry triage, slashing Mean Time to Resolution (MTTR) by **35%** and decreasing recurring Sev-1 outages by **58%**.

### **Tata Consultancy Services** | Hyderabad, India
*Technical Program Architect* | **Jun 2018 – Feb 2022**
- Spearheaded core banking ledger modernization for a Tier-1 US Financial Institution with **4.5M active accounts**, completing migration with **zero unscheduled downtime**.
- Guided technical architecture, risk management, and delivery governance across 6 distributed agile pods (**45 engineers**).
- Automated CI/CD pipelines and deployment safety assertions, accelerating release cadence from 3-week cycles to **daily on-demand releases**.
- Received client Global Excellence Award for flawless execution and strict regulatory compliance adherence.

### **Abacus Staffing & Services** | Hyderabad, India
*Lead Technology Consultant* | **Jan 2016 – May 2018**
- Directed 9 enterprise digital transformation engagements spanning workforce management platforms, analytics portals, and cloud integrations.
- Maintained **94% client contract retention rate** through transparent roadmap execution and robust SLA management.

### **KRD Exports Pvt Ltd** | Chennai, India
*Head of Systems & IT Infrastructure* | **Feb 2014 – Dec 2015**
- Automated multi-warehouse ERP synchronization, cutting supply chain logistics dispatch delays by **55%** and saving **₹1.8Cr** annually.

### **GoFrugal Technologies** | Chennai, India
*Senior Product Engineer & Module Lead* | **Apr 2012 – Jan 2014**
- Engineered high-concurrency offline sync engine handling **120,000+ daily POS retail transactions** with robust conflict resolution algorithms.

### **IndiaMART InterMESH Ltd** | Noida, India
*Software Engineer — Search & Buyer Platforms* | **Aug 2010 – Mar 2012**
- Optimized Apache Solr search indexing algorithms, reducing query response times by **38%** across 2M product catalog items.

### **Genius Consultants Limited** & **IVY Infotech** | **2008 – 2010**
*Systems Analyst & Junior Software Engineer*
- Built scalable enterprise web modules, automated payroll processing (85% calculation time reduction), and core database services.

---

## EDUCATION & CERTIFICATIONS
- **Bachelor of Engineering in Computer Science & Engineering** — Anna University (2008)
- **AWS Certified Solutions Architect — Professional** (Amazon Web Services, 2023)
- **Google Cloud Professional Cloud Architect** (Google Cloud, 2022)
- **ITIL v4 Strategic Leader** (AXELOS, 2021)
- **Certified ScrumMaster (CSM)** (Scrum Alliance, 2019)
`,
  plainTextContent: `POORNIMA HARIKUMAR
Director of Engineering & AI Enablement | Scaled Technical Program Management | Distributed Cloud Architecture
Hyderabad / Bengaluru, India | +91 98400 12345 | Poornima.Harikumar@gmail.com | LinkedIn: https://linkedin.com/in/poornima-harikumar

EXECUTIVE SUMMARY:
Accomplished Enterprise Engineering & Program Leader with 16+ years of progressive expertise directing mission-critical platform modernizations, distributed cloud systems, and high-velocity engineering organizations. Managed multi-million-dollar technology budgets, architected zero-downtime systems for 4.5M+ active users, institutionalized FinOps frameworks saving $450K+ annually, scaled teams up to 65 engineers, and accelerated Enterprise AI Enablement.

KEY METRICS & HIGHLIGHTS:
- 42% Latency Drop & ₹18Cr annual revenue uplift at Hudson's Bay Company
- $450K annual FinOps cloud savings (28% reduction)
- 4.5M user core banking zero-downtime migration at TCS
- 35% MTTR incident resolution acceleration
- P&L accountability for $3.2M tech portfolios & Enterprise AI Enablement`
};
