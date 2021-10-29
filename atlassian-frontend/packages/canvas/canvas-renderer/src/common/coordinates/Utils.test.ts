import { containsPoint } from './Utils';
import { Vector2 } from '../math/Vector2';

describe('coordinate utils', () => {
  describe('contains', () => {
    it('returns true for contained', () => {
      const isContained = containsPoint(new Vector2(1, 1), {
        x: 0,
        y: 0,
        width: 2,
        height: 2,
      });
      expect(isContained).toBeTruthy();
    });

    it('returns false for not contained', () => {
      const isContained = containsPoint(new Vector2(1, 1), {
        x: 10,
        y: 10,
        width: 2,
        height: 2,
      });
      expect(isContained).toBeFalsy();
    });

    it('returns true for contained in negative bounds', () => {
      const isContained = containsPoint(new Vector2(-11, -11), {
        x: -10,
        y: -10,
        width: 2,
        height: 2,
      });
      expect(isContained).toBeTruthy();
    });

    it('returns true for contained but on boundary', () => {
      const isContained = containsPoint(new Vector2(-5, -5), {
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      });
      expect(isContained).toBeTruthy();
    });

    it('returns true for point on center', () => {
      const isContained = containsPoint(new Vector2(0, 0), {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
      });
      expect(isContained).toBeTruthy();
    });
  });
});
