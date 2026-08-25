import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MeetingItem } from '../types/crm';
import { 
  CalendarDays, 
  Plus, 
  Clock, 
  User, 
  Building2, 
  Video, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const { meetings, addMeeting, updateMeeting, deleteMeeting, setCurrentPage } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<MeetingItem | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formWithPerson, setFormWithPerson] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formType, setFormType] = useState<any>('Hiring Manager Round');
  const [formDate, setFormDate] = useState(new Date().toISOString().slice(0, 10));
  const [formTime, setFormTime] = useState('15:00');
  const [formMeetingLink, setFormMeetingLink] = useState('');
  const [formAgenda, setFormAgenda] = useState('');
  const [formPrepNotes, setFormPrepNotes] = useState('');

  const openCreateModal = () => {
    setEditingMeeting(null);
    setFormTitle('Bar Raiser & Architecture Round');
    setFormWithPerson('Vikramaditya Sengupta (MD Engineering)');
    setFormCompany('Goldman Sachs');
    setFormType('Leadership / Bar Raiser');
    setFormDate(new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10));
    setFormTime('16:00');
    setFormMeetingLink('https://meet.google.com/abc-def-xyz');
    setFormAgenda('Deep-dive into 4.5M zero-downtime banking migration and FinOps telemetry architecture.');
    setFormPrepNotes('Review CAR Story 01 & 02. Emphasize 35% MTTR and $450K cost savings.');
    setIsModalOpen(true);
  };

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formWithPerson) return;

    if (editingMeeting) {
      updateMeeting(editingMeeting.id, {
        title: formTitle,
        withPerson: formWithPerson,
        company: formCompany,
        type: formType,
        date: formDate,
        time: formTime,
        meetingLink: formMeetingLink,
        agenda: formAgenda,
        preparationNotes: formPrepNotes
      });
    } else {
      const newM: MeetingItem = {
        id: `meet-${Date.now()}`,
        title: formTitle,
        withPerson: formWithPerson,
        company: formCompany,
        type: formType,
        date: formDate,
        time: formTime,
        meetingLink: formMeetingLink,
        agenda: formAgenda,
        preparationNotes: formPrepNotes,
        completed: false
      };
      addMeeting(newM);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-teal-400" />
            Interviews & Scheduled Meetings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Maintain interview schedules, screening briefings, coffee chats, and preparation agendas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('interviewer')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Practice Interview Simulation</span>
          </button>
          <button
            onClick={openCreateModal}
            id="new-meeting-button"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Meetings List */}
      {meetings.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-2xl p-12 text-center space-y-3">
          <CalendarDays className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No meetings scheduled yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Log your upcoming recruiter screening calls, technical bar raisers, and networking syncs.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule First Meeting</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {meetings.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                m.completed 
                  ? 'bg-slate-950/60 border-slate-800 opacity-60' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    {m.type}
                  </span>
                  <span className="text-xs font-bold text-white">{m.company}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    {m.date} at {m.time}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {m.title}
                </h3>

                <p className="text-xs text-slate-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>With: <strong className="text-slate-100">{m.withPerson}</strong></span>
                </p>

                {m.agenda && (
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <strong className="text-slate-300">Agenda:</strong> {m.agenda}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateMeeting(m.id, { completed: !m.completed })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                    m.completed
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{m.completed ? 'Completed' : 'Mark Done'}</span>
                </button>

                {m.meetingLink && (
                  <a
                    href={m.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Link</span>
                  </a>
                )}

                <button
                  onClick={() => deleteMeeting(m.id)}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                >
                  <Trash2 className="w-4 h-4" />
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
              <h3 className="text-base font-bold text-white">Schedule Meeting / Interview</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeeting} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Meeting Title *</label>
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
                  <label className="text-xs font-semibold text-slate-300">With Person *</label>
                  <input
                    type="text"
                    required
                    value={formWithPerson}
                    onChange={(e) => setFormWithPerson(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Company</label>
                  <input
                    type="text"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Screening Call">Screening Call</option>
                    <option value="Technical Round">Technical Round</option>
                    <option value="Hiring Manager Round">Hiring Manager Round</option>
                    <option value="Leadership / Bar Raiser">Leadership / Bar Raiser</option>
                    <option value="Negotiation Call">Negotiation Call</option>
                    <option value="Coffee Chat / Networking">Coffee Chat / Networking</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Time</label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Meeting Link (Zoom / Meet)</label>
                <input
                  type="url"
                  value={formMeetingLink}
                  onChange={(e) => setFormMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Agenda & Prep Notes</label>
                <textarea
                  rows={3}
                  value={formAgenda}
                  onChange={(e) => setFormAgenda(e.target.value)}
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
                  Save Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
