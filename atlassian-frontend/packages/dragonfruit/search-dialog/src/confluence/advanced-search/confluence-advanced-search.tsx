import SearchIcon from '@atlaskit/icon/glyph/search';
import {
  LinkComponent,
  ReturnIcon,
  useKeyboardNavigation,
} from '@atlassian/search-dialog';
import React, { useCallback } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';
import {
  AdvancedSearchContent,
  AdvancedSearchLink,
  CenteredAdvancedSearchGroup,
  MultiSiteAdvancedSearchLink,
} from '../../common/advanced-search-link';
import {
  AdvancedSearchLinkSubjectId,
  getTrigger,
  isNewTab,
  onAdvancedSearchSelected,
  useAnalytics,
} from '../../common/analytics';
import { Products, useProducts } from '../../common/product-context';
import { useFeatures } from '../../confluence/confluence-features';
import { messages } from '../../messages';
import { useClients } from '../clients';
import {
  useConfluenceAdvancedSearchUrlFactory,
  usePrimarySiteConfluenceAdvancedSearchUrlFactory,
} from '../confluence-utils/confluence-url-utils';
import { Site } from '../../common/clients';

interface Props {
  linkComponent?: LinkComponent;
  query: string;
  isLoading: boolean;
}

const onKeyDown = (e: KeyboardEvent, target: HTMLElement) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();

    // The ref here is the wrapper span however we simulate a click on the `ResultLinkComponent` that it wraps.
    (target.firstElementChild as HTMLElement)?.click?.();
  }
};

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
`;

const ConfMultiSiteAdvancedSearch = ({
  sites,
  linkComponent,
  isLoading,
  query,
}: Props & { sites: Site[] }) => {
  const noFiltersUrlFactory = useConfluenceAdvancedSearchUrlFactory();
  const { fireAnalyticsEvent } = useAnalytics();

  const sitesWithAdvancedSearchUrl = sites.map((s) => ({
    ...s,
    advancedSearchUrl: noFiltersUrlFactory(query, s.siteUrl, [], []),
  }));

  return (
    <MultiSiteAdvancedSearchLink
      sites={sitesWithAdvancedSearchUrl}
      linkComponent={linkComponent}
      isLoading={isLoading}
      onClick={(_, e) => {
        fireAnalyticsEvent(
          onAdvancedSearchSelected({
            trigger: getTrigger(e),
            actionSubjectId: AdvancedSearchLinkSubjectId.CONFLUENCE,
            isLoading,
            newTab: isNewTab(e),
          }),
        );
      }}
    />
  );
};

const SingleSiteAdvancedSearch = (props: Props & InjectedIntlProps) => {
  const { query, linkComponent, isLoading, intl } = props;
  const { fireAnalyticsEvent } = useAnalytics();
  const advancedSearchUrl = usePrimarySiteConfluenceAdvancedSearchUrlFactory()(
    query,
  );

  const onAdvancedSearchClicked = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      fireAnalyticsEvent(
        onAdvancedSearchSelected({
          trigger: getTrigger(e),
          actionSubjectId: AdvancedSearchLinkSubjectId.CONFLUENCE,
          isLoading,
          newTab: isNewTab(e),
        }),
      );
    },
    [fireAnalyticsEvent, isLoading],
  );

  const [isKeyboardHighlighted, ref] = useKeyboardNavigation<HTMLSpanElement>({
    onKeydownCallback: onKeyDown,
  });

  const i18nMessage =
    useProducts().length > 1
      ? messages.confluence_advanced_search_with_product_prefix
      : messages.confluence_advanced_search;

  return (
    <span
      ref={ref}
      onClick={onAdvancedSearchClicked}
      role="none"
      style={{ display: 'flex', height: '100%' }}
    >
      <AdvancedSearchLink
        href={advancedSearchUrl}
        isKeyboardHighlighted={isKeyboardHighlighted}
        linkComponent={linkComponent}
      >
        <ContentWrapper>
          <CenteredAdvancedSearchGroup>
            <SearchIcon size="small" label={intl.formatMessage(i18nMessage)} />
            <AdvancedSearchContent>
              <FormattedMessage {...i18nMessage} />
            </AdvancedSearchContent>
          </CenteredAdvancedSearchGroup>
        </ContentWrapper>
        <ReturnIcon inverted={isKeyboardHighlighted} />
      </AdvancedSearchLink>
    </span>
  );
};

const ConfluenceAdvancedSearchBase = (props: Props & InjectedIntlProps) => {
  const confluenceSites = useClients().sites.filter(
    (s) => s.product === Products.confluence,
  );

  const multiSiteEnabled = useFeatures().isMultiSite || false;

  if (confluenceSites.length > 1 && multiSiteEnabled) {
    return <ConfMultiSiteAdvancedSearch sites={confluenceSites} {...props} />;
  }

  return <SingleSiteAdvancedSearch {...props} />;
};

export default injectIntl(ConfluenceAdvancedSearchBase);
