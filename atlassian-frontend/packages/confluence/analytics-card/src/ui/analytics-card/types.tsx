import {
  AnalyticsRowContainer,
  AnalyticsRowContent,
  AvatarType,
} from '@atlassian/analytics-row';

export type AnalyticsCardType = {
  /**
   * Name of the title of the card.
   */
  title: string;

  /**
   * Leads to more analytics, link to the bottom of the card.
   */
  href?: string;
  onClick?: (e?: React.MouseEvent<Element>) => void;
};

export type AnalyticsCardContent = AnalyticsRowContent;

export type RowEntityType = {
  /**
   * Content pertaining to the entry.
   */
  content: AnalyticsCardContent;
  /**
   * Boolean value to determine if the analytics icon shows up when row is hovered.
   */
  shouldShowAnalyticsIconOnHover?: boolean;
} & AvatarType;

export type AnalyticsFooterLinkType = {
  /**
   * Leads to more analytics.
   */
  href?: string;
  /**
   * A `testId` prop use for testing purposes
   */
  testId?: string;
  onClick?: (e?: React.MouseEvent<Element>) => void;
};

export type AnalyticsCardBodyType = {
  /**
   * Object that represents how the metric can be used.
   * This is used for displaying a message if there is no content.
   *
   * i.e. 'No <noun> <verb> within the selected time frame'
   * 'No pages edited within the selected time frame'
   */
  noDataDetails?: {
    // verb must be past tense.
    verb: string;
    // noun must be plural.
    noun: string;
  };
} & AnalyticsRowContainer;

export type MetricsCellType = {
  /**
   * Value that displayed on each row.
   */
  value: string;
};
