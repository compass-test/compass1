import React from 'react';

import Button from '@atlaskit/button/standard-button';
import { createUIAnalyticsChannel } from '@atlassian/commerce-events-ui-react';

import { createAtlaskitToEventChannelRepackager } from '../src';

// This is just used for testing the example works
export const ANALYTICS_NEXT_EVENT_EMITTING_BUTTON_TEST_ID = 'my-button-test-id';

const { Listener, useEventDispatch } = createUIAnalyticsChannel();

const RepackageAtlaskitEvent = createAtlaskitToEventChannelRepackager(
  useEventDispatch,
);

const AtlaskitToEventChannelExample = () => (
  <Listener
    onEvent={(atlaskitEventPayload) =>
      console.log('This is an event channel event :D', atlaskitEventPayload)
    }
  >
    <RepackageAtlaskitEvent actionSubjectId="myActionSubjectID">
      <Button testId={ANALYTICS_NEXT_EVENT_EMITTING_BUTTON_TEST_ID}>
        Fire an Atlaskit event
      </Button>
    </RepackageAtlaskitEvent>
  </Listener>
);

export default AtlaskitToEventChannelExample;
