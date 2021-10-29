import React from 'react';
import { onTextEntered, TextEnteredAnalyticsProps } from '../events';
import { withAnalytics } from '../with-analytics';
import { useSessionUserInput } from '../../../extensible/user-input-provider';
import debounce from 'lodash/debounce';

interface Props {
  query: string;
  textEntered: (arg: TextEnteredAnalyticsProps) => any;
  stickySearchEnabled: boolean;
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

  componentWillUnmount() {
    this.textEntered.cancel();
  }

  textEntered = debounce(() => {
    const { textEntered, stickySearchEnabled } = this.props;

    textEntered({ isSticky: stickySearchEnabled });
  }, this.props.debounceTime || 0);

  render() {
    return null;
  }
}
const TextEnteredHandlerWithAnalytics = withAnalytics({
  textEntered: onTextEntered,
})(TextEnteredHandler);

const TextEnteredAnalyticsHandler = (props: any) => {
  const { stickySearchEnabled } = useSessionUserInput();
  return (
    <TextEnteredHandlerWithAnalytics
      {...props}
      stickySearchEnabled={stickySearchEnabled}
    />
  );
};

export default TextEnteredAnalyticsHandler;
