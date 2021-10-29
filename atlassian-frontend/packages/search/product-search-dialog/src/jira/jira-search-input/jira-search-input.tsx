import React, { FunctionComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import {
  ProductSearchInput,
  BaseInputProps,
} from '../../common/product-search-input';
import { messages } from '../../messages';
import { AdvancedSearchLinkSubjectId } from '../../common/analytics/events';
import { useFiltersAdvancedSearchUrlFactory } from '../jira-advanced-search-url-factory';

interface AdditionalProps {
  debounceTime: number;
  forwardRef: React.Ref<HTMLInputElement>;
  isLoading: boolean; // TODO: Move this into the analytic context
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  onOpen: () => void;
}

export type Props = BaseInputProps & AdditionalProps;

const SearchInputBase: FunctionComponent<Props & InjectedIntlProps> = ({
  intl,
  ...rest
}) => {
  const advancedIssueSearchUrlFactory = useFiltersAdvancedSearchUrlFactory();
  const advancedSearchUrl = advancedIssueSearchUrlFactory(rest.value);

  return (
    <ProductSearchInput
      {...rest}
      advancedSearchURL={advancedSearchUrl}
      actionSubjectId={AdvancedSearchLinkSubjectId.JIRA_ISSUES}
      expandedPlaceholder={intl.formatMessage(messages.jira_search_placeholder)}
      collapsedPlaceholder={intl.formatMessage(
        messages.common_search_input_collapsed_placeholder,
      )}
    />
  );
};

// This is used for testing, do not consume this component in the UI
export const JiraSearchInput = injectIntl(SearchInputBase);
