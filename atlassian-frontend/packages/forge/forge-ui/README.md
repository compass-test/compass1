This package encapsulates the components to support adding Forge extensions into products.

# Setup

- Install onchange `npm install -g onchange`

# Dev loop

Run `yarn link` to make package linkable in product.

Run `npm run devloop`.

This will watch for changes under `src`, then build when there's a change.

# Product consumption

## Jira

Make the following webpack change to Jira to avoid duplicate version of React causing problems with hooks:

```
diff --git a/webpack.config.js b/webpack.config.js
index 919a9fb1f28..b4497119488 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -271,6 +271,9 @@ module.exports = {
     },
     resolve: {
         modules: [path.join(__dirname, 'src'), 'node_modules'],
+        alias: {
+            react: path.dirname(require.resolve("react/package.json")),
+        }
     },
     externals: {
         'language-pack': 'window.__LANG',
```

Run `yarn link @atlassian/forge-ui` to link to dev version of package.

Consume the package, and run the appropriate Jira fragment (e.g. `yarn start --ngrok-subdomain <subdomain> jira-spa`).

Changes in `@atlassian/forge-ui` should automatically be picked up when `devloop` is active.

# Components

The components in this package can be used to add support for Forge extensions in the UI of a product.

Example import:

```
import { ForgeUIExtensionPoint } from '@atlassian/forge-ui/ui';
```

The `moduleType` refers to the module type returned from graphql, this is usually namespaced. For example an module type
of `issueGlance` in the `manifest.yml`, but namespaced for Jira will require a `moduleType` of `jira:issueGlance`.

## ForgeUIExtensionPoint

This is a simple implementation that will render all the matching, installed extensions for a particular `moduleType`.

It also supports a `decorator` function that can wrap each extension (for example to add headings or sections).

Example:

```
const renderForgeItems = () => {
    const decorator = ({ title, children }) => (
        <>
            <SectionHeading>
                <SectionHeadingTitle>{title}</SectionHeadingTitle>
            </SectionHeading>
            {children}
        </>
    );

    return <ForgeUIExtensionPoint moduleType="jira:issueGlance" decorator={decorator} />
}
```

## ForgeUIExtensions

This provides a list of extensions of a particular `moduleType`. This can be used to iterate over the set
of available extensions to render some kind of view picker (e.g. tabs, or a select).

The product can render the `ForgeUIExtension` based the selection.

Example:

```
<ForgeUIExtensions
    moduleType="jira:activityItem"
    render={forgeExtensions => {
        const activityItems = this.getActivityItems({ forgeExtensions });
        ...

        return (
            ...
        );
    }}
/>
```

## ForgeUIExtension

This renders an individual extension, it is usually combined with `ForgeUIExtensions`.

It also supports a `decorator` function that can wrap each extension (for example to add headings or sections).

The `localId` is optional, and should be provided where multiple instances of an extension can exist (for example an editor macro).

Example:

```
<ForgeUIExtension extension={selectedItem.extension} />
```

## ForgeUIExtensionProvider

This is a required React context that should wrap any use of `ForgeUIExtensions` or `ForgeUIExtension` components. Typically is fairly close to the top of the React tree so it is only required once, but may vary if the `contextId` differ in parts of a page.

Example

```
const contextIds = [`ari:cloud:jira::site/${cloudId}`];

<ForgeUIExtensionProvider value={{ contextIds, client }}>
    ...app...
</ForgeUIExtensionProvider>
```
