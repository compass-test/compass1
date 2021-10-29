import React, { useRef, useState } from 'react';

export const TestNodeHTML = () => {
  const [isDragging, setIsDragging] = useState(false);

  const [coords, setCoords] = useState({
    left: Math.random() * window.innerWidth * 20 - window.innerWidth * 10,
    top: Math.random() * window.innerHeight * 20 - window.innerHeight * 10,
  });

  const ref = useRef({
    deltaX: 0,
    deltaY: 0,
    raf: -1,
  });

  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="node"
      style={
        {
          background: isDragging ? 'papayawhip' : 'palevioletred',
          left: coords.left,
          top: coords.top,
        } as any
      }
      ref={elementRef}
      onMouseDown={() => {
        setIsDragging(true);
        (elementRef.current as any).style['will-change'] = 'transform';
        (elementRef.current as any).style['z-index'] = 1;

        function loop(prevX: number, prevY: number) {
          if (prevX === ref.current.deltaX && prevY === ref.current.deltaY) {
            ref.current.raf = -1;
            return;
          }

          ref.current.raf = requestAnimationFrame(() => {
            elementRef.current!.style.transform = `translate(${ref.current.deltaX}px, ${ref.current.deltaY}px)`;
            loop(ref.current.deltaX, ref.current.deltaY);
          });
        }

        function onMouseUp() {
          setIsDragging(false);

          setCoords({
            left: coords.left + ref.current.deltaX,
            top: coords.top + ref.current.deltaY,
          });

          ref.current.deltaX = 0;
          ref.current.deltaY = 0;

          cancelAnimationFrame(ref.current.raf);
          ref.current.raf = -1;

          delete (elementRef.current as any).style['will-change'];
          (elementRef.current as any).style.transform = 'translate(0, 0)';
          (elementRef.current as any).style['z-index'] = 0;

          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
          document.getElementById('layers')!.classList.remove('dragging');
        }

        function onMouseMove(evt: MouseEvent) {
          ref.current.deltaX += evt.movementX;
          ref.current.deltaY += evt.movementY; // 🤷‍♀️

          if (ref.current.raf === -1) {
            loop(0, 0);
          }
        }

        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);

        document.getElementById('layers')!.classList.add('dragging');
      }}
    >
      <div className="contents">
        <strong>{isDragging ? 'Dragging' : 'Not dragging'}</strong>

        <p>
          Testing some content with <a href="#">links</a>
        </p>

        <div className="panel">I am a css panel</div>
      </div>
    </div>
  );
};
