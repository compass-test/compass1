import React, { FC, ReactNode } from 'react';

import { ProjectApi } from '../../apis/ProjectApi';
import { ProjectFormApi } from '../../apis/ProjectFormApi';
import { TemplateFormApi } from '../../apis/TemplateFormApi';
import { ProjectApiProvider } from '../ProjectApiContext';
import { ProjectFormApiProvider } from '../ProjectFormApiContext';
import { TemplateFormApiProvider } from '../TemplateFormApiContext';

import { ComposeProvider } from './ComposeProvider';

type ProvidedApi = ProjectApi | TemplateFormApi | ProjectFormApi;

interface ApisProviderProps {
  apis: ProvidedApi[];
  children: ReactNode;
}

export const ApisProvider: FC<ApisProviderProps> = ({ apis, children }) => {
  const components: any = [];
  apis.forEach(api => {
    const provider = getApiProvider(api);
    if (provider) {
      components.push(provider);
    }
  });
  return <ComposeProvider components={components}>{children}</ComposeProvider>;
};

function getApiProvider(
  api: ProvidedApi,
): [FC<any>, { [key: string]: any }] | undefined {
  switch (api.type) {
    case 'project':
      return [ProjectApiProvider, { projectApi: api }];
    case 'templateForm':
      return [TemplateFormApiProvider, { templateFormApi: api }];
    case 'projectForm':
      return [ProjectFormApiProvider, { projectFormApi: api }];
    default:
      return;
  }
}
