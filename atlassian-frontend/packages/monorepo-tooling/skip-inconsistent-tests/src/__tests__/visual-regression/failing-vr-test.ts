import { VR_TRANSFORMER_PATH } from '../../constants';

/*
  This test is temporary to aid in validating the skip-inconsistent-tests pipeline.
  It will be removed ahead of launch.
*/
describe('VR failing test', () => {
  it('should fail', async () => {
    console.log(VR_TRANSFORMER_PATH);
    expect(true).toBe(true);
  });
});
