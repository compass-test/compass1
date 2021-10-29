import React, { ReactElement } from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import MemberRow from './index';

export default {
  decorators: [
    (storyFn: () => ReactElement) => (
      <CompassTestProvider locale="en">{storyFn()}</CompassTestProvider>
    ),
  ],
};

// accountIds are obtained through REST request
const mock = {
  accountId: '56fd42898a624b75ed4bba4a058d3792',
  name: 'Zabdiel Jaramillo',
  picture:
    'https://secure.gravatar.com/avatar/56fd42898a624b75ed4bba4a058d3792?d=https%3A%2F%2Favatar-management--avatars.us-west-2.staging.public.atl-paas.net%2Finitials%2FZJ-5.png',
};

export const MemberRowExample = () => {
  return (
    <MemberRow
      name={mock.name}
      picture={mock.picture}
      accountId={mock.accountId}
    />
  );
};
