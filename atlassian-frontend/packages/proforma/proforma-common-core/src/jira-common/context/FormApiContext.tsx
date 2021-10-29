import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { FormApiV3 } from '../apis/FormApiV3';

export const FormApiContext = createContext<FormApiV3 | undefined>(undefined);

interface FormApiProviderProps {
  children: ReactNode;
  formApi: FormApiV3;
}

export const FormApiProvider: FC<FormApiProviderProps> = ({
  children,
  formApi,
}) => {
  return (
    <FormApiContext.Provider value={formApi}>
      {children}
    </FormApiContext.Provider>
  );
};

export function useFormApi() {
  const formApi = useContext(FormApiContext);
  if (formApi === undefined) {
    throw new Error('`useFormApi` must be used within a `FormApiProvider`.');
  }
  return formApi;
}

export const withFormApi = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const formApi = useFormApi();
    return <Component {...props} formApi={formApi} />;
  }) as any) as C;
};
