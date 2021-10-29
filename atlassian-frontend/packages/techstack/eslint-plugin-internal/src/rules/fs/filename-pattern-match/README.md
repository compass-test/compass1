# fs/filename-pattern-match

Ensures that filenames follows a certain pattern

## Rule Details

This rule forces filenames to match a certain pattern passed in using the config

### Rule Configuration

Example config:
```js
[
    {
        test: '^.*\\.ts$',
        shouldMatch: '^.*\\.tsx$',
        message: 'Expect ts files to be tsx',
    }
]
```

* `test`: if the filename does not match this test, this config will be ignored for the file
* `shouldMatch`: if the filename matches the test, then the filename will be tested by this key to determine if it passes or fails
* `message`: displayed to the developer when the filename does not match `shouldMatch` regex

👍 Examples of **correct** filename for this rule:

* `Avatar.tsx`
* `index.js` will be ignored by the config since it doesn't pass the test regex

👎 Examples of **incorrect** code for this rule:

* `Avatar.ts`

## Resources

- [Rule source](./index.tsx)
- [Rule test](./test.tsx)
