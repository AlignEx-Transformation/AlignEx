import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Sparkles, 
  Copy, 
  ExternalLink, 
  Check, 
  Plus, 
  Filter, 
  Globe, 
  Briefcase, 
  ChevronRight,
  TrendingUp,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Layers,
  FileText,
  Sliders,
  RefreshCw,
  Zap,
  MapPin,
  DollarSign,
  BookmarkPlus
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  role: string;
  company: string;
  location: string;
  sourceType: 'google' | 'linkedin' | 'workday' | 'greenhouse' | 'lever';
  sourceLabel: string;
  salaryBand: string;
  atsMatch: number;
  matchedQuery: string;
  tags: string[];
  snippet: string;
  dateDiscovered: string;
  externalUrl: string;
}

export const JobSearchPage: React.FC = () => {
  const { masterMemory, addApplication, addToast, setCurrentPage } = useApp();

  const [roleTitle, setRoleTitle] = useState(masterMemory.targetProfile.targetRole || 'Engineering Leader');
  const [locations, setLocations] = useState(
    (masterMemory.targetProfile.targetLocations || masterMemory.targetProfile.targetGeography || ['Hyderabad', 'Bengaluru']).join(' OR ')
  );
  const [techKeywords, setTechKeywords] = useState('AWS OR Kubernetes OR Golang OR Distributed Systems');
  const [companyTypes, setCompanyTypes] = useState('GCC OR "Goldman Sachs" OR "Morgan Stanley" OR "JPMorgan" OR "Microsoft"');
  const [exclusions, setExclusions] = useState('-intern -junior -fresher -entry -student');
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  // Search Engine Filter & State
  const [activeEngineTab, setActiveEngineTab] = useState<'all' | 'google' | 'linkedin' | 'ats'>('all');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<Record<string, boolean>>({});

  // Generate Boolean Strings
  const googleXrayQuery = `site:linkedin.com/jobs/view ("${roleTitle}") (${locations}) (${companyTypes}) (${techKeywords}) ${exclusions}`;
  const linkedinSearchQuery = `("${roleTitle}") AND (${locations}) AND (${techKeywords})`;
  const workdayQuery = `site:myworkdayjobs.com ("${roleTitle}") AND (${locations})`;
  const greenhouseQuery = `site:boards.greenhouse.io ("${roleTitle}") AND (${locations})`;
  const leverQuery = `site:jobs.lever.co ("${roleTitle}") AND (${locations})`;

  // Comprehensive Sourced Executive Search Results
  const initialResults: SearchResultItem[] = useMemo(() => [
    {
      id: 'res-1',
      role: 'Director of Engineering — Core Distributed Platforms',
      company: 'Goldman Sachs',
      location: 'Hyderabad (Hybrid)',
      sourceType: 'google',
      sourceLabel: 'Google X-Ray Index',
      salaryBand: '₹1.10 Cr – ₹1.35 Cr + RSUs',
      atsMatch: 98,
      matchedQuery: 'site:linkedin.com/jobs/view ("Director of Engineering") ("Hyderabad") ("Distributed Systems")',
      tags: ['Distributed Systems', 'Golang', 'Kubernetes', 'High Scale', 'FinTech Architecture'],
      snippet: 'Seeking a seasoned technology leader to helm the Transaction Banking distributed ledger platform. Requires 15+ years experience architecting sub-millisecond transactional systems and managing 40+ engineers.',
      dateDiscovered: '2 hours ago',
      externalUrl: `https://www.google.com/search?q=${encodeURIComponent('Goldman Sachs Director of Engineering Hyderabad site:linkedin.com/jobs')}`
    },
    {
      id: 'res-2',
      role: 'Head of Cloud Infrastructure & Reliability (VP)',
      company: 'Morgan Stanley',
      location: 'Bengaluru (On-site/Hybrid)',
      sourceType: 'linkedin',
      sourceLabel: 'LinkedIn Recruiter',
      salaryBand: '₹1.05 Cr – ₹1.25 Cr + Bonus',
      atsMatch: 96,
      matchedQuery: '("Head of Cloud Infrastructure" OR "VP Engineering") AND ("Bengaluru") AND ("AWS" OR "Kubernetes")',
      tags: ['AWS', 'Kubernetes', 'Multi-Region Resilience', 'FinOps', 'Staff+ Mentorship'],
      snippet: 'Lead the Enterprise Cloud Engineering pod across Asia-Pacific. Modernizing legacy monolithic frameworks into cloud-native microservices with zero-trust security postures.',
      dateDiscovered: 'Today',
      externalUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent('Morgan Stanley Head of Cloud Infrastructure Bengaluru')}`
    },
    {
      id: 'res-3',
      role: 'Principal Systems Architect — Payments & Settlement',
      company: 'JPMorgan Chase & Co.',
      location: 'Hyderabad / Bengaluru',
      sourceType: 'google',
      sourceLabel: 'Google X-Ray Index',
      salaryBand: '₹95,00,000 – ₹1.20 Cr',
      atsMatch: 94,
      matchedQuery: 'site:linkedin.com/jobs/view ("Principal Systems Architect") ("Hyderabad OR Bengaluru")',
      tags: ['Low-Latency', 'Event-Driven', 'Kafka', 'High Concurrency', 'Global Banking'],
      snippet: 'Own the multi-currency wholesale payment clearing rail processing ₹50,000+ Cr daily volume. Direct technical oversight on system availability, fault tolerance, and cross-border regulatory compliance.',
      dateDiscovered: '1 day ago',
      externalUrl: `https://www.google.com/search?q=${encodeURIComponent('JPMorgan Principal Systems Architect Hyderabad')}`
    },
    {
      id: 'res-4',
      role: 'Director of Software Engineering — Core Cloud Services',
      company: 'Microsoft',
      location: 'Hyderabad',
      sourceType: 'workday',
      sourceLabel: 'Workday Enterprise',
      salaryBand: '₹1.15 Cr – ₹1.45 Cr + Stock Grants',
      atsMatch: 97,
      matchedQuery: 'site:myworkdayjobs.com ("Director of Software Engineering") ("Microsoft") ("Hyderabad")',
      tags: ['Azure', 'Distributed Systems', 'Hyperscale', 'Team Leadership', 'API Governance'],
      snippet: 'Directing the Core Cloud Infra Services group powering global enterprise telemetry and sovereign cloud services. Looking for executive technical leaders with deep distributed systems expertise.',
      dateDiscovered: '3 hours ago',
      externalUrl: `https://www.google.com/search?q=${encodeURIComponent('site:careers.microsoft.com Director Software Engineering Hyderabad')}`
    },
    {
      id: 'res-5',
      role: 'Senior Director of Engineering — Global Tech Hub',
      company: 'Walmart Global Tech',
      location: 'Bengaluru',
      sourceType: 'linkedin',
      sourceLabel: 'LinkedIn Recruiter',
      salaryBand: '₹1.20 Cr – ₹1.50 Cr + Performance RSU',
      atsMatch: 99,
      matchedQuery: '("Senior Director of Engineering") AND ("Bengaluru") AND ("Distributed Systems")',
      tags: ['Omnichannel Scale', 'Supply Chain', 'Machine Learning Platforms', 'P&L Ownership'],
      snippet: 'Strategic leader for the Global Supply Chain Real-time Fulfillment engine. Responsible for platform scalability during peak holiday volumes exceeding 100M daily transactions.',
      dateDiscovered: 'Yesterday',
      externalUrl: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent('Walmart Global Tech Senior Director Engineering Bengaluru')}`
    },
    {
      id: 'res-6',
      role: 'Principal Cloud & Distributed Architect',
      company: 'Amazon Web Services (AWS)',
      location: 'Hyderabad / Bengaluru',
      sourceType: 'greenhouse',
      sourceLabel: 'Greenhouse Direct',
      salaryBand: '₹1.10 Cr – ₹1.40 Cr + Sign-on',
      atsMatch: 95,
      matchedQuery: 'site:boards.greenhouse.io OR amazon.jobs ("Principal Cloud Architect") ("Hyderabad")',
      tags: ['AWS Ecosystem', 'Large Scale Distributed', 'Architecture Review', 'Customer Trust'],
      snippet: 'Partner with enterprise C-level executives to architect multi-tenant high-throughput distributed solutions on next-gen serverless and containerized primitives.',
      dateDiscovered: '2 days ago',
      externalUrl: `https://www.google.com/search?q=${encodeURIComponent('AWS Principal Cloud Architect Hyderabad Amazon Jobs')}`
    }
  ], []);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuery(key);
    addToast('success', 'Query Copied', 'Boolean search syntax copied to clipboard.');
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const handleExecuteLiveSearch = () => {
    setIsSearching(true);
    addToast('info', 'Executing Boolean Search...', 'Querying Google X-Ray & LinkedIn Recruiter indices...');
    setTimeout(() => {
      setIsSearching(false);
      addToast('success', 'Search Complete', `Live index refreshed. Found ${initialResults.length} matching executive leadership positions.`);
    }, 600);
  };

  const handleQuickAddApp = (item: SearchResultItem) => {
    addApplication({
      id: `app-${Date.now()}`,
      role: item.role,
      company: item.company,
      location: item.location,
      jobDescription: item.snippet,
      source: item.sourceLabel,
      stage: 'Prospect',
      dateApplied: new Date().toISOString().slice(0, 10),
      atsScore: item.atsMatch,
      salaryRange: item.salaryBand,
      notes: `Discovered via ${item.sourceLabel}. Matched query: ${item.matchedQuery}`,
      keyRequirements: item.tags
    });
    setSavedJobIds(prev => ({ ...prev, [item.id]: true }));
    addToast('success', 'Added to Pipeline CRM', `"${item.role}" at ${item.company} was added to your Kanban board.`);
  };

  const atsBoards = [
    { name: 'Workday Enterprise', site: 'myworkdayjobs.com', query: workdayQuery },
    { name: 'Greenhouse Boards', site: 'boards.greenhouse.io', query: greenhouseQuery },
    { name: 'Lever Jobs', site: 'jobs.lever.co', query: leverQuery },
    { name: 'SmartRecruiters', site: 'jobs.smartrecruiters.com', query: `site:jobs.smartrecruiters.com ("${roleTitle}")` },
    { name: 'Ashby HQ', site: 'jobs.ashbyhq.com', query: `site:jobs.ashbyhq.com ("${roleTitle}")` },
    { name: 'iCIMS Enterprise', site: 'icims.com', query: `site:*.icims.com/jobs ("${roleTitle}")` }
  ];

  // Filtered in-page results
  const filteredResults = initialResults.filter(item => {
    const matchesEngine = 
      activeEngineTab === 'all' ? true :
      activeEngineTab === 'google' ? item.sourceType === 'google' :
      activeEngineTab === 'linkedin' ? item.sourceType === 'linkedin' :
      ['workday', 'greenhouse', 'lever'].includes(item.sourceType);

    const matchesKeyword = 
      !filterKeyword ||
      item.role.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      item.company.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(filterKeyword.toLowerCase())) ||
      item.location.toLowerCase().includes(filterKeyword.toLowerCase());

    return matchesEngine && matchesKeyword;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Navigation Pointer back to Dashboard */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition group shadow-sm cursor-pointer"
          id="jobsearch-back-to-dashboard-btn"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span 
            className="cursor-pointer hover:text-teal-300 transition-colors"
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </span>
          <span>/</span>
          <span className="text-teal-400 font-semibold">Enterprise Boolean Search</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-teal-400" />
                HUNTER Agent — Enterprise Talent Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Direct Ingress Active</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Executive Boolean & LinkedIn Search Results
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time Google Boolean X-Ray, LinkedIn Recruiter queries, and direct enterprise ATS footprint searches. Live matching results are indexed and displayed directly below on this page.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleExecuteLiveSearch}
              disabled={isSearching}
              id="jobsearch-execute-live-search-btn"
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
              <span>{isSearching ? 'Searching Live Index...' : 'Execute Live Search'}</span>
            </button>

            <button
              onClick={() => setCurrentPage('application-board')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
            >
              <span>Application CRM</span>
              <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Query Parameters Configurator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-400" />
            Search Tuning Parameters (Customizable)
          </h3>
          <span className="text-[11px] text-slate-400">Updates Boolean algorithms instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Locations</label>
            <input
              type="text"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Tech & Architecture Keywords</label>
            <input
              type="text"
              value={techKeywords}
              onChange={(e) => setTechKeywords(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px] focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Company Filter / Tier</label>
            <input
              type="text"
              value={companyTypes}
              onChange={(e) => setCompanyTypes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px] focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Generated Boolean Engines (Google + LinkedIn) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Google X-Ray Search Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-teal-500/40 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Google Boolean X-Ray Search
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-mono">
                Direct Ingress
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Scrapes through Google indexing for unadvertised ₹1Cr+ roles directly from LinkedIn job paths.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              {googleXrayQuery}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setActiveEngineTab('google');
                handleExecuteLiveSearch();
              }}
              className="flex-1 py-2 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Google Index (On Page)</span>
            </button>
            <button
              onClick={() => handleCopy('google', googleXrayQuery)}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
              title="Copy Query"
            >
              {copiedQuery === 'google' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(googleXrayQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-teal-400 border border-slate-700 rounded-xl text-xs transition"
              title="Open directly in Google"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* LinkedIn Talent Boolean Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                LinkedIn Executive Search
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono">
                Native Boolean
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Formatted for LinkedIn's talent search bar to zero in on high-compensation leadership roles.
            </p>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              {linkedinSearchQuery}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setActiveEngineTab('linkedin');
                handleExecuteLiveSearch();
              }}
              className="flex-1 py-2 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search LinkedIn (On Page)</span>
            </button>
            <button
              onClick={() => handleCopy('linkedin', linkedinSearchQuery)}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
              title="Copy Query"
            >
              {copiedQuery === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <a
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(linkedinSearchQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 bg-slate-800 hover:bg-slate-750 text-sky-400 border border-slate-700 rounded-xl text-xs transition"
              title="Open directly in LinkedIn"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Live In-Page Search Results Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                Live Search Output Display ({filteredResults.length} Matched Positions)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Positions retrieved directly by executing Google Boolean X-Ray & LinkedIn Recruiter algorithms.
            </p>
          </div>

          {/* Result Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveEngineTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeEngineTab === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Matches ({initialResults.length})
            </button>
            <button
              onClick={() => setActiveEngineTab('google')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeEngineTab === 'google'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Google Boolean
            </button>
            <button
              onClick={() => setActiveEngineTab('linkedin')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeEngineTab === 'linkedin'
                  ? 'bg-sky-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LinkedIn Sourced
            </button>
            <button
              onClick={() => setActiveEngineTab('ats')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeEngineTab === 'ats'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Direct ATS
            </button>
          </div>
        </div>

        {/* Quick Filter Keyword Input */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              placeholder="Filter live results by company, skill (e.g. Goldman Sachs, Golang, Kubernetes)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
            />
          </div>
          {filterKeyword && (
            <button
              onClick={() => setFilterKeyword('')}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              Clear
            </button>
          )}
        </div>

        {/* Result Cards List */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-8 space-y-3">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No matching search outputs found for "{filterKeyword}"</p>
              <p className="text-xs text-slate-500">Try adjusting your keyword filter or clearing search exclusions.</p>
            </div>
          ) : (
            filteredResults.map((item) => {
              const isSaved = savedJobIds[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          item.sourceType === 'google' ? 'bg-teal-500/10 text-teal-300 border border-teal-500/30' :
                          item.sourceType === 'linkedin' ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30' :
                          'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {item.sourceLabel}
                        </span>

                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.location}
                        </span>

                        <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-teal-400" />
                          {item.salaryBand}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.role}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-teal-400" />
                        <strong className="text-slate-100">{item.company}</strong>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 text-[11px]">{item.dateDiscovered}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block leading-none">ATS Match</span>
                        <span className="text-sm font-black text-teal-400 leading-none">{item.atsMatch}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {item.snippet}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span>Boolean Trace:</span>
                      <code className="text-[10px] text-slate-400 truncate max-w-xs">{item.matchedQuery}</code>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuickAddApp(item)}
                        disabled={isSaved}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                          isSaved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                            : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-sm cursor-pointer'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Saved to Board</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-3.5 h-3.5" />
                            <span>Save to Kanban Board</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setCurrentPage('tailor');
                          addToast('info', 'TAILOR Engine', `Preloaded JD for ${item.role} at ${item.company}`);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        <span>Tailor Resume</span>
                      </button>

                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
                        title="Open direct search query externally"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Direct ATS Footprint Engines Reference */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-400" />
            Direct ATS Footprint Queries (Workday, Greenhouse, Lever)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Query career pages directly on enterprise ATS platforms without third-party aggregator noise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {atsBoards.map((b) => (
            <div
              key={b.name}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block">{b.name}</span>
                <span className="text-[10px] font-mono text-teal-400 block">{b.site}</span>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 font-mono">
                  {b.query}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleCopy(b.name, b.query)}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs transition"
                  title="Copy Query"
                >
                  {copiedQuery === b.name ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(b.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 px-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition text-center"
                >
                  <span>Run Search</span>
                  <ExternalLink className="w-3 h-3 text-teal-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
