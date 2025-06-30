'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing the functionality of a tool given its website URL.
 * 
 * - toolSummarizer - A function that takes a URL and returns a short summary of the tool.
 * - ToolSummarizerInput - The input type for the toolSummarizer function (a URL string).
 * - ToolSummarizerOutput - The return type for the toolSummarizer function (a summary string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ToolSummarizerInputSchema = z.object({
  url: z.string().describe('The URL of the tool website to summarize.'),
});
export type ToolSummarizerInput = z.infer<typeof ToolSummarizerInputSchema>;

const ToolSummarizerOutputSchema = z.object({
  summary: z.string().describe('A short summary of the tool from its website.'),
});
export type ToolSummarizerOutput = z.infer<typeof ToolSummarizerOutputSchema>;

export async function toolSummarizer(input: ToolSummarizerInput): Promise<ToolSummarizerOutput> {
  return toolSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'toolSummarizerPrompt',
  input: {schema: ToolSummarizerInputSchema},
  output: {schema: ToolSummarizerOutputSchema},
  prompt: `You are an AI assistant designed to summarize web tools.\n\n  Summarize the tool found at the following URL in one short sentence:\n  {{{url}}}`,
});

const toolSummarizerFlow = ai.defineFlow(
  {
    name: 'toolSummarizerFlow',
    inputSchema: ToolSummarizerInputSchema,
    outputSchema: ToolSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
