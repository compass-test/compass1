/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, shallow } from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';

const messages = {};

const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

export const mockIntl = intl;

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node: React.ReactElement) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node: React.ReactElement): any {
  return shallow(nodeWithIntlProp(node), { context: { intl } });
}

export function mountWithIntl(node: React.ReactElement): any {
  return mount(nodeWithIntlProp(node), {
    context: { intl },
    childContextTypes: { intl: intlShape },
  });
}
