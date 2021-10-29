// eslint-disable-next-line max-classes-per-file
import EventEmitter from 'events';

// there is no good mock library for BroadcastChannel over the internet atm
// so add a rough local BroadcastChannel implementation for test purposes...
const ee: EventEmitter = new EventEmitter();

export default class BroadcastChannel {
  private channelId = Math.random();

  public readonly name: string;

  constructor(key: string) {
    this.name = key;
    ee.on(this.name, this.onmessagePointer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onmessage = (e: MessageEvent): void => {};

  public onmessagePointer = (e: MessageEvent): void => {
    // ensure the channel not receive the message sends out by itself
    const { channelId } = e as any;
    if (this.channelId !== channelId) {
      this.onmessage(e);
    }
  };

  public postMessage(data: Record<string, any>): void {
    ee.emit(this.name, { data, channelId: this.channelId });
  }

  public close(): void {
    this.onmessage = (): void => {};
    ee.off(this.name, this.onmessagePointer);
  }
}
