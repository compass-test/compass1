import React from 'react';
import {
  SearchInput,
  KeyboardHighlightProvider,
  useKeyboardNavigation,
  SearchDialog,
} from '../src';

const CustomResultComponent: React.FunctionComponent<{
  id: string;
  onKeyDown: (e: KeyboardEvent, target: HTMLElement) => void;
}> = ({ id, onKeyDown }) => {
  const [isHighlighted, setRef] = useKeyboardNavigation<HTMLDivElement>({
    onKeydownCallback: onKeyDown,
  });

  const text = `Custom Component ${id}`;

  return (
    <div id={id} ref={setRef}>
      {isHighlighted ? `${text} (Highlighted)` : text}
    </div>
  );
};

export const ContextualExample = () => {
  const [ref, setRef] = React.useState<HTMLElement | null>(null);
  const [lastKeyDown, setLastKeyDown] = React.useState<String | null>(null);

  const onKeyDown = React.useCallback(
    (e: KeyboardEvent, target: HTMLElement) => {
      setLastKeyDown(target.id);
    },
    [setLastKeyDown],
  );

  return (
    <>
      <div style={{ paddingBottom: '10px' }}>
        Try pressing up or down while highlighted on the input
      </div>
      <div style={{ paddingBottom: '10px' }}>
        {lastKeyDown !== null
          ? `Entered pressed while "{ ${lastKeyDown} }" is highlighted`
          : 'Press enter after pressing up or down'}
      </div>

      <KeyboardHighlightProvider listenerNode={ref}>
        <SearchInput isExpanded ref={setRef} />
        <SearchDialog>
          <CustomResultComponent onKeyDown={onKeyDown} id="1" />
          <CustomResultComponent onKeyDown={onKeyDown} id="2" />
          <CustomResultComponent onKeyDown={onKeyDown} id="3" />
          <CustomResultComponent onKeyDown={onKeyDown} id="4" />
        </SearchDialog>
      </KeyboardHighlightProvider>
    </>
  );
};

export default ContextualExample;
