const getTitleAndDescription = (mdxNode, workspaceInfo) => {
  if (mdxNode && mdxNode.frontmatter.title) {
    let { title, description } = mdxNode.frontmatter;
    return {
      title,
      description,
    };
  } else {
    let { title, description } = workspaceInfo;
    return { title, description };
  }
};

export default getTitleAndDescription;
