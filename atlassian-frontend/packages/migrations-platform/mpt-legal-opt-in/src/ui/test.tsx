import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import LegalOptInModal from './index';

describe('LegalOptInModal', () => {
  it('should display modal with custom text', async () => {
    const { getByText } = render(
      <IntlProvider locale="en">
        <LegalOptInModal
          onAgree={jest.fn()}
          onClose={jest.fn()}
          customText="FAKE CUSTOM TEXT"
        />
      </IntlProvider>,
    );
    expect(getByText(/fake custom text/i)).toBeInTheDocument();
  });
});
