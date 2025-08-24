import { z } from 'zod';

export const resumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().optional(),
  githubLink: z.string().url().optional().or(z.literal('')),
  linkedinLink: z.string().url().optional().or(z.literal('')),
  professionalSummary: z.string().optional(),
  coreSkills: z.array(z.string()).optional(),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    dates: z.string(),
  })).optional(),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    dates: z.string(),
    description: z.string(),
  })).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })).optional(),
  achievements: z.array(z.object({ value: z.string() })).optional(),
  certifications: z.array(z.object({ value: z.string() })).optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>;
