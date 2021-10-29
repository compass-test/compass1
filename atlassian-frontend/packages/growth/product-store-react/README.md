# ProductStoreIntegration

This component aims to simplify the use of the Product Store in the hosts (i.e. Jira, Confluence, etc.). The idea is that from the consumer's point of view the Product Store is just a React component which offers an API to interact with. The whole complexity of interacting with an iframe via messages is encapsulated and hidden from the consumer. The component enforces, via TypeScript, the signatures of its methods and routes. A working example can be found in the examples folder via Storybook.

## Storybook

`yarn storybook` in the local package folder will spin up the storybook server, and a static file server that enables us to load in the `fake-product-store.html` page from a public folder to use as our `src` attribute.

### Example of use

```javascript
import ProductStoreIntegration, {
    ProductKeys as ProductStoreTargetProducts,
} from '@atlassiansox/product-store-react';

<ProductStoreIntegration
    route={ProductStoreRoutes.discovery_products}
    locale="en-US"
    cloudId="foobar-1234-5678-90abc-abcdef3ghijlm"
    onLearnMoreClicked={(product: ProductStoreTargetProducts) => { ... }}
    onTryClicked={(product: ProductStoreTargetProducts) => { ... }}
    onClose={() => ... }
/>;
```

## Notes

In Storybook's example, the Product Store SPA address is provided via `src` attribute. It will not be necessary in a real case scenario when the component will default to `/gpa-product-store/` which is the relative path to the real Product Store.
