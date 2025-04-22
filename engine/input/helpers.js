import { addAction } from '../hooks';
import { checkKey } from '@rwh/keystrokes';
import { Vector3 } from 'three';

export const framePress = new Set();
export const frameRelease = new Set();
export const isDown = new Set();

export function getMovementInput() {
  const input = new Vector3();

  if (checkKey('w')) {
    input.z -= 1;
  }
  if (checkKey('s')) {
    input.z += 1;
  }
  if (checkKey('a')) {
    input.x -= 1;
  }
  if (checkKey('d')) {
    input.x += 1;
  }

  return input;
}

addAction(
  'gameController.afterUpdate',
  'gameController.afterUpdate/resetFrameInput',
  () => {
    framePress.clear();
    frameRelease.clear();
  },
  9999
);

addEventListener('keydown', (e) => {
  const { code } = e;
  if (e.repeat || isDown.has(code)) {
    return;
  }

  isDown.add(code);
  framePress.add(code);
});

addEventListener('keyup', (e) => {
  const { code } = e;

  isDown.delete(code);
  framePress.delete(code);
  frameRelease.add(code);
});

export const wasPressedThisFrame = (key) => framePress.has(key);
export const wasReleasedThisFrame = (key) => frameRelease.has(key);

