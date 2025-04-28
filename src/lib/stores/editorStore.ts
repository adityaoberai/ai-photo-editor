import { writable } from 'svelte/store';
import type { EditInstruction } from '$lib/types';
import { resetSliderValues, updateSliderValue } from './sliderValues';

export const editStack = writable<EditInstruction[][]>([[]]);
export const undoStack = writable<EditInstruction[][]>([]);
export const redoStack = writable<EditInstruction[][]>([]);

function updateSliderValuesFromEdits(edits: EditInstruction[]) {
  resetSliderValues();
  edits.forEach(edit => updateSliderValue(edit.type, edit.value));
}

export function applyEdit(edit: EditInstruction | EditInstruction[]) {
  editStack.update((current) => {
    const currentEdits = current[current.length - 1];
    const editsToAdd = Array.isArray(edit) ? edit : [edit];
    const newEdits = [...currentEdits, ...editsToAdd];
    undoStack.update((u) => [...u, currentEdits]);
    redoStack.set([]);
    updateSliderValuesFromEdits(newEdits);
    return [...current.slice(0, -1), newEdits];
  });
}

export function undo() {
  let canUndo = false;
  undoStack.update((u) => {
    if (u.length === 0) return u;
    canUndo = true;
    return u;
  });

  if (!canUndo) return;

  undoStack.update((u) => {
    const prev = u[u.length - 1];
    const remaining = u.slice(0, -1);
    
    editStack.update((current) => {
      const currentEdits = current[current.length - 1];
      redoStack.update((r) => [...r, currentEdits]);
      updateSliderValuesFromEdits(prev);
      return [...current.slice(0, -1), prev];
    });
    
    return remaining;
  });
}

export function redo() {
  let canRedo = false;
  redoStack.update((r) => {
    if (r.length === 0) return r;
    canRedo = true;
    return r;
  });

  if (!canRedo) return;

  redoStack.update((r) => {
    const next = r[r.length - 1];
    const remaining = r.slice(0, -1);
    
    editStack.update((current) => {
      const currentEdits = current[current.length - 1];
      undoStack.update((u) => [...u, currentEdits]);
      updateSliderValuesFromEdits(next);
      return [...current.slice(0, -1), next];
    });
    
    return remaining;
  });
}
