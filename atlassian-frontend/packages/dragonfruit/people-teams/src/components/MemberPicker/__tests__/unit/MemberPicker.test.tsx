import React from 'react';

import { render } from '@testing-library/react';
import { InjectedIntl, IntlProvider } from 'react-intl';

import {
  mockGetRecommendations,
  resetFetchMock,
} from '@atlassian/ptc-test-utils';

import { MemberPicker } from '../../MemberPicker';

describe('MemberPicker', () => {
  const defaultProps = {
    cloudId: 'test-cloud-id',
    teamId: 'team-id',
    intl: ({
      formatMessage: jest.fn((message) => message.id),
    } as unknown) as InjectedIntl,
    hasData: true,
  };

  beforeEach(() => {
    mockGetRecommendations();
  });

  afterEach(resetFetchMock);

  const renderComponent = (overrideContextProps = {}, overrideProps = {}) => {
    return render(
      <IntlProvider locale={'en'}>
        <MemberPicker {...defaultProps} {...overrideProps} />
      </IntlProvider>,
    );
  };

  it('Should render info message', async () => {
    const { getByText } = renderComponent();
    const infoMessage = getByText('You can invite up to 10 people at a time.');
    expect(infoMessage).toBeInTheDocument();
  });

  // FYI, MemberPicker uses @atlaskit/user-picker and @atlaskit/user-picker does not render any text, role or label which
  // react-testing-library can query/find. So it's hard to write more tests for MemberPicker
});
