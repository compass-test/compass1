import { useCallback } from 'react';

import {
  CompassLinkType,
  CompassScorecard,
  CompassScorecardCriteria,
  CompassScorecardImportance,
  MutationError,
  UpdateCompassScorecardCriteriaInput,
  UpdateCompassScorecardInput,
  useCreateScorecardCriterias,
  useDeleteScorecardCriterias,
  useUpdateScorecard,
  useUpdateScorecardCriterias,
} from '@atlassian/dragonfruit-graphql';
import { useGetScorecard } from '@atlassian/dragonfruit-scorecards';

import { useErrors } from '../../services/errors';
import { useScorecardFlags } from '../../services/flags';
import { cleanScorecardUpdateInput, createCriteriaInput } from '../utils';

import { sortCriteriaMutations, updateCriteriaInput } from './utils';

export type CriteriaInput = {
  weight: number;
  field: string;
  id: string;
};

export type OwnerFormData = {
  id: string;
  name: string;
};

export interface UpdateFormData {
  description?: string | null | undefined;
  name?: string;
  owner?: OwnerFormData | null;
  importanceSelection?: any;
  componentTypeSelection?: any;
  criterias?: CriteriaInput[];
}

export interface ExistingScorecardCriteria extends CompassScorecardCriteria {
  id: string;
  weight: number;
  __typename: string;
  linkType?: CompassLinkType;
}

export type ExistingScorecard = Pick<
  CompassScorecard,
  'name' | 'owner' | 'componentType' | 'description' | 'importance'
> & {
  criterias: ExistingScorecardCriteria[];
};

export const useUpdateScorecardController: (
  scorecardId: string,
) => [
  {
    updateScorecard: (formData: UpdateFormData, scorecardId: string) => void;
  },
] = (scorecardId) => {
  const [handleUpdate] = useUpdateScorecard();
  const [handleCreateCriterias] = useCreateScorecardCriterias();
  const [handleDeleteScorecardCriterias] = useDeleteScorecardCriterias();
  const [handleUpdateCriterias] = useUpdateScorecardCriterias();

  const { showScorecardUpdateErrorFlag } = useScorecardFlags();

  const { data } = useGetScorecard({ id: scorecardId });
  const { handleFormErrors } = useErrors();

  const existingScorecard = data?.compass?.scorecard as ExistingScorecard;

  const updateScorecard = useCallback(
    async (formData: UpdateFormData, scorecardId: string) => {
      try {
        let criteriaUpdates: UpdateCompassScorecardCriteriaInput[] = [];
        let allMutationResult = [];

        // Couple cases to handle here
        // If the formData has any criteria in it then we need to check for updates
        // If the formData has 0 criteria but that existing scorecard does then we are
        // deleting all existing criteria so we still need to update.
        if (
          formData.criterias ||
          (!formData.criterias && existingScorecard.criterias)
        ) {
          const sortedMutations = sortCriteriaMutations(
            formData,
            existingScorecard,
          );

          if (sortedMutations.delete.length) {
            // handle criteriaDeletes
            const deleteCriterias = handleDeleteScorecardCriterias(
              scorecardId,
              { criterias: sortedMutations.delete },
            );

            const deleteCriteriasResult = await deleteCriterias;
            allMutationResult.push(deleteCriteriasResult);
          }

          if (sortedMutations.update.length) {
            // handle criteriaUpdates
            criteriaUpdates = updateCriteriaInput(sortedMutations.update);

            const updateCriterias = handleUpdateCriterias(scorecardId, {
              criterias: criteriaUpdates,
            });

            const updateCriteriasResult = await updateCriterias;
            allMutationResult.push(updateCriteriasResult);
          }

          if (sortedMutations.create.length) {
            // handle criteriaCreates
            const criteriaCreations = createCriteriaInput(
              sortedMutations.create,
            );

            const createCriterias = handleCreateCriterias(scorecardId, {
              criterias: criteriaCreations,
            });

            const createCriteriasResult = await createCriterias;
            allMutationResult.push(createCriteriasResult);
          }

          const formImportanceValue = formData.importanceSelection?.value
            ? formData.importanceSelection?.value.toUpperCase()
            : formData.importanceSelection;
          const formImportance = Object.keys(CompassScorecardImportance).find(
            (key) =>
              CompassScorecardImportance[
                key as keyof typeof CompassScorecardImportance
              ]
                .toString()
                .toUpperCase() === formImportanceValue,
          );

          const formComponentType = formData.componentTypeSelection?.value
            ? formData.componentTypeSelection.value.toUpperCase()
            : formData.componentTypeSelection;

          // Get data in the right format and then remove anything that is null
          const compassScorecardInput: UpdateCompassScorecardInput = {
            name:
              formData.name !== existingScorecard?.name ? formData.name : null,
            description:
              formData.description !== existingScorecard?.description
                ? formData.description
                : null,
            importance:
              formImportance &&
              formImportance !== existingScorecard?.importance.toString()
                ? CompassScorecardImportance[
                    formImportance as keyof typeof CompassScorecardImportance
                  ]
                : null,
            componentType:
              formComponentType !== existingScorecard?.componentType
                ? formComponentType
                : null,
          };

          const updateScorecardInput: UpdateCompassScorecardInput = cleanScorecardUpdateInput(
            compassScorecardInput,
          );

          // Need to handle owner as a special case, as we allow owner to be removable
          if (formData?.owner?.id) {
            if (formData?.owner?.id !== existingScorecard?.owner?.accountId) {
              updateScorecardInput['ownerId'] = formData?.owner?.id;
            }
          } else {
            updateScorecardInput['ownerId'] = null;
          }

          if (Object.keys(updateScorecardInput).length > 0) {
            // Fire off the update Scorecard mutation without criteria
            const updateScorecard = handleUpdate({
              scorecardId: scorecardId,
              compassScorecardInput: updateScorecardInput,
            });

            const updateScorecardResult = await updateScorecard;

            allMutationResult.push(updateScorecardResult);
          }

          const mutationErrors: MutationError[] = allMutationResult.flatMap(
            (mutation) => {
              let result: any = mutation?.data?.compass;

              if (result.updateScorecard && !result.updateScorecard.success) {
                return result.updateScorecard.errors;
              }
            },
          );

          const formErrors = handleFormErrors(mutationErrors);

          if (formErrors) {
            return formErrors;
          }
        }
      } catch (error) {
        // Unhandled error - display flag and throw error to be captured in Sentry
        // TODO Confirm with designer if we want a different flag for partial success.
        showScorecardUpdateErrorFlag();
        throw error;
      }
    },
    [
      existingScorecard,
      handleFormErrors,
      handleDeleteScorecardCriterias,
      handleCreateCriterias,
      handleUpdateCriterias,
      handleUpdate,
      showScorecardUpdateErrorFlag,
    ],
  );

  return [
    {
      updateScorecard,
    },
  ];
};
