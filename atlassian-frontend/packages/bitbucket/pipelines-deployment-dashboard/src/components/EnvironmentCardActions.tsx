import React, { useMemo } from 'react';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Tooltip from '@atlaskit/tooltip';

import { CardActionsWrapper } from './styled';

export type Props = {
  isDisabled: boolean;
  openRedeployPreview: () => void;
};

const EnvironmentCardActions: React.FC<Props> = ({
  isDisabled,
  openRedeployPreview,
}) => {
  const tooltipText = useMemo(
    () =>
      isDisabled
        ? 'This deployment was replaced by a newer one and is no longer available'
        : '',
    [isDisabled],
  );

  return (
    <CardActionsWrapper data-stop-click>
      <DropdownMenu
        triggerType="button"
        triggerButtonProps={{
          appearance: 'subtle',
          iconBefore: (
            <Tooltip position="right" content={tooltipText}>
              <MoreIcon label="More" />
            </Tooltip>
          ),
          isDisabled: isDisabled,
        }}
        position="bottom right"
      >
        <DropdownItemGroup>
          <DropdownItem onClick={openRedeployPreview}>Redeploy</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </CardActionsWrapper>
  );
};

export default React.memo(EnvironmentCardActions);
