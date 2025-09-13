
'use server';

import { extractResumeData } from '@/ai/flows/extract-resume-data';
import { extractResumeText } from '@/ai/flows/extract-resume-text';
import { generateResumeFromPortfolio } from '@/ai/flows/generate-resume-from-portfolio';
import { synthesizePortfolioText } from '@/ai/flows/synthesize-portfolio-text';
import type { ResumeData, PortfolioDocument } from '@/lib/types';
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
    name: extractedData.name ?? '',
    email: extractedData.email ?? '',
    mobileNumber: extractedData.mobileNumber ?? '',
    githubLink: extractedData.githubLink ?? '',
    linkedinLink: extractedData.linkedinLink ?? '',
    professionalSummary: extractedData.professionalSummary ?? '',
    coreSkills: extractedData.coreSkills?.map((skill, index) => ({ id: `${Date.now()}-${index}`, value: skill })) || [],
    education: extractedData.education?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    experience: extractedData.experience?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    projects: extractedData.projects?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
    achievements: extractedData.achievements?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
    certifications: extractedData.certifications?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
  });
  return validatedData;
}

export async function generateResumeFromPortfolioAction(documents: PortfolioDocument[]): Promise<ResumeData> {
    const extractedData = await generateResumeFromPortfolio({ documents });

    const validatedData = resumeSchema.parse({
        name: extractedData.name ?? '',
        email: extractedData.email ?? '',
        mobileNumber: extractedData.mobileNumber ?? '',
        githubLink: extractedData.githubLink ?? '',
        linkedinLink: extractedData.linkedinLink ?? '',
        professionalSummary: extractedData.professionalSummary ?? '',
        coreSkills: extractedData.coreSkills?.map((skill, index) => ({ id: `${Date.now()}-${index}`, value: skill })) || [],
        education: extractedData.education?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
        experience: extractedData.experience?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
        projects: extractedData.projects?.map((item, index) => ({ ...item, id: `${Date.now()}-${index}` })) || [],
        achievements: extractedData.achievements?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
        certifications: extractedData.certifications?.map((value, index) => ({ id: `${Date.now()}-${index}`, value })) || [],
    });

    return validatedData;
}

export async function synthesizePortfolioTextAction(documents: PortfolioDocument[]): Promise<string> {
    const { synthesizedText } = await synthesizePortfolioText({ documents });
    return synthesizedText;
}
