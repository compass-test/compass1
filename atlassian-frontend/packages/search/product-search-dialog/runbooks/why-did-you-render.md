# Why did you render?

The library [@welldone-software/why-did-you-render](https://github.com/welldone-software/why-did-you-render) can be used to help understand why renders happened. This can be useful for understanding the render lifecycle of a component, or to track down excessive rendering.

It can be added to a story by appending the following to the top of the story file:

```jsx
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React, {
  trackAllPureComponents: false,
  exclude: [/^CustomThemeButton/],
});
```

You can turn on logging for specific components by adding a static `whyDidYouRender` boolean to them. See [the documentation](https://github.com/welldone-software/why-did-you-render#tracking-components) for details.
