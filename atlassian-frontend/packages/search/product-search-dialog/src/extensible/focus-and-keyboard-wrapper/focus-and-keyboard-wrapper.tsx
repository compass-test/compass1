import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {
  SearchAnchor,
  KeyboardHighlightProvider,
  getInputSkeletonFocus,
  getInputSkeletonSelection,
} from '@atlassian/search-dialog';
import { useDialogExpansionContext } from '../dialog-expansion-context';
import { mergeRefCallback } from '../../utils/merge-ref-callback';

interface ContextProps {
  isExpanded: boolean;
  onClose: () => void;
}
interface Props {
  children?: (
    setRef: (ref: HTMLInputElement | null) => void,
  ) => React.ReactElement | null;
}
interface State {
  ref: HTMLElement | null;
}

export class KeyboardWrapperStateless extends React.Component<
  Props & ContextProps,
  State
> {
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

export interface ExternalProps {
  forwardRef: React.Ref<HTMLInputElement>;
  keepExpandedInTab?: boolean;
  children: (arg: KeyboardWrapperExternalChildren) => React.ReactElement | null;
}

export interface KeyboardWrapperExternalChildren {
  ref: React.Ref<HTMLInputElement>;
  onRetry: () => void;
}

export const KeyboardWrapper: React.FC<ExternalProps> = ({
  children,
  keepExpandedInTab = false,
  forwardRef,
  ...rest
}) => {
  const {
    isExpanded,
    setIsExpanded,
    allowChangeExpand,
  } = useDialogExpansionContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const mergedForwardref = mergeRefCallback(inputRef, forwardRef);

  const onClose = useCallback(() => {
    setIsExpanded(false);
  }, [setIsExpanded]);

  const onTabChange = useCallback(() => {
    if (document.hidden) {
      allowChangeExpand(false);
    } else {
      if (isExpanded) {
        inputRef?.current?.focus?.();
      }
      allowChangeExpand(true);
    }
  }, [allowChangeExpand, isExpanded]);

  useEffect(() => {
    if (keepExpandedInTab) {
      document.addEventListener('visibilitychange', onTabChange);
      return () => {
        document.removeEventListener('visibilitychange', onTabChange);
      };
    }
  }, [onTabChange, keepExpandedInTab]);

  // Sets current input focus and selection to same as search-input-skeleton SSR
  useEffect(() => {
    if (getInputSkeletonFocus()) {
      inputRef?.current?.focus?.();
      const {
        selectionStart,
        selectionEnd,
        selectionDirection,
      } = getInputSkeletonSelection();
      inputRef?.current?.setSelectionRange(
        selectionStart,
        selectionEnd,
        selectionDirection,
      );
    }
  }, []);

  // Expand input only on initial load to match search-input-skeleton SSR
  useLayoutEffect(() => {
    if (getInputSkeletonFocus()) {
      setIsExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardWrapperStateless
      {...rest}
      onClose={onClose}
      isExpanded={isExpanded}
    >
      {(setRef) => {
        const ref = mergeRefCallback(setRef, mergedForwardref);
        const onRetry = () => {
          inputRef?.current?.focus?.();
        };

        return children({ ref, onRetry });
      }}
    </KeyboardWrapperStateless>
  );
};
