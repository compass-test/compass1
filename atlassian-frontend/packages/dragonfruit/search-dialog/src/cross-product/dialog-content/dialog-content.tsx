import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { LinkComponent } from '@atlassian/search-dialog';
import Tabs, { TabList, useTab, useTabPanel } from '@atlaskit/tabs';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { TabComponent, CrossProductTabData } from '../tab-component';
import {
  Products,
  useProducts,
  useActiveProduct,
} from '../../common/product-context';
import { AnalyticsContextAction, useAnalytics } from '../../common/analytics';
import {
  onTabSelected,
  ContextPayload,
  NonPrivacySafeContext,
} from '../../common/analytics/events';
import { messages } from '../../messages';
import { injectIntl, InjectedIntl, InjectedIntlProps } from 'react-intl';
import { SearchCSS } from '@atlaskit/atlassian-navigation';
import DialogInlineOnboarding from './dialog-inline-onboarding';

const getTabLabel = (product: Products, intl: InjectedIntl): string => {
  return {
    [Products.confluence]: intl.formatMessage(messages.confluence_tab_label),
    [Products.compass]: intl.formatMessage(messages.compass_tab_label),
    [Products.other]: '',
  }[product];
};

/**
 * This provides additional margins around the tab items to fit our design.
 * Only the first item should have a left margin.
 */
const TabItemWrapper = styled.div<{ isFirstItem?: boolean }>`
  margin-top: ${gridSize() / 2}px;
  ${({ isFirstItem }) => isFirstItem && `margin-left: ${gridSize()}px;`}
`;
interface Props {
  setSelectedTabIndex: (index: number) => void;
  addAnalyticContext: () => ContextPayload;
  nonPrivacySafeContext: () => NonPrivacySafeContext;
  setAdditionalAnalyticsContext: (action: AnalyticsContextAction) => void;
  onRetry: () => void;
  isExpanded: boolean;
  query: string;
  debounceTime: number;
  isAnyResultsLoading: boolean;
  onNavigate: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  queryVersion: number;
  linkComponent?: LinkComponent;
  formatDate?: (lastModified: string) => JSX.Element;
  theme?: SearchCSS;
  dialogHeight?: number;
  setDialogHeight?: (height: number) => void;
}

const CustomTab = (props: { data: CrossProductTabData }) => {
  const tabAttributes = useTab();
  return (
    <TabItemWrapper
      {...tabAttributes}
      onMouseDown={(e) => e.preventDefault()}
      isFirstItem={props.data.isFirstTab}
    >
      {props.data.label}
    </TabItemWrapper>
  );
};

const TabPanelWrapper = styled.div`
  flex-direction: column;
  /* Needed to override default tabs styles */
  &&& {
    padding-left: 0;
    padding-right: 0;
  }
`;
const CustomTabPanel = (props: { data: CrossProductTabData }) => {
  const { tabIndex, ...tabPanelAttributes } = useTabPanel();
  return (
    <TabPanelWrapper {...tabPanelAttributes}>
      <TabComponent data={props.data} />
    </TabPanelWrapper>
  );
};

export const DialogContent: FunctionComponent<Props & InjectedIntlProps> = ({
  intl,
  setSelectedTabIndex,
  addAnalyticContext,
  nonPrivacySafeContext,
  children,
  ...tabProps
}) => {
  const products = useProducts();
  const activeProduct = useActiveProduct();
  const { fireAnalyticsEvent } = useAnalytics();

  if (products.length === 1) {
    return <TabComponent data={{ id: products[0], extra: tabProps }} />;
  }

  const tabAttrs: CrossProductTabData[] = products.map((p, idx) => ({
    label: getTabLabel(p, intl),
    id: p,
    extra: tabProps,
    isFirstTab: idx === 0,
  }));

  const onTabClicked = (index: number) => {
    setSelectedTabIndex(index);
    const { id } = tabAttrs[index];
    fireAnalyticsEvent(
      onTabSelected(
        { tabName: id },
        addAnalyticContext(),
        nonPrivacySafeContext(),
      ),
    );
  };

  return (
    <>
      {products.length > 1 ? (
        <DialogInlineOnboarding
          primaryProduct={products[0]}
          activeProduct={activeProduct}
        />
      ) : null}
      <Tabs
        onChange={onTabClicked}
        selected={products.indexOf(activeProduct)}
        id="dialog-content-tabs"
        shouldUnmountTabPanelOnChange
      >
        <TabList>
          {tabAttrs.map((tab, index) => (
            <CustomTab data={tab} key={index} />
          ))}
        </TabList>
        {tabAttrs.map((tab, index) => (
          <CustomTabPanel key={index} data={tab} />
        ))}
      </Tabs>
    </>
  );
};

export default injectIntl(DialogContent);
