import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
} from 'react';
import { SpaParentClient } from '../../core/deprecated_core';
import { SpaParentClientOptions } from '../../lib/types';

// import { storiesOf } from '@storybook/react';
import { HostEvents } from '../../lib/messages';
import { SimpleAppWithAnalytics } from '../helpers/spa-examples';

const src = '/iframe-src/index.html';
const appName = 'testApp';

const SpaParentClientExample = ({
  appName,
  src,
  withFullscreen,
  withLoader,
  withBlanket,
}: SpaParentClientOptions): ReactElement => {
  let client: SpaParentClient;
  const iframeContainerElement = useRef(null);
  useEffect((): (() => void) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    client = new SpaParentClient({
      appName,
      src,
      withFullscreen,
      withLoader,
      withBlanket,
    });
    client.init({
      containerElement: iframeContainerElement.current,
    });
    return (): void => {
      client.cleanup();
    };
  }, [src]);
  const styles: CSSProperties = {
    height: '500px',
    width: '500px',
    background: 'teal',
  };
  return (
    <>
      <button>Button in parent</button>
      <div ref={iframeContainerElement} style={styles}></div>
    </>
  );
};

type SpaParentClientWithEventHandlerProps = {
  src: string;
  route: string;
  onClose: () => void;
  onSomeAction: (a: any) => void;
  onError: (a: any) => void;
};
const SpaIntegration = (
  props: SpaParentClientWithEventHandlerProps,
): ReactElement => {
  const { onClose, onSomeAction, onError, route, src } = props;
  const iframeContainerElement = useRef<HTMLDivElement>(null);

  const url = new URL(src, window.location.origin);
  url.searchParams.set('route', route);

  const client = useSpaHostClient(url.toString(), [src]);

  useEffect(() => {
    client.init({
      containerElement: iframeContainerElement.current,
    });

    client.on(HostEvents.Error, (e) => {
      onError(e);
    });

    client.on(HostEvents.Message, (e: any) => {
      switch (e.type) {
        case 'SOME_ACTION':
          onSomeAction(e);
          break;

        case 'CLOSE':
          onClose();
          break;
      }
    });
  }, [client, onClose, onError, onSomeAction]);

  useEffect(() => {
    client.postMessage({
      type: 'ROUTE',
      route,
    });
  }, [client, route]);

  const styles = {
    height: '500px',
    width: '95%',
    border: '2px solid red',
  };
  return <div ref={iframeContainerElement} style={styles} />;
};

function useSpaHostClient(src: string | URL, deps: any[] = [src]) {
  function createClient(src: string) {
    // eslint-disable-next-line no-console
    console.log(`new\tSpaParentClient(${src})`);
    return new SpaParentClient({
      appName,
      src: src,
      // withLoader: true
    });
  }

  const client = useMemo(() => createClient(String(src)), [src]);

  useEffect(
    () => () => {
      // eslint-disable-next-line no-console
      console.log(`destroy\tSpaParentClient(${src})`);
      return client.cleanup();
    },
    [client, src],
  );
  return client;
}

const vanillaSrc = '/iframe-src/post-message.html';
const storySrc = '/iframe.html?id=spaparentclient-core--emit-analytics-event';

const EventHandlingExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [route, setRoute] = useState<string | undefined>();
  const [src, setSrc] = useState(vanillaSrc);

  return (
    <Fragment>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle frame</button> |
      <button onClick={() => setSrc(vanillaSrc)}>Vanilla App</button> |
      <button onClick={() => setSrc(storySrc)}>Story App</button> |
      <button onClick={() => setRoute('jira')}>Navigate to Jira</button>
      {isError && <p style={{ background: 'salmon', margin: 5 }}>Error!</p>}
      {isOpen && route && (
        <SpaIntegration
          src={src}
          route={route}
          onClose={() => setIsOpen(false)}
          onSomeAction={(e) => setRoute(e.route)}
          onError={(e) => {
            setIsError(true);
            setIsOpen(false);
          }}
        />
      )}
    </Fragment>
  );
};

export const None = (): ReactElement => (
  <SpaParentClientExample appName={appName} src={src} />
);
export const Fullscreen = (): ReactElement => (
  <SpaParentClientExample
    appName={appName}
    src={src}
    withFullscreen
    withBlanket
  />
);

export const Loader = (): ReactElement => (
  <SpaParentClientExample appName={appName} src={src} withLoader />
);

export const Both = (): ReactElement => (
  <SpaParentClientExample
    appName={appName}
    src={src}
    withLoader
    withFullscreen
  />
);

export const EventHandling = (): ReactElement => <EventHandlingExample />;

export const Analytics = (): ReactElement => <SimpleAppWithAnalytics />;

// storiesOf('SpaParentClient core (deprecated)', module)
//   .add(
//     'SpaParentClient core example without fullscreen or loader',
//     (): ReactElement => <SpaParentClientExample appName={appName} src={src} />,
//   )
//   .add(
//     'SpaParentClient core example with fullscreen',
//     (): ReactElement => (
//       <SpaParentClientExample
//         appName={appName}
//         src={src}
//         withFullscreen
//         withBlanket
//       />
//     ),
//   )
//   .add(
//     'SpaParentClient core example with fullscreen and loader',
//     (): ReactElement => (
//       <SpaParentClientExample
//         appName={appName}
//         src={src}
//         withFullscreen
//         withLoader
//       />
//     ),
//   )
//   .add(
//     'SpaParentClient core example with loader',
//     (): ReactElement => (
//       <SpaParentClientExample appName={appName} src={src} withLoader />
//     ),
//   )
//   .add(
//     'SpaParentClient core events',
//     (): ReactElement => <EventHandlingExample />,
//   )
//   .add('Emit analytics event', () => <SimpleAppWithAnalytics />);
