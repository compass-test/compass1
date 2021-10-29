declare module 'raf-stub' {
  export type Stub = {
    add: (cb: Function) => number;
    remove: (id: number) => void;
    flush: (duration?: number) => void;
    reset: () => void;
    step: (steps?: number, duration?: number) => void;
  };

  export type ReplaceRafOptions = {
    frameDuration?: number;
    startTime?: number;
  };

  export const replaceRaf = (opts?: ReplaceRafOptions): Stub => {};
  export default replaceRaf;
}
