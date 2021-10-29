import React, {
  Fragment,
  useState,
  useCallback,
  ChangeEvent,
  SyntheticEvent,
  ReactNode,
  useEffect,
} from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/custom-theme-button';
import { isValidEmail } from '@atlaskit/user-picker';

import {
  triggerAnalyticsForClickAddMoreButton,
  triggerAnalyticsForClickCancelButton,
  triggerAnalyticsForClickInviteButton,
  triggerAnalyticsForOpenProductSelectDropdown,
  triggerAnalyticsForInviteComponentViewed,
  qualifiesForViralSettings,
} from '../analytics';

import { messages } from '../i18n';
import {
  InvitePeopleComponentProps,
  ProductSelectOption,
  JiraSubProduct,
  ViralSettingsByDomain,
  FlagExplanation,
  UserRecommendationsCohort,
} from '../../types';

import {
  AddMoreInvitationsButton,
  Form,
  FormDescription,
  FormFooter,
  FormHeader,
  FormHeaderMenu,
  FormTitle,
  FormWrapper,
} from './styled';
import EmailInputField from '../EmailInputField/EmailInputField';
import SelectProductDefault from '../SelectProduct/SelectProduct';
import SelectProductCustomized from '../SelectProduct/SelectProductCustomized';
import InviteeList from '../InviteeList/InviteeList';
import { getProductTitle } from '../../utils';
import ThirdPartyFooter from '../ThirdParty/ThirdPartyFooter';
import ThirdPartyConnect from '../ThirdParty/ThirdPartyConnect';
import SlackWorkspacesDialog from '../ThirdParty/SlackWorkspacesDialog';
import ViralSettings from '../ViralSettings/ViralSettings';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useThirdPartyState } from '../ThirdParty/context';
interface OwnProps
  extends Omit<InvitePeopleComponentProps, 'subProduct' | 'continueUrl'> {
  cloudId?: string;
  inputValues: string[];
  isSendingInvitation: boolean;
  maxNumberOfInputs: number;
  numberOfInputs: number;
  onAddMoreInvitationsButtonClick: (e: SyntheticEvent) => void;
  onCancelButtonClick?: () => void;
  onInviteButtonClick: (products: any) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onInviteeListChange: (emails: string[]) => void;
  sendButtonLabel?: ReactNode;
  onFocusEvent: () => void;
  product: string;
  productId: string;
  userRole: string;
  defaultProductOptions?: ProductSelectOption[];
  subProduct?: JiraSubProduct;
  onOpenInviteChange: (event: ChangeEvent<HTMLInputElement>) => void;
  userRecommendationsCohort?: UserRecommendationsCohort;
  viralSettingsCohort?: 'variation' | 'control' | 'not-enrolled';
  viralOptionsDefaultToCheckedFeatureFlag?: {
    value: boolean;
    explanation?: FlagExplanation;
  };
  uniqueEmailDomains: string[];
  handleProductSelect: () => void;
  selectedProducts: string[];
  isViralSettingsLoading: boolean;
  viralSettingsByDomain: ViralSettingsByDomain;
  showOpenInvite: boolean;
  handleViralSettingsByDomainCheckbox: (
    newState: ViralSettingsByDomain,
  ) => void;
  openInviteEnabled: boolean;
  showViralSettings: boolean;
}

const InvitePeopleComponent: React.FC<OwnProps & InjectedIntlProps> = ({
  addMoreButtonLabel,
  allowAddMoreFields,
  cancelButtonLabel,
  cloudId = '',
  hideCancelButton,
  formTitle,
  formDescription,
  inputValues,
  isSendingInvitation,
  maxNumberOfInputs,
  numberOfInputs,
  onAddMoreInvitationsButtonClick,
  onCancelButtonClick,
  onInviteButtonClick,
  onInputChange,
  product,
  productId,
  sendButtonLabel: customSendButtonLabel,
  alignButtons,
  userRole,
  enableCustomizedProductSelect,
  subProduct,
  productOptions,
  defaultProductOptions,
  selectedProducts,
  enableInviteeList,
  onInviteeListChange,
  userRecommendationsCohort,
  viralSettingsCohort,
  viralOptionsDefaultToCheckedFeatureFlag,
  source,
  onOpenInviteChange,
  uniqueEmailDomains,
  handleProductSelect,
  isViralSettingsLoading,
  viralSettingsByDomain,
  showOpenInvite,
  handleViralSettingsByDomainCheckbox,
  openInviteEnabled,
  showViralSettings,
  onFocusEvent,
}) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [showEmptyError, setShowEmptyError] = useState(false);

  useEffect(() => {
    triggerAnalyticsForInviteComponentViewed(
      userRole,
      source,
      product,
      viralSettingsCohort,
      createAnalyticsEvent,
      viralOptionsDefaultToCheckedFeatureFlag,
    );
  }, [
    userRole,
    createAnalyticsEvent,
    source,
    product,
    viralSettingsCohort,
    viralOptionsDefaultToCheckedFeatureFlag,
  ]);

  const isBasicUser = userRole === 'basic';

  const shouldRenderProductSelect =
    productOptions &&
    productOptions.length > 1 &&
    // show for trusted|admin users
    (!isBasicUser ||
      // OR if Product is Jira and there's no subproduct explicitly passed in
      (productId === 'jira' && !subProduct) ||
      // OR if Product is 'platform', which indicates that the caller doesn't
      // know what product subscriptions are available.
      productId === 'platform');

  const canSubmit = () => {
    const isEmptyArray = !inputValues.filter((item) => item.length).length;
    const isEmptyProducts =
      shouldRenderProductSelect && selectedProducts.length === 0;

    if (isEmptyArray || isEmptyProducts) {
      setShowEmptyError(true);
      return false;
    }

    // We also want to cap the number of emails allowed to maxNumberOfInputs
    if (inputValues.filter((item) => item.length).length > maxNumberOfInputs) {
      return false;
    }

    //If the input from the user is all valid emails
    //or a mix of empty fields and valid emails
    //then send button will be enable
    return inputValues
      .filter((item) => item.length)
      .every((item) => isValidEmail(item) === 'VALID');
  };

  const getProductForTitle = useCallback(() => {
    if (subProduct) {
      return getProductTitle(subProduct);
    } else if (productOptions?.length === 1) {
      return productOptions[0].label;
    } else if (product !== 'Jira') {
      return product;
    }
    return null;
  }, [subProduct, productOptions, product]);

  const handleSendButtonClick = () => {
    let formError;
    if (!canSubmit()) {
      if (selectedProducts.length === 0) {
        formError = messages.noProductSelectedMessage.defaultMessage;
      } else {
        formError = inputValues.filter((val) => val.length).length
          ? messages.invalidEmailMessage.defaultMessage
          : messages.emptyEmailMessage.defaultMessage;
      }
    } else {
      formError = undefined;
    }
    triggerAnalyticsForClickInviteButton(createAnalyticsEvent, {
      product: productId,
      numberOfEmails: getValidEmails().length,
      numberOfUniqueEmails: [...new Set(getValidEmails())].length,
      formError,
      invitedProducts: selectedProducts,
      source,
    });

    if (canSubmit()) {
      onInviteButtonClick(selectedProducts);
    }
  };

  const handleCancelButtonClick = () => {
    triggerAnalyticsForClickCancelButton(
      createAnalyticsEvent,
      productId,
      source,
    );

    if (onCancelButtonClick) {
      onCancelButtonClick();
    }
  };

  const getValidEmails = React.useCallback(() => {
    return inputValues.filter((val) => isValidEmail(val) === 'VALID');
  }, [inputValues]);

  const handleAddMoreInvitationsButtonClick = (e: SyntheticEvent) => {
    triggerAnalyticsForClickAddMoreButton(
      createAnalyticsEvent,
      productId,
      source,
    );
    onAddMoreInvitationsButtonClick(e);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (showEmptyError) {
      setShowEmptyError(e.target.value.length > 0 ? false : true);
    }
    onInputChange(e, i);
  };

  const handleProductSelectMenuOpen = () => {
    triggerAnalyticsForOpenProductSelectDropdown(
      {
        productOptions: productOptions?.map((product) => product.value),
        selectedProducts,
        userRole,
        source,
      },
      createAnalyticsEvent,
    );
  };

  const SelectProduct = enableCustomizedProductSelect
    ? SelectProductCustomized
    : SelectProductDefault;

  const {
    isOk: enableThirdPartyInvites,
    enabledIntegrations: enabledThirdPartyIntegrations,
    integrations: thirdPartyIntegrations,
  } = useThirdPartyState();

  return (
    <div data-testid="testId-invite-people-form">
      <FormWrapper>
        {enableThirdPartyInvites && (
          <>
            <SlackWorkspacesDialog productId={productId} />
          </>
        )}
        <FormHeader>
          <FormTitle>
            {formTitle ? (
              formTitle
            ) : isBasicUser ? (
              !shouldRenderProductSelect && Boolean(getProductForTitle()) ? (
                <FormattedMessage
                  {...messages.usersFormTitleProduct}
                  values={{ product: getProductForTitle() }}
                />
              ) : (
                <FormattedMessage {...messages.usersFormTitle} />
              )
            ) : !shouldRenderProductSelect && Boolean(getProductForTitle()) ? (
              <FormattedMessage
                {...messages.formTitleProduct}
                values={{ product: getProductForTitle() }}
              />
            ) : (
              <FormattedMessage {...messages.formTitle} />
            )}
          </FormTitle>
          {qualifiesForViralSettings(viralSettingsCohort, userRole) && (
            <FormHeaderMenu>
              <DropdownMenu cloudId={cloudId} />
            </FormHeaderMenu>
          )}
        </FormHeader>
        <FormDescription>
          {formDescription ? (
            formDescription
          ) : isBasicUser ? (
            <FormattedMessage {...messages.formDescription} />
          ) : undefined}
        </FormDescription>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
          }}
        >
          {shouldRenderProductSelect && enableThirdPartyInvites ? (
            <SelectProduct
              productOptions={productOptions}
              onSelectProduct={handleProductSelect}
              onMenuOpen={handleProductSelectMenuOpen}
              defaultProductOptions={defaultProductOptions}
              formInvalid={showEmptyError}
              product={product}
              userRole={userRole}
              source={source}
            />
          ) : null}
          {enableThirdPartyInvites &&
            thirdPartyIntegrations &&
            thirdPartyIntegrations.length === 0 && <ThirdPartyConnect />}
          {enableInviteeList || enableThirdPartyInvites ? (
            <InviteeList
              maxEmails={maxNumberOfInputs}
              onInviteeListChange={onInviteeListChange}
              showEmptyError={showEmptyError}
              onFocusEvent={onFocusEvent}
              onManagePage={onCancelButtonClick}
            />
          ) : null}
          {shouldRenderProductSelect && !enableThirdPartyInvites ? (
            <SelectProduct
              productOptions={productOptions}
              onSelectProduct={handleProductSelect}
              onMenuOpen={handleProductSelectMenuOpen}
              defaultProductOptions={defaultProductOptions}
              formInvalid={showEmptyError}
              product={product}
              userRole={userRole}
              source={source}
            />
          ) : null}
          {!enableInviteeList && !enableThirdPartyInvites
            ? inputValues.map((value: string, index: number) => {
                const isFirstFieldRequired =
                  showEmptyError && value.length === 0 && index === 0;
                return (
                  <EmailInputField
                    key={index}
                    index={index}
                    onInputChange={handleOnChange}
                    errorMessage={
                      isFirstFieldRequired
                        ? messages.emptyEmailMessage
                        : messages.invalidEmailMessage
                    }
                    isInvalid={
                      isFirstFieldRequired ||
                      (Boolean(value) && isValidEmail(value) !== 'VALID')
                    }
                    value={value}
                  />
                );
              })
            : null}
          {!enableInviteeList &&
            !enableThirdPartyInvites &&
            allowAddMoreFields &&
            numberOfInputs < maxNumberOfInputs && (
              <AddMoreInvitationsButton
                appearance="link"
                onClick={handleAddMoreInvitationsButtonClick}
              >
                {addMoreButtonLabel ? (
                  addMoreButtonLabel
                ) : (
                  <Fragment>
                    <FormattedMessage {...messages.addMoreButton} />
                  </Fragment>
                )}
              </AddMoreInvitationsButton>
            )}
          {showViralSettings && (
            <ViralSettings
              isLoading={isViralSettingsLoading}
              viralSettingsByDomain={viralSettingsByDomain}
              showOpenInvite={showOpenInvite}
              product={selectedProducts[0]}
              domains={uniqueEmailDomains}
              cloudId={cloudId}
              onOpenInviteChange={onOpenInviteChange}
              handleViralSettingsByDomainCheckbox={
                handleViralSettingsByDomainCheckbox
              }
              openInviteEnabled={openInviteEnabled}
            />
          )}
        </Form>
        <FormFooter align={alignButtons}>
          <Button
            appearance="primary"
            form="invitePeopleForm"
            isLoading={isSendingInvitation}
            onClick={handleSendButtonClick}
            type="submit"
          >
            {customSendButtonLabel ? (
              customSendButtonLabel
            ) : isBasicUser ? (
              <FormattedMessage {...messages.usersSendInviteButton} />
            ) : (
              <FormattedMessage {...messages.sendInviteButton} />
            )}
          </Button>
          {!hideCancelButton && (
            <Button
              appearance="subtle"
              isDisabled={isSendingInvitation}
              onClick={handleCancelButtonClick}
            >
              {cancelButtonLabel ? (
                cancelButtonLabel
              ) : (
                <FormattedMessage {...messages.cancelButton} />
              )}
            </Button>
          )}
        </FormFooter>
      </FormWrapper>
      {enableThirdPartyInvites &&
        thirdPartyIntegrations &&
        thirdPartyIntegrations.length > 0 &&
        thirdPartyIntegrations.filter((i) =>
          enabledThirdPartyIntegrations.includes(i),
        ).length < enabledThirdPartyIntegrations.length && <ThirdPartyFooter />}
    </div>
  );
};

export default injectIntl(InvitePeopleComponent);
