<script lang="ts">
  import { goto } from '$app/navigation';
  import { imageSrc } from '$lib/stores/image';
  import { extractExif, type ExifData } from '$lib/utils/exif';
  
  let file: File | null = null;
  let previewUrl: string | null = null;
  let exifData: ExifData = {};
  let dragOver = false;

  async function handleFile(uploadedFile: File) {
    file = uploadedFile;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    exifData = await extractExif(file);
  }

  async function handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const uploadedFile = input.files?.[0];
    if (uploadedFile) {
      await handleFile(uploadedFile);
    }
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragOver = false;
    const uploadedFile = event.dataTransfer?.files[0];
    if (uploadedFile) {
      handleFile(uploadedFile);
    }
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function startEditing() {
    if (file && previewUrl) {
      imageSrc.set(previewUrl);
      goto('/editor');
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch {
      return dateStr;
    }
  }
</script>

<div class="upload-page">
  <h1>Upload Photo</h1>
  
  <div 
    class="drop-zone" 
    class:drag-over={dragOver}
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    role="button"
    aria-label="Upload photo"
    tabindex="0"
  >
    <input 
      type="file" 
      accept="image/*" 
      on:change={handleChange}
      class="file-input"
    />
    <div class="upload-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="17 8 12 3 7 8"/>
        <line x1="12" y1="3" x2="12" y2="15"/>
      </svg>
      <p>Drag & drop your photo here or click to browse</p>
    </div>
  </div>

  {#if previewUrl}
    <div class="preview-section">
      <div class="image-container">
        <img src={previewUrl} alt="Preview" class="image-preview" />
      </div>
      
      <div class="metadata-section">
        <div class="file-info">
          <h3>File Information</h3>
          <p><strong>Name:</strong> {file?.name}</p>
          <p><strong>Size:</strong> {formatBytes(file?.size || 0)}</p>
          <p><strong>Type:</strong> {file?.type}</p>
        </div>
        
        {#if Object.keys(exifData).length > 0}
          <div class="photo-info">
            <h3>Photo Details</h3>
            <div class="photo-details-grid">
              {#if exifData.Make || exifData.Model}
                <p><strong>Camera:</strong> {[exifData.Make, exifData.Model].filter(Boolean).join(' ')}</p>
              {/if}
              {#if exifData.LensModel}
                <p><strong>Lens:</strong> {exifData.LensModel}</p>
              {/if}
              {#if exifData.DateTimeOriginal}
                <p><strong>Taken:</strong> {formatDate(exifData.DateTimeOriginal)}</p>
              {/if}
              {#if exifData.ImageWidth && exifData.ImageHeight}
                <p><strong>Dimensions:</strong> {exifData.ImageWidth} × {exifData.ImageHeight}</p>
              {/if}
              {#if exifData.ISO}
                <p><strong>ISO:</strong> {exifData.ISO}</p>
              {/if}
              {#if exifData.ExposureTime}
                <p><strong>Shutter Speed:</strong> {exifData.ExposureTime}s</p>
              {/if}
              {#if exifData.FNumber}
                <p><strong>Aperture:</strong> f/{exifData.FNumber}</p>
              {/if}
              {#if exifData.FocalLength}
                <p><strong>Focal Length:</strong> {exifData.FocalLength}mm</p>
              {/if}
              {#if exifData.GPSLatitude && exifData.GPSLongitude}
                <p>
                  <strong>Location:</strong>
                  <a
                    href={`https://www.google.com/maps?q=${exifData.GPSLatitude},${exifData.GPSLongitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>
                </p>
              {/if}
            </div>
          </div>
        {/if}
      </div>
      
      <button class="edit-button" on:click={startEditing}>Start Editing</button>
    </div>
  {/if}
</div>

<style>
  .upload-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }

  .drop-zone {
    position: relative;
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    background: #f9f9f9;
    cursor: pointer;
  }

  .drag-over {
    border-color: #4a90e2;
    background: #f0f7ff;
  }

  .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    pointer-events: none;
  }

  .upload-content svg {
    color: #666;
  }

  .upload-content p {
    margin: 0;
    color: #666;
    font-size: 1.1rem;
  }

  .preview-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    background: #f9f9f9;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .image-preview {
    max-width: 100%;
    max-height: 60vh;
    height: auto;
    border-radius: 4px;
  }

  .metadata-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .file-info, .photo-info {
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .photo-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem 2rem;
  }

  .file-info h3, .photo-info h3 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  .file-info p, .photo-info p {
    margin: 0.5rem 0;
    color: #666;
  }

  .photo-info a {
    color: #4a90e2;
    text-decoration: none;
  }

  .photo-info a:hover {
    text-decoration: underline;
  }

  .edit-button {
    padding: 1rem 2rem;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .edit-button:hover {
    background: #357abd;
  }

  @media (max-width: 768px) {
    .photo-details-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
