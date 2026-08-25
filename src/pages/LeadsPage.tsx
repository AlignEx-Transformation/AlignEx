import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lead, LeadStage } from '../types/crm';
import { 
  Target, 
  Plus, 
  DollarSign, 
  Search, 
  Trash2, 
  Edit3, 
  Calendar, 
  X, 
  Sparkles, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const LeadsPage: React.FC = () => {
  const { leads, addLead, updateLead, deleteLead, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formContactName, setFormContactName] = useState('');
  const [formContactEmail, setFormContactEmail] = useState('');
  const [formStage, setFormStage] = useState<LeadStage>('Identified');
  const [formEstimatedValue, setFormEstimatedValue] = useState('');
  const [formProbability, setFormProbability] = useState(50);
  const [formSource, setFormSource] = useState('Executive Referral');
  const [formNextAction, setFormNextAction] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'All' || l.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const openCreateModal = () => {
    setEditingLead(null);
    setFormTitle('');
    setFormCompany('');
    setFormContactName('');
    setFormContactEmail('');
    setFormStage('Identified');
    setFormEstimatedValue('₹90,00,000 CTC');
    setFormProbability(50);
    setFormSource('Executive Referral');
    setFormNextAction('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (l: Lead) => {
    setEditingLead(l);
    setFormTitle(l.title);
    setFormCompany(l.company);
    setFormContactName(l.contactName);
    setFormContactEmail(l.contactEmail || '');
    setFormStage(l.stage);
    setFormEstimatedValue(l.estimatedValue);
    setFormProbability(l.probability);
    setFormSource(l.source);
    setFormNextAction(l.nextAction);
    setFormNotes(l.notes);
    setIsModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCompany) return;

    if (editingLead) {
      updateLead(editingLead.id, {
        title: formTitle,
        company: formCompany,
        contactName: formContactName,
        contactEmail: formContactEmail,
        stage: formStage,
        estimatedValue: formEstimatedValue,
        probability: formProbability,
        source: formSource,
        nextAction: formNextAction,
        notes: formNotes,
        lastActivity: new Date().toISOString().slice(0, 10)
      });
    } else {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        title: formTitle,
        company: formCompany,
        contactName: formContactName,
        contactEmail: formContactEmail,
        stage: formStage,
        estimatedValue: formEstimatedValue,
        probability: formProbability,
        source: formSource,
        lastActivity: new Date().toISOString().slice(0, 10),
        nextAction: formNextAction,
        notes: formNotes,
        tags: ['Inbound', 'High Priority'],
        createdAt: new Date().toISOString().slice(0, 10)
      };
      addLead(newLead);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Target className="w-6 h-6 text-teal-400" />
            Career Consulting Leads
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track qualified career opportunities, retainers, and executive leadership engagements.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          id="new-lead-button"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Lead</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, company, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Identified', 'Approached', 'Engaged', 'Warm Conversation', 'Opportunity Created'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStage(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterStage === st
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3.5 transition group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                  {lead.company}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {lead.title}
                </h3>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                {lead.stage}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-500 block">Est. Value:</span>
                <strong className="text-emerald-400 font-bold">{lead.estimatedValue}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Probability:</span>
                <strong className="text-sky-400 font-bold">{lead.probability}%</strong>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-slate-400">
                <span>Contact: <strong className="text-slate-200">{lead.contactName}</strong></span>
                <span>Source: {lead.source}</span>
              </div>
            </div>

            {lead.nextAction && (
              <div className="text-xs bg-slate-850 p-2.5 rounded-lg border border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Action</span>
                <p className="text-slate-200 font-medium">{lead.nextAction}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500">Activity: {lead.lastActivity}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(lead)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  title="Edit Lead"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                  title="Delete Lead"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingLead ? 'Edit Lead' : 'Create New Lead'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Director of Engineering Core Platforms"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Stage</label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as LeadStage)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Identified">Identified</option>
                    <option value="Approached">Approached</option>
                    <option value="Engaged">Engaged</option>
                    <option value="Warm Conversation">Warm Conversation</option>
                    <option value="Opportunity Created">Opportunity Created</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Primary Contact Name</label>
                  <input
                    type="text"
                    value={formContactName}
                    onChange={(e) => setFormContactName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sengupta"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Estimated Package (CTC / Retainer)</label>
                  <input
                    type="text"
                    value={formEstimatedValue}
                    onChange={(e) => setFormEstimatedValue(e.target.value)}
                    placeholder="e.g. ₹95,00,000 CTC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Next Action Item</label>
                <input
                  type="text"
                  value={formNextAction}
                  onChange={(e) => setFormNextAction(e.target.value)}
                  placeholder="e.g. Deliver WIN deck on telemetry error budgets"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Notes & Background</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Executive context, recruiter insights, timeline..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
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
                  {editingLead ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
