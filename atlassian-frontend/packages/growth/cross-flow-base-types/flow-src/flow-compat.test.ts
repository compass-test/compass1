import child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

describe('flow types', () => {
  it('should be compatible with the typescript assertions', async () => {
    expect.hasAssertions();
    let stdout;
    let stderr;
    try {
      ({ stdout, stderr } = await exec('./flow-compat-test.sh', {
        cwd: __dirname,
      }));
    } catch (e) {
      ({ stdout, stderr } = e);
    }
    const passed = stdout.includes('All good!');
    if (!passed) {
      expect({ stdout, stderr }).toBeFalsy();
    }
    expect(passed).toBeTruthy();
  });
});
