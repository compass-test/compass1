import React, { ComponentType, PureComponent } from 'react';
import { connectUIAnalytics } from '../../../../common/analytics/util';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';

type Props = {
  SpacePicker: ComponentType<any>;
  CreateSpaceLink: ComponentType<any>;
  onCreateSpace: Function;
  onSpaceSelected: Function;
  onSelect: Function;
  onCreate: Function;
};

class Content extends PureComponent<Props> {
  render() {
    const {
      SpacePicker,
      CreateSpaceLink,
      onCreateSpace,
      onSpaceSelected,
      onSelect,
      onCreate,
    } = this.props;

    return (
      <div>
        <SpacePicker
          onSelected={(value: any, analyticsEvent: UIAnalyticsEvent) => {
            onSelect(value?.isPage, analyticsEvent);
            onSpaceSelected(value);
          }}
        />
        <CreateSpaceLink
          onCreateSpace={(analyticsEvent: any) => {
            onCreate(analyticsEvent);
            onCreateSpace();
          }}
        />
      </div>
    );
  }
}

export default connectUIAnalytics({
  onSelect: (isPageSelected: boolean) => ({
    name: 'spaceSelected',
    isPageSelected,
  }),
  onCreate: 'createdSpace',
})(Content);
