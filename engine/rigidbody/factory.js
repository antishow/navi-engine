import { addAction, addFilter, applyFilters } from '../hooks';

let Vec3, Box, Sphere, Body, Cylinder, Vector3, Box3 = null;

addAction(
  'navi.ready',
  'navi.ready/rigidBodyFactoryImport',
  ({ CannonES, THREE }) => {
    Vec3 = CannonES.Vec3;
    Box = CannonES.Box;
    Sphere = CannonES.Sphere;
    Body = CannonES.Body;
    Cylinder = CannonES.Cylinder;

    Vector3 = THREE.Vector3;
    Box3 = THREE.Box3;
  }
)

export const RigidBodyFactory = ({ gameObject }) => {
  const Rigidbody = JSON.parse(gameObject.userData.Rigidbody);

  const body = new Body(applyFilters('gameObject.body', {
    shape: applyFilters('gameObject.body.shape', null, Rigidbody, gameObject),
    mass: Rigidbody.mass,
    fixedRotation: true,
    type: applyFilters('gameObject.body.type', Body.STATIC, Rigidbody, gameObject),
    isTrigger: Rigidbody.isTrigger
  }));

  const worldPosition = new Vector3();
  gameObject.getWorldPosition(worldPosition);

  body.position.copy(worldPosition);
  body.quaternion.copy(gameObject.quaternion);
  body.gameObject = gameObject;

  return body;
}

addFilter(
  'gameObject.body',
  'gameObject.body/allowRotationForStatic',
  (body) => {
    if (body.type !== Body.STATIC) {
      return body;
    }

    body.fixedRotation = false;
    return body;
  }
);

addFilter(
  'gameObject.body',
  'gameObject.body/infiniteMassForStatic',
  (body) => {
    if (body.type !== Body.STATIC) {
      return body;
    }

    delete body.mass;
    return body;
  }
)

addFilter(
  'gameObject.body.type',
  'gameObject.body.type/dynamic',
  (type, Rigidbody) => {
    if (Rigidbody.enabled) {
      return Body.DYNAMIC;
    }

    return type;
  }
);

addFilter(
  'gameObject.body.type',
  'gameObject.body.type/kinematic',
  (type, Rigidbody) => {
    if (Rigidbody.kinematic) {
      return Body.KINEMATIC;
    }

    return type;
  }
)

addFilter(
  'gameObject.body.shape',
  'gameObject.body.shape/cylinder',
  (shape, Rigidbody, gameObject) => {
    if (Rigidbody.shape !== 'CYLINDER') {
      return shape;
    }

    const { RigidbodyShape } = gameObject.userData;
    const cylinderArgs = JSON.parse(RigidbodyShape);
    const body = new Cylinder(cylinderArgs[0], cylinderArgs[1], cylinderArgs[2], cylinderArgs[3]);

    return body;
  }
)
addFilter(
  'gameObject.body.shape',
  'gameObject.body.shape/sphere',
  (shape, Rigidbody, gameObject) => {
    if (Rigidbody.shape !== 'SPHERE') {
      return shape;
    }

    const objectBounds = new Box3().setFromObject(gameObject);
    const size = objectBounds.getSize(new Vector3());

    return new Sphere(0.5 * Math.max(size.x, size.y, size.z));
  }
);

addFilter(
  'gameObject.body.shape',
  'gameObject.body.shape/box',
  (shape, Rigidbody, gameObject) => {
    if (Rigidbody.shape !== 'BOX') {
      return shape;
    }

    const objectBounds = new Box3().setFromObject(gameObject);
    const size = objectBounds.getSize(new Vector3());

    return new Box(new Vec3(0.5 * size.x, 0.5 * size.y, 0.5 * size.z));
  }
);
