import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import ActionsDropdown from './main';

describe('ActionsDropdown', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  let testId: string;
  let result: RenderResult;
  let onEdit: (teamCheckinId: string) => void;
  let onDelete: (teamCheckinId: string) => void;
  let teamCheckinId: string;

  beforeEach(() => {
    testId = 'actions-dropdown';
    onEdit = jest.fn();
    onDelete = jest.fn();
    teamCheckinId = '0000-1111-2222-3333';

    result = render(
      <CompassTestProvider>
        <ActionsDropdown
          testId={testId}
          onEdit={onEdit}
          onDelete={onDelete}
          teamCheckinId={teamCheckinId}
        />
      </CompassTestProvider>,
    );
  });

  describe('edit team checkin', () => {
    it('should have edit link', () => {
      const dropdownButton = result.getByTestId(`${testId}--trigger`);
      dropdownButton.click();

      const editTeamCheckinLink = result.getByTestId(`${testId}.edit`);

      expect(editTeamCheckinLink).toBeInTheDocument();
      expect(editTeamCheckinLink.textContent).toContain('Edit');
    });

    it('should have called the onEdit with the teamCheckinId', () => {
      const dropdownButton = result.getByTestId(`${testId}--trigger`);
      dropdownButton.click();

      const editTeamCheckinLink = result.getByTestId(`${testId}.edit`);
      editTeamCheckinLink.click();

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(teamCheckinId);
    });
  });

  describe('delete team checkin', () => {
    it('should have delete link', () => {
      const dropdownButton = result.getByTestId(`${testId}--trigger`);
      dropdownButton.click();

      const deleteTeamCheckinLink = result.getByTestId(`${testId}.delete`);

      expect(deleteTeamCheckinLink).toBeInTheDocument();
      expect(deleteTeamCheckinLink.textContent).toContain('Remove');
    });

    it('should have called the onDelete with the teamCheckinId', () => {
      const dropdownButton = result.getByTestId(`${testId}--trigger`);
      dropdownButton.click();

      const deleteTeamCheckinLink = result.getByTestId(`${testId}.delete`);
      deleteTeamCheckinLink.click();

      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(teamCheckinId);
    });
  });
});
