import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARStory } from '../types/career';
import { 
  Award, 
  Plus, 
  Sparkles, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Tag, 
  Zap, 
  ArrowRight,
  Download,
  Flame
} from 'lucide-react';

export const CareerEvidencePage: React.FC = () => {
  const { masterMemory, updateMasterMemory, addToast, askAgent, isAiLoading, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<CARStory | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formTimeframe, setFormTimeframe] = useState('');
  const [formChallenge, setFormChallenge] = useState('');
  const [formAction, setFormAction] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formMetrics, setFormMetrics] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formImpactDiscoveryPrompt, setFormImpactDiscoveryPrompt] = useState('');
  const [isDiscoveringImpact, setIsDiscoveringImpact] = useState(false);

  const stories = masterMemory.carStories || [];

  const getMetricsList = (s: CARStory): string[] => {
    if (Array.isArray(s.metrics)) return s.metrics;
    if (s.metricsList) return s.metricsList;
    if (s.metrics && typeof s.metrics === 'object') {
      return Object.values(s.metrics).filter(Boolean) as string[];
    }
    return [];
  };

  const getSkillsList = (s: CARStory): string[] => {
    if (Array.isArray(s.skillsDemonstrated)) return s.skillsDemonstrated;
    if (Array.isArray(s.tags)) return s.tags;
    return [];
  };

  const filteredStories = stories.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.challenge.toLowerCase().includes(q) ||
      s.action.toLowerCase().includes(q) ||
      s.result.toLowerCase().includes(q) ||
      (s.company && s.company.toLowerCase().includes(q))
    );
  });

  const openCreateModal = () => {
    setEditingStory(null);
    setFormTitle('');
    setFormRole(masterMemory.targetProfile.targetRole);
    setFormCompany('Morgan Stanley / Goldman Sachs');
    setFormTimeframe('2023 - 2024');
    setFormChallenge('');
    setFormAction('');
    setFormResult('');
    setFormMetrics('');
    setFormSkills('Distributed Systems, Cloud Migration, AWS, Microservices');
    setIsModalOpen(true);
  };

  const openEditModal = (s: CARStory) => {
    setEditingStory(s);
    setFormTitle(s.title);
    setFormRole(s.role || masterMemory.targetProfile.targetRole);
    setFormCompany(s.company || 'Enterprise Technology');
    setFormTimeframe(s.timeframe || '2023 - Present');
    setFormChallenge(s.challenge);
    setFormAction(s.action);
    setFormResult(s.result);
    setFormMetrics(getMetricsList(s).join('\n'));
    setFormSkills(getSkillsList(s).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formChallenge || !formAction || !formResult) return;

    const metricsArray = formMetrics.split('\n').map((m) => m.trim()).filter((m) => m.length > 0);
    const skillsArray = formSkills.split(',').map((s) => s.trim()).filter((s) => s.length > 0);

    if (editingStory) {
      updateMasterMemory((prev) => ({
        ...prev,
        carStories: prev.carStories.map((story) =>
          story.id === editingStory.id
            ? {
                ...story,
                title: formTitle,
                role: formRole,
                company: formCompany,
                timeframe: formTimeframe,
                challenge: formChallenge,
                action: formAction,
                result: formResult,
                metrics: metricsArray,
                metricsList: metricsArray,
                skillsDemonstrated: skillsArray,
                tags: skillsArray
              }
            : story
        )
      }));
      addToast({ title: 'CAR Story Updated', type: 'success' });
    } else {
      const newStory: CARStory = {
        id: `car-${Date.now()}`,
        title: formTitle,
        role: formRole,
        company: formCompany,
        timeframe: formTimeframe,
        challenge: formChallenge,
        action: formAction,
        result: formResult,
        isResultCaptured: true,
        metrics: metricsArray,
        metricsList: metricsArray,
        skillsDemonstrated: skillsArray,
        tags: skillsArray,
        domainTags: ['Engineering', 'Architecture', 'Leadership'],
        verifiedATSKeywords: skillsArray,
        dateCreated: new Date().toISOString()
      };
      updateMasterMemory((prev) => ({
        ...prev,
        carStories: [newStory, ...prev.carStories]
      }));
      addToast({ title: 'New CAR Story Saved', message: 'Evidence added to local memory.', type: 'success' });
    }
    setIsModalOpen(false);
  };

  const handleDeleteStory = (id: string) => {
    updateMasterMemory((prev) => ({
      ...prev,
      carStories: prev.carStories.filter((s) => s.id !== id)
    }));
    addToast({ title: 'CAR Story Removed', type: 'info' });
  };

  const handleDiscoverImpact = async () => {
    if (!formChallenge && !formAction) {
      addToast({ title: 'Please enter Challenge and Action first', type: 'warning' });
      return;
    }
    setIsDiscoveringImpact(true);
    try {
      const prompt = `I am drafting a CAR (Challenge-Action-Result) story for an executive resume:
Challenge: ${formChallenge}
Action: ${formAction}
Draft Result: ${formResult}

Help me quantify the business impact with high-caliber executive metrics (MTTR, cost reduction, latency, zero-downtime, revenue influence). Provide 3 crisp, metric-grounded result bullets ready for an ATS resume.`;

      const response = await askAgent('TAILOR', prompt);
      setFormResult(response);
      addToast({ title: 'Impact Quantified by TAILOR AI', type: 'success' });
    } catch (err: any) {
      addToast({ title: 'Failed to discover impact', message: err.message, type: 'error' });
    } finally {
      setIsDiscoveringImpact(false);
    }
  };

  const handleExportStories = () => {
    const mdContent = `# Master Career Evidence & CAR Stories
Generated by ALIGNEX AI Local Career Memory

${stories
  .map(
    (s, idx) => `## ${idx + 1}. ${s.title}
**Role & Company:** ${s.role || 'Leader'} at ${s.company || 'Enterprise'} (${s.timeframe || 'Recent'})

### 🚨 Challenge:
${s.challenge}

### ⚡ Action:
${s.action}

### 🎯 Result:
${s.result}

**Quantified Metrics:**
${getMetricsList(s).map((m) => `- ${m}`).join('\n')}

**Demonstrated Skills:** ${getSkillsList(s).join(', ')}

---`
  )
  .join('\n\n')}`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ALIGNEX_CAR_Stories_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: 'Exported CAR Stories to Markdown', type: 'success' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-teal-400" />
            Career Evidence Lab (CAR Framework)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Challenge • Action • Result evidence repository anchoring your master resume and interview simulations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportStories}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Export Markdown</span>
          </button>

          <button
            onClick={openCreateModal}
            id="new-car-story-button"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ New CAR Story</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search challenge, metrics, skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
        />
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {filteredStories.map((story, idx) => (
          <div
            key={story.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    STORY #{idx + 1}
                  </span>
                  <span className="text-xs text-slate-400">
                    {story.company || 'Enterprise'} • {story.role || 'Executive'} ({story.timeframe || 'Recent'})
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors mt-1">
                  {story.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(story)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStory(story.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  Challenge
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {story.challenge}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">
                  Action
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {story.action}
                </p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                  Result & Impact
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {story.result}
                </p>
              </div>
            </div>

            {/* Quantified Metrics & Skills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {getMetricsList(story).map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium">
                    ⚡ {m}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                {getSkillsList(story).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingStory ? 'Edit CAR Story' : 'Create New CAR Story'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Story Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. 4.5M TPS Core Banking Migration to Distributed Microservices"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Company</label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Role</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Timeframe</label>
                  <input
                    type="text"
                    value={formTimeframe}
                    onChange={(e) => setFormTimeframe(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-400">1. Challenge (The Context & Friction) *</label>
                <textarea
                  rows={3}
                  required
                  value={formChallenge}
                  onChange={(e) => setFormChallenge(e.target.value)}
                  placeholder="What was broken, scaling bottleneck, cost inefficiency, or mission-critical risk?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sky-400">2. Action (Your Leadership & Execution) *</label>
                <textarea
                  rows={3}
                  required
                  value={formAction}
                  onChange={(e) => setFormAction(e.target.value)}
                  placeholder="How did you architect the solution, mobilize engineers, and introduce rigor?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-emerald-400">3. Result & Business Impact *</label>
                  <button
                    type="button"
                    onClick={handleDiscoverImpact}
                    disabled={isDiscoveringImpact}
                    className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isDiscoveringImpact ? 'Quantifying...' : 'Help me discover the impact (AI)'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  required
                  value={formResult}
                  onChange={(e) => setFormResult(e.target.value)}
                  placeholder="Quantifiable outcome: $ saved, MTTR reduced, 99.99% uptime achieved..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Extracted Metrics (one per line)</label>
                <textarea
                  rows={2}
                  value={formMetrics}
                  onChange={(e) => setFormMetrics(e.target.value)}
                  placeholder="e.g. 4.5M TPS zero-downtime&#10;$450K annual cloud compute saved&#10;35% reduction in MTTR"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Demonstrated Skills (comma separated)</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="Distributed Systems, FinOps, Cloud Architecture, Incident Response"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl"
                >
                  {editingStory ? 'Save Changes' : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
