import React from 'react';
import { useApp } from '../../context/AppContext';
import { AGENT_DEFINITIONS } from '../../ai/agents';
import { AgentType } from '../../types/ai';
import { 
  Sparkles, 
  Crosshair, 
  Compass, 
  Users, 
  FileCheck, 
  TrendingUp, 
  Presentation, 
  Mic, 
  DollarSign,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Crosshair,
  Compass,
  Users,
  FileCheck,
  TrendingUp,
  Presentation,
  Mic,
  DollarSign
};

export const AgentGrid: React.FC = () => {
  const { setCurrentPage } = useApp();

  const agentKeys: AgentType[] = [
    'HUNTER',
    'NAVIGATOR',
    'NOVA',
    'NETWORKER',
    'TAILOR',
    'INFLUENCER',
    'PITCHER',
    'INTERVIEWER',
    'NEGOTIATOR'
  ];

  const handleAgentClick = (agent: AgentType) => {
    switch (agent) {
      case 'NOVA': setCurrentPage('ai-assistant'); break;
      case 'HUNTER': setCurrentPage('job-search'); break;
      case 'NAVIGATOR': setCurrentPage('career-profile'); break;
      case 'NETWORKER': setCurrentPage('networking'); break;
      case 'TAILOR': setCurrentPage('tailor'); break;
      case 'INFLUENCER': setCurrentPage('influencer'); break;
      case 'PITCHER': setCurrentPage('win-studio'); break;
      case 'INTERVIEWER': setCurrentPage('interviewer'); break;
      case 'NEGOTIATOR': setCurrentPage('negotiator'); break;
      default: setCurrentPage('ai-assistant');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            The 9 Specialized AI Career Agents
          </h3>
          <p className="text-xs text-slate-400">
            Dedicated execution engines operating on local career memory chunks with low-token consumption.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {agentKeys.map((key) => {
          const agent = AGENT_DEFINITIONS[key];
          const Icon = ICON_MAP[agent.iconName] || Sparkles;

          return (
            <div
              key={key}
              onClick={() => handleAgentClick(key)}
              id={`agent-card-${key.toLowerCase()}`}
              className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 p-4 rounded-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${agent.color}15`, color: agent.color, border: `1px solid ${agent.color}35` }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    {agent.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-1.5">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                    {agent.tagline}
                  </p>
                </div>

                <div className="space-y-1 pt-1">
                  {agent.capabilities.slice(0, 2).map((cap, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-teal-400 group-hover:text-teal-300">
                <span>Launch {agent.name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
