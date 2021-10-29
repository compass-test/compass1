import React, { useEffect, useState } from 'react';

import ModalDialog, { ModalBody } from '@atlaskit/modal-dialog';

import { getPipeReadme } from '../utils/getPipeReadme';

import PipeModalHeader from './PipeModalHeader';
import PipeTabs from './PipeTabs';
import StepTabs from './StepTabs';
import {
  PipeDetailHeader,
  PipeDetailHeading,
  PipeDetailIcon,
  PipeDetailInfo,
  PipeDetailMaintainer,
  PipeDetailStepIcon,
  PipeDetailWrapper,
} from './styled';

type Props = {
  pipe: any;
  onCloseDialog: () => void;
};

const PipeDetail: React.FC<Props> = ({ pipe, onCloseDialog }) => {
  const [pipeReadme, setPipeReadme] = useState<string>();

  useEffect(() => {
    getPipeReadme(pipe).then(setPipeReadme);
  }, [pipe]);

  return (
    <ModalDialog onClose={onCloseDialog} width="large" height="80vh">
      <PipeModalHeader />
      <ModalBody>
        <PipeDetailWrapper>
          <PipeDetailHeader>
            {typeof pipe.logo === 'string' ? (
              <PipeDetailIcon>
                <img src={pipe.logo} alt={pipe.name} />
              </PipeDetailIcon>
            ) : (
              <PipeDetailStepIcon>{pipe.logo}</PipeDetailStepIcon>
            )}
            <PipeDetailHeading>
              <h2>{pipe.name}</h2>
              <span>{pipe.version && `v${pipe.version}`}</span>
              {pipe.maintainer && (
                <PipeDetailMaintainer>
                  maintained by{' '}
                  <a href={pipe.maintainer.website} target="_blank">
                    {pipe.maintainer.name}
                  </a>
                </PipeDetailMaintainer>
              )}
            </PipeDetailHeading>
          </PipeDetailHeader>
          <PipeDetailInfo>
            {pipe.version === undefined ? (
              <StepTabs step={pipe} />
            ) : pipeReadme ? (
              <PipeTabs pipeReadme={pipeReadme} />
            ) : null}
          </PipeDetailInfo>
        </PipeDetailWrapper>
      </ModalBody>
    </ModalDialog>
  );
};

export default React.memo(PipeDetail);
