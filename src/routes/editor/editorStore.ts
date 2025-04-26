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
    edits.update((e) => {
      const prev = u[u.length - 1];
      redoStack.update((r) => [...r, e]);
      return prev;
    });
    return u.slice(0, -1);
  });
}

export function redo() {
  redoStack.update((r) => {
    if (r.length === 0) return r;
    edits.update((e) => {
      const next = r[r.length - 1];
      undoStack.update((u) => [...u, e]);
      return next;
    });
    return r.slice(0, -1);
  });
}
