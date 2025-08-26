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
  const validatedData = resumeSchema.parse({
    ...extractedData,
    achievements: extractedData.achievements?.map(value => ({ value })) || [],
    certifications: extractedData.certifications?.map(value => ({ value })) || [],
  });
  return validatedData;
}
