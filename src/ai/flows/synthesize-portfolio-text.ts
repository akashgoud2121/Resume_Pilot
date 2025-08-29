
'use server';

/**
 * @fileOverview This file defines the Genkit flow for synthesizing a single text resume from multiple portfolio documents.
 * 
 * - synthesizePortfolioText - A function that synthesizes a resume text from various uploaded documents.
 * - SynthesizePortfolioTextInput - The input type for the function.
 * - SynthesizePortfolioTextOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { GenerateResumeFromPortfolioInputSchema } from '@/lib/types';

export type SynthesizePortfolioTextInput = z.infer<typeof GenerateResumeFromPortfolioInputSchema>;

const SynthesizePortfolioTextOutputSchema = z.object({
    synthesizedText: z.string().describe('A single, cohesive block of text representing a full resume, synthesized from all provided documents.'),
});
export type SynthesizePortfolioTextOutput = z.infer<typeof SynthesizePortfolioTextOutputSchema>;

export async function synthesizePortfolioText(input: SynthesizePortfolioTextInput): Promise<SynthesizePortfolioTextOutput> {
  return synthesizePortfolioTextFlow(input);
}

const prompt = ai.definePrompt({
    name: 'synthesizePortfolioTextPrompt',
    input: { schema: GenerateResumeFromPortfolioInputSchema },
    output: { schema: SynthesizePortfolioTextOutputSchema },
    prompt: `You are an expert resume writer and data synthesizer. You will be given a collection of documents from a student's portfolio. These documents may include academic certificates, project reports, personal statements, and other materials.

Your task is to meticulously analyze all provided documents and synthesize them into a single, cohesive, and well-structured block of text that reads like a complete resume. Extract and organize the information into standard resume sections (e.g., Summary, Skills, Experience, Education, Projects).

Follow these rules:
1.  **Synthesize, Don't Just Concatenate:** Combine information logically. Do not just copy-paste text. Rewrite and summarize to create a professional tone.
2.  **Create Standard Resume Sections:** Organize the output with clear headings like "Professional Summary", "Skills", "Work Experience", "Education", "Projects", etc.
3.  **Generate a Professional Summary:** Based on all the information, write a compelling 2-3 sentence professional summary.
4.  **Infer and Consolidate:** Identify the student's name, contact information, skills, and educational history from across all documents and present it cleanly.
5.  **Format as Plain Text:** The output should be a single string of text, using line breaks to separate sections and items. Do not use Markdown or JSON.

Here are the documents:
{{#each documents}}
---
Document Type: {{{this.type}}}
File Name: {{{this.fileName}}}

Content:
{{media url=this.dataUri}}
---
{{/each}}
`,
});

const synthesizePortfolioTextFlow = ai.defineFlow(
    {
      name: 'synthesizePortfolioTextFlow',
      inputSchema: GenerateResumeFromPortfolioInputSchema,
      outputSchema: SynthesizePortfolioTextOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('AI failed to synthesize text from the portfolio. The output was empty.');
      }
      return output;
    }
);
