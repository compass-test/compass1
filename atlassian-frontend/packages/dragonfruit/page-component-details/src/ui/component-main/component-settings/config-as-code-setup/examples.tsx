import React from 'react';

import { MainContainer } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponentDetailViewFragment,
  CompassComponentType,
  CompassLinkType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ConfigAsCodeSetup from './main';

function BaseExample({
  component,
}: {
  component: CompassComponentDetailViewFragment;
}) {
  return (
    <CompassTestProvider>
      <MainContainer>
        <ConfigAsCodeSetup component={component} />
      </MainContainer>
    </CompassTestProvider>
  );
}

export function BaseFields() {
  const component: CompassComponentDetailViewFragment = {
    name: 'Lorem ipsum',
    id:
      'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
    type: CompassComponentType.SERVICE,
  };

  return <BaseExample component={component} />;
}

export function AllFields() {
  const component: CompassComponentDetailViewFragment = {
    name: 'Lorem ipsum',
    id:
      'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
    type: CompassComponentType.SERVICE,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris leo nisi, ultricies gravida orci ut, maximus auctor orci. Morbi venenatis.',
    ownerId: 'someownerarigoeshere',
    links: [
      {
        name: 'Link 1',
        id: 'link1id',
        type: CompassLinkType.DASHBOARD,
        url: 'http://www.atlassian.net',
      },
      {
        name: 'Link 2',
        id: 'link2id',
        type: CompassLinkType.DOCUMENT,
        url: 'http://www.atlassian.net/wiki',
      },
    ],
  };

  return <BaseExample component={component} />;
}
