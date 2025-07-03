'use server';
/**
 * @fileOverview An AI flow to summarize a web tool from its URL.
 *
 * - summarizeTool - A function that analyzes a URL and returns a suggested name and description.
 * - SummarizeToolInput - The input type for the summarizeTool function.
 * - SummarizeToolOutput - The return type for the summarizeTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeToolInputSchema = z.object({
  url: z.string().url().describe('The URL of the web tool to analyze.'),
});
export type SummarizeToolInput = z.infer<typeof SummarizeToolInputSchema>;

const SummarizeToolOutputSchema = z.object({
  name: z
    .string()
    .describe('The official name of the web tool.'),
  description: z
    .string()
    .describe(
      'A concise, one-sentence description of what the tool does for a user.'
    ),
});
export type SummarizeToolOutput = z.infer<typeof SummarizeToolOutputSchema>;

export async function summarizeTool(
  input: SummarizeToolInput
): Promise<SummarizeToolOutput> {
  return summarizeToolFlow(input);
}

const summarizeToolPrompt = ai.definePrompt({
  name: 'summarizeToolPrompt',
  input: {schema: SummarizeToolInputSchema},
  output: {schema: SummarizeToolOutputSchema},
  prompt: `You are an expert at analyzing web pages. Given the URL, provide a concise and compelling name and a one-sentence description for the web tool found at that URL. The name should be the official name of the tool. The description should clearly explain what the tool does for a user.

URL: {{{url}}}`,
});

const summarizeToolFlow = ai.defineFlow(
  {
    name: 'summarizeToolFlow',
    inputSchema: SummarizeToolInputSchema,
    outputSchema: SummarizeToolOutputSchema,
  },
  async input => {
    const {output} = await summarizeToolPrompt(input);
    return output!;
  }
);
