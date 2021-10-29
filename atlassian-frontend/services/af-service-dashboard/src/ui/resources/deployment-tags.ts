import { createResource } from 'react-resource-router';

import request from '../utils/request';

export type DeploymentTagsData = {
  tagOptions: string[];
};

export const deploymentTagsResource = createResource<DeploymentTagsData>({
  type: 'DEPLOYMENT-TAGS',
  getKey: ({ match }) => `deployment-tags-${match.params.service}`,
  getData: ({ match }) =>
    request.get(`/api/deployment-tags?name=${match.params.service}`),
});
