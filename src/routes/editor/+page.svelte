<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { Application, Sprite, Texture } from 'pixi.js';
  import { ColorMatrixFilter } from '@pixi/filter-color-matrix';
  import ToolPanel from '$lib/components/ToolPanel.svelte';
  import { edits } from '$lib/stores/editorStore';
  import { applyFilters } from '$lib/utils/filters';
  import { imageSrc } from '$lib/stores/image';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  let app: Application;
  let canvas: HTMLCanvasElement;
  let canvasWrapper: HTMLDivElement;
  
  // Create a store for the sprite
  const spriteStore = writable<Sprite | null>(null);
  let sprite: Sprite | null = null;
  spriteStore.subscribe(value => {
    sprite = value;
  });

  // Initialize app and set context immediately
  $: if (canvas && !app) {
    app = new Application(800, 600, {
      view: canvas,
      transparent: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    });
    setContext('pixi', app);
    setContext('sprite', spriteStore);
  }

  function updateSpriteScale() {
    if (!sprite || !canvasWrapper) return;

    // Get the canvas dimensions
    const canvasWidth = canvasWrapper.clientWidth;
    const canvasHeight = canvasWrapper.clientHeight;

    // Update renderer size
    app.renderer.resize(canvasWidth, canvasHeight);

    // Get image dimensions
    const imageWidth = sprite.texture.baseTexture.width;
    const imageHeight = sprite.texture.baseTexture.height;

    // Calculate scale to fit while maintaining aspect ratio
    const scaleX = canvasWidth / imageWidth;
    const scaleY = canvasHeight / imageHeight;
    const scale = Math.min(scaleX, scaleY) * 0.9; // 90% of the available space

    // Apply scale and center the sprite
    sprite.scale.set(scale);
    sprite.position.set(canvasWidth / 2, canvasHeight / 2);
  }

  // Handle sprite updates
  $: if (app && $imageSrc) {
    // Create an HTML Image element first
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Only create the sprite after image is loaded
      if (sprite) {
        app.stage.removeChild(sprite);
        sprite.destroy(true);
      }

      const texture = Texture.from(img);
      const newSprite = new Sprite(texture);
      newSprite.anchor.set(0.5);
      app.stage.addChild(newSprite);
      
      // Update store instead of context
      spriteStore.set(newSprite);
      
      // Update filters
      newSprite.filters = applyFilters($edits) as any[];

      // Update scale
      updateSpriteScale();
    };

    // Set source after setting up onload
    img.src = $imageSrc;
  }

  // Subscribe to edits for filter updates
  $: if (sprite) {
    sprite.filters = applyFilters($edits) as any[];
  }

  onMount(() => {
    if (!$imageSrc) {
      goto('/upload');
      return;
    }

    // Handle window resize
    const handleResize = () => {
      if (!app || !canvasWrapper) return;
      updateSpriteScale();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sprite) {
        sprite.destroy(true);
      }
      if (app) {
        app.destroy(true);
      }
    };
  });
</script>

<div class="editor-layout">
  <div class="toolbar-wrapper">
    <ToolPanel />
  </div>
  <div class="canvas-area">
    <div class="canvas-wrapper" bind:this={canvasWrapper}>
      <canvas bind:this={canvas}></canvas>
    </div>
  </div>
</div>

<style>
  .editor-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100vh;
    width: 100vw;
    background: #f0f0f0;
    overflow: hidden;
  }

  .toolbar-wrapper {
    background: white;
    border-right: 1px solid #ddd;
    height: 100vh;
    overflow-y: auto;
    padding: 1rem;
  }

  .canvas-area {
    position: relative;
    overflow: hidden;
    background: #f8f8f8;
    background-image: 
      linear-gradient(45deg, #eee 25%, transparent 25%),
      linear-gradient(-45deg, #eee 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #eee 75%),
      linear-gradient(-45deg, transparent 75%, #eee 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }

  .canvas-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>