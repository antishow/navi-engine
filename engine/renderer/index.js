import { addAction, applyFilters } from "../hooks";
import { rootScene } from "../scene-manager";

let EffectComposer, RenderPass, WebGLRenderer = null;

export let renderer = null;
export let composer = null;

addAction(
    'navi.ready',
    'navi.ready/rendererImport',
    ({ THREE, Postprocessing }) => {
        EffectComposer = Postprocessing.EffectComposer;
        RenderPass = Postprocessing.RenderPass;
        
        WebGLRenderer = THREE.WebGLRenderer;
        
        const rendererProps = applyFilters(
            'renderer.props',
            {
                powerPreference: 'high-performance',
                antialias: false
            }
        );

        renderer = new WebGLRenderer(rendererProps);
        renderer.shadowMap.enabled = true;
        renderer.setSize(320, 200);
        renderer.domElement.classList.add('game-canvas');

        composer = new EffectComposer(renderer);
    }
)


addAction(
    'camera.setMainCamera',
    'camera.setMainCamera/resetComposer',
    (mainCamera) => {
        composer.removeAllPasses();
        composer.addPass(new RenderPass(rootScene, mainCamera));
    }
);