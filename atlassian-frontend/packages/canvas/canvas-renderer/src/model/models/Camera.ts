import { Matrix } from '../../common/math/Matrix';
import { Vector2 } from '../../common/math/Vector2';
import { Vector3 } from '../../common/math/Vector3';

export class Camera {
  private translation: Vector2;
  private rotate: number;
  private scale: Vector2;
  private viewMatrixInverse!: Matrix;
  private viewMatrix!: Matrix;
  private readonly projectionMatrix: Matrix;
  private readonly offsetMatrix: Matrix;

  public constructor(width: number, height: number) {
    this.translation = new Vector2(0, 0);
    this.rotate = 0;
    this.scale = new Vector2(1, 1);
    this.projectionMatrix = Matrix.projection(
      width / window.devicePixelRatio,
      height / window.devicePixelRatio,
    );
    this.offsetMatrix = Matrix.translation(
      width / window.devicePixelRatio / 2,
      height / window.devicePixelRatio / 2,
    );

    this.updateViewMatrix();
  }

  private updateViewMatrix() {
    this.viewMatrix = Matrix.identity()
      .multiply(this.offsetMatrix)
      .multiply(Matrix.rotation(this.rotate))
      .multiply(Matrix.scale(this.scale.x, this.scale.y))
      .multiply(Matrix.translation(this.translation.x, this.translation.y));
    this.viewMatrixInverse = Matrix.inverse(this.viewMatrix);
  }

  public updateScale(delta: number) {
    const zoomStep = -delta / 1000;
    if (!(this.scale.x + zoomStep < 0.01)) {
      this.scale.add(zoomStep);
      this.updateViewMatrix();
    }
  }

  public updateTranslation(movementX: number, movementY: number) {
    this.translation.addV(new Vector2(movementX, movementY));
    this.updateViewMatrix();
  }

  public project(matrix: Matrix) {
    return matrix.multiply(this.projectionMatrix);
  }

  public view(matrix: Matrix) {
    return matrix.multiply(this.viewMatrix);
  }

  public toWorldPosition(x: number, y: number) {
    return new Vector3(x, y, 1).multiply(this.viewMatrixInverse).toVector2();
  }

  public toScreenPosition(x: number, y: number) {
    return new Vector3(x, y, 1).multiply(this.viewMatrix).toVector2();
  }

  public toWorldScale(x: number, y: number) {
    return new Vector2(x / this.scale.x, y / this.scale.y);
  }

  public getProjectionMatrix() {
    return this.projectionMatrix;
  }

  public getViewMatrix() {
    return this.viewMatrix;
  }

  public get position() {
    return this.translation;
  }

  public updatePosition(position: Vector2) {
    this.translation = position;
    this.updateViewMatrix();
  }
}
