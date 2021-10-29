# Brisk Gatsby theme

This a Gatsby Theme that can be used to generate documentation for package's in a monorepo. It uses `@manypkg/gatsby-source-workspace` to add information about the packages in your monorepo to the graphQL layer of gatsby, and then uses that information to generate documentation pages for each package. You can use it within a gatsby project.

## Installing the theme

`yarn add @atlaskit/gatsby-theme-brisk`

# Using the theme

For information on using a gatsby theme, see: <https://www.gatsbyjs.org/docs/themes/using-a-gatsby-theme/>

You configure your gatsby site to use the theme in your `gatsby-config.js`, for example:

```js
module.exports = {
  siteMetadata: {
    siteName: `My Gatsby Site`,
    siteUrl: `https://atlassian.design`,
    description: `A gatsby site that uses the Brisk theme`,
  },
  plugins: [
    {
      resolve: `@atlaskit/gatsby-theme-brisk`,
      options: {
        packages: ['@atlaskit/avatar', '@atlaskit/select'],
        internalAnchorOffset: '80',
        repository: 'https://bitbucket.org/atlassian/atlassian-frontend',
        packageDocs: {
          folder: 'constellation',
          includeCodeTab: 'all',
        },
      },
    },
  ],
};
```

## Documenting packages

Inside of the package you're documenting, you add a subfolder to contain your documentation. This subfolder (`packageDocs.folder`) name can be whatever you want, but defaults to 'constellation'. You have several options of what you can include here.

If you include:

- an `index/` folder.
  Each mdx file within this folder will become a tab on the package's home page.
  - a `props.mdx` file within an `index` folder will override the props table on the package's code docs
- an `index.mdx` file
  This file will become the package's homepage. Use this OR the index folder, not both.
- any `mdx` file
  This will become a subpage of the package, and be nested underneath the package in the sidebar and create a subroute. For example, if I added `my-subpage.mdx` under `avatar/constellation` it would become a page nested under `avatar` and be rendered at `<SITEURL>/components/avatar/my-subpage`
- a folder that contains `mdx` files
  This will become a subpage with a tab for each file.

**Note:** you cannot have a tab that has the same name as a subpage, because tabs are routed client side. For example: if I have a tab called `usage`, it will be rendered at `<SITEURL>/components/avatar/usage` and will create a URL clash if I also add a subpage called `usage`.

### Frontmatter options

Use these in the docs folder.

- `order`
  Establishes tab order within mdx folders
- `headline`
  Changes the headline in the hero.
- `description`
  Changes the description in the hero.

---

## Theme Options

These are options that go into your website's `gatsby-config.js`

- `packages` is required, and takes an array of package names
- `internalAnchorOffset` Optional. The number of px to offset when navigating to internal links (ex: atlassian.design/components/avatar/usage#some-heading). This is also used to offset the sticky local nav. Use if there's a fixed header that would cover the content.
- `repository` is the url of the repository you're documenting. It's used to generate links in the code tab on package docs.
- `packageDocs` includes options for how documentation will be generated for individual packages
  - `folder` defines the location of the mdx files in within the package folder. Defaults to 'constellation'
  - `includeCodeTab` defines how we generate docs for the package. Possible values are:
    - `all`: create a page for every package with autogen-ed code docs
    - `indexed`: Default option. Only include auto-gen code docs for packages that have an `index.mdx` or `index` folder in their docs folder
    - `none`: do not auto generate code docs

## Theme Components & Templates

The theme comes with several reusable components and templates, located in `src/components` and `src/templates`. You can import and use these in your gatsby site like so: `import PageWithLocalNav from '@atlaskit/gatsby-theme-brisk/src/templates/page-with-local-nav';`

Many of these, like side nav and layout, are customizable. You can also shadow any theme components. See: [https://www.gatsbyjs.org/docs/themes/shadowing/]

For an example of a site consuming the theme and its components, see the `@atlaskit/website-constellation` package.

## Customizing the theme

Coming soon

## Rendering Examples

In a `.mdx` docs folder, you can easily include an example. The `<Example />` component is available by default, in any mdx file the website will render.

To render an example you need to write:

```js
// some-file.mdx
import MyExample from '../examples/my-example';

<Example packageName="@atlaskit/my-component" Component={Example} />;
```

Note that the code found in the `my-example` file will also be visible with the rendered example.

There are some rules that you need to follow for this to work smoothly:

1. All imports for examples must be at the top of the mdx file. If the imports are placed further down, it will almost certainly cause compile errors.
2. You must provide a `packageName` property - if you do not, references to `../src` in the example's raw form will be left in, instead of being replaced by the component name. Note that it replaces specifically `../src` by default. Please ask the maintainer if your examples will live somewhere where a different path needs to be replaced.
3. All examples should be imported from a `/examples` folder. If they are not, the code will not be visible, and the app may crash. If for some reason you cannot do this, you can provide the source code yourself using:

```js
// some-file.mdx
import MyExample from '../somewhere/out-there';
import source from '!!raw-loader!../somewhere/out-there';

<Example
  packageName="@atlaskit/my-component"
  Component={Example}
  source={source}
/>;
```

Note that only the contents of the example file will be visible. If information is not in this file (for example, it is in a helper file), this obfuscates how to use the components from users.

This is currently using the `<Example />` component from `@atlaskit/docs`, except modifying how the source is provided. Other props are passed down directly.
