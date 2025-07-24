import { World } from "cannon-es";
import { Object3D } from "three";

declare function setWorldBoundsFromObject(world: World, gameObject: Object3D): void;
declare function setWorldBounds(world: World, xMin: Number, xMax: Number, yMin: Number, yMax: Number, zMin: Number, zMax: Number): void;

export {
    setWorldBoundsFromObject,
    setWorldBounds,
};