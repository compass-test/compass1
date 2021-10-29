import React from 'react';

// Declared as global singeltons to save on memory.
export const stickyGeometry = (
  <planeBufferGeometry attach="geometry" args={[50, 50]} />
);
export const stickyMaterial = (
  <meshStandardMaterial attach="material" color="hotpink" />
);
