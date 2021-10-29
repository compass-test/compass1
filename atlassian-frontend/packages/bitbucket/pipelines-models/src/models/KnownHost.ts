import { PublicKey } from './PublicKey';

class KnownHostError {
  readonly detail?: string = '';
  readonly message?: string = '';
  readonly data?: {
    arguments?: {
      [key: string]: string;
    };
    key?: string;
  } = {};

  constructor(props: Partial<KnownHostError> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class KnownHost {
  readonly uuid: string = '';
  readonly hostname: string = '';
  readonly public_key: PublicKey = new PublicKey();
  readonly isSyncing: boolean = false;
  readonly error: KnownHostError | undefined;

  constructor(props: Partial<KnownHost> = {}) {
    Object.assign(this, {
      ...props,
      public_key: new PublicKey(props.public_key),
      error: props.error ? new KnownHostError(props.error) : undefined,
    });
    Object.freeze(this);
  }
}
