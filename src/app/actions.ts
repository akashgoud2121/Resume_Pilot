'use server';

import { extractResumeData } from '@/ai/flows/extract-resume-data';
import { calculateAtsScore, CalculateAtsScoreOutput } from '@/ai/flows/calculate-ats-score';
import { generateAtsFeedback, GenerateAtsFeedbackOutput } from '@/ai/flows/generate-ats-feedback';
import { extractResumeText } from '@/ai/flows/extract-resume-text';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';

function stringifyResume(data: ResumeData): string {
    let content = [];
    if (data.name) content.push(`Name: ${data.name}`);
    if (data.email) content.push(`Email: ${data.email}`);
    if (data.mobileNumber) content.push(`Mobile: ${data.mobileNumber}`);
    if (data.linkedinLink) content.push(`LinkedIn: ${data.linkedinLink}`);
    if (data.githubLink) content.push(`GitHub: ${data.githubLink}`);
    if (data.professionalSummary) content.push(`\nProfessional Summary:\n${data.professionalSummary}`);
    if (data.coreSkills && data.coreSkills.length > 0) content.push(`\nCore Skills:\n${data.coreSkills.join(', ')}`);
    if (data.experience && data.experience.length > 0) {
        content.push(`\nExperience:\n${data.experience.map(exp => `${exp.title} at ${exp.company} (${exp.dates})\n${exp.description}`).join('\n\n')}`);
    }
    if (data.education && data.education.length > 0) {
        content.push(`\nEducation:\n${data.education.map(edu => `${edu.degree} from ${edu.institution} (${edu.dates})`).join('\n')}`);
    }
    if (data.projects && data.projects.length > 0) {
        content.push(`\nProjects:\n${data.projects.map(p => `${p.name}\n${p.description}`).join('\n\n')}`);
    }
    if (data.achievements && data.achievements.length > 0) {
        content.push(`\nAchievements:\n- ${data.achievements.map(a => a.value).join('\n- ')}`);
    }
    if (data.certifications && data.certifications.length > 0) {
        content.push(`\nCertifications:\n- ${data.certifications.map(c => c.value).join('\n- ')}`);
    }
    return content.join('\n');
}

export async function extractResumeTextAction(dataUri: string): Promise<string> {
    const { resumeText } = await extractResumeText({ resumeDataUri: dataUri });
    return resumeText;
}

export async function extractResumeDataAction(resumeText: string): Promise<ResumeData> {
  const extractedData = await extractResumeData({ resumeText });
  // Ensure the extracted data matches our schema, providing defaults for missing arrays
  const validatedData = resumeSchema.parse({
    ...extractedData,
    achievements: extractedData.achievements?.map(value => ({ value })) || [],
    certifications: extractedData.certifications?.map(value => ({ value })) || [],
  });
  return validatedData;
}

export async function calculateAtsScoreAction(resumeData: ResumeData): Promise<CalculateAtsScoreOutput> {
  const resumeText = stringifyResume(resumeData);
  if (!resumeText.trim()) {
    throw new Error('Resume data is empty.');
  }
  return await calculateAtsScore({ resumeText });
}

export async function getDetailedFeedbackAction(resumeText: string, atsScore: number): Promise<GenerateAtsFeedbackOutput> {
    if (!resumeText.trim()) {
        throw new Error('Resume data is empty.');
    }
    return await generateAtsFeedback({ resumeText, atsScore });
}
