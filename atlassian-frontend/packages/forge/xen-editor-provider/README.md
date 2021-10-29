This package encapsulates the Fabric Editor and Forge integration and exposes them as editor providers.

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

Run `yarn link @atlassian/xen-editor-provider` to link to dev version of package.

Consume the package, and run the appropriate Jira fragment (e.g. `yarn start --ngrok-subdomain <subdomain> jira-spa`).

Changes in xen-editor-provider should automatically be picked up when `devloop` is active.
