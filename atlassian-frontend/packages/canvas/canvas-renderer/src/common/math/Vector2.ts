import { Vector3 } from './Vector3';

export class Vector2 {
  public constructor(public x: number, public y: number) {}

  public add(xy: number): this {
    this.x += xy;
    this.y += xy;
    return this;
  }

  public addV(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public withZ(z: number) {
    return new Vector3(this.x, this.y, z);
  }
}
