
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
  value: z.string(),
});

const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  dates: z.string(),
});

const experienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  dates: z.string(),
  description: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const achievementSchema = z.object({
  id: z.string(),
  value: z.string(),
});

const certificationSchema = z.object({
    id: z.string(),
    value: z.string(),
});

// This is the final schema for the resume data used throughout the client-side application.
export const resumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().optional(),
  githubLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  professionalSummary: z.string().optional(),
  coreSkills: z.array(skillSchema).optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
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
