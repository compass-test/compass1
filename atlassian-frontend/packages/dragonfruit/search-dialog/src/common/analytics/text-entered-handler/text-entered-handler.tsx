import React from 'react';
import { onTextEntered } from '../events';
import { withAnalytics } from '../with-analytics';
import debounce from 'lodash/debounce';

interface Props {
  query: string;
  textEntered: () => any;
  debounceTime?: number;
}

export class TextEnteredHandler extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const { query } = this.props;
    if (prevProps.query !== query) {
      /**
       * Earlier this component was child of [confluence|jira]-search-dialog which ensured that this got fired after the debounced search.
       * Now it will get moved to the wrapper component which will bring this at the same level as [confluence|jira]-search-dialog.
       * This leads to the event handler getting fired in the same tick before the debounced search.
       * Hence, forceful execution in the next tick.
       */
      setTimeout(() => this.textEntered());
    }
  }

  textEntered = debounce(() => {
    const { textEntered } = this.props;

    textEntered();
  }, this.props.debounceTime || 0);

  render() {
    return null;
  }
}

export default withAnalytics({ textEntered: onTextEntered })(
  TextEnteredHandler,
);
