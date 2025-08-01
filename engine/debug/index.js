import CannonDebugger from 'cannon-es-debugger';
import GUI from 'lil-gui';
import Stats from "three/addons/libs/stats.module.js";
import { addAction, doAction } from '../hooks';

import { rootScene } from '../scene-manager/';
import { world } from '../world';

const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

addAction(
  'gameController.update',
  'gameController.update/stats',
  () => {
    stats.update();
  }
);

const params = {
  LogScene: () => console.log(rootScene.children[0]),
  LogActions: () => console.log(getHooks().actions),
  DebugAction: 'debug.timelineTest',
  ExecDebugAction: () => doAction(params.DebugAction)
};

const gui = new GUI();

const consoleGui = gui.addFolder('Console');
consoleGui.add(params, 'LogScene');
consoleGui.add(params, 'LogActions');
consoleGui.add(params, 'DebugAction');
consoleGui.add(params, 'ExecDebugAction');
consoleGui.close();

const lightingGui = gui.addFolder('Lights');
lightingGui.close();

addAction(
  'gltf.load',
  'gltf.load/addLightingGUI',
  (gltf) => {
    lightingGui.foldersRecursive().forEach((F) => F.destroy());

    const { scene } = gltf;
    scene.traverse((light) => {
      if (!light.isLight) {
        return;
      }

      const f = lightingGui.addFolder(light.name);
      f.addColor(light, 'color');
      f.add(light, 'intensity', 0, light.type === 'AmbientLight' ? 2 : 255);
      f.add(light, 'castShadow');
      f.close();
    });
  }
);

const fogGui = gui.addFolder('Fog');
fogGui.close();

addAction(
  'gltf.load',
  'gltf.load/addFogGUI',
  (gltf) => {

    setTimeout(() => {
      const { fog } = rootScene;
      fogGui.controllersRecursive().forEach((C) => C.destroy());

      fogGui.addColor(fog, 'color');
      fogGui.add(fog, 'near', 0, 255);
      fogGui.add(fog, 'far', 0, 255);
    }, 10);
  }
);


const worldGui = gui.addFolder('Physics');
worldGui.close();

addAction(
  'gltf.load',
  'gltf.load/addPhysicsGUI',
  (gltf) => {
    const physics = {
      showCannonDebugger: false,
    };

    const cannonDebugger = new CannonDebugger(rootScene, world, ({
      onInit: (body, mesh, shape) => mesh.visible = physics.showCannonDebugger,
      onUpdate: (body, mesh, shape) => mesh.visible = physics.showCannonDebugger
    }));

    worldGui.controllersRecursive().forEach((C) => C.destroy());
    worldGui.add(physics, 'showCannonDebugger');

    addAction(
      'gameController.afterUpdate',
      'gameController.afterUpdate/updateSimulation',
      () => cannonDebugger.update(),
      11
    );
  }
);
