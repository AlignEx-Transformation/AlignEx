import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Target, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Flame 
} from 'lucide-react';

export const PipelineStats: React.FC = () => {
  const { applications, leads, contacts, masterMemory, tokenStats, setCurrentPage } = useApp();

  const activeApps = applications.filter(a => a.stage !== 'Rejected');
  const interviewApps = applications.filter(a => a.stage === 'Interview' || a.stage === 'Final Round');
  const warmLeads = leads.filter(l => l.stage !== 'Archived');

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {/* 1. Target CTC Potential */}
      <div 
        onClick={() => setCurrentPage('negotiator')}
        className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Target Compensation</span>
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-teal-300 transition-colors">
            {masterMemory.targetProfile.targetCompensation.target}
          </h4>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
            <Flame className="w-3 h-3" />
            Upper 10th Percentile
          </span>
        </div>
      </div>

      {/* 2. Active Pipeline */}
      <div 
        onClick={() => setCurrentPage('application-board')}
        className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Active Pipeline</span>
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
            {activeApps.length} Opportunities
          </h4>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {interviewApps.length} in Active Interview Rounds
          </span>
        </div>
      </div>

      {/* 3. Decision Makers & CRM */}
      <div 
        onClick={() => setCurrentPage('contacts')}
        className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Network CRM</span>
          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {contacts.length} Contacts
          </h4>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {warmLeads.length} Qualified Inbound/Outbound Leads
          </span>
        </div>
      </div>

      {/* 4. Local AI Tokens Saved */}
      <div 
        onClick={() => setCurrentPage('settings-backup')}
        className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">AI Tokens Saved</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5">
          <h4 className="text-lg sm:text-xl font-extrabold text-emerald-400 tracking-tight">
            {tokenStats.estimatedTokensSaved.toLocaleString()}
          </h4>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {tokenStats.cachedResponsesCount} Instant Local Cache Hits
          </span>
        </div>
      </div>
    </div>
  );
};
