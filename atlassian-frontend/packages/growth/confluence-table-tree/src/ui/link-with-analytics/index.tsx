import { LinkPropsWithoutRef } from './type';
import {
  withAnalyticsEvents,
  createAndFireEvent,
  WithAnalyticsEventsProps,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';

import { LinkWrapper } from './styled';

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'link',
  }),
})<
  Omit<LinkPropsWithoutRef, 'onClick'> &
    WithAnalyticsEventsProps & {
      onClick: (e: React.MouseEvent, analyticsEvent: UIAnalyticsEvent) => void;
    },
  LinkPropsWithoutRef
>(LinkWrapper as any);
