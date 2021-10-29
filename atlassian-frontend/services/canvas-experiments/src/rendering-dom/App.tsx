import React, { RefObject, useEffect, useRef } from 'react';
import { TestNodeSVG } from './nodes/TestNodeSVG';
import { TestNodeHTML } from './nodes/TestNodeHTML';

const scrollLayersCount = 5;

function App() {
  const useSVG = window.location.hash === '#svg';
  const scroll = useRef({ value: 1, raf: false });

  const scrollLayers: RefObject<HTMLDivElement | null>[] = [];

  for (let i = 0; i < scrollLayersCount; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    scrollLayers.push(useRef<HTMLDivElement>(null));
  }

  useEffect(() => {
    document.addEventListener('wheel', evt => {
      scroll.current.value = Math.min(
        Math.max(scroll.current.value - evt.deltaY / 1000, 0.1),
        4,
      );

      if (!scroll.current.raf) {
        scroll.current.raf = true;
        requestAnimationFrame(() => {
          scroll.current.raf = false;

          for (let i = 0; i < scrollLayersCount; i++) {
            scrollLayers[
              i
            ].current!.style.transform = `scale(${scroll.current.value})`;
          }

          // for (let i = 0; i < scrollLayersCount; i++) {
          //   scrollLayers[i].current!.style.transform = `scale(${scroll.current.value})`;
          //
          //   if (scroll.current.value < 0.3) {
          //     scrollLayers[i].current!.classList.add('low-detail');
          //   } else {
          //     scrollLayers[i].current!.classList.remove('low-detail');
          //   }
          // }
        });
      }
    });
  });

  if (useSVG) {
    const nodes = [];

    for (let i = 0; i < 10000; i++) {
      nodes.push(<TestNodeSVG key={i} />);
    }

    return (
      <svg
        height={window.innerHeight}
        width={window.innerWidth}
        className="App"
      >
        {nodes}
      </svg>
    );
  } else {
    const layerGroup = [];

    for (let i = 0; i < scrollLayersCount; i++) {
      const nodes = [];

      for (let ii = 0; ii < 1000; ii++) {
        nodes.push(<TestNodeHTML key={ii} />);
      }
      layerGroup.push(
        <div
          key={i}
          className="App"
          style={{
            position: 'absolute',
            zIndex: i,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            contain: 'content',
            transform: 'translateZ(0)',
            pointerEvents: 'none',
          }}
        >
          <div className="scale" ref={scrollLayers[i] as any}>
            {nodes}
          </div>
        </div>,
      );
    }

    return (
      <div id="layers">
        <div className="capture" />
        {layerGroup}
      </div>
    );
  }
}

export default App;
