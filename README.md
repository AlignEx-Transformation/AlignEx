# Alignex — AI Career Consulting CRM

Alignex is a modern, local-first AI Career Consulting CRM & Personal Career Command Center built with React, TypeScript, Tailwind CSS, Dexie (IndexedDB), and OPFS persistent storage.

---

## 🌟 Instant 1-Click Launch (Exact Same App as Preview)

**Option A: Double-Click Standalone Web App**
- Open **`alignex-app.html`** or **`dist/index.html`** in this folder by double-clicking it.
- **100% Identical to the Preview**: Full React application containing all 12 modules, JD match engine ($\ge 60\%$ Recommended badges), 200-word gap dossiers, master career memory, application kanban board, executive search engine, and local storage.
- **Works Offline**: Zero Node.js, zero dependencies, and zero login required.

---

## 🚀 Alternative Ways to Run Locally

### Option 1: Standard Node.js / NPM (Recommended)

1. Open your terminal / command prompt in this extracted folder.
2. Install the dependencies (one-time setup):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at:
   ```
   http://localhost:3000
   ```

---

### Option 2: 1-Click Double-Click Starter

- **Windows Users**: Double-click `start.bat` in this folder.
- **Mac / Linux Users**: Double-click or run `./start.sh` in terminal.

---

### Option 3: Production Build & Static Preview

If you want to compile a standalone static bundle:

1. Build the production output:
   ```bash
   npm run build
   ```
2. Preview the built app:
   ```bash
   npm run preview
   ```
   Or serve the `dist/` directory with any static server:
   ```bash
   npx serve dist
   ```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Local Persistence**: Dexie.js (IndexedDB) + Master Career Memory
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite 6
