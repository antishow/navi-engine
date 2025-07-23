import { Scene, AmbientLight } from "three";

interface GameScene {
  url: string,
  prefabs: string[],
  onLoad: function,
  onProgress: function,
  onError: function,
};

declare const rootScene: Scene;
declare const ambientLight: AmbientLight;
declare function unloadCurrentScene(): void;
declare async function goToScene(scene: GameScene): void;
declare function getCurrentScene(): GameScene;

export {
  rootScene,
  ambientLight,
  unloadCurrentScene,
  goToScene,
  getCurrentScene
};
