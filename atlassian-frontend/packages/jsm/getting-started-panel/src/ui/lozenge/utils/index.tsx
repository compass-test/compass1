import React from 'react';

import {
  Checklist,
  ProductTours,
  ChecklistTabKey,
  GspSectionKey,
  TaskId,
  ProductTourKey,
} from '../../../common/types';
import { getTaskTitle, getTabTitle, getTourTitle } from '../../../common/ui';
import { getCompletedTasks, getTabTaskIds } from '../../../common/util';
import {
  getVisibleTasks,
  VisibilityByTaskId,
  getVisibleActiveTab,
  VisibilityByTab,
} from '../../../common/services/visibility';
import { FormattedMessage, MessageValue } from 'react-intl';
import messages from '../messages';
import walkthroughsMessages from '../../walkthroughs-section/header-card/messages';

import { ChecklistAvatar, TourAvatar } from '../../../common/ui/avatar';
import IconRocket from '../../../common/ui/avatar/assets/Rocket';

type ActiveSection =
  | { type: GspSectionKey.Checklist; data: Checklist }
  | { type: GspSectionKey.ProductTours; data: ProductTours }
  | { type: GspSectionKey.Home };

export const getActiveSectionConfig = (
  sectionKey: GspSectionKey,
  sections: {
    [GspSectionKey.Checklist]: Checklist;
    [GspSectionKey.ProductTours]: ProductTours;
  },
): ActiveSection => {
  switch (sectionKey) {
    case GspSectionKey.Checklist:
      return { type: sectionKey, data: sections[sectionKey] as Checklist };
    case GspSectionKey.ProductTours:
      return { type: sectionKey, data: sections[sectionKey] as ProductTours };
    case GspSectionKey.Home:
      return { type: sectionKey };
  }
};

export const ChecklistIcon = (props: { iconName: ChecklistTabKey }) => (
  <ChecklistAvatar tabKey={props.iconName} />
);

export const getSectionData = (
  activeSection: ActiveSection,
  completedItems: TaskId[],
  taskVisibility: VisibilityByTaskId,
  tabVisibility: VisibilityByTab,
  formatMessage: (
    messageDescriptor: FormattedMessage.MessageDescriptor,
    values?: { [key: string]: MessageValue },
  ) => string,
): {
  title: string | undefined;
  subtitle: string | undefined;
  isComplete: boolean;
  icon: JSX.Element | undefined;
} => {
  switch (activeSection.type) {
    case GspSectionKey.Checklist:
      const { activeTab: activeTabKey, tabs } = activeSection.data;
      const visibleActiveTabKey = getVisibleActiveTab(
        activeTabKey,
        tabVisibility,
      );
      if (!visibleActiveTabKey) {
        // Return a fallback in case the user doesn't have permission to view checklists
        return {
          title: formatMessage(messages.yourCoach),
          subtitle: undefined,
          isComplete: false,
          icon: <IconRocket />,
        };
      }
      const activeTab = tabs[visibleActiveTabKey];
      const allPossibleTaskIds = getVisibleTasks(
        getTabTaskIds(visibleActiveTabKey),
        taskVisibility,
      );
      const completedTaskIds = getCompletedTasks(
        completedItems,
        allPossibleTaskIds,
      );
      const isComplete = completedTaskIds.length === allPossibleTaskIds.length;
      return {
        title: formatMessage(getTabTitle(visibleActiveTabKey)),
        subtitle: activeTab.activeTask
          ? formatMessage(getTaskTitle(activeTab.activeTask))
          : undefined,
        isComplete,
        icon: <ChecklistIcon iconName={visibleActiveTabKey} />,
      };
    case GspSectionKey.ProductTours:
      const productTours = activeSection.data;
      const activeTour = Object.values(ProductTourKey).includes(
        productTours.activeTour as ProductTourKey,
      )
        ? (productTours.activeTour as ProductTourKey)
        : ProductTourKey.Welcome;
      return {
        title: formatMessage(getTourTitle(activeTour)),
        subtitle: formatMessage(walkthroughsMessages.guidedTour),
        isComplete: false,
        icon: <TourAvatar tourKey={activeTour} />,
      };
    case GspSectionKey.Home:
      return {
        title: formatMessage(messages.yourCoach),
        subtitle: undefined,
        isComplete: false,
        icon: <IconRocket />,
      };
  }
};
