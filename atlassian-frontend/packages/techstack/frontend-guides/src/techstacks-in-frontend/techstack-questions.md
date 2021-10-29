# Frequently asked questions in Techstack

### Why do we have two configuration keys named `default` and `repository` in the `.techstackrc.js` configuration file?

The `repository` key lists the techstack definitions, the use-cases and their solutions used within
the repository. It is just a superset to keep track of all the use-cases and solutions within the
repository.

The use-cases and solutions mentioned in the `default` key are applied by default to all the
packages.

We have kept two seperate keys because a package can use a use-case and a solution from the
`repository` set but it might not be `default` applied to all packages. In an ideal scenario, when
all packages would have similar patterns and code requirements, `repository` and `default` key would
be exactly similar but that is not the case with most repositories.

### What are the dependencies we need to add to get techstack ecosystem running?

- The eslint and stricter rules are checked at runtime by the `@atlassian/techstack-runtime`
  package. This packages exposes `eslintAdapter` and `stricterAdapter` that are hooked to the
  eslint and stricter configs.
- You would also need packages that provide the `techstack-definitions`. For example,
  `@atlassian/frontend-techstack` package provides several standard use-cases and solutions.
  Ideally, if these packages use a plugin which expose eslint rules, the plugins should be
  mentioned in the dependency list of the package itself so that you manually won't need to add
  it.

### How should we structure our custom techstack-definition package?

The custom techstack-definition package should have a package name with suffix `techstack` and then
use the package name without the `techstack` suffix in `.techstackrc.js` configuration file of the
repository. A techstack definition `@repo/internal` is mapped to a package named
`@repo/internal-techstack`. Similarly, techstack definition `@atlassian/frontend` is mapped to
package `@atlassian/frontend-techstack`. Thus, if there is a need to create a custom techstack
definition package, you need to suffix it with `techstack` in the package name and then use the
package name with the `techstack` suffix in the techstackrc configuration file.

A techstack definition is an array of use-cases exported as a node `package`. So a
`techstack definition` package would have this pattern in their root export.

```javascript
module.exports = [
  animation,
  typeSafety,
  codeStructure,
  packageBoundaries,
  circularDependencies,
  importStructure,
  routing,
  styling,
  dragAndDrop,
  unitTestingComponents,
  securityChecks,
  sharedState,
];
```

Each use case here would need to have an array of solutions where in each solution would have the
necessary checks and antichecks. A sample solution would look like: A sample solution looks like:

```javascript
const dummy = {
  id: 'dummy',
  caption: 'dummy',
  status: 'recommended',
  checks: () => [
    {
      type: 'stricter',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/dummy',
      configuration: {
        level: 'error',
        config: {},
      },
    },
    {
      type: 'eslint',
      rule: 'no-restricted-imports',
      configuration: [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: "Please import React from 'react' instead.",
            },
          ],
        },
      ],
    },
  ],
};
```

### What are checks and anti-checks?

When a solution is used for a use-case, the corresponding checks of that solution are applied. Also,
the solution which we then don't use, the corresponding anti-checks of those solution are applied.

### One of our custom eslint rule used in a techstack solution requires manual configuration. What are the options available?

Techstack solutions have an ideal lint configuration. However, in some cases, we might want to
override it. The options then would be:

- Don't use that use-case and its solution. Use that eslint rule directly in your eslint
  configuration.
- Some custom eslint rule might allow passing config or other meta information through
  [shared-settings](https://eslint.org/docs/user-guide/configuring#adding-shared-settings). You
  can use the same for configuration.
