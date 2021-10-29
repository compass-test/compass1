/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
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

// For Protected pages, we ping the Contentful API for data directly. As such,
// the data & the shape of the data is different than the data returned through
// gatsby-source-contentful / GraphQL. This leads to us needing to process and
// render the data in two different ways; even though there is lots of crossover
// with content-renderer.tsx.

// For protected content, we need to use Contentful's documentToReactComponents()
// directly.

const getContentType = (contentType) => {
  if (contentType && contentType.sys) {
    return contentType.sys.id;
  }
  return null;
};

const options = (images) => ({
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      const { slug, category, parent } = node.data.target.fields;
      const parentSlug = resolveLocalisation(parent)?.fields.slug;
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
      const file = resolveLocalisation(node.data.target.fields.file);
      if (!file) {
        return <EmptyState header="Something went wrong" />;
      }
      return (
        <img
          css={{ maxWidth: '100%' }}
          alt={file.description || ''}
          src={file.url}
        />
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const contentType = getContentType(node.data.target.sys.contentType);
      switch (contentType) {
        case 'githubFlavouredMarkdown':
          const markdown = node.data.target?.fields?.text;
          return <ReactMarkdown source={markdown}></ReactMarkdown>;
        case 'assetCard': {
          const { asset, title, thumbnail } = resolveLocalisation(
            node.data.target.fields,
          );
          const assetFields = resolveLocalisation(asset);
          const assetFileFields = resolveLocalisation(assetFields.fields.file);
          const thumbnailFields = resolveLocalisation(thumbnail);

          return (
            <AssetCard
              title={resolveLocalisation(title)}
              link={assetFileFields.url}
              thumbnail={
                thumbnailFields &&
                resolveLocalisation(thumbnailFields.fields.file).url
              }
              fileSize={assetFileFields.details.size}
            />
          );
        }
        case 'assetsContainer': {
          const fields = node.data.target.fields;
          const children = resolveLocalisation(fields.children);
          return documentToReactComponents(children, options(images));
        }
        case 'dosAndDonts': {
          const fields = node.data.target.fields;
          const fullWidth = !!resolveLocalisation(fields.fullWidth);
          const type =
            resolveLocalisation(fields.type) === 'Do' ? 'do' : 'dont';
          const image = resolveLocalisation(fields.image);
          const text = resolveLocalisation(fields.text);
          let description, file;
          if (image) {
            description = resolveLocalisation(image.fields.description);
            file = resolveLocalisation(image.fields.file);
          }
          return (
            <DoDont
              fullWidth={fullWidth}
              type={type}
              image={image && { alt: description, url: file.url }}
            >
              {text}
            </DoDont>
          );
        }
        case 'colorCard': {
          const fields = node.data.target.fields;
          const color = resolveLocalisation(fields.hexCode);
          const name = resolveLocalisation(fields.name);
          return <ColorCard hexColor={color} name={name} />;
        }
        default: {
          return children;
        }
      }
    },
  },
});

const ContentfulRenderer = ({ json, images }) => {
  return (
    <Fragment>{documentToReactComponents(json, options(images))}</Fragment>
  );
};

const ProtectedContentRenderer = ({
  children,
  images = [],
  json,
}: ContentRendererProps) => {
  return (
    <ErrorBoundary fallback={<ContentRenderingError />}>
      <ContentfulRenderer images={images} json={json} />
      {children}
    </ErrorBoundary>
  );
};

interface ContentRendererProps {
  json: any;
  images?: any[];
  children?: React.ReactNode;
}

export default ProtectedContentRenderer;
