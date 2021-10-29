import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

const getImage = async (example: string) => {
  const url = getExampleUrl(
    'people-and-teams',
    'team-work',
    example,
    global.__BASEURL__,
  );
  const { page } = global;
  await loadPage(page, url);
  await page.waitForSelector(`[data-testid="team-work-${example}"]`);
  return page.screenshot();
};

describe('Snapshot Test', () => {
  it('renders TeamWork component', async () => {
    const image = await getImage('basic');
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders TeamWork empty state', async () => {
    const image = await getImage('empty');
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders TeamWork error state', async () => {
    const image = await getImage('error');
    expect(image).toMatchProdImageSnapshot();
  });
});

describe('EmptyState Snapshot Test', () => {
  it('renders TeamWork component', async () => {
    const image = await getImage('empty-state-component');
    expect(image).toMatchProdImageSnapshot();
  });
});
