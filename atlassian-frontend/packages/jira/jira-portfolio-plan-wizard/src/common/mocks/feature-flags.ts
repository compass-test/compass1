import is from 'lodash/fp/constant';
import mapValues from 'lodash/fp/mapValues';

import { FeatureFlags } from '../types';

export const featureFlags = (mapValues(is, {
  _getVrTest: true,
  getProjectTypeRebrand: true,
  getPlanIsUsingStoryPoints: true,
  getAddTeamWithIssueSource: true,
  getNewPlanWizardIssueOverLimit: true,
  /**
   * Feature control flags depends on usage
   */
  getIssueSourceSettingsConfirmOnRemove: false,
}) as unknown) as FeatureFlags;
