import React from 'react';

import Spinner from '@atlaskit/spinner';
import Tooltip from '@atlaskit/tooltip';

import { delay, SpinnerWrapper, TransitionElement } from './styled';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

type State = {
  message: string;
  className: string;
};

const loadingState: State = {
  className: 'is-loading',
  message: 'Updating...',
};

const loadedState: State = {
  className: '',
  message: '',
};

const spinner = (
  <SpinnerWrapper>
    <Spinner size="small" delay={delay} />
  </SpinnerWrapper>
);

/**
 * Presents loading component with a spinner when needed
 * Children have less opacity and a spinner when value is loading
 */
const LoadingInlineValue = ({ children, isLoading = false }: Props) => {
  const { className, message } = isLoading ? loadingState : loadedState;
  return (
    <TransitionElement className={className}>
      <Tooltip content={message} delay={0} position="right">
        <span>
          {children}
          {isLoading ? spinner : null}
        </span>
      </Tooltip>
    </TransitionElement>
  );
};

export default LoadingInlineValue;
