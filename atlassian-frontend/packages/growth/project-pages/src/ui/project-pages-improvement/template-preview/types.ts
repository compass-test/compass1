import { InjectedIntlProps } from 'react-intl';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

export type TemplatePreviewDispatchProps = {
  onOpenCrossFlowError: () => void;
  onSuccessfulCrossFlowExpansion: () => void;
};

export type TemplatePreviewProps = TemplatePreviewDispatchProps & {
  onTryClick: (analyticsEvent: UIAnalyticsEvent) => void;
  onLearnMoreClick: (analyticsEvent: UIAnalyticsEvent) => void;
};

export type TemplatePreviewViewProps = {
  onTryClick: (_: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => void;
  onLearnMoreClick: (
    _: React.MouseEvent,
    analyticsEvent: UIAnalyticsEvent,
  ) => void;
} & InjectedIntlProps;
