import React, { FC, useState } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import DropdownMenu from '@atlaskit/dropdown-menu';
import { N50, N700 } from '@atlaskit/theme/colors';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';

import { GlobalMetadata } from '../../../apis/TemplateApi';
import { TemplateGroup } from '../../helpers/templateHelpers';

interface TemplateGroupPickerProps {
  groups: TemplateGroup[];
  selectedGroup: string;
  featured?: GlobalMetadata['featuredGroups'];
  updateGroup: (newGroup: string) => void;
}

export const TemplateGroupPicker = injectIntl(
  ({
    groups,
    selectedGroup,
    featured,
    updateGroup,
    intl,
  }: TemplateGroupPickerProps & InjectedIntlProps) => {
    const getFeaturedGroups = (): TemplateGroup[] => {
      let featuredGroups: TemplateGroup[] = [];

      if (featured && featured.length > 0) {
        // Add "all" group first
        const allGroup = groups.find(group => group.name === 'All');
        if (allGroup) {
          featuredGroups.push(allGroup);
        }
        featured.forEach(featuredGroupName => {
          const featuredGroup = groups.find(
            group => group.name === featuredGroupName,
          );
          if (featuredGroup) {
            featuredGroups.push(featuredGroup);
          }
        });
      } else {
        // Select top 5 groups
        featuredGroups.push(...groups.slice(0, 5));
      }

      // Add currently selected group at end of list unless the selected group is already in the list
      if (!featuredGroups.find(group => group.name === selectedGroup)) {
        const selected = groups.find(group => group.name === selectedGroup);
        if (selected) {
          featuredGroups = [...featuredGroups, selected];
        }
      }

      return featuredGroups;
    };
    const featuredGroups = getFeaturedGroups();

    const getHiddenGroups = (): TemplateGroup[] => {
      return groups.filter(
        group =>
          !featuredGroups.find(
            featuredGroup => featuredGroup.name === group.name,
          ),
      );
    };
    const hiddenGroups = getHiddenGroups();

    const [showMore, setShowMore] = useState<boolean>(false);

    const getGroupName = (groupName: string): string => {
      if (groupName === 'All') {
        return intl.formatMessage(IntlCommonMessages[CommonMessage.All]);
      }
      return groupName;
    };

    return (
      <>
        <TagsWrapper>
          {featuredGroups.map(group => (
            <Tag
              name={getGroupName(group.name)}
              selected={group.name === selectedGroup}
              number={group.numForms}
              onClick={() => updateGroup(group.name)}
            />
          ))}
          {hiddenGroups.length > 0 && (
            <DropdownMenu
              trigger={
                <Tag
                  name="..."
                  selected={showMore}
                  onClick={() => setShowMore(!showMore)}
                />
              }
              isOpen={showMore}
              onOpenChange={event => setShowMore(event.isOpen)}
              position="bottom left"
              boundariesElement="scrollParent"
            >
              {hiddenGroups.map(group => (
                <Tag
                  name={group.name}
                  selected={false}
                  number={group.numForms}
                  onClick={() => {
                    updateGroup(group.name);
                    setShowMore(false);
                  }}
                />
              ))}
            </DropdownMenu>
          )}
        </TagsWrapper>
      </>
    );
  },
);

interface TagProps {
  name: string;
  selected: boolean;
  number?: number;
  onClick: () => void;
}

export const Tag: FC<TagProps> = ({ name, selected, number, onClick }) => {
  return (
    <TagWrapper>
      <Button isSelected={selected} onClick={onClick} spacing="compact">
        {name}
        {!!number && <NumberWrapper>{number}</NumberWrapper>}
      </Button>
    </TagWrapper>
  );
};

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
`;

const TagWrapper = styled.div`
  padding: 5px;

  > button {
    border-radius: 20px;
  }
`;

const NumberWrapper = styled.span`
  margin-left: 5px;
  background-color: ${N50};
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
  color: ${N700};
`;
