import React, { ComponentType, FunctionComponent, useEffect } from 'react';

import { jsonDateParser } from 'json-date-parser';
import isEmpty from 'lodash/isEmpty';
import { useRouter, useRouterActions } from 'react-resource-router';
import {
  ActionThunk,
  BoundActions,
  createContainer,
  createHook,
  createStore,
  defaults,
  Store,
} from 'react-sweet-state';
import { qs } from 'url-parse';
import { DeepPartial } from 'utility-types';

import { deepMergeWithArrayOverwrite } from './merge';

if (process.env.MICROS_ENV === 'local') {
  defaults.devtools = true;
}

interface StoreWithShareableUrlConfig<
  TState,
  TActions extends Record<string, ActionThunk<TState, TActions>>
> {
  name?: string;
  initialState: TState;
  actions: TActions;
  queryParamName: string;
  onInit?: (
    stateFromUrl: DeepPartial<TState> | undefined,
  ) => DeepPartial<TState>;
}

type InternalProps = {
  query: string | undefined;
  children: React.ReactNode;
};

function getStateFromUrl<T>(
  queryParamName: string,
): DeepPartial<T> | undefined {
  const parsedUrlQueryString: any = qs.parse(window.location.search);

  return parsedUrlQueryString[queryParamName]
    ? (JSON.parse(
        parsedUrlQueryString[queryParamName],
        jsonDateParser,
      ) as DeepPartial<T>)
    : undefined;
}

function syncStateToUrl<TState>(
  queryParamName: string,
  state: TState,
  replace: (url: string) => void,
) {
  const currentUrlQueryString = qs.parse(window.location.search);
  const queryString = qs.stringify({
    ...currentUrlQueryString,
    [queryParamName]: JSON.stringify(state),
  });

  const updatedUrl = window.location.pathname + `?` + queryString;
  replace(updatedUrl);
}

export function createUrlSyncedStore<
  TState extends object,
  TActions extends Record<string, ActionThunk<TState, TActions>>
>({
  name,
  initialState,
  actions,
  queryParamName,
  onInit: onInitParam,
}: StoreWithShareableUrlConfig<TState, TActions>): [
  Store<TState, TActions>,
  ComponentType<{}>,
  (args_0: void) => [TState, BoundActions<TState, TActions>],
] {
  const store = createStore<TState, TActions>({
    name,
    initialState,
    actions,
  });

  const StoreContainer = createContainer<TState, TActions, InternalProps>(
    store,
    {
      onInit: () => ({ setState }) => {
        const stateFromUrl = getStateFromUrl<TState>(queryParamName);
        const customInitialState = onInitParam?.(stateFromUrl) ?? stateFromUrl;
        if (customInitialState) {
          // Use deep merge in case the state from url is missing some deep
          // level parameters, FYI, the properties that resolve to `undefined`
          // are skipped if they exist in initialState.
          const mergedState = deepMergeWithArrayOverwrite(
            initialState,
            customInitialState,
          );
          setState(mergedState);
        }
      },
      onUpdate: () => ({ setState }, { query }: InternalProps) => {
        if (isEmpty(query)) {
          setState(initialState);
        }
      },
    },
  );

  const useHook = createHook(store);

  const UrlUpdater = () => {
    const [state] = useHook();
    const { replace } = useRouterActions();

    useEffect(() => {
      syncStateToUrl(queryParamName, state, replace);
    }, [state, replace]);

    return null;
  };

  const ContainerWithUrlUpdater: FunctionComponent = ({ children }) => {
    const [routerState] = useRouter();
    return (
      <StoreContainer query={routerState.query[queryParamName]}>
        <>
          <UrlUpdater />
          {children}
        </>
      </StoreContainer>
    );
  };

  return [store, ContainerWithUrlUpdater, useHook];
}
