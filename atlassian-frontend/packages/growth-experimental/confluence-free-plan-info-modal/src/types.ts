import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type ConfluenceFreePlanInfoModalProps = {
  /**
   * Dictates whether the modal is open or not.
   */
  isOpen: boolean;
  /**
   * Function called when the modal should be closed. State is handled externally
   */
  onClose: (analyticsEvent: UIAnalyticsEvent) => void;
  /**
   * Function called when the primary CTA is clicked
   */
  onPrimaryActionClick: (analyticsEvent: UIAnalyticsEvent) => void;
  /**
   * Function called when the secondary CTA is clicked
   */
  onSecondaryActionClick: (analyticsEvent: UIAnalyticsEvent) => void;
};
