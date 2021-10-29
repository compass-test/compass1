import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import React, { ReactElement } from 'react';
import {
  InjectedIntlProps,
  IntlProvider,
  intlShape,
  FormattedMessage,
} from 'react-intl';

export function getSearchResultSectionTitleText(
  section: ShallowWrapper<any, any, any>,
) {
  return shallowWithIntl(section.prop('title') as JSX.Element).text();
}

export function assertSearchResultSectionsHaveTitles(
  sections: ShallowWrapper<any, any, any>,
  titles: FormattedMessage.MessageDescriptor[],
) {
  // eslint-disable-next-line no-undef
  expect(sections.map(getSearchResultSectionTitleText)).toEqual(
    titles.map((m) => m.defaultMessage),
  );
}

/**
 * Copied from @atlaskit
 *
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en' });
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node: ReactElement<any>) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl<P>(
  node: ReactElement<P>,
  { context = {}, ...additionalOptions } = {},
): ShallowWrapper<P & InjectedIntlProps> {
  if (typeof node.type !== 'string' && node.type.name === 'InjectIntl') {
    const unwrappedType = (node.type as any).WrappedComponent;
    // eslint-disable-next-line no-param-reassign
    (node as any) = React.createElement(unwrappedType, node.props);
  }
  return shallow(
    nodeWithIntlProp(node) as ReactElement<P & InjectedIntlProps>,
    {
      context: { ...context, intl },
      ...additionalOptions,
    },
  );
}

export function mountWithIntl<P, S>(
  node: ReactElement<P>,
  { context = {}, childContextTypes = {}, ...additionalOptions } = {},
): ReactWrapper<P & InjectedIntlProps, S, any> {
  if (typeof node.type !== 'string' && node.type.name === 'InjectIntl') {
    const unwrappedType = (node.type as any).WrappedComponent;
    // eslint-disable-next-line no-param-reassign
    (node as any) = React.createElement(unwrappedType, node.props);
  }
  return mount(nodeWithIntlProp(node) as ReactElement<P & InjectedIntlProps>, {
    context: { ...context, intl },
    childContextTypes: { ...childContextTypes, intl: intlShape },
    ...additionalOptions,
  });
}
