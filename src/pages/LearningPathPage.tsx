import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Layers, 
  Award, 
  GraduationCap,
  TrendingUp
} from 'lucide-react';

interface SkillItem {
  id: string;
  category: string;
  title: string;
  priority: 'High' | 'Medium' | 'Foundational';
  completed: boolean;
  resource: string;
}

const INITIAL_SKILLS: SkillItem[] = [
  { id: '1', category: 'Distributed Systems', title: 'Raft/Paxos Consensus & Distributed Transactions (2PC vs Sagas)', priority: 'High', completed: true, resource: 'Designing Data-Intensive Applications (Kleppmann)' },
  { id: '2', category: 'Distributed Systems', title: 'High-Throughput Event Streaming & Kafka Partitioning Optimization', priority: 'High', completed: true, resource: 'Kafka: The Definitive Guide' },
  { id: '3', category: 'FinOps & Cloud', title: 'AWS Multi-Region Active-Active Topology & Route53 Latency Routing', priority: 'High', completed: true, resource: 'AWS Well-Architected Framework' },
  { id: '4', category: 'FinOps & Cloud', title: 'Kubernetes Pod Autoscaling (KEDA) & Spot Fleet FinOps Economics', priority: 'High', completed: false, resource: 'FinOps Foundation Cloud Cost Principles' },
  { id: '5', category: 'Observability', title: 'OpenTelemetry Distributed Tracing & MTTR Slicing with Grafana Tempo', priority: 'High', completed: false, resource: 'OpenTelemetry Specification & Best Practices' },
  { id: '6', category: 'Engineering Leadership', title: 'DORA & SPACE Metrics Framework for 50+ Engineer Organizations', priority: 'Medium', completed: true, resource: 'Accelerate (Forsgren, Humble, Kim)' },
  { id: '7', category: 'Executive Strategy', title: 'Engineering P&L Management & Executive Board Presentation Mastery', priority: 'High', completed: false, resource: 'The Manager\'s Path (Camille Fournier)' }
];

export const LearningPathPage: React.FC = () => {
  const { masterMemory, askAgent, isAiLoading, addToast } = useApp();
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [aiRoadmap, setAiRoadmap] = useState<string>('');

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
    addToast({ title: 'Skill Status Updated', type: 'info' });
  };

  const completedCount = skills.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / skills.length) * 100);

  const handleGenerateCustomRoadmap = async () => {
    try {
      const prompt = `As NAVIGATOR Agent (Career Strategy & Executive Upskilling Architect):
Generate a customized 6-week executive technical upskilling roadmap for:
Candidate: ${masterMemory.identity.fullName}
Target Role: ${masterMemory.targetProfile.targetRole}
Target Companies: Goldman Sachs, Morgan Stanley, Google, Uber
Remaining Skill Gaps: OpenTelemetry distributed tracing, Kubernetes spot fleet FinOps, Engineering P&L Management.

Provide a high-yield, weekly structured curriculum with exact books, papers, and architecture project milestones.`;

      const res = await askAgent('NAVIGATOR', prompt);
      setAiRoadmap(res);
      addToast({ title: '6-Week Executive Curriculum Generated', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Generation failed', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-teal-400" />
            Learning Path & Executive Skill Gap Analyzer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            NAVIGATOR Agent: Bridge competency gaps between Senior Engineering Management and VP/Director-level compensation.
          </p>
        </div>

        <button
          onClick={handleGenerateCustomRoadmap}
          disabled={isAiLoading}
          id="generate-roadmap-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAiLoading ? 'Analyzing Gaps...' : 'Generate 6-Week Roadmap'}</span>
        </button>
      </div>

      {/* Progress Metric Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
            Target Readiness Benchmark
          </span>
          <h3 className="text-lg font-bold text-white">
            {masterMemory.targetProfile.targetRole} Competency Index
          </h3>
          <p className="text-xs text-slate-400">
            {completedCount} of {skills.length} core executive competencies mastered
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xl font-black text-teal-400 font-mono">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Skill Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <div
            key={s.id}
            onClick={() => toggleSkill(s.id)}
            className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
              s.completed
                ? 'bg-slate-900/40 border-teal-500/30'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-teal-300">
                  {s.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    s.priority === 'High'
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s.priority} Priority
                </span>
              </div>

              <h4 className={`text-xs font-bold ${s.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                {s.title}
              </h4>

              <p className="text-[11px] text-slate-400">
                📚 Resource: <span className="text-slate-300">{s.resource}</span>
              </p>
            </div>

            <button className="p-1 text-teal-400 shrink-0">
              {s.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
