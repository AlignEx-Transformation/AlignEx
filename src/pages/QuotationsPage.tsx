import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuotationEngagement } from '../types/crm';
import { 
  FileSpreadsheet, 
  Plus, 
  DollarSign, 
  Trash2, 
  Edit3, 
  Calendar, 
  X, 
  CheckCircle2, 
  Sparkles,
  Download,
  Building2
} from 'lucide-react';

export const QuotationsPage: React.FC = () => {
  const { quotations, addQuotation, updateQuotation, deleteQuotation, masterMemory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<QuotationEngagement | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formRole, setFormRole] = useState(masterMemory.targetProfile.targetRole);
  const [formType, setFormType] = useState<any>('Full-Time Employment');
  const [formFixedCTC, setFormFixedCTC] = useState('₹75,00,000');
  const [formVariableCTC, setFormVariableCTC] = useState('₹15,00,000');
  const [formStocks, setFormStocks] = useState('₹15,00,000 ESOPs/RSUs');
  const [formJoiningBonus, setFormJoiningBonus] = useState('₹5,00,000');
  const [formTotal, setFormTotal] = useState('₹1,05,00,000');
  const [formStatus, setFormStatus] = useState<any>('Draft');
  const [formNotes, setFormNotes] = useState('');

  const openCreateModal = () => {
    setEditingQuotation(null);
    setFormTitle('Director of Engineering Compensation Proposal');
    setFormCompany('Goldman Sachs');
    setFormRole(masterMemory.targetProfile.targetRole);
    setFormType('Full-Time Employment');
    setFormFixedCTC('₹75,00,000');
    setFormVariableCTC('₹15,00,000');
    setFormStocks('₹15,00,000 RSUs');
    setFormJoiningBonus('₹5,00,000');
    setFormTotal('₹1,10,00,000');
    setFormStatus('Draft');
    setFormNotes('Anchored on market median for Director of Engineering overseeing 40+ headcount.');
    setIsModalOpen(true);
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCompany) return;

    if (editingQuotation) {
      updateQuotation(editingQuotation.id, {
        title: formTitle,
        targetCompany: formCompany,
        roleTitle: formRole,
        type: formType,
        proposedFixedCTC: formFixedCTC,
        proposedVariableCTC: formVariableCTC,
        proposedStocksESOPs: formStocks,
        joiningBonus: formJoiningBonus,
        totalAnnualPackage: formTotal,
        status: formStatus,
        notes: formNotes
      });
    } else {
      const newQ: QuotationEngagement = {
        id: `quot-${Date.now()}`,
        title: formTitle,
        targetCompany: formCompany,
        roleTitle: formRole,
        type: formType,
        proposedFixedCTC: formFixedCTC,
        proposedVariableCTC: formVariableCTC,
        proposedStocksESOPs: formStocks,
        joiningBonus: formJoiningBonus,
        totalAnnualPackage: formTotal,
        status: formStatus,
        termsAndBenefits: [
          'Full comprehensive medical coverage for family',
          'Flexible hybrid work arrangement',
          'Annual executive coaching allowance'
        ],
        notes: formNotes,
        dateCreated: new Date().toISOString().slice(0, 10)
      };
      addQuotation(newQ);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-teal-400" />
            Quotations & Compensation Proposals
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Structured compensation frameworks, executive retainers, and fractional advisory proposals.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          id="new-quotation-button"
          className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Proposal</span>
        </button>
      </div>

      {/* Quotations Grid */}
      {quotations.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-2xl p-12 text-center space-y-3">
          <FileSpreadsheet className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No compensation proposals yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Model your target CTC breakdown (Fixed, Performance Variable, Equity RSUs, and Joining Bonus) to maintain upper-hand during offer negotiations.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Draft First Proposal</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotations.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                    {q.targetCompany} • {q.type}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {q.title}
                  </h3>
                  <span className="text-xs text-slate-400">{q.roleTitle}</span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {q.status}
                </span>
              </div>

              {/* Package Breakdown Box */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs text-slate-400 font-medium">Total Proposed CTC:</span>
                  <span className="text-lg font-black text-emerald-400 tracking-tight">{q.totalAnnualPackage}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Fixed Base:</span>
                    <strong className="text-slate-200">{q.proposedFixedCTC}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Performance Bonus:</span>
                    <strong className="text-slate-200">{q.proposedVariableCTC}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Stocks / RSUs:</span>
                    <strong className="text-slate-200">{q.proposedStocksESOPs}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Joining Bonus:</span>
                    <strong className="text-slate-200">{q.joiningBonus}</strong>
                  </div>
                </div>
              </div>

              {q.notes && (
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-850 p-2.5 rounded-lg border border-slate-800">
                  {q.notes}
                </p>
              )}

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Date: {q.dateCreated}</span>
                <button
                  onClick={() => deleteQuotation(q.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">Create Compensation Proposal</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuotation} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Proposal Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Engagement Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Full-Time Employment">Full-Time Employment</option>
                    <option value="Executive Advisory">Executive Advisory</option>
                    <option value="Fractional Leader">Fractional Leader</option>
                    <option value="Consulting Project">Consulting Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Fixed Base CTC</label>
                  <input
                    type="text"
                    value={formFixedCTC}
                    onChange={(e) => setFormFixedCTC(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Variable / Bonus</label>
                  <input
                    type="text"
                    value={formVariableCTC}
                    onChange={(e) => setFormVariableCTC(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Stocks / RSUs (Annual)</label>
                  <input
                    type="text"
                    value={formStocks}
                    onChange={(e) => setFormStocks(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Joining Sign-on Bonus</label>
                  <input
                    type="text"
                    value={formJoiningBonus}
                    onChange={(e) => setFormJoiningBonus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Total Package Valuation</label>
                <input
                  type="text"
                  value={formTotal}
                  onChange={(e) => setFormTotal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none focus:border-teal-500"
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
                  Save Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
