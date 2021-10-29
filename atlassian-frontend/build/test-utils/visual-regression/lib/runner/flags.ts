export type Flags = {
  retry: number;
  repeat: number;
  testDir: string;
  gracefulExit: boolean;
  return: boolean;
  port: number;
  host: string;
  changed: string;
  watch?: boolean;
  debug?: boolean;
  updateSnapshot?: boolean;
  listTests?: boolean;
  json?: boolean;
  help?: boolean;
};

export function getDefaultFlags(): Flags {
  const {
    ATLASKIT_DEV_PORT,
    ATLASKIT_DEV_HOST,
    HOST,
    PORT,
    CHANGED_PACKAGES,
    WATCH,
  } = process.env;
  return {
    retry: 1,
    repeat: 0,
    testDir: process.cwd(),
    gracefulExit: false,
    return: false,
    port: +ATLASKIT_DEV_PORT! || +PORT! || 9000,
    host: ATLASKIT_DEV_HOST || HOST || '0.0.0.0',
    changed: CHANGED_PACKAGES ?? '',
    watch: WATCH === 'true',
  };
}
