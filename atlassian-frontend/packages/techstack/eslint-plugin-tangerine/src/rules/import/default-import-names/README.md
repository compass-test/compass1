# import/default-import-names

> Forces names for the _default_ imports to always be the same as specified in the configuration of
> this rule

You need to provide a configuration with accepted names for default import, one rule per imported
file path.

## Rationale

Having consistent default import names across all of the files in a project makes navigating,
skimming and updating simpler because there's less differences you need to keep track of.

## Examples

👎 Examples of **incorrect** code for this rule:

```js
/*eslint tangerine/import/default-import-names: [ 'error', [
                                                    { name: 'React', source: 'react' },
                                                    { name: 'styled', source: 'styled-components' },
                                                ]],*/

import react from 'react';
import Foo from 'styled-components';
```

👍 Examples of **correct** code for this rule:

```js
/*eslint tangerine/import/default-import-names: [ 'error', [
                                                    { name: 'React', source: 'react'},
                                                    { name: 'styled', source: 'styled-components'},
                                                ]],*/

import React from 'react';
import styled from 'styled-components';
```

## Options

The rule takes a configuration object of the following shape:

```js
[
  {
    source: string,
    name: string,
  },
];
```

### `source`

Imported file path, to which to apply this rule.

### `name`

The only allowed name for the default import from this file

## 🔧 Autofix

_This rule is [auto-fixable](https://eslint.org/docs/user-guide/command-line-interface#fix)._
