# experience-tracker

This package provides tools to track user experiences across the app,
with the goal of measuring their reliability.

### Definitions

An experience has start and stop events. Stop events are sub-divided into success, failure, and abort events.

Experiences must first be started for stop events to be
registered. Once started, that unique instance (also known as an attempt),
can be stopped by a success, failure, or abort event. Once stopped, a corresponding
event is emitted, and any further stop events are ignored
for that attempt.

Reliability is then measured by:

```
successes / (successes + failures)
```

That way, abort events stop the experience, but are not used in reliability calculation _by default_. An "abort" can,
however, be converted to a "failure" in case when timeout was reached, read on about that in further sections.

An experience can be _discrete_ or _compound_:

- **Discrete**: once started, it will succeed or fail without user interaction.
  An example is the "View Confluence Page" or "View Jira Issue" experience.
- **Compound**: requires one or more user interactions to complete the experience.
  An example is the "Create Confluence Page" or "Create Jira Issue" experience, since the user must step through
  a wizard to eventually create the desired entity.

### Implementor notes

While experience tracker tries to simplify the process, it doesn't handle everything, and a couple loose ends
are left out of it's area of responsibilities. Please refer to "Tying things up" section for more information
and make sure you understand it.

### ExperienceTracker

This class provides the core functionality of tracking one or more concurrent experiences.

```javascript
import { ExperienceTracker } from '@atlassian/experience-tracker';

export const experienceTracker = new ExperienceTracker();
```

In a React application, you can utilize `ExperienceTrackerContext` to provide and consume
a single instance of `ExperienceTracker` across your entire application.

```javascript
// app.js
import React, { useState } from 'react';
import {
  ExperienceTracker,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

export const App = () => {
  const experienceTracker = useState(new ExperienceTracker());

  return (
    <ExperienceTrackerContext.Provider value={experienceTracker}>
      <EverythingElse />
    </ExperienceTrackerContext.Provider>
  );
};
```

`ExperienceTracker` has an optional, but highly recommended constructor argument, `options.isNetworkOfflineError`.
It is a function that accepts the `error: Error` parameter and returns whether the given `error` represents a
"user network is offline" error. This `error` object is what will be passed down to `ExperienceTracker` upon stopping
the experience. For the purposes of experience tracking, whenever such an error occurs, it will be treated as "abort"
instead of "failure" when calling `ExperienceTracker.stopOnError` (calling `ExperienceTracker.fail` will still result
in "failure").

#### Start

```javascript
experienceTracker.start({
  name: 'view-page',
  id: contentId,
  attributes: {},
});
```

The `id` should be a unique identifier for a single attempt of an experience,
and is used to de-duplicate successive starts.

#### Succeed

```javascript
experienceTracker.succeed({
  name: 'view-page',
  attributes: {},
});
```

#### Fail

You can fail an explicit experience or fail all current experiences:

```javascript
// Explicit
experienceTracker.fail({
  name: 'view-page',
  error: new Error('Something descriptive'),
  attributes: {},
});
// Inferred, will fail all current experiences
experienceTracker.fail({
  error: new Error('Something descriptive'),
});
```

Explicit failures are preferred. Only use inferred failures in generic
error-handling code where you don't know which experience(s) it could be a part of.

Here `attributes` is an arbitrary object to be included into the event payload.

**NOTE:** `attributes` may be specified for the experience both upon start and upon end
(success, failure or abort) of the experience. Both attributes are being merged for the
given experience, and attributes provided at the end take precedence.

#### Abort

An experience can be aborted for legitimate reasons (e.g. user has navigated away from the page,
or pressed the 'Cancel' button explicitly). For such cases, you can call `abort`:

```javascript
// Explicit
experienceTracker.abort({
  name: 'view-page',
  reason: 'User pressed "Cancel" button',
});
// Inferred, will abort all current experiences
experienceTracker.abort({
  reason: 'window is unloading / app is un-mounting',
});
```

As with failures, explicit aborts are preferred.

When you invoke `.abort`, this signals your intention to mark the experience as "incomplete". However,
the experience could have been "aborted" due to the fact that it took too long, or, in other words,
the experience "timed out". You can read more about timeouts in the "Timeout" section. If you
want to prevent the timeout detection logic, use the `checkForTimeout` attribute:

```javascript
experienceTracker.abort({
  reason: 'Network is offline',
  name: 'view-page',
  // no matter how many time the experience took during network being offline,
  // don't treat that as failure
  checkForTimeout: false,
});
```

#### Consuming events

Consuming experience events is done via `ExperienceTracker.subscribe`:

```javascript
const unsubscribe = experienceTracker.subscribe((event: ExperienceEvent) => {
  MyMonitoringAPI.submitExperienceEvent(`experience:${event.name}`, {
    result: event.action,
  });

  if (
    typeof event.attributes.duration === 'number' &&
    event.action === 'taskSuccess'
  ) {
    MyMonitoringAPI.submitPerformanceMetric(
      `perf:${event.name}`,
      event.attributes.duration,
    );
  }
});
```

### React components

In addition to the `ExperienceTracker`, some React components are provided for convenience.

#### ExperienceStart

```javascript
import { ExperienceStart } from '@atlassian/experience-tracker';

<ExperienceStart name="view-page" id={contentId} />;
```

#### ExperienceSuccess

```javascript
import { ExperienceSuccess } from '@atlassian/experience-tracker';

<ExperienceSuccess name="view-page" attributes={{ commentCount: 42 }} />;
```

#### ExperienceFailure

```javascript
import { ExperienceFailure } from '@atlassian/experience-tracker';

<ExperienceFailure
  name="view-page"
  error={new Error('Something descriptive')}
/>;
```

As with `ExperienceTracker.fail`, the `name` prop is optional for `<ExperienceFailure>`.
However, if it's not provided, the component will first check if one is provided via `<Experience>` (see below).

#### Experience

Used to define the experience to fail for `<ExperienceFailure>` components
rendered lower in the tree that don't have an explicit `name`.

```javascript
<Experience name="view-page">
  <p>Something went wrong while loading this page</p>
  <ExperienceFailure error={new Error('Something descriptive')} />
</Experience>
```

### Timeouts

Failures can be caused by the absence of a response, such as
when an experience is stuck in a loading state.
To detect these failures, we apply a “timeout” to experiences
that can be used in one of two ways:

For _discrete_ experiences, we can apply the timeout to the experience directly, which fails the experience unless it succeeds before the timeout elapses:

```javascript
experienceTracker.start({
  name: 'view-page',
  id: contentId,
  timeout: 10000,
});
```

In such a case, the experience will fail with an instance of `ExperienceTimeoutError`.

For _compound_ experiences, we define discrete sub-experiences that
can have timeouts applied.
A failed sub-experience should fail the main experience, however
the same is not necessarily true for successes.

For example, the "edit page" experience includes two discrete
sub-experiences: loading the editor and publishing the page. We can
apply timeouts to these sub-experiences, but not the main "edit page" experience:

```javascript
experienceTracker.start({
  name: 'edit-page/load',
  id: contentId,
  timeout: 10000,
});
experienceTracker.start({
  name: 'edit-page/publish',
  id: contentId,
  timeout: 10000,
});
```

Imagine the following:

1. A user clicks the pencil icon for page, and navigates to the editor. This starts the
   `edit-page` and the `edit-page/load` experiences
2. The edit page takes a long time to load, eventually exceeding its timeout.
3. The user gives up waiting for the editor to load and refreshes or navigates away from the page

What should happen is that the `edit-page/load` sub-experience is aborted and reported as
a failure due to timeout, and as a result, the `edit-page` compound experience is reported
as a failure due to timeout.

Failing the main experience when any of these sub-experiences fails is
explained in the next section.

### Composing experiences

When starting an experience, we can define how it should behave in
relation to other experiences that start after it, such as the editor loading
and publishing sub-experiences described earlier.

The `collect()` callback is called for each experience event that occurs
subsequently, and is passed an array of events collected so far, as well as the
experience itself.

`stopOn()` can be called on the started experience to stop it with the same action
(success / failure / abort) and attributes as another event.

This is how we can fail the "edit-page" experience if either of its sub-experiences
fail, but only succeed it if its terminating sub-experience (publishing) succeeds:

```javascript
// `hasName` is a helper function for testing an `ExperienceEvent` against various provided names
import { hasName } from '@atlassian/experience-tracker';

experienceTracker.start({
  name: 'edit-page',
  id: contentId,
  collect(events, experience) {
    experience.stopOn(
      events.find(
        event =>
          event.action === 'taskFail' &&
          hasName(event, 'edit-page/load', 'edit-page/publish'),
      ),
    );

    experience.stopOn(
      events.find(
        event =>
          event.action === 'taskSuccess' && hasName(event, 'edit-page/publish'),
      ),
    );
  },
});
```

In order to facilitate such use-cases you can use two of the provided functions: `collectAll` and `collectAny`.

#### `collectAll`

Succeeds the experience if and only if all provided sister experiences succeed. For example:

```javascript
import { collectAll } from '@atlassian/experience-tracker';

experienceTracker.start({
  name: 'view-issue',
  id: issueId,
  collect: collectAll([
    'view-issue/title',
    'view-issue/body',
    'view-issue/custom-fields',
    'view-issue/comments',
  ]),
});
```

In this example, the `'view-issue'` experience is started, and it will succeed as soon as **all** its sister experiences succeed.
If, for example, `'view-issue/title'` experience fails, then `'view-issue'` experience will fail too.
If `'view-issue/custom-fields'` experience gets aborted, then `'view-issue'` experience will be _aborted_ as well.

#### `collectAny`

Stops the experience with the same result as the first completed sister experience. Building on the previous example:

```javascript
import { collectAny } from '@atlassian/experience-tracker';

experienceTracker.start({
  name: 'view-issue',
  id: issueId,
  collect(...args) {
    collectAny([
      'view-issue/restricted-issue',
      'view-issue/restricted-project',
    ])(...args);

    collectAll([
      'view-issue/title',
      'view-issue/body',
      'view-issue/custom-fields',
      'view-issue/comments',
    ])(...args);
  },
});
```

Here, the `collectAll` semantics were left unchanged.
However, when any one of `'view-issue/restricted-issue'` or `'view-issue/restricted-project'` experiences are encountered,
the `'view-issue'` experience will take its result. Thus, had the `'view-issue/restricted-issue'` been successful -- our
`'view-issue'` experience will succeed as well. If, on the other had, `'view-issue/restricted-project'` experience was fired
off and was unsuccessful, `'view-issue'` experience will fail.

### Typescript

Impose restrictions on the values of experience names and experience attributes via Typescript is theoretically possible,
however it drastically and irreversibly increases the complexity of types, and thus potential for errors. Hence, for
now, all experience names and attributes have generic types of `string` and `object` respectively.

### Tying things up

The next couple of sections try to summarize what an implementor of experience-tracker integration is
left to do for properly tying up the loose ends.

#### Aborting on page close

Whenever the user loses the page, this action should be treated as an "abort". For that purpose,
implementors are encouraged to add a window `"unload"` event listener that will explicitly invoke
`ExperienceTracker.abort`:

```javascript
// app.js
import React, { useState, useEffect } from 'react';
import {
  ExperienceTracker,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

export const App = () => {
  const experienceTracker = useState(new ExperienceTracker());
  useEffect(() => {
    const unloadListener = () => {
      experienceTracker.abort({ reason: 'Window unloading' });
    };
    window.addEventListener('unload', unloadListener);

    return () => {
      window.removeEventListener('unload', unloadListener);
    };
  }, [experienceTracker]);

  return (
    <ExperienceTrackerContext.Provider value={experienceTracker}>
      <EverythingElse />
    </ExperienceTrackerContext.Provider>
  );
};
```

#### Integration with ErrorBoundary

Whenever a React subtree is unmounted, there's a solid chance that experiences from that sub-tree have failed.
By default, `ExperienceTracker` has no built-in handling of such errors, and you need to provide such an
integration yourself.

The recommended approach for that is to utilize the `ErrorBoundary` mechanics like this:

```javascript
import { Experience } from '@atlassian/experience-tracker';

<Experience name="view-page">
  <ErrorBoundary>
    <ViewPage />
  </ErrorBoundary>
</Experience>;
```

For that to work as expected, your `ErrorBoundary` will need to render an `ExperienceFailure` component:

```javascript
// app/ErrorBoundary.js

render() {
  const { error } = this.state;

  return !error
    ? this.props.children
    : (
      <>
        <YourErrorRenderer />
        <ExperienceFailure error={error} />
      </>
    );
}
```

The `ExperienceFailure` component will rely on `<Experience>` components
higher up in the tree to help fail the correct experience.
