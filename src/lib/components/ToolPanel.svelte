<script lang="ts">
  import { getContext } from 'svelte';
  import { Application, Sprite } from 'pixi.js';
  import type { Writable } from 'svelte/store';
  import Slider from './Slider.svelte';
  import { applyEdit, undo, redo } from '../stores/editorStore';
  import type { EditType } from '../types';
  import { exportImageHighResolution } from '../utils/export';

  const app = getContext<Application>('pixi');
  const spriteStore = getContext<Writable<Sprite | null>>('sprite');

  function handleChange(type: EditType) {
    return (val: number) => applyEdit({ type, value: val });
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
      <span class="material-icons">undo</span>
      <span>Undo</span>
    </button>
    <button class="action-btn" on:click={handleRedo}>
      <span class="material-icons">redo</span>
      <span>Redo</span>
    </button>
    <button class="action-btn" on:click={handleExport}>
      <span class="material-icons">download</span>
      <span>Export</span>
    </button>
  </div>

  <div class="filters">
    <Slider label="Brightness" min={-100} max={100} step={1} onChange={handleChange('brightness')} />
    <Slider label="Contrast" min={-100} max={100} step={1} onChange={handleChange('contrast')} />
    <Slider label="Temperature" min={-100} max={100} step={1} onChange={handleChange('temperature')} />
    <Slider label="Saturation" min={-100} max={100} step={1} onChange={handleChange('saturation')} />
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
    gap: 0.25rem;
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: 0.25rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: #f5f5f5;
    color: #000;
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }
</style>
