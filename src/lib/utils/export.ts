/**
 * Export a PixiJS canvas to a Blob (PNG/JPEG).
 */
export async function exportImage(
  canvas: HTMLCanvasElement,
  type: 'image/png' | 'image/jpeg' = 'image/png',
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resolve(blob!);
    }, type, quality);
  });
}

import { Application, Sprite, Filter } from 'pixi.js';

/**
 * Export a PixiJS sprite to a high resolution Blob (PNG/JPEG).
 */
export async function exportImageHighResolution(
  app: Application,
  sprite: Sprite,
  filters: Filter<any>[] = sprite.filters as Filter<any>[] || [],
  format: string = 'image/png'
): Promise<Blob> {
  try {
    // Create a temporary canvas for high-resolution export
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Set canvas size to original texture size
    canvas.width = sprite.texture.baseTexture.width;
    canvas.height = sprite.texture.baseTexture.height;

    // Create a temporary renderer with the same size
    const tempApp = new Application();
    tempApp.renderer.resize(canvas.width, canvas.height);
    tempApp.renderer.options.antialias = true;
    tempApp.renderer.resolution = window.devicePixelRatio || 1;

    // Create a new sprite with the same texture and filters
    const tempSprite = new Sprite(sprite.texture);
    tempSprite.filters = filters;

    // Add sprite to temp renderer and render
    tempApp.stage.addChild(tempSprite);
    
    // Render to canvas
    tempApp.renderer.render(tempApp.stage);
    
    // Extract the rendered content
    const renderedCanvas = tempApp.view as HTMLCanvasElement;
    ctx.drawImage(renderedCanvas, 0, 0);

    // Clean up
    tempSprite.destroy();
    tempApp.destroy(true);

    // Convert to blob and create download
    const blob = await new Promise<Blob>((resolve) => 
      canvas.toBlob((b) => resolve(b!), format, 1.0)
    );

    // Create and trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return blob;
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}
