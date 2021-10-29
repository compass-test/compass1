export type StateProps = {
  isConnectedToPage: boolean;
};

export type OwnProps = {
  children: React.ReactNode;
};

export type Props = StateProps & OwnProps;
