import { createResource } from 'react-resource-router';

import request from '../utils/request';

export type ServiceInformationData = {
  name: string;
  package: string;
  description?: string;
  team: string;
  isLocked: boolean;
  createdDate: string;
  envs: string[];
  deployment: {
    id: string;
    artefactUrl?: string;
    pipelineUuid: string;
    env: string;
    commit: string;
    packageVersion: string;
  };
};

export const serviceInformationResource = createResource<
  ServiceInformationData
>({
  type: 'SERVICE-INFORMATION',
  getKey: ({ match }) => `service-information-${match.params.service}`,
  getData: ({ match }) =>
    request.get(`/api/service-information?name=${match.params.service}`),
});
