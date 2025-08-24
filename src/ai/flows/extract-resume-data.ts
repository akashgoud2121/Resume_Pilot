'use server';

/**
 * @fileOverview A resume data extraction AI agent.
 *
 * - extractResumeData - A function that handles the resume data extraction process.
 * - ExtractResumeDataInput - The input type for the extractResumeData function.
 * - ExtractResumeDataOutput - The return type for the extractResumeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractResumeDataInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume data, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractResumeDataInput = z.infer<typeof ExtractResumeDataInputSchema>;

const ExtractResumeDataOutputSchema = z.object({
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
export type ExtractResumeDataOutput = z.infer<typeof ExtractResumeDataOutputSchema>;

export async function extractResumeData(input: ExtractResumeDataInput): Promise<ExtractResumeDataOutput> {
  return extractResumeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractResumeDataPrompt',
  input: {schema: ExtractResumeDataInputSchema},
  output: {schema: ExtractResumeDataOutputSchema},
  prompt: `You are an expert resume parser. Extract the information from the provided resume.

Analyze the document carefully and populate the fields in the requested JSON format. If a section is not present in the resume, return an empty string or an empty array for the corresponding field.

Resume: {{media url=resumeDataUri}}
  `,
});

const extractResumeDataFlow = ai.defineFlow(
  {
    name: 'extractResumeDataFlow',
    inputSchema: ExtractResumeDataInputSchema,
    outputSchema: ExtractResumeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
