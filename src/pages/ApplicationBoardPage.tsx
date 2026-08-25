import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobApplication, ApplicationStage } from '../types/jobsearch';
import { 
  Kanban, 
  Plus, 
  Search, 
  Building2, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Trash2, 
  Edit3, 
  X, 
  ArrowRight, 
  ChevronRight,
  DollarSign,
  TrendingUp
} from 'lucide-react';

const STAGES: ApplicationStage[] = [
  'Prospect',
  'Applied',
  'Screening',
  'Interview',
  'Final Round',
  'Offer',
  'Accepted',
  'Rejected'
];

export const ApplicationBoardPage: React.FC = () => {
  const { applications, addApplication, updateApplication, deleteApplication, setCurrentPage, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);

  // Form State
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formLocation, setFormLocation] = useState('Hyderabad / Bengaluru');
  const [formStage, setFormStage] = useState<ApplicationStage>('Prospect');
  const [formSalary, setFormSalary] = useState('₹85L – ₹1.1Cr');
  const [formAtsScore, setFormAtsScore] = useState(90);
  const [formDateApplied, setFormDateApplied] = useState(new Date().toISOString().slice(0, 10));
  const [formJD, setFormJD] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const filteredApps = applications.filter((app) => {
    const q = searchTerm.toLowerCase();
    return (
      app.role.toLowerCase().includes(q) ||
      app.company.toLowerCase().includes(q) ||
      app.location.toLowerCase().includes(q)
    );
  });

  const openCreateModal = (stage: ApplicationStage = 'Prospect') => {
    setEditingApp(null);
    setFormRole('Director of Engineering');
    setFormCompany('');
    setFormLocation('Hyderabad / Bengaluru');
    setFormStage(stage);
    setFormSalary('₹90L – ₹1.15Cr');
    setFormAtsScore(92);
    setFormDateApplied(new Date().toISOString().slice(0, 10));
    setFormJD('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (app: JobApplication) => {
    setEditingApp(app);
    setFormRole(app.role);
    setFormCompany(app.company);
    setFormLocation(app.location);
    setFormStage(app.stage);
    setFormSalary(app.salaryRange);
    setFormAtsScore(app.atsScore);
    setFormDateApplied(app.dateApplied);
    setFormJD(app.jobDescription);
    setFormNotes(app.notes);
    setIsModalOpen(true);
  };

  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRole || !formCompany) return;

    if (editingApp) {
      updateApplication(editingApp.id, {
        role: formRole,
        company: formCompany,
        location: formLocation,
        stage: formStage,
        salaryRange: formSalary,
        atsScore: formAtsScore,
        dateApplied: formDateApplied,
        jobDescription: formJD,
        notes: formNotes
      });
      addToast({ title: 'Application Updated', type: 'success' });
    } else {
      const newApp: JobApplication = {
        id: `app-${Date.now()}`,
        role: formRole,
        company: formCompany,
        location: formLocation,
        jobDescription: formJD,
        source: 'Executive Direct Ingress',
        stage: formStage,
        dateApplied: formDateApplied,
        atsScore: formAtsScore,
        salaryRange: formSalary,
        notes: formNotes,
        keyRequirements: ['Architecture', 'Leadership', 'Cloud Scale']
      };
      addApplication(newApp);
      addToast({ title: 'Application Created', type: 'success' });
    }
    setIsModalOpen(false);
  };

  const handleStageShift = (app: JobApplication, direction: 'next' | 'prev') => {
    const currentIndex = STAGES.indexOf(app.stage);
    if (direction === 'next' && currentIndex < STAGES.length - 1) {
      updateApplication(app.id, { stage: STAGES[currentIndex + 1] });
      addToast({ title: `Moved to ${STAGES[currentIndex + 1]}`, type: 'info' });
    } else if (direction === 'prev' && currentIndex > 0) {
      updateApplication(app.id, { stage: STAGES[currentIndex - 1] });
      addToast({ title: `Moved back to ${STAGES[currentIndex - 1]}`, type: 'info' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Kanban className="w-6 h-6 text-teal-400" />
            Application Kanban Board
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Active career opportunities organized across 8 pipeline stages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setCurrentPage('tailor')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>ATS Tailor Engine</span>
          </button>
          <button
            onClick={() => openCreateModal('Prospect')}
            id="new-application-button"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Application</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by role, company, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
        />
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800">
        {STAGES.map((stage) => {
          const stageApps = filteredApps.filter((a) => a.stage === stage);
          return (
            <div
              key={stage}
              className="w-72 shrink-0 bg-slate-950/60 border border-slate-800/90 rounded-2xl p-3 flex flex-col max-h-[78vh]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between px-2 py-2 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{stage}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-teal-300">
                    {stageApps.length}
                  </span>
                </div>

                <button
                  onClick={() => openCreateModal(stage)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                  title={`Add application to ${stage}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {stageApps.length === 0 ? (
                  <div className="text-center py-8 text-slate-600 text-xs border border-dashed border-slate-800/60 rounded-xl">
                    No items
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-slate-900/95 border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl space-y-2.5 transition shadow-sm group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                            {app.company}
                          </span>
                          <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                            {app.role}
                          </h4>
                        </div>

                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            app.atsScore >= 90
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {app.atsScore}% ATS
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{app.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-emerald-400" />
                          <span className="text-slate-300 font-medium">{app.salaryRange}</span>
                        </div>
                      </div>

                      {app.notes && (
                        <p className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-850 line-clamp-2">
                          {app.notes}
                        </p>
                      )}

                      {/* Stage Shift & Action Buttons */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(app)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
                            title="Edit"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          {STAGES.indexOf(stage) > 0 && (
                            <button
                              onClick={() => handleStageShift(app, 'prev')}
                              className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                              title="Move backward"
                            >
                              ←
                            </button>
                          )}
                          {STAGES.indexOf(stage) < STAGES.length - 1 && (
                            <button
                              onClick={() => handleStageShift(app, 'next')}
                              className="px-2 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[10px] font-bold flex items-center gap-0.5"
                              title="Advance stage"
                            >
                              <span>Next</span> →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingApp ? 'Edit Application' : 'Create Application'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveApp} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Role Title *</label>
                  <input
                    type="text"
                    required
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Company *</label>
                  <input
                    type="text"
                    required
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. Goldman Sachs"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Stage</label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as ApplicationStage)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Location</label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Salary</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Job Description / Requirements</label>
                <textarea
                  rows={3}
                  value={formJD}
                  onChange={(e) => setFormJD(e.target.value)}
                  placeholder="Paste key responsibilities or JD excerpt..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Strategic Notes & Next Steps</label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Prepared WIN presentation on Kubernetes cost governance"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
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
                  {editingApp ? 'Save Changes' : 'Create Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
