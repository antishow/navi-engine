import { addAction } from "../hooks";

addAction(
  'gameObject.load',
  'gameObject.load/setCastShadow',
  (gameObject) => {
    const castShadow = gameObject.userData.CastShadow;
    if (!castShadow) {
      return;
    }

    gameObject.traverse(O => {
      O.castShadow = castShadow;
    });
  }
);

addAction(
  'gameObject.load',
  'gameObject.load/setReceiveShadow',
  (gameObject) => {
    const receiveShadow = gameObject.userData.ReceiveShadow;
    if (!receiveShadow) {
      return;
    }

    gameObject.traverse(O => {
      O.receiveShadow = receiveShadow;
    });
  }
);
