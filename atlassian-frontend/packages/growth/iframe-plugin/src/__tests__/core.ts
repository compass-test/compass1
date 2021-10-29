import { SpaParentClient } from '../core';
import { HostEvents, SpaEvents } from '../lib/messages';
import { ListenerFn } from 'eventemitter3';
import { MonitoredEvents } from '../lib/events';

describe('SpaParentClient', () => {
  let container: HTMLElement;
  let client: SpaParentClient;
  const appName = 'testApp';
  const src = 'http://localhost:3000/?sourceContext=touchpoint';

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    client = new SpaParentClient({
      src,
      appName,
    });
  });

  afterEach(() => {
    client.cleanup();
  });

  describe('on instantiating', () => {
    it('should throw an error if no options object is passed through', () => {
      // @ts-ignore
      expect(() => new SpaParentClient()).toThrow();
    });
    it('should not throw an error if an options object is passed through', () => {
      expect(
        () =>
          new SpaParentClient({
            src: 'http://localhost:3000',
            appName,
          }),
      ).not.toThrow();
    });
  });

  describe('once instantiated', () => {
    let iframe: HTMLIFrameElement;
    let eventClientOnSpy: jest.SpyInstance;
    let eventClientCloseSpy: jest.SpyInstance;

    beforeEach(() => {
      // @ts-ignore
      const originalRegisterMessageListener = client.registerMessageListener;
      // @ts-ignore
      jest
        .spyOn(client as any, 'registerMessageListener')
        // @ts-ignore
        .mockImplementation((...args) => {
          /**
           * Hooking into `client.registerMessageListener` invocation and
           * creating spies on addEventListener and removeEventListener
           * before it is being invoked by `client.init`
           */

          iframe = container.querySelector('iframe')!;
          // @ts-ignore
          eventClientOnSpy = jest.spyOn(client.client!, 'on');
          // @ts-ignore
          eventClientCloseSpy = jest.spyOn(client.client!, 'close');
          // @ts-ignore
          originalRegisterMessageListener.apply(client, args);
        });
      client.init({ containerElement: container });
    });

    it('it should render an iframe', () => {
      expect(iframe).toBeTruthy();
    });
    it('it should render an iframe with specified source with an appended query of _c=2', () => {
      // _c=2 refers to v2 host implementation which is default moving forward
      expect(iframe.src).toEqual(`${src}&_c=2`);
    });
    it('should have transport client registering two event types', () => {
      expect(eventClientOnSpy).toHaveBeenCalledWith(
        SpaEvents.Message,
        // @ts-ignore
        client.messageCallback,
      );
      expect(eventClientOnSpy).toHaveBeenCalledWith(
        SpaEvents.Handshake,
        // @ts-ignore
        client.handshakeCallback,
      );
    });
    it('it should cleanup (iframe element and event listeners) when cleanup is called', () => {
      // @ts-ignore
      const removeAllListenersSpy = jest.spyOn(
        (client as any).events,
        'removeAllListeners',
      );

      expect(iframe).toBeTruthy();
      client.cleanup();
      expect(eventClientCloseSpy).toHaveBeenCalled();
      expect(container.querySelector('iframe')).toBeFalsy();
      expect(removeAllListenersSpy).toHaveBeenCalled();
    });
  });

  describe('messageCallback handler', () => {
    it('should call messageCallback when message transport client sends a message', async () => {
      const client = new SpaParentClient({
        src,
        appName,
      });

      // @ts-ignore
      const spy = jest.spyOn(client, 'messageCallback');

      client.init({
        containerElement: container,
      });

      // @ts-ignore
      client.client.emitter.emit(SpaEvents.Message, {
        data: { type: 'foobar', payload: 'abc' },
      });
      await new Promise((res) => setTimeout(res, 100));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('SpaClient event emitter', () => {
    it('should emit message event', () => {
      const client = new SpaParentClient({ src, appName });
      const handler = jest.fn();

      client.on(HostEvents.Message, handler);

      const payload = { foo: 'bar' };
      // @ts-ignore
      client.messageCallback(payload);

      expect(handler).toHaveBeenCalledWith(payload);
    });

    it('should emit analytics event', () => {
      const client = new SpaParentClient({ src, appName });
      const handler = jest.fn();

      client.on(HostEvents.AnalyticEvent, handler);

      const payload = { foo: 'bar' };
      // @ts-ignore
      client.analyticCallback(payload);
      expect(handler).toHaveBeenCalledWith(payload);
    });

    it('should emit handshake event on handshake callback', () => {
      const client = new SpaParentClient({ src, appName });

      const handler = jest.fn();
      // @ts-ignore
      jest.spyOn(client, 'emitMonitoringEvent').mockImplementation(() => {});

      client.on(HostEvents.Handshake, handler);

      // @ts-ignore
      client.handshakeCallback();
      expect(handler).toHaveBeenCalled();
    });
  });

  describe('Iframe AnalyticsEvents', () => {
    let client: SpaParentClient;
    let spy: ListenerFn;

    const getExpectedMessage = (action: string, otherAttributes = {}) => {
      const payload = expect.objectContaining({
        action: action,
        eventType: 'operational',
        actionSubject: 'spaParentClient',
        actionSubjectId: `${appName}SpaParentClient`,
        attributes: expect.objectContaining({
          appName,
          ...otherAttributes,
        }),
      });
      return {
        context: expect.arrayContaining([
          {
            source: 'growthKitIframePlugin',
          },
        ]),
        payload,
      };
    };

    beforeEach(() => {
      client = new SpaParentClient({ src, appName });
      spy = jest.fn();
      client.on(HostEvents.AnalyticEvent, spy);
      client.init({ containerElement: container });
    });

    it('should emit when initialising the iframe', () => {
      const message = getExpectedMessage(MonitoredEvents.Initialisation);
      expect(spy).toHaveBeenCalledWith(message);
    });

    it('should emit on initialisation failure', () => {
      const message = getExpectedMessage(MonitoredEvents.InitialisationError);
      // @ts-ignore
      client.constructIframe = jest.fn().mockImplementation(() => {
        throw new Error('fake error');
      });
      try {
        client.init({ containerElement: container });
      } catch {}
      expect(spy).toHaveBeenCalledWith(message);
    });

    it('should emit on handshake', () => {
      const message = getExpectedMessage(MonitoredEvents.Handshake, {
        timeToHandshake: expect.any(Number),
      });

      // @ts-ignore
      client.client.emitter.emit(SpaEvents.Handshake);
      expect(spy).toHaveBeenCalledWith(message);
    });

    it('shoud emit on handshake timeout', () => {
      const message = getExpectedMessage(MonitoredEvents.HandshakeTimeout);
      const spyAnalyticEvent = jest.fn();
      const spyErrorEvent = jest.fn();
      jest.useFakeTimers();
      client = new SpaParentClient({
        src,
        appName,
        handshakeEventTimeoutDelayMilliSeconds: -1,
      });
      client.init({ containerElement: container });
      client.on(HostEvents.AnalyticEvent, spyAnalyticEvent);
      client.on(HostEvents.Error, spyErrorEvent);
      jest.runAllTimers();
      expect(spyAnalyticEvent).toHaveBeenCalledWith(message);
      expect(spyErrorEvent).toHaveBeenCalled();
    });

    it('should emit on ready timeout', () => {
      const message = getExpectedMessage(MonitoredEvents.ReadyTimeout);
      const spyAnalyticEvent = jest.fn();
      const spyErrorEvent = jest.fn();
      jest.useFakeTimers();
      client = new SpaParentClient({
        src,
        appName,
        readyEventTimeoutDelayMilliSeconds: -1,
      });
      client.init({ containerElement: container });
      client.on(HostEvents.AnalyticEvent, spyAnalyticEvent);
      client.on(HostEvents.Error, spyErrorEvent);
      jest.runAllTimers();
      expect(spyAnalyticEvent).toHaveBeenCalledWith(message);
      expect(spyErrorEvent).toHaveBeenCalled();
    });

    it('should fire when spa is ready', async () => {
      const message = getExpectedMessage(MonitoredEvents.Ready, {
        timeToReady: expect.any(Number),
      });
      // @ts-ignore
      client.readyCallback({
        type: SpaEvents.Ready,
        payload: 'should fire test',
      });
      await Promise.resolve(setTimeout(() => {}, 100));
      expect(spy).toHaveBeenCalledWith(message);
    });
  });
});
