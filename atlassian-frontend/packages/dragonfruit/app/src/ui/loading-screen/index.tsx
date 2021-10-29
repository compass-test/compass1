import { useEffect } from 'react';

import { useAppState } from '../../services/app-context';

export const LoadingScreen = () => {
  const appState = useAppState();

  useEffect(() => {
    if (appState.loading) {
      // Still loading. Don't hide the loading screen yet.
      return;
    }
    window.document.getElementById('loading-screen')?.remove();
  }, [appState]);

  return null;
};
