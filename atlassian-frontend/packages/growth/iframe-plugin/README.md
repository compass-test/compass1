# iframe-plugin

A javascript wrapper to initialise iframes agnostically of consumer.
It consists of two parts:

1.  Spa Parent Client for consumers that appends the iframe to a DOM element and exposes listeners.
2.  Supplementary wrapper for the React SPA that will be encapsulated by the iframe - it will fire messages to the core client for intialising/tearing down and custom messages.

## Dependencies

Required to supply your own polyfills. List of dependencies required below:

## Storybook

`yarn storybook` in the local package folder (iframe-plugin).
It will spin up the storybook server, and a static file server that enables us to load in an index.html page from a public folder to use as our `src` attribute.

## Usage

### DOM structure

Parent Client is expecting to receive a reference to the container element, it will attempt to create the following
structure inside it:

```html
<Container>             <!-- Passed by reference as "container" option, expected to already exist in DOM -->
    <ModalElement>      <!-- Passed by reference as "modalElement" option or default created -->
        <LoaderElement /> <!-- Passed by reference as "loaderElement" option or default created -->
        <IFrame />
    </Modal>
</Container>
```

### Controlling appearance of the embed app

#### Option 1 - **RECOMMENDED**, Your own implementation

- `modalElement` _[DOMElement = null]_

  `ModalElement` DOM Element that will be appended to the container, `IFrame` and `LoaderElement` will be
  appended to it

- `loaderElement` _[DOMElement = null]_

  `LoaderElement` DOM Element that will be appended to the ModalElement, `display: none` style will be added to it
  when app reported it is ready

#### Option 2 - default styling as of v7.x.x,

- [Default ModalElement styles](./src/elements.ts#lines-114)
- [Default LoaderElement styles](./src/elements.ts#lines-88)
- [IFrame styles](./src/elements.ts#lines-146)

- `withLoader` _[boolean = false]_

  appends default spinner loader to `ModalElement` (https://atlaskit.atlassian.com/packages/core/spinner)

- `withBlanket` _[boolean = false]_

  enables backdrop, sets `ModalElement` tinted background color (same as `Backdrop.isTinted` https://atlaskit.atlassian.com/packages/core/blanket)

- `withFullscreen` _[boolean = false]_

  enables fullscreen mode, positions `ModalElement` absolutely rather than relatively

- `iframeZIndex` _[number = 200]_

  zIndex of the `IFrame` element

- `modalZIndex` _[number = 200]_

  zIndex of the `ModalElement` element

### React implementation

Please look at [product-store-react](https://bitbucket.org/atlassian/growth-kit/src/master/packages/components/product-store-react/)
and [product-store-spa](https://bitbucket.org/atlassian/growth-kit/src/master/packages/apps/product-store-spa/)

### Cross-origin window communication support

Now with cross-origin support.

```javascript
import {
  withSpaChildClient,
  MessageChannelTransportSlave,
} from '@atlassiansox/iframe-plugin';

const MyApp = withSpaChildClient(App, {
  client: new MessageChannelTransportSlave(),
});
```

_more about [message transport](./src/transport/README.md)_

# Registering message handlers between parent and child

## Parent --> Child

Parent

```javascript
// once client instantiated
client.postMessage({ type: 'SOME_MESSAGE', data: 'SOME_DATA' });
```

Child

```javascript
this.props.registerMessageHandler((e) => {
    switch (e.type) {
        case 'SOME_MESSAGE': console.log(e.data);
        ......
    }
})
```

## Child --> parent

Child

```javascript
this.props.postMessage({
  type: 'SOME_MESSAGE',
  data: { foo: 'bar' },
});
```

Parent

```javascript
client.on(HostEvents.Message, (e) => {
    switch (e.type) {
        case 'SOME_MESSAGE': {
            console.log(data.foo);
        }
        .....
    }
})
```

## Notes

Messages should be statically determined beforehand and without context to prevent the need of bumping these libraries

## Analytics helpers

### Usage

```javascript
import { analyticsWrapper, transformEvent } from '@atlassiansox/iframe-plugin';

const analyticsWebClient = getAnalyticsWebClient(); // fetch product implementation client;

analyticsWrapper(analyticsWebClient)(transformEvent(rawUIAnalyticsEvent));
```

## Iframe analytics events

We monitor iframe initialisation, handshake and ready events.

For these events to be fired the analytics handler is usually required before `init` is invoked

e.g.

```javascript
client.on(HostEvents.Error, onError);

client.on(HostEvents.AnalyticEvent, onAnalyticsEvent);

client.on(HostEvents.Handshake, onHandShake);

client.init({
  containerElement: iframeContainerElement.current,
});
```
