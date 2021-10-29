import { useState } from 'react';

import { useTeamCheckinsEnabled } from '@atlassian/dragonfruit-feature-flags';
import { useGetTeamCheckinsQuery } from '@atlassian/dragonfruit-graphql';
import { TeamCheckin } from '@atlassian/dragonfruit-team-checkins';
import { useTenantInfo } from '@atlassian/dragonfruit-tenant-context';
import {
  readJsonFromLocalStorage,
  teamIdToIdentityAri,
  writeToLocalStorage,
} from '@atlassian/dragonfruit-utils';

const BANNER_SEEN_STORAGE_KEY = 'compassTeamCheckinsBannerSeen';

type FormData = {
  id: string;
  mood: string;
  response1?: string;
  response2?: string;
  response3?: string;
};

function teamCheckinToFormData(checkin: TeamCheckin): FormData {
  return {
    id: checkin.id,
    mood: checkin.mood?.toString() || '',
    response1: checkin.response1 as string | undefined,
    response2: checkin.response2 as string | undefined,
    response3: checkin.response3 as string | undefined,
  };
}

// Adds tests part of https://softwareteams.atlassian.net/browse/COMPASS-4730
type TeamCheckinsController = {
  teamAri: string;

  /* Banner -
   * We will conditionally show the banner only when it was not closed
   * by the user earlier and when there are no team checkins
   * */
  showBanner: boolean;
  closeBanner: () => void;

  /* Recent Team Checkin -
   * We will conditionally show the recent team checkin block only when there is
   * at least one recent team checkin which is essentially the top of the team
   * checkins received as they are already chronologically sorted in the backend
   * */
  showRecentTeamCheckin: boolean;
  recentTeamCheckin: TeamCheckin;

  /* Past Team Checkins -
   * We will conditionally show the past team checkins block only when there is
   * at least one past team checkin which is essentially all of the team checkins,
   * except the top one received as they are already chronologically sorted in the backend
   * */
  showPastTeamCheckins: boolean;
  pastTeamCheckins: TeamCheckin[];

  // Create team checkin
  showCreateButton: boolean;
  showCreateModal: boolean;
  closeCreateModal: () => void;
  onCreate: () => void;

  // Edit team checkin
  showEditModal: boolean;
  closeEditModal: () => void;
  onEdit: (teamCheckinId: string) => void;
  teamCheckinIdToBeEdited: string | null;
  teamCheckinEditFormData: FormData | null;

  // Delete team checkin
  showDeleteModal: boolean;
  closeDeleteModal: () => void;
  onDelete: (teamCheckinId: string) => void;
  teamCheckinIdToBeDeleted: string | null;
};

export const useTeamCheckinsController = (
  teamId: string,
): TeamCheckinsController => {
  const isTeamCheckinsEnabled = useTeamCheckinsEnabled();
  const { cloudId } = useTenantInfo();
  const teamAri = teamIdToIdentityAri(teamId);
  const { data } = useGetTeamCheckinsQuery({
    variables: {
      input: {
        cloudId: cloudId,
        teamId: teamAri,
      },
    },
  });
  const teamCheckins = (data?.compass?.teamCheckins || []).filter(
    (teamCheckin) => !teamCheckin._isDeleted,
  );

  // Banner
  const bannerSeen = readJsonFromLocalStorage(BANNER_SEEN_STORAGE_KEY);
  const [isBannerOpen, setIsBannerOpen] = useState(bannerSeen === null);
  const closeBanner = () => {
    writeToLocalStorage(BANNER_SEEN_STORAGE_KEY, 'true');
    setIsBannerOpen(false);
  };
  const showBanner =
    isTeamCheckinsEnabled && isBannerOpen && teamCheckins.length === 0;

  // Recent Team Checkin
  const recentTeamCheckin = teamCheckins[0];
  const showRecentTeamCheckin =
    isTeamCheckinsEnabled && recentTeamCheckin !== undefined;

  // Past Team Checkins
  const pastTeamCheckins = teamCheckins.slice(1);
  const showPastTeamCheckins =
    isTeamCheckinsEnabled && pastTeamCheckins.length > 0;

  // Create team checkin
  const showCreateButton = isTeamCheckinsEnabled;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const onCreate = () => {
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  const showCreateModal = isTeamCheckinsEnabled && isCreateModalOpen;

  // Edit team checkin
  const [teamCheckinIdToBeEdited, setTeamCheckinIdToBeEdited] = useState<
    string | null
  >(null);
  const showEditModal =
    isTeamCheckinsEnabled && teamCheckinIdToBeEdited !== null;
  const closeEditModal = () => {
    setTeamCheckinIdToBeEdited(null);
  };
  const onEdit = (teamCheckinId: string) => {
    setTeamCheckinIdToBeEdited(teamCheckinId);
  };
  const teamCheckinToBeEdited =
    teamCheckins.find((checkin) => checkin.id === teamCheckinIdToBeEdited) ||
    null;

  const teamCheckinEditFormData = teamCheckinToBeEdited
    ? teamCheckinToFormData(teamCheckinToBeEdited)
    : null;

  // Delete team checkin
  const [teamCheckinIdToBeDeleted, setTeamCheckinIdToBeDeleted] = useState<
    string | null
  >(null);
  const showDeleteModal =
    isTeamCheckinsEnabled && teamCheckinIdToBeDeleted !== null;
  const closeDeleteModal = () => {
    setTeamCheckinIdToBeDeleted(null);
  };
  const onDelete = (teamCheckinId: string) => {
    setTeamCheckinIdToBeDeleted(teamCheckinId);
  };

  return {
    teamAri,

    showBanner,
    closeBanner,

    showRecentTeamCheckin,
    recentTeamCheckin,

    showPastTeamCheckins,
    pastTeamCheckins,

    showCreateButton,
    showCreateModal,
    closeCreateModal,
    onCreate,

    showEditModal,
    closeEditModal,
    onEdit,
    teamCheckinIdToBeEdited,
    teamCheckinEditFormData,

    showDeleteModal,
    closeDeleteModal,
    onDelete,
    teamCheckinIdToBeDeleted,
  };
};
