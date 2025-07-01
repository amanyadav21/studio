'use server';
/**
 * @fileOverview An AI flow to summarize a web-based tool from its URL.
 *
 * - summarizeTool - A function that generates a summary for a given tool URL.
 * - SummarizeToolInput - The input type for the summarizeTool function.
 * - SummarizeToolOutput - The return type for the summarizeTool function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizeToolInputSchema = z.object({
  toolUrl: z.string().url().describe('The URL of the tool to summarize.'),
});
export type SummarizeToolInput = z.infer<typeof SummarizeToolInputSchema>;

const SummarizeToolOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, one or two-sentence summary of what the tool does, written for a general audience.'
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
  input: { schema: SummarizeToolInputSchema },
  output: { schema: SummarizeToolOutputSchema },
  prompt: `You are an expert at explaining complex tools in a simple way. Analyze the content of the provided URL and generate a concise, one or two-sentence summary of what the tool does. Focus on its primary function and benefit to the user.

Do not just list features. Explain the core purpose.

Tool URL: {{{toolUrl}}}
`,
});

const summarizeToolFlow = ai.defineFlow(
  {
    name: 'summarizeToolFlow',
    inputSchema: SummarizeToolInputSchema,
    outputSchema: SummarizeToolOutputSchema,
  },
  async (input) => {
    // Note: Gemini models can often access public URLs provided in prompts.
    // If this proves unreliable, a web scraping step would be needed here.
    const { output } = await summarizeToolPrompt(input);
    if (!output) {
      throw new Error('Failed to get a summary from the model.');
    }
    return output;
  }
);
