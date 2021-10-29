import { ApolloError } from '@apollo/client';

export interface PageTransitionRatioSpotlightProps {
  valueBefore?: number;
  valueAfter?: number;
  unit: string;
  loading: boolean;
  error?: ApolloError;
}
