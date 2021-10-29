import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';

import {
  LocalComponent,
  RecentComponentsProvider,
  useRecentComponents,
} from './index';

const wrapper: React.FC = ({ children }) => (
  <ApolloAutoMockProvider>
    <RecentComponentsProvider>{children}</RecentComponentsProvider>
  </ApolloAutoMockProvider>
);

const testComponent: LocalComponent = {
  id: '1234',
  name: 'test component',
  type: CompassComponentType.SERVICE,
  ownerId: '6789',
  ownerName: 'test owner name',
};

describe('useRecentComponentsController', () => {
  describe('initial behavior', () => {
    it('defaults to the local components being empty', () => {
      const { result } = renderHook(() => useRecentComponents(), {
        wrapper,
      });

      const [{ localComponents, highlightedComponents }] = result.current;

      expect(highlightedComponents).toEqual(0);
      expect(localComponents).toEqual([]);
    });
  });

  describe('mutations', () => {
    describe('add component', () => {
      it('sets the proper state when component is added', () => {
        const { result } = renderHook(() => useRecentComponents(), {
          wrapper,
        });

        const [, { addComponent }] = result.current;

        act(() => {
          addComponent(testComponent);
        });

        const [{ localComponents, highlightedComponents }] = result.current;

        expect(localComponents).toEqual([testComponent]);
        expect(highlightedComponents).toEqual(1);
      });

      it('sets highlighted components correctly when a component is added', () => {
        const { result } = renderHook(() => useRecentComponents(), {
          wrapper,
        });

        const [, { addComponent }] = result.current;

        act(() => {
          addComponent(testComponent);
        });

        const [{ highlightedComponents }] = result.current;

        expect(highlightedComponents).toEqual(1);
      });

      it('removes highlighted component when timeout complete', () => {
        jest.useFakeTimers();

        const { result } = renderHook(() => useRecentComponents(), {
          wrapper,
        });

        const [, { addComponent }] = result.current;

        act(() => {
          addComponent(testComponent);
        });

        jest.runAllTimers();

        const [{ highlightedComponents }] = result.current;

        expect(highlightedComponents).toEqual(0);
      });
    });

    describe('remove component', () => {
      it('removes component from local components when removeComponent is called', async () => {
        const { result } = renderHook(() => useRecentComponents(), {
          wrapper,
        });

        const [, { addComponent }] = result.current;

        act(() => {
          addComponent(testComponent);
        });

        let [{ localComponents }, { removeComponent }] = result.current;

        expect(localComponents).toEqual([testComponent]);

        act(() => {
          removeComponent(testComponent.id);
        });

        [{ localComponents }] = result.current;

        expect(localComponents).toEqual([]);
      });
    });
  });
});
