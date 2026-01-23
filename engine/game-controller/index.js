import { addAction, doAction } from '../hooks';
import { mainCamera } from '../camera';
import { renderer, composer } from '../renderer';

addAction(
  'navi.ready',
  'navi.ready/startFrameLoop',
  ({ THREE }) => {
    const { Clock } = THREE;

    const clock = new Clock();
    const doFrame = () => {
      const deltaTime = clock.getDelta();

      doAction('gameController.beforeUpdate', deltaTime);
      doAction('gameController.update', deltaTime);
      doAction('gameController.afterUpdate', deltaTime);

      if (mainCamera) {
        composer.render();
      }
    }

    renderer.setAnimationLoop(doFrame);
  }
);
