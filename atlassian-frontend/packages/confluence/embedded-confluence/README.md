# Embedded Confluence

## Introduction

This package provides components (ViewPage, EditPage, Page) to any parent product which needs to embed confluence experience within the parent products.

- [Confluence Embeddable Pages](https://hello.atlassian.net/wiki/spaces/CSOL/pages/909774722/Confluence+Embeddable+Pages)
- [Tech Spec](https://pug.jira-dev.com/wiki/spaces/CSOL/pages/4784558818/Embeddable+Page+React+Component+Tech+Spec)

## Using Embedded Confluence

Parent products should make sure the Confluence cookie is properly set while integrating with any of the components. The cookie should contain 2 tokens: `atl.xsrf.token`, and either `cloud.session.token` (in production) or `cloud.session.token.stg` (in staging) based on the environment. The cookie can be obtained upon login to [Confluence](https://www.atlassian.com/software/confluence).

This package is still in early development phase and team is actively working on it, the components and APIs are subject to changes.

Please follow [Changelog](https://bitbucket.org/atlassian/atlassian-frontend/src/master/packages/confluence/embedded-confluence/CHANGELOG.md) for package releases

## Usage instructions for parent products

### Installation

To begin with using the components, the frontend repo of parent product needs to install `@atlassian/embedded-confluence` package.

To install:

```
yarn add @atlassian/embedded-confluence
```

For repos which use [`Bolt`](https://www.npmjs.com/package/bolt), to install:

```
bolt add @atlassian/embedded-confluence
```

### Feature Flags (FFs)

- Jira Service Management (JSM): `jsd.enable.embedded.confluence`

  Please refer to this [page](https://hello.atlassian.net/wiki/spaces/CSOL/pages/993980414/How+to+turn+on+EP+view+component+in+JSM) to learn about how to toggle this FF for JSM.

### Components

#### View Page

`@atlassian/embedded-confluence` exports `ViewPage` component.

Within your React component, you can import the component from the package and then compose it.

```jsx
import { ViewPage } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  return (
    <ArticleWrapper>
      <ViewPage
        contentId={props.contentId}
        parentProductContentContainerId={props.parentProductContentContainerId}
        parentProduct={'JSM'}
        spaceKey={props.spaceKey}
        onEdit={e => {
          e.preventDefault();
          // handle navigation to EditPage
        }}
      />
    </ArticleWrapper>
  );
};
```

##### Component API

| Property name                     | Type                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`                       | string                                                 | (Optional) If provided, the custom class name will be added on the container element                                                                                                                                                                                                                                                                                                                                                |
| `contentId`                       | string                                                 | The Id of content from Confluence perspective                                                                                                                                                                                                                                                                                                                                                                                       |
| `hasByLineContributors`           | boolean                                                | (Optional) Default value is `true`. Boolean to show/hide the contributors information, this includes contributor name and avatars                                                                                                                                                                                                                                                                                                   |
| `hasByLineExtensions`             | boolean                                                | (Optional) Default value is `true`. Boolean to show/hide the byline extensions, this includes page read time, load time, comments count and people viewed count                                                                                                                                                                                                                                                                     |
| `hasComments`                     | boolean                                                | (Optional) Default value is `true`. Boolean to show/hide the page comments block                                                                                                                                                                                                                                                                                                                                                    |
| `hasLikes`                        | boolean                                                | (Optional) Default value is `true`. Boolean to show/hide the page "Likes"                                                                                                                                                                                                                                                                                                                                                           |
| `navigationPolicy`                | Object, see [definition](#navigationpolicy-definition) | (Optional) See [description](#navigationPolicy-description) and [examples](#navigationPolicy-examples)                                                                                                                                                                                                                                                                                                                              |
| `onEdit`                          | function                                               | (Optional) ** DO NOT USE. To handle navigation when user clicks on the Edit icon, please use `navigationPolicy` ** If `showEdit` is false, `onEdit` will not be called; otherwise, this function will be called each time user clicks on the Edit icon. It will receive MouseEvent as parameter. Embedding product can use this to handle navigation to Edit Page. Need to call `e.preventDefault()` inside this function otherwise it will follow current Confluence navigation which is customizable using `navigationPolicy`.                                                                                                                                                                                                                                                                                                   |
| `showEdit`                          | boolean                                         | (Optional) Default value is `false`. Boolean to show/hide the "Edit" pencil icon. If set to true, the edit icon will show if user has edit permission.                                                                                                                                                                                                                           |
| `parentProduct`                   | string                                                 | The parent product name string supported by Embedded Component                                                                                                                                                                                                                                                                                                                                                                      |
| `parentProductContentContainerId` | string                                                 | (Optional) The Id of the parent product that have a mapping relationship with Confluence space. For example, for Jira, this could be the project Id. JSM can enable unlicensed user access by passing this prop.                                                                                                                                                                                                                    |
| `parentProductContentId`          | string                                                 | (Optional) The Id of content from parent product perspective. For example, for JSM, this could be the KB article Id.                                                                                                                                                                                                                                                                                                                |
| `showDelete`                          | boolean                                         | (Optional) Default value is `false`. Boolean to show/hide the "Delete" menu item within the "Ellipsis" icon. If set to true, the "Delete" menu item will only show if user has delete permission.                                                                                                                                                                                                                                             |
| `spaceKey`                        | string                                                 | The key of space the content belongs to, from Confluence perspective.                                                                                                                                                                                                                                                                                                                                                               |

---

#### Edit Page

`@atlassian/embedded-confluence` exports `EditPage` component.

Within your React component, you can import the component from the package and then compose it.

```jsx
import { EditPage } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  return (
    <ArticleWrapper>
      <EditPage
        contentId={props.contentId}
        parentProductContentContainerId={props.parentProductContentContainerId}
        parentProduct={'JSM'}
        spaceKey={props.spaceKey}
        onClose={({ isUnpublishedDraft }) =>
          isUnpublishedDraft
            ? props.navigateToDraftListPage
            : props.navigateToViewPage
        }
      />
    </ArticleWrapper>
  );
};
```

##### Component API

| Property name                     | Type                                                   | Description                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentId`                       | string                                                 | The Id of content from Confluence perspective                                                                                                                                                                                                                                                                                                                                   |
| `draftShareId`                    | string                                                 | (Optional) - it is required only for **Unpublished Draft**. **Unpublished Draft** is a Confluence page that has not been published yet. Users (with exception the author) needs a valid `draftShareId` to have permission to view it. When a page is created, Confluence will generate a `draftShareId`. Please refer to [Create New Page](#create-new-page)                    |
| `navigationPolicy`                | Object, see [definition](#navigationpolicy-definition) | (Optional) See [description](#navigationPolicy-description) and [examples](#navigationPolicy-examples)                                                                                                                                                                                                                                                                          |
| `onClose`                         | function                                               | (Optional) **DO NOT USE. To handle "onClose" action, please subscribe to experience tracker event: `"taskSuccess"` of `"edit-page/close"` experience**. If provided, this function will be called each time user clicks on "Close" button. This function will receive `{ isUnpublishedDraft: boolean }` as parameter and `isUnpublishedDraft` will be set to `true` when the document is an unpublished draft. If not provided, it will follow current Confluence navigation which is customizable using `navigationPolicy`. |
| `onPublishSuccess`                | function                                               | (Optional) **DO NOT USE. To handle "onPublish" action, please subscribe to experience tracker event: `"taskSuccess"` of `"edit-page/publish"` experience**. If provided, this function will be called after the page is successfully published. This function will receive `{ createdDate: string }`as parameters. If not provided, it will follow current Confluence navigation which is customizable using `navigationPolicy`.                                                                                                 |
| `parentProduct`                   | string                                                 | The parent product name string supported by Embedded Component                                                                                                                                                                                                                                                                                                                  |
| `parentProductContentContainerId` | string                                                 | (Optional) The Id of the parent product that have a mapping relationship with Confluence space. For example, for Jira, this could be the project Id. JSM can enable unlicensed user access by passing this prop.                                                                                                                                                                |
| `parentProductContentId`          | string                                                 | (Optional) The Id of content from parent product perspective. For example, for JSM, this could be the KB article Id.                                                                                                                                                                                                                                                            |

---

#### Page

`@atlassian/embedded-confluence` exports `Page` component. Within your React component, you can import the component from the package and then compose it.

Unlike `ViewPage` or `EditPage`, `Page` component acts like a smart component that renders the corresponding component (View or Edit) based on the given properties. `url:string` is a highly recommended property to be passed in. `Page` parses this URL and extracts properties including protocol, hostname, content id, space key, parent product. If any of those URL-parsed properties are also explicitly passed in, then those passed-in properties will take priority over URL-parsed properties. The URL does not have to include a protocol or domain. Protocol by default will be "https:" and domain will be default be the same as `window.location`.

`Page` matches this URL against a predicate of routes that embedded Confluence will support. As of today we support the following routes:

- View Page:  `/wiki/spaces/:spaceKey/pages/:contentId(\\d+)/:contentSlug?`
- View Blog: `/wiki/spaces/:spaceKey/blog/:contentId(\\d+)/:contentSlug?`
- View Blog Date Legacy: `/wiki/spaces/:spaceKey/blog/:year(\\d+)/:month(\\d+)/:day(\\d+)/:contentId(\\d+)/:contentSlug?`

If an unsupported URL is passed in, you should be able to see the corresponding error message in the console and `Page` will not render anything. Following routes are not yet but soon to be supported:

- Edit Page Embed: `/wiki/spaces/:spaceKey/:contentType(pages)/edit-embed/:contentId(\\d+)`
- Edit Page v2: `/wiki/spaces/:spaceKey/:contentType(pages)/edit-v2/:contentId(\\d+)`
- Space Overview: `/wiki/spaces/:spaceKey/overview`

```jsx
import { Page } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  return (
    <ArticleWrapper>
      <Page
        url={"https://hello.atlassian.net/wiki/spaces/ABC/pages/123?parentProduct=TestProduct"}
      />
    </ArticleWrapper>
  );
};
```

##### Component API

| Property name                     | Type                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentId`                       | string                                                 | (Optional) The Id of content from Confluence perspective                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `parentProduct`                   | string                                                 | (Optional) The parent product name string supported by Embedded Component                                                                                                                                                                                                                                                                                                                                                                                                           |
| `parentProductContentContainerId` | string                                                 | (Optional) The Id of the parent product that have a mapping relationship with Confluence space. For example, for Jira, this could be the project Id. JSM can enable unlicensed user access by passing this prop.                                                                                                                                                                                                                                                                    |
| `parentProductContentId`          | string                                                 | (Optional) The Id of content from parent product perspective. For example, for JSM, this could be the KB article Id.                                                                                                                                                                                                                                                                                                                                                                |
| `spaceKey`                        | string                                                 | (Optional) The key of space the content belongs to, from Confluence perspective.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `url`                             | string                                                 | (Optional) If provided, `contentId`, `spaceKey`, `parentProduct`, `hostname`, `protocol`, and queries will be parsed from the URL. If those properties are provided along with `url`, then those properties takes priority over parsed properties from the `url`                                                                                                                                                                                                                    |
**Note that even though all properties are optional, the required properties for `Page` to render an embedded Confluence page are `contentId`, `spaceKey`, and `parentProduct`. They can be passed in either explicitly or via URL.

---

## APIs

### `navigationPolicy`

#### `navigationPolicy` description

Both `ViewPage` and `EditPage` components accept `navigationPolicy` prop. This is the prop parent product can provide their implementation of handling a navigation request based on url.

#### `navigationPolicy` definition

The navigation policy includes an optional `shimUrl` and a `navigate` function.

```ts
{
  shimUrl?: string;
  navigate?: (url, modifiers, defaultNavigate) => void
}
```

- `navigate`: (Optional) Function that parent product provides. This allow parent product to customize the navigation for url. Through the `navigate`, parent product will have access:

  - `url`: The url that navigation is targeting on.
  - `modifiers`: An object contains modifiers that parent product may be interested.
    - `target`: `'_self' | '_blank'` - specify if the navigation should stay within the same window: `_self`, or should open a new tab: `_blank`.
    - `contentId`: `string | undefined` - the id of content from Confluence perspective parsed from the `url`.
    - `spaceKey`: `string | undefined` - the key of space the content belongs to from Confluence perspective parsed from the `url`.
    - `routeName`: `string | undefined` - the Embedded Confluence route name derived from the `url`. Currently only the following routes are supported:
        | RouteName       |  Description                                                                                                 |
        | --------------- | ------------------------------------------------------------------------------------------------------------ |
        | EDIT_PAGE_EMBED | This route name specifies that the URL is for Embedded Editor. This editor uses Native Collab Service (NCS). |
        | VIEW_PAGE       | This route name specifies that the URL is for the View Page.                                                 |
  - `defaultNavigate`: A function that parent product can optionally choose to proceed with as default navigation behaviors. This gives parent product an option to opt in to handle the navigation of `url`, or choose to opt out and fallback to default navigation behaviors.

- `shimUrl`: (Optional) If provided, any URL that navigates to Confluence app will be converted to the URL of the parent product. <br>

  - Example:
    If parent product tenant is `https://domain1.com/` and it is linked to Confluence Cloud, here is a table explains how this link `https://domain1.com/wiki/a/b/c` would be converted based on different `shimUrl` values:

    | Provided `shimUrl` by parent product | URL in Embedded Confluence                  |
    | ------------------------------------ | ------------------------------------------- |
    | `""` or `undefined`                  | `https://domain1.com/wiki/a/b/c`            |
    | `/xyz`                               | `https://domain1.com/xyz/a/b/c`             |
    | `xyz`                                | `https://domain1.com/xyz/a/b/c`             |
    | `https://domain1.com/xyz`            | `https://domain1.com/xyz/a/b/c`             |
    | `https://domain1.com`                | `https://domain1.com/a/b/c`                 |
    | `domain1.com/xyz`                    | `https://domain1.com/domain1.com/xyz/a/b/c` |
    | `domain1.com`                        | `https://domain1.com/domain1.com/a/b/c`     |

#### `navigationPolicy` examples

1. Parent product chooses not to proceed with the default navigation under some conditions.

```jsx
import { EditPage } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  const navigationPolicy = {
    navigate(url, modifiers, defaultNavigate) {
      if (/* some conditions*/) {
        // Do something without calling `defaultNavigate`
        return doSomethingElse(url, modifiers)
      }

      return defaultNavigate(url, modifiers);
    },
  };

  return (
    <EditPage
      navigationPolicy={navigationPolicy}
      {...otherProps}
    />
  );
};
```

2. Parent product chooses to proceed with default navigation after making customization to the inputs under some conditions.

```jsx
import { EditPage } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  const navigationPolicy = {
    navigate(url, modifiers, defaultNavigate) {
      let targetUrl = url;

      if (/*some conditions*/) {
        // Customize url and let this customized url be the input to default navigation implementation.
        targetUrl = 'something-else';
      }

      return defaultNavigate(targetUrl, modifiers);
    },
  };

  return (
    <EditPage
      navigationPolicy={navigationPolicy}
      {...otherProps}
    />
  );
};
```

3. Parent product handling navigation for different routeName example

```jsx
import { EditPage } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  const navigationPolicy = {
    navigate(url, modifiers, defaultNavigate) {
      if (modifiers.contentId === props.contentId) {
        switch (modifiers.routeName) {
            case EDIT_PAGE_EMBED:
              // Navigate to the "edit page" experience for contentId supported by embedded-confluence
              break;

            case VIEW_PAGE:
              // Navigate to the "view page" experience of contentId supported by embedded-confluence
              break;
        }
      }
      return defaultNavigate(url, modifiers);
    }
  };

  return (
    <EditPage
      navigationPolicy={navigationPolicy}
      {...otherProps}
    />
  );
};
```

### Functions

#### Create New Page

The `createContent()` can be called to create a new Confluence Page. It will internally call Confluence API to create a new page. Currently, this function only supports same domain call (Embedding Product should be in the same tenant as Confluence) and it uses the auth token stored in the Cookie to authenticate (`cloud.session.token`). The newly created Confluence Page is an "Unpublished Draft" and in order to edit an unpublished draft, `draftShareId` must be passed in as props to `<EditPage />`.
To allow **unlicensed users** to create a page, `parentProduct` and `parentProductContentContainerId` props must be provided.

##### Usage

```jsx
import { createContent } from '@atlassian/embedded-confluence';

const MyComponent = props => {
  const [draftShareId, setDraftShareId] = useState <string | undefined>(undefined);
  const [contentId, setContentId] = useState <string | undefined>(undefined);

  const handleCreate = async () => {
    let result;
    try {
      result = await createContent({
        spaceKey: props.spaceKey,
      });
      setContentId(result.contentId);
      setDraftShareId(result.draftShareId);
    } catch (err) {
      // handle error
    }
  };

  return (
    <>
      <button onClick={handleCreate}>Create New Page</button>
      {contentId && (
        <EditPage
          contentId={props.contentId}
          parentProductContentContainerId={props.parentProductContentContainerId}
          parentProduct={'JSM'}
          spaceKey={props.spaceKey}
          draftShareId={draftShareId}
          onClose={({ isUnpublishedDraft }) => (
            isUnpublishedDraft
              ? props.navigateToDraftListPage
              : props.navigateToViewPage;
          )}
        />
      )}
    </>
  );
};
```

##### Arguments

| Property name | Type   | Description                                                                                                                                                                                                                                  |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| spaceKey      | string | The key of the Confluence project                                                                                                                                                                                                            |
| parentPageId  | string | (Optional) If provided, the page will be created as a child page of this parent page, else it will be created under the default Space Overview Page if there is one. If there's no Space Overview, the new page will not have a parent page. |
| parentProduct  | string | (Optional) The parent product name string supported by Embedded Component. This is required to allow unlicensed user access. |
| parentProductContentContainerId  | string | (Optional) The Id of the parent product that have a mapping relationship with Confluence space. For example, for Jira, this could be the project Id. This is required to allow unlicensed user access. |

##### Return Values

| Property name | Type                | Description                                                                |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| contentId     | string or undefined | The page id of newly created page                                          |
| draftShareId  | string or undefined | The draft share id required for users to be able to edit unpublished draft |
| spaceKey      | string or undefined | The key of the Confluence project                                          |

### Experience Tracking

This package provides the capability to forward [experience events](../experience-tracker/src/ExperienceEvent.ts) with the support from package [`@atlassian/experience-tracker`](../experience-tracker/README.md) to the parent product. To listen to those events, parent product can create its own instance of [`ExperienceTracker`](../experience-tracker/src/ExperienceTracker.ts) and then `subscribe` on those events. Without using React props to pass this experience tracker instance, parent product can wrap the view/edit page components with [`ExperienceTrackerContext`](../experience-tracker/src/component/ExperienceTrackerContext.ts) and then pass the instance. See usage below for detailed example.

#### Experience Event Properties
This package provides a list of experiences listed at [this page](https://hello.atlassian.net/wiki/spaces/~142157567/pages/1179828185/EP+experience+names). Experience events trigger the experience tracker to `start`, `succeed`, `abort`, and `fail`. Those events are expected to have `name`, `id`, `action`, and other properties you can find in [`@atlassian/experience-tracker/ExperienceEvent`](../experience-tracker/src/ExperienceEvent.ts).

##### name

`name` serves as a generalization of each user experience. This package provides experiences specific to embedded-confluence and also Confluence. A list of experience names can be found in [this page](https://hello.atlassian.net/wiki/spaces/~142157567/pages/1179828185/EP+experience+names).

##### id

`id` is a unique identifier for a single experience event. Each experience event should only be fired once. `id` is constucted by concatenating spaceKey and contentId with a `-` in the middle.

```jsx
const id = `${spaceKey}-${contentId}`;
```

##### action

`action` is the state of the experience - `taskStart`, `taskFail`, `taskSuccess`, `taskAbort`

#### Usage

```jsx
import { ViewPage } from '@atlassian/embedded-confluence';
import {
  ExperienceTrackerContext,
  ExperienceTracker,
} from '@atlassian/experience-tracker';

const MyViewComponentWithExperienceTracking = ({ contentId, ...props }) => {
  const experienceTracker = new ExperienceTracker();

  // An example of subscribing on experience events
  experienceTracker.subscribe(({ action, name, id, ...event }) => {
    // Do something with the received event:
    switch (action) {
    case taskSuccess:
      if (name === "delete-page" && id === contentId) {
        // Removed contentId from embedding product's database
      }
      break;
    }
  });

  return (
    <ArticleWrapper>
      <ExperienceTrackerContext.Provider value={experienceTracker}>
        <ViewPage
          contentId={contentId}
          // add necessary props here
        />
      <ExperienceTrackerContext.Provider>
    </ArticleWrapper>
  );
};
```

## Development

### Test

Run unit tests:

```

$ bolt test embedded-confluence

```

## Contact

If you have any questions or feature requests related to this package, please contact us and we're happy to help you.

Owner team: [Confluence Better Together](https://hello.atlassian.net/wiki/spaces/CSOL/overview?homepageId=820924076)

We're on slack: `#cc-bettertogether`
