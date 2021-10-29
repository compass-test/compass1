/* eslint-disable no-undef */
/* eslint-disable import/first */
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl';
import React from 'react';
import {
  ConfluenceClientsProvider,
  JiraSearchClientProvider,
  Products,
} from '../../../src/index';
import {
  JiraSearchDialogContent as MockJiraSearchDialogContent,
  JiraSearchDialogContentProps,
} from '../../../src/jira';
import CrossProductSearchDialog from '../../../src/cross-product/cross-product-search-dialog';
import uuid from 'uuid/v4';

// Test helpers
export const expectNonEmptyString = expect.stringMatching(/.+/);
export const searchSessionId = uuid();
export const COMMON_RECENT_PAGE_PREFIX = 'Test';

const LinkComponent: any = React.forwardRef(
  ({ isKeyboardHighlighted, onClick, isCollapsed, ...rest }: any, ref: any) => (
    /* eslint-disable-next-line */
    <a
      {...rest}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    />
  ),
);

export const onEvent = jest.fn();

jest.mock(
  '../../../src/cross-product/async-loading/async-loading-jira',
  () => ({
    AsyncJira: (props: JiraSearchDialogContentProps) => (
      <MockJiraSearchDialogContent {...props} />
    ),
  }),
);

const config = {
  isUserAnonymous: false,
  aggregatorUrl: 'some/url',
  cloudId: 'some-cloud-id',
  baseUrl: '',
  collaborationGraphUrl: 'some/url',
};

export const DialogWrapper = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <IntlProvider locale="en">
      <>
        <AnalyticsListener
          channel="*"
          onEvent={({ payload }: any) =>
            onEvent(
              `${payload.actionSubject} ${payload.action} ${
                payload.actionSubjectId ? `(${payload.actionSubjectId})` : ''
              }`,
              payload,
            )
          }
        >
          <ConfluenceClientsProvider config={config}>
            <JiraSearchClientProvider {...config}>
              <CrossProductSearchDialog
                products={[Products.jira]}
                onNavigate={() => {}}
                isExpanded={isExpanded}
                onOpen={() => setIsExpanded(true)}
                onClose={() => setIsExpanded(false)}
                linkComponent={LinkComponent}
                user={{
                  name: 'analytics_test_user',
                  email: 'analytics_test_user@atlassian.com',
                  id: 'it_is_not_anonymous',
                }}
                jiraFeatures={{
                  hasSoftwareAccess: true,
                }}
              />
            </JiraSearchClientProvider>
          </ConfluenceClientsProvider>
        </AnalyticsListener>
        <button type="button">Dummy button outside dialog</button>
      </>
    </IntlProvider>
  );
};
