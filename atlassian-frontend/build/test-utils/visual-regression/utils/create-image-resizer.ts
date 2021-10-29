import { PNG } from 'pngjs';
import { createImageFiller } from './create-image-filler';

export const createImageResizer = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (source: PNG): PNG => {
  const resized = new PNG({ width, height, fill: true });
  PNG.bitblt(source, resized, 0, 0, source.width, source.height, 0, 0);
  const fill = createImageFiller({ width: source.width, height: source.width });
  return fill(resized);
};
