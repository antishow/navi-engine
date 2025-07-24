import { Scene, AmbientLight } from "three";
import { GameScene } from "./game-scene.interface";

declare const rootScene: Scene;
declare const ambientLight: AmbientLight;
declare function unloadCurrentScene(): void;
declare function goToScene(scene: GameScene): Promise<void>;
declare function getCurrentScene(): GameScene;

export {
  rootScene,
  ambientLight,
  unloadCurrentScene,
  goToScene,
  getCurrentScene
};
