import { glsl } from '../util/glsl';

export default glsl`
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

/**
 * Note: this is injected by THREE.InstancedMesh(). It represents the transform for
 * a specific instance, wherein one draw call is used to batch the rendering for N
 * instances (N = max instances the InstancedMesh is configured with).
 * 
 * Therefore, to figure out the world position of an instance, it is multiplied 
 * into the rest of the matrices which we typically multiply to compute the world 
 * position.
 */
attribute mat4 instanceMatrix;
/**
 * The position of the *base* geometry for the InstancedMesh.
 */
attribute vec3 position;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`;
