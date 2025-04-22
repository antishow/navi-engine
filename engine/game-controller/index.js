import { Clock } from 'three';

import { doAction } from '../hooks';
import { renderer } from '../renderer/';
import { rootScene } from '../scene-manager';
import { mainCamera } from '../camera/'

import '../hidden';
import '../prefab';
import '../rigidbody';
import '../shadow';
import '../world';

const clock = new Clock();
const doFrame = () => {
  const deltaTime = clock.getDelta();

  doAction('gameController.beforeUpdate', deltaTime);
  doAction('gameController.update', deltaTime);
  doAction('gameController.afterUpdate', deltaTime);

  if (mainCamera) {
    renderer.render(rootScene, mainCamera);
  }
}

renderer.setAnimationLoop(doFrame);
