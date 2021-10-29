# fs/package-json-entry-match

Ensures that filenames follows a certain pattern

## Rule Details

This rule complements the existing filename pattern match rule but also
enforces the `atlaskit:src` entry is updated as well.

👍 Examples of **correct** filename for this rule:

* `src/index.[tsx|ts]` with a matching `atlaskit:src` entry in `package.json`

👎 Examples of **incorrect** code for this rule:

* `index.tsx` without a matching `atlaskit:src` entry in `package.json`
* An empty or undefined `atlaskit:src`

## Resources

- [Rule source](./index.tsx)
- [Rule test](./test.tsx)
