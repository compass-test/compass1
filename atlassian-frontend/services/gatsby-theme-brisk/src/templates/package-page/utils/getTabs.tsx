import React from 'react';
import ContentRenderer from '../../../content/content-renderer';

export const getTabLinks = (mdxNodes, tabPath, hasCodeTab?) => {
  const tabLinks = mdxNodes.map((node) => {
    return {
      to: `${tabPath}/${node.parent.name}`,
      name: node.parent.name,
    };
  });

  // add in code tab as second tab
  if (hasCodeTab) {
    tabLinks.splice(1, 0, { to: `${tabPath}/code`, name: 'Code' });
  }

  return tabLinks;
};

export const getTabContents = (mdxNodes, CodeTabComponent?) => {
  const tabContents = {};
  mdxNodes.forEach((node) => {
    tabContents[node.parent.name] = (
      <ContentRenderer id={node.id} body={node.body} />
    );
  });

  if (CodeTabComponent) {
    tabContents['code'] = CodeTabComponent;
  }

  return tabContents;
};

export const getCurrentTab = (path, mdxNodes) => {
  const pathArray = path.split('/');

  const name = pathArray[pathArray.length - 1];
  const mdx = mdxNodes.find((node) => node.parent.name === name) || mdxNodes[0];

  return { name, mdx };
};
