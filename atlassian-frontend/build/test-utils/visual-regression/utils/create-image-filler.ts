import { PNG } from 'pngjs';

export const createImageFiller = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => (image: PNG): PNG => {
  const inArea = (x: number, y: number): boolean => y > height || x > width;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      if (inArea(x, y)) {
        const idx = (image.width * y + x) << 2;
        image.data[idx] = 0;
        image.data[idx + 1] = 0;
        image.data[idx + 2] = 0;
        image.data[idx + 3] = 64;
      }
    }
  }
  return image;
};
