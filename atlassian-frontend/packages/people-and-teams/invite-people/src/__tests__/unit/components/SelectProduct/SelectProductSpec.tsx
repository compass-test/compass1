import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import SelectProduct from '../../../../components/SelectProduct/SelectProduct';
import { messages } from '../../../../components/i18n/messages';
import { triggerAnalyticsForRenderProductSelect } from '../../../../components/analytics';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForRenderProductSelect: jest.fn(),
  };
});

describe('SelectProduct', () => {
  const mockOnSelectProduct = jest.fn();
  const mockAnalyticsEvent = jest.fn();
  const mockProductOptions = [
    {
      label: 'Confluence',
      value: 'confluence',
    },
    {
      label: 'Jira Software',
      value: 'jira-software',
    },
    {
      label: 'Jira Core',
      value: 'jira-core',
    },
    {
      label: 'Jira Service Management',
      value: 'jira-servicedesk',
    },
  ];

  const renderSelectProduct = (props?: any) =>
    render(
      <IntlProvider messages={{}} locale="en">
        <SelectProduct
          product="confluence"
          userRole="admin"
          createAnalyticsEvent={mockAnalyticsEvent}
          onSelectProduct={mockOnSelectProduct}
          productOptions={mockProductOptions}
          {...props}
        />
      </IntlProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fire an ui rendered event only once', async () => {
    renderSelectProduct();
    expect(triggerAnalyticsForRenderProductSelect).toHaveBeenCalledTimes(1);
  });

  it('should render product multi select', async () => {
    const { getByTestId } = renderSelectProduct();
    expect(
      getByTestId('testId-invite-people-select-product'),
    ).toBeInTheDocument();
  });

  it('should only have the default product as selected', async () => {
    const { queryByText } = renderSelectProduct({
      defaultProductOptions: [
        {
          label: 'Confluence',
          value: 'confluence',
        },
      ],
    });

    expect(queryByText('Confluence')).toBeInTheDocument();
    expect(queryByText('Jira Software')).not.toBeInTheDocument();
  });

  it('should show the validation message if the form is invalid', async () => {
    const { queryByText } = renderSelectProduct({
      formInvalid: true,
    });

    expect(
      queryByText(messages.noProductSelectedMessage.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should show the Jira core message when JSW is selected', async () => {
    const { queryByText } = renderSelectProduct({
      defaultProductOptions: [
        {
          label: 'Jira Software',
          value: 'jira-software',
        },
      ],
    });

    expect(
      queryByText(messages.jiraCoreMessage.defaultMessage),
    ).toBeInTheDocument();
  });
});
