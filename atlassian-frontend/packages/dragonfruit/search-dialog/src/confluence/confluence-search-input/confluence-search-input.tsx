import React, { FunctionComponent } from 'react';
import {
  ProductSearchInput,
  BaseInputProps,
} from '../../common/product-search-input';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { messages } from '../../messages';
import { usePrimarySiteConfluenceAdvancedSearchUrlFactory } from '../confluence-utils/confluence-url-utils';
import { AdvancedSearchLinkSubjectId } from '../../common/analytics';
import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';

interface AdditionalProps {
  debounceTime: number;
  forwardRef: React.Ref<HTMLInputElement>;
  isLoading: boolean;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  onOpen: () => void;
}

export type Props = BaseInputProps & AdditionalProps;

const ConfluenceSearchInputBase: FunctionComponent<
  Props & InjectedIntlProps
> = ({ intl, ...rest }) => {
  const confluenceAdvancedSearchUrlFactory = usePrimarySiteConfluenceAdvancedSearchUrlFactory();
  const advancedSearchUrl = confluenceAdvancedSearchUrlFactory(rest.value);
  return (
    <ContextualAnalyticsData
      sourceName="searchDialogPreQuery"
      sourceType={SCREEN}
    >
      <ProductSearchInput
        {...rest}
        advancedSearchURL={advancedSearchUrl}
        actionSubjectId={AdvancedSearchLinkSubjectId.NO_RESULTS}
        expandedPlaceholder={intl.formatMessage(
          messages.compass_search_input_expanded_placeholder,
        )}
        collapsedPlaceholder={intl.formatMessage(
          messages.common_search_input_collapsed_placeholder,
        )}
      />
    </ContextualAnalyticsData>
  );
};

export const ConfluenceSearchInput = injectIntl(ConfluenceSearchInputBase);

export default ConfluenceSearchInput;
