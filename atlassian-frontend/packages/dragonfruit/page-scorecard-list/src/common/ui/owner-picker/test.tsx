import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import {
  CompassTestProvider,
  MOCK_CLOUD_ID,
} from '@atlassian/dragonfruit-testing';
import { testRecommendationsData } from '@atlassian/ptc-test-utils';

import OwnerPicker from './main';

describe('OwnerPicker', () => {
  let result: RenderResult;
  let ownerPicker: HTMLElement | null;
  let selectedUser: HTMLElement | null;
  let placeholder: HTMLElement | null;

  const onChange = jest.fn((value) => value);
  const ownerPickerTestId = 'dragonfruit-scorecard-templates.owner-picker';

  describe('when no default given', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      result = render(
        <CompassTestProvider locale="en">
          <OwnerPicker
            onChange={onChange}
            cloudId={MOCK_CLOUD_ID}
            testId={ownerPickerTestId}
          />
        </CompassTestProvider>,
      );

      ownerPicker = result.getByTestId(ownerPickerTestId);
      placeholder = result.getByText('Choose owner');
    });

    it('should render the owner picker with placeholder text', () => {
      expect(ownerPicker).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe('when default given', () => {
    beforeEach(async () => {
      jest.resetAllMocks();
      result = await render(
        <CompassTestProvider locale="en">
          <OwnerPicker
            value={testRecommendationsData.recommendedUsers[0]}
            onChange={onChange}
            cloudId={MOCK_CLOUD_ID}
            testId={ownerPickerTestId}
          />
        </CompassTestProvider>,
      );
      ownerPicker = result.getByTestId(ownerPickerTestId);
      selectedUser = await result.getByText(
        testRecommendationsData.recommendedUsers[0].name,
      );
    });

    it('should render the owner picker with the selected user', () => {
      expect(ownerPicker).toBeInTheDocument();
      expect(selectedUser).toBeInTheDocument();
    });
  });
});
