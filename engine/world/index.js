import { rootScene } from '../scene-manager';
import { World, Vec3 } from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import { addAction } from '../hooks';
import { setWorldBoundsFromObject } from './helpers';

export const world = new World({ gravity: new Vec3(0, -9.82, 0) });
const cannonDebugger = new CannonDebugger(rootScene, world);

world.defaultContactMaterial.contactEquationStiffness = 1e9
world.defaultContactMaterial.friction = 0.04;
world.defaultContactMaterial.contactEquationRelaxation = 4

const updateSimulationObject = (gameObject) => {
  const { body } = gameObject;

  if (!body) {
    return;
  }

  gameObject.position.copy(body.position.vsub(gameObject.bodyOffset));
}

const updateSimulation = () => {
  world.fixedStep();
  world.bodies.forEach((B) => {
    if (!B.gameObject) {
      return;
    }

    updateSimulationObject(B.gameObject)
  });
  //cannonDebugger.update();
}

addAction(
  'gameController.afterUpdate',
  'gameController.afterUpdate/updateSimulation',
  (delta) => updateSimulation(delta)
);

addAction(
  'gameObject.load',
  'gameObject.load/WORLD_AABB',
  (gameObject) => {
    if (gameObject.name !== 'WORLD_AABB') {
      return;
    }

    gameObject.visible = false;
    setWorldBoundsFromObject(world, gameObject);
  }
);

addAction(
  'scene.afterUnload',
  'scene.afterUnload/clearWorld',
  () => {
    world.bodies = [];
    world.clearForces();
  }
);

