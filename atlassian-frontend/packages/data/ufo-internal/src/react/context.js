import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  ConcurrentExperience,
  UFOExperience,
} from '@atlassian/ufo-experimental';
import { ufolog } from '@atlassian/ufo-experimental/logger';

export const getActions = () => {
  return {
    actions: {},
  };
};

export const UFOContext = createContext(null);

type ErrorBoundaryProps = {
  metric: UFOExperience,
};

class UFOErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(/*error, errorInfo*/) {
    this.props.metric.failure();
  }

  render() {
    return this.props.children;
  }
}

type ContextProps = {
  metric: UFOExperience,
  start?: boolean,
};

export const UFOContextComponent = (props: ContextProps) => {
  const context = useContext(UFOContext);

  const hasBeenCalled = useRef(false);
  const firstRun = hasBeenCalled.current === false;

  if (hasBeenCalled.current === false) {
    hasBeenCalled.current = uuidv4();
  }

  //console.log('context', props.metric.id, context);

  const metric =
    props.metric instanceof ConcurrentExperience
      ? props.metric.getInstance(hasBeenCalled.current)
      : props.metric;

  if (context) {
    //metric.setParent(context);
  }
  if ((props.start === undefined || props.start !== false) && firstRun) {
    ufolog('START', props.metric.id, hasBeenCalled.current);
    metric.start();
  }

  useEffect(() => {
    return () => {
      props.metric.release?.(hasBeenCalled.current);
    };
  }, [props.metric]);

  return (
    <UFOContext.Provider value={metric}>
      <UFOErrorBoundary metric={metric}>
        <div data-uuid={`${props.metric.id} ${hasBeenCalled.current}`}>
          {props.children}
        </div>
      </UFOErrorBoundary>
    </UFOContext.Provider>
  );
};
