// eslint-disable-next-line @repo/internal/fs/filename-pattern-match
import React from 'react';
import AvatarGroup from '@atlaskit/avatar-group';
import { Presence } from '../src/index';
import { RANDOM_USERS } from '../examples-util/data';

let participants: any[] = [];

const presence = new Presence({
  spaceKey: 'ari:cloud:confluence:XYZ:page/XYZ',
  presenceServerUrl:
    'https://presence-service--app.ap-southeast-2.dev.atl-paas.net/',
});

presence.on('presence', (presence) => {
  participants = presence.map((data) => {
    return { email: data.sessionId, name: data.sessionId };
  });
  console.log('Received presence data', participants);
});

// with the use of sample data list
const AvatarGroupExample = () => {
  const data = RANDOM_USERS.map((d) => ({
    email: d.email,
    key: d.email,
    name: d.name,
    href: '#',
  }));

  return <AvatarGroup appearance="stack" data={data} />;
};

export default AvatarGroupExample;
