import React from 'react';

import { shallow } from 'enzyme';

import BackButton from '../../BackButton';

describe('BackButton', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <BackButton onClick={jest.fn().mockName('testOnClick')} />,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <AnalyticsButton
        analyticsId="backButton"
        appearance="subtle"
        onClick={[MockFunction testOnClick]}
        testId="footer-back-button"
      >
        Back
      </AnalyticsButton>
    `);
  });
});
