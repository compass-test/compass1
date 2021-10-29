import React from 'react';
import { useMemo } from 'react';
import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

import { StickyList } from './StickyList';

interface CanvasProps {
  useConcurrentMode: boolean;
  useGesture: boolean;
  totalStickies: number;
}

export const Canvas = ({ useConcurrentMode, totalStickies }: CanvasProps) => {
  const mode = useMemo<'concurrent' | undefined>(
    () => (useConcurrentMode ? 'concurrent' : undefined),
    [useConcurrentMode],
  );

  return (
    <ThreeCanvas
      flat
      mode={mode}
      orthographic
      camera={{ position: [0, 0, 1], near: 0, far: 1 }}
      gl={{
        alpha: false,
        antialias: true,
      }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      onCreated={({ gl }) => {
        gl.setClearColor('white');
      }}
      raycaster={{
        near: 0,
        far: 1,
      }}
    >
      <OrbitControls
        enableRotate={false}
        enableDamping={false}
        enablePan={false}
        enableZoom
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
      <Stats />
      <ambientLight />
      <StickyList totalStickies={totalStickies} />
    </ThreeCanvas>
  );
};
