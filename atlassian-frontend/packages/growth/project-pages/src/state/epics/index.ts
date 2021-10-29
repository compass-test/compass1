import { sendTrackAnalyticsEvent } from '../../common/analytics/analytics-web-client';
import combineWrappedEpics from '../../common/util/combine-wrapped-epics';

import changeSpaceName from './change-space-name';
import checkProductsLicence from './check-products-licence';
import checkConfluenceUserPermissions from './check-confluence-user-permissions';
import confluenceCreateDialog from './confluence-create-dialog';
import confluenceTemplateDeepLink from './confluence-template-deep-link';
import connectConfluenceSpace from './connect-confluence-space';
import createConfluenceSpace from './create-confluence-space';
import fetchConnectedSpaceBlueprints from './fetch-connected-space-blueprints';
import generateSpaceKey from './generate-space-key';
import noValidKeyEpic from './no-valid-key';
import projectSpaceLink from './project-space-link';
import retrieveConfluenceSpaces from './retrieve-confluence-spaces';
import setFirstSpaceCreatedFlag from './set-first-space-created-flag';
import showXflowDialog from './invoke-cross-flow';
import updateProjectSpaceLink from './update-project-space-link';
import confluenceAccessRequestCapabilities from './confluence-access-request-capabilities';
import confluenceCollaborators from './confluence-collaborators';
import fetchConnectedSpaceOrPageTitle from './fetch-connected-space-or-page-title';
import fetchConnectedSpace from './fetch-connected-space';

const onError = (error: any, epicName: string) => {
  // Bubble the error all the way to the top.
  setTimeout(() => {
    throw error;
  }, 0);

  // Fire an analytics event to signal the error in the epic.
  sendTrackAnalyticsEvent({
    source: 'epic',
    action: 'error',
    actionSubject: epicName,
    attributes: { reason: String(error) || 'Unknown error' },
  });
};

export const getEpics = () => ({
  changeSpaceName,
  checkProductsLicence,
  checkConfluenceUserPermissions,
  confluenceCreateDialog,
  confluenceTemplateDeepLink,
  connectConfluenceSpace,
  createConfluenceSpace,
  fetchConnectedSpaceBlueprints,
  generateSpaceKey,
  noValidKeyEpic,
  projectSpaceLink,
  retrieveConfluenceSpaces,
  setFirstSpaceCreatedFlag,
  showXflowDialog,
  updateProjectSpaceLink,
  confluenceAccessRequestCapabilities,
  confluenceCollaborators,
  fetchConnectedSpaceOrPageTitle,
  fetchConnectedSpace,
});

export default combineWrappedEpics(getEpics(), onError);
