import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import { di } from 'react-magnetic-di';

import { useGetScorecard } from '@atlassian/dragonfruit-scorecards';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';

import { useCreateScorecardController } from '../../../controllers/create-scorecard';
import { useValidations } from '../../../services/validations';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import ScorecardBaseModal from '../scorecard-base-modal';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  testId: string;
  isModalOpen: boolean;
}

const CreateScorecardModal: React.FC<Props> = ({
  onSubmit,
  onCancel,
  testId,
  isModalOpen,
}) => {
  di(useGetScorecard);
  const { handleFormValidation } = useValidations();

  const { cloudId } = useTenantInfo();
  // We need to pass an empty string to the controller for creating scorecard
  const [{ createScorecard }] = useCreateScorecardController();

  const handleMutations = (formData: any): any => {
    /* Because of some bugs where incorrect formData for criteria rows was being submitted, updated the
    "name"s of each criteria "Field" to use the id and not just the index of the criteria, resulting in
    a slightly different data shape for the criterias.
    Because validations and other consumers of formData expect an array of criterias,
    we copy the data and reassign criterias as an array to minimize changes. */
    const newFormData = cloneDeep(formData);
    newFormData.criterias = Object.values(formData.criterias);

    // Whole formData validation, such as validating the weights sum to 100%
    const errors = handleFormValidation(newFormData);

    if (errors) {
      return errors;
    }

    return createScorecard(newFormData, cloudId);
  };

  return (
    <ScorecardBaseModal
      onSubmit={onSubmit}
      onCancel={onCancel}
      testId={`${testId}-create-with-base-modal`}
      mutationCallback={handleMutations}
      isModalOpen={isModalOpen}
    />
  );
};
export default CreateScorecardModal;
