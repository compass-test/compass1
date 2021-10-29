type Block = {
  type?: string;
  [opts: string]: any;
};

type Blocks = Array<Block | undefined>;

export type Overrides = {
  username?: string;
  channel?: string;
};

export type MessageOpts = Overrides & {
  message: string | Blocks;
};

export type LookupByEmailOpts = {
  email: string;
};

type Error = {
  ok: false;
  error: string;
};

export type UserResponse =
  | Error
  | {
      ok: true;
      user: {
        id: string;
      };
    };

export type SendMessageResponse =
  | Error
  | {
      ok: true;
      channel: string;
      ts: string;
      message: any;
    };
