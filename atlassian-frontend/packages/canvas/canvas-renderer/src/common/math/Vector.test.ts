import { Matrix } from './Matrix';
import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';

describe('Vector', () => {
  const testX = 100;
  const testY = 100;

  describe('Vector2', () => {
    it('adds scalar to vector values correctly', () => {
      const testVector: Vector2 = new Vector2(testX, testY);
      testVector.add(10);
      expect(testVector).toEqual({ x: 110, y: 110 });
    });

    it('adds vector values correctly', () => {
      const testVector: Vector2 = new Vector2(testX, testY);
      testVector.addV(new Vector2(-10, -20));
      expect(testVector).toEqual({ x: 90, y: 80 });
    });
  });

  describe('Vector3', () => {
    const textZ = 100;
    const testVector: Vector3 = new Vector3(testX, testY, textZ);

    it('multiplies vector values correctly', () => {
      const newVector = testVector.multiply(Matrix.scale(2, 4));
      expect(newVector).toMatchObject({ x: 2 * testX, y: 4 * testY, z: 100 });
    });
  });
});
