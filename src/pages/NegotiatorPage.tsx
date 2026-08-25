import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const NegotiatorPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast } = useApp();

  const [currentFixed, setCurrentFixed] = useState('₹45,00,000');
  const [currentTotal, setCurrentTotal] = useState('₹55,00,000');

  const [targetFixed, setTargetFixed] = useState('₹80,00,000');
  const [targetTotal, setTargetTotal] = useState(masterMemory.targetProfile.targetCompensation.target || '₹1,05,00,000');
  const [targetStocks, setTargetStocks] = useState('₹20,00,000 RSUs');
  const [signingBonus, setSigningBonus] = useState('₹10,00,000');

  const [minAcceptable, setMinAcceptable] = useState(masterMemory.targetProfile.targetCompensation.minAcceptable || masterMemory.targetProfile.targetCompensation.minimumAcceptable || '₹75,00,000');
  const [stretchGoal, setStretchGoal] = useState(masterMemory.targetProfile.targetCompensation.stretch || masterMemory.targetProfile.targetCompensation.idealOffer || '₹1,25,00,000');

  const [scriptType, setScriptType] = useState<'initial-screening' | 'counter-offer' | 'lowball' | 'walk-away'>('counter-offer');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = async () => {
    try {
      const prompt = `As NEGOTIATOR Agent (Elite ₹1Cr+ Compensation Strategist):
Generate an executive negotiation script:
Script Type: ${scriptType}
Candidate: ${masterMemory.identity.fullName}
Target Role: ${masterMemory.targetProfile.targetRole}
Current Package: ${currentTotal}
Target Package: ${targetTotal} (Fixed: ${targetFixed}, Stocks: ${targetStocks}, Signing: ${signingBonus})
Min Acceptable: ${minAcceptable}
Stretch: ${stretchGoal}
Leverage Evidence: 4.5M TPS core banking zero-downtime migration, $450K FinOps savings, 40+ engineering headcount leadership.

Provide:
1. Exact Verbatim Script to speak on the phone / video call with the Head of Talent or Hiring MD.
2. 3 Psychological Leverage Anchors (Why the company has budget flexibility).
3. The Exact Framing for Trade-Offs (If fixed is tight, expand joining bonus or annual RSUs).`;

      const res = await askAgent('NEGOTIATOR', prompt);
      setGeneratedScript(res);
      addToast({ title: 'Negotiation Strategy Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    addToast({ title: 'Script copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <DollarSign className="w-6 h-6 text-teal-400" />
            Negotiator — Compensation Strategy & ₹1Cr Blueprint
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            NEGOTIATOR Agent: Model compensation packages, anchor high in the upper 10th percentile, and capture maximum equity & fixed pay.
          </p>
        </div>

        <button
          onClick={handleGenerateScript}
          disabled={isAiLoading}
          id="generate-negotiation-script-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAiLoading ? 'Synthesizing Strategy...' : 'Generate Verbatim Script'}</span>
        </button>
      </div>

      {/* 5-Tier Compensation Architecture Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Tier 1: Current */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            1. Current Baseline
          </span>
          <h4 className="text-xl font-black text-slate-300 font-mono">
            {currentTotal}
          </h4>
          <span className="text-[11px] text-slate-500 block">Fixed: {currentFixed}</span>
        </div>

        {/* Tier 2: Min Acceptable */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
            2. Walk-Away Floor
          </span>
          <h4 className="text-xl font-black text-amber-300 font-mono">
            {minAcceptable}
          </h4>
          <span className="text-[11px] text-slate-400 block">Strict non-negotiable floor</span>
        </div>

        {/* Tier 3: Target ₹1Cr+ */}
        <div className="bg-slate-900/90 border border-teal-500/40 rounded-2xl p-4 space-y-2 relative overflow-hidden">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            3. Target Package
          </span>
          <h4 className="text-xl font-black text-teal-300 font-mono">
            {targetTotal}
          </h4>
          <span className="text-[11px] text-slate-300 block">
            Fixed {targetFixed} + {targetStocks}
          </span>
        </div>

        {/* Tier 4: Stretch */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            4. Stretch Ceiling (Top 5%)
          </span>
          <h4 className="text-xl font-black text-emerald-300 font-mono">
            {stretchGoal}
          </h4>
          <span className="text-[11px] text-slate-400 block">Multi-offer bidding war</span>
        </div>
      </div>

      {/* Script Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'initial-screening', label: '1. Initial Screening Anchor' },
          { id: 'counter-offer', label: '2. Executive Counter-Offer' },
          { id: 'lowball', label: '3. Deflecting Lowball Offer' },
          { id: 'walk-away', label: '4. Graceful Walk-Away' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setScriptType(s.id as any)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              scriptType === s.id
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* 2 Column Layout: Inputs vs Generated Script */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Financial Inputs & Leverage Checklist */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white">Negotiation Envelope Configuration</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Fixed Base CTC</label>
              <input
                type="text"
                value={targetFixed}
                onChange={(e) => setTargetFixed(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Annual Equity / RSUs</label>
              <input
                type="text"
                value={targetStocks}
                onChange={(e) => setTargetStocks(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Joining Sign-On Bonus</label>
              <input
                type="text"
                value={signingBonus}
                onChange={(e) => setSigningBonus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-teal-400">Total Target Package Valuation</label>
              <input
                type="text"
                value={targetTotal}
                onChange={(e) => setTargetTotal(e.target.value)}
                className="w-full bg-slate-950 border border-teal-500/50 rounded-xl px-3 py-2 text-xs text-teal-300 font-bold focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>
          </div>

          {/* Leverage Checklist */}
          <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-200 block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Verified Negotiation Leverage Points
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Tier 1 Banking scale experience (4.5M TPS zero-downtime)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Direct $450K annual cloud compute optimization track record</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Proven leadership over 40+ engineering headcount</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Generated Script */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-teal-400" />
              Executive Verbatim Script
            </span>

            {generatedScript && (
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Script</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-950 p-5 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            {generatedScript ? (
              <div className="prose prose-invert prose-xs max-w-none prose-h1:text-base prose-h1:text-white prose-h2:text-xs prose-h2:text-teal-400 prose-h3:text-xs prose-hr:border-slate-800">
                <ReactMarkdown>{generatedScript}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                <DollarSign className="w-10 h-10 text-slate-600" />
                <p className="text-xs">
                  Configure your package numbers on the left and click <strong>"Generate Verbatim Script"</strong> for word-for-word counter-offer scripts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
