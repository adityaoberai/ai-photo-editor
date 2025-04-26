import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import type { Filter } from '@pixi/core';
import type { EditInstruction } from '$lib/types';

export function applyFilters(edits: EditInstruction[]): Filter[] {
  const colorMatrix = new ColorMatrixFilter();
  colorMatrix.reset(); // Reset to identity matrix

  for (const edit of edits) {
    const value = edit.value / 100; // Convert to -1 to 1 range
    
    switch (edit.type) {
      case 'brightness':
        // Range: 0 to 2 (0.5 = 50% darker, 1 = normal, 2 = 100% brighter)
        colorMatrix.brightness(value + 1, false);
        break;
      case 'contrast':
        // Range: 0 to 2 (0.5 = 50% less contrast, 1 = normal, 2 = 100% more contrast)
        colorMatrix.contrast(value + 1, false);
        break;
      case 'saturation':
        // Range: 0 to 2 (0 = grayscale, 1 = normal, 2 = oversaturated)
        colorMatrix.saturate(value + 1, false);
        break;
      case 'temperature': {
        // Temperature adjustment using proper color balance
        // Value range: -1 to 1 (-1 = cooler/blue, 1 = warmer/orange)
        const redScale = 1 + value * 0.2;
        const blueScale = 1 - value * 0.2;
        
        colorMatrix.matrix = [
          redScale, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, blueScale, 0, 0,
          0, 0, 0, 1, 0
        ];
        break;
      }
    }
  }

  return [colorMatrix];
}
