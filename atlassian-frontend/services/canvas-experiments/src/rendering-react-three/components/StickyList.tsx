import React from 'react';
import { useCallback, useRef, useMemo } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import { templateObject } from '../util';

import stickyVertexShader from '../shaders/StickyVertex';
import stickyFragmentShader from '../shaders/StickyFragment';

interface StickyListProps {
  totalStickies: number;
}

export const StickyList = ({ totalStickies }: StickyListProps) => {
  const positions = useMemo(() => {
    const _positions = [];
    for (let n = 0; n < totalStickies; n++) {
      const coordX = (-0.5 + Math.random()) * window.innerWidth * 20;
      const coordY = (-0.5 + Math.random()) * window.innerHeight * 20;
      _positions.push([coordX, coordY, 0]);
    }
    return _positions;
  }, [totalStickies]);

  const initRef = useRef(false);
  const meshRef = useRef<JSX.IntrinsicElements['instancedMesh']>();
  const positionsArrayRef = useRef(positions);
  const instanceIdRef = useRef<number>();
  const moveToRef = useRef<[number, number, number]>();

  const onPointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    (event.target! as any).setPointerCapture(event.pointerId);
    instanceIdRef.current = (event as any).instanceId;
  }, []);
  const onPointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (instanceIdRef.current) {
      moveToRef.current = event.unprojectedPoint.toArray();
    }
  }, []);
  const onPointerUp = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    instanceIdRef.current = undefined;
    (event.target! as any).releasePointerCapture(event.pointerId);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;

    const isInitialRender = initRef.current === false;
    const isDragging = instanceIdRef.current && moveToRef.current;
    const needsRender = isInitialRender || isDragging;

    if (needsRender) {
      for (let id = 0; id < totalStickies; id++) {
        const position = positionsArrayRef.current[id];
        // Update matrices for all instances on initial render.
        if (isInitialRender) {
          templateObject.position.set(position[0], position[1], position[2]);
          templateObject.updateMatrix();
          mesh!.setMatrixAt!(id, templateObject.matrix);
        } else {
          // Otherwise, update matrices for instance being dragged only.
          if (id === instanceIdRef.current!) {
            const moveTo = moveToRef.current;
            positionsArrayRef.current[id] = moveTo!;
            mesh!.instanceMatrix!.needsUpdate = true;
            templateObject.position.set(position[0], position[1], position[2]);
            templateObject.updateMatrix();
            mesh!.setMatrixAt!(id, templateObject.matrix);
          }
        }
      }
    }
    initRef.current = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null as any, null as any, totalStickies]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <planeBufferGeometry args={[50, 50]} />
      <rawShaderMaterial
        vertexShader={stickyVertexShader}
        fragmentShader={stickyFragmentShader}
      />
    </instancedMesh>
  );
};
