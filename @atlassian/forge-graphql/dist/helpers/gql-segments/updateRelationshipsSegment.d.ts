import { GqlSegment } from './types';
import { Relationship } from '../../compound-types';
export default function updateRelationshipsSegment(componentId: string, oldRelationships: Array<Relationship>, newRelationships: Array<Relationship>): GqlSegment;
