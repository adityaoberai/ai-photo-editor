<script lang="ts">
  import { applyEdit } from '$lib/stores/editorStore';
  import type { EditType } from '$lib/types';
  
  interface AISuggestion {
    id: number;
    description: string;
    preview: string;
    edits: Array<{
      type: EditType;
      value: number;
    }>;
  }

  // Mock data for AI suggestions
  const suggestions: AISuggestion[] = [
    {
      id: 1,
      description: "Increase brightness to improve visibility",
      preview: "The image appears slightly dark. Increasing brightness by 30% will help reveal more details.",
      edits: [
        { type: 'brightness', value: 30 }
      ]
    },
    {
      id: 2,
      description: "Enhance colors with saturation",
      preview: "Colors look a bit muted. A 20% saturation boost will make them pop.",
      edits: [
        { type: 'saturation', value: 20 }
      ]
    },
    {
      id: 3,
      description: "Warm up the image",
      preview: "The image has a cool tone. Adding warmth will create a more inviting atmosphere.",
      edits: [
        { type: 'temperature', value: 15 }
      ]
    }
  ];

  function applyAISuggestion(suggestedEdits: Array<{ type: EditType, value: number }>) {
    applyEdit(suggestedEdits);
  }
</script>

<div class="ai-panel">
  <h2>AI Suggestions</h2>
  <div class="suggestions">
    {#each suggestions as suggestion (suggestion.id)}
      <div class="suggestion-card">
        <div class="suggestion-content">
          <h3>{suggestion.description}</h3>
          <p>{suggestion.preview}</p>
        </div>
        <button 
          class="apply-btn"
          on:click={() => applyAISuggestion(suggestion.edits)}
        >
          Apply
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .ai-panel {
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    color: #333;
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .suggestion-card {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: all 0.2s;
  }

  .suggestion-card:hover {
    background: #f0f0f0;
  }

  .suggestion-content {
    flex: 1;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
  }

  .apply-btn {
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
  }

  .apply-btn:hover {
    background: #357abd;
  }
</style>
