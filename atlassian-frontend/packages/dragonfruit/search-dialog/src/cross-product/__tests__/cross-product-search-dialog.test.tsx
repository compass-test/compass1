import React from 'react';
import { DialogContent } from '../dialog-content';
import { DialogWithInput } from '../cross-product-search-dialog';
import { mountWithIntl } from '../../__tests__/__fixtures__/intl-test-helpers';
import { Products } from '../../common/product-context';
import { LinkComponent } from '@atlassian/search-dialog';
import { ConfluenceFeatures } from '../../confluence/confluence-features';

const commonProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onTextEntered: jest.fn,
  isExpanded: false,
  intl: null as any,
  forwardRef: null as any,
  products: [Products.confluence],
  theme: null as any,
  user: null as any,
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
  it('DialogContent is hidden if its not expanded', () => {
    const wrapper = mountWithIntl(<DialogWithInput {...commonProps} />);

    expect(wrapper.find(DialogContent)).toHaveLength(0);
  });
});
