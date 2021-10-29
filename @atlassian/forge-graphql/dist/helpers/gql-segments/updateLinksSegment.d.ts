import { CompassLink } from '../../graphql-types';
import { GqlSegment } from './types';
import { CreateLinkInput } from '../../compound-types';
export default function updateLinksSegment(componentId: string, oldLinks: Array<CompassLink>, newLinks: Array<CreateLinkInput>): GqlSegment;
