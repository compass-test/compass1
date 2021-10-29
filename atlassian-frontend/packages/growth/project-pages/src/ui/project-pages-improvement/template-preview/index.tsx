import React, { useCallback } from 'react';
import {
  useCrossFlow,
  Targets,
  Journeys,
} from '@atlassiansox/cross-flow-component-support';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { useProjectPages } from '../../../controllers/project-pages';
import { useTemplate } from '../../../controllers/template';
import { isConfluenceTemplate } from '../../../controllers/template/utils';
import { connectUIAnalytics } from '../../../common/analytics/util';
import { TemplatePreviewProps, TemplatePreviewDispatchProps } from './types';
import View from './view';
import {
  PROJECT_PAGES_SOURCE_COMPONENT,
  PROJECT_PAGES_SOURCE_CONTEXT,
} from '../../../common/constants';
const TemplatePreview = ({
  onOpenCrossFlowError,
  onSuccessfulCrossFlowExpansion,
  onTryClick,
  onLearnMoreClick,
}: TemplatePreviewProps) => {
  const crossFlow = useCrossFlow();
  const { projectKey: jiraProjectKey } = useProjectPages();
  const template = useTemplate();

  const openCrossFlowOrDisplayError = useCallback(
    async (journey: typeof Journeys.DECIDE | typeof Journeys.GET_STARTED) => {
      if (
        crossFlow.isEnabled &&
        jiraProjectKey &&
        isConfluenceTemplate(template)
      ) {
        const crossFlowCompletionStatus = await crossFlow.api.open({
          sourceComponent: PROJECT_PAGES_SOURCE_COMPONENT,
          sourceContext: PROJECT_PAGES_SOURCE_CONTEXT,
          targetProduct: Targets.CONFLUENCE,
          journey,
          experimentalOptions: {
            isCrossSell: true,
            isPagesImprovementExperiment: true, // TODO remove after growth-kit is cleaned up (go/j/MLTP-122)
            jiraProjectKey,
            confluenceBlueprintModuleCompleteKey:
              template.blueprintModuleCompleteKey,
          },
        });
        if (crossFlowCompletionStatus.success) {
          onSuccessfulCrossFlowExpansion();
        }
      } else {
        onOpenCrossFlowError();
      }
    },
    [
      crossFlow,
      jiraProjectKey,
      template,
      onSuccessfulCrossFlowExpansion,
      onOpenCrossFlowError,
    ],
  );

  const handleLearnMoreClick = (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    openCrossFlowOrDisplayError(Journeys.DECIDE);
    onLearnMoreClick(analyticsEvent);
  };

  const handleTryClick = (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    openCrossFlowOrDisplayError(Journeys.GET_STARTED);
    onTryClick(analyticsEvent);
  };

  return (
    <View onLearnMoreClick={handleLearnMoreClick} onTryClick={handleTryClick} />
  );
};

export default connectUIAnalytics<TemplatePreviewDispatchProps>({
  onTryClick: 'tryThisTemplate',
  onLearnMoreClick: 'learnMore',
})(TemplatePreview);
