import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { ErrorMessage } from '@atlaskit/form';
import {
  CheckboxSelect,
  OptionType,
  FormatOptionLabelMeta,
  components,
  MenuListComponentProps,
} from '@atlaskit/select';
import Button from '@atlaskit/button';
import { B200, B400 } from '@atlaskit/theme/colors';

import { messages } from '../i18n';
import { ProductSelectWrapper, Label, Warning } from '../InvitePeople/styled';
import { getProductIcon } from '../../utils';
import { ProductSelectOption } from '../../types';
import {
  OptionWrapper,
  IconWrapper,
  LabelWrapper,
  SelectAllWrapper,
} from './styled';
import {
  triggerAnalyticsForRenderProductSelect,
  triggerAnalyticsForSelectAll,
} from '../analytics';

export interface OwnProps {
  onMenuOpen: () => void;
  onSelectProduct: Function;
  productOptions?: ProductSelectOption[];
  defaultProductOptions?: ProductSelectOption[];
  formInvalid?: boolean;
  product: string;
  userRole: string;
  source?: string;
}

const customMenuListFactory = ({
  onSelectAll = (_allProducts: OptionType[]) => {},
}): React.FC<MenuListComponentProps<OptionType, true>> => (props) => {
  const onClickSelectAll = () => {
    props.setValue(props.options, 'select-option');
    onSelectAll(props.options as OptionType[]);
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

const isJiraCore = (product: ProductSelectOption | OptionType) =>
  product.value === 'jira-core';

const isAnyJira = (product: ProductSelectOption | OptionType) =>
  String(product.value).startsWith('jira');

const hasNonCoreJira = (
  products: ReadonlyArray<ProductSelectOption | OptionType> | null | undefined,
) =>
  products?.some((product) => isAnyJira(product) && !isJiraCore(product)) ||
  false;

const customOptionLabel = (
  option: OptionType,
  { context }: FormatOptionLabelMeta<OptionType, true>,
) => {
  const LabelIcon = getProductIcon(option.value as string);

  if (context === 'menu') {
    return (
      <OptionWrapper>
        <IconWrapper>
          <LabelIcon
            size="small"
            iconGradientStart={B400}
            iconGradientStop={B200}
            iconColor={B200}
          />
        </IconWrapper>
        <LabelWrapper>{option.label}</LabelWrapper>
      </OptionWrapper>
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

  React.useEffect(() => {
    triggerAnalyticsForRenderProductSelect(
      {
        productOptions,
        source,
        userRole,
      },
      createAnalyticsEvent,
    );
  }, [createAnalyticsEvent, productOptions, source, userRole]);

  React.useEffect(() => {
    if (formInvalid && (!selectedProducts || !selectedProducts.length)) {
      setIsInvalid(formInvalid);
    }
  }, [formInvalid, selectedProducts]);

  const handleOnChangeProduct = React.useCallback(
    (e?: any) => {
      setSelectedProducts(e);
      onSelectProduct(e);
      setIsInvalid(!(e && e.length));
    },
    [onSelectProduct],
  );

  const handleMenuOpen = React.useCallback(() => {
    setIsOpen(true);
    if (onMenuOpen) {
      onMenuOpen();
    }
  }, [onMenuOpen]);

  const handleMenuClose = () => setIsOpen(false);

  const components = React.useMemo(
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
    }),
    [createAnalyticsEvent, product, source, userRole],
  );

  return (
    <ProductSelectWrapper data-testid="testId-invite-people-select-product">
      <Label htmlFor="product-select">
        <FormattedMessage {...messages.selectProducts} />
      </Label>
      <CheckboxSelect
        name="product-select"
        placeholder={<FormattedMessage {...messages.selectPlaceholder} />}
        className="checkbox-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        components={components}
        hideSelectedOptions={false}
        options={productOptions}
        defaultValue={defaultProductOptions}
        formatOptionLabel={customOptionLabel}
        onChange={handleOnChangeProduct}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        menuIsOpen={isOpen}
        validationState={isInvalid ? 'error' : 'default'}
      />
      {hasNonCoreJira(selectedProducts) ? (
        <Warning>
          <FormattedMessage {...messages.jiraCoreMessage} />
        </Warning>
      ) : null}
      {isInvalid ? (
        <ErrorMessage>
          <FormattedMessage {...messages.noProductSelectedMessage} />
        </ErrorMessage>
      ) : null}
    </ProductSelectWrapper>
  );
};

export default ProductSelect;
