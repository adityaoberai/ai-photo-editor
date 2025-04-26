import { writable } from 'svelte/store';
import type { EditType } from '../types';

export interface SliderValues {
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
}

const defaultValues: SliderValues = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0
};

export const sliderValues = writable<SliderValues>(defaultValues);

export function updateSliderValue(type: EditType, value: number) {
  sliderValues.update(current => ({
    ...current,
    [type]: value
  }));
}

export function resetSliderValues() {
  sliderValues.set(defaultValues);
}
