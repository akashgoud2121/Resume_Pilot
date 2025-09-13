
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
  // Sanitize the data rigorously to ensure no undefined or null values reach the form.
  const sanitizedData = {
    name: extractedData.name ?? '',
    email: extractedData.email ?? '',
    mobileNumber: extractedData.mobileNumber ?? '',
    githubLink: extractedData.githubLink ?? '',
    linkedinLink: extractedData.linkedinLink ?? '',
    professionalSummary: extractedData.professionalSummary ?? '',
    coreSkills: (extractedData.coreSkills ?? []).map((skill, index) => ({ id: `${Date.now()}-${index}`, value: skill ?? '' })),
    education: (extractedData.education ?? []).map((item, index) => ({ 
        id: `${Date.now()}-${index}`,
        institution: item.institution ?? '',
        degree: item.degree ?? '',
        dates: item.dates ?? '',
    })),
    experience: (extractedData.experience ?? []).map((item, index) => ({
        id: `${Date.now()}-${index}`,
        title: item.title ?? '',
        company: item.company ?? '',
        dates: item.dates ?? '',
        description: item.description ?? '',
     })),
    projects: (extractedData.projects ?? []).map((item, index) => ({
        id: `${Date.now()}-${index}`,
        name: item.name ?? '',
        description: item.description ?? '',
    })),
    achievements: (extractedData.achievements ?? []).map((value, index) => ({ id: `${Date.now()}-${index}`, value: value ?? '' })),
    certifications: (extractedData.certifications ?? []).map((value, index) => ({ id: `${Date.now()}-${index}`, value: value ?? '' })),
  };

  // Validate the sanitized data to ensure it conforms to the schema.
  const validatedData = resumeSchema.parse(sanitizedData);
  return validatedData;
}

export async function generateResumeFromPortfolioAction(documents: PortfolioDocument[]): Promise<ResumeData> {
    const extractedData = await generateResumeFromPortfolio({ documents });

    const sanitizedData = {
        name: extractedData.name ?? '',
        email: extractedData.email ?? '',
        mobileNumber: extractedData.mobileNumber ?? '',
        githubLink: extractedData.githubLink ?? '',
        linkedinLink: extractedData.linkedinLink ?? '',
        professionalSummary: extractedData.professionalSummary ?? '',
        coreSkills: (extractedData.coreSkills ?? []).map((skill, index) => ({ id: `${Date.now()}-${index}`, value: skill ?? '' })),
        education: (extractedData.education ?? []).map((item, index) => ({ 
            id: `${Date.now()}-${index}`,
            institution: item.institution ?? '',
            degree: item.degree ?? '',
            dates: item.dates ?? '',
        })),
        experience: (extractedData.experience ?? []).map((item, index) => ({
            id: `${Date.now()}-${index}`,
            title: item.title ?? '',
            company: item.company ?? '',
            dates: item.dates ?? '',
            description: item.description ?? '',
        })),
        projects: (extractedData.projects ?? []).map((item, index) => ({
            id: `${Date.now()}-${index}`,
            name: item.name ?? '',
            description: item.description ?? '',
        })),
        achievements: (extractedData.achievements ?? []).map((value, index) => ({ id: `${Date.now()}-${index}`, value: value ?? '' })),
        certifications: (extractedData.certifications ?? []).map((value, index) => ({ id: `${Date.now()}-${index}`, value: value ?? '' })),
    };

    const validatedData = resumeSchema.parse(sanitizedData);
    return validatedData;
}

export async function synthesizePortfolioTextAction(documents: PortfolioDocument[]): Promise<string> {
    const { synthesizedText } = await synthesizePortfolioText({ documents });
    return synthesizedText;
}
