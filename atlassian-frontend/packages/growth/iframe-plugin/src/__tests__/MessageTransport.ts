import {
  MessageChannelTransportMaster,
  MessageChannelTransportSlave,
} from '../transport/MessageTransport';
import { SpaEvents } from '../lib/messages';
import { TransportEventTypes } from '../transport/types';

describe('MessageChannelTransportMaster', () => {
  let master: MessageChannelTransportMaster;
  beforeEach(() => {
    const iframe = document.createElement('iframe');
    master = new MessageChannelTransportMaster(iframe);
  });

  it('should queue up messages to send if there is no ports active', () => {
    const message = {
      type: 'CHANGE_ROUTE',
      payload: '/rapidBoard',
    };
    master.send(SpaEvents.Message, message);
    // @ts-ignore
    expect(master.port).toBeFalsy();
    // @ts-ignore
    expect(master.queue).toContainEqual({
      name: SpaEvents.Message,
      payload: [message],
    });
  });

  it('should send queued messages once port is active', () => {
    // JSDOM does not contain objects for MessageChannel, so we will manually mock the port
    const message = {
      type: 'CHANGE_ROUTE',
      payload: '/rapidBoard',
    };
    master.send(SpaEvents.Message, message);
    // @ts-ignore
    expect(master.queue).toHaveLength(1);
    const spy = jest.fn();
    // @ts-ignore
    master.port = {
      postMessage: spy,
    };
    // @ts-ignore will only dispatch queued messages once handshake is initialised
    master.handshakeReceived = true;
    // @ts-ignore
    master.dispatchQueuedMessages();
    // @ts-ignore
    expect(master.queue).toHaveLength(0);
    expect(spy).toHaveBeenCalledWith({
      type: TransportEventTypes.Message,
      payload: { type: SpaEvents.Message, payload: message },
    });
  });
});

describe('MessageChannelTransportSlave', () => {
  let slave: MessageChannelTransportSlave;
  beforeEach(() => {
    slave = new MessageChannelTransportSlave();
  });

  it('subscribeToPortMessages method should subscribe to port messages, completes handshake and binds reference', () => {
    const mockPort = {
      addEventListener: jest.fn(),
      start: jest.fn(),
      postMessage: jest.fn(),
    };
    slave.connect();
    //@ts-ignore;
    slave.subscribeToPortMessages(mockPort);
    expect(mockPort.addEventListener).toHaveBeenCalledWith(
      TransportEventTypes.Message,
      //@ts-ignore
      slave.onMessage,
    );
    expect(mockPort.start).toHaveBeenCalled();
    expect(mockPort.postMessage).toHaveBeenCalledWith({
      type: TransportEventTypes.Handshake,
    });
    //@ts-ignore
    expect(slave.port).toBe(mockPort);
  });
});
