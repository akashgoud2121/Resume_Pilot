'use server';

/**
 * @fileOverview A flow that generates feedback to improve a resume's ATS score.
 *
 * - generateAtsFeedback - A function that generates ATS feedback for a resume.
 * - GenerateAtsFeedbackInput - The input type for the generateAtsFeedback function.
 * - GenerateAtsFeedbackOutput - The return type for the generateAtsFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAtsFeedbackInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text extracted from the resume to be evaluated.'),
  atsScore: z.number().describe('The current ATS score of the resume.'),
});
export type GenerateAtsFeedbackInput = z.infer<typeof GenerateAtsFeedbackInputSchema>;

const GenerateAtsFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'AI-generated feedback on how to improve the resume to achieve a higher ATS score.'
    ),
});
export type GenerateAtsFeedbackOutput = z.infer<typeof GenerateAtsFeedbackOutputSchema>;

export async function generateAtsFeedback(input: GenerateAtsFeedbackInput): Promise<GenerateAtsFeedbackOutput> {
  return generateAtsFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAtsFeedbackPrompt',
  input: {schema: GenerateAtsFeedbackInputSchema},
  output: {schema: GenerateAtsFeedbackOutputSchema},
  prompt: `You are an expert resume optimization consultant.

You are evaluating a resume to provide actionable feedback that will improve its ATS score.

Here is the resume text:
{{{resumeText}}}

The current ATS score is: {{{atsScore}}}

Provide a detailed, step-by-step improvement plan. Suggest relevant keywords, formatting adjustments, and structural improvements. Be direct, critical, and encouraging. Focus on creating a clear, impactful, and ATS-friendly resume.
`,
});

const generateAtsFeedbackFlow = ai.defineFlow(
  {
    name: 'generateAtsFeedbackFlow',
    inputSchema: GenerateAtsFeedbackInputSchema,
    outputSchema: GenerateAtsFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
