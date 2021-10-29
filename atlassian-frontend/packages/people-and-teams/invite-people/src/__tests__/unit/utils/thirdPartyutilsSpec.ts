import { ExternalUser } from '@atlaskit/user-picker';
import {
  manageSlackWorkspaces,
  mergeExternalUsers,
} from '../../../components/ThirdParty/utils';
import {
  CONFLUENCE_SLACK_URL,
  JIRA_SLACK_URL,
} from '../../../components/ThirdParty/constants';
import { SlackWorkspace } from '../../../types';

let slackWorkspaces: SlackWorkspace[] = [];
const openSlackConnectDialog = jest.fn();
const onSelectedSlackWorkspaceChange = jest.fn();
const products = ['jira', 'confluence'];
const flagCombinations = [
  { isConnected: true, isSlackConnectDialogOpen: true },
  { isConnected: true, isSlackConnectDialogOpen: false },
  { isConnected: false, isSlackConnectDialogOpen: true },
  { isConnected: false, isSlackConnectDialogOpen: false },
];

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

describe('manageSlackWorkspaces', () => {
  beforeEach(() => {
    slackWorkspaces = [];
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when slack workspaces collection', () => {
    flagCombinations.forEach(({ isConnected, isSlackConnectDialogOpen }) => {
      describe(`is empty, connected flag is '${isConnected}' and open dialog flag is '${isSlackConnectDialogOpen}',
        then should verify that`, () => {
        it('a window is opened with Jira Slack Url when product is jira', () => {
          manageSlackWorkspaces(
            isConnected,
            slackWorkspaces,
            isSlackConnectDialogOpen,
            openSlackConnectDialog,
            onSelectedSlackWorkspaceChange,
            'jira',
          );

          expect(window.open).toHaveBeenCalledWith(JIRA_SLACK_URL);
        });

        it('a window is opened with Confluence Slack Url when product is confluence', () => {
          manageSlackWorkspaces(
            isConnected,
            slackWorkspaces,
            isSlackConnectDialogOpen,
            openSlackConnectDialog,
            onSelectedSlackWorkspaceChange,
            'confluence',
          );

          expect(window.open).toHaveBeenCalledWith(CONFLUENCE_SLACK_URL);
        });

        it('no interaction with window.open when product is neither jira nor confluence', () => {
          manageSlackWorkspaces(
            isConnected,
            slackWorkspaces,
            isSlackConnectDialogOpen,
            openSlackConnectDialog,
            onSelectedSlackWorkspaceChange,
            'whatever',
          );

          expect(window.open).toHaveBeenCalledTimes(0);
        });

        products.forEach((product) => {
          it(`no attempt is made for connection, for '${product}' product`, () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(onSelectedSlackWorkspaceChange).not.toHaveBeenCalled();
          });

          it(`no attempt is made to open the slack connect dialog, for '${product}' product`, () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(openSlackConnectDialog).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('is defined with only one workspace', () => {
      let isConnected: boolean;
      let isSlackConnectDialogOpen: boolean;

      beforeEach(() => {
        slackWorkspaces = [slackWorkspace1];
      });

      products.forEach((product) => {
        describe(`and neither the workspace is connected nor the dialog is open for '${product}' product, should verify that`, () => {
          beforeEach(() => {
            isConnected = false;
            isSlackConnectDialogOpen = false;
          });

          it('the available workspace has been connected', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(onSelectedSlackWorkspaceChange).toHaveBeenCalledWith(
              slackWorkspace1,
            );
          });

          it('no attempt is made to open the slack connect dialog', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(openSlackConnectDialog).not.toHaveBeenCalled();
          });
        });

        describe(`and the workspace is connected but the dialog is not open for '${product}' product, should verify that`, () => {
          beforeEach(() => {
            isConnected = true;
            isSlackConnectDialogOpen = false;
          });

          it('no attempt is made to connect the available workspace', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(onSelectedSlackWorkspaceChange).not.toHaveBeenCalled();
          });

          it('an attempt is made to open the slack connect dialog', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(openSlackConnectDialog).toHaveBeenCalled();
          });
        });

        describe(`and the workspace is not connected but the dialog is already open for '${product}' product, should verify that`, () => {
          beforeEach(() => {
            isConnected = false;
            isSlackConnectDialogOpen = true;
          });

          it('the available workspace has been connected', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(onSelectedSlackWorkspaceChange).toHaveBeenCalledWith(
              slackWorkspace1,
            );
          });

          it('no attempt is made to open the slack connect dialog', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(openSlackConnectDialog).not.toHaveBeenCalled();
          });
        });

        describe(`both the workspace is connected as well as the dialog is open for '${product}' product, should verify that`, () => {
          beforeEach(() => {
            isConnected = true;
            isSlackConnectDialogOpen = true;
          });

          it('no attempt is made to connect the available workspace', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(onSelectedSlackWorkspaceChange).not.toHaveBeenCalled();
          });

          it('no attempt is made to open the slack connect dialog', () => {
            manageSlackWorkspaces(
              isConnected,
              slackWorkspaces,
              isSlackConnectDialogOpen,
              openSlackConnectDialog,
              onSelectedSlackWorkspaceChange,
              product,
            );

            expect(openSlackConnectDialog).not.toHaveBeenCalled();
          });
        });
      });

      flagCombinations.forEach(({ isConnected, isSlackConnectDialogOpen }) => {
        describe(`is not empty, connected flag is '${isConnected}' and open dialog flag is '${isSlackConnectDialogOpen}',
        then should verify that`, () => {
          beforeEach(() => {
            slackWorkspaces = [slackWorkspace1] as SlackWorkspace[];
          });

          products.forEach((product) => {
            it(`should verify that no interaction with window.open, for '${product}' product`, () => {
              manageSlackWorkspaces(
                isConnected,
                slackWorkspaces,
                isSlackConnectDialogOpen,
                openSlackConnectDialog,
                onSelectedSlackWorkspaceChange,
                product,
              );

              expect(window.open).not.toHaveBeenCalled();
            });
          });
        });
      });

      products.forEach((product) => {
        describe(`is defined with more than one slack workspaces, for '${product}' product`, () => {
          beforeEach(() => {
            slackWorkspaces = [slackWorkspace1, slackWorkspace2];
          });

          flagCombinations.forEach(
            ({ isConnected, isSlackConnectDialogOpen }) => {
              describe(`is not empty, connected flag is '${isConnected}' and open dialog flag is '${isSlackConnectDialogOpen}',
        then should verify that`, () => {
                it('no attempt is made to connect the available workspace', () => {
                  manageSlackWorkspaces(
                    isConnected,
                    slackWorkspaces,
                    isSlackConnectDialogOpen,
                    openSlackConnectDialog,
                    onSelectedSlackWorkspaceChange,
                    product,
                  );

                  expect(onSelectedSlackWorkspaceChange).not.toHaveBeenCalled();
                });
              });
            },
          );

          describe('and neither the workspace is connected nor the dialog is open, should verify that', () => {
            it('an attempt is made to open the slack connect dialog', () => {
              manageSlackWorkspaces(
                false,
                slackWorkspaces,
                false,
                openSlackConnectDialog,
                onSelectedSlackWorkspaceChange,
                product,
              );

              expect(openSlackConnectDialog).toHaveBeenCalled();
            });
          });

          describe('and the workspace is connected but the dialog is not open, should verify that', () => {
            it('an attempt is made to open the slack connect dialog', () => {
              manageSlackWorkspaces(
                true,
                slackWorkspaces,
                false,
                openSlackConnectDialog,
                onSelectedSlackWorkspaceChange,
                product,
              );

              expect(openSlackConnectDialog).toHaveBeenCalled();
            });
          });

          describe('and the workspace is not connected but the dialog is already open, should verify that', () => {
            it('no attempt is made to open the slack connect dialog', () => {
              manageSlackWorkspaces(
                false,
                slackWorkspaces,
                true,
                openSlackConnectDialog,
                onSelectedSlackWorkspaceChange,
                product,
              );

              expect(openSlackConnectDialog).not.toHaveBeenCalled();
            });
          });

          describe('both the workspace is connected as well as the dialog is open, should verify that', () => {
            it('no attempt is made to open the slack connect dialog', () => {
              manageSlackWorkspaces(
                true,
                slackWorkspaces,
                true,
                openSlackConnectDialog,
                onSelectedSlackWorkspaceChange,
                product,
              );

              expect(openSlackConnectDialog).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

describe('mergeExternalUsers', () => {
  it('should merge external users and their sources based on emails', () => {
    const list1: ExternalUser[] = [
      {
        id: 'email@email.com',
        email: 'email@email.com',
        name: 'Name',
        publicName: 'Test',
        avatarUrl: undefined,
        type: 'user',
        isExternal: true,
        sources: ['google', 'microsoft'],
      },
    ];

    const list2: ExternalUser[] = [
      {
        id: 'email@email.com',
        email: 'email@email.com',
        name: 'Name',
        publicName: undefined,
        avatarUrl: 'avatar-url',
        type: 'user',
        isExternal: true,
        sources: ['slack'],
      },
      {
        id: 'email_2@email.com',
        email: 'email_2@email.com',
        name: 'Name 2',
        publicName: 'Test 2',
        avatarUrl: undefined,
        type: 'user',
        isExternal: true,
        sources: ['google', 'microsoft'],
      },
    ];

    const mergedList = mergeExternalUsers(list1, list2);
    expect(mergedList.length).toEqual(2);
    expect(mergedList[0]).toEqual({
      id: 'email@email.com',
      email: 'email@email.com',
      name: 'Name',
      publicName: 'Test',
      avatarUrl: 'avatar-url',
      type: 'user',
      isExternal: true,
      sources: ['google', 'microsoft', 'slack'],
    });
    expect(mergedList[1]).toEqual({
      id: 'email_2@email.com',
      email: 'email_2@email.com',
      name: 'Name 2',
      publicName: 'Test 2',
      avatarUrl: undefined,
      type: 'user',
      isExternal: true,
      sources: ['google', 'microsoft'],
    });
  });
});
