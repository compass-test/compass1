import React, { useCallback, useRef } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import { stickyGeometry, stickyMaterial } from './StickyBase';

interface StickyProps {
  x: number;
  y: number;
  z: number;
}

export const Sticky = ({ x, y, z }: StickyProps) => {
  const meshRef = useRef<JSX.IntrinsicElements['mesh']>(null);
  const positionRef = useRef<[number, number, number]>([x, y, z]);
  const isDraggingRef = useRef(false);

  const onPointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target! as any).setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
  }, []);
  const onPointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (isDraggingRef.current) {
      positionRef.current = event.unprojectedPoint.toArray();
    }
  }, []);
  const onPointerUp = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDraggingRef.current = false;
    (event.target! as any).releasePointerCapture(event.pointerId);
  }, []);

  useFrame(() => {
    if (isDraggingRef.current && meshRef?.current?.position) {
      (meshRef.current.position as any).set(
        positionRef.current[0],
        positionRef.current[1],
        positionRef.current[2],
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={positionRef.current}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {stickyGeometry}
      {stickyMaterial}
    </mesh>
  );
};
