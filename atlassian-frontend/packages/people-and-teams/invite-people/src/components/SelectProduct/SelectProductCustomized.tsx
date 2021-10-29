import React, { ReactElement, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ErrorMessage } from '@atlaskit/form';
import Select, {
  OptionType,
  FormatOptionLabelMeta,
  components,
  MenuListComponentProps,
  CheckboxOption,
  ValueType,
  ActionMeta,
} from '@atlaskit/select';
import { OptionsType, SelectComponentsConfig } from '@atlaskit/select/types';
import Button from '@atlaskit/button';
import EditorPanelIcon from '@atlaskit/icon/glyph/editor/panel';
import { B200, B400, N0, N200, N300, N600, N900 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import { messages } from '../i18n';
import { ProductSelectWrapper, Label } from '../InvitePeople/styled';
import { getProductIcon } from '../../utils';
import { ProductSelectOption } from '../../types';
import {
  OptionWrapper,
  IconWrapper,
  LabelWrapper,
  SelectAllWrapper,
  ProductsWrapper,
  ProductCounterWrapper,
  MAX_VISIBLE_PRODUCTS,
} from './styled';
import {
  triggerAnalyticsForRenderProductSelect,
  triggerAnalyticsForSelectAll,
} from '../analytics';
export interface OwnProps {
  onMenuOpen: () => void;
  onSelectProduct: Function;
  productOptions?: ProductSelectOption[];
  defaultProductOptions?: OptionType[];
  formInvalid?: boolean;
  product: string;
  userRole: string;
  source?: string;
}

const isJiraCore = (product: ProductSelectOption | OptionType | undefined) =>
  product && product.value === 'jira-core';

const isNotJiraCore = (product: ProductSelectOption | OptionType | undefined) =>
  product && product.value !== 'jira-core';

const isAnyJira = (product: ProductSelectOption | OptionType | undefined) =>
  product && String(product.value).startsWith('jira');

const isNonCoreJira = (product: ProductSelectOption | OptionType | undefined) =>
  isAnyJira(product) && isNotJiraCore(product);

const hasNonCoreJira = (
  products: ReadonlyArray<ProductSelectOption | OptionType> | null | undefined,
) => products?.some(isNonCoreJira) || false;

export const removeJiraCoreIfImplied = (
  selectedProducts: ProductSelectOption[],
) =>
  hasNonCoreJira(selectedProducts)
    ? selectedProducts.filter(isNotJiraCore)
    : selectedProducts;

// Filter available product options based on whether or not we are rendering a customised product select
export const filterProductOptions = (
  products?: ProductSelectOption[],
  enableCustomizedProductSelect?: boolean,
) => {
  if (!products) {
    return [];
  }

  // This condition is inverted compared to its use to determine what products to send to the invite API
  // as the customised product select expects Jira Core to remain if implied, as it can display it correctly,
  // and then is removed with the inverse of this condition before being sent to the invite API. Whereas
  // the regular product select expects the implied product will be removed here and so does not try to
  // remove it before sending.
  return !enableCustomizedProductSelect
    ? removeJiraCoreIfImplied(products)
    : products;
};

const customOptionLabel = (
  option: OptionType,
  {
    context,
    inputValue,
    selectValue,
  }: FormatOptionLabelMeta<OptionType | ProductSelectOption, true>,
) => {
  const LabelIcon = getProductIcon(option.value as string);

  if (context === 'menu') {
    const isImpliedJiraCore =
      isJiraCore(option) &&
      hasNonCoreJira(selectValue as ProductSelectOption[]);

    return (
      <Tooltip
        content={
          isImpliedJiraCore ? (
            <FormattedMessage
              {...messages.optionIncludedWithOtherJiraProducts}
            />
          ) : undefined
        }
        position={'right'}
      >
        <OptionWrapper data-testid={`test-id-option-${option.value}`}>
          <IconWrapper>
            <LabelIcon
              size="small"
              iconGradientStart={B400}
              iconGradientStop={B200}
              iconColor={B200}
            />
          </IconWrapper>
          <LabelWrapper>{option.label}</LabelWrapper>
          {isImpliedJiraCore && (
            <EditorPanelIcon label={'EditorPanelIcon'} primaryColor={N200} />
          )}
        </OptionWrapper>
      </Tooltip>
    );
  }
  return option.label;
};

const ProductSelect: React.FC<OwnProps> = ({
  onSelectProduct,
  onMenuOpen,
  defaultProductOptions,
  productOptions,
  formInvalid,
  product,
  userRole,
  source,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [selectedProducts, setSelectedProducts] = React.useState(
    defaultProductOptions,
  );
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Was Jira Core actively selected or implied when selecting other Jira products?
  const [
    isJiraCoreActivelySelected,
    setIsJiraCoreActivelySelected,
  ] = React.useState(true);

  useEffect(() => {
    triggerAnalyticsForRenderProductSelect(
      {
        productOptions,
        source,
        userRole,
      },
      createAnalyticsEvent,
      'customizedProductSelect',
    );
  }, [createAnalyticsEvent, productOptions, source, userRole]);

  useEffect(() => {
    if (formInvalid && (!selectedProducts || !selectedProducts.length)) {
      setIsInvalid(formInvalid);
    }
  }, [formInvalid, selectedProducts]);

  const isOptionDisabled = (
    option: OptionType,
    selectedOptions: OptionsType<OptionType>,
  ) => {
    return option.value === 'jira-core' && hasNonCoreJira(selectedOptions);
  };

  const isOptionSelected = (
    option: OptionType,
    selectedOptions: OptionsType<OptionType>,
  ) => {
    return option.value === 'jira-core' && hasNonCoreJira(selectedOptions);
  };

  const handleOnChangeProduct = React.useCallback(
    (values: ValueType<OptionType, true>, action: ActionMeta<OptionType>) => {
      if (!values) {
        return;
      }

      let selectedOptions: OptionType[] = [...values];
      const jiraCore = productOptions?.find(isJiraCore);
      const isJiraCoreImplied = hasNonCoreJira(selectedOptions);
      const jiraCoreSelected = selectedOptions.find(isJiraCore);

      // Jira Core is actively selected
      if (action.action === 'select-option' && isJiraCore(action.option)) {
        setIsJiraCoreActivelySelected(true);
      }

      // If Jira Core is implied and not previously selected,
      // add Jira Core to selected list
      if (jiraCore && isJiraCoreImplied && !jiraCoreSelected) {
        setIsJiraCoreActivelySelected(false);
        selectedOptions.push(jiraCore);
      }

      // If non Jira Core, Jira Product is deselected,
      // Jira Core is no longer implied and was not actively selected
      // remove Jira Core from selected list
      if (
        action.action === 'deselect-option' &&
        isNonCoreJira(action.option) &&
        !isJiraCoreImplied &&
        !isJiraCoreActivelySelected &&
        jiraCoreSelected
      ) {
        const jiraCoreIndex = selectedOptions.findIndex(isJiraCore);
        selectedOptions.splice(jiraCoreIndex, 1);
      }

      setSelectedProducts(selectedOptions);
      onSelectProduct(selectedOptions);
      setIsInvalid(!(selectedOptions && selectedOptions.length));
    },
    [productOptions, onSelectProduct, isJiraCoreActivelySelected],
  );

  const customMenuListFactory = ({
    onSelectAll = (_allProducts: OptionType[]) => {},
  }): React.FC<MenuListComponentProps<OptionType, true>> => (props) => {
    const onClickSelectAll = () => {
      setIsJiraCoreActivelySelected(true);

      let allOptions = new Set(
        Array.isArray(props.selectProps.value) ? props.selectProps.value : [],
      );

      for (const option of props.options) {
        allOptions.add(option);
      }

      props.setValue([...allOptions], 'select-option');
      onSelectAll([...allOptions]);
    };

    return (
      <components.MenuList {...props}>
        <SelectAllWrapper>
          <Button
            onMouseDown={onClickSelectAll}
            appearance="link"
            spacing="none"
            style={{ fontWeight: 'normal' }}
          >
            <FormattedMessage {...messages.selectAllOption} />
          </Button>
        </SelectAllWrapper>
        {props.children}
      </components.MenuList>
    );
  };

  const handleMenuOpen = React.useCallback(() => {
    setIsOpen(true);
    if (onMenuOpen) {
      onMenuOpen();
    }
  }, [onMenuOpen]);

  const handleMenuClose = () => setIsOpen(false);

  const customComponents = React.useMemo<
    SelectComponentsConfig<OptionType | ProductSelectOption, true>
  >(
    () => ({
      MenuList: customMenuListFactory({
        onSelectAll: (selectedProducts) => {
          triggerAnalyticsForSelectAll(
            createAnalyticsEvent,
            product.toLowerCase(),
            selectedProducts.map((p) => String(p.value)),
            userRole,
            source,
          );
          setIsOpen(false);
        },
      }),

      MultiValue: (props) => {
        const selectValue = props.selectProps.value || [];

        // `index` *is* passed by react-select, despite not being in MultiValueProps
        const { data, index } = props as typeof props & { index: number };

        const isLast = index === selectValue.length - 1;

        let suffix = ', ';
        if (isLast) {
          suffix = '';
        } else if (index >= 1) {
          suffix = ', ...';
        }

        return (
          <span>
            {data.label}
            {suffix}
          </span>
        );
      },

      Option: (props) => {
        return <CheckboxOption {...props} />;
      },

      ValueContainer: ({ children, ...props }) => {
        const selectedOptions = (children as [ReactElement[], ReactElement])[0];
        return (
          <components.ValueContainer {...props}>
            <ProductsWrapper>{children}</ProductsWrapper>
            <ProductCounterWrapper>
              {props.hasValue &&
                selectedOptions.length > MAX_VISIBLE_PRODUCTS &&
                `(+${selectedOptions.length - MAX_VISIBLE_PRODUCTS})`}
            </ProductCounterWrapper>
          </components.ValueContainer>
        );
      },
    }),
    [createAnalyticsEvent, product, source, userRole],
  );

  const customStyles = {
    // main area
    control: (provided: any, state: any) => ({
      ...provided,
      background: state.selectProps.menuIsOpen ? N600 : N0,
      height: '48px',
      paddingLeft: '12px',
      border: 'none',
      boxShadow:
        '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31)',
      borderRadius: '3px',
      ':hover': 'none',
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? N0 : N900,
      display: 'flex',
      flexWrap: 'nowrap',
      minWidth: 0,
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? N0 : N300,
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.selectProps.menuIsOpen ? N0 : N900,
      ':hover': 'none',
    }),
  };

  return (
    <ProductSelectWrapper data-testid="test-id-invite-people-select-product-customized">
      <Label htmlFor="product-select">
        <FormattedMessage {...messages.selectProducts} />
      </Label>
      {
        // We have to use ordinary Select because CheckboxSelect
        // does not allow to override the Option component
      }
      <Select<OptionType, true>
        isMulti
        styles={customStyles}
        isClearable={false}
        enableAnimation={false}
        isSearchable={false}
        name="product-select"
        inputId="product-select"
        placeholder={<FormattedMessage {...messages.selectPlaceholder} />}
        className="checkbox-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        components={customComponents}
        hideSelectedOptions={false}
        options={productOptions}
        value={selectedProducts}
        formatOptionLabel={customOptionLabel}
        onChange={handleOnChangeProduct}
        isOptionDisabled={isOptionDisabled}
        isOptionSelected={isOptionSelected}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        menuIsOpen={isOpen}
        validationState={isInvalid ? 'error' : 'default'}
      />
      {isInvalid ? (
        <ErrorMessage>
          <FormattedMessage {...messages.noProductSelectedMessage} />
        </ErrorMessage>
      ) : null}
    </ProductSelectWrapper>
  );
};

export default ProductSelect;
