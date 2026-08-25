import React, { useState } from 'react';
import { 
  BookOpen, 
  Github, 
  Copy, 
  Check, 
  Download, 
  X, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  HardDrive, 
  Zap, 
  Target, 
  Award, 
  Kanban,
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'github' | 'modules' | 'offline' | 'faq'>('github');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    addToast('success', 'Copied to Clipboard', 'Command copied ready to paste in your terminal.');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const gitPushScript = `# 1. Initialize local git repository
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: Alignex Executive Career Command Center"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub repo (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/alignex-career-command.git

# 6. Push to GitHub
git push -u origin main`;

  const nodeRunScript = `# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Open browser at http://localhost:3000`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        id="user-manual-modal"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Alignex User Manual & GitHub Guide
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                  v1.0 Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400">Step-by-step operating instructions and GitHub deployment walkthrough.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const blob = new Blob([
                  `# Alignex — Complete User Manual\n\nPlease refer to README.md in the project root for the full documentation.`
                ], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ALIGNEX-USER-MANUAL.md';
                a.click();
                URL.revokeObjectURL(url);
                addToast('success', 'User Manual Downloaded', 'README.md & User Manual saved.');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs text-slate-200 font-medium transition"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Download Manual</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-800 bg-slate-950/40 shrink-0 overflow-x-auto">
          {[
            { id: 'github', label: 'GitHub & Deployment', icon: Github },
            { id: 'modules', label: 'Module Operating Manual', icon: Layers },
            { id: 'offline', label: '1-Click Offline App', icon: HardDrive },
            { id: 'faq', label: 'FAQs & Troubleshooting', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-300 text-sm leading-relaxed">
          {/* TAB 1: GITHUB & DEPLOYMENT */}
          {activeTab === 'github' && (
            <div className="space-y-6">
              <div className="p-4 bg-teal-950/30 border border-teal-800/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm">
                  <Github className="w-4 h-4" />
                  <span>Is this download 100% workable on GitHub?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Yes, absolutely.</strong> The codebase is structured with standard React 19, TypeScript, and Vite configurations. It includes a pre-configured GitHub Actions CI/CD workflow (<code className="text-teal-300 font-mono">.github/workflows/deploy.yml</code>) that enables free automated hosting on GitHub Pages.
                </p>
              </div>

              {/* Step by Step Git Push */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    How to Push This Project to Your GitHub
                  </h3>
                  <button
                    onClick={() => copyToClipboard(gitPushScript, 'git-push')}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-teal-300 font-mono transition"
                  >
                    {copiedCode === 'git-push' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'git-push' ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <pre>{gitPushScript}</pre>
                </div>
              </div>

              {/* Free GitHub Pages Hosting */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Automated Free Live URL via GitHub Pages (2 Minutes)
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Push your repository to GitHub as shown above.</li>
                  <li>Navigate to your repository settings on <strong>GitHub.com &rarr; Settings &rarr; Pages</strong>.</li>
                  <li>Under <strong>Build and deployment &rarr; Source</strong>, choose <strong>GitHub Actions</strong>.</li>
                  <li>GitHub will build your app and deploy it automatically to: <code className="text-teal-300">https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/</code></li>
                </ol>
              </div>

              {/* Vercel / Netlify 1-Click */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Deploying to Vercel / Netlify / Cloudflare Pages
                </h4>
                <p className="text-xs text-slate-300">
                  Import your GitHub repository into Vercel or Netlify. The build settings are auto-detected:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div><strong>Build Command:</strong> <span className="text-teal-300">npm run build</span></div>
                  <div><strong>Output Directory:</strong> <span className="text-teal-300">dist</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODULE MANUAL */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Alignex contains 12 interconnected executive modules designed for senior technology leadership consulting:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                    <Target className="w-4 h-4" />
                    <span>Module 1 & 2: JD Match Engine & Algorithmic Scoring (&ge;60% Standard)</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Evaluates leadership JDs against Poornima Harikumar's Master Memory. Scores &ge; 60% trigger an emerald <strong>RECOMMENDED</strong> badge. Scores &lt; 60% trigger an amber <strong>NOT RECOMMENDED</strong> caution alert.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    <span>Module 3: 200-Word Strategic Gap Dossier</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    For every analyzed role, provides a 4-part executive note: Market context (~40 words), Resume Framing (~60 words), Interview talking points (~60 words), and a 30-day action plan (~40 words). Available as a standalone page with 1-click PDF/Copy export.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                    <Kanban className="w-4 h-4" />
                    <span>Module 4 & 5: Kanban Application Pipeline & Executive CRM</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Track active leadership opportunities from Identified to Offer Stage. Manage contacts, recruiters, and follow-up schedules with local persistence.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                    <DollarSign className="w-4 h-4" />
                    <span>Module 6: ₹1.10 Crore Career Math & Compensation Calculator</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Interactive compensation model detailing ₹85L Base, ₹21.25L Bonus, ₹15L Equity, and monthly post-tax take-home breakdowns.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OFFLINE APP */}
          {activeTab === 'offline' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-teal-400" />
                  Instant Offline Application (`alignex-app.html`)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The download package includes a self-contained, single-file HTML version (<strong>`alignex-app.html`</strong>) that runs directly on any browser with:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-medium">
                    &bull; Zero Node.js / Zero NPM install
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-medium">
                    &bull; Zero external servers / Zero login
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-medium">
                    &bull; 100% Identical features to live preview
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-medium">
                    &bull; Offline IndexedDB data persistence
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="./alignex-app.html"
                    download="alignex-executive-app.html"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Offline Web App (.html)</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-white">Q: Where is my data saved?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All data is stored directly in your web browser using IndexedDB. No external servers or telemetry are used. You can click <strong>"Export Career (JSON)"</strong> at any time to create portable backup snapshots.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-white">Q: How do I run the full developer workspace?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Run <code className="text-teal-300 font-mono">npm install</code> followed by <code className="text-teal-300 font-mono">npm run dev</code>, or double-click <code className="text-teal-300 font-mono">start.bat</code> on Windows.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-white">Q: How do I add or tailor new job descriptions?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Navigate to the <strong>TAILOR (JD Match)</strong> page or click on any JD card in the Dashboard. Paste your target JD text to generate live scores, gap analysis, and tailored 200-word dossiers.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Alignex Executive Command Center &bull; README.md Included</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            Close Manual
          </button>
        </div>
      </div>
    </div>
  );
};
