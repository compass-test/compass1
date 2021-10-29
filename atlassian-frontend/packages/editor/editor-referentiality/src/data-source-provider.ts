import { ReferenceEntity } from '@atlaskit/editor-common';

type LocalId = string;
export class DataSourceProvider {
  private subscriptions: Map<LocalId, Set<Function>> = new Map();
  private dataSources: Map<LocalId, ReferenceEntity> = new Map();

  createOrUpdate(id: LocalId, reference: ReferenceEntity) {
    this.dataSources.set(id, reference);

    const requestCallback =
      (window as any).requestIdleCallback || window.requestAnimationFrame;
    const cancelCallback =
      (window as any).cancelIdleCallback || window.cancelAnimationFrame;
    // TODO: refactor if needed https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8012/ed-11927-data-source-provider#comment-206010499
    const callbackId = requestCallback(() => {
      cancelCallback(callbackId);
      this.notifySubscribers(id, reference);
    });
  }

  private notifySubscribers(id: LocalId, reference: ReferenceEntity | null) {
    if (this.subscriptions.has(id)) {
      this.subscriptions.get(id)?.forEach((callback) => {
        callback(reference);
      });
    }
  }

  subscribe(id: LocalId, callback: Function) {
    if (!this.subscriptions.has(id)) {
      this.subscriptions.set(id, new Set());
    }

    this.subscriptions.get(id)?.add(callback);
  }

  unsubscribe(id: LocalId, callback: Function) {
    if (!this.subscriptions.has(id)) {
      return;
    }

    this.subscriptions.get(id)?.delete(callback);
  }

  delete(id: LocalId): void {
    this.dataSources.delete(id);

    this.notifySubscribers(id, null);
  }

  get(id: LocalId) {
    return this.dataSources.get(id) || null;
  }

  clear() {
    this.dataSources.clear();
    this.subscriptions.clear();
  }
}
