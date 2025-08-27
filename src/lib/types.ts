import { z } from 'zod';

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
