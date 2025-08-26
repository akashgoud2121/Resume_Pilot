'use server';

import { extractResumeData } from '@/ai/flows/extract-resume-data';
import { extractResumeText } from '@/ai/flows/extract-resume-text';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';
import htmlToDocx from 'html-to-docx';


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

export async function generateDocxAction(htmlContent: string): Promise<Buffer> {
  const fileBuffer = await htmlToDocx(htmlContent, undefined, {
    margins: {
      top: 720,
      bottom: 720,
      left: 720,
      right: 720,
    },
  });

  return fileBuffer as Buffer;
}
