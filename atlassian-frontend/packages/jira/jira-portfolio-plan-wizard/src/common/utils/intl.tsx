import React, { Component, useContext } from 'react';

import { InjectedIntl, IntlProvider, intlShape } from 'react-intl';

const Context = React.createContext<InjectedIntl>(
  new IntlProvider({ locale: 'en' }).getChildContext().intl,
);

export class IntlHookProvider extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const { intl } = this.context;
    return (
      <Context.Provider value={intl}>{this.props.children}</Context.Provider>
    );
  }
}

export const useIntl = (): InjectedIntl => {
  return useContext<InjectedIntl>(Context);
};
