import React from 'react';
import { useApp, NavigationPage } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Search, 
  Sparkles, 
  Users, 
  UserCheck,
  FolderSync
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPage, setCurrentPage, setIsLocalMemoryModalOpen } = useApp();

  const navItems = [
    { id: 'dashboard' as NavigationPage, label: 'Home', icon: LayoutDashboard },
    { id: 'job-search' as NavigationPage, label: 'Jobs', icon: Search },
    { id: 'ai-assistant' as NavigationPage, label: 'NOVA', icon: Sparkles, highlight: true },
    { id: 'networking' as NavigationPage, label: 'Network', icon: Users },
    { id: 'career-profile' as NavigationPage, label: 'Profile', icon: UserCheck },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 flex items-center justify-around px-2 z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition ${
              isActive
                ? 'text-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-teal-500/15' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
