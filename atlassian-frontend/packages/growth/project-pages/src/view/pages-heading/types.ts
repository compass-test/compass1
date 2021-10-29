import { InjectedIntlProps } from 'react-intl';

export type OwnProps = {
  isPreExpand: boolean;
};

export type Props = OwnProps & InjectedIntlProps;
