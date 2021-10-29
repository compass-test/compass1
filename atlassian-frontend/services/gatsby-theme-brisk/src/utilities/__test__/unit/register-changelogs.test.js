const fs = require('fs-extra');
const path = require('path');
const { divideChangelog } = require('../../register-changelogs');

describe('divideChangelog()', () => {
  let dividedChangelog;
  beforeEach(async () => {
    const mdFilePath = path.join(__dirname, './CHANGELOG-test.md');
    const rawChangelog = await fs.readFile(mdFilePath, 'utf-8');
    dividedChangelog = divideChangelog(rawChangelog);
  });

  it('should match the snapshot', async () => {
    expect(dividedChangelog).toMatchSnapshot();
  });

  it('should reserve the text under a H2 heading', async () => {
    expect(dividedChangelog[0].md).toContain('Some text under a H2 heading');
  });
});
