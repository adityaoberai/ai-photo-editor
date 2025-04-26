<script lang="ts">
  /* Currently Broken */

  import { getContext } from 'svelte';
  import type { Application, Sprite } from 'pixi.js';
  import { undo, redo } from '$lib/stores/editorStore';
  import { exportImageHighResolution } from '$lib/utils/export';

  const app = getContext<Application>('pixi');
  const sprite = getContext<Sprite>('sprite');

  function handleUndo() {
    undo();
  }

  function handleRedo() {
    redo();
  }

  function handleExport() {
    if (app && sprite && sprite.filters) {
      exportImageHighResolution(app, sprite, sprite.filters);
    }
  }
</script>

<div class="mobile-toolbar">
  <button on:click={handleUndo}>Undo</button>
  <button on:click={handleRedo}>Redo</button>
  <button on:click={handleExport}>Export</button>
</div>

<style>
  .mobile-toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.8);
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #4a4a4a;
    color: white;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: #5a5a5a;
  }
</style>
