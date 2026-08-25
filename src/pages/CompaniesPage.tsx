import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyIntelligence } from '../types/crm';
import { 
  Building2, 
  Plus, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Tag, 
  Trash2, 
  Edit3, 
  X,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const { companies, addCompany, updateCompany, deleteCompany, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComp, setEditingComp] = useState<CompanyIntelligence | null>(null);

  const [formName, setFormName] = useState('');
  const [formIndustry, setFormIndustry] = useState('');
  const [formSize, setFormSize] = useState('1,001–5,000');
  const [formHeadquarters, setFormHeadquarters] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formTier, setFormTier] = useState<'Tier 1 (Dream)' | 'Tier 2 (Strong)' | 'Tier 3 (Backup)'>('Tier 1 (Dream)');
  const [formHiringSignals, setFormHiringSignals] = useState('');
  const [formDecisionMakers, setFormDecisionMakers] = useState('');
  const [formTechStack, setFormTechStack] = useState('');
  const [formCareersUrl, setFormCareersUrl] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.headquarters.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'All' || c.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const openCreateModal = () => {
    setEditingComp(null);
    setFormName('');
    setFormIndustry('Technology');
    setFormSize('5,001–10,000');
    setFormHeadquarters('Hyderabad / Bengaluru');
    setFormWebsite('');
    setFormTier('Tier 1 (Dream)');
    setFormHiringSignals('');
    setFormDecisionMakers('');
    setFormTechStack('');
    setFormCareersUrl('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: CompanyIntelligence) => {
    setEditingComp(c);
    setFormName(c.name);
    setFormIndustry(c.industry);
    setFormSize(c.size);
    setFormHeadquarters(c.headquarters);
    setFormWebsite(c.website);
    setFormTier(c.tier);
    setFormHiringSignals(c.hiringSignals.join('\n'));
    setFormDecisionMakers(c.decisionMakers.join(', '));
    setFormTechStack(c.techStack.join(', '));
    setFormCareersUrl(c.careersUrl);
    setFormNotes(c.notes);
    setIsModalOpen(true);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const signals = formHiringSignals.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const dMakers = formDecisionMakers.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const tech = formTechStack.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (editingComp) {
      updateCompany(editingComp.id, {
        name: formName,
        industry: formIndustry,
        size: formSize,
        headquarters: formHeadquarters,
        website: formWebsite,
        tier: formTier,
        hiringSignals: signals,
        decisionMakers: dMakers,
        techStack: tech,
        careersUrl: formCareersUrl,
        notes: formNotes,
        updatedAt: new Date().toISOString().slice(0, 10)
      });
    } else {
      const newComp: CompanyIntelligence = {
        id: `comp-${Date.now()}`,
        name: formName,
        industry: formIndustry,
        size: formSize,
        headquarters: formHeadquarters,
        website: formWebsite,
        tier: formTier,
        hiringSignals: signals,
        decisionMakers: dMakers,
        techStack: tech,
        openRolesCount: 5,
        careersUrl: formCareersUrl,
        notes: formNotes,
        tags: ['Target Company', formTier],
        updatedAt: new Date().toISOString().slice(0, 10)
      };
      addCompany(newComp);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-teal-400" />
            Target Company Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Map Tier-1 GCCs, enterprise expansion hubs, decision makers, and hiring signals.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          id="new-company-button"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Company</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, tech stack, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Tier 1 (Dream)', 'Tier 2 (Strong)', 'Tier 3 (Backup)'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterTier === tier
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((comp) => (
          <div
            key={comp.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-2">
                    {comp.name}
                    {comp.website && (
                      <a href={comp.website} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-teal-400">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {comp.headquarters} • {comp.size}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  comp.tier.includes('Tier 1')
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {comp.tier.split(' ')[0]} {comp.tier.split(' ')[1]}
                </span>
              </div>

              {/* Hiring Signals */}
              {comp.hiringSignals.length > 0 && (
                <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Hiring Signals
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {comp.hiringSignals.slice(0, 2).map((sig, idx) => (
                      <li key={idx} className="line-clamp-1">• {sig}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Decision Makers */}
              {comp.decisionMakers.length > 0 && (
                <div className="text-xs text-slate-400">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">Decision Makers:</span>
                  <p className="text-slate-200 font-medium line-clamp-1 mt-0.5">
                    {comp.decisionMakers.join(' • ')}
                  </p>
                </div>
              )}

              {/* Tech Stack Pills */}
              {comp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {comp.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage('win-studio')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Build WIN Deck
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(comp)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Edit Company"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCompany(comp.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                  title="Delete Company"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingComp ? 'Edit Target Company' : 'Add Target Company'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Goldman Sachs"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Tier</label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Tier 1 (Dream)">Tier 1 (Dream)</option>
                    <option value="Tier 2 (Strong)">Tier 2 (Strong)</option>
                    <option value="Tier 3 (Backup)">Tier 3 (Backup)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Industry</label>
                  <input
                    type="text"
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value)}
                    placeholder="e.g. Banking / FinTech"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Location / Headquarters</label>
                  <input
                    type="text"
                    value={formHeadquarters}
                    onChange={(e) => setFormHeadquarters(e.target.value)}
                    placeholder="e.g. Bengaluru / Hyderabad GCC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Hiring Signals (one per line)</label>
                <textarea
                  rows={2}
                  value={formHiringSignals}
                  onChange={(e) => setFormHiringSignals(e.target.value)}
                  placeholder="e.g. Expanding Hyderabad tech center by 800 engineers&#10;Recent Series C $45M funding round"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Decision Makers (comma separated)</label>
                <input
                  type="text"
                  value={formDecisionMakers}
                  onChange={(e) => setFormDecisionMakers(e.target.value)}
                  placeholder="Vikramaditya Sengupta (MD), Ananya Rao (Head of TA)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={formTechStack}
                  onChange={(e) => setFormTechStack(e.target.value)}
                  placeholder="AWS, Kubernetes, Kafka, Golang, Snowflake"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-sm"
                >
                  {editingComp ? 'Save Changes' : 'Save Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
