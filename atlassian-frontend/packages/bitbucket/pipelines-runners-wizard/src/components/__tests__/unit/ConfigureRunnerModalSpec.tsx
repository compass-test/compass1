import React from 'react';

import { mount } from 'enzyme';

import { repositoryUuid, runner, workspaceUuid } from '../../../mocks';
import { RunnerAction } from '../../../types';
import AddRunner from '../../AddRunner';
import ConfigureRunnerModal from '../../ConfigureRunnerModal';
import EditRunner from '../../EditRunner';

describe('ConfigureRunnerModal component', () => {
  const addRunnerProps = {
    onCloseModal: jest.fn(),
    onCreateRunner: jest.fn(),
    onEditRunner: jest.fn(),
    setCreatedRunner: jest.fn(),
    setRunCommandActioned: jest.fn(),
    repositoryUuid: repositoryUuid,
    workspaceUuid: workspaceUuid,
    environment: 'TEST',
    runnerAction: RunnerAction.CREATE,
    windowsEnabled: false,
  };

  const editRunnerProps = {
    onCloseModal: jest.fn(),
    onCreateRunner: jest.fn(),
    onEditRunner: jest.fn(),
    setCreatedRunner: jest.fn(),
    setRunCommandActioned: jest.fn(),
    repositoryUuid: repositoryUuid,
    workspaceUuid: workspaceUuid,
    environment: 'TEST',
    runnerAction: RunnerAction.EDIT,
    existingRunner: runner,
    windowsEnabled: false,
  };

  it('should render modal with configuration modal and progress tracker for add runner action', () => {
    const component = mount(<ConfigureRunnerModal {...addRunnerProps} />);
    expect(component.find(AddRunner).length).toBe(1);
  });

  it('should render modal with configuration modal edit runner action', () => {
    const component = mount(<ConfigureRunnerModal {...editRunnerProps} />);
    expect(component.find(EditRunner).length).toBe(1);
  });
});
