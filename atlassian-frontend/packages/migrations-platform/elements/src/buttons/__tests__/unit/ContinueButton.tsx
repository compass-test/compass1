import React from 'react';

import { shallow } from 'enzyme';

import ContinueButton from '../../ContinueButton';

describe('ContinueButton', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <ContinueButton analyticsId="FakeContinue">Continue</ContinueButton>,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <AnalyticsButton
        analyticsId="FakeContinue"
        appearance="primary"
        autoFocus={false}
        isDisabled={false}
        testId="footer-continue-button"
      >
        Continue
      </AnalyticsButton>
    `);
  });
});
