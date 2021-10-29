import * as THREE from 'three';
import { Vector3 } from 'three';

export const templateObject = new THREE.Object3D();

const frustum = new THREE.Frustum();
export const isInViewport = (camera: THREE.Camera, pos: Vector3): boolean => {
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse,
    ),
  );
  return frustum.containsPoint(pos);
};
