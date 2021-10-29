const linting = {
  id: 'linting',
  caption: 'via linting rules',
  status: 'recommended',
  checks: () => [
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/entry-points',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/entry-points/README.md',
      actionNeeded: `
        For this rule to work as intended, you will likely need to
        - provide \`entry-points\` settings in your root eslint configuration, and
        - declare the _entry points_ of your monorepo's packages in their \`package.json\` files,
        as described [here](https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/entry-points/README.md).
      `,
    },
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      resolverPlugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/no-relative-package-imports',
      href:
        'https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/techstack/eslint-plugin-tangerine/src/rules/import/no-relative-package-imports/README.md',
    },
  ],
};

module.exports = {
  id: 'package-boundaries',
  caption: {
    'as-a': 'developer',
    'i-want-to': 'respect package boundaries',
  },
  description: `
    [As a program grows in size it's important to split it into modules, so that you don't need to understand all of it to make a small modification.](https://martinfowler.com/articles/refactoring-dependencies.html) In JavaScript, we can apply modularisation on different levels of granularity;
    we can do so on file level, on component level, as well as on package level. Yet, unlike files and components, packages don't currently provide
    a "language-level" way of exposing only a defined API to their consumers. Unless we take care of it, we can freely "reach" into and out of a package.

    For us to build scalable systems, we want to respect the module boundaries of our packages.
  `,
  solutions: [linting],
};
