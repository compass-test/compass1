# Origin Tracing

The Origin standard allows you to track users through share, invite, and other journeys. Origin shines especially when
some part of the journey exits a product (e.g. when one of the steps contains an e-mail with a link).

Confluence documentation for Origin can be found at:
http://go.atlassian.com/origin

This library is the JavaScript implementation of the Origin standard.

## Summary of the flow

If you want to be able to trace user journeys, you have to ensure that two sides are covered: origin generation
and landing.

Firstly, when the invite/share action happens, you need to generate a new Origin and fire an analytics event
that will include it. You'll also need to pass the origin on, to the next steps of the flow, usually by adding it to
a link in a notification e-mail.

Secondly, when the invited user lands into the product, you need to read the origin from the URL, fire an
'origin landed' event, and cleanup the origin from the URL.

This way, during analysis, you can trace the landing event back to the original event that started the flow.

Landed events have already been implemented in several places, including Confluence, Jira, and Admin. The login/signup
screens of Atlassian Account can also read Origins and add them to analytics events, giving you even more data.

Below are detailed examples showing how to use the library to cover both sides.

## Getting started

The JavaScript origin library is published as the npm package `@atlassiansox/origin-tracing`.
You can import it as follows:

```javascript
import OriginTracer from '@atlassiansox/origin-tracing';
```

Or using `require()`:

```javascript
const OriginTracer = require('@atlassiansox/origin-tracing');
```

The default export of the library is the `OriginTracer` constructor.
It creates objects that represent traced places of origin.

You can also think of Origin Tracing as firing tracer rounds — bullets that leave a bright trace behind them,
highlighting the path between the place that fired them, and the place that was hit.

You can prep a new tracer to ‘fire’ by calling the `OriginTracer` constructor, or you can look at a snapshot
of a tracer at the given moment in the trajectory by instantiating it from the URL.

## Journey begins. A share/invite action happens.

Applications can provide users with different sharing capabilities, such as:

- a _Share_ button connected to a textfield where users can type in email addresses of people they want to share with,
- a share link that can be copied.

Clicking on a share button or copying the link can be considered sharing actions.

To integrate sharing actions with Origin, you need to:

2. Fire an analytics event indicating that the share action happened and a new ID was generated.
1. Use the origin-tracing library to generate an ID (this happens automatically when you call the OriginTracer
   constructor, which is the default export of the library)
1. Make sure that encoded origin tracing data is passed further down the journey.  
   For example:
   1. Add origin tracing data to your sharing link, as a query param atlOrigin.
   2. Pass origin tracing data to your server, so that it can – for example – send emails with links that contain
      the atlOrigin query param.

```javascript
shareLinkInput.value = 'https://growth.jira-dev.com/browse/KERBAL-353';

// 1. Generate a new ID
const origin = new OriginTracer({ product: 'jira' });

// 2. Fire an event
fireAnalyticsEvent('jira.issueShare.shareButton.click', {
  ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
});

// 3a. Add atlOrigin to your share link
shareLinkInput.value = origin.addToUrl(shareLinkInput.value);

// 3b. Post atlOrigin to the server so that it can be added to email URLs
const postData = {
  atlOrigin: origin.encode(),
  otherData: 42,
};
fetch('jira-dev.com', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(postData),
});

expect(fireAnalyticsEvent.lastCall.args[1]).toEqual({
  originProduct: 'jira',
  originIdGenerated: '7db2f7fb21554bea9158afa790d06a2b',
});
expect(shareLinkInput.value).toBe(
  'https://growth.jira-dev.com/browse/KERBAL-353?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);
expect(fetch.lastCall.args[1].body).toEqual(
  '{"atlOrigin":"eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9","otherData":42}',
);
```

## Journey ends. User lands into the target product.

When the invited user lands back into the product, the `atlOrigin` param should be present in the URL.

You usually want to:

1. Read `atlOrigin` from the URL.
2. If it's present:
   1. Fire an event.
   2. Cleanup `atlOrigin` from the URL.

```javascript
stub(location, 'href').value(
  'https://growth.jira-dev.com/browse/KERBAL-353?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);

// 1. Read origin from the URL
const origin = OriginTracer.fromUrl(location.href);

// 2. If origin was present...
if (!origin.isEmpty()) {
  // 2a. Emit an event (GAS v3 events are preferred)
  fireOperationalAnalyticsEvent({
    actionSubject: 'origin',
    action: 'landed',
    source: some - source,
    attributes: {
      ...origin.toAnalyticsAttributes(),
    },
  });

  // If you have to use GAS v2:
  // fireAnalyticsEvent('jira.page.with-atl-origin.viewed', {
  //   someData: 42,
  //   ...origin.toAnalyticsAttributes()
  // });

  // 2b. Remove altOrigin from the URL
  history.replaceState(OriginTracer.removeFromUrl(location.href));
}

expect(fireAnalyticsEvent.lastCall.args[1]).toEqual({
  originProduct: 'jira',
  originId: '7db2f7fb21554bea9158afa790d06a2b',
  someData: 42,
});
expect(location.href).toEqual('https://growth.jira-dev.com/browse/KERBAL-353');
```

The library is designed to avoid throwing exceptions. With the code above:

- If `atlOrigin` is not present, `fromUrl()` returns an instance of `EmptyOriginTracer`.
- If `atlOrigin` is malformed, `MalformedOriginTracer` will be returned.

For details, see section _Reading tracing information from the URL_.

## API Details

### `OriginTracer` — generating a unique origin tracing ID

By default, constructing an `OriginTracer` object associates it with a new, unique ID:

```javascript
const origin = new OriginTracer({ product: 'jira' });

expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
```

You can also generate the id manually through the `generateId()` static method, and pass it to the constructor:

```javascript
const originId = OriginTracer.generateId();
expect(originId).toBe('7db2f7fb21554bea9158afa790d06a2b');

const origin = new OriginTracer({ id: originId, product: 'jira' });
expect(origin.id).toBe(originId);
```

Of course, each time you generate an ID, it's going to be different. That's the whole point!

### `origin.addToUrl()` — adding tracing information to a URL

After creating your `OriginTracer` instance, call its `.addToUrl(url)` method:

```javascript
stub(location, 'href').value('https://id.stg.internal.atlassian.com/login');

const origin = new OriginTracer({ product: 'jira' });
location.href = origin.addToUrl(location.href);

expect(location.href).toBe(
  'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);
```

The method returns a new URL, same as the one it was given, but with a tracing parameter added.
The tracing parameter's name is `atlOrigin`. Its value is URL-friendly: urlencoding or decoding it has no effect.

### `OriginTracer.fromURL()` — reading tracing information from a URL

Construct your origin tracer using the factory method `OriginTracer.fromUrl(url)`:

```javascript
stub(location, 'href').value(
  'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);

const origin = OriginTracer.fromUrl(location.href);

expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
expect(origin.product).toBe('jira');

expect(origin.isValid()).toBe(true);
expect(origin.isEmpty()).toBe(false);
```

`.fromUrl()` always returns an object.

If the URL did not contain an origin, the returned object will be an `EmptyOriginTracer`:

```javascript
stub(location, 'href').value('https://id.stg.internal.atlassian.com/login');

const origin = OriginTracer.fromUrl(location.href);

expect(origin.id).toBe(null);
expect(origin.product).toBe(null);

expect(origin.isValid()).toBe(false);
expect(origin.isEmpty()).toBe(true);
```

Calling `.fromUrl()` with a parameter that's not a valid URL also results in an empty origin:

```javascript
stub(location, 'href').value('malformedurl!!!');

const origin = OriginTracer.fromUrl(location.href);

expect(origin.id).toBe(null);
expect(origin.product).toBe(null);

expect(origin.isValid()).toBe(false);
expect(origin.isEmpty()).toBe(true);
```

If the URL was valid, but contained a malformed origin, the returned object will be `MalformedOriginTracer`:

```javascript
stub(location, 'href').value(
  'https://id.stg.internal.atlassian.com/login?atlOrigin=$@!@malformed!!!',
);

const origin = OriginTracer.fromUrl(location.href);

expect(origin.id).toBe(null);
expect(origin.product).toBe(null);

expect(origin.isValid()).toBe(false);
expect(origin.isEmpty()).toBe(false);
```

### `OriginTracer.removeFromUrl()` — removing tracing information from a URL

The static method `OriginTracer.removeFromUrl(url)` returns the same URL that it received, but stripped of all
origin tracing parameters:

```javascript
stub(location, 'href').value(
  'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);

location.href = OriginTracer.removeFromUrl(location.href);
expect(location.href).toBe('https://id.stg.internal.atlassian.com/login');
```

### `origin.encode()` — encoding tracing information into a string

Calling `.encode()` on your origin instance will give you all the tracing data encoded into a URL-friendly string:

```javascript
const origin = new OriginTracer({ product: 'jira' });
const encoded = origin.encode();

expect(encoded).toBe(
  'eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
);

// URL-encoding doesn't affect the value
expect(encodeURIComponent(encoded)).toBe(encoded);

// Implementation details
expect(atob(encoded)).toBe('{"i":"7db2f7fb21554bea9158afa790d06a2b","p":"j"}');
expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
expect(origin.product).toBe('jira');
```

Technically, the value doesn't even have to be URL-encoded.

### `origin.toAnalyticsAttributes()` — adding tracing information to analytics events

Once you've created your origin tracer, call `.toAnalyticsAttributes()` to get an object with analytics attributes.
You can pass this object to your trigger analytics event function:

```javascript
fireAnalyticsEvent('jira.sharePage.closed', {
  someData: 42,
  ...origin.toAnalyticsAttributes(),
});

expect(fireAnalyticsEvent.lastCall.args[1]).toEqual({
  someData: 42,
  originId: '7db2f7fb21554bea9158afa790d06a2b',
  originProduct: 'jira',
});
```

If you're triggering an event that generated a new ID, pass the `hasGeneratedId` option. This will give the analytics
attribute `originIdGenerated` instead of the default `originId`.
`originIdGenerated` should be used for the events immediately surrounding the starts the sharing/invite process.
Subsequent events (along the user's journey) should use `originId`, so should not ass the `hasGeneratedId` option.

```javascript
fireAnalyticsEvent('jira.issueShare.shareButton.click', {
  someData: 42,
  ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
});

expect(fireAnalyticsEvent.lastCall.args[1]).toEqual({
  someData: 42,
  originIdGenerated: '7db2f7fb21554bea9158afa790d06a2b',
  originProduct: 'jira',
});
```

Many analytics libraries require attributes to be marked as safe strings. You can achieve this by using the
`transformValue` option:

```javascript
const safeString = stub().callsFake(s => `__SAFE(${s})`);

fireAnalyticsEvent('jira.sharePage.closed', {
  someData: 42,
  ...origin.toAnalyticsAttributes({
    transformValue: value =>
      typeof value === 'string' ? safeString(value) : value,
  }),
});

expect(fireAnalyticsEvent.lastCall.args[1]).toEqual({
  someData: 42,
  originId: '__SAFE(7db2f7fb21554bea9158afa790d06a2b)',
  originProduct: '__SAFE(jira)',
});
```

## Browser/Node compatibility

To save weight on the frontend, the library uses some browser-specific APIs with Node-friendly fallbacks:

- `btoa()` and `atob()` to encode Origins into base64 strings (Node fallback: `Buffer`).
- `URLSearchParams()` to handle the `atlOrigin` query param (Node fallback: the `url` module).

Make sure your environment provides them, or that you've included polyfills.

The APIs are supported natively in:

- All major browsers except IE.
- Node versions v7.5.0 and above (also v6.13.0 and above).
