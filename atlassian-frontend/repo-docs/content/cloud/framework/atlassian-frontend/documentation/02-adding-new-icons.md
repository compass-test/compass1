---
date: '2021-10-07'
---

# Icons in Atlassian Frontend

Icons inside Atlassian Frontend have a custom build process as it generates its both stripped SVGs and React Components that are committed back to the repo so the cost of processing them isn't paid every time.

## Adding or updating an icon

> **NOTE** - Adding new icons flows through the Design System Team ([#help-design-system](https://atlassian.slack.com/archives/CFJ9DU39U/p1633571352285900)).
> Adding icons is a calculated process,
> if you're not from DST please reach out to us and let's talk first.
> Icons in the Design System should be `24x24` with 1 to 2 colors.

Adding or updating a new icon:

- Ensure your SVG has `width`, `height`, and `viewBox` attributes
  - The `width` and `height` attributes should be `24` and `viewBox` should be `0 0 24 24`
- Add / update the icon(s) under `packages/design-system/icon/svgs_raw`
- If your icon should have a specific grouping,
  place it in
  `/svgs_raw/{grouping-name}` and it will be namespaced appropriately.
- Run `yarn build theme`
- Finally run `yarn build:icon-glyphs`

The `build:icon-glpyhs` script will build the following packages:

- `@atlaskit/icon`
- `@atlaskit/icon-object`
- `@atlaskit/icons-file-type`
- `@atlaskit/reduced-ui-pack`

## Testing your change

Once these are built you should:

- Manually add your new icon to the list of icons in `packages/css-packs/reduced-ui-pack/src/internal/iconIds`
- Manually add your new icon to the list of icons in `packages/design-system/icon/src/components/__tests__/unit/index.test`
- Check that the new/updated icons are rendered correctly on the website in `@atlaskit/icon` by running `yarn start icon` and searching for your icon
- Check that the new/updated icons are rendered correctly on the website in `@atlaskit/reduced-ui-pack` by running `yarn start reduced-ui-pack` and visting the icon types example
- [When modifying an existing icon] Check that the icon update is displayed correctly on the Confluence branch deploy
