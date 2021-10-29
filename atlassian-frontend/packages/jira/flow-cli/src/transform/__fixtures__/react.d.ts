interface TestReactInterace {
  React$Ref: React.RefObject;
  React$Node: React.ReactNode;
  React$ElementType: React.ElementType;
  React$Element: React.ReactElement;
  React$Element: React.Element;
  React$StatelessFunctionalComponent: React.SFC;
  React$StatelessFunctionalComponent: React.StatelessComponent;
  React$StatelessFunctionalComponent: React.FC;
  React$Component: React.PureComponent;
  React$ComponentType: React.ComponentClass;
  React$ComponentType: React.ComponentType;
  SyntheticMouseEvent: React.MouseEvent;
  SyntheticFocusEvent: React.FocusEvent;
  SyntheticKeyboardEvent: React.KeyboardEvent;
  React$Portal: React.ReactPortal;
  React$Node: React.ReactChild;
  React$Ref: RefObject;
  React$Node: ReactNode;
  React$ElementType: ElementType;
  React$Element: ReactElement;
  React$StatelessFunctionalComponent: SFC;
  React$Component: PureComponent;
  React$ComponentType: ComponentClass;
  React$ComponentType: ComponentType;
  React$StatelessFunctionalComponent: StatelessComponent;
  SyntheticMouseEvent: MouseEvent;
  SyntheticFocusEvent: FocusEvent;
  SyntheticKeyboardEvent: KeyboardEvent;
  React$Portal: ReactPortal;
  React$Node: ReactChild;
  React$StatelessFunctionalComponent: FC;
  React$Context: React.Context;
}

interface TestInterfaceReactHandler {
  mouseEventHandler: React.MouseEventHandler;
  mouseEventHandlerHTML: React.MouseEventHandler<HTMLElement>;
  mouseEventHandlerHTMLDiv: React.MouseEventHandler<HTMLDivElement>;
  mouseEventHandlerHTMLButton: React.MouseEventHandler<HTMLButtonElement>;
  focusEventHandler: React.FocusEventHandler;
  mouseEventHandlerHTML: React.FocusEventHandler<HTMLElement>;
  mouseEventHandlerInput: React.FocusEventHandler<HTMLInputElement>;
  mouseEventHandlerHTMLTextarea: React.FocusEventHandler<HTMLTextAreaElement>;
  mouseEventHandlerHTMLDiv: React.FocusEventHandler<HTMLDivElement>;
  mouseEventHandlerHTMLButton: React.FocusEventHandler<HTMLButtonElement>;
}

declare var reactHoc: () => (
  prop: () => React.ReactElement<any>,
) => React.ReactElement<any>;
