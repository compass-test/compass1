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

/**
 * Module dependencies.
 */

const extend = require('@ndhoule/extend');
const keys = require('@ndhoule/keys');
const ads = require('@segment/ad-params');
const integration = require('@segment/analytics.js-integration');
const protocolLib = require('@segment/protocol');
const topDomain = require('@segment/top-domain');
const utm = require('@segment/utm-params');
const clone = require('component-clone');
const cookie = require('component-cookie');
const memoize = require('memoize-one');
const uuid = require('uuid').v4;
const localstorage = require('yields-store');

const { attachXidToSingleEvent, attachXidToMultipleEvents } = require('../AttachXID');
const createBatchableQueue = require('../integration/intermediateResilienceQueue').default;
const purgeOrphans = require('../localstorage-retry/purgeOrphanedQueues').default;
const getMetricsCollector = require('../resilienceQueue/Metrics').default;

/**
 * Cookie options
 */

const cookieOptions = {
  // 1 year
  maxage: 31536000000,
  secure: window.location.protocol === 'https:',
  path: '/',
};

/**
 * Segment messages can be a maximum of 32kb.
 */
const MAX_SIZE = 32 * 1000;

/**
 * Queue options
 *
 * Attempt with exponential backoff for upto 10 times.
 * Backoff periods are: 1s, 2s, 4s, 8s, 16s, 32s, 64s, 128s (~2m), 256s (~4m),
 * 512s (~8.5m) and 1024s (~17m).
 */

const defaultQueueOptions = {
  maxRetryDelay: 60000, // max interval of 1min. Added as a guard.
  minRetryDelay: 1000, // first attempt (1s)
  backoffFactor: 2,
  maxAttempts: 10,
  maxItems: 100,
};

// Webpack imports the entire memoize export (as an object with default as the function)
// Tests import the memoize function directly.
const memoizeFn = typeof memoize === 'function' ? memoize : memoize.default;

const memoizedTopDomain = memoizeFn(function(href: string) {
  // Attempts to create multiple cookies in order to find
  // the highest domain to attach cookies to.
  return topDomain(href);
});

/**
 * Expose `Segment` integration.
 */

const Segment = integration('Segment.io')
  .option('apiKey', '')
  .option('apiScheme', 'https')
  .option('apiHost', 'api.segment.io/v1')
  .option('crossDomainIdServers', [])
  .option('retryQueue', true)
  .option('retryQueuePrefix', 'awc')
  .option('addBundledMetadata', false)
  .option('unbundledIntegrations', [])
  .option('retryQueueOptions', defaultQueueOptions)
  .option('requestTimeout', 10 * 1000);

// @ts-ignore
exports = Segment;
// @ts-ignore
module.exports = Segment;

/**
 * Get the store.
 *
 * @return {Function}
 */
// @ts-ignore
exports.storage = function _storage() {
  return protocolLib() === 'file:' || protocolLib() === 'chrome-extension:'
    ? localstorage
    : cookie;
};

/**
 * Expose global for testing.
 */

// @ts-ignore
exports.global = window;

/**
 * Send the given `obj` and `headers` to `url` with the specified `timeout` and
 * `fn(err, req)`. Exported for testing.
 *
 * @param {String} url
 * @param {Object} obj
 * @param {Object} headers
 * @param {long} timeout
 * @param {Function} fn
 * @api private
 */

// @ts-ignore
exports.sendJsonWithTimeout = function _sendJsonWithTimeout(
  url: any,
  obj: any,
  headers: any,
  timeout: any,
  fn: any,
) {
  const req = new XMLHttpRequest();

  let calledOnce = false;
  function onceOnlyCallback(err: any, req?: any) {
    if (calledOnce) {
      return;
    }
    calledOnce = true;
    fn(err, req);
  }

  function done() {
    if (req.readyState === 4) {
      // Fail on 429 and 5xx HTTP errors
      if (
        req.status === 429
        || req.status === 0
        || (req.status >= 500 && req.status < 600)
      ) {
        onceOnlyCallback(
          new Error(
            `HTTP Error ${req.status} (${
              req.status === 0 ? 'Network error' : req.statusText
            })`,
          ),
        );
      } else {
        onceOnlyCallback(null, req);
      }
    }
  }

  req.onerror = onceOnlyCallback;
  req.onreadystatechange = done;
  req.withCredentials = true;

  req.open('POST', url, true);

  req.timeout = timeout;
  req.ontimeout = onceOnlyCallback;

  // TODO: Remove this eslint disable
  // eslint-disable-next-line guard-for-in
  // @ts-ignore
  Object.entries(headers).forEach(([key, value]: [string, any]) => {
    req.setRequestHeader(key, value);
  });
  req.send(JSON.stringify(obj));
};

Segment.prototype.attachXid = attachXidToSingleEvent;

Segment.prototype.attachXids = attachXidToMultipleEvents;

Segment.prototype.proccessBatchItems = function _proccessBatchItems(
  originalItems: any,
  done: any,
) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  const metricsPayload = this.metrics.getMetricsPayload();
  const httpRetryCount = this._lsqueue.getGlobalRetryCount();

  const process = (items: any) => {
    const sentAt = new Date().toISOString();
    const batchItems = items.map((item: any) => {
      item.msg.sentAt = sentAt;
      return item.msg;
    });

    const metadata: any = {};
    Object.entries(metricsPayload).forEach(([key, value]) => {
      if (value !== 0) {
        metadata[key] = value;
      }
    });

    if (httpRetryCount) {
      metadata.httpRetryCount = httpRetryCount;
    }

    const batchObj = {
      batch: batchItems,
      sentAt,
      metadata,
    };

    const url = `${this.options.apiScheme}://${this.options.apiHost}/batch`;
    const headers = { 'Content-Type': 'text/plain' };

    // send with 10s timeout
    return Segment.sendJsonWithTimeout(
      url,
      batchObj,
      headers,
      this.options.requestTimeout,
      (err: any, res: any) => {
        self.debug('sent %O, received %O', batchObj, [err, res]);
        if (err) {
          return done(err);
        } else {
          this.metrics.subtractFromMetrics(metricsPayload);
          return done(null, res);
        }
      },
    );
  };

  if (this._xidPromiseCallback) {
    return this.attachXids(originalItems, this._xidPromiseCallback).then((items: any) => {
      process(items);
    });
  }
  return process(originalItems);
};

/**
 * Initialize.
 *
 * https://github.com/segmentio/segmentio/blob/master/modules/segmentjs/segment.js/v1/segment.js
 *
 * @api public
 */

Segment.prototype.initialize = function _initialize() {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  this._lsqueue = createBatchableQueue(
    this.options.retryQueuePrefix,
    this.options.product,
    this.options.retryQueueOptions,
  );
  this._lsqueue.start(this.proccessBatchItems.bind(this));

  if (this.options.xidPromiseGetter) {
    this._xidPromiseCallback = this.options.xidPromiseGetter();
  }

  this.metrics = getMetricsCollector();

  this.ready();

  this.analytics.on('invoke', (msg: any) => {
    const action = msg.action();
    const listener = `on${action}`;
    self.debug('%s %o', action, msg);
    if (self[listener]) {
      self[listener](msg);
    }
    self.ready();
  });

  // Migrate from old cross domain id cookie names
  if (this.cookie('segment_cross_domain_id')) {
    this.cookie('seg_xid', this.cookie('segment_cross_domain_id'));
    this.cookie(
      'seg_xid_fd',
      this.cookie('segment_cross_domain_id_from_domain'),
    );
    this.cookie('seg_xid_ts', this.cookie('segment_cross_domain_id_timestamp'));
    this.cookie('segment_cross_domain_id', null);
    this.cookie('segment_cross_domain_id_from_domain', null);
    this.cookie('segment_cross_domain_id_timestamp', null);
  }
  purgeOrphans(this.options.retryQueuePrefix);
};

/**
 * Loaded.
 *
 * @api private
 * @return {boolean}
 */

Segment.prototype.loaded = function _loaded() {
  return true;
};

/**
 * Page.
 *
 * @api public
 * @param {Page} page
 */

Segment.prototype.onpage = function _onpage(page: any) {
  this.enqueue('/p', page.json());
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Segment.prototype.onidentify = function _onidentity(identify: any) {
  this.enqueue('/i', identify.json());
};

/**
 * Group.
 *
 * @api public
 * @param {Group} group
 */

Segment.prototype.ongroup = function _ongroup(group: any) {
  this.enqueue('/g', group.json());
};

/**
 * ontrack.
 *
 * TODO: Document this.
 *
 * @api private
 * @param {Track} track
 */

Segment.prototype.ontrack = function _ontrack(track: any) {
  const trackJSON = track.json();
  // TODO: figure out why we need traits.
  delete trackJSON.traits;
  this.enqueue('/t', trackJSON);
};

/**
 * Alias.
 *
 * @api public
 * @param {Alias} alias
 */

Segment.prototype.onalias = function _onalias(alias: any) {
  const aliasJSON = alias.json();
  const user = this.analytics.user();
  aliasJSON.previousId = aliasJSON.previousId || aliasJSON.from || user.id() || user.anonymousId();
  aliasJSON.userId = aliasJSON.userId || aliasJSON.to;
  delete aliasJSON.from;
  delete aliasJSON.to;
  this.enqueue('/a', aliasJSON);
};

/**
 * Normalize the given `msg`.
 *
 * @api private
 * @param {Object} msg
 */

Segment.prototype.normalize = function _normalize(msg: any) {
  this.debug('start normalize %o', msg);
  const user = this.analytics.user();
  // @ts-ignore
  const { global } = exports;
  const query = global.location.search;
  msg.context = msg.context || msg.options || {};
  const ctx = msg.context;
  delete msg.options;
  ctx.userAgent = navigator.userAgent;
  if (!ctx.library) {
    ctx.library = {
      name: 'analytics.js',
      version: this.analytics.VERSION
    };
  }
  // if user provides campaign via context, do not overwrite with UTM qs param
  if (query && !ctx.campaign) {
    ctx.campaign = utm(query);
  }
  msg.userId = msg.userId || user.id();

  if (this.options.addBundledMetadata) {
    const bundled = keys(this.analytics.Integrations);
    msg._metadata = msg._metadata || {};
    msg._metadata.bundled = bundled;
    msg._metadata.unbundled = this.options.unbundledIntegrations;
  }
  this.debug('finished normalize %o', msg);
  return msg;
};

/**
 * Send `obj` to `path`.
 *
 * @api private
 * @param {string} path
 * @param {Object} obj
 * @param {Function} fn
 */

Segment.prototype.enqueue = function _enqueue(
  path: any,
  message: any,
  fn: any,
) {
  const url = `${this.options.apiScheme}://${this.options.apiHost}${path}`;
  const headers = { 'Content-Type': 'text/plain' };
  const msg = this.normalize(message);

  // Print a log statement when messages exceed the maximum size. In the future,
  // we may consider dropping this event on the client entirely.
  if (JSON.stringify(msg).length > MAX_SIZE) {
    // eslint-disable-next-line no-console
    console.warn('message must be less than 32kb %O', msg);
  }

  this.debug('enqueueing %O', msg);

  this._lsqueue.addItem({
    url,
    headers,
    msg,
  });
};

/**
 * Gets/sets cookies on the appropriate domain.
 *
 * @api private
 * @param {string} name
 * @param {*} val
 */

// eslint-disable-next-line consistent-return
Segment.prototype.cookie = function _cookie(name: any, val: any) {
  const store = Segment.storage();
  if (arguments.length === 1) {return store(name);}
  // @ts-ignore
  const { global } = exports;
  const { href } = global.location;
  let domain = `.${memoizedTopDomain(href)}`;
  if (domain === '.') {domain = '';}
  this.debug('store domain %s -> %s', href, domain);
  const opts = Object.assign({}, cookieOptions);
  // @ts-ignore
  opts.domain = domain;

  this.debug('store %s, %s, %o', name, val, opts);
  store(name, val, opts);
  // eslint-disable-next-line consistent-return
  if (store(name)) {return;}
  // @ts-ignore
  delete opts.domain;
  this.debug('fallback store %s, %s, %o', name, val, opts);
  store(name, val, opts);
};
