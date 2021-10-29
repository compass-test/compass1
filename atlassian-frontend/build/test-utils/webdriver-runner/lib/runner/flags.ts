export type Flags = {
  retry: number;
  testDir: string;
  gracefulExit: boolean;
  return: boolean;
  port: number;
  host: string;
  changed: string;
  testEnv: string;
  watch: boolean;
  debug?: boolean;
  updateSnapshot?: boolean;
  listTests?: boolean;
  json?: boolean;
  help?: boolean;
};

export function getDefaultFlags(): Flags {
  const {
    ATLASKIT_DEV_HOST,
    ATLASKIT_DEV_PORT,
    HOST,
    PORT,
    CHANGED_PACKAGES,
    TEST_ENV,
    WATCH,
  } = process.env;
  return {
    retry: 1,
    testDir: process.cwd(),
    gracefulExit: false,
    return: false,
    port: +ATLASKIT_DEV_PORT! || +PORT! || 9000,
    host: ATLASKIT_DEV_HOST || HOST || '0.0.0.0',
    changed: CHANGED_PACKAGES ?? '',
    testEnv: TEST_ENV ?? 'local',
    watch: WATCH === 'true',
  };
}
