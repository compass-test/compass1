import React from 'react';
import Layout, { MainContent } from '../components/layout';

const Page = (props) => {
  const {
    pageContext: { frontmatter: { title = '', description = '' } = {} } = {},
  } = props;
  return (
    <Layout title={title} description={description}>
      <MainContent>{props.children}</MainContent>
    </Layout>
  );
};

export default Page;
