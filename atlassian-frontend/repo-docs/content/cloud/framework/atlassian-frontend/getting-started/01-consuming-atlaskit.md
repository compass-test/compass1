---
date: '2021-09-27'
---

# Consuming Atlaskit

#### Pre-requisites

It's strongly advised to use the Atlaskit CSS reset in your whole project, or some Atlaskit components
may diverge in appearance:

```javascript
import '@atlaskit/css-reset';
```

In general, you should avoid directly styling base elements (ex. p, h1, h2) and uses classes instead.

##### Polyfills

Components in this repo assume the following polyfills (or equivalent) are available:

```js
require('whatwg-fetch');
require('core-js/es6');
require('core-js/es7');
require('core-js/modules/web.timers');
require('core-js/modules/web.immediate');
require('core-js/modules/web.dom.iterable');
require('regenerator-runtime/runtime');
```

#### Example for React projects

Atlassian-Frontend and Atlaskit components are built for React. Here's an example of using the Avatar component:

1. First, you specify a component into your project as a dependency using npm: `npm install @atlaskit/avatar`
2. Then you can use it in your React projects like this:

```javascript
import React from 'react';
import Avatar from '@atlaskit/avatar';

export default (
  <Avatar
    src="https://design.atlassian.com/images/avatars/project-128.png"
    presence="online"
    size="large"
  />
);
```

Check out the [Public Registry][atlaskitregistry] to learn more.

#### Example for non-React projects

There is a subset of components available as styles called the Reduced UI pack.
To use:

1. You include these into your the HTML projects.

```html
<link rel="stylesheet" href="//unpkg.com/@atlaskit/css-reset@latest" />
<link rel="stylesheet" href="//unpkg.com/@atlaskit/reduced-ui-pack@latest" />
```

2. Then you can style HTML with

`<button class="ak-button ak-button__appearance-primary">Submit</button>`

Check out the [Reduced UI pack](http://go.atlassian.com/reduced-ui-pack) for more examples and details.
