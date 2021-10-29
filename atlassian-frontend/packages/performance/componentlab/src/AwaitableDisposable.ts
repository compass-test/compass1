import { IAwaitableDisposable } from '../types';

type AwaitableDisposableLike = IAwaitableDisposable | (() => unknown);

export default class AwaitableDisposable {
  private disposables: AwaitableDisposableLike[];
  constructor(...disposables: AwaitableDisposableLike[]) {
    this.disposables = disposables;
  }

  add(...disposables: AwaitableDisposableLike[]): void {
    this.disposables.push(...disposables);
  }

  async dispose(): Promise<void> {
    await Promise.all(
      this.disposables.map(async (disposable) =>
        typeof disposable === 'function' ? disposable() : disposable.dispose(),
      ),
    );
  }
}
