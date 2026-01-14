import { addAction } from "../hooks";

let Box3, Body, Plane = null;

addAction(
  'navi.ready',
  'navi.ready/worldHelperImports',
  ({ CannonES, THREE }) => {
    Box3 = THREE.Box3;
    Body = CannonES.Body;
    Plane = CannonES.Plane;
  }
)

export function setWorldBoundsFromObject(world, gameObject) {
  const worldBounds = new Box3().setFromObject(gameObject);

  setWorldBounds(
    world,
    worldBounds.min.x,
    worldBounds.max.x,
    worldBounds.min.y,
    worldBounds.max.y,
    worldBounds.min.z,
    worldBounds.max.z
  );
}

export function setWorldBounds(world, xMin = -100.0, xMax = 100.0, yMin = 0, yMax = 30.0, zMin = -100.0, zMax = 100.0) {
  const shape = new Plane();

  const groundBody = new Body({ shape });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  groundBody.position.set(0, yMin, 0);
  world.addBody(groundBody);

  const ceilingBody = new Body({ shape });
  ceilingBody.quaternion.setFromEuler(Math.PI / 2, 0, 0);
  ceilingBody.position.set(0, yMax, 0);
  world.addBody(ceilingBody);

  const xMinBody = new Body({ shape });
  xMinBody.quaternion.setFromEuler(0, Math.PI / 2, 0);
  xMinBody.position.set(xMin, 0, 0);
  world.addBody(xMinBody);

  const xMaxBody = new Body({ shape });
  xMaxBody.quaternion.setFromEuler(0, -Math.PI / 2, 0);
  xMaxBody.position.set(xMax, 0, 0);
  world.addBody(xMaxBody);

  const zMinBody = new Body({ shape });
  zMinBody.quaternion.setFromEuler(0, 0, 0);
  zMinBody.position.set(0, 0, zMin);
  world.addBody(zMinBody);

  const zMaxBody = new Body({ shape });
  zMaxBody.quaternion.setFromEuler(0, Math.PI, 0);
  zMaxBody.position.set(0, 0, zMax);
  world.addBody(zMaxBody);
}


