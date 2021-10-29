export class Matrix {
  private constructor(private values: Float32Array) {}

  public toArray() {
    return this.values;
  }

  public multiply(other: Matrix) {
    const m = this.values;
    const n = other.values;

    // Row 1
    const m00 = m[0 * 3 + 0];
    const m01 = m[0 * 3 + 1];
    const m02 = m[0 * 3 + 2];
    // Row 2
    const m10 = m[1 * 3 + 0];
    const m11 = m[1 * 3 + 1];
    const m12 = m[1 * 3 + 2];
    // Row 3
    const m20 = m[2 * 3 + 0];
    const m21 = m[2 * 3 + 1];
    const m22 = m[2 * 3 + 2];

    // Row 1
    const n00 = n[0 * 3 + 0];
    const n01 = n[0 * 3 + 1];
    const n02 = n[0 * 3 + 2];
    // Row 2
    const n10 = n[1 * 3 + 0];
    const n11 = n[1 * 3 + 1];
    const n12 = n[1 * 3 + 2];
    // Row 3
    const n20 = n[2 * 3 + 0];
    const n21 = n[2 * 3 + 1];
    const n22 = n[2 * 3 + 2];

    // Result row 1
    const mn00 = n00 * m00 + n01 * m10 + n02 * m20;
    const mn10 = n00 * m01 + n01 * m11 + n02 * m21;
    const mn20 = n00 * m02 + n01 * m12 + n02 * m22;
    // Result row 2
    const mn01 = n10 * m00 + n11 * m10 + n12 * m20;
    const mn11 = n10 * m01 + n11 * m11 + n12 * m21;
    const mn21 = n10 * m02 + n11 * m12 + n12 * m22;
    // Result row 3
    const mn02 = n20 * m00 + n21 * m10 + n22 * m20;
    const mn12 = n20 * m01 + n21 * m11 + n22 * m21;
    const mn22 = n20 * m02 + n21 * m12 + n22 * m22;

    // prettier-ignore
    return new Matrix(new Float32Array([
      mn00, mn10, mn20,
      mn01, mn11, mn21,
      mn02, mn12, mn22,
    ]));
  }

  public static identity() {
    // prettier-ignore
    return new Matrix(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ]));
  }

  /**
   * NB: both X and Y projections incorporate two steps:
   * 1) Scaling down each coordinate to (0, 1) based on screen size.
   * 2) Scaling up coordinate from (0, 1) to (0, 2) to have the same range as clipspace;
   * 3) Translating x by -1, y by 1 to translate both ranges to (-1, 1).
   */
  public static projection(width: number, height: number) {
    const px = 2 / width;
    const py = -2 / height;
    // prettier-ignore
    return new Matrix(new Float32Array([
      px, 0, 0,
      0, py, 0,
      -1, 1, 1,
    ]));
  }

  /**
   * NB: same rule applied to both x & y:
   * x = currentX + tx;
   * y = currentY + ty.
   */
  public static translation(tx: number, ty: number) {
    // prettier-ignore
    return new Matrix(new Float32Array([
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1,
    ]));
  }

  /**
   * NB: in a unit circle, (x, y) corresponds
   * to (cos(angle), sin(angle)).
   */
  public static rotation(angle: number) {
    const angleInRadians = (360 - angle) * (Math.PI / 180);
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    // prettier-ignore
    return new Matrix(new Float32Array([
      c, -s, 0,
      s, c, 0,
      0, 0, 1,
    ]));
  }

  /**
   * NB: same rule applied to both x & y:
   * x = currentX * sx;
   * y = currentY * sy.
   */
  public static scale(sx: number, sy: number) {
    // prettier-ignore
    return new Matrix(new Float32Array([
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    ]));
  }

  public static inverse(m: Matrix) {
    // prettier-ignore
    const [
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22,
    ] = m.values;

    // ------------------
    // Step 1) Compute determinant of each element
    // of the 3x3 matrix. This is done by computing
    // ad - bc, omitting the column & row of the result.
    // Step 2) Alternate the signs from the matrix of minors (Step 1).
    // ------------------
    // prettier-ignore
    const matrixOfCofactors = new Float32Array([
      m11 * m22 - m12 * m21, -(m10 * m22 - m12 * m20), m10 * m21 - m11 * m20,
      -(m01 * m22 - m02 * m21), m00 * m22 - m02 * m20, -(m00 * m21 - m01 * m20),
      m01 * m12 - m02 * m11, -(m00 * m12 - m02 * m10), m00 * m11 - m01 * m10,
    ]);
    // Step 3) Transpose the matrix of cofactors.
    // prettier-ignore
    const [
      mc00, mc01, mc02,
      mc10, mc11, mc12,
      mc20, mc21, mc22
    ] = matrixOfCofactors;
    // prettier-ignore
    const matrixAdjugate = new Float32Array([
      mc00, mc10, mc20,
      mc01, mc11, mc21,
      mc02, mc12, mc22,
    ]);
    // Step 4) Compute the determinant and divide
    // everything in the matrix by it.
    // prettier-ignore
    const [
      ma00, , ,
      ma01, , ,
      ma02, , ,
    ] = matrixAdjugate;
    const determinant = m00 * ma00 + m01 * ma01 + m02 * ma02;
    matrixAdjugate.forEach((v, i) => (matrixAdjugate[i] = v / determinant));

    return new Matrix(matrixAdjugate);
  }
}
