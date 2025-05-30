<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { Application, Sprite, Texture } from 'pixi.js';
  import ToolPanel from '$lib/components/ToolPanel.svelte';
  import AIPanel from '$lib/components/AIPanel.svelte';
  import { editStack } from '$lib/stores/editorStore';
  import { applyFilters } from '$lib/utils/filters';
  import { imageSrc } from '$lib/stores/image';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';

  let app: Application;
  let canvas: HTMLCanvasElement;
  let canvasWrapper: HTMLDivElement;
  
  // Create a store for the sprite
  const currentSprite = writable<Sprite | null>(null);
  let sprite: Sprite | null = null;
  currentSprite.subscribe(value => {
    sprite = value;
  });

  // Initialize app and set context immediately
  $: if (canvas && !app) {
    app = new Application({
      view: canvas,
      width: 800,
      height: 600,
      transparent: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    });
    setContext('pixi', app);
    setContext('sprite', currentSprite);
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
      currentSprite.set(newSprite);
      
      // Update filters
      newSprite.filters = applyFilters() as any[];

      // Update scale
      updateSpriteScale();
    };

    // Set source after setting up onload
    img.src = $imageSrc;
  }

  // Subscribe to sliderValues for filter updates
  $: if (sprite) {
    sprite.filters = applyFilters() as any[];
  }

  onMount(() => {
    // Clear all edits when page loads
    editStack.set([[]]);

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

<div class="editor">
  <div class="editor-layout">
    <div class="main-content">
      <div class="sidebar left">
        <div class="ai desktop-only">
          <AIPanel />
        </div>
      </div>
      <div class="canvas-area">
        <div class="canvas-wrapper" bind:this={canvasWrapper}>
          <canvas bind:this={canvas}></canvas>
        </div>
      </div>
      <div class="sidebar right">
        <div class="tools">
          <ToolPanel />
        </div>
        <div class="ai mobile-only">
          <AIPanel />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .editor {
    width: 100%;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
    background: #f0f0f0;
    overflow-y: auto;
    display: flex;
    align-items: center;
  }

  .editor-layout {
    display: grid;
    gap: 1rem;
    max-width: 95vw;
    margin: 0 auto;
    width: 100%;
  }

  .main-content {
    display: grid;
    gap: 1rem;
    grid-template-columns: 20vw minmax(auto, 50vw) 20vw;
    justify-content: center;
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
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    aspect-ratio: 3/2;
    height: 85vh;
    max-width: 50vw;
    margin: 0 auto;
  }

  .canvas-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }

  .tools, .ai {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
    height: 85vh;
  }

  /* Desktop layout - large screens only */
  @media (min-width: 1200px) {
    .editor {
      padding: 0 1rem;
    }
    .sidebar {
      position: sticky;
      top: 1rem;
    }

    .mobile-only {
      display: none;
    }
  }

  /* Mobile/Tablet layout */
  @media (max-width: 1199px) {
    .editor {
      align-items: flex-start;
    }
    .main-content {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .canvas-area {
      max-width: 90vw;
      width: 100%;
      height: 50vh;
      aspect-ratio: 3/2;
      margin: 0 auto;
    }

    .canvas-wrapper {
      position: relative;
      height: 100%;
    }

    .desktop-only {
      display: none;
    }

    .tools, .ai {
      height: auto;
      min-height: 200px;
      max-height: 50vh;
    }

    .sidebar.right {
      display: grid;
      grid-template-rows: auto auto;
      gap: 1rem;
      padding-bottom: env(safe-area-inset-bottom, 1rem);
    }
  }
</style>