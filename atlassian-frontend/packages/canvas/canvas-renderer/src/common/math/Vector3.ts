import { Matrix } from './Matrix';
import { Vector2 } from './Vector2';

export class Vector3 {
  public constructor(public x: number, public y: number, public z: number) {}

  public multiply(matrix: Matrix) {
    // prettier-ignore
    const [
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    ] = matrix.toArray();

    return new Vector3(
      m00 * this.x + m10 * this.y + m20 * this.z,
      m01 * this.y + m11 * this.y + m21 * this.z,
      m02 * this.x + m12 * this.y + m22 * this.z,
    );
  }

  public toVector2() {
    return new Vector2(this.x, this.y);
  }
}
