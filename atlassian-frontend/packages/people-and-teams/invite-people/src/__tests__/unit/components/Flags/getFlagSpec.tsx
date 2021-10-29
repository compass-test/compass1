import { ShallowWrapper } from 'enzyme';

import {
  getErrorFlag,
  getFailureFlag,
  getGenericErrorFlag,
  getSuccessFlag,
  getSuccessFlagForInviteToJiraProject,
  getViralSettingsFlags,
} from '../../../../components/Flags/getFlag';

import {
  BulkInviteFailureResponse,
  BulkInviteSuccessResponse,
  Flag,
} from '../../../../types';

import { CLOUD_ADMIN_URL } from '../../../../utils';

import { messages } from '../../../../components/i18n/messages';
import { IntlProvider } from 'react-intl';

const testProduct = ['confluence'];
const testCloudId = 'cloud-id';
const invalidSuccessResponse = {} as BulkInviteSuccessResponse;
const invalidFailureResponse = {} as BulkInviteFailureResponse;

const intlProvider = new IntlProvider({ locale: 'en', messages });
const { intl } = intlProvider.getChildContext();

describe('getErrorFlag', () => {
  const errorResponse = {
    error: [{ id: 'user+1' }],
  } as BulkInviteSuccessResponse;

  it('should return null if there is no `error` property in the first argument', () => {
    const result = getErrorFlag(invalidSuccessResponse, 'admin');
    expect(result).toBeNull();
  });

  it('should parse the flag object correctly', () => {
    const result = getErrorFlag(errorResponse, 'admin');

    expect(result!.appearance).toEqual('error');

    expect((result!.title as ShallowWrapper).props).toMatchObject({
      id: messages.inviteFailedFlagTitle.id,
      values: {
        isAdmin: true,
        failedInviteCount: errorResponse.error.length,
      },
    });

    expect((result!.description as ShallowWrapper).props).toMatchObject({
      id: messages.inviteFailedFlagDescription.id,
      values: {
        isAdmin: true,
        failedInviteCount: errorResponse.error.length,
      },
    });

    expect((result!.actions![0].content as ShallowWrapper).props).toMatchObject(
      {
        id: messages.contactSupportActionLabel.id,
      },
    );
    expect(result!.actions![0].href).toEqual(
      'https://support.atlassian.com/contact/',
    );
    expect(result!.actions![0].target).toEqual('_blank');
  });

  it('should parse no action for non admin', () => {
    let result = getErrorFlag(errorResponse, 'trusted');
    expect(result!.actions).toEqual([]);

    result = getErrorFlag(errorResponse, 'basic');
    expect(result!.actions).toEqual([]);
  });
});

describe('getFailureFlag', () => {
  const failureResponse = {
    failure: {
      message: 'Licence exceeded',
      code: 'licence-exceeded',
    },
  } as BulkInviteFailureResponse;

  const failedEmails = ['user+1@atlassian.com', 'user+2@atlassian.com'];

  it('should return null if there is no `failure` property in the first argument', () => {
    const result = getFailureFlag(
      invalidFailureResponse,
      testCloudId,
      'admin',
      failedEmails,
    );
    expect(result).toBeNull();
  });

  describe('licence-exceed', () => {
    describe('invite in jira project', () => {
      it('should parse the flag object correctly', () => {
        const result = getFailureFlag(
          failureResponse,
          testCloudId,
          'admin',
          failedEmails,
          true,
        );

        expect(result!.appearance).toEqual('warning');

        expect((result!.title as ShallowWrapper).props).toMatchObject({
          id: messages.licenceExceededInJiraProjectFlagTitle.id,
          values: {
            failedInviteCount: failedEmails.length,
          },
        });

        expect((result!.description as ShallowWrapper).props).toMatchObject({
          id: messages.licenceExceededInJiraProjectFlagDescription.id,
          values: {
            emailFailedToInvite: failedEmails[0],
            failedInviteCount: failedEmails.length,
            userRole: 'admin',
          },
        });

        expect(
          (result!.actions![0].content as ShallowWrapper).props,
        ).toMatchObject({
          id: messages.upgradePlanActionLabel.id,
        });
        expect(result!.actions![0].href).toEqual(
          `${CLOUD_ADMIN_URL}/s/${testCloudId}/billing/applications`,
        );
        expect(result!.actions![0].target).toEqual('_blank');

        expect(
          (result!.actions![1].content as ShallowWrapper).props,
        ).toMatchObject({
          id: messages.viewUsersActionLabel.id,
        });
        expect(result!.actions![1].href).toEqual(
          `${CLOUD_ADMIN_URL}/s/${testCloudId}/users`,
        );
        expect(result!.actions![1].target).toEqual('_blank');
      });

      it('should parse no actions for non admin', () => {
        let result = getFailureFlag(
          failureResponse,
          testCloudId,
          'trusted',
          failedEmails,
        );
        expect(result!.actions).toEqual([]);

        result = getFailureFlag(
          failureResponse,
          testCloudId,
          'basic',
          failedEmails,
        );
        expect(result!.actions).toEqual([]);
      });
    });

    it('should parse the flag object correctly', () => {
      const result = getFailureFlag(
        failureResponse,
        testCloudId,
        'admin',
        failedEmails,
      );

      expect(result!.appearance).toEqual('warning');

      expect((result!.title as ShallowWrapper).props).toMatchObject({
        id: messages.licenceExceededFlagTitle.id,
      });

      expect((result!.description as ShallowWrapper).props).toMatchObject({
        id: messages.licenceExceededFlagDescription.id,
        values: {
          userRole: 'admin',
          failedInviteCount: failedEmails.length,
        },
      });

      expect(
        (result!.actions![0].content as ShallowWrapper).props,
      ).toMatchObject({
        id: messages.upgradePlanActionLabel.id,
      });
      expect(result!.actions![0].href).toEqual(
        `${CLOUD_ADMIN_URL}/s/${testCloudId}/billing/applications`,
      );
      expect(result!.actions![0].target).toEqual('_blank');

      expect(
        (result!.actions![1].content as ShallowWrapper).props,
      ).toMatchObject({
        id: messages.viewUsersActionLabel.id,
      });
      expect(result!.actions![1].href).toEqual(
        `${CLOUD_ADMIN_URL}/s/${testCloudId}/users`,
      );
      expect(result!.actions![1].target).toEqual('_blank');
    });

    it('should parse no actions for non admin', () => {
      let result = getFailureFlag(
        failureResponse,
        testCloudId,
        'trusted',
        failedEmails,
      );
      expect(result!.actions).toEqual([]);

      result = getFailureFlag(
        failureResponse,
        testCloudId,
        'basic',
        failedEmails,
      );
      expect(result!.actions).toEqual([]);
    });
  });

  describe('other errors', () => {
    it('should return a generic flag object', () => {
      const result = getFailureFlag(
        {
          failure: { message: 'other error', code: 'other-error', status: 400 },
        },
        testCloudId,
        'admin',
        failedEmails,
      );

      expect(result).toEqual(getGenericErrorFlag('admin'));
    });
  });
});

describe('getGenericErrorFlag', () => {
  it('should return a correctly parsed flag object', () => {
    const result = getGenericErrorFlag('admin');

    expect(result!.appearance).toEqual('error');

    expect((result!.title as ShallowWrapper).props).toMatchObject({
      id: messages.genericFailedFlagTitle.id,
    });

    expect((result!.description as ShallowWrapper).props).toMatchObject({
      id: messages.genericFailedFlagDescription.id,
      values: {
        isAdmin: true,
      },
    });

    expect((result!.actions![0].content as ShallowWrapper).props).toMatchObject(
      {
        id: messages.contactSupportActionLabel.id,
      },
    );
    expect(result!.actions![0].href).toEqual(
      'https://support.atlassian.com/contact/',
    );
    expect(result!.actions![0].target).toEqual('_blank');
  });

  it('should parse no actions for non-admin', () => {
    let result = getGenericErrorFlag('trusted');
    expect(result.actions).toEqual([]);

    result = getGenericErrorFlag('basic');
    expect(result.actions).toEqual([]);
  });
});

describe('getSuccessFlag', () => {
  const invitedResponse = {
    invited: [
      {
        id: 'user+1',
        email: 'user+1@atlassian.com',
      },
      {
        id: 'user+2',
        email: 'user+2@atlassian.com',
      },
    ],
    accessRequested: [],
    error: [],
  } as BulkInviteSuccessResponse;

  const accessRequestResponse = {
    invited: [],
    accessRequested: [
      {
        id: 'user+1',
        email: 'user+1@atlassian.com',
      },
      {
        id: 'user+2',
        email: 'user+2@atlassian.com',
      },
    ],
    error: [],
  } as BulkInviteSuccessResponse;

  const hybridResponse = {
    invited: [
      {
        id: 'user+1',
        email: 'user+1@atlassian.com',
      },
    ],
    accessRequested: [
      {
        id: 'user+2',
        email: 'user+2@atlassian.com',
      },
    ],
    error: [],
  } as BulkInviteSuccessResponse;

  describe('invite to jira project', () => {
    it('should return null if there is no `invited` and `accessRequested` properties in the first argument', () => {
      const result = getSuccessFlagForInviteToJiraProject(
        invalidSuccessResponse,
        testCloudId,
        testProduct,
        'admin',
        'mentionInEditor',
        intl,
        {
          continueUrl: 'http://test.com',
          jiraProjectName: 'TestProject',
          jiraProjectKey: 'TES',
        },
      );
      expect(result).toBeNull();
    });

    describe('invite success', () => {
      it('should return a correctly parsed flag object', () => {
        const result = getSuccessFlagForInviteToJiraProject(
          invitedResponse,
          testCloudId,
          testProduct,
          'admin',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );

        expect(result!.appearance).toEqual('success');

        expect((result!.title as ShallowWrapper).props).toMatchObject({
          id: messages.inviteToJiraProjectSuccessFlagTitle.id,
        });

        expect((result!.description as ShallowWrapper).props).toMatchObject({
          id: messages.inviteToJiraProjectSuccessFlagDescription.id,
          values: {
            inviteCount: invitedResponse.invited.length,
            requestAccessCount: invitedResponse.accessRequested.length,
            emailInvited: invitedResponse.invited[0].email,
            emailRequestedAccess: '',
            product: 'Confluence',
            jiraProjectName: 'TestProject',
            isAdmin: true,
            combination: undefined,
          },
        });

        expect(
          (result!.actions![0].content as ShallowWrapper).props,
        ).toMatchObject({
          id: messages.jiraProjectSettingsLabel.id,
        });
        expect(result!.actions![0].href).toEqual(
          `http://test.com/jira/software/projects/TES/settings/access`,
        );
        expect(result!.actions![0].target).toEqual('_blank');
      });

      it('should return a correctly parsed flag object when the user invites to multiple products', () => {
        const testProducts = ['confluence', 'jira-software'];
        const result = getSuccessFlagForInviteToJiraProject(
          invitedResponse,
          testCloudId,
          testProducts,
          'admin',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );

        expect(result!.appearance).toEqual('success');

        expect((result!.title as ShallowWrapper).props).toMatchObject({
          id: messages.inviteToJiraProjectSuccessFlagTitle.id,
        });

        expect((result!.description as ShallowWrapper).props).toMatchObject({
          id: messages.inviteToJiraProjectSuccessFlagDescription.id,
          values: {
            inviteCount: invitedResponse.invited.length,
            requestAccessCount: invitedResponse.accessRequested.length,
            emailInvited: invitedResponse.invited[0].email,
            emailRequestedAccess: '',
            product: null,
            productCount: 2,
            jiraProjectName: 'TestProject',
            isAdmin: true,
            combination: undefined,
          },
        });

        expect(
          (result!.actions![0].content as ShallowWrapper).props,
        ).toMatchObject({
          id: messages.jiraProjectSettingsLabel.id,
        });
        expect(result!.actions![0].href).toEqual(
          `http://test.com/jira/software/projects/TES/settings/access`,
        );
        expect(result!.actions![0].target).toEqual('_blank');
      });

      it('should return no actions for non-admin', () => {
        let result = getSuccessFlagForInviteToJiraProject(
          invitedResponse,
          testCloudId,
          testProduct,
          'trusted',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );
        expect(result!.actions).toEqual([]);

        result = getSuccessFlagForInviteToJiraProject(
          invitedResponse,
          testCloudId,
          testProduct,
          'basic',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );
        expect(result!.actions).toEqual([]);
      });
    });

    describe('request access success', () => {
      it('should return a correctly parsed flag object', () => {
        const result = getSuccessFlagForInviteToJiraProject(
          accessRequestResponse,
          testCloudId,
          testProduct,
          'admin',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );

        expect(result!.appearance).toEqual('success');

        expect((result!.title as ShallowWrapper).props).toMatchObject({
          id: messages.requestAccessToJiraProjectSuccessFlagTitle.id,
        });

        expect((result!.description as ShallowWrapper).props).toMatchObject({
          id: messages.requestAccessToJiraProjectSuccessFlagDescription.id,
          values: {
            inviteCount: accessRequestResponse.invited.length,
            requestAccessCount: accessRequestResponse.accessRequested.length,
            emailInvited: '',
            emailRequestedAccess:
              accessRequestResponse.accessRequested[0].email,
            product: 'Confluence',
            jiraProjectName: 'TestProject',
            isAdmin: true,
            combination: undefined,
          },
        });

        expect(result!.actions).toEqual([]);
      });
    });

    describe('hybrid success', () => {
      it('should return a correctly parsed flag object', () => {
        const result = getSuccessFlagForInviteToJiraProject(
          hybridResponse,
          testCloudId,
          testProduct,
          'admin',
          'mentionInEditor',
          intl,
          {
            continueUrl: 'http://test.com',
            jiraProjectName: 'TestProject',
            jiraProjectKey: 'TES',
          },
        );

        expect(result!.appearance).toEqual('success');

        expect((result!.title as ShallowWrapper).props).toMatchObject({
          id: messages.hybridToJiraProjectSuccessFlagTitle.id,
        });

        expect((result!.description as ShallowWrapper).props).toMatchObject({
          id: messages.hybridToJiraProjectSuccessFlagDescription.id,
          values: {
            inviteCount: hybridResponse.invited.length,
            requestAccessCount: hybridResponse.accessRequested.length,
            emailInvited: hybridResponse.invited[0].email,
            emailRequestedAccess: hybridResponse.accessRequested[0].email,
            product: 'Confluence',
            jiraProjectName: 'TestProject',
            isAdmin: true,
            combination: 'singleHybrid',
          },
        });

        expect(result!.actions).toEqual([]);
      });
    });
  });

  it('should return null if there is no `invited` and `accessRequested` properties in the first argument', () => {
    const result = getSuccessFlag(
      invalidSuccessResponse,
      testCloudId,
      testProduct,
      'admin',
      intl,
    );
    expect(result).toBeNull();
  });

  describe('invite success', () => {
    it('should return a correctly parsed flag object', () => {
      const result = getSuccessFlag(
        invitedResponse,
        testCloudId,
        testProduct,
        'admin',
        intl,
      );

      expect(result!.appearance).toEqual('success');

      expect((result!.title as ShallowWrapper).props).toMatchObject({
        id: messages.genericSuccessFlagTitle.id,
      });

      expect((result!.description as ShallowWrapper).props).toMatchObject({
        id: messages.inviteSuccessFlagDescription.id,
        values: {
          inviteCount: invitedResponse.invited.length,
          requestAccessCount: invitedResponse.accessRequested.length,
          emailInvited: invitedResponse.invited[0].email,
          emailRequestedAccess: '',
          product: 'Confluence',
        },
      });

      expect(
        (result!.actions![0].content as ShallowWrapper).props,
      ).toMatchObject({
        id: messages.viewUsersActionLabel.id,
      });
      expect(result!.actions![0].href).toEqual(
        `${CLOUD_ADMIN_URL}/s/${testCloudId}/users`,
      );
      expect(result!.actions![0].target).toEqual('_blank');
    });

    it('should return a correctly parsed flag object when the user invites to multiple products', () => {
      const testProducts = ['confluence', 'jira-software'];
      const result = getSuccessFlag(
        invitedResponse,
        testCloudId,
        testProducts,
        'admin',
        intl,
      );

      expect(result!.appearance).toEqual('success');

      expect((result!.title as ShallowWrapper).props).toMatchObject({
        id: messages.genericSuccessFlagTitle.id,
      });

      expect((result!.description as ShallowWrapper).props).toMatchObject({
        id: messages.inviteSuccessFlagDescription.id,
        values: {
          inviteCount: invitedResponse.invited.length,
          requestAccessCount: invitedResponse.accessRequested.length,
          emailInvited: invitedResponse.invited[0].email,
          emailRequestedAccess: '',
          product: null,
          productCount: 2,
        },
      });

      expect(
        (result!.actions![0].content as ShallowWrapper).props,
      ).toMatchObject({
        id: messages.viewUsersActionLabel.id,
      });
      expect(result!.actions![0].href).toEqual(
        `${CLOUD_ADMIN_URL}/s/${testCloudId}/users`,
      );
      expect(result!.actions![0].target).toEqual('_blank');
    });

    it('should return no actions for non-admin', () => {
      let result = getSuccessFlag(
        invitedResponse,
        testCloudId,
        testProduct,
        'trusted',
        intl,
      );
      expect(result!.actions).toEqual([]);

      result = getSuccessFlag(
        invitedResponse,
        testCloudId,
        testProduct,
        'basic',
        intl,
      );
      expect(result!.actions).toEqual([]);
    });
  });

  describe('request access success', () => {
    it('should return a correctly parsed flag object', () => {
      const result = getSuccessFlag(
        accessRequestResponse,
        testCloudId,
        testProduct,
        'admin',
        intl,
      );

      expect(result!.appearance).toEqual('success');

      expect((result!.title as ShallowWrapper).props).toMatchObject({
        id: messages.genericSuccessFlagTitle.id,
      });

      expect((result!.description as ShallowWrapper).props).toMatchObject({
        id: messages.requestAccessSuccessFlagDescription.id,
        values: {
          inviteCount: accessRequestResponse.invited.length,
          requestAccessCount: accessRequestResponse.accessRequested.length,
          emailInvited: '',
          emailRequestedAccess: accessRequestResponse.accessRequested[0].email,
          product: 'Confluence',
        },
      });

      expect(result!.actions).toEqual([]);
    });
  });

  describe('hybrid success', () => {
    it('should return a correctly parsed flag object', () => {
      const result = getSuccessFlag(
        hybridResponse,
        testCloudId,
        testProduct,
        'admin',
        intl,
      );

      expect(result!.appearance).toEqual('success');

      expect((result!.title as ShallowWrapper).props).toMatchObject({
        id: messages.genericSuccessFlagTitle.id,
      });

      expect((result!.description as ShallowWrapper).props).toMatchObject({
        id: messages.hybridSuccessFlagDescription.id,
        values: {
          inviteCount: hybridResponse.invited.length,
          requestAccessCount: hybridResponse.accessRequested.length,
          emailInvited: hybridResponse.invited[0].email,
          emailRequestedAccess: hybridResponse.accessRequested[0].email,
          product: 'Confluence',
        },
      });

      expect(result!.actions).toEqual([]);
    });
  });

  describe('viral settings', () => {
    const testProductName = 'test-product';
    const testDomain1 = 'domain1.com';
    const testDomain2 = 'domain2.net';
    type TestFlagProps = {
      appearance: string;
      title: {
        id: string;
        values?: any;
      };
      description: {
        id: string;
        values?: any;
      };
      actionLabelId: string;
    };
    const testFlag = (
      flag: Flag,
      { appearance, title, description, actionLabelId }: TestFlagProps,
    ) => {
      expect(flag.appearance).toBe(appearance);
      expect((flag.title as ShallowWrapper).props).toMatchObject({
        ...title,
      });
      expect((flag.description as ShallowWrapper).props).toMatchObject({
        ...description,
      });
      const actions = flag.actions || [];
      expect(actions.length).toBe(1);
      expect((actions[0].content as ShallowWrapper).props).toMatchObject({
        id: actionLabelId,
      });
    };
    it('should return a single success flag when both open invite and all direct access settings were successful', () => {
      const flags = getViralSettingsFlags(
        true,
        true,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(1);
      testFlag(flags[0], {
        appearance: 'success',
        title: {
          id: messages.viralSettingsSuccessFlagTitle.id,
        },
        description: {
          id: messages.viralSettingsSuccessFlagDescription.id,
        },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
    });
    it('should return a success open invite flag and also a failed direct access flag for each domain', () => {
      const flags = getViralSettingsFlags(
        true,
        false,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(3);
      testFlag(flags[0], {
        appearance: 'success',
        title: { id: messages.openInviteSuccessFlagTitle.id },
        description: { id: messages.openInviteSuccessFlagDescription.id },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
      testFlag(flags[1], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain1}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[2], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
    });
    it('should return a success open invite flag and also a failed direct access flag for each domain', () => {
      const flags = getViralSettingsFlags(
        true,
        false,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(3);
      testFlag(flags[0], {
        appearance: 'success',
        title: { id: messages.openInviteSuccessFlagTitle.id },
        description: { id: messages.openInviteSuccessFlagDescription.id },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
      testFlag(flags[1], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain1}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[2], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
    });
    it('should return a failed open invite flag and a success direct access flag', () => {
      const flags = getViralSettingsFlags(
        false,
        true,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(2);
      testFlag(flags[0], {
        appearance: 'error',
        title: { id: messages.openInviteFailureFlagTitle.id },
        description: { id: messages.openInviteFailureFlagDescription.id },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[1], {
        appearance: 'success',
        title: { id: messages.directAccessSuccessFlagTitle.id },
        description: {
          id: messages.directAccessSuccessFlagDescription.id,
          values: { domains: `@${testDomain1}, @${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
    });
    it('should return a failed open invite flag and a failed direct access flag for each domain', () => {
      const flags = getViralSettingsFlags(
        false,
        false,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(3);
      testFlag(flags[0], {
        appearance: 'error',
        title: { id: messages.openInviteFailureFlagTitle.id },
        description: { id: messages.openInviteFailureFlagDescription.id },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[1], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain1}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[2], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
    });
    it('should return no flags as no viral settings update was attempted', () => {
      const flags = getViralSettingsFlags(
        undefined,
        undefined,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(0);
    });
    it('should only return a success flag for open invites', () => {
      const flags = getViralSettingsFlags(
        true,
        undefined,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(1);
      testFlag(flags[0], {
        appearance: 'success',
        title: {
          id: messages.openInviteSuccessFlagTitle.id,
        },
        description: {
          id: messages.openInviteSuccessFlagDescription.id,
        },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
    });
    it('should only return a fail flag for open invites', () => {
      const flags = getViralSettingsFlags(
        false,
        undefined,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(1);
      testFlag(flags[0], {
        appearance: 'error',
        title: { id: messages.openInviteFailureFlagTitle.id },
        description: { id: messages.openInviteFailureFlagDescription.id },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
    });
    it('should only return a success flag for direct access', () => {
      const flags = getViralSettingsFlags(
        undefined,
        true,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(1);
      testFlag(flags[0], {
        appearance: 'success',
        title: { id: messages.directAccessSuccessFlagTitle.id },
        description: {
          id: messages.directAccessSuccessFlagDescription.id,
          values: { domains: `@${testDomain1}, @${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsSuccessFlagActionLabel.id,
      });
    });
    it('should return a fail flag for each direct access domain', () => {
      const flags = getViralSettingsFlags(
        undefined,
        false,
        [testDomain1, testDomain2],
        testCloudId,
        testProductName,
      );
      expect(flags.length).toBe(2);
      testFlag(flags[0], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain1}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
      testFlag(flags[1], {
        appearance: 'error',
        title: { id: messages.directAccessFailureFlagTitle.id },
        description: {
          id: messages.directAccessFailureFlagDescription.id,
          values: { domain: `@${testDomain2}` },
        },
        actionLabelId: messages.viralSettingsFailureFlagActionLabel.id,
      });
    });
  });
});
