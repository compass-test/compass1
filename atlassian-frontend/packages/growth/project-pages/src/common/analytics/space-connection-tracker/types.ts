import { WithGranularPagesExperimentProps } from '../../../view/types';
export interface StateProps {
  connectionState: string;
}

export type OwnProps = WithGranularPagesExperimentProps;

export type Props = StateProps & OwnProps;
