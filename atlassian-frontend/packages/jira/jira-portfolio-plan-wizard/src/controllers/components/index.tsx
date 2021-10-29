import React, { createContext, useContext } from 'react';

import { OptionType, Team } from '../../common/types';

const MissingProviderComponent = () => (
  <div>
    Missing <code>{`<ComponentsProvider />`}</code>
  </div>
);
const DefaultTeamPickerComponent = () => (
  <div style={{ background: 'pink' }}>{`<TeamPicker />`}</div>
);

export type TeamsFilter = (option: OptionType) => boolean;
export type TeamPickerProps = {
  isDisabled: boolean;
  id: string;
  getTeamsFilter: TeamsFilter;
  onChange: (team?: Team) => void;
  selectedTeamId: number | undefined;
};
export type TeamPickerComponent = React.ComponentType<TeamPickerProps>;

export interface Components {
  teamPicker: TeamPickerComponent;
}

const context = createContext<Components>({
  teamPicker: MissingProviderComponent,
});

export function useComponents() {
  const componentDefs = useContext(context);
  return componentDefs;
}

type Props = {
  teamPicker?: TeamPickerComponent;
};

export const ComponentsProvider: React.FC<Props> = ({
  teamPicker = DefaultTeamPickerComponent,
  children,
}) => {
  return <context.Provider value={{ teamPicker }} children={children} />;
};

export default ComponentsProvider;
