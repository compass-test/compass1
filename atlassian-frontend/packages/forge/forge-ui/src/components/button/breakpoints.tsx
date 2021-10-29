const FULL_WIDTH_BUTTONS_BREAKPOINT_PX = 360;

export const buttonShouldFitContainer = (width: number) =>
  width > 0 && width < FULL_WIDTH_BUTTONS_BREAKPOINT_PX;
