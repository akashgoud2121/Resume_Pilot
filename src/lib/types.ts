
import { z } from 'zod';

// This is the base schema returned by the AI. It doesn't have form-specific `id` fields.
export const ExtractResumeDataOutputSchema = z.object({
  name: z.string().describe('The name of the resume owner.'),
  email: z.string().describe('The email address of the resume owner.'),
  mobileNumber: z.string().describe('The mobile number of the resume owner.'),
  githubLink: z.string().describe('The GitHub link of the resume owner.'),
  linkedinLink: z.string().describe('The LinkedIn link of the resume owner.'),
  professionalSummary: z.string().describe('A professional summary of the resume owner.'),
  coreSkills: z.array(z.string()).describe('A list of core skills of the resume owner.'),
  education: z
    .array(
      z.object({
        institution: z.string().describe('The name of the educational institution.'),
        degree: z.string().describe('The degree obtained.'),
        dates: z.string().describe('The dates of attendance.'),
      })
    )
    .describe('A list of the resume owner educational history.'),
  experience:
    z
      .array(
        z.object({
          title: z.string().describe('The job title.'),
          company: z.string().describe('The name of the company.'),
          dates: z.string().describe('The dates of employment.'),
          description: z.string().describe('A description of the job responsibilities.'),
        })
      )
      .describe('A list of the resume owner work experience.'),
  projects:
    z
      .array(
        z.object({
          name: z.string().describe('The name of the project.'),
          description: z.string().describe('A description of the project.'),
        })
      )
      .describe('A list of the resume owner projects.'),
  achievements: z.array(z.string()).describe('A list of the resume owner achievements.'),
  certifications: z.array(z.string()).describe('A list of the resume owner certifications.'),
});

// These are the schemas for the forms, which require a unique `id` for each item in an array.
const skillSchema = z.object({
  id: z.string(),
  value: z.string().default(''),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required').default(''),
  degree: z.string().min(1, 'Degree is required').default(''),
  dates: z.string().default(''),
});

const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Job title is required').default(''),
  company: z.string().min(1, 'Company is required').default(''),
  dates: z.string().default(''),
  description: z.string().default(''),
});

const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required').default(''),
  description: z.string().default(''),
});

const achievementSchema = z.object({
  id: z.string(),
  value: z.string().min(1, 'Achievement is required').default(''),
});

const certificationSchema = z.object({
    id: z.string(),
    value: z.string().min(1, 'Certification is required').default(''),
});

// This is the final schema for the resume data used throughout the client-side application.
export const resumeSchema = z.object({
  name: z.string().default(''),
  email: z.string().email({ message: "Invalid email address" }).or(z.literal('')).default(''),
  mobileNumber: z.string().default(''),
  githubLink: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
  linkedinLink: z.string().url({ message: "Invalid URL" }).or(z.literal('')).default(''),
  professionalSummary: z.string().default(''),
  coreSkills: z.array(skillSchema).default([]),
  education: z.array(educationSchema).default([]),
  experience: z.array(experienceSchema).default([]),
  projects: z.array(projectSchema).default([]),
  achievements: z.array(achievementSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;

export type PortfolioDocument = {
    type: 'certificate' | 'project' | 'other';
    fileName: string;
    dataUri: string;
};

const PortfolioDocumentSchema = z.object({
  type: z.enum(['certificate', 'project', 'other']).describe('The type of the document.'),
  fileName: z.string().describe('The name of the uploaded file.'),
  dataUri: z.string().describe("The document content as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'"),
});

export const GenerateResumeFromPortfolioInputSchema = z.object({
    documents: z.array(PortfolioDocumentSchema).describe('An array of portfolio documents.'),
});
