export class TimeoutHelper {
  private timeoutID?: number;
  private onTimeout: Function;
  constructor(private delay = 1000, onTimeout: Function) {
    this.onTimeout = onTimeout;
  }
  start = () => {
    this.timeoutID = window.setTimeout((): void => {
      this.onTimeout();
    }, this.delay);
  };
  clear = () => {
    clearTimeout(this.timeoutID);
  };
}
