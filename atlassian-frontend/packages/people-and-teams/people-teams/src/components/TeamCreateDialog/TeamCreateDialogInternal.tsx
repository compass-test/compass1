import React, { useCallback, useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/loading-button';
import { Field } from '@atlaskit/form';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { OptionData, User as UserPickerUser } from '@atlaskit/user-picker';

import { InvitedUser } from '../../types/user';
import { MAX_MEMBERS, VOID_FUNC } from '../../utils/constants';
import {
  triggerAnalyticsForCloseTeamCreateDialog,
  triggerAnalyticsForSubmitTeamCreateDialog,
  triggerAnalyticsForViewTeamCreateDialog,
} from '../analytics';
import { messages, useIntl } from '../i18n';
import MemberPicker from '../MemberPicker';

import * as Styled from './styled';
import TeamNameInput from './TeamNameInput';
import TeamOnboardingImg from './TeamOnBoardingImg';
import { TeamCreateDialogInternalProps } from './types';

const LEARN_MORE_LINK =
  'https://confluence.atlassian.com/cloud/atlassian-teams-975031970.html';

function TeamLearnMoreLink() {
  return (
    <a target="_blank" rel="noreferrer" href={LEARN_MORE_LINK}>
      <FormattedMessage {...messages.learnMore} />
    </a>
  );
}

function TeamCreateDialogInternal(
  props: TeamCreateDialogInternalProps & WithAnalyticsEventsProps,
) {
  const {
    proposedMembers = [],
    cloudId,
    maxSelectedMembers = MAX_MEMBERS,
    createAnalyticsEvent,
    principalId,
    extraAnalyticsAttrs,
    createTeamAndAddMembers = VOID_FUNC,
    onClose = VOID_FUNC,
  } = props;

  const [teamName, setTeamName] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<InvitedUser[]>([]);
  const [isMemberPickerInvalid, setIsMemberPickerInvalid] = useState(false);
  const { intl } = useIntl();

  // did mount
  useEffect(() => {
    setSelectedMembers(proposedMembers);

    triggerAnalyticsForViewTeamCreateDialog(
      createAnalyticsEvent,
      (proposedMembers || []).length,
      extraAnalyticsAttrs,
    );
    // eslint-disable-next-line
  }, []);

  const closeDialog = useCallback(() => {
    triggerAnalyticsForCloseTeamCreateDialog(
      createAnalyticsEvent,
      extraAnalyticsAttrs,
    );
    onClose();
  }, [createAnalyticsEvent, extraAnalyticsAttrs, onClose]);

  useEffect(() => {
    setIsFetching(!!props.isFetching);

    // when isFetching prop change from true --> false, that means the creating team finishes
    if (props.isFetching === false && isFetching === true) {
      closeDialog();
    }
  }, [props.isFetching, isFetching, closeDialog]);

  const handleSelectedChange = useCallback(
    (
      users: UserPickerUser[],
      data: { hasError: boolean; isDisabled: boolean },
    ) => {
      setSelectedMembers(
        users.map((user) => ({
          id: user.id,
          email: user.email,
          fullName: user.name,
          avatarUrl: user.avatarUrl,
        })),
      );
      setIsMemberPickerInvalid(data.hasError);
    },
    [setIsMemberPickerInvalid, setSelectedMembers],
  );

  const filterSelfInUserSearch = useCallback(
    (users: OptionData[]) => {
      return users.filter((user) => user.id !== principalId);
    },
    [principalId],
  );

  const canTeamBeCreated = useCallback(() => {
    return !isMemberPickerInvalid && !!teamName && !isFetching;
  }, [isFetching, isMemberPickerInvalid, teamName]);

  // Work-around:
  // When TeamCreateDialog renders inside PeopleMenu and the viewport is narrow,
  // the dialog is closed improperly when users click anywhere in the dialog
  const preventCloseDialog = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = useCallback(() => {
    triggerAnalyticsForSubmitTeamCreateDialog(
      createAnalyticsEvent,
      canTeamBeCreated(),
      selectedMembers.length,
      extraAnalyticsAttrs,
    );

    if (canTeamBeCreated()) {
      setIsFetching(true);
      // outsource creating a new team + invite members logic to outside
      // to reduce complexity of current file
      createTeamAndAddMembers(teamName, selectedMembers);
    }
  }, [
    canTeamBeCreated,
    createAnalyticsEvent,
    createTeamAndAddMembers,
    extraAnalyticsAttrs,
    selectedMembers,
    teamName,
  ]);

  return (
    <div onClick={preventCloseDialog}>
      <ModalDialog
        shouldScrollInViewport
        onClose={closeDialog}
        width="large"
        shouldCloseOnOverlayClick={!isFetching}
        shouldCloseOnEscapePress={!isFetching}
      >
        <ModalHeader>
          <ModalTitle>
            <FormattedMessage {...messages.modalTitle} />
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Styled.IllustratedDialogContent data-test-selector="create-team-content-dialog">
            <Styled.ImageSection>
              <TeamOnboardingImg
                label={intl.formatMessage(messages.modalTitle)}
              />
            </Styled.ImageSection>
            <Styled.TeamDataSection>
              <Styled.DescriptionParagraph>
                <FormattedMessage
                  {...messages.formTextWithMention}
                  values={{
                    learnMoreLink: <TeamLearnMoreLink />,
                  }}
                />
              </Styled.DescriptionParagraph>
              <TeamNameInput onChange={setTeamName} onSubmit={handleSubmit} />
              <Styled.UserPickerWrapper>
                <Field
                  name="inviteMembers"
                  label={intl.formatMessage(messages.invitationsFieldLabel)}
                >
                  {({ fieldProps }) => (
                    <MemberPicker
                      {...fieldProps}
                      cloudId={cloudId}
                      onChange={handleSelectedChange}
                      filterUsers={filterSelfInUserSearch}
                      initialValues={proposedMembers}
                      maxSelectedMembers={maxSelectedMembers}
                      extraAnalyticsAttrs={extraAnalyticsAttrs}
                    />
                  )}
                </Field>
              </Styled.UserPickerWrapper>
            </Styled.TeamDataSection>
          </Styled.IllustratedDialogContent>
        </ModalBody>
        <ModalFooter>
          <Button appearance="subtle" onClick={closeDialog}>
            <FormattedMessage {...messages.cancelButtonLabel} />
          </Button>
          <Button
            autoFocus
            appearance="primary"
            onClick={handleSubmit}
            isLoading={isFetching}
            isDisabled={!canTeamBeCreated()}
          >
            <FormattedMessage {...messages.submitButtonLabel} />
          </Button>
        </ModalFooter>
      </ModalDialog>
    </div>
  );
}

export default withAnalyticsEvents()(TeamCreateDialogInternal);
