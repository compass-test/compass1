# Code style

Coding style can be pretty subjective. We recommend you use `prettier` for everything related to
code-style and `eslint` for catching possible programming errors. We should use as many defaults and
industry-standard presets as possible and only customize configurations or create custom rules when
necessary.

## Prettier

We recommend the use of [`prettier`](https://prettier.io) for formatting your code. We have a very
minimal `.prettierrc` configuration as we can offload opinions to the sane defaults that Prettier
has provided for us.

Recommended configuration:

```json
{
  "printWidth": 100,
  "proseWrap": "always",
  "singleQuote": true,
  "trailingComma": "all"
}
```

Rationale:

- `printWidth: 100` - 80 characters isn't very long and can create formatting that is harder to read
  than if it was a bit longer. The original basis for this was terminals being 80 characters wide is
  fairly outdated, so it's safe to keep this at a higher number.
- `singleQuote: true` - This is a fairly subjective setting that we will look at removing in the
  future. If we change this, a lot of code will need updating, which is why we've kept it for now.
- `trailingComma: "all"` - Adding trailing commas ensures that when lines are formatted that diffs
  and conflicts are minimized.

### Setup

We recommend running prettier on your changed files prior to committing them as a commit hook. You
may also configure your IDE to format your code based on your configuration, but this means that
it's not required to get up and running.

The way we do this would be to use [`lint-staged`](https://github.com/okonet/lint-staged) with [`husky`](https://github.com/typicode/husky/) (as opposed to something like `pretty-quick`)
because it will integrate better with hooks for other tools.

Installing (the `-W` is for monorepo projects):

```sh
yarn add husky lint-staged prettier --dev -W
```

Then add the following to your `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,md,mdx}": ["prettier --write"]
  }
}
```

Then in your `./husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```
