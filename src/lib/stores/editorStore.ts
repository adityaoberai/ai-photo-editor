import { writable } from 'svelte/store';
import type { EditInstruction } from '$lib/types';

export const edits = writable<EditInstruction[]>([]);
export const undoStack = writable<EditInstruction[][]>([]);
export const redoStack = writable<EditInstruction[][]>([]);

export function applyEdit(edit: EditInstruction) {
  edits.update((current) => {
    undoStack.update((u) => [...u, current]);
    redoStack.set([]);
    return [...current, edit];
  });
}

export function undo() {
  undoStack.update((u) => {
    if (u.length === 0) return u;
    
    const prev = u[u.length - 1];
    const remaining = u.slice(0, -1);
    
    edits.update((current) => {
      redoStack.update((r) => [...r, current]);
      return prev;
    });
    
    return remaining;
  });
}

export function redo() {
  redoStack.update((r) => {
    if (r.length === 0) return r;
    
    const next = r[r.length - 1];
    const remaining = r.slice(0, -1);
    
    edits.update((current) => {
      undoStack.update((u) => [...u, current]);
      return next;
    });
    
    return remaining;
  });
}
