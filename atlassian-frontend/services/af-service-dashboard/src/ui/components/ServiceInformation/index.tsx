/** @jsx jsx */

import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import Toggle from '@atlaskit/toggle';

import request from '../../utils/request';
import { ServiceInformationData } from '../../resources/service-information';
import { Label } from '../Label';
import {
  flex,
  flexAlignCenter,
  nowrap,
  container,
  headerPadding,
  paragraphPadding,
} from './styles';

type ServiceDeploymentLockPayload = {
  serviceName: string;
  isLocked: boolean;
};

export const ServiceInformation: React.FC<ServiceInformationData> = ({
  name,
  description,
  team,
  isLocked,
}) => {
  const [toggled, setToggled] = useState(isLocked);

  const handleIsLockedToggle = () => {
    request
      .post<ServiceDeploymentLockPayload>(
        '/api/action/service-deployment-lock',
        {
          serviceName: name,
          isLocked: !toggled,
        },
      )
      .then(() => {
        setToggled(!toggled);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <React.Fragment>
      <div css={flex}>
        <Label
          title="Team"
          content={team}
          appearance="inprogress"
          isBold={false}
        />
      </div>
      <h1 css={headerPadding}>{name}</h1>
      <div css={container}>
        <p css={paragraphPadding}>{description}</p>
        <div css={flexAlignCenter}>
          <p css={nowrap}>Lock Deployment </p>
          <div>
            <Toggle
              id="toggle-default"
              onChange={handleIsLockedToggle}
              isChecked={toggled}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
