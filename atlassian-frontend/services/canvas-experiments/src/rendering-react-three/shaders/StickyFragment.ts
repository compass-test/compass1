import { glsl } from '../util/glsl';

export default glsl`
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;
