import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ProgressStatus from './index';

const wrapInIntl = (children: any) => (
  <IntlProvider locale="en">{children}</IntlProvider>
);

describe('<ProgressStatus />', () => {
  it('should render specific loading message', async () => {
    const { getByText } = render(
      wrapInIntl(
        <ProgressStatus
          isLoading
          label="tasks done"
          loadingLabel="done tasks"
        />,
      ),
    );
    expect(getByText('done tasks')).toBeTruthy();
  });
  it('should render status when data', () => {
    const { getByText } = render(
      wrapInIntl(<ProgressStatus done={10} total={30} label="tasks done" />),
    );
    expect(getByText('33% complete')).toBeTruthy();
    expect(getByText('10 of 30 tasks done')).toBeTruthy();
  });
  it('should render empty if set is empty', () => {
    const { container } = render(
      wrapInIntl(<ProgressStatus done={0} total={0} label="tasks done" />),
    );
    expect(container.innerHTML).toBe('');
  });
});
