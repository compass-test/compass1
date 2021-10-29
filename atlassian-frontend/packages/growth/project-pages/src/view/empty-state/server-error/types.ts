import { InjectedIntlProps } from 'react-intl';

type ErrorType = 'server' | 'access';

export type OwnProps = {
  type?: ErrorType;
};

export type Props = InjectedIntlProps & OwnProps;
