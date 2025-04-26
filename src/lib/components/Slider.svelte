<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let value = 0;
  export let onChange: ((value: number) => void) | undefined = undefined;

  const dispatch = createEventDispatcher<{ change: number }>();
  const id = `slider-${Math.random().toString(36).substring(2)}`;
</script>

<div class="slider-container">
  <label for={id}>
    <span class="label">{label}</span>
    <span class="value">{value}</span>
  </label>
  <input 
    {id}
    type="range" 
    {min} 
    {max} 
    {step}
    {value}
    on:input={(e) => {
      const currentValue = +(e.target as HTMLInputElement).value;
      onChange?.(currentValue);
      dispatch('change', currentValue);
    }}
  />
</div>

<style>
  .slider-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }

  .label {
    color: #333;
  }

  .value {
    color: #666;
  }

  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    border: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #4a90e2;
    margin-top: -6px;
    cursor: pointer;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }
</style>
