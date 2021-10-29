import React from 'react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';
import { mockGetRecommendations } from '@atlassian/ptc-test-utils';

import OwnerPicker from './main';
import { MOCK_DEFAULT_OWNER, mockGetUserPickerUser } from './mocks';

export const OwnerPickerNoDefault = () => {
  mockGetRecommendations();
  return (
    <CompassTestProvider>
      <OwnerPicker onChange={(value) => value} cloudId={'test-cloud-id'} />
    </CompassTestProvider>
  );
};

export const OwnerPickerWithDefault = () => {
  mockGetUserPickerUser(MOCK_DEFAULT_OWNER.id);
  mockGetRecommendations();

  return (
    <CompassTestProvider>
      <OwnerPicker
        onChange={(value) => value}
        value={MOCK_DEFAULT_OWNER}
        cloudId={'test-cloud-id'}
      />
    </CompassTestProvider>
  );
};
