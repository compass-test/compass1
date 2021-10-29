import React, { FunctionComponent, useContext, useState } from 'react';

export interface DialogExpansionContextProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const DialogExpansionContext = React.createContext<
  DialogExpansionContextProps & { allowChangeExpand: (expand: boolean) => void }
>({
  isExpanded: false,
  setIsExpanded: (isExpanded: boolean) => {},
  allowChangeExpand: (expand: boolean) => {},
});

interface Props {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const DialogExpansionContextProvider: FunctionComponent<Props> = ({
  children,
  isExpanded,
  setIsExpanded,
}) => {
  const [changeExpand, setChangeExpand] = useState(true);

  return (
    <DialogExpansionContext.Provider
      value={{
        isExpanded,
        setIsExpanded: changeExpand ? setIsExpanded : () => {},
        allowChangeExpand: setChangeExpand,
      }}
    >
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
