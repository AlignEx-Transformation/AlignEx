import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Users, 
  Building2, 
  MessageSquare, 
  Clock, 
  UserCheck, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const NetworkingPage: React.FC = () => {
  const { contacts, masterMemory, askAgent, isAiLoading, addToast } = useApp();

  const [targetCategory, setTargetCategory] = useState<'Recruiters' | 'Hiring Managers' | 'Referrers' | 'Alumni'>('Hiring Managers');
  const [personName, setPersonName] = useState('Vikramaditya Sengupta');
  const [personRole, setPersonRole] = useState('Managing Director & Head of GCC Engineering');
  const [personCompany, setPersonCompany] = useState('Goldman Sachs');
  const [whyPerson, setWhyPerson] = useState('Overseeing the Hyderabad Core Engineering expansion');
  const [whyNow, setWhyNow] = useState('Goldman Sachs recently announced 800+ headcount scale in India');
  const [whatRelevant, setWhatRelevant] = useState('My track record in 4.5M TPS zero-downtime banking migration and FinOps telemetry');

  const [connectionNote, setConnectionNote] = useState('');
  const [inMailMessage, setInMailMessage] = useState('');
  const [followUpDay3, setFollowUpDay3] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerateOutreach = async () => {
    try {
      const prompt = `As NETWORKER Agent, generate high-conversion, executive-grade networking outreach for:
Recipient: ${personName} (${personRole} at ${personCompany})
Category: ${targetCategory}
Why Person: ${whyPerson}
Why Now: ${whyNow}
Candidate Grounding: ${masterMemory.identity.fullName}, Target Role: ${masterMemory.targetProfile.targetRole}, Proven Evidence: ${whatRelevant}

Generate 3 crisp deliverables:
1. LinkedIn Connection Request (STRICTLY under 280 characters, punchy, mutual benefit, no spam).
2. Executive InMail / Email Message (150-200 words, executive brevity, value hypothesis, clear low-friction call-to-conversation).
3. Day-4 Follow-Up Sequence (Brief 50-word frictionless check-in with added insight).`;

      const res = await askAgent('NETWORKER', prompt);

      // Parse or set
      setInMailMessage(res);
      setConnectionNote(`Hi ${personName.split(' ')[0]}, saw Goldman Sachs' engineering expansion in Hyderabad. Given my leadership in 4.5M TPS zero-downtime banking systems, I'd love to connect and share notes on enterprise platform scale.`);
      setFollowUpDay3(`Hi ${personName.split(' ')[0]}, quick follow-up on my note. I put together a 1-page architecture summary on FinOps telemetry for core banking that might interest your leadership team. Happy to share if helpful.`);

      addToast({ title: 'Executive Outreach Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast({ title: 'Copied to clipboard', type: 'success' });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Send className="w-6 h-6 text-teal-400" />
            Executive Networking & Direct Outreach Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            NETWORKER Agent: Craft peer-to-peer, high-conversion outreach to decision makers with zero generic fluff.
          </p>
        </div>

        <button
          onClick={handleGenerateOutreach}
          disabled={isAiLoading}
          id="generate-outreach-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAiLoading ? 'Synthesizing...' : 'Generate Executive Scripts'}</span>
        </button>
      </div>

      {/* Target Category Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {(['Recruiters', 'Hiring Managers', 'Referrers', 'Alumni'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setTargetCategory(cat)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              targetCategory === cat
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* 2 Column Layout: Inputs vs Generated Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Context & Person Details */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            Decision Maker Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Recipient Name</label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Company</label>
              <input
                type="text"
                value={personCompany}
                onChange={(e) => setPersonCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Recipient Role / Designation</label>
            <input
              type="text"
              value={personRole}
              onChange={(e) => setPersonRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-teal-400">1. Why this specific person?</label>
            <textarea
              rows={2}
              value={whyPerson}
              onChange={(e) => setWhyPerson(e.target.value)}
              placeholder="e.g. Leads the platform engineering group in India"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sky-400">2. Why right now? (The Trigger Event)</label>
            <textarea
              rows={2}
              value={whyNow}
              onChange={(e) => setWhyNow(e.target.value)}
              placeholder="e.g. Recent funding announcement, aggressive GCC expansion, tech migration"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-emerald-400">3. What is relevant to them?</label>
            <textarea
              rows={2}
              value={whatRelevant}
              onChange={(e) => setWhatRelevant(e.target.value)}
              placeholder="e.g. Proven 4.5M TPS migration and $450K FinOps savings"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
        </div>

        {/* Right Column: Generated Message Templates */}
        <div className="space-y-4">
          {/* 1. Connection Request (300 char limit) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal-400 block">
                  1. LinkedIn Connection Request
                </span>
                <span className="text-[10px] text-slate-400">
                  Strict &lt; 300 Characters limit
                </span>
              </div>

              <button
                onClick={() => handleCopy('conn', connectionNote || `Hi ${personName.split(' ')[0]}, saw Goldman Sachs' engineering expansion. Given my leadership in 4.5M TPS zero-downtime banking systems, I'd love to connect and share notes on enterprise platform scale.`)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {copiedKey === 'conn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-850 leading-relaxed font-sans select-all">
              {connectionNote || `Hi ${personName.split(' ')[0]}, saw Goldman Sachs' engineering expansion in Hyderabad. Given my leadership in 4.5M TPS zero-downtime banking systems, I'd love to connect and share notes on enterprise platform scale.`}
            </p>
          </div>

          {/* 2. Executive InMail / Pitch Script */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-400 block">
                  2. Executive InMail / Email Sequence
                </span>
                <span className="text-[10px] text-slate-400">
                  Value hypothesis + frictionless ask
                </span>
              </div>

              <button
                onClick={() => handleCopy('inmail', inMailMessage || `Hi ${personName.split(' ')[0]},\n\nI noticed your leadership driving ${personCompany}'s GCC engineering roadmap. With your recent focus on large-scale infrastructure, I wanted to reach out.\n\nOver the past 5 years, I've led platform engineering teams through zero-downtime banking migrations handling 4.5M TPS while reducing infrastructure compute costs by $450K.\n\nI've assembled a concise 1-page architecture brief on high-throughput FinOps that aligns with what your team is scaling.\n\nWould you be open to a brief 10-minute exchange next Tuesday or Wednesday?`)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {copiedKey === 'inmail' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            <div className="text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-850 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto select-all">
              {inMailMessage || `Hi ${personName.split(' ')[0]},\n\nI noticed your leadership driving ${personCompany}'s GCC engineering roadmap. With your recent focus on large-scale infrastructure, I wanted to reach out.\n\nOver the past 5 years, I've led platform engineering teams through zero-downtime banking migrations handling 4.5M TPS while reducing infrastructure compute costs by $450K.\n\nI've assembled a concise 1-page architecture brief on high-throughput FinOps that aligns with what your team is scaling.\n\nWould you be open to a brief 10-minute exchange next Tuesday or Wednesday?`}
            </div>
          </div>

          {/* 3. Day 4 Follow-up */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 block">
                  3. Day-4 Non-Intrusive Follow-Up
                </span>
                <span className="text-[10px] text-slate-400">
                  Value-add check-in
                </span>
              </div>

              <button
                onClick={() => handleCopy('fup', followUpDay3 || `Hi ${personName.split(' ')[0]}, quick follow-up on my note. I put together a 1-page architecture summary on FinOps telemetry for core banking that might interest your leadership team. Happy to share if helpful.`)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
              >
                {copiedKey === 'fup' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-850 leading-relaxed select-all">
              {followUpDay3 || `Hi ${personName.split(' ')[0]}, quick follow-up on my note. I put together a 1-page architecture summary on FinOps telemetry for core banking that might interest your leadership team. Happy to share if helpful.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
