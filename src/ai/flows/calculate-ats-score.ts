'use server';

/**
 * @fileOverview This file defines the Genkit flow for calculating the ATS score of a resume.
 *
 * - calculateAtsScore - A function that calculates the ATS score for a given resume.
 * - CalculateAtsScoreInput - The input type for the calculateAtsScore function.
 * - CalculateAtsScoreOutput - The return type for the calculateAtsScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateAtsScoreInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be evaluated.'),
});
export type CalculateAtsScoreInput = z.infer<typeof CalculateAtsScoreInputSchema>;

const CalculateAtsScoreOutputSchema = z.object({
  atsScore: z
    .number()
    .describe(
      'The calculated ATS score for the resume, ranging from 0 to 100. A higher score indicates better ATS compatibility.'
    ),
  feedback: z
    .string()
    .describe(
      'AI-generated feedback on how to improve the ATS score, including suggestions for relevant keywords and formatting adjustments.'
    )
    .optional(),
});
export type CalculateAtsScoreOutput = z.infer<typeof CalculateAtsScoreOutputSchema>;

export async function calculateAtsScore(input: CalculateAtsScoreInput): Promise<CalculateAtsScoreOutput> {
  return calculateAtsScoreFlow(input);
}

const calculateAtsScorePrompt = ai.definePrompt({
  name: 'calculateAtsScorePrompt',
  input: {schema: CalculateAtsScoreInputSchema},
  output: {schema: CalculateAtsScoreOutputSchema},
  prompt: `You are an expert in evaluating resumes for Applicant Tracking System (ATS) compatibility.

  Analyze the provided resume text and calculate an ATS score based on factors like keyword matching, formatting, structure, and relevance to common industry standards. The score should be a number between 0 and 100.
  Also provide feedback on how to improve the ATS score, including suggestions for relevant keywords and formatting adjustments. Provide specific and actionable advice.

  Resume Text: {{{resumeText}}}

  Ensure that the output is valid JSON that adheres to the CalculateAtsScoreOutputSchema, with properly typed and described fields.
  Consider industry standards and best practices when scoring and providing feedback.`,
});

const calculateAtsScoreFlow = ai.defineFlow(
  {
    name: 'calculateAtsScoreFlow',
    inputSchema: CalculateAtsScoreInputSchema,
    outputSchema: CalculateAtsScoreOutputSchema,
  },
  async input => {
    const {output} = await calculateAtsScorePrompt(input);
    return output!;
  }
);
