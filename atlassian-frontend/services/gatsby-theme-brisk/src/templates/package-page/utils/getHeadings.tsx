const slugify = require('github-slugger').slug;

type Heading = {
  id: string;
  value: string;
  depth: number;
};

const getHeadingsObject = (mdxNode: {
  headings: Array<Heading>;
  [other: string]: any;
}) => {
  if (mdxNode && mdxNode.headings) {
    return mdxNode.headings
      .filter(
        // only get h2s and h3s
        (heading) => heading.depth === 2 || heading.depth === 3,
      )
      .map((heading) => {
        // make sure they have ids
        if (!heading.id) {
          heading.id = slugify(heading.value);
          return heading;
        }
        return heading;
      });
  }

  return [];
};

export default getHeadingsObject;
