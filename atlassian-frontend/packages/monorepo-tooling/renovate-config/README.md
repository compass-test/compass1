# `@atlaskit/renovate-config`

This package contains the renovate config to be used in Products.

## 🎉 How to update the renovate config?

1. `cd packages/monorepo-tooling/renovate-config`
2. Run `bolt/ yarn update-config`.
3. Return to the root of `atlassian-frontend`, you can do `cd -`.
4. Run `bolt changeset`.

- Select `@atlaskit/renovate-config`.
- Select a patch.
- Add a message about the changes.

5. Create a PR against `master`.

## 🎊 How to use the renovate config in product?

1. Add `@atlaskit/renovate-config` as a `devDependencies` in the product `package.json`.
2. In the `renovate.json`, use `extends` to use your config & rules:

```
{
  "packageRules": [
    {
      ....
    }
  ],
  "branchPrefix": "renovate_",
  "extends": [
    "config:base",
    "@atlaskit",
    "@atlaskit:disable-other-upgrades-except-af"
  ],
  "separateMajorMinor": false,
  "rangeStrategy": "bump",
  "prConcurrentLimit": 100,
  "postUpdateOptions": [ "yarnDedupeFewer"   ]
}
```
