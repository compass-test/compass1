import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SlackWorkspacesDropdown from '../../../../components/ThirdParty/SlackWorkspacesDropdown';
import { SlackWorkspace } from '../../../../types';

const slackWorkspace1 = {
  id: '1',
  name: 'test-workspace-1',
  avatar: 'https://avatar.org/icon1.png',
};

const slackWorkspace2 = {
  id: '2',
  name: 'test-workspace-2',
  avatar: 'https://avatar.org/icon2.png',
};

const slackWorkspaces: SlackWorkspace[] = [slackWorkspace1, slackWorkspace2];

const setSelectedOption = jest.fn();

const renderSlackWorkspacesDropdown = (
  selectedOption: SlackWorkspace = slackWorkspace1,
) => {
  return render(
    <SlackWorkspacesDropdown
      slackWorkspaces={slackWorkspaces}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
    />,
  );
};

describe('Slack Workspaces Dropdown', () => {
  describe('should render the slack workspaces dropdown with', () => {
    it('first option as placeholder with respective icon when specified selected option is first one', async () => {
      const { queryByText, getByAltText } = renderSlackWorkspacesDropdown();

      expect(queryByText('test-workspace-1')).toBeInTheDocument();
      expect(getByAltText('https://avatar.org/icon1.png')).toBeInTheDocument();
    });

    it('specified selected option with icon respective as placeholder when specified selected option is other than the first one', async () => {
      const { queryByText, getByAltText } = renderSlackWorkspacesDropdown(
        slackWorkspace2,
      );

      expect(queryByText('test-workspace-2')).toBeInTheDocument();
      expect(getByAltText('https://avatar.org/icon2.png')).toBeInTheDocument();
    });

    it('all workspaces listed with respective icons when dropdown menu is open', async () => {
      const {
        getByText,
        queryAllByText,
        queryAllByAltText,
      } = renderSlackWorkspacesDropdown();

      fireEvent.mouseDown(getByText('test-workspace-1'));

      expect(queryAllByText('test-workspace-1')).toHaveLength(2);
      expect(queryAllByText('test-workspace-2')).toHaveLength(1);
      expect(queryAllByAltText('https://avatar.org/icon1.png')).toHaveLength(2);
      expect(queryAllByAltText('https://avatar.org/icon2.png')).toHaveLength(1);
    });

    it('all workspaces listed and verify that the change event is invoked', async () => {
      const { getByText } = renderSlackWorkspacesDropdown();

      fireEvent.mouseDown(getByText('test-workspace-1'));

      fireEvent.click(getByText('test-workspace-2'));
      expect(setSelectedOption).toHaveBeenCalledWith(slackWorkspace2);
    });

    it('single select instead of multi select', async () => {
      const { getByText, queryAllByText } = renderSlackWorkspacesDropdown();

      fireEvent.mouseDown(getByText('test-workspace-1'));

      // drop down menu opened
      expect(queryAllByText('test-workspace-1')).toHaveLength(2);
      expect(queryAllByText('test-workspace-2')).toHaveLength(1);

      fireEvent.click(getByText('test-workspace-2'));

      // drop down menu closed
      expect(queryAllByText('test-workspace-1')).toHaveLength(1);
      expect(queryAllByText('test-workspace-2')).toHaveLength(0);
    });
  });
});
