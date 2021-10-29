import React, { createRef, useCallback, useEffect, useState } from 'react';

// import { ApolloError } from 'apollo-client';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import ReactSelect from 'react-select';

import Select from '@atlaskit/select';
import { InputActionMeta } from '@atlaskit/select/types';
// TODO: FORM-629 Analytics:
// import sendExperienceAnalytics from '@atlassian/jira-common-legacy-do-not-add-anything-new/src/experience-tracking/common/services/send-experience-analytics';

import {
  BaseSelectProps,
  MetaActions,
  SelectOption,
} from '../../../common/types';

import Control from './control';
import DropdownIndicator from './dropdown-indicator';
import Menu from './menu';
import messages from './messages';
import Option from './option';

export const selectComponents = {
  Control,
  DropdownIndicator,
  IndicatorSeparator: null,
  LoadingIndicator: null,
  Menu,
  Option,
};

const onIsOptionDisabled = (option: SelectOption) =>
  'error' in option ? !!option.error : false;

export const BaseSelect = injectIntl(
  ({
    onReload,
    onFilterOption,
    placeholder,
    intl,
    ...restProps
  }: BaseSelectProps & InjectedIntlProps) => {
    const {
      onInputChange: onInputChangeProp,
      inputValue: inputValueProp,
      // options,
      // fieldKey,
      // menuListProps: {
      //   isLoading,
      //   error: { isError, error },
      // },
    } = restProps;

    const selectRef = createRef<ReactSelect>();
    const [inputValue, setInputValue] = useState<string>(inputValueProp || '');

    useEffect(() => {
      const { current } = selectRef;
      if (current) {
        current.select.openMenu('first');
        // Reset focus as it gets lost if key on AsyncSelect is changed
        current.select.focus();
      }
    }, [selectRef]);

    // useEffect(() => {
    //   if (options && !(isLoading ?? false)) {
    //     if (isJqlBuilderReportErrorTypeEnabled()) {
    //       let errorType = 'unknown';
    //       if (error instanceof ApolloError) {
    //         if (error.networkError != null) {
    //           errorType = 'networkError';
    //         } else if (error.graphQLErrors.length > 0) {
    //           errorType = 'graphQLError';
    //         }
    //       }
    //       const errorAttributes = error
    //         ? {
    //             errorType,
    //             message: error.message,
    //           }
    //         : null;
    //
    //       sendExperienceAnalytics({
    //         analyticsSource: 'refinement-bar-select',
    //         wasExperienceSuccessful: error == null,
    //         experience: 'showOptions',
    //         application: null,
    //         edition: null,
    //         additionalAttributes: {
    //           filter: fieldKey ?? 'unknown',
    //           ...errorAttributes,
    //         },
    //       });
    //     } else {
    //       sendExperienceAnalytics({
    //         analyticsSource: 'refinement-bar-select',
    //         wasExperienceSuccessful: !isError,
    //         experience: 'showOptions',
    //         application: null,
    //         edition: null,
    //         additionalAttributes: {
    //           filter: fieldKey ?? 'unknown',
    //         },
    //       });
    //     }
    //   }
    // }, [fieldKey, isError, error, isLoading, options]);

    const onInputChange = useCallback(
      (newValue: string, actionMeta: InputActionMeta) => {
        /**
         * Do not clear the filter input value when an input is selected or blurred.
         * NOTE: We are also returning when 'menu-close' event are triggered,
         * which happens when the input is clicked for some reason, but not when we click outside of the dropdown
         * */
        if (
          [
            MetaActions.setValue,
            MetaActions.inputBlur,
            MetaActions.menuClose,
          ].includes(actionMeta.action) &&
          !newValue.length
        ) {
          return;
        }

        // Reload defaultOptions in case of potential error by changing key on AsyncSelect
        if (actionMeta.action === MetaActions.inputChange && !newValue.length) {
          onReload?.('');
        }

        onInputChangeProp?.(newValue, actionMeta);
        setInputValue(newValue);
      },
      [onInputChangeProp, onReload],
    );

    return (
      <Select
        {...restProps}
        innerRef={selectRef}
        backspaceRemovesValue={false}
        blurInputOnSelect={false}
        closeMenuOnSelect={false}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        isMulti
        inputValue={inputValue}
        menuIsOpen
        menuShouldScrollIntoView={false}
        tabSelectsValue={false}
        noOptionsMessage={() => intl.formatMessage(messages.noOptionsMessage)}
        onInputChange={onInputChange}
        isOptionDisabled={onIsOptionDisabled}
        reload={onReload}
        filterOption={onFilterOption}
        placeholder={
          placeholder ?? <FormattedMessage {...messages.searchPlaceholder} />
        }
      />
    );
  },
);
