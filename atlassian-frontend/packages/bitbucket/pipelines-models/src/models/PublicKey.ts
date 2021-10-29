class PublicKeyError {
  readonly detail?: string = '';
  readonly message?: string = '';
  readonly data?: {
    arguments?: {
      [key: string]: string;
    };
    key?: string;
  } = {};

  constructor(props: Partial<PublicKeyError> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }
}

export class PublicKey {
  readonly key: string = '';
  readonly key_type: string = '';
  readonly md5_fingerprint: string = '';
  readonly sha256_fingerprint: string = '';
  readonly type: string = '';
  readonly error: PublicKeyError | undefined;

  constructor(props: Partial<PublicKey> = {}) {
    Object.assign(this, {
      ...props,
      error: props.error ? new PublicKeyError(props.error) : undefined,
    });
    Object.freeze(this);
  }
}
