import { SearchInput, SearchInputProps } from '@atlassian/search-dialog';
import React, { useCallback } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import {
  // KeyboardShortcut,
  KeyboardShortcutContainer,
} from './product-search-input.styled';

import { TextEnteredHandler, useAnalytics } from '../../common/analytics';
import {
  onAdvancedSearchSelected,
  onPreQueryScreenViewed,
  OnPreQueryScreenViewedProps,
  Trigger,
} from '../../common/analytics/events';
import { useSearchSessionId } from '../../common/search-session-provider';
import { messages } from '../../messages';
import { mergeRefCallback } from '../../utils/merge-ref-callback';

export type InputProps = Omit<SearchInputProps, 'value'> & {
  value: string;
};

interface AdditionalProps {
  collapsedPlaceholder: string;
  debounceTime: number;
  expandedPlaceholder: string;
  forwardRef: React.Ref<HTMLInputElement>;
  isLoading: boolean;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  onOpen: () => any;
  preQueryScreenViewed: (props: OnPreQueryScreenViewedProps) => any;
  searchSessionId: string;
}

export type Props = InputProps & AdditionalProps;

const getTooltipContent = (message: string) => (
  <KeyboardShortcutContainer>
    {message}
    {/* <KeyboardShortcut>{'/'}</KeyboardShortcut> */}
  </KeyboardShortcutContainer>
);

// Visible for testing.
export class BaseProductSearchInput extends React.Component<
  Props & InjectedIntlProps
> {
  private ref: HTMLInputElement | null = null;

  onInput = (value: string) => {
    if (value !== this.props.value) {
      this.expand(Trigger.TEXT_ENTERED);
      this.props.onInput?.(value);
    }
  };

  expand = (trigger: Trigger) => {
    const {
      isExpanded,
      onOpen,
      preQueryScreenViewed,
      searchSessionId,
    } = this.props;
    if (!isExpanded) {
      onOpen();
      preQueryScreenViewed({ searchSessionId, trigger });
    }
  };

  close = (e: React.MouseEvent<HTMLElement>) => {
    const { isExpanded, onBack } = this.props;
    if (isExpanded) {
      onBack?.(e);
    }
  };

  onInputClick = () => {
    setTimeout(() => this.ref?.focus());
    this.expand(Trigger.CLICK);
  };

  onEnter = (event: React.KeyboardEvent<Element>) => {
    const { isExpanded, onEnter } = this.props;

    if (isExpanded) {
      onEnter?.(event);
    }
  };

  onRef = mergeRefCallback(
    this.props.forwardRef,
    (ref: HTMLInputElement | null) => {
      this.ref = ref;
    },
  );

  render() {
    const {
      value,
      isExpanded,
      expandedPlaceholder,
      collapsedPlaceholder,
      debounceTime,
      intl,
      ...rest
    } = this.props;

    const placeholder: string = isExpanded
      ? expandedPlaceholder
      : collapsedPlaceholder;

    const tooltipContent = getTooltipContent(
      intl.formatMessage(messages.common_search_input_collapsed_placeholder),
    );

    return (
      <>
        {isExpanded ? (
          <TextEnteredHandler query={value} debounceTime={debounceTime} />
        ) : null}
        <SearchInput
          {...rest}
          onClick={this.onInputClick}
          onInput={this.onInput}
          ref={this.onRef}
          isExpanded={isExpanded}
          placeholder={placeholder}
          value={value}
          onEnter={this.onEnter}
          tooltipContent={tooltipContent}
        />
      </>
    );
  }
}

export const ProductSearchInputWithIntl = injectIntl(BaseProductSearchInput);

interface AnalyticsAdvancedSearchProps {
  actionSubjectId: string;
  advancedSearchURL: string;
}
export const ProductSearchInput: React.FC<
  Omit<InputProps, 'onEnter'> &
    Omit<AdditionalProps, 'preQueryScreenViewed' | 'searchSessionId'> &
    AnalyticsAdvancedSearchProps
> = (props) => {
  const { actionSubjectId, advancedSearchURL, isLoading, onNavigate } = props;
  const { fireAnalyticsEvent } = useAnalytics();
  const searchSessionId = useSearchSessionId();

  const onEnter = useCallback(
    (event) => {
      fireAnalyticsEvent(
        onAdvancedSearchSelected({
          actionSubjectId,
          isLoading,
          newTab: false,
          trigger: Trigger.SHORTCUT,
        }),
      );
      onNavigate(advancedSearchURL, event);
    },
    [
      actionSubjectId,
      fireAnalyticsEvent,
      isLoading,
      advancedSearchURL,
      onNavigate,
    ],
  );

  const onPreQueryScreenViewedCB = useCallback(
    (preQueryProps: OnPreQueryScreenViewedProps) =>
      fireAnalyticsEvent({
        ...onPreQueryScreenViewed(preQueryProps),
        actionSubject: actionSubjectId,
      }),
    [fireAnalyticsEvent, actionSubjectId],
  );

  return (
    <ProductSearchInputWithIntl
      {...props}
      onEnter={onEnter}
      searchSessionId={searchSessionId}
      preQueryScreenViewed={onPreQueryScreenViewedCB}
    />
  );
};
