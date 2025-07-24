import { Body } from 'cannon-es';
import { Object3D } from 'three';

declare function RigidBodyFactory(args: { gameObject: Object3D }): Body;
