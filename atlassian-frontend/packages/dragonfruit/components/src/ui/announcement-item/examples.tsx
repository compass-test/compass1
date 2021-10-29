import React, { ReactElement } from 'react';

import Button from '@atlaskit/button';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { AnnouncementItem } from './main';

export const AnnouncementItemSuccess = () => {
  const component = {
    id: 'a',
    name: 'Id gate keeper',
    type: CompassComponentType.SERVICE,
  };

  const componentBB = {
    id: 'a',
    name: 'BitBucket',
    type: CompassComponentType.APPLICATION,
  };

  const action = <Button appearance="primary">ACK</Button>;
  const data = '9/12 ACK';

  const action2 = <a>{data}</a>;

  return (
    <ApolloAutoMockProvider>
      <div style={{ width: '600px' }}>
        <AnnouncementItem
          targetDate={new Date()}
          title="API deprecation notice"
          sourceComponent={component}
          description="The next month we will go an delete all the identity API, good luck to all teams"
          acknowledgementAction={action}
        />
        <AnnouncementItem
          targetDate={new Date(2021, 12, 15)}
          title="Planned maintenance Bitbucket"
          sourceComponent={componentBB}
          description="From 8pm AEST to 10 AEST we will put all repositories in read only mode while the reindex is performed on the cloud"
          acknowledgementAction={action2}
        />
      </div>
    </ApolloAutoMockProvider>
  );
};

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider>{storyFn()}</CompassTestProvider>
    ),
  ],
};
