import React from 'react';

import {
  CompassTestProvider,
  MockSmartLinkClient,
} from '@atlassian/dragonfruit-testing';

import { List, SmartLinkListItem } from '../src';

const urls = [
  'https://atlassian.com',
  'https://bitbucket.org/ajtritt',
  'https://jdog.jira-dev.com/browse/BENTO-4222',
  'https://mandopt-ra2.jira-dev.com/browse/FOO-1',
  'https://1drv.ms/b/s!Agkn_W9yVS7uZt3y64eDKjw4woI',
  'https://docs.google.com/document/d/1igbED2X5Qt8rQCeO-5rbDGG6u51wUNumlo2P_EtC9lo/edit',
];

export default function SmartLinkListExample() {
  return (
    <CompassTestProvider smartLinksProviderClient={new MockSmartLinkClient()}>
      <div style={{ maxWidth: '500px' }}>
        <List testId="dragonfruit.common-ui.examples.smart-link-list.list">
          {urls.map((url) => (
            <List.Item>
              <SmartLinkListItem text={url} url={url} />
            </List.Item>
          ))}
        </List>
      </div>
    </CompassTestProvider>
  );
}
