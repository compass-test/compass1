import React from 'react';
import {
  SearchAnchor,
  KeyboardHighlightProvider,
} from '@atlassian/search-dialog';

interface Props {
  isExpanded: boolean;
  onClose: () => void;
  children?: (
    setRef: (ref: HTMLInputElement | null) => void,
  ) => React.ReactElement | null;
}
interface State {
  ref: HTMLElement | null;
}

export class KeyboardWrapper extends React.Component<Props, State> {
  state = {
    ref: null as HTMLElement | null,
  };

  /**
   * Hold a timeout id for the onBlur and onFocus handlers
   */
  timeout: number | undefined = undefined;

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === 'Escape' &&
      !event.defaultPrevented &&
      this.props.isExpanded
    ) {
      event.preventDefault();
      this.close();
    }
  };

  onBlurHandler = () => {
    this.timeout = setTimeout(() => {
      this.close();
    });
  };

  onFocusHandler = () => {
    clearTimeout(this.timeout);
  };

  setRef = (ref: HTMLInputElement | null) => {
    if (this.state.ref !== ref) {
      this.setState({
        ref,
      });
    }
  };

  close = () => {
    const { ref } = this.state;
    ref && ref.blur();
    this.props.onClose();
  };

  render() {
    const { isExpanded, children } = this.props;

    return (
      <SearchAnchor
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
        onKeyDown={this.handleKeyDown}
        isExpanded={isExpanded}
      >
        <KeyboardHighlightProvider listenerNode={this.state.ref}>
          {children ? children(this.setRef) : null}
        </KeyboardHighlightProvider>
      </SearchAnchor>
    );
  }
}
