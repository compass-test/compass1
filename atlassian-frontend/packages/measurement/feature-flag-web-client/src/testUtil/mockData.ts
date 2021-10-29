import { FeatureFlagUpdate, PollingConfig } from '../core/types';
import { flagResponseToFlagUpdate } from '../core/util';
import {
  ClientCauseReason,
  ClientMetadata,
  ClientStorageState,
  ClientUserState,
  ClientVisibilityState,
  FeatureFlagResponse,
} from '../fetcher/types';
import {
  AnonymousFlagUser,
  EvaluationReason,
  FeatureFlagUserWithIdentifier,
  GetValueOptions,
  Identifiers,
  SupportedFlagTypes,
} from '../index';
import { FeatureFlagState } from '../util/types';

export const minFlagResponse: FeatureFlagResponse = {};

// Response version of featureFlagState in this file
export const initialFlagResponse: FeatureFlagResponse = {
  featureFlagValues: [
    {
      key: 'flagString',
      value: 'on',
      ruleId: 'someRuleId',
      reason: EvaluationReason.RULE_MATCH,
      trackingInfo: { samplingRate: 1 },
    },
    {
      key: 'flagStringNoReason',
      value: 'on',
      trackingInfo: { samplingRate: 0 },
    },
    {
      key: 'flagObj',
      value: {
        english: 'on',
        'non-english': 'off',
      },
      trackingInfo: { samplingRate: 0 },
    },
  ],
  versionData: 'initialVersionData',
};

// This payload is different to others in this file
// Its use case will be to detect when the client has updated
// The flags without the consistentcy of versionData from the server
// IE, when user data is updated.
export const updateUserFlagResponse: FeatureFlagResponse = {
  featureFlagValues: [
    {
      // Tests reasons are updated
      key: 'flagString',
      value: 'off',
      reason: EvaluationReason.FALLTHROUGH,
      trackingInfo: { samplingRate: 0 },
    },
    {
      // Tests missing flags are removed and new flags are added
      key: 'someOtherFlagNameWithNoReason',
      value: 'on',
      trackingInfo: { samplingRate: 1 },
    },
    {
      // Tests values are updated
      key: 'flagObj',
      value: {
        english: 'off',
        'non-english': 'on',
      },
      trackingInfo: { samplingRate: 1 },
    },
  ],
  versionData: 'updateUserFlagResponse',
};

export const fullFlagResponse: FeatureFlagResponse = {
  featureFlagValues: [
    {
      key: 'flagBool',
      value: true,
      ruleId: 'someRuleId',
      reason: EvaluationReason.RULE_MATCH,
      trackingInfo: { samplingRate: 1 },
    },
    {
      key: 'flagNumber',
      value: 1,
      trackingInfo: { samplingRate: 0 },
    },
  ],
  deletedFlags: ['flagString', 'flagObj'],
  versionData: 'someVersionData',
};

export const modifyFlagResponse: FeatureFlagResponse = {
  featureFlagValues: [
    {
      key: 'flagString',
      value: 'off',
      ruleId: 'someOtherRuleId',
      reason: EvaluationReason.RULE_MATCH,
      trackingInfo: { samplingRate: 0 },
    },
    {
      key: 'flagObj',
      value: {
        english: 'skip',
        'non-english': 'skip',
      },
      trackingInfo: { samplingRate: 1 },
    },
  ],
  versionData: 'someVersionData1',
};

export const addFlagResponse: FeatureFlagResponse = {
  featureFlagValues: [
    {
      key: 'flagNumber',
      value: 1,
      trackingInfo: { samplingRate: 1 },
    },
  ],
  versionData: 'someVersionData2',
};

export const deleteFlagResponse: FeatureFlagResponse = {
  deletedFlags: ['flagString', 'flagObj'],
  versionData: 'someVersionData3',
};

export const minFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  minFlagResponse,
);
export const initialFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  initialFlagResponse,
);
export const updateUserFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  updateUserFlagResponse,
);
export const fullFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  fullFlagResponse,
);
export const modifyFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  modifyFlagResponse,
);
export const addFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  addFlagResponse,
);
export const deleteFlagUpdate: FeatureFlagUpdate = flagResponseToFlagUpdate(
  deleteFlagResponse,
);

export const featureFlagState: FeatureFlagState = {
  flags: {
    flagString: {
      value: 'on',
      evaluationDetail: {
        ruleId: 'someRuleId',
        reason: EvaluationReason.RULE_MATCH,
      },
      trackingInfo: {
        samplingRate: 1,
      },
    },
    flagStringNoReason: {
      value: 'on',
      trackingInfo: {
        samplingRate: 0,
      },
    },
    flagObj: {
      value: {
        english: 'on',
        'non-english': 'off',
      },
      trackingInfo: {
        samplingRate: 0,
      },
    },
  },
  timestamp: Date.now(),
  version: 'initialVersionData',
};

export const updateUserFlagState: FeatureFlagState = {
  flags: {
    flagString: {
      // Tests reasons are updated
      value: 'off',
      evaluationDetail: {
        reason: EvaluationReason.FALLTHROUGH,
      },
      trackingInfo: {
        samplingRate: 0,
      },
    },
    someOtherFlagNameWithNoReason: {
      // Tests missing flags are removed and new flags are added
      value: 'on',
      trackingInfo: {
        samplingRate: 1,
      },
    },
    flagObj: {
      // Tests values are updated
      value: {
        english: 'off',
        'non-english': 'on',
      },
      trackingInfo: {
        samplingRate: 1,
      },
    },
  },
  timestamp: Date.now(),
  version: 'updateUserFlagResponse',
};

export const anonymousUser: AnonymousFlagUser = {
  isAnonymous: true,
  additionalIdentifiers: {
    atlassianAccountId: 'someAtlassianAccountId',
    trelloAnonymousId: 'sometrelloAnonymousId',
    tenantId: 'someTenantId',
  },
  custom: {
    someCustomString: 'attrVal1',
    someCustomNumber: 1234,
    someCustomBoolean: false,
  },
};

export const minimalUser: FeatureFlagUserWithIdentifier = {
  identifier: {
    type: Identifiers.TRELLO_USER_ID,
    value: 'someTrelloUser',
  },
};

export const fullUser: FeatureFlagUserWithIdentifier = {
  identifier: {
    type: Identifiers.TRELLO_USER_ID,
    value: 'someTrelloUser',
  },
  isAnonymous: true,
  additionalIdentifiers: {
    atlassianAccountId: 'someAtlassianAccountId',
    trelloAnonymousId: 'sometrelloAnonymousId',
    tenantId: 'someTenantId',
  },
  custom: {
    someCustomString: 'attrVal1',
    someCustomNumber: 1234,
    someCustomBoolean: false,
  },
};

export const minimalPollingConfig: Partial<PollingConfig> = {
  interval: 600000, // 600 seconds = 10 mins
};

export const fullMetadata: ClientMetadata = {
  client: {
    name: 'someClientName',
    version: 'someClientVersion',
  },
  config: {
    pollingSeconds: 300000,
  },
  state: {
    visibility: ClientVisibilityState.VISIBLE,
    cause: ClientCauseReason.INITIALIZATION,
    storage: ClientStorageState.AVAILABLE,
    userContext: ClientUserState.NEW,
  },
};

export const minimalGetValueOptions: GetValueOptions<SupportedFlagTypes> = {};

export const fullGetValueOptions: GetValueOptions<SupportedFlagTypes> = {
  oneOf: ['one', 'two'],
  exposureData: {
    attr1: 'string',
    attr2: 123,
    attr3: true,
  },
  shouldSendExposureEvent: false,
};

export const validAnalyticsWebClient = {
  sendOperationalEvent: (): void => {},
};
