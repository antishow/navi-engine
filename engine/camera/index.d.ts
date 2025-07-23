import { Camera } from "three";

declare var mainCamera: Nullable<Camera>;
declare function setMainCamera(camera: Camera): void;

export {
    mainCamera,
    setMainCamera
};
