import React, { SyntheticEvent } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroupCheckbox,
} from '@atlaskit/dropdown-menu';

import { useIntl } from '../../../../../common/utils/intl';

import msgs from './messages';
import { ProjectDropdownItem } from './styled';
import { Props, SelectActions } from './types';
export { SelectActions } from './types';

const ProjectSelect: React.FC<Props> = ({
  projects,
  selectedProjects,
  loading,
  onProjectClick,
}) => {
  const { formatMessage } = useIntl();

  const renderTrigger = () => {
    if (loading || !projects) {
      return null;
    }

    const isAllSelected =
      projects &&
      (selectedProjects.length === projects.length ||
        selectedProjects.length === 0);

    return isAllSelected
      ? `${formatMessage(msgs.label)}: ${formatMessage(msgs.all)}`
      : selectedProjects.map((project) => project.name).join(', ');
  };

  const renderContent = () => {
    if (loading || !projects) {
      return null;
    }

    if (projects.length === 0) {
      return (
        <DropdownItemGroupCheckbox id="projects">
          <DropdownItem>{formatMessage(msgs.noneAvailable)}</DropdownItem>
        </DropdownItemGroupCheckbox>
      );
    }

    const clearSelectedHandler = (e: SyntheticEvent) => {
      e.stopPropagation();
      onProjectClick(SelectActions.CLEAR_SELECTED);
    };

    return (
      <DropdownItemGroupCheckbox id="projects">
        <Button
          appearance="link"
          testId="clear-selected"
          name="clear-selected"
          onClick={clearSelectedHandler}
          theme={(current, props) => {
            const provided = current(props);
            return {
              ...provided,
              buttonStyles: {
                ...provided.buttonStyles,
                paddingLeft: '1rem',
                width: '250px !important',
                textAlign: 'left',
              },
            };
          }}
        >
          {formatMessage(msgs.clearSelected)}
        </Button>
        {projects.map((project) => (
          <ProjectDropdownItem
            isSelected={selectedProjects.includes(project)}
            id={project.name}
            onClick={() => onProjectClick(project)}
          >
            {project.avatarUrl ? <img src={project.avatarUrl} /> : null}
            {project.name}
          </ProjectDropdownItem>
        ))}
      </DropdownItemGroupCheckbox>
    );
  };

  return (
    <DropdownMenu
      isLoading={loading}
      trigger={renderTrigger()}
      triggerType="button"
    >
      {renderContent()}
    </DropdownMenu>
  );
};

export default ProjectSelect;
