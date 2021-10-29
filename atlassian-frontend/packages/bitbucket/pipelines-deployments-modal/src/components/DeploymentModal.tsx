import React, { useEffect, useState } from 'react';

import Button from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { N500 } from '@atlaskit/theme/colors';
import { Deployment, Environment } from '@atlassian/pipelines-models';

import { ModalType } from '../types';

import DeploymentSummary from './DeploymentSummary';
import { Loading } from './styled';

const getModalHeading = (
  deployment: Deployment,
  environment: Environment | undefined,
  modalType: ModalType,
) => {
  if (deployment.uuid === '') {
    return <div>Deployment</div>;
  }
  switch (modalType) {
    case ModalType.SUMMARY:
    case ModalType.STEP_SUMMARY:
      return (
        <div>
          Build{' '}
          <a href={deployment.deployable.url} target="_top">
            {deployment.deployable.name}
          </a>{' '}
          was deployed to <strong>{deployment['environment.name']}</strong>{' '}
          environment
        </div>
      );
    case ModalType.PREVIEW:
    case ModalType.STEP_PREVIEW:
      return (
        <div>
          Deploy build{' '}
          <a href={deployment.deployable.url} target="_top">
            {deployment.deployable.name}
          </a>{' '}
          to <strong>{environment?.name}</strong> environment
        </div>
      );
    case ModalType.REDEPLOY:
    case ModalType.STEP_REDEPLOY:
      return (
        <div>
          Redeploy build{' '}
          <a href={deployment.deployable.url} target="_top">
            {deployment.deployable.name}
          </a>{' '}
          to <strong>{deployment['environment.name']}</strong> environment
        </div>
      );
    default:
      return <div>Deployment</div>;
  }
};

type Props = {
  onCloseModal: () => void;
  onDeploy?: () => void;
  modalType: ModalType;
  environment?: Environment;
  deployment: Deployment;
  lastSuccessfulDeployment?: Deployment;
  previousDeployment?: Deployment;
  hideDeployButton?: boolean;
  hasDeploymentGate?: boolean;
  children?: React.ReactNode;
};

const DeploymentModal: React.FC<Props> = ({
  onCloseModal,
  onDeploy,
  modalType,
  environment,
  deployment,
  lastSuccessfulDeployment,
  previousDeployment,
  hasDeploymentGate,
  hideDeployButton,
  children,
}) => {
  const [isTransitionState, setIsTransitionState] = useState(
    deployment.uuid === '',
  );

  useEffect(() => {
    if (deployment.uuid !== '') {
      setIsTransitionState(false);
    }
  }, [deployment]);

  const tryDeploy = () => {
    setIsTransitionState(true);
    onDeploy?.();
  };

  const getModalPrimaryAction = () => {
    switch (modalType) {
      case ModalType.PREVIEW:
        return 'Deploy';

      case ModalType.REDEPLOY:
      case ModalType.STEP_REDEPLOY:
        return hasDeploymentGate ? 'Request change' : 'Redeploy';

      case ModalType.STEP_PREVIEW:
        return hasDeploymentGate ? 'Request change' : 'Deploy';
    }
  };

  const renderDeploymentSummary = () => {
    switch (modalType) {
      case ModalType.SUMMARY:
      case ModalType.STEP_SUMMARY:
        return (
          <DeploymentSummary
            deployment={deployment}
            lastSuccessfulDeployment={lastSuccessfulDeployment}
            environment={
              new Environment({
                name: deployment.environmentName,
              })
            }
          />
        );
      case ModalType.REDEPLOY:
      case ModalType.STEP_REDEPLOY:
      case ModalType.STEP_PREVIEW:
        return (
          <DeploymentSummary
            deployment={deployment}
            previousDeployment={previousDeployment}
            environment={
              new Environment({
                name: deployment && deployment['environment.name'],
              })
            }
          />
        );
      case ModalType.PREVIEW:
        return (
          <DeploymentSummary
            deployment={deployment}
            previousDeployment={previousDeployment}
            environment={environment}
          />
        );
    }
  };

  return (
    <ModalTransition>
      <Modal onClose={onCloseModal} width={'1040px'}>
        <ModalHeader>
          <ModalTitle>
            {getModalHeading(deployment, environment, modalType)}
          </ModalTitle>
          <Button appearance="link" onClick={onCloseModal}>
            <CrossIcon label="Close modal" primaryColor={N500} />
          </Button>
        </ModalHeader>
        <ModalBody>
          {isTransitionState ? (
            <Loading>
              <Spinner size="large" />
            </Loading>
          ) : (
            renderDeploymentSummary()
          )}
          {children}
        </ModalBody>
        <ModalFooter>
          {modalType !== ModalType.SUMMARY &&
          modalType !== ModalType.STEP_SUMMARY &&
          !hideDeployButton ? (
            <Button
              appearance="primary"
              onClick={tryDeploy}
              isDisabled={isTransitionState}
              autoFocus
            >
              {getModalPrimaryAction()}
            </Button>
          ) : null}
          <Button appearance="subtle" onClick={onCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </ModalTransition>
  );
};

export default React.memo(DeploymentModal);
