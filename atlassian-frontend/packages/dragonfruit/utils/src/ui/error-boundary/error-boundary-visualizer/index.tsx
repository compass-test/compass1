import React, { useEffect, useRef, useState } from 'react';

import { useDevMode } from '../../../services/dev-mode';

import { ErrorBoundaryBox, ForceErrorButton } from './styled';

const BOMB_ICON = '💣';

const ErrorBoundaryVisualizer = () => {
  const [devModeState] = useDevMode();
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const errorBoundaryBoxRef = useRef() as React.MutableRefObject<
    HTMLDivElement
  >;

  const { showErrorBoundaries } = devModeState;

  useEffect(() => {
    if (showErrorBoundaries && errorBoundaryBoxRef.current) {
      updateErrorButtonBoxPosition();

      const updateForceErrorButtonInterval = window.setInterval(
        () => updateErrorButtonBoxPosition(),
        300,
      );

      return () => {
        window.clearInterval(updateForceErrorButtonInterval);
      };
    }
  }, [showErrorBoundaries]);

  const updateErrorButtonBoxPosition = () => {
    const errorBoundaryBoxEl = errorBoundaryBoxRef.current as HTMLDivElement | null;
    const componentElement = errorBoundaryBoxEl?.nextSibling as Element | null;
    if (errorBoundaryBoxEl && componentElement) {
      const componentRect = componentElement.getBoundingClientRect();
      errorBoundaryBoxEl.style.left = `${componentRect.x}px`;
      errorBoundaryBoxEl.style.top = `${componentRect.y}px`;
      errorBoundaryBoxEl.style.width = `${componentRect.width}px`;
      errorBoundaryBoxEl.style.height = `${componentRect.height}px`;
    }
  };

  if (shouldThrowError) {
    throw Error('Intentionally triggered error boundary');
  }

  if (!showErrorBoundaries) {
    return null;
  } else {
    return (
      <ErrorBoundaryBox innerRef={errorBoundaryBoxRef}>
        <ForceErrorButton
          onClick={() => setShouldThrowError(true)}
          title={'Trigger error boundary'}
        >
          {BOMB_ICON}
        </ForceErrorButton>
      </ErrorBoundaryBox>
    );
  }
};

export default ErrorBoundaryVisualizer;
