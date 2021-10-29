import React from 'react';
import { asyncComponent } from 'react-async-component';
import { FeedbackButton } from './feedback-button';

export default asyncComponent({
  resolve: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_compass-search-dialog/async-chunk/feedback-collector" */ './feedback-collector'
    ),
  LoadingComponent: (props: any) => <FeedbackButton onClick={() => {}} />,
});
