PLEASE DO NOT EVER MANUALLY EDIT `../../server/constants/redirect-url.js`
To make changes to this file, edit `../../server/_redirects.txt` and run
`node ./scripts/generate-redirects-list` from the root of `services/website-constellation`.

## DESCRIPTION

The generate-rdirects-list script takes the file `../../server/_redirects.txt`
parses it and transforms it into an exported javascript array of the following type:

```
  [originUrl: string, redirectUrl: string][]
```

This is then written to `../../server/constants/redirect-url.js`
