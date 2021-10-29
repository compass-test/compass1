class KeyPairError {
  readonly detail?: string = '';
  readonly message?: string = '';
  readonly data?: {
    arguments?: {
      [key: string]: string;
    };
    key?: string;
  } = {};

  constructor(props: Partial<KeyPairError> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class KeyPair {
  readonly private_key: string = '';
  readonly public_key: string = '';
  readonly error: KeyPairError | undefined;

  constructor(props: Partial<KeyPair> = {}) {
    Object.assign(this, {
      ...props,
      error: props.error ? new KeyPairError(props.error) : undefined,
    });
    Object.freeze(this);
  }
}
