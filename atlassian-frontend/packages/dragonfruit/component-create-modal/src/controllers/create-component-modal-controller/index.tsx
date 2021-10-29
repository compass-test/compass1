import { useCallback, useState } from 'react';

import {
  CompassComponent,
  CompassComponentType,
} from '@atlassian/dragonfruit-graphql';
import { Team } from '@atlassian/dragonfruit-people-teams';
import { buildTeamAri, withContext } from '@atlassian/dragonfruit-utils';

export const useCreateComponentModalInternal: () => [
  {
    isCreateComponentFormOpen: boolean;
    isCreateTeamFormOpen: boolean;
    selectedTeamId: CompassComponent['ownerId'] | null;
    componentType: CompassComponentType;
    componentName: CompassComponent['name'];
  },
  {
    onClickCreateTeam: () => void;
    onTeamCreateSuccess: (teamData: Team) => void;
    onCloseTeamForm: () => void;
    setComponentType: (componentType: CompassComponentType) => void;
    setComponentName: (componentName: CompassComponent['name']) => void;
    setSelectedTeamId: (componentName: CompassComponent['ownerId']) => void;
  },
] = () => {
  const [isCreateComponentFormOpen, setIsCreateComponentFormOpen] = useState(
    true,
  );
  const [isCreateTeamFormOpen, setIsCreateTeamFormOpen] = useState(false);

  const [selectedTeamId, setSelectedTeamId] = useState<
    CompassComponent['ownerId'] | null
  >(null);

  const [componentType, setComponentType] = useState<CompassComponentType>(
    CompassComponentType.SERVICE,
  );
  const [componentName, setComponentName] = useState<CompassComponent['name']>(
    '',
  );

  const onClickCreateTeam = useCallback(() => {
    setIsCreateComponentFormOpen(false);
    setIsCreateTeamFormOpen(true);
  }, [setIsCreateComponentFormOpen, setIsCreateTeamFormOpen]);

  const onTeamCreateSuccess = useCallback(
    (teamData: Team) => {
      setSelectedTeamId(buildTeamAri({ teamId: teamData.id }));
    },
    [setSelectedTeamId],
  );

  const onCloseTeamForm = useCallback(() => {
    setIsCreateComponentFormOpen(true);
    setIsCreateTeamFormOpen(false);
  }, [setIsCreateComponentFormOpen, setIsCreateTeamFormOpen]);

  return [
    {
      isCreateComponentFormOpen,
      isCreateTeamFormOpen,
      selectedTeamId,
      componentType,
      componentName,
    },
    {
      onClickCreateTeam,
      onTeamCreateSuccess,
      onCloseTeamForm,
      setComponentType,
      setComponentName,
      setSelectedTeamId,
    },
  ];
};

export const {
  SharedStateProvider: CreateComponentModalProvider,
  useSharedStateHook: useCreateComponentModalControls,
} = withContext(useCreateComponentModalInternal, {
  provider: 'CreateComponentModalProvider',
  hook: 'useCreateComponentModalControls',
});
