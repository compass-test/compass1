export const logger = {
  enabled: false,
  enable() {
    this.enabled = true;
  },
  log(...args: any) {
    if (this.enabled) {
      // eslint-disable-next-line no-console
      console.log('BM log: ', ...args);
    }
  },
  logCond(condition: boolean, ...args: any) {
    if (this.enabled && condition && args.length > 1) {
      this.log(...args);
    }
  },
};
