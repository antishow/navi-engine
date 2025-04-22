import { addAction } from "../hooks";

addAction(
  'gameObject.load',
  'gameObject.load/hidden',
  (gameObject) => {
    const { Hidden } = gameObject.userData;
    if (!Hidden) {
      return;
    }

    gameObject.visible = false;
  }
)
