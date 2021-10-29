import React from 'react';
import Toggle from '@atlaskit/toggle';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button/standard-button';
import {
  ProductEnvProvider,
  withAnalytics,
} from './mock-product/support/productEnv';

const HostAnalyticsLog: React.FC<{}> = withAnalytics((props) => {
  const formatASI = (actionSubjectId?: string) =>
    actionSubjectId ? `[${actionSubjectId}]` : '';
  const formatAttrs = (attributes: any) =>
    attributes
      ? JSON.stringify(attributes).replace(
          /"([^"]*?)":/g,
          (whole, propName) => `${propName}:`,
        )
      : '';
  return (
    <section>
      {props.analyticEventsLog.length > 0 ? (
        <table style={{ marginTop: 0 }}>
          <tbody style={{ borderBottom: 0 }}>
            {props.analyticEventsLog
              .slice()
              .reverse()
              .map((event, index, events) => {
                const eventValues =
                  'name' in event
                    ? [
                        `(${event.type.substring(0, 2)})`,
                        formatASI(event.name),
                        formatAttrs(event.attributes),
                      ]
                    : [
                        `(${event.type.substring(0, 2)})`,
                        event.actionSubject,
                        event.action,
                        formatASI(event.actionSubjectId),
                        formatAttrs(event.attributes),
                      ];
                return (
                  // We're reversing items to display them newest-first,
                  // so we need to make sure the last item has key=0,
                  // the next-to-last is 1 and so on, to preserve the keys
                  // as we add more items.
                  <tr key={events.length - 1 - index}>
                    {eventValues.map((cell) => (
                      <td>{cell}</td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <p>
          <i>(No events logged yet)</i>
        </p>
      )}
    </section>
  );
});

export const Field: React.FC<{ label?: boolean }> = ({ children, label }) => (
  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
    {children}
  </div>
);

export const LabelText = (props: any) => (
  <label {...props} style={{ marginRight: '10px', minWidth: 250 }} />
);

const SectionHeading = ({ children, ...props }: any) => (
  <h3 style={{ marginTop: '20px' }} {...props}>
    {children}
  </h3>
);

interface API {
  counter: number;
  shouldThrow: boolean;
}

interface Props {
  children: ((api: API) => React.ReactNode) | React.ReactNode;
  additionalControls?: React.ReactNode;
  flagKey: string;
}

class ErrorBoundary extends React.Component<{}> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      // @ts-ignore "error is possibly null" -- no it isn't
      return <pre>Component threw an uncaught error: {error.message}</pre>;
    }
    return this.props.children;
  }
}

const flagList = [
  {
    key: 'product.invite-experiment',
    defaultValue: 'control',
    variants: ['control', 'experiment', 'not-enrolled'],
  },
  {
    key: 'product.enhanced-feature-gates',
    defaultValue: 'experiment',
    variants: ['control', 'experiment', 'not-enrolled'],
  },
  {
    key: 'product.slack-integration',
    defaultValue: 'slack-and-invite-urls',
    variants: [
      'not-enrolled',
      'control',
      'invite-urls-only',
      'slack-only',
      'slack-and-invite-urls',
    ],
  },
  {
    key: 'feature.boolean',
    defaultValue: false,
    variants: [true, false],
  },
];

const mapToSelectOption = (value: string | number | boolean) => ({
  value: value.toString(),
  label: value.toString(),
});

const ExampleHostSandbox: React.FC<Props> = ({
  children,
  additionalControls,
  flagKey,
}) => {
  const [refreshCount, setRefreshCount] = React.useState(0);
  const [shouldThrow, setShouldThrow] = React.useState(false);
  const [localeOption, setLocaleOption] = React.useState({
    label: 'en-AU',
    value: 'en-AU',
  });
  const [flags, setFlags] = React.useState<{ [key: string]: string | boolean }>(
    [...flagList].reduce(
      (acc, flagObj) => ({
        ...acc,
        [flagObj.key]: flagObj.defaultValue,
      }),
      {},
    ),
  );

  const onFlagValueChange = React.useCallback(
    (value: string) => {
      setFlags((state) => ({
        ...state,
        [flagKey]: value,
      }));
    },
    [flagKey],
  );

  const toggleFlag = React.useCallback(() => {
    setFlags((state) => ({
      ...state,
      [flagKey]: !state[flagKey],
    }));
  }, [flagKey]);

  const toggleShouldThrow = React.useCallback(() => {
    setShouldThrow(!shouldThrow);
  }, [shouldThrow]);

  const refresh = React.useCallback(() => {
    setRefreshCount(refreshCount + 1);
  }, [refreshCount]);

  const changeLanguage = React.useCallback((newLocale) => {
    setLocaleOption(newLocale);
  }, []);

  const flagValue = flags[flagKey];

  return (
    <ProductEnvProvider flags={flags} locale={localeOption.value}>
      <div style={{ margin: 20 }}>
        <div>
          <ErrorBoundary>
            {typeof children === 'function'
              ? (children as any)({ counter: refreshCount, shouldThrow })
              : children}
          </ErrorBoundary>
        </div>
        <section
          style={{
            paddingTop: '20px',
            marginTop: '20px',
          }}
        >
          <SectionHeading>Host environment</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Field>
              <LabelText>Flag key:</LabelText>
              <span>{flagKey}</span>
            </Field>
            <Field>
              <LabelText>Flag value:</LabelText>
              {typeof flagValue === 'boolean' ? (
                <Toggle isChecked={flagValue} onChange={toggleFlag} />
              ) : (
                <div style={{ width: 300 }}>
                  <Select
                    value={mapToSelectOption(flagValue)}
                    options={(flagList.find((x) => x.key === flagKey)!
                      .variants as Array<string | boolean>).map(
                      mapToSelectOption,
                    )}
                    onChange={(selected) => {
                      if (selected && 'value' in selected) {
                        onFlagValueChange(selected.value);
                      }
                    }}
                  />
                </div>
              )}
            </Field>
            <Field>
              <LabelText>Locale:</LabelText>
              <div style={{ width: '100px' }}>
                <Select
                  value={localeOption}
                  options={[
                    { label: 'en-AU', value: 'en-AU' },
                    { label: 'en-US', value: 'en-US' },
                    { label: 'pl-PL', value: 'pl-PL' },
                  ]}
                  placeholder="Choose locale"
                  onChange={changeLanguage}
                />
              </div>
            </Field>
            <Field>
              <LabelText>Throw:</LabelText>
              <Toggle isChecked={shouldThrow} onChange={toggleShouldThrow} />
            </Field>
            <Field>
              <LabelText>
                Manual refresh count: <code>{refreshCount}</code>
              </LabelText>
              <Button onClick={refresh}>Refresh now</Button>
            </Field>
            {additionalControls}
          </div>
        </section>
        <section>
          <SectionHeading>Analytics events log</SectionHeading>
          <HostAnalyticsLog />
        </section>
      </div>
    </ProductEnvProvider>
  );
};

export default ExampleHostSandbox;

export const PropsPreview = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <section
      style={{
        position: 'absolute',
        top: '1px',
        right: '1px',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 10px',
        zIndex: 1,
        ...(open
          ? {
              background: 'rgba(95%, 95%, 95%, 0.8)',
              border: '1px solid #888',
              top: 0,
              right: 0,
            }
          : {}),
      }}
    >
      <label style={{ textAlign: 'right' }}>
        <Toggle isChecked={open} onChange={toggle} /> Show props
      </label>
      {open && (
        <pre style={{ fontSize: '0.75em' }}>
          {JSON.stringify(props, null, 2)}
        </pre>
      )}
    </section>
  );
};

export const Wrapper: React.FC<{ propsPreview: any }> = ({
  propsPreview,
  children,
}) => (
  <div
    style={{
      position: 'relative',
      borderBottom: '2px solid #eee',
      paddingBottom: 20,
    }}
  >
    <nav style={{ background: 'rgb(250, 251, 252)', padding: '10px 10px 6px' }}>
      {children}
    </nav>
    <PropsPreview {...propsPreview} />
  </div>
);
