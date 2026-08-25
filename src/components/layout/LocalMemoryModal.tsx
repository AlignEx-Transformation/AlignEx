import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Database, 
  FolderCheck, 
  FolderSync, 
  Download, 
  Upload, 
  Trash2, 
  X, 
  HardDrive, 
  ShieldCheck, 
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { checkStorageQuota } from '../../storage/fileSystem';

export const LocalMemoryModal: React.FC = () => {
  const {
    isLocalMemoryModalOpen,
    setIsLocalMemoryModalOpen,
    masterMemory,
    careerTimeline,
    carStories,
    contacts,
    applications,
    isFolderConnected,
    folderName,
    connectJobsearchFolder,
    disconnectFolder,
    syncNow,
    exportEntireBackupJSON,
    restoreBackupFromJSON,
    lastSavedTimestamp,
    tokenStats,
    tokenSaverMode,
    setTokenSaverMode
  } = useApp();

  const [quotaInfo, setQuotaInfo] = useState<{ quota: number; usage: number; usagePercent: number }>({
    quota: 100 * 1024 * 1024,
    usage: 1024 * 1024 * 3,
    usagePercent: 3
  });

  const [importJsonText, setImportJsonText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    if (isLocalMemoryModalOpen) {
      checkStorageQuota().then(setQuotaInfo);
    }
  }, [isLocalMemoryModalOpen]);

  if (!isLocalMemoryModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        await restoreBackupFromJSON(content);
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="local-memory-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                Master Career Memory
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Local-First Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">Your career data is owned and stored entirely on your device.</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocalMemoryModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block mb-1">Last Saved</span>
              <span className="text-sm font-semibold text-teal-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lastSavedTimestamp}
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block mb-1">Career Entities</span>
              <span className="text-sm font-semibold text-white">
                {careerTimeline.length} Roles • {carStories.length} CARs
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block mb-1">CRM Pipeline</span>
              <span className="text-sm font-semibold text-white">
                {contacts.length} Contacts • {applications.length} Apps
              </span>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block mb-1">Storage Type</span>
              <span className="text-sm font-semibold text-emerald-400">
                IndexedDB + OPFS
              </span>
            </div>
          </div>

          {/* Local Jobsearch Folder Status */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isFolderConnected ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                  <FolderCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    Local Jobsearch Folder Workspace
                    {isFolderConnected ? (
                      <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-normal">Connected</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded font-normal">Optional Sync</span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isFolderConnected 
                      ? `Target directory: ${folderName}/ (Live bidirectional file sync enabled)` 
                      : 'Connect a local folder to maintain automatic Markdown, JSON, and text backups.'}
                  </p>
                </div>
              </div>

              {isFolderConnected ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={syncNow}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <FolderSync className="w-3.5 h-3.5 text-teal-400" />
                    Sync Now
                  </button>
                  <button
                    onClick={disconnectFolder}
                    className="px-3 py-1.5 text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectJobsearchFolder}
                  className="px-3 py-1.5 text-xs font-medium bg-teal-600 hover:bg-teal-500 text-white rounded-lg flex items-center gap-1.5 transition shadow-sm"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  Select Jobsearch Folder
                </button>
              )}
            </div>

            {/* Folder Structure Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-400 leading-relaxed overflow-x-auto">
              <span className="text-teal-400 font-semibold">Jobsearch/</span><br />
              ├── 00_Master_Memory/ (master-profile.json, master-resume.md, skills.json)<br />
              ├── 01_Career_Profile/ (target-role.json, career-goals.json)<br />
              ├── 02_Job_Search/ (boolean-searches.txt, target-companies.json)<br />
              ├── 04_Resumes/ (master/, tailored/, archived/)<br />
              ├── 06_Applications/ & 07_Networking/<br />
              └── 99_Backups/ (timestamped version snapshots)
            </div>
          </div>

          {/* AI Token Saver & Privacy Banner */}
          <div className="bg-gradient-to-r from-teal-950/40 to-slate-900 border border-teal-800/40 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-semibold text-slate-200">AI Token Saver Policy</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                {(['OFF', 'BALANCED', 'MAXIMUM SAVINGS'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTokenSaverMode(mode)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition ${
                      tokenSaverMode === mode
                        ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Estimated AI Tokens Saved: <strong className="text-emerald-400">{(tokenStats.estimatedTokensSaved).toLocaleString()}</strong></span>
              <span>Cache Hit Ratio: <strong className="text-teal-400">{tokenStats.cachedResponsesCount} responses</strong></span>
            </div>
          </div>

          {/* Export & Import Controls */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Backup & Offline App Export</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="./alignex-app.html"
                download="alignex-executive-app.html"
                className="w-full p-3 bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/40 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition group shadow-sm"
              >
                <HardDrive className="w-4 h-4 text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Save Offline App (.html)</span>
              </a>

              <button
                onClick={exportEntireBackupJSON}
                className="w-full p-3 bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition group"
              >
                <Download className="w-4 h-4 text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Export Career (JSON)</span>
              </button>

              <label className="w-full p-3 bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition cursor-pointer group">
                <Upload className="w-4 h-4 text-teal-400 group-hover:-translate-y-0.5 transition-transform" />
                <span>Restore Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Privacy First:</strong> Your career information is stored locally on this device unless you explicitly choose to send information to an AI provider. No centralized accounts or external databases required.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ALIGNEX v1.0 • Schema v1</span>
          <button
            onClick={() => setIsLocalMemoryModalOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
