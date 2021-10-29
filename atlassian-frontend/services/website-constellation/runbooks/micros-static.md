# micros static

See: https://hello.atlassian.net/wiki/spaces/DSYS/pages/669714902/Migration+from+Netlify+to+Micros

deploy stg

```
atlas micros static deploy --service=design-system-docs -e stg-east -f design-system-docs.sd.yml
```

deploy prod

```
atlas micros static deploy --service=design-system-docs -e prod-east -f design-system-docs.sd.yml
```
