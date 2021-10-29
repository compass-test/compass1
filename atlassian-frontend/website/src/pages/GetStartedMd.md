# Atlaskit

Atlaskit is a collection of reusable packages designed for Atlassian products and experiences, comprising the Atlassian Design System,
Atlassian Editor,
Atlassian Media and other packages.

Our public packages are available under the `@atlaskit` scope [on npm](https://www.npmjs.com/search?q=Atlaskit%2F).
The source of all public `@atlaskit` packages can be found in the [Atlassian Frontend mirror repository](https://bitbucket.org/atlassian/atlassian-frontend-mirror/src).
This mirror is used because Atlaskit is part of the larger Atlassian Frontend internal repository,
which is a private repository that includes Atlassian’s internal front-end code.
(The mirror was previously known as `design-system-mirror` before it was expanded to include all public packages.)

## Installation

Packages are available as individual npm packages.
This allows users to consume a subset of the packages as needed,
without needing to install everything.
However,
there are some prerequisites to be aware of to ensure all components behave as expected.

### Prerequisites

#### Peer dependencies

Packages in this repository can have peer dependencies.
When installing a package make sure to have these installed first:

```sh
npm i react@^16.8 react-dom@^16.8 styled-components@^3.2
```

Packages related to Editor and Media can also have a peer dependency on `react-intl`.
If using an Editor or Media package,
make sure to install this peer dependency:

```sh
npm i react-intl@^2.6
```

Since these are all peer dependencies,
they need to be on the specified major version.
Undefined behavior may occur when trying to use these peer dependencies on different major versions.

#### CSS reset

Some packages need this reset to ensure styles are rendered consistently as undefined behavior can happen without it:

```sh
npm i @atlaskit/css-reset
```

For setup instructions please [view the CSS reset documentation](https://atlaskit.atlassian.com/packages/css-packs/css-reset).

#### Typescript

Atlaskit packages are written in Typescript and ship with Typescript declaration (d.ts) files that you can use for typechecking your own applications. The minimum typescript version we support is the version we currently use in our repo, which we upgrade on a quarterly cadence. You can check the version that a particular package supports by searching its changelog for the last typescript upgrade release or by checking the typescript version in the `devDependencies` of the package (although this was only added to packages ~ October 2020).

If you are on an older version of Typescript than our packages support, you may encounter issues. We suggest upgrading your version of Typescript where possible. Where not possible, you can use a [paths mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) to map `@atlaskit` paths to an empty declaration file to ignore typechecking for those packages.

### Documentation

### Usage

Install packages you’re interested in using, for example, a button:

```sh
npm i @atlaskit/button
```

```jsx
import Button from '@atlaskit/button';

<Button>Hello world</Button>;
```

## Contributing

Currently,
Atlassian Frontend is only accepting contributions from Atlassian employees.
If you are an Atlassian employee you can [find information about this on our internal docs](https://developer.atlassian.com/cloud/framework/atlassian-frontend/).

## Support

For developers outside of Atlassian looking for help,
or to report issues,
[please make a post on the community forum](https://community.developer.atlassian.com/c/atlassian-ecosystem-design).
The forums are monitored and posts will be directed to the appropriate maintainers. We offer support for components that are part of the Atlassian Design System (which corresponds to the `/design-system` folder in the repository).

Please note that the level of support varies for all other packages. They are owned by different teams within Atlassian and are primarily intended for internal use. We will monitor the forums and try our best to redirect topics to the appropriate maintainers, but some packages are made available without official support.
