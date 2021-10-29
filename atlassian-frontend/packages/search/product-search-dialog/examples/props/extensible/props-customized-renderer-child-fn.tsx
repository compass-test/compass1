// todo: this file is a work around for atlaskit/docs not being able to parse some typed exports, see https://github.com/atlassian/extract-react-types/issues/136. Ideally this file can be deleted once the Issue is resolved and bumped in atlaskit/docs

import { CustomizedRendererChildFn } from '../../../src/extensible/product-router/product/result-provider/result-renderer/result-renderer-types';

export default (arg: CustomizedRendererChildFn) => null;
