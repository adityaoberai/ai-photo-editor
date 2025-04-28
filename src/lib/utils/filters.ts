import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
import type { Filter } from '@pixi/core';
import type { ColorMatrix } from '@pixi/filter-color-matrix';
import type { EditType } from '$lib/types';
import { sliderValues } from '$lib/stores/sliderValues';
import { get } from 'svelte/store';

export function applyFilters(): Filter[] {
  const values = get(sliderValues);
  const filters: Filter[] = [];
  
  // Only add filters that have non-default values
  
  // Apply brightness if not default
  const brightness = values.brightness / 100;
  if (brightness !== 0) {
    const brightnessFilter = new ColorMatrixFilter();
    brightnessFilter.brightness((brightness * 0.5) + 1, false);
    filters.push(brightnessFilter);
  }
  
  // Apply contrast
  const contrast = values.contrast / 100;
  if (contrast !== 0) {
    const contrastFilter = new ColorMatrixFilter();
    contrastFilter.contrast(contrast, false);
    filters.push(contrastFilter);
  }
  
  // Apply saturation
  const saturation = values.saturation / 100;
  if (saturation !== 0) {
    const saturationFilter = new ColorMatrixFilter();
    if (saturation === -1) {
      // Special case: complete desaturation
      saturationFilter.desaturate();
    } else {
      // value + 1 maps -1 to 1 range to 0 to 2 range:
      // -0.99 to 0 -> 0.01 to 1 (less saturated)
      // 0 -> 1 (normal saturation)
      // 1 -> 2 (maximum saturation)
      saturationFilter.saturate(saturation + 1, false);
    }
    filters.push(saturationFilter);
  }
  
  // Apply temperature if not default
  const temperature = values.temperature / 100;
  if (temperature !== 0) {
    const temperatureFilter = new ColorMatrixFilter();
    const redScale = 1 + temperature * 0.2;
    const blueScale = 1 - temperature * 0.2;
    
    temperatureFilter.matrix = [
      redScale, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, blueScale, 0, 0,
      0, 0, 0, 1, 0
    ];
    filters.push(temperatureFilter);
  }

  return filters;
}
