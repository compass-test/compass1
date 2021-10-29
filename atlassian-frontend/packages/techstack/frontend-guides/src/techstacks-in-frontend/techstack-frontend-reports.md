# Publishing the techstack report

To get the techstack report for your repository, `@atlassian/techstack-runtime` package exposes the
`getTechstackReport` function.

```javascript
const { getTechstackReport } = require('@atlassian/techstack-runtime');

const report = getTechstackReport({
  rootPath: '.',
  pathToPackages: 'src/packages',
});

console.log(JSON.stringify(report, null, 2));
```

The output of the function can then be used to publish a JSON asset through bamboo or Bitbucket
pipelines to an S3 bucket or other asset store.

Following is an example on publishing the json asset using Bitbucket Pipelines :

```javascript
- node build/legacy/ci-scripts/get.techstack.report.js > report.json
- echo "Uploading techstack-report..."
- curl --progress-bar -X PUT -H "authorization:Bearer ${PIPELINES_JWT_TOKEN}" -T report.json "<assets_url>/<some-path>/report.json"
```
