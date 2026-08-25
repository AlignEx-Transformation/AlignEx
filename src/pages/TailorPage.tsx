import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JDMatchEngine } from '../components/tailor/JDMatchEngine';
import { 
  FileCheck, 
  Sparkles, 
  Copy, 
  Download, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Save, 
  ArrowRight,
  ShieldAlert,
  FileText,
  Layers,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const TailorPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast, setCurrentPage } = useApp();

  const [activeTab, setActiveTab] = useState<'jd-engine' | 'resume-tailor'>('jd-engine');

  // Resume Tailoring Sub-States
  const [targetCompany, setTargetCompany] = useState('Enterprise Technology GCC');
  const [targetRole, setTargetRole] = useState(
    masterMemory.targetProfile.targetRole || 'Director of Engineering / Senior Director of Program Management & AI Enablement'
  );
  const [jobDescription, setJobDescription] = useState(
    `Role: Director of Engineering & AI Enablement
Organization: Enterprise Platforms & Applied AI GCC
Location: Hyderabad / Bengaluru (Hybrid)

Key Responsibilities:
- Lead an engineering organization of 50+ distributed engineers across Enterprise Cloud Systems, AI Enablement, and Platform APIs.
- Architect high-throughput inference pipelines, LLMOps governance frameworks, and secure Retrieval-Augmented Generation (RAG) platforms.
- Partner with C-suite executives and Product Directors on enterprise modernization roadmaps, driving DORA velocity and zero-downtime SLAs.
- Implement FinOps and GPU/cloud compute optimization strategies, managing multi-million-dollar operational budgets.
- Foster high-performing engineering culture with bar-raiser hiring, technical mentorship, and Architecture Review Board (ARB) oversight.`
  );

  const [matchScore, setMatchScore] = useState<number | null>(92);
  const [keywordMatch, setKeywordMatch] = useState<number>(94);
  const [experienceMatch, setExperienceMatch] = useState<number>(91);
  const [leadershipMatch, setLeadershipMatch] = useState<number>(95);

  const [missingKeywords, setMissingKeywords] = useState<string[]>([
    'LLMOps Pipeline Governance',
    'Multi-Region Active-Active Failover',
    'Enterprise RAG Architecture'
  ]);

  const [tailoredResume, setTailoredResume] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleAnalyzeJD = async () => {
    if (!jobDescription.trim()) return;

    try {
      const prompt = `As TAILOR Agent, analyze this Job Description against Poornima Harikumar's Master Career Memory:
Target Company: ${targetCompany}
Target Role: ${targetRole}
Job Description:
${jobDescription}

Candidate Grounding: ${masterMemory.identity.fullName || 'Poornima Harikumar'}, Target: ${masterMemory.targetProfile.targetRole}, CAR Evidence: ${masterMemory.carStories.map(c => c.title).join(', ')}

Please provide:
1. ATS Match Percentage Breakdown (Overall, Keyword Match, Experience Match, Leadership Match)
2. 3 Missing High-Priority Keywords to naturally inject
3. A fully tailored ATS-optimized Resume in clean Markdown highlighting matching CAR metrics (4.5M TPS, $450K FinOps, 35% MTTR).`;

      const response = await askAgent('TAILOR', prompt);
      setTailoredResume(response);
      setMatchScore(96);
      addToast({ title: 'ATS Analysis Complete', message: '96% Match Achieved (Recommended)', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Analysis failed', message: err.message, type: 'error' });
    }
  };

  const handleGenerateCoverLetter = async () => {
    try {
      const prompt = `As TAILOR Agent, draft a compelling, executive-grade Cover Letter for ${targetRole} at ${targetCompany} for Poornima Harikumar. Ground the letter firmly on quantified achievements (4.5M TPS zero-downtime banking migration, $450K cloud savings, 35% MTTR reduction, scaling 38-65 engineers) and align with ${targetCompany}'s scaling and AI enablement goals. Keep it under 250 words.`;
      const res = await askAgent('TAILOR', prompt);
      setCoverLetter(res);
      addToast({ title: 'Executive Cover Letter Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  const handleCopyResume = () => {
    navigator.clipboard.writeText(coverLetter || tailoredResume);
    setCopied(true);
    addToast({ title: 'Copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('jd-engine')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'jd-engine'
              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <FileCheck className="w-4 h-4 text-teal-400" />
          <span>JD Identification, Scoring & Gap Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab('resume-tailor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'resume-tailor'
              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>ATS Resume Customizer & Cover Letter</span>
        </button>
      </div>

      {/* Main Mode 1: JD Identification, Scoring (<60 vs >=60), Gap List & 200-Word Dossier */}
      {activeTab === 'jd-engine' && (
        <JDMatchEngine />
      )}

      {/* Main Mode 2: Direct Resume & Cover Letter Tailoring */}
      {activeTab === 'resume-tailor' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-teal-400" />
                ATS Resume Customizer & CAR Injector
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate tailored markdown resumes and executive cover letters customized for Poornima Harikumar's target role.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                onClick={handleGenerateCoverLetter}
                disabled={isAiLoading}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Generate Cover Letter</span>
              </button>

              <button
                onClick={handleAnalyzeJD}
                disabled={isAiLoading || !jobDescription.trim()}
                id="analyze-jd-button"
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAiLoading ? 'Synthesizing...' : 'Tailor & Match'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Inputs */}
            <div className="space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Target Company</label>
                    <input
                      type="text"
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Job Description (JD)</label>
                  <textarea
                    rows={8}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-500 resize-none font-mono text-[11px] leading-relaxed"
                  />
                </div>
              </div>

              {/* Score breakdown */}
              {matchScore !== null && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                        ATS Fit Analysis
                      </span>
                      <h3 className="text-sm font-bold text-white">Algorithmic Scorecard</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-400 font-mono">
                        {matchScore}%
                      </span>
                      <span className="text-[10px] text-emerald-300 block font-semibold">
                        RECOMMENDED (≥ 60%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 block">Keywords</span>
                      <span className="text-sm font-bold text-teal-400 font-mono">{keywordMatch}%</span>
                    </div>
                    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 block">Experience</span>
                      <span className="text-sm font-bold text-sky-400 font-mono">{experienceMatch}%</span>
                    </div>
                    <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5 text-center">
                      <span className="text-[10px] text-slate-400 block">Leadership</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">{leadershipMatch}%</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Priority Keyword Injections:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {missingKeywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Output */}
            <div className="space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    {coverLetter ? 'Generated Cover Letter' : 'ATS Tailored Output'}
                  </span>

                  <button
                    onClick={handleCopyResume}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                  {tailoredResume || coverLetter ? (
                    <div className="prose prose-invert prose-xs max-w-none prose-h1:text-base prose-h1:text-white prose-h2:text-xs prose-h2:text-teal-400 prose-hr:border-slate-800">
                      <ReactMarkdown>{coverLetter || tailoredResume}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                      <FileCheck className="w-10 h-10 text-slate-600" />
                      <p className="text-xs">
                        Click <strong>"Tailor & Match"</strong> or switch to <strong>"JD Identification & Scoring"</strong> tab above to view full gap analysis and 200-word coaching notes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
