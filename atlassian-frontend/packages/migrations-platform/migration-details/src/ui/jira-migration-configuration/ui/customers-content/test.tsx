import React from 'react';

import { render } from '@testing-library/react';

import { CustomersAll, CustomersReferenced, NoCustomers } from './examples';
import messages from './messages';

describe('<CustomersContent />', () => {
  it('should show correct message for all customers', () => {
    const { getByText } = render(<CustomersAll />);

    expect(
      getByText(messages.allCustomersSelectionTitle.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct message for referenced customers', () => {
    const { getByText } = render(<CustomersReferenced />);

    expect(
      getByText(
        messages.referencedProjectCustomersSelectionTitle.defaultMessage!,
      ),
    ).toBeInTheDocument();
  });

  it('should show correct message for no customers', () => {
    const { getByText } = render(<NoCustomers />);

    expect(getByText('0 customers')).toBeInTheDocument();
  });
});
