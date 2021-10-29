import React from 'react';

import noop from 'lodash/noop';
import { InjectedIntlProps, injectIntl, IntlProvider } from 'react-intl';
import styled from 'styled-components';

import NoopFlagsProvider from '../../helpers/NoopFlagsProvider';
import IntlContext from '../../src/common/IntlContext';

import Dialog from './Dialog';

type Props = {
  children: React.ReactNode;
};

// The visual regression test runner expects to find something rendered at
// #examples > *:first-child, but this requirement isn't satisfied when the only
// thing displayed is in a portal (e.g. modal). This empty div satisfies the
// requirement while being invisible in the snapshot.
const dummyElementToMakeVrTestsPass = <div />;

const VrWrapperInner = injectIntl(
  ({ intl, children }: InjectedIntlProps & Props) => (
    <IntlContext.Provider value={{ intl }}>
      {dummyElementToMakeVrTestsPass}
      <Dialog isOpen onClose={noop}>
        <NoopFlagsProvider>{children}</NoopFlagsProvider>
      </Dialog>
    </IntlContext.Provider>
  ),
);

/**
 * Visual regression test wrapper.
 */
export default function VrWrapper({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider locale="en">
      <VrWrapperInner>{children}</VrWrapperInner>
    </IntlProvider>
  );
}

/**
 * Style overrides for full-bleed components being VR tested inside a dialog.
 *
 * @param component - the component being tested
 */
export function styledForDialog<P extends { className?: string }>(
  component: React.ComponentType<P>,
) {
  return styled(component)`
    &,
    &:first-child {
      margin: -2px -24px;
    }
  `;
}
