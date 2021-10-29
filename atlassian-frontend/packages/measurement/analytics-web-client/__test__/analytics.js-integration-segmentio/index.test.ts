/*
(The MIT License)

Copyright (c) 2015 Segment.io <friends@segment.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* eslint-disable compat/compat, import/no-extraneous-dependencies */
import '../util/jestConfigReset.helper';

const Analytics = require('@segment/analytics.js-core').constructor;
const integrationLib = require('@segment/analytics.js-integration');
const tester = require('@segment/analytics.js-integration-tester');
const sandbox = require('@segment/clear-env');
const protocol = require('@segment/protocol');
const cookieLib = require('component-cookie');
const assert = require('proclaim');
const sinon = require('sinon');
const store = require('yields-store');

const SegmentLib = require('../../src/analytics.js-integration-segmentio');
const {
  default: getResilienceQueue,
  IntermediateBatchableQueue,
} = require ('../../src/integration/intermediateResilienceQueue');
const { default: getMetricsCollector } = require('../../src/resilienceQueue/Metrics');
const { waitForEventsToSend } = require('../util/commonUtil');
const { createDefaultMockXHR } = require('../util/mockXHR');

jest.mock('../../src/integration/intermediateResilienceQueue', () => {
  return {
    __esModule: true,
    ...jest.requireActual<any>('../../src/integration/intermediateResilienceQueue'),
    default: jest.fn(),
  };
});
jest.mock('../../src/resilienceQueue/Metrics', () => {
  return {
    __esModule: true,
    //@ts-ignore Typescript thinks this isnt an object when I give it type any...
    ...jest.requireActual<any>('../../src/resilienceQueue/Metrics'),
    default: jest.fn(),
  };
});

const emptyFunction = () => {
  // do nothing
};

/* eslint-disable no-underscore-dangle, consistent-return */

// FIXME(ndhoule): clear-env's AJAX request clearing interferes with PhantomJS 2
// Detect Phantom env and use it to disable affected tests. We should use a
// better/more robust way of intercepting and canceling AJAX requests to avoid
// this hackery
const isPhantomJS = /PhantomJS/.test(window.navigator.userAgent);

describe('Segment.io', () => {
  let segment: any;
  let analytics: any;
  let options: any;
  let metricsCollector: any;

  function resetCookies() {
    store('s:context.referrer', null);
    cookieLib('s:context.referrer', null, { maxage: -1, path: '/' });
    store('segment_amp_id', null);
    cookieLib('segment_amp_id', null, { maxage: -1, path: '/' });
    store('seg_xid', null);
    cookieLib('seg_xid', null, { maxage: -1, path: '/' });
    store('seg_xid_fd', null);
    cookieLib('seg_xid_fd', null, { maxage: -1, path: '/' });
    store('seg_xid_ts', null);
    cookieLib('seg_xid_ts', null, { maxage: -1, path: '/' });
  }

  beforeAll(() => {
    // Just to make sure that `cookie()`
    // doesn't throw URIError we add a cookie
    // that will cause `decodeURIComponent()` to throw.
    document.cookie = 'bad=%';
  });

  beforeEach(() => {
    metricsCollector = {
      getMetricsPayload: jest.fn().mockReturnValue({}),
      subtractFromMetrics: jest.fn(),
      addToItemsDiscardedByRetryCounter: jest.fn(),
      addToDuplicateEventCounter: jest.fn(),
      addToEventCount: jest.fn(),
      addToLocalstorageDuplicateCount: jest.fn(),
      addToItemsDiscardedByOverflowCounter: jest.fn(),
      setResilienceMechanism: jest.fn(),
    };
    (getMetricsCollector as jest.Mock).mockReturnValue(metricsCollector);
    // Provides a way to get a new queue every time
    //@ts-ignore
    getResilienceQueue.mockImplementation((
      retryQueuePrefix: string,
      product: string,
      queueOptions: any
    ) => {
      return new IntermediateBatchableQueue(retryQueuePrefix, product, queueOptions);
    });
    options = { apiKey: 'oq0vdlg7yi' };
    protocol.reset();
    analytics = new Analytics();
    segment = new SegmentLib(options);
    analytics.use(SegmentLib);
    analytics.use(tester);
    analytics.add(segment);
    analytics.assert(SegmentLib.global === window);
    resetCookies();
  });

  afterEach(() => {
    analytics.restore();
    analytics.reset();
    resetCookies();
    segment.reset();
    sandbox();
    jest.restoreAllMocks();
  });

  it('should have the right settings', () => {
    expect(() => {
      analytics.compare(
        SegmentLib,
        integrationLib('Segment.io')
          .option('apiKey', '')
          .option('retryQueue', true)
          .option('retryQueueOptions', {
            maxRetryDelay: 60000,
            minRetryDelay: 1000,
            backoffFactor: 2,
            maxAttempts: 10,
            maxItems: 100,
          })
      );
    }).not.toThrow();
  });

  it('should always be turned on', (done: any) => {
    expect(() => {
      const AnalyticsConstructor = analytics.constructor;
      const ajs = new AnalyticsConstructor();
      ajs.use(SegmentLib);
      ajs.initialize({ 'Segment.io': options });

      ajs.ready(() => {
        const segmentIntegration = ajs._integrations['Segment.io'];
        segmentIntegration.ontrack = sinon.spy();
        ajs.track('event', {}, { All: false }, () => {
          assert(segmentIntegration.ontrack.calledOnce);
          done();
        });
      });
    }).not.toThrow();
  });

  describe('Segment.storage()', () => {
    it('should return cookie() when the protocol isnt file://', () => {
      expect(() => analytics.assert(SegmentLib.storage(), cookieLib)).not.toThrow();
    });

    it('should return store() when the protocol is file://', () => {
      expect(() => {
        analytics.assert(SegmentLib.storage(), cookieLib);
        protocol('file:');
        analytics.assert(SegmentLib.storage(), store);
      }).not.toThrow();
    });

    it('should return store() when the protocol is chrome-extension://', () => {
      expect(() => {
        analytics.assert(SegmentLib.storage(), cookieLib);
        protocol('chrome-extension:');
        analytics.assert(SegmentLib.storage(), store);
      }).not.toThrow();
    });
  });

  describe('before loading', () => {
    beforeEach(() => {
      analytics.stub(segment, 'load');
    });

    describe('#normalize', () => {
      let object: any;

      beforeEach(() => {
        segment.cookie('s:context.referrer', null);
        analytics.initialize();
        object = {};
      });

      it('should add .userId', () => {
        expect(() => {
          analytics.user().id('user-id');
          segment.normalize(object);
          analytics.assert(object.userId === 'user-id');
        }).not.toThrow();
      });

      it('should not replace the .userId', () => {
        expect(() => {
          analytics.user().id('user-id');
          object.userId = 'existing-id';
          segment.normalize(object);
          analytics.assert(object.userId === 'existing-id');
        }).not.toThrow();
      });

      it('should add .context', () => {
        expect(() => {
          segment.normalize(object);
          analytics.assert(object.context);
        }).not.toThrow();
      });

      it('should not rewrite context if provided', () => {
        expect(() => {
          const ctx = {};
          const testObject = { context: ctx };
          segment.normalize(testObject);
          analytics.assert(testObject.context === ctx);
        }).not.toThrow();
      });

      it('should copy .options to .context', () => {
        expect(() => {
          const opts = {};
          const testObject: any = { options: opts };
          segment.normalize(testObject);
          analytics.assert(testObject.context === opts);
          analytics.assert(testObject.options == null);
        }).not.toThrow();
      });

      it('should add .library', () => {
        expect(() => {
          segment.normalize(object);
          analytics.assert(object.context.library);
          analytics.assert(object.context.library.name === 'analytics.js');
          analytics.assert(object.context.library.version === analytics.VERSION);
        }).not.toThrow();
      });

      it('should allow override of .library', () => {
        expect(() => {
          const ctx = {
            library: {
              name: 'analytics-wordpress',
              version: '1.0.3',
            },
          };
          const testObject = { context: ctx };
          segment.normalize(testObject);
          analytics.assert(testObject.context.library);
          analytics.assert(
            testObject.context.library.name === 'analytics-wordpress',
          );
          analytics.assert(testObject.context.library.version === '1.0.3');
        }).not.toThrow();
      });

      it('should add .userAgent', () => {
        expect(() => {
          segment.normalize(object);
          analytics.assert(object.context.userAgent === navigator.userAgent);
        }).not.toThrow();
      });

      describe('unbundling', () => {
        let segmentIntegration: any;

        beforeEach(() => {
          const AnalyticsConstructor = analytics.constructor;
          const ajs = new AnalyticsConstructor();
          segmentIntegration = new SegmentLib(options);
          ajs.use(SegmentLib);
          ajs.use(integrationLib('other'));
          ajs.add(segmentIntegration);
          ajs.initialize({ other: {} });
        });

        it('should add a list of bundled integrations when `addBundledMetadata` is set', () => {
          expect(() => {
            segmentIntegration.options.addBundledMetadata = true;
            segmentIntegration.normalize(object);
            assert(object);
            assert(object._metadata);
            assert.deepEqual(object._metadata.bundled, ['Segment.io', 'other']);
          }).not.toThrow();
        });

        it('should add a list of unbundled integrations when `addBundledMetadata` and `unbundledIntegrations` are set', () => {
          expect(() => {
            segmentIntegration.options.addBundledMetadata = true;
            segmentIntegration.options.unbundledIntegrations = ['other2'];
            segmentIntegration.normalize(object);
            assert(object);
            assert(object._metadata);
            assert.deepEqual(object._metadata.unbundled, ['other2']);
          }).not.toThrow();
        });

        it('should not add _metadata when `addBundledMetadata` is unset', () => {
          expect(() => {
            segment.normalize(object);
            assert(object);
            assert(!object._metadata);
          }).not.toThrow();
        });
      });
    });
  });

  describe('after loading', () => {
    beforeEach((done: any) => {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#settings', () => {
      it('should have retryQueue enabled', () => {
        expect(() => {
          analytics.assert(segment.options.retryQueue === true);
        }).not.toThrow();
      });
    });

    const cases: { [key: string]: boolean } = {
      'retryQueue enabled': true,
      'retryQueue disabled': false,
    };

    Object.keys(cases).forEach((scenario) => {
      // eslint-disable-next-line no-prototype-builtins
      if (cases.hasOwnProperty(scenario)) {
        return;
      }
      describe(`with ${scenario}`, () => {
        beforeEach(() => {
          segment.options.retryQueue = cases[scenario];
        });

        describe('#page', () => {
          beforeEach(() => {
            analytics.stub(segment, 'enqueue');
          });

          it('should enqueue section, name and properties', () => {
            expect(() => {
              analytics.page(
                'section',
                'name',
                { property: true },
                { opt: true },
              );
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/p');
              analytics.assert(args[1].name === 'name');
              analytics.assert(args[1].category === 'section');
              analytics.assert(args[1].properties.property === true);
              analytics.assert(args[1].context.opt === true);
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });
        });

        describe('#identify', () => {
          beforeEach(() => {
            analytics.stub(segment, 'enqueue');
          });

          it('should enqueue an id and traits', () => {
            expect(() => {
              analytics.identify('id', { trait: true }, { opt: true });
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/i');
              analytics.assert(args[1].userId === 'id');
              analytics.assert(args[1].traits.trait === true);
              analytics.assert(args[1].context.opt === true);
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });
        });

        describe('#track', () => {
          beforeEach(() => {
            analytics.stub(segment, 'enqueue');
          });

          it('should enqueue an event and properties', () => {
            expect(() => {
              analytics.track('event', { prop: true }, { opt: true });
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/t');
              analytics.assert(args[1].event === 'event');
              analytics.assert(args[1].context.opt === true);
              analytics.assert(args[1].properties.prop === true);
              analytics.assert(args[1].traits == null);
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });
        });

        describe('#group', () => {
          beforeEach(() => {
            analytics.stub(segment, 'enqueue');
          });

          it('should enqueue groupId and traits', () => {
            expect(() => {
              analytics.group('id', { trait: true }, { opt: true });
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/g');
              analytics.assert(args[1].groupId === 'id');
              analytics.assert(args[1].context.opt === true);
              analytics.assert(args[1].traits.trait === true);
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });
        });

        describe('#alias', () => {
          beforeEach(() => {
            analytics.stub(segment, 'enqueue');
          });

          it('should enqueue .userId and .previousId', () => {
            expect(() => {
              analytics.alias('to', 'from');
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/a');
              analytics.assert(args[1].previousId === 'from');
              analytics.assert(args[1].userId === 'to');
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });

          it('should fallback to user.anonymousId if .previousId is omitted', () => {
            expect(() => {
              analytics.user().anonymousId('anon-id');
              analytics.alias('to');
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/a');
              analytics.assert(args[1].previousId === 'anon-id');
              analytics.assert(args[1].userId === 'to');
              analytics.assert(args[1].timestamp);
            }).not.toThrow();
          });

          it('should fallback to user.anonymousId if .previousId and user.id are falsey', () => {
            expect(() => {
              analytics.alias('to');
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/a');
              analytics.assert(args[1].previousId);
              analytics.assert(args[1].previousId.length === 36);
              analytics.assert(args[1].userId === 'to');
            }).not.toThrow();
          });

          it('should rename `.from` and `.to` to `.previousId` and `.userId`', () => {
            expect(() => {
              analytics.alias('user-id', 'previous-id');
              const args = segment.enqueue.args[0];
              analytics.assert(args[0] === '/a');
              analytics.assert(args[1].previousId === 'previous-id');
              analytics.assert(args[1].userId === 'user-id');
              analytics.assert(args[1].from == null);
              analytics.assert(args[1].to == null);
            }).not.toThrow();
          });
        });

        describe('#enqueue', () => {
          let xhr: any;

          beforeEach(() => {
            analytics.spy(segment, 'session');
            sinon.spy(segment, 'debug');
            xhr = sinon.useFakeXMLHttpRequest();
          });

          afterEach(() => {
            if (xhr.restore) {
              xhr.restore();
            }
            if (segment.debug.restore) {
              segment.debug.restore();
            }
          });

          it(
            'should use https: protocol when http:',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('http:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should use https: protocol when https:',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('https:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should use https: protocol when https:',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('file:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should enqueue to `options.apiScheme` when set',
            sinon.test(() => {
              expect(() => {
                segment.options.apiScheme = 'http';

                const mockXHR = sinon.useFakeXMLHttpRequest();
                const spy = sinon.spy();
                mockXHR.onCreate = spy;

                protocol('https:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'http://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should use https: protocol when chrome-extension:',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('chrome-extension:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should enqueue to `api.segment.io/v1` by default',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('https:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.segment.io/v1/i');
              }).not.toThrow();
            }),
          );

          it(
            'should enqueue to `options.apiHost` when set',
            sinon.test(() => {
              expect(() => {
                segment.options.apiHost = 'api.example.com';

                const spy = sinon.spy();
                xhr.onCreate = spy;

                protocol('https:');
                segment.enqueue('/i', { userId: 'id' });
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(req.url, 'https://api.example.com/i');
              }).not.toThrow();
            }),
          );

          it(
            'should enqueue a normalized payload',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                const payload = {
                  key1: 'value1',
                  key2: 'value2',
                };

                segment.normalize = function _normalize() {
                  return payload;
                };

                segment.enqueue('/i', {});

                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(JSON.parse(req.requestBody).key1, 'value1');
                assert.strictEqual(JSON.parse(req.requestBody).key2, 'value2');
              }).not.toThrow();
            }),
          );

          it(
            'should not log a normal payload',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                const payload = {
                  key1: 'value1',
                  key2: 'value2',
                };

                segment.normalize = function _normalize() {
                  return payload;
                };

                segment.enqueue('/i', {});
                sinon.assert.neverCalledWith(
                  segment.debug,
                  'message must be less than 32kb %O',
                  payload,
                );

                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(JSON.parse(req.requestBody).key1, 'value1');
                assert.strictEqual(JSON.parse(req.requestBody).key2, 'value2');
              }).not.toThrow();
            }),
          );

          it(
            'should enqueue an oversized payload',
            sinon.test(() => {
              expect(() => {
                const spy = sinon.spy();
                xhr.onCreate = spy;

                const payload: any = {};
                for (let i = 0; i < 1750; i++) {
                  payload[`key${i}`] = `value${i}`;
                }

                segment.normalize = function _normalize() {
                  return payload;
                };

                segment.enqueue('/i', {});

                sinon.assert.calledWith(
                  segment.debug,
                  'message must be less than 32kb %O',
                  payload,
                );
                assert(spy.calledOnce);
                const req = spy.getCall(0).args[0];
                assert.strictEqual(
                  JSON.parse(req.requestBody).key1749,
                  'value1749',
                );
              }).not.toThrow();
            }),
          );
        });

        // FIXME(ndhoule): See note at `isPhantomJS` definition
        (isPhantomJS ? xdescribe : describe)(
          'e2e tests — without queueing',
          () => {
            beforeEach(() => {
              segment.options.retryQueue = false;
            });

            describe('/g', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment.enqueue(
                    '/g',
                    { groupId: 'gid', userId: 'uid' },
                    (err: any, res: any) => {
                      if (err) {
                        return done(err);
                      }
                      analytics.assert(JSON.parse(res.responseText).success);
                      done();
                    },
                  );
                }).not.toThrow();
              });
            });

            describe('/p', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  const data = { userId: 'id', name: 'page', properties: {} };
                  segment.enqueue('/p', data, (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });
                }).not.toThrow();
              });
            });

            describe('/a', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  const data = { userId: 'id', from: 'b', to: 'a' };
                  segment.enqueue('/a', data, (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  }).not.toThrow();
                });
              });
            });

            describe('/t', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  const data = {
                    userId: 'id',
                    event: 'my-event',
                    properties: {},
                  };

                  segment.enqueue('/t', data, (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  }).not.toThrow();
                });
              });
            });

            describe('/i', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  const data = { userId: 'id' };
                  segment.enqueue('/i', data, (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  }).not.toThrow();
                });
              });
            });
          },
        );

        (isPhantomJS ? xdescribe : describe)(
          'e2e tests — with queueing',
          () => {
            beforeEach(() => {
              segment.options.retryQueue = true;
              analytics.initialize();
            });

            describe('/g', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment._lsqueue.on('processed', (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });
                  segment.enqueue('/g', { groupId: 'gid', userId: 'uid' });
                }).not.toThrow();
              });
            });

            describe('/p', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment._lsqueue.on('processed', (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });

                  segment.enqueue('/p', {
                    userId: 'id',
                    name: 'page',
                    properties: {},
                  });
                }).not.toThrow();
              });
            });

            describe('/a', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment._lsqueue.on('processed', (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });
                  segment.enqueue('/a', { userId: 'id', from: 'b', to: 'a' });
                }).not.toThrow();
              });
            });

            describe('/t', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment._lsqueue.on('processed', (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });
                  segment.enqueue('/t', {
                    userId: 'id',
                    event: 'my-event',
                    properties: {},
                  });
                }).not.toThrow();
              });
            });

            describe('/i', () => {
              it('should succeed', (done: any) => {
                expect(() => {
                  segment._lsqueue.on('processed', (err: any, res: any) => {
                    if (err) {
                      return done(err);
                    }
                    analytics.assert(JSON.parse(res.responseText).success);
                    done();
                  });
                  segment.enqueue('/i', { userId: 'id' });
                }).not.toThrow();
              });
            });
          },
        );

        describe('#cookie', () => {
          beforeEach(() => {
            segment.cookie('foo', null);
          });

          it('should persist the cookie even when the hostname is "dev"', () => {
            expect(() => {
              SegmentLib.global = { navigator: {}, location: {} };
              SegmentLib.global.location.href = 'https://dev:300/path';
              analytics.assert(segment.cookie('foo') == null);
              segment.cookie('foo', 'bar');
              analytics.assert(segment.cookie('foo') === 'bar');
              SegmentLib.global = window;
            }).not.toThrow();
          });

          it('should persist the cookie even when the hostname is "127.0.0.1"', () => {
            expect(() => {
              SegmentLib.global = { navigator: {}, location: {} };
              SegmentLib.global.location.href = 'http://127.0.0.1:3000/';
              analytics.assert(segment.cookie('foo') == null);
              segment.cookie('foo', 'bar');
              analytics.assert(segment.cookie('foo') === 'bar');
              SegmentLib.global = window;
            }).not.toThrow();
          });

          it('should persist the cookie even when the hostname is "app.herokuapp.com"', () => {
            expect(() => {
              SegmentLib.global = { navigator: {}, location: {} };
              SegmentLib.global.location.href = 'https://app.herokuapp.com/about';
              SegmentLib.global.location.hostname = 'app.herokuapp.com';
              analytics.assert(segment.cookie('foo') == null);
              segment.cookie('foo', 'bar');
              analytics.assert(segment.cookie('foo') === 'bar');
              SegmentLib.global = window;
            }).not.toThrow();
          });
        });

        describe('#crossDomainId', () => {
          let server: any;

          beforeEach(() => {
            server = sinon.fakeServer.create();
            segment.options.crossDomainIdServers = [
              'userdata.example1.com',
              'xid.domain2.com',
              'localhost',
            ];
            analytics.stub(segment, 'onidentify');
          });

          afterEach(() => {
            server.restore();
          });

          it('should migrate cookies from old to new name', () => {
            segment.cookie('segment_cross_domain_id', 'xid-test-1');
            segment.initialize();

            expect(() => {
              analytics.assert(segment.cookie('segment_cross_domain_id') == null);
              analytics.assert(segment.cookie('seg_xid') === 'xid-test-1');
            }).not.toThrow();
          });

          it('should not crash with invalid config', () => {
            segment.options.crossDomainIdServers = undefined;

            let res: any = null;
            let err: any = null;
            segment.retrieveCrossDomainId((error: any, response: any) => {
              res = response;
              err = error;
            });

            expect(() => {
              analytics.assert(!res);
              analytics.assert(err === 'crossDomainId not enabled');
            }).not.toThrow();
          });

          it('should generate xid locally if there is only one (current hostname) server', () => {
            expect(() => {
              segment.options.crossDomainIdServers = ['localhost'];

              let res: any = null;
              segment.retrieveCrossDomainId((err: any, response: any) => {
                res = response;
              });

              const identify = segment.onidentify.args[0];
              const { crossDomainId } = identify[0].traits();
              analytics.assert(crossDomainId);

              analytics.assert(res.crossDomainId === crossDomainId);
              analytics.assert(res.fromDomain === 'localhost');
            }).not.toThrow();
          });

          it('should obtain crossDomainId', () => {
            expect(() => {
              let res: any = null;
              segment.retrieveCrossDomainId((err: any, response: any) => {
                res = response;
              });
              server.respondWith(
                'GET',
                `https://xid.domain2.com/v1/id/${segment.options.apiKey}`,
                [
                  200,
                  { 'Content-Type': 'application/json' },
                  '{ "id": "xdomain-id-1" }',
                ],
              );
              server.respond();

              const identify = segment.onidentify.args[0];
              analytics.assert(
                identify[0].traits().crossDomainId === 'xdomain-id-1',
              );

              analytics.assert(res.crossDomainId === 'xdomain-id-1');
              analytics.assert(res.fromDomain === 'xid.domain2.com');
            }).not.toThrow();
          });

          it('should generate crossDomainId if no server has it', () => {
            expect(() => {
              let res: any = null;
              segment.retrieveCrossDomainId((err: any, response: any) => {
                res = response;
              });

              server.respondWith(
                'GET',
                `https://xid.domain2.com/v1/id/${segment.options.apiKey}`,
                [200, { 'Content-Type': 'application/json' }, '{ "id": null }'],
              );
              server.respondWith(
                'GET',
                `https://userdata.example1.com/v1/id/${segment.options.apiKey}`,
                [200, { 'Content-Type': 'application/json' }, '{ "id": null }'],
              );
              server.respond();

              const identify = segment.onidentify.args[0];
              const { crossDomainId } = identify[0].traits();
              analytics.assert(crossDomainId);

              analytics.assert(res.crossDomainId === crossDomainId);
              analytics.assert(res.fromDomain === 'localhost');
            }).not.toThrow();
          });

          it('should bail if all servers error', () => {
            expect(() => {
              let err = null;
              let res = null;
              segment.retrieveCrossDomainId((error: any, response: any) => {
                err = error;
                res = response;
              });

              server.respondWith(
                'GET',
                `https://xid.domain2.com/v1/id/${segment.options.apiKey}`,
                [500, { 'Content-Type': 'application/json' }, ''],
              );
              server.respondWith(
                'GET',
                `https://userdata.example1.com/v1/id/${segment.options.apiKey}`,
                [500, { 'Content-Type': 'application/json' }, ''],
              );
              server.respond();

              const identify = segment.onidentify.args[0];
              analytics.assert(!identify);
              analytics.assert(!res);
              analytics.assert(err === 'Internal Server Error');
            }).not.toThrow();
          });

          it('should bail if some servers fail and others have no xid', () => {
            expect(() => {
              let err = null;
              let res = null;
              segment.retrieveCrossDomainId((error: any, response: any) => {
                err = error;
                res = response;
              });

              server.respondWith(
                'GET',
                `https://xid.domain2.com/v1/id/${segment.options.apiKey}`,
                [400, { 'Content-Type': 'application/json' }, ''],
              );
              server.respondWith(
                'GET',
                `https://userdata.example1.com/v1/id/${segment.options.apiKey}`,
                [200, { 'Content-Type': 'application/json' }, '{ "id": null }'],
              );
              server.respond();

              const identify = segment.onidentify.args[0];
              analytics.assert(!identify);
              analytics.assert(!res);
              analytics.assert(err === 'Bad Request');
            }).not.toThrow();
          });

          it('should succeed even if one server fails', () => {
            expect(() => {
              let err: any = null;
              let res: any = null;
              segment.retrieveCrossDomainId((error: any, response: any) => {
                err = error;
                res = response;
              });

              server.respondWith(
                'GET',
                `https://xid.domain2.com/v1/id/${segment.options.apiKey}`,
                [500, { 'Content-Type': 'application/json' }, ''],
              );
              server.respondWith(
                'GET',
                `https://userdata.example1.com/v1/id/${segment.options.apiKey}`,
                [
                  200,
                  { 'Content-Type': 'application/json' },
                  '{ "id": "xidxid" }',
                ],
              );
              server.respond();

              const identify = segment.onidentify.args[0];
              analytics.assert(identify[0].traits().crossDomainId === 'xidxid');

              analytics.assert(res.crossDomainId === 'xidxid');
              analytics.assert(res.fromDomain === 'userdata.example1.com');
              analytics.assert(!err);
            }).not.toThrow();
          });
        });
      });
    });
  });

  describe('localStorage queueing', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any = null;

    beforeEach((done: any) => {
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      if (window.localStorage) {
        window.localStorage.clear();
      }
      analytics.once('ready', done);
      segment.options.retryQueue = true;
      analytics.initialize();
      jest.useFakeTimers();
    });

    afterEach(() => {
      waitForEventsToSend();
      segment._lsqueue.stop();
    });

    afterAll(() => {
      window.XMLHttpRequest = oldXMLHttpRequest;
      mockXHR.teardown();
      jest.useRealTimers();
    });

    it('#enqueue should add to the retry queue', () => {
      expect(() => {
        analytics.stub(segment._lsqueue, 'addItem');
        segment.enqueue('/i', { userId: '1' });
        assert(segment._lsqueue.addItem.calledOnce);
      }).not.toThrow();
    });

    it('should send requests', () => {
      expect.assertions(3);
      segment.enqueue('/i', { userId: '1' });

      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      expect(mockXHR.withCredentials).toEqual(true);
      const req = mockXHR.send.mock.calls[0][0];
      const body = JSON.parse(req);
      expect(body.batch[0].userId).toEqual('1');
    });

    it('should retry on HTTP errors', () => {
      expect.assertions(3);
      mockXHR.send.mockImplementation(() => {
        mockXHR.ontimeout('Request took too long');
      });

      segment.enqueue('/i', { userId: '1' });

      waitForEventsToSend();

      expect(window.XMLHttpRequest).toHaveBeenCalledTimes(1);
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      jest.runTimersToTime(segment._lsqueue.resilienceQueue.scheduler.calculateBackoff() + 100);
      expect(mockXHR.send).toHaveBeenCalledTimes(2);
    });
  });

  describe('sendJsonWithTimeout', () => {
    // eslint-disable-next-line no-restricted-globals
    const testProtocol = location.protocol;
    // eslint-disable-next-line no-restricted-globals
    const { hostname } = location;
    // eslint-disable-next-line no-restricted-globals
    const { port } = location;
    const endpoint = '/base/data';
    const url = `${testProtocol}//${hostname}:${port}${endpoint}`;

    const headers = { 'Content-Type': 'application/json' };

    describe('with mock XMLHTTPRequest', () => {
      const oldXMLHttpRequest = window.XMLHttpRequest;
      let mockXHR: any = null;

      beforeEach(() => {
        mockXHR = createDefaultMockXHR();
        // @ts-ignore
        window.XMLHttpRequest = jest.fn(() => mockXHR);
      });

      afterAll(() => {
        window.XMLHttpRequest = oldXMLHttpRequest;
        mockXHR.teardown();
      });

      it('should work', (done: any) => {
        expect(() => {
          mockXHR.send.mockImplementation(() => {
            mockXHR.readyState = 4;
            mockXHR.status = 200;
            mockXHR.responseText = 'true';
            mockXHR.onreadystatechange();
          });
          SegmentLib.sendJsonWithTimeout(
            url,
            [1, 2, 3],
            headers,
            10 * 1000,
            (err: any, req: any) => {
              if (err) {
                return done(new Error(err.message));
              }
              const res = JSON.parse(req.responseText);
              assert(res === true);
              done();
            },
          );
        }).not.toThrow();
      });

      it('should timeout', (done: any) => {
        expect(() => {
          mockXHR.send.mockImplementation(() => {
            mockXHR.ontimeout({ type: 'timeout' });
          });
          SegmentLib.sendJsonWithTimeout(
            url,
            [1, 2, 3],
            headers,
            1000,
            (err: any) => {
              assert(err.type === 'timeout');
              done();
            },
          );
        }).not.toThrow();
      });
    });

    describe('error handling', () => {
      let xhr: any;
      let req: any;

      beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = (_req: any) => {
          req = _req;
        };
      });

      afterEach(() => {
        xhr.restore();
      });

      [0, 429, 500, 503].forEach((code) => {
        it(`should throw on ${code} HTTP errors`, (done: any) => {
          expect(() => {
            SegmentLib.sendJsonWithTimeout(
              `${url}/null`,
              [1, 2, 3],
              headers,
              10 * 1000,
              (err: any) => {
                assert(RegExp(`^HTTP Error ${code} (.+)$`).test(err.message));
                done();
              },
            );

            req.respond(code, null, 'nope');
          }).not.toThrow();
        });
      });

      [200, 204, 300, 302, 400, 404].forEach((code) => {
        it(`should not throw on ${code} HTTP errors`, (done: any) => {
          expect(() => {
            SegmentLib.sendJsonWithTimeout(
              `${url}/null`,
              [1, 2, 3],
              headers,
              10 * 1000,
              done,
            );

            req.respond(code, null, 'ok');
          }).not.toThrow();
        });
      });
    });
  });

  describe('with batch processing', () => {
    let realDate: any;
    let currentTime: any;

    beforeAll(() => {
      currentTime = '2019-08-01T05:20:27.480Z';
      realDate = window.Date;
      // @ts-ignore
      window.Date = jest.fn().mockImplementation(() => ({
        toISOString: () => currentTime,
        toJSON: () => currentTime,
        toUTCString: () => currentTime,
      }));
    });

    beforeEach((done: any) => {
      analytics.stub(SegmentLib, 'sendJsonWithTimeout');
      analytics.once('ready', done);
      analytics.initialize();
    });

    afterAll(() => {
      window.Date = realDate;
    });

    it('calls sendJsonWithTimeout with correct data', () => {
      expect(() => {
        const getGlobalRetryCountStub = sinon.stub(
          segment._lsqueue,
          'getGlobalRetryCount',
        );

        const mockMetricsPayload = {
          itemsDiscardedByRetry: 5,
          itemsDiscardedByOverflow: 10,
          duplicateEventCount: 20,
          localstorageDuplicateCount: 80,
          eventCount: 50,
          resilienceMechanism: "@segment/localstorage-retry",
        };

        // @ts-ignore This is a mocked function
        metricsCollector.getMetricsPayload.mockReturnValue(mockMetricsPayload);
        getGlobalRetryCountStub.returns(15);

        segment.proccessBatchItems(
          [{ msg: { name: 'event_3' } }, { msg: { name: 'event_4' } }],
          emptyFunction,
        );

        analytics.calledOnce(SegmentLib.sendJsonWithTimeout);
        const expectedArgs = [
          'https://api.segment.io/v1/batch',
          {
            metadata: {
              httpRetryCount: 15,
              ...mockMetricsPayload,
            },
            batch: [
              {
                name: 'event_3',
                sentAt: currentTime,
              },
              {
                name: 'event_4',
                sentAt: currentTime,
              },
            ],
            sentAt: currentTime,
          },
          { 'Content-Type': 'text/plain' },
          10000,
        ];

        const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];
        // Remove anonymous function
        receivedArgs.pop();

        expect(receivedArgs).toEqual(expectedArgs);
      }).not.toThrow();
    });

    it('metadata should be mostly empty if values are 0', () => {
      const getGlobalRetryCountStub = sinon.stub(
        segment._lsqueue,
        'getGlobalRetryCount',
      );

      const mockMetricsPayload = {
        itemsDiscardedByRetry: 0,
        itemsDiscardedByOverflow: 0,
        duplicateEventCount: 0,
        localstorageDuplicateCount: 0,
        eventCount: 0,
        resilienceMechanism: "@segment/localstorage-retry",
      };

      // @ts-ignore This is a mocked function
      metricsCollector.getMetricsPayload.mockReturnValue(mockMetricsPayload);
      getGlobalRetryCountStub.returns(0);

      segment.proccessBatchItems(
        [{ msg: { name: 'event_5' } }, { msg: { name: 'event_6' } }],
        emptyFunction,
      );
      analytics.calledOnce(SegmentLib.sendJsonWithTimeout);
      const expectedArgs = [
        'https://api.segment.io/v1/batch',
        {
          metadata: {
            resilienceMechanism: "@segment/localstorage-retry",
          },
          batch: [
            {
              name: 'event_5',
              sentAt: currentTime,
            },
            {
              name: 'event_6',
              sentAt: currentTime,
            },
          ],
          sentAt: currentTime,
        },
        { 'Content-Type': 'text/plain' },
        10000,
      ];

      const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];
      // Remove anonymous function
      receivedArgs.pop();

      expect(receivedArgs).toEqual(expectedArgs);
    });
  });

  describe('with xid attached', () => {
    const realDate = window.Date;
    const currentTime = '2019-08-01T05:20:27.480Z';
    let attachXids: any;
    let attachXid: any;
    const xid = [{ type: 'uid', state: 'TIMEOUT' }];
    const xidCallback = () => xid;
    const xidPromiseGetter = () => new Promise((resolve) => resolve(xidCallback));

    beforeAll(() => {
      // @ts-ignore
      window.Date = jest.fn().mockImplementation(() => ({
        toISOString: () => currentTime,
        toJSON: () => currentTime,
        toUTCString: () => currentTime,
      }));
    });

    beforeEach(() => {
      options = { apiKey: 'oq0vdlg7yi', xidPromiseGetter };
      const AnalyticsConstructor = analytics.constructor;
      const ajs = new AnalyticsConstructor();
      ajs.use(SegmentLib);
      ajs.initialize({ 'Segment.io': options });
      segment = ajs._integrations['Segment.io'];

      attachXids = sinon.spy(segment, 'attachXids');
      attachXid = sinon.spy(segment, 'attachXid');
      SegmentLib.sendJsonWithTimeout = sinon.spy();
    });

    afterAll(() => {
      window.Date = realDate;
    });

    it('proccessBatchItems does not call proccessSingleItem with array of 2', async (done: any) => {
      segment.proccessBatchItems(
        [
          { msg: { name: 'event_1', type: 'page', properties: {} } },
          { msg: { name: 'event_2', type: 'track', properties: {} } },
          {
            msg: {
              name: 'event_3',
              traits: { userIdType: 'aaid' },
              type: 'identify',
            },
          },
        ],
        emptyFunction,
      );

      // @ts-ignore
      setImmediate(() => {
        assert(SegmentLib.sendJsonWithTimeout.calledOnce);
        assert(attachXids.calledOnce);
        assert(attachXid.notCalled);
        const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];

        expect(receivedArgs[1].batch[0].properties.xid).toEqual(xid);
        expect(receivedArgs[1].batch[0].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[1].properties.xid).toEqual(xid);
        expect(receivedArgs[1].batch[1].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[2].traits.xid).toEqual(xid);
        expect(receivedArgs[1].batch[2].sentAt).toEqual(currentTime);
        done();
      });
    });

    it('proccessBatchItems calls proccessSingleItem when xidPromise rejects', async (done: any) => {
      options = {
        apiKey: 'oq0vdlg7yi',
        xidPromiseGetter: () => Promise.reject(),
      };
      const AnalyticsConstructor = analytics.constructor;
      const ajs = new AnalyticsConstructor();
      ajs.use(SegmentLib);
      ajs.initialize({ 'Segment.io': options });
      segment = ajs._integrations['Segment.io'];

      attachXids = sinon.spy(segment, 'attachXids');
      attachXid = sinon.spy(segment, 'attachXid');
      SegmentLib.sendJsonWithTimeout = sinon.spy();

      segment.proccessBatchItems(
        [{ msg: { name: 'event_3', properties: { eventType: 'ui' } } }],
        emptyFunction,
      );

      // @ts-ignore
      setImmediate(() => {
        assert(SegmentLib.sendJsonWithTimeout.calledOnce);
        assert(attachXids.calledOnce);
        assert(attachXid.notCalled);
        const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];

        const payload = receivedArgs[1];
        const event = payload.batch[0];
        expect(event.properties.xid).toEqual(undefined);
        expect(payload.sentAt).toEqual(currentTime);
        done();
      });
    });

    it('does not attach xid values if xidCallback is not a callback', (done: any) => {
      options = {
        apiKey: 'oq0vdlg7yi',
        xidPromiseGetter: () => new Promise((resolve) => resolve('blah')),
      };
      const AnalyticsConstructor = analytics.constructor;
      const ajs = new AnalyticsConstructor();
      ajs.use(SegmentLib);
      ajs.initialize({ 'Segment.io': options });
      segment = ajs._integrations['Segment.io'];

      attachXids = sinon.spy(segment, 'attachXids');
      attachXid = sinon.spy(segment, 'attachXid');
      SegmentLib.sendJsonWithTimeout = sinon.spy();

      segment.proccessBatchItems(
        [
          { msg: { name: 'event_1', properties: { eventType: 'ui' } } },
          { msg: { name: 'event_2', properties: { eventType: 'track' } } },
          {
            msg: {
              name: 'event_3',
              traits: { userIdType: 'aaid' },
              type: 'identify',
            },
          },
        ],
        emptyFunction,
      );

      // @ts-ignore
      setImmediate(() => {
        assert(SegmentLib.sendJsonWithTimeout.calledOnce);
        assert(attachXids.calledOnce);
        assert(attachXid.notCalled);
        const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];

        expect(receivedArgs[1].batch[0].properties.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[0].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[1].properties.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[1].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[2].traits.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[2].sentAt).toEqual(currentTime);
        done();
      });
    });

    it('does not attach xid values if xidCallback does not return an array', (done: any) => {
      options = {
        apiKey: 'oq0vdlg7yi',
        xidPromiseGetter: () => new Promise((resolve) => resolve(() => 'blah')),
      };
      const AnalyticsConstructor = analytics.constructor;
      const ajs = new AnalyticsConstructor();
      ajs.use(SegmentLib);
      ajs.initialize({ 'Segment.io': options });
      segment = ajs._integrations['Segment.io'];

      attachXids = sinon.spy(segment, 'attachXids');
      attachXid = sinon.spy(segment, 'attachXid');
      SegmentLib.sendJsonWithTimeout = sinon.spy();

      segment.proccessBatchItems(
        [
          { msg: { name: 'event_1', properties: { eventType: 'ui' } } },
          { msg: { name: 'event_2', properties: { eventType: 'track' } } },
          {
            msg: {
              name: 'event_3',
              traits: { userIdType: 'aaid' },
              type: 'identify',
            },
          },
        ],
        emptyFunction,
      );

      // @ts-ignore
      setImmediate(() => {
        assert(SegmentLib.sendJsonWithTimeout.calledOnce);
        assert(attachXids.calledOnce);
        assert(attachXid.notCalled);
        const receivedArgs = SegmentLib.sendJsonWithTimeout.args[0];

        expect(receivedArgs[1].batch[0].properties.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[0].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[1].properties.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[1].sentAt).toEqual(currentTime);
        expect(receivedArgs[1].batch[2].traits.xid).toEqual(undefined);
        expect(receivedArgs[1].batch[2].sentAt).toEqual(currentTime);
        done();
      });
    });
  });
});
