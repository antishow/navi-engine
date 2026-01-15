import { addAction, doAction } from '../hooks';
import { preloadPrefabs } from "../prefab";

let Scene, AmbientLight = null;

let loader = null;
export let rootScene = null;
export let ambientLight = null;

let currentScene = null;
let loading = false;

addAction(
  'navi.ready',
  'navi.ready/sceneManagerImport',
  ({ THREE, GLTFLoader }) => {
    Scene = THREE.Scene;
    AmbientLight = THREE.AmbientLight;

    loader = new GLTFLoader();
    rootScene = new Scene();
    ambientLight = new AmbientLight();
  }
)

function disposeObject(sceneObject) {
  while (sceneObject.children.length) {
    disposeObject(sceneObject.children[sceneObject.children.length - 1]);
  }

  const { parent } = sceneObject;
  if (!parent) {
    return;
  }

  sceneObject.geometry?.dispose();
  sceneObject.material?.dispose();
  parent.remove(sceneObject);
}

export const unloadCurrentScene = () => {
  doAction('scene.beforeUnload', currentScene);

  disposeObject(rootScene);

  doAction('scene.afterUnload')
}

export const gotoScene = async (Scene) => {
  if (loading) {
    return;
  }
  const { name, url, prefabs, onLoad, onProgress, onError } = Scene;
  console.log(`Go to Scene "${name}"`, Scene);

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
