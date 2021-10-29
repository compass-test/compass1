import React from 'react';

import EmptyState from '@atlaskit/empty-state';
import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import { ButtonItem, Section, SkeletonItem } from '@atlaskit/menu';
import { Y300 } from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { ComponentTypeIcon } from '@atlassian/dragonfruit-components';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useGetStarredComponents } from '../../../services/get-starred-components';

import { default as StarredEmptyState } from './assets/EmptyState.svg';
import {
  LOADING_COMPONENTS_NUM,
  STARRED_SECTION_EMPTY_STATE_TEST_ID,
  STARRED_SECTION_TEST_ID,
} from './constants';
import messages from './messages';
import { EmptyStateContainer } from './styled';

export const StarredSectionContent = () => {
  const { formatMessage } = useIntl();
  const { loading, data } = useGetStarredComponents();

  // Empty State
  const emptyStateProps = {
    header: '',
    description: formatMessage(messages.emptyState),
    imageUrl: StarredEmptyState,
    testId: STARRED_SECTION_EMPTY_STATE_TEST_ID,
  };
  const emptyState = (
    <EmptyStateContainer>
      <EmptyState {...emptyStateProps} />
    </EmptyStateContainer>
  );

  if (data.length === 0) {
    return emptyState;
  }

  // Starred scrollable section
  return (
    <Section
      isScrollable
      title={formatMessage(CommonMessages.starred)}
      testId={STARRED_SECTION_TEST_ID}
    >
      {loading &&
        Array(LOADING_COMPONENTS_NUM)
          .fill(undefined)
          .map(_ => <SkeletonItem hasIcon isShimmering />)}

      {!loading &&
        data.map(component => (
          <ButtonItem
            iconBefore={
              <ComponentTypeIcon size="small" type={component.componentType} />
            }
            iconAfter={
              <StarFilledIcon
                size="small"
                label="Starred Icon"
                primaryColor={Y300}
              />
            }
          >
            {component.componentName}
          </ButtonItem>
        ))}
    </Section>
  );
};
