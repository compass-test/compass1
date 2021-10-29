import { Matrix } from './Matrix';

describe('Matrix', () => {
  const testX = 100;
  const textY = 100;

  it.each`
    width   | height  | expectedSubspaceValue
    ${1}    | ${1}    | ${2}
    ${1000} | ${1000} | ${0.002}
    ${42.5} | ${42.5} | ${0.047}
    ${-10}  | ${-10}  | ${-0.2}
  `(
    '.multiply(Projection) sets indices 0 and 4 to $width (width) and $height (height)',
    ({ width, height, expectedSubspaceValue }) => {
      const viewMatrix = Matrix.translation(testX, textY);
      const newViewMatrix = viewMatrix.multiply(
        Matrix.projection(width, height),
      );
      const [a, , , , b] = newViewMatrix.toArray();
      expect(a).toBeCloseTo(expectedSubspaceValue);
      expect(b).toBeCloseTo(-expectedSubspaceValue);
    },
  );

  it.each`
    deltaX  | deltaY
    ${1}    | ${1}
    ${-10}  | ${10}
    ${-100} | ${-100}
    ${42.5} | ${23.5}
  `(
    '.multiply(Translation) adds x $deltaX to index 6 and y $deltaY to index 7',
    ({ deltaX, deltaY }) => {
      const viewMatrix = Matrix.translation(testX, textY);
      const newViewMatrix = viewMatrix.multiply(
        Matrix.translation(deltaX, deltaY),
      );
      expect(newViewMatrix.toArray()).toEqual(
        new Float32Array([1, 0, 0, 0, 1, 0, testX + deltaX, textY + deltaY, 1]),
      );
    },
  );

  it('.multiply(Inverse) equals an identity matrix', () => {
    const viewMatrix = Matrix.translation(testX, textY);
    expect(viewMatrix.multiply(Matrix.inverse(viewMatrix))).toMatchObject(
      Matrix.identity(),
    );
  });

  it('rotation works correctly for 90 degrees', () => {
    const viewMatrix = Matrix.translation(testX, textY);
    const newViewMatrix = viewMatrix.multiply(Matrix.rotation(90));
    const expectedCosValue = 1.8e-16;
    const [cos1, , , , cos2] = newViewMatrix.toArray();
    expect(cos1).toBeCloseTo(-expectedCosValue);
    expect(cos2).toBeCloseTo(-expectedCosValue);
  });

  it('.multiply(ScaleMatrix) sets index 0 and 4 to 2 (x) and 2 (y)', () => {
    const viewMatrix = Matrix.translation(testX, textY);
    const newViewMatrix = viewMatrix.multiply(Matrix.scale(2, 2));
    expect(newViewMatrix.toArray()).toEqual(
      new Float32Array([2, 0, 0, 0, 2, 0, 100, 100, 1]),
    );
  });

  it('.multiply(Scale) sets index 0 and 4 to -100 (x) and -100 (y)', () => {
    const viewMatrix = Matrix.translation(testX, textY);
    const newViewMatrix = viewMatrix.multiply(Matrix.scale(-100, -100));
    expect(newViewMatrix.toArray()).toEqual(
      new Float32Array([-100, 0, 0, 0, -100, 0, 100, 100, 1]),
    );
  });
});
