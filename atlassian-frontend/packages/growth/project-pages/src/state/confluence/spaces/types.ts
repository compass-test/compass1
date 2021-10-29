export type SpacesData = Partial<{
  spaceKey: string;
  spaceName: string;
  spaceUrl: string;
}>;

export type SpacesState = {
  availableSpaces: SpacesData[];
  spacesLoaded: boolean;
};
