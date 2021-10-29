import React, {
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useState,
} from 'react';

import styled, { css } from 'styled-components';

import { AnalyticsSource } from '../components/analytics';
import { PeopleMenuContextProps } from '../types';

const AKModalDialog = lazy(
  () =>
    import(
      /* webpackChunkName: "async-people-menu-dialog" */ '@atlaskit/modal-dialog'
    ),
);
const InvitePeople = lazy(
  () =>
    import(
      /* webpackChunkName: "async-people-menu-invite-dialog" */ '@atlassian/invite-people'
    ),
);
const InvitePeopleDrawer = lazy(
  () =>
    import(
      /* webpackChunkName: "async-people-menu-invite-people-drawer" */ '@atlassian/invite-people-drawer'
    ),
);
const AKModalTransition = lazy(() =>
  import(
    /* webpackChunkName: "async-people-menu-modal-transition-dialog" */ '@atlaskit/modal-dialog'
  ).then((module) => ({
    default: module.ModalTransition,
  })),
);
const TeamCreateDialog = lazy(() =>
  import(
    /* webpackChunkName: "async-people-menu-team-create-dialog" */ '@atlassian/people-teams/teamCreateDialog'
  ).then((module) => ({
    default: module.TeamCreateDialog,
  })),
);

const resetBoxModel = css`
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
`;

// this wrapper is for preventing changing layout of around elements
const DialogWrapper = styled.div`
  ${resetBoxModel};

  &:before,
  &:after {
    ${resetBoxModel};
    content: '' !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
`;

const InvitePeopleModalBody = forwardRef((props: any, ref: any) => {
  return (
    <div
      {...props}
      style={{
        padding: '0px',
      }}
      ref={ref}
    />
  );
});

const preventDialogClose = (event: React.MouseEvent<HTMLDivElement>) => {
  event.stopPropagation();
};

const analyticsAttrsTeamCreateDialog = {
  ref: AnalyticsSource.PEOPLE_MENU,
};

export const PeopleMenuContext = React.createContext<PeopleMenuContextProps>({
  cloudId: '',
  userId: '',
  product: 'confluence',
  testId: '',
  isPeopleMenuOpen: false,
  isInvitePeopleModalOpen: false,
  isSSR: false,
  onClickViewPeopleDirectoryLink: () => undefined,
  onClickCreateNewTeam: () => undefined,
  onClickedItem: () => undefined,
  pushRoute: () => undefined,
  toggleInvitePeopleModal: () => undefined,
  togglePeopleMenu: () => undefined,
  toggleTeamCreateDialog: () => undefined,
  _hasError: undefined,
});

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function PeopleMenuContextProvider(
  props: Props & PeopleMenuContextProps,
) {
  const { invitePeopleInitState = false, isSSR = false } = props;
  const [isInvitePeopleModalOpen, toggleInvitePeopleModal] = useState(
    invitePeopleInitState,
  );
  const [isOpenTeamCreateDialog, toggleOpenTeamCreateDialog] = useState(false);
  const { children, isOpen, onOpen, onClose, ...otherProps } = props;

  const togglePeopleMenu = useCallback(
    (newState: boolean) => {
      if (newState === isOpen) {
        return;
      }

      if (newState) {
        onOpen();
      } else {
        onClose();
      }
    },
    [isOpen, onClose, onOpen],
  );

  const toggleTeamCreateDialog = useCallback(
    (isOpen: boolean) => {
      toggleOpenTeamCreateDialog(isOpen);
    },
    [toggleOpenTeamCreateDialog],
  );

  const closeTeamCreateDialog = useCallback(() => {
    toggleOpenTeamCreateDialog(false);
  }, [toggleOpenTeamCreateDialog]);

  const values = {
    ...otherProps,
    // extra props
    isPeopleMenuOpen: isOpen,
    invitePeopleInitState,
    isInvitePeopleModalOpen,
    toggleInvitePeopleModal,
    togglePeopleMenu,
    toggleTeamCreateDialog,
  };

  const useInviteDrawer =
    otherProps.invitePeopleDrawerMigrationCohort === 'variation';
  const handleModalClose = () => toggleInvitePeopleModal(false);
  const instanceUrl = `${window.location.protocol}//${window.location.host}`;
  const inviteProduct =
    otherProps.product === 'directory' ? 'platform' : otherProps.product;
  const siteAri = `ari:cloud:${inviteProduct}::site/${otherProps.cloudId}`;
  const useInviteModal = !useInviteDrawer && isInvitePeopleModalOpen;

  return (
    <PeopleMenuContext.Provider value={values}>
      {children}
      {!isSSR && useInviteDrawer && (
        <Suspense fallback={null}>
          <DialogWrapper onClick={preventDialogClose}>
            <InvitePeopleDrawer
              isOpen={isInvitePeopleModalOpen}
              onCloseHandler={handleModalClose}
              continueUrl={instanceUrl}
              product={inviteProduct}
              cloudId={otherProps.cloudId}
              addFlag={values.addFlag}
              userRole={values.userRole}
              enableInviteInviteeList={otherProps.enableInviteInviteeList}
              enableCustomizedProductSelect={
                otherProps.enableCustomizedProductSelect
              }
              enableThirdParty={otherProps.enableThirdPartyInvites}
              thirdPartyInvitesCohort={otherProps.thirdPartyInvitesCohort}
              thirdPartyApiV2={otherProps.thirdPartyApiV2}
              thirdPartySlackv2Enabled={otherProps.thirdPartySlackv2Enabled}
              userRecommendationsCohort={otherProps.userRecommendationsCohort}
              viralSettingsCohort={otherProps.viralSettingsCohort}
              viralOptionsDefaultToCheckedFeatureFlag={
                otherProps.viralOptionsDefaultToCheckedFeatureFlag
              }
              invitePeopleDrawerMigrationCohort={
                otherProps.invitePeopleDrawerMigrationCohort
              }
              source="peopleMenu"
              subProduct={otherProps.subProduct}
            />
          </DialogWrapper>
        </Suspense>
      )}
      {!isSSR && (isOpenTeamCreateDialog || useInviteModal) && (
        <DialogWrapper>
          <Suspense fallback={null}>
            <AKModalTransition>
              {useInviteModal && (
                <AKModalDialog
                  width="small"
                  onClose={handleModalClose}
                  shouldScrollInViewport
                >
                  <InvitePeopleModalBody>
                    <div onClick={preventDialogClose}>
                      <InvitePeople
                        onSendHandler={handleModalClose}
                        onCancelHandler={handleModalClose}
                        continueUrl={instanceUrl}
                        resourceAri={siteAri}
                        showFlag={values.addFlag}
                        userRole={values.userRole}
                        enableInviteeList={otherProps.enableInviteInviteeList}
                        enableCustomizedProductSelect={
                          otherProps.enableCustomizedProductSelect
                        }
                        enableThirdParty={otherProps.enableThirdPartyInvites}
                        thirdPartyInvitesCohort={
                          otherProps.thirdPartyInvitesCohort
                        }
                        thirdPartyApiV2={otherProps.thirdPartyApiV2}
                        thirdPartySlackv2Enabled={
                          otherProps.thirdPartySlackv2Enabled
                        }
                        invitePeopleDrawerMigrationCohort={
                          otherProps.invitePeopleDrawerMigrationCohort
                        }
                        userRecommendationsCohort={
                          otherProps.userRecommendationsCohort
                        }
                        viralSettingsCohort={otherProps.viralSettingsCohort}
                        viralOptionsDefaultToCheckedFeatureFlag={
                          otherProps.viralOptionsDefaultToCheckedFeatureFlag
                        }
                        subProduct={otherProps.subProduct}
                      />
                    </div>
                  </InvitePeopleModalBody>
                </AKModalDialog>
              )}
              {isOpenTeamCreateDialog && (
                <TeamCreateDialog
                  cloudId={values.cloudId}
                  orgId={values.orgId}
                  product={values.product}
                  principalId={values.userId}
                  addFlag={values.addFlag}
                  pushRoute={values.pushRoute}
                  onClose={closeTeamCreateDialog}
                  extraAnalyticsAttrs={analyticsAttrsTeamCreateDialog}
                />
              )}
            </AKModalTransition>
          </Suspense>
        </DialogWrapper>
      )}
    </PeopleMenuContext.Provider>
  );
}
