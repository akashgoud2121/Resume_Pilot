
'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a resume from multiple portfolio documents.
 * 
 * - generateResumeFromPortfolio - A function that synthesizes resume data from various uploaded documents.
 * - GenerateResumeFromPortfolioInput - The input type for the function.
 * - GenerateResumeFromPortfolioOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ExtractResumeDataOutputSchema } from '@/lib/types';

const PortfolioDocumentSchema = z.object({
  type: z.enum(['certificate', 'project', 'other']).describe('The type of the document.'),
  fileName: z.string().describe('The name of the uploaded file.'),
  dataUri: z.string().describe("The document content as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'"),
});

const GenerateResumeFromPortfolioInputSchema = z.object({
    documents: z.array(PortfolioDocumentSchema).describe('An array of portfolio documents.'),
});
export type GenerateResumeFromPortfolioInput = z.infer<typeof GenerateResumeFromPortfolioInputSchema>;

// The output will be the same as the standard resume data structure.
export type GenerateResumeFromPortfolioOutput = z.infer<typeof ExtractResumeDataOutputSchema>;


export async function generateResumeFromPortfolio(input: GenerateResumeFromPortfolioInput): Promise<GenerateResumeFromPortfolioOutput> {
  return generateResumeFromPortfolioFlow(input);
}


// The prompt needs to be carefully engineered for this complex task.
const prompt = ai.definePrompt({
    name: 'generateResumeFromPortfolioPrompt',
    input: { schema: GenerateResumeFromPortfolioInputSchema },
    output: { schema: ExtractResumeDataOutputSchema },
    prompt: `You are an expert resume writer and data synthesizer. You will be given a collection of documents from a student's portfolio. These documents may include academic certificates (10th grade, 12th grade, bachelor's degree), project reports, personal statements, and other materials.

Your task is to meticulously analyze all provided documents, extract the most relevant information, and synthesize it into a single, cohesive, and structured resume JSON object.

Follow these rules:
1.  **Synthesize, Don't Just Concatenate:** Combine information logically. For example, if multiple project documents describe different aspects of the same project, synthesize them into one project entry.
2.  **Extract Education History:** Look for academic certificates and transcripts. Extract institution names, degrees, and dates. Order them chronologically (most recent first).
3.  **Identify Skills:** Scan all documents for technical and soft skills. Compile a comprehensive list of unique skills.
4.  **Detail Projects:** From project reports or descriptions, extract the project name and a concise description of its goals and outcomes.
5.  **Infer Personal Details:** Find the student's name, email, and phone number. These might be present on multiple documents; ensure consistency.
6.  **Generate a Professional Summary:** Based on the entirety of the provided information, write a compelling 2-3 sentence professional summary that highlights the student's key strengths and aspirations.
7.  **Adhere to the Schema:** The final output must strictly follow the JSON schema for 'ExtractResumeDataOutputSchema'. If a section is not found in the documents, return an empty array or empty string for that field.

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


const generateResumeFromPortfolioFlow = ai.defineFlow(
    {
      name: 'generateResumeFromPortfolioFlow',
      inputSchema: GenerateResumeFromPortfolioInputSchema,
      outputSchema: ExtractResumeDataOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('AI failed to generate resume data from the portfolio. The output was empty.');
      }
      return output;
    }
);
