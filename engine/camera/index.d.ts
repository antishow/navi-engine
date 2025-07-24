import { Camera } from "three";

declare var mainCamera: Camera | null;
declare function setMainCamera(camera: Camera): void;

export {
    mainCamera,
    setMainCamera
};
