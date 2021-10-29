# Cross Flow Extensions

Package to define CrossFlowExtensions factories for use with cross-flow-support.

Each factory function will accept an options object with all desired extension properties,
and return an instance of CrossFlowExtensions that includes the pre-defined set of allowed
properties.

## Extension Factories

### Admin Hub Extensions

Supported properties:

- edition?: string
- migrationSourceUuid?: string

The edition should be one of "free", "standard", "premium", "essentials" or "enterprise". Although no validation of this value is done within this package, you should ensure that the value passed is valid for the targetProduct.

Usage:

```js
import { createAdminHubExtensions } from '@atlassiansox/cross-flow-extensions/adminhub';

const extensions = createAdminHubExtensions({
  edition: Editions.PREMIUM,
  migrationSourceUuid: 'example-uuid',
});
```

### Start Extensions

Supported properties:

- edition?: string
- migrationSourceUuid?: string

The edition should be one of "free", "standard", "premium", "essentials" or "enterprise". Although no validation of this value is done within this package, you should ensure that the value passed is valid for the targetProduct.

Usage:

```js
import { createStartExtensions } from '@atlassiansox/cross-flow-extensions/start';

const extensions = createStartExtensions({
  edition: Editions.PREMIUM,
  migrationSourceUuid: 'example-uuid',
});
```

## Passing Extensions to Cross-Flow-Support

After creating extensions using one of the above factories, pass the extensions property to cross-flow-support's open method.

```js
// Pass extensions to cross-flow-support's API:
crossFlow.api.open({
  targetProduct: Targets.JIRA_SOFTWARE,
  sourceComponent: 'touchpointSpecialPage',
  sourceContext: 'confluence',
  journey: Journeys.GET_STARTED,
  extensions,
});
```

## Need Additional Extensions?

For information and advice about defining new extensions, please consult with the Cross Flow Essentials team.

Slack: #team-cross-flow-essentials
