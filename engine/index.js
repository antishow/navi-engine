import { doAction } from "./hooks";

export function loadEngine() {
    doAction('navi.awake');

    Promise.all([
        import('@rwh/keystrokes'),
        import('cannon-es'),
        import('gsap'),
        import('three'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
        import('three/addons/utils/SkeletonUtils.js'),
        import('postprocessing')
    ]).then(
        ([ Keystrokes, CannonES, { gsap }, THREE, { GLTFLoader }, SkeletonUtils, Postprocessing ]) => {
            doAction('navi.ready', { 
                Keystrokes, 
                CannonES, 
                gsap, 
                THREE, 
                GLTFLoader, 
                SkeletonUtils, 
                Postprocessing 
            });
        }
    );
}