import React from 'react';
import path from 'path';

export const CanvasWordmark: React.FC = function CanvasIcon() {
  return (
    <img
      width={85}
      height={24}
      src={path.join(process.env.BASENAME ?? '/', 'canvas-wordmark.prod.svg')}
    />
  );
};
