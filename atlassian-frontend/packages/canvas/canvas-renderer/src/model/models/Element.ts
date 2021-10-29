import { containsPoint } from '../../common/coordinates/Utils';
import { Region } from './Region';
import { Vector2 } from '../../common/math/Vector2';

export type ElementType = 'sticky';

export interface BoardElement extends Region {
  elementType: ElementType;
  id: string;
  attributes: object;
  text?: string;
  zIndex: number;
  setLocation(point: Vector2): void;
  intersects(point: Vector2): boolean;
}

export interface StickyElement extends BoardElement {
  elementType: 'sticky';
  text: string;
  attributes: {};
}

interface StickyOpts {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  width?: number;
  height?: number;
  text: string;
}

export class Sticky implements StickyElement {
  public readonly elementType = 'sticky';
  public readonly id: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public text: string;
  public attributes: {} = {};
  public zIndex: number;

  constructor({
    id,
    x,
    y,
    zIndex,
    text,
    width = 100,
    height = 100,
  }: StickyOpts) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  intersects(point: Vector2): boolean {
    return containsPoint(point, this);
  }

  setLocation({ x, y }: Vector2): void {
    this.x = x;
    this.y = y;
  }
}
