import React, { createContext, FC, ReactNode, useContext } from 'react';

import { TemplateApi } from '../apis/TemplateApi';

const TemplateApiContext = createContext<TemplateApi | undefined>(undefined);

interface TemplateApiContextProps {
  children: ReactNode;
  templateApi: TemplateApi;
}

export const TemplateApiProvider: FC<TemplateApiContextProps> = ({
  children,
  templateApi,
}) => {
  return (
    <TemplateApiContext.Provider value={templateApi}>
      {children}
    </TemplateApiContext.Provider>
  );
};

export function useTemplateApi(): TemplateApi {
  const templateApi = useContext(TemplateApiContext);
  if (templateApi === undefined) {
    throw new Error(
      '`useTemplateApi` must be used within a `TemplateApiProvider`.',
    );
  }
  return templateApi;
}
