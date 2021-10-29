import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import { di } from 'react-magnetic-di';

import { useFlags } from '@atlaskit/flag';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { CompassScorecard } from '@atlassian/dragonfruit-graphql';
import { useGetScorecard } from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useUpdateScorecardController } from '../../../controllers/update-scorecard';
import { useValidations } from '../../../services/validations';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import ScorecardBaseModal from '../scorecard-base-modal';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  scorecardId: string;
  testId: string;
  isModalOpen: boolean;
}

const EditScorecardModal: React.FC<Props> = ({
  onSubmit,
  onCancel,
  scorecardId,
  testId,
  isModalOpen,
}) => {
  di(useGetScorecard);
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const { data, loading, error } = useGetScorecard({ id: scorecardId });
  const { handleFormValidation } = useValidations();

  const existingScorecard = data?.compass?.scorecard as CompassScorecard;

  const [{ updateScorecard }] = useUpdateScorecardController(scorecardId);

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

    return updateScorecard(newFormData, scorecardId);
  };

  // We intentionally do not have a spinner loading state here, just wait until the data is loaded to show modal
  if (loading) {
    return null;
  }

  if (
    (scorecardId && existingScorecard === null) ||
    data?.compass?.scorecard?.__typename === 'QueryError' ||
    error !== undefined
  ) {
    onCancel();

    const flag = {
      ...BaseErrorFlagProps,
      id: `dragonfruit-scorecard-templates.scorecard-form.error-flag`,
      title: formatMessage(CommonMessages.somethingWentWrongFullStop),
      description: formatMessage(
        CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
      ),
      testId: `dragonfruit-scorecard-templates.scorecard-form.error-flag`,
    };
    showFlag(flag);

    return <></>;
  }

  return (
    <ScorecardBaseModal
      onSubmit={onSubmit}
      onCancel={onCancel}
      testId={`${testId}-edit-scorecard`}
      mutationCallback={handleMutations}
      scorecard={existingScorecard}
      isModalOpen={isModalOpen}
    />
  );
};
export default EditScorecardModal;
