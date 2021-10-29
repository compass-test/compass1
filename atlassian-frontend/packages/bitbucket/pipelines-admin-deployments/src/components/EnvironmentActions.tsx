import React from 'react';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { Environment } from '@atlassian/pipelines-models';

import { DeleteEnvironment } from '../types';

import { EnvironmentActionsWrapper } from './styled';

type Props = {
  deleteEnvironment: DeleteEnvironment;
  environment: Environment;
};

const EnvironmentActions: React.FC<Props> = ({
  deleteEnvironment,
  environment,
}) => {
  return (
    <EnvironmentActionsWrapper>
      <DropdownMenu
        triggerType="button"
        triggerButtonProps={{
          appearance: 'subtle',
          spacing: 'none',
          iconBefore: <MoreIcon label="More" />,
        }}
        position="bottom right"
      >
        <DropdownItemGroup>
          <DropdownItem onClick={() => deleteEnvironment(environment.uuid)}>
            Remove environment
          </DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </EnvironmentActionsWrapper>
  );
};

export default React.memo(EnvironmentActions);
