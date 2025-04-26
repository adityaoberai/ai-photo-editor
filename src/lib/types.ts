export type EditType = 'brightness' | 'contrast' | 'temperature' | 'saturation';

export interface EditInstruction {
  type: EditType;
  value: number;
}

export interface AnalysisResult {
  description: string;
  recommendedEdits: EditInstruction[];
}
