import React, { createContext, FC, useCallback, useRef } from 'react';

import useKeydownEvent from '@atlaskit/ds-lib/use-keydown-event';

import { FocusableElement } from '../../types';
import handleFocus from '../utils/handle-focus';

export const FocusManagerContext = createContext({
  registerRef: (ref: FocusableElement) => {},
  menuItemRefs: [] as FocusableElement[],
});

const FocusManager: FC = ({ children }) => {
  const menuItemRefs = useRef<FocusableElement[]>([]);
  const registerRef = useCallback((ref: FocusableElement) => {
    if (ref && !menuItemRefs.current.includes(ref)) {
      menuItemRefs.current.push(ref);
    }
  }, []);

  useKeydownEvent(handleFocus(menuItemRefs.current));

  const contextValue = {
    menuItemRefs: menuItemRefs.current,
    registerRef,
  };

  return (
    <FocusManagerContext.Provider value={contextValue}>
      {children}
    </FocusManagerContext.Provider>
  );
};

export default FocusManager;
