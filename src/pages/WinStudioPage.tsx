import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Presentation, 
  Sparkles, 
  Copy, 
  Download, 
  Check, 
  Building2, 
  ArrowRight, 
  Layers, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const WinStudioPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast } = useApp();

  const [companyName, setCompanyName] = useState('Goldman Sachs (India GCC)');
  const [targetRole, setTargetRole] = useState('Director of Core Engineering');
  const [businessProblem, setBusinessProblem] = useState('Rapid 800+ engineer scaling resulting in cloud infrastructure cost sprawl, fragmented telemetry observability, and cross-team deployment bottlenecks.');
  const [strategicOpportunity, setStrategicOpportunity] = useState('Establish unified platform engineering standards, container autoscaling governance, and automated FinOps telemetry to trim 25%+ compute waste.');
  const [proposedSolution, setProposedSolution] = useState('Deploy standardized multi-region Kubernetes infrastructure blueprints with OpenTelemetry metrics and zero-trust CI/CD deployment pipelines.');

  const [winDeckMarkdown, setWinDeckMarkdown] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerateWinDeck = async () => {
    try {
      const prompt = `As PITCHER Agent, generate a high-impact, consultative WIN Presentation Deck:
Company: ${companyName}
Target Role: ${targetRole}
Identified Business Problem: ${businessProblem}
Strategic Opportunity: ${strategicOpportunity}
Proposed Solution: ${proposedSolution}
Presenter Grounding: ${masterMemory.identity.fullName}, Target: ${masterMemory.targetProfile.targetRole}, Proven Evidence: ${masterMemory.carStories.map(c => c.title).join(' | ')}

Structure the WIN Deck across 6 high-conviction slides:
Slide 1: Executive Context & 2025 Industry Inflection Point
Slide 2: The Core Friction: Anatomy of the Identified Bottleneck
Slide 3: Strategic Opportunity & Financial Downside of Status Quo
Slide 4: The 90-Day Execution Blueprint & Architectural Remedy
Slide 5: Measurable Business ROI (Cost, MTTR, Developer Velocity)
Slide 6: Why This Candidate: Proven Track Record (Ground in 4.5M TPS, $450K FinOps savings).

Make each slide crisp, metric-heavy, and consultative.`;

      const response = await askAgent('PITCHER', prompt);
      setWinDeckMarkdown(response);
      addToast({ title: 'WIN Presentation Deck Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(winDeckMarkdown);
    setCopied(true);
    addToast({ title: 'Deck copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([winDeckMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WIN_Presentation_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded WIN Deck Markdown', type: 'success' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Presentation className="w-6 h-6 text-teal-400" />
            WIN Studio — Problem-Solver Decks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            PITCHER Agent: Shift from applicant to trusted advisor by presenting proactive solutions to the hiring manager's exact business headaches.
          </p>
        </div>

        <button
          onClick={handleGenerateWinDeck}
          disabled={isAiLoading}
          id="generate-win-deck-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAiLoading ? 'Building Deck...' : 'Generate WIN Deck'}</span>
        </button>
      </div>

      {/* 2 Column Layout: Inputs vs Generated Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 5 Stage Formulation Inputs */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Strategic Deck Parameters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Company *</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Role *</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-amber-400">1. Real Business Problem / Headaches *</label>
            <textarea
              rows={3}
              value={businessProblem}
              onChange={(e) => setBusinessProblem(e.target.value)}
              placeholder="What is slowing them down or costing them millions?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sky-400">2. Strategic Opportunity *</label>
            <textarea
              rows={3}
              value={strategicOpportunity}
              onChange={(e) => setStrategicOpportunity(e.target.value)}
              placeholder="What upside will unlocking this problem deliver?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-emerald-400">3. Your Tailored Solution & Architecture *</label>
            <textarea
              rows={3}
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              placeholder="How would you lead and execute this transformation in 90 days?"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Generated WIN Presentation Deck */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Presentation className="w-4 h-4 text-teal-400" />
              Generated WIN Deck (6 Slides)
            </span>

            {winDeckMarkdown && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {winDeckMarkdown ? (
              <div className="prose prose-invert prose-xs max-w-none prose-h1:text-base prose-h1:text-white prose-h2:text-xs prose-h2:text-teal-400 prose-h3:text-xs prose-hr:border-slate-800">
                <ReactMarkdown>{winDeckMarkdown}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                <Presentation className="w-10 h-10 text-slate-600" />
                <p className="text-xs">
                  Fill in the business problem parameters on the left and click <strong>"Generate WIN Deck"</strong> to assemble an executive problem-solver presentation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
