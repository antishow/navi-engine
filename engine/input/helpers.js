import { addAction } from '../hooks';

export const framePress = new Set();
export const frameRelease = new Set();
export const isDown = new Set();

let _getMovementInput = () => {};

export function getMovementInput() {
  return _getMovementInput();
}

export const wasPressedThisFrame = (key) => framePress.has(key);
export const wasReleasedThisFrame = (key) => frameRelease.has(key);

addAction(
  'navi.ready',
  'navi.ready/importInputHelpers',
  ({ Keystrokes, THREE }) => {
    const { checkKey } = Keystrokes;
    const { Vector3 } = THREE;

    _getMovementInput = () => {
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
  }
);

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