import { Vector3 } from "three";

declare const framePress: Set<string>;
declare const frameRelease: Set<string>;
declare const isDown: Set<string>;
declare function getMovementInput(): Vector3;
declare function wasPressedThisFrame(key: string): Boolean;
declare function wasReleasedThisFrame(key: string): Boolean;

export {
    framePress,
    frameRelease,
    isDown,
    getMovementInput,
    wasPressedThisFrame,
    wasReleasedThisFrame,
}