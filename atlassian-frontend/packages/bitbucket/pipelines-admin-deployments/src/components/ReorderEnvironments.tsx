import React, { useCallback, useMemo } from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import MoreIcon from '@atlaskit/icon/glyph/more';
import {
  Capabilities,
  Environment,
  RepositoryAssociationSummary,
} from '@atlassian/pipelines-models';

import {
  CreateBranchRestriction,
  CreateEnvironment,
  DeleteBranchRestriction,
  DeleteEnvironment,
  FetchBranches,
  RenderVariableList,
  ReorderEnvironments as ReorderEnvironmentsType,
  UpdateEnvironment,
} from '../types';

import EnvironmentItem from './EnvironmentItem';
import { DragHandle } from './styled';

type Props = {
  capabilities: Capabilities;
  createBranchRestriction: CreateBranchRestriction;
  createEnvironment: CreateEnvironment;
  deleteBranchRestriction: DeleteBranchRestriction;
  deleteEnvironment: DeleteEnvironment;
  environments: Environment[];
  environmentTypes: { [type: string]: Environment[] };
  fetchBranches: FetchBranches;
  getIsUpdatingAdminRestriction: (environmentUuid: string) => boolean;
  getIsUpdatingBranchRestriction: (environmentUuid: string) => boolean;
  getIsUpdatingDeploymentGating: (environmentUuid: string) => boolean;
  isFetchingDashboard: boolean;
  isUpdatingEnvironmentList: boolean;
  maxDeploymentEnvironments: number;
  reorderEnvironments: ReorderEnvironmentsType;
  repositoryAssociationSummary: RepositoryAssociationSummary;
  updateEnvironment: UpdateEnvironment;
  renderVariableList: RenderVariableList;
};

const reorder = (
  environments: Environment[],
  startIndex: number,
  endIndex: number,
) => {
  const newEnvironments = [...environments];
  const [removed] = newEnvironments.splice(startIndex, 1);
  newEnvironments.splice(endIndex, 0, removed);
  return newEnvironments;
};

const ReorderEnvironments: React.FC<Props> = ({
  environments,
  getIsUpdatingAdminRestriction,
  getIsUpdatingBranchRestriction,
  getIsUpdatingDeploymentGating,
  isUpdatingEnvironmentList,
  reorderEnvironments,
  ...props
}) => {
  const environmentType = useMemo(() => environments[0]?.type, [environments]);

  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }
      const environmentsInOrder = reorder(
        environments,
        result.source.index,
        result.destination.index,
      );
      if (
        !(
          JSON.stringify(environmentsInOrder.map((e) => e.uuid)) ===
          JSON.stringify(environments.map((e) => e.uuid))
        )
      ) {
        reorderEnvironments(
          environmentType,
          environmentsInOrder.map((e) => ({ uuid: e.uuid })),
        );
      }
    },
    [environments, environmentType, reorderEnvironments],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(dropProvided) => (
          <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
            {environments.map((environment: Environment, index) => (
              <Draggable
                key={`draggable_key_${environment.uuid}`}
                draggableId={`draggable_id_${environment.uuid}`}
                index={index}
              >
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                  >
                    <DragHandle
                      {...dragProvided.dragHandleProps}
                      isDisabled={isUpdatingEnvironmentList}
                    >
                      <MoreIcon label="more" />
                    </DragHandle>
                    <EnvironmentItem
                      {...props}
                      environment={environment}
                      environments={environments}
                      isUpdatingAdminRestriction={getIsUpdatingAdminRestriction(
                        environment.uuid,
                      )}
                      isUpdatingBranchRestriction={getIsUpdatingBranchRestriction(
                        environment.uuid,
                      )}
                      isUpdatingDeploymentGating={getIsUpdatingDeploymentGating(
                        environment.uuid,
                      )}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(ReorderEnvironments);
