import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Tag from '@atlaskit/tag';
import Tooltip from '@atlaskit/tooltip';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';

import { CompassComponentLabelForUI } from '../../../../../../common/types';
import { getTagColor } from '../../../../../../common/utils/labels';

import { TagsContainer } from './styled';

type Props = {
  labels: Array<CompassComponentLabelForUI>;
  testId?: string;
};

export const ComponentLabelsViewer = (props: Props) => {
  const { labels, testId } = props;

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const fireUIAnalyticsEventForLabelClick = () => {
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'componentLabel',
    });
    fireUIAnalytics(event);
  };

  return (
    <TagsContainer data-testid={testId}>
      {labels.map((label) => {
        return (
          <Tooltip key={label.name} content={label.name}>
            <div onClick={fireUIAnalyticsEventForLabelClick}>
              <Tag
                color={getTagColor(label.name)}
                text={label.name}
                isRemovable={false}
                testId={`pollinator.page-component-details.labels-viewer.label.${label.name}`}
              />
            </div>
          </Tooltip>
        );
      })}
    </TagsContainer>
  );
};
