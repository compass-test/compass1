import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { TemplateFormApi } from '../apis/TemplateFormApi';

export const TemplateFormApiContext = createContext<
  TemplateFormApi | undefined
>(undefined);

interface TemplateFormApiProviderProps {
  children: ReactNode;
  templateFormApi: TemplateFormApi;
}

export const TemplateFormApiProvider: FC<TemplateFormApiProviderProps> = ({
  children,
  templateFormApi,
}) => {
  return (
    <TemplateFormApiContext.Provider value={templateFormApi}>
      {children}
    </TemplateFormApiContext.Provider>
  );
};

export function useTemplateFormApi() {
  const templateFormApi = useContext(TemplateFormApiContext);
  if (templateFormApi === undefined) {
    throw new Error(
      'useTemplateFormApi must be used within a TemplateFormApiProvider',
    );
  }
  return templateFormApi;
}

export const withTemplateFormApi = <C extends ComponentClass>(
  Component: C,
): C => {
  return (((props: any) => {
    const templateFormApi = useTemplateFormApi();
    return <Component {...props} templateFormApi={templateFormApi} />;
  }) as any) as C;
};
