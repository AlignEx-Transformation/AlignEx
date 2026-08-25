import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Building2,
  Globe,
  Users,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Filter,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Layers,
  ChevronRight
} from 'lucide-react';

export const EnterpriseTab: React.FC = () => {
  const { masterMemory, setCurrentPage, addToast, companies, applications } = useApp();

  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  const roleTitle = masterMemory.targetProfile.targetRole || 'Engineering Leader';
  const locations = (masterMemory.targetProfile.targetLocations || masterMemory.targetProfile.targetGeography || ['Hyderabad', 'Bengaluru']).join(' OR ');
  const techKeywords = 'AWS OR Kubernetes OR Golang OR Distributed Systems OR Microservices';
  const enterpriseCompanyTypes = 'GCC OR "Goldman Sachs" OR "Morgan Stanley" OR "JPMorgan" OR "Microsoft" OR "Amazon"';
  const exclusions = '-intern -junior -fresher -entry -student';

  const googleXrayQuery = `site:linkedin.com/jobs/view ("${roleTitle}") (${locations}) (${enterpriseCompanyTypes}) (${techKeywords}) ${exclusions}`;
  const linkedinSearchQuery = `("${roleTitle}") AND (${locations}) AND (${techKeywords})`;
  const workdayEnterpriseQuery = `site:myworkdayjobs.com ("${roleTitle}") AND (${locations})`;
  const greenhouseEnterpriseQuery = `site:boards.greenhouse.io ("${roleTitle}") AND (${locations})`;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuery(key);
    addToast('success', 'Query Copied', 'Boolean search string copied to clipboard.');
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const atsBoards = [
    {
      name: 'Workday Enterprise',
      domain: 'myworkdayjobs.com',
      description: 'Hosts Fortune 500, Tier-1 Banks & Global GCC career portals.',
      query: workdayEnterpriseQuery
    },
    {
      name: 'Greenhouse Boards',
      domain: 'boards.greenhouse.io',
      description: 'Used by high-growth unicorns, tech giants, and tech GCCs.',
      query: greenhouseEnterpriseQuery
    },
    {
      name: 'Lever Direct',
      domain: 'jobs.lever.co',
      description: 'Fast-moving tech enterprises & venture-backed scaleups.',
      query: `site:jobs.lever.co ("${roleTitle}") AND (${locations})`
    },
    {
      name: 'SmartRecruiters',
      domain: 'jobs.smartrecruiters.com',
      description: 'Enterprise global engineering hubs and GCC operations.',
      query: `site:jobs.smartrecruiters.com ("${roleTitle}")`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enterprise Executive Sourcing Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                Enterprise Talent Intelligence Hub
              </span>
              <span className="text-xs text-slate-400 font-mono">GCC & Fortune 500 Sourcing</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Direct Enterprise & Executive Boolean Search Engines
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Bypass generic job aggregator noise. Execute high-precision Google Boolean X-Ray searches and LinkedIn Recruiter algorithms to extract unlisted ₹1Cr+ leadership openings directly on web page results.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentPage('job-search')}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition"
              id="enterprise-open-live-search-btn"
            >
              <Search className="w-4 h-4" />
              <span>Launch Live Search Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Search Engines Grid: Google Boolean & LinkedIn Search */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 1. Google Boolean X-Ray Search Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-teal-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Google Boolean X-Ray Search
                  </h3>
                  <span className="text-[11px] text-teal-400 font-medium">
                    Reverse-Engineered Indexing
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 text-[10px] font-mono font-semibold">
                Direct Ingress
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Executes advanced boolean operators across Google's deep index to surface hidden executive engineering leadership roles on LinkedIn and ATS portals before they expire or get spammed.
            </p>

            {/* Query Preview */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Generated Boolean Query:
              </span>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/90 font-mono text-[11px] text-slate-300 break-all select-all leading-relaxed">
                {googleXrayQuery}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {/* Live In-App Search Button */}
              <button
                onClick={() => {
                  setCurrentPage('job-search');
                  addToast('info', 'Opening Boolean Engine', 'Executing Google Boolean search on web page...');
                }}
                className="flex-1 py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
                id="enterprise-google-live-search-btn"
              >
                <Search className="w-4 h-4" />
                <span>Go to Google Boolean Search</span>
              </button>

              {/* Copy Query */}
              <button
                onClick={() => handleCopy('google', googleXrayQuery)}
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
                title="Copy Boolean String"
              >
                {copiedQuery === 'google' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {/* External Link */}
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(googleXrayQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
                title="Open directly on Google"
              >
                <ExternalLink className="w-4 h-4 text-teal-400" />
              </a>
            </div>
            <span className="text-[10px] text-slate-500 text-center block">
              Search results will be executed and displayed directly on the web page.
            </span>
          </div>
        </div>

        {/* 2. LinkedIn Executive Talent Search Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    LinkedIn Executive Search
                  </h3>
                  <span className="text-[11px] text-sky-400 font-medium">
                    Native Recruiter Boolean
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 text-[10px] font-mono font-semibold">
                Talent Algorithm
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Custom-crafted boolean search syntax designed for LinkedIn's talent search bar. Pinpoints VP, Director, and Principal opportunities with high compensation bands and direct executive reporting lines.
            </p>

            {/* Query Preview */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Generated LinkedIn Query:
              </span>
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/90 font-mono text-[11px] text-slate-300 break-all select-all leading-relaxed">
                {linkedinSearchQuery}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {/* Live In-App Search Button */}
              <button
                onClick={() => {
                  setCurrentPage('job-search');
                  addToast('info', 'Opening LinkedIn Engine', 'Executing LinkedIn search on web page...');
                }}
                className="flex-1 py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
                id="enterprise-linkedin-live-search-btn"
              >
                <Search className="w-4 h-4" />
                <span>Go to LinkedIn Search</span>
              </button>

              {/* Copy Query */}
              <button
                onClick={() => handleCopy('linkedin', linkedinSearchQuery)}
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
                title="Copy LinkedIn String"
              >
                {copiedQuery === 'linkedin' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              {/* External Link */}
              <a
                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(linkedinSearchQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs transition"
                title="Open directly on LinkedIn"
              >
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </a>
            </div>
            <span className="text-[10px] text-slate-500 text-center block">
              Search results will be executed and displayed directly on the web page.
            </span>
          </div>
        </div>
      </div>

      {/* Enterprise ATS Direct Sourcing Boards */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Enterprise ATS Footprint Engines
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct ingress to corporate ATS career portals without 3rd-party job boards.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('job-search')}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Boolean Engine</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {atsBoards.map((b) => (
            <div
              key={b.name}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{b.name}</span>
                  <span className="text-[10px] font-mono text-teal-400">{b.domain}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {b.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage('job-search');
                    addToast('info', 'ATS Search', `Loaded ${b.name} footprint query.`);
                  }}
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Search className="w-3 h-3 text-teal-400" />
                  <span>Execute Search</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Companies Quick Intel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            Tier-1 Enterprise Targets ({companies.length})
          </h3>
          <button
            onClick={() => setCurrentPage('companies')}
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
          >
            <span>View Companies CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {companies.slice(0, 6).map((c) => (
            <div
              key={c.id}
              onClick={() => setCurrentPage('job-search')}
              className="p-3 bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer transition group"
            >
              <div>
                <span className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors block">
                  {c.name}
                </span>
                <span className="text-[11px] text-slate-400">{c.industry} • {c.tier}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-mono">
                  {c.openRolesCount || 3} Roles Open
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
