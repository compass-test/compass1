import React from 'react';
import { withAnalytics } from '../with-analytics';
import { onDismissed } from '../events';

interface Props {
  isExpanded: boolean;
  onDialogClosed: () => any;
}

export class DialogDismissedHandlerComponent extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const { onDialogClosed, isExpanded } = this.props;

    if (prevProps.isExpanded && !isExpanded) {
      onDialogClosed();
    }
  }

  render() {
    return null;
  }
}

export const DialogDismissedHandler = withAnalytics({
  onDialogClosed: onDismissed,
})(DialogDismissedHandlerComponent);
