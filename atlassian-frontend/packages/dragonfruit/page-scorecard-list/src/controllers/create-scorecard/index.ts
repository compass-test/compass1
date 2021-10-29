import { useCallback } from 'react';

import { FetchResult } from '@apollo/client';

import {
  CreateScorecardMutation,
  MutationError,
  useCreateScorecard,
} from '@atlassian/dragonfruit-graphql';

import { useErrors } from '../../services/errors';
import { useScorecardFlags } from '../../services/flags';
import { createCriteriaInput } from '../utils';

export type CriteriaInput = {
  weight: number;
  field: string;
  id: string;
};

export type OwnerFormData = {
  id: string;
  name: string;
};

export interface CreateFormData {
  description: string | null | undefined;
  name: string;
  owner: OwnerFormData;
  importanceSelection: any;
  componentTypeSelection: any;
  criterias: CriteriaInput[];
  ownerName: string;
}

export const useCreateScorecardController: () => [
  {
    createScorecard: (formData: CreateFormData, cloudId: string) => void;
  },
] = () => {
  const [handleCreate] = useCreateScorecard();

  const {
    showScorecardUpdateSuccessFlag,
    showScorecardCreateErrorFlag,
    showScorecardCreateSuccessFlag,
  } = useScorecardFlags();

  const { handleFormErrors } = useErrors();

  const createScorecard = useCallback(
    async (formData: CreateFormData, cloudId: string) => {
      try {
        let mutation = handleCreate(cloudId, {
          name: formData.name,
          description: formData.description,
          importance: formData.importanceSelection,
          ownerName: formData.owner?.name,
          ownerId: formData.owner?.id,
          componentType: formData.componentTypeSelection,
          criterias: createCriteriaInput(formData.criterias || []),
        });

        const mutationResult: FetchResult<CreateScorecardMutation> = await mutation;

        if (mutationResult?.data?.compass?.createScorecard?.success) {
          showScorecardCreateSuccessFlag();
        } else {
          const formErrors = handleFormErrors(
            mutationResult?.data?.compass?.createScorecard
              ?.errors as MutationError[],
          );

          if (formErrors) {
            return formErrors;
          } else {
            showScorecardUpdateSuccessFlag();
          }
        }
      } catch (error) {
        showScorecardCreateErrorFlag();
        throw error;
      }
    },
    [
      handleCreate,
      handleFormErrors,
      showScorecardCreateErrorFlag,
      showScorecardCreateSuccessFlag,
      showScorecardUpdateSuccessFlag,
    ],
  );

  return [
    {
      createScorecard,
    },
  ];
};
