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
  // Create a temporary canvas for high-resolution export
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Set canvas size to original texture size
  canvas.width = sprite.texture.baseTexture.width;
  canvas.height = sprite.texture.baseTexture.height;

  // Apply filters at original resolution
  const tempSprite = new Sprite(sprite.texture);
  tempSprite.filters = filters;

  // Create a temporary renderer
  const tempApp = new Application({
    width: canvas.width,
    height: canvas.height,
    antialias: true,
    transparent: true,
  });

  // Add sprite to temp renderer and render
  tempApp.stage.addChild(tempSprite);
  tempApp.renderer.render(tempApp.stage);

  // Clean up
  tempApp.destroy(true);

  // Convert to blob and create download
  const blob = await new Promise<Blob>((resolve) => 
    canvas.toBlob((b) => resolve(b!), format)
  );

  // Create and trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'edited.png';
  a.click();
  URL.revokeObjectURL(url);

  return blob;
}
