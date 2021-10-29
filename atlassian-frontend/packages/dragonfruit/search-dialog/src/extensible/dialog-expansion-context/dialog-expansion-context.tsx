import React, { FunctionComponent, useContext } from 'react';

export interface DialogExpansionContextProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

const DialogExpansionContext = React.createContext<DialogExpansionContextProps>(
  {
    isExpanded: false,
    setIsExpanded: (isExpanded: boolean) => {},
  },
);

interface Props {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const DialogExpansionContextProvider: FunctionComponent<Props> = ({
  children,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <DialogExpansionContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </DialogExpansionContext.Provider>
  );
};

export const useDialogExpansionContext = () => {
  return useContext(DialogExpansionContext);
};

export const withDialogExpansionContext = <Props,>(
  WrappedComponent: React.ComponentType<Props & DialogExpansionContextProps>,
): React.ComponentType<Props> => {
  return (props: Props) => (
    <WrappedComponent {...props} {...useDialogExpansionContext()} />
  );
};
