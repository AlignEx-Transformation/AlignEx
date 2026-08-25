import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Sparkles, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';

export const CareerMathTeaser: React.FC = () => {
  const { masterMemory, updateMasterMemory, setCurrentPage } = useApp();
  const [confidence, setConfidence] = useState<number>(
    masterMemory.careerGoals?.compensationTarget1CrProgress || 75
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setConfidence(val);
    updateMasterMemory(prev => ({
      ...prev,
      careerGoals: {
        ...prev.careerGoals,
        compensationTarget1CrProgress: val
      }
    }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 border border-teal-900/40 rounded-2xl p-5 space-y-4 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
            Strategic Mathematics
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            THE CAREER MATH GUIDE TO ₹1Cr+
          </h3>
          <p className="text-xs text-slate-400">
            Do you believe you can reach the top 20% of your salary band and eventually join the ₹1 Cr Club?
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('career-roadmap')}
          className="self-start sm:self-auto px-3.5 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <span>Explore Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Core Mathematical Pillars */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-xl sm:text-2xl font-black text-teal-400 block tracking-tight">
            15–20
          </span>
          <span className="text-[11px] font-semibold text-slate-300 block uppercase tracking-wide">
            Career Years Left
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">High Earning Runway</span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-xl sm:text-2xl font-black text-sky-400 block tracking-tight">
            2–3
          </span>
          <span className="text-[11px] font-semibold text-slate-300 block uppercase tracking-wide">
            Years Per Switch
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Compounding Velocity</span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-xl sm:text-2xl font-black text-emerald-400 block tracking-tight">
            5–7
          </span>
          <span className="text-[11px] font-semibold text-slate-300 block uppercase tracking-wide">
            Strategic Moves
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">To ₹1Cr+ Milestone</span>
        </div>
      </div>

      {/* Interactive Confidence Meter */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">
            Your ₹1Cr Milestone Confidence Meter:
          </span>
          <span className="font-mono font-bold text-teal-400 text-sm">
            {confidence}% Confidence
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="100"
          value={confidence}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Self-Doubt (10%)</span>
          <span>In Progress (50%)</span>
          <span className="text-emerald-400 font-semibold">Unstoppable Top 10% (100%)</span>
        </div>
      </div>
    </div>
  );
};
