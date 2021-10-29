import {
  JiraCloudEditionKey,
  JiraCloudProductKey,
} from '../../../../common/types';

export type JiraAppConstants = {
  cloudEditionNames: {
    [key in JiraCloudEditionKey]: string;
  };
  cloudName: string;
  feedbackCollector?: {
    embeddableKey: string;
    requestTypeId: string;
  };
  cloudProductNames: Record<JiraCloudProductKey, string>;
  cloudProductScores: Record<JiraCloudProductKey, number>;
};
