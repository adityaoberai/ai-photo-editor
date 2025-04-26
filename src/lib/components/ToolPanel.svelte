<script lang="ts">
  import { getContext } from 'svelte';
  import type { Application } from 'pixi.js';
  import type { Sprite } from 'pixi.js';
  import type { Writable } from 'svelte/store';
  import Slider from './Slider.svelte';
  import { applyEdit, undo, redo } from '$lib/stores/editorStore';
  import { exportImageHighResolution } from '$lib/utils/export';
  import { sliderValues, updateSliderValue } from '$lib/stores/sliderValues';
  import type { EditType } from '$lib/types';

  const app = getContext<Application>('pixi');
  const spriteStore = getContext<Writable<Sprite | null>>('sprite');

  function handleSliderChange(type: EditType, value: number) {
    applyEdit({ type, value });
    updateSliderValue(type, value);
  }

  function handleUndo() {
    undo();
  }

  function handleRedo() {
    redo();
  }

  function handleExport() {
    if (app && $spriteStore && $spriteStore.filters) {
      exportImageHighResolution(app, $spriteStore, $spriteStore.filters);
    }
  }
</script>

<div class="panel">
  <div class="actions">
    <button class="action-btn" on:click={handleUndo}>
      <span class="icon">↶</span>
      <span class="label">Undo</span>
    </button>
    <button class="action-btn" on:click={handleRedo}>
      <span class="icon">↷</span>
      <span class="label">Redo</span>
    </button>
    <button class="action-btn" on:click={handleExport}>
      <span class="icon">↓</span>
      <span class="label">Export</span>
    </button>
  </div>
  
  <div class="sliders">
    <Slider 
      label="Brightness"
      min={-100}
      max={100}
      value={$sliderValues.brightness}
      onChange={(value) => handleSliderChange('brightness', value)}
    />
    <Slider 
      label="Contrast"
      min={-100}
      max={100}
      value={$sliderValues.contrast}
      onChange={(value) => handleSliderChange('contrast', value)}
    />
    <Slider 
      label="Saturation"
      min={-100}
      max={100}
      value={$sliderValues.saturation}
      onChange={(value) => handleSliderChange('saturation', value)}
    />
    <Slider 
      label="Temperature"
      min={-100}
      max={100}
      value={$sliderValues.temperature}
      onChange={(value) => handleSliderChange('temperature', value)}
    />
  </div>
</div>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    height: 100%;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action-btn:hover {
    background: #f5f5f5;
  }

  .action-btn:active {
    background: #e5e5e5;
  }

  .icon {
    font-size: 1.2rem;
  }

  .label {
    font-size: 0.9rem;
  }

  .sliders {
    display: grid;
    gap: 1rem;
    padding: 0;
    overflow-y: auto;
  }
</style>
