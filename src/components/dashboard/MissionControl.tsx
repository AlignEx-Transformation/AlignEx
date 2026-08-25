import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Crosshair, Mic, ChevronRight, CheckCircle2 } from 'lucide-react';

export const MissionControl: React.FC = () => {
  const { setCurrentPage } = useApp();

  const phases = [
    {
      phase: 'DAY 1–7',
      title: 'Foundation & Evidence Core',
      agents: ['Navigator', 'Tailor'],
      items: ['Niche & Role Clarity', 'Master Resume Engine', 'CAR Evidence Lab', 'Target Benchmarks'],
      icon: Compass,
      color: 'border-teal-500/30 bg-teal-950/20 text-teal-400',
      actionPage: 'career-evidence' as const,
      actionText: 'Refine Evidence'
    },
    {
      phase: 'DAY 7–21',
      title: 'Outreach, WIN & Authority',
      agents: ['Hunter', 'Networker', 'Influencer', 'Pitcher'],
      items: ['Boolean Search Discovery', 'Decision Maker Mapping', 'WIN Presentation Studio', 'LinkedIn Positioning'],
      icon: Crosshair,
      color: 'border-sky-500/30 bg-sky-950/20 text-sky-400',
      actionPage: 'win-studio' as const,
      actionText: 'Open WIN Studio'
    },
    {
      phase: 'DAY 21+',
      title: 'Simulation, Close & Compounding',
      agents: ['Interviewer', 'Negotiator', 'NOVA'],
      items: ['Bar Raiser Simulations', '₹1Cr Compensation Strategy', 'Counter-Offer Scripts', 'Executive Retainers'],
      icon: Mic,
      color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
      actionPage: 'negotiator' as const,
      actionText: 'Review Strategy'
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
            Execution Blueprint
          </span>
          <h3 className="text-base font-bold text-white tracking-tight">
            THE MISSION CONTROL STACK
          </h3>
        </div>
        <button
          onClick={() => setCurrentPage('learning-path')}
          className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
        >
          View 13-Section Curriculum <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`border rounded-xl p-4 flex flex-col justify-between space-y-3 ${p.color}`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-black tracking-wider bg-slate-900/80 border border-slate-700/60 text-white">
                    {p.phase}
                  </span>
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    {p.agents.map((ag) => (
                      <span
                        key={ag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900/80 text-slate-300 font-medium"
                      >
                        {ag}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-1 text-xs text-slate-300 pt-1">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setCurrentPage(p.actionPage)}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <span>{p.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
