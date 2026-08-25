import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Database, 
  Sparkles, 
  HardDrive, 
  FolderSync, 
  FileText, 
  Search, 
  CheckCircle2, 
  Zap, 
  Menu, 
  ShieldCheck,
  BookOpen,
  Github
} from 'lucide-react';
import { UserManualModal } from './UserManualModal';
import { LocalMemoryModal } from './LocalMemoryModal';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const { 
    currentPage, 
    setCurrentPage, 
    masterMemory, 
    isFolderConnected, 
    setIsLocalMemoryModalOpen, 
    tokenStats,
    tokenSaverMode,
    setTokenSaverMode,
    connectJobsearchFolder
  } = useApp();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Command Center Dashboard';
      case 'leads': return 'Career Consulting Leads & Opportunities';
      case 'contacts': return 'Contacts & Decision Makers';
      case 'companies': return 'Target Company Intelligence';
      case 'quotations': return 'Quotations & Compensation Proposals';
      case 'meetings': return 'Interviews & Meeting Agendas';
      case 'ai-assistant': return 'AI Assistant (NOVA) — Grounded Intelligence';
      case 'career-profile': return 'Career Profile & Target Role Engine';
      case 'job-search': return 'Job Search & Boolean Search Engine';
      case 'application-board': return 'Application Kanban Board';
      case 'networking': return 'Networking & Executive Outreach';
      case 'resume-studio': return 'Resume Studio & Master Resume';
      case 'tailor': return 'TAILOR — ATS Match & Customizer';
      case 'career-evidence': return 'Career Evidence Lab (CAR Framework)';
      case 'win-studio': return 'WIN Studio — Problem-Solver Decks';
      case 'interviewer': return 'Interviewer — Bar Raiser Simulation';
      case 'negotiator': return 'Negotiator — Compensation Strategy';
      case 'career-roadmap': return 'The Career Math Guide to ₹1Cr+';
      case 'influencer': return 'INFLUENCER — Thought Leadership';
      case 'learning-path': return 'Signature Program — 13 Sections';
      case 'settings-backup': return 'Settings & Backup Center';
      case 'admin': return 'Admin Console — Brand & System Settings';
      default: return 'ALIGNEX Career Consulting CRM';
    }
  };

  const { addToast } = useApp();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Title & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {getPageTitle()}
            </h2>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Targeting: <strong className="text-slate-200">{masterMemory.targetProfile.targetRole}</strong> ({masterMemory.targetProfile.targetCompensation.target})
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Token Saver Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <Zap className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-slate-400">Tokens Saved:</span>
          <span className="font-semibold text-emerald-400">
            {tokenStats.estimatedTokensSaved.toLocaleString()}
          </span>
        </div>

        {/* Job Search Workspace Active Button */}
        <button
          onClick={() => {
            setCurrentPage('job-search');
            addToast('info', 'Job Search Workspace', 'Switched to Boolean & Executive Job Search Engine.');
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 text-xs font-semibold transition shadow-sm active:scale-95 cursor-pointer"
          title="Open Job Search & Boolean Search Workspace"
          id="header-job-search-workspace-btn"
        >
          <Search className="w-3.5 h-3.5 text-teal-400" />
          <span>Job Search</span>
        </button>

        {/* User Manual & GitHub Guide Button */}
        <button
          onClick={() => setIsManualModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition shadow-sm active:scale-95 cursor-pointer"
          title="Open Alignex User Manual & GitHub Deployment Guide"
          id="header-user-manual-btn"
        >
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">Manual & GitHub</span>
          <span className="sm:hidden">Manual</span>
        </button>

        {/* Standalone Offline Single-File App Download Button */}
        <a
          href="./alignex-app.html"
          download="alignex-executive-app.html"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition shadow-sm"
          title="Download single-file standalone web app that runs on any browser with 0 install"
          id="header-download-offline-btn"
        >
          <HardDrive className="w-3.5 h-3.5 text-teal-400" />
          <span>Download App (.html)</span>
        </a>

        {/* Local Memory Active Badge Button */}
        <button
          onClick={() => setIsLocalMemoryModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 text-xs font-semibold transition shadow-sm"
          id="header-local-memory-badge"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Local Memory Active</span>
          <span className="sm:hidden">Active</span>
        </button>
      </div>

      {/* User Manual & GitHub Guide Modal */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      {/* Local Memory Modal */}
      <LocalMemoryModal />
    </header>
  );
};
