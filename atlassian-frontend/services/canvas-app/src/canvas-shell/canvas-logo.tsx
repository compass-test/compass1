import React from 'react';
import path from 'path';

export const CanvasLogo: React.FC = function CanvasLogo() {
  return (
    <img
      width={16}
      height={16}
      src={path.join(process.env.BASENAME ?? '/', 'canvas-logo.prod.svg')}
    />
  );
};
