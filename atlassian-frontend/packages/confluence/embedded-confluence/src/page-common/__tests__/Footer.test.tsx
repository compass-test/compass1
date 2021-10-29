import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Footer } from '../Footer';
import type { FooterProps } from '../Footer';

const mockCreateAnalyticsEvent = jest.fn(() => ({ fire: jest.fn() }));

jest.mock('@atlaskit/analytics-next', () => ({
  ...(jest.requireActual('@atlaskit/analytics-next') as any),
  useAnalyticsEvents: () => ({
    createAnalyticsEvent: mockCreateAnalyticsEvent,
  }),
}));

const FooterComponent = (props: FooterProps) => (
  <IntlProvider locale="en">
    <Footer {...props} />
  </IntlProvider>
);

jest.mock('@atlaskit/tooltip', () => ({
  ...jest.requireActual<any>('@atlaskit/tooltip'),
  __esModule: true,
  default: ({
    children,
    content,
  }: {
    children: ReactNode;
    content: string;
  }) => (
    <div>
      <div>{children}</div>
      <div>{content}</div>
    </div>
  ),
}));

it('should not be clickable when when url is null', async () => {
  const { getByText, queryByTestId } = render(FooterComponent({ url: null }));
  expect(getByText('Powered by')).toBeInTheDocument();
  expect(queryByTestId('logo-link')).not.toBeInTheDocument();
});

it('should be clickable when when url is not null', async () => {
  const { getByText, getByTestId } = render(
    FooterComponent({ url: 'http://www.test.com' }),
  );
  expect(getByText('Powered by')).toBeInTheDocument();
  expect(getByTestId('link')).toHaveAttribute('href', 'http://www.test.com');
});

it('should show Tooltip when url is not null', async () => {
  const { getByText } = render(FooterComponent({ url: 'http://www.test.com' }));
  expect(getByText('View in Confluence')).toBeInTheDocument();
});

it('should trigger the analytic client with expected payload', () => {
  const { getByTestId } = render(
    FooterComponent({ url: 'http://www.test.com' }),
  );

  userEvent.click(getByTestId('link'));

  expect(mockCreateAnalyticsEvent).toBeCalledWith({
    action: 'clicked',
    actionSubject: 'link',
    actionSubjectId: 'confluenceFooter',
    source: 'embeddedConfluenceViewPageScreen',
    eventType: 'ui',
  });
});
