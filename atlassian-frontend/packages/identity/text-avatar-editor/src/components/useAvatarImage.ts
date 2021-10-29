import { useEffect, useRef } from 'react';

import {
  AVATAR_DIMENSIONS,
  DEFAULT_FONT_NAME,
  DEFAULT_FONT_SIZE_NAME,
  FALLBACK_SIZE,
  TEXT_SIZES,
} from './constants';
import { AvatarCanvas } from './types';

const getFontSizeFromWidth = (width: number) => {
  const size = TEXT_SIZES.find(({ maxWidth }) => {
    return width < maxWidth;
  });

  return size?.height || FALLBACK_SIZE;
};

export const useAvatarCanvas = (props: AvatarCanvas) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { color, text, whiteText, onChange } = props;
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d')!;

    context.fillStyle = color;
    context.fillRect(0, 0, AVATAR_DIMENSIONS, AVATAR_DIMENSIONS);

    context.fillStyle = whiteText ? 'white' : 'black';
    context.font = DEFAULT_FONT_SIZE_NAME;
    const { width: measureWidth } = context.measureText(text);

    const fontSize = getFontSizeFromWidth(measureWidth);

    context.font = `${fontSize}px ${DEFAULT_FONT_NAME}`;
    const {
      actualBoundingBoxAscent,
      actualBoundingBoxDescent,
      width,
    } = context.measureText(text);

    const height = actualBoundingBoxDescent / 2 + actualBoundingBoxAscent;
    const outsideHeight = (AVATAR_DIMENSIONS - height) / 2;
    context.fillText(
      text,
      AVATAR_DIMENSIONS / 2 - width / 2,
      outsideHeight + actualBoundingBoxAscent,
    );
    onChange(canvasRef.current.toDataURL());
  }, [canvasRef, color, onChange, text, whiteText]);
  return canvasRef;
};
