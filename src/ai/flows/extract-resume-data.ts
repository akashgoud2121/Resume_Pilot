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
  resumeText: z
    .string()
    .describe('The text content of the resume to be parsed.'),
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
  prompt: `You are an expert resume parser. Extract the information from the provided resume text, which may be from a multi-page document.

Analyze the entire text carefully and populate the fields in the requested JSON format. It is critical that you adhere to the provided schema. If a section or a specific field (like githubLink, achievements, etc.) is not present in the resume, you must return an empty string for string fields or an empty array for array fields. Do not omit any fields from the JSON output, even if they are empty.

- For githubLink, if you find a username but not a full URL, construct the full URL like 'https://github.com/username'. If no username is found, return an empty string.
- For linkedinLink, if you find a partial path like 'in/username', construct the full URL like 'https://linkedin.com/in/username'. If nothing is found, return an empty string.

Resume Text:
{{{resumeText}}}
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
    if (!output) {
      throw new Error('AI failed to extract resume data. The output was empty.');
    }
    return output;
  }
);
