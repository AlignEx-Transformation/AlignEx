import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Edit3, 
  Eye, 
  Save, 
  FolderSync, 
  Layers, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ResumeStudioPage: React.FC = () => {
  const { masterMemory, updateMasterMemory, addToast, setCurrentPage } = useApp();

  const [activeTab, setActiveTab] = useState<'master' | 'tailored' | 'cover-letter'>('master');
  const [resumeText, setResumeText] = useState(
    masterMemory.masterResumeMarkdown || `# ${masterMemory.identity.fullName}
**${masterMemory.targetProfile.targetRole}**
${masterMemory.identity.location} | ${masterMemory.identity.email} | ${masterMemory.identity.phone} | [LinkedIn](${masterMemory.identity.linkedin || masterMemory.identity.linkedinUrl || 'https://linkedin.com'})

---

## EXECUTIVE SUMMARY
${masterMemory.identity.summary || masterMemory.careerSummary || 'Visionary Engineering Leader with 16+ years architecting high-scale distributed systems, cloud migrations, and leading high-performing engineering squads.'}

---

## CORE COMPETENCIES & TECHNICAL PROFICIENCIES
- **Distributed Architecture:** Microservices, Event-Driven Architecture, Zero-Downtime Migration, High Availability
- **Cloud & DevOps:** AWS, Kubernetes, Terraform, Docker, CI/CD, FinOps Telemetry
- **Engineering Leadership:** 40+ Team Management, OKR Alignment, Cross-Functional Execution, Agile Delivery
- **Languages & Databases:** Go, Python, Java, PostgreSQL, Kafka, Redis, Snowflake

---

## PROFESSIONAL EXPERIENCE

### **Lead Principal Architect / Director of Engineering**
*Tier 1 Global Capability Center (GCC)* | 2021 – Present
- Architected zero-downtime core banking migration handling 4.5M TPS with 99.999% availability SLA.
- Reduced multi-region AWS cloud infrastructure compute expenses by $450K annually via container autoscaling and FinOps governance.
- Spearheaded telemetry observability across 80+ microservices, slashing Mean-Time-To-Resolution (MTTR) by 35%.
- Mentored and scaled an engineering organization of 45+ distributed engineers across India and US timezones.

### **Senior Platform Engineering Manager**
*Enterprise FinTech Solutions* | 2018 – 2021
- Led engineering transformation modernizing legacy monoliths into cloud-native Kubernetes clusters.
- Instituted automated security scanning (SAST/DAST) in CI/CD pipeline, reducing vulnerability time-to-patch by 50%.
- Designed event-driven payment reconciliation system processing $12B+ in annual transaction volume.

---

## KEY ACHIEVEMENTS & CAR EVIDENCE
- **Zero Downtime Banking Migration:** 4.5M TPS distributed architecture overhaul.
- **FinOps Cloud Governance:** $450K annual infrastructure cost optimization.
- **Observability Modernization:** 35% reduction in production incident MTTR.

---

## EDUCATION & CERTIFICATIONS
- **Master of Science / Bachelor of Technology** in Computer Science & Engineering
- **AWS Certified Solutions Architect – Professional**
- **Certified Kubernetes Administrator (CKA)**
`
  );

  const [isLivePreview, setIsLivePreview] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleSaveMasterResume = () => {
    updateMasterMemory((prev) => ({
      ...prev,
      masterResumeMarkdown: resumeText,
      version: (prev.version || 1) + 1
    }));
    addToast({ title: 'Master Resume Saved', message: 'Local Career Memory updated.', type: 'success' });
  };

  const handleDownloadMD = () => {
    const blob = new Blob([resumeText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${masterMemory.identity.fullName.replace(/\s+/g, '_')}_Master_Resume.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ title: 'Downloaded Markdown Resume', type: 'success' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    addToast({ title: 'Resume copied to clipboard', type: 'success' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-teal-400" />
            Resume Studio & Master Memory Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Single Source of Truth: Edit your comprehensive master resume and generate ATS-compliant variations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setCurrentPage('tailor')}
            className="px-3.5 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tailor to Specific JD</span>
          </button>

          <button
            onClick={handleDownloadMD}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Download .md</span>
          </button>

          <button
            onClick={handleSaveMasterResume}
            id="save-master-resume-button"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Version</span>
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Markdown Editor */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Markdown Editor
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs rounded-lg flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="flex-1 w-full bg-slate-950 border border-slate-850 rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-teal-500 resize-none leading-relaxed scrollbar-thin scrollbar-thumb-slate-800"
          />
        </div>

        {/* Right: Live ATS Rendered Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              Live ATS Clean Format
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              ATS-Proof (No Columns)
            </span>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-950 p-6 rounded-xl border border-slate-850 text-slate-200 text-xs leading-relaxed space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
            <div className="prose prose-invert prose-xs max-w-none prose-h1:text-lg prose-h1:font-bold prose-h1:text-white prose-h2:text-xs prose-h2:font-bold prose-h2:text-teal-400 prose-h2:uppercase prose-h2:tracking-wider prose-h3:text-xs prose-h3:font-semibold prose-h3:text-slate-100 prose-hr:border-slate-800 prose-li:my-0.5">
              <ReactMarkdown>{resumeText}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
