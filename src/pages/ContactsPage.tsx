import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Contact, ContactRelationship } from '../types/crm';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Linkedin, 
  Calendar, 
  Trash2, 
  Edit3, 
  Tag, 
  X, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { contacts, addContact, updateContact, deleteContact, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRelationship, setFilterRelationship] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // New / Edit Contact Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRelationship, setFormRelationship] = useState<ContactRelationship>('Recruiter');
  const [formLinkedin, setFormLinkedin] = useState('');
  const [formSource, setFormSource] = useState('LinkedIn');
  const [formLastContacted, setFormLastContacted] = useState(new Date().toISOString().slice(0, 10));
  const [formNextFollowUp, setFormNextFollowUp] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTags, setFormTags] = useState('');

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRel = filterRelationship === 'All' || c.relationship === filterRelationship;
    return matchesSearch && matchesRel;
  });

  const openCreateModal = () => {
    setEditingContact(null);
    setFormName('');
    setFormRole('');
    setFormCompany('');
    setFormEmail('');
    setFormPhone('');
    setFormRelationship('Recruiter');
    setFormLinkedin('');
    setFormSource('LinkedIn');
    setFormLastContacted(new Date().toISOString().slice(0, 10));
    setFormNextFollowUp('');
    setFormNotes('');
    setFormTags('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Contact) => {
    setEditingContact(c);
    setFormName(c.name);
    setFormRole(c.role);
    setFormCompany(c.company);
    setFormEmail(c.email);
    setFormPhone(c.phone);
    setFormRelationship(c.relationship);
    setFormLinkedin(c.linkedin);
    setFormSource(c.source);
    setFormLastContacted(c.lastContacted);
    setFormNextFollowUp(c.nextFollowUp);
    setFormNotes(c.notes);
    setFormTags(c.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCompany) return;

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingContact) {
      updateContact(editingContact.id, {
        name: formName,
        role: formRole,
        company: formCompany,
        email: formEmail,
        phone: formPhone,
        relationship: formRelationship,
        linkedin: formLinkedin,
        source: formSource,
        lastContacted: formLastContacted,
        nextFollowUp: formNextFollowUp,
        notes: formNotes,
        tags: tagsArray
      });
    } else {
      const newContact: Contact = {
        id: `cnt-${Date.now()}`,
        name: formName,
        role: formRole,
        company: formCompany,
        email: formEmail,
        phone: formPhone,
        relationship: formRelationship,
        linkedin: formLinkedin,
        source: formSource,
        lastContacted: formLastContacted,
        nextFollowUp: formNextFollowUp,
        notes: formNotes,
        tags: tagsArray,
        status: 'Active',
        avatarColor: '#0D9488'
      };
      addContact(newContact);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-teal-400" />
            Contacts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            The people behind each engagement.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('networking')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Generate Outreach via AI</span>
          </button>
          <button
            onClick={openCreateModal}
            id="new-contact-button"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Contact</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search contacts, company, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Recruiter', 'Hiring Manager', 'Executive Decision Maker', 'Referrer', 'Alumni'].map((rel) => (
            <button
              key={rel}
              onClick={() => setFilterRelationship(rel)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterRelationship === rel
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table or Empty State */}
      {contacts.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 border-dashed rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No contacts yet.</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Start building your career intelligence by recording key decision makers, headhunters, and executive recruiters.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create your first contact</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300" id="contacts-table">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Name & Role</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Relationship</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Phone</th>
                  <th className="px-4 py-3.5">Follow-Up</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-850/60 transition group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                          style={{ backgroundColor: contact.avatarColor || '#0D9488' }}
                        >
                          {contact.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-1.5">
                            {contact.name}
                            {contact.linkedin && (
                              <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-sky-400"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <span className="text-slate-400 text-[11px] block">{contact.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-200">
                      {contact.company}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-teal-300 border border-slate-700/60">
                        {contact.relationship}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`} className="hover:text-teal-400 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {contact.email}
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                      {contact.phone ? (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {contact.phone}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[11px]">
                      {contact.nextFollowUp ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {contact.nextFollowUp}
                        </span>
                      ) : (
                        <span className="text-slate-500">Not scheduled</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(contact)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                          title="Edit Contact"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <h3 className="text-base font-bold text-white">
                {editingContact ? 'Edit Contact' : 'Create New Contact'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sengupta"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Company *</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Role / Designation</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Managing Director & Head of GCC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Relationship</label>
                  <select
                    value={formRelationship}
                    onChange={(e) => setFormRelationship(e.target.value as ContactRelationship)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Recruiter">Recruiter</option>
                    <option value="Hiring Manager">Hiring Manager</option>
                    <option value="Executive Decision Maker">Executive Decision Maker</option>
                    <option value="Referrer">Referrer</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Peer / Colleague">Peer / Colleague</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="v.sengupta@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+91 98801 00000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={formLinkedin}
                    onChange={(e) => setFormLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Next Follow-Up Date</label>
                  <input
                    type="date"
                    value={formNextFollowUp}
                    onChange={(e) => setFormNextFollowUp(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Notes & Context</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Key discussion points, mutual connections, target topics..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="GCC, Tier 1, Hyderabad, Cloud"
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
                  {editingContact ? 'Save Changes' : 'Create Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
