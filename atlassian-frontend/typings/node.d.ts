declare namespace NodeJS {
  interface ReadableStream {}
  interface EventEmitter {
    /** @deprecated since v4.0.0 */
    static defaultMaxListeners: number;

    addListener(
      event: string | symbol,
      listener: (...args: any[]) => void,
    ): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(
      event: string | symbol,
      listener: (...args: any[]) => void,
    ): this;
    prependOnceListener(
      event: string | symbol,
      listener: (...args: any[]) => void,
    ): this;
    removeListener(
      event: string | symbol,
      listener: (...args: any[]) => void,
    ): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    eventNames(): Array<string | symbol>;
    listenerCount(type: string | symbol | EventEmitter): number;
  }
  interface Process {
    env: Record<string, string | undefined>;
    stdin: any;
    stdout: any;
    cwd(): string;
    exit(code?: number): never;
    nextTick(callback: Function, ...args: any[]): void;
  }

  type PuppeteerPage = import('puppeteer').Page;

  // We are overwritting Global for the visual regression tests type.
  interface Global {
    __BASEURL__: string;
    page: PuppeteerPage;
    collabPage: PuppeteerPage;
    synchronyUrl: string;
  }
}

declare var process: NodeJS.Process;
