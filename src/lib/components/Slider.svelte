<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string;
  export let min = -100;
  export let max = 100;
  export let step = 1;
  export let onChange: (v: number) => void;

  let currentValue = 0;

  const dispatch = createEventDispatcher<{ change: number }>();

  function handleInput(e: Event) {
    currentValue = +(e.target as HTMLInputElement).value;
    onChange?.(currentValue);
    dispatch('change', currentValue);
  }
</script>

<label class="slider-label">
  <div class="slider-header">
    <span>{label}</span>
    <span class="value">{currentValue}</span>
  </div>
  <input
    type="range"
    {min}
    {max}
    {step}
    bind:value={currentValue}
    on:input={handleInput}
  />
</label>

<style>
  .slider-label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .value {
    font-variant-numeric: tabular-nums;
    font-size: 0.8rem;
    color: #666;
  }

  input[type="range"] {
    width: 100%;
    margin: 0;
  }
</style>
