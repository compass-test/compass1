import React from 'react';
import { DialogContent } from '../dialog-content';
import { DialogWithInput } from '../cross-product-search-dialog';
import { mountWithIntl } from '../../__tests__/__fixtures__/intl-test-helpers';
import { Products } from '../../common/product-context';
import { LinkComponent } from '@atlassian/search-dialog';
import { ConfluenceFeatures } from '../../confluence/confluence-features';
import { JiraFeatures } from '../../jira/features';

const commonProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onTextEntered: jest.fn,
  isExpanded: true,
  intl: null as any,
  forwardRef: null as any,
  products: [Products.confluence, Products.jira],
  theme: null as any,
  user: null as any,
  jiraFeatures: { hasSoftwareAccess: true } as JiraFeatures,
  confluenceFeatures: {} as ConfluenceFeatures,
  linkComponent: (null as any) as LinkComponent,
  formatDate: (date: any) => date as any,
  onNavigate: jest.fn(),
  setNoResultsForPreQuery: jest.fn,
  query: '',
  onRetry: jest.fn,
  setAdditionalAnalyticsContext: jest.fn,
  onRequestComplete: jest.fn,
  debounceTime: 250,
  isPreQueryEmpty: false,
  setRef: () => <div />,
  setSelectedTabIndex: jest.fn(),
  selectedTabIndex: 0,
};

jest.mock('@atlassian/search-dialog', () => {
  const React = require('react');
  return {
    SearchAnchor: () => 'div',
    SearchDialog: 'div',
    SearchInput: () => 'div',
    SearchFooter: () => 'div',
    KeyboardHighlightProvider: () => 'div',
    ThemeProvider: React.createContext({}).Provider,
    Link: () => 'a',
  };
});

jest.mock('@atlassiansox/engagekit', () => ({
  useCoordination: () => ({}),
}));

jest.mock('../../confluence/clients', () => ({
  useClients: () => ({}),
}));

jest.mock('../../jira/clients', () => ({
  useJiraCurrentUser: () => ({}),
}));

jest.mock('../../jira/filter-context', () => ({
  FilterContextProvider: ({ children, ...props }: any) => {
    return <div data-test-id="JiraFilterContextProvider">{children}</div>;
  },
}));

jest.mock('../../jira/features', () => ({
  JiraFeaturesProvider: ({ children, ...props }: any) => {
    return (
      <div name="JiraFeaturesProvider" {...props}>
        {' '}
        {children}{' '}
      </div>
    );
  },
  withJiraFeatures: (Component: any) => <Component />,
}));

jest.mock('../cross-product-search-input', () => ({
  CrossProductSearchInput: () => (
    <div data-test-id="CrossProductSearchInput"></div>
  ),
}));

jest.mock('../../common/search-session-provider', () => ({
  useSearchSessionId: () => 'some_session',
}));

jest.mock('../dialog-content', () => ({
  DialogContent: () => <div data-test-id="DialogContent"></div>,
}));

describe('<DialogWithInput />', () => {
  it('DialogContent are hidden if isPreQueryEmpty is true, and query string is empty', () => {
    const wrapper = mountWithIntl(
      <DialogWithInput {...commonProps} isPreQueryEmpty />,
    );

    expect(wrapper.find(DialogContent)).toHaveLength(0);
  });

  it('DialogContent are shown if isPreQueryEmpty is false', () => {
    const wrapper = mountWithIntl(
      <DialogWithInput {...commonProps} isPreQueryEmpty={false} />,
    );

    expect(wrapper.find(DialogContent)).toHaveLength(1);
  });
});
