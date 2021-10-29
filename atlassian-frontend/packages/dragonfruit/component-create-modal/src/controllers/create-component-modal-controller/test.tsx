import React from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { ApolloAutoMockProvider } from '@atlassian/dragonfruit-graphql/mocks';
import { Team } from '@atlassian/dragonfruit-people-teams';

import { MOCK_TEAM } from './mocks';

import {
  CreateComponentModalProvider,
  useCreateComponentModalControls,
} from './index';

const wrapper: React.FC = ({ children }) => (
  <ApolloAutoMockProvider>
    <CreateComponentModalProvider>{children}</CreateComponentModalProvider>
  </ApolloAutoMockProvider>
);

describe('useCreateComponentModalController', () => {
  describe('initial behavior', () => {
    it('defaults to the modal being closed', () => {
      const { result } = renderHook(() => useCreateComponentModalControls(), {
        wrapper,
      });
      const [
        {
          isCreateComponentFormOpen,
          isCreateTeamFormOpen,
          selectedTeamId,
          componentType,
          componentName,
        },
      ] = result.current;

      expect(isCreateComponentFormOpen).toEqual(true);
      expect(isCreateTeamFormOpen).toEqual(false);
      expect(selectedTeamId).toEqual(null);
      expect(componentName).toEqual('');
      expect(componentType).toEqual(CompassComponentType.SERVICE);
    });
  });

  describe('mutations', () => {
    describe('click create team', () => {
      it('sets the proper state when create team is clicked', () => {
        const { result } = renderHook(() => useCreateComponentModalControls(), {
          wrapper,
        });

        const [, { onClickCreateTeam }] = result.current;

        act(() => {
          onClickCreateTeam();
        });

        const [
          { isCreateComponentFormOpen, isCreateTeamFormOpen },
        ] = result.current;

        expect(isCreateComponentFormOpen).toEqual(false);
        expect(isCreateTeamFormOpen).toEqual(true);
      });
    });

    describe('submit team form', () => {
      it('successfully creating team sets team info', async () => {
        const { result } = renderHook(() => useCreateComponentModalControls(), {
          wrapper,
        });

        const [, { onTeamCreateSuccess }] = result.current;

        act(() => {
          onTeamCreateSuccess(MOCK_TEAM as Team);
        });

        let [{ selectedTeamId }] = result.current;

        expect(selectedTeamId).toEqual(`ari:cloud:teams::team/${MOCK_TEAM.id}`);
      });
    });
  });
});
