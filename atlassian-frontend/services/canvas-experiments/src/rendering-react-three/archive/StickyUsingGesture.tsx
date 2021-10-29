import React, { useRef } from 'react';
import { useDrag } from 'react-use-gesture';
import { stickyGeometry, stickyMaterial } from './StickyBase';

interface StickyUsingGestureProps {
  x: number;
  y: number;
  z: number;
}

export const StickyUsingGesture = ({ x, y, z }: StickyUsingGestureProps) => {
  const meshRef = useRef<JSX.IntrinsicElements['mesh']>(null);
  const positionRef = useRef<[number, number, number]>([x, y, z]);

  const bind = useDrag(({ offset: [x, y] }) => {
    if (meshRef.current) {
      (meshRef.current.position as any).set(
        positionRef.current[0] + x,
        positionRef.current[1] - y,
        positionRef.current[2],
      );
    }
  }, {});

  return (
    <mesh ref={meshRef} position={positionRef.current} {...(bind as any)()}>
      {stickyGeometry}
      {stickyMaterial}
    </mesh>
  );
};
