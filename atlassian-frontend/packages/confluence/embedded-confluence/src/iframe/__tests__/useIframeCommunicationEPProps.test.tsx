import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { ObservableObject } from '../../observable-object';
import { useIframeCommunicateEPReactProps } from '../useIframeCommunicateEPProps';
import type { IframeElement } from '../IframeElementType';

const mockedProps = {
  spaceKey: '123',
  contentId: '456',
  parentProductContentContainerId: 'parent-1',
  parentProduct: 'JSM',
  onClose: () => {},
  setExperiencesForwarding: jest.fn(),
};
const mockedIframeRef = {
  current: {},
} as React.RefObject<IframeElement>;
const mockedSrc = '/test/123';

it('can receive embeddable page props', async () => {
  renderHook(() =>
    useIframeCommunicateEPReactProps(mockedIframeRef, mockedSrc, mockedProps),
  );

  const observable = mockedIframeRef?.current?.[
    '__EP_REACT_PROPS_OBSERVABLE_OBJECT__'
  ] as ObservableObject<typeof mockedProps> | undefined;

  expect(observable?.object).toEqual(mockedProps);
});

it('can set src on iframe', () => {
  renderHook(() =>
    useIframeCommunicateEPReactProps(mockedIframeRef, mockedSrc, mockedProps),
  );

  expect(mockedIframeRef?.current?.src).toBe(mockedSrc);
});
