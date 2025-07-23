import { addAction } from "../hooks";

export let mainCamera = null;
export const setMainCamera = (camera) => mainCamera = camera;

addAction(
  'gltf.ready',
  'gltf.ready/setMainCamera',
  (gltf) => {
    if (gltf.cameras.length > 0) {
      setMainCamera(gltf.cameras[0]);
    }
  }
);