import { writable } from 'svelte/store';

export const imageSrc = writable<string | null>(null);
