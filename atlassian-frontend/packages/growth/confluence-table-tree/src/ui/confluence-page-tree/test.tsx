/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import {
  ConfluencePageTreeWithoutHeading,
  ConfluencePageTreeProps,
} from './index';
import { getChildren } from '../../services/confluence';
import { getMockResponseForGetChildren } from '../../services/confluence/mocks';
import { useConfluencePageTreeContext } from '../../controllers/page-tree';
import * as i18n from '../../i18n';
import { TreeStates } from '../../types';

jest.mock('../../controllers/page-tree');
jest.mock('../../services/confluence');
const mockedGetChildren = mocked(getChildren);

jest.mock('../../i18n');
const mockedI18n = mocked(i18n);

const BasePageTree = (props: Partial<ConfluencePageTreeProps>) => (
  <ConfluencePageTreeWithoutHeading
    contentId="CONTENT-ID"
    cloudId="CLOUD-ID"
    spaceKey="SPACE-KEY"
    readOnly={false}
    onError={() => {}}
    onStateChanged={() => {}}
    onEdit={() => {}}
    isEmbeddedPagesExperiment={false}
    {...props}
  />
);

const mockPageChildren = (args: { number?: number } = {}) => {
  mockedGetChildren.mockResolvedValue(
    getMockResponseForGetChildren({ ...args }),
  );
  mocked(useConfluencePageTreeContext).mockReturnValue({
    setContent: () => {},
    expandSubtree: () => Promise.reject(),
    collapseSubtree: () => {},
    insertPage: () => Promise.reject(),
    updatePage: () => Promise.reject(),
    removePage: () => Promise.reject(),
    items: getMockResponseForGetChildren(args).map((page, index) => ({
      ...page,
      isExpanded: false,
      path: [index],
    })),
    treeState: TreeStates.Loading,
    rootContentId: null,
    spaceKey: 'FOO',
    errorType: null,
    accountId: 'dummy-account-id',
  });
};
const mockNewlyCreatedPage = mockPageChildren;
const mockModifiedPage = () => mockPageChildren({ number: 2 });

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Page Tree', () => {
  it('should render a row containing the "Created" string when a page has NEVER been modified', async () => {
    mockNewlyCreatedPage();
    render(<BasePageTree />);
    const newPage = await screen.findByText('Created less than a minute ago');
    expect(newPage).toBeDefined();
  });
  it('should render a row containing the "Updated" string when a page HAS been modified', async () => {
    mockModifiedPage();
    render(<BasePageTree />);
    const modifiedPage = await screen.findByText(
      'Updated less than a minute ago',
    );
    expect(modifiedPage).toBeDefined();
  });
  it('should be internationalised', async () => {
    mockPageChildren();
    mockedI18n.fr = {
      ...mockedI18n.fr,
      'confluence-table-tree.friendly-when-created': 'Créé',
    } as typeof mockedI18n.fr; // "when-created" is not translated yet, other strings (except 'unknown') are never rendered by ConfluenceTableTreeWithoutHeadings
    render(<BasePageTree locale="fr-ch" />);
    const translated = await screen.findByText('Créé', { exact: false });
    expect(translated).toBeDefined();
  });
});

describe('Page Tree (Embedded Pages)', () => {
  it('should render a row containing the "Created" string when a page has NEVER been modified', async () => {
    mockNewlyCreatedPage();
    render(<BasePageTree isEmbeddedPagesExperiment />);
    const newPage = await screen.findByText('Created less than a minute ago');
    expect(newPage).toBeDefined();
  });
  it('should render a row containing the "Updated" string when a page HAS been modified', async () => {
    mockModifiedPage();
    render(<BasePageTree isEmbeddedPagesExperiment />);
    const modifiedPage = await screen.findByText(
      'Updated less than a minute ago',
    );
    expect(modifiedPage).toBeDefined();
  });
  it('should be internationalised', async () => {
    mockPageChildren();
    mockedI18n.fr = {
      ...mockedI18n.fr,
      'confluence-table-tree.friendly-when-created': 'Créé',
    } as typeof mockedI18n.fr; // "when-created" is not translated yet, other strings (except 'unknown') are never rendered by ConfluenceTableTreeWithoutHeadings
    render(<BasePageTree isEmbeddedPagesExperiment locale="fr-ch" />);
    const translated = await screen.findByText('Créé', { exact: false });
    expect(translated).toBeDefined();
  });
});
