# Alignex — Executive Career Command Center & AI Consulting CRM
### Complete User Manual & GitHub Deployment Guide

---

## 📋 Table of Contents
1. [Overview & Architecture](#-overview--architecture)
2. [Is This Download Workable on GitHub?](#-is-this-download-workable-on-github)
3. [How to Deploy to GitHub & GitHub Pages (Free Hosting)](#-how-to-deploy-to-github--github-pages)
4. [3 Ways to Run Locally](#-3-ways-to-run-locally)
5. [Comprehensive User Manual (Module by Module)](#-comprehensive-user-manual)
   - [Module 1: Executive Dashboard & Target Positioning](#module-1-executive-dashboard--target-positioning)
   - [Module 2: JD Identification & Match Scoring Engine (≥60% Standard)](#module-2-jd-identification--match-scoring-engine)
   - [Module 3: Executive Gap Resolution Dossier (~200 Words / Strategic Note)](#module-3-executive-gap-resolution-dossier)
   - [Module 4: Master Career Memory & Quantified CAR Stories](#module-4-master-career-memory)
   - [Module 5: Enterprise Boolean Search & Recruiter Hub](#module-5-enterprise-boolean-search)
   - [Module 6: Application Kanban Board](#module-6-application-kanban-board)
   - [Module 7: Executive Contact CRM & Lead Tracker](#module-7-executive-contact-crm)
   - [Module 8: ₹1.10 Crore Career Math & Compensation Engine](#module-8-110-crore-career-math)
   - [Module 9: Specialized AI Consulting Agents (NOVA, TAILOR, COACH)](#module-9-specialized-ai-consulting-agents)
6. [Data Sovereignty, Privacy & Offline Backups](#-data-sovereignty-privacy--backups)
7. [Troubleshooting & FAQs](#-troubleshooting--faqs)

---

## 🏛 Overview & Architecture

**Alignex** is an executive-grade Career Command Center and Consulting CRM tailored for senior technology leaders. It provides algorithmic Job Description (JD) matching, gap difference analysis, 200-word strategic executive bridging notes, and compensation planning.

- **Candidate Profile**: Grounded for **Poornima Harikumar** (*Director of Engineering / Senior Director of Technical Program Management & AI Enablement*).
- **Core Metrics**: 16+ Years Experience, 4.5M TPS zero-downtime banking migration, $450K/yr FinOps savings, and scaling 38–65 distributed engineers.
- **Architecture**: 100% Local-First React 19 + TypeScript SPA with zero external database dependencies. Data is stored securely in your browser's IndexedDB.

---

## 🐙 Is This Download Workable on GitHub?

**YES, 100% Workable.** The codebase is structured as a production-grade, standard Node.js / Vite / React repository ready for:
1. **GitHub Repositories**: Push directly with standard Git commands.
2. **GitHub Pages (Free Web Hosting)**: Pre-configured with `.github/workflows/deploy.yml` for automated 1-click CI/CD hosting.
3. **Vercel / Netlify / Cloudflare Pages**: Connect your GitHub repo and deploy in under 60 seconds (Build command: `npm run build`, Output directory: `dist`).
4. **Standalone Portability**: Includes the zero-dependency, self-contained single-file build (`alignex-app.html`) that runs on any browser with zero installation.

---

## 🚀 How to Deploy to GitHub & GitHub Pages

### Step 1: Initialize Git and Push to Your GitHub Repository
Open a terminal in this extracted project folder:

```bash
# 1. Initialize local git repository (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Commit changes
git commit -m "Initial commit of Alignex Executive Career Command Center"

# 4. Set main branch
git branch -M main

# 5. Link to your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/alignex-career-command.git

# 6. Push code to GitHub
git push -u origin main
```

---

### Step 2: Enable Automated GitHub Pages (Free Live URL)
This repository includes a pre-built GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Go to your repository on **GitHub.com**.
2. Click **Settings** &rarr; **Pages** (on the left sidebar).
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. That's it! GitHub will automatically build and publish your app at:
   `https://YOUR_USERNAME.github.io/alignex-career-command/`

---

## 💻 3 Ways to Run Locally

### Option 1: Instant 1-Click Offline App (Zero Install / Zero Login)
- Simply double-click **`alignex-app.html`** or **`dist/index.html`** in your file explorer.
- Opens instantly in Google Chrome, Microsoft Edge, Safari, Mozilla Firefox, or Brave.
- No Node.js, no terminal, and no internet connection required.

### Option 2: Node.js Developer Server (Hot-Reloading)
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser at http://localhost:3000
```

### Option 3: Double-Click Batch Launchers
- **Windows**: Double-click `start.bat`
- **Mac / Linux**: Double-click or execute `./start.sh`

---

## 📖 Comprehensive User Manual

### Module 1: Executive Dashboard & Target Positioning
- **Overview**: Displays top-level KPIs including ₹1.10 Crore target compensation, 88% Director JD alignment rate, $450K FinOps savings, and 4.5M TPS banking platform concurrency.
- **Top Quick Links**: Switch between **Overview & Pipeline**, **JD Matcher & 200-Word Gap Dossier**, **Enterprise & Boolean Hub**, and **Mission Control & Strategy**.

### Module 2: JD Identification & Match Scoring Engine
- **Algorithmic Fit Standard**:
  - **Score $\ge 60\%$ (RECOMMENDED)**: Highlighted with an emerald badge indicating strong structural alignment for Director/VP leadership requisitions.
  - **Score $< 60\%$ (NOT RECOMMENDED)**: Highlighted with an amber/rose caution badge indicating fundamental role mismatch (e.g., junior IC roles).
- **Multi-Dimensional Breakdown**: Calculates scores across Keywords (94%), Platform Architecture (86%), Scaled Program Delivery (92%), and Executive Leadership (90%).
- **Pre-Loaded Director JDs**: Instant 1-click evaluation for:
  - *Anthropic / Scale AI GCC*: Director of Engineering & AI Enablement (88% Match &bull; Recommended)
  - *Goldman Sachs Tech*: Senior Director — Technical Program Management (91% Match &bull; Recommended)
  - *J.P. Morgan FinTech*: VP / Head of Platform & AI Modernization (85% Match &bull; Recommended)
- **Custom JD Evaluation**: Paste any external JD text or adjust company/role titles, then click **"Re-score & Analyze Gaps"**.

### Module 3: Executive Gap Resolution Dossier (~200 Words / Strategic Note)
- **Separate Page Mode**: View the full-screen executive briefing dossier by clicking **"200-Word Gap Dossier"** in the top navigation or sub-tabs.
- **Individual 200-Word Dossier Structure**:
  1. **Market & Committee Context** (~40 words): Explains why enterprise search committees test this capability.
  2. **Resume Framing & Transferable CAR Proof** (~60 words): Concrete instructions on reframing Poornima's metrics to bridge the difference.
  3. **Executive Interview Talking Points** (~60 words): Exact phrasing to use during VP/CTO interviews.
  4. **30-Day Fast-Track Action Roadmap** (~40 words): Actionable certifications and architectural artifacts to produce.
- **Direct Export Options**: 1-click **"Copy All 200-Word Notes"** or **"Export PDF Briefing"** via standard browser print dialog.

### Module 4: Master Career Memory
- **Candidate Grounding**: Full identity records for **Poornima Harikumar**.
- **16+ Year Chronology**: Detailed scope covering Hudson's Bay Company (Director/Senior TPM scope), Tata Consultancy Services (Core Banking), and Enterprise FinOps.
- **Quantified CAR Evidence Library**: 8+ verified Challenge-Action-Result stories with hard numerical metrics (4.5M TPS, $450K FinOps, 35% MTTR cut, 42% latency reduction).

### Module 5: Enterprise Boolean Search & Recruiter Hub
- Generates precision Boolean search queries for LinkedIn Recruiter, Google X-Ray, and job aggregators targeting:
  - `("Director of Engineering" OR "Senior Director") AND ("AI Enablement" OR "LLMOps" OR "Platform") AND ("FinOps" OR "Microservices") AND (Bengaluru OR Hyderabad OR Remote)`
- Includes 1-click copyable outreach templates tailored for Executive Search Partners and Managing Directors.

### Module 6: Application Kanban Board
- Visual drag-and-drop / stage management for active leadership opportunities across 6 stages:
  - **Identified & Scored** &rarr; **Tailored & Ready** &rarr; **Referral Requested** &rarr; **Interviewing** &rarr; **Offer Stage** &rarr; **Archived**.
- Track interview rounds, dates, contacts, and custom notes per opportunity.

### Module 7: Executive Contact CRM & Lead Tracker
- Manage executive recruiters, hiring managers, and industry peers with interaction logs, last contact timestamps, and follow-up reminders.

### Module 8: ₹1.10 Crore Career Math & Compensation Engine
- **Fixed Base**: ₹85,00,000 / year (approx ₹4.8L/month in-hand post-tax).
- **Annual Performance Bonus (25%)**: ₹21,25,000 tied to DORA velocity and uptime SLAs.
- **Long-Term RSUs/Equity**: ₹15,00,000 / year on a 4-year vesting schedule.
- **Total On-Target Earnings (OTE)**: **₹1,21,25,000 / year** (Top 2% Indian Tech Leadership percentile).

### Module 9: Specialized AI Consulting Agents
- **NOVA**: General Career Strategist and executive positioning copilot.
- **TAILOR**: ATS resume optimizer and cover letter generator.
- **COACH**: Executive interview simulation and behavioral CAR sparring partner.
- **NEGOTIATOR**: C-suite compensation and equity package advisory.

---

## 🔒 Data Sovereignty, Privacy & Backups

Alignex is designed with a **100% Local-First** security philosophy:
1. **Zero External Databases**: No telemetry, analytics, or user data is transmitted to third-party databases.
2. **Local Persistence**: All profile edits, JD evaluations, and application changes are saved in your browser's IndexedDB storage.
3. **Backup Export**: Click **"Backup JSON"** in the navigation bar or **"Local Memory Active"** modal to download a complete JSON snapshot of your career records.
4. **Instant Restore**: Load your backup JSON anytime on a new machine or different browser with 1 click.

---

## ❓ Troubleshooting & FAQs

#### Q1: Can I push this repository directly to GitHub?
**Yes.** All source files, configuration (`tsconfig.json`, `vite.config.ts`, `package.json`), and CI/CD workflows are ready. Simply run `git push origin main`.

#### Q2: How do I run the app without installing Node.js?
Double-click `alignex-app.html`. It contains the complete bundled application in a single file and opens in any web browser with zero dependencies.

#### Q3: How do I customize Poornima's profile or add my own roles?
Navigate to the **Career Profile** or **Master Memory** page in the application, update the fields, and click **Save Changes**. Your updates are automatically persisted.

---

*Alignex Executive Career Command Center &bull; Production Version 1.0 &bull; 2026*
