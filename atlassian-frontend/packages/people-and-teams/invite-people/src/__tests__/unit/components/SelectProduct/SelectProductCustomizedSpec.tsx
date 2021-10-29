import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from 'react-intl';

import SelectProduct, {
  filterProductOptions,
  removeJiraCoreIfImplied,
} from '../../../../components/SelectProduct/SelectProductCustomized';
import { messages } from '../../../../components/i18n/messages';
import { triggerAnalyticsForRenderProductSelect } from '../../../../components/analytics';
import { ProductSelectOption } from '../../../../types';

jest.mock('../../../../components/analytics', () => {
  return {
    ...jest.requireActual<Object>('../../../../components/analytics'),
    triggerAnalyticsForRenderProductSelect: jest.fn(),
  };
});

const productOptions = [
  {
    label: 'Confluence',
    value: 'confluence',
  },
  {
    label: 'Jira Software',
    value: 'jira-software',
  },
  {
    label: 'Jira Work Management',
    value: 'jira-core',
  },
  {
    label: 'Jira Service Management',
    value: 'jira-servicedesk',
  },
];

const openMenu = (input: HTMLElement) => {
  fireEvent.focus(input);
  fireEvent.keyDown(input, {
    key: 'ArrowDown',
    keyCode: 40,
    code: 40,
  });
};

const selectProductsLabel = messages.selectProducts.defaultMessage;

describe('Customized SelectProduct', () => {
  const mockOnSelectProduct = jest.fn();
  const mockProductOptions = productOptions;

  const renderSelectProduct = (props?: any) =>
    render(
      <IntlProvider messages={{}} locale="en">
        <SelectProduct
          onSelectProduct={mockOnSelectProduct}
          productOptions={mockProductOptions}
          {...props}
        />
      </IntlProvider>,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fire a ui rendered event only once', async () => {
    renderSelectProduct();
    expect(triggerAnalyticsForRenderProductSelect).toHaveBeenCalledTimes(1);
  });

  it('should render customized product select', async () => {
    const { getByTestId } = renderSelectProduct();
    expect(
      getByTestId('test-id-invite-people-select-product-customized'),
    ).toBeInTheDocument();
  });

  it('should open the menu successfully and display the product options', async () => {
    const { getByLabelText, getByTestId } = renderSelectProduct();

    openMenu(getByLabelText(selectProductsLabel));

    const selectMenu = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__menu');

    expect(selectMenu).toHaveTextContent(/Confluence/);
    expect(selectMenu).toHaveTextContent(/Jira Software/);
    expect(selectMenu).toHaveTextContent(/Jira Service Management/);
    expect(selectMenu).toHaveTextContent(/Jira Work Management/);
  });

  it('should select confluence', async () => {
    const { getByLabelText, getByTestId } = renderSelectProduct();
    const control = getByLabelText(selectProductsLabel);

    expect(control).not.toHaveTextContent(/Confluence/);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-confluence'));

    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    expect(selectedProducts).toHaveTextContent(/Confluence/);
    expect(selectedProducts).not.toHaveTextContent(/Jira Software/);
  });

  it('should show the validation message if the form is empty', async () => {
    const { queryByText } = renderSelectProduct({
      formInvalid: true,
    });

    expect(
      queryByText(messages.noProductSelectedMessage.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should select and deselect confluence and show the validation message that the form is empty', async () => {
    const { getByLabelText, getByTestId, queryByText } = renderSelectProduct();
    const control = getByLabelText(selectProductsLabel);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-confluence'));

    // HACK - These tests require menu to be re-opened to set state every time this is selected/delected.
    // Unsure on exactly why but will fail without this line
    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-confluence'));

    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    expect(selectedProducts).not.toHaveTextContent(/Confluence/);
    expect(
      queryByText(messages.noProductSelectedMessage.defaultMessage),
    ).toBeInTheDocument();
  });

  it('should implicitly select jira core (JWM) when jira software is selected', async () => {
    const { getByLabelText, getByTestId } = renderSelectProduct();
    const control = getByLabelText(selectProductsLabel);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-software'));

    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    expect(selectedProducts).toHaveTextContent(/Jira Software/);
    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);
  });

  it('should show info icon, implicitly select and disable jira core (JWM) when jira software is selected', async () => {
    const {
      getByLabelText,
      queryByLabelText,
      getByTestId,
    } = renderSelectProduct();

    const control = getByLabelText(selectProductsLabel);

    openMenu(control);
    expect(queryByLabelText('EditorPanelIcon')).not.toBeInTheDocument();
    fireEvent.click(getByTestId('test-id-option-jira-software'));

    openMenu(control);
    expect(queryByLabelText('EditorPanelIcon')).toBeInTheDocument();
    fireEvent.click(getByTestId('test-id-option-jira-core'));

    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    expect(selectedProducts).toHaveTextContent(/Jira Software/);
    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);
  });

  it('should select JWM implicitly when JSM is selected. When JSM is deselected, JWM should be too', async () => {
    const { getByLabelText, getByTestId } = renderSelectProduct();

    const control = getByLabelText(selectProductsLabel);
    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-servicedesk'));

    expect(selectedProducts).toHaveTextContent(/Jira Service Management/);
    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-servicedesk'));

    expect(selectedProducts).not.toHaveTextContent(/Jira Service Management/);
    expect(selectedProducts).not.toHaveTextContent(/Jira Work Management/);
  });

  it('should select JWM then select JSM. When JSM is deselected, JWM remain selected as it was actively selected', async () => {
    const { getByLabelText, getByTestId } = renderSelectProduct();

    const control = getByLabelText(selectProductsLabel);
    const selectedProducts = getByTestId(
      'test-id-invite-people-select-product-customized',
    ).querySelector('.select__control');

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-core'));

    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);
    expect(selectedProducts).not.toHaveTextContent(/Jira Service Management/);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-servicedesk'));
    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);
    expect(selectedProducts).toHaveTextContent(/Jira Service Management/);

    openMenu(control);
    fireEvent.click(getByTestId('test-id-option-jira-servicedesk'));

    expect(selectedProducts).toHaveTextContent(/Jira Work Management/);
    expect(selectedProducts).not.toHaveTextContent(/Jira Service Management/);
  });
});

const createOptions = (...values: string[]) =>
  values.map((value) => ({ value } as ProductSelectOption));

describe('removeJiraCoreIfImplied()', () => {
  describe('should not remove any options if jira core is not in the list', () => {
    it('when list is empty', () => {
      const actual = removeJiraCoreIfImplied([]);
      expect(actual).toHaveLength(0);
    });

    it('when list does not have jira products', () => {
      const products = createOptions('confluence');
      const actual = removeJiraCoreIfImplied(products);
      expect(actual).toHaveLength(1);
    });

    it('when list does have jira products', () => {
      const products = createOptions('confluence', 'jira-software');
      const actual = removeJiraCoreIfImplied(products);
      expect(actual).toHaveLength(2);
    });
  });

  it('should not remove jira core when no other jira products are present', () => {
    const products = createOptions('confluence', 'jira-core');
    const actual = removeJiraCoreIfImplied(products);
    expect(actual).toHaveLength(2);
  });

  describe('should remove jira core when', () => {
    it('when jira-software is in the list', () => {
      const products = createOptions(
        'jira-software',
        'jira-core',
        'confluence',
      );
      const actual = removeJiraCoreIfImplied(products);
      expect(actual).not.toContainEqual({ value: 'jira-core' });
      expect(actual).toHaveLength(2);
    });

    it('when jira-servicedesk is in the list', () => {
      const products = createOptions('jira-servicedesk', 'jira-core');
      const actual = removeJiraCoreIfImplied(products);
      expect(actual).not.toContainEqual({ value: 'jira-core' });
      expect(actual).toHaveLength(1);
    });
  });
});

describe('filterProductOptions()', () => {
  it('should return an empty array when there are no options passed in', () => {
    const actual = filterProductOptions();
    expect(actual).toHaveLength(0);
  });
  it('should not remove jira core when enableCustomizedProductSelect is true', () => {
    const products = createOptions('jira-software', 'jira-core', 'confluence');
    const actual = filterProductOptions(products, true);
    expect(actual).toContainEqual({ value: 'jira-core' });
    expect(actual).toHaveLength(3);
  });
  it('should remove jira core when enableCustomizedProductSelect is true', () => {
    const products = createOptions('jira-software', 'jira-core', 'confluence');
    const actual = filterProductOptions(products, false);
    expect(actual).not.toContainEqual({ value: 'jira-core' });
    expect(actual).toHaveLength(2);
  });
});
