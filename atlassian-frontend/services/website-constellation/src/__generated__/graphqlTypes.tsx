export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};











export type BooleanQueryOperatorInput = {
  eq?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type ChangelogEntry = Node & {
  __typename?: 'ChangelogEntry';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  packageName?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>;
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>;
};

export type ChangelogEntryConnection = {
  __typename?: 'ChangelogEntryConnection';
  totalCount: Scalars['Int'];
  edges: Array<ChangelogEntryEdge>;
  nodes: Array<ChangelogEntry>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ChangelogEntryGroupConnection>;
};


export type ChangelogEntryConnectionDistinctArgs = {
  field: ChangelogEntryFieldsEnum;
};


export type ChangelogEntryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ChangelogEntryFieldsEnum;
};

export type ChangelogEntryEdge = {
  __typename?: 'ChangelogEntryEdge';
  next?: Maybe<ChangelogEntry>;
  node: ChangelogEntry;
  previous?: Maybe<ChangelogEntry>;
};

export enum ChangelogEntryFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  packageName = 'packageName',
  version = 'version',
  childrenMdx = 'childrenMdx',
  childrenMdx___rawBody = 'childrenMdx___rawBody',
  childrenMdx___fileAbsolutePath = 'childrenMdx___fileAbsolutePath',
  childrenMdx___frontmatter___title = 'childrenMdx___frontmatter___title',
  childrenMdx___frontmatter___order = 'childrenMdx___frontmatter___order',
  childrenMdx___frontmatter___description = 'childrenMdx___frontmatter___description',
  childrenMdx___slug = 'childrenMdx___slug',
  childrenMdx___body = 'childrenMdx___body',
  childrenMdx___excerpt = 'childrenMdx___excerpt',
  childrenMdx___headings = 'childrenMdx___headings',
  childrenMdx___headings___value = 'childrenMdx___headings___value',
  childrenMdx___headings___depth = 'childrenMdx___headings___depth',
  childrenMdx___html = 'childrenMdx___html',
  childrenMdx___mdxAST = 'childrenMdx___mdxAST',
  childrenMdx___tableOfContents = 'childrenMdx___tableOfContents',
  childrenMdx___timeToRead = 'childrenMdx___timeToRead',
  childrenMdx___wordCount___paragraphs = 'childrenMdx___wordCount___paragraphs',
  childrenMdx___wordCount___sentences = 'childrenMdx___wordCount___sentences',
  childrenMdx___wordCount___words = 'childrenMdx___wordCount___words',
  childrenMdx___id = 'childrenMdx___id',
  childrenMdx___parent___id = 'childrenMdx___parent___id',
  childrenMdx___parent___parent___id = 'childrenMdx___parent___parent___id',
  childrenMdx___parent___parent___children = 'childrenMdx___parent___parent___children',
  childrenMdx___parent___children = 'childrenMdx___parent___children',
  childrenMdx___parent___children___id = 'childrenMdx___parent___children___id',
  childrenMdx___parent___children___children = 'childrenMdx___parent___children___children',
  childrenMdx___parent___internal___content = 'childrenMdx___parent___internal___content',
  childrenMdx___parent___internal___contentDigest = 'childrenMdx___parent___internal___contentDigest',
  childrenMdx___parent___internal___description = 'childrenMdx___parent___internal___description',
  childrenMdx___parent___internal___fieldOwners = 'childrenMdx___parent___internal___fieldOwners',
  childrenMdx___parent___internal___ignoreType = 'childrenMdx___parent___internal___ignoreType',
  childrenMdx___parent___internal___mediaType = 'childrenMdx___parent___internal___mediaType',
  childrenMdx___parent___internal___owner = 'childrenMdx___parent___internal___owner',
  childrenMdx___parent___internal___type = 'childrenMdx___parent___internal___type',
  childrenMdx___children = 'childrenMdx___children',
  childrenMdx___children___id = 'childrenMdx___children___id',
  childrenMdx___children___parent___id = 'childrenMdx___children___parent___id',
  childrenMdx___children___parent___children = 'childrenMdx___children___parent___children',
  childrenMdx___children___children = 'childrenMdx___children___children',
  childrenMdx___children___children___id = 'childrenMdx___children___children___id',
  childrenMdx___children___children___children = 'childrenMdx___children___children___children',
  childrenMdx___children___internal___content = 'childrenMdx___children___internal___content',
  childrenMdx___children___internal___contentDigest = 'childrenMdx___children___internal___contentDigest',
  childrenMdx___children___internal___description = 'childrenMdx___children___internal___description',
  childrenMdx___children___internal___fieldOwners = 'childrenMdx___children___internal___fieldOwners',
  childrenMdx___children___internal___ignoreType = 'childrenMdx___children___internal___ignoreType',
  childrenMdx___children___internal___mediaType = 'childrenMdx___children___internal___mediaType',
  childrenMdx___children___internal___owner = 'childrenMdx___children___internal___owner',
  childrenMdx___children___internal___type = 'childrenMdx___children___internal___type',
  childrenMdx___internal___content = 'childrenMdx___internal___content',
  childrenMdx___internal___contentDigest = 'childrenMdx___internal___contentDigest',
  childrenMdx___internal___description = 'childrenMdx___internal___description',
  childrenMdx___internal___fieldOwners = 'childrenMdx___internal___fieldOwners',
  childrenMdx___internal___ignoreType = 'childrenMdx___internal___ignoreType',
  childrenMdx___internal___mediaType = 'childrenMdx___internal___mediaType',
  childrenMdx___internal___owner = 'childrenMdx___internal___owner',
  childrenMdx___internal___type = 'childrenMdx___internal___type',
  childMdx___rawBody = 'childMdx___rawBody',
  childMdx___fileAbsolutePath = 'childMdx___fileAbsolutePath',
  childMdx___frontmatter___title = 'childMdx___frontmatter___title',
  childMdx___frontmatter___order = 'childMdx___frontmatter___order',
  childMdx___frontmatter___description = 'childMdx___frontmatter___description',
  childMdx___slug = 'childMdx___slug',
  childMdx___body = 'childMdx___body',
  childMdx___excerpt = 'childMdx___excerpt',
  childMdx___headings = 'childMdx___headings',
  childMdx___headings___value = 'childMdx___headings___value',
  childMdx___headings___depth = 'childMdx___headings___depth',
  childMdx___html = 'childMdx___html',
  childMdx___mdxAST = 'childMdx___mdxAST',
  childMdx___tableOfContents = 'childMdx___tableOfContents',
  childMdx___timeToRead = 'childMdx___timeToRead',
  childMdx___wordCount___paragraphs = 'childMdx___wordCount___paragraphs',
  childMdx___wordCount___sentences = 'childMdx___wordCount___sentences',
  childMdx___wordCount___words = 'childMdx___wordCount___words',
  childMdx___id = 'childMdx___id',
  childMdx___parent___id = 'childMdx___parent___id',
  childMdx___parent___parent___id = 'childMdx___parent___parent___id',
  childMdx___parent___parent___children = 'childMdx___parent___parent___children',
  childMdx___parent___children = 'childMdx___parent___children',
  childMdx___parent___children___id = 'childMdx___parent___children___id',
  childMdx___parent___children___children = 'childMdx___parent___children___children',
  childMdx___parent___internal___content = 'childMdx___parent___internal___content',
  childMdx___parent___internal___contentDigest = 'childMdx___parent___internal___contentDigest',
  childMdx___parent___internal___description = 'childMdx___parent___internal___description',
  childMdx___parent___internal___fieldOwners = 'childMdx___parent___internal___fieldOwners',
  childMdx___parent___internal___ignoreType = 'childMdx___parent___internal___ignoreType',
  childMdx___parent___internal___mediaType = 'childMdx___parent___internal___mediaType',
  childMdx___parent___internal___owner = 'childMdx___parent___internal___owner',
  childMdx___parent___internal___type = 'childMdx___parent___internal___type',
  childMdx___children = 'childMdx___children',
  childMdx___children___id = 'childMdx___children___id',
  childMdx___children___parent___id = 'childMdx___children___parent___id',
  childMdx___children___parent___children = 'childMdx___children___parent___children',
  childMdx___children___children = 'childMdx___children___children',
  childMdx___children___children___id = 'childMdx___children___children___id',
  childMdx___children___children___children = 'childMdx___children___children___children',
  childMdx___children___internal___content = 'childMdx___children___internal___content',
  childMdx___children___internal___contentDigest = 'childMdx___children___internal___contentDigest',
  childMdx___children___internal___description = 'childMdx___children___internal___description',
  childMdx___children___internal___fieldOwners = 'childMdx___children___internal___fieldOwners',
  childMdx___children___internal___ignoreType = 'childMdx___children___internal___ignoreType',
  childMdx___children___internal___mediaType = 'childMdx___children___internal___mediaType',
  childMdx___children___internal___owner = 'childMdx___children___internal___owner',
  childMdx___children___internal___type = 'childMdx___children___internal___type',
  childMdx___internal___content = 'childMdx___internal___content',
  childMdx___internal___contentDigest = 'childMdx___internal___contentDigest',
  childMdx___internal___description = 'childMdx___internal___description',
  childMdx___internal___fieldOwners = 'childMdx___internal___fieldOwners',
  childMdx___internal___ignoreType = 'childMdx___internal___ignoreType',
  childMdx___internal___mediaType = 'childMdx___internal___mediaType',
  childMdx___internal___owner = 'childMdx___internal___owner',
  childMdx___internal___type = 'childMdx___internal___type'
}

export type ChangelogEntryFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  packageName?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};

export type ChangelogEntryGroupConnection = {
  __typename?: 'ChangelogEntryGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ChangelogEntryEdge>;
  nodes: Array<ChangelogEntry>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ChangelogEntrySortInput = {
  fields?: Maybe<Array<Maybe<ChangelogEntryFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulAsset = ContentfulReference & Node & {
  __typename?: 'ContentfulAsset';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  file?: Maybe<ContentfulAssetFile>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  node_locale?: Maybe<Scalars['String']>;
  sys?: Maybe<ContentfulAssetSys>;
  fixed?: Maybe<ContentfulFixed>;
  /** @deprecated Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link */
  resolutions?: Maybe<ContentfulResolutions>;
  fluid?: Maybe<ContentfulFluid>;
  /** @deprecated Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link */
  sizes?: Maybe<ContentfulSizes>;
  gatsbyImageData: Scalars['JSON'];
  resize?: Maybe<ContentfulResize>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulAssetCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulAssetUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulAssetFixedArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};


export type ContentfulAssetResolutionsArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};


export type ContentfulAssetFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
};


export type ContentfulAssetSizesArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
};


export type ContentfulAssetGatsbyImageDataArgs = {
  layout?: Maybe<GatsbyImageLayout>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  placeholder?: Maybe<GatsbyImagePlaceholder>;
  formats?: Maybe<Array<Maybe<ContentfulImageFormat>>>;
  outputPixelDensities?: Maybe<Array<Maybe<Scalars['Float']>>>;
  sizes?: Maybe<Scalars['String']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  quality?: Maybe<Scalars['Int']>;
  backgroundColor?: Maybe<Scalars['String']>;
};


export type ContentfulAssetResizeArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  toFormat?: Maybe<ContentfulImageFormat>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};

export type ContentfulAssetCard = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulAssetCard';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  asset: ContentfulAsset;
  title: Scalars['String'];
  private: Scalars['Boolean'];
  thumbnail?: Maybe<ContentfulAsset>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulAssetCardSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulAssetCardCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulAssetCardUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulAssetCardConnection = {
  __typename?: 'ContentfulAssetCardConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetCardEdge>;
  nodes: Array<ContentfulAssetCard>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulAssetCardGroupConnection>;
};


export type ContentfulAssetCardConnectionDistinctArgs = {
  field: ContentfulAssetCardFieldsEnum;
};


export type ContentfulAssetCardConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulAssetCardFieldsEnum;
};

export type ContentfulAssetCardEdge = {
  __typename?: 'ContentfulAssetCardEdge';
  next?: Maybe<ContentfulAssetCard>;
  node: ContentfulAssetCard;
  previous?: Maybe<ContentfulAssetCard>;
};

export enum ContentfulAssetCardFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  asset___contentful_id = 'asset___contentful_id',
  asset___id = 'asset___id',
  asset___spaceId = 'asset___spaceId',
  asset___createdAt = 'asset___createdAt',
  asset___updatedAt = 'asset___updatedAt',
  asset___file___url = 'asset___file___url',
  asset___file___details___size = 'asset___file___details___size',
  asset___file___fileName = 'asset___file___fileName',
  asset___file___contentType = 'asset___file___contentType',
  asset___title = 'asset___title',
  asset___description = 'asset___description',
  asset___node_locale = 'asset___node_locale',
  asset___sys___type = 'asset___sys___type',
  asset___sys___revision = 'asset___sys___revision',
  asset___fixed___base64 = 'asset___fixed___base64',
  asset___fixed___tracedSVG = 'asset___fixed___tracedSVG',
  asset___fixed___aspectRatio = 'asset___fixed___aspectRatio',
  asset___fixed___width = 'asset___fixed___width',
  asset___fixed___height = 'asset___fixed___height',
  asset___fixed___src = 'asset___fixed___src',
  asset___fixed___srcSet = 'asset___fixed___srcSet',
  asset___fixed___srcWebp = 'asset___fixed___srcWebp',
  asset___fixed___srcSetWebp = 'asset___fixed___srcSetWebp',
  asset___resolutions___base64 = 'asset___resolutions___base64',
  asset___resolutions___tracedSVG = 'asset___resolutions___tracedSVG',
  asset___resolutions___aspectRatio = 'asset___resolutions___aspectRatio',
  asset___resolutions___width = 'asset___resolutions___width',
  asset___resolutions___height = 'asset___resolutions___height',
  asset___resolutions___src = 'asset___resolutions___src',
  asset___resolutions___srcSet = 'asset___resolutions___srcSet',
  asset___resolutions___srcWebp = 'asset___resolutions___srcWebp',
  asset___resolutions___srcSetWebp = 'asset___resolutions___srcSetWebp',
  asset___fluid___base64 = 'asset___fluid___base64',
  asset___fluid___tracedSVG = 'asset___fluid___tracedSVG',
  asset___fluid___aspectRatio = 'asset___fluid___aspectRatio',
  asset___fluid___src = 'asset___fluid___src',
  asset___fluid___srcSet = 'asset___fluid___srcSet',
  asset___fluid___srcWebp = 'asset___fluid___srcWebp',
  asset___fluid___srcSetWebp = 'asset___fluid___srcSetWebp',
  asset___fluid___sizes = 'asset___fluid___sizes',
  asset___sizes___base64 = 'asset___sizes___base64',
  asset___sizes___tracedSVG = 'asset___sizes___tracedSVG',
  asset___sizes___aspectRatio = 'asset___sizes___aspectRatio',
  asset___sizes___src = 'asset___sizes___src',
  asset___sizes___srcSet = 'asset___sizes___srcSet',
  asset___sizes___srcWebp = 'asset___sizes___srcWebp',
  asset___sizes___srcSetWebp = 'asset___sizes___srcSetWebp',
  asset___sizes___sizes = 'asset___sizes___sizes',
  asset___gatsbyImageData = 'asset___gatsbyImageData',
  asset___resize___base64 = 'asset___resize___base64',
  asset___resize___tracedSVG = 'asset___resize___tracedSVG',
  asset___resize___src = 'asset___resize___src',
  asset___resize___width = 'asset___resize___width',
  asset___resize___height = 'asset___resize___height',
  asset___resize___aspectRatio = 'asset___resize___aspectRatio',
  asset___parent___id = 'asset___parent___id',
  asset___parent___parent___id = 'asset___parent___parent___id',
  asset___parent___parent___children = 'asset___parent___parent___children',
  asset___parent___children = 'asset___parent___children',
  asset___parent___children___id = 'asset___parent___children___id',
  asset___parent___children___children = 'asset___parent___children___children',
  asset___parent___internal___content = 'asset___parent___internal___content',
  asset___parent___internal___contentDigest = 'asset___parent___internal___contentDigest',
  asset___parent___internal___description = 'asset___parent___internal___description',
  asset___parent___internal___fieldOwners = 'asset___parent___internal___fieldOwners',
  asset___parent___internal___ignoreType = 'asset___parent___internal___ignoreType',
  asset___parent___internal___mediaType = 'asset___parent___internal___mediaType',
  asset___parent___internal___owner = 'asset___parent___internal___owner',
  asset___parent___internal___type = 'asset___parent___internal___type',
  asset___children = 'asset___children',
  asset___children___id = 'asset___children___id',
  asset___children___parent___id = 'asset___children___parent___id',
  asset___children___parent___children = 'asset___children___parent___children',
  asset___children___children = 'asset___children___children',
  asset___children___children___id = 'asset___children___children___id',
  asset___children___children___children = 'asset___children___children___children',
  asset___children___internal___content = 'asset___children___internal___content',
  asset___children___internal___contentDigest = 'asset___children___internal___contentDigest',
  asset___children___internal___description = 'asset___children___internal___description',
  asset___children___internal___fieldOwners = 'asset___children___internal___fieldOwners',
  asset___children___internal___ignoreType = 'asset___children___internal___ignoreType',
  asset___children___internal___mediaType = 'asset___children___internal___mediaType',
  asset___children___internal___owner = 'asset___children___internal___owner',
  asset___children___internal___type = 'asset___children___internal___type',
  asset___internal___content = 'asset___internal___content',
  asset___internal___contentDigest = 'asset___internal___contentDigest',
  asset___internal___description = 'asset___internal___description',
  asset___internal___fieldOwners = 'asset___internal___fieldOwners',
  asset___internal___ignoreType = 'asset___internal___ignoreType',
  asset___internal___mediaType = 'asset___internal___mediaType',
  asset___internal___owner = 'asset___internal___owner',
  asset___internal___type = 'asset___internal___type',
  title = 'title',
  private = 'private',
  thumbnail___contentful_id = 'thumbnail___contentful_id',
  thumbnail___id = 'thumbnail___id',
  thumbnail___spaceId = 'thumbnail___spaceId',
  thumbnail___createdAt = 'thumbnail___createdAt',
  thumbnail___updatedAt = 'thumbnail___updatedAt',
  thumbnail___file___url = 'thumbnail___file___url',
  thumbnail___file___details___size = 'thumbnail___file___details___size',
  thumbnail___file___fileName = 'thumbnail___file___fileName',
  thumbnail___file___contentType = 'thumbnail___file___contentType',
  thumbnail___title = 'thumbnail___title',
  thumbnail___description = 'thumbnail___description',
  thumbnail___node_locale = 'thumbnail___node_locale',
  thumbnail___sys___type = 'thumbnail___sys___type',
  thumbnail___sys___revision = 'thumbnail___sys___revision',
  thumbnail___fixed___base64 = 'thumbnail___fixed___base64',
  thumbnail___fixed___tracedSVG = 'thumbnail___fixed___tracedSVG',
  thumbnail___fixed___aspectRatio = 'thumbnail___fixed___aspectRatio',
  thumbnail___fixed___width = 'thumbnail___fixed___width',
  thumbnail___fixed___height = 'thumbnail___fixed___height',
  thumbnail___fixed___src = 'thumbnail___fixed___src',
  thumbnail___fixed___srcSet = 'thumbnail___fixed___srcSet',
  thumbnail___fixed___srcWebp = 'thumbnail___fixed___srcWebp',
  thumbnail___fixed___srcSetWebp = 'thumbnail___fixed___srcSetWebp',
  thumbnail___resolutions___base64 = 'thumbnail___resolutions___base64',
  thumbnail___resolutions___tracedSVG = 'thumbnail___resolutions___tracedSVG',
  thumbnail___resolutions___aspectRatio = 'thumbnail___resolutions___aspectRatio',
  thumbnail___resolutions___width = 'thumbnail___resolutions___width',
  thumbnail___resolutions___height = 'thumbnail___resolutions___height',
  thumbnail___resolutions___src = 'thumbnail___resolutions___src',
  thumbnail___resolutions___srcSet = 'thumbnail___resolutions___srcSet',
  thumbnail___resolutions___srcWebp = 'thumbnail___resolutions___srcWebp',
  thumbnail___resolutions___srcSetWebp = 'thumbnail___resolutions___srcSetWebp',
  thumbnail___fluid___base64 = 'thumbnail___fluid___base64',
  thumbnail___fluid___tracedSVG = 'thumbnail___fluid___tracedSVG',
  thumbnail___fluid___aspectRatio = 'thumbnail___fluid___aspectRatio',
  thumbnail___fluid___src = 'thumbnail___fluid___src',
  thumbnail___fluid___srcSet = 'thumbnail___fluid___srcSet',
  thumbnail___fluid___srcWebp = 'thumbnail___fluid___srcWebp',
  thumbnail___fluid___srcSetWebp = 'thumbnail___fluid___srcSetWebp',
  thumbnail___fluid___sizes = 'thumbnail___fluid___sizes',
  thumbnail___sizes___base64 = 'thumbnail___sizes___base64',
  thumbnail___sizes___tracedSVG = 'thumbnail___sizes___tracedSVG',
  thumbnail___sizes___aspectRatio = 'thumbnail___sizes___aspectRatio',
  thumbnail___sizes___src = 'thumbnail___sizes___src',
  thumbnail___sizes___srcSet = 'thumbnail___sizes___srcSet',
  thumbnail___sizes___srcWebp = 'thumbnail___sizes___srcWebp',
  thumbnail___sizes___srcSetWebp = 'thumbnail___sizes___srcSetWebp',
  thumbnail___sizes___sizes = 'thumbnail___sizes___sizes',
  thumbnail___gatsbyImageData = 'thumbnail___gatsbyImageData',
  thumbnail___resize___base64 = 'thumbnail___resize___base64',
  thumbnail___resize___tracedSVG = 'thumbnail___resize___tracedSVG',
  thumbnail___resize___src = 'thumbnail___resize___src',
  thumbnail___resize___width = 'thumbnail___resize___width',
  thumbnail___resize___height = 'thumbnail___resize___height',
  thumbnail___resize___aspectRatio = 'thumbnail___resize___aspectRatio',
  thumbnail___parent___id = 'thumbnail___parent___id',
  thumbnail___parent___parent___id = 'thumbnail___parent___parent___id',
  thumbnail___parent___parent___children = 'thumbnail___parent___parent___children',
  thumbnail___parent___children = 'thumbnail___parent___children',
  thumbnail___parent___children___id = 'thumbnail___parent___children___id',
  thumbnail___parent___children___children = 'thumbnail___parent___children___children',
  thumbnail___parent___internal___content = 'thumbnail___parent___internal___content',
  thumbnail___parent___internal___contentDigest = 'thumbnail___parent___internal___contentDigest',
  thumbnail___parent___internal___description = 'thumbnail___parent___internal___description',
  thumbnail___parent___internal___fieldOwners = 'thumbnail___parent___internal___fieldOwners',
  thumbnail___parent___internal___ignoreType = 'thumbnail___parent___internal___ignoreType',
  thumbnail___parent___internal___mediaType = 'thumbnail___parent___internal___mediaType',
  thumbnail___parent___internal___owner = 'thumbnail___parent___internal___owner',
  thumbnail___parent___internal___type = 'thumbnail___parent___internal___type',
  thumbnail___children = 'thumbnail___children',
  thumbnail___children___id = 'thumbnail___children___id',
  thumbnail___children___parent___id = 'thumbnail___children___parent___id',
  thumbnail___children___parent___children = 'thumbnail___children___parent___children',
  thumbnail___children___children = 'thumbnail___children___children',
  thumbnail___children___children___id = 'thumbnail___children___children___id',
  thumbnail___children___children___children = 'thumbnail___children___children___children',
  thumbnail___children___internal___content = 'thumbnail___children___internal___content',
  thumbnail___children___internal___contentDigest = 'thumbnail___children___internal___contentDigest',
  thumbnail___children___internal___description = 'thumbnail___children___internal___description',
  thumbnail___children___internal___fieldOwners = 'thumbnail___children___internal___fieldOwners',
  thumbnail___children___internal___ignoreType = 'thumbnail___children___internal___ignoreType',
  thumbnail___children___internal___mediaType = 'thumbnail___children___internal___mediaType',
  thumbnail___children___internal___owner = 'thumbnail___children___internal___owner',
  thumbnail___children___internal___type = 'thumbnail___children___internal___type',
  thumbnail___internal___content = 'thumbnail___internal___content',
  thumbnail___internal___contentDigest = 'thumbnail___internal___contentDigest',
  thumbnail___internal___description = 'thumbnail___internal___description',
  thumbnail___internal___fieldOwners = 'thumbnail___internal___fieldOwners',
  thumbnail___internal___ignoreType = 'thumbnail___internal___ignoreType',
  thumbnail___internal___mediaType = 'thumbnail___internal___mediaType',
  thumbnail___internal___owner = 'thumbnail___internal___owner',
  thumbnail___internal___type = 'thumbnail___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulAssetCardFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  asset?: Maybe<ContentfulAssetFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  private?: Maybe<BooleanQueryOperatorInput>;
  thumbnail?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetCardSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulAssetCardFilterListInput = {
  elemMatch?: Maybe<ContentfulAssetCardFilterInput>;
};

export type ContentfulAssetCardGroupConnection = {
  __typename?: 'ContentfulAssetCardGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetCardEdge>;
  nodes: Array<ContentfulAssetCard>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulAssetCardSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulAssetCardFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulAssetCardSys = {
  __typename?: 'ContentfulAssetCardSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulAssetCardSysContentType>;
};

export type ContentfulAssetCardSysContentType = {
  __typename?: 'ContentfulAssetCardSysContentType';
  sys?: Maybe<ContentfulAssetCardSysContentTypeSys>;
};

export type ContentfulAssetCardSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulAssetCardSysContentTypeSysFilterInput>;
};

export type ContentfulAssetCardSysContentTypeSys = {
  __typename?: 'ContentfulAssetCardSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulAssetCardSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulAssetCardSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulAssetCardSysContentTypeFilterInput>;
};

export type ContentfulAssetConnection = {
  __typename?: 'ContentfulAssetConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetEdge>;
  nodes: Array<ContentfulAsset>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulAssetGroupConnection>;
};


export type ContentfulAssetConnectionDistinctArgs = {
  field: ContentfulAssetFieldsEnum;
};


export type ContentfulAssetConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulAssetFieldsEnum;
};

export type ContentfulAssetContentfulAssetCardContentfulAssetsContainerContentfulColorCardContentfulDosAndDontsContentfulGuidelineContentfulMarkdownContentfulTableContentfulTable2ColumnUnion = ContentfulAsset | ContentfulAssetCard | ContentfulAssetsContainer | ContentfulColorCard | ContentfulDosAndDonts | ContentfulGuideline | ContentfulMarkdown | ContentfulTable | ContentfulTable2Column;

export type ContentfulAssetEdge = {
  __typename?: 'ContentfulAssetEdge';
  next?: Maybe<ContentfulAsset>;
  node: ContentfulAsset;
  previous?: Maybe<ContentfulAsset>;
};

export enum ContentfulAssetFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  file___url = 'file___url',
  file___details___size = 'file___details___size',
  file___details___image___width = 'file___details___image___width',
  file___details___image___height = 'file___details___image___height',
  file___fileName = 'file___fileName',
  file___contentType = 'file___contentType',
  title = 'title',
  description = 'description',
  node_locale = 'node_locale',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  fixed___base64 = 'fixed___base64',
  fixed___tracedSVG = 'fixed___tracedSVG',
  fixed___aspectRatio = 'fixed___aspectRatio',
  fixed___width = 'fixed___width',
  fixed___height = 'fixed___height',
  fixed___src = 'fixed___src',
  fixed___srcSet = 'fixed___srcSet',
  fixed___srcWebp = 'fixed___srcWebp',
  fixed___srcSetWebp = 'fixed___srcSetWebp',
  resolutions___base64 = 'resolutions___base64',
  resolutions___tracedSVG = 'resolutions___tracedSVG',
  resolutions___aspectRatio = 'resolutions___aspectRatio',
  resolutions___width = 'resolutions___width',
  resolutions___height = 'resolutions___height',
  resolutions___src = 'resolutions___src',
  resolutions___srcSet = 'resolutions___srcSet',
  resolutions___srcWebp = 'resolutions___srcWebp',
  resolutions___srcSetWebp = 'resolutions___srcSetWebp',
  fluid___base64 = 'fluid___base64',
  fluid___tracedSVG = 'fluid___tracedSVG',
  fluid___aspectRatio = 'fluid___aspectRatio',
  fluid___src = 'fluid___src',
  fluid___srcSet = 'fluid___srcSet',
  fluid___srcWebp = 'fluid___srcWebp',
  fluid___srcSetWebp = 'fluid___srcSetWebp',
  fluid___sizes = 'fluid___sizes',
  sizes___base64 = 'sizes___base64',
  sizes___tracedSVG = 'sizes___tracedSVG',
  sizes___aspectRatio = 'sizes___aspectRatio',
  sizes___src = 'sizes___src',
  sizes___srcSet = 'sizes___srcSet',
  sizes___srcWebp = 'sizes___srcWebp',
  sizes___srcSetWebp = 'sizes___srcSetWebp',
  sizes___sizes = 'sizes___sizes',
  gatsbyImageData = 'gatsbyImageData',
  resize___base64 = 'resize___base64',
  resize___tracedSVG = 'resize___tracedSVG',
  resize___src = 'resize___src',
  resize___width = 'resize___width',
  resize___height = 'resize___height',
  resize___aspectRatio = 'resize___aspectRatio',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulAssetFile = {
  __typename?: 'ContentfulAssetFile';
  url?: Maybe<Scalars['String']>;
  details?: Maybe<ContentfulAssetFileDetails>;
  fileName?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};

export type ContentfulAssetFileDetails = {
  __typename?: 'ContentfulAssetFileDetails';
  size?: Maybe<Scalars['Int']>;
  image?: Maybe<ContentfulAssetFileDetailsImage>;
};

export type ContentfulAssetFileDetailsFilterInput = {
  size?: Maybe<IntQueryOperatorInput>;
  image?: Maybe<ContentfulAssetFileDetailsImageFilterInput>;
};

export type ContentfulAssetFileDetailsImage = {
  __typename?: 'ContentfulAssetFileDetailsImage';
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
};

export type ContentfulAssetFileDetailsImageFilterInput = {
  width?: Maybe<IntQueryOperatorInput>;
  height?: Maybe<IntQueryOperatorInput>;
};

export type ContentfulAssetFileFilterInput = {
  url?: Maybe<StringQueryOperatorInput>;
  details?: Maybe<ContentfulAssetFileDetailsFilterInput>;
  fileName?: Maybe<StringQueryOperatorInput>;
  contentType?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulAssetFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  file?: Maybe<ContentfulAssetFileFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetSysFilterInput>;
  fixed?: Maybe<ContentfulFixedFilterInput>;
  resolutions?: Maybe<ContentfulResolutionsFilterInput>;
  fluid?: Maybe<ContentfulFluidFilterInput>;
  sizes?: Maybe<ContentfulSizesFilterInput>;
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>;
  resize?: Maybe<ContentfulResizeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulAssetGroupConnection = {
  __typename?: 'ContentfulAssetGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetEdge>;
  nodes: Array<ContentfulAsset>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulAssetsContainer = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulAssetsContainer';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  contentfulchildren?: Maybe<ContentfulAssetsContainerContentfulchildren>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulAssetsContainerSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulAssetsContainerCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulAssetsContainerUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulAssetsContainerConnection = {
  __typename?: 'ContentfulAssetsContainerConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetsContainerEdge>;
  nodes: Array<ContentfulAssetsContainer>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulAssetsContainerGroupConnection>;
};


export type ContentfulAssetsContainerConnectionDistinctArgs = {
  field: ContentfulAssetsContainerFieldsEnum;
};


export type ContentfulAssetsContainerConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulAssetsContainerFieldsEnum;
};

export type ContentfulAssetsContainerContentfulchildren = {
  __typename?: 'ContentfulAssetsContainerContentfulchildren';
  raw?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<ContentfulAssetCard>>>;
};

export type ContentfulAssetsContainerContentfulchildrenFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
  references?: Maybe<ContentfulAssetCardFilterListInput>;
};

export type ContentfulAssetsContainerEdge = {
  __typename?: 'ContentfulAssetsContainerEdge';
  next?: Maybe<ContentfulAssetsContainer>;
  node: ContentfulAssetsContainer;
  previous?: Maybe<ContentfulAssetsContainer>;
};

export enum ContentfulAssetsContainerFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  title = 'title',
  contentfulchildren___raw = 'contentfulchildren___raw',
  contentfulchildren___references = 'contentfulchildren___references',
  contentfulchildren___references___contentful_id = 'contentfulchildren___references___contentful_id',
  contentfulchildren___references___id = 'contentfulchildren___references___id',
  contentfulchildren___references___node_locale = 'contentfulchildren___references___node_locale',
  contentfulchildren___references___asset___contentful_id = 'contentfulchildren___references___asset___contentful_id',
  contentfulchildren___references___asset___id = 'contentfulchildren___references___asset___id',
  contentfulchildren___references___asset___spaceId = 'contentfulchildren___references___asset___spaceId',
  contentfulchildren___references___asset___createdAt = 'contentfulchildren___references___asset___createdAt',
  contentfulchildren___references___asset___updatedAt = 'contentfulchildren___references___asset___updatedAt',
  contentfulchildren___references___asset___title = 'contentfulchildren___references___asset___title',
  contentfulchildren___references___asset___description = 'contentfulchildren___references___asset___description',
  contentfulchildren___references___asset___node_locale = 'contentfulchildren___references___asset___node_locale',
  contentfulchildren___references___asset___gatsbyImageData = 'contentfulchildren___references___asset___gatsbyImageData',
  contentfulchildren___references___asset___children = 'contentfulchildren___references___asset___children',
  contentfulchildren___references___title = 'contentfulchildren___references___title',
  contentfulchildren___references___private = 'contentfulchildren___references___private',
  contentfulchildren___references___thumbnail___contentful_id = 'contentfulchildren___references___thumbnail___contentful_id',
  contentfulchildren___references___thumbnail___id = 'contentfulchildren___references___thumbnail___id',
  contentfulchildren___references___thumbnail___spaceId = 'contentfulchildren___references___thumbnail___spaceId',
  contentfulchildren___references___thumbnail___createdAt = 'contentfulchildren___references___thumbnail___createdAt',
  contentfulchildren___references___thumbnail___updatedAt = 'contentfulchildren___references___thumbnail___updatedAt',
  contentfulchildren___references___thumbnail___title = 'contentfulchildren___references___thumbnail___title',
  contentfulchildren___references___thumbnail___description = 'contentfulchildren___references___thumbnail___description',
  contentfulchildren___references___thumbnail___node_locale = 'contentfulchildren___references___thumbnail___node_locale',
  contentfulchildren___references___thumbnail___gatsbyImageData = 'contentfulchildren___references___thumbnail___gatsbyImageData',
  contentfulchildren___references___thumbnail___children = 'contentfulchildren___references___thumbnail___children',
  contentfulchildren___references___spaceId = 'contentfulchildren___references___spaceId',
  contentfulchildren___references___createdAt = 'contentfulchildren___references___createdAt',
  contentfulchildren___references___updatedAt = 'contentfulchildren___references___updatedAt',
  contentfulchildren___references___sys___type = 'contentfulchildren___references___sys___type',
  contentfulchildren___references___sys___revision = 'contentfulchildren___references___sys___revision',
  contentfulchildren___references___parent___id = 'contentfulchildren___references___parent___id',
  contentfulchildren___references___parent___children = 'contentfulchildren___references___parent___children',
  contentfulchildren___references___children = 'contentfulchildren___references___children',
  contentfulchildren___references___children___id = 'contentfulchildren___references___children___id',
  contentfulchildren___references___children___children = 'contentfulchildren___references___children___children',
  contentfulchildren___references___internal___content = 'contentfulchildren___references___internal___content',
  contentfulchildren___references___internal___contentDigest = 'contentfulchildren___references___internal___contentDigest',
  contentfulchildren___references___internal___description = 'contentfulchildren___references___internal___description',
  contentfulchildren___references___internal___fieldOwners = 'contentfulchildren___references___internal___fieldOwners',
  contentfulchildren___references___internal___ignoreType = 'contentfulchildren___references___internal___ignoreType',
  contentfulchildren___references___internal___mediaType = 'contentfulchildren___references___internal___mediaType',
  contentfulchildren___references___internal___owner = 'contentfulchildren___references___internal___owner',
  contentfulchildren___references___internal___type = 'contentfulchildren___references___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulAssetsContainerFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  contentfulchildren?: Maybe<ContentfulAssetsContainerContentfulchildrenFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetsContainerSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulAssetsContainerGroupConnection = {
  __typename?: 'ContentfulAssetsContainerGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetsContainerEdge>;
  nodes: Array<ContentfulAssetsContainer>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulAssetsContainerSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulAssetsContainerFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulAssetsContainerSys = {
  __typename?: 'ContentfulAssetsContainerSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulAssetsContainerSysContentType>;
};

export type ContentfulAssetsContainerSysContentType = {
  __typename?: 'ContentfulAssetsContainerSysContentType';
  sys?: Maybe<ContentfulAssetsContainerSysContentTypeSys>;
};

export type ContentfulAssetsContainerSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulAssetsContainerSysContentTypeSysFilterInput>;
};

export type ContentfulAssetsContainerSysContentTypeSys = {
  __typename?: 'ContentfulAssetsContainerSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulAssetsContainerSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulAssetsContainerSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulAssetsContainerSysContentTypeFilterInput>;
};

export type ContentfulAssetSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulAssetFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulAssetSys = {
  __typename?: 'ContentfulAssetSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
};

export type ContentfulAssetSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
};

export type ContentfulColorCard = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulColorCard';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  name: Scalars['String'];
  hexCode: Scalars['String'];
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulColorCardSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulColorCardCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulColorCardUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulColorCardConnection = {
  __typename?: 'ContentfulColorCardConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulColorCardEdge>;
  nodes: Array<ContentfulColorCard>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulColorCardGroupConnection>;
};


export type ContentfulColorCardConnectionDistinctArgs = {
  field: ContentfulColorCardFieldsEnum;
};


export type ContentfulColorCardConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulColorCardFieldsEnum;
};

export type ContentfulColorCardEdge = {
  __typename?: 'ContentfulColorCardEdge';
  next?: Maybe<ContentfulColorCard>;
  node: ContentfulColorCard;
  previous?: Maybe<ContentfulColorCard>;
};

export enum ContentfulColorCardFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  name = 'name',
  hexCode = 'hexCode',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulColorCardFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  hexCode?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulColorCardSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulColorCardGroupConnection = {
  __typename?: 'ContentfulColorCardGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulColorCardEdge>;
  nodes: Array<ContentfulColorCard>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulColorCardSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulColorCardFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulColorCardSys = {
  __typename?: 'ContentfulColorCardSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulColorCardSysContentType>;
};

export type ContentfulColorCardSysContentType = {
  __typename?: 'ContentfulColorCardSysContentType';
  sys?: Maybe<ContentfulColorCardSysContentTypeSys>;
};

export type ContentfulColorCardSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulColorCardSysContentTypeSysFilterInput>;
};

export type ContentfulColorCardSysContentTypeSys = {
  __typename?: 'ContentfulColorCardSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulColorCardSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulColorCardSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulColorCardSysContentTypeFilterInput>;
};

export type ContentfulContentType = Node & {
  __typename?: 'ContentfulContentType';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  displayField?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sys?: Maybe<ContentfulContentTypeSys>;
};

export type ContentfulContentTypeConnection = {
  __typename?: 'ContentfulContentTypeConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulContentTypeEdge>;
  nodes: Array<ContentfulContentType>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulContentTypeGroupConnection>;
};


export type ContentfulContentTypeConnectionDistinctArgs = {
  field: ContentfulContentTypeFieldsEnum;
};


export type ContentfulContentTypeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulContentTypeFieldsEnum;
};

export type ContentfulContentTypeEdge = {
  __typename?: 'ContentfulContentTypeEdge';
  next?: Maybe<ContentfulContentType>;
  node: ContentfulContentType;
  previous?: Maybe<ContentfulContentType>;
};

export enum ContentfulContentTypeFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  name = 'name',
  displayField = 'displayField',
  description = 'description',
  sys___type = 'sys___type'
}

export type ContentfulContentTypeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  displayField?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulContentTypeSysFilterInput>;
};

export type ContentfulContentTypeGroupConnection = {
  __typename?: 'ContentfulContentTypeGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulContentTypeEdge>;
  nodes: Array<ContentfulContentType>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulContentTypeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulContentTypeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulContentTypeSys = {
  __typename?: 'ContentfulContentTypeSys';
  type?: Maybe<Scalars['String']>;
};

export type ContentfulContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulDosAndDonts = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulDosAndDonts';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  type: Scalars['String'];
  text: Scalars['String'];
  fullWidth?: Maybe<Scalars['Boolean']>;
  image?: Maybe<ContentfulAsset>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulDosAndDontsSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulDosAndDontsCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulDosAndDontsUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulDosAndDontsConnection = {
  __typename?: 'ContentfulDosAndDontsConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulDosAndDontsEdge>;
  nodes: Array<ContentfulDosAndDonts>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulDosAndDontsGroupConnection>;
};


export type ContentfulDosAndDontsConnectionDistinctArgs = {
  field: ContentfulDosAndDontsFieldsEnum;
};


export type ContentfulDosAndDontsConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulDosAndDontsFieldsEnum;
};

export type ContentfulDosAndDontsEdge = {
  __typename?: 'ContentfulDosAndDontsEdge';
  next?: Maybe<ContentfulDosAndDonts>;
  node: ContentfulDosAndDonts;
  previous?: Maybe<ContentfulDosAndDonts>;
};

export enum ContentfulDosAndDontsFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  type = 'type',
  text = 'text',
  fullWidth = 'fullWidth',
  image___contentful_id = 'image___contentful_id',
  image___id = 'image___id',
  image___spaceId = 'image___spaceId',
  image___createdAt = 'image___createdAt',
  image___updatedAt = 'image___updatedAt',
  image___file___url = 'image___file___url',
  image___file___details___size = 'image___file___details___size',
  image___file___fileName = 'image___file___fileName',
  image___file___contentType = 'image___file___contentType',
  image___title = 'image___title',
  image___description = 'image___description',
  image___node_locale = 'image___node_locale',
  image___sys___type = 'image___sys___type',
  image___sys___revision = 'image___sys___revision',
  image___fixed___base64 = 'image___fixed___base64',
  image___fixed___tracedSVG = 'image___fixed___tracedSVG',
  image___fixed___aspectRatio = 'image___fixed___aspectRatio',
  image___fixed___width = 'image___fixed___width',
  image___fixed___height = 'image___fixed___height',
  image___fixed___src = 'image___fixed___src',
  image___fixed___srcSet = 'image___fixed___srcSet',
  image___fixed___srcWebp = 'image___fixed___srcWebp',
  image___fixed___srcSetWebp = 'image___fixed___srcSetWebp',
  image___resolutions___base64 = 'image___resolutions___base64',
  image___resolutions___tracedSVG = 'image___resolutions___tracedSVG',
  image___resolutions___aspectRatio = 'image___resolutions___aspectRatio',
  image___resolutions___width = 'image___resolutions___width',
  image___resolutions___height = 'image___resolutions___height',
  image___resolutions___src = 'image___resolutions___src',
  image___resolutions___srcSet = 'image___resolutions___srcSet',
  image___resolutions___srcWebp = 'image___resolutions___srcWebp',
  image___resolutions___srcSetWebp = 'image___resolutions___srcSetWebp',
  image___fluid___base64 = 'image___fluid___base64',
  image___fluid___tracedSVG = 'image___fluid___tracedSVG',
  image___fluid___aspectRatio = 'image___fluid___aspectRatio',
  image___fluid___src = 'image___fluid___src',
  image___fluid___srcSet = 'image___fluid___srcSet',
  image___fluid___srcWebp = 'image___fluid___srcWebp',
  image___fluid___srcSetWebp = 'image___fluid___srcSetWebp',
  image___fluid___sizes = 'image___fluid___sizes',
  image___sizes___base64 = 'image___sizes___base64',
  image___sizes___tracedSVG = 'image___sizes___tracedSVG',
  image___sizes___aspectRatio = 'image___sizes___aspectRatio',
  image___sizes___src = 'image___sizes___src',
  image___sizes___srcSet = 'image___sizes___srcSet',
  image___sizes___srcWebp = 'image___sizes___srcWebp',
  image___sizes___srcSetWebp = 'image___sizes___srcSetWebp',
  image___sizes___sizes = 'image___sizes___sizes',
  image___gatsbyImageData = 'image___gatsbyImageData',
  image___resize___base64 = 'image___resize___base64',
  image___resize___tracedSVG = 'image___resize___tracedSVG',
  image___resize___src = 'image___resize___src',
  image___resize___width = 'image___resize___width',
  image___resize___height = 'image___resize___height',
  image___resize___aspectRatio = 'image___resize___aspectRatio',
  image___parent___id = 'image___parent___id',
  image___parent___parent___id = 'image___parent___parent___id',
  image___parent___parent___children = 'image___parent___parent___children',
  image___parent___children = 'image___parent___children',
  image___parent___children___id = 'image___parent___children___id',
  image___parent___children___children = 'image___parent___children___children',
  image___parent___internal___content = 'image___parent___internal___content',
  image___parent___internal___contentDigest = 'image___parent___internal___contentDigest',
  image___parent___internal___description = 'image___parent___internal___description',
  image___parent___internal___fieldOwners = 'image___parent___internal___fieldOwners',
  image___parent___internal___ignoreType = 'image___parent___internal___ignoreType',
  image___parent___internal___mediaType = 'image___parent___internal___mediaType',
  image___parent___internal___owner = 'image___parent___internal___owner',
  image___parent___internal___type = 'image___parent___internal___type',
  image___children = 'image___children',
  image___children___id = 'image___children___id',
  image___children___parent___id = 'image___children___parent___id',
  image___children___parent___children = 'image___children___parent___children',
  image___children___children = 'image___children___children',
  image___children___children___id = 'image___children___children___id',
  image___children___children___children = 'image___children___children___children',
  image___children___internal___content = 'image___children___internal___content',
  image___children___internal___contentDigest = 'image___children___internal___contentDigest',
  image___children___internal___description = 'image___children___internal___description',
  image___children___internal___fieldOwners = 'image___children___internal___fieldOwners',
  image___children___internal___ignoreType = 'image___children___internal___ignoreType',
  image___children___internal___mediaType = 'image___children___internal___mediaType',
  image___children___internal___owner = 'image___children___internal___owner',
  image___children___internal___type = 'image___children___internal___type',
  image___internal___content = 'image___internal___content',
  image___internal___contentDigest = 'image___internal___contentDigest',
  image___internal___description = 'image___internal___description',
  image___internal___fieldOwners = 'image___internal___fieldOwners',
  image___internal___ignoreType = 'image___internal___ignoreType',
  image___internal___mediaType = 'image___internal___mediaType',
  image___internal___owner = 'image___internal___owner',
  image___internal___type = 'image___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulDosAndDontsFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  type?: Maybe<StringQueryOperatorInput>;
  text?: Maybe<StringQueryOperatorInput>;
  fullWidth?: Maybe<BooleanQueryOperatorInput>;
  image?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulDosAndDontsSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulDosAndDontsGroupConnection = {
  __typename?: 'ContentfulDosAndDontsGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulDosAndDontsEdge>;
  nodes: Array<ContentfulDosAndDonts>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulDosAndDontsSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulDosAndDontsFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulDosAndDontsSys = {
  __typename?: 'ContentfulDosAndDontsSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulDosAndDontsSysContentType>;
};

export type ContentfulDosAndDontsSysContentType = {
  __typename?: 'ContentfulDosAndDontsSysContentType';
  sys?: Maybe<ContentfulDosAndDontsSysContentTypeSys>;
};

export type ContentfulDosAndDontsSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulDosAndDontsSysContentTypeSysFilterInput>;
};

export type ContentfulDosAndDontsSysContentTypeSys = {
  __typename?: 'ContentfulDosAndDontsSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulDosAndDontsSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulDosAndDontsSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulDosAndDontsSysContentTypeFilterInput>;
};

export type ContentfulEntry = {
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
};

export type ContentfulEntryConnection = {
  __typename?: 'ContentfulEntryConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulEntryEdge>;
  nodes: Array<ContentfulEntry>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulEntryGroupConnection>;
};


export type ContentfulEntryConnectionDistinctArgs = {
  field: ContentfulEntryFieldsEnum;
};


export type ContentfulEntryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulEntryFieldsEnum;
};

export type ContentfulEntryEdge = {
  __typename?: 'ContentfulEntryEdge';
  next?: Maybe<ContentfulEntry>;
  node: ContentfulEntry;
  previous?: Maybe<ContentfulEntry>;
};

export enum ContentfulEntryFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale'
}

export type ContentfulEntryFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulEntryGroupConnection = {
  __typename?: 'ContentfulEntryGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulEntryEdge>;
  nodes: Array<ContentfulEntry>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulEntrySortInput = {
  fields?: Maybe<Array<Maybe<ContentfulEntryFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulFixed = {
  __typename?: 'ContentfulFixed';
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
};

export type ContentfulFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulFluid = {
  __typename?: 'ContentfulFluid';
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
};

export type ContentfulFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulFullWidthContainer = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulFullWidthContainer';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type ContentfulFullWidthContainerConnection = {
  __typename?: 'ContentfulFullWidthContainerConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulFullWidthContainerEdge>;
  nodes: Array<ContentfulFullWidthContainer>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulFullWidthContainerGroupConnection>;
};


export type ContentfulFullWidthContainerConnectionDistinctArgs = {
  field: ContentfulFullWidthContainerFieldsEnum;
};


export type ContentfulFullWidthContainerConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulFullWidthContainerFieldsEnum;
};

export type ContentfulFullWidthContainerEdge = {
  __typename?: 'ContentfulFullWidthContainerEdge';
  next?: Maybe<ContentfulFullWidthContainer>;
  node: ContentfulFullWidthContainer;
  previous?: Maybe<ContentfulFullWidthContainer>;
};

export enum ContentfulFullWidthContainerFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulFullWidthContainerFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulFullWidthContainerGroupConnection = {
  __typename?: 'ContentfulFullWidthContainerGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulFullWidthContainerEdge>;
  nodes: Array<ContentfulFullWidthContainer>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulFullWidthContainerSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulFullWidthContainerFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulGuideline = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulGuideline';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  title: Scalars['String'];
  iconGlyphName: Scalars['String'];
  slug: Scalars['String'];
  category: Scalars['String'];
  description: ContentfulGuidelineDescriptionTextNode;
  private: Scalars['Boolean'];
  bodyText?: Maybe<ContentfulGuidelineBodyText>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulGuidelineSys>;
  contentfulparent?: Maybe<ContentfulGuideline>;
  guideline?: Maybe<Array<Maybe<ContentfulGuideline>>>;
  /** Returns all children nodes filtered by type contentfulGuidelineDescriptionTextNode */
  childrenContentfulGuidelineDescriptionTextNode?: Maybe<Array<Maybe<ContentfulGuidelineDescriptionTextNode>>>;
  /**
   * Returns the first child node of type contentfulGuidelineDescriptionTextNode or
   * null if there are no children of given type on this node
   */
  childContentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNode>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulGuidelineCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulGuidelineUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulGuidelineBodyText = {
  __typename?: 'ContentfulGuidelineBodyText';
  raw?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<ContentfulAssetContentfulAssetCardContentfulAssetsContainerContentfulColorCardContentfulDosAndDontsContentfulGuidelineContentfulMarkdownContentfulTableContentfulTable2ColumnUnion>>>;
};

export type ContentfulGuidelineBodyTextFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulGuidelineConnection = {
  __typename?: 'ContentfulGuidelineConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulGuidelineEdge>;
  nodes: Array<ContentfulGuideline>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulGuidelineGroupConnection>;
};


export type ContentfulGuidelineConnectionDistinctArgs = {
  field: ContentfulGuidelineFieldsEnum;
};


export type ContentfulGuidelineConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulGuidelineFieldsEnum;
};

export type ContentfulGuidelineDescriptionTextNode = Node & {
  __typename?: 'contentfulGuidelineDescriptionTextNode';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  description?: Maybe<Scalars['String']>;
  sys?: Maybe<ContentfulGuidelineDescriptionTextNodeSys>;
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>;
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>;
};

export type ContentfulGuidelineDescriptionTextNodeConnection = {
  __typename?: 'contentfulGuidelineDescriptionTextNodeConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulGuidelineDescriptionTextNodeEdge>;
  nodes: Array<ContentfulGuidelineDescriptionTextNode>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulGuidelineDescriptionTextNodeGroupConnection>;
};


export type ContentfulGuidelineDescriptionTextNodeConnectionDistinctArgs = {
  field: ContentfulGuidelineDescriptionTextNodeFieldsEnum;
};


export type ContentfulGuidelineDescriptionTextNodeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulGuidelineDescriptionTextNodeFieldsEnum;
};

export type ContentfulGuidelineDescriptionTextNodeEdge = {
  __typename?: 'contentfulGuidelineDescriptionTextNodeEdge';
  next?: Maybe<ContentfulGuidelineDescriptionTextNode>;
  node: ContentfulGuidelineDescriptionTextNode;
  previous?: Maybe<ContentfulGuidelineDescriptionTextNode>;
};

export enum ContentfulGuidelineDescriptionTextNodeFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  description = 'description',
  sys___type = 'sys___type',
  childrenMdx = 'childrenMdx',
  childrenMdx___rawBody = 'childrenMdx___rawBody',
  childrenMdx___fileAbsolutePath = 'childrenMdx___fileAbsolutePath',
  childrenMdx___frontmatter___title = 'childrenMdx___frontmatter___title',
  childrenMdx___frontmatter___order = 'childrenMdx___frontmatter___order',
  childrenMdx___frontmatter___description = 'childrenMdx___frontmatter___description',
  childrenMdx___slug = 'childrenMdx___slug',
  childrenMdx___body = 'childrenMdx___body',
  childrenMdx___excerpt = 'childrenMdx___excerpt',
  childrenMdx___headings = 'childrenMdx___headings',
  childrenMdx___headings___value = 'childrenMdx___headings___value',
  childrenMdx___headings___depth = 'childrenMdx___headings___depth',
  childrenMdx___html = 'childrenMdx___html',
  childrenMdx___mdxAST = 'childrenMdx___mdxAST',
  childrenMdx___tableOfContents = 'childrenMdx___tableOfContents',
  childrenMdx___timeToRead = 'childrenMdx___timeToRead',
  childrenMdx___wordCount___paragraphs = 'childrenMdx___wordCount___paragraphs',
  childrenMdx___wordCount___sentences = 'childrenMdx___wordCount___sentences',
  childrenMdx___wordCount___words = 'childrenMdx___wordCount___words',
  childrenMdx___id = 'childrenMdx___id',
  childrenMdx___parent___id = 'childrenMdx___parent___id',
  childrenMdx___parent___parent___id = 'childrenMdx___parent___parent___id',
  childrenMdx___parent___parent___children = 'childrenMdx___parent___parent___children',
  childrenMdx___parent___children = 'childrenMdx___parent___children',
  childrenMdx___parent___children___id = 'childrenMdx___parent___children___id',
  childrenMdx___parent___children___children = 'childrenMdx___parent___children___children',
  childrenMdx___parent___internal___content = 'childrenMdx___parent___internal___content',
  childrenMdx___parent___internal___contentDigest = 'childrenMdx___parent___internal___contentDigest',
  childrenMdx___parent___internal___description = 'childrenMdx___parent___internal___description',
  childrenMdx___parent___internal___fieldOwners = 'childrenMdx___parent___internal___fieldOwners',
  childrenMdx___parent___internal___ignoreType = 'childrenMdx___parent___internal___ignoreType',
  childrenMdx___parent___internal___mediaType = 'childrenMdx___parent___internal___mediaType',
  childrenMdx___parent___internal___owner = 'childrenMdx___parent___internal___owner',
  childrenMdx___parent___internal___type = 'childrenMdx___parent___internal___type',
  childrenMdx___children = 'childrenMdx___children',
  childrenMdx___children___id = 'childrenMdx___children___id',
  childrenMdx___children___parent___id = 'childrenMdx___children___parent___id',
  childrenMdx___children___parent___children = 'childrenMdx___children___parent___children',
  childrenMdx___children___children = 'childrenMdx___children___children',
  childrenMdx___children___children___id = 'childrenMdx___children___children___id',
  childrenMdx___children___children___children = 'childrenMdx___children___children___children',
  childrenMdx___children___internal___content = 'childrenMdx___children___internal___content',
  childrenMdx___children___internal___contentDigest = 'childrenMdx___children___internal___contentDigest',
  childrenMdx___children___internal___description = 'childrenMdx___children___internal___description',
  childrenMdx___children___internal___fieldOwners = 'childrenMdx___children___internal___fieldOwners',
  childrenMdx___children___internal___ignoreType = 'childrenMdx___children___internal___ignoreType',
  childrenMdx___children___internal___mediaType = 'childrenMdx___children___internal___mediaType',
  childrenMdx___children___internal___owner = 'childrenMdx___children___internal___owner',
  childrenMdx___children___internal___type = 'childrenMdx___children___internal___type',
  childrenMdx___internal___content = 'childrenMdx___internal___content',
  childrenMdx___internal___contentDigest = 'childrenMdx___internal___contentDigest',
  childrenMdx___internal___description = 'childrenMdx___internal___description',
  childrenMdx___internal___fieldOwners = 'childrenMdx___internal___fieldOwners',
  childrenMdx___internal___ignoreType = 'childrenMdx___internal___ignoreType',
  childrenMdx___internal___mediaType = 'childrenMdx___internal___mediaType',
  childrenMdx___internal___owner = 'childrenMdx___internal___owner',
  childrenMdx___internal___type = 'childrenMdx___internal___type',
  childMdx___rawBody = 'childMdx___rawBody',
  childMdx___fileAbsolutePath = 'childMdx___fileAbsolutePath',
  childMdx___frontmatter___title = 'childMdx___frontmatter___title',
  childMdx___frontmatter___order = 'childMdx___frontmatter___order',
  childMdx___frontmatter___description = 'childMdx___frontmatter___description',
  childMdx___slug = 'childMdx___slug',
  childMdx___body = 'childMdx___body',
  childMdx___excerpt = 'childMdx___excerpt',
  childMdx___headings = 'childMdx___headings',
  childMdx___headings___value = 'childMdx___headings___value',
  childMdx___headings___depth = 'childMdx___headings___depth',
  childMdx___html = 'childMdx___html',
  childMdx___mdxAST = 'childMdx___mdxAST',
  childMdx___tableOfContents = 'childMdx___tableOfContents',
  childMdx___timeToRead = 'childMdx___timeToRead',
  childMdx___wordCount___paragraphs = 'childMdx___wordCount___paragraphs',
  childMdx___wordCount___sentences = 'childMdx___wordCount___sentences',
  childMdx___wordCount___words = 'childMdx___wordCount___words',
  childMdx___id = 'childMdx___id',
  childMdx___parent___id = 'childMdx___parent___id',
  childMdx___parent___parent___id = 'childMdx___parent___parent___id',
  childMdx___parent___parent___children = 'childMdx___parent___parent___children',
  childMdx___parent___children = 'childMdx___parent___children',
  childMdx___parent___children___id = 'childMdx___parent___children___id',
  childMdx___parent___children___children = 'childMdx___parent___children___children',
  childMdx___parent___internal___content = 'childMdx___parent___internal___content',
  childMdx___parent___internal___contentDigest = 'childMdx___parent___internal___contentDigest',
  childMdx___parent___internal___description = 'childMdx___parent___internal___description',
  childMdx___parent___internal___fieldOwners = 'childMdx___parent___internal___fieldOwners',
  childMdx___parent___internal___ignoreType = 'childMdx___parent___internal___ignoreType',
  childMdx___parent___internal___mediaType = 'childMdx___parent___internal___mediaType',
  childMdx___parent___internal___owner = 'childMdx___parent___internal___owner',
  childMdx___parent___internal___type = 'childMdx___parent___internal___type',
  childMdx___children = 'childMdx___children',
  childMdx___children___id = 'childMdx___children___id',
  childMdx___children___parent___id = 'childMdx___children___parent___id',
  childMdx___children___parent___children = 'childMdx___children___parent___children',
  childMdx___children___children = 'childMdx___children___children',
  childMdx___children___children___id = 'childMdx___children___children___id',
  childMdx___children___children___children = 'childMdx___children___children___children',
  childMdx___children___internal___content = 'childMdx___children___internal___content',
  childMdx___children___internal___contentDigest = 'childMdx___children___internal___contentDigest',
  childMdx___children___internal___description = 'childMdx___children___internal___description',
  childMdx___children___internal___fieldOwners = 'childMdx___children___internal___fieldOwners',
  childMdx___children___internal___ignoreType = 'childMdx___children___internal___ignoreType',
  childMdx___children___internal___mediaType = 'childMdx___children___internal___mediaType',
  childMdx___children___internal___owner = 'childMdx___children___internal___owner',
  childMdx___children___internal___type = 'childMdx___children___internal___type',
  childMdx___internal___content = 'childMdx___internal___content',
  childMdx___internal___contentDigest = 'childMdx___internal___contentDigest',
  childMdx___internal___description = 'childMdx___internal___description',
  childMdx___internal___fieldOwners = 'childMdx___internal___fieldOwners',
  childMdx___internal___ignoreType = 'childMdx___internal___ignoreType',
  childMdx___internal___mediaType = 'childMdx___internal___mediaType',
  childMdx___internal___owner = 'childMdx___internal___owner',
  childMdx___internal___type = 'childMdx___internal___type'
}

export type ContentfulGuidelineDescriptionTextNodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  description?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulGuidelineDescriptionTextNodeSysFilterInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};

export type ContentfulGuidelineDescriptionTextNodeFilterListInput = {
  elemMatch?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
};

export type ContentfulGuidelineDescriptionTextNodeGroupConnection = {
  __typename?: 'contentfulGuidelineDescriptionTextNodeGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulGuidelineDescriptionTextNodeEdge>;
  nodes: Array<ContentfulGuidelineDescriptionTextNode>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulGuidelineDescriptionTextNodeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulGuidelineDescriptionTextNodeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulGuidelineDescriptionTextNodeSys = {
  __typename?: 'contentfulGuidelineDescriptionTextNodeSys';
  type?: Maybe<Scalars['String']>;
};

export type ContentfulGuidelineDescriptionTextNodeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulGuidelineEdge = {
  __typename?: 'ContentfulGuidelineEdge';
  next?: Maybe<ContentfulGuideline>;
  node: ContentfulGuideline;
  previous?: Maybe<ContentfulGuideline>;
};

export enum ContentfulGuidelineFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  title = 'title',
  iconGlyphName = 'iconGlyphName',
  slug = 'slug',
  category = 'category',
  description___id = 'description___id',
  description___parent___id = 'description___parent___id',
  description___parent___parent___id = 'description___parent___parent___id',
  description___parent___parent___children = 'description___parent___parent___children',
  description___parent___children = 'description___parent___children',
  description___parent___children___id = 'description___parent___children___id',
  description___parent___children___children = 'description___parent___children___children',
  description___parent___internal___content = 'description___parent___internal___content',
  description___parent___internal___contentDigest = 'description___parent___internal___contentDigest',
  description___parent___internal___description = 'description___parent___internal___description',
  description___parent___internal___fieldOwners = 'description___parent___internal___fieldOwners',
  description___parent___internal___ignoreType = 'description___parent___internal___ignoreType',
  description___parent___internal___mediaType = 'description___parent___internal___mediaType',
  description___parent___internal___owner = 'description___parent___internal___owner',
  description___parent___internal___type = 'description___parent___internal___type',
  description___children = 'description___children',
  description___children___id = 'description___children___id',
  description___children___parent___id = 'description___children___parent___id',
  description___children___parent___children = 'description___children___parent___children',
  description___children___children = 'description___children___children',
  description___children___children___id = 'description___children___children___id',
  description___children___children___children = 'description___children___children___children',
  description___children___internal___content = 'description___children___internal___content',
  description___children___internal___contentDigest = 'description___children___internal___contentDigest',
  description___children___internal___description = 'description___children___internal___description',
  description___children___internal___fieldOwners = 'description___children___internal___fieldOwners',
  description___children___internal___ignoreType = 'description___children___internal___ignoreType',
  description___children___internal___mediaType = 'description___children___internal___mediaType',
  description___children___internal___owner = 'description___children___internal___owner',
  description___children___internal___type = 'description___children___internal___type',
  description___internal___content = 'description___internal___content',
  description___internal___contentDigest = 'description___internal___contentDigest',
  description___internal___description = 'description___internal___description',
  description___internal___fieldOwners = 'description___internal___fieldOwners',
  description___internal___ignoreType = 'description___internal___ignoreType',
  description___internal___mediaType = 'description___internal___mediaType',
  description___internal___owner = 'description___internal___owner',
  description___internal___type = 'description___internal___type',
  description___description = 'description___description',
  description___sys___type = 'description___sys___type',
  description___childrenMdx = 'description___childrenMdx',
  description___childrenMdx___rawBody = 'description___childrenMdx___rawBody',
  description___childrenMdx___fileAbsolutePath = 'description___childrenMdx___fileAbsolutePath',
  description___childrenMdx___frontmatter___title = 'description___childrenMdx___frontmatter___title',
  description___childrenMdx___frontmatter___order = 'description___childrenMdx___frontmatter___order',
  description___childrenMdx___frontmatter___description = 'description___childrenMdx___frontmatter___description',
  description___childrenMdx___slug = 'description___childrenMdx___slug',
  description___childrenMdx___body = 'description___childrenMdx___body',
  description___childrenMdx___excerpt = 'description___childrenMdx___excerpt',
  description___childrenMdx___headings = 'description___childrenMdx___headings',
  description___childrenMdx___headings___value = 'description___childrenMdx___headings___value',
  description___childrenMdx___headings___depth = 'description___childrenMdx___headings___depth',
  description___childrenMdx___html = 'description___childrenMdx___html',
  description___childrenMdx___mdxAST = 'description___childrenMdx___mdxAST',
  description___childrenMdx___tableOfContents = 'description___childrenMdx___tableOfContents',
  description___childrenMdx___timeToRead = 'description___childrenMdx___timeToRead',
  description___childrenMdx___wordCount___paragraphs = 'description___childrenMdx___wordCount___paragraphs',
  description___childrenMdx___wordCount___sentences = 'description___childrenMdx___wordCount___sentences',
  description___childrenMdx___wordCount___words = 'description___childrenMdx___wordCount___words',
  description___childrenMdx___id = 'description___childrenMdx___id',
  description___childrenMdx___parent___id = 'description___childrenMdx___parent___id',
  description___childrenMdx___parent___children = 'description___childrenMdx___parent___children',
  description___childrenMdx___children = 'description___childrenMdx___children',
  description___childrenMdx___children___id = 'description___childrenMdx___children___id',
  description___childrenMdx___children___children = 'description___childrenMdx___children___children',
  description___childrenMdx___internal___content = 'description___childrenMdx___internal___content',
  description___childrenMdx___internal___contentDigest = 'description___childrenMdx___internal___contentDigest',
  description___childrenMdx___internal___description = 'description___childrenMdx___internal___description',
  description___childrenMdx___internal___fieldOwners = 'description___childrenMdx___internal___fieldOwners',
  description___childrenMdx___internal___ignoreType = 'description___childrenMdx___internal___ignoreType',
  description___childrenMdx___internal___mediaType = 'description___childrenMdx___internal___mediaType',
  description___childrenMdx___internal___owner = 'description___childrenMdx___internal___owner',
  description___childrenMdx___internal___type = 'description___childrenMdx___internal___type',
  description___childMdx___rawBody = 'description___childMdx___rawBody',
  description___childMdx___fileAbsolutePath = 'description___childMdx___fileAbsolutePath',
  description___childMdx___frontmatter___title = 'description___childMdx___frontmatter___title',
  description___childMdx___frontmatter___order = 'description___childMdx___frontmatter___order',
  description___childMdx___frontmatter___description = 'description___childMdx___frontmatter___description',
  description___childMdx___slug = 'description___childMdx___slug',
  description___childMdx___body = 'description___childMdx___body',
  description___childMdx___excerpt = 'description___childMdx___excerpt',
  description___childMdx___headings = 'description___childMdx___headings',
  description___childMdx___headings___value = 'description___childMdx___headings___value',
  description___childMdx___headings___depth = 'description___childMdx___headings___depth',
  description___childMdx___html = 'description___childMdx___html',
  description___childMdx___mdxAST = 'description___childMdx___mdxAST',
  description___childMdx___tableOfContents = 'description___childMdx___tableOfContents',
  description___childMdx___timeToRead = 'description___childMdx___timeToRead',
  description___childMdx___wordCount___paragraphs = 'description___childMdx___wordCount___paragraphs',
  description___childMdx___wordCount___sentences = 'description___childMdx___wordCount___sentences',
  description___childMdx___wordCount___words = 'description___childMdx___wordCount___words',
  description___childMdx___id = 'description___childMdx___id',
  description___childMdx___parent___id = 'description___childMdx___parent___id',
  description___childMdx___parent___children = 'description___childMdx___parent___children',
  description___childMdx___children = 'description___childMdx___children',
  description___childMdx___children___id = 'description___childMdx___children___id',
  description___childMdx___children___children = 'description___childMdx___children___children',
  description___childMdx___internal___content = 'description___childMdx___internal___content',
  description___childMdx___internal___contentDigest = 'description___childMdx___internal___contentDigest',
  description___childMdx___internal___description = 'description___childMdx___internal___description',
  description___childMdx___internal___fieldOwners = 'description___childMdx___internal___fieldOwners',
  description___childMdx___internal___ignoreType = 'description___childMdx___internal___ignoreType',
  description___childMdx___internal___mediaType = 'description___childMdx___internal___mediaType',
  description___childMdx___internal___owner = 'description___childMdx___internal___owner',
  description___childMdx___internal___type = 'description___childMdx___internal___type',
  private = 'private',
  bodyText___raw = 'bodyText___raw',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  contentfulparent___contentful_id = 'contentfulparent___contentful_id',
  contentfulparent___id = 'contentfulparent___id',
  contentfulparent___node_locale = 'contentfulparent___node_locale',
  contentfulparent___title = 'contentfulparent___title',
  contentfulparent___iconGlyphName = 'contentfulparent___iconGlyphName',
  contentfulparent___slug = 'contentfulparent___slug',
  contentfulparent___category = 'contentfulparent___category',
  contentfulparent___description___id = 'contentfulparent___description___id',
  contentfulparent___description___parent___id = 'contentfulparent___description___parent___id',
  contentfulparent___description___parent___children = 'contentfulparent___description___parent___children',
  contentfulparent___description___children = 'contentfulparent___description___children',
  contentfulparent___description___children___id = 'contentfulparent___description___children___id',
  contentfulparent___description___children___children = 'contentfulparent___description___children___children',
  contentfulparent___description___internal___content = 'contentfulparent___description___internal___content',
  contentfulparent___description___internal___contentDigest = 'contentfulparent___description___internal___contentDigest',
  contentfulparent___description___internal___description = 'contentfulparent___description___internal___description',
  contentfulparent___description___internal___fieldOwners = 'contentfulparent___description___internal___fieldOwners',
  contentfulparent___description___internal___ignoreType = 'contentfulparent___description___internal___ignoreType',
  contentfulparent___description___internal___mediaType = 'contentfulparent___description___internal___mediaType',
  contentfulparent___description___internal___owner = 'contentfulparent___description___internal___owner',
  contentfulparent___description___internal___type = 'contentfulparent___description___internal___type',
  contentfulparent___description___description = 'contentfulparent___description___description',
  contentfulparent___description___sys___type = 'contentfulparent___description___sys___type',
  contentfulparent___description___childrenMdx = 'contentfulparent___description___childrenMdx',
  contentfulparent___description___childrenMdx___rawBody = 'contentfulparent___description___childrenMdx___rawBody',
  contentfulparent___description___childrenMdx___fileAbsolutePath = 'contentfulparent___description___childrenMdx___fileAbsolutePath',
  contentfulparent___description___childrenMdx___slug = 'contentfulparent___description___childrenMdx___slug',
  contentfulparent___description___childrenMdx___body = 'contentfulparent___description___childrenMdx___body',
  contentfulparent___description___childrenMdx___excerpt = 'contentfulparent___description___childrenMdx___excerpt',
  contentfulparent___description___childrenMdx___headings = 'contentfulparent___description___childrenMdx___headings',
  contentfulparent___description___childrenMdx___html = 'contentfulparent___description___childrenMdx___html',
  contentfulparent___description___childrenMdx___mdxAST = 'contentfulparent___description___childrenMdx___mdxAST',
  contentfulparent___description___childrenMdx___tableOfContents = 'contentfulparent___description___childrenMdx___tableOfContents',
  contentfulparent___description___childrenMdx___timeToRead = 'contentfulparent___description___childrenMdx___timeToRead',
  contentfulparent___description___childrenMdx___id = 'contentfulparent___description___childrenMdx___id',
  contentfulparent___description___childrenMdx___children = 'contentfulparent___description___childrenMdx___children',
  contentfulparent___description___childMdx___rawBody = 'contentfulparent___description___childMdx___rawBody',
  contentfulparent___description___childMdx___fileAbsolutePath = 'contentfulparent___description___childMdx___fileAbsolutePath',
  contentfulparent___description___childMdx___slug = 'contentfulparent___description___childMdx___slug',
  contentfulparent___description___childMdx___body = 'contentfulparent___description___childMdx___body',
  contentfulparent___description___childMdx___excerpt = 'contentfulparent___description___childMdx___excerpt',
  contentfulparent___description___childMdx___headings = 'contentfulparent___description___childMdx___headings',
  contentfulparent___description___childMdx___html = 'contentfulparent___description___childMdx___html',
  contentfulparent___description___childMdx___mdxAST = 'contentfulparent___description___childMdx___mdxAST',
  contentfulparent___description___childMdx___tableOfContents = 'contentfulparent___description___childMdx___tableOfContents',
  contentfulparent___description___childMdx___timeToRead = 'contentfulparent___description___childMdx___timeToRead',
  contentfulparent___description___childMdx___id = 'contentfulparent___description___childMdx___id',
  contentfulparent___description___childMdx___children = 'contentfulparent___description___childMdx___children',
  contentfulparent___private = 'contentfulparent___private',
  contentfulparent___bodyText___raw = 'contentfulparent___bodyText___raw',
  contentfulparent___spaceId = 'contentfulparent___spaceId',
  contentfulparent___createdAt = 'contentfulparent___createdAt',
  contentfulparent___updatedAt = 'contentfulparent___updatedAt',
  contentfulparent___sys___type = 'contentfulparent___sys___type',
  contentfulparent___sys___revision = 'contentfulparent___sys___revision',
  contentfulparent___contentfulparent___contentful_id = 'contentfulparent___contentfulparent___contentful_id',
  contentfulparent___contentfulparent___id = 'contentfulparent___contentfulparent___id',
  contentfulparent___contentfulparent___node_locale = 'contentfulparent___contentfulparent___node_locale',
  contentfulparent___contentfulparent___title = 'contentfulparent___contentfulparent___title',
  contentfulparent___contentfulparent___iconGlyphName = 'contentfulparent___contentfulparent___iconGlyphName',
  contentfulparent___contentfulparent___slug = 'contentfulparent___contentfulparent___slug',
  contentfulparent___contentfulparent___category = 'contentfulparent___contentfulparent___category',
  contentfulparent___contentfulparent___description___id = 'contentfulparent___contentfulparent___description___id',
  contentfulparent___contentfulparent___description___children = 'contentfulparent___contentfulparent___description___children',
  contentfulparent___contentfulparent___description___description = 'contentfulparent___contentfulparent___description___description',
  contentfulparent___contentfulparent___description___childrenMdx = 'contentfulparent___contentfulparent___description___childrenMdx',
  contentfulparent___contentfulparent___private = 'contentfulparent___contentfulparent___private',
  contentfulparent___contentfulparent___bodyText___raw = 'contentfulparent___contentfulparent___bodyText___raw',
  contentfulparent___contentfulparent___spaceId = 'contentfulparent___contentfulparent___spaceId',
  contentfulparent___contentfulparent___createdAt = 'contentfulparent___contentfulparent___createdAt',
  contentfulparent___contentfulparent___updatedAt = 'contentfulparent___contentfulparent___updatedAt',
  contentfulparent___contentfulparent___sys___type = 'contentfulparent___contentfulparent___sys___type',
  contentfulparent___contentfulparent___sys___revision = 'contentfulparent___contentfulparent___sys___revision',
  contentfulparent___contentfulparent___contentfulparent___contentful_id = 'contentfulparent___contentfulparent___contentfulparent___contentful_id',
  contentfulparent___contentfulparent___contentfulparent___id = 'contentfulparent___contentfulparent___contentfulparent___id',
  contentfulparent___contentfulparent___contentfulparent___node_locale = 'contentfulparent___contentfulparent___contentfulparent___node_locale',
  contentfulparent___contentfulparent___contentfulparent___title = 'contentfulparent___contentfulparent___contentfulparent___title',
  contentfulparent___contentfulparent___contentfulparent___iconGlyphName = 'contentfulparent___contentfulparent___contentfulparent___iconGlyphName',
  contentfulparent___contentfulparent___contentfulparent___slug = 'contentfulparent___contentfulparent___contentfulparent___slug',
  contentfulparent___contentfulparent___contentfulparent___category = 'contentfulparent___contentfulparent___contentfulparent___category',
  contentfulparent___contentfulparent___contentfulparent___private = 'contentfulparent___contentfulparent___contentfulparent___private',
  contentfulparent___contentfulparent___contentfulparent___spaceId = 'contentfulparent___contentfulparent___contentfulparent___spaceId',
  contentfulparent___contentfulparent___contentfulparent___createdAt = 'contentfulparent___contentfulparent___contentfulparent___createdAt',
  contentfulparent___contentfulparent___contentfulparent___updatedAt = 'contentfulparent___contentfulparent___contentfulparent___updatedAt',
  contentfulparent___contentfulparent___contentfulparent___guideline = 'contentfulparent___contentfulparent___contentfulparent___guideline',
  contentfulparent___contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___contentfulparent___contentfulparent___children = 'contentfulparent___contentfulparent___contentfulparent___children',
  contentfulparent___contentfulparent___guideline = 'contentfulparent___contentfulparent___guideline',
  contentfulparent___contentfulparent___guideline___contentful_id = 'contentfulparent___contentfulparent___guideline___contentful_id',
  contentfulparent___contentfulparent___guideline___id = 'contentfulparent___contentfulparent___guideline___id',
  contentfulparent___contentfulparent___guideline___node_locale = 'contentfulparent___contentfulparent___guideline___node_locale',
  contentfulparent___contentfulparent___guideline___title = 'contentfulparent___contentfulparent___guideline___title',
  contentfulparent___contentfulparent___guideline___iconGlyphName = 'contentfulparent___contentfulparent___guideline___iconGlyphName',
  contentfulparent___contentfulparent___guideline___slug = 'contentfulparent___contentfulparent___guideline___slug',
  contentfulparent___contentfulparent___guideline___category = 'contentfulparent___contentfulparent___guideline___category',
  contentfulparent___contentfulparent___guideline___private = 'contentfulparent___contentfulparent___guideline___private',
  contentfulparent___contentfulparent___guideline___spaceId = 'contentfulparent___contentfulparent___guideline___spaceId',
  contentfulparent___contentfulparent___guideline___createdAt = 'contentfulparent___contentfulparent___guideline___createdAt',
  contentfulparent___contentfulparent___guideline___updatedAt = 'contentfulparent___contentfulparent___guideline___updatedAt',
  contentfulparent___contentfulparent___guideline___guideline = 'contentfulparent___contentfulparent___guideline___guideline',
  contentfulparent___contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___contentfulparent___guideline___children = 'contentfulparent___contentfulparent___guideline___children',
  contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___contentfulparent___parent___id = 'contentfulparent___contentfulparent___parent___id',
  contentfulparent___contentfulparent___parent___children = 'contentfulparent___contentfulparent___parent___children',
  contentfulparent___contentfulparent___children = 'contentfulparent___contentfulparent___children',
  contentfulparent___contentfulparent___children___id = 'contentfulparent___contentfulparent___children___id',
  contentfulparent___contentfulparent___children___children = 'contentfulparent___contentfulparent___children___children',
  contentfulparent___contentfulparent___internal___content = 'contentfulparent___contentfulparent___internal___content',
  contentfulparent___contentfulparent___internal___contentDigest = 'contentfulparent___contentfulparent___internal___contentDigest',
  contentfulparent___contentfulparent___internal___description = 'contentfulparent___contentfulparent___internal___description',
  contentfulparent___contentfulparent___internal___fieldOwners = 'contentfulparent___contentfulparent___internal___fieldOwners',
  contentfulparent___contentfulparent___internal___ignoreType = 'contentfulparent___contentfulparent___internal___ignoreType',
  contentfulparent___contentfulparent___internal___mediaType = 'contentfulparent___contentfulparent___internal___mediaType',
  contentfulparent___contentfulparent___internal___owner = 'contentfulparent___contentfulparent___internal___owner',
  contentfulparent___contentfulparent___internal___type = 'contentfulparent___contentfulparent___internal___type',
  contentfulparent___guideline = 'contentfulparent___guideline',
  contentfulparent___guideline___contentful_id = 'contentfulparent___guideline___contentful_id',
  contentfulparent___guideline___id = 'contentfulparent___guideline___id',
  contentfulparent___guideline___node_locale = 'contentfulparent___guideline___node_locale',
  contentfulparent___guideline___title = 'contentfulparent___guideline___title',
  contentfulparent___guideline___iconGlyphName = 'contentfulparent___guideline___iconGlyphName',
  contentfulparent___guideline___slug = 'contentfulparent___guideline___slug',
  contentfulparent___guideline___category = 'contentfulparent___guideline___category',
  contentfulparent___guideline___description___id = 'contentfulparent___guideline___description___id',
  contentfulparent___guideline___description___children = 'contentfulparent___guideline___description___children',
  contentfulparent___guideline___description___description = 'contentfulparent___guideline___description___description',
  contentfulparent___guideline___description___childrenMdx = 'contentfulparent___guideline___description___childrenMdx',
  contentfulparent___guideline___private = 'contentfulparent___guideline___private',
  contentfulparent___guideline___bodyText___raw = 'contentfulparent___guideline___bodyText___raw',
  contentfulparent___guideline___spaceId = 'contentfulparent___guideline___spaceId',
  contentfulparent___guideline___createdAt = 'contentfulparent___guideline___createdAt',
  contentfulparent___guideline___updatedAt = 'contentfulparent___guideline___updatedAt',
  contentfulparent___guideline___sys___type = 'contentfulparent___guideline___sys___type',
  contentfulparent___guideline___sys___revision = 'contentfulparent___guideline___sys___revision',
  contentfulparent___guideline___contentfulparent___contentful_id = 'contentfulparent___guideline___contentfulparent___contentful_id',
  contentfulparent___guideline___contentfulparent___id = 'contentfulparent___guideline___contentfulparent___id',
  contentfulparent___guideline___contentfulparent___node_locale = 'contentfulparent___guideline___contentfulparent___node_locale',
  contentfulparent___guideline___contentfulparent___title = 'contentfulparent___guideline___contentfulparent___title',
  contentfulparent___guideline___contentfulparent___iconGlyphName = 'contentfulparent___guideline___contentfulparent___iconGlyphName',
  contentfulparent___guideline___contentfulparent___slug = 'contentfulparent___guideline___contentfulparent___slug',
  contentfulparent___guideline___contentfulparent___category = 'contentfulparent___guideline___contentfulparent___category',
  contentfulparent___guideline___contentfulparent___private = 'contentfulparent___guideline___contentfulparent___private',
  contentfulparent___guideline___contentfulparent___spaceId = 'contentfulparent___guideline___contentfulparent___spaceId',
  contentfulparent___guideline___contentfulparent___createdAt = 'contentfulparent___guideline___contentfulparent___createdAt',
  contentfulparent___guideline___contentfulparent___updatedAt = 'contentfulparent___guideline___contentfulparent___updatedAt',
  contentfulparent___guideline___contentfulparent___guideline = 'contentfulparent___guideline___contentfulparent___guideline',
  contentfulparent___guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___guideline___contentfulparent___children = 'contentfulparent___guideline___contentfulparent___children',
  contentfulparent___guideline___guideline = 'contentfulparent___guideline___guideline',
  contentfulparent___guideline___guideline___contentful_id = 'contentfulparent___guideline___guideline___contentful_id',
  contentfulparent___guideline___guideline___id = 'contentfulparent___guideline___guideline___id',
  contentfulparent___guideline___guideline___node_locale = 'contentfulparent___guideline___guideline___node_locale',
  contentfulparent___guideline___guideline___title = 'contentfulparent___guideline___guideline___title',
  contentfulparent___guideline___guideline___iconGlyphName = 'contentfulparent___guideline___guideline___iconGlyphName',
  contentfulparent___guideline___guideline___slug = 'contentfulparent___guideline___guideline___slug',
  contentfulparent___guideline___guideline___category = 'contentfulparent___guideline___guideline___category',
  contentfulparent___guideline___guideline___private = 'contentfulparent___guideline___guideline___private',
  contentfulparent___guideline___guideline___spaceId = 'contentfulparent___guideline___guideline___spaceId',
  contentfulparent___guideline___guideline___createdAt = 'contentfulparent___guideline___guideline___createdAt',
  contentfulparent___guideline___guideline___updatedAt = 'contentfulparent___guideline___guideline___updatedAt',
  contentfulparent___guideline___guideline___guideline = 'contentfulparent___guideline___guideline___guideline',
  contentfulparent___guideline___guideline___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___guideline___guideline___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___guideline___guideline___children = 'contentfulparent___guideline___guideline___children',
  contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___guideline___parent___id = 'contentfulparent___guideline___parent___id',
  contentfulparent___guideline___parent___children = 'contentfulparent___guideline___parent___children',
  contentfulparent___guideline___children = 'contentfulparent___guideline___children',
  contentfulparent___guideline___children___id = 'contentfulparent___guideline___children___id',
  contentfulparent___guideline___children___children = 'contentfulparent___guideline___children___children',
  contentfulparent___guideline___internal___content = 'contentfulparent___guideline___internal___content',
  contentfulparent___guideline___internal___contentDigest = 'contentfulparent___guideline___internal___contentDigest',
  contentfulparent___guideline___internal___description = 'contentfulparent___guideline___internal___description',
  contentfulparent___guideline___internal___fieldOwners = 'contentfulparent___guideline___internal___fieldOwners',
  contentfulparent___guideline___internal___ignoreType = 'contentfulparent___guideline___internal___ignoreType',
  contentfulparent___guideline___internal___mediaType = 'contentfulparent___guideline___internal___mediaType',
  contentfulparent___guideline___internal___owner = 'contentfulparent___guideline___internal___owner',
  contentfulparent___guideline___internal___type = 'contentfulparent___guideline___internal___type',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___parent___id = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___parent___id',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___parent___children = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___parent___children',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children___id = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children___id',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children___children = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children___children',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___content = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___content',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___description = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___description',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___mediaType = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___mediaType',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___owner = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___owner',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___type = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___internal___type',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___sys___type = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___sys___type',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___slug = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___slug',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___body = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___body',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___headings = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___headings',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___html = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___html',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___id = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___id',
  contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___children = 'contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childMdx___children',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___id = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___id',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___parent___id = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___parent___id',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___parent___children = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___parent___children',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___children = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___children',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___children___id = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___children___id',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___children___children = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___children___children',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___content = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___content',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___description = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___description',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___mediaType = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___mediaType',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___owner = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___owner',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___type = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___internal___type',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___description = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___description',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___sys___type = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___sys___type',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___slug = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___slug',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___body = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___body',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___headings = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___headings',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___html = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___html',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___id = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___id',
  contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___children = 'contentfulparent___childContentfulGuidelineDescriptionTextNode___childMdx___children',
  contentfulparent___parent___id = 'contentfulparent___parent___id',
  contentfulparent___parent___parent___id = 'contentfulparent___parent___parent___id',
  contentfulparent___parent___parent___children = 'contentfulparent___parent___parent___children',
  contentfulparent___parent___children = 'contentfulparent___parent___children',
  contentfulparent___parent___children___id = 'contentfulparent___parent___children___id',
  contentfulparent___parent___children___children = 'contentfulparent___parent___children___children',
  contentfulparent___parent___internal___content = 'contentfulparent___parent___internal___content',
  contentfulparent___parent___internal___contentDigest = 'contentfulparent___parent___internal___contentDigest',
  contentfulparent___parent___internal___description = 'contentfulparent___parent___internal___description',
  contentfulparent___parent___internal___fieldOwners = 'contentfulparent___parent___internal___fieldOwners',
  contentfulparent___parent___internal___ignoreType = 'contentfulparent___parent___internal___ignoreType',
  contentfulparent___parent___internal___mediaType = 'contentfulparent___parent___internal___mediaType',
  contentfulparent___parent___internal___owner = 'contentfulparent___parent___internal___owner',
  contentfulparent___parent___internal___type = 'contentfulparent___parent___internal___type',
  contentfulparent___children = 'contentfulparent___children',
  contentfulparent___children___id = 'contentfulparent___children___id',
  contentfulparent___children___parent___id = 'contentfulparent___children___parent___id',
  contentfulparent___children___parent___children = 'contentfulparent___children___parent___children',
  contentfulparent___children___children = 'contentfulparent___children___children',
  contentfulparent___children___children___id = 'contentfulparent___children___children___id',
  contentfulparent___children___children___children = 'contentfulparent___children___children___children',
  contentfulparent___children___internal___content = 'contentfulparent___children___internal___content',
  contentfulparent___children___internal___contentDigest = 'contentfulparent___children___internal___contentDigest',
  contentfulparent___children___internal___description = 'contentfulparent___children___internal___description',
  contentfulparent___children___internal___fieldOwners = 'contentfulparent___children___internal___fieldOwners',
  contentfulparent___children___internal___ignoreType = 'contentfulparent___children___internal___ignoreType',
  contentfulparent___children___internal___mediaType = 'contentfulparent___children___internal___mediaType',
  contentfulparent___children___internal___owner = 'contentfulparent___children___internal___owner',
  contentfulparent___children___internal___type = 'contentfulparent___children___internal___type',
  contentfulparent___internal___content = 'contentfulparent___internal___content',
  contentfulparent___internal___contentDigest = 'contentfulparent___internal___contentDigest',
  contentfulparent___internal___description = 'contentfulparent___internal___description',
  contentfulparent___internal___fieldOwners = 'contentfulparent___internal___fieldOwners',
  contentfulparent___internal___ignoreType = 'contentfulparent___internal___ignoreType',
  contentfulparent___internal___mediaType = 'contentfulparent___internal___mediaType',
  contentfulparent___internal___owner = 'contentfulparent___internal___owner',
  contentfulparent___internal___type = 'contentfulparent___internal___type',
  guideline = 'guideline',
  guideline___contentful_id = 'guideline___contentful_id',
  guideline___id = 'guideline___id',
  guideline___node_locale = 'guideline___node_locale',
  guideline___title = 'guideline___title',
  guideline___iconGlyphName = 'guideline___iconGlyphName',
  guideline___slug = 'guideline___slug',
  guideline___category = 'guideline___category',
  guideline___description___id = 'guideline___description___id',
  guideline___description___parent___id = 'guideline___description___parent___id',
  guideline___description___parent___children = 'guideline___description___parent___children',
  guideline___description___children = 'guideline___description___children',
  guideline___description___children___id = 'guideline___description___children___id',
  guideline___description___children___children = 'guideline___description___children___children',
  guideline___description___internal___content = 'guideline___description___internal___content',
  guideline___description___internal___contentDigest = 'guideline___description___internal___contentDigest',
  guideline___description___internal___description = 'guideline___description___internal___description',
  guideline___description___internal___fieldOwners = 'guideline___description___internal___fieldOwners',
  guideline___description___internal___ignoreType = 'guideline___description___internal___ignoreType',
  guideline___description___internal___mediaType = 'guideline___description___internal___mediaType',
  guideline___description___internal___owner = 'guideline___description___internal___owner',
  guideline___description___internal___type = 'guideline___description___internal___type',
  guideline___description___description = 'guideline___description___description',
  guideline___description___sys___type = 'guideline___description___sys___type',
  guideline___description___childrenMdx = 'guideline___description___childrenMdx',
  guideline___description___childrenMdx___rawBody = 'guideline___description___childrenMdx___rawBody',
  guideline___description___childrenMdx___fileAbsolutePath = 'guideline___description___childrenMdx___fileAbsolutePath',
  guideline___description___childrenMdx___slug = 'guideline___description___childrenMdx___slug',
  guideline___description___childrenMdx___body = 'guideline___description___childrenMdx___body',
  guideline___description___childrenMdx___excerpt = 'guideline___description___childrenMdx___excerpt',
  guideline___description___childrenMdx___headings = 'guideline___description___childrenMdx___headings',
  guideline___description___childrenMdx___html = 'guideline___description___childrenMdx___html',
  guideline___description___childrenMdx___mdxAST = 'guideline___description___childrenMdx___mdxAST',
  guideline___description___childrenMdx___tableOfContents = 'guideline___description___childrenMdx___tableOfContents',
  guideline___description___childrenMdx___timeToRead = 'guideline___description___childrenMdx___timeToRead',
  guideline___description___childrenMdx___id = 'guideline___description___childrenMdx___id',
  guideline___description___childrenMdx___children = 'guideline___description___childrenMdx___children',
  guideline___description___childMdx___rawBody = 'guideline___description___childMdx___rawBody',
  guideline___description___childMdx___fileAbsolutePath = 'guideline___description___childMdx___fileAbsolutePath',
  guideline___description___childMdx___slug = 'guideline___description___childMdx___slug',
  guideline___description___childMdx___body = 'guideline___description___childMdx___body',
  guideline___description___childMdx___excerpt = 'guideline___description___childMdx___excerpt',
  guideline___description___childMdx___headings = 'guideline___description___childMdx___headings',
  guideline___description___childMdx___html = 'guideline___description___childMdx___html',
  guideline___description___childMdx___mdxAST = 'guideline___description___childMdx___mdxAST',
  guideline___description___childMdx___tableOfContents = 'guideline___description___childMdx___tableOfContents',
  guideline___description___childMdx___timeToRead = 'guideline___description___childMdx___timeToRead',
  guideline___description___childMdx___id = 'guideline___description___childMdx___id',
  guideline___description___childMdx___children = 'guideline___description___childMdx___children',
  guideline___private = 'guideline___private',
  guideline___bodyText___raw = 'guideline___bodyText___raw',
  guideline___spaceId = 'guideline___spaceId',
  guideline___createdAt = 'guideline___createdAt',
  guideline___updatedAt = 'guideline___updatedAt',
  guideline___sys___type = 'guideline___sys___type',
  guideline___sys___revision = 'guideline___sys___revision',
  guideline___contentfulparent___contentful_id = 'guideline___contentfulparent___contentful_id',
  guideline___contentfulparent___id = 'guideline___contentfulparent___id',
  guideline___contentfulparent___node_locale = 'guideline___contentfulparent___node_locale',
  guideline___contentfulparent___title = 'guideline___contentfulparent___title',
  guideline___contentfulparent___iconGlyphName = 'guideline___contentfulparent___iconGlyphName',
  guideline___contentfulparent___slug = 'guideline___contentfulparent___slug',
  guideline___contentfulparent___category = 'guideline___contentfulparent___category',
  guideline___contentfulparent___description___id = 'guideline___contentfulparent___description___id',
  guideline___contentfulparent___description___children = 'guideline___contentfulparent___description___children',
  guideline___contentfulparent___description___description = 'guideline___contentfulparent___description___description',
  guideline___contentfulparent___description___childrenMdx = 'guideline___contentfulparent___description___childrenMdx',
  guideline___contentfulparent___private = 'guideline___contentfulparent___private',
  guideline___contentfulparent___bodyText___raw = 'guideline___contentfulparent___bodyText___raw',
  guideline___contentfulparent___spaceId = 'guideline___contentfulparent___spaceId',
  guideline___contentfulparent___createdAt = 'guideline___contentfulparent___createdAt',
  guideline___contentfulparent___updatedAt = 'guideline___contentfulparent___updatedAt',
  guideline___contentfulparent___sys___type = 'guideline___contentfulparent___sys___type',
  guideline___contentfulparent___sys___revision = 'guideline___contentfulparent___sys___revision',
  guideline___contentfulparent___contentfulparent___contentful_id = 'guideline___contentfulparent___contentfulparent___contentful_id',
  guideline___contentfulparent___contentfulparent___id = 'guideline___contentfulparent___contentfulparent___id',
  guideline___contentfulparent___contentfulparent___node_locale = 'guideline___contentfulparent___contentfulparent___node_locale',
  guideline___contentfulparent___contentfulparent___title = 'guideline___contentfulparent___contentfulparent___title',
  guideline___contentfulparent___contentfulparent___iconGlyphName = 'guideline___contentfulparent___contentfulparent___iconGlyphName',
  guideline___contentfulparent___contentfulparent___slug = 'guideline___contentfulparent___contentfulparent___slug',
  guideline___contentfulparent___contentfulparent___category = 'guideline___contentfulparent___contentfulparent___category',
  guideline___contentfulparent___contentfulparent___private = 'guideline___contentfulparent___contentfulparent___private',
  guideline___contentfulparent___contentfulparent___spaceId = 'guideline___contentfulparent___contentfulparent___spaceId',
  guideline___contentfulparent___contentfulparent___createdAt = 'guideline___contentfulparent___contentfulparent___createdAt',
  guideline___contentfulparent___contentfulparent___updatedAt = 'guideline___contentfulparent___contentfulparent___updatedAt',
  guideline___contentfulparent___contentfulparent___guideline = 'guideline___contentfulparent___contentfulparent___guideline',
  guideline___contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'guideline___contentfulparent___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  guideline___contentfulparent___contentfulparent___children = 'guideline___contentfulparent___contentfulparent___children',
  guideline___contentfulparent___guideline = 'guideline___contentfulparent___guideline',
  guideline___contentfulparent___guideline___contentful_id = 'guideline___contentfulparent___guideline___contentful_id',
  guideline___contentfulparent___guideline___id = 'guideline___contentfulparent___guideline___id',
  guideline___contentfulparent___guideline___node_locale = 'guideline___contentfulparent___guideline___node_locale',
  guideline___contentfulparent___guideline___title = 'guideline___contentfulparent___guideline___title',
  guideline___contentfulparent___guideline___iconGlyphName = 'guideline___contentfulparent___guideline___iconGlyphName',
  guideline___contentfulparent___guideline___slug = 'guideline___contentfulparent___guideline___slug',
  guideline___contentfulparent___guideline___category = 'guideline___contentfulparent___guideline___category',
  guideline___contentfulparent___guideline___private = 'guideline___contentfulparent___guideline___private',
  guideline___contentfulparent___guideline___spaceId = 'guideline___contentfulparent___guideline___spaceId',
  guideline___contentfulparent___guideline___createdAt = 'guideline___contentfulparent___guideline___createdAt',
  guideline___contentfulparent___guideline___updatedAt = 'guideline___contentfulparent___guideline___updatedAt',
  guideline___contentfulparent___guideline___guideline = 'guideline___contentfulparent___guideline___guideline',
  guideline___contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode = 'guideline___contentfulparent___guideline___childrenContentfulGuidelineDescriptionTextNode',
  guideline___contentfulparent___guideline___children = 'guideline___contentfulparent___guideline___children',
  guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id = 'guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___id',
  guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children = 'guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___children',
  guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description = 'guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___description',
  guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___id = 'guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___id',
  guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___children = 'guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___children',
  guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___description = 'guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___description',
  guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___contentfulparent___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___contentfulparent___parent___id = 'guideline___contentfulparent___parent___id',
  guideline___contentfulparent___parent___children = 'guideline___contentfulparent___parent___children',
  guideline___contentfulparent___children = 'guideline___contentfulparent___children',
  guideline___contentfulparent___children___id = 'guideline___contentfulparent___children___id',
  guideline___contentfulparent___children___children = 'guideline___contentfulparent___children___children',
  guideline___contentfulparent___internal___content = 'guideline___contentfulparent___internal___content',
  guideline___contentfulparent___internal___contentDigest = 'guideline___contentfulparent___internal___contentDigest',
  guideline___contentfulparent___internal___description = 'guideline___contentfulparent___internal___description',
  guideline___contentfulparent___internal___fieldOwners = 'guideline___contentfulparent___internal___fieldOwners',
  guideline___contentfulparent___internal___ignoreType = 'guideline___contentfulparent___internal___ignoreType',
  guideline___contentfulparent___internal___mediaType = 'guideline___contentfulparent___internal___mediaType',
  guideline___contentfulparent___internal___owner = 'guideline___contentfulparent___internal___owner',
  guideline___contentfulparent___internal___type = 'guideline___contentfulparent___internal___type',
  guideline___guideline = 'guideline___guideline',
  guideline___guideline___contentful_id = 'guideline___guideline___contentful_id',
  guideline___guideline___id = 'guideline___guideline___id',
  guideline___guideline___node_locale = 'guideline___guideline___node_locale',
  guideline___guideline___title = 'guideline___guideline___title',
  guideline___guideline___iconGlyphName = 'guideline___guideline___iconGlyphName',
  guideline___guideline___slug = 'guideline___guideline___slug',
  guideline___guideline___category = 'guideline___guideline___category',
  guideline___guideline___description___id = 'guideline___guideline___description___id',
  guideline___guideline___description___children = 'guideline___guideline___description___children',
  guideline___guideline___description___description = 'guideline___guideline___description___description',
  guideline___guideline___description___childrenMdx = 'guideline___guideline___description___childrenMdx',
  guideline___guideline___private = 'guideline___guideline___private',
  guideline___guideline___bodyText___raw = 'guideline___guideline___bodyText___raw',
  guideline___guideline___spaceId = 'guideline___guideline___spaceId',
  guideline___guideline___createdAt = 'guideline___guideline___createdAt',
  guideline___guideline___updatedAt = 'guideline___guideline___updatedAt',
  guideline___guideline___sys___type = 'guideline___guideline___sys___type',
  guideline___guideline___sys___revision = 'guideline___guideline___sys___revision',
  guideline___guideline___contentfulparent___contentful_id = 'guideline___guideline___contentfulparent___contentful_id',
  guideline___guideline___contentfulparent___id = 'guideline___guideline___contentfulparent___id',
  guideline___guideline___contentfulparent___node_locale = 'guideline___guideline___contentfulparent___node_locale',
  guideline___guideline___contentfulparent___title = 'guideline___guideline___contentfulparent___title',
  guideline___guideline___contentfulparent___iconGlyphName = 'guideline___guideline___contentfulparent___iconGlyphName',
  guideline___guideline___contentfulparent___slug = 'guideline___guideline___contentfulparent___slug',
  guideline___guideline___contentfulparent___category = 'guideline___guideline___contentfulparent___category',
  guideline___guideline___contentfulparent___private = 'guideline___guideline___contentfulparent___private',
  guideline___guideline___contentfulparent___spaceId = 'guideline___guideline___contentfulparent___spaceId',
  guideline___guideline___contentfulparent___createdAt = 'guideline___guideline___contentfulparent___createdAt',
  guideline___guideline___contentfulparent___updatedAt = 'guideline___guideline___contentfulparent___updatedAt',
  guideline___guideline___contentfulparent___guideline = 'guideline___guideline___contentfulparent___guideline',
  guideline___guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode = 'guideline___guideline___contentfulparent___childrenContentfulGuidelineDescriptionTextNode',
  guideline___guideline___contentfulparent___children = 'guideline___guideline___contentfulparent___children',
  guideline___guideline___guideline = 'guideline___guideline___guideline',
  guideline___guideline___guideline___contentful_id = 'guideline___guideline___guideline___contentful_id',
  guideline___guideline___guideline___id = 'guideline___guideline___guideline___id',
  guideline___guideline___guideline___node_locale = 'guideline___guideline___guideline___node_locale',
  guideline___guideline___guideline___title = 'guideline___guideline___guideline___title',
  guideline___guideline___guideline___iconGlyphName = 'guideline___guideline___guideline___iconGlyphName',
  guideline___guideline___guideline___slug = 'guideline___guideline___guideline___slug',
  guideline___guideline___guideline___category = 'guideline___guideline___guideline___category',
  guideline___guideline___guideline___private = 'guideline___guideline___guideline___private',
  guideline___guideline___guideline___spaceId = 'guideline___guideline___guideline___spaceId',
  guideline___guideline___guideline___createdAt = 'guideline___guideline___guideline___createdAt',
  guideline___guideline___guideline___updatedAt = 'guideline___guideline___guideline___updatedAt',
  guideline___guideline___guideline___guideline = 'guideline___guideline___guideline___guideline',
  guideline___guideline___guideline___childrenContentfulGuidelineDescriptionTextNode = 'guideline___guideline___guideline___childrenContentfulGuidelineDescriptionTextNode',
  guideline___guideline___guideline___children = 'guideline___guideline___guideline___children',
  guideline___guideline___childrenContentfulGuidelineDescriptionTextNode = 'guideline___guideline___childrenContentfulGuidelineDescriptionTextNode',
  guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___id = 'guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___id',
  guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___children = 'guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___children',
  guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___description = 'guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___description',
  guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___guideline___childContentfulGuidelineDescriptionTextNode___id = 'guideline___guideline___childContentfulGuidelineDescriptionTextNode___id',
  guideline___guideline___childContentfulGuidelineDescriptionTextNode___children = 'guideline___guideline___childContentfulGuidelineDescriptionTextNode___children',
  guideline___guideline___childContentfulGuidelineDescriptionTextNode___description = 'guideline___guideline___childContentfulGuidelineDescriptionTextNode___description',
  guideline___guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___guideline___parent___id = 'guideline___guideline___parent___id',
  guideline___guideline___parent___children = 'guideline___guideline___parent___children',
  guideline___guideline___children = 'guideline___guideline___children',
  guideline___guideline___children___id = 'guideline___guideline___children___id',
  guideline___guideline___children___children = 'guideline___guideline___children___children',
  guideline___guideline___internal___content = 'guideline___guideline___internal___content',
  guideline___guideline___internal___contentDigest = 'guideline___guideline___internal___contentDigest',
  guideline___guideline___internal___description = 'guideline___guideline___internal___description',
  guideline___guideline___internal___fieldOwners = 'guideline___guideline___internal___fieldOwners',
  guideline___guideline___internal___ignoreType = 'guideline___guideline___internal___ignoreType',
  guideline___guideline___internal___mediaType = 'guideline___guideline___internal___mediaType',
  guideline___guideline___internal___owner = 'guideline___guideline___internal___owner',
  guideline___guideline___internal___type = 'guideline___guideline___internal___type',
  guideline___childrenContentfulGuidelineDescriptionTextNode = 'guideline___childrenContentfulGuidelineDescriptionTextNode',
  guideline___childrenContentfulGuidelineDescriptionTextNode___id = 'guideline___childrenContentfulGuidelineDescriptionTextNode___id',
  guideline___childrenContentfulGuidelineDescriptionTextNode___parent___id = 'guideline___childrenContentfulGuidelineDescriptionTextNode___parent___id',
  guideline___childrenContentfulGuidelineDescriptionTextNode___parent___children = 'guideline___childrenContentfulGuidelineDescriptionTextNode___parent___children',
  guideline___childrenContentfulGuidelineDescriptionTextNode___children = 'guideline___childrenContentfulGuidelineDescriptionTextNode___children',
  guideline___childrenContentfulGuidelineDescriptionTextNode___children___id = 'guideline___childrenContentfulGuidelineDescriptionTextNode___children___id',
  guideline___childrenContentfulGuidelineDescriptionTextNode___children___children = 'guideline___childrenContentfulGuidelineDescriptionTextNode___children___children',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___content = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___content',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___description = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___description',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___mediaType = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___mediaType',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___owner = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___owner',
  guideline___childrenContentfulGuidelineDescriptionTextNode___internal___type = 'guideline___childrenContentfulGuidelineDescriptionTextNode___internal___type',
  guideline___childrenContentfulGuidelineDescriptionTextNode___description = 'guideline___childrenContentfulGuidelineDescriptionTextNode___description',
  guideline___childrenContentfulGuidelineDescriptionTextNode___sys___type = 'guideline___childrenContentfulGuidelineDescriptionTextNode___sys___type',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___slug = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___slug',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___body = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___body',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___headings = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___headings',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___html = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___html',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___id = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___id',
  guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___children = 'guideline___childrenContentfulGuidelineDescriptionTextNode___childMdx___children',
  guideline___childContentfulGuidelineDescriptionTextNode___id = 'guideline___childContentfulGuidelineDescriptionTextNode___id',
  guideline___childContentfulGuidelineDescriptionTextNode___parent___id = 'guideline___childContentfulGuidelineDescriptionTextNode___parent___id',
  guideline___childContentfulGuidelineDescriptionTextNode___parent___children = 'guideline___childContentfulGuidelineDescriptionTextNode___parent___children',
  guideline___childContentfulGuidelineDescriptionTextNode___children = 'guideline___childContentfulGuidelineDescriptionTextNode___children',
  guideline___childContentfulGuidelineDescriptionTextNode___children___id = 'guideline___childContentfulGuidelineDescriptionTextNode___children___id',
  guideline___childContentfulGuidelineDescriptionTextNode___children___children = 'guideline___childContentfulGuidelineDescriptionTextNode___children___children',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___content = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___content',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___description = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___description',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___mediaType = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___mediaType',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___owner = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___owner',
  guideline___childContentfulGuidelineDescriptionTextNode___internal___type = 'guideline___childContentfulGuidelineDescriptionTextNode___internal___type',
  guideline___childContentfulGuidelineDescriptionTextNode___description = 'guideline___childContentfulGuidelineDescriptionTextNode___description',
  guideline___childContentfulGuidelineDescriptionTextNode___sys___type = 'guideline___childContentfulGuidelineDescriptionTextNode___sys___type',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'guideline___childContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___slug = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___slug',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___body = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___body',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___headings = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___headings',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___html = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___html',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___id = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___id',
  guideline___childContentfulGuidelineDescriptionTextNode___childMdx___children = 'guideline___childContentfulGuidelineDescriptionTextNode___childMdx___children',
  guideline___parent___id = 'guideline___parent___id',
  guideline___parent___parent___id = 'guideline___parent___parent___id',
  guideline___parent___parent___children = 'guideline___parent___parent___children',
  guideline___parent___children = 'guideline___parent___children',
  guideline___parent___children___id = 'guideline___parent___children___id',
  guideline___parent___children___children = 'guideline___parent___children___children',
  guideline___parent___internal___content = 'guideline___parent___internal___content',
  guideline___parent___internal___contentDigest = 'guideline___parent___internal___contentDigest',
  guideline___parent___internal___description = 'guideline___parent___internal___description',
  guideline___parent___internal___fieldOwners = 'guideline___parent___internal___fieldOwners',
  guideline___parent___internal___ignoreType = 'guideline___parent___internal___ignoreType',
  guideline___parent___internal___mediaType = 'guideline___parent___internal___mediaType',
  guideline___parent___internal___owner = 'guideline___parent___internal___owner',
  guideline___parent___internal___type = 'guideline___parent___internal___type',
  guideline___children = 'guideline___children',
  guideline___children___id = 'guideline___children___id',
  guideline___children___parent___id = 'guideline___children___parent___id',
  guideline___children___parent___children = 'guideline___children___parent___children',
  guideline___children___children = 'guideline___children___children',
  guideline___children___children___id = 'guideline___children___children___id',
  guideline___children___children___children = 'guideline___children___children___children',
  guideline___children___internal___content = 'guideline___children___internal___content',
  guideline___children___internal___contentDigest = 'guideline___children___internal___contentDigest',
  guideline___children___internal___description = 'guideline___children___internal___description',
  guideline___children___internal___fieldOwners = 'guideline___children___internal___fieldOwners',
  guideline___children___internal___ignoreType = 'guideline___children___internal___ignoreType',
  guideline___children___internal___mediaType = 'guideline___children___internal___mediaType',
  guideline___children___internal___owner = 'guideline___children___internal___owner',
  guideline___children___internal___type = 'guideline___children___internal___type',
  guideline___internal___content = 'guideline___internal___content',
  guideline___internal___contentDigest = 'guideline___internal___contentDigest',
  guideline___internal___description = 'guideline___internal___description',
  guideline___internal___fieldOwners = 'guideline___internal___fieldOwners',
  guideline___internal___ignoreType = 'guideline___internal___ignoreType',
  guideline___internal___mediaType = 'guideline___internal___mediaType',
  guideline___internal___owner = 'guideline___internal___owner',
  guideline___internal___type = 'guideline___internal___type',
  childrenContentfulGuidelineDescriptionTextNode = 'childrenContentfulGuidelineDescriptionTextNode',
  childrenContentfulGuidelineDescriptionTextNode___id = 'childrenContentfulGuidelineDescriptionTextNode___id',
  childrenContentfulGuidelineDescriptionTextNode___parent___id = 'childrenContentfulGuidelineDescriptionTextNode___parent___id',
  childrenContentfulGuidelineDescriptionTextNode___parent___parent___id = 'childrenContentfulGuidelineDescriptionTextNode___parent___parent___id',
  childrenContentfulGuidelineDescriptionTextNode___parent___parent___children = 'childrenContentfulGuidelineDescriptionTextNode___parent___parent___children',
  childrenContentfulGuidelineDescriptionTextNode___parent___children = 'childrenContentfulGuidelineDescriptionTextNode___parent___children',
  childrenContentfulGuidelineDescriptionTextNode___parent___children___id = 'childrenContentfulGuidelineDescriptionTextNode___parent___children___id',
  childrenContentfulGuidelineDescriptionTextNode___parent___children___children = 'childrenContentfulGuidelineDescriptionTextNode___parent___children___children',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___content = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___content',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___contentDigest = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___contentDigest',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___description = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___description',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___fieldOwners = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___fieldOwners',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___ignoreType = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___ignoreType',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___mediaType = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___mediaType',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___owner = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___owner',
  childrenContentfulGuidelineDescriptionTextNode___parent___internal___type = 'childrenContentfulGuidelineDescriptionTextNode___parent___internal___type',
  childrenContentfulGuidelineDescriptionTextNode___children = 'childrenContentfulGuidelineDescriptionTextNode___children',
  childrenContentfulGuidelineDescriptionTextNode___children___id = 'childrenContentfulGuidelineDescriptionTextNode___children___id',
  childrenContentfulGuidelineDescriptionTextNode___children___parent___id = 'childrenContentfulGuidelineDescriptionTextNode___children___parent___id',
  childrenContentfulGuidelineDescriptionTextNode___children___parent___children = 'childrenContentfulGuidelineDescriptionTextNode___children___parent___children',
  childrenContentfulGuidelineDescriptionTextNode___children___children = 'childrenContentfulGuidelineDescriptionTextNode___children___children',
  childrenContentfulGuidelineDescriptionTextNode___children___children___id = 'childrenContentfulGuidelineDescriptionTextNode___children___children___id',
  childrenContentfulGuidelineDescriptionTextNode___children___children___children = 'childrenContentfulGuidelineDescriptionTextNode___children___children___children',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___content = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___content',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___contentDigest = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___contentDigest',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___description = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___description',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___fieldOwners = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___fieldOwners',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___ignoreType = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___ignoreType',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___mediaType = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___mediaType',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___owner = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___owner',
  childrenContentfulGuidelineDescriptionTextNode___children___internal___type = 'childrenContentfulGuidelineDescriptionTextNode___children___internal___type',
  childrenContentfulGuidelineDescriptionTextNode___internal___content = 'childrenContentfulGuidelineDescriptionTextNode___internal___content',
  childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'childrenContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  childrenContentfulGuidelineDescriptionTextNode___internal___description = 'childrenContentfulGuidelineDescriptionTextNode___internal___description',
  childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'childrenContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'childrenContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  childrenContentfulGuidelineDescriptionTextNode___internal___mediaType = 'childrenContentfulGuidelineDescriptionTextNode___internal___mediaType',
  childrenContentfulGuidelineDescriptionTextNode___internal___owner = 'childrenContentfulGuidelineDescriptionTextNode___internal___owner',
  childrenContentfulGuidelineDescriptionTextNode___internal___type = 'childrenContentfulGuidelineDescriptionTextNode___internal___type',
  childrenContentfulGuidelineDescriptionTextNode___description = 'childrenContentfulGuidelineDescriptionTextNode___description',
  childrenContentfulGuidelineDescriptionTextNode___sys___type = 'childrenContentfulGuidelineDescriptionTextNode___sys___type',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___title = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___title',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___order = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___order',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___description = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___description',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings___value = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings___value',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings___depth = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___headings___depth',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___paragraphs = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___paragraphs',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___sentences = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___sentences',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___words = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___words',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___parent___id = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___parent___id',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___parent___children = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___parent___children',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children___id = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children___id',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children___children = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___children___children',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___content = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___content',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___contentDigest = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___contentDigest',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___description = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___description',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___fieldOwners = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___fieldOwners',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___ignoreType = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___ignoreType',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___mediaType = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___mediaType',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___owner = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___owner',
  childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___type = 'childrenContentfulGuidelineDescriptionTextNode___childrenMdx___internal___type',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___title = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___title',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___order = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___order',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___description = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___description',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___slug = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___slug',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___body = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___body',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___headings = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___headings',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___headings___value = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___headings___value',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___headings___depth = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___headings___depth',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___html = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___html',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___paragraphs = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___paragraphs',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___sentences = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___sentences',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___words = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___wordCount___words',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___id = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___id',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___parent___id = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___parent___id',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___parent___children = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___parent___children',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___children = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___children',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___children___id = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___children___id',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___children___children = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___children___children',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___content = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___content',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___contentDigest = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___contentDigest',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___description = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___description',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___fieldOwners = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___fieldOwners',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___ignoreType = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___ignoreType',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___mediaType = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___mediaType',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___owner = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___owner',
  childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___type = 'childrenContentfulGuidelineDescriptionTextNode___childMdx___internal___type',
  childContentfulGuidelineDescriptionTextNode___id = 'childContentfulGuidelineDescriptionTextNode___id',
  childContentfulGuidelineDescriptionTextNode___parent___id = 'childContentfulGuidelineDescriptionTextNode___parent___id',
  childContentfulGuidelineDescriptionTextNode___parent___parent___id = 'childContentfulGuidelineDescriptionTextNode___parent___parent___id',
  childContentfulGuidelineDescriptionTextNode___parent___parent___children = 'childContentfulGuidelineDescriptionTextNode___parent___parent___children',
  childContentfulGuidelineDescriptionTextNode___parent___children = 'childContentfulGuidelineDescriptionTextNode___parent___children',
  childContentfulGuidelineDescriptionTextNode___parent___children___id = 'childContentfulGuidelineDescriptionTextNode___parent___children___id',
  childContentfulGuidelineDescriptionTextNode___parent___children___children = 'childContentfulGuidelineDescriptionTextNode___parent___children___children',
  childContentfulGuidelineDescriptionTextNode___parent___internal___content = 'childContentfulGuidelineDescriptionTextNode___parent___internal___content',
  childContentfulGuidelineDescriptionTextNode___parent___internal___contentDigest = 'childContentfulGuidelineDescriptionTextNode___parent___internal___contentDigest',
  childContentfulGuidelineDescriptionTextNode___parent___internal___description = 'childContentfulGuidelineDescriptionTextNode___parent___internal___description',
  childContentfulGuidelineDescriptionTextNode___parent___internal___fieldOwners = 'childContentfulGuidelineDescriptionTextNode___parent___internal___fieldOwners',
  childContentfulGuidelineDescriptionTextNode___parent___internal___ignoreType = 'childContentfulGuidelineDescriptionTextNode___parent___internal___ignoreType',
  childContentfulGuidelineDescriptionTextNode___parent___internal___mediaType = 'childContentfulGuidelineDescriptionTextNode___parent___internal___mediaType',
  childContentfulGuidelineDescriptionTextNode___parent___internal___owner = 'childContentfulGuidelineDescriptionTextNode___parent___internal___owner',
  childContentfulGuidelineDescriptionTextNode___parent___internal___type = 'childContentfulGuidelineDescriptionTextNode___parent___internal___type',
  childContentfulGuidelineDescriptionTextNode___children = 'childContentfulGuidelineDescriptionTextNode___children',
  childContentfulGuidelineDescriptionTextNode___children___id = 'childContentfulGuidelineDescriptionTextNode___children___id',
  childContentfulGuidelineDescriptionTextNode___children___parent___id = 'childContentfulGuidelineDescriptionTextNode___children___parent___id',
  childContentfulGuidelineDescriptionTextNode___children___parent___children = 'childContentfulGuidelineDescriptionTextNode___children___parent___children',
  childContentfulGuidelineDescriptionTextNode___children___children = 'childContentfulGuidelineDescriptionTextNode___children___children',
  childContentfulGuidelineDescriptionTextNode___children___children___id = 'childContentfulGuidelineDescriptionTextNode___children___children___id',
  childContentfulGuidelineDescriptionTextNode___children___children___children = 'childContentfulGuidelineDescriptionTextNode___children___children___children',
  childContentfulGuidelineDescriptionTextNode___children___internal___content = 'childContentfulGuidelineDescriptionTextNode___children___internal___content',
  childContentfulGuidelineDescriptionTextNode___children___internal___contentDigest = 'childContentfulGuidelineDescriptionTextNode___children___internal___contentDigest',
  childContentfulGuidelineDescriptionTextNode___children___internal___description = 'childContentfulGuidelineDescriptionTextNode___children___internal___description',
  childContentfulGuidelineDescriptionTextNode___children___internal___fieldOwners = 'childContentfulGuidelineDescriptionTextNode___children___internal___fieldOwners',
  childContentfulGuidelineDescriptionTextNode___children___internal___ignoreType = 'childContentfulGuidelineDescriptionTextNode___children___internal___ignoreType',
  childContentfulGuidelineDescriptionTextNode___children___internal___mediaType = 'childContentfulGuidelineDescriptionTextNode___children___internal___mediaType',
  childContentfulGuidelineDescriptionTextNode___children___internal___owner = 'childContentfulGuidelineDescriptionTextNode___children___internal___owner',
  childContentfulGuidelineDescriptionTextNode___children___internal___type = 'childContentfulGuidelineDescriptionTextNode___children___internal___type',
  childContentfulGuidelineDescriptionTextNode___internal___content = 'childContentfulGuidelineDescriptionTextNode___internal___content',
  childContentfulGuidelineDescriptionTextNode___internal___contentDigest = 'childContentfulGuidelineDescriptionTextNode___internal___contentDigest',
  childContentfulGuidelineDescriptionTextNode___internal___description = 'childContentfulGuidelineDescriptionTextNode___internal___description',
  childContentfulGuidelineDescriptionTextNode___internal___fieldOwners = 'childContentfulGuidelineDescriptionTextNode___internal___fieldOwners',
  childContentfulGuidelineDescriptionTextNode___internal___ignoreType = 'childContentfulGuidelineDescriptionTextNode___internal___ignoreType',
  childContentfulGuidelineDescriptionTextNode___internal___mediaType = 'childContentfulGuidelineDescriptionTextNode___internal___mediaType',
  childContentfulGuidelineDescriptionTextNode___internal___owner = 'childContentfulGuidelineDescriptionTextNode___internal___owner',
  childContentfulGuidelineDescriptionTextNode___internal___type = 'childContentfulGuidelineDescriptionTextNode___internal___type',
  childContentfulGuidelineDescriptionTextNode___description = 'childContentfulGuidelineDescriptionTextNode___description',
  childContentfulGuidelineDescriptionTextNode___sys___type = 'childContentfulGuidelineDescriptionTextNode___sys___type',
  childContentfulGuidelineDescriptionTextNode___childrenMdx = 'childContentfulGuidelineDescriptionTextNode___childrenMdx',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___rawBody',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___fileAbsolutePath',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___title = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___title',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___order = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___order',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___description = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___frontmatter___description',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___slug = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___slug',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___body = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___body',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___excerpt',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___headings = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___headings',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___headings___value = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___headings___value',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___headings___depth = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___headings___depth',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___html = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___html',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___mdxAST',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___tableOfContents',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___timeToRead',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___paragraphs = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___paragraphs',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___sentences = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___sentences',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___words = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___wordCount___words',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___id = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___id',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___parent___id = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___parent___id',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___parent___children = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___parent___children',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___children = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___children',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___children___id = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___children___id',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___children___children = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___children___children',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___content = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___content',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___contentDigest = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___contentDigest',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___description = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___description',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___fieldOwners = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___fieldOwners',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___ignoreType = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___ignoreType',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___mediaType = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___mediaType',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___owner = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___owner',
  childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___type = 'childContentfulGuidelineDescriptionTextNode___childrenMdx___internal___type',
  childContentfulGuidelineDescriptionTextNode___childMdx___rawBody = 'childContentfulGuidelineDescriptionTextNode___childMdx___rawBody',
  childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath = 'childContentfulGuidelineDescriptionTextNode___childMdx___fileAbsolutePath',
  childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___title = 'childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___title',
  childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___order = 'childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___order',
  childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___description = 'childContentfulGuidelineDescriptionTextNode___childMdx___frontmatter___description',
  childContentfulGuidelineDescriptionTextNode___childMdx___slug = 'childContentfulGuidelineDescriptionTextNode___childMdx___slug',
  childContentfulGuidelineDescriptionTextNode___childMdx___body = 'childContentfulGuidelineDescriptionTextNode___childMdx___body',
  childContentfulGuidelineDescriptionTextNode___childMdx___excerpt = 'childContentfulGuidelineDescriptionTextNode___childMdx___excerpt',
  childContentfulGuidelineDescriptionTextNode___childMdx___headings = 'childContentfulGuidelineDescriptionTextNode___childMdx___headings',
  childContentfulGuidelineDescriptionTextNode___childMdx___headings___value = 'childContentfulGuidelineDescriptionTextNode___childMdx___headings___value',
  childContentfulGuidelineDescriptionTextNode___childMdx___headings___depth = 'childContentfulGuidelineDescriptionTextNode___childMdx___headings___depth',
  childContentfulGuidelineDescriptionTextNode___childMdx___html = 'childContentfulGuidelineDescriptionTextNode___childMdx___html',
  childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST = 'childContentfulGuidelineDescriptionTextNode___childMdx___mdxAST',
  childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents = 'childContentfulGuidelineDescriptionTextNode___childMdx___tableOfContents',
  childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead = 'childContentfulGuidelineDescriptionTextNode___childMdx___timeToRead',
  childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___paragraphs = 'childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___paragraphs',
  childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___sentences = 'childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___sentences',
  childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___words = 'childContentfulGuidelineDescriptionTextNode___childMdx___wordCount___words',
  childContentfulGuidelineDescriptionTextNode___childMdx___id = 'childContentfulGuidelineDescriptionTextNode___childMdx___id',
  childContentfulGuidelineDescriptionTextNode___childMdx___parent___id = 'childContentfulGuidelineDescriptionTextNode___childMdx___parent___id',
  childContentfulGuidelineDescriptionTextNode___childMdx___parent___children = 'childContentfulGuidelineDescriptionTextNode___childMdx___parent___children',
  childContentfulGuidelineDescriptionTextNode___childMdx___children = 'childContentfulGuidelineDescriptionTextNode___childMdx___children',
  childContentfulGuidelineDescriptionTextNode___childMdx___children___id = 'childContentfulGuidelineDescriptionTextNode___childMdx___children___id',
  childContentfulGuidelineDescriptionTextNode___childMdx___children___children = 'childContentfulGuidelineDescriptionTextNode___childMdx___children___children',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___content = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___content',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___contentDigest = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___contentDigest',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___description = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___description',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___fieldOwners = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___fieldOwners',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___ignoreType = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___ignoreType',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___mediaType = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___mediaType',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___owner = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___owner',
  childContentfulGuidelineDescriptionTextNode___childMdx___internal___type = 'childContentfulGuidelineDescriptionTextNode___childMdx___internal___type',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulGuidelineFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  iconGlyphName?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  category?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
  private?: Maybe<BooleanQueryOperatorInput>;
  bodyText?: Maybe<ContentfulGuidelineBodyTextFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulGuidelineSysFilterInput>;
  contentfulparent?: Maybe<ContentfulGuidelineFilterInput>;
  guideline?: Maybe<ContentfulGuidelineFilterListInput>;
  childrenContentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterListInput>;
  childContentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulGuidelineFilterListInput = {
  elemMatch?: Maybe<ContentfulGuidelineFilterInput>;
};

export type ContentfulGuidelineGroupConnection = {
  __typename?: 'ContentfulGuidelineGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulGuidelineEdge>;
  nodes: Array<ContentfulGuideline>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulGuidelineSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulGuidelineFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulGuidelineSys = {
  __typename?: 'ContentfulGuidelineSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulGuidelineSysContentType>;
};

export type ContentfulGuidelineSysContentType = {
  __typename?: 'ContentfulGuidelineSysContentType';
  sys?: Maybe<ContentfulGuidelineSysContentTypeSys>;
};

export type ContentfulGuidelineSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulGuidelineSysContentTypeSysFilterInput>;
};

export type ContentfulGuidelineSysContentTypeSys = {
  __typename?: 'ContentfulGuidelineSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulGuidelineSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulGuidelineSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulGuidelineSysContentTypeFilterInput>;
};

export enum ContentfulImageCropFocus {
  TOP = 'TOP',
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM = 'BOTTOM',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
  FACE = 'FACE',
  FACES = 'FACES',
  CENTER = 'CENTER'
}

export enum ContentfulImageFormat {
  NO_CHANGE = 'NO_CHANGE',
  AUTO = 'AUTO',
  JPG = 'JPG',
  PNG = 'PNG',
  WEBP = 'WEBP'
}

export type ContentfulMarkdown = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulMarkdown';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  entryTitle?: Maybe<Scalars['String']>;
  text?: Maybe<ContentfulMarkdownTextTextNode>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulMarkdownSys>;
  /** Returns all children nodes filtered by type contentfulMarkdownTextTextNode */
  childrenContentfulMarkdownTextTextNode?: Maybe<Array<Maybe<ContentfulMarkdownTextTextNode>>>;
  /**
   * Returns the first child node of type contentfulMarkdownTextTextNode or null if
   * there are no children of given type on this node
   */
  childContentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNode>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulMarkdownCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulMarkdownUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulMarkdownConnection = {
  __typename?: 'ContentfulMarkdownConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMarkdownEdge>;
  nodes: Array<ContentfulMarkdown>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulMarkdownGroupConnection>;
};


export type ContentfulMarkdownConnectionDistinctArgs = {
  field: ContentfulMarkdownFieldsEnum;
};


export type ContentfulMarkdownConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulMarkdownFieldsEnum;
};

export type ContentfulMarkdownEdge = {
  __typename?: 'ContentfulMarkdownEdge';
  next?: Maybe<ContentfulMarkdown>;
  node: ContentfulMarkdown;
  previous?: Maybe<ContentfulMarkdown>;
};

export enum ContentfulMarkdownFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  entryTitle = 'entryTitle',
  text___id = 'text___id',
  text___parent___id = 'text___parent___id',
  text___parent___parent___id = 'text___parent___parent___id',
  text___parent___parent___children = 'text___parent___parent___children',
  text___parent___children = 'text___parent___children',
  text___parent___children___id = 'text___parent___children___id',
  text___parent___children___children = 'text___parent___children___children',
  text___parent___internal___content = 'text___parent___internal___content',
  text___parent___internal___contentDigest = 'text___parent___internal___contentDigest',
  text___parent___internal___description = 'text___parent___internal___description',
  text___parent___internal___fieldOwners = 'text___parent___internal___fieldOwners',
  text___parent___internal___ignoreType = 'text___parent___internal___ignoreType',
  text___parent___internal___mediaType = 'text___parent___internal___mediaType',
  text___parent___internal___owner = 'text___parent___internal___owner',
  text___parent___internal___type = 'text___parent___internal___type',
  text___children = 'text___children',
  text___children___id = 'text___children___id',
  text___children___parent___id = 'text___children___parent___id',
  text___children___parent___children = 'text___children___parent___children',
  text___children___children = 'text___children___children',
  text___children___children___id = 'text___children___children___id',
  text___children___children___children = 'text___children___children___children',
  text___children___internal___content = 'text___children___internal___content',
  text___children___internal___contentDigest = 'text___children___internal___contentDigest',
  text___children___internal___description = 'text___children___internal___description',
  text___children___internal___fieldOwners = 'text___children___internal___fieldOwners',
  text___children___internal___ignoreType = 'text___children___internal___ignoreType',
  text___children___internal___mediaType = 'text___children___internal___mediaType',
  text___children___internal___owner = 'text___children___internal___owner',
  text___children___internal___type = 'text___children___internal___type',
  text___internal___content = 'text___internal___content',
  text___internal___contentDigest = 'text___internal___contentDigest',
  text___internal___description = 'text___internal___description',
  text___internal___fieldOwners = 'text___internal___fieldOwners',
  text___internal___ignoreType = 'text___internal___ignoreType',
  text___internal___mediaType = 'text___internal___mediaType',
  text___internal___owner = 'text___internal___owner',
  text___internal___type = 'text___internal___type',
  text___text = 'text___text',
  text___sys___type = 'text___sys___type',
  text___childrenMdx = 'text___childrenMdx',
  text___childrenMdx___rawBody = 'text___childrenMdx___rawBody',
  text___childrenMdx___fileAbsolutePath = 'text___childrenMdx___fileAbsolutePath',
  text___childrenMdx___frontmatter___title = 'text___childrenMdx___frontmatter___title',
  text___childrenMdx___frontmatter___order = 'text___childrenMdx___frontmatter___order',
  text___childrenMdx___frontmatter___description = 'text___childrenMdx___frontmatter___description',
  text___childrenMdx___slug = 'text___childrenMdx___slug',
  text___childrenMdx___body = 'text___childrenMdx___body',
  text___childrenMdx___excerpt = 'text___childrenMdx___excerpt',
  text___childrenMdx___headings = 'text___childrenMdx___headings',
  text___childrenMdx___headings___value = 'text___childrenMdx___headings___value',
  text___childrenMdx___headings___depth = 'text___childrenMdx___headings___depth',
  text___childrenMdx___html = 'text___childrenMdx___html',
  text___childrenMdx___mdxAST = 'text___childrenMdx___mdxAST',
  text___childrenMdx___tableOfContents = 'text___childrenMdx___tableOfContents',
  text___childrenMdx___timeToRead = 'text___childrenMdx___timeToRead',
  text___childrenMdx___wordCount___paragraphs = 'text___childrenMdx___wordCount___paragraphs',
  text___childrenMdx___wordCount___sentences = 'text___childrenMdx___wordCount___sentences',
  text___childrenMdx___wordCount___words = 'text___childrenMdx___wordCount___words',
  text___childrenMdx___id = 'text___childrenMdx___id',
  text___childrenMdx___parent___id = 'text___childrenMdx___parent___id',
  text___childrenMdx___parent___children = 'text___childrenMdx___parent___children',
  text___childrenMdx___children = 'text___childrenMdx___children',
  text___childrenMdx___children___id = 'text___childrenMdx___children___id',
  text___childrenMdx___children___children = 'text___childrenMdx___children___children',
  text___childrenMdx___internal___content = 'text___childrenMdx___internal___content',
  text___childrenMdx___internal___contentDigest = 'text___childrenMdx___internal___contentDigest',
  text___childrenMdx___internal___description = 'text___childrenMdx___internal___description',
  text___childrenMdx___internal___fieldOwners = 'text___childrenMdx___internal___fieldOwners',
  text___childrenMdx___internal___ignoreType = 'text___childrenMdx___internal___ignoreType',
  text___childrenMdx___internal___mediaType = 'text___childrenMdx___internal___mediaType',
  text___childrenMdx___internal___owner = 'text___childrenMdx___internal___owner',
  text___childrenMdx___internal___type = 'text___childrenMdx___internal___type',
  text___childMdx___rawBody = 'text___childMdx___rawBody',
  text___childMdx___fileAbsolutePath = 'text___childMdx___fileAbsolutePath',
  text___childMdx___frontmatter___title = 'text___childMdx___frontmatter___title',
  text___childMdx___frontmatter___order = 'text___childMdx___frontmatter___order',
  text___childMdx___frontmatter___description = 'text___childMdx___frontmatter___description',
  text___childMdx___slug = 'text___childMdx___slug',
  text___childMdx___body = 'text___childMdx___body',
  text___childMdx___excerpt = 'text___childMdx___excerpt',
  text___childMdx___headings = 'text___childMdx___headings',
  text___childMdx___headings___value = 'text___childMdx___headings___value',
  text___childMdx___headings___depth = 'text___childMdx___headings___depth',
  text___childMdx___html = 'text___childMdx___html',
  text___childMdx___mdxAST = 'text___childMdx___mdxAST',
  text___childMdx___tableOfContents = 'text___childMdx___tableOfContents',
  text___childMdx___timeToRead = 'text___childMdx___timeToRead',
  text___childMdx___wordCount___paragraphs = 'text___childMdx___wordCount___paragraphs',
  text___childMdx___wordCount___sentences = 'text___childMdx___wordCount___sentences',
  text___childMdx___wordCount___words = 'text___childMdx___wordCount___words',
  text___childMdx___id = 'text___childMdx___id',
  text___childMdx___parent___id = 'text___childMdx___parent___id',
  text___childMdx___parent___children = 'text___childMdx___parent___children',
  text___childMdx___children = 'text___childMdx___children',
  text___childMdx___children___id = 'text___childMdx___children___id',
  text___childMdx___children___children = 'text___childMdx___children___children',
  text___childMdx___internal___content = 'text___childMdx___internal___content',
  text___childMdx___internal___contentDigest = 'text___childMdx___internal___contentDigest',
  text___childMdx___internal___description = 'text___childMdx___internal___description',
  text___childMdx___internal___fieldOwners = 'text___childMdx___internal___fieldOwners',
  text___childMdx___internal___ignoreType = 'text___childMdx___internal___ignoreType',
  text___childMdx___internal___mediaType = 'text___childMdx___internal___mediaType',
  text___childMdx___internal___owner = 'text___childMdx___internal___owner',
  text___childMdx___internal___type = 'text___childMdx___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  childrenContentfulMarkdownTextTextNode = 'childrenContentfulMarkdownTextTextNode',
  childrenContentfulMarkdownTextTextNode___id = 'childrenContentfulMarkdownTextTextNode___id',
  childrenContentfulMarkdownTextTextNode___parent___id = 'childrenContentfulMarkdownTextTextNode___parent___id',
  childrenContentfulMarkdownTextTextNode___parent___parent___id = 'childrenContentfulMarkdownTextTextNode___parent___parent___id',
  childrenContentfulMarkdownTextTextNode___parent___parent___children = 'childrenContentfulMarkdownTextTextNode___parent___parent___children',
  childrenContentfulMarkdownTextTextNode___parent___children = 'childrenContentfulMarkdownTextTextNode___parent___children',
  childrenContentfulMarkdownTextTextNode___parent___children___id = 'childrenContentfulMarkdownTextTextNode___parent___children___id',
  childrenContentfulMarkdownTextTextNode___parent___children___children = 'childrenContentfulMarkdownTextTextNode___parent___children___children',
  childrenContentfulMarkdownTextTextNode___parent___internal___content = 'childrenContentfulMarkdownTextTextNode___parent___internal___content',
  childrenContentfulMarkdownTextTextNode___parent___internal___contentDigest = 'childrenContentfulMarkdownTextTextNode___parent___internal___contentDigest',
  childrenContentfulMarkdownTextTextNode___parent___internal___description = 'childrenContentfulMarkdownTextTextNode___parent___internal___description',
  childrenContentfulMarkdownTextTextNode___parent___internal___fieldOwners = 'childrenContentfulMarkdownTextTextNode___parent___internal___fieldOwners',
  childrenContentfulMarkdownTextTextNode___parent___internal___ignoreType = 'childrenContentfulMarkdownTextTextNode___parent___internal___ignoreType',
  childrenContentfulMarkdownTextTextNode___parent___internal___mediaType = 'childrenContentfulMarkdownTextTextNode___parent___internal___mediaType',
  childrenContentfulMarkdownTextTextNode___parent___internal___owner = 'childrenContentfulMarkdownTextTextNode___parent___internal___owner',
  childrenContentfulMarkdownTextTextNode___parent___internal___type = 'childrenContentfulMarkdownTextTextNode___parent___internal___type',
  childrenContentfulMarkdownTextTextNode___children = 'childrenContentfulMarkdownTextTextNode___children',
  childrenContentfulMarkdownTextTextNode___children___id = 'childrenContentfulMarkdownTextTextNode___children___id',
  childrenContentfulMarkdownTextTextNode___children___parent___id = 'childrenContentfulMarkdownTextTextNode___children___parent___id',
  childrenContentfulMarkdownTextTextNode___children___parent___children = 'childrenContentfulMarkdownTextTextNode___children___parent___children',
  childrenContentfulMarkdownTextTextNode___children___children = 'childrenContentfulMarkdownTextTextNode___children___children',
  childrenContentfulMarkdownTextTextNode___children___children___id = 'childrenContentfulMarkdownTextTextNode___children___children___id',
  childrenContentfulMarkdownTextTextNode___children___children___children = 'childrenContentfulMarkdownTextTextNode___children___children___children',
  childrenContentfulMarkdownTextTextNode___children___internal___content = 'childrenContentfulMarkdownTextTextNode___children___internal___content',
  childrenContentfulMarkdownTextTextNode___children___internal___contentDigest = 'childrenContentfulMarkdownTextTextNode___children___internal___contentDigest',
  childrenContentfulMarkdownTextTextNode___children___internal___description = 'childrenContentfulMarkdownTextTextNode___children___internal___description',
  childrenContentfulMarkdownTextTextNode___children___internal___fieldOwners = 'childrenContentfulMarkdownTextTextNode___children___internal___fieldOwners',
  childrenContentfulMarkdownTextTextNode___children___internal___ignoreType = 'childrenContentfulMarkdownTextTextNode___children___internal___ignoreType',
  childrenContentfulMarkdownTextTextNode___children___internal___mediaType = 'childrenContentfulMarkdownTextTextNode___children___internal___mediaType',
  childrenContentfulMarkdownTextTextNode___children___internal___owner = 'childrenContentfulMarkdownTextTextNode___children___internal___owner',
  childrenContentfulMarkdownTextTextNode___children___internal___type = 'childrenContentfulMarkdownTextTextNode___children___internal___type',
  childrenContentfulMarkdownTextTextNode___internal___content = 'childrenContentfulMarkdownTextTextNode___internal___content',
  childrenContentfulMarkdownTextTextNode___internal___contentDigest = 'childrenContentfulMarkdownTextTextNode___internal___contentDigest',
  childrenContentfulMarkdownTextTextNode___internal___description = 'childrenContentfulMarkdownTextTextNode___internal___description',
  childrenContentfulMarkdownTextTextNode___internal___fieldOwners = 'childrenContentfulMarkdownTextTextNode___internal___fieldOwners',
  childrenContentfulMarkdownTextTextNode___internal___ignoreType = 'childrenContentfulMarkdownTextTextNode___internal___ignoreType',
  childrenContentfulMarkdownTextTextNode___internal___mediaType = 'childrenContentfulMarkdownTextTextNode___internal___mediaType',
  childrenContentfulMarkdownTextTextNode___internal___owner = 'childrenContentfulMarkdownTextTextNode___internal___owner',
  childrenContentfulMarkdownTextTextNode___internal___type = 'childrenContentfulMarkdownTextTextNode___internal___type',
  childrenContentfulMarkdownTextTextNode___text = 'childrenContentfulMarkdownTextTextNode___text',
  childrenContentfulMarkdownTextTextNode___sys___type = 'childrenContentfulMarkdownTextTextNode___sys___type',
  childrenContentfulMarkdownTextTextNode___childrenMdx = 'childrenContentfulMarkdownTextTextNode___childrenMdx',
  childrenContentfulMarkdownTextTextNode___childrenMdx___rawBody = 'childrenContentfulMarkdownTextTextNode___childrenMdx___rawBody',
  childrenContentfulMarkdownTextTextNode___childrenMdx___fileAbsolutePath = 'childrenContentfulMarkdownTextTextNode___childrenMdx___fileAbsolutePath',
  childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___title = 'childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___title',
  childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___order = 'childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___order',
  childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___description = 'childrenContentfulMarkdownTextTextNode___childrenMdx___frontmatter___description',
  childrenContentfulMarkdownTextTextNode___childrenMdx___slug = 'childrenContentfulMarkdownTextTextNode___childrenMdx___slug',
  childrenContentfulMarkdownTextTextNode___childrenMdx___body = 'childrenContentfulMarkdownTextTextNode___childrenMdx___body',
  childrenContentfulMarkdownTextTextNode___childrenMdx___excerpt = 'childrenContentfulMarkdownTextTextNode___childrenMdx___excerpt',
  childrenContentfulMarkdownTextTextNode___childrenMdx___headings = 'childrenContentfulMarkdownTextTextNode___childrenMdx___headings',
  childrenContentfulMarkdownTextTextNode___childrenMdx___headings___value = 'childrenContentfulMarkdownTextTextNode___childrenMdx___headings___value',
  childrenContentfulMarkdownTextTextNode___childrenMdx___headings___depth = 'childrenContentfulMarkdownTextTextNode___childrenMdx___headings___depth',
  childrenContentfulMarkdownTextTextNode___childrenMdx___html = 'childrenContentfulMarkdownTextTextNode___childrenMdx___html',
  childrenContentfulMarkdownTextTextNode___childrenMdx___mdxAST = 'childrenContentfulMarkdownTextTextNode___childrenMdx___mdxAST',
  childrenContentfulMarkdownTextTextNode___childrenMdx___tableOfContents = 'childrenContentfulMarkdownTextTextNode___childrenMdx___tableOfContents',
  childrenContentfulMarkdownTextTextNode___childrenMdx___timeToRead = 'childrenContentfulMarkdownTextTextNode___childrenMdx___timeToRead',
  childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___paragraphs = 'childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___paragraphs',
  childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___sentences = 'childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___sentences',
  childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___words = 'childrenContentfulMarkdownTextTextNode___childrenMdx___wordCount___words',
  childrenContentfulMarkdownTextTextNode___childrenMdx___id = 'childrenContentfulMarkdownTextTextNode___childrenMdx___id',
  childrenContentfulMarkdownTextTextNode___childrenMdx___parent___id = 'childrenContentfulMarkdownTextTextNode___childrenMdx___parent___id',
  childrenContentfulMarkdownTextTextNode___childrenMdx___parent___children = 'childrenContentfulMarkdownTextTextNode___childrenMdx___parent___children',
  childrenContentfulMarkdownTextTextNode___childrenMdx___children = 'childrenContentfulMarkdownTextTextNode___childrenMdx___children',
  childrenContentfulMarkdownTextTextNode___childrenMdx___children___id = 'childrenContentfulMarkdownTextTextNode___childrenMdx___children___id',
  childrenContentfulMarkdownTextTextNode___childrenMdx___children___children = 'childrenContentfulMarkdownTextTextNode___childrenMdx___children___children',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___content = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___content',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___contentDigest = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___contentDigest',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___description = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___description',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___fieldOwners = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___fieldOwners',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___ignoreType = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___ignoreType',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___mediaType = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___mediaType',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___owner = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___owner',
  childrenContentfulMarkdownTextTextNode___childrenMdx___internal___type = 'childrenContentfulMarkdownTextTextNode___childrenMdx___internal___type',
  childrenContentfulMarkdownTextTextNode___childMdx___rawBody = 'childrenContentfulMarkdownTextTextNode___childMdx___rawBody',
  childrenContentfulMarkdownTextTextNode___childMdx___fileAbsolutePath = 'childrenContentfulMarkdownTextTextNode___childMdx___fileAbsolutePath',
  childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___title = 'childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___title',
  childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___order = 'childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___order',
  childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___description = 'childrenContentfulMarkdownTextTextNode___childMdx___frontmatter___description',
  childrenContentfulMarkdownTextTextNode___childMdx___slug = 'childrenContentfulMarkdownTextTextNode___childMdx___slug',
  childrenContentfulMarkdownTextTextNode___childMdx___body = 'childrenContentfulMarkdownTextTextNode___childMdx___body',
  childrenContentfulMarkdownTextTextNode___childMdx___excerpt = 'childrenContentfulMarkdownTextTextNode___childMdx___excerpt',
  childrenContentfulMarkdownTextTextNode___childMdx___headings = 'childrenContentfulMarkdownTextTextNode___childMdx___headings',
  childrenContentfulMarkdownTextTextNode___childMdx___headings___value = 'childrenContentfulMarkdownTextTextNode___childMdx___headings___value',
  childrenContentfulMarkdownTextTextNode___childMdx___headings___depth = 'childrenContentfulMarkdownTextTextNode___childMdx___headings___depth',
  childrenContentfulMarkdownTextTextNode___childMdx___html = 'childrenContentfulMarkdownTextTextNode___childMdx___html',
  childrenContentfulMarkdownTextTextNode___childMdx___mdxAST = 'childrenContentfulMarkdownTextTextNode___childMdx___mdxAST',
  childrenContentfulMarkdownTextTextNode___childMdx___tableOfContents = 'childrenContentfulMarkdownTextTextNode___childMdx___tableOfContents',
  childrenContentfulMarkdownTextTextNode___childMdx___timeToRead = 'childrenContentfulMarkdownTextTextNode___childMdx___timeToRead',
  childrenContentfulMarkdownTextTextNode___childMdx___wordCount___paragraphs = 'childrenContentfulMarkdownTextTextNode___childMdx___wordCount___paragraphs',
  childrenContentfulMarkdownTextTextNode___childMdx___wordCount___sentences = 'childrenContentfulMarkdownTextTextNode___childMdx___wordCount___sentences',
  childrenContentfulMarkdownTextTextNode___childMdx___wordCount___words = 'childrenContentfulMarkdownTextTextNode___childMdx___wordCount___words',
  childrenContentfulMarkdownTextTextNode___childMdx___id = 'childrenContentfulMarkdownTextTextNode___childMdx___id',
  childrenContentfulMarkdownTextTextNode___childMdx___parent___id = 'childrenContentfulMarkdownTextTextNode___childMdx___parent___id',
  childrenContentfulMarkdownTextTextNode___childMdx___parent___children = 'childrenContentfulMarkdownTextTextNode___childMdx___parent___children',
  childrenContentfulMarkdownTextTextNode___childMdx___children = 'childrenContentfulMarkdownTextTextNode___childMdx___children',
  childrenContentfulMarkdownTextTextNode___childMdx___children___id = 'childrenContentfulMarkdownTextTextNode___childMdx___children___id',
  childrenContentfulMarkdownTextTextNode___childMdx___children___children = 'childrenContentfulMarkdownTextTextNode___childMdx___children___children',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___content = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___content',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___contentDigest = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___contentDigest',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___description = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___description',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___fieldOwners = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___fieldOwners',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___ignoreType = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___ignoreType',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___mediaType = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___mediaType',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___owner = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___owner',
  childrenContentfulMarkdownTextTextNode___childMdx___internal___type = 'childrenContentfulMarkdownTextTextNode___childMdx___internal___type',
  childContentfulMarkdownTextTextNode___id = 'childContentfulMarkdownTextTextNode___id',
  childContentfulMarkdownTextTextNode___parent___id = 'childContentfulMarkdownTextTextNode___parent___id',
  childContentfulMarkdownTextTextNode___parent___parent___id = 'childContentfulMarkdownTextTextNode___parent___parent___id',
  childContentfulMarkdownTextTextNode___parent___parent___children = 'childContentfulMarkdownTextTextNode___parent___parent___children',
  childContentfulMarkdownTextTextNode___parent___children = 'childContentfulMarkdownTextTextNode___parent___children',
  childContentfulMarkdownTextTextNode___parent___children___id = 'childContentfulMarkdownTextTextNode___parent___children___id',
  childContentfulMarkdownTextTextNode___parent___children___children = 'childContentfulMarkdownTextTextNode___parent___children___children',
  childContentfulMarkdownTextTextNode___parent___internal___content = 'childContentfulMarkdownTextTextNode___parent___internal___content',
  childContentfulMarkdownTextTextNode___parent___internal___contentDigest = 'childContentfulMarkdownTextTextNode___parent___internal___contentDigest',
  childContentfulMarkdownTextTextNode___parent___internal___description = 'childContentfulMarkdownTextTextNode___parent___internal___description',
  childContentfulMarkdownTextTextNode___parent___internal___fieldOwners = 'childContentfulMarkdownTextTextNode___parent___internal___fieldOwners',
  childContentfulMarkdownTextTextNode___parent___internal___ignoreType = 'childContentfulMarkdownTextTextNode___parent___internal___ignoreType',
  childContentfulMarkdownTextTextNode___parent___internal___mediaType = 'childContentfulMarkdownTextTextNode___parent___internal___mediaType',
  childContentfulMarkdownTextTextNode___parent___internal___owner = 'childContentfulMarkdownTextTextNode___parent___internal___owner',
  childContentfulMarkdownTextTextNode___parent___internal___type = 'childContentfulMarkdownTextTextNode___parent___internal___type',
  childContentfulMarkdownTextTextNode___children = 'childContentfulMarkdownTextTextNode___children',
  childContentfulMarkdownTextTextNode___children___id = 'childContentfulMarkdownTextTextNode___children___id',
  childContentfulMarkdownTextTextNode___children___parent___id = 'childContentfulMarkdownTextTextNode___children___parent___id',
  childContentfulMarkdownTextTextNode___children___parent___children = 'childContentfulMarkdownTextTextNode___children___parent___children',
  childContentfulMarkdownTextTextNode___children___children = 'childContentfulMarkdownTextTextNode___children___children',
  childContentfulMarkdownTextTextNode___children___children___id = 'childContentfulMarkdownTextTextNode___children___children___id',
  childContentfulMarkdownTextTextNode___children___children___children = 'childContentfulMarkdownTextTextNode___children___children___children',
  childContentfulMarkdownTextTextNode___children___internal___content = 'childContentfulMarkdownTextTextNode___children___internal___content',
  childContentfulMarkdownTextTextNode___children___internal___contentDigest = 'childContentfulMarkdownTextTextNode___children___internal___contentDigest',
  childContentfulMarkdownTextTextNode___children___internal___description = 'childContentfulMarkdownTextTextNode___children___internal___description',
  childContentfulMarkdownTextTextNode___children___internal___fieldOwners = 'childContentfulMarkdownTextTextNode___children___internal___fieldOwners',
  childContentfulMarkdownTextTextNode___children___internal___ignoreType = 'childContentfulMarkdownTextTextNode___children___internal___ignoreType',
  childContentfulMarkdownTextTextNode___children___internal___mediaType = 'childContentfulMarkdownTextTextNode___children___internal___mediaType',
  childContentfulMarkdownTextTextNode___children___internal___owner = 'childContentfulMarkdownTextTextNode___children___internal___owner',
  childContentfulMarkdownTextTextNode___children___internal___type = 'childContentfulMarkdownTextTextNode___children___internal___type',
  childContentfulMarkdownTextTextNode___internal___content = 'childContentfulMarkdownTextTextNode___internal___content',
  childContentfulMarkdownTextTextNode___internal___contentDigest = 'childContentfulMarkdownTextTextNode___internal___contentDigest',
  childContentfulMarkdownTextTextNode___internal___description = 'childContentfulMarkdownTextTextNode___internal___description',
  childContentfulMarkdownTextTextNode___internal___fieldOwners = 'childContentfulMarkdownTextTextNode___internal___fieldOwners',
  childContentfulMarkdownTextTextNode___internal___ignoreType = 'childContentfulMarkdownTextTextNode___internal___ignoreType',
  childContentfulMarkdownTextTextNode___internal___mediaType = 'childContentfulMarkdownTextTextNode___internal___mediaType',
  childContentfulMarkdownTextTextNode___internal___owner = 'childContentfulMarkdownTextTextNode___internal___owner',
  childContentfulMarkdownTextTextNode___internal___type = 'childContentfulMarkdownTextTextNode___internal___type',
  childContentfulMarkdownTextTextNode___text = 'childContentfulMarkdownTextTextNode___text',
  childContentfulMarkdownTextTextNode___sys___type = 'childContentfulMarkdownTextTextNode___sys___type',
  childContentfulMarkdownTextTextNode___childrenMdx = 'childContentfulMarkdownTextTextNode___childrenMdx',
  childContentfulMarkdownTextTextNode___childrenMdx___rawBody = 'childContentfulMarkdownTextTextNode___childrenMdx___rawBody',
  childContentfulMarkdownTextTextNode___childrenMdx___fileAbsolutePath = 'childContentfulMarkdownTextTextNode___childrenMdx___fileAbsolutePath',
  childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___title = 'childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___title',
  childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___order = 'childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___order',
  childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___description = 'childContentfulMarkdownTextTextNode___childrenMdx___frontmatter___description',
  childContentfulMarkdownTextTextNode___childrenMdx___slug = 'childContentfulMarkdownTextTextNode___childrenMdx___slug',
  childContentfulMarkdownTextTextNode___childrenMdx___body = 'childContentfulMarkdownTextTextNode___childrenMdx___body',
  childContentfulMarkdownTextTextNode___childrenMdx___excerpt = 'childContentfulMarkdownTextTextNode___childrenMdx___excerpt',
  childContentfulMarkdownTextTextNode___childrenMdx___headings = 'childContentfulMarkdownTextTextNode___childrenMdx___headings',
  childContentfulMarkdownTextTextNode___childrenMdx___headings___value = 'childContentfulMarkdownTextTextNode___childrenMdx___headings___value',
  childContentfulMarkdownTextTextNode___childrenMdx___headings___depth = 'childContentfulMarkdownTextTextNode___childrenMdx___headings___depth',
  childContentfulMarkdownTextTextNode___childrenMdx___html = 'childContentfulMarkdownTextTextNode___childrenMdx___html',
  childContentfulMarkdownTextTextNode___childrenMdx___mdxAST = 'childContentfulMarkdownTextTextNode___childrenMdx___mdxAST',
  childContentfulMarkdownTextTextNode___childrenMdx___tableOfContents = 'childContentfulMarkdownTextTextNode___childrenMdx___tableOfContents',
  childContentfulMarkdownTextTextNode___childrenMdx___timeToRead = 'childContentfulMarkdownTextTextNode___childrenMdx___timeToRead',
  childContentfulMarkdownTextTextNode___childrenMdx___wordCount___paragraphs = 'childContentfulMarkdownTextTextNode___childrenMdx___wordCount___paragraphs',
  childContentfulMarkdownTextTextNode___childrenMdx___wordCount___sentences = 'childContentfulMarkdownTextTextNode___childrenMdx___wordCount___sentences',
  childContentfulMarkdownTextTextNode___childrenMdx___wordCount___words = 'childContentfulMarkdownTextTextNode___childrenMdx___wordCount___words',
  childContentfulMarkdownTextTextNode___childrenMdx___id = 'childContentfulMarkdownTextTextNode___childrenMdx___id',
  childContentfulMarkdownTextTextNode___childrenMdx___parent___id = 'childContentfulMarkdownTextTextNode___childrenMdx___parent___id',
  childContentfulMarkdownTextTextNode___childrenMdx___parent___children = 'childContentfulMarkdownTextTextNode___childrenMdx___parent___children',
  childContentfulMarkdownTextTextNode___childrenMdx___children = 'childContentfulMarkdownTextTextNode___childrenMdx___children',
  childContentfulMarkdownTextTextNode___childrenMdx___children___id = 'childContentfulMarkdownTextTextNode___childrenMdx___children___id',
  childContentfulMarkdownTextTextNode___childrenMdx___children___children = 'childContentfulMarkdownTextTextNode___childrenMdx___children___children',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___content = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___content',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___contentDigest = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___contentDigest',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___description = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___description',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___fieldOwners = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___fieldOwners',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___ignoreType = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___ignoreType',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___mediaType = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___mediaType',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___owner = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___owner',
  childContentfulMarkdownTextTextNode___childrenMdx___internal___type = 'childContentfulMarkdownTextTextNode___childrenMdx___internal___type',
  childContentfulMarkdownTextTextNode___childMdx___rawBody = 'childContentfulMarkdownTextTextNode___childMdx___rawBody',
  childContentfulMarkdownTextTextNode___childMdx___fileAbsolutePath = 'childContentfulMarkdownTextTextNode___childMdx___fileAbsolutePath',
  childContentfulMarkdownTextTextNode___childMdx___frontmatter___title = 'childContentfulMarkdownTextTextNode___childMdx___frontmatter___title',
  childContentfulMarkdownTextTextNode___childMdx___frontmatter___order = 'childContentfulMarkdownTextTextNode___childMdx___frontmatter___order',
  childContentfulMarkdownTextTextNode___childMdx___frontmatter___description = 'childContentfulMarkdownTextTextNode___childMdx___frontmatter___description',
  childContentfulMarkdownTextTextNode___childMdx___slug = 'childContentfulMarkdownTextTextNode___childMdx___slug',
  childContentfulMarkdownTextTextNode___childMdx___body = 'childContentfulMarkdownTextTextNode___childMdx___body',
  childContentfulMarkdownTextTextNode___childMdx___excerpt = 'childContentfulMarkdownTextTextNode___childMdx___excerpt',
  childContentfulMarkdownTextTextNode___childMdx___headings = 'childContentfulMarkdownTextTextNode___childMdx___headings',
  childContentfulMarkdownTextTextNode___childMdx___headings___value = 'childContentfulMarkdownTextTextNode___childMdx___headings___value',
  childContentfulMarkdownTextTextNode___childMdx___headings___depth = 'childContentfulMarkdownTextTextNode___childMdx___headings___depth',
  childContentfulMarkdownTextTextNode___childMdx___html = 'childContentfulMarkdownTextTextNode___childMdx___html',
  childContentfulMarkdownTextTextNode___childMdx___mdxAST = 'childContentfulMarkdownTextTextNode___childMdx___mdxAST',
  childContentfulMarkdownTextTextNode___childMdx___tableOfContents = 'childContentfulMarkdownTextTextNode___childMdx___tableOfContents',
  childContentfulMarkdownTextTextNode___childMdx___timeToRead = 'childContentfulMarkdownTextTextNode___childMdx___timeToRead',
  childContentfulMarkdownTextTextNode___childMdx___wordCount___paragraphs = 'childContentfulMarkdownTextTextNode___childMdx___wordCount___paragraphs',
  childContentfulMarkdownTextTextNode___childMdx___wordCount___sentences = 'childContentfulMarkdownTextTextNode___childMdx___wordCount___sentences',
  childContentfulMarkdownTextTextNode___childMdx___wordCount___words = 'childContentfulMarkdownTextTextNode___childMdx___wordCount___words',
  childContentfulMarkdownTextTextNode___childMdx___id = 'childContentfulMarkdownTextTextNode___childMdx___id',
  childContentfulMarkdownTextTextNode___childMdx___parent___id = 'childContentfulMarkdownTextTextNode___childMdx___parent___id',
  childContentfulMarkdownTextTextNode___childMdx___parent___children = 'childContentfulMarkdownTextTextNode___childMdx___parent___children',
  childContentfulMarkdownTextTextNode___childMdx___children = 'childContentfulMarkdownTextTextNode___childMdx___children',
  childContentfulMarkdownTextTextNode___childMdx___children___id = 'childContentfulMarkdownTextTextNode___childMdx___children___id',
  childContentfulMarkdownTextTextNode___childMdx___children___children = 'childContentfulMarkdownTextTextNode___childMdx___children___children',
  childContentfulMarkdownTextTextNode___childMdx___internal___content = 'childContentfulMarkdownTextTextNode___childMdx___internal___content',
  childContentfulMarkdownTextTextNode___childMdx___internal___contentDigest = 'childContentfulMarkdownTextTextNode___childMdx___internal___contentDigest',
  childContentfulMarkdownTextTextNode___childMdx___internal___description = 'childContentfulMarkdownTextTextNode___childMdx___internal___description',
  childContentfulMarkdownTextTextNode___childMdx___internal___fieldOwners = 'childContentfulMarkdownTextTextNode___childMdx___internal___fieldOwners',
  childContentfulMarkdownTextTextNode___childMdx___internal___ignoreType = 'childContentfulMarkdownTextTextNode___childMdx___internal___ignoreType',
  childContentfulMarkdownTextTextNode___childMdx___internal___mediaType = 'childContentfulMarkdownTextTextNode___childMdx___internal___mediaType',
  childContentfulMarkdownTextTextNode___childMdx___internal___owner = 'childContentfulMarkdownTextTextNode___childMdx___internal___owner',
  childContentfulMarkdownTextTextNode___childMdx___internal___type = 'childContentfulMarkdownTextTextNode___childMdx___internal___type',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulMarkdownFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  entryTitle?: Maybe<StringQueryOperatorInput>;
  text?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulMarkdownSysFilterInput>;
  childrenContentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNodeFilterListInput>;
  childContentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulMarkdownGroupConnection = {
  __typename?: 'ContentfulMarkdownGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMarkdownEdge>;
  nodes: Array<ContentfulMarkdown>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulMarkdownSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulMarkdownFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulMarkdownSys = {
  __typename?: 'ContentfulMarkdownSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulMarkdownSysContentType>;
};

export type ContentfulMarkdownSysContentType = {
  __typename?: 'ContentfulMarkdownSysContentType';
  sys?: Maybe<ContentfulMarkdownSysContentTypeSys>;
};

export type ContentfulMarkdownSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulMarkdownSysContentTypeSysFilterInput>;
};

export type ContentfulMarkdownSysContentTypeSys = {
  __typename?: 'ContentfulMarkdownSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulMarkdownSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulMarkdownSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulMarkdownSysContentTypeFilterInput>;
};

export type ContentfulMarkdownTextTextNode = Node & {
  __typename?: 'contentfulMarkdownTextTextNode';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  text?: Maybe<Scalars['String']>;
  sys?: Maybe<ContentfulMarkdownTextTextNodeSys>;
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>;
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>;
};

export type ContentfulMarkdownTextTextNodeConnection = {
  __typename?: 'contentfulMarkdownTextTextNodeConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMarkdownTextTextNodeEdge>;
  nodes: Array<ContentfulMarkdownTextTextNode>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulMarkdownTextTextNodeGroupConnection>;
};


export type ContentfulMarkdownTextTextNodeConnectionDistinctArgs = {
  field: ContentfulMarkdownTextTextNodeFieldsEnum;
};


export type ContentfulMarkdownTextTextNodeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulMarkdownTextTextNodeFieldsEnum;
};

export type ContentfulMarkdownTextTextNodeEdge = {
  __typename?: 'contentfulMarkdownTextTextNodeEdge';
  next?: Maybe<ContentfulMarkdownTextTextNode>;
  node: ContentfulMarkdownTextTextNode;
  previous?: Maybe<ContentfulMarkdownTextTextNode>;
};

export enum ContentfulMarkdownTextTextNodeFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  text = 'text',
  sys___type = 'sys___type',
  childrenMdx = 'childrenMdx',
  childrenMdx___rawBody = 'childrenMdx___rawBody',
  childrenMdx___fileAbsolutePath = 'childrenMdx___fileAbsolutePath',
  childrenMdx___frontmatter___title = 'childrenMdx___frontmatter___title',
  childrenMdx___frontmatter___order = 'childrenMdx___frontmatter___order',
  childrenMdx___frontmatter___description = 'childrenMdx___frontmatter___description',
  childrenMdx___slug = 'childrenMdx___slug',
  childrenMdx___body = 'childrenMdx___body',
  childrenMdx___excerpt = 'childrenMdx___excerpt',
  childrenMdx___headings = 'childrenMdx___headings',
  childrenMdx___headings___value = 'childrenMdx___headings___value',
  childrenMdx___headings___depth = 'childrenMdx___headings___depth',
  childrenMdx___html = 'childrenMdx___html',
  childrenMdx___mdxAST = 'childrenMdx___mdxAST',
  childrenMdx___tableOfContents = 'childrenMdx___tableOfContents',
  childrenMdx___timeToRead = 'childrenMdx___timeToRead',
  childrenMdx___wordCount___paragraphs = 'childrenMdx___wordCount___paragraphs',
  childrenMdx___wordCount___sentences = 'childrenMdx___wordCount___sentences',
  childrenMdx___wordCount___words = 'childrenMdx___wordCount___words',
  childrenMdx___id = 'childrenMdx___id',
  childrenMdx___parent___id = 'childrenMdx___parent___id',
  childrenMdx___parent___parent___id = 'childrenMdx___parent___parent___id',
  childrenMdx___parent___parent___children = 'childrenMdx___parent___parent___children',
  childrenMdx___parent___children = 'childrenMdx___parent___children',
  childrenMdx___parent___children___id = 'childrenMdx___parent___children___id',
  childrenMdx___parent___children___children = 'childrenMdx___parent___children___children',
  childrenMdx___parent___internal___content = 'childrenMdx___parent___internal___content',
  childrenMdx___parent___internal___contentDigest = 'childrenMdx___parent___internal___contentDigest',
  childrenMdx___parent___internal___description = 'childrenMdx___parent___internal___description',
  childrenMdx___parent___internal___fieldOwners = 'childrenMdx___parent___internal___fieldOwners',
  childrenMdx___parent___internal___ignoreType = 'childrenMdx___parent___internal___ignoreType',
  childrenMdx___parent___internal___mediaType = 'childrenMdx___parent___internal___mediaType',
  childrenMdx___parent___internal___owner = 'childrenMdx___parent___internal___owner',
  childrenMdx___parent___internal___type = 'childrenMdx___parent___internal___type',
  childrenMdx___children = 'childrenMdx___children',
  childrenMdx___children___id = 'childrenMdx___children___id',
  childrenMdx___children___parent___id = 'childrenMdx___children___parent___id',
  childrenMdx___children___parent___children = 'childrenMdx___children___parent___children',
  childrenMdx___children___children = 'childrenMdx___children___children',
  childrenMdx___children___children___id = 'childrenMdx___children___children___id',
  childrenMdx___children___children___children = 'childrenMdx___children___children___children',
  childrenMdx___children___internal___content = 'childrenMdx___children___internal___content',
  childrenMdx___children___internal___contentDigest = 'childrenMdx___children___internal___contentDigest',
  childrenMdx___children___internal___description = 'childrenMdx___children___internal___description',
  childrenMdx___children___internal___fieldOwners = 'childrenMdx___children___internal___fieldOwners',
  childrenMdx___children___internal___ignoreType = 'childrenMdx___children___internal___ignoreType',
  childrenMdx___children___internal___mediaType = 'childrenMdx___children___internal___mediaType',
  childrenMdx___children___internal___owner = 'childrenMdx___children___internal___owner',
  childrenMdx___children___internal___type = 'childrenMdx___children___internal___type',
  childrenMdx___internal___content = 'childrenMdx___internal___content',
  childrenMdx___internal___contentDigest = 'childrenMdx___internal___contentDigest',
  childrenMdx___internal___description = 'childrenMdx___internal___description',
  childrenMdx___internal___fieldOwners = 'childrenMdx___internal___fieldOwners',
  childrenMdx___internal___ignoreType = 'childrenMdx___internal___ignoreType',
  childrenMdx___internal___mediaType = 'childrenMdx___internal___mediaType',
  childrenMdx___internal___owner = 'childrenMdx___internal___owner',
  childrenMdx___internal___type = 'childrenMdx___internal___type',
  childMdx___rawBody = 'childMdx___rawBody',
  childMdx___fileAbsolutePath = 'childMdx___fileAbsolutePath',
  childMdx___frontmatter___title = 'childMdx___frontmatter___title',
  childMdx___frontmatter___order = 'childMdx___frontmatter___order',
  childMdx___frontmatter___description = 'childMdx___frontmatter___description',
  childMdx___slug = 'childMdx___slug',
  childMdx___body = 'childMdx___body',
  childMdx___excerpt = 'childMdx___excerpt',
  childMdx___headings = 'childMdx___headings',
  childMdx___headings___value = 'childMdx___headings___value',
  childMdx___headings___depth = 'childMdx___headings___depth',
  childMdx___html = 'childMdx___html',
  childMdx___mdxAST = 'childMdx___mdxAST',
  childMdx___tableOfContents = 'childMdx___tableOfContents',
  childMdx___timeToRead = 'childMdx___timeToRead',
  childMdx___wordCount___paragraphs = 'childMdx___wordCount___paragraphs',
  childMdx___wordCount___sentences = 'childMdx___wordCount___sentences',
  childMdx___wordCount___words = 'childMdx___wordCount___words',
  childMdx___id = 'childMdx___id',
  childMdx___parent___id = 'childMdx___parent___id',
  childMdx___parent___parent___id = 'childMdx___parent___parent___id',
  childMdx___parent___parent___children = 'childMdx___parent___parent___children',
  childMdx___parent___children = 'childMdx___parent___children',
  childMdx___parent___children___id = 'childMdx___parent___children___id',
  childMdx___parent___children___children = 'childMdx___parent___children___children',
  childMdx___parent___internal___content = 'childMdx___parent___internal___content',
  childMdx___parent___internal___contentDigest = 'childMdx___parent___internal___contentDigest',
  childMdx___parent___internal___description = 'childMdx___parent___internal___description',
  childMdx___parent___internal___fieldOwners = 'childMdx___parent___internal___fieldOwners',
  childMdx___parent___internal___ignoreType = 'childMdx___parent___internal___ignoreType',
  childMdx___parent___internal___mediaType = 'childMdx___parent___internal___mediaType',
  childMdx___parent___internal___owner = 'childMdx___parent___internal___owner',
  childMdx___parent___internal___type = 'childMdx___parent___internal___type',
  childMdx___children = 'childMdx___children',
  childMdx___children___id = 'childMdx___children___id',
  childMdx___children___parent___id = 'childMdx___children___parent___id',
  childMdx___children___parent___children = 'childMdx___children___parent___children',
  childMdx___children___children = 'childMdx___children___children',
  childMdx___children___children___id = 'childMdx___children___children___id',
  childMdx___children___children___children = 'childMdx___children___children___children',
  childMdx___children___internal___content = 'childMdx___children___internal___content',
  childMdx___children___internal___contentDigest = 'childMdx___children___internal___contentDigest',
  childMdx___children___internal___description = 'childMdx___children___internal___description',
  childMdx___children___internal___fieldOwners = 'childMdx___children___internal___fieldOwners',
  childMdx___children___internal___ignoreType = 'childMdx___children___internal___ignoreType',
  childMdx___children___internal___mediaType = 'childMdx___children___internal___mediaType',
  childMdx___children___internal___owner = 'childMdx___children___internal___owner',
  childMdx___children___internal___type = 'childMdx___children___internal___type',
  childMdx___internal___content = 'childMdx___internal___content',
  childMdx___internal___contentDigest = 'childMdx___internal___contentDigest',
  childMdx___internal___description = 'childMdx___internal___description',
  childMdx___internal___fieldOwners = 'childMdx___internal___fieldOwners',
  childMdx___internal___ignoreType = 'childMdx___internal___ignoreType',
  childMdx___internal___mediaType = 'childMdx___internal___mediaType',
  childMdx___internal___owner = 'childMdx___internal___owner',
  childMdx___internal___type = 'childMdx___internal___type'
}

export type ContentfulMarkdownTextTextNodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  text?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulMarkdownTextTextNodeSysFilterInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};

export type ContentfulMarkdownTextTextNodeFilterListInput = {
  elemMatch?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
};

export type ContentfulMarkdownTextTextNodeGroupConnection = {
  __typename?: 'contentfulMarkdownTextTextNodeGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMarkdownTextTextNodeEdge>;
  nodes: Array<ContentfulMarkdownTextTextNode>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulMarkdownTextTextNodeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulMarkdownTextTextNodeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulMarkdownTextTextNodeSys = {
  __typename?: 'contentfulMarkdownTextTextNodeSys';
  type?: Maybe<Scalars['String']>;
};

export type ContentfulMarkdownTextTextNodeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulReference = {
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
};

export type ContentfulResize = {
  __typename?: 'ContentfulResize';
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type ContentfulResizeFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  width?: Maybe<IntQueryOperatorInput>;
  height?: Maybe<IntQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
};

export type ContentfulResolutions = {
  __typename?: 'ContentfulResolutions';
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
};

export type ContentfulResolutionsFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulSizes = {
  __typename?: 'ContentfulSizes';
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
};

export type ContentfulSizesFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTable = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulTable';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  headings?: Maybe<Array<Maybe<Scalars['String']>>>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTableSys>;
  rows?: Maybe<ContentfulTableRows>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulTableCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTableUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTable2Column = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulTable2Column';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  heading1?: Maybe<Scalars['String']>;
  heading2?: Maybe<Scalars['String']>;
  rows?: Maybe<ContentfulTable2ColumnRows>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTable2ColumnSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulTable2ColumnCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTable2ColumnUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnConnection = {
  __typename?: 'ContentfulTable2ColumnConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTable2ColumnEdge>;
  nodes: Array<ContentfulTable2Column>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTable2ColumnGroupConnection>;
};


export type ContentfulTable2ColumnConnectionDistinctArgs = {
  field: ContentfulTable2ColumnFieldsEnum;
};


export type ContentfulTable2ColumnConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTable2ColumnFieldsEnum;
};

export type ContentfulTable2ColumnEdge = {
  __typename?: 'ContentfulTable2ColumnEdge';
  next?: Maybe<ContentfulTable2Column>;
  node: ContentfulTable2Column;
  previous?: Maybe<ContentfulTable2Column>;
};

export enum ContentfulTable2ColumnFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  heading1 = 'heading1',
  heading2 = 'heading2',
  rows___raw = 'rows___raw',
  rows___references = 'rows___references',
  rows___references___contentful_id = 'rows___references___contentful_id',
  rows___references___id = 'rows___references___id',
  rows___references___node_locale = 'rows___references___node_locale',
  rows___references___cell1___raw = 'rows___references___cell1___raw',
  rows___references___cell2___raw = 'rows___references___cell2___raw',
  rows___references___spaceId = 'rows___references___spaceId',
  rows___references___createdAt = 'rows___references___createdAt',
  rows___references___updatedAt = 'rows___references___updatedAt',
  rows___references___sys___type = 'rows___references___sys___type',
  rows___references___sys___revision = 'rows___references___sys___revision',
  rows___references___parent___id = 'rows___references___parent___id',
  rows___references___parent___children = 'rows___references___parent___children',
  rows___references___children = 'rows___references___children',
  rows___references___children___id = 'rows___references___children___id',
  rows___references___children___children = 'rows___references___children___children',
  rows___references___internal___content = 'rows___references___internal___content',
  rows___references___internal___contentDigest = 'rows___references___internal___contentDigest',
  rows___references___internal___description = 'rows___references___internal___description',
  rows___references___internal___fieldOwners = 'rows___references___internal___fieldOwners',
  rows___references___internal___ignoreType = 'rows___references___internal___ignoreType',
  rows___references___internal___mediaType = 'rows___references___internal___mediaType',
  rows___references___internal___owner = 'rows___references___internal___owner',
  rows___references___internal___type = 'rows___references___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulTable2ColumnFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  heading1?: Maybe<StringQueryOperatorInput>;
  heading2?: Maybe<StringQueryOperatorInput>;
  rows?: Maybe<ContentfulTable2ColumnRowsFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTable2ColumnSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulTable2ColumnGroupConnection = {
  __typename?: 'ContentfulTable2ColumnGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTable2ColumnEdge>;
  nodes: Array<ContentfulTable2Column>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRow = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulTable2ColumnRow';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  cell1?: Maybe<ContentfulTable2ColumnRowCell1>;
  cell2?: Maybe<ContentfulTable2ColumnRowCell2>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTable2ColumnRowSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulTable2ColumnRowCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTable2ColumnRowUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRowCell1 = {
  __typename?: 'ContentfulTable2ColumnRowCell1';
  raw?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRowCell1FilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTable2ColumnRowCell2 = {
  __typename?: 'ContentfulTable2ColumnRowCell2';
  raw?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRowCell2FilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTable2ColumnRowConnection = {
  __typename?: 'ContentfulTable2ColumnRowConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTable2ColumnRowEdge>;
  nodes: Array<ContentfulTable2ColumnRow>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTable2ColumnRowGroupConnection>;
};


export type ContentfulTable2ColumnRowConnectionDistinctArgs = {
  field: ContentfulTable2ColumnRowFieldsEnum;
};


export type ContentfulTable2ColumnRowConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTable2ColumnRowFieldsEnum;
};

export type ContentfulTable2ColumnRowEdge = {
  __typename?: 'ContentfulTable2ColumnRowEdge';
  next?: Maybe<ContentfulTable2ColumnRow>;
  node: ContentfulTable2ColumnRow;
  previous?: Maybe<ContentfulTable2ColumnRow>;
};

export enum ContentfulTable2ColumnRowFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  cell1___raw = 'cell1___raw',
  cell2___raw = 'cell2___raw',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulTable2ColumnRowFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  cell1?: Maybe<ContentfulTable2ColumnRowCell1FilterInput>;
  cell2?: Maybe<ContentfulTable2ColumnRowCell2FilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTable2ColumnRowSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulTable2ColumnRowFilterListInput = {
  elemMatch?: Maybe<ContentfulTable2ColumnRowFilterInput>;
};

export type ContentfulTable2ColumnRowGroupConnection = {
  __typename?: 'ContentfulTable2ColumnRowGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTable2ColumnRowEdge>;
  nodes: Array<ContentfulTable2ColumnRow>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRows = {
  __typename?: 'ContentfulTable2ColumnRows';
  raw?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<ContentfulTable2ColumnRow>>>;
};

export type ContentfulTable2ColumnRowsFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
  references?: Maybe<ContentfulTable2ColumnRowFilterListInput>;
};

export type ContentfulTable2ColumnRowSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTable2ColumnRowFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTable2ColumnRowSys = {
  __typename?: 'ContentfulTable2ColumnRowSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTable2ColumnRowSysContentType>;
};

export type ContentfulTable2ColumnRowSysContentType = {
  __typename?: 'ContentfulTable2ColumnRowSysContentType';
  sys?: Maybe<ContentfulTable2ColumnRowSysContentTypeSys>;
};

export type ContentfulTable2ColumnRowSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTable2ColumnRowSysContentTypeSysFilterInput>;
};

export type ContentfulTable2ColumnRowSysContentTypeSys = {
  __typename?: 'ContentfulTable2ColumnRowSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnRowSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTable2ColumnRowSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTable2ColumnRowSysContentTypeFilterInput>;
};

export type ContentfulTable2ColumnSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTable2ColumnFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTable2ColumnSys = {
  __typename?: 'ContentfulTable2ColumnSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTable2ColumnSysContentType>;
};

export type ContentfulTable2ColumnSysContentType = {
  __typename?: 'ContentfulTable2ColumnSysContentType';
  sys?: Maybe<ContentfulTable2ColumnSysContentTypeSys>;
};

export type ContentfulTable2ColumnSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTable2ColumnSysContentTypeSysFilterInput>;
};

export type ContentfulTable2ColumnSysContentTypeSys = {
  __typename?: 'ContentfulTable2ColumnSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulTable2ColumnSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTable2ColumnSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTable2ColumnSysContentTypeFilterInput>;
};

export type ContentfulTableCell = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulTableCell';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<ContentfulTableCellContent>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTableCellSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulTableCellCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTableCellUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTableCellConnection = {
  __typename?: 'ContentfulTableCellConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableCellEdge>;
  nodes: Array<ContentfulTableCell>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTableCellGroupConnection>;
};


export type ContentfulTableCellConnectionDistinctArgs = {
  field: ContentfulTableCellFieldsEnum;
};


export type ContentfulTableCellConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTableCellFieldsEnum;
};

export type ContentfulTableCellContent = {
  __typename?: 'ContentfulTableCellContent';
  raw?: Maybe<Scalars['String']>;
};

export type ContentfulTableCellContentFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTableCellEdge = {
  __typename?: 'ContentfulTableCellEdge';
  next?: Maybe<ContentfulTableCell>;
  node: ContentfulTableCell;
  previous?: Maybe<ContentfulTableCell>;
};

export enum ContentfulTableCellFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  title = 'title',
  content___raw = 'content___raw',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulTableCellFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  content?: Maybe<ContentfulTableCellContentFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableCellSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulTableCellFilterListInput = {
  elemMatch?: Maybe<ContentfulTableCellFilterInput>;
};

export type ContentfulTableCellGroupConnection = {
  __typename?: 'ContentfulTableCellGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableCellEdge>;
  nodes: Array<ContentfulTableCell>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTableCellSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTableCellFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTableCellSys = {
  __typename?: 'ContentfulTableCellSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTableCellSysContentType>;
};

export type ContentfulTableCellSysContentType = {
  __typename?: 'ContentfulTableCellSysContentType';
  sys?: Maybe<ContentfulTableCellSysContentTypeSys>;
};

export type ContentfulTableCellSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTableCellSysContentTypeSysFilterInput>;
};

export type ContentfulTableCellSysContentTypeSys = {
  __typename?: 'ContentfulTableCellSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulTableCellSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTableCellSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTableCellSysContentTypeFilterInput>;
};

export type ContentfulTableConnection = {
  __typename?: 'ContentfulTableConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableEdge>;
  nodes: Array<ContentfulTable>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTableGroupConnection>;
};


export type ContentfulTableConnectionDistinctArgs = {
  field: ContentfulTableFieldsEnum;
};


export type ContentfulTableConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTableFieldsEnum;
};

export type ContentfulTableEdge = {
  __typename?: 'ContentfulTableEdge';
  next?: Maybe<ContentfulTable>;
  node: ContentfulTable;
  previous?: Maybe<ContentfulTable>;
};

export enum ContentfulTableFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  headings = 'headings',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  rows___raw = 'rows___raw',
  rows___references = 'rows___references',
  rows___references___contentful_id = 'rows___references___contentful_id',
  rows___references___id = 'rows___references___id',
  rows___references___node_locale = 'rows___references___node_locale',
  rows___references___title = 'rows___references___title',
  rows___references___cells___raw = 'rows___references___cells___raw',
  rows___references___cells___references = 'rows___references___cells___references',
  rows___references___spaceId = 'rows___references___spaceId',
  rows___references___createdAt = 'rows___references___createdAt',
  rows___references___updatedAt = 'rows___references___updatedAt',
  rows___references___sys___type = 'rows___references___sys___type',
  rows___references___sys___revision = 'rows___references___sys___revision',
  rows___references___parent___id = 'rows___references___parent___id',
  rows___references___parent___children = 'rows___references___parent___children',
  rows___references___children = 'rows___references___children',
  rows___references___children___id = 'rows___references___children___id',
  rows___references___children___children = 'rows___references___children___children',
  rows___references___internal___content = 'rows___references___internal___content',
  rows___references___internal___contentDigest = 'rows___references___internal___contentDigest',
  rows___references___internal___description = 'rows___references___internal___description',
  rows___references___internal___fieldOwners = 'rows___references___internal___fieldOwners',
  rows___references___internal___ignoreType = 'rows___references___internal___ignoreType',
  rows___references___internal___mediaType = 'rows___references___internal___mediaType',
  rows___references___internal___owner = 'rows___references___internal___owner',
  rows___references___internal___type = 'rows___references___internal___type',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulTableFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  headings?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableSysFilterInput>;
  rows?: Maybe<ContentfulTableRowsFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulTableGroupConnection = {
  __typename?: 'ContentfulTableGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableEdge>;
  nodes: Array<ContentfulTable>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTableRow = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulTableRow';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  cells?: Maybe<ContentfulTableRowCells>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTableRowSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulTableRowCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTableRowUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTableRowCells = {
  __typename?: 'ContentfulTableRowCells';
  raw?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<ContentfulTableCell>>>;
};

export type ContentfulTableRowCellsFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
  references?: Maybe<ContentfulTableCellFilterListInput>;
};

export type ContentfulTableRowConnection = {
  __typename?: 'ContentfulTableRowConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableRowEdge>;
  nodes: Array<ContentfulTableRow>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTableRowGroupConnection>;
};


export type ContentfulTableRowConnectionDistinctArgs = {
  field: ContentfulTableRowFieldsEnum;
};


export type ContentfulTableRowConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTableRowFieldsEnum;
};

export type ContentfulTableRowEdge = {
  __typename?: 'ContentfulTableRowEdge';
  next?: Maybe<ContentfulTableRow>;
  node: ContentfulTableRow;
  previous?: Maybe<ContentfulTableRow>;
};

export enum ContentfulTableRowFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  title = 'title',
  cells___raw = 'cells___raw',
  cells___references = 'cells___references',
  cells___references___contentful_id = 'cells___references___contentful_id',
  cells___references___id = 'cells___references___id',
  cells___references___node_locale = 'cells___references___node_locale',
  cells___references___title = 'cells___references___title',
  cells___references___content___raw = 'cells___references___content___raw',
  cells___references___spaceId = 'cells___references___spaceId',
  cells___references___createdAt = 'cells___references___createdAt',
  cells___references___updatedAt = 'cells___references___updatedAt',
  cells___references___sys___type = 'cells___references___sys___type',
  cells___references___sys___revision = 'cells___references___sys___revision',
  cells___references___parent___id = 'cells___references___parent___id',
  cells___references___parent___children = 'cells___references___parent___children',
  cells___references___children = 'cells___references___children',
  cells___references___children___id = 'cells___references___children___id',
  cells___references___children___children = 'cells___references___children___children',
  cells___references___internal___content = 'cells___references___internal___content',
  cells___references___internal___contentDigest = 'cells___references___internal___contentDigest',
  cells___references___internal___description = 'cells___references___internal___description',
  cells___references___internal___fieldOwners = 'cells___references___internal___fieldOwners',
  cells___references___internal___ignoreType = 'cells___references___internal___ignoreType',
  cells___references___internal___mediaType = 'cells___references___internal___mediaType',
  cells___references___internal___owner = 'cells___references___internal___owner',
  cells___references___internal___type = 'cells___references___internal___type',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulTableRowFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  cells?: Maybe<ContentfulTableRowCellsFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableRowSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulTableRowFilterListInput = {
  elemMatch?: Maybe<ContentfulTableRowFilterInput>;
};

export type ContentfulTableRowGroupConnection = {
  __typename?: 'ContentfulTableRowGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTableRowEdge>;
  nodes: Array<ContentfulTableRow>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTableRows = {
  __typename?: 'ContentfulTableRows';
  raw?: Maybe<Scalars['String']>;
  references?: Maybe<Array<Maybe<ContentfulTableRow>>>;
};

export type ContentfulTableRowsFilterInput = {
  raw?: Maybe<StringQueryOperatorInput>;
  references?: Maybe<ContentfulTableRowFilterListInput>;
};

export type ContentfulTableRowSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTableRowFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTableRowSys = {
  __typename?: 'ContentfulTableRowSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTableRowSysContentType>;
};

export type ContentfulTableRowSysContentType = {
  __typename?: 'ContentfulTableRowSysContentType';
  sys?: Maybe<ContentfulTableRowSysContentTypeSys>;
};

export type ContentfulTableRowSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTableRowSysContentTypeSysFilterInput>;
};

export type ContentfulTableRowSysContentTypeSys = {
  __typename?: 'ContentfulTableRowSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulTableRowSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTableRowSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTableRowSysContentTypeFilterInput>;
};

export type ContentfulTableSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTableFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTableSys = {
  __typename?: 'ContentfulTableSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTableSysContentType>;
};

export type ContentfulTableSysContentType = {
  __typename?: 'ContentfulTableSysContentType';
  sys?: Maybe<ContentfulTableSysContentTypeSys>;
};

export type ContentfulTableSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTableSysContentTypeSysFilterInput>;
};

export type ContentfulTableSysContentTypeSys = {
  __typename?: 'ContentfulTableSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulTableSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTableSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTableSysContentTypeFilterInput>;
};

export type ContentfulVideoEmbed = ContentfulReference & ContentfulEntry & Node & {
  __typename?: 'ContentfulVideoEmbed';
  contentful_id: Scalars['String'];
  id: Scalars['ID'];
  node_locale: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  spaceId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulVideoEmbedSys>;
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ContentfulVideoEmbedCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulVideoEmbedUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulVideoEmbedConnection = {
  __typename?: 'ContentfulVideoEmbedConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulVideoEmbedEdge>;
  nodes: Array<ContentfulVideoEmbed>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulVideoEmbedGroupConnection>;
};


export type ContentfulVideoEmbedConnectionDistinctArgs = {
  field: ContentfulVideoEmbedFieldsEnum;
};


export type ContentfulVideoEmbedConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulVideoEmbedFieldsEnum;
};

export type ContentfulVideoEmbedEdge = {
  __typename?: 'ContentfulVideoEmbedEdge';
  next?: Maybe<ContentfulVideoEmbed>;
  node: ContentfulVideoEmbed;
  previous?: Maybe<ContentfulVideoEmbed>;
};

export enum ContentfulVideoEmbedFieldsEnum {
  contentful_id = 'contentful_id',
  id = 'id',
  node_locale = 'node_locale',
  url = 'url',
  spaceId = 'spaceId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  sys___type = 'sys___type',
  sys___revision = 'sys___revision',
  sys___contentType___sys___type = 'sys___contentType___sys___type',
  sys___contentType___sys___linkType = 'sys___contentType___sys___linkType',
  sys___contentType___sys___id = 'sys___contentType___sys___id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type ContentfulVideoEmbedFilterInput = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  url?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulVideoEmbedSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ContentfulVideoEmbedGroupConnection = {
  __typename?: 'ContentfulVideoEmbedGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<ContentfulVideoEmbedEdge>;
  nodes: Array<ContentfulVideoEmbed>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulVideoEmbedSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulVideoEmbedFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulVideoEmbedSys = {
  __typename?: 'ContentfulVideoEmbedSys';
  type?: Maybe<Scalars['String']>;
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulVideoEmbedSysContentType>;
};

export type ContentfulVideoEmbedSysContentType = {
  __typename?: 'ContentfulVideoEmbedSysContentType';
  sys?: Maybe<ContentfulVideoEmbedSysContentTypeSys>;
};

export type ContentfulVideoEmbedSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulVideoEmbedSysContentTypeSysFilterInput>;
};

export type ContentfulVideoEmbedSysContentTypeSys = {
  __typename?: 'ContentfulVideoEmbedSysContentTypeSys';
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type ContentfulVideoEmbedSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulVideoEmbedSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulVideoEmbedSysContentTypeFilterInput>;
};


export type DateQueryOperatorInput = {
  eq?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type Directory = Node & {
  __typename?: 'Directory';
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type DirectoryConnection = {
  __typename?: 'DirectoryConnection';
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  __typename?: 'DirectoryEdge';
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export enum DirectoryFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  blksize = 'blksize',
  blocks = 'blocks',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type DirectoryFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type DirectoryGroupConnection = {
  __typename?: 'DirectoryGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type DirectorySortInput = {
  fields?: Maybe<Array<Maybe<DirectoryFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type File = Node & {
  __typename?: 'File';
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  /** Returns all children nodes filtered by type Mdx */
  childrenMdx?: Maybe<Array<Maybe<Mdx>>>;
  /** Returns the first child node of type Mdx or null if there are no children of given type on this node */
  childMdx?: Maybe<Mdx>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type FileConnection = {
  __typename?: 'FileConnection';
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  __typename?: 'FileEdge';
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export enum FileFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  blksize = 'blksize',
  blocks = 'blocks',
  publicURL = 'publicURL',
  childrenMdx = 'childrenMdx',
  childrenMdx___rawBody = 'childrenMdx___rawBody',
  childrenMdx___fileAbsolutePath = 'childrenMdx___fileAbsolutePath',
  childrenMdx___frontmatter___title = 'childrenMdx___frontmatter___title',
  childrenMdx___frontmatter___order = 'childrenMdx___frontmatter___order',
  childrenMdx___frontmatter___description = 'childrenMdx___frontmatter___description',
  childrenMdx___slug = 'childrenMdx___slug',
  childrenMdx___body = 'childrenMdx___body',
  childrenMdx___excerpt = 'childrenMdx___excerpt',
  childrenMdx___headings = 'childrenMdx___headings',
  childrenMdx___headings___value = 'childrenMdx___headings___value',
  childrenMdx___headings___depth = 'childrenMdx___headings___depth',
  childrenMdx___html = 'childrenMdx___html',
  childrenMdx___mdxAST = 'childrenMdx___mdxAST',
  childrenMdx___tableOfContents = 'childrenMdx___tableOfContents',
  childrenMdx___timeToRead = 'childrenMdx___timeToRead',
  childrenMdx___wordCount___paragraphs = 'childrenMdx___wordCount___paragraphs',
  childrenMdx___wordCount___sentences = 'childrenMdx___wordCount___sentences',
  childrenMdx___wordCount___words = 'childrenMdx___wordCount___words',
  childrenMdx___id = 'childrenMdx___id',
  childrenMdx___parent___id = 'childrenMdx___parent___id',
  childrenMdx___parent___parent___id = 'childrenMdx___parent___parent___id',
  childrenMdx___parent___parent___children = 'childrenMdx___parent___parent___children',
  childrenMdx___parent___children = 'childrenMdx___parent___children',
  childrenMdx___parent___children___id = 'childrenMdx___parent___children___id',
  childrenMdx___parent___children___children = 'childrenMdx___parent___children___children',
  childrenMdx___parent___internal___content = 'childrenMdx___parent___internal___content',
  childrenMdx___parent___internal___contentDigest = 'childrenMdx___parent___internal___contentDigest',
  childrenMdx___parent___internal___description = 'childrenMdx___parent___internal___description',
  childrenMdx___parent___internal___fieldOwners = 'childrenMdx___parent___internal___fieldOwners',
  childrenMdx___parent___internal___ignoreType = 'childrenMdx___parent___internal___ignoreType',
  childrenMdx___parent___internal___mediaType = 'childrenMdx___parent___internal___mediaType',
  childrenMdx___parent___internal___owner = 'childrenMdx___parent___internal___owner',
  childrenMdx___parent___internal___type = 'childrenMdx___parent___internal___type',
  childrenMdx___children = 'childrenMdx___children',
  childrenMdx___children___id = 'childrenMdx___children___id',
  childrenMdx___children___parent___id = 'childrenMdx___children___parent___id',
  childrenMdx___children___parent___children = 'childrenMdx___children___parent___children',
  childrenMdx___children___children = 'childrenMdx___children___children',
  childrenMdx___children___children___id = 'childrenMdx___children___children___id',
  childrenMdx___children___children___children = 'childrenMdx___children___children___children',
  childrenMdx___children___internal___content = 'childrenMdx___children___internal___content',
  childrenMdx___children___internal___contentDigest = 'childrenMdx___children___internal___contentDigest',
  childrenMdx___children___internal___description = 'childrenMdx___children___internal___description',
  childrenMdx___children___internal___fieldOwners = 'childrenMdx___children___internal___fieldOwners',
  childrenMdx___children___internal___ignoreType = 'childrenMdx___children___internal___ignoreType',
  childrenMdx___children___internal___mediaType = 'childrenMdx___children___internal___mediaType',
  childrenMdx___children___internal___owner = 'childrenMdx___children___internal___owner',
  childrenMdx___children___internal___type = 'childrenMdx___children___internal___type',
  childrenMdx___internal___content = 'childrenMdx___internal___content',
  childrenMdx___internal___contentDigest = 'childrenMdx___internal___contentDigest',
  childrenMdx___internal___description = 'childrenMdx___internal___description',
  childrenMdx___internal___fieldOwners = 'childrenMdx___internal___fieldOwners',
  childrenMdx___internal___ignoreType = 'childrenMdx___internal___ignoreType',
  childrenMdx___internal___mediaType = 'childrenMdx___internal___mediaType',
  childrenMdx___internal___owner = 'childrenMdx___internal___owner',
  childrenMdx___internal___type = 'childrenMdx___internal___type',
  childMdx___rawBody = 'childMdx___rawBody',
  childMdx___fileAbsolutePath = 'childMdx___fileAbsolutePath',
  childMdx___frontmatter___title = 'childMdx___frontmatter___title',
  childMdx___frontmatter___order = 'childMdx___frontmatter___order',
  childMdx___frontmatter___description = 'childMdx___frontmatter___description',
  childMdx___slug = 'childMdx___slug',
  childMdx___body = 'childMdx___body',
  childMdx___excerpt = 'childMdx___excerpt',
  childMdx___headings = 'childMdx___headings',
  childMdx___headings___value = 'childMdx___headings___value',
  childMdx___headings___depth = 'childMdx___headings___depth',
  childMdx___html = 'childMdx___html',
  childMdx___mdxAST = 'childMdx___mdxAST',
  childMdx___tableOfContents = 'childMdx___tableOfContents',
  childMdx___timeToRead = 'childMdx___timeToRead',
  childMdx___wordCount___paragraphs = 'childMdx___wordCount___paragraphs',
  childMdx___wordCount___sentences = 'childMdx___wordCount___sentences',
  childMdx___wordCount___words = 'childMdx___wordCount___words',
  childMdx___id = 'childMdx___id',
  childMdx___parent___id = 'childMdx___parent___id',
  childMdx___parent___parent___id = 'childMdx___parent___parent___id',
  childMdx___parent___parent___children = 'childMdx___parent___parent___children',
  childMdx___parent___children = 'childMdx___parent___children',
  childMdx___parent___children___id = 'childMdx___parent___children___id',
  childMdx___parent___children___children = 'childMdx___parent___children___children',
  childMdx___parent___internal___content = 'childMdx___parent___internal___content',
  childMdx___parent___internal___contentDigest = 'childMdx___parent___internal___contentDigest',
  childMdx___parent___internal___description = 'childMdx___parent___internal___description',
  childMdx___parent___internal___fieldOwners = 'childMdx___parent___internal___fieldOwners',
  childMdx___parent___internal___ignoreType = 'childMdx___parent___internal___ignoreType',
  childMdx___parent___internal___mediaType = 'childMdx___parent___internal___mediaType',
  childMdx___parent___internal___owner = 'childMdx___parent___internal___owner',
  childMdx___parent___internal___type = 'childMdx___parent___internal___type',
  childMdx___children = 'childMdx___children',
  childMdx___children___id = 'childMdx___children___id',
  childMdx___children___parent___id = 'childMdx___children___parent___id',
  childMdx___children___parent___children = 'childMdx___children___parent___children',
  childMdx___children___children = 'childMdx___children___children',
  childMdx___children___children___id = 'childMdx___children___children___id',
  childMdx___children___children___children = 'childMdx___children___children___children',
  childMdx___children___internal___content = 'childMdx___children___internal___content',
  childMdx___children___internal___contentDigest = 'childMdx___children___internal___contentDigest',
  childMdx___children___internal___description = 'childMdx___children___internal___description',
  childMdx___children___internal___fieldOwners = 'childMdx___children___internal___fieldOwners',
  childMdx___children___internal___ignoreType = 'childMdx___children___internal___ignoreType',
  childMdx___children___internal___mediaType = 'childMdx___children___internal___mediaType',
  childMdx___children___internal___owner = 'childMdx___children___internal___owner',
  childMdx___children___internal___type = 'childMdx___children___internal___type',
  childMdx___internal___content = 'childMdx___internal___content',
  childMdx___internal___contentDigest = 'childMdx___internal___contentDigest',
  childMdx___internal___description = 'childMdx___internal___description',
  childMdx___internal___fieldOwners = 'childMdx___internal___fieldOwners',
  childMdx___internal___ignoreType = 'childMdx___internal___ignoreType',
  childMdx___internal___mediaType = 'childMdx___internal___mediaType',
  childMdx___internal___owner = 'childMdx___internal___owner',
  childMdx___internal___type = 'childMdx___internal___type',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type FileFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  publicURL?: Maybe<StringQueryOperatorInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type FileGroupConnection = {
  __typename?: 'FileGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type FileSortInput = {
  fields?: Maybe<Array<Maybe<FileFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
  eq?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export enum GatsbyImageLayout {
  FIXED = 'FIXED',
  FULL_WIDTH = 'FULL_WIDTH',
  CONSTRAINED = 'CONSTRAINED'
}

export enum GatsbyImagePlaceholder {
  DOMINANT_COLOR = 'DOMINANT_COLOR',
  TRACED_SVG = 'TRACED_SVG',
  BLURRED = 'BLURRED',
  NONE = 'NONE'
}

export enum HeadingsMdx {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6'
}

export enum ImageResizingBehavior {
  NO_CHANGE = 'NO_CHANGE',
  /** Same as the default resizing, but adds padding so that the generated image has the specified dimensions. */
  PAD = 'PAD',
  /** Crop a part of the original image to match the specified size. */
  CROP = 'CROP',
  /**
   * Crop the image to the specified dimensions, if the original image is smaller
   * than these dimensions, then the image will be upscaled.
   */
  FILL = 'FILL',
  /** When used in association with the f parameter below, creates a thumbnail from the image based on a focus area. */
  THUMB = 'THUMB',
  /** Scale the image regardless of the original aspect ratio. */
  SCALE = 'SCALE'
}

export type Internal = {
  __typename?: 'Internal';
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type InternalFilterInput = {
  content?: Maybe<StringQueryOperatorInput>;
  contentDigest?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  fieldOwners?: Maybe<StringQueryOperatorInput>;
  ignoreType?: Maybe<BooleanQueryOperatorInput>;
  mediaType?: Maybe<StringQueryOperatorInput>;
  owner?: Maybe<StringQueryOperatorInput>;
  type?: Maybe<StringQueryOperatorInput>;
};

export type IntQueryOperatorInput = {
  eq?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type JsonQueryOperatorInput = {
  eq?: Maybe<Scalars['JSON']>;
  ne?: Maybe<Scalars['JSON']>;
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  nin?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  regex?: Maybe<Scalars['JSON']>;
  glob?: Maybe<Scalars['JSON']>;
};

export type Mdx = Node & {
  __typename?: 'Mdx';
  rawBody: Scalars['String'];
  fileAbsolutePath: Scalars['String'];
  frontmatter?: Maybe<MdxFrontmatter>;
  slug?: Maybe<Scalars['String']>;
  body: Scalars['String'];
  excerpt: Scalars['String'];
  headings?: Maybe<Array<Maybe<MdxHeadingMdx>>>;
  html?: Maybe<Scalars['String']>;
  mdxAST?: Maybe<Scalars['JSON']>;
  tableOfContents?: Maybe<Scalars['JSON']>;
  timeToRead?: Maybe<Scalars['Int']>;
  wordCount?: Maybe<MdxWordCount>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type MdxExcerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>;
  truncate?: Maybe<Scalars['Boolean']>;
};


export type MdxHeadingsArgs = {
  depth?: Maybe<HeadingsMdx>;
};


export type MdxTableOfContentsArgs = {
  maxDepth?: Maybe<Scalars['Int']>;
};

export type MdxConnection = {
  __typename?: 'MdxConnection';
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<MdxGroupConnection>;
};


export type MdxConnectionDistinctArgs = {
  field: MdxFieldsEnum;
};


export type MdxConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: MdxFieldsEnum;
};

export type MdxEdge = {
  __typename?: 'MdxEdge';
  next?: Maybe<Mdx>;
  node: Mdx;
  previous?: Maybe<Mdx>;
};

export enum MdxFieldsEnum {
  rawBody = 'rawBody',
  fileAbsolutePath = 'fileAbsolutePath',
  frontmatter___title = 'frontmatter___title',
  frontmatter___order = 'frontmatter___order',
  frontmatter___description = 'frontmatter___description',
  slug = 'slug',
  body = 'body',
  excerpt = 'excerpt',
  headings = 'headings',
  headings___value = 'headings___value',
  headings___depth = 'headings___depth',
  html = 'html',
  mdxAST = 'mdxAST',
  tableOfContents = 'tableOfContents',
  timeToRead = 'timeToRead',
  wordCount___paragraphs = 'wordCount___paragraphs',
  wordCount___sentences = 'wordCount___sentences',
  wordCount___words = 'wordCount___words',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type MdxFilterInput = {
  rawBody?: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>;
  frontmatter?: Maybe<MdxFrontmatterFilterInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  body?: Maybe<StringQueryOperatorInput>;
  excerpt?: Maybe<StringQueryOperatorInput>;
  headings?: Maybe<MdxHeadingMdxFilterListInput>;
  html?: Maybe<StringQueryOperatorInput>;
  mdxAST?: Maybe<JsonQueryOperatorInput>;
  tableOfContents?: Maybe<JsonQueryOperatorInput>;
  timeToRead?: Maybe<IntQueryOperatorInput>;
  wordCount?: Maybe<MdxWordCountFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type MdxFilterListInput = {
  elemMatch?: Maybe<MdxFilterInput>;
};

export type MdxFrontmatter = {
  __typename?: 'MdxFrontmatter';
  title: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
};

export type MdxFrontmatterFilterInput = {
  title?: Maybe<StringQueryOperatorInput>;
  order?: Maybe<IntQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
};

export type MdxGroupConnection = {
  __typename?: 'MdxGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<MdxEdge>;
  nodes: Array<Mdx>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type MdxHeadingMdx = {
  __typename?: 'MdxHeadingMdx';
  value?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
};

export type MdxHeadingMdxFilterInput = {
  value?: Maybe<StringQueryOperatorInput>;
  depth?: Maybe<IntQueryOperatorInput>;
};

export type MdxHeadingMdxFilterListInput = {
  elemMatch?: Maybe<MdxHeadingMdxFilterInput>;
};

export type MdxSortInput = {
  fields?: Maybe<Array<Maybe<MdxFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type MdxWordCount = {
  __typename?: 'MdxWordCount';
  paragraphs?: Maybe<Scalars['Int']>;
  sentences?: Maybe<Scalars['Int']>;
  words?: Maybe<Scalars['Int']>;
};

export type MdxWordCountFilterInput = {
  paragraphs?: Maybe<IntQueryOperatorInput>;
  sentences?: Maybe<IntQueryOperatorInput>;
  words?: Maybe<IntQueryOperatorInput>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type NodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: Maybe<NodeFilterInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  contentfulEntry?: Maybe<ContentfulEntry>;
  allContentfulEntry: ContentfulEntryConnection;
  file?: Maybe<File>;
  allFile: FileConnection;
  directory?: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  site?: Maybe<Site>;
  allSite: SiteConnection;
  sitePage?: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  workspaceInfo?: Maybe<WorkspaceInfo>;
  allWorkspaceInfo: WorkspaceInfoConnection;
  mdx?: Maybe<Mdx>;
  allMdx: MdxConnection;
  contentfulAsset?: Maybe<ContentfulAsset>;
  allContentfulAsset: ContentfulAssetConnection;
  contentfulGuideline?: Maybe<ContentfulGuideline>;
  allContentfulGuideline: ContentfulGuidelineConnection;
  contentfulFullWidthContainer?: Maybe<ContentfulFullWidthContainer>;
  allContentfulFullWidthContainer: ContentfulFullWidthContainerConnection;
  contentfulDosAndDonts?: Maybe<ContentfulDosAndDonts>;
  allContentfulDosAndDonts: ContentfulDosAndDontsConnection;
  contentfulTableRow?: Maybe<ContentfulTableRow>;
  allContentfulTableRow: ContentfulTableRowConnection;
  contentfulTableCell?: Maybe<ContentfulTableCell>;
  allContentfulTableCell: ContentfulTableCellConnection;
  contentfulTable2Column?: Maybe<ContentfulTable2Column>;
  allContentfulTable2Column: ContentfulTable2ColumnConnection;
  contentfulTable?: Maybe<ContentfulTable>;
  allContentfulTable: ContentfulTableConnection;
  contentfulTable2ColumnRow?: Maybe<ContentfulTable2ColumnRow>;
  allContentfulTable2ColumnRow: ContentfulTable2ColumnRowConnection;
  contentfulVideoEmbed?: Maybe<ContentfulVideoEmbed>;
  allContentfulVideoEmbed: ContentfulVideoEmbedConnection;
  contentfulAssetCard?: Maybe<ContentfulAssetCard>;
  allContentfulAssetCard: ContentfulAssetCardConnection;
  contentfulAssetsContainer?: Maybe<ContentfulAssetsContainer>;
  allContentfulAssetsContainer: ContentfulAssetsContainerConnection;
  contentfulColorCard?: Maybe<ContentfulColorCard>;
  allContentfulColorCard: ContentfulColorCardConnection;
  contentfulMarkdown?: Maybe<ContentfulMarkdown>;
  allContentfulMarkdown: ContentfulMarkdownConnection;
  contentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNode>;
  allContentfulMarkdownTextTextNode: ContentfulMarkdownTextTextNodeConnection;
  contentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNode>;
  allContentfulGuidelineDescriptionTextNode: ContentfulGuidelineDescriptionTextNodeConnection;
  contentfulContentType?: Maybe<ContentfulContentType>;
  allContentfulContentType: ContentfulContentTypeConnection;
  changelogEntry?: Maybe<ChangelogEntry>;
  allChangelogEntry: ChangelogEntryConnection;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  sitePlugin?: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
};


export type QueryContentfulEntryArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
};


export type QueryAllContentfulEntryArgs = {
  filter?: Maybe<ContentfulEntryFilterInput>;
  sort?: Maybe<ContentfulEntrySortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryFileArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  publicURL?: Maybe<StringQueryOperatorInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter?: Maybe<FileFilterInput>;
  sort?: Maybe<FileSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter?: Maybe<DirectoryFilterInput>;
  sort?: Maybe<DirectorySortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime?: Maybe<DateQueryOperatorInput>;
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>;
  port?: Maybe<IntQueryOperatorInput>;
  host?: Maybe<StringQueryOperatorInput>;
  polyfill?: Maybe<BooleanQueryOperatorInput>;
  pathPrefix?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter?: Maybe<SiteFilterInput>;
  sort?: Maybe<SiteSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path?: Maybe<StringQueryOperatorInput>;
  component?: Maybe<StringQueryOperatorInput>;
  internalComponentName?: Maybe<StringQueryOperatorInput>;
  componentChunkName?: Maybe<StringQueryOperatorInput>;
  matchPath?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>;
  context?: Maybe<SitePageContextFilterInput>;
  pluginCreator?: Maybe<SitePluginFilterInput>;
  pluginCreatorId?: Maybe<StringQueryOperatorInput>;
  componentPath?: Maybe<StringQueryOperatorInput>;
};


export type QueryAllSitePageArgs = {
  filter?: Maybe<SitePageFilterInput>;
  sort?: Maybe<SitePageSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryWorkspaceInfoArgs = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  relativeDir?: Maybe<StringQueryOperatorInput>;
  packageJSON?: Maybe<JsonQueryOperatorInput>;
  maintainers?: Maybe<StringQueryOperatorInput>;
  definition?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  team?: Maybe<StringQueryOperatorInput>;
  group?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  docsList?: Maybe<StringQueryOperatorInput>;
  examplesList?: Maybe<StringQueryOperatorInput>;
  rawChangelog?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllWorkspaceInfoArgs = {
  filter?: Maybe<WorkspaceInfoFilterInput>;
  sort?: Maybe<WorkspaceInfoSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryMdxArgs = {
  rawBody?: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>;
  frontmatter?: Maybe<MdxFrontmatterFilterInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  body?: Maybe<StringQueryOperatorInput>;
  excerpt?: Maybe<StringQueryOperatorInput>;
  headings?: Maybe<MdxHeadingMdxFilterListInput>;
  html?: Maybe<StringQueryOperatorInput>;
  mdxAST?: Maybe<JsonQueryOperatorInput>;
  tableOfContents?: Maybe<JsonQueryOperatorInput>;
  timeToRead?: Maybe<IntQueryOperatorInput>;
  wordCount?: Maybe<MdxWordCountFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllMdxArgs = {
  filter?: Maybe<MdxFilterInput>;
  sort?: Maybe<MdxSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulAssetArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  file?: Maybe<ContentfulAssetFileFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetSysFilterInput>;
  fixed?: Maybe<ContentfulFixedFilterInput>;
  resolutions?: Maybe<ContentfulResolutionsFilterInput>;
  fluid?: Maybe<ContentfulFluidFilterInput>;
  sizes?: Maybe<ContentfulSizesFilterInput>;
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>;
  resize?: Maybe<ContentfulResizeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulAssetArgs = {
  filter?: Maybe<ContentfulAssetFilterInput>;
  sort?: Maybe<ContentfulAssetSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulGuidelineArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  iconGlyphName?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  category?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
  private?: Maybe<BooleanQueryOperatorInput>;
  bodyText?: Maybe<ContentfulGuidelineBodyTextFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulGuidelineSysFilterInput>;
  contentfulparent?: Maybe<ContentfulGuidelineFilterInput>;
  guideline?: Maybe<ContentfulGuidelineFilterListInput>;
  childrenContentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterListInput>;
  childContentfulGuidelineDescriptionTextNode?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulGuidelineArgs = {
  filter?: Maybe<ContentfulGuidelineFilterInput>;
  sort?: Maybe<ContentfulGuidelineSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulFullWidthContainerArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulFullWidthContainerArgs = {
  filter?: Maybe<ContentfulFullWidthContainerFilterInput>;
  sort?: Maybe<ContentfulFullWidthContainerSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulDosAndDontsArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  type?: Maybe<StringQueryOperatorInput>;
  text?: Maybe<StringQueryOperatorInput>;
  fullWidth?: Maybe<BooleanQueryOperatorInput>;
  image?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulDosAndDontsSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulDosAndDontsArgs = {
  filter?: Maybe<ContentfulDosAndDontsFilterInput>;
  sort?: Maybe<ContentfulDosAndDontsSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTableRowArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  cells?: Maybe<ContentfulTableRowCellsFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableRowSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulTableRowArgs = {
  filter?: Maybe<ContentfulTableRowFilterInput>;
  sort?: Maybe<ContentfulTableRowSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTableCellArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  content?: Maybe<ContentfulTableCellContentFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableCellSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulTableCellArgs = {
  filter?: Maybe<ContentfulTableCellFilterInput>;
  sort?: Maybe<ContentfulTableCellSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTable2ColumnArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  heading1?: Maybe<StringQueryOperatorInput>;
  heading2?: Maybe<StringQueryOperatorInput>;
  rows?: Maybe<ContentfulTable2ColumnRowsFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTable2ColumnSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulTable2ColumnArgs = {
  filter?: Maybe<ContentfulTable2ColumnFilterInput>;
  sort?: Maybe<ContentfulTable2ColumnSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTableArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  headings?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTableSysFilterInput>;
  rows?: Maybe<ContentfulTableRowsFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulTableArgs = {
  filter?: Maybe<ContentfulTableFilterInput>;
  sort?: Maybe<ContentfulTableSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTable2ColumnRowArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  cell1?: Maybe<ContentfulTable2ColumnRowCell1FilterInput>;
  cell2?: Maybe<ContentfulTable2ColumnRowCell2FilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTable2ColumnRowSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulTable2ColumnRowArgs = {
  filter?: Maybe<ContentfulTable2ColumnRowFilterInput>;
  sort?: Maybe<ContentfulTable2ColumnRowSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulVideoEmbedArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  url?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulVideoEmbedSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulVideoEmbedArgs = {
  filter?: Maybe<ContentfulVideoEmbedFilterInput>;
  sort?: Maybe<ContentfulVideoEmbedSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulAssetCardArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  asset?: Maybe<ContentfulAssetFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  private?: Maybe<BooleanQueryOperatorInput>;
  thumbnail?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetCardSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulAssetCardArgs = {
  filter?: Maybe<ContentfulAssetCardFilterInput>;
  sort?: Maybe<ContentfulAssetCardSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulAssetsContainerArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  contentfulchildren?: Maybe<ContentfulAssetsContainerContentfulchildrenFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulAssetsContainerSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulAssetsContainerArgs = {
  filter?: Maybe<ContentfulAssetsContainerFilterInput>;
  sort?: Maybe<ContentfulAssetsContainerSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulColorCardArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  hexCode?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulColorCardSysFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulColorCardArgs = {
  filter?: Maybe<ContentfulColorCardFilterInput>;
  sort?: Maybe<ContentfulColorCardSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulMarkdownArgs = {
  contentful_id?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  entryTitle?: Maybe<StringQueryOperatorInput>;
  text?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulMarkdownSysFilterInput>;
  childrenContentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNodeFilterListInput>;
  childContentfulMarkdownTextTextNode?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllContentfulMarkdownArgs = {
  filter?: Maybe<ContentfulMarkdownFilterInput>;
  sort?: Maybe<ContentfulMarkdownSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulMarkdownTextTextNodeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  text?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulMarkdownTextTextNodeSysFilterInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};


export type QueryAllContentfulMarkdownTextTextNodeArgs = {
  filter?: Maybe<ContentfulMarkdownTextTextNodeFilterInput>;
  sort?: Maybe<ContentfulMarkdownTextTextNodeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulGuidelineDescriptionTextNodeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  description?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulGuidelineDescriptionTextNodeSysFilterInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};


export type QueryAllContentfulGuidelineDescriptionTextNodeArgs = {
  filter?: Maybe<ContentfulGuidelineDescriptionTextNodeFilterInput>;
  sort?: Maybe<ContentfulGuidelineDescriptionTextNodeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulContentTypeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  displayField?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  sys?: Maybe<ContentfulContentTypeSysFilterInput>;
};


export type QueryAllContentfulContentTypeArgs = {
  filter?: Maybe<ContentfulContentTypeFilterInput>;
  sort?: Maybe<ContentfulContentTypeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryChangelogEntryArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  packageName?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  childrenMdx?: Maybe<MdxFilterListInput>;
  childMdx?: Maybe<MdxFilterInput>;
};


export type QueryAllChangelogEntryArgs = {
  filter?: Maybe<ChangelogEntryFilterInput>;
  sort?: Maybe<ChangelogEntrySortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  buildTime?: Maybe<DateQueryOperatorInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: Maybe<SiteBuildMetadataFilterInput>;
  sort?: Maybe<SiteBuildMetadataSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  resolve?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs?: Maybe<StringQueryOperatorInput>;
  browserAPIs?: Maybe<StringQueryOperatorInput>;
  ssrAPIs?: Maybe<StringQueryOperatorInput>;
  pluginFilepath?: Maybe<StringQueryOperatorInput>;
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter?: Maybe<SitePluginFilterInput>;
  sort?: Maybe<SitePluginSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Site = Node & {
  __typename?: 'Site';
  buildTime?: Maybe<Scalars['Date']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  port?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  polyfill?: Maybe<Scalars['Boolean']>;
  pathPrefix?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadata = Node & {
  __typename?: 'SiteBuildMetadata';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  buildTime?: Maybe<Scalars['Date']>;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataConnection = {
  __typename?: 'SiteBuildMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  __typename?: 'SiteBuildMetadataEdge';
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export enum SiteBuildMetadataFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  buildTime = 'buildTime'
}

export type SiteBuildMetadataFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  buildTime?: Maybe<DateQueryOperatorInput>;
};

export type SiteBuildMetadataGroupConnection = {
  __typename?: 'SiteBuildMetadataGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataSortInput = {
  fields?: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteConnection = {
  __typename?: 'SiteConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  __typename?: 'SiteEdge';
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export enum SiteFieldsEnum {
  buildTime = 'buildTime',
  siteMetadata___title = 'siteMetadata___title',
  siteMetadata___description = 'siteMetadata___description',
  siteMetadata___siteName = 'siteMetadata___siteName',
  siteMetadata___siteUrl = 'siteMetadata___siteUrl',
  port = 'port',
  host = 'host',
  polyfill = 'polyfill',
  pathPrefix = 'pathPrefix',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type SiteFilterInput = {
  buildTime?: Maybe<DateQueryOperatorInput>;
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>;
  port?: Maybe<IntQueryOperatorInput>;
  host?: Maybe<StringQueryOperatorInput>;
  polyfill?: Maybe<BooleanQueryOperatorInput>;
  pathPrefix?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type SiteGroupConnection = {
  __typename?: 'SiteGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePage = Node & {
  __typename?: 'SitePage';
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  isCreatedByStatefulCreatePages?: Maybe<Scalars['Boolean']>;
  context?: Maybe<SitePageContext>;
  pluginCreator?: Maybe<SitePlugin>;
  pluginCreatorId?: Maybe<Scalars['String']>;
  componentPath?: Maybe<Scalars['String']>;
};

export type SitePageConnection = {
  __typename?: 'SitePageConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageContext = {
  __typename?: 'SitePageContext';
  name?: Maybe<Scalars['String']>;
  mdxPath?: Maybe<Scalars['String']>;
  hasMdx?: Maybe<Scalars['Boolean']>;
  hasTabs?: Maybe<Scalars['Boolean']>;
  hasProps?: Maybe<Scalars['Boolean']>;
  hasCodeDocs?: Maybe<Scalars['Boolean']>;
  propsPath?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  frontmatter?: Maybe<SitePageContextFrontmatter>;
};

export type SitePageContextFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  mdxPath?: Maybe<StringQueryOperatorInput>;
  hasMdx?: Maybe<BooleanQueryOperatorInput>;
  hasTabs?: Maybe<BooleanQueryOperatorInput>;
  hasProps?: Maybe<BooleanQueryOperatorInput>;
  hasCodeDocs?: Maybe<BooleanQueryOperatorInput>;
  propsPath?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  frontmatter?: Maybe<SitePageContextFrontmatterFilterInput>;
};

export type SitePageContextFrontmatter = {
  __typename?: 'SitePageContextFrontmatter';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type SitePageContextFrontmatterFilterInput = {
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
};

export type SitePageEdge = {
  __typename?: 'SitePageEdge';
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export enum SitePageFieldsEnum {
  path = 'path',
  component = 'component',
  internalComponentName = 'internalComponentName',
  componentChunkName = 'componentChunkName',
  matchPath = 'matchPath',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  isCreatedByStatefulCreatePages = 'isCreatedByStatefulCreatePages',
  context___name = 'context___name',
  context___mdxPath = 'context___mdxPath',
  context___hasMdx = 'context___hasMdx',
  context___hasTabs = 'context___hasTabs',
  context___hasProps = 'context___hasProps',
  context___hasCodeDocs = 'context___hasCodeDocs',
  context___propsPath = 'context___propsPath',
  context___slug = 'context___slug',
  context___frontmatter___title = 'context___frontmatter___title',
  context___frontmatter___description = 'context___frontmatter___description',
  pluginCreator___id = 'pluginCreator___id',
  pluginCreator___parent___id = 'pluginCreator___parent___id',
  pluginCreator___parent___parent___id = 'pluginCreator___parent___parent___id',
  pluginCreator___parent___parent___children = 'pluginCreator___parent___parent___children',
  pluginCreator___parent___children = 'pluginCreator___parent___children',
  pluginCreator___parent___children___id = 'pluginCreator___parent___children___id',
  pluginCreator___parent___children___children = 'pluginCreator___parent___children___children',
  pluginCreator___parent___internal___content = 'pluginCreator___parent___internal___content',
  pluginCreator___parent___internal___contentDigest = 'pluginCreator___parent___internal___contentDigest',
  pluginCreator___parent___internal___description = 'pluginCreator___parent___internal___description',
  pluginCreator___parent___internal___fieldOwners = 'pluginCreator___parent___internal___fieldOwners',
  pluginCreator___parent___internal___ignoreType = 'pluginCreator___parent___internal___ignoreType',
  pluginCreator___parent___internal___mediaType = 'pluginCreator___parent___internal___mediaType',
  pluginCreator___parent___internal___owner = 'pluginCreator___parent___internal___owner',
  pluginCreator___parent___internal___type = 'pluginCreator___parent___internal___type',
  pluginCreator___children = 'pluginCreator___children',
  pluginCreator___children___id = 'pluginCreator___children___id',
  pluginCreator___children___parent___id = 'pluginCreator___children___parent___id',
  pluginCreator___children___parent___children = 'pluginCreator___children___parent___children',
  pluginCreator___children___children = 'pluginCreator___children___children',
  pluginCreator___children___children___id = 'pluginCreator___children___children___id',
  pluginCreator___children___children___children = 'pluginCreator___children___children___children',
  pluginCreator___children___internal___content = 'pluginCreator___children___internal___content',
  pluginCreator___children___internal___contentDigest = 'pluginCreator___children___internal___contentDigest',
  pluginCreator___children___internal___description = 'pluginCreator___children___internal___description',
  pluginCreator___children___internal___fieldOwners = 'pluginCreator___children___internal___fieldOwners',
  pluginCreator___children___internal___ignoreType = 'pluginCreator___children___internal___ignoreType',
  pluginCreator___children___internal___mediaType = 'pluginCreator___children___internal___mediaType',
  pluginCreator___children___internal___owner = 'pluginCreator___children___internal___owner',
  pluginCreator___children___internal___type = 'pluginCreator___children___internal___type',
  pluginCreator___internal___content = 'pluginCreator___internal___content',
  pluginCreator___internal___contentDigest = 'pluginCreator___internal___contentDigest',
  pluginCreator___internal___description = 'pluginCreator___internal___description',
  pluginCreator___internal___fieldOwners = 'pluginCreator___internal___fieldOwners',
  pluginCreator___internal___ignoreType = 'pluginCreator___internal___ignoreType',
  pluginCreator___internal___mediaType = 'pluginCreator___internal___mediaType',
  pluginCreator___internal___owner = 'pluginCreator___internal___owner',
  pluginCreator___internal___type = 'pluginCreator___internal___type',
  pluginCreator___resolve = 'pluginCreator___resolve',
  pluginCreator___name = 'pluginCreator___name',
  pluginCreator___version = 'pluginCreator___version',
  pluginCreator___pluginOptions___dsn = 'pluginCreator___pluginOptions___dsn',
  pluginCreator___pluginOptions___environment = 'pluginCreator___pluginOptions___environment',
  pluginCreator___pluginOptions___enabled = 'pluginCreator___pluginOptions___enabled',
  pluginCreator___pluginOptions___transpileTemplateLiterals = 'pluginCreator___pluginOptions___transpileTemplateLiterals',
  pluginCreator___pluginOptions___isTSX = 'pluginCreator___pluginOptions___isTSX',
  pluginCreator___pluginOptions___jsxPragma = 'pluginCreator___pluginOptions___jsxPragma',
  pluginCreator___pluginOptions___allExtensions = 'pluginCreator___pluginOptions___allExtensions',
  pluginCreator___pluginOptions___excludePattern = 'pluginCreator___pluginOptions___excludePattern',
  pluginCreator___pluginOptions___extensions = 'pluginCreator___pluginOptions___extensions',
  pluginCreator___pluginOptions___gatsbyRemarkPlugins = 'pluginCreator___pluginOptions___gatsbyRemarkPlugins',
  pluginCreator___pluginOptions___gatsbyRemarkPlugins___resolve = 'pluginCreator___pluginOptions___gatsbyRemarkPlugins___resolve',
  pluginCreator___pluginOptions___defaultLayouts___default = 'pluginCreator___pluginOptions___defaultLayouts___default',
  pluginCreator___pluginOptions___path = 'pluginCreator___pluginOptions___path',
  pluginCreator___pluginOptions___extraFields = 'pluginCreator___pluginOptions___extraFields',
  pluginCreator___pluginOptions___extraFields___name = 'pluginCreator___pluginOptions___extraFields___name',
  pluginCreator___pluginOptions___extraFields___definition = 'pluginCreator___pluginOptions___extraFields___definition',
  pluginCreator___pluginOptions___packages = 'pluginCreator___pluginOptions___packages',
  pluginCreator___pluginOptions___repository = 'pluginCreator___pluginOptions___repository',
  pluginCreator___pluginOptions___internalAnchorOffset = 'pluginCreator___pluginOptions___internalAnchorOffset',
  pluginCreator___pluginOptions___packageDocs___folder = 'pluginCreator___pluginOptions___packageDocs___folder',
  pluginCreator___pluginOptions___packageDocs___includeCodeTab = 'pluginCreator___pluginOptions___packageDocs___includeCodeTab',
  pluginCreator___pluginOptions___icon = 'pluginCreator___pluginOptions___icon',
  pluginCreator___pluginOptions___cache_busting_mode = 'pluginCreator___pluginOptions___cache_busting_mode',
  pluginCreator___pluginOptions___include_favicon = 'pluginCreator___pluginOptions___include_favicon',
  pluginCreator___pluginOptions___legacy = 'pluginCreator___pluginOptions___legacy',
  pluginCreator___pluginOptions___theme_color_in_head = 'pluginCreator___pluginOptions___theme_color_in_head',
  pluginCreator___pluginOptions___cacheDigest = 'pluginCreator___pluginOptions___cacheDigest',
  pluginCreator___pluginOptions___spaceId = 'pluginCreator___pluginOptions___spaceId',
  pluginCreator___pluginOptions___accessToken = 'pluginCreator___pluginOptions___accessToken',
  pluginCreator___pluginOptions___forceFullSync = 'pluginCreator___pluginOptions___forceFullSync',
  pluginCreator___pluginOptions___host = 'pluginCreator___pluginOptions___host',
  pluginCreator___pluginOptions___downloadLocal = 'pluginCreator___pluginOptions___downloadLocal',
  pluginCreator___pluginOptions___pageLimit = 'pluginCreator___pluginOptions___pageLimit',
  pluginCreator___pluginOptions___assetDownloadWorkers = 'pluginCreator___pluginOptions___assetDownloadWorkers',
  pluginCreator___pluginOptions___useNameForId = 'pluginCreator___pluginOptions___useNameForId',
  pluginCreator___pluginOptions___name = 'pluginCreator___pluginOptions___name',
  pluginCreator___pluginOptions___trackingId = 'pluginCreator___pluginOptions___trackingId',
  pluginCreator___pluginOptions___head = 'pluginCreator___pluginOptions___head',
  pluginCreator___pluginOptions___anonymize = 'pluginCreator___pluginOptions___anonymize',
  pluginCreator___pluginOptions___respectDNT = 'pluginCreator___pluginOptions___respectDNT',
  pluginCreator___pluginOptions___pageTransitionDelay = 'pluginCreator___pluginOptions___pageTransitionDelay',
  pluginCreator___pluginOptions___defer = 'pluginCreator___pluginOptions___defer',
  pluginCreator___pluginOptions___appId = 'pluginCreator___pluginOptions___appId',
  pluginCreator___pluginOptions___apiKey = 'pluginCreator___pluginOptions___apiKey',
  pluginCreator___pluginOptions___queries = 'pluginCreator___pluginOptions___queries',
  pluginCreator___pluginOptions___queries___query = 'pluginCreator___pluginOptions___queries___query',
  pluginCreator___pluginOptions___queries___indexName = 'pluginCreator___pluginOptions___queries___indexName',
  pluginCreator___pluginOptions___chunkSize = 'pluginCreator___pluginOptions___chunkSize',
  pluginCreator___pluginOptions___pathCheck = 'pluginCreator___pluginOptions___pathCheck',
  pluginCreator___nodeAPIs = 'pluginCreator___nodeAPIs',
  pluginCreator___browserAPIs = 'pluginCreator___browserAPIs',
  pluginCreator___ssrAPIs = 'pluginCreator___ssrAPIs',
  pluginCreator___pluginFilepath = 'pluginCreator___pluginFilepath',
  pluginCreator___packageJson___name = 'pluginCreator___packageJson___name',
  pluginCreator___packageJson___description = 'pluginCreator___packageJson___description',
  pluginCreator___packageJson___version = 'pluginCreator___packageJson___version',
  pluginCreator___packageJson___main = 'pluginCreator___packageJson___main',
  pluginCreator___packageJson___author = 'pluginCreator___packageJson___author',
  pluginCreator___packageJson___license = 'pluginCreator___packageJson___license',
  pluginCreator___packageJson___dependencies = 'pluginCreator___packageJson___dependencies',
  pluginCreator___packageJson___dependencies___name = 'pluginCreator___packageJson___dependencies___name',
  pluginCreator___packageJson___dependencies___version = 'pluginCreator___packageJson___dependencies___version',
  pluginCreator___packageJson___devDependencies = 'pluginCreator___packageJson___devDependencies',
  pluginCreator___packageJson___devDependencies___name = 'pluginCreator___packageJson___devDependencies___name',
  pluginCreator___packageJson___devDependencies___version = 'pluginCreator___packageJson___devDependencies___version',
  pluginCreator___packageJson___peerDependencies = 'pluginCreator___packageJson___peerDependencies',
  pluginCreator___packageJson___peerDependencies___name = 'pluginCreator___packageJson___peerDependencies___name',
  pluginCreator___packageJson___peerDependencies___version = 'pluginCreator___packageJson___peerDependencies___version',
  pluginCreator___packageJson___keywords = 'pluginCreator___packageJson___keywords',
  pluginCreatorId = 'pluginCreatorId',
  componentPath = 'componentPath'
}

export type SitePageFilterInput = {
  path?: Maybe<StringQueryOperatorInput>;
  component?: Maybe<StringQueryOperatorInput>;
  internalComponentName?: Maybe<StringQueryOperatorInput>;
  componentChunkName?: Maybe<StringQueryOperatorInput>;
  matchPath?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>;
  context?: Maybe<SitePageContextFilterInput>;
  pluginCreator?: Maybe<SitePluginFilterInput>;
  pluginCreatorId?: Maybe<StringQueryOperatorInput>;
  componentPath?: Maybe<StringQueryOperatorInput>;
};

export type SitePageGroupConnection = {
  __typename?: 'SitePageGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePageSortInput = {
  fields?: Maybe<Array<Maybe<SitePageFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
  __typename?: 'SitePlugin';
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  resolve?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<SitePluginPluginOptions>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath?: Maybe<Scalars['String']>;
  packageJson?: Maybe<SitePluginPackageJson>;
};

export type SitePluginConnection = {
  __typename?: 'SitePluginConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  __typename?: 'SitePluginEdge';
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export enum SitePluginFieldsEnum {
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type',
  resolve = 'resolve',
  name = 'name',
  version = 'version',
  pluginOptions___dsn = 'pluginOptions___dsn',
  pluginOptions___environment = 'pluginOptions___environment',
  pluginOptions___enabled = 'pluginOptions___enabled',
  pluginOptions___transpileTemplateLiterals = 'pluginOptions___transpileTemplateLiterals',
  pluginOptions___isTSX = 'pluginOptions___isTSX',
  pluginOptions___jsxPragma = 'pluginOptions___jsxPragma',
  pluginOptions___allExtensions = 'pluginOptions___allExtensions',
  pluginOptions___excludePattern = 'pluginOptions___excludePattern',
  pluginOptions___extensions = 'pluginOptions___extensions',
  pluginOptions___gatsbyRemarkPlugins = 'pluginOptions___gatsbyRemarkPlugins',
  pluginOptions___gatsbyRemarkPlugins___resolve = 'pluginOptions___gatsbyRemarkPlugins___resolve',
  pluginOptions___defaultLayouts___default = 'pluginOptions___defaultLayouts___default',
  pluginOptions___path = 'pluginOptions___path',
  pluginOptions___extraFields = 'pluginOptions___extraFields',
  pluginOptions___extraFields___name = 'pluginOptions___extraFields___name',
  pluginOptions___extraFields___definition = 'pluginOptions___extraFields___definition',
  pluginOptions___packages = 'pluginOptions___packages',
  pluginOptions___repository = 'pluginOptions___repository',
  pluginOptions___internalAnchorOffset = 'pluginOptions___internalAnchorOffset',
  pluginOptions___packageDocs___folder = 'pluginOptions___packageDocs___folder',
  pluginOptions___packageDocs___includeCodeTab = 'pluginOptions___packageDocs___includeCodeTab',
  pluginOptions___icon = 'pluginOptions___icon',
  pluginOptions___cache_busting_mode = 'pluginOptions___cache_busting_mode',
  pluginOptions___include_favicon = 'pluginOptions___include_favicon',
  pluginOptions___legacy = 'pluginOptions___legacy',
  pluginOptions___theme_color_in_head = 'pluginOptions___theme_color_in_head',
  pluginOptions___cacheDigest = 'pluginOptions___cacheDigest',
  pluginOptions___spaceId = 'pluginOptions___spaceId',
  pluginOptions___accessToken = 'pluginOptions___accessToken',
  pluginOptions___forceFullSync = 'pluginOptions___forceFullSync',
  pluginOptions___host = 'pluginOptions___host',
  pluginOptions___downloadLocal = 'pluginOptions___downloadLocal',
  pluginOptions___pageLimit = 'pluginOptions___pageLimit',
  pluginOptions___assetDownloadWorkers = 'pluginOptions___assetDownloadWorkers',
  pluginOptions___useNameForId = 'pluginOptions___useNameForId',
  pluginOptions___name = 'pluginOptions___name',
  pluginOptions___trackingId = 'pluginOptions___trackingId',
  pluginOptions___head = 'pluginOptions___head',
  pluginOptions___anonymize = 'pluginOptions___anonymize',
  pluginOptions___respectDNT = 'pluginOptions___respectDNT',
  pluginOptions___pageTransitionDelay = 'pluginOptions___pageTransitionDelay',
  pluginOptions___defer = 'pluginOptions___defer',
  pluginOptions___appId = 'pluginOptions___appId',
  pluginOptions___apiKey = 'pluginOptions___apiKey',
  pluginOptions___queries = 'pluginOptions___queries',
  pluginOptions___queries___query = 'pluginOptions___queries___query',
  pluginOptions___queries___indexName = 'pluginOptions___queries___indexName',
  pluginOptions___queries___settings___searchableAttributes = 'pluginOptions___queries___settings___searchableAttributes',
  pluginOptions___queries___settings___attributesToSnippet = 'pluginOptions___queries___settings___attributesToSnippet',
  pluginOptions___chunkSize = 'pluginOptions___chunkSize',
  pluginOptions___pathCheck = 'pluginOptions___pathCheck',
  nodeAPIs = 'nodeAPIs',
  browserAPIs = 'browserAPIs',
  ssrAPIs = 'ssrAPIs',
  pluginFilepath = 'pluginFilepath',
  packageJson___name = 'packageJson___name',
  packageJson___description = 'packageJson___description',
  packageJson___version = 'packageJson___version',
  packageJson___main = 'packageJson___main',
  packageJson___author = 'packageJson___author',
  packageJson___license = 'packageJson___license',
  packageJson___dependencies = 'packageJson___dependencies',
  packageJson___dependencies___name = 'packageJson___dependencies___name',
  packageJson___dependencies___version = 'packageJson___dependencies___version',
  packageJson___devDependencies = 'packageJson___devDependencies',
  packageJson___devDependencies___name = 'packageJson___devDependencies___name',
  packageJson___devDependencies___version = 'packageJson___devDependencies___version',
  packageJson___peerDependencies = 'packageJson___peerDependencies',
  packageJson___peerDependencies___name = 'packageJson___peerDependencies___name',
  packageJson___peerDependencies___version = 'packageJson___peerDependencies___version',
  packageJson___keywords = 'packageJson___keywords'
}

export type SitePluginFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  resolve?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs?: Maybe<StringQueryOperatorInput>;
  browserAPIs?: Maybe<StringQueryOperatorInput>;
  ssrAPIs?: Maybe<StringQueryOperatorInput>;
  pluginFilepath?: Maybe<StringQueryOperatorInput>;
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>;
};

export type SitePluginGroupConnection = {
  __typename?: 'SitePluginGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJson = {
  __typename?: 'SitePluginPackageJson';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  main?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  dependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>;
  devDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>;
  peerDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPackageJsonDependencies = {
  __typename?: 'SitePluginPackageJsonDependencies';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

export type SitePluginPackageJsonDevDependencies = {
  __typename?: 'SitePluginPackageJsonDevDependencies';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

export type SitePluginPackageJsonFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  main?: Maybe<StringQueryOperatorInput>;
  author?: Maybe<StringQueryOperatorInput>;
  license?: Maybe<StringQueryOperatorInput>;
  dependencies?: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  devDependencies?: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  peerDependencies?: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  keywords?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependencies = {
  __typename?: 'SitePluginPackageJsonPeerDependencies';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

export type SitePluginPluginOptions = {
  __typename?: 'SitePluginPluginOptions';
  dsn?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  transpileTemplateLiterals?: Maybe<Scalars['Boolean']>;
  isTSX?: Maybe<Scalars['Boolean']>;
  jsxPragma?: Maybe<Scalars['String']>;
  allExtensions?: Maybe<Scalars['Boolean']>;
  excludePattern?: Maybe<Scalars['String']>;
  extensions?: Maybe<Array<Maybe<Scalars['String']>>>;
  gatsbyRemarkPlugins?: Maybe<Array<Maybe<SitePluginPluginOptionsGatsbyRemarkPlugins>>>;
  defaultLayouts?: Maybe<SitePluginPluginOptionsDefaultLayouts>;
  path?: Maybe<Scalars['String']>;
  extraFields?: Maybe<Array<Maybe<SitePluginPluginOptionsExtraFields>>>;
  packages?: Maybe<Array<Maybe<Scalars['String']>>>;
  repository?: Maybe<Scalars['String']>;
  internalAnchorOffset?: Maybe<Scalars['String']>;
  packageDocs?: Maybe<SitePluginPluginOptionsPackageDocs>;
  icon?: Maybe<Scalars['String']>;
  cache_busting_mode?: Maybe<Scalars['String']>;
  include_favicon?: Maybe<Scalars['Boolean']>;
  legacy?: Maybe<Scalars['Boolean']>;
  theme_color_in_head?: Maybe<Scalars['Boolean']>;
  cacheDigest?: Maybe<Scalars['String']>;
  spaceId?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  forceFullSync?: Maybe<Scalars['Boolean']>;
  host?: Maybe<Scalars['String']>;
  downloadLocal?: Maybe<Scalars['Boolean']>;
  pageLimit?: Maybe<Scalars['Int']>;
  assetDownloadWorkers?: Maybe<Scalars['Int']>;
  useNameForId?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  trackingId?: Maybe<Scalars['String']>;
  head?: Maybe<Scalars['Boolean']>;
  anonymize?: Maybe<Scalars['Boolean']>;
  respectDNT?: Maybe<Scalars['Boolean']>;
  pageTransitionDelay?: Maybe<Scalars['Int']>;
  defer?: Maybe<Scalars['Boolean']>;
  appId?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['String']>;
  queries?: Maybe<Array<Maybe<SitePluginPluginOptionsQueries>>>;
  chunkSize?: Maybe<Scalars['Int']>;
  pathCheck?: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsDefaultLayouts = {
  __typename?: 'SitePluginPluginOptionsDefaultLayouts';
  default?: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsDefaultLayoutsFilterInput = {
  default?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsExtraFields = {
  __typename?: 'SitePluginPluginOptionsExtraFields';
  name?: Maybe<Scalars['String']>;
  definition?: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsExtraFieldsFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  definition?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsExtraFieldsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsExtraFieldsFilterInput>;
};

export type SitePluginPluginOptionsFilterInput = {
  dsn?: Maybe<StringQueryOperatorInput>;
  environment?: Maybe<StringQueryOperatorInput>;
  enabled?: Maybe<BooleanQueryOperatorInput>;
  transpileTemplateLiterals?: Maybe<BooleanQueryOperatorInput>;
  isTSX?: Maybe<BooleanQueryOperatorInput>;
  jsxPragma?: Maybe<StringQueryOperatorInput>;
  allExtensions?: Maybe<BooleanQueryOperatorInput>;
  excludePattern?: Maybe<StringQueryOperatorInput>;
  extensions?: Maybe<StringQueryOperatorInput>;
  gatsbyRemarkPlugins?: Maybe<SitePluginPluginOptionsGatsbyRemarkPluginsFilterListInput>;
  defaultLayouts?: Maybe<SitePluginPluginOptionsDefaultLayoutsFilterInput>;
  path?: Maybe<StringQueryOperatorInput>;
  extraFields?: Maybe<SitePluginPluginOptionsExtraFieldsFilterListInput>;
  packages?: Maybe<StringQueryOperatorInput>;
  repository?: Maybe<StringQueryOperatorInput>;
  internalAnchorOffset?: Maybe<StringQueryOperatorInput>;
  packageDocs?: Maybe<SitePluginPluginOptionsPackageDocsFilterInput>;
  icon?: Maybe<StringQueryOperatorInput>;
  cache_busting_mode?: Maybe<StringQueryOperatorInput>;
  include_favicon?: Maybe<BooleanQueryOperatorInput>;
  legacy?: Maybe<BooleanQueryOperatorInput>;
  theme_color_in_head?: Maybe<BooleanQueryOperatorInput>;
  cacheDigest?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  accessToken?: Maybe<StringQueryOperatorInput>;
  forceFullSync?: Maybe<BooleanQueryOperatorInput>;
  host?: Maybe<StringQueryOperatorInput>;
  downloadLocal?: Maybe<BooleanQueryOperatorInput>;
  pageLimit?: Maybe<IntQueryOperatorInput>;
  assetDownloadWorkers?: Maybe<IntQueryOperatorInput>;
  useNameForId?: Maybe<BooleanQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  trackingId?: Maybe<StringQueryOperatorInput>;
  head?: Maybe<BooleanQueryOperatorInput>;
  anonymize?: Maybe<BooleanQueryOperatorInput>;
  respectDNT?: Maybe<BooleanQueryOperatorInput>;
  pageTransitionDelay?: Maybe<IntQueryOperatorInput>;
  defer?: Maybe<BooleanQueryOperatorInput>;
  appId?: Maybe<StringQueryOperatorInput>;
  apiKey?: Maybe<StringQueryOperatorInput>;
  queries?: Maybe<SitePluginPluginOptionsQueriesFilterListInput>;
  chunkSize?: Maybe<IntQueryOperatorInput>;
  pathCheck?: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsGatsbyRemarkPlugins = {
  __typename?: 'SitePluginPluginOptionsGatsbyRemarkPlugins';
  resolve?: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsGatsbyRemarkPluginsFilterInput = {
  resolve?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsGatsbyRemarkPluginsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsGatsbyRemarkPluginsFilterInput>;
};

export type SitePluginPluginOptionsPackageDocs = {
  __typename?: 'SitePluginPluginOptionsPackageDocs';
  folder?: Maybe<Scalars['String']>;
  includeCodeTab?: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsPackageDocsFilterInput = {
  folder?: Maybe<StringQueryOperatorInput>;
  includeCodeTab?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsQueries = {
  __typename?: 'SitePluginPluginOptionsQueries';
  query?: Maybe<Scalars['String']>;
  indexName?: Maybe<Scalars['String']>;
  settings?: Maybe<SitePluginPluginOptionsQueriesSettings>;
};

export type SitePluginPluginOptionsQueriesFilterInput = {
  query?: Maybe<StringQueryOperatorInput>;
  indexName?: Maybe<StringQueryOperatorInput>;
  settings?: Maybe<SitePluginPluginOptionsQueriesSettingsFilterInput>;
};

export type SitePluginPluginOptionsQueriesFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsQueriesFilterInput>;
};

export type SitePluginPluginOptionsQueriesSettings = {
  __typename?: 'SitePluginPluginOptionsQueriesSettings';
  searchableAttributes?: Maybe<Array<Maybe<Scalars['String']>>>;
  attributesToSnippet?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPluginOptionsQueriesSettingsFilterInput = {
  searchableAttributes?: Maybe<StringQueryOperatorInput>;
  attributesToSnippet?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginSortInput = {
  fields?: Maybe<Array<Maybe<SitePluginFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteSiteMetadata = {
  __typename?: 'SiteSiteMetadata';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  siteName?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataFilterInput = {
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  siteName?: Maybe<StringQueryOperatorInput>;
  siteUrl?: Maybe<StringQueryOperatorInput>;
};

export type SiteSortInput = {
  fields?: Maybe<Array<Maybe<SiteFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['String']>;
  glob?: Maybe<Scalars['String']>;
};

export type WorkspaceInfo = Node & {
  __typename?: 'workspaceInfo';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  dir?: Maybe<Scalars['String']>;
  relativeDir?: Maybe<Scalars['String']>;
  packageJSON: Scalars['JSON'];
  maintainers?: Maybe<Array<Maybe<Scalars['String']>>>;
  definition?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  team?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  docsList?: Maybe<Array<Maybe<Scalars['String']>>>;
  examplesList?: Maybe<Array<Maybe<Scalars['String']>>>;
  rawChangelog?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type WorkspaceInfoConnection = {
  __typename?: 'workspaceInfoConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkspaceInfoEdge>;
  nodes: Array<WorkspaceInfo>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<WorkspaceInfoGroupConnection>;
};


export type WorkspaceInfoConnectionDistinctArgs = {
  field: WorkspaceInfoFieldsEnum;
};


export type WorkspaceInfoConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: WorkspaceInfoFieldsEnum;
};

export type WorkspaceInfoEdge = {
  __typename?: 'workspaceInfoEdge';
  next?: Maybe<WorkspaceInfo>;
  node: WorkspaceInfo;
  previous?: Maybe<WorkspaceInfo>;
};

export enum WorkspaceInfoFieldsEnum {
  name = 'name',
  version = 'version',
  dir = 'dir',
  relativeDir = 'relativeDir',
  packageJSON = 'packageJSON',
  maintainers = 'maintainers',
  definition = 'definition',
  slug = 'slug',
  title = 'title',
  team = 'team',
  group = 'group',
  description = 'description',
  docsList = 'docsList',
  examplesList = 'examplesList',
  rawChangelog = 'rawChangelog',
  id = 'id',
  parent___id = 'parent___id',
  parent___parent___id = 'parent___parent___id',
  parent___parent___parent___id = 'parent___parent___parent___id',
  parent___parent___parent___children = 'parent___parent___parent___children',
  parent___parent___children = 'parent___parent___children',
  parent___parent___children___id = 'parent___parent___children___id',
  parent___parent___children___children = 'parent___parent___children___children',
  parent___parent___internal___content = 'parent___parent___internal___content',
  parent___parent___internal___contentDigest = 'parent___parent___internal___contentDigest',
  parent___parent___internal___description = 'parent___parent___internal___description',
  parent___parent___internal___fieldOwners = 'parent___parent___internal___fieldOwners',
  parent___parent___internal___ignoreType = 'parent___parent___internal___ignoreType',
  parent___parent___internal___mediaType = 'parent___parent___internal___mediaType',
  parent___parent___internal___owner = 'parent___parent___internal___owner',
  parent___parent___internal___type = 'parent___parent___internal___type',
  parent___children = 'parent___children',
  parent___children___id = 'parent___children___id',
  parent___children___parent___id = 'parent___children___parent___id',
  parent___children___parent___children = 'parent___children___parent___children',
  parent___children___children = 'parent___children___children',
  parent___children___children___id = 'parent___children___children___id',
  parent___children___children___children = 'parent___children___children___children',
  parent___children___internal___content = 'parent___children___internal___content',
  parent___children___internal___contentDigest = 'parent___children___internal___contentDigest',
  parent___children___internal___description = 'parent___children___internal___description',
  parent___children___internal___fieldOwners = 'parent___children___internal___fieldOwners',
  parent___children___internal___ignoreType = 'parent___children___internal___ignoreType',
  parent___children___internal___mediaType = 'parent___children___internal___mediaType',
  parent___children___internal___owner = 'parent___children___internal___owner',
  parent___children___internal___type = 'parent___children___internal___type',
  parent___internal___content = 'parent___internal___content',
  parent___internal___contentDigest = 'parent___internal___contentDigest',
  parent___internal___description = 'parent___internal___description',
  parent___internal___fieldOwners = 'parent___internal___fieldOwners',
  parent___internal___ignoreType = 'parent___internal___ignoreType',
  parent___internal___mediaType = 'parent___internal___mediaType',
  parent___internal___owner = 'parent___internal___owner',
  parent___internal___type = 'parent___internal___type',
  children = 'children',
  children___id = 'children___id',
  children___parent___id = 'children___parent___id',
  children___parent___parent___id = 'children___parent___parent___id',
  children___parent___parent___children = 'children___parent___parent___children',
  children___parent___children = 'children___parent___children',
  children___parent___children___id = 'children___parent___children___id',
  children___parent___children___children = 'children___parent___children___children',
  children___parent___internal___content = 'children___parent___internal___content',
  children___parent___internal___contentDigest = 'children___parent___internal___contentDigest',
  children___parent___internal___description = 'children___parent___internal___description',
  children___parent___internal___fieldOwners = 'children___parent___internal___fieldOwners',
  children___parent___internal___ignoreType = 'children___parent___internal___ignoreType',
  children___parent___internal___mediaType = 'children___parent___internal___mediaType',
  children___parent___internal___owner = 'children___parent___internal___owner',
  children___parent___internal___type = 'children___parent___internal___type',
  children___children = 'children___children',
  children___children___id = 'children___children___id',
  children___children___parent___id = 'children___children___parent___id',
  children___children___parent___children = 'children___children___parent___children',
  children___children___children = 'children___children___children',
  children___children___children___id = 'children___children___children___id',
  children___children___children___children = 'children___children___children___children',
  children___children___internal___content = 'children___children___internal___content',
  children___children___internal___contentDigest = 'children___children___internal___contentDigest',
  children___children___internal___description = 'children___children___internal___description',
  children___children___internal___fieldOwners = 'children___children___internal___fieldOwners',
  children___children___internal___ignoreType = 'children___children___internal___ignoreType',
  children___children___internal___mediaType = 'children___children___internal___mediaType',
  children___children___internal___owner = 'children___children___internal___owner',
  children___children___internal___type = 'children___children___internal___type',
  children___internal___content = 'children___internal___content',
  children___internal___contentDigest = 'children___internal___contentDigest',
  children___internal___description = 'children___internal___description',
  children___internal___fieldOwners = 'children___internal___fieldOwners',
  children___internal___ignoreType = 'children___internal___ignoreType',
  children___internal___mediaType = 'children___internal___mediaType',
  children___internal___owner = 'children___internal___owner',
  children___internal___type = 'children___internal___type',
  internal___content = 'internal___content',
  internal___contentDigest = 'internal___contentDigest',
  internal___description = 'internal___description',
  internal___fieldOwners = 'internal___fieldOwners',
  internal___ignoreType = 'internal___ignoreType',
  internal___mediaType = 'internal___mediaType',
  internal___owner = 'internal___owner',
  internal___type = 'internal___type'
}

export type WorkspaceInfoFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  relativeDir?: Maybe<StringQueryOperatorInput>;
  packageJSON?: Maybe<JsonQueryOperatorInput>;
  maintainers?: Maybe<StringQueryOperatorInput>;
  definition?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  title?: Maybe<StringQueryOperatorInput>;
  team?: Maybe<StringQueryOperatorInput>;
  group?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  docsList?: Maybe<StringQueryOperatorInput>;
  examplesList?: Maybe<StringQueryOperatorInput>;
  rawChangelog?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type WorkspaceInfoGroupConnection = {
  __typename?: 'workspaceInfoGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkspaceInfoEdge>;
  nodes: Array<WorkspaceInfo>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type WorkspaceInfoSortInput = {
  fields?: Maybe<Array<Maybe<WorkspaceInfoFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { allContentfulGuideline: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'private'>
      & { contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ) }
);

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = (
  { __typename?: 'Query' }
  & { allContentfulGuideline: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'private'>
      & { contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ) }
);

export type Unnamed_3_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_3_Query = (
  { __typename?: 'Query' }
  & { allContentfulGuideline: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'private'>
      & { contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ) }
);

export type Unnamed_4_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_4_Query = (
  { __typename?: 'Query' }
  & { allContentfulGuideline: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'private'>
      & { contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ) }
);

export type Unnamed_5_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_5_Query = (
  { __typename?: 'Query' }
  & { allContentfulGuideline: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'private'>
      & { contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ) }
);

export type Unnamed_6_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_6_Query = (
  { __typename?: 'Query' }
  & { contents: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ), contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )> }
);

export type Unnamed_7_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_7_Query = (
  { __typename?: 'Query' }
  & { components: (
    { __typename?: 'workspaceInfoConnection' }
    & { nodes: Array<(
      { __typename?: 'workspaceInfo' }
      & Pick<WorkspaceInfo, 'description' | 'title' | 'slug'>
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )>, thumbnails: (
    { __typename?: 'FileConnection' }
    & { nodes: Array<(
      { __typename?: 'File' }
      & Pick<File, 'name' | 'publicURL'>
    )> }
  ) }
);

export type Unnamed_8_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_8_Query = (
  { __typename?: 'Query' }
  & { contents: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ), contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )> }
);

export type Unnamed_9_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_9_Query = (
  { __typename?: 'Query' }
  & { contents: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ), contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )> }
);

export type Unnamed_10_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_10_Query = (
  { __typename?: 'Query' }
  & { hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )>, featuredImageComponents?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )>, featuredImagePatterns?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )>, brand: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'title' | 'slug' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ) }
    )> }
  ), foundations: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'title' | 'slug' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ) }
    )> }
  ), content: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'title' | 'slug' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ) }
    )> }
  ), resources: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'title' | 'slug' | 'category' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ) }
    )> }
  ) }
);

export type Unnamed_11_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_11_Query = (
  { __typename?: 'Query' }
  & { contents: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ), contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )> }
);

export type Unnamed_12_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_12_Query = (
  { __typename?: 'Query' }
  & { contents: (
    { __typename?: 'ContentfulGuidelineConnection' }
    & { nodes: Array<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug' | 'title' | 'iconGlyphName'>
      & { description: (
        { __typename?: 'contentfulGuidelineDescriptionTextNode' }
        & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
      ), contentfulparent?: Maybe<(
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'slug'>
      )> }
    )> }
  ), hero?: Maybe<(
    { __typename?: 'File' }
    & Pick<File, 'publicURL'>
  )> }
);

export type Unnamed_13_QueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type Unnamed_13_Query = (
  { __typename?: 'Query' }
  & { contentfulGuideline?: Maybe<(
    { __typename?: 'ContentfulGuideline' }
    & Pick<ContentfulGuideline, 'title' | 'category'>
    & { contentfulparent?: Maybe<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug'>
    )>, description: (
      { __typename?: 'contentfulGuidelineDescriptionTextNode' }
      & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
    ), bodyText?: Maybe<(
      { __typename?: 'ContentfulGuidelineBodyText' }
      & Pick<ContentfulGuidelineBodyText, 'raw'>
      & { references?: Maybe<Array<Maybe<(
        { __typename?: 'ContentfulAsset' }
        & Pick<ContentfulAsset, 'contentful_id' | 'description'>
        & { file?: Maybe<(
          { __typename?: 'ContentfulAssetFile' }
          & Pick<ContentfulAssetFile, 'url'>
        )> }
      ) | (
        { __typename?: 'ContentfulAssetCard' }
        & Pick<ContentfulAssetCard, 'contentful_id' | 'title'>
        & { asset: (
          { __typename?: 'ContentfulAsset' }
          & { file?: Maybe<(
            { __typename?: 'ContentfulAssetFile' }
            & Pick<ContentfulAssetFile, 'url'>
            & { details?: Maybe<(
              { __typename?: 'ContentfulAssetFileDetails' }
              & Pick<ContentfulAssetFileDetails, 'size'>
            )> }
          )> }
        ), thumbnail?: Maybe<(
          { __typename?: 'ContentfulAsset' }
          & { file?: Maybe<(
            { __typename?: 'ContentfulAssetFile' }
            & Pick<ContentfulAssetFile, 'url'>
          )> }
        )> }
      ) | (
        { __typename?: 'ContentfulAssetsContainer' }
        & Pick<ContentfulAssetsContainer, 'contentful_id'>
        & { contentfulchildren?: Maybe<(
          { __typename?: 'ContentfulAssetsContainerContentfulchildren' }
          & { references?: Maybe<Array<Maybe<(
            { __typename?: 'ContentfulAssetCard' }
            & { asset: (
              { __typename?: 'ContentfulAsset' }
              & Pick<ContentfulAsset, 'contentful_id' | 'title'>
              & { file?: Maybe<(
                { __typename?: 'ContentfulAssetFile' }
                & Pick<ContentfulAssetFile, 'url'>
                & { details?: Maybe<(
                  { __typename?: 'ContentfulAssetFileDetails' }
                  & Pick<ContentfulAssetFileDetails, 'size'>
                )> }
              )> }
            ), thumbnail?: Maybe<(
              { __typename?: 'ContentfulAsset' }
              & Pick<ContentfulAsset, 'contentful_id'>
              & { file?: Maybe<(
                { __typename?: 'ContentfulAssetFile' }
                & Pick<ContentfulAssetFile, 'url'>
              )> }
            )> }
          )>>> }
        )> }
      ) | (
        { __typename?: 'ContentfulColorCard' }
        & Pick<ContentfulColorCard, 'contentful_id' | 'name' | 'hexCode'>
      ) | (
        { __typename?: 'ContentfulDosAndDonts' }
        & Pick<ContentfulDosAndDonts, 'contentful_id' | 'text' | 'type'>
        & { image?: Maybe<(
          { __typename?: 'ContentfulAsset' }
          & { file?: Maybe<(
            { __typename?: 'ContentfulAssetFile' }
            & Pick<ContentfulAssetFile, 'url'>
          )> }
        )> }
      ) | (
        { __typename?: 'ContentfulGuideline' }
        & Pick<ContentfulGuideline, 'contentful_id' | 'slug' | 'category'>
      ) | (
        { __typename?: 'ContentfulMarkdown' }
        & Pick<ContentfulMarkdown, 'contentful_id'>
        & { childContentfulMarkdownTextTextNode?: Maybe<(
          { __typename?: 'contentfulMarkdownTextTextNode' }
          & Pick<ContentfulMarkdownTextTextNode, 'text'>
        )> }
      ) | { __typename?: 'ContentfulTable' } | { __typename?: 'ContentfulTable2Column' }>>> }
    )> }
  )> }
);

export type Unnamed_14_QueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type Unnamed_14_Query = (
  { __typename?: 'Query' }
  & { contentfulGuideline?: Maybe<(
    { __typename?: 'ContentfulGuideline' }
    & Pick<ContentfulGuideline, 'contentful_id' | 'title' | 'category'>
    & { contentfulparent?: Maybe<(
      { __typename?: 'ContentfulGuideline' }
      & Pick<ContentfulGuideline, 'slug'>
    )>, description: (
      { __typename?: 'contentfulGuidelineDescriptionTextNode' }
      & Pick<ContentfulGuidelineDescriptionTextNode, 'description'>
    ) }
  )> }
);
