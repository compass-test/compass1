import OriginTracing from '@atlassiansox/origin-tracing';

export interface DispatchProps {
  openTemplateSelectSideBar: () => void;
}

export interface OwnProps {
  children?: React.ReactNode;
}

export interface StateProps {
  origin: OriginTracing | null;
}
