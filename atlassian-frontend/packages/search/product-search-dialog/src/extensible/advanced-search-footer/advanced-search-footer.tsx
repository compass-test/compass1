import React, { useCallback } from 'react';

import {
  LinkComponent,
  ReturnIcon,
  useKeyboardNavigation,
} from '@atlassian/search-dialog';
import SearchIcon from '@atlaskit/icon/glyph/search';
import {
  AdvancedSearchLink,
  CenteredAdvancedSearchGroup,
  AdvancedSearchContent,
} from '../../common/advanced-search-link';
import { ScreenSpecificProps } from '../product-router/product/result-provider/result-renderer';
import { useQuery } from '../query-context';
import {
  getTrigger,
  isNewTab,
  onAdvancedSearchSelected,
  useAnalytics,
} from '../../common/analytics';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { messages } from '../../messages';
import { useProductContext } from '../product-router';
import { ContentWrapper } from './content-wrapper.styled';

export interface AdvancedSearchFooterProps
  extends Pick<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'> {
  /**
   * Label used for the search dialog footer component.
   */
  searchFooterLabel?: string;
  /**
   * A custom link component. This prop is designed to allow a custom link
   * component to be passed to customize advanced search footer links within the dialog footer.
   */
  linkComponent?: LinkComponent;
}

const onKeyDown = (e: KeyboardEvent, target: HTMLElement) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    // The ref here is the wrapper span however we simulate a click on the `ResultLinkComponent` that it wraps.
    (target.firstElementChild as HTMLElement)?.click?.();
  }
};

const AdvancedSearchFooter = ({
  urlGeneratorForNoResultsScreen,
  searchFooterLabel,
  linkComponent,
  intl,
}: AdvancedSearchFooterProps & InjectedIntlProps) => {
  const { query, isLoading } = useQuery();
  const { getActiveProduct } = useProductContext();
  const productName = getActiveProduct()?.title;
  const actionSubjectId = `${productName}AdvancedSearchLink`;
  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLSpanElement>({
    onKeydownCallback: onKeyDown,
  });
  const searchLabel =
    searchFooterLabel ||
    intl.formatMessage(messages.extensible_advanced_search_footer);
  const { fireAnalyticsEvent } = useAnalytics();
  const onAdvancedSearchClicked = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      fireAnalyticsEvent(
        onAdvancedSearchSelected({
          trigger: getTrigger(e),
          actionSubjectId: actionSubjectId,
          isLoading,
          newTab: isNewTab(e),
        }),
      );
    },
    [fireAnalyticsEvent, isLoading, actionSubjectId],
  );

  return (
    <span
      ref={ref}
      onClick={onAdvancedSearchClicked}
      role="none"
      style={{ display: 'flex', height: '100%' }}
    >
      <AdvancedSearchLink
        href={urlGeneratorForNoResultsScreen(query)}
        isKeyboardHighlighted={isKeyboardHighlighted}
        linkComponent={linkComponent}
      >
        <ContentWrapper>
          <CenteredAdvancedSearchGroup>
            <SearchIcon size="small" label={searchLabel} />
            <AdvancedSearchContent>{searchLabel}</AdvancedSearchContent>
          </CenteredAdvancedSearchGroup>
        </ContentWrapper>
        <ReturnIcon inverted={isKeyboardHighlighted} />
      </AdvancedSearchLink>
    </span>
  );
};

export default injectIntl(AdvancedSearchFooter);
