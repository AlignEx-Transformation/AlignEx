import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ToastContainer } from './components/layout/ToastContainer';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ContactsPage } from './pages/ContactsPage';
import { LeadsPage } from './pages/LeadsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { QuotationsPage } from './pages/QuotationsPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { CareerProfilePage } from './pages/CareerProfilePage';
import { CareerEvidencePage } from './pages/CareerEvidencePage';
import { JobSearchPage } from './pages/JobSearchPage';
import { ApplicationBoardPage } from './pages/ApplicationBoardPage';
import { NetworkingPage } from './pages/NetworkingPage';
import { ResumeStudioPage } from './pages/ResumeStudioPage';
import { TailorPage } from './pages/TailorPage';
import { WinStudioPage } from './pages/WinStudioPage';
import { InterviewerPage } from './pages/InterviewerPage';
import { NegotiatorPage } from './pages/NegotiatorPage';
import { InfluencerPage } from './pages/InfluencerPage';
import { CareerRoadmapPage } from './pages/CareerRoadmapPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SettingsBackupPage } from './pages/SettingsBackupPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPage, isInitialized } = useApp();

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider text-slate-400">
            ALIGNEX // INITIALIZING LOCAL SOVEREIGN MEMORY...
          </span>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'leads':
        return <LeadsPage />;
      case 'companies':
        return <CompaniesPage />;
      case 'quotations':
        return <QuotationsPage />;
      case 'meetings':
        return <MeetingsPage />;
      case 'career-profile':
        return <CareerProfilePage />;
      case 'career-evidence':
        return <CareerEvidencePage />;
      case 'job-search':
        return <JobSearchPage />;
      case 'application-board':
        return <ApplicationBoardPage />;
      case 'networking':
        return <NetworkingPage />;
      case 'resume-studio':
        return <ResumeStudioPage />;
      case 'tailor':
        return <TailorPage />;
      case 'win-studio':
        return <WinStudioPage />;
      case 'interviewer':
        return <InterviewerPage />;
      case 'negotiator':
        return <NegotiatorPage />;
      case 'influencer':
        return <InfluencerPage />;
      case 'career-roadmap':
        return <CareerRoadmapPage />;
      case 'learning-path':
        return <LearningPathPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'settings':
      case 'settings-backup':
        return <SettingsBackupPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8 scrollbar-thin scrollbar-thumb-slate-800">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Notification Toast Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
