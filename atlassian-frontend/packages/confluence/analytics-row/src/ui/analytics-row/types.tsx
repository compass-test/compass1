import { SizeType } from '@atlaskit/avatar';

export type AnalyticsRowContent = {
  /**
   * Name of the entry of the row.
   */
  name: string;
  /**
   * Subname of the entry of the row. Will exist below the main header.
   */
  subname?: string;
  /**
   * Boolean value if a subname is provided.
   */
  hasSubname?: boolean;
  /**
   * Details include a tooltip message.
   */
  analyticsIconOnHoverDetails?: AnalyticsIconOnHoverDetails;
  /**
   * Object that represents the singularity/plurality of the metric.
   */
  metric: {
    singular: string;
    plural: string;
  };
  /**
   * Value of said metric.
   */
  value: number;
  /**
   * Key to make a distinction between each row.
   */
  key: string;
  /**
   * Function that leads to the profile, blog, page of the entry selected.
   */
  onClick?: (e?: React.MouseEvent<Element>) => void;
  href?: string;
} & AvatarType;

export type AnalyticsRowContainer = {
  /**
   * Array with all the Content to be displayed.
   */
  content: AnalyticsRowContent[];
  /**
   * Number of rows to be display, if not specified then display
   * all values in content.
   */
  maxRows?: number;
  /**
   * Boolean value that sets the behavior of the card.
   */
  isReadOnly?: boolean;
  /**
   * Details include a tooltip message.
   */
  analyticsIconOnHoverDetails?: AnalyticsIconOnHoverDetails;
  /**
   * A `testId` prop use for testing purposes
   */
  testId?: string;
} & AvatarType;

export type AvatarType = {
  /**
   * Boolean value to set the stylings of an icon (spaces, blogs, etc) or a user.
   * Defaults to circle if not specified.
   */
  showIcon?: boolean;
  /**
   * href for the Avatar to be displayed for a card entry.
   */
  avatarSize?: SizeType;
  /**
   * href for the Avatar to be displayed for a card entry.
   */
  iconUrl?: string;
  /**
   * Atlaskit icon to be displayed for a card entry.
   */
  atlaskitIcon?: React.ReactNode;
};

export type AnalyticsIconType = {
  /**
   * Function that leads to the page analytics of the search term selected.
   */
  onClick?: (e?: React.MouseEvent<Element>) => void;
  /**
   * Message displayed for tooltip
   */
  tooltipMessage: string;
};

export type RowEntryType = {
  /**
   * Boolean value to determine if metric type should be displayed.
   */
  isFirstEntry?: boolean;
  /**
   * Content pertaining to the entry.
   */
  content: AnalyticsRowContent;
  /**
   * Boolean value that sets the behavior of the card.
   */
  isReadOnly?: boolean;
  /**
   * Details include a tooltip message.
   */
  analyticsIconOnHoverDetails?: AnalyticsIconOnHoverDetails;
  /**
   * A `testId` prop use for testing purposes
   */
  testId?: string;
} & AvatarType;

export type AnalyticsRowLinkType = {
  /**
   * Callback function to disable analytics icon.
   */
  disableAnalyticsIconOnHover?: () => void;
  /**
   * Callback function to enable analytics icon.
   */
  enableAnalyticsIconOnHover?: () => void;
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

export type RowEntityMetric = {
  /**
   * Content pertaining to the entry.
   */
  content: AnalyticsRowContent;
};

export type MetricsCellType = {
  /**
   * Value that displayed on each row.
   */
  value: string;
};
/**
 * If tooltip provided then the AnalyticsIcon will appear with a tooltip.
 */
export type AnalyticsIconOnHoverDetails = {
  /**
   * String that is displayed when hover state over metrics is displayed.
   */
  tooltipMessage: string;
  /**
   * Function that leads to more analytics.
   */
  onClick?: (e?: React.MouseEvent<Element>) => void;
};
