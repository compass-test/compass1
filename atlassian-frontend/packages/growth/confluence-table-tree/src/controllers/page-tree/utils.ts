import {
  PageDataWithAncestors,
  PageData,
  PageTreeItem,
  PageTreeItemProperties,
} from '../../types';

/**
 * A helper class for managing the PageTreeItem[] data structure that is used by @atlaskit/table-tree
 * Meant to be used in place of the TableTreeDataHelper it supplies
 */

export class ConfluenceTableTreeData {
  private items: PageTreeItem[];
  private lookup: Record<string, PageTreeItem>;
  private rootContentId: string | null;

  constructor() {
    this.items = [];
    this.lookup = {};
    this.rootContentId = null;
  }

  public getPage(id: string): PageTreeItem | undefined {
    return this.lookup[id];
  }

  public getRootPages(): PageTreeItem[] {
    return this.items;
  }

  /**
   * Inject an error marker as the children of the given pageId
   * @param parentId
   * @returns the update page tree root items
   */
  public markChildError(parentId: string): PageTreeItem[] {
    const parent = this.getPage(parentId);
    if (!parent) {
      throw new Error(`unknown parent id ${parentId}`);
    }
    this.getDescendentIds(parent).forEach((id) => delete this.lookup[id]);
    parent.children = [{ error: true } as PageTreeItem];
    return [...this.items];
  }

  // traverse the tree and return all descendents of the given parent (or root)
  private getDescendentIds(parent?: PageTreeItem): string[] {
    return (parent ? parent.children || [] : this.items).reduce<string[]>(
      (descendents, child) => [
        child.id,
        ...this.getDescendentIds(child),
        ...descendents,
      ],
      [],
    );
  }

  /**
   * Remove all descendents from given parent and collapse the subtree
   *
   * @param parentId
   * @returns the updated page tree root items
   */
  public pruneSubtree(parentId: string): PageTreeItem[] {
    const parent = this.getPage(parentId);
    if (!parent) {
      return this.items;
    }
    this.getDescendentIds(parent).forEach((id) => delete this.lookup[id]);
    parent.childTypes.page.value = false;
    parent.children = undefined;
    parent.isExpanded = false;
    parent.hasDraftChildren = false;
    return [...this.items];
  }

  /**
   * Replace the root pages or child pages of a parent in the page tree
   * @param pages
   * @param parentId if specified, replaces the children of this parent with given pages. Otherwise replaces the root pages
   * @returns the updated page tree root items
   */
  public updateChildPages(
    pages: PageData[],
    parentId?: string,
  ): PageTreeItem[] {
    const parent = parentId ? this.getPage(parentId) : undefined;
    if (parentId !== undefined && !parent) {
      throw new Error(`unknown parent id ${parentId}`);
    }
    const origDescendentIds = this.getDescendentIds(parent);
    // populate the incoming page data with parent and any existing children information
    const newItems = pages.map<PageTreeItem>((page) => ({
      ...page,
      parent,
      children: this.getPage(page.id)?.children,
      isExpanded: this.getPage(page.id)?.isExpanded || false,
    }));
    if (parent) {
      // modify parent to have the new children
      parent.children = newItems.length > 0 ? newItems : undefined;
      parent.childTypes = {
        page: { value: pages.length > 0 },
      };
      // always expand the parent when fetching children for it
      parent.isExpanded = true;
    } else {
      // update root pages
      this.items = newItems;
    }

    // delete from lookup any original descendents of the parent that is no longer in the tree
    const newDescendentIds = new Set(this.getDescendentIds(parent));
    origDescendentIds
      .filter((origId) => !newDescendentIds.has(origId))
      .forEach((id) => delete this.lookup[id]);

    // update lookup for the new pages, and the .parent of the existing (grand)children
    newItems.forEach((page) => {
      page.children?.forEach((child) => {
        child.parent = page;
      });
      this.lookup[page.id] = page;
    });

    // always return copies to trigger re-renders
    return [...this.items];
  }

  public setIsExpanded(id: string, isExpanded: boolean): PageTreeItem[] {
    const page = this.getPage(id);
    if (page) {
      page.isExpanded = isExpanded;
      return [...this.items];
    }
    return this.items;
  }

  public init(rootContentId: string | null) {
    this.items = [];
    this.lookup = {};
    this.rootContentId = rootContentId;
  }

  /**
   * Remove the given page from the tree if it exists, and prune all descendants
   *
   * @param pageId
   * @returns the updated page tree root items
   */
  public removePage(pageId: string): PageTreeItem[] {
    const page = this.getPage(pageId);
    if (!page) {
      return this.items;
    }

    if (page.parent) {
      // we can assume that the parent is currently expanded, as it has page as a child
      page.parent.children = page.parent.children
        ? page.parent.children.filter((p) => p.id !== pageId)
        : undefined;
      // if there are no drafts remaining
      if (
        page.parent.children?.find((p) => p.status === 'draft') === undefined
      ) {
        page.parent.hasDraftChildren = false;
      }
      // if there are no published pages remaining
      if (
        page.parent.children?.find((p) => p.status === 'current') === undefined
      ) {
        page.parent.childTypes.page.value = false;
      }
      if (page.parent.children === undefined) {
        page.parent.isExpanded = false;
      }
    } else {
      // remove root page
      this.items = this.items.filter((p) => p.id !== pageId);
    }

    // published pages can have children, delete all the lookups for them as well
    if (page.status === 'current') {
      this.getDescendentIds(page).forEach((id) => delete this.lookup[id]);
    }

    delete this.lookup[pageId];
    return [...this.items];
  }

  private static copyPageData(src: PageData, dst: PageData) {
    // manually copy relevant attributes into the existing item, so the object reference is preserved
    dst._links = src._links;
    dst.childTypes = src.childTypes;
    dst.metadata = src.metadata;
    dst.status = src.status;
    dst.title = src.title;
    dst.history = src.history;
    dst.extensions = src.extensions;
    return true;
  }

  /**
   * Inject pages into the tree based on the current expansion state. Pages already in the tree
   * will be replaced by any pages in the given list. Parent pages will gain the hasDraftChildren
   * or childTypes.pages.value attribute and expanded parents will have pages inserted into children.
   *
   * @param pages an array of pages with ancestor information (via confluence::getPage or confluence::getDrafts)
   * @returns the updated page tree root items
   */
  public injectPages(pages: PageDataWithAncestors[]): PageTreeItem[] {
    pages.forEach((page) => {
      // calculate the parent by looking at last element of ancestors
      const parentId =
        page.ancestors.length === 0
          ? null
          : page.ancestors[page.ancestors.length - 1].id;

      // first consider if this draft can simply be replaced in place
      const existing = this.getPage(page.id);
      let replaced = false;
      if (existing) {
        // has this draft moved in the tree?
        if (
          existing.parent?.id === parentId ||
          (existing.parent === undefined && parentId === this.rootContentId)
        ) {
          // if not, we can just replace in place
          ConfluenceTableTreeData.copyPageData(page, existing);
          replaced = true;
        } else {
          // otherwise, remove it first before inserting
          this.removePage(page.id);
        }
      }

      // then try to insert it into the tree
      const item: PageTreeItem = {
        ...page,
        isExpanded: false, // drafts never have children
        children: undefined,
      };

      // check if it is a "root" level draft
      if (!replaced && parentId === this.rootContentId) {
        this.items.push(item);
        this.lookup[page.id] = item;
        return;
      }

      if (parentId === null) {
        // got a root draft but we have a non-null rootContentId... so discard it
        return;
      }

      const parent = this.getPage(parentId);
      if (!parent) {
        // parent is not in tree, discard this draft
        return;
      }

      // mark the parent appropriately
      if (page.status === 'draft') {
        parent.hasDraftChildren = true;
      } else if (page.status === 'current') {
        parent.childTypes.page.value = true;
      }

      // if the parent is expanded, append this draft to the children
      if (!replaced && parent.isExpanded) {
        item.parent = parent;
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
        this.lookup[page.id] = item;
      }
    });
    return [...this.items];
  }

  /**
   * Remove all drafts from the page tree
   * @returns the updated page tree root items
   */
  public purgeDrafts(): PageTreeItem[] {
    const filterDrafts = (pages: PageTreeItem[]): PageTreeItem[] =>
      pages.reduce<PageTreeItem[]>((acc, page) => {
        if (page.status === 'draft') {
          delete this.lookup[page.id];
          return acc;
        }
        const children = page.children
          ? filterDrafts(page.children)
          : undefined;
        const updatedPage: PageTreeItem = {
          ...page,
          children,
          hasDraftChildren: false,
        };
        this.lookup[page.id] = updatedPage;
        acc.push(updatedPage);
        return acc;
      }, []);
    this.items = filterDrafts(this.items);
    return this.items;
  }
}

export const getPageTreeItemProperties = ({
  id,
  status,
  _links,
  metadata: {
    frontend: { collabService },
  },
}: PageData): PageTreeItemProperties => ({
  id,
  isDraft: status === 'draft',
  url: `${_links.base}${_links.webui}`,
  editUrl: `${_links.base}${_links.editui}`,
  hasEmbeddedEdit: collabService === 'ncs',
});
