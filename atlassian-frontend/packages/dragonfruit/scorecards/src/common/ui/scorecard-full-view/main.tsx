import React from 'react';

import { di } from 'react-magnetic-di';
import { useRouterActions } from 'react-resource-router';

import Button from '@atlaskit/button/standard-button';
import Modal, {
  ModalHeaderProps as HeaderComponentProps,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTransition,
  OnCloseHandler,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { useGetComponentScorecardWithScoresById } from '../../../services/get-component-scorecard-with-scores-by-id';
import Criterias from '../criterias';
import Loading from '../loading';
import { ScorecardFragment } from '../types';

import Details from './details';
import Error from './error';
import messages from './messages';
import { CriteriasWrapper, CustomModalHeader, ModalDivider } from './styled';
import Summary from './summary';

export const ScorecardFullView = ({
  componentId,
  componentName,
  scorecardId,
  onClose,
  testId = 'scorecard-full-view',
}: {
  componentId: string;
  componentName: string;
  scorecardId: string;
  onClose: Function;
  testId?: string;
}) => {
  di(useGetComponentScorecardWithScoresById);

  const { formatMessage } = useIntl();
  const { push } = useRouterActions();
  const { loading, error, data } = useGetComponentScorecardWithScoresById(
    componentId,
    scorecardId,
  );

  if (error) {
    return <Error onClose={onClose} testId={`${testId}-error`} />;
  }

  const scorecard = data?.compass?.scorecard as ScorecardFragment;
  const totalScore = scorecard?.scorecardScore?.totalScore ?? 0;
  const maxTotalScore = scorecard?.scorecardScore?.maxTotalScore ?? 0;
  const progress = Math.floor((totalScore / maxTotalScore) * 100);
  const criterias = scorecard?.criterias || [];

  // When the data is loading, we should fix the height at 600px around the spinner
  // Once the data has loaded, the modal height should be responsive to the content
  const MODAL_HEIGHT = loading ? 600 : 'auto';

  const CustomHeader = (props: HeaderComponentProps) => {
    // Make sure data has loaded, otherwise header should be empty
    return !loading ? (
      <ModalDivider>
        <ModalHeader {...props}>
          <CustomModalHeader>
            <Summary
              scorecardName={scorecard.name}
              scorecardDescription={scorecard.description}
              progress={progress}
            />
            <Details
              ownerName={scorecard.owner?.name}
              ownerPicture={scorecard.owner?.picture}
              componentType={scorecard.componentType}
              componentName={componentName}
              importance={scorecard.importance}
            />
          </CustomModalHeader>
        </ModalHeader>
      </ModalDivider>
    ) : null;
  };

  const onClickManageScorecards = () => {
    push(routes.SCORECARD_LIST());
  };

  return (
    <ModalTransition>
      <Modal
        testId={testId}
        onClose={onClose as OnCloseHandler}
        height={MODAL_HEIGHT}
      >
        <CustomHeader />
        <ModalBody>
          {loading ? (
            <Loading
              height={'100%'}
              spinnerSize={'large'}
              testId={'scorecard-full-view-loading'}
            />
          ) : (
            <CriteriasWrapper>
              <Criterias
                criterias={criterias}
                showWeight={true}
                headingCase={'upperCase'}
              />
            </CriteriasWrapper>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            appearance="subtle"
            onClick={onClickManageScorecards}
            autoFocus
          >
            {formatMessage(messages.manageScorecards)}
          </Button>
          <Button
            appearance="primary"
            onClick={onClose as OnCloseHandler}
            autoFocus
          >
            {formatMessage(CommonMessages.close)}
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTransition>
  );
};

export default withErrorBoundary(ScorecardFullView, {
  componentName: 'ScorecardFullView',
  Fallback: Error,
});
