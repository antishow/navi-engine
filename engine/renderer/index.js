import { EffectComposer, RenderPass } from "postprocessing";
import { addAction, applyFilters } from "../hooks";
import { WebGLRenderer } from "three";
import { rootScene } from "../scene-manager";

const rendererProps = applyFilters(
    'renderer.props',
    {
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false
    }
);

export const renderer = new WebGLRenderer(rendererProps);
renderer.shadowMap.enabled = true;
renderer.setSize(320, 200);
renderer.domElement.classList.add('game-canvas');

export const composer = new EffectComposer(renderer);

addAction(
    'camera.setMainCamera',
    'camera.setMainCamera/resetComposer',
    (mainCamera) => {
        composer.removeAllPasses();
        composer.addPass(new RenderPass(rootScene, mainCamera));
    }
);