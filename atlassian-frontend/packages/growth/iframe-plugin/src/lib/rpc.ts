// Remote Procedure Call (RPC) methods defined for use with cross-flow-plugins
import { MessageTransport } from '../transport/types';

export type RPCMethodName = string;
type RPCMethodArguments = any[];
export type RPCMethodImplementaion = (
  ...args: RPCMethodArguments
) => Promise<any>;

export type RPCMethod<
  N extends RPCMethodName,
  I extends RPCMethodImplementaion
> = [N, I];

export interface RPCClientOptions {
  timeout: number;
}

// utility types
type RPCMethodNameType<R extends RPCMethod<any, any>> = R extends RPCMethod<
  infer N,
  any
>
  ? N
  : never;
type RPCMethodImplementationType<
  R extends RPCMethod<any, any>
> = R extends RPCMethod<any, infer I> ? I : never;
type RPCMethodReturnType<R extends RPCMethod<any, any>> = ReturnType<
  RPCMethodImplementationType<R>
>;
type RPCMethodArgsType<R extends RPCMethod<any, any>> = Parameters<
  RPCMethodImplementationType<R>
>;

interface RPCInvokeEvent extends MessageEvent {
  data: { uuid: string; name: RPCMethodName; args: RPCMethodArguments };
}
interface RPCResultEvent<R> extends MessageEvent {
  data: { uuid: string; result: R };
}

interface RPCErrorEvent extends MessageEvent {
  data: { uuid: string; error: any };
}

const DEFAULT_CLIENT_TIMEOUT = 5000;

export class RPCServer {
  private methods: Map<RPCMethodName, RPCMethodImplementaion>;
  private client: MessageTransport;

  constructor(
    client: MessageTransport,
    methods: RPCMethod<RPCMethodName, RPCMethodImplementaion>[],
  ) {
    this.methods = new Map(methods);
    this.client = client;
  }

  start() {
    this.client.on('__RPC_INVOKE', (RPCEvent: RPCInvokeEvent) => {
      const { uuid, name, args } = RPCEvent.data;
      this.onMethodCall(uuid, name, args);
    });

    this.client.send('__RPC_METHODS', {
      methods: Array.from(this.methods.keys()),
    });
  }

  onMethodCall(uuid: string, name: RPCMethodName, args: RPCMethodArguments) {
    const impl = this.methods.get(name);
    if (impl) {
      try {
        impl(...args)
          .then((result) => {
            this.client.send('__RPC_RESULT', {
              data: {
                uuid: uuid,
                result: result,
              },
            });
          })
          .catch(() => {
            this.client.send('__RPC_ERROR', {
              data: {
                uuid: uuid,
                error: 'METHOD_PROMISE_REJECTED',
              },
            });
          });
      } catch (error) {
        this.client.send('__RPC_ERROR', {
          data: {
            uuid: uuid,
            error: 'METHOD_THREW_ERROR',
          },
        });
      }
    } else {
      this.client.send('__RPC_ERROR', {
        data: {
          uuid: uuid,
          error: 'NOT_IMPLEMENTED',
        },
      });
    }
  }
}

export class RPCClient {
  private client: MessageTransport;
  private options: RPCClientOptions;

  constructor(client: MessageTransport, options?: RPCClientOptions) {
    this.client = client;

    const defaultOptions = { timeout: DEFAULT_CLIENT_TIMEOUT };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  // Taken from https://gist.github.com/jed/982883 to avoid bringing in a uuid library
  generateUuid() {
    return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, () =>
      (0 | (Math.random() * 16)).toString(16),
    );
  }

  invoke<R extends RPCMethod<RPCMethodName, RPCMethodImplementaion>>(
    name: RPCMethodNameType<R>,
    args: RPCMethodArgsType<R>,
  ): RPCMethodReturnType<R> {
    const uuid = this.generateUuid();

    this.client.send('__RPC_INVOKE', {
      data: {
        uuid: uuid,
        name,
        args,
      },
    });

    return this.subscribeToResult(uuid) as RPCMethodReturnType<R>;
  }

  private subscribeToResult<R>(uuid: string): Promise<R> {
    return new Promise((resolve, reject) => {
      const onResult = (event: RPCResultEvent<R>) => {
        if (event.data.uuid !== uuid) {
          // Ignore result cause it's not for us
          return;
        }

        unsubscribeFromResult();

        resolve(event.data.result);
      };

      const onError = (event: RPCErrorEvent) => {
        if (event.data.uuid !== uuid) {
          // Ignore error cause it's not for us
          return;
        }

        unsubscribeFromResult();

        reject(new Error(event.data.error));
      };

      const onTimedOut = () => {
        unsubscribeFromResult();
        reject(new Error('METHOD_TIMED_OUT'));
      };

      const timer = setTimeout(onTimedOut, this.options.timeout);

      const unsubscribeFromResult = () => {
        clearTimeout(timer);
        this.client.off('__RPC_RESULT', onResult);
        this.client.off('__RPC_ERROR', onError);
      };

      this.client.on('__RPC_RESULT', onResult);
      this.client.on('__RPC_ERROR', onError);
    });
  }
}
