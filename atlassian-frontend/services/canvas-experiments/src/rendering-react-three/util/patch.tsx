import * as THREE from 'three';

export interface CullableObject {
  boundingSphere?: THREE.Sphere;
  cullable?: boolean;
}

export const patchThree = () => {
  // Source: https://discourse.threejs.org/t/how-to-do-frustum-culling-with-instancedmesh/22633/6.
  const _sphere = new THREE.Sphere();

  // Patch Frustum to allow culling at object level.
  const prevImpl = THREE.Frustum.prototype.intersectsObject;
  THREE.Frustum.prototype.intersectsObject = function (object: THREE.Object3D) {
    const cullable = (object as unknown) as CullableObject;
    if (cullable.boundingSphere) {
      _sphere.copy(cullable.boundingSphere).applyMatrix4(object.matrixWorld);
      return this.intersectsSphere(_sphere);
    }
    return prevImpl.call(this, object);
  };
};
