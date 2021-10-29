import React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { connectUIAnalytics } from '../../../common/analytics/util';
import CreateSpaceLink from './create-space-link/connected';
import SpacePicker from './space-picker/connected';
import { OwnProps, DispatchProps, Props } from './types';
import { SpacesData } from '../../../state/confluence/spaces/types';

const Content = ({
  onCreateSpace,
  onSpaceSelected,
  onSelect,
  onCreate,
}: Props) => (
  <div>
    <SpacePicker
      onSelected={(value: SpacesData, analyticsEvent: UIAnalyticsEvent) => {
        onSelect(analyticsEvent);
        onSpaceSelected(value);
      }}
    />
    <CreateSpaceLink
      onCreateSpace={(analyticsEvent: UIAnalyticsEvent) => {
        onCreate(analyticsEvent);
        onCreateSpace();
      }}
    />
  </div>
);

export default connectUIAnalytics<OwnProps & DispatchProps>({
  onSelect: 'spaceSelected',
  onCreate: 'createdSpace',
})(Content);
