import { md, code } from '@atlaskit/docs';

export default md`
# How to use the framework for your experiment

## Creating an experiment

In this example, we are going create an experiment in Confluence that will:

- show a button depending on the value of a feature flag called 'product.flag.experiment'
- send a feature exposed event for our experiment
- send a UI event when the button is clicked
- exclude users in our experiment if they are not an admin

Let's say that the 'product.flag.experiment' flag returns one of ['control', 'experiment', 'not-enrolled'],
and we can determine if a user is an admin via an \`isAdmin\` prop to our component.

### 1. Identify which plugins you need

${code`
  import {
    usePluginResolver,
    usePluginAutoExposureEvent,
  } from '@atlassian/experimental-react-experiment-framework-2/plugins';
  import {
    usePluginAnalytics,
    usePluginMultivariateFeatureFlag,
  } from '@confluence/experiment-framework';
`}

There are two types of plugins; abstract plugins and portable plugins.
Abstract plugins are plugins that depend on a functionality implemented by a product.
Portable plugins provide functionality that can be implemented once and run in all products.

For our experiment, since feature flags retrieval can be different in each product.
We use the usePluginMultivariateFeatureFlag() plugin implemented in confluence by the @confluence/experiment-framework package.

This is the same case for adding analytics support to our experiment, we can use usePluginAnalytics() from the same package.

To send a feature exposed event for our experiment we can use the usePluginAutoExposureEvent() plugin.
Since this is a portable plugin we can import it directly from @atlassian/experimental-react-experiment-framework-2/plugins.

We will also use usePluginResolver() to allow us to change our cohort based on a criteria, in this case
if the user is an admin or not.

There are a lot more plugins avaiable, more information about them can be found here:

- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)

### 2. Pass plugins you need to the useExperiment hook

${code`
  import {
    useExperiment,
  } from '@atlassian/experimental-react-experiment-framework-2';
  import {
    markNotEnrolled,
  } from '@atlassian/experimental-react-experiment-framework-2/helpers'

  const MyComponentWithExperiment = props => {
    const myExperiment = useExperiment(
      usePluginAnalytics(),
      usePluginMultivariateFeatureFlag(
        'product.invite-experiment',
        ['experiment', 'control', 'not-enrolled'],
        'not-enrolled',
      ),
      usePluginResolver(pipeline => {
        if (!props.isAdmin) {
          return markNotEnrolled('notAnAdmin', pipeline)
        }
      }),
      usePluginAutoExposureEvent(),
    );

    return <ControlComponent />
  },
`}

  For the second step we pass our plugins to our useExperiment() hook.

  usePluginAnalytics() adds an .analytics to our experiment pipeline to send events on our onclick handler,
  as well as add analytics functionality to our usePluginAutoExposureEvent().

  usePluginMultivariateFeatureFlag() accepts our flag key as a parameter and adds
  a .cohort value to our scope, as well as a .featureFlag object which contains the values of our flag.

  We use usePluginResolver() to change the value of our cohort if props.isAdmin is false.

  Here we used the helper function markNotEnrolled() inside the useResolver function to set an ineligibility reason.

  usePluginAutoExposureEvent() triggers an operational event when our experiment is exposed.

  Notes:

  - The framework has support for types and will show type errors if a plugin depends on another plugin. Try commenting out usePluginAnalytics() on the useExperiment() and usePluginAutoExposureEvent() should complain for missing attributes on the expeirment pipeline.
  - It is also possible to instead return { ineligible: 'not-an-admin' } for our usePluginResolver(), and it will result to the same experiment scope object.

### 3. Use experiment scope object where necessary

${code`
  const MyComponentWithExperiment = ({ isAdmin }) => {
    const myExperiment = useExperiment(
      ...
    );

    const onClick = () => {
      myExperiment.analytics.sendUIEvent({
        actionSubjectId: 'myButton',
        actionSubject: 'button',
        action: 'clicked',
      })
    };

    return (
      <>
        {myExperiment.cohort === 'experiment' && <Button onClick={onClick} />}
        <OriginalComponent />
      </>
    );
  }
`}

Here we use our myExperiment scope object inside an event handler and on our
return statement to conditionally render the button based on the value of the .cohort.

### Our Completed code

${code`
import {
  useExperiment,
} from '@atlassian/experimental-react-experiment-framework-2';
import {
  usePluginResolver,
  usePluginAutoExposureEvent,
} from '@atlassian/experimental-react-experiment-framework-2/plugins';
import {
  markNotEnrolled,
} from '@atlassian/experimental-react-experiment-framework-2/helpers'
import {
  usePluginAnalytics,
  usePluginMultivariateFeatureFlag,
} from '@confluence/experiment-framework';

const MyComponentWithExperiment = props => {
  const myExperiment = useExperiment(
    usePluginAnalytics(),
    usePluginMultivariateFeatureFlag(
      'product.invite-experiment',
      ['experiment', 'control', 'not-enrolled'],
      'not-enrolled',
    ),
    usePluginResolver(pipeline => {
      if (!props.isAdmin) {
        return markNotEnrolled('notAnAdmin', pipeline)
      }
    }),
    usePluginAutoExposureEvent(),
  );

  const onClick = () => {
    myExperiment.analytics.sendUIEvent({
      actionSubjectId: 'myButton',
      actionSubject: 'button',
      action: 'clicked',
    })
  };

  return (
    <>
      {myExperiment.cohort === 'experiment' && <Button onClick={onClick} />}
      <OriginalComponent />
    </>
  );
}
`}

## More information
- [Introduction](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/intro)
- [How to use the framework for your experiment](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/how-to-use)
- [The useExperiment hook and Pipeline](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/useExperiment-hook)
- [What are plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/plugins)
- [How to write plugins](/packages/growth-experimental/experimental-react-experiment-framework-2/docs/writing-plugins)

`;
