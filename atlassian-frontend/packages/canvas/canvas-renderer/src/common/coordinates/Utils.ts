import { Region } from '../../model/models/Region';
import { Vector2 } from '../math/Vector2';

export const left = (region: Region) => region.x - region.width / 2;
export const top = (region: Region) => region.y - region.height / 2;
export const right = (region: Region) => region.x + region.width / 2;
export const bottom = (region: Region) => region.y + region.height / 2;

export const containsPoint = (point: Vector2, region: Region) =>
  point.x >= left(region) &&
  point.x <= right(region) &&
  point.y >= top(region) &&
  point.y <= bottom(region);
