import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Layers, 
  Briefcase, 
  Building2, 
  DollarSign, 
  MapPin, 
  Save, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2,
  TrendingUp,
  Compass
} from 'lucide-react';

export const CareerProfilePage: React.FC = () => {
  const { masterMemory, updateMasterMemory, addToast, setCurrentPage } = useApp();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState(masterMemory.identity.fullName || '');
  const [email, setEmail] = useState(masterMemory.identity.email || '');
  const [phone, setPhone] = useState(masterMemory.identity.phone || '');
  const [linkedin, setLinkedin] = useState(masterMemory.identity.linkedin || masterMemory.identity.linkedinUrl || '');
  const [github, setGithub] = useState(masterMemory.identity.github || masterMemory.identity.githubUrl || '');
  const [location, setLocation] = useState(masterMemory.identity.location || '');
  const [yearsOfExperience, setYearsOfExperience] = useState(masterMemory.identity.yearsOfExperience || 16);
  const [summary, setSummary] = useState(masterMemory.identity.summary || masterMemory.careerSummary || '');

  // Target Profile State
  const [targetFunction, setTargetFunction] = useState(masterMemory.targetProfile.targetFunction || 'Engineering Leadership');
  const [targetRole, setTargetRole] = useState(masterMemory.targetProfile.targetRole || 'Director of Engineering');
  const [targetIndustries, setTargetIndustries] = useState((masterMemory.targetProfile.targetIndustries || []).join(', '));
  const [companyTypes, setCompanyTypes] = useState((masterMemory.targetProfile.targetCompanyTypes || []).join(', '));
  const [companySizes, setCompanySizes] = useState((masterMemory.targetProfile.targetCompanySizes || []).join(', '));
  const [targetLocations, setTargetLocations] = useState(
    (masterMemory.targetProfile.targetLocations || masterMemory.targetProfile.targetGeography || []).join(', ')
  );
  
  // Compensation
  const [currentComp, setCurrentComp] = useState(masterMemory.targetProfile.targetCompensation.current || '₹45,00,000');
  const [targetComp, setTargetComp] = useState(masterMemory.targetProfile.targetCompensation.target || '₹1,00,00,000');
  const [minAcceptable, setMinAcceptable] = useState(
    masterMemory.targetProfile.targetCompensation.minAcceptable || masterMemory.targetProfile.targetCompensation.minimumAcceptable || '₹75,00,000'
  );
  const [stretchGoal, setStretchGoal] = useState(
    masterMemory.targetProfile.targetCompensation.stretch || masterMemory.targetProfile.targetCompensation.idealOffer || '₹1,25,00,000'
  );

  // Skills
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'Core' | 'Leadership' | 'Technical' | 'Domain'>('Technical');

  React.useEffect(() => {
    if (masterMemory?.identity?.fullName) {
      setFullName(masterMemory.identity.fullName);
      setEmail(masterMemory.identity.email || '');
      setPhone(masterMemory.identity.phone || '');
      setLinkedin(masterMemory.identity.linkedin || masterMemory.identity.linkedinUrl || '');
      setGithub(masterMemory.identity.github || masterMemory.identity.githubUrl || '');
      setLocation(masterMemory.identity.location || '');
      setSummary(masterMemory.identity.summary || masterMemory.careerSummary || '');
      setTargetRole(masterMemory.targetProfile.targetRole || 'Director of Engineering / Senior Director of Program Management & AI Enablement');
    }
  }, [masterMemory]);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    const indArray = targetIndustries.split(',').map((s) => s.trim()).filter((s) => s.length > 0) as any[];
    const compTypeArray = companyTypes.split(',').map((s) => s.trim()).filter((s) => s.length > 0) as any[];
    const compSizeArray = companySizes.split(',').map((s) => s.trim()).filter((s) => s.length > 0) as any[];
    const locArray = targetLocations.split(',').map((s) => s.trim()).filter((s) => s.length > 0);

    updateMasterMemory((prev) => ({
      ...prev,
      careerSummary: summary,
      identity: {
        ...prev.identity,
        fullName,
        email,
        phone,
        linkedin,
        linkedinUrl: linkedin,
        github,
        githubUrl: github,
        location,
        yearsOfExperience,
        summary
      },
      targetProfile: {
        ...prev.targetProfile,
        targetFunction: targetFunction as any,
        targetRole,
        targetIndustries: indArray,
        targetCompanyTypes: compTypeArray,
        targetCompanySizes: compSizeArray,
        targetLocations: locArray,
        targetGeography: locArray,
        targetCompensation: {
          ...prev.targetProfile.targetCompensation,
          current: currentComp,
          target: targetComp,
          minAcceptable,
          minimumAcceptable: minAcceptable,
          stretch: stretchGoal,
          idealOffer: stretchGoal
        }
      }
    }));

    addToast({ title: 'Master Career Memory Updated', message: 'All profile changes synced to local storage.', type: 'success' });
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    updateMasterMemory((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          name: newSkillName.trim(),
          category: newSkillCategory,
          proficiencyLevel: 'Expert',
          yearsOfExperience: 5,
          verifiedInCarStories: []
        }
      ]
    }));

    setNewSkillName('');
    addToast({ title: 'Skill Added', type: 'success' });
  };

  const handleRemoveSkill = (skillName: string) => {
    updateMasterMemory((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.name !== skillName)
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-teal-400" />
            Career Profile & Target Role Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure your Master Career Memory across 4 foundational pillars to anchor all AI agent responses.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          id="save-career-profile-button"
          className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-teal-500/10 transition self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Career Memory</span>
        </button>
      </div>

      {/* Guided 4-Step Onboarding Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
        {[
          { step: 1 as const, number: '01', title: 'FUNCTION', desc: 'Core Domain & Discipline' },
          { step: 2 as const, number: '02', title: 'ROLE & EXP', desc: 'Target Seniority & YOE' },
          { step: 3 as const, number: '03', title: 'INDUSTRY', desc: 'Target Verticals & GCCs' },
          { step: 4 as const, number: '04', title: 'COMPANY & SIZE', desc: 'Scale, Stage & Package' }
        ].map((s) => {
          const isActive = activeStep === s.step;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl text-left transition flex flex-col justify-between space-y-1 ${
                isActive
                  ? 'bg-teal-500/20 text-white border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-teal-400 font-mono">
                  STEP {s.number}
                </span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
                {s.title}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">{s.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Step Details & Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Function */}
          {activeStep === 1 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">STEP 01</span>
                <h3 className="text-base font-bold text-white">Target Function & Discipline</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Specify the executive leadership function where your highest compounding leverage exists.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Function *</label>
                  <input
                    type="text"
                    value={targetFunction}
                    onChange={(e) => setTargetFunction(e.target.value)}
                    placeholder="e.g. Engineering & Technology Leadership / Product Management"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-teal-400 block">Typical Disciplines:</span>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Engineering & Infrastructure</li>
                      <li>• Platform Architecture & Cloud</li>
                      <li>• Enterprise Product Strategy</li>
                      <li>• AI & Data Engineering</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-sky-400 block">AI Agent Grounding:</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      NOVA, HUNTER, and TAILOR will prioritize keywords, certifications, and technical domains matching this function.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Role & Experience */}
          {activeStep === 2 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">STEP 02</span>
                <h3 className="text-base font-bold text-white">Target Role & Experience Profile</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Define your exact target title and years of proven enterprise experience.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Target Role Title *</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      placeholder="e.g. Director of Engineering / VP Engineering"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Total Years of Experience *</label>
                    <input
                      type="number"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Executive Positioning Summary</label>
                  <textarea
                    rows={4}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Industry */}
          {activeStep === 3 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">STEP 03</span>
                <h3 className="text-base font-bold text-white">Target Industry Verticals</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select industries where your domain expertise and regulatory understanding give you unfair leverage.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Industries (comma-separated)</label>
                  <input
                    type="text"
                    value={targetIndustries}
                    onChange={(e) => setTargetIndustries(e.target.value)}
                    placeholder="FinTech, Global Capability Centers (GCCs), Enterprise SaaS, Cloud Infra"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Geographic Locations</label>
                  <input
                    type="text"
                    value={targetLocations}
                    onChange={(e) => setTargetLocations(e.target.value)}
                    placeholder="Hyderabad, Bengaluru, Pune, Remote, Singapore"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Company Type & Size & Compensation */}
          {activeStep === 4 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">STEP 04</span>
                <h3 className="text-base font-bold text-white">Target Company Scale & Compensation Architecture</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Calibrate your target organization maturity, employee headcount, and ₹1Cr+ compensation envelope.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Company Types</label>
                    <input
                      type="text"
                      value={companyTypes}
                      onChange={(e) => setCompanyTypes(e.target.value)}
                      placeholder="GCCs, Tier 1 Tech, Series C+ Scaleups"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Company Sizes</label>
                    <input
                      type="text"
                      value={companySizes}
                      onChange={(e) => setCompanySizes(e.target.value)}
                      placeholder="1,001–5,000, 5,001–10,000+"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 block flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    Compensation Bands (CTC / Annual Package)
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">Current CTC</label>
                      <input
                        type="text"
                        value={currentComp}
                        onChange={(e) => setCurrentComp(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block">Min. Acceptable</label>
                      <input
                        type="text"
                        value={minAcceptable}
                        onChange={(e) => setMinAcceptable(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-teal-400 font-bold block">Target CTC</label>
                      <input
                        type="text"
                        value={targetComp}
                        onChange={(e) => setTargetComp(e.target.value)}
                        className="w-full bg-slate-900 border border-teal-500/50 rounded-lg px-2.5 py-1.5 text-xs text-teal-300 font-bold font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-emerald-400 font-bold block">Stretch Goal (₹1Cr+)</label>
                      <input
                        type="text"
                        value={stretchGoal}
                        onChange={(e) => setStretchGoal(e.target.value)}
                        className="w-full bg-slate-900 border border-emerald-500/50 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-bold font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Master Identity Information */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Master Identity Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Primary Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Location Base</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">GitHub / Portfolio</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Core Skills & Competencies Manager */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Skills & Competencies</h3>
              <span className="text-xs text-teal-400 font-mono">{masterMemory.skills.length} Loaded</span>
            </div>

            {/* Add Skill Input */}
            <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add skill (e.g. Distributed Systems)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
              <div className="flex items-center justify-between gap-2">
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300"
                >
                  <option value="Technical">Technical</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Domain">Domain</option>
                  <option value="Core">Core</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-1 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-lg transition"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Skills List */}
            <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {masterMemory.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2 bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs group"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{skill.name}</span>
                    <span className="text-[10px] text-teal-400 font-mono">{skill.category}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="text-slate-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
