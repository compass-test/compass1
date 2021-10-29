import React from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../utilities/use-site-metadata';

export type Props = {
  title?: string;
  description?: string;
  tabName?: string;
  categorySlug?: string;
  guidelineCategory?: string;
  parentPageTitle?: string;
  subpageTabName?: string;
};

const MetaTags = ({
  title,
  parentPageTitle,
  description,
  tabName,
  categorySlug,
  guidelineCategory,
  subpageTabName,
}: Props) => {
  const {
    siteName,
    siteUrl,
    description: siteDefaultDescription,
    metaImage,
  } = useSiteMetadata();

  let pageTitle;

  // guideline page for COMPONENT
  // e.g. Button - Examples - Components - Atlassian Design System
  if (guidelineCategory === 'Components' && !categorySlug && !subpageTabName) {
    pageTitle = `${title} - ${tabName} - Components - ${siteName}`;
  } else if (!categorySlug && subpageTabName) {
    // guideline page for SUB-COMPONENT
    // e.g. Button Group - Examples - Components - Atlassian Design System
    pageTitle = `${title} - ${subpageTabName} - Components - ${siteName}`;
  } else if (guidelineCategory && parentPageTitle) {
    // guideline page for |Brand|Foundations|Content|Patterns|Resources| that IS a subpage
    // e.g. Messaging guidelines - Error messages - Content - Atlassian Design System
    pageTitle = `${parentPageTitle} - ${title} - ${guidelineCategory} - ${siteName}`;
  } else if (categorySlug) {
    // overview page
    pageTitle = `Overview - ${categorySlug} - ${siteName}`;
  } else if (guidelineCategory && !subpageTabName) {
    // guideline page for |Brand|Foundations|Content|Patterns|Resources| that is NOT a subpage
    // e.g. Color palettes - Resources - Atlassian Design System
    pageTitle = `${title} - ${guidelineCategory} - ${siteName}`;
  } else if (title) {
    // pages with no category
    // e.g. License - Atlassian Design System
    pageTitle = `${title} - ${siteName}`;
  } else {
    // home page
    pageTitle = `${siteName}`;
  }

  const pageDescription = description
    ? `${description}`
    : `${siteDefaultDescription}`;
  const metaimageSrc =
    metaImage && metaImage.publicURL ? siteUrl + metaImage.publicURL : '';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <html lang="en" />
      <meta name="description" content={pageDescription} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:image" content={metaimageSrc} />
      <meta property="og:description" content={pageDescription} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        name="google-site-verification"
        content="FU9ZkoqotLLvSayuWsZITiRvaGcc53ZZM-GVy43LMY0"
      />
    </Helmet>
  );
};

export default MetaTags;
