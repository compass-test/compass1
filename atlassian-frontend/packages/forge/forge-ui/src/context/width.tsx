import React, { useState } from 'react';
import { WidthObserver } from '@atlaskit/width-detector';

export const WidthContext = React.createContext(0);
const SCROLLBAR_WIDTH = 30;

export const WidthProvider: React.FunctionComponent = ({ children }) => {
  const [width, setWidth] = useState(0);

  const handleWidthChange = (newWidth?: number) => {
    // Ignore changes that are less than SCROLLBAR_WIDTH, otherwise it can cause infinite re-scaling
    if (!newWidth || Math.abs(width - newWidth) < SCROLLBAR_WIDTH) {
      return;
    }
    setWidth(newWidth);
  };

  return (
    <>
      <WidthObserver setWidth={handleWidthChange} />
      <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
    </>
  );
};

export const WidthConsumer = WidthContext.Consumer;
