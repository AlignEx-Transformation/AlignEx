import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Database, 
  Key, 
  ShieldCheck, 
  HardDrive, 
  Zap, 
  Check, 
  AlertTriangle,
  Cpu
} from 'lucide-react';
import { db } from '../storage/db';

export const SettingsBackupPage: React.FC = () => {
  const { 
    masterMemory, 
    contacts, 
    leads, 
    applications, 
    meetings, 
    quotations, 
    aiProvider, 
    setAiProvider,
    updateMasterMemory,
    addToast 
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiKeyInput, setApiKeyInput] = useState(aiProvider.apiKey || '');
  const [modelInput, setModelInput] = useState(aiProvider.model || 'gemini-2.5-flash');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveApiSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setAiProvider({
      ...aiProvider,
      apiKey: apiKeyInput,
      model: modelInput
    });
    addToast({ title: 'AI Provider Settings Saved', type: 'success' });
  };

  const handleExportFullBackup = async () => {
    try {
      const backupData = {
        exportedAt: new Date().toISOString(),
        version: masterMemory.version || 1,
        masterMemory,
        contacts,
        leads,
        applications,
        meetings,
        quotations,
        aiProvider: {
          type: aiProvider.type,
          model: aiProvider.model
        }
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ALIGNEX_Full_Career_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast({ title: 'Full Career Backup Exported', message: 'JSON file saved locally.', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Export failed', message: err.message, type: 'error' });
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.masterMemory) {
          updateMasterMemory(() => json.masterMemory);
        }
        if (json.contacts && Array.isArray(json.contacts)) {
          await db.contacts.clear();
          await db.contacts.bulkAdd(json.contacts);
        }
        if (json.leads && Array.isArray(json.leads)) {
          await db.leads.clear();
          await db.leads.bulkAdd(json.leads);
        }
        if (json.applications && Array.isArray(json.applications)) {
          await db.applications.clear();
          await db.applications.bulkAdd(json.applications);
        }
        if (json.meetings && Array.isArray(json.meetings)) {
          await db.meetings.clear();
          await db.meetings.bulkAdd(json.meetings);
        }
        if (json.quotations && Array.isArray(json.quotations)) {
          await db.quotations.clear();
          await db.quotations.bulkAdd(json.quotations);
        }

        addToast({ title: 'Backup Restored Successfully', message: 'Reloading database state...', type: 'success' });
        setTimeout(() => window.location.reload(), 1000);
      } catch (err: any) {
        addToast({ title: 'Import failed', message: 'Invalid ALIGNEX backup JSON format.', type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  const handleResetToSeed = async () => {
    try {
      await db.contacts.clear();
      await db.leads.clear();
      await db.applications.clear();
      await db.meetings.clear();
      await db.quotations.clear();
      localStorage.clear();
      addToast({ title: 'Database Reset to Seed Data', type: 'info' });
      setTimeout(() => window.location.reload(), 800);
    } catch (err: any) {
      addToast({ title: 'Reset failed', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-teal-400" />
            Settings & Local Storage Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Data Sovereignty: All your career intelligence, CAR stories, contacts, and proposals are stored in your local browser storage.
          </p>
        </div>

        <button
          onClick={handleExportFullBackup}
          id="export-backup-button"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Full JSON Backup</span>
        </button>
      </div>

      {/* Storage Health & Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            IndexedDB Contacts
          </span>
          <span className="text-2xl font-black text-teal-400 font-mono">
            {contacts.length}
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Applications
          </span>
          <span className="text-2xl font-black text-sky-400 font-mono">
            {applications.length}
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Evidence / CAR Stories
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono">
            {masterMemory.carStories.length}
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Career Memory Version
          </span>
          <span className="text-2xl font-black text-purple-400 font-mono">
            v{masterMemory.version || 1}.0
          </span>
        </div>
      </div>

      {/* AI Provider Settings */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white">AI Provider & Low-Token Budgeting</h3>
        </div>

        <form onSubmit={handleSaveApiSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Model Engine</label>
              <select
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-low latency, recommended)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep analytical reasoning)</option>
                <option value="custom-local-llm">Custom Local LLM / Ollama</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Optional Client API Key (or Server Proxy)</label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Managed by Server Proxy automatically"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400">
              ⚡ Zero-overhead low-token prompting enabled by default.
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Backup & Restore Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white">Data Sovereignty & Portability</h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Your entire career CRM lives in your client sandbox. You can export complete backups at any time, restore them on another machine, or reset the local database.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportFullBackup}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Download Full JSON Backup</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportBackup}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>Import / Restore Backup</span>
          </button>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2.5 bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/50 text-xs font-semibold rounded-xl flex items-center gap-2 transition ml-auto"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
            <span>Reset Local Database</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Confirm Local Database Reset</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This action will wipe your local IndexedDB tables and restore default seed contacts, leads, and memory. Make sure you have exported a JSON backup first if you have unsaved custom notes.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToSeed}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
