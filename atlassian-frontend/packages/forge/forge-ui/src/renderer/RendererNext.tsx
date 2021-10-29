import React, { Suspense, FunctionComponent } from 'react';
import {
  ForgeDoc,
  EffectsDispatcher as LegacyDispatch,
  Dispatch,
} from '@atlassian/forge-ui-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import memoizeOne from 'memoize-one';
import { UnknownComponentErrorBoundary } from '../error-boundary';
import { PortalProvider } from '../context/portal';
import { WidthProvider } from '../context';
import { Loader } from '../web-runtime/loader';
import { UnknownComponentError } from '../error-boundary/UnknownComponentErrorBoundary';
import { Props } from '../components';
import { BadgeFn } from '../components/badge';
import { Button } from '../components/button';
import { ButtonSetFn } from '../components/button/ButtonSet';
import { CheckboxGroupFn } from '../components/checkbox';
import { CodeFn } from '../components/code';
import { Columns, Column } from '../components/column';
import { DateLozengeFn } from '../components/dateLozenge';
import { DatePickerFn } from '../components/datepicker';
import { ErrorPanelRenderFn } from '../components/errorPanel/errorPanel';
import { Form } from '../components/form';
import { FormConditionFn } from '../components/formCondition';
import { ImageFn } from '../components/image';
import { InlineDialog } from '../components/inlineDialog';
import { ModalDialog } from '../components/modalDialog';
import { RadioGroupFn } from '../components/radio';
import { RangeFn } from '../components/range';
import { SectionMessageFn } from '../components/sectionMessage';
import { SelectFn } from '../components/select';
import { StatusLozengeFn } from '../components/statusLozenge';
import { TabsFn } from '../components/tabs';
import { TableFn } from '../components/table';
import { TagFn, TagGroupFn } from '../components/tag';
import { ThreeLOPromptRenderFn } from '../components/threeLOPrompt/threeLOPrompt';
import { TextFn } from '../components/text';
import { TextAreaFn } from '../components/textarea';
import { TextFieldFn } from '../components/textfield';
import { ToggleFn } from '../components/toggle';
import { TooltipFn } from '../components/tooltip';
import { ViewFn } from '../components/view';
import { HeadingFn } from '../components/heading';
import {
  EmFn,
  LinkFn,
  StrikeFn,
  StringFn,
  StrongFn,
} from '../components/markup';

export type RenderFn = (args: {
  forgeDoc: ForgeDoc;
  dispatch: Dispatch;
  render: (forgeDoc: ForgeDoc) => React.ReactNode;
}) => React.ReactNode;

// downgrades the new dispatch function to be compatible with the old dispatch shape
// this is required for the components that use the old dispatch
export const downgradeDispatch = memoizeOne(
  (dispatch: Dispatch): LegacyDispatch => (legacyEffects) => {
    return Promise.all(
      (Array.isArray(legacyEffects) ? legacyEffects : [legacyEffects]).map(
        (legacyEffect) => {
          switch (legacyEffect.type) {
            case 'initialize': {
              return dispatch({ type: 'render', extensionData: {} });
            }
            case 'event': {
              return dispatch({
                type: 'event',
                handler: legacyEffect.handler,
                args: legacyEffect.args,
                extensionData: {},
              });
            }
            default:
              throw Error(`Cannot dispatch "${legacyEffect.type}" effect`);
          }
        },
      ),
    ).then(() => {});
  },
);

// upgrades the component function to the new component map API
// this is temporary while we upgrade the component functions to new API
export const upgradeComponent = (
  Comp: React.FunctionComponent<Props>,
): RenderFn => ({ forgeDoc, render, dispatch }) => {
  const { children, key, props, type } = forgeDoc;
  return (
    <Comp
      type={type}
      key={key}
      props={props}
      dispatch={downgradeDispatch(dispatch)}
      children={children}
      Components={{} /* no components actually use this component map */}
      render={(props) => render(props.aux!)}
      renderChildren={(props) => props.children.map(render)}
    />
  );
};

export type ComponentMap = {
  [name: string]: RenderFn;
};

export interface RendererProps {
  /* ForgeDoc to be rendered */
  forgeDoc?: ForgeDoc;
  /* Map of component types to render functions */
  components?: (defaults: ComponentMap) => ComponentMap;
  /* Function used by components to dispatch effects */
  dispatch: Dispatch;
  /* Error message to show the user. Set when an unexpected client-side error happens. */
  error?: string;
  /* Whether a dispatched effect is pending. */
  loading?: boolean;
  /* Replace the default spinner with a custom loading component. */
  loadingComponent?: React.ReactNode;
}

export const defaultComponents: ComponentMap = {
  Badge: upgradeComponent(BadgeFn),
  Button: (args) => <Button {...args} key={args.forgeDoc.key} />,
  ButtonSet: upgradeComponent(ButtonSetFn),
  CheckboxGroup: upgradeComponent(CheckboxGroupFn),
  Code: upgradeComponent(CodeFn),
  Column: (args) => <Column {...args} key={args.forgeDoc.key} />,
  Columns: (args) => <Columns {...args} key={args.forgeDoc.key} />,
  DateLozenge: upgradeComponent(DateLozengeFn),
  DatePicker: upgradeComponent(DatePickerFn),
  Em: upgradeComponent(EmFn),
  ErrorPanel: ErrorPanelRenderFn,
  Form: (args) => <Form {...args} key={args.forgeDoc.key} />,
  FormCondition: upgradeComponent(FormConditionFn),
  Heading: upgradeComponent(HeadingFn),
  Image: upgradeComponent(ImageFn),
  InlineDialog: (args) => <InlineDialog {...args} key={args.forgeDoc.key} />,
  Link: upgradeComponent(LinkFn),
  ModalDialog: (args) => <ModalDialog {...args} key={args.forgeDoc.key} />,
  RadioGroup: upgradeComponent(RadioGroupFn),
  Range: upgradeComponent(RangeFn),
  SectionMessage: upgradeComponent(SectionMessageFn),
  Select: upgradeComponent(SelectFn),
  StatusLozenge: upgradeComponent(StatusLozengeFn),
  Strike: upgradeComponent(StrikeFn),
  String: upgradeComponent(StringFn),
  Strong: upgradeComponent(StrongFn),
  Table: upgradeComponent(TableFn),
  Tabs: upgradeComponent(TabsFn),
  Tag: upgradeComponent(TagFn),
  TagGroup: upgradeComponent(TagGroupFn),
  Text: upgradeComponent(TextFn),
  TextArea: upgradeComponent(TextAreaFn),
  TextField: upgradeComponent(TextFieldFn),
  ThreeLOPrompt: ThreeLOPromptRenderFn,
  Toggle: upgradeComponent(ToggleFn),
  Tooltip: upgradeComponent(TooltipFn),
  View: upgradeComponent(ViewFn),
};

// This component is so that the suspense call doesn't reload the spinner, causing a janky spinner epxerience
const NeverLoads = React.lazy(() => {
  return new Promise(() => {});
});

const getComponent = (componentMap: ComponentMap, componentType: string) => {
  if (componentType === 'User' || componentType === 'Avatar') {
    return componentMap['User'] || componentMap['Avatar'];
  }
  if (componentType === 'UserGroup' || componentType === 'AvatarStack') {
    return componentMap['UserGroup'] || componentMap['AvatarStack'];
  }
  return componentMap[componentType];
};

const RendererNext = React.memo((({
  forgeDoc,
  loading = false,
  error,
  components,
  dispatch,
}: RendererProps) => {
  const componentMap = components
    ? components(defaultComponents)
    : defaultComponents;
  const render = (forgeDoc: ForgeDoc) => {
    const renderFn = getComponent(componentMap, forgeDoc.type);
    if (!renderFn) {
      throw new UnknownComponentError(
        `Error rendering app - encountered unknown component ${forgeDoc.type}.`,
        forgeDoc.type,
      );
    }
    return renderFn({ forgeDoc, dispatch, render });
  };
  // true while fetching initial forgeDoc
  if (loading && !forgeDoc) {
    return <NeverLoads />;
  }
  if (error) {
    return componentMap.ErrorPanel({
      dispatch,
      forgeDoc: {
        type: 'ErrorPanel',
        props: {
          error: {
            name: 'Error',
            message: 'Something Went Wrong',
            errorMessage: error,
          },
        },
        children: [],
      },
      render,
    });
  }
  return forgeDoc ? render(forgeDoc) : null;
}) as FunctionComponent<RendererProps>);

// This extra component exists so errors from the "render" function are caught in the an error boundary
// Also the error boundary requires a suspense fallback
export default (props: RendererProps) => (
  <Suspense
    fallback={
      props.loadingComponent !== undefined ? props.loadingComponent : <Loader />
    }
  >
    <UnknownComponentErrorBoundary dispatch={props.dispatch}>
      <WidthProvider>
        <PortalProvider>
          <RendererNext {...props} />
        </PortalProvider>
      </WidthProvider>
    </UnknownComponentErrorBoundary>
  </Suspense>
);
