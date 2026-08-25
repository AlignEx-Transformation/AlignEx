import React from 'react';
import { useApp, NavigationPage } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  Users,
  Building2,
  FileSpreadsheet,
  CalendarDays,
  Sparkles,
  UserCheck,
  Search,
  Kanban,
  Send,
  FileText,
  FileCheck,
  Award,
  Presentation,
  Mic,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Settings,
  Share2,
  FolderSync,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category: 'Overview' | 'Pipeline CRM' | 'Career Intelligence' | 'Execution Engines' | 'Mastery & Settings';
}

const NAV_ITEMS: NavItem[] = [
  // Overview
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { id: 'ai-assistant', label: 'AI Assistant (NOVA)', icon: Sparkles, badge: 'Grounded', category: 'Overview' },
  
  // Pipeline CRM
  { id: 'leads', label: 'Leads', icon: Target, category: 'Pipeline CRM' },
  { id: 'contacts', label: 'Contacts', icon: Users, category: 'Pipeline CRM' },
  { id: 'companies', label: 'Companies', icon: Building2, category: 'Pipeline CRM' },
  { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet, category: 'Pipeline CRM' },
  { id: 'meetings', label: 'Meetings', icon: CalendarDays, category: 'Pipeline CRM' },
  { id: 'application-board', label: 'Application Board', icon: Kanban, badge: 'Kanban', category: 'Pipeline CRM' },
  { id: 'networking', label: 'Networking', icon: Send, category: 'Pipeline CRM' },

  // Career Intelligence
  { id: 'career-profile', label: 'Career Profile', icon: UserCheck, category: 'Career Intelligence' },
  { id: 'career-evidence', label: 'Career Evidence / CAR', icon: Award, category: 'Career Intelligence' },
  { id: 'resume-studio', label: 'Resume Studio', icon: FileText, category: 'Career Intelligence' },
  { id: 'tailor', label: 'TAILOR (JD Match)', icon: FileCheck, badge: 'ATS Match', category: 'Career Intelligence' },

  // Execution Engines
  { id: 'job-search', label: 'Job Search & Boolean', icon: Search, category: 'Execution Engines' },
  { id: 'win-studio', label: 'WIN Studio', icon: Presentation, category: 'Execution Engines' },
  { id: 'influencer', label: 'INFLUENCER', icon: Share2, category: 'Execution Engines' },
  { id: 'interviewer', label: 'Interviewer', icon: Mic, badge: 'Voice/Cam', category: 'Execution Engines' },
  { id: 'negotiator', label: 'Negotiator', icon: DollarSign, category: 'Execution Engines' },

  // Mastery & Settings
  { id: 'admin', label: 'Admin Console', icon: ShieldCheck, badge: 'Logo/System', category: 'Mastery & Settings' },
  { id: 'career-roadmap', label: 'Career Roadmap (₹1Cr)', icon: Compass, category: 'Mastery & Settings' },
  { id: 'learning-path', label: 'Learning Path', icon: GraduationCap, badge: '13 Sec', category: 'Mastery & Settings' },
  { id: 'settings-backup', label: 'Settings & Backups', icon: Settings, category: 'Mastery & Settings' }
];

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsLocalMemoryModalOpen, brandLogo, brandName, brandTagline } = useApp();

  const categories = ['Overview', 'Pipeline CRM', 'Career Intelligence', 'Execution Engines', 'Mastery & Settings'] as const;

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
        <div 
          onClick={() => setCurrentPage('admin')}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition group w-full"
          title="Click to manage Brand & Admin Settings"
        >
          {brandLogo ? (
            <div className="flex flex-col gap-1 w-full">
              <img 
                src={brandLogo} 
                alt={brandName || 'Alignex'} 
                className="h-8 max-w-[210px] object-contain object-left rounded shadow-sm"
              />
              <span className="text-[9px] uppercase font-bold tracking-widest text-teal-400 truncate block pl-0.5">
                {brandTagline || 'AI Career Consulting CRM'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-black tracking-wider text-sm shadow-inner shrink-0 group-hover:border-teal-400 transition-colors">
                AX
              </div>
              <div className="min-w-0">
                <h1 className="font-bold tracking-tight text-white text-base leading-none flex items-center gap-1.5 truncate">
                  {brandName || 'Alignex'}
                </h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-teal-400 truncate block mt-0.5">
                  {brandTagline || 'AI Career Consulting CRM'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {categories.map((category) => {
          const items = NAV_ITEMS.filter((item) => item.category === category);
          return (
            <div key={category} className="space-y-1">
              <span className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {category}
              </span>
              <div className="space-y-0.5 mt-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id)}
                      id={`nav-item-${item.id}`}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-semibold rounded ${
                            isActive
                              ? 'bg-teal-500/30 text-teal-200'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Persistent Bottom Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/90">
        <button
          onClick={() => setIsLocalMemoryModalOpen(true)}
          className="w-full p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-left transition group"
          id="sidebar-local-memory-button"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ALIGNEX AI
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span>Local Memory:</span>
              <strong className="text-emerald-400 font-normal">● Active</strong>
            </div>
          </div>
          <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center group-hover:text-teal-300 transition-colors">
            <FolderSync className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </aside>
  );
};
