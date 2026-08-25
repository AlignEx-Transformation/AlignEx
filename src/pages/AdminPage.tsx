import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { getAlignexJpegDataUrl, DEFAULT_ALIGNEX_LOGO_SVG_URI } from '../assets/brandLogo';
import {
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Sliders,
  Database,
  ArrowLeft,
  Sparkles,
  Building,
  HardDrive,
  Download,
  AlertTriangle,
  Eye,
  Check,
  FileCheck
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    brandLogo,
    brandName,
    brandTagline,
    setBrandLogo,
    setBrandInfo,
    masterMemory,
    careerTimeline,
    carStories,
    contacts,
    leads,
    applications,
    quotations,
    exportEntireBackupJSON,
    resetToDemoData,
    addToast,
    setCurrentPage
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(brandLogo);
  const [inputBrandName, setInputBrandName] = useState<string>(brandName || 'ALIGNEX');
  const [inputBrandTagline, setInputBrandTagline] = useState<string>(brandTagline || 'AI Career Consulting CRM');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      addToast('error', 'Invalid File Type', 'Please upload an image file (PNG, JPG, SVG, or WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('error', 'File Too Large', 'Maximum image size is 5MB.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewLogo(dataUrl);
      setIsConfirmed(false);
      addToast('info', 'Logo Loaded for Preview', 'Click "Confirm & Apply Logo" to lock it in.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleApplyOfficialAlignexJpeg = () => {
    const jpegDataUrl = getAlignexJpegDataUrl();
    setPreviewLogo(jpegDataUrl);
    setBrandLogo(jpegDataUrl);
    setBrandInfo('Alignex', 'AI Career Consulting CRM');
    setInputBrandName('Alignex');
    setInputBrandTagline('AI Career Consulting CRM');
    setSelectedFile(null);
    setIsConfirmed(true);
    addToast('success', 'Official Alignex Logo Applied', 'Saved and locked the permanent Alignex logo across all surfaces.');
  };

  const handleDownloadAlignexJpeg = () => {
    const jpegDataUrl = getAlignexJpegDataUrl();
    const link = document.createElement('a');
    link.href = jpegDataUrl;
    link.download = 'alignex-logo.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('info', 'Download Started', 'Downloaded official alignex-logo.jpeg');
  };

  const handleSaveBrand = () => {
    if (previewLogo) {
      setBrandLogo(previewLogo);
    }
    setBrandInfo(inputBrandName.trim() || 'Alignex', inputBrandTagline.trim() || 'AI Career Consulting CRM');
    setIsConfirmed(true);
    addToast('success', 'Logo & Branding Confirmed', 'Alignex brand logo and details are permanently saved.');
  };

  const handleRemoveLogo = () => {
    const defaultLogo = DEFAULT_ALIGNEX_LOGO_SVG_URI;
    setBrandLogo(defaultLogo);
    setPreviewLogo(defaultLogo);
    setSelectedFile(null);
    setIsConfirmed(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    addToast('info', 'Logo Reset', 'Reset to official permanent Alignex brand mark.');
  };

  const handleResetData = async () => {
    await resetToDemoData();
    setIsResetConfirmOpen(false);
    addToast('success', 'System Reset', 'Restored pristine executive demo records.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Breadcrumb & Navigation Pointer */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition group"
          id="admin-back-to-dashboard-btn"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-teal-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Admin Portal // Sovereign Workspace
        </span>
      </div>

      {/* Admin Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Enterprise Admin & Brand Studio
              </span>
              <span className="text-xs text-slate-400 font-mono">v1.2</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Workspace Administration & Custom Branding
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Upload your company or personal consulting brand logo. Once confirmed, the logo stays permanently applied across your sidebar, navigation, proposals, and resume exports.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={exportEntireBackupJSON}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Export Full Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Logo & Brand Identity Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Logo Upload & Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-teal-400" />
                Permanent Brand Logo & Identity
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official Alignex brand mark with platinum letterforms and golden apex spear.
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved Permanently</span>
            </span>
          </div>

          {/* Quick Preset Actions Bar */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">
                Official Alignex Brand Asset:
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleApplyOfficialAlignexJpeg}
                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Official Logo</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAlignexJpeg}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                title="Download the Alignex JPEG image file"
              >
                <Download className="w-3.5 h-3.5 text-teal-400" />
                <span>Download JPEG</span>
              </button>
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
              isDragOver
                ? 'border-teal-400 bg-teal-500/10 scale-[0.99]'
                : previewLogo
                ? 'border-slate-700 bg-slate-950/60 hover:border-teal-500/60'
                : 'border-slate-800 hover:border-teal-500/50 bg-slate-950/40 hover:bg-slate-950/70'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              className="hidden"
            />

            {previewLogo ? (
              <div className="space-y-3 flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={previewLogo}
                    alt="Logo Preview"
                    className="w-24 h-24 object-contain rounded-xl bg-slate-900 border-2 border-teal-500/40 p-2 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-xl bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold text-white transition-opacity">
                    Change Logo
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {selectedFile?.name || 'Current Uploaded Brand Logo'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {selectedFile ? `${Math.round(selectedFile.size / 1024)} KB` : 'Persisted in Local Storage'}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag & drop logo image
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports PNG, JPG, WebP, SVG up to 5MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Brand Name & Tagline Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Brand / Organization Name
              </label>
              <input
                type="text"
                value={inputBrandName}
                onChange={(e) => {
                  setInputBrandName(e.target.value);
                  setIsConfirmed(false);
                }}
                placeholder="e.g., ALIGNEX or Your Brand"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Brand Tagline
              </label>
              <input
                type="text"
                value={inputBrandTagline}
                onChange={(e) => {
                  setInputBrandTagline(e.target.value);
                  setIsConfirmed(false);
                }}
                placeholder="e.g., AI Career Consulting CRM"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleSaveBrand}
              id="confirm-save-logo-btn"
              className="flex-1 py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-teal-500/10 cursor-pointer"
            >
              {isConfirmed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Logo Confirmed & Stays Active</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Save Logo</span>
                </>
              )}
            </button>

            {previewLogo && (
              <button
                onClick={handleRemoveLogo}
                className="py-2.5 px-4 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Logo</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Multi-Surface Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              Live Brand Previews
            </h3>
            <span className="text-[11px] text-teal-400 font-mono">Realtime Sync</span>
          </div>

          {/* Preview 1: Sidebar Brand Header */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              1. Sidebar Header Surface
            </span>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
              {previewLogo ? (
                <img
                  src={previewLogo}
                  alt="Preview"
                  className="w-8 h-8 rounded-lg object-contain bg-slate-900 border border-teal-500/40 p-0.5 shadow-sm shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-black text-sm shrink-0">
                  AX
                </div>
              )}
              <div className="min-w-0">
                <h4 className="font-bold text-white text-sm leading-none truncate">
                  {inputBrandName || 'ALIGNEX'}
                </h4>
                <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider truncate block mt-0.5">
                  {inputBrandTagline || 'AI Career Consulting CRM'}
                </span>
              </div>
            </div>
          </div>

          {/* Preview 2: Top Navigation Header */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              2. Top Header & Title Surface
            </span>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {previewLogo && (
                  <img
                    src={previewLogo}
                    alt="Mini"
                    className="w-5 h-5 rounded object-contain"
                  />
                )}
                <span className="font-bold text-white">{inputBrandName || 'ALIGNEX'}</span>
                <span className="text-slate-500">/</span>
                <span className="text-teal-400 font-medium">Command Center</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 text-[10px] font-semibold">
                Active
              </span>
            </div>
          </div>

          {/* Preview 3: Official Document & Quotation Badge */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              3. Proposal & Quotation Header
            </span>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="Doc Logo"
                      className="w-6 h-6 rounded object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-teal-500/20 text-teal-400 font-bold text-xs flex items-center justify-center">
                      AX
                    </div>
                  )}
                  <span className="font-bold text-xs text-white">{inputBrandName || 'ALIGNEX'}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">₹1Cr+ Advisory</span>
              </div>
              <div className="text-[11px] text-slate-300">
                <strong>Client:</strong> Tier-1 Tech Firm • <strong>Target:</strong> {masterMemory.targetProfile.targetRole}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Workspace Data Health & Management */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-400" />
            Workspace Records & Storage Health
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diagnostic breakdown of all local IndexedDB records stored securely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">Timeline Roles</span>
            <span className="text-lg font-black text-teal-400 mt-0.5 block">{careerTimeline.length}</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">CAR Stories</span>
            <span className="text-lg font-black text-teal-400 mt-0.5 block">{carStories.length}</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">Target Leads</span>
            <span className="text-lg font-black text-sky-400 mt-0.5 block">{leads.length}</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">Contacts</span>
            <span className="text-lg font-black text-sky-400 mt-0.5 block">{contacts.length}</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">Active Apps</span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">{applications.length}</span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block">Proposals</span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">{quotations.length}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IndexedDB Sovereignty: Local Data Protection Active</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/30 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Seed Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Reset Workspace Data?</h3>
                <span className="text-xs text-slate-400">This will reload pristine executive demo data</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              All custom modifications will be refreshed with the default ₹1Cr+ Engineering Leader template. Export a backup beforehand if you wish to preserve existing changes.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-slate-950 rounded-xl text-xs font-bold transition shadow-lg shadow-red-500/20"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
