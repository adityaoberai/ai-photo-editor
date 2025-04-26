import type { EditInstruction } from '$lib/types';

/**
 * Translate a natural language prompt into structured edit instructions.
 * Currently returns mock data; replace with real AI API integration.
 */
export async function textToEdit(prompt: string): Promise<EditInstruction[]> {
  // TODO: Call AI text-to-edit service
  return [
    { type: 'temperature', value: 15 },
    { type: 'saturation', value: 20 }
  ];
}
