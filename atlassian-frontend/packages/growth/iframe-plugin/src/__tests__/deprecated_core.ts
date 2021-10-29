import { SpaParentClient } from '../core/deprecated_core';

import { HostEvents, SpaEvents } from '../lib/messages';
import { ListenerFn } from 'eventemitter3';

describe('SpaParentClient', () => {
  let container: HTMLElement;
  let client: SpaParentClient;
  const appName = 'testApp';
  const src = 'http://localhost:3000/';

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
    let addListenerSpy: jest.SpyInstance;
    let removeListenerSpy: jest.SpyInstance;

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
          addListenerSpy = jest.spyOn(
            iframe.contentWindow!,
            'addEventListener',
          );
          removeListenerSpy = jest.spyOn(
            iframe.contentWindow!,
            'removeEventListener',
          );
          // @ts-ignore
          originalRegisterMessageListener.apply(client, args);
        });

      client.init({ containerElement: container });
    });

    it('it should render an iframe', () => {
      expect(iframe).toBeTruthy();
    });
    it('it should render an iframe with specified source', () => {
      expect(iframe.src).toEqual(src);
    });
    it('should have an event listener called', () => {
      expect(addListenerSpy).toBeCalledTimes(1);
    });
    it('it should cleanup (iframe element and event listeners) when cleanup is called', () => {
      expect(iframe).toBeTruthy();
      expect(removeListenerSpy).toBeCalledTimes(0);
      client.cleanup();
      expect(container.querySelector('iframe')).toBeFalsy();
      expect(removeListenerSpy).toBeCalledTimes(1);
    });
  });

  describe('messageCallback handler', () => {
    it('should call messageCallback is message is posted on the iframe', async () => {
      const client = new SpaParentClient({
        src,
        appName,
      });

      // @ts-ignore
      const spy = jest.spyOn(client, 'messageCallback');

      client.init({
        containerElement: container,
      });

      container.querySelector('iframe')!.contentWindow!.postMessage(
        {
          type: SpaEvents.Handshake,
        },
        '*',
      );
      await new Promise((res) => setTimeout(res, 100));
      expect(spy).toHaveBeenCalledTimes(1);
      // @ts-ignore
      expect(client.iframeReady).toBe(true);
    });
  });

  describe('SpaClient event emitter', () => {
    it('should emit message event', () => {
      const client = new SpaParentClient({ src, appName });
      const handler = jest.fn();

      client.on(HostEvents.Message, handler);

      const payload = { foo: 'bar' };
      // @ts-ignore
      client.messageCallback({
        data: { type: SpaEvents.Message, payload },
      } as MessageEvent);

      expect(handler).toBeCalledWith(payload);
    });
  });

  describe('SpaClient event emitter', () => {
    it('should emit analytics event', () => {
      const client = new SpaParentClient({ src, appName });
      const handler = jest.fn();

      client.on(HostEvents.AnalyticEvent, handler);

      const payload = { foo: 'bar' };
      // @ts-ignore
      client.messageCallback({
        data: { type: SpaEvents.AnalyticEvent, payload },
      } as MessageEvent);
      expect(handler).toBeCalledWith(payload);
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
      const message = getExpectedMessage('initialised');
      expect(spy).toBeCalledWith(message);
    });

    it('should emit on initialisation failure', () => {
      const message = getExpectedMessage('initialisationFailed');
      // @ts-ignore
      client.constructIframe = jest.fn().mockImplementation(() => {
        throw new Error('fake error');
      });
      try {
        client.init({ containerElement: container });
      } catch {}
      expect(spy).toBeCalledWith(message);
    });

    it('should emit on handshake', () => {
      const message = getExpectedMessage('handshake', {
        timeToHandshake: expect.any(Number),
      });
      // @ts-ignore
      client.messageCallback({ data: { type: SpaEvents.Handshake } });
      expect(spy).toBeCalledWith(message);
    });

    it('shoud emit on handshake timeout', () => {
      const message = getExpectedMessage('handshakeTimeout');
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
      expect(spyAnalyticEvent).toHaveBeenLastCalledWith(message);
      expect(spyErrorEvent).toHaveBeenCalled();
    });

    it('should fire when spa is ready', () => {
      const message = getExpectedMessage('ready', {
        timeToReady: expect.any(Number),
      });
      // @ts-ignore
      client.messageCallback({ data: { type: SpaEvents.Ready } });
      expect(spy).toBeCalledWith(message);
    });
  });
});
