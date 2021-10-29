import React, { ReactNode, PureComponent } from 'react';
import {
  withAnalyticsEvents,
  createAndFireEvent,
} from '@atlaskit/analytics-next';

type Props = {
  children: ReactNode;
  createAnalyticsEvent?: any;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  [x: string]: any;
};

export class LinkImplementation extends PureComponent<Props> {
  render() {
    const { children, onClick, ...rest } = this.props;
    delete rest.createAnalyticsEvent;
    return (
      <a
        onClick={(e) => {
          onClick(e);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'link',
  }),
})(LinkImplementation);
