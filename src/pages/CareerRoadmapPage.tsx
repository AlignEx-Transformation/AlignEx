import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Zap,
  Target,
  ShieldAlert
} from 'lucide-react';

export const CareerRoadmapPage: React.FC = () => {
  const { masterMemory, setCurrentPage } = useApp();

  const [activeTab, setActiveTab] = useState<'math' | 'mindset' | 'situations' | 'brutal-truth' | 'time-comparison'>('math');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-teal-400" />
            The Career Math Guide to ₹1Cr+
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            The strategic playbook, mathematical trajectory, mindset shifts, and diagnosis for joining the ₹1 Crore Club.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('negotiator')}
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <span>Compensation Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'math' as const, label: '1. Strategic Math' },
          { id: 'mindset' as const, label: '2. 7 Mindset Shifts' },
          { id: 'situations' as const, label: '3. 7 Career Situations' },
          { id: 'brutal-truth' as const, label: '4. The Brutal Truth' },
          { id: 'time-comparison' as const, label: '5. 43h vs 4.5h AI Math' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. The Strategic Math */}
      {activeTab === 'math' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-2 text-center">
              <span className="text-3xl font-black text-teal-400 font-mono">15–20</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Career Years Left</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your prime high-earning years are finite. Every year spent in an under-monetized role has an enormous compounding opportunity cost.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-2 text-center">
              <span className="text-3xl font-black text-sky-400 font-mono">2–3</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Years Per Switch</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The optimal velocity for title & CTC compounding. Staying beyond 3.5 years in one band reduces your career CAGR by 40%.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-2 text-center">
              <span className="text-3xl font-black text-emerald-400 font-mono">5–7</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Moves</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You only need 5 to 7 high-conviction moves in your lifetime to transition from ₹35L to ₹1Cr+ executive compensation.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">The Compounding Progression Model</h3>
            <div className="space-y-3">
              {[
                { stage: 'Move 1 (Foundation)', role: 'Lead Architect / Senior Manager', ctc: '₹45L – ₹60L', focus: 'Deep domain mastery, zero-downtime execution, team mentorship' },
                { stage: 'Move 2 (Scale)', role: 'Director of Engineering', ctc: '₹75L – ₹95L', focus: 'Multi-team leadership, FinOps cloud governance, business alignment' },
                { stage: 'Move 3 (Executive ₹1Cr+)', role: 'Senior Director / VP of Engineering', ctc: '₹1.1Cr – ₹1.6Cr', focus: 'Organizational P&L, enterprise transformation, board presence' },
                { stage: 'Move 4 (Compounding)', role: 'Head of GCC / Global VP', ctc: '₹1.8Cr – ₹2.5Cr+', focus: 'Global strategy, equity vesting, advisory retainers' }
              ].map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                        {m.stage}
                      </span>
                      <h4 className="text-sm font-bold text-white">{m.role}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{m.focus}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-emerald-400 font-mono">{m.ctc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. The 7 Mindset Shifts */}
      {activeTab === 'mindset' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { shift: 'Shift 1: From "Applicant" to "Consultative Problem Solver"', desc: 'Stop sending generic resumes to public portals. Build WIN presentations that diagnose the company\'s business bottlenecks and propose 90-day execution remedies.' },
            { shift: 'Shift 2: From "Effort" to "Quantified Metric Evidence"', desc: 'Nobody pays ₹1Cr for hard work; they pay for risk reduction and revenue leverage. Anchor every story in TPS, MTTR, $ saved, and headcount scaled.' },
            { shift: 'Shift 3: From "Waiting for Openings" to "Direct Ingress Boolean X-Ray"', desc: '80% of executive roles are never posted on standard portals. Use Google X-Ray and direct ATS footprint queries to find hiring managers directly.' },
            { shift: 'Shift 4: From "Accepting First Offer" to "5-Tier Multi-Offer Bidding"', desc: 'Never reveal your current CTC early. Anchor in the upper 10th percentile and leverage multiple pipeline opportunities simultaneously.' },
            { shift: 'Shift 5: From "Generalist Manager" to "High-Def Niche Authority"', desc: 'Generalists get commoditized; specialized leaders who solve high-throughput FinOps or banking migrations command 40% salary premiums.' },
            { shift: 'Shift 6: From "Reactive Job Hunting" to "Continuous Career Intelligence"', desc: 'Maintain an active Master Career Memory with updated CAR stories and warm decision maker contacts even when happily employed.' },
            { shift: 'Shift 7: From "Token-Heavy Fluff" to "Local Sovereign Precision"', desc: 'Use token-optimized, ground-truth local memory. Master your data sovereignty without relying on expensive monthly SaaS subscriptions.' }
          ].map((s, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                MINDSET SHIFT 0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-white">{s.shift}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3. 7 Career Situations Diagnosis */}
      {activeTab === 'situations' && (
        <div className="space-y-4">
          {[
            { title: 'Situation 1: The Underpaid High-Performer', diagnosis: 'You deliver high-impact systems but get 6-8% internal annual increments while new lateral hires make 40% more.', remedy: 'Extract your top 3 CAR stories with hard metrics, update your Master Resume, and run Boolean search for Tier 1 GCCs.' },
            { title: 'Situation 2: The Plateaued Engineering Manager', diagnosis: 'Stuck managing 10-15 engineers without a clear path to Director or VP level.', remedy: 'Adopt the PITCHER framework: build a WIN deck on organizational FinOps and cross-regional engineering scaling.' },
            { title: 'Situation 3: The Tech Stack Transitioner', diagnosis: 'Experienced in legacy monoliths but targeting high-paying distributed cloud / AI infrastructure roles.', remedy: 'Position your foundational distributed systems and concurrency expertise while highlighting rapid hands-on cloud migration achievements.' },
            { title: 'Situation 4: The Out-of-Touch Executive', diagnosis: 'Haven\'t interviewed in 5+ years and nervous about modern Bar Raiser behavioral rigor.', remedy: 'Simulate 10 Bar Raiser rounds in the ALIGNEX Interviewer engine with strict CAR timing adherence.' }
          ].map((sit, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  DIAGNOSIS #{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white">{sit.title}</h4>
              </div>
              <p className="text-xs text-slate-400"><strong className="text-slate-300">Symptom:</strong> {sit.diagnosis}</p>
              <p className="text-xs text-teal-400"><strong className="text-teal-300">ALIGNEX Remedy:</strong> {sit.remedy}</p>
            </div>
          ))}
        </div>
      )}

      {/* 4. The Brutal Truth */}
      {activeTab === 'brutal-truth' && (
        <div className="bg-slate-900/90 border border-red-500/30 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>The Brutal Mathematical Reality of Tech Compensation</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong>1. Portals are designed for volume, not leadership:</strong> Sending 200 applications through one-click job boards has an average response rate of &lt; 2%. Executive roles above ₹75L are filled through direct talent pipelines, executive search, and proactive networking.
            </p>
            <p>
              <strong>2. Companies have budget bands:</strong> The difference between a ₹60L offer and a ₹95L offer is almost NEVER the budget—it is the candidate's perceived leverage, structural clarity, and negotiation anchoring.
            </p>
            <p>
              <strong>3. Time is your enemy:</strong> Delaying a strategic move by 2 years costs you over ₹40,00,000 in lost compounding compensation and delayed equity vesting.
            </p>
          </div>
        </div>
      )}

      {/* 5. 43h vs 4.5h AI Math */}
      {activeTab === 'time-comparison' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white">Weekly Time Investment Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="bg-slate-950/80 border border-red-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-400 uppercase">Traditional Job Search</span>
                <span className="text-xl font-black text-red-400 font-mono">43.5 hrs/week</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Manual job board scrolling: 12 hrs</li>
                <li>• Rewriting resumes manually for each JD: 10 hrs</li>
                <li>• Generic LinkedIn outreach with 3% reply rate: 8 hrs</li>
                <li>• Unstructured interview prep: 8 hrs</li>
                <li>• Hesitant compensation guessing: 5.5 hrs</li>
              </ul>
            </div>

            {/* ALIGNEX AI */}
            <div className="bg-slate-950/80 border border-teal-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 uppercase">ALIGNEX AI Command Center</span>
                <span className="text-xl font-black text-teal-300 font-mono">4.5 hrs/week</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Boolean X-Ray direct ATS ingress: 45 mins</li>
                <li>• 1-Click TAILOR ATS Match with Master Memory: 30 mins</li>
                <li>• High-conversion consultative outreach: 45 mins</li>
                <li>• Grounded Bar Raiser mock simulations: 1.5 hrs</li>
                <li>• Algorithmic ₹1Cr negotiation modeling: 1 hr</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
