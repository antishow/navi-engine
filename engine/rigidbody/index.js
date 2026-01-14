import { addAction } from '../hooks';
import { RigidBodyFactory } from './factory';
import { world } from '../world/';

let Vec3 = null;

addAction(
  'navi.ready',
  'navi.ready/rigidBodyImport',
  ({ CannonES }) => {
    Vec3 = CannonES.Vec3;
  }
);

addAction(
  'gameObject.load',
  'gameObject.load/generateRigidBody',
  (gameObject) => {
    if (!gameObject.userData.Rigidbody) {
      return;
    }

    const body = RigidBodyFactory({ gameObject });
    gameObject.body = body;
    gameObject.bodyOffset = new Vec3();

    const { RigidbodyOffset } = gameObject.userData;
    if (RigidbodyOffset) {
      gameObject.bodyOffset.set(
        RigidbodyOffset[0],
        RigidbodyOffset[2],
        RigidbodyOffset[1],
      );
    }

    world.addBody(body);
  }
);


