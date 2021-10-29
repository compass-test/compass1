const {
  componentTransformer,
  filterRestrictedContent,
  guidelineTransformer,
} = require('../algolia');

const stubDataA = [
  {
    parent: {
      absolutePath:
        '/Users/clee/Thinkmill/projects/atlassian-frontend/packages/design-system/avatar/constellation/avatar-item.mdx',
      name: 'avatar-item',
    },
    frontmatter: {
      description: 'An avatar item is a wrapper',
    },
  },
  {
    parent: {
      absolutePath:
        '/Users/clee/Thinkmill/projects/atlassian-frontend/packages/design-system/avatar/constellation/avatar-group/design.mdx',
      name: 'design',
    },
    frontmatter: {
      description: null,
    },
  },
  {
    parent: {
      absolutePath:
        '/Users/clee/Thinkmill/projects/atlassian-frontend/packages/design-system/avatar/constellation/index/design.mdx',
      name: 'design',
    },
    frontmatter: {
      description: null,
    },
  },
  {
    parent: {
      absolutePath:
        '/Users/clee/Thinkmill/projects/atlassian-frontend/packages/design-system/avatar/constellation/index/examples.mdx',
      name: 'examples',
    },
    frontmatter: {
      description: null,
    },
  },
  {
    parent: {
      absolutePath:
        '/Users/clee/Thinkmill/projects/atlassian-frontend/packages/design-system/avatar/constellation/index/props.mdx',
      name: 'props',
    },
    frontmatter: {
      description: null,
    },
    excerpt: 'SHOULD NOT BE IN HERE',
  },
];

const stubDataB = [
  {
    id: 2,
    description: 'this content is private',
    private: true,
  },
  {
    id: 1,
    description: 'this content is not private',
    private: false,
  },
  {
    id: 3,
    description: 'this content is absolutely private',
    private: true,
  },
];

const allWorkspaceInfoNodes = [
  {
    slug: 'avatar',
    description: 'description of avatar',
  },
  {
    slug: 'avatar-group',
    description: 'description of avatar-group',
  },
];

const nestedNode = {
  id: 1,
  title: 'Color palette',
  description: {
    description: 'Our color palette is a selection of colors',
  },
  slug: 'color-palette',
  contentfulparent: {
    slug: 'color',
  },
};

const topLevelNode = {
  id: 2,
  title: 'Grid',
  description: {
    description: 'The grid is the foundation for positioning elements onscreen',
  },
  slug: 'grid',
  contentfulparent: null,
};

describe('transformers', () => {
  describe('componentTransformer', () => {
    it('should extrapolate and return a description, parent, path, pkgname and title from each node', () => {
      expect(
        componentTransformer({
          data: {
            allMdx: {
              nodes: stubDataA,
            },
            allWorkspaceInfo: {
              nodes: allWorkspaceInfoNodes,
            },
          },
        }),
      ).toMatchSnapshot();
    });
    describe('avatar', () => {
      it('should contain description in package.json', () => {
        const avatarNode = stubDataA[2];
        const descriptionInPackageJson = allWorkspaceInfoNodes.filter(
          (node) => node.slug === 'avatar',
        )[0].description;
        const records = componentTransformer({
          data: {
            allMdx: {
              nodes: [avatarNode],
            },
            allWorkspaceInfo: {
              nodes: allWorkspaceInfoNodes,
            },
          },
        });
        expect(records[0].description).toEqual(descriptionInPackageJson);
      });
    });
    describe('avatar-item', () => {
      it('should contain description in mdx file', () => {
        const avatarItemNode = stubDataA[0];
        const records = componentTransformer({
          data: {
            allMdx: {
              nodes: [avatarItemNode],
            },
            allWorkspaceInfo: {
              nodes: allWorkspaceInfoNodes,
            },
          },
        });
        expect(records[0].description).toEqual(
          avatarItemNode.frontmatter.description,
        );
      });
    });
  });
  describe('filterRestrictedContent()', () => {
    it('should filter out any nodes with a private field set to true', () => {
      expect(filterRestrictedContent(stubDataB)).toMatchSnapshot();
    });
  });
  describe('guidelineTransformers', () => {
    it('it should contain a nested level path in the record', () => {
      const output = guidelineTransformer(
        {
          allContentfulGuideline: {
            nodes: [nestedNode],
          },
        },
        'Foundations',
      );
      const expectedOutput = [
        {
          description: 'Our color palette is a selection of colors',
          id: 1,
          path: '/foundations/color/color-palette',
          title: 'Color palette',
        },
      ];
      expect(output).toEqual(expectedOutput);
    });
    it('it should contain a top level path in the record', () => {
      const output = guidelineTransformer(
        {
          allContentfulGuideline: {
            nodes: [topLevelNode],
          },
        },
        'Foundations',
      );
      const expectedOutput = [
        {
          description:
            'The grid is the foundation for positioning elements onscreen',
          id: 2,
          path: '/foundations/grid',
          title: 'Grid',
        },
      ];
      expect(output).toEqual(expectedOutput);
    });
  });
});
