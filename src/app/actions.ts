'use server';

import { extractResumeData } from '@/ai/flows/extract-resume-data';
import { extractResumeText } from '@/ai/flows/extract-resume-text';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';

export async function extractResumeTextAction(dataUri: string): Promise<string> {
    const { resumeText } = await extractResumeText({ resumeDataUri: dataUri });
    return resumeText;
}

export async function extractResumeDataAction(resumeText: string): Promise<ResumeData> {
  const extractedData = await extractResumeData({ resumeText });
  // Ensure the extracted data matches our schema, providing defaults for missing arrays
  // and mapping simple arrays to object arrays for the form
  const validatedData = resumeSchema.parse({
    ...extractedData,
    coreSkills: extractedData.coreSkills?.map((skill, index) => ({ id: `${index}`, value: skill })) || [],
    education: extractedData.education || [],
    experience: extractedData.experience || [],
    projects: extractedData.projects || [],
    achievements: extractedData.achievements?.map((value, index) => ({ id: `${index}`, value })) || [],
    certifications: extractedData.certifications?.map((value, index) => ({ id: `${index}`, value })) || [],
  });
  return validatedData;
}
