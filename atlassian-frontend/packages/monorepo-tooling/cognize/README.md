# Cognize

This is a [Babel](https://babeljs.io/) plugin & CLI which analyses how React components are used in a project, including collecting imports, props and parent-child relationships.

## What?

It can often be difficult to collect analytics on how components are used in a project. This is especially true for component libraries where others are consuming your components and you have no control over how they are used. Often people resort to run-time collection of specific events but usually these relate to end-user actions as opposed to how developers are using the components. This plugin collects analytics at build-time which allows for collecting the props that are passed in and component parent-child relationships which are much harder to collect at run-time.

```js
// App.js

import Component from '@awesome/component';

export default App = () => {
  return (
    <div>
      <span>
        <Component count={3} name="Steve">
          <span>I'm a child element</span>
        </Component>
      </span>
    </div>
  );
};
```

The plugin will collect data on all the imported components that match the configured `targetedImportName`, which in this case would be **@awesome/component**. It will then parse the tree for the name of the import and collect the props and the parent-child relationship. For this example it would find **Component** and see that the props passed are **count** and **name** as well as their respective values. It will also recurse up the tree and collect the parents like: _div_ -> _span_ -> _Component_.

## Installation

Install via [npm](https://npmjs.org/package/@atlaskit/cognize).

```
npm install --save-dev @atlaskit/cognize
```

## Plugin Configuration

In your Babel configuration, add `"@atlaskit/cognize/babel-plugin"` to your list of plugins. The default configuration log directly to the console so you can pipe it to a file, etc. Otherwise you can pass in a custom logging function which you can do with the data whatever you like.

Default config:

```json
// babel.config.json
{
  "plugins": [
    [
      "@atlaskit/cognize/babel-plugin",
      {
       { targetImports: "@awesome" }
      }
    ]
  ]
}
// will collect data on any component import starting with "@awesome" e.g. @awesome/component and @awesome/other-thing
```

Custom logging function config:

```json
// babel.config.json
{
  "plugins": [
    [
      "@atlaskit/cognize/babel-plugin",
      {
       { targetImports: "@awesome", customLogger: "./customLogger.js" }
      }
    ]
  ]
}
// pass a path as a string and the custom logging function will be loaded
// will do the same as the "Default config" example but will pass all data to custom logging function
```

```js
// babel.config.js
import customLogger from './custom-logger';

module.exports = {
  "plugins": [
    [
      "@atlaskit/cognize/babel-plugin",
      {
       { targetImports: "@awesome", customLogger: customLogger }
      }
    ]
  ]
}
// you can import a custom logging function and pass it in directly
// will do the same as the "Default config" example but will pass all data to custom logging function
```

## CLI usage

As an alternative, the `cognize-cli` is provided for use as a standalone way of running the plugin. This is useful in situations where you don't want to run the plugin on every build. As an example you could run the CLI against a project or multiple projects without having to build them.

```
cognize-cli -t @example/target-module -d path/to/directory
```

In this case you might consider installing the module globally before running the CLI via

```
npm install -g @atlaskit/cognize
```

You can also use a configuration file called `cognize.config.json` with the following options:

```json
{
  "targetImports": "^@atlaskit/(button|flag)$", // regex for the target packages you want to track
  "filesDirectory": "../my-project", // path to project directory
  "customLogger": "../my-logger.js", // path to custom logging function
  "ignoreDirs": "(__fixtures__|__tests__)", // regex of directories to ignore
  "customVisitors": "./my-visitors.js", // path to custom Babel visitors
}
```

Pass the config to the CLI like so

```
cognize-cli -c cognize.config.json
```

## License

See [LICENSE.md](./LICENSE.md).
