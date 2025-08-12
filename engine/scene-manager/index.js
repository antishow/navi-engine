import { Scene, AmbientLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { doAction } from '../hooks';
import { preloadPrefabs } from "../prefab";

const loader = new GLTFLoader();
export const rootScene = new Scene();
export const ambientLight = new AmbientLight();
ambientLight.name = 'Ambient Light';

let currentScene = null;
let loading = false;

export const unloadCurrentScene = () => {
  doAction('scene.beforeUnload', currentScene);

  while (rootScene.children.length > 0) {
    rootScene.remove(rootScene.children[0]);
  }

  doAction('scene.afterUnload')
}

export const gotoScene = async (Scene) => {
  if (loading) {
    return;
  }
  const { name, url, prefabs, onLoad, onProgress, onError } = Scene;
  console.log(`Go to Scene "${name}"`);

  loading = true;

  await preloadPrefabs(prefabs);

  loader.load(url, (gltf) => {
    unloadCurrentScene();
    loading = false;

    gltf.scene.name = Scene.name;
    gltf.scene.add(ambientLight);
    rootScene.add(gltf.scene);
    currentScene = Scene;

    gltf.scene.traverse(O => doAction('gameObject.beforeLoad', O));
    doAction('gltf.beforeLoad', gltf);

    gltf.scene.traverse(O => doAction('gameObject.load', O));
    doAction('gltf.load', gltf);

    gltf.scene.traverse(O => doAction('gameObject.ready', O));
    doAction('gltf.ready', gltf);

    onLoad(gltf);
  },
    onProgress,
    onError
  );
}

export const getCurrentScene = () => currentScene;
