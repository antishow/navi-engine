import { WebGLRenderer } from "three";

export const renderer = new WebGLRenderer({ antialias: false });
renderer.shadowMap.enabled = true;
renderer.setSize(320, 200);
renderer.domElement.classList.add('game-canvas');

