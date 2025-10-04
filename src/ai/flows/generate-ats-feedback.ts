
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
      'AI-generated feedback on how to improve the resume to achieve a higher ATS score. The feedback should be well-structured, easy to read, and use bullet points or numbered lists for suggestions.'
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
  prompt: `You are an expert resume optimization consultant providing feedback on a resume.

The resume text is as follows:
{{{resumeText}}}

The current ATS score is: {{{atsScore}}}/100.

Your task is to provide a detailed, step-by-step improvement plan that is clear, actionable, and formatted for excellent readability.

Instructions:
1.  Start with a brief, encouraging opening statement.
2.  Organize your feedback into logical sections (e.g., "Keyword Optimization," "Formatting and Structure," "Impactful Language").
3.  Under each section, use bullet points (using the '-' character) or a numbered list to provide specific, actionable suggestions.
4.  For keyword suggestions, provide examples relevant to the user's field if possible.
5.  Keep the tone professional, direct, and helpful.
6.  Ensure the final output is a single string with proper line breaks for formatting.
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
    if (!output) {
      throw new Error('AI failed to generate feedback.');
    }
    return output;
  }
);
