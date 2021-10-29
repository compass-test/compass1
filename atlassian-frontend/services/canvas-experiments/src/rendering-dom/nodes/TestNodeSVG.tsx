import React, { useRef, useState } from 'react';

export const TestNodeSVG = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [coords] = useState({
    left: Math.random() * window.innerWidth * 6,
    top: Math.random() * window.innerHeight * 6,
  });
  const ref = useRef({ left: coords.left, top: coords.top, raf: false });
  const elementRef = useRef<SVGRectElement>(null);

  return (
    <rect
      x={coords.left}
      y={coords.top}
      width={100}
      height={100}
      fill="red"
      ref={elementRef}
      onMouseDown={() => {
        setIsDragging(true);

        function onMouseUp() {
          setIsDragging(false);
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
        }

        function onMouseMove(evt: MouseEvent) {
          ref.current.left += evt.movementX;
          ref.current.top += evt.movementY;

          if (!ref.current.raf) {
            ref.current.raf = true;
            requestAnimationFrame(() => {
              ref.current.raf = false;
              elementRef.current!.setAttribute('x', String(ref.current.left));
              elementRef.current!.setAttribute('y', String(ref.current.top));
            });
          }
        }

        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
      }}
    >
      <text>{isDragging ? 'Dragging' : 'Not dragging'}</text>
    </rect>
  );
};
