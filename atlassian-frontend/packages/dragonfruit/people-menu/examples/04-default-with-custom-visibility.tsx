import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import AddIcon from '@atlaskit/icon/glyph/add';
import {
  mockCreateTeam,
  mockGetCollaborators,
  mockGetTeams,
  mockInviteTeamMembers,
} from '@atlassian/ptc-test-utils';

import PeopleMenu from '../src';

import { withAnalyticsLogger, withIntlProvider } from './helpers';
import { AtlassianNavExample } from './helpers/AtlassianNavExample';
import * as styled from './helpers/styled';

const MOCK_CLOUD_ID = 'test-cloud-id';
const MOCK_USER_ID = 'test-user-id';
const MOCK_PRODUCT = 'confluence';
const MOCK_ORG_ID = 'test-org-id';

const handleClickOnItem = (id: string, type: string) => {
  console.log(`handleClickOnItem: id=${id} and type=${type}`);
};

const handleClickOnPrimaryItem = () => {
  console.log('handleClickOnPrimaryItem');
};

const handleClickOnCreateNewTeam = () => {
  console.log('handleClickOnCreateNewTeam');
};

const handleClickOnViewPeopleDirectory = () => {
  console.log('handleClickOnViewPeopleDirectory');
};

interface Props {
  isCustomIcon: boolean;
}

function WrappedPeopleMenu(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      if (event) {
        event.stopPropagation();
      }
      setIsOpen(true);
    },
    [setIsOpen],
  );

  const handleCloseMenu = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      if (event) {
        event.stopPropagation();
      }
      setIsOpen(false);
    },
    [setIsOpen],
  );

  const chevron = props.isCustomIcon ? <AddIcon label="expand" /> : undefined;

  return (
    <PeopleMenu
      product={MOCK_PRODUCT}
      cloudId={MOCK_CLOUD_ID}
      orgId={MOCK_ORG_ID}
      userId={MOCK_USER_ID}
      isHighlighted={false}
      enableInvite={false}
      enableInviteProductSelect={false}
      onClickedItem={handleClickOnItem}
      onClick={handleClickOnPrimaryItem}
      onClickCreateNewTeam={handleClickOnCreateNewTeam}
      onClickViewPeopleDirectoryLink={handleClickOnViewPeopleDirectory}
      pushRoute={(url: string) => {
        console.log(`Redirect to ${url}`);
      }}
      customChevronIcon={chevron}
      isOpen={isOpen}
      onOpen={handleOpenMenu}
      onClose={handleCloseMenu}
    />
  );
}

function ExampleWithMockedData() {
  const [isCustomIcon, enableCustomChevron] = useState(false);

  useEffect(() => {
    mockGetCollaborators();
    mockGetTeams(MOCK_USER_ID, MOCK_CLOUD_ID, MOCK_PRODUCT);
    mockCreateTeam(MOCK_CLOUD_ID, MOCK_PRODUCT);
    mockInviteTeamMembers(MOCK_CLOUD_ID, MOCK_PRODUCT);
  }, []);

  const onChangeCheckbox = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      enableCustomChevron(event.currentTarget.checked);
    },
    [enableCustomChevron],
  );

  return (
    <styled.ExampleWrapper>
      <section>
        <Checkbox
          label="Use custom chevron"
          value="temp"
          name="temp"
          onChange={onChangeCheckbox}
        />
      </section>

      <AtlassianNavExample
        // Don't actually do this, this is just to allow the nav to re-render when the checkbox is toggled
        key={`${isCustomIcon}`}
        peopleMenu={
          <WrappedPeopleMenu key="people" isCustomIcon={isCustomIcon} />
        }
      />
    </styled.ExampleWrapper>
  );
}

export default withIntlProvider(withAnalyticsLogger(ExampleWithMockedData));
