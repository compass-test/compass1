import React, { useCallback } from 'react';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Tooltip from '@atlaskit/tooltip';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { routes } from '@atlassian/dragonfruit-routes';
import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';

type ComponentFragment = Pick<CompassComponent, 'id' | 'name' | 'dataManager'>;

interface Props {
  component: ComponentFragment;
  onDelete?: (componentId: CompassComponent['id']) => void;
  testId?: string;
}

const Actions: React.FC<Props> = ({ component, onDelete, testId }) => {
  const { formatMessage } = useIntl();

  const menuTestId = testId && `${testId}.menu`;
  const deleteActionTestId = testId && `${testId}.delete`;

  const wrappedOnDelete = useCallback(() => {
    if (onDelete) {
      onDelete(component.id);
    }
  }, [component.id, onDelete]);

  const navigateToSettings = useCallback(() => {
    window.location.assign(routes.COMPONENT_DETAILS(component.id));
  }, [component.id]);

  return (
    <DropdownMenu
      triggerType="button"
      triggerButtonProps={{
        appearance: 'subtle',
        iconBefore: (
          <MoreIcon
            label={formatMessage(messages.actionsMenuLabel, {
              component: component.name,
            })}
            size="small"
            testId={menuTestId}
          />
        ),
        spacing: 'compact',
      }}
      position="bottom right"
    >
      <DropdownItemGroup>
        <Tooltip
          content={
            !!component.dataManager &&
            formatMessage(messages.externallyManagedTooltip)
          }
        >
          <DropdownItem
            aria-label={formatMessage(messages.removeFromTeamLabel, {
              component: component.name,
            })}
            onClick={wrappedOnDelete}
            isDisabled={!!component.dataManager}
          >
            <span data-testid={deleteActionTestId}>
              {formatMessage(messages.removeFromTeam)}
            </span>
          </DropdownItem>
        </Tooltip>
        <DropdownItem
          aria-label={formatMessage(messages.settingsLabel, {
            component: component.name,
          })}
          role={'link'}
          onClick={navigateToSettings}
        >
          {formatMessage(messages.settings)}
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default Actions;
