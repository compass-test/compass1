import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site, metaImage } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteName
            siteUrl
            description
          }
        }
        metaImage: file(relativePath: { eq: "meta.png" }) {
          publicURL
        }
      }
    `,
  );
  return { ...site.siteMetadata, metaImage };
};
