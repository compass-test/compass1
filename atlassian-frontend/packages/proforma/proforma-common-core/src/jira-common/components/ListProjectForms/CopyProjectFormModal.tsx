import React, { useEffect, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button/standard-button';
import { Checkbox } from '@atlaskit/checkbox';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';

import { useProjectApi } from '../../context/ProjectApiContext';
import { Project } from '../../models';
import { TemplateFormIndex } from '../../models/ProjectForm';
import { LoadingSpinner } from '../LoadingSpinner';
import { ModalTitleContainer } from '../styled';

import { IntlCopyProjectFormModalMessages } from './messages';
import {
  Divider,
  FormNameContainer,
  LeftPanel,
  PanelContainer,
  ProjectLabelContainer,
  ProjectNameContainer,
  ProjectsContainer,
  RightPanel,
} from './styled';

interface CopyProjectFormModalProps {
  formToCopy: TemplateFormIndex;
  onClose: () => void;
  onConfirm: (projectsToCopyTo: Project[]) => void;
}

interface ProjectWithSelectedState extends Project {
  selected: boolean;
}

export const CopyProjectFormModal = injectIntl(
  ({
    onClose,
    onConfirm,
    formToCopy,
    intl,
  }: CopyProjectFormModalProps & InjectedIntlProps) => {
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [projects, setProjects] = useState<ProjectWithSelectedState[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    const handleCopy = () => {
      const projectsToCopyTo = projects
        .filter(project => project.selected)
        .map(project => ({
          id: project.id,
          name: project.name,
          projectTypeKey: project.projectTypeKey,
          projectTypeName: project.projectTypeName,
          smallAvatarUrl: project.smallAvatarUrl,
        }));

      onConfirm(projectsToCopyTo);
    };

    const projectApi = useProjectApi();

    useEffect(() => {
      projectApi.getAllProjects().then(projects => {
        const projectsWithSelectedState: ProjectWithSelectedState[] = projects.map(
          project => ({ ...project, selected: false }),
        );
        setProjects(projectsWithSelectedState);
        setIsLoadingProjects(false);
      });
    }, [projectApi]);

    const handleSelectProject = (projectId: number) => {
      const newProjects = [...projects];
      const projectIndex = newProjects.findIndex(
        project => project.id === projectId,
      );
      if (projectIndex !== -1) {
        newProjects[projectIndex].selected = !newProjects[projectIndex]
          .selected;
      }
      setProjects(newProjects);
    };

    const handleSelectAll = () => {
      const selectAll = !isSelectAll;
      const newProjects = projects.map(project => ({
        ...project,
        selected: selectAll,
      }));
      setIsSelectAll(selectAll);
      setProjects(newProjects);
    };

    return (
      <Modal onClose={onClose} width="large">
        <ModalHeader>
          <ModalTitleContainer>
            <ModalTitle>
              <FormattedMessage
                {...IntlCopyProjectFormModalMessages.Heading}
                values={{ formName: formToCopy.name }}
              />
            </ModalTitle>
          </ModalTitleContainer>
        </ModalHeader>

        <ModalBody>
          <FormattedMessage {...IntlCopyProjectFormModalMessages.SubHeading} />
          <Divider />
          <PanelContainer>
            <LeftPanel>
              <h5>
                <FormattedMessage {...IntlCopyProjectFormModalMessages.Name} />
              </h5>
              <FormNameContainer>
                <span>{formToCopy.name}</span>
                <ArrowRightIcon label="Right arrow icon" />
              </FormNameContainer>
            </LeftPanel>
            <RightPanel>
              <h5>
                <FormattedMessage
                  {...IntlCopyProjectFormModalMessages.CopyToProjectsTitle}
                />
              </h5>
              <ProjectsContainer>
                {isLoadingProjects ? (
                  <LoadingSpinner
                    size="large"
                    message={IntlCopyProjectFormModalMessages.LoadingProjects}
                  />
                ) : (
                  <>
                    <Checkbox
                      value="all"
                      size="large"
                      isChecked={isSelectAll}
                      label={
                        <FormattedMessage
                          {...IntlCopyProjectFormModalMessages.SelectAllProjects}
                        />
                      }
                      onChange={() => handleSelectAll()}
                      name="select-all"
                    />
                    {projects.map(project => (
                      <div>
                        <Checkbox
                          value={project.id}
                          size="large"
                          label={
                            <ProjectLabelContainer>
                              <Avatar
                                appearance="square"
                                size="small"
                                src={project.smallAvatarUrl}
                                name={project.name}
                              />
                              <ProjectNameContainer>
                                {project.name}
                              </ProjectNameContainer>
                            </ProjectLabelContainer>
                          }
                          isChecked={project.selected}
                          onChange={() => handleSelectProject(project.id)}
                          name={project.name}
                        />
                      </div>
                    ))}
                  </>
                )}
              </ProjectsContainer>
            </RightPanel>
          </PanelContainer>
          <Divider />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            <FormattedMessage {...IntlCopyProjectFormModalMessages.Cancel} />
          </Button>
          <Button appearance="primary" onClick={handleCopy}>
            <FormattedMessage {...IntlCopyProjectFormModalMessages.Copy} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
