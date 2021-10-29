import { StepFunction } from '../../types';
import { AuthOpts } from '../../clients/base';
import { PrMetadata } from '../../../getPrsInRelease';

interface StepLabelTicketsOpts {
  currRelease: string;
  pullRequests: string | PrMetadata[];
  auth: AuthOpts;
}
export type StepLabelTickets = StepFunction<StepLabelTicketsOpts>;
