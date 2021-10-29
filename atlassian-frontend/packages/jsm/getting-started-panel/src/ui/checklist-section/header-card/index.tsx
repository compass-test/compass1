import React, {
  ComponentType,
  ReactNode,
  useContext,
  createContext,
} from 'react';
import findKey from 'lodash/findKey';
import noop from 'lodash/noop';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { fireUIAnalytics, SCREEN } from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { G300 } from '@atlaskit/theme/colors';
import ProgressBar from '@atlaskit/progress-bar';

import { jsmGettingStartedPanelScreenName } from '../../../common/analytics/constants';
import {
  Checklist,
  ChecklistTabKey,
  ChecklistTab,
  HeaderState,
  TaskId,
} from '../../../common/types';
import { getComponentTestId } from '../../../common/util';
import {
  getVisibleTasks,
  useTabVisibility,
  useTaskVisibility,
} from '../../../common/services/visibility';
import { getTabTitle } from '../../../common/ui';

import { ChecklistAvatar } from '../../../common/ui/avatar';
import {
  ExpansionContext,
  Expander,
  ExpansionButton,
} from '../../../common/ui/expansion';
import Navigation from '../../../common/ui/navigation';

import { messages } from './messages';
import {
  HeaderCardContainer,
  Spacer,
  TabDataContainer,
  TabHeading,
  TabParagraph,
  InactiveTabList,
  InactiveTabContainer,
  ActiveTabContainer,
  Footer,
  ProgressBarWrapper,
} from './styled';
import { getCompletedTasks, getTabTaskIds } from '../../../common/util';

const { Expanded, Minimized } = HeaderState;
const { Basics, Incidents, Changes } = ChecklistTabKey;

interface Props {
  checklist: Checklist;
  completedItems: TaskId[];
  onTabSelected: (tabKey: ChecklistTabKey) => void;
  onHeaderStateChanged: (headerState: HeaderState) => void;
  onBack: () => void;
  onClose: () => void;
}

// Exposed for testing.
export const actionSubjectIds = {
  [ChecklistTabKey.Basics]: 'jsmGettingStartedPanelBasicsChecklistTab',
  [ChecklistTabKey.Incidents]: 'jsmGettingStartedPanelIncidentsChecklistTab',
  [ChecklistTabKey.Changes]: 'jsmGettingStartedPanelChangesChecklistTab',
};

const initialChecklistTab: ChecklistTab = {
  activeTask: TaskId.AddChangeApprovers,
};

// Use TabContext as an interim solution while there's no
// sweet state, to reduce wiring in tab-related components.
const TabContext = createContext({
  activeTab: ChecklistTabKey.Basics,
  tabs: {
    basics: { ...initialChecklistTab },
    incidents: { ...initialChecklistTab },
    changes: { ...initialChecklistTab },
  },
  onTabSelected: noop,
  completedItems: [] as TaskId[],
});

// The tab-related components are all obviously cohesive if kept together, but
// they're not good candidates for extraction because it doesn't make sense to
// reuse the components outside the checklist header.
export const TabData: ComponentType<{
  tabKey: ChecklistTabKey;
  completedTaskCount: number;
  totalTaskCount: number;
  children?: ReactNode;
}> = injectIntl(
  ({
    tabKey,
    completedTaskCount,
    totalTaskCount,
    intl,
    children = undefined,
  }) => (
    <TabDataContainer>
      <TabHeading>{intl.formatMessage(getTabTitle(tabKey))}</TabHeading>
      <TabParagraph>
        {intl.formatMessage(messages.countCompleted, {
          completedTaskCount,
          totalTaskCount,
        })}
      </TabParagraph>
      {children}
    </TabDataContainer>
  ),
);

const GreenProgressBar: ComponentType<{ value: number }> = ({ value }) => (
  <ProgressBarWrapper>
    <ProgressBar
      theme={(currentTheme, props) => {
        const theme = currentTheme(props);
        return {
          ...theme,
          bar: {
            ...theme.bar,
            background: G300,
          },
        };
      }}
      value={value}
    />
  </ProgressBarWrapper>
);

const ActiveTab = () => {
  const [tabVisibility] = useTabVisibility();
  const [taskVisibility] = useTaskVisibility();
  const { activeTab, completedItems } = useContext(TabContext);
  const { isExpanded } = useContext(ExpansionContext);

  if (!tabVisibility[activeTab]) {
    return null;
  }

  const tabTaskIds = getVisibleTasks(getTabTaskIds(activeTab), taskVisibility);
  const activeTabCompletedTasks = getCompletedTasks(completedItems, tabTaskIds);

  return (
    <ActiveTabContainer
      data-testid={getComponentTestId(`checklistTab-${activeTab}`)}
    >
      <ChecklistAvatar tabKey={activeTab} isActive={isExpanded} />
      <TabData
        tabKey={activeTab}
        completedTaskCount={activeTabCompletedTasks.length}
        totalTaskCount={tabTaskIds.length}
      >
        <GreenProgressBar
          value={activeTabCompletedTasks.length / tabTaskIds.length}
        />
      </TabData>
    </ActiveTabContainer>
  );
};

const ClickableTab: ComponentType<{
  tabKey: ChecklistTabKey;
}> = ({ tabKey }) => {
  const [tabVisibility] = useTabVisibility();
  const [taskVisibility] = useTaskVisibility();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { onTabSelected, completedItems } = useContext(TabContext);

  if (!tabVisibility[tabKey]) {
    return null;
  }

  const tabTaskIds = getVisibleTasks(getTabTaskIds(tabKey), taskVisibility);
  const currentTabCompletedTasks = getCompletedTasks(
    completedItems,
    tabTaskIds,
  );

  const handleClick = () => {
    // TODO: InactiveTabContainer onClick does not give us an Atlaskit event so
    // we have to create it ourselves. Because of this we don't have the context
    // populated automatically from ContextualAnalyticsData
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'checklistTab',
    });
    event.context.push({
      source: `${jsmGettingStartedPanelScreenName}${SCREEN}`,
    });
    fireUIAnalytics(event, actionSubjectIds[tabKey]);
    onTabSelected(tabKey);
  };

  return (
    <InactiveTabContainer
      key={tabKey}
      tabIndex={0}
      onClick={handleClick}
      data-testid={getComponentTestId(`checklistTab-${tabKey}`)}
    >
      <ChecklistAvatar tabKey={tabKey} />
      <TabData
        tabKey={tabKey}
        completedTaskCount={currentTabCompletedTasks.length}
        totalTaskCount={tabTaskIds.length}
      />
    </InactiveTabContainer>
  );
};

// The header card itself might be able to be share code between
// the slightly different header cards in non-checklist parts of GSP.
// We can revisit the possibility of extracting some
// decoupled-from-checklist-tabs version of this component.
export const HeaderCard = ({
  intl,
  checklist: { headerState, activeTab, tabs },
  completedItems,
  onTabSelected,
  onHeaderStateChanged,
  onClose,
  onBack,
}: Props & InjectedIntlProps) => {
  const [tabVisibility] = useTabVisibility();
  // Map from common types to booleans to be compatible with
  // a reusable ExpansionContext.
  const isExpanded = headerState === Expanded;
  const toggleExpanded = isExpanded
    ? () => onHeaderStateChanged(Minimized)
    : () => onHeaderStateChanged(Expanded);

  const visibleActiveTab = tabVisibility[activeTab]
    ? activeTab
    : findKey(tabVisibility);

  if (!visibleActiveTab) {
    // This can only happen if user won't have any permissions to see anything
    return null;
  }

  const secondTab = visibleActiveTab === Basics ? Incidents : Basics;
  const thirdTab = visibleActiveTab === Changes ? Incidents : Changes;

  return (
    <TabContext.Provider
      value={{
        activeTab: visibleActiveTab as ChecklistTabKey,
        tabs,
        onTabSelected,
        completedItems,
      }}
    >
      <ExpansionContext.Provider value={{ isExpanded, toggleExpanded }}>
        <HeaderCardContainer>
          <Navigation onClose={onClose} onBack={onBack}>
            {intl.formatMessage(messages.quickStart)}
          </Navigation>
          <ActiveTab />
          {(tabVisibility[secondTab] || tabVisibility[thirdTab]) && (
            <InactiveTabList isExpanded={isExpanded}>
              <Expander>
                {tabVisibility[secondTab] && (
                  <ClickableTab tabKey={secondTab} />
                )}
                {tabVisibility[thirdTab] && <ClickableTab tabKey={thirdTab} />}
              </Expander>
            </InactiveTabList>
          )}
          <Footer>
            <Spacer />
            {(tabVisibility[secondTab] || tabVisibility[thirdTab]) && (
              <ExpansionButton />
            )}
          </Footer>
        </HeaderCardContainer>
      </ExpansionContext.Provider>
    </TabContext.Provider>
  );
};

export default injectIntl(HeaderCard);
