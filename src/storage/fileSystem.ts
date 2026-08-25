import { MasterCareerMemory } from '../types/career';
import { db } from './db';

export interface WorkspaceFolderStatus {
  isSupported: boolean;
  isConnected: boolean;
  folderName: string | null;
  lastSynced: string | null;
  storageEstimate?: {
    quota: number;
    usage: number;
    usagePercent: number;
  };
}

let rootDirectoryHandle: any = null;

export async function checkStorageQuota(): Promise<{ quota: number; usage: number; usagePercent: number }> {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      const quota = estimate.quota || 1024 * 1024 * 100;
      const usage = estimate.usage || 0;
      return {
        quota,
        usage,
        usagePercent: Math.round((usage / quota) * 100)
      };
    } catch {
      // ignore
    }
  }
  return { quota: 100 * 1024 * 1024, usage: 1024 * 1024 * 2, usagePercent: 2 };
}

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

export async function requestJobsearchFolder(): Promise<{ success: boolean; folderName: string; error?: string }> {
  if (!isFileSystemAccessSupported()) {
    return {
      success: false,
      folderName: '',
      error: 'File System Access API is not supported in this browser. Local IndexedDB & OPFS persistence are active.'
    };
  }

  try {
    // Prompt user to pick/create Jobsearch directory
    rootDirectoryHandle = await (window as any).showDirectoryPicker({
      mode: 'readwrite',
      startIn: 'documents'
    });

    const folderName = rootDirectoryHandle.name || 'Jobsearch';
    
    // Sync current workspace structure immediately
    await syncAllToFolderHandle(rootDirectoryHandle);

    return {
      success: true,
      folderName
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { success: false, folderName: '', error: 'Folder selection was cancelled by user.' };
    }
    return { success: false, folderName: '', error: err.message || 'Permission denied or error accessing folder.' };
  }
}

export async function disconnectJobsearchFolder(): Promise<void> {
  rootDirectoryHandle = null;
}

export function getActiveFolderHandle(): any {
  return rootDirectoryHandle;
}

// Helper to create or get nested subdirectory
async function getOrCreateSubdir(parentHandle: any, dirName: string): Promise<any> {
  return await parentHandle.getDirectoryHandle(dirName, { create: true });
}

// Helper to write text file
async function writeFile(dirHandle: any, fileName: string, content: string): Promise<void> {
  const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
}

export async function syncAllToFolderHandle(rootHandle: any): Promise<void> {
  if (!rootHandle) return;

  try {
    const masterMemory = (await db.masterMemory.toArray())[0];
    const timeline = await db.careerTimeline.toArray();
    const carStories = await db.carStories.toArray();
    const skills = await db.skills.toArray();
    const contacts = await db.contacts.toArray();
    const leads = await db.leads.toArray();
    const companies = await db.companies.toArray();
    const applications = await db.applications.toArray();
    const masterResume = (await db.masterResume.toArray())[0];
    const booleanSearches = await db.booleanSearches.toArray();
    const winProjects = await db.winProjects.toArray();
    const learningSections = await db.learningSections.toArray();
    const negotiationModels = await db.negotiationModels.toArray();

    // 00_Master_Memory
    const dir00 = await getOrCreateSubdir(rootHandle, '00_Master_Memory');
    if (masterMemory) {
      await writeFile(dir00, 'master-profile.json', JSON.stringify(masterMemory.identity, null, 2));
      await writeFile(dir00, 'master-career-memory.json', JSON.stringify(masterMemory, null, 2));
      await writeFile(dir00, 'career-timeline.json', JSON.stringify(timeline, null, 2));
      await writeFile(dir00, 'achievements.json', JSON.stringify(masterMemory.achievements, null, 2));
      await writeFile(dir00, 'skills.json', JSON.stringify(skills, null, 2));
      await writeFile(dir00, 'certifications.json', JSON.stringify(masterMemory.certifications, null, 2));
      await writeFile(dir00, 'education.json', JSON.stringify(masterMemory.education, null, 2));
    }
    if (masterResume) {
      await writeFile(dir00, 'master-resume.md', masterResume.markdownContent);
      await writeFile(dir00, 'master-resume.txt', masterResume.plainTextContent);
    }

    // 01_Career_Profile
    const dir01 = await getOrCreateSubdir(rootHandle, '01_Career_Profile');
    if (masterMemory) {
      await writeFile(dir01, 'career-diagnosis.json', JSON.stringify(masterMemory.careerSituation, null, 2));
      await writeFile(dir01, 'target-role.json', JSON.stringify(masterMemory.targetProfile, null, 2));
      await writeFile(dir01, 'target-industry.json', JSON.stringify(masterMemory.targetProfile.targetIndustries, null, 2));
      await writeFile(dir01, 'compensation.json', JSON.stringify(masterMemory.targetProfile.targetCompensation, null, 2));
      await writeFile(dir01, 'career-goals.json', JSON.stringify(masterMemory.careerGoals, null, 2));
    }

    // 02_Job_Search
    const dir02 = await getOrCreateSubdir(rootHandle, '02_Job_Search');
    await writeFile(dir02, 'boolean-searches.txt', booleanSearches.map(b => `### ${b.title}\n${b.generatedQueryString}\n`).join('\n'));
    await writeFile(dir02, 'target-companies.json', JSON.stringify(companies, null, 2));

    // 03_Job_Descriptions
    const dir03 = await getOrCreateSubdir(rootHandle, '03_Job_Descriptions');
    await getOrCreateSubdir(dir03, 'incoming');
    await getOrCreateSubdir(dir03, 'analyzed');
    await getOrCreateSubdir(dir03, 'shortlisted');

    // 04_Resumes
    const dir04 = await getOrCreateSubdir(rootHandle, '04_Resumes');
    const dir04Master = await getOrCreateSubdir(dir04, 'master');
    await getOrCreateSubdir(dir04, 'tailored');
    await getOrCreateSubdir(dir04, 'archived');
    if (masterResume) {
      await writeFile(dir04Master, 'master-resume.md', masterResume.markdownContent);
    }

    // 05_Cover_Letters
    await getOrCreateSubdir(rootHandle, '05_Cover_Letters');

    // 06_Applications
    const dir06 = await getOrCreateSubdir(rootHandle, '06_Applications');
    await getOrCreateSubdir(dir06, 'active');
    await getOrCreateSubdir(dir06, 'interviews');
    await getOrCreateSubdir(dir06, 'offers');
    await getOrCreateSubdir(dir06, 'rejected');
    await writeFile(dir06, 'all-applications.json', JSON.stringify(applications, null, 2));

    // 07_Networking
    const dir07 = await getOrCreateSubdir(rootHandle, '07_Networking');
    await getOrCreateSubdir(dir07, 'recruiters');
    await getOrCreateSubdir(dir07, 'hiring-managers');
    await getOrCreateSubdir(dir07, 'referrers');
    await getOrCreateSubdir(dir07, 'alumni');
    await getOrCreateSubdir(dir07, 'outreach');
    await writeFile(dir07, 'contacts.json', JSON.stringify(contacts, null, 2));
    await writeFile(dir07, 'leads.json', JSON.stringify(leads, null, 2));

    // 08_Interviews
    const dir08 = await getOrCreateSubdir(rootHandle, '08_Interviews');
    await getOrCreateSubdir(dir08, 'preparation');
    await getOrCreateSubdir(dir08, 'mock-interviews');
    await getOrCreateSubdir(dir08, 'feedback');

    // 09_Negotiation
    const dir09 = await getOrCreateSubdir(rootHandle, '09_Negotiation');
    await writeFile(dir09, 'negotiation-strategy.json', JSON.stringify(negotiationModels, null, 2));

    // 10_WIN_Projects
    const dir10 = await getOrCreateSubdir(rootHandle, '10_WIN_Projects');
    await writeFile(dir10, 'win-projects.json', JSON.stringify(winProjects, null, 2));

    // 11_LinkedIn
    await getOrCreateSubdir(rootHandle, '11_LinkedIn');

    // 12_Learning
    const dir12 = await getOrCreateSubdir(rootHandle, '12_Learning');
    await writeFile(dir12, 'progress.json', JSON.stringify(learningSections, null, 2));

    // 99_Backups
    const dir99 = await getOrCreateSubdir(rootHandle, '99_Backups');
    const dirDaily = await getOrCreateSubdir(dir99, 'daily');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await writeFile(dirDaily, `backup-${timestamp}.json`, JSON.stringify({
      masterMemory,
      timeline,
      carStories,
      skills,
      contacts,
      leads,
      companies,
      applications,
      masterResume,
      booleanSearches,
      winProjects,
      negotiationModels,
      learningSections
    }, null, 2));

  } catch (e) {
    console.error('Error syncing to Jobsearch folder handle:', e);
  }
}

// Download helper for manual browser export
export function triggerFileDownload(content: string, filename: string, mimeType: string = 'application/json') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
