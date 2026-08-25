import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PipelineStats } from '../components/dashboard/PipelineStats';
import { AgentGrid } from '../components/dashboard/AgentGrid';
import { MissionControl } from '../components/dashboard/MissionControl';
import { CareerMathTeaser } from '../components/dashboard/CareerMathTeaser';
import { EnterpriseTab } from '../components/dashboard/EnterpriseTab';
import { JDMatchEngine } from '../components/tailor/JDMatchEngine';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Target, 
  Database,
  Search,
  HardDrive,
  FolderSync,
  Building2,
  LayoutDashboard,
  Compass,
  FileCheck,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    masterMemory, 
    applications, 
    contacts, 
    leads, 
    careerTimeline, 
    setCurrentPage, 
    setIsLocalMemoryModalOpen,
    isFolderConnected,
    connectJobsearchFolder
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'jd-matcher' | 'enterprise' | 'strategy'>('overview');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Master Career Memory Active
            </span>
            <span className="text-xs text-slate-400 font-mono">v{masterMemory.version || 1}.0</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Welcome back, {masterMemory.identity.fullName || 'Poornima Harikumar'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Positioned for: <strong className="text-teal-400">{masterMemory.targetProfile.targetRole || 'Director of Engineering / Senior Director of Program Management & AI Enablement'}</strong> in <strong className="text-slate-200">{masterMemory.targetProfile.targetIndustries.slice(0, 3).join(', ')}</strong> ({masterMemory.targetProfile.targetCompensation.target}).
          </p>
        </div>

        <div className="flex items-center gap-2.5 z-10 shrink-0">
          <button
            onClick={() => setActiveTab('jd-matcher')}
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition"
          >
            <FileCheck className="w-4 h-4" />
            <span>Score JDs & View Gaps</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Consult NOVA AI</span>
          </button>
        </div>
      </div>

      {/* Dashboard Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          id="dashboard-tab-overview"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/35 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-teal-400" />
          <span>Overview & Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('jd-matcher')}
          id="dashboard-tab-jd-matcher"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'jd-matcher'
              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/35 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <FileCheck className="w-4 h-4 text-teal-400" />
          <span>JD Matcher & 200-Word Gap Dossier</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-teal-500/20 text-teal-300 font-mono">
            Score ≥ 60
          </span>
        </button>

        <button
          onClick={() => setActiveTab('enterprise')}
          id="dashboard-tab-enterprise"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'enterprise'
              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/35 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>Enterprise & Boolean Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('strategy')}
          id="dashboard-tab-strategy"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'strategy'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Mission Control & ₹1Cr Math</span>
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <>
          {/* Top 4 KPI Metrics */}
          <PipelineStats />

          {/* Quick JD Scoring & Gap Analysis Spotlight Card */}
          <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  RECOMMENDED (Score ≥ 60%)
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Director of Engineering & AI Enablement</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Executive Alignment: 88% Algorithmic ATS Match
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Poornima Harikumar's verified achievements (4.5M TPS zero-downtime banking, $450K cloud FinOps, 65 engineers scaled) strongly qualify for roles above Associate Director. 3 actionable gap differences identified with detailed 200-word coaching notes.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('jd-matcher')}
                className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-teal-500/10"
              >
                <span>View Gaps & 200-Word Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* The 9 Specialized AI Agents Grid */}
          <AgentGrid />

          {/* Recent Pipeline Activity & Strategy Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Active Applications Quick Peek */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-400" />
                  Active Target Opportunities
                </h4>
                <button
                  onClick={() => setCurrentPage('application-board')}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  View Kanban Board <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setCurrentPage('application-board')}
                    className="p-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer transition group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                        {app.role}
                      </h5>
                      <span className="text-[11px] text-slate-400">{app.company} • {app.location}</span>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                        {app.stage}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">ATS: {app.atsScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local-First Data Sovereignty Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-400" />
                    Persistent Career Intelligence Status
                  </h4>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    100% Local-First
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Your career history, metrics, and CAR stories live securely in your browser's IndexedDB. No external database or paid server is required.
                </p>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1.5 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Master Memory Size:</span>
                    <span className="text-teal-400 font-bold">{careerTimeline.length} Roles • {masterMemory.carStories.length} CAR Stories</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Candidate Identity:</span>
                    <span className="text-white font-bold">{masterMemory.identity.fullName || 'Poornima Harikumar'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLocalMemoryModalOpen(true)}
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <FolderSync className="w-3.5 h-3.5 text-teal-400" />
                  Manage Storage & Backups
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tab Content 2: Direct JD Matcher & 200-Word Gap Resolution Dossier */}
      {activeTab === 'jd-matcher' && (
        <JDMatchEngine />
      )}

      {/* Tab Content 3: Enterprise & Boolean Hub */}
      {activeTab === 'enterprise' && (
        <EnterpriseTab />
      )}

      {/* Tab Content 4: Strategy & ₹1Cr Math */}
      {activeTab === 'strategy' && (
        <>
          {/* The Mission Control Stack (Day 1-7, 7-21, 21+) */}
          <MissionControl />

          {/* Career Math Guide to ₹1Cr+ */}
          <CareerMathTeaser />
        </>
      )}
    </div>
  );
};
