import { addAction } from "../hooks";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const Prefabs = {};
const loader = new GLTFLoader();

const preloadPrefab = (prefabName) => {
  const loadPrefab = new Promise((resolve, reject) => {
    loader.load(
      `assets/prefabs/${prefabName}.glb`,
      (gltf) => {
        Prefabs[prefabName] = gltf;

        resolve(gltf);
      },
      () => { },
      (err) => reject(err)
    );
  });

  return loadPrefab;
}

export const preloadPrefabs = async (prefabs) => {
  await Promise.all(prefabs.map(P => preloadPrefab(P)));
}

addAction(
  'gameObject.beforeLoad',
  'gameObject.beforeLoad/instantiatePrefab',
  (gameObject) => {
    const { userData } = gameObject;
    if (!Object.keys(userData).includes('Prefab')) {
      return;
    }

    const { Prefab } = userData;
    if (!Object.keys(Prefabs).includes(Prefab)) {
      return;
    }

    const p = Prefabs[Prefab];
    const [sceneObject] = p.scene.children;
    const instance = SkeletonUtils.clone(sceneObject);
    instance.animations = p.animations;

    gameObject.parent.add(instance);
    instance.name = gameObject.name;
    instance.position.copy(gameObject.position);
    instance.rotation.copy(gameObject.rotation);
  },
  9
);

addAction(
  'gltf.beforeLoad',
  'gltf.beforeLoad/clearPrefabPlaceholders',
  (gltf) => {
    const prefabs = [];
    gltf.scene.traverse(O => {
      const { userData } = O;
      if (Object.keys(userData).includes('Prefab')) {
        prefabs.push(O);
      }
    });

    prefabs.forEach(P => P.parent.remove(P));
  }
);
