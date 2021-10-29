import React, { useContext, FunctionComponent } from 'react';
import uuid from 'uuid/v4';
import { SearchDialogAnalyticsContext } from '../analytics';

interface SessionContext {
  searchSessionId: string | undefined;
}

const SearchSessionContext = React.createContext<SessionContext>({
  searchSessionId: undefined,
});

export interface SearchSessionProps {
  searchSessionId: string;
}

class SearchSessionProviderError extends Error {
  constructor() {
    super(
      'Could not find any SearchSessionProvider, make sure there is a SearchSessionProvider further up the tree',
    );
  }
}

/**
 * Wraps a component and provides the component with a searchSessionId.
 * The searchSessionId will either be retrieved from the closest SearchSessionProvider or a new one
 * will be generated with the wrapped component is mounted.
 */
export function injectSearchSession<T>(
  Component: React.ComponentType<T & SearchSessionProps>,
) {
  const WrapperComponent: FunctionComponent<Omit<T, 'searchSessionId'>> = (
    props,
  ) => {
    return (
      <SearchSessionContext.Consumer>
        {({ searchSessionId }) => {
          if (!searchSessionId) {
            throw new SearchSessionProviderError();
          }

          return (
            <Component {...(props as T)} searchSessionId={searchSessionId} />
          );
        }}
      </SearchSessionContext.Consumer>
    );
  };

  return WrapperComponent;
}

interface SearchKeyProp {
  /**
   * An id that resets the search session id of the search session provider when it changes
   */
  sessionKey: string;
}

type Props = SearchKeyProp;
type State = SessionContext & SearchKeyProp;

/**
 * A search session context provider.
 * This provides all children wrapped with injectSearchSession with the same search session id.
 * Noted a new search session id is generated if and only if this component is mounted.
 */
export class SearchSessionProvider extends React.Component<Props, State> {
  state = {
    sessionKey: this.props.sessionKey,
    searchSessionId: uuid(),
  };

  static getDerivedStateFromProps(props: Props, state: State): State {
    return {
      sessionKey: props.sessionKey,
      searchSessionId:
        props.sessionKey !== state.sessionKey ? uuid() : state.searchSessionId,
    };
  }

  render() {
    const { children } = this.props;
    const { searchSessionId } = this.state;

    return (
      <SearchSessionContext.Provider value={{ searchSessionId }}>
        <SearchDialogAnalyticsContext
          analyticContext={{ searchSessionId }}
          nonPrivacySafeAnalyticContext={{}}
        >
          {children}
        </SearchDialogAnalyticsContext>
      </SearchSessionContext.Provider>
    );
  }
}

export function useSearchSessionId() {
  const { searchSessionId } = useContext(SearchSessionContext);
  if (searchSessionId) {
    return searchSessionId;
  }
  throw new SearchSessionProviderError();
}
