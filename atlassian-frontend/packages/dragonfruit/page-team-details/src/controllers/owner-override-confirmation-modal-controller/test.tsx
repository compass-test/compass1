import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';

import { useConfirmationModalController } from './index';

const mockInput = {
  componentId: 'mockId',
  componentName: 'mockName',
  componentType: CompassComponentType.LIBRARY,
};

const onFormSubmit = () => Promise.resolve();

const wrapper: React.FC = ({ children }) => (
  <ApolloAutoMockProvider>{children}</ApolloAutoMockProvider>
);

describe('useConfirmationModalController', () => {
  describe('initial behavior', () => {
    it('defaults to the modal being closed', () => {
      const { result } = renderHook(
        () => useConfirmationModalController({ onSubmit: onFormSubmit }),
        {
          wrapper,
        },
      );
      const [{ isOpen }] = result.current;

      expect(isOpen).toEqual(false);
    });
  });

  describe('mutations', () => {
    describe('open/close', () => {
      it('sets the proper state when open/close actions called', () => {
        const { result } = renderHook(
          () => useConfirmationModalController({ onSubmit: onFormSubmit }),
          {
            wrapper,
          },
        );

        const [, { open }] = result.current;

        act(() => {
          open();
        });

        let [{ isOpen }, { close }] = result.current;

        expect(isOpen).toEqual(true);

        act(() => {
          close();
        });

        [{ isOpen }] = result.current;

        expect(isOpen).toEqual(false);
      });
    });

    describe('submit modal', () => {
      it('click on save resets the modal', async () => {
        const { result } = renderHook(
          () => useConfirmationModalController({ onSubmit: onFormSubmit }),
          {
            wrapper,
          },
        );

        const [, { open }] = result.current;

        act(() => {
          open();
        });

        let [{ isOpen, onSubmit }, { setComponent }] = result.current;

        setComponent(
          mockInput.componentId,
          mockInput.componentName,
          mockInput.componentType,
        );
        // Submit form, modal should close if submission is successful
        await onSubmit();

        [{ isOpen }] = result.current;

        expect(isOpen).toEqual(false);
      });
    });
  });
});
