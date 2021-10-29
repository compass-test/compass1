import React, { lazy, Suspense, useCallback, useState } from 'react';

import styled, { css } from 'styled-components';

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
const AKModalTransition = lazy(() =>
  import(
    /* webpackChunkName: "async-people-menu-modal-transition-dialog" */ '@atlaskit/modal-dialog'
  ).then((module) => ({
    default: module.ModalTransition,
  })),
);
const AKModalBody = lazy(() =>
  import(
    /* webpackChunkName: "async-people-menu-modal-transition-dialog" */ '@atlaskit/modal-dialog'
  ).then((module) => ({
    default: module.ModalBody,
  })),
);
const TeamCreateDialog = lazy(() =>
  import(
    /* webpackChunkName: "async-people-menu-team-create-dialog" */ '@atlassian/dragonfruit-people-teams'
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
const DialogWrapper = styled.span`
  ${resetBoxModel};

  &:before,
  &:after {
    ${resetBoxModel};
    content: '' !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
`;

const preventDialogClose = (event: React.MouseEvent<HTMLDivElement>) => {
  event.stopPropagation();
};

export const PeopleMenuContext = React.createContext<PeopleMenuContextProps>({
  cloudId: '',
  orgId: '',
  userId: '',
  product: 'confluence',
  testId: '',
  isPeopleMenuOpen: false,
  isInvitePeopleModalOpen: false,
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
  const [isInvitePeopleModalOpen, toggleInvitePeopleModal] = useState(false);
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
    isInvitePeopleModalOpen,
    toggleInvitePeopleModal,
    togglePeopleMenu,
    toggleTeamCreateDialog,
  };

  const handleModalClose = () => toggleInvitePeopleModal(false);
  const instanceUrl = `${window.location.protocol}//${window.location.host}`;
  const siteAri = `ari:cloud:${otherProps.product}::site/${otherProps.cloudId}`;

  return (
    <PeopleMenuContext.Provider value={values}>
      {children}
      {(isInvitePeopleModalOpen || isOpenTeamCreateDialog) && (
        <DialogWrapper>
          <Suspense fallback={null}>
            <AKModalTransition>
              {isInvitePeopleModalOpen && (
                <AKModalDialog width="small" onClose={handleModalClose}>
                  <AKModalBody>
                    <div onClick={preventDialogClose}>
                      <InvitePeople
                        onSendHandler={handleModalClose}
                        onCancelHandler={handleModalClose}
                        continueUrl={instanceUrl}
                        resourceAri={siteAri}
                        showFlag={values.addFlag}
                        userRole={values.userRole}
                        subProduct={otherProps.subProduct}
                      />
                    </div>
                  </AKModalBody>
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
                />
              )}
            </AKModalTransition>
          </Suspense>
        </DialogWrapper>
      )}
    </PeopleMenuContext.Provider>
  );
}
