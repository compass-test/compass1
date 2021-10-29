import React from 'react';
import './App.css';

import { Canvas } from './components/Canvas';

interface AppProps {
  useConcurrentMode: boolean;
  useGesture: boolean;
  totalStickies: number;
}

function App({ useConcurrentMode, useGesture, totalStickies }: AppProps) {
  return (
    <Canvas
      useConcurrentMode={useConcurrentMode}
      useGesture={useGesture}
      totalStickies={totalStickies}
    />
  );
}

export default App;
