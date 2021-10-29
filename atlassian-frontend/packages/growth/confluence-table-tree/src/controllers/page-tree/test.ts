import { PageData } from '../../types';
import {
  getMockResponseForGetChildren,
  mockDraft,
} from '../../services/confluence/mocks';
import { ConfluenceTableTreeData } from './utils';

const draftPageIds = ['root-3', 'child-2', 'grandchild-1'];
const createDummyPages = (prefix: string, size: number): PageData[] =>
  Array(size)
    .fill(null)
    .map((_, idx) => ({
      ...getMockResponseForGetChildren()[0],
      id: `${prefix}-${idx}`,
      title: `title for ${prefix} ${idx}`,
      status: draftPageIds.includes(`${prefix}-${idx}`) ? 'draft' : 'current',
      childTypes: {
        page: {
          value: false,
        },
      },
    }));

describe('ConfluenceTableTreeData', () => {
  let tree: ConfluenceTableTreeData;
  beforeEach(() => {
    tree = new ConfluenceTableTreeData();
    tree.init(null);
    tree.updateChildPages(createDummyPages('root', 10));
    tree.updateChildPages(createDummyPages('child', 5), 'root-2');
    tree.updateChildPages(createDummyPages('grandchild', 3), 'child-1');
  });

  it('should return undefined for unknown pageIds', () => {
    expect(tree.getPage('unknown')).toBeUndefined();
  });

  it('should be able to construct a tree', () => {
    const child1 = tree.getPage('child-1');
    expect(child1?.title).toEqual('title for child 1');
    expect(child1?.parent?.title).toEqual('title for root 2');
    expect(child1?.children?.length).toEqual(3);
  });

  it('should return the new tree when updating children', () => {
    const items = tree.updateChildPages(
      createDummyPages('child2', 7),
      'root-4',
    );
    expect(items.length).toEqual(10);
    expect(items[4].children?.length).toEqual(7);
  });

  it('should be able to replace children but preserve grandchildren', () => {
    tree.updateChildPages(
      createDummyPages('child', 3).map((p) => ({
        ...p,
        title: `modified ${p.title}`,
      })),
      'root-2',
    );
    expect(tree.getPage('grandchild-1')?.parent?.title).toEqual(
      'modified title for child 1',
    );
  });

  it('should be able to replace the root pages', () => {
    tree.updateChildPages(
      createDummyPages('root', 3).map((p) => ({
        ...p,
        title: `modified ${p.title}`,
      })),
    );
    expect(tree.getPage('grandchild-1')?.parent?.parent?.title).toEqual(
      'modified title for root 2',
    );
  });

  it('should set the childTypes flag correctly and prune the tree when children are removed', () => {
    expect(tree.getPage('child-1')?.childTypes.page.value).toBeTruthy();
    expect(tree.getPage('grandchild-0')).toBeDefined();
    tree.updateChildPages([], 'child-1');
    expect(tree.getPage('child-1')?.childTypes.page.value).toBeFalsy();
    expect(tree.getPage('child-1')?.children).toBeUndefined();
    expect(tree.getPage('grandchild-0')).toBeUndefined();
  });

  it('should prune the tree when children are marked as error', () => {
    tree.markChildError('child-1');
    expect(tree.getPage('grandchild-0')).toBeUndefined();
  });

  it('should prune the tree multiple levels down when removing a root page', () => {
    expect(tree.getPage('grandchild-0')).toBeDefined();
    tree.updateChildPages(createDummyPages('new-root', 10)); // replace all root pages
    expect(tree.getPage('grandchild-0')).toBeUndefined();
  });

  it('should purge drafts from the tree', () => {
    expect(
      draftPageIds.map((id) => tree.getPage(id)).filter(Boolean),
    ).toHaveLength(3);
    tree.purgeDrafts();
    expect(
      draftPageIds.map((id) => tree.getPage(id)).filter(Boolean),
    ).toHaveLength(0);
  });

  it('should inject drafts into the tree', () => {
    tree.setIsExpanded('root-2', true);
    tree.injectPages([
      {
        ...mockDraft,
        id: 'injected-root-draft',
        ancestors: [],
      },
      {
        ...mockDraft,
        id: 'injected-child-draft',
        ancestors: [
          {
            id: 'root-2',
          },
        ],
      },
      {
        ...mockDraft,
        id: 'injected-unexpanded-child-draft',
        ancestors: [
          {
            id: 'root-3',
          },
        ],
      },
    ]);
    const rootDraft = tree.getPage('injected-root-draft');
    expect(rootDraft).toBeDefined();
    expect(rootDraft?.parent).toBeUndefined();
    expect(
      tree.getRootPages().find((p) => p.id === 'injected-root-draft'),
    ).toBeDefined();

    const childDraft = tree.getPage('injected-child-draft');
    expect(childDraft).toBeDefined();
    expect(childDraft?.parent?.id).toEqual('root-2');
    expect(
      tree
        .getPage('root-2')
        ?.children?.find((p) => p.id === 'injected-child-draft'),
    ).toBeDefined();
    expect(tree.getPage('root-2')?.hasDraftChildren).toBeTruthy();

    expect(tree.getPage('injected-unexpanded-child-draft')).toBeUndefined(); // not in tree yet
    expect(tree.getPage('root-3')?.hasDraftChildren).toBeTruthy();

    // replace a draft
    expect(tree.getPage('root-4')?.hasDraftChildren).toBeFalsy();
    tree.injectPages([
      {
        ...mockDraft,
        id: 'injected-child-draft',
        ancestors: [
          {
            id: 'root-4',
          },
        ],
      },
    ]);
    expect(tree.getPage('injected-child-draft')).toBeUndefined();
    expect(tree.getPage('root-4')?.hasDraftChildren).toBeTruthy();
  });

  it('should replace existing pages when injecting pages into the tree', () => {
    tree.injectPages([
      {
        ...mockDraft,
        id: 'root-1',
        title: 'injected-title',
      },
      {
        ...mockDraft,
        id: 'child-1',
        title: 'injected-child',
        ancestors: [
          {
            id: 'root-2',
          },
        ],
      },
    ]);
    expect(tree.getPage('root-1')?.title).toEqual('injected-title');
    expect(tree.getPage('grandchild-1')?.parent?.title).toEqual(
      'injected-child',
    );
  });

  it('should remove and reinsert a page when injecting pages that have moved parents into the tree', () => {
    expect(tree.getPage('grandchild-2')?.parent?.id).toEqual('child-1');
    expect(tree.getPage('grandchild-1')?.parent?.id).toEqual('child-1');
    expect(tree.getPage('child-1')?.children).toHaveLength(3);
    tree.injectPages([
      {
        ...mockDraft,
        id: 'grandchild-2',
        title: 'injected-title',
        ancestors: [], // moves to a root page
      },
      {
        ...mockDraft,
        id: 'grandchild-1',
        title: 'injected-title-2',
        ancestors: [{ id: 'grandchild-0' }], // moves to another node
      },
    ]);
    expect(tree.getPage('grandchild-2')?.parent).toBeUndefined();
    expect(tree.getPage('child-1')?.children).toHaveLength(1);
    expect(tree.getPage('grandchild-2')?.title).toEqual('injected-title');
    expect(tree.getPage('grandchild-0')?.hasDraftChildren).toBeTruthy();
  });

  it('should set the childTypes flag correctly for unexpanded nodes', () => {
    expect(tree.getPage('child-2')?.childTypes.page.value).toBeFalsy();
    tree.injectPages([
      {
        ...mockDraft,
        id: 'new-page',
        status: 'current',
        ancestors: [{ id: 'child-2' }],
      },
    ]);
    expect(tree.getPage('child-2')?.childTypes.page.value).toBeTruthy();
    expect(tree.getPage('new-page')).toBeUndefined(); // since the parent is not expanded
  });

  it('should inject a published page for expanded nodes', () => {
    tree.setIsExpanded('child-2', true);
    tree.injectPages([
      {
        ...mockDraft,
        id: 'new-page',
        status: 'current',
        ancestors: [{ id: 'child-2' }],
      },
    ]);
    expect(tree.getPage('child-2')?.childTypes.page.value).toBeTruthy();
    expect(tree.getPage('new-page')?.parent?.id).toEqual('child-2');
  });
});
