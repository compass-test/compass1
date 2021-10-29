import React from 'react';
import styled from 'styled-components';
import { SlackWorkspace } from '../../types';
import Select, { ValueType } from '@atlaskit/select';

interface OwnProps {
  slackWorkspaces: SlackWorkspace[];
  selectedOption: SlackWorkspace;
  onSelect: (option: SlackWorkspace) => void;
}

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  height: 20px;
  width: 20px;
  padding-right: 8px;
`;

const SlackWorkspacesDropdown: React.FC<OwnProps> = ({
  slackWorkspaces,
  selectedOption,
  onSelect,
}) => {
  const formatOptionLabel = (option: SlackWorkspace) => {
    return (
      <OptionWrapper>
        <Image alt={option.avatar} src={option.avatar} />
        {option.name}
      </OptionWrapper>
    );
  };

  return (
    <Select<SlackWorkspace>
      name="slack-workspace-select"
      isSearchable={false}
      value={selectedOption}
      className="single-select"
      classNamePrefix="react-select"
      getOptionValue={(w) => w.id}
      options={slackWorkspaces}
      formatOptionLabel={formatOptionLabel}
      placeholder={formatOptionLabel(slackWorkspaces[0])}
      isDisabled={slackWorkspaces.length === 1}
      onChange={(selectedSlackWorkspace: ValueType<SlackWorkspace>) =>
        onSelect(selectedSlackWorkspace as SlackWorkspace)
      }
    />
  );
};

export default SlackWorkspacesDropdown;
