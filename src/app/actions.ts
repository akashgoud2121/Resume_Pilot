
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
    coreSkills: extractedData.coreSkills?.map((skill, index) => ({ id: `${Date.now()}-${index}`, value: skill })) || [],
    education: extractedData.education?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    experience: extractedData.experience?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    projects: extractedData.projects?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    achievements: extractedData.achievements?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
    certifications: extractedData.certifications?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
  });
  return validatedData;
}
