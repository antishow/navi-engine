import { EffectComposer, RenderPass } from "postprocessing";
import { addAction, applyFilters } from "../hooks";
import { WebGLRenderer } from "three";
import { rootScene } from "../scene-manager";

const rendererProps = applyFilters(
    'renderer.props',
    {
        powerPreference: 'high-performance',
        antialias: false,
        /**
         * TODO: postprocessing says depth: false is the usual setup, but this seems to break everything. WHY?
         * 
         * Not "BREAK", but seemingly renders everything in reverse order, and maybe flipped normals?
         */
        //depth: false,
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