# Services layer

All components that are responsible for syncing UI with an external data source belong here. They
are considered “leaf” components, to be consumed and composed by UI components only. There should
never be any imports from “UI” within “services”.

## Naming convention

- **/test-utils** _(optional)_ - this directory contains testing utilities, and should be used in
  rare cases when the `test-utils.js` file is becoming too large, complex, and unmanageable.
- **/utils** _(optional)_ - in rare cases when a component needs to do a lot of transformations or
  other operations, a single `util.js` is not enough. When this happens they can be put in a folder
  instead and separated into files. In this case, every util should be put into its own file with
  the name that reflects name of that util, and has unit tests in a separate file with the name
  name-of-the-util.test.js.
- **constants.js** _(optional)_ - if a component requires to define a lot of constants they should
  be extracted into this file. There is no need to extract all constants right away though, use your
  best judgement here.
- **context.js** _(optional)_ - in very rare cases, when the context is too big, it might make sense
  to extract it into its own file.
- **index.js** - usually contains the main logic of the component. When there is a need and when it
  make sense, it can re-export this component's public API for others to consume. Main logic of the
  component then will go into main.js. This files also can contain react createContext if a service
  is implemented with React Context API.
- **main.js** _(optional)_ - main logic of the component if `index.js` is used for re-exporting
  public API.
- **mocks.js** _(optional)_ - mocks of a component with different variations of data to use in tests
  or examples of UI components that consume this service. See more details in the
  [DI section](../components-and-hooks-patterns/dependency-injection.md).
- **test.js** _(optional)_ - unit tests for the component or its utils.
- **test-utils.js** _(optional)_ - testing utilities that are specific to this particular service.
- **test-utils.test.js** _(optional)_ - tests the testing utilities exposed in `test-utils.js`.
- **types.js** _(optional)_ - all types for this component live here. The only exception are Props
  and State, that could live in the main.js if they are small enough.
- **utils.js** _(optional)_ - utils that are specific to this particular service.
- **utils.test.js** _(optional)_ - tests the utilities exposed in `utils.js`.

---

## Related reading

[Architecture and guide for services components](../components-and-hooks-patterns/services.md) |
[State management: core concepts](../state-management.md)
