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
        if (value > 0) {
          // Warm: increase red, decrease blue
          const matrix = colorMatrix.matrix;
          matrix[0] += value * 0.5;  // Red boost
          matrix[2] -= value * 0.25; // Blue reduction in red channel
          matrix[6] -= value * 0.15; // Blue reduction in green channel
          matrix[8] -= value * 0.5;  // Blue reduction in blue channel
        } else {
          // Cool: increase blue, decrease red
          const v = Math.abs(value);
          const matrix = colorMatrix.matrix;
          matrix[0] -= v * 0.5;  // Red reduction in red channel
          matrix[4] -= v * 0.15; // Red reduction in green channel
          matrix[8] += v * 0.5;  // Blue boost in blue channel
        }
        break;
      }
    }
  }

  return [colorMatrix];
}
