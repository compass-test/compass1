/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { Link } from 'gatsby';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import ReactMarkdown from 'react-markdown';
import SectionLink from '@atlaskit/gatsby-theme-brisk/src/components/section-link';
import { Code } from '@atlaskit/code';
import EmptyState from '@atlaskit/empty-state';
import ErrorBoundary from '@atlaskit/gatsby-theme-brisk/src/components/error-boundary';
import DoDont from '@atlaskit/gatsby-theme-brisk/src/components/do-dont';
import { ContentRenderingError } from './content-error';
import resolveLocalisation from '../utils/resolveLocalisation';
import { buildUrl } from '../utils/buildUrl';
import AssetCard from './content-types/asset-card';
import ColorCard from './content-types/color-card';

const slugify = require('github-slugger').slug;

// For public pages, we get data through gatsby-source-contentful / GraphQL.
// As such, the data & the shape of the data is different than the data returned
// by pinging Contentful's API directly. This leads to us needing to process and
// render the data in two different ways; even though there is lots of crossover
// with protected-content-renderer.tsx.

// For public content, we use renderRichText() from gatsby-source-contentful.
const options = {
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    // An entry-hyperlink is when one Contentful entry links to another. We handle
    // this explicitly so that we can build the right URL and use an SPA router Link
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const { slug, category, contentfulparent } = node.data.target;
      const parentSlug = resolveLocalisation(contentfulparent)?.slug;
      const link = buildUrl([category, parentSlug, slug]);
      return <Link to={link}>{children}</Link>;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      // remove empty paragraphs
      if (!children.every((item) => item === '')) {
        return <p style={{ whiteSpace: 'pre-wrap' }}>{children}</p>;
      }
      return children;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <SectionLink level={2} id={slugify(node.content[0].value)}>
          {children}
        </SectionLink>
      );
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return (
        <SectionLink level={3} id={slugify(node.content[0].value)}>
          {children}
        </SectionLink>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const target = resolveLocalisation(node.data.target);
      if (!target) {
        return <EmptyState header="Something went wrong" />;
      }
      return (
        <img
          css={{ maxWidth: '100%' }}
          alt={target.description || ''}
          src={target.file.url}
        />
      );
    },
    // Embedded entries are basically the whole reason we use Contentful's Rich
    // Text features. This is how we create custom content types like DosAndDonts
    // or ColorCards and then embed them inside posts in the CMS.
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const contentType = node.data.target?.__typename;
      switch (contentType) {
        case 'ContentfulDosAndDonts':
          const { text, type, fullWidth, image } = node.data.target;
          return (
            <DoDont
              fullWidth={fullWidth}
              type={type === 'Do' ? 'do' : 'dont'}
              image={image && { alt: image.description, url: image.file.url }}
            >
              {resolveLocalisation(text)}
            </DoDont>
          );
        case 'ContentfulMarkdown':
          // ContentfulMarkdown entries can be used to inject Markdown into
          // a Rich Text entry. This primarily exists to support tables.
          const markdown =
            node.data.target?.childContentfulMarkdownTextTextNode?.text;
          return <ReactMarkdown source={markdown}></ReactMarkdown>;
        case 'ContentfulAssetCard': {
          const { asset, title, thumbnail } = resolveLocalisation(
            node.data.target,
          );
          const assetFields = resolveLocalisation(asset);
          const assetFileFields = resolveLocalisation(assetFields.file);
          const thumbnailFields = resolveLocalisation(thumbnail);
          return (
            <AssetCard
              title={resolveLocalisation(title)}
              link={assetFileFields.url}
              fileSize={assetFileFields.details.size}
              thumbnail={
                thumbnailFields && resolveLocalisation(thumbnailFields.file).url
              }
            />
          );
        }
        case 'ContentfulAssetsContainer': {
          // An AssetsContainer is basically just a wrapper around multiple AssetsCards
          // to group things in the CMS. An AssetsContainer contains rich text itself,
          // and we could pass the data into another renderRichText() call, but in this
          // case it is simpler to just map over the references as we know they'll be
          // AssetCards.
          const references = node.data.target?.contentfulchildren?.references;
          return (
            <>
              {references.map((node) => (
                <AssetCard
                  key={node?.asset?.contentful_id}
                  title={node?.asset?.title}
                  link={node?.asset?.file?.url}
                  fileSize={node?.asset?.file?.details.size}
                  thumbnail={node?.thumbnail?.file?.url}
                />
              ))}
            </>
          );
        }
        case 'ContentfulColorCard': {
          const target = node.data.target;
          const color = resolveLocalisation(target?.hexCode);
          const name = resolveLocalisation(target?.name);
          return <ColorCard hexColor={color} name={name} />;
        }
        default: {
          return children;
        }
      }
    },
  },
};

const ContentfulRenderer = ({ richText }) => {
  return <Fragment>{renderRichText(richText, options)}</Fragment>;
};

const ContentRenderer = ({ children, richText }: ContentRendererProps) => {
  return (
    <ErrorBoundary fallback={<ContentRenderingError />}>
      <ContentfulRenderer richText={richText} />
      {children}
    </ErrorBoundary>
  );
};

interface ContentRendererProps {
  richText: any;
  children?: React.ReactNode;
}

export default ContentRenderer;
