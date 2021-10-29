import React from 'react';
import {
  KeyboardHighlightContext,
  RegisterKeyboardEnabled,
} from './search-keyboard';

interface Props {
  allHighlighted: boolean;
}

export class TestSearchKeyboardProvider extends React.Component<Props> {
  timeout: ReturnType<typeof setTimeout> | undefined;

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  registerKeyboardEnabled: RegisterKeyboardEnabled<any> = (
    _,
    __,
    onHighlight,
  ) => {
    this.timeout = setTimeout(() => onHighlight(this.props.allHighlighted), 0);
    return -1;
  };

  render() {
    return (
      <KeyboardHighlightContext.Provider
        value={{
          registerKeyboardEnabled: this.registerKeyboardEnabled,
          unregisterKeyboardEnabled: () => {},
        }}
      >
        {this.props.children}
      </KeyboardHighlightContext.Provider>
    );
  }
}
