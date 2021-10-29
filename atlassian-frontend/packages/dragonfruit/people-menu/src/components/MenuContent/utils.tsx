import React, { useEffect } from 'react';

export const ICON_SIZE = 32;
export const MAX_POPUP_WIDTH = 480;
// this max-height is copied from Confluence's styles.
export const MAX_POPUP_HEIGHT = 'calc(100vh - 79px)';

export function ImgIcon({ src, alt }: { src?: string; alt: string }) {
  return (
    <img
      src={src || ''}
      alt={alt}
      height={ICON_SIZE}
      width={ICON_SIZE}
      style={{ borderRadius: ICON_SIZE / 2 }}
    />
  );
}

export function Buggy() {
  useEffect(() => {
    throw new Error('Something wrong inside People menu.');
  });

  return null;
}
