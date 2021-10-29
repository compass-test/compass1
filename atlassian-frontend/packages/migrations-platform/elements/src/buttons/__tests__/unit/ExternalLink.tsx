import React from 'react';

import { shallow } from 'enzyme';

import ExternalLink from '../../ExternalLink';

describe('ExternalLink', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <ExternalLink href="http://example.com">Fake Link</ExternalLink>,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <AnalyticsButton
        analyticsLink={true}
        appearance="link"
        href="http://example.com"
        rel="noopener noreferrer"
        spacing="none"
        target="_blank"
      >
        Fake Link
      </AnalyticsButton>
    `);
  });

  test('renders correctly as subtle link', () => {
    const wrapper = shallow(
      <ExternalLink href="http://example.com" subtle>
        Fake Link
      </ExternalLink>,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <AnalyticsButton
        analyticsLink={true}
        appearance="subtle-link"
        href="http://example.com"
        rel="noopener noreferrer"
        spacing="none"
        target="_blank"
      >
        Fake Link
      </AnalyticsButton>
    `);
  });

  test('renders correctly as button with more button props', () => {
    const wrapper = shallow(
      <ExternalLink
        href="http://example.com"
        appearance="primary"
        title="Fake title"
      >
        Fake Button
      </ExternalLink>,
    );
    expect(wrapper).toMatchInlineSnapshot(`
      <AnalyticsButton
        analyticsLink={true}
        appearance="primary"
        href="http://example.com"
        rel="noopener noreferrer"
        spacing="none"
        target="_blank"
        title="Fake title"
      >
        Fake Button
      </AnalyticsButton>
    `);
  });
});
