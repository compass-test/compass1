const path = require('path');
const { processPackage } = require('../../create-package-pages.js');

const mockedGqlResultWithoutError = {
  data: {
    allWorkspaceInfo: {
      nodes: [
        {
          name: '@atlaskit/tooltip',
          definition: JSON.stringify({}),
        },
      ],
    },
  },
};

const gatsbyApis = {
  graphql: jest.fn(() => Promise.resolve(mockedGqlResultWithoutError)),
};

describe('processPackages()', () => {
  it('should error out if an index file and index directory exist in the same node', async () => {
    const info = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/shouldThrow',
      ),
      name: '@atlaskit/tooltip',
    };
    await expect(processPackage(info, gatsbyApis)).rejects.toThrow();
  });

  it('should error out if there is an error already thrown in initial parsing of props', async () => {
    const mockedGqlResultWithError = {
      data: {
        allWorkspaceInfo: {
          nodes: [
            {
              name: '@atlaskit/tooltip',
              definition: JSON.stringify({
                error: {
                  message: 'some error',
                  stack: 'error stack',
                },
              }),
            },
          ],
        },
      },
    };
    const gqlApis = {
      graphql: jest.fn(() => Promise.resolve(mockedGqlResultWithError)),
    };
    const info = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/shouldThrowPropsParsingError',
      ),
      name: '@atlaskit/tooltip',
    };
    await expect(processPackage(info, gqlApis)).rejects.toThrow('error stack');
  });

  it('should differentiate between an index directory and an index file', async () => {
    const infoA = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/indexFile',
      ),
      name: '@atlaskit/tooltip',
    };
    const resultA = await processPackage(infoA, gatsbyApis);
    expect(resultA.index.isfolder).toBeFalsy();

    const infoB = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/indexFolder',
      ),
      name: '@atlaskit/tooltip',
    };
    const resultB = await processPackage(infoB, gatsbyApis);
    expect(resultB.index.isFolder).toBe(true);
  });

  it('should return a list of subpages if mdx files other than index.mdx exist in root', async () => {
    const info = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/shouldReturnSubpages',
      ),
    };
    const result = await processPackage(info, gatsbyApis);
    const expected = ['subPageA.mdx', 'subPageB.mdx'];
    expect(result.subPages).toEqual(expect.arrayContaining(expected));
  });

  it('should return a list of subfolders if subdirectories other than index/ exist', async () => {
    const info = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/shouldReturnSubfolders',
      ),
    };
    const result = await processPackage(info, gatsbyApis);
    const expected = ['subFolderA', 'subFolderB'];
    expect(result.subFolders).toEqual(expect.arrayContaining(expected));
  });

  it('should not return subfolders with no mdx files', async () => {
    const info = {
      docsPath: path.resolve(
        __dirname,
        '../../__fixtures__/processPackages/shouldReturnSubfolders',
      ),
    };
    const result = await processPackage(info, gatsbyApis);
    const notExpected = ['subFolderC'];
    expect(result.subFolders).not.toEqual(expect.arrayContaining(notExpected));
  });
});
